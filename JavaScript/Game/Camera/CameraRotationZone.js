"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CameraRotationZone = void 0);
const UE = require("ue"),
  Log_1 = require("../../Core/Common/Log"),
  Macro_1 = require("../../Core/Preprocessor/Macro"),
  MathCommon_1 = require("../../Core/Utils/Math/MathCommon"),
  Quat_1 = require("../../Core/Utils/Math/Quat"),
  Rotator_1 = require("../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../Core/Utils/MathUtils"),
  GlobalData_1 = require("../GlobalData"),
  CharacterUnifiedStateTypes_1 = require("../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
  ColorUtils_1 = require("../Utils/ColorUtils"),
  CameraUtility_1 = require("./CameraUtility"),
  CAMERA_DIRECTION_LENGTH = 500,
  CAMERA_DIRECTION_ARROW_SIZE = 2e3;
class CameraRotationZone {
  constructor() {
    (this.Hh = void 0),
      (this.e1h = void 0),
      (this.t1h = void 0),
      (this.i1h = void 0),
      (this.Whl = void 0),
      (this.Qhl = void 0),
      (this.Khl = 0),
      (this.r1h = 0),
      (this.$hl = 0),
      (this.Xhl = 0),
      (this.Yhl = 0),
      (this.zhl = 0),
      (this.az = Quat_1.Quat.Create()),
      (this.Gue = Rotator_1.Rotator.Create()),
      (this.c1e = new Set()),
      (this.GVc = !1);
  }
  Init(t) {
    this.Hh = t;
  }
  SetCharacter(t) {
    (this.e1h = t),
      this.e1h?.Valid &&
        ((this.t1h = this.e1h.Entity.GetComponent(61)),
        (this.i1h = this.e1h.Entity.GetComponent(3)),
        (this.Whl = this.e1h.Entity.GetComponent(58)),
        (this.Qhl = this.e1h.Entity.GetComponent(175)),
        Log_1.Log.CheckDebug()) &&
        Log_1.Log.Debug("Camera", 57, "CameraRotationZone init");
  }
  UpdateInputState(t) {
    var i, s, h;
    0 === this.Hh.CameraZoneMode ||
      0 < this.c1e.size ||
      ((i = this.i1h.InputDirectProxy),
      ([s, h] =
        (this.IsHasPitchMovement() ? (this.Yhl += t) : (this.Yhl = 0),
        this.t1h.GetCameraInput())),
      MathUtils_1.MathUtils.IsNearlyZero(
        h,
        MathUtils_1.MathUtils.KindaSmallNumber,
      )
        ? (this.zhl += t)
        : (this.zhl = 0),
      MathUtils_1.MathUtils.IsNearlyZero(
        i.Y,
        MathUtils_1.MathUtils.KindaSmallNumber,
      )
        ? (this.$hl = 0)
        : (this.$hl += t),
      MathUtils_1.MathUtils.IsNearlyZero(
        s,
        MathUtils_1.MathUtils.KindaSmallNumber,
      )
        ? (this.Xhl += t)
        : (this.Xhl = 0));
  }
  UpdatePitchZone(i) {
    if (this.o1h() && 0 !== this.Hh.CameraZoneMode) {
      let t = this.Hh.PlayerRotatorInGravity.Pitch;
      1 === this.Hh.CameraZoneMode &&
        ((s = this.i1h.ActorVelocityProxy),
        this.Hh.IsInNormalGravityMode()
          ? (MathUtils_1.MathUtils.LookRotationForwardFirst(
              s,
              Vector_1.Vector.UpVectorProxy,
              this.az,
            ),
            this.az.Rotator(this.Gue))
          : (s.Rotation(this.Gue),
            CameraUtility_1.CameraUtility.GetRotatorInGravity(
              this.Gue,
              this.Gue,
            )),
        (t = this.Gue.Pitch));
      var s = CameraUtility_1.CameraUtility.GetPitchInGravity(
          this.Hh.DesiredCamera.ArmRotation,
        ),
        h = MathUtils_1.MathUtils.WrapAngle(t - s),
        s = (this.Jhl(h, s), this.Zhl(t, s, h, i));
      CameraUtility_1.CameraUtility.SetPitchInGravity(
        this.Hh.DesiredCamera.ArmRotation,
        s,
        this.Hh.DesiredCamera.ArmRotation,
      );
    }
  }
  Jhl(t, i) {
    t >= this.Hh.PitchSoftZoneMin &&
      t <= this.Hh.PitchSoftZoneMax &&
      (this.Khl = 2),
      this.e1l()
        ? (this.Khl = 0)
        : this.t1h.HasCameraInput() || 0 < this.c1e.size
          ? (this.Khl = 1)
          : this.t1l()
            ? 2 !== this.Khl && this.l1h() && (this.Khl = 3)
            : this.i1l() && (this.Khl = 4),
      this.GVc &&
        Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Camera",
          57,
          "[PitchZone stage1]",
          ["State", this.Khl],
          ["targetPitch", i.toFixed(2)],
          ["autoFlight", this.t1h.IsInCameraDrivenAutoFlightMode()],
          ["rollback", 0 < this.zhl && !this.IsPitchRollback()],
        );
  }
  Zhl(t, i, s, h) {
    if (0 === this.Khl) return i;
    var a = MathUtils_1.MathUtils.Lerp(
        this.Hh.PitchZoneSpeedMin,
        this.Hh.PitchZoneSpeedMax,
        MathUtils_1.MathUtils.Clamp(
          Math.abs(s) / this.Hh.PitchSoftZoneMax,
          0,
          1,
        ),
      ),
      h = h * a;
    let e = i;
    return (
      1 !== this.Khl &&
        ((e = this.pQl(i, t, h, s)),
        (i = MathUtils_1.MathUtils.WrapAngle(t - e)) >=
          this.Hh.PitchSoftZoneMin) &&
        i <= this.Hh.PitchSoftZoneMax &&
        (this.Khl = 2),
      this.GVc &&
        Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Camera",
          57,
          "[PitchZone stage2]",
          ["State", this.Khl],
          ["actorPitch", t.toFixed(2)],
          ["targetPitch", e.toFixed(2)],
          ["speed", a.toFixed(2)],
          ["deltaPitch", s.toFixed(2)],
          ["targetDeltaPitch", h.toFixed(2)],
        ),
      (e = this.vQl(
        2 === this.Khl,
        t,
        e,
        this.Hh.PitchSoftZoneMin,
        this.Hh.PitchSoftZoneMax,
        this.Hh.PitchDeadZoneMin,
        this.Hh.PitchDeadZoneMax,
      )),
      this.GVc &&
        Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Camera",
          57,
          "[PitchZone stage3]",
          ["State", this.Khl],
          ["targetPitch", e.toFixed(2)],
        ),
      e
    );
  }
  UpdateYawZone(t) {
    this.o1h() &&
      0 !== this.Hh.CameraZoneMode &&
      (this.n1h(),
      (t = this.s1h(t)),
      CameraUtility_1.CameraUtility.SetYawInGravity(
        this.Hh.DesiredCamera.ArmRotation,
        t,
        this.Hh.DesiredCamera.ArmRotation,
      ));
  }
  n1h() {
    var t = this.Hh.PlayerRotatorInGravity.Yaw,
      i = CameraUtility_1.CameraUtility.GetYawInGravity(
        this.Hh.DesiredCamera.ArmRotation,
      ),
      t = MathUtils_1.MathUtils.WrapAngle(t - i);
    t >= this.Hh.YawSoftZoneMin &&
      t <= this.Hh.YawSoftZoneMax &&
      (this.r1h = 2),
      this.o1l()
        ? (this.r1h = 0)
        : (this.a1h() && this.t1h.HasCameraInput()) || 0 < this.c1e.size
          ? (this.r1h = 1)
          : this.h1h()
            ? 2 !== this.r1h && this.l1h() && (this.r1h = 3)
            : this.n1l() &&
              (2 === this.r1h
                ? (this.r1h = 5)
                : 5 !== this.r1h && (this.r1h = 4));
  }
  s1h(t) {
    if (0 === this.r1h)
      return CameraUtility_1.CameraUtility.GetYawInGravity(
        this.Hh.DesiredCamera.ArmRotation,
      );
    var i,
      s,
      h = this.Hh.PlayerRotatorInGravity.Yaw,
      a = CameraUtility_1.CameraUtility.GetYawInGravity(
        this.Hh.DesiredCamera.ArmRotation,
      ),
      e = MathUtils_1.MathUtils.WrapAngle(h - a),
      t =
        t *
        MathUtils_1.MathUtils.Lerp(
          this.Hh.YawZoneSpeedMin,
          this.Hh.YawZoneSpeedMax,
          MathUtils_1.MathUtils.Clamp(
            Math.abs(e) / this.Hh.YawDeadZoneMax,
            0,
            1,
          ),
        );
    let r = a;
    return (
      2 === this.r1h
        ? (r = this.u1h(a, t))
        : 3 === this.r1h
          ? ((r = this.c1h(a, t, e, r)),
            (i = this.m1h() ? this.Hh.YawSoftZoneMin : this.Hh.YawSoftZoneMax),
            (s = MathUtils_1.MathUtils.WrapAngle(h - r)),
            ((e < 0 && i < s) || (0 < e && s < i)) && (this.r1h = 2))
          : (4 !== this.r1h && 5 !== this.r1h) ||
            ((r = this.d1h(a, h, t, e)),
            (s = MathUtils_1.MathUtils.WrapAngle(h - r)) >=
              this.Hh.YawSoftZoneMin &&
              s <= this.Hh.YawSoftZoneMax &&
              (this.r1h = 2)),
      (r = this.vQl(
        2 === this.r1h || 5 === this.r1h,
        h,
        r,
        this.Hh.YawSoftZoneMin,
        this.Hh.YawSoftZoneMax,
        this.Hh.YawDeadZoneMin,
        this.Hh.YawDeadZoneMax,
      ))
    );
  }
  u1h(t, i) {
    return MathUtils_1.MathUtils.WrapAngle(
      t + (this.oQ_() ? (this.m1h() ? i : -i) : 0),
    );
  }
  c1h(t, i, s, h) {
    return this.g1h(s)
      ? MathUtils_1.MathUtils.WrapAngle(
          t + i * this.Hh.YawDeadZoneTransToSoftZoneSpeedRatio,
        )
      : this.p1h(s)
        ? MathUtils_1.MathUtils.WrapAngle(
            t - i * this.Hh.YawDeadZoneTransToSoftZoneSpeedRatio,
          )
        : h;
  }
  d1h(t, i, s, h) {
    if (h < 0) {
      const a = MathUtils_1.MathUtils.WrapAngle(
          t - s * this.Hh.YawTransToForwardSpeedRatio,
        ),
        e = MathUtils_1.MathUtils.WrapAngle(i - a);
      return 0 < e ? i : a;
    }
    const a = MathUtils_1.MathUtils.WrapAngle(
        t + s * this.Hh.YawTransToForwardSpeedRatio,
      ),
      e = MathUtils_1.MathUtils.WrapAngle(i - a);
    return e < 0 ? i : a;
  }
  pQl(t, i, s, h) {
    if (h < 0) {
      const a = MathUtils_1.MathUtils.WrapAngle(t - s),
        e = MathUtils_1.MathUtils.WrapAngle(i - a);
      return 0 < e ? i : a;
    }
    const a = MathUtils_1.MathUtils.WrapAngle(t + s),
      e = MathUtils_1.MathUtils.WrapAngle(i - a);
    return e < 0 ? i : a;
  }
  vQl(t, i, s, h, a, e, r) {
    var o = MathUtils_1.MathUtils.WrapAngle(i - s),
      h = t ? h : e,
      e = t ? a : r;
    return o < h
      ? MathUtils_1.MathUtils.WrapAngle(i - h)
      : e < o
        ? MathUtils_1.MathUtils.WrapAngle(i - e)
        : s;
  }
  o1l() {
    return (
      !(0 < this.c1e.size) &&
      (1 === this.Hh.CameraZoneMode
        ? this.Hh.CharacterMoveEnterState ===
            CharacterUnifiedStateTypes_1.ECharMoveState.Soar ||
          this.Qhl.HasKuroRootMotion ||
          this.t1h.IsInCameraDrivenAutoFlightMode() ||
          (0 < this.$hl && 0 < this.Xhl && !this.IsYawRollback())
        : 2 === this.Hh.CameraZoneMode &&
          0 < this.$hl &&
          0 < this.Xhl &&
          !this.IsYawRollback())
    );
  }
  e1l() {
    return (
      !(0 < this.c1e.size) &&
      (1 === this.Hh.CameraZoneMode
        ? this.Hh.CharacterMoveEnterState ===
            CharacterUnifiedStateTypes_1.ECharMoveState.Soar ||
          this.Qhl.HasKuroRootMotion ||
          this.t1h.IsInCameraDrivenAutoFlightMode() ||
          (0 < this.zhl && !this.IsPitchRollback())
        : 2 === this.Hh.CameraZoneMode &&
          0 < this.zhl &&
          !this.IsPitchRollback())
    );
  }
  a1h() {
    return (
      1 !== this.Hh.CameraZoneMode || !this.t1h.IsInCameraDrivenAutoFlightMode()
    );
  }
  h1h() {
    return (
      1 === this.Hh.CameraZoneMode &&
      this.IsYawInputEnable() &&
      this.IsYawRollback()
    );
  }
  t1l() {
    return (
      1 === this.Hh.CameraZoneMode &&
      !this.Qhl.HasKuroRootMotion &&
      this.IsPitchInputEnable() &&
      this.IsPitchRollback()
    );
  }
  oQ_() {
    return 1 === this.Hh.CameraZoneMode;
  }
  m1h() {
    return 1 === this.Hh.CameraZoneMode && this.i1h.InputDirectProxy.Y < 0;
  }
  l1h() {
    return 1 === this.Hh.CameraZoneMode || (this.Hh.CameraZoneMode, !1);
  }
  g1h(t) {
    return (
      1 === this.Hh.CameraZoneMode && 0 < this.i1h.InputDirectProxy.Y && 0 < t
    );
  }
  p1h(t) {
    return (
      1 === this.Hh.CameraZoneMode && this.i1h.InputDirectProxy.Y < 0 && t < 0
    );
  }
  n1l() {
    return (
      (1 === this.Hh.CameraZoneMode || 2 === this.Hh.CameraZoneMode) &&
      this.IsYawRollback()
    );
  }
  i1l() {
    return 1 === this.Hh.CameraZoneMode
      ? this.Qhl.HasKuroRootMotion || this.IsPitchRollback()
      : 2 === this.Hh.CameraZoneMode && this.IsPitchRollback();
  }
  o1h() {
    return (
      !!this.e1h?.Valid &&
      !!(
        this.t1h?.Valid &&
        this.i1h?.Valid &&
        this.Whl?.Valid &&
        this.Qhl?.Valid
      )
    );
  }
  IsPitchRollback() {
    return this.zhl >= this.Hh.PitchRollbackEnableTime;
  }
  IsPitchInputEnable() {
    return this.Yhl >= this.Hh.PitchInputEnableTime;
  }
  IsYawRollback() {
    return this.Xhl >= this.Hh.YawRollbackEnableTime;
  }
  IsYawInputEnable() {
    return this.$hl >= this.Hh.YawInputEnableTime;
  }
  IsHasPitchMovement() {
    return (
      !(!this.Whl?.Valid || !this.i1h?.Valid) &&
      (this.Whl.SoarBoostOn || !this.i1h.InputDirectProxy.IsNearlyZero())
    );
  }
  IsHasPitchUpMovement() {
    return !!this.Whl?.Valid && this.i1h.InputDirectProxy.X < 0;
  }
  IsHasPitchHorizontalMovement() {
    return !(!this.Whl?.Valid || !this.i1h?.Valid) && this.Whl.SoarBalanceOn;
  }
  Lock(t) {
    this.c1e.add(t);
  }
  Unlock(t) {
    this.c1e.delete(t);
  }
  Clear() {
    (this.Hh = void 0),
      (this.e1h = void 0),
      (this.t1h = void 0),
      (this.i1h = void 0),
      (this.Whl = void 0),
      (this.Qhl = void 0);
  }
}
exports.CameraRotationZone = CameraRotationZone;
//# sourceMappingURL=CameraRotationZone.js.map
