const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes.js')

//customize yargs version
yargs.version('1.1.0');

//create add command
yargs.command({
    command : 'add',
    describe : 'Add a new note',
    builder : {
        title : {
            describe : 'Note title',
            demandOption : true,
            type : 'string'
        },
        body : {
            describe : 'Note content',
            demandOption : true,
            type : 'string'       
        }
    },
    handler(argv){
        notes.addNote(argv.title , argv.body);
    }
})

//create remove command
yargs.command({
    command : 'remove',
    describe : 'Removing a new note',
    builder : {
        title : {
            describe : "Note title",
            demandOption : true,
            type : 'string'
        }
    },
    handler(argv){
        notes.removeNotes(argv.title)
    }
})

//create list command 
yargs.command({
    command : 'list',
    describe : 'Listing all note',
    handler(){
        notes.listNotes();
    }
})

//create read command
yargs.command({
    command : 'read',
    describe : 'Reading the note',
    builder : {
        title : {
            describe : "Note title",
            demandOption : true,
            type : 'string'
        }
    },
    handler(argv){
        notes.readNotes(argv.title);
    }
})

yargs.parse()