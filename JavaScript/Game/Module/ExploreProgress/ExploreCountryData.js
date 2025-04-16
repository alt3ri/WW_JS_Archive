"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExploreCountryData = void 0);
const ConfigManager_1 = require("../../Manager/ConfigManager"),
  ExploreAreaData_1 = require("./ExploreAreaData"),
  ExploreStateData_1 = require("./ExploreStateData");
class ExploreCountryData {
  constructor() {
    (this.CountryId = 0),
      (this.Icon = ""),
      (this.TitleId = ""),
      (this.QVt = new Map()),
      (this.XVt = []),
      (this.TOl = new Map());
  }
  Initialize(t) {
    (this.CountryId = t.Id), (this.TitleId = t.Title), (this.Icon = t.Icon);
  }
  AddExploreAreaData(t) {
    var e = t.AreaId,
      a = new ExploreAreaData_1.ExploreAreaData(),
      t =
        (a.Initialize(t),
        this.QVt.set(e, a),
        this.XVt.push(a),
        ConfigManager_1.ConfigManager.ExploreProgressConfig.GetExploreProgressConfigListByArea(
          e,
        ));
    for (const s of t) a.AddExploreAreaItemData(s);
    a.AddExploreAreaItemDataFinish();
    e = a.StateId;
    let r = void 0;
    return (
      this.TOl.has(e)
        ? (r = this.TOl.get(e))
        : ((r = new ExploreStateData_1.ExploreStateData()),
          this.TOl.set(e, r),
          r.Initialize(e, this.CountryId)),
      r.PushAreaData(a),
      a
    );
  }
  GetExploreAreaData(t) {
    return this.QVt.get(t);
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
    return this.TitleId;
  }
  GetCountryExploreProgress() {
    var t = 100 * this.XVt.length;
    let e = 0;
    for (const a of this.XVt) e += a.GetProgress();
    return e / t;
  }
  GetStateDataList() {
    var t = Array.from(this.TOl.values());
    return t.length <= 1 || t.sort((t, e) => t.StateId - e.StateId), t;
  }
  GetAreaDataListByStateId(t) {
    return this.GetStateDataByStateId(t)?.ExploreAreaDataList;
  }
  GetStateDataByStateId(t) {
    return this.TOl.get(t);
  }
  HasCanTakeStageReward() {
    return this.XVt.some((t) => t.HasCanTakeStageReward());
  }
  UpdateStateAreaDataListSort() {
    this.TOl.forEach((t) => {
      t.ExploreAreaDataList.sort((t, e) =>
        t.GetSortIndex() !== e.GetSortIndex()
          ? t.GetSortIndex() - e.GetSortIndex()
          : t.AreaId - e.AreaId,
      );
    });
  }
}
exports.ExploreCountryData = ExploreCountryData;
//# sourceMappingURL=ExploreCountryData.js.map
