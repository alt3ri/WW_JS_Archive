"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExcelBuffCsvLoader = void 0);
const Util_1 = require("../Misc/Util"),
  CsvLoader_1 = require("./CsvLoader"),
  excelBuffCsvFields = [
    (0, CsvLoader_1.createCsvField)({
      Name: "Id",
      CnName: "Excel BuffId",
      Filter: "1",
      Condition: "notEmpty && unique",
    }),
    (0, CsvLoader_1.createCsvField)({ Name: "GeDesc", CnName: "备注" }),
  ];
class ExcelBuffCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("ExcelBuffCsvLoader", excelBuffCsvFields);
  }
  static get Instance() {
    return (
      ExcelBuffCsvLoader.m || (ExcelBuffCsvLoader.m = new ExcelBuffCsvLoader()),
      ExcelBuffCsvLoader.m
    );
  }
  get n8() {
    return (
      (0, Util_1.getAkiBaseLocalPath)() +
      "/Source/Config/Merge/b.Buff.xlsx_Buff.csv"
    );
  }
  async HXa() {
    return new Promise((e, s) => {
      e(this.TryLoad(this.n8));
    });
  }
  async GetDescById(s) {
    this.jXa ||
      ((e = await this.HXa()),
      (this.jXa = e.filter((e) => !isNaN(Number(e.Id)))));
    var e = this.jXa.find((e) => e.Id === s.toString());
    if (e) return e.GeDesc;
  }
}
exports.ExcelBuffCsvLoader = ExcelBuffCsvLoader;
//# sourceMappingURL=ExcelBuffCsv.js.map
