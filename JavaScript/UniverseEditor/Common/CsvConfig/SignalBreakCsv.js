"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SignalBreakConfigCsv =
    exports.SignalBreakConfigCsvLoader =
    exports.SignalBreakCsv =
    exports.SignalBreakCsvLoader =
      void 0);
const CsvLoader_1 = require("./CsvLoader");
const signalBreakCsvFields = [
  (0, CsvLoader_1.createCsvField)({
    Name: "Id",
    CnName: "Id",
    Type: "Int",
    Filter: "1",
    Condition: "notEmpty && unique",
    RenderType: 18,
  }),
  (0, CsvLoader_1.createCsvField)({
    Name: "Name",
    CnName: "描述",
    Filter: "1",
  }),
  (0, CsvLoader_1.createCsvField)({
    Name: "SpeedRate",
    CnName: "速度系数",
    Type: "Float",
    RenderType: 10,
    Default: "1.0",
  }),
  (0, CsvLoader_1.createCsvField)({
    Name: "SignalFragment",
    CnName: "信号片段",
    Type: "String",
    RenderType: 21,
  }),
  (0, CsvLoader_1.createCsvField)({
    Name: "MissingParts",
    CnName: "缺失部分",
    Type: "String",
    RenderType: 21,
  }),
  (0, CsvLoader_1.createCsvField)({
    Name: "Offset",
    CnName: "偏移",
    Type: "Int",
    RenderType: 18,
    Default: "0",
  }),
];
class SignalBreakCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("SignalBreakCsv", signalBreakCsvFields);
  }
}
exports.SignalBreakCsvLoader = SignalBreakCsvLoader;
class SignalBreakCsv extends CsvLoader_1.GlobalCsv {}
exports.SignalBreakCsv = SignalBreakCsv;
const signalBreakConfigCsvFields = [
  (0, CsvLoader_1.createCsvField)({
    Name: "Id",
    CnName: "Id",
    Filter: "1",
    Condition: "notEmpty && unique",
  }),
  (0, CsvLoader_1.createCsvField)({
    Name: "Name",
    CnName: "描述",
    Filter: "1",
  }),
  (0, CsvLoader_1.createCsvField)({
    Name: "SignalData1",
    CnName: "信号1",
    Type: "Int",
    Default: "0",
    RenderType: 41,
  }),
  (0, CsvLoader_1.createCsvField)({
    Name: "SignalData2",
    CnName: "信号2",
    Type: "Int",
    Default: "0",
    RenderType: 41,
  }),
  (0, CsvLoader_1.createCsvField)({
    Name: "SignalData3",
    CnName: "信号3",
    Type: "Int",
    Default: "0",
    RenderType: 41,
  }),
  (0, CsvLoader_1.createCsvField)({
    Name: "SignalData4",
    CnName: "信号4",
    Type: "Int",
    Default: "0",
    RenderType: 41,
  }),
];
class SignalBreakConfigCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("SignalBreakConfigCsv", signalBreakConfigCsvFields);
  }
}
exports.SignalBreakConfigCsvLoader = SignalBreakConfigCsvLoader;
class SignalBreakConfigCsv extends CsvLoader_1.GlobalCsv {}
exports.SignalBreakConfigCsv = SignalBreakConfigCsv;
// # sourceMappingURL=SignalBreakCsv.js.map
