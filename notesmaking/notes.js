const chalk = require('chalk');
const fs = require('fs');

const addNote = (title, body) => {
    const notes = loadNotes();

    // const duplicateNotes = notes.filter(
    //     (note) => {
    //        return note.title === title
    //     }
    // )

    const duplicateNote = notes.find(
        (note) => {
           return note.title === title
        }
    )
    
    //short hand syntax
    // const duplicateNotes = notes.filter(
    //     (note) => note.title === title
    // )
    
    debugger

    if(!duplicateNote){
        notes.push(
            {
                title : title,
                body : body
            }
        )
        saveNotes(notes);
        console.log(chalk.green.inverse("New notes saved!"));
    }
    else{
        console.log(chalk.red.inverse("Note title taken!"));
    }
}

const removeNotes = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter(
        (note) => {
            return note.title !== title
        }
    )
    if(notes.length > notesToKeep.length){
        console.log(chalk.green.inverse("Note removed"));
    }
    else{
        console.log(chalk.red.inverse("No note found!"));
    }
    saveNotes(notesToKeep);
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.inverse("Your notes "));
    notes.forEach(
        (note) => {
            console.log(note.title);
        }
    )    
}

const readNotes = (title) => {
    const notes = loadNotes();
    const noteToRead = notes.find(
        (note) => {
            return note.title === title
        }
    )
    if(noteToRead){
        console.log(chalk.green.inverse(noteToRead.title));
        console.log(noteToRead.body);
    }
    else{
        console.log(chalk.red.inverse("No note found"));
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json' , dataJSON)
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    }
    catch(e){
        return []
    }
}

module.exports = {
    addNote : addNote,
    removeNotes : removeNotes,
    listNotes : listNotes,
    readNotes : readNotes
};