"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RandomPrefabCsv = exports.RandomPrefabCsvLoader = void 0);
const CsvLoader_1 = require("./CsvLoader");
const randomPrefabCsvFields = [
  (0, CsvLoader_1.createCsvField)({
    Name: "Id",
    CnName: "Id",
    Filter: "1",
    Type: "Int",
    Condition: "notEmpty && unique",
    RenderType: 18,
  }),
  (0, CsvLoader_1.createCsvField)({
    Name: "RandomPrefabType",
    CnName: "随机规则",
    RenderType: 39,
  }),
  (0, CsvLoader_1.createCsvField)({
    Name: "PrefabIds",
    CnName: "预制体池",
    Type: "Array<Int>",
    RenderType: 34,
  }),
];
class RandomPrefabCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("RandomPrefabCsv", randomPrefabCsvFields);
  }
}
exports.RandomPrefabCsvLoader = RandomPrefabCsvLoader;
class RandomPrefabCsv extends CsvLoader_1.GlobalCsv {}
exports.RandomPrefabCsv = RandomPrefabCsv;
// # sourceMappingURL=RandomPrefabCsv.js.map
