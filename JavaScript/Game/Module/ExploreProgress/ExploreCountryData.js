"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExploreCountryData = void 0);
const ConfigManager_1 = require("../../Manager/ConfigManager"),
  ExploreAreaData_1 = require("./ExploreAreaData");
class ExploreCountryData {
  constructor() {
    (this.CountryId = 0),
      (this.WVt = ""),
      (this.QVt = new Map()),
      (this.XVt = []);
  }
  Initialize(r) {
    (this.CountryId = r.Id), (this.WVt = r.Title);
  }
  AddExploreAreaData(r) {
    var e = r.AreaId,
      t = new ExploreAreaData_1.ExploreAreaData(),
      r =
        (t.Initialize(r),
        this.QVt.set(e, t),
        this.XVt.push(t),
        ConfigManager_1.ConfigManager.ExploreProgressConfig.GetExploreProgressConfigListByArea(
          e,
        ));
    for (const a of r) t.AddExploreAreaItemData(a);
    return t.SortExploreAreaItemDataList(), t;
  }
  GetExploreAreaData(r) {
    return this.QVt.get(r);
  }
  GetExploreAreaDataMap() {
    return this.QVt;
  }
  GetExploreAreaDataList() {
    return this.XVt;
  }
  GetAreaSize() {
    return this.QVt.size;
  }
  GetNameId() {
    return this.WVt;
  }
  GetCountryExploreProgress() {
    var r = 100 * this.XVt.length;
    let e = 0;
    for (const t of this.XVt) e += t.GetProgress();
    return e / r;
  }
}
exports.ExploreCountryData = ExploreCountryData;
//# sourceMappingURL=ExploreCountryData.js.map
