"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EffectAudioContext = void 0);
const cpp_1 = require("cpp"),
  EffectContext_1 = require("./EffectContext");
class EffectAudioContext extends EffectContext_1.EffectContext {
  constructor() {
    super(...arguments), (this.FromPrimaryRole = !1);
  }
  ToKuroEffectContext(t) {
    super.ToKuroEffectContext(t),
      t instanceof cpp_1.FEffectAudioContext &&
        (t.FromPrimaryRole = this.FromPrimaryRole);
  }
}
exports.EffectAudioContext = EffectAudioContext;
//# sourceMappingURL=EffectAudioContext.js.map
