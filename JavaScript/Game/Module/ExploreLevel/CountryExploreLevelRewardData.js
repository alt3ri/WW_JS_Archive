"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CountryExploreLevelRewardData = void 0);
const ConfigManager_1 = require("../../Manager/ConfigManager");
class CountryExploreLevelRewardData {
  constructor() {
    (this.rTn = ""),
      (this.nTn = ""),
      (this.sTn = ""),
      (this.i3i = 0),
      (this.aTn = 0),
      (this.hTn = 0),
      (this.lTn = ""),
      (this.Z4t = 0),
      (this._Tn = !1),
      (this.O3e = 0),
      (this.uTn = "");
  }
  Initialize(t) {
    (this.rTn = t.ScoreName),
      (this.nTn = t.Reward),
      (this.sTn = t.ScoreTexturePath),
      (this.i3i = t.ShowItem),
      (this.aTn = t.NeedScore),
      (this.hTn = t.Drop),
      (this.lTn = t.Pic),
      (this.Z4t = t.ExploreLevel),
      (this._Tn = t.Show),
      (this.O3e = t.Help);
    (t = t.Country),
      (t = ConfigManager_1.ConfigManager.InfluenceConfig.GetCountryConfig(t));
    this.uTn = t.Title;
  }
  GetScoreNameId() {
    return this.rTn;
  }
  GetRewardNameId() {
    return this.nTn;
  }
  GetScoreTexturePath() {
    return this.sTn;
  }
  GetPreviewItemConfigId() {
    return this.i3i;
  }
  GetMaxExploreScore() {
    return this.aTn;
  }
  GetCountryNameId() {
    return this.uTn;
  }
  GetDropItemNumMap() {
    return ConfigManager_1.ConfigManager.ExploreLevelConfig.GetDropShowInfo(
      this.hTn,
    );
  }
  GetExploreLevel() {
    return this.Z4t;
  }
  GetUnlockSpritePath() {
    return this.lTn;
  }
  IsShowUnlockSprite() {
    return this._Tn;
  }
  GetHelpId() {
    return this.O3e;
  }
}
exports.CountryExploreLevelRewardData = CountryExploreLevelRewardData;
//# sourceMappingURL=CountryExploreLevelRewardData.js.map
