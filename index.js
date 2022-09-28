let csvToJson = require('convert-csv-to-json');
const { convertCsvToXlsx } = require('@aternus/csv-to-xlsx');
var xlsx = require('node-xlsx');
var fs = require('fs');
var rows = [];
var writeStr = "";

Run = async () => {
    let inputFilename = process.argv.slice(2)[0];
    if (!inputFilename) {
        console.log("Please type your's filepath want to convert to JSON!\nExample: 'npm start example.csv' OR 'npm start example.xlsx'");
        return;
    }

    let type = process.argv.slice(3)[0];
    if (type == 'csvtoxlsx') {
        console.log(`Converting ${inputFilename} to XLSX...`);
        ConvertCSVtoXLS(inputFilename);
    }else{
        let outputFilename = inputFilename.split('.')[0] + '.json';
        if (inputFilename.includes(".xls")){
            console.log(`Converting ${inputFilename} to CSV...`);
            inputFilename = await ConvertXLStoCSV(inputFilename);
        }

        console.log(`Converting ${inputFilename} to JSON...`);
        csvToJson.generateJsonFileFromCsv(inputFilename, outputFilename);
    }
}
/**
 * Convert XLS to CSV
 * @param {string} inputFilename filepath input
 * @param {string} separate separate csv (';' or ',' or '|') default new excel view is ';'
 */
const ConvertXLStoCSV = async (inputFilename, separate = ';') => {
    var obj = xlsx.parse(inputFilename); // parses a file
        //looping through all sheets
        for(var i = 0; i < obj.length; i++)
        {
            var sheet = obj[i];
            //loop through all rows in the sheet
            for(var j = 0; j < sheet['data'].length; j++)
            {
                    //add the row to the rows array
                    rows.push(sheet['data'][j]);
            }
        }

        //creates the csv string to write it to a file
        writeStr += rows[i].join(separate) + "\n";
    
        inputFilename = inputFilename.split('.')[0] + '.csv';
    
        //writes to a file, but you will presumably send the csv as a      
        //response instead
        await fs.writeFileSync(inputFilename, writeStr, 'utf-8');

        return inputFilename;
}

/**
 * Convert CSV to XLS: ONLY RUN AS separate = ','
 * @param {string} inputFilename filepath input
 */
 const ConvertCSVtoXLS = async (inputFilename) => {
    let outputFilename = inputFilename.split('.')[0] + '.xlsx';
    if (fs.existsSync(outputFilename)) {
        fs.unlinkSync(outputFilename);
    }

    convertCsvToXlsx(inputFilename, outputFilename);
}

Run();