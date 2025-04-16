"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EffectContext = void 0);
const UE = require("ue");
class EffectContext {
  constructor(t = void 0, s = void 0, i = !1) {
    (this.EntityId = void 0),
      (this.SourceObject = void 0),
      (this.DisablePostProcess = !1),
      (this.CreateFromType = 0),
      (this.PlayFlag = 0),
      (this.EntityId = t),
      (this.SourceObject = s),
      (this.DisablePostProcess = i);
  }
  ToKuroEffectContext(t) {
    (t.EntityId = this.EntityId ?? 0),
      (t.SourceObject = this.SourceObject),
      (t.DisablePostProcess = this.DisablePostProcess),
      (t.CreateFromType = this.CreateFromType),
      (t.PlayFlag = this.PlayFlag),
      (t.CreateFromBpEffectActor =
        this.SourceObject instanceof UE.BP_EffectActor_C);
  }
}
exports.EffectContext = EffectContext;
//# sourceMappingURL=EffectContext.js.map
