"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkeletalMeshEffectContext = void 0);
const cpp_1 = require("cpp"),
  EffectContext_1 = require("./EffectContext");
class SkeletalMeshEffectContext extends EffectContext_1.EffectContext {
  constructor() {
    super(...arguments), (this.SkeletalMeshComp = void 0);
  }
  ToKuroEffectContext(e) {
    super.ToKuroEffectContext(e),
      e instanceof cpp_1.FSkeletalMeshEffectContext &&
        (e.SkeletalMeshComponent = this.SkeletalMeshComp);
  }
}
exports.SkeletalMeshEffectContext = SkeletalMeshEffectContext;
//# sourceMappingURL=SkeletalMeshEffectContext.js.map
