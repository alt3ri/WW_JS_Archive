"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  PostProcessTriggerStateBase_1 = require("./PostProcessTriggerStateBase");
class PostProcessTriggerStateInside extends PostProcessTriggerStateBase_1.default {
  constructor() {
    super(...arguments), (this.Olr = 0), (this.klr = !1), (this.j3 = -0);
  }
  OnEnter(s) {
    var t = this.GetTargetDefaultValue();
    (this.Owner.GetPostProcessComponent().BlendWeight = t),
      (this.Olr = t),
      (this.klr = !1),
      (this.j3 = 0);
  }
  OnUpdate(s) {
    var t = this.GetTargetDefaultValue();
    this.klr
      ? ((this.j3 += s / 1e3),
        (s = MathUtils_1.MathUtils.Clamp(
          this.j3 / this.Owner.TransitionTime,
          0,
          1,
        )),
        (this.Owner.GetPostProcessComponent().BlendWeight =
          MathUtils_1.MathUtils.Lerp(this.Olr, t, s)),
        1 <= s && ((this.klr = !1), (this.j3 = 0), (this.Olr = t)))
      : this.Olr !== t && ((this.klr = !0), (this.j3 = 0));
  }
}
exports.default = PostProcessTriggerStateInside;
//# sourceMappingURL=PostProcessTriggerStateInside.js.map
