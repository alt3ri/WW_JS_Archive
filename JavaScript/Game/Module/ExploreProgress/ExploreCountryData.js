"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExploreCountryData = void 0);
const ConfigManager_1 = require("../../Manager/ConfigManager"),
  ExploreAreaData_1 = require("./ExploreAreaData");
class ExploreCountryData {
  constructor() {
    (this.CountryId = 0),
      (this.W5t = ""),
      (this.Q5t = new Map()),
      (this.X5t = []);
  }
  Initialize(r) {
    (this.CountryId = r.Id), (this.W5t = r.Title);
  }
  AddExploreAreaData(r) {
    var e = r.AreaId,
      t = new ExploreAreaData_1.ExploreAreaData(),
      r =
        (t.Initialize(r),
        this.Q5t.set(e, t),
        this.X5t.push(t),
        ConfigManager_1.ConfigManager.ExploreProgressConfig.GetExploreProgressConfigListByArea(
          e,
        ));
    for (const a of r) t.AddExploreAreaItemData(a);
    return t.SortExploreAreaItemDataList(), t;
  }
  GetExploreAreaData(r) {
    return this.Q5t.get(r);
  }
  GetExploreAreaDataMap() {
    return this.Q5t;
  }
  GetExploreAreaDataList() {
    return this.X5t;
  }
  GetAreaSize() {
    return this.Q5t.size;
  }
  GetNameId() {
    return this.W5t;
  }
  GetCountryExploreProgress() {
    var r = 100 * this.X5t.length;
    let e = 0;
    for (const t of this.X5t) e += t.GetProgress();
    return e / r;
  }
}
exports.ExploreCountryData = ExploreCountryData;
//# sourceMappingURL=ExploreCountryData.js.map
