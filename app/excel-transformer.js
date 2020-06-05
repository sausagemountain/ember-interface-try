'use strict';
import * as xlsx from 'xlsx';

export function readData(dataBuffer){
  let result = {}
  const book = xlsx.read(dataBuffer,{
    type: 'buffer',
    cellDates: true
  })
  for (let sheetName of book.SheetNames) {
    const sheet = book.Sheets[sheetName]
    const sheetJson = xlsx.utils.sheet_to_json(sheet)
    const titles = Object.keys(sheetJson[0])
    const array_sheet = [[...titles]];
    let num = 0
    for (let obj of sheetJson) {
      const row = []
      for (let title of titles) {
        let val = obj[title]
        if (typeof val == 'string')
          val = val.trim().replace('\r',' ').split('\n').map(e => e.trim()).join('\n')
        row.push(val)
      }
      array_sheet.push(row)
    }
    result[sheetName] = array_sheet
  }
  return result
}
