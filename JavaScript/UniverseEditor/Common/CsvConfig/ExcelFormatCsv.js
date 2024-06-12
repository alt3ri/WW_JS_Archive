
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.ExcelFormatCsv=exports.ExcelFormatCsvLoader=void 0;const CsvLoader_1=require("./CsvLoader"),excelFormatCsvFields=[(0,CsvLoader_1.createCsvField)({Name:"Id",CnName:"Id",Type:"Int",Filter:"1",Condition:"notEmpty && unique",RenderType:18}),(0,CsvLoader_1.createCsvField)({Name:"TargetPath",CnName:"输入文件",RenderType:8}),(0,CsvLoader_1.createCsvField)({Name:"ConfigPath",CnName:"通配符文件",RenderType:8}),(0,CsvLoader_1.createCsvField)({Name:"OutputPath",CnName:"输出文件",RenderType:8}),(0,CsvLoader_1.createCsvField)({Name:"FormatBtn",CnName:"导出",RenderType:8})];class ExcelFormatCsvLoader extends CsvLoader_1.CsvLoader{constructor(){super("ExcelFormatCsvLoader",excelFormatCsvFields)}}exports.ExcelFormatCsvLoader=ExcelFormatCsvLoader;class ExcelFormatCsv extends CsvLoader_1.GlobalCsv{}exports.ExcelFormatCsv=ExcelFormatCsv;
//# sourceMappingURL=ExcelFormatCsv.js.map