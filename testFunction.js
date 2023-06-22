const fs = require('fs').promises; // Use the promisified version

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

const removeAt = (dateString) => {
    return dateString.replace('at', '');
}

const getDateAndNotes = (dateString) => {
    let [date, notes] = dateString.split('(');
    notes = notes ? notes.replace(')', '') : ""
    return { dateTimestamp: convertDateToTimeStamp(date.trim()), notes: notes.trim() }
};

const convertDateToTimeStamp = (dateString) => {
    return Date.parse(dateString);
}

export async function getDates() {
    const fileData = await fs.readFile('goToSleepTimes.txt', 'utf8')
    const dateArray = fileData.split('\n').slice(1) // remove the first line

    dateArray.map(dateLine => {
        const dateWithAtRemoved = removeAt(dateLine) // TODO: rename to something like "clean date" maybe
        const { dateTimestamp, notes } = getDateAndNotes(dateWithAtRemoved)
        return { dateTimestamp, notes }
    })


}

getDates()