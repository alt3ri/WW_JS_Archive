"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CameraAutoController = void 0);
const puerts_1 = require("puerts");
const UE = require("ue");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const GlobalData_1 = require("../../GlobalData");
const CameraUtility_1 = require("../CameraUtility");
const CameraControllerBase_1 = require("./CameraControllerBase");
const IS_DEBUG = !1;
class CameraAutoController extends CameraControllerBase_1.CameraControllerBase {
  constructor() {
    super(...arguments),
      (this.AutoCameraArmLengthWhenTargetNearer = 0),
      (this.AutoCameraScreenStandardRectangleBottom = 0),
      (this.AutoCameraArmOffsetRateVertical = 0),
      (this.AutoCameraArmPullLagSpeed = 0),
      (this.AutoCameraArmMoveLagSpeed = 0),
      (this.CheckAdjustInScreenMinX = 0),
      (this.CheckAdjustInScreenMaxX = 0),
      (this.CheckAdjustInScreenMinY = 0),
      (this.CheckAdjustInScreenMaxY = 0),
      (this.AutoCameraArmOffsetSpeedVertical = 0),
      (this.ExtraArmLengthMinByDist = 0),
      (this.ExtraArmLengthMaxByDist = 0),
      (this.ExtraArmLengthDist = 0),
      (this.ExtraArmLengthCurveByDist = void 0),
      (this.ExtraArmLengthMinByHeight = 0),
      (this.ExtraArmLengthMaxByHeight = 0),
      (this.ExtraArmLengthHeight = 0),
      (this.ExtraArmLengthCurveByHeight = void 0),
      (this.ExtraArmHorizontalMinByDist = 0),
      (this.ExtraArmHorizontalMaxByDist = 0),
      (this.ExtraArmHorizontalDist = 0),
      (this.ExtraArmHorizontalCurveByDist = void 0),
      (this.ExtraArmVerticalMinByHeight = 0),
      (this.ExtraArmVerticalMaxByHeight = 0),
      (this.ExtraArmVerticalHeightMin = 0),
      (this.ExtraArmVerticalHeightMax = 0),
      (this.ExtraArmVerticalCurveByHeight = void 0),
      (this.CurrentAutoCameraArmLengthAddition = 0),
      (this.ule = 0),
      (this.CurrentAutoCameraArmOffset = Vector_1.Vector.Create()),
      (this.cle = Vector_1.Vector.Create()),
      (this.DesiredOffsetHeight = 0),
      (this.CurrentOffsetHeight = 0),
      (this.mle = new Set()),
      (this.ResultPositionRef = (0, puerts_1.$ref)(void 0)),
      (this.Lz = Vector_1.Vector.Create());
  }
  Name() {
    return "AutoController";
  }
  OnInit() {
    this.SetConfigMap(1, "AutoCameraArmLengthWhenTargetNearer"),
      this.SetConfigMap(6, "AutoCameraScreenStandardRectangleBottom"),
      this.SetConfigMap(7, "AutoCameraArmOffsetRateVertical"),
      this.SetConfigMap(11, "AutoCameraArmPullLagSpeed"),
      this.SetConfigMap(12, "AutoCameraArmMoveLagSpeed"),
      this.SetConfigMap(13, "CheckAdjustInScreenMinX"),
      this.SetConfigMap(14, "CheckAdjustInScreenMaxX"),
      this.SetConfigMap(15, "CheckAdjustInScreenMinY"),
      this.SetConfigMap(16, "CheckAdjustInScreenMaxY"),
      this.SetConfigMap(22, "AutoCameraArmOffsetSpeedVertical"),
      this.SetConfigMap(2, "ExtraArmLengthMinByDist"),
      this.SetConfigMap(3, "ExtraArmLengthMaxByDist"),
      this.SetConfigMap(4, "ExtraArmLengthDist"),
      this.SetCurveConfigMap(4, "ExtraArmLengthCurveByDist"),
      this.SetConfigMap(5, "ExtraArmLengthMinByHeight"),
      this.SetConfigMap(8, "ExtraArmLengthMaxByHeight"),
      this.SetConfigMap(9, "ExtraArmLengthHeight"),
      this.SetCurveConfigMap(9, "ExtraArmLengthCurveByHeight"),
      this.SetConfigMap(10, "ExtraArmHorizontalMinByDist"),
      this.SetConfigMap(17, "ExtraArmHorizontalMaxByDist"),
      this.SetConfigMap(18, "ExtraArmHorizontalDist"),
      this.SetCurveConfigMap(18, "ExtraArmHorizontalCurveByDist"),
      this.SetConfigMap(19, "ExtraArmVerticalMinByHeight"),
      this.SetConfigMap(20, "ExtraArmVerticalMaxByHeight"),
      this.SetConfigMap(23, "ExtraArmVerticalHeightMin"),
      this.SetConfigMap(21, "ExtraArmVerticalHeightMax"),
      this.SetCurveConfigMap(21, "ExtraArmVerticalCurveByHeight");
  }
  OnEnable() {
    (this.DesiredOffsetHeight = 0),
      (this.CurrentOffsetHeight = 0),
      this.Camera.CameraSidestepController.Lock(this);
  }
  OnDisable() {
    this.Camera.CameraSidestepController.Unlock(this);
  }
  EnableForce(t) {
    this.mle.add(t);
  }
  DisableForce(t) {
    this.mle.delete(t);
  }
  UpdateCustomEnableCondition() {
    return (
      !!this.Camera.TargetEntity &&
      (this.mle.size > 0 ||
        (CameraUtility_1.CameraUtility.GetSocketLocation(
          void 0,
          this.Camera.TargetSocketName,
          this.Lz,
          this.Camera.TargetEntity,
        ),
        this.IsActivate &&
          this.Camera.CheckPositionInScreen(
            this.Lz,
            this.CheckAdjustInScreenMinX,
            this.CheckAdjustInScreenMaxX,
            this.CheckAdjustInScreenMinY,
            this.CheckAdjustInScreenMaxY,
          )))
    );
  }
  UpdateInternal(t) {
    let i, s, h, e, r;
    this.Camera.TargetEntity &&
      this.Camera.IsTargetLocationValid &&
      ((i = this.Camera.PlayerLocation),
      (r = this.Camera.TargetLocation),
      (s = this.Camera.CameraForward),
      (h = Vector_1.Vector.Create()),
      r.Subtraction(i, h),
      (e = !h.IsNearlyZero() && !s.IsNearlyZero()),
      (h = h.CosineAngle2D(s)),
      (s = Vector_1.Vector.Dist(i, r)),
      (this.ule =
        MathUtils_1.MathUtils.Lerp(
          this.ExtraArmLengthMinByDist,
          this.ExtraArmLengthMaxByDist,
          this.ExtraArmLengthCurveByDist.GetCurrentValue(
            s / this.ExtraArmLengthDist,
          ),
        ) +
        MathUtils_1.MathUtils.Lerp(
          this.ExtraArmLengthMinByHeight,
          this.ExtraArmLengthMaxByHeight,
          this.ExtraArmLengthCurveByHeight.GetCurrentValue(
            Math.abs(i.Z - r.Z) / this.ExtraArmLengthHeight,
          ),
        )),
      e && h < 0 && (this.ule += this.AutoCameraArmLengthWhenTargetNearer),
      (e = Vector_1.Vector.Create()),
      r.Subtraction(i, e),
      (h = MathUtils_1.MathUtils.Lerp(
        this.ExtraArmHorizontalMinByDist,
        this.ExtraArmHorizontalMaxByDist,
        this.ExtraArmHorizontalCurveByDist.GetCurrentValue(
          s / this.ExtraArmHorizontalDist,
        ),
      )),
      (e.Z = 0),
      e.IsNearlyZero()
        ? this.cle.Reset()
        : e.Multiply(h / e.Size2D(), this.cle),
      (s = r.Z - i.Z),
      (h = MathUtils_1.MathUtils.Lerp(
        this.ExtraArmVerticalMinByHeight,
        this.ExtraArmVerticalMaxByHeight,
        this.ExtraArmVerticalCurveByHeight.GetCurrentValue(
          MathUtils_1.MathUtils.RangeClamp(
            s,
            this.ExtraArmVerticalHeightMin,
            this.ExtraArmVerticalHeightMax,
            0,
            1,
          ),
        ),
      )),
      (e = this.dle(i)),
      (this.DesiredOffsetHeight =
        (this.AutoCameraScreenStandardRectangleBottom - e) *
        this.AutoCameraArmOffsetRateVertical),
      (r = this.DesiredOffsetHeight - this.CurrentOffsetHeight),
      (this.CurrentOffsetHeight +=
        Math.abs(r) > this.AutoCameraArmOffsetSpeedVertical
          ? Math.sign(r) * this.AutoCameraArmOffsetSpeedVertical
          : r),
      (h += this.CurrentOffsetHeight),
      (this.cle.Z = h),
      this.Cle(t, !0));
  }
  UpdateDeactivateInternal(t) {
    (this.ule = 0), this.cle.Reset(), this.Cle(t, !1);
  }
  Cle(t, i) {
    let s, h;
    this.Camera.CameraModifyController?.ModifySettings?.IsModifiedArmLength ||
      this.Camera.CameraModifyController?.ModifyFadeOutData?.ModifyArmLength ||
      (this.CurrentAutoCameraArmLengthAddition = MathUtils_1.MathUtils.InterpTo(
        this.CurrentAutoCameraArmLengthAddition,
        this.ule,
        t,
        this.AutoCameraArmPullLagSpeed,
      )),
      this.Camera.CameraModifyController?.ModifySettings?.IsLerpArmLocation ||
        MathUtils_1.MathUtils.VectorInterpTo(
          this.CurrentAutoCameraArmOffset,
          this.cle,
          t,
          this.AutoCameraArmMoveLagSpeed,
          this.CurrentAutoCameraArmOffset,
        ),
      IS_DEBUG &&
        ((t = this.Camera.PlayerLocation),
        (s = Vector_1.Vector.Create(t)).AdditionEqual(
          this.CurrentAutoCameraArmOffset,
        ),
        (h = Vector_1.Vector.Create(t)).AdditionEqual(this.cle),
        UE.KismetSystemLibrary.DrawDebugLine(
          GlobalData_1.GlobalData.World,
          t.ToUeVector(),
          s.ToUeVector(),
          new UE.LinearColor(0, 1, 0, 1),
          0,
          5,
        ),
        UE.KismetSystemLibrary.DrawDebugLine(
          GlobalData_1.GlobalData.World,
          s.ToUeVector(),
          h.ToUeVector(),
          new UE.LinearColor(1, 1, 0, 1),
          0,
          5,
        ),
        i) &&
        this.Camera.IsTargetLocationValid &&
        ((t = this.Camera.TargetLocation),
        UE.KismetSystemLibrary.DrawDebugLine(
          GlobalData_1.GlobalData.World,
          t.ToUeVector(),
          h.ToUeVector(),
          new UE.LinearColor(1, 0, 0, 1),
          0,
          5,
        ));
  }
  dle(t) {
    if (!this.Camera.CharacterController) return 0;
    UE.GameplayStatics.ProjectWorldToScreen(
      this.Camera.CharacterController,
      t.ToUeVector(),
      this.ResultPositionRef,
      !1,
    );
    var t = (0, puerts_1.$unref)(this.ResultPositionRef);
    const i = (0, puerts_1.$ref)(0);
    const s = (0, puerts_1.$ref)(0);
    return (
      this.Camera.CharacterController.GetViewportSize(i, s),
      t.Y / (0, puerts_1.$unref)(s)
    );
  }
}
exports.CameraAutoController = CameraAutoController;
// # sourceMappingURL=CameraAutoController.js.map
