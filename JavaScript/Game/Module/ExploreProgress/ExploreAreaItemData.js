"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExploreAreaItemData = void 0);
const ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager");
class ExploreAreaItemData {
  constructor() {
    (this.AreaId = 0),
      (this.ExploreType = 0),
      (this.ExploreProgressId = 0),
      (this.VVt = 0),
      (this.HPt = 0),
      (this.JXt = 0),
      (this.wHs = void 0),
      (this.bHs = 0),
      (this.qHs = void 0),
      (this.GHs = void 0),
      (this.OHs = !1),
      (this.NHs = 0);
  }
  Initialize(t) {
    (this.AreaId = t.Area),
      (this.ExploreType = t.ExploreType),
      (this.wHs = t.TypeName),
      (this.bHs = t.PhantomSkillId),
      (this.qHs = t.UnlockTextId),
      (this.GHs = t.LockTextId),
      (this.NHs = t.CountMode),
      (this.OHs = !1),
      0 !== this.bHs &&
        (this.OHs =
          ModelManager_1.ModelManager.RouletteModel.UnlockExploreSkillDataMap.has(
            this.bHs,
          ));
  }
  Refresh(t) {
    (this.VVt = t.DPs),
      (this.ExploreProgressId = t.APs),
      (this.HPt = t.CDs),
      (this.JXt = t.svs);
  }
  GetProgress() {
    return this.VVt;
  }
  GetCurrentCount() {
    return this.HPt;
  }
  GetTotalCount() {
    return this.JXt;
  }
  GetNameId() {
    return this.wHs;
  }
  IsPercent() {
    return 0 === this.NHs;
  }
  IsCompleted() {
    return (
      100 <= this.VVt || (0 < this.HPt && 0 < this.JXt && this.HPt >= this.JXt)
    );
  }
  HasPhantomSkill() {
    return 0 !== this.bHs;
  }
  GetUnlockTextId() {
    return this.qHs;
  }
  GetLockTextId() {
    return this.GHs;
  }
  GetIsPhantomSkillUnlock() {
    return this.OHs;
  }
  GetPhantomSkillHelpId() {
    var t = ConfigManager_1.ConfigManager.RouletteConfig.GetExploreConfigById(
      this.bHs,
    );
    if (t) return t.HelpId;
  }
}
exports.ExploreAreaItemData = ExploreAreaItemData;
//# sourceMappingURL=ExploreAreaItemData.js.map
