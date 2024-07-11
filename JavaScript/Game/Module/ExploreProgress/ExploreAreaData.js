"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExploreAreaData = void 0);
const ConfigManager_1 = require("../../Manager/ConfigManager"),
  ExploreAreaItemData_1 = require("./ExploreAreaItemData");
class ExploreAreaData {
  constructor() {
    (this.AreaId = 0),
      (this.V5t = 0),
      (this.H5t = new Map()),
      (this.j5t = []),
      (this.W5t = ""),
      (this.K5t = 0);
  }
  Initialize(t) {
    (this.AreaId = t.AreaId),
      (this.W5t = t.Title),
      (this.K5t = t.SortIndex),
      (this.V5t = 0);
  }
  Clear() {
    (this.AreaId = 0), (this.V5t = 0), this.H5t.clear();
  }
  AddExploreAreaItemData(t) {
    var e,
      r = t.ExploreType;
    this.H5t.has(r) ||
      ((e = new ExploreAreaItemData_1.ExploreAreaItemData()).Initialize(t),
      this.H5t.set(r, e),
      this.j5t.push(e));
  }
  SortExploreAreaItemDataList() {
    this.j5t.sort((t, e) => {
      var r = t.SortIndex,
        a = e.SortIndex;
      return r !== a ? r - a : t.ExploreProgressId - e.ExploreProgressId;
    });
  }
  Refresh(t) {
    this.V5t = t.lLs;
    var e = ConfigManager_1.ConfigManager.ExploreProgressConfig;
    for (const a of t.e5n) {
      var r = e.GetExploreProgressConfigById(a._Ls).ExploreType;
      this.H5t.get(r)?.Refresh(a);
    }
  }
  GetExploreAreaItemData(t) {
    return this.H5t.get(t);
  }
  GetAllExploreAreaItemData() {
    return this.j5t;
  }
  GetProgress() {
    return this.V5t;
  }
  GetNameId() {
    return this.W5t;
  }
  GetSortIndex() {
    return this.K5t;
  }
}
exports.ExploreAreaData = ExploreAreaData;
//# sourceMappingURL=ExploreAreaData.js.map
