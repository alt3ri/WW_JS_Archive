"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AddBattleFlag = void 0);
const ExtraEffectBase_1 = require("./ExtraEffectBase");
class AddBattleFlag extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments),
      (this.xFc = 1),
      (this.KXo = []),
      (this.UFc = []),
      (this.DFc = "");
  }
  InitParameters(t) {
    switch (
      ((this.xFc = Number(t.ExtraEffectParameters[0])),
      (this.DFc = t.ExtraEffectParameters[2]),
      this.xFc)
    ) {
      case 2:
        this.KXo = t.ExtraEffectParameters[1].split("#").map((t) => Number(t));
        break;
      case 3:
        this.UFc = t.ExtraEffectParameters[1].split("#").map((t) => Number(t));
    }
  }
  OnExecute() {
    return this.DFc;
  }
  GetDebugEffectString() {
    let t = "";
    switch (this.xFc) {
      case 1:
        t = "所有技能";
        break;
      case 2:
        t = "技能Id " + this.KXo;
        break;
      case 3:
        t = "技能类型 " + this.UFc;
    }
    return `添加战斗标记 ${this.DFc} 到 ` + t;
  }
  CheckExecutable() {
    return this.OwnerBuffComponent?.HasBuffAuthority() ?? !1;
  }
  static ApplyEffects(t, e) {
    e.BattleFlags = [];
    var s = t.GetComponent(172),
      t = s?.BuffEffectManager;
    if (t)
      for (const r of t.FilterById(76))
        if (r.Check({}, s))
          switch (r.xFc) {
            case 1:
              e.BattleFlags.push(r.Execute());
              break;
            case 2:
              r.KXo.includes(e.SkillId) && e.BattleFlags.push(r.Execute());
              break;
            case 3:
              r.UFc.includes(e.SkillInfo.SkillGenre) &&
                e.BattleFlags.push(r.Execute());
          }
  }
}
exports.AddBattleFlag = AddBattleFlag;
//# sourceMappingURL=ExtraEffectAddBattleFlag.js.map
