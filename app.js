const fs = require('fs');
// const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleOptions = {
  describe: 'Title of note',
  demand: true,
  alias: 't'
}

const bodyOptions = {
  describe: 'Body of note',
  demand: true,
  alias: 'b'
}

const argv = yargs.
  command('add', 'Add a new node', {
    title: titleOptions,
    body: bodyOptions
  })
  .command('list', 'List all notes')
  .command('read', 'Read a note', {
    title: titleOptions
  })
  .command('remove', 'Remove a note', {
    title: titleOptions
  })
  .help()
  .argv;
var command = argv._[0];
/*console.log('Command: ',command);
// console.log('Process', process.argv);
console.log('Yargs: ', argv);*/

if (command === 'add') {
  // console.log('Adding new note.');
  var note = notes.addNote(argv.title, argv.body);
  if (note) {
    console.log("Note added successfully!");
    notes.logNote(note);
  } else {
    console.log('Duplicate note exists!');
  }
} else if (command === 'list') {
  let allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} note(s).`);
  allNotes.forEach((note) => notes.logNote(note));
} else if (command === 'read') {
  let note = notes.getNote(argv.title);
  if (note) {
    console.log("Note retrieved successfully!");
    notes.logNote(note);
  } else {
    console.log('Note not found!');
  }
} else if (command === 'remove') {
  let noteRemoved = notes.removeNote(argv.title);
  var message = noteRemoved ? 'Note was removed' : 'Note not found';
  console.log(message);
} else {
  console.log('Command not recognised.');
}
