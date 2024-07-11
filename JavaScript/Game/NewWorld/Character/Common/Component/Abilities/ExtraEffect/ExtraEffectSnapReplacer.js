"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SnapReplacer = void 0);
const ExtraEffectBase_1 = require("./ExtraEffectBase");
class SnapReplacer extends ExtraEffectBase_1.BuffEffect {
  OnExecute() {
    return this.InstigatorBuffComponent;
  }
  static ApplyEffects(e, t, r) {
    for (const s of t.BuffEffectManager.FilterById(27))
      if (
        s.InstigatorEntity?.Valid &&
        s.InstigatorEntity?.Entity.Id !== s.OwnerBuffComponent.GetEntity().Id &&
        s.Check(e, r)
      )
        return s.Execute();
    return t;
  }
}
exports.SnapReplacer = SnapReplacer;
// # sourceMappingURL=ExtraEffectSnapReplacer.js.map
