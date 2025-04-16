"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterDisplayStyleCsv = exports.CharacterDisplayStyleCsvLoader =
    void 0);
const CsvLoader_1 = require("./CsvLoader"),
  characterDisplayStyleCsvFields = [
    (0, CsvLoader_1.createCsvField)({
      Name: "Id",
      CnName: "Id",
      Type: "Int",
      Filter: "1",
      Condition: "notEmpty && unique",
      RenderType: 19,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "IllustrationAsset",
      CnName: "角色立绘",
      Type: "String",
      RenderType: 86,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "CharacterName",
      CnName: "角色名",
      Type: "String",
      RenderType: 22,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "Description",
      CnName: "描述文本",
      Type: "String",
      RenderType: 22,
    }),
  ];
class CharacterDisplayStyleCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("CharacterDisplayStyleCsv", characterDisplayStyleCsvFields);
  }
}
exports.CharacterDisplayStyleCsvLoader = CharacterDisplayStyleCsvLoader;
class CharacterDisplayStyleCsv extends CsvLoader_1.GlobalCsv {}
exports.CharacterDisplayStyleCsv = CharacterDisplayStyleCsv;
//# sourceMappingURL=CharacterDisplayStyleCsv.js.map
