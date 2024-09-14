"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OccupationCsv = exports.OccupationCsvLoader = void 0);
const immer_1 = require("immer"),
  CsvLoader_1 = require("./CsvLoader"),
  occupationCsvFields = [
    (0, CsvLoader_1.createCsvField)({
      Name: "Id",
      CnName: "Id",
      Filter: "1",
      Condition: "notEmpty && unique",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "OccupationType",
      CnName: "占用类型",
      Filter: "1",
      Condition: "notEmpty",
      RenderType: 26,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "NameStringKey",
      CnName: "标记名文本Key（开发中）",
      Filter: "1",
      Localization: "1",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "Name",
      CnName: "标记名",
      Filter: "1",
      Localization: "1",
      Condition: "notEmpty && unique",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "OccupationData",
      CnName: "数据",
      RenderType: 27,
    }),
  ];
class OccupationCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("OccupationCsv", occupationCsvFields);
  }
  re(e) {
    switch (e.OccupationType) {
      case "Npc":
      case "Time":
      case "ScreenResource":
        e.OccupationData = "";
    }
  }
  Save(e, o) {
    var a = [];
    for (const t of e) {
      var s = (0, immer_1.default)(t, (e) => {
        this.re(e);
      });
      a.push(s);
    }
    super.Save(a, o);
  }
  SaveOne(e, o) {
    e = (0, immer_1.default)(e, (e) => {
      this.re(e);
    });
    super.SaveOne(e, o);
  }
}
exports.OccupationCsvLoader = OccupationCsvLoader;
class OccupationCsv extends CsvLoader_1.GlobalCsv {}
exports.OccupationCsv = OccupationCsv;
//# sourceMappingURL=OccupationCsv.js.map
