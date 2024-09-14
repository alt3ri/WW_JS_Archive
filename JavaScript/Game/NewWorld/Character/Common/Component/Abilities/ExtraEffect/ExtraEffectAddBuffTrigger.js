"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AddBuffTrigger = void 0);
const Macro_1 = require("../../../../../../../Core/Preprocessor/Macro"),
  ExtraEffectPassiveEffects_1 = require("./ExtraEffectPassiveEffects");
class AddBuffTrigger extends ExtraEffectPassiveEffects_1.PassiveEffects {
  constructor() {
    super(...arguments), (this.BuffIds = []);
  }
  InitParameters(e) {
    e = e.ExtraEffectParameters;
    (this.EventType = Number(e[0])),
      (this.TargetType = Number(e[1])),
      (this.BuffIds = e[2].split("#").map((e) => BigInt(e)));
  }
  OnExecute() {
    var e = this.GetEffectTarget(),
      s = this.InstigatorBuffComponent;
    if (e && s) {
      var t = this.OwnerBuffComponent.GetBuffByHandle(this.ActiveHandleId);
      if (t?.IsValid())
        for (const r of this.BuffIds)
          e.AddIterativeBuff(
            r,
            t,
            void 0,
            !0,
            `因为触发其它buff额外效果而添加（前置buff Id=${this.BuffId}, handle=${this.ActiveHandleId}）`,
          );
    }
  }
}
exports.AddBuffTrigger = AddBuffTrigger;
//# sourceMappingURL=ExtraEffectAddBuffTrigger.js.map
