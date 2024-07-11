"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MultiEffectBuffBall = void 0);
const UE = require("ue"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  EffectSystem_1 = require("../../../../Effect/EffectSystem"),
  MultiEffectBase_1 = require("./MultiEffectBase");
class MultiEffectBuffBall extends MultiEffectBase_1.default {
  constructor() {
    super(...arguments),
      (this.BaseNum = 0),
      (this.SpinSpeed = -0),
      (this.Radius = -0),
      (this.ilr = -0),
      (this.BaseAngle = -0),
      (this.TempUeVector = void 0);
  }
  Init(t) {
    super.Init(t),
      (this.BaseNum = t.get("BaseNum")),
      (this.SpinSpeed = t.get("SpinSpeed")),
      (this.Radius = t.get("Radius")),
      (this.TempUeVector = new UE.Vector()),
      (this.ilr = 0.01),
      (this.BaseAngle = 0);
  }
  GetDesiredNum(t) {
    return Math.ceil(this.BaseNum * t - this.ilr);
  }
  Update(t, s, e) {
    var i = e.length,
      t = ((this.BaseAngle -= t * this.SpinSpeed), this.BaseNum * s),
      s = Math.floor(t),
      t = t - s,
      h = (2 * Math.PI) / MathUtils_1.MathUtils.Lerp(s, s + 1, t),
      f = Math.min(s, i);
    for (let t = 0; t < f; t++) {
      var a = h * t + this.BaseAngle,
        a =
          (this.TempUeVector.Set(
            Math.cos(a) * this.Radius,
            Math.sin(a) * this.Radius,
            0,
          ),
          e[t]);
      EffectSystem_1.EffectSystem.IsValid(a) &&
        EffectSystem_1.EffectSystem.GetEffectActor(
          a,
        ).K2_SetActorRelativeLocation(this.TempUeVector, !1, void 0, !0);
    }
    f < i &&
      ((s = h * f + this.BaseAngle),
      (i = (2 - t) * t * this.Radius),
      this.TempUeVector.Set(Math.cos(s) * i, Math.sin(s) * i, 0),
      (t = e[f]),
      EffectSystem_1.EffectSystem.IsValid(t)) &&
      EffectSystem_1.EffectSystem.GetEffectActor(t).K2_SetActorRelativeLocation(
        this.TempUeVector,
        !1,
        void 0,
        !0,
      );
  }
}
exports.MultiEffectBuffBall = MultiEffectBuffBall;
//# sourceMappingURL=MultiEffectBuffBall.js.map
