"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExploreAreaData = void 0);
const ConfigManager_1 = require("../../Manager/ConfigManager"),
  ExploreAreaItemData_1 = require("./ExploreAreaItemData");
class ExploreAreaData {
  constructor() {
    (this.AreaId = 0),
      (this.VVt = 0),
      (this.HVt = new Map()),
      (this.jVt = []),
      (this.WVt = ""),
      (this.KVt = 0);
  }
  Initialize(t) {
    (this.AreaId = t.AreaId),
      (this.WVt = t.Title),
      (this.KVt = t.SortIndex),
      (this.VVt = 0);
  }
  Clear() {
    (this.AreaId = 0), (this.VVt = 0), this.HVt.clear();
  }
  AddExploreAreaItemData(t) {
    var e,
      r = t.ExploreType;
    this.HVt.has(r) ||
      ((e = new ExploreAreaItemData_1.ExploreAreaItemData()).Initialize(t),
      this.HVt.set(r, e),
      this.jVt.push(e));
  }
  SortExploreAreaItemDataList() {
    this.jVt.sort((t, e) => {
      return t.ExploreProgressId - e.ExploreProgressId;
    });
  }
  Refresh(t) {
    this.VVt = t.DPs;
    var e = ConfigManager_1.ConfigManager.ExploreProgressConfig;
    for (const a of t.wVn) {
      var r = e.GetExploreProgressConfigById(a.APs).ExploreType;
      this.HVt.get(r)?.Refresh(a);
    }
  }
  GetExploreAreaItemData(t) {
    return this.HVt.get(t);
  }
  GetAllExploreAreaItemData() {
    return this.jVt;
  }
  GetProgress() {
    return this.VVt;
  }
  GetNameId() {
    return this.WVt;
  }
  GetSortIndex() {
    return this.KVt;
  }
}
exports.ExploreAreaData = ExploreAreaData;
//# sourceMappingURL=ExploreAreaData.js.map
