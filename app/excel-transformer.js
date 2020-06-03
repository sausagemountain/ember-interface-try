'use strict';
import * as xlsx from 'xlsx';

export function readData(dataBuffer){
  let result = {}
  const book = xlsx.read(dataBuffer,{
    cellDates: true
  })
  for (let sheetName of book.SheetNames) {
    const sheet = xlsx.utils.sheet_to_json(sheetName)
    const titles = [...sheet[0].keys()]
    let array_sheet = [titles];
    for (let obj of sheet) {
      const row = []
      for (let title of titles) {
        const row = []
        row.push(obj[title])
      }
      array_sheet.push(row)
    }
    result[sheetName] = array_sheet
  }
  return result
}
