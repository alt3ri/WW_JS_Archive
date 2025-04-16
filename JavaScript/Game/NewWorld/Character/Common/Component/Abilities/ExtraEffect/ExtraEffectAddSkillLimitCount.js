"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExtraEffectAddSkillLimitCount = void 0);
const CombatLog_1 = require("../../../../../../Utils/CombatLog"),
  ExtraEffectBase_1 = require("./ExtraEffectBase");
class ExtraEffectAddSkillLimitCount extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments),
      (this.NXo = void 0),
      (this.OXo = void 0),
      (this.kXo = 0);
  }
  InitParameters(t) {
    t = t.ExtraEffectParameters;
    (this.NXo = t[0].split("#")),
      (this.OXo = t[1].split("#").map((t) => Number(t))),
      0 === Number(t[2] ?? 0) ? (this.kXo = 0) : (this.kXo = 1);
  }
  OnCreated() {
    var t = this.FXo(),
      e = t.CheckGetComponent(205);
    if (e)
      for (let t = 0; t < this.NXo.length; t++) {
        var s = Number(this.NXo[t]);
        e.AddLimitCount(s, this.OXo[t]);
      }
    else
      CombatLog_1.CombatLog.Error(
        "Buff",
        t,
        "buff修改技能次数，但是该实体没有技能CD组件",
        ["", this.BuffId],
      );
  }
  OnRemoved() {
    var t = this.FXo(),
      e = t.CheckGetComponent(205);
    if (e)
      for (let t = 0; t < this.NXo.length; t++) {
        var s = Number(this.NXo[t]);
        e.AddLimitCount(s, -this.OXo[t]);
      }
    else
      CombatLog_1.CombatLog.Error(
        "Buff",
        t,
        "移除buff修改技能次数效果，但是该实体没有技能CD组件",
        ["", this.BuffId],
      );
  }
  OnExecute() {}
  FXo() {
    return 0 !== this.kXo ? this.InstigatorEntity.Entity : this.OwnerEntity;
  }
}
exports.ExtraEffectAddSkillLimitCount = ExtraEffectAddSkillLimitCount;
//# sourceMappingURL=ExtraEffectAddSkillLimitCount.js.map
