let csvToJson = require('convert-csv-to-json');

let fileInputName = 'report_datafresh_srh.csv'; 
let fileOutputName = 'myOutputFile.json';

csvToJson.generateJsonFileFromCsv(fileInputName,fileOutputName);