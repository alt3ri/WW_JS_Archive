"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiCameraControlRotationComponent = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon"),
  Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiCameraComponent_1 = require("./UiCameraComponent"),
  UiCameraPostEffectComponent_1 = require("./UiCameraPostEffectComponent");
class VirtualCamera {
  constructor() {
    (this.ArmLength = 0),
      (this.MinArmLength = 0),
      (this.MaxArmLength = 0),
      (this.YawLimitMin = 0),
      (this.YawLimitMax = 0),
      (this.PitchLimitMin = 0),
      (this.PitchLimitMax = 0),
      (this.HeightOffset = 0),
      (this.ArmHeight = 0),
      (this.Aperture = 0),
      (this.LookCenterLocation = Vector_1.Vector.Create()),
      (this.DefaultLookCenterLocation = Vector_1.Vector.Create()),
      (this.ArmRotation = Rotator_1.Rotator.Create());
  }
  DeepCopy(t) {
    (this.ArmLength = t.ArmLength),
      (this.MinArmLength = t.MinArmLength),
      (this.MaxArmLength = t.MaxArmLength),
      (this.YawLimitMin = t.YawLimitMin),
      (this.YawLimitMax = t.YawLimitMax),
      (this.PitchLimitMin = t.PitchLimitMin),
      (this.PitchLimitMax = t.PitchLimitMax),
      (this.HeightOffset = t.HeightOffset),
      (this.ArmHeight = t.ArmHeight),
      (this.Aperture = t.Aperture),
      this.LookCenterLocation.DeepCopy(t.LookCenterLocation),
      this.DefaultLookCenterLocation.DeepCopy(t.DefaultLookCenterLocation),
      this.ArmRotation.DeepCopy(t.ArmRotation);
  }
}
class UiCameraControlRotationComponent extends UiCameraComponent_1.UiCameraComponent {
  constructor() {
    super(...arguments),
      (this.DefaultCamera = new VirtualCamera()),
      (this.LastCamera = new VirtualCamera()),
      (this.CurrentCamera = new VirtualCamera()),
      (this.DesiredCamera = new VirtualCamera()),
      (this.TempLookCenterLocation = Vector_1.Vector.Create()),
      (this.TempCameraForward = Vector_1.Vector.Create()),
      (this.TempCameraVector = Vector_1.Vector.Create()),
      (this.TempCameraLocation = Vector_1.Vector.Create()),
      (this.TempSourceLocation = Vector_1.Vector.Create()),
      (this.oRo = -0),
      (this.rRo = -0),
      (this.nRo = -0),
      (this.sRo = -0),
      (this.aRo = -0),
      (this.hRo = -0),
      (this.lRo = -0),
      (this._Ro = -0),
      (this.uRo = -0),
      (this.cRo = -0),
      (this.mRo = -0),
      (this.dRo = -0),
      (this.CRo = -0),
      (this.gRo = 0),
      (this.fRo = 0),
      (this.pRo = 0),
      (this.vRo = -0),
      (this.MRo = !1),
      (this.SRo = -0),
      (this.ERo = -0),
      (this.yRo = void 0),
      (this.IRo = !1),
      (this.TRo = !1),
      (this.LRo = !1),
      (this.DRo = !1);
  }
  OnActivate() {
    this.EnableTick();
  }
  OnDeactivate() {
    this.RemoveTick();
  }
  InitDataByConfig(t) {
    this.InitData(
      t.倍化手柄输入倍率,
      t.移动端旋转输入倍率,
      t.移动端缩放输入倍率,
      t.镜头Yaw灵敏度系数,
      t.镜头Pitch灵敏度系数,
      t.镜头缩放灵敏度系数,
      t.最小臂长,
      t.最大臂长,
      t.Pitch限制Min,
      t.Pitch限制Max,
      t.相机相对角色的最低高度,
      t.最大臂长时的光圈,
      t.最小臂长时的光圈,
    );
  }
  InitData(t, i, s, h, a, e, o, r, n, _, m, C, l) {
    (this.oRo = t),
      (this.rRo = i),
      (this.nRo = s),
      (this.sRo = h),
      (this.aRo = a),
      (this.hRo = e),
      (this.lRo = m);
    t = this.DesiredCamera;
    (t.MinArmLength = o),
      (t.MaxArmLength = r),
      (t.PitchLimitMin = n),
      (t.PitchLimitMax = _),
      (this.dRo = C),
      (this.CRo = l);
  }
  UpdateData(t, i, s, h, a) {
    var e,
      o,
      r = this.GetCameraStructure();
    r &&
      ((e = r.GetActorLocation()),
      (o = r.GetSpringRelativeRotation()),
      this.DesiredCamera.ArmRotation.DeepCopy(o),
      this.DesiredCamera.DefaultLookCenterLocation.DeepCopy(e),
      this.TempSourceLocation.DeepCopy(t),
      this.TempCameraLocation.DeepCopy(e),
      (t = Vector_1.Vector.Dist2D(
        this.TempSourceLocation,
        this.TempCameraLocation,
      )),
      (e = o.Pitch),
      (o = MathCommon_1.MathCommon.WrapAngle(e)),
      (e = MathCommon_1.MathCommon.DegreeToRadian(o)),
      (o = t * Math.tan(e) + this.TempCameraLocation.Z),
      (this.TempLookCenterLocation.X = this.TempSourceLocation.X),
      (this.TempLookCenterLocation.Y = this.TempSourceLocation.Y),
      (this.TempLookCenterLocation.Z = o),
      this.DesiredCamera.LookCenterLocation.DeepCopy(
        this.TempLookCenterLocation,
      ),
      (this.DesiredCamera.ArmLength = r.GetSpringArmLength()),
      (this.vRo = r.GetSpringArmLength()),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "UiCamera",
          44,
          "UiCameraControlRotationComponent初始化",
          ["初始臂长", this.vRo],
        ),
      (this.DesiredCamera.ArmHeight =
        this.TempLookCenterLocation.Z - this.TempSourceLocation.Z - this.lRo),
      (this._Ro = i),
      (this.uRo = s),
      (this.mRo = h),
      (this.cRo = a),
      (this.DesiredCamera.HeightOffset = 0),
      this.DefaultCamera.DeepCopy(this.DesiredCamera),
      this.CurrentCamera.DeepCopy(this.DesiredCamera));
  }
  OnTick(t) {
    this.MRo || this.RRo(t),
      this.uxr(),
      this.URo(),
      this.ARo(),
      this.PRo(t),
      this.xRo();
  }
  wRo() {
    (this.gRo = 0), (this.fRo = 0), (this.pRo = 0);
  }
  RRo(t) {
    let i = this.gRo,
      s = this.fRo,
      h = this.pRo;
    this.wRo(),
      ModelManager_1.ModelManager.PlatformModel.IsGamepad()
        ? ((i *= this.oRo), (s *= this.oRo))
        : ModelManager_1.ModelManager.PlatformModel.IsMobile() &&
          ((i *= this.rRo), (s *= this.rRo), (h *= this.nRo)),
      (i = i * this.sRo * t),
      (s = s * this.aRo * t),
      (h = h * this.hRo * t),
      MathUtils_1.MathUtils.IsNearlyZero(i) ||
        (this.DesiredCamera.ArmRotation.Yaw += i),
      MathUtils_1.MathUtils.IsNearlyZero(s) ||
        (this.DesiredCamera.ArmRotation.Pitch += s),
      MathUtils_1.MathUtils.IsNearlyZero(h) ||
        (this.DesiredCamera.ArmLength += h);
  }
  uxr() {
    var t = this.DesiredCamera.ArmRotation.Yaw;
    this.DesiredCamera.ArmRotation.Yaw = t = 180 < (t %= 360) ? t - 360 : t;
  }
  URo() {
    var t = this.DesiredCamera.ArmRotation.Pitch,
      t = 180 < (t %= 360) ? t - 360 : t;
    (t = MathUtils_1.MathUtils.Clamp(
      t,
      this.DesiredCamera.PitchLimitMin,
      this.DesiredCamera.PitchLimitMax,
    )),
      (this.DesiredCamera.ArmRotation.Pitch = t);
  }
  ARo() {
    this.DesiredCamera.ArmLength = MathUtils_1.MathUtils.Clamp(
      this.DesiredCamera.ArmLength,
      this.DesiredCamera.MinArmLength,
      this.DesiredCamera.MaxArmLength,
    );
  }
  StartFade(t, i, s, h, a, e) {
    this.LastCamera.DeepCopy(this.CurrentCamera),
      (this.IRo = s),
      (this.TRo = h),
      (this.LRo = a),
      (this.DRo = e),
      (this.MRo = !0),
      (this.SRo = t),
      (this.ERo = 0),
      (this.yRo = i);
  }
  PRo(t) {
    this.MRo && this.yRo
      ? ((this.ERo += t),
        this.ERo >= this.SRo
          ? ((this.MRo = !1),
            (this.yRo = void 0),
            this.CurrentCamera.DeepCopy(this.DesiredCamera))
          : ((t = this.yRo.GetFloatValue(this.ERo / this.SRo)),
            this.IRo &&
              (this.CurrentCamera.ArmLength = MathUtils_1.MathUtils.Lerp(
                this.LastCamera.ArmLength,
                this.DesiredCamera.ArmLength,
                t,
              )),
            this.TRo &&
              (this.CurrentCamera.ArmRotation.Pitch =
                MathUtils_1.MathUtils.Lerp(
                  this.LastCamera.ArmRotation.Pitch,
                  this.DesiredCamera.ArmRotation.Pitch,
                  t,
                )),
            this.LRo &&
              (this.CurrentCamera.ArmRotation.Yaw = MathUtils_1.MathUtils.Lerp(
                this.LastCamera.ArmRotation.Yaw,
                this.DesiredCamera.ArmRotation.Yaw,
                t,
              )),
            this.DRo &&
              (this.CurrentCamera.ArmRotation.Roll = MathUtils_1.MathUtils.Lerp(
                this.LastCamera.ArmRotation.Roll,
                this.DesiredCamera.ArmRotation.Roll,
                t,
              ))))
      : this.CurrentCamera.DeepCopy(this.DesiredCamera);
  }
  xRo() {
    var t = this.CurrentCamera.ArmRotation,
      i =
        (this.TempLookCenterLocation.DeepCopy(
          this.CurrentCamera.LookCenterLocation,
        ),
        this.TempLookCenterLocation);
    let s = this.CurrentCamera.ArmLength;
    var h = this.CurrentCamera.ArmRotation.Pitch;
    0 < h &&
      !MathUtils_1.MathUtils.IsNearlyZero(h) &&
      ((h = MathCommon_1.MathCommon.WrapAngle(h)),
      (h = MathCommon_1.MathCommon.DegreeToRadian(h)),
      (h = Math.abs(this.CurrentCamera.ArmHeight / Math.sin(h))),
      (h = MathUtils_1.MathUtils.Clamp(
        h,
        this.CurrentCamera.MinArmLength,
        this.CurrentCamera.MaxArmLength,
      )),
      (s = MathUtils_1.MathUtils.Clamp(s, this.CurrentCamera.MinArmLength, h)));
    t
      .Quaternion()
      .RotateVector(Vector_1.Vector.ForwardVectorProxy, this.TempCameraForward),
      this.TempCameraForward.Multiply(-s, this.TempCameraVector),
      i.Addition(this.TempCameraVector, this.TempCameraLocation),
      this.UpdateHeightOffset(s),
      this.UpdateAperture(s);
    (h = this.CurrentCamera.DefaultLookCenterLocation),
      (this.TempCameraLocation.Z = h.Z + this.CurrentCamera.HeightOffset),
      (i = i.Z - this.CurrentCamera.ArmHeight),
      this.TempCameraLocation.Z < i && (this.TempCameraLocation.Z = i),
      (this.TempCameraLocation.X = h.X),
      (this.TempCameraLocation.Y = h.Y),
      (i = this.GetCameraStructure());
    i &&
      (i.SetSprintArmRelativeRotation(t.ToUeRotator()),
      i.SetSpringArmLength(s),
      i.SetActorLocation(this.TempCameraLocation.ToUeVector()));
  }
  UpdateHeightOffset(t) {
    t < this.vRo
      ? (this.CurrentCamera.HeightOffset = MathUtils_1.MathUtils.RangeClamp(
          t,
          this.cRo,
          this.vRo,
          this.uRo,
          0,
        ))
      : (this.CurrentCamera.HeightOffset = MathUtils_1.MathUtils.RangeClamp(
          t,
          this.vRo,
          this.mRo,
          0,
          this._Ro,
        ));
  }
  UpdateAperture(t) {
    (this.CurrentCamera.Aperture = MathUtils_1.MathUtils.RangeClamp(
      t,
      this.cRo,
      this.mRo,
      this.CRo,
      this.dRo,
    )),
      this.OwnerUiCamera.GetUiCameraComponent(
        UiCameraPostEffectComponent_1.UiCameraPostEffectComponent,
      )?.SetCameraAperture(this.CurrentCamera.Aperture);
  }
  AddZoomInput(t) {
    this.pRo = t;
  }
  AddYawInput(t) {
    this.gRo = t;
  }
  AddPitchInput(t) {
    this.fRo = t;
  }
  DoMoveForward(t, i, s) {
    (this.DesiredCamera.ArmLength = this.DesiredCamera.ArmLength - t),
      this.StartFade(i, s, !0, !1, !1, !1);
  }
  SetArmLength(t) {
    this.DesiredCamera.ArmLength = t;
  }
  SetArmRotation(t, i, s) {
    (this.DesiredCamera.ArmRotation.Pitch = t),
      (this.DesiredCamera.ArmRotation.Yaw = i),
      (this.DesiredCamera.ArmRotation.Roll = s);
  }
  SetArmRotationByDefaultCamera() {
    var t = this.DefaultCamera.ArmRotation;
    this.SetArmRotation(t.Pitch, t.Yaw, t.Roll);
  }
}
exports.UiCameraControlRotationComponent = UiCameraControlRotationComponent;
//# sourceMappingURL=UiCameraControlRotationComponent.js.map
