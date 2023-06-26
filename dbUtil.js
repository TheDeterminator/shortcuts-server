const fs = require('fs').promises; // Use the promisified version
require('dotenv').config();




class Entry {
    constructor(date, notes) {
        this.date = date;
        this.notes = notes;
    }
}

class WakeUpEntry extends Entry {
    constructor(date, notes) {
        super(date, notes);
        this.type = 'wakeUp';
    }
}



// const removeAt = (dateString) => {
//     return dateString.replace('at', '');
// }

const getDateAndNotes = (dateString) => {
    let [date, notes] = dateString.split('(');
    notes = notes ? notes.replace(')', '') : ""
    return { dateTimestamp: date.trim(), notes: notes.trim() }
};

const getDates = async (filePath) => {
    const fileData = await fs.readFile(filePath, 'utf8')
    const dateArray = fileData.split('\n').slice(1) // remove the first line

    return dateArray.map(dateLine => {
        // const dateWithAtRemoved = removeAt(dateLine) // TODO: rename to something like "clean date" maybe
        const { dateTimestamp, notes } = getDateAndNotes(dateLine)
        return { dateTimestamp, notes }
    })
}

const createTable = async (tableName, typeName,) => {
    // sanitize and validate the table name and type name
    if (!/^\w+$/.test(tableName) || !/^\w+$/.test(typeName)) {
        throw new Error('Invalid table name or type name');
    }
    if (tableName.length > 30 || typeName.length > 30) {
        throw new Error('Table name or type name is too long');
    }

    const enumsCreationQuery = `CREATE TYPE ${typeName} AS ENUM ('go_to_sleep', 'wake_up', 'nap');`

    const tableCreationQuery = `CREATE TABLE ${tableName} (
      id SERIAL PRIMARY KEY, 
      event_timestamp TIMESTAMP NOT NULL, 
      event_type ${typeName} NOT NULL, 
      duration INTERVAL, 
      notes TEXT
    );`

    const checkForDataTypeQuery = `SELECT 1 FROM pg_type WHERE typname = '${typeName}';`
    const checkForTableQuery = `SELECT 1 FROM pg_tables WHERE tablename = '${tableName}';`

    const enumQueryResult = await db.query(checkForDataTypeQuery);
    const tableQueryResult = await db.query(checkForTableQuery);

    try {
        if (enumQueryResult.rows.length === 0) {
            await db.query(enumsCreationQuery);
        }

        if (tableQueryResult.rows.length === 0) {
            await db.query(tableCreationQuery);
        }
    } catch (err) {
        console.error(err);
    }
}


const emptyTable = async (tableName, queryCaller) => {
    // sanitize and validate the table name
    if (!/^\w+$/.test(tableName)) {
        throw new Error('Invalid table name');
    }
    if (tableName.length > 30) {
        throw new Error('Table name is too long');
    }

    const checkForTableRowsQuery = `SELECT 1 FROM ${tableName} LIMIT 1`;
    const checkForTableRowsQueryResult = await queryCaller(checkForTableRowsQuery);

    const emptyTableQuery = `DELETE FROM ${tableName};`;
    try {
        if (checkForTableRowsQueryResult.rows.length > 0) {
            await queryCaller(emptyTableQuery);
        }
    } catch (err) {
        console.error(err);
    }
}

const dropSleepDataTable = async (shouldRun) => {
    if (shouldRun && client) {
        try {
            const checkTypeQuery = "SELECT EXISTS(SELECT 1 FROM pg_type WHERE typname = 'sleep_event_type');";
            const checkTableQuery = "SELECT EXISTS(SELECT 1 FROM information_schema.tables WHERE table_name = 'sleep_data');";

            const { rows: typeRows } = await client.query(checkTypeQuery);
            const { rows: tableRows } = await client.query(checkTableQuery);

            const typeExists = typeRows[0].exists;
            const tableExists = tableRows[0].exists;

            if (tableExists) {
                const dropTableQuery = 'DROP TABLE sleep_data';
                await client.query(dropTableQuery);
                console.log('Table dropped successfully.');
            }

            if (typeExists) {
                const dropEnumQuery = 'DROP TYPE sleep_event_type;';
                await client.query(dropEnumQuery);
                console.log('Type dropped successfully.');
            }

        } catch (err) {
            console.error(err);
        }
    }
};

const insertInDatabase = async (eventType, filePath, queryCaller) => {
    let dateData = await getDates(filePath)

    try {
        for (const dd of dateData) {
            let query = 'INSERT INTO sleep_data (event_timestamp, event_type, notes) VALUES ($1, $2, $3) RETURNING *';
            let values = [dd.dateTimestamp, eventType, dd.notes];
            let res = await queryCaller(query, values);
            console.log(res.rows[0]);
        }


    } catch (err) {
        console.error(err);
    }
}

const cleanDatabase = async () => {
    try {
        await dropSleepDataTable()
        await buildSleepDataTable()
    } catch (err) {
        console.error(err);
    }
}

// TODO: Add null checks to all this stuff
// (async () => await cleanDatabase())().catch(err => console.error(err))

// (async () => {
//     // await buildSleepDataTable()
//     await Promise.all([
//         insertInDatabase('wake_up', './wakeUpTime.txt')
//         , insertInDatabase('go_to_sleep', './goToSleepTimes.txt')
//     ])

//     await client.end();
// })().catch(err => console.error(err))

module.exports = { emptyTable, insertInDatabase }