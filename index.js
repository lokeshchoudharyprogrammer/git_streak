const jsonfile = require('jsonfile');
const moment = require('moment');
const simpleGit = require('simple-git');

const FILE_PATH = './data.json';

// const DATE = moment().subtract(1,'d').format();
const DATE = "2025-11-14T12:00:00";

const data = {
    date : DATE
}

jsonfile.writeFile(FILE_PATH,data,()=>{
    simpleGit().add([FILE_PATH]).commit(DATE,{'--date' : DATE}).push();
});