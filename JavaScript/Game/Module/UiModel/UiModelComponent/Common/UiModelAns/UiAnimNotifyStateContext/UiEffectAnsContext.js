"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiEffectAnsContext = void 0);
const UiAnsContextBase_1 = require("./UiAnsContextBase");
class UiEffectAnsContext extends UiAnsContextBase_1.UiAnsContextBase {
  constructor(t, s, i, e, n, o, h, r, c, x) {
    super(),
      (this.EffectPath = t),
      (this.MeshComponent = s),
      (this.Socket = i),
      (this.Attached = e),
      (this.AttachLocationOnly = n),
      (this.Location = o),
      (this.Rotation = h),
      (this.Scale = r),
      (this.PlayOnEnd = c),
      (this.OnEffectSpawn = x),
      (this.Handle = void 0);
  }
  IsValid() {
    return (
      void 0 !== this.EffectPath &&
      void 0 !== this.Socket &&
      void 0 !== this.MeshComponent
    );
  }
  IsEqual(t) {
    return (
      t instanceof UiEffectAnsContext &&
      !(!this.IsValid() || !t.IsValid()) &&
      this.EffectPath === t.EffectPath &&
      this.Socket.op_Equality(t.Socket) &&
      this.MeshComponent === t.MeshComponent
    );
  }
}
exports.UiEffectAnsContext = UiEffectAnsContext;
//# sourceMappingURL=UiEffectAnsContext.js.map
