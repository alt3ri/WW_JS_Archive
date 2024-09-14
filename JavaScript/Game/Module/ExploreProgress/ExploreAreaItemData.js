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
      (this.KHs = void 0),
      (this.QHs = 0),
      (this.$Hs = void 0),
      (this.XHs = void 0),
      (this.YHs = !1),
      (this.JHs = 0);
  }
  Initialize(t) {
    (this.AreaId = t.Area),
      (this.ExploreType = t.ExploreType),
      (this.KHs = t.TypeName),
      (this.QHs = t.PhantomSkillId),
      (this.$Hs = t.UnlockTextId),
      (this.XHs = t.LockTextId),
      (this.JHs = t.CountMode),
      (this.YHs = !1),
      0 !== this.QHs &&
        (this.YHs =
          ModelManager_1.ModelManager.RouletteModel.UnlockExploreSkillDataMap.has(
            this.QHs,
          ));
  }
  Refresh(t) {
    (this.VVt = t.BPs),
      (this.ExploreProgressId = t.qPs),
      (this.HPt = t.EDs),
      (this.JXt = t.dvs);
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
    return this.KHs;
  }
  IsPercent() {
    return 0 === this.JHs;
  }
  IsCompleted() {
    return (
      100 <= this.VVt || (0 < this.HPt && 0 < this.JXt && this.HPt >= this.JXt)
    );
  }
  HasPhantomSkill() {
    return 0 !== this.QHs;
  }
  GetUnlockTextId() {
    return this.$Hs;
  }
  GetLockTextId() {
    return this.XHs;
  }
  GetIsPhantomSkillUnlock() {
    return this.YHs;
  }
  GetPhantomSkillHelpId() {
    var t = ConfigManager_1.ConfigManager.RouletteConfig.GetExploreConfigById(
      this.QHs,
    );
    if (t) return t.HelpId;
  }
}
exports.ExploreAreaItemData = ExploreAreaItemData;
//# sourceMappingURL=ExploreAreaItemData.js.map
