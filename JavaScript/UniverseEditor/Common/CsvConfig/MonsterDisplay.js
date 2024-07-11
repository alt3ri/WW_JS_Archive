"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MonsterDisplayCsv = exports.MonsterDisplayCsvLoader = void 0);
const CsvLoader_1 = require("./CsvLoader");
const monsterDisplayCsvFields = [
  (0, CsvLoader_1.createCsvField)({
    Name: "Id",
    CnName: "Id",
    Type: "Int",
    Filter: "1",
    RenderType: 18,
  }),
  (0, CsvLoader_1.createCsvField)({
    Name: "NameStringKey",
    CnName: "怪物名称文本key（开发中）",
    Filter: "1",
    Localization: "1",
  }),
  (0, CsvLoader_1.createCsvField)({
    Name: "Name",
    CnName: "怪物名称",
    Filter: "1",
    Localization: "1",
    Condition: "notEmpty && unique",
  }),
  (0, CsvLoader_1.createCsvField)({
    Name: "IntroduceStringKey",
    CnName: "简短介绍文本key（开发中）",
    Localization: "1",
  }),
  (0, CsvLoader_1.createCsvField)({
    Name: "Introduce",
    CnName: "简短介绍",
    Localization: "1",
  }),
  (0, CsvLoader_1.createCsvField)({
    Name: "MonsterPileIconAsset",
    CnName: "半身像资源",
    RenderType: 17,
  }),
];
class MonsterDisplayCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("MonsterDisplayCsv", monsterDisplayCsvFields);
  }
}
exports.MonsterDisplayCsvLoader = MonsterDisplayCsvLoader;
class MonsterDisplayCsv extends CsvLoader_1.GlobalCsv {}
exports.MonsterDisplayCsv = MonsterDisplayCsv;
// # sourceMappingURL=MonsterDisplay.js.map
