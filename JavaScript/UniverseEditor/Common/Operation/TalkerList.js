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
  static GetNameAndTitles() {
    return (
      this.sZ_ ||
        (this.sZ_ = this.Get().Talkers.map((t) => this.GetNameAndTitle(t))),
      this.sZ_
    );
  }
  static GetId(t, e) {
    t = t.Talkers.find((t) => t.Name === e);
    return t ? t.Id : 0;
  }
  static GetName(t, e) {
    t = t.Talkers.find((t) => t.Id === e);
    return t ? t.Name : "Unknown";
  }
  static GetTitle(t, e) {
    t = t.Talkers.find((t) => t.Id === e);
    return t ? t.Title : "";
  }
  static GetNameAndTitle(t) {
    return t.Name + (t.Title ? "_" + t.Title : "");
  }
  static GetTalkerInfo(t, e) {
    return t.Talkers.find((t) => t.Id === e);
  }
  static Load() {
    var t = CsvRegistry_1.CsvRegistry.Instance.GetAllCsvRows(
      TalkerCsv_1.TalkerCsv,
    );
    const e = [];
    return (
      t.forEach((t) => {
        e.push({
          Id: t.Id,
          Name: t.Name,
          HeadIcon: t.HeadIconAsset,
          PileIcon: t.RolePileIconAsset,
          Title: t.Title,
        });
      }),
      { Talkers: e }
    );
  }
}
exports.TalkerListOp = TalkerListOp;
//# sourceMappingURL=TalkerList.js.map
