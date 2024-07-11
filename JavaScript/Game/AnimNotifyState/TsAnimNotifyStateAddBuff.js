"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyStateAddBuff extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments), (this.BuffId = void 0), (this.施加目标 = 0);
  }
  K2_NotifyBegin(t, e, r) {
    t = t.GetOwner();
    if (t instanceof TsBaseCharacter_1.default) {
      var t = t?.CharacterActorComponent?.Entity,
        s = this.GetBuffTarget(t),
        a = t?.GetComponent(157),
        t = t.GetComponent(33);
      if (!s) return !0;
      t?.SetCurSkillAnIndex(this.exportIndex),
        s.AddBuffFromAnimNotify(this.BuffId, a, {
          InstigatorId: s.CreatureDataId,
          Reason: `动画${e?.GetName()}的ANS添加`,
        });
    }
    return !0;
  }
  K2_NotifyEnd(t, e) {
    var t = t.GetOwner();
    return (
      t instanceof TsBaseCharacter_1.default &&
        ((t = t?.CharacterActorComponent?.Entity),
        (t = this.GetBuffTarget(t))?.Valid) &&
        t.RemoveBuff(this.BuffId, -1, `动画${e?.GetName()}的ANS移除`),
      !0
    );
  }
  GetNotifyName() {
    return "添加BUFF";
  }
  GetBuffTarget(t) {
    return (
      this.施加目标 && 1 === this.施加目标
        ? t?.GetComponent(33)?.SkillTarget?.Entity
        : t
    )?.GetComponent(157);
  }
}
exports.default = TsAnimNotifyStateAddBuff;
//# sourceMappingURL=TsAnimNotifyStateAddBuff.js.map
