"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TalkIconOp = void 0);
const CsvRegistry_1 = require("../CsvConfig/CsvRegistry");
const TalkIconCsv_1 = require("../CsvConfig/TalkIconCsv");
class TalkIconOp {
  static get Instance() {
    return void 0 === this.m && (this.m = new TalkIconOp()), this.m;
  }
  GetIconByName(e) {
    return CsvRegistry_1.CsvRegistry.Instance.GetAllCsvRows(
      TalkIconCsv_1.TalkIconCsv,
    ).find((s) => s.Type === e)?.Id;
  }
  GetIconTextureById(e) {
    return CsvRegistry_1.CsvRegistry.Instance.GetAllCsvRows(
      TalkIconCsv_1.TalkIconCsv,
    ).find((s) => s.Id === e)?.Icon;
  }
}
exports.TalkIconOp = TalkIconOp;
// # sourceMappingURL=TalkIcon.js.map
