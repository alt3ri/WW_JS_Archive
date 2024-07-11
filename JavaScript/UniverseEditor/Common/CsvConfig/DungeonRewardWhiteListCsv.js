"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DungeonRewardWhiteListCsv =
    exports.DungeonRewardWhiteListCsvLoader =
    exports.dungeonRewardWhiteListCsvFields =
      void 0);
const CsvLoader_1 = require("./CsvLoader");
exports.dungeonRewardWhiteListCsvFields = [
  (0, CsvLoader_1.createCsvField)({
    Name: "Id",
    CnName: "Id",
    Type: "Int",
    Filter: "1",
    Condition: "notEmpty && unique",
    ExportType: "",
    RenderType: 18,
  }),
  (0, CsvLoader_1.createCsvField)({
    Name: "LevelId",
    CnName: "地图Id",
    Type: "Int",
    ExportType: "",
    RenderType: 40,
  }),
  (0, CsvLoader_1.createCsvField)({
    Name: "Desc",
    CnName: "描述",
    ExportType: "",
  }),
  (0, CsvLoader_1.createCsvField)({
    Name: "CreatorId",
    CnName: "添加人",
    Type: "Int",
    Condition: "notEmpty",
    CreateType: "scheme",
    RenderType: 42,
  }),
  (0, CsvLoader_1.createCsvField)({
    Name: "RewardList",
    CnName: "掉落列表",
    Type: "Array<Int>",
    RenderType: 34,
    ExportType: "",
  }),
  (0, CsvLoader_1.createCsvField)({
    Name: "VisionList",
    CnName: "幻象掉落列表",
    Type: "Array<Int>",
    RenderType: 34,
    ExportType: "",
  }),
];
class DungeonRewardWhiteListCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super(
      "DungeonRewardWhiteListRowCsv",
      exports.dungeonRewardWhiteListCsvFields,
    );
  }
}
exports.DungeonRewardWhiteListCsvLoader = DungeonRewardWhiteListCsvLoader;
class DungeonRewardWhiteListCsv extends CsvLoader_1.GlobalCsv {}
exports.DungeonRewardWhiteListCsv = DungeonRewardWhiteListCsv;
//# sourceMappingURL=DungeonRewardWhiteListCsv.js.map
