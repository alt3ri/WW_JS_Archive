"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MorseCodeDifficultyCsv =
    exports.MorseCodeDifficultyCsvLoader =
    exports.MorseCodeCsv =
    exports.MorseCodeCsvLoader =
    exports.morseCodeDifficultyCsvFields =
    exports.morseCodeCsvFields =
      void 0);
const CsvLoader_1 = require("./CsvLoader");
(exports.morseCodeCsvFields = [
  (0, CsvLoader_1.createCsvField)({
    Name: "Id",
    CnName: "Id",
    Type: "String",
    Filter: "1",
    Condition: "notEmpty && unique",
    RenderType: 21,
  }),
  (0, CsvLoader_1.createCsvField)({
    Name: "Name",
    CnName: "描述",
    Filter: "1",
  }),
  (0, CsvLoader_1.createCsvField)({
    Name: "Type",
    CnName: "类型",
    Type: "Int",
    RenderType: 47,
    Default: "1",
  }),
  (0, CsvLoader_1.createCsvField)({
    Name: "MorseCode",
    CnName: "摩斯码",
    Type: "String",
    RenderType: 21,
  }),
  (0, CsvLoader_1.createCsvField)({
    Name: "Difficulty",
    CnName: "难度",
    Type: "Int",
    RenderType: 48,
    Default: "0",
  }),
]),
  (exports.morseCodeDifficultyCsvFields = [
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
      CnName: "播放速度",
      Type: "Float",
      RenderType: 10,
      Default: "1",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "TapTimeWindow",
      CnName: "判定区域（短按）",
      Type: "Int",
      RenderType: 18,
      Default: "100",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "PressTimeWindow",
      CnName: "判定区域（长按起点）",
      Type: "Int",
      RenderType: 18,
      Default: "100",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "ReleaseTimeWindow",
      CnName: "判定区域（长按终点）",
      Type: "Int",
      RenderType: 18,
      Default: "100",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "TargetCompletion",
      CnName: "目标完成度",
      Type: "Int",
      RenderType: 18,
      Default: "80",
    }),
  ]);
class MorseCodeCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("MorseCodeCsv", exports.morseCodeCsvFields);
  }
}
exports.MorseCodeCsvLoader = MorseCodeCsvLoader;
class MorseCodeCsv extends CsvLoader_1.GlobalCsv {}
exports.MorseCodeCsv = MorseCodeCsv;
class MorseCodeDifficultyCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("MorseCodeDifficultyCsv", exports.morseCodeDifficultyCsvFields);
  }
}
exports.MorseCodeDifficultyCsvLoader = MorseCodeDifficultyCsvLoader;
class MorseCodeDifficultyCsv extends CsvLoader_1.GlobalCsv {}
exports.MorseCodeDifficultyCsv = MorseCodeDifficultyCsv;
//# sourceMappingURL=MorseCodeCsv.js.map
