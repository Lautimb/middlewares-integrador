const path = require('path')
const fs = require('fs')

const helpers =  {
    getAllDataBase: (dataBaseFile) =>{
        const dataBasePath = path.join('./src/database', dataBaseFile);
        return JSON.parse(fs.readFileSync(dataBasePath, 'utf-8'));
    },
    generateId: (dataBaseFile) =>{
        const allDataList = helpers.getAllDataBase(dataBaseFile);
        return allDataList.pop().id + 1;
    },
    writeNewDataBase: (dataToSave, dataBaseFile) => {
        const dataToStringify = JSON.stringify(dataToSave, null, ' ');
        const dataBasePath = path.join('./src/database', dataBaseFile);
        return fs.writeFileSync(dataBasePath, dataToStringify);
    }
}

module.exports = helpers;