"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DreamLinkWeaponModelHandle = void 0);
const MathCommon_1 = require("../../../Core/Utils/Math/MathCommon"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator");
class DreamLinkWeaponModelHandle {
  constructor(t) {
    (this.Actor = t),
      (this.nBr = 0),
      (this.Rxe = !1),
      (this.hwe = void 0),
      (this.sBr = void 0),
      (this.aBr = !1),
      (this.hwe = Rotator_1.Rotator.Create());
  }
  SetRotateParam(t, i = 1, s = !0) {
    (this.nBr = 0 !== t ? MathCommon_1.MathCommon.RoundAngle / t : 0),
      (this.sBr = i),
      (this.aBr = s);
  }
  StartRotate() {
    this.Rxe = !0;
  }
  StopRotate() {
    this.Rxe = !1;
  }
  Tick(t) {
    this.OnRotate(t);
  }
  OnRotate(t) {
    var i;
    !this.Rxe ||
      this.nBr <= 0 ||
      (this.Actor &&
        ((i = this.aBr ? 1 : -1),
        (t = this.nBr * t * i),
        0 === this.sBr
          ? (this.hwe.Pitch = t)
          : 1 === this.sBr
            ? (this.hwe.Yaw = t)
            : 2 === this.sBr && (this.hwe.Roll = t),
        this.Actor.K2_AddActorLocalRotation(
          this.hwe.ToUeRotator(),
          !1,
          void 0,
          !1,
        )));
  }
  Destroy() {
    this.Actor = void 0;
  }
}
exports.DreamLinkWeaponModelHandle = DreamLinkWeaponModelHandle;
//# sourceMappingURL=DreamLinkWeaponModelHandle.js.map
