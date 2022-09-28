let csvToJson = require('convert-csv-to-json');
var xlsx = require('node-xlsx');
var fs = require('fs');
var rows = [];
var writeStr = "";

Run = async () => {
    let inputFilename = "report_datafresh_srh.xlsx";
    
    let outputFilename = inputFilename.split('.')[0] + '.json';
    if (inputFilename.includes(".xls")){
        inputFilename = await ConvertXLStoCSV(inputFilename);
    }

    console.log(`Converting ${inputFilename} to JSON...`);
    csvToJson.generateJsonFileFromCsv(inputFilename, outputFilename);
}

ConvertXLStoCSV = async (inputFilename) => {
    console.log(`Converting ${inputFilename} to CSV...`);
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
        for(var i = 0; i < rows.length; i++)
        {
            writeStr += rows[i].join(";") + "\n";//systax ";" or ","
        }
    
        inputFilename = inputFilename.split('.')[0] + '.csv';
    
        //writes to a file, but you will presumably send the csv as a      
        //response instead
        await fs.writeFileSync(inputFilename, writeStr, function(err) {
            if(err) {
                return console.log(err);
            }
            console.log(inputFilename + " was saved in the current directory!");
        });

        return inputFilename;
}

Run();