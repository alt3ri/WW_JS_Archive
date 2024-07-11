"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CountryExploreLevelRewardData = void 0);
const ConfigManager_1 = require("../../Manager/ConfigManager");
class CountryExploreLevelRewardData {
  constructor() {
    (this.lHs = ""),
      (this._Hs = ""),
      (this.uHs = ""),
      (this.i4i = 0),
      (this.cHs = 0),
      (this.mHs = 0),
      (this.dHs = ""),
      (this.Z5t = 0),
      (this.CHs = !1),
      (this.t5e = 0),
      (this.gHs = "");
  }
  Initialize(t) {
    (this.lHs = t.ScoreName),
      (this._Hs = t.Reward),
      (this.uHs = t.ScoreTexturePath),
      (this.i4i = t.ShowItem),
      (this.cHs = t.NeedScore),
      (this.mHs = t.Drop),
      (this.dHs = t.Pic),
      (this.Z5t = t.ExploreLevel),
      (this.CHs = t.Show),
      (this.t5e = t.Help);
    (t = t.Country),
      (t = ConfigManager_1.ConfigManager.InfluenceConfig.GetCountryConfig(t));
    this.gHs = t.Title;
  }
  GetScoreNameId() {
    return this.lHs;
  }
  GetRewardNameId() {
    return this._Hs;
  }
  GetScoreTexturePath() {
    return this.uHs;
  }
  GetPreviewItemConfigId() {
    return this.i4i;
  }
  GetMaxExploreScore() {
    return this.cHs;
  }
  GetCountryNameId() {
    return this.gHs;
  }
  GetDropItemNumMap() {
    return ConfigManager_1.ConfigManager.ExploreLevelConfig.GetDropShowInfo(
      this.mHs,
    );
  }
  GetExploreLevel() {
    return this.Z5t;
  }
  GetUnlockSpritePath() {
    return this.dHs;
  }
  IsShowUnlockSprite() {
    return this.CHs;
  }
  GetHelpId() {
    return this.t5e;
  }
}
exports.CountryExploreLevelRewardData = CountryExploreLevelRewardData;
//# sourceMappingURL=CountryExploreLevelRewardData.js.map
