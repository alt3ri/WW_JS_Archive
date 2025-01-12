"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AddBuffTrigger = void 0);
const ExtraEffectPassiveEffects_1 = require("./ExtraEffectPassiveEffects");
class AddBuffTrigger extends ExtraEffectPassiveEffects_1.PassiveEffects {
  constructor() {
    super(...arguments), (this.BuffIds = []);
  }
  InitParameters(t) {
    t = t.ExtraEffectParameters;
    (this.EventType = Number(t[0])),
      (this.TargetType = Number(t[1])),
      (this.BuffIds = t[2].split("#").map((t) => BigInt(t)));
  }
  OnExecute() {
    var t = this.GetEffectTarget(),
      s = this.InstigatorBuffComponent;
    if (t && s) {
      var e = this.OwnerBuffComponent.GetBuffByHandle(this.ActiveHandleId);
      if (e?.IsValid())
        for (const f of this.BuffIds)
          t.AddIterativeBuff(
            f,
            e,
            void 0,
            !0,
            `因为触发其它buff额外效果而添加（前置buff Id=${this.BuffId}, handle=${this.ActiveHandleId}）`,
          );
    }
  }
}
exports.AddBuffTrigger = AddBuffTrigger;
//# sourceMappingURL=ExtraEffectAddBuffTrigger.js.map
