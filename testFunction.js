const fs = require('fs').promises; // Use the promisified version
const { Pool, Client } = require('pg');
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

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: false
});


const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: false
});

client.connect();


const removeAt = (dateString) => {
    return dateString.replace('at', '');
}

const getDateAndNotes = (dateString) => {
    let [date, notes] = dateString.split('(');
    notes = notes ? notes.replace(')', '') : ""
    return { dateTimestamp: date.trim(), notes: notes.trim() }
};

const getDates = async (filePath) => {
    const fileData = await fs.readFile(filePath, 'utf8')
    const dateArray = fileData.split('\n').slice(1) // remove the first line

    return dateArray.map(dateLine => {
        const dateWithAtRemoved = removeAt(dateLine) // TODO: rename to something like "clean date" maybe
        const { dateTimestamp, notes } = getDateAndNotes(dateWithAtRemoved)
        return { dateTimestamp, notes }
    })
}

const buildSleepDataTable = async () => {
    // -- Define the ENUM type for event
    const enumsCreationQuery = `CREATE TYPE sleep_event_type AS ENUM ('go_to_sleep', 'wake_up', 'nap');`

    // -- Create the table
    const tableCreationQuery = `CREATE TABLE sleep_data (
  id SERIAL PRIMARY KEY, 
  event_timestamp TIMESTAMP NOT NULL, 
  event_type sleep_event_type NOT NULL, 
  duration INTERVAL, 
  notes TEXT
);`

    try {
        await client.query(enumsCreationQuery);
        await client.query(tableCreationQuery);
    } catch (err) {
        console.error(err);
    }
}

const dropSleepDataTable = async () => {
    try {
        const dropEnumQuery = 'DROP TYPE sleep_event_type;';
        const dropTableQuery = 'DROP TABLE sleep_data';

        await client.query(dropTableQuery);
        await client.query(dropEnumQuery);
    } catch (err) {
        console.error(err);
    }
}

const insertInDatabase = async (eventType, filePath) => {
    let dateData = await getDates(filePath)

    try {
        for (const dd of dateData) {
            let query = 'INSERT INTO sleep_data (event_timestamp, event_type, notes) VALUES ($1, $2, $3) RETURNING *';
            let values = [dd.dateTimestamp, eventType, dd.notes];
            let res = await client.query(query, values);
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

(async () => {
    // await buildSleepDataTable()
    await Promise.all([
        insertInDatabase('wake_up', './wakeUpTime.txt')
        , insertInDatabase('go_to_sleep', './goToSleepTimes.txt')
    ])

    await client.end();
})().catch(err => console.error(err))