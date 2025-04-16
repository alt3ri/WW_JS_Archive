"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExcelBuffCsvLoader = void 0);
const BranchDefine_1 = require("../BranchDefine"),
  Util_1 = require("../Misc/Util"),
  CsvLoader_1 = require("./CsvLoader"),
  excelBuffCsvFields = [
    (0, CsvLoader_1.createCsvField)({
      Name: "Id",
      CnName: "Excel BuffId",
      Filter: "1",
      Condition: "notEmpty && unique",
    }),
    (0, CsvLoader_1.createCsvField)({ Name: "Start", CnName: "开始分支" }),
    (0, CsvLoader_1.createCsvField)({ Name: "End", CnName: "结束分支" }),
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
  async LZa() {
    const a = (0, BranchDefine_1.getAllBranches)(!0);
    return new Promise((e, r) => {
      e(
        this.TryLoad(this.n8).filter((e) => {
          var r = e.Start || a[0],
            s = e.End || a[a.length - 1];
          return (
            !!a.includes(s) &&
            !isNaN(Number(e.Id)) &&
            (0, BranchDefine_1.isBranchInRange)(r, s)
          );
        }),
      );
    });
  }
  async GetDescById(r) {
    this.AZa || ((e = await this.LZa()), (this.AZa = e));
    var e = this.AZa.find((e) => e.Id === r.toString());
    if (e) return e.GeDesc;
  }
}
exports.ExcelBuffCsvLoader = ExcelBuffCsvLoader;
//# sourceMappingURL=ExcelBuffCsv.js.map
