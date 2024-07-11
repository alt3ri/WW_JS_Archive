"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.StandbyTagCsv =
    exports.StandbyTagCsvLoader =
    exports.MAX_MONTAGE_COUNT =
      void 0);
const CsvLoader_1 = require("./CsvLoader"),
  standbyTagCsvFields =
    ((exports.MAX_MONTAGE_COUNT = 8),
    [
      (0, CsvLoader_1.createCsvField)({
        Name: "Id",
        CnName: "Id",
        Type: "Int",
        Filter: "1",
        Condition: "notEmpty && unique",
        RenderType: 18,
      }),
      (0, CsvLoader_1.createCsvField)({ Name: "ClassName", CnName: "分类名" }),
      (0, CsvLoader_1.createCsvField)({
        Name: "Bp",
        CnName: "Bp",
        RenderType: 29,
        Type: "String",
      }),
      (0, CsvLoader_1.createCsvField)({ Name: "Tag", CnName: "Tag" }),
      (0, CsvLoader_1.createCsvField)({
        Name: "Montage1",
        CnName: "蒙太奇1",
        RenderType: 27,
      }),
      (0, CsvLoader_1.createCsvField)({
        Name: "Montage2",
        CnName: "蒙太奇2",
        RenderType: 27,
      }),
      (0, CsvLoader_1.createCsvField)({
        Name: "Montage3",
        CnName: "蒙太奇3",
        RenderType: 27,
      }),
      (0, CsvLoader_1.createCsvField)({
        Name: "Montage4",
        CnName: "蒙太奇4",
        RenderType: 27,
      }),
      (0, CsvLoader_1.createCsvField)({
        Name: "Montage5",
        CnName: "蒙太奇5",
        RenderType: 27,
      }),
      (0, CsvLoader_1.createCsvField)({
        Name: "Montage6",
        CnName: "蒙太奇6",
        RenderType: 27,
      }),
      (0, CsvLoader_1.createCsvField)({
        Name: "Montage7",
        CnName: "蒙太奇7",
        RenderType: 27,
      }),
      (0, CsvLoader_1.createCsvField)({
        Name: "Montage8",
        CnName: "蒙太奇8",
        RenderType: 27,
      }),
    ]);
class StandbyTagCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("StandbyTagCsv", standbyTagCsvFields);
  }
}
exports.StandbyTagCsvLoader = StandbyTagCsvLoader;
class StandbyTagCsv extends CsvLoader_1.GlobalCsv {}
exports.StandbyTagCsv = StandbyTagCsv;
//# sourceMappingURL=StandbyTagCsv.js.map
