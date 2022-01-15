var express = require('express');
var mime = require('mime');
var path = require('path');
var xl = require('excel4node');
var router = express.Router();

const headerColumns = ["StudentId", "FullName"];
const headerColumnsAss=["StudentId","Grade"];
const data = [{ StudentId: "123", FullName: "Nguyễn An"}];
const dataAssignment=[{StudentId:"123", Grade:"9"}];

const createExcelFile = () => {
  const wb = new xl.Workbook()
  const ws = wb.addWorksheet("StudentList")
  let colIndex = 1
  headerColumns.forEach((item) => {
      ws.cell(1, colIndex++).string(item)
  })
  let rowIndex = 2;
  data.forEach((item) => {
      let columnIndex = 1;
      Object.keys(item).forEach((colName) => {
          ws.cell(rowIndex, columnIndex++).string(item[colName])
      })
      rowIndex++;
  })
  wb.write("StudentList.xlsx")

}

const createExcelFileAssignment = () => {
    const wb = new xl.Workbook()
    const ws = wb.addWorksheet("Assigment")
    let colIndex = 1
    headerColumnsAss.forEach((item) => {
        ws.cell(1, colIndex++).string(item)
    })
    let rowIndex = 2;
    dataAssignment.forEach((item) => {
        let columnIndex = 1;
        Object.keys(item).forEach((colName) => {
            ws.cell(rowIndex, columnIndex++).string(item[colName])
        })
        rowIndex++;
    })
    wb.write("Assigment.xlsx")
  
  }

/*Get template student list F*/
router.get("/StudentListTemplate", (req, res, next) => {
  createExcelFile()
  const file = __dirname + "/StudentList.xlsx"
  const fileName = path.basename(file)
  const mimeType = mime.getType(file)
  res.setHeader("Content-Disposition", "attachment;filename=" + fileName)
  res.setHeader("Content-Type", mimeType)

  setTimeout(() => {
    res.download("StudentList.xlsx");
  }, 2000);


})

/*Get template assigment F*/
router.get("/assignmentTemplate", (req, res, next) => {
  createExcelFileAssignment();
  const file = __dirname + "/Assigment.xlsx"
  const fileName = path.basename(file)
  const mimeType = mime.getType(file)
  res.setHeader("Content-Disposition", "attachment;filename=" + fileName)
  res.setHeader("Content-Type", mimeType)

  setTimeout(() => {
    res.download("Assigment.xlsx");
  }, 2000);
})

module.exports = router;
