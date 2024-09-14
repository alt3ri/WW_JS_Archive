"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TalkerListOp = void 0);
const CsvRegistry_1 = require("../CsvConfig/CsvRegistry"),
  TalkerCsv_1 = require("../CsvConfig/TalkerCsv");
class TalkerListOp {
  static Get() {
    return this.Me || (this.Me = this.Load()), this.Me;
  }
  static GetNames() {
    return (
      this.Fe || (this.Fe = this.Get().Talkers.map((t) => t.Name)), this.Fe
    );
  }
  static GetId(t, s) {
    t = t.Talkers.find((t) => t.Name === s);
    return t ? t.Id : 0;
  }
  static GetName(t, s) {
    t = t.Talkers.find((t) => t.Id === s);
    return t ? t.Name : "Unknown";
  }
  static GetTalkerInfo(t, s) {
    return t.Talkers.find((t) => t.Id === s);
  }
  static Load() {
    var t = CsvRegistry_1.CsvRegistry.Instance.GetAllCsvRows(
      TalkerCsv_1.TalkerCsv,
    );
    const s = [];
    return (
      t.forEach((t) => {
        s.push({
          Id: t.Id,
          Name: t.Name,
          HeadIcon: t.HeadIconAsset,
          PileIcon: t.RolePileIconAsset,
        });
      }),
      { Talkers: s }
    );
  }
}
exports.TalkerListOp = TalkerListOp;
//# sourceMappingURL=TalkerList.js.map
