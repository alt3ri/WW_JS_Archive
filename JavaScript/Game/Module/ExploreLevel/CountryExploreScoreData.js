"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CountryExploreScoreData = void 0);
const ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager");
class CountryExploreScoreData {
  constructor() {
    (this.CountryId = 0),
      (this.AreaId = 0),
      (this.Progress = 0),
      (this.LastProgress = 0),
      (this.Score = 0),
      (this.aVt = !1),
      (this.hVt = void 0);
  }
  Initialize(e, t, r, i, s) {
    (this.CountryId = e),
      (this.AreaId = t),
      (this.Progress = r),
      (this.LastProgress = i),
      (this.Score = s),
      (this.aVt = !1),
      (this.hVt = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(t));
  }
  SetReceived(e) {
    this.aVt = e;
  }
  GetIsReceived() {
    return this.aVt;
  }
  GetAreaNameTextId() {
    return this.hVt.Title;
  }
  GetAreaConfig() {
    return this.hVt;
  }
  CanReceive() {
    return this.GetAreaProgress() >= this.Progress && !this.aVt;
  }
  GetAreaProgress() {
    return ModelManager_1.ModelManager.ExploreProgressModel.GetExploreAreaData(
      this.AreaId,
    ).GetProgress();
  }
}
exports.CountryExploreScoreData = CountryExploreScoreData;
//# sourceMappingURL=CountryExploreScoreData.js.map
