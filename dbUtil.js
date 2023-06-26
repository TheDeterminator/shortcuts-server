require('dotenv').config();

/* TODO: May one day use these to ORM into my database. 
I have to understand more about how that would be useful */
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

module.exports = {  }