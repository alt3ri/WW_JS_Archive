"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CountryExploreLevelRewardData = void 0);
const ConfigManager_1 = require("../../Manager/ConfigManager");
class CountryExploreLevelRewardData {
  constructor() {
    (this.SHs = ""),
      (this.EHs = ""),
      (this.yHs = ""),
      (this.i4i = 0),
      (this.IHs = 0),
      (this.THs = 0),
      (this.LHs = ""),
      (this.Z5t = 0),
      (this.DHs = !1),
      (this.t5e = 0),
      (this.AHs = "");
  }
  Initialize(t) {
    (this.SHs = t.ScoreName),
      (this.EHs = t.Reward),
      (this.yHs = t.ScoreTexturePath),
      (this.i4i = t.ShowItem),
      (this.IHs = t.NeedScore),
      (this.THs = t.Drop),
      (this.LHs = t.Pic),
      (this.Z5t = t.ExploreLevel),
      (this.DHs = t.Show),
      (this.t5e = t.Help);
    (t = t.Country),
      (t = ConfigManager_1.ConfigManager.InfluenceConfig.GetCountryConfig(t));
    this.AHs = t.Title;
  }
  GetScoreNameId() {
    return this.SHs;
  }
  GetRewardNameId() {
    return this.EHs;
  }
  GetScoreTexturePath() {
    return this.yHs;
  }
  GetPreviewItemConfigId() {
    return this.i4i;
  }
  GetMaxExploreScore() {
    return this.IHs;
  }
  GetCountryNameId() {
    return this.AHs;
  }
  GetDropItemNumMap() {
    return ConfigManager_1.ConfigManager.ExploreLevelConfig.GetDropShowInfo(
      this.THs,
    );
  }
  GetExploreLevel() {
    return this.Z5t;
  }
  GetUnlockSpritePath() {
    return this.LHs;
  }
  IsShowUnlockSprite() {
    return this.DHs;
  }
  GetHelpId() {
    return this.t5e;
  }
}
exports.CountryExploreLevelRewardData = CountryExploreLevelRewardData;
//# sourceMappingURL=CountryExploreLevelRewardData.js.map
