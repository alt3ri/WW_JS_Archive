"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiCameraControlRotationComponent = void 0);
const Info_1 = require("../../../../Core/Common/Info"),
  Log_1 = require("../../../../Core/Common/Log"),
  MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon"),
  Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
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
      (this.eUo = -0),
      (this.tUo = -0),
      (this.iUo = -0),
      (this.oUo = -0),
      (this.rUo = -0),
      (this.nUo = -0),
      (this.sUo = -0),
      (this.aUo = -0),
      (this.hUo = -0),
      (this.lUo = -0),
      (this._Uo = -0),
      (this.uUo = -0),
      (this.cUo = -0),
      (this.mUo = 0),
      (this.dUo = 0),
      (this.CUo = 0),
      (this.gUo = -0),
      (this.fUo = !1),
      (this.pUo = -0),
      (this.vUo = -0),
      (this.MUo = void 0),
      (this.EUo = !1),
      (this.SUo = !1),
      (this.yUo = !1),
      (this.IUo = !1);
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
  InitData(t, i, s, h, a, e, o, r, n, _, m, C, U) {
    (this.eUo = t),
      (this.tUo = i),
      (this.iUo = s),
      (this.oUo = h),
      (this.rUo = a),
      (this.nUo = e),
      (this.sUo = m);
    t = this.DesiredCamera;
    (t.MinArmLength = o),
      (t.MaxArmLength = r),
      (t.PitchLimitMin = n),
      (t.PitchLimitMax = _),
      (this.uUo = C),
      (this.cUo = U);
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
      (this.gUo = r.GetSpringArmLength()),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "UiCamera",
          44,
          "UiCameraControlRotationComponent初始化",
          ["初始臂长", this.gUo],
        ),
      (this.DesiredCamera.ArmHeight =
        this.TempLookCenterLocation.Z - this.TempSourceLocation.Z - this.sUo),
      (this.aUo = i),
      (this.hUo = s),
      (this._Uo = h),
      (this.lUo = a),
      (this.DesiredCamera.HeightOffset = 0),
      this.DefaultCamera.DeepCopy(this.DesiredCamera),
      this.CurrentCamera.DeepCopy(this.DesiredCamera));
  }
  OnTick(t) {
    this.fUo || this.TUo(t),
      this.FPr(),
      this.LUo(),
      this.DUo(),
      this.RUo(t),
      this.UUo();
  }
  AUo() {
    (this.mUo = 0), (this.dUo = 0), (this.CUo = 0);
  }
  TUo(t) {
    let i = this.mUo,
      s = this.dUo,
      h = this.CUo;
    this.AUo(),
      Info_1.Info.IsInGamepad()
        ? ((i *= this.eUo), (s *= this.eUo))
        : Info_1.Info.IsInTouch() &&
          ((i *= this.tUo), (s *= this.tUo), (h *= this.iUo)),
      (i = i * this.oUo * t),
      (s = s * this.rUo * t),
      (h = h * this.nUo * t),
      MathUtils_1.MathUtils.IsNearlyZero(i) ||
        (this.DesiredCamera.ArmRotation.Yaw += i),
      MathUtils_1.MathUtils.IsNearlyZero(s) ||
        (this.DesiredCamera.ArmRotation.Pitch += s),
      MathUtils_1.MathUtils.IsNearlyZero(h) ||
        (this.DesiredCamera.ArmLength += h);
  }
  FPr() {
    var t = this.DesiredCamera.ArmRotation.Yaw;
    this.DesiredCamera.ArmRotation.Yaw = t = 180 < (t %= 360) ? t - 360 : t;
  }
  LUo() {
    var t = this.DesiredCamera.ArmRotation.Pitch,
      t = 180 < (t %= 360) ? t - 360 : t;
    (t = MathUtils_1.MathUtils.Clamp(
      t,
      this.DesiredCamera.PitchLimitMin,
      this.DesiredCamera.PitchLimitMax,
    )),
      (this.DesiredCamera.ArmRotation.Pitch = t);
  }
  DUo() {
    this.DesiredCamera.ArmLength = MathUtils_1.MathUtils.Clamp(
      this.DesiredCamera.ArmLength,
      this.DesiredCamera.MinArmLength,
      this.DesiredCamera.MaxArmLength,
    );
  }
  StartFade(t, i, s, h, a, e) {
    this.LastCamera.DeepCopy(this.CurrentCamera),
      (this.EUo = s),
      (this.SUo = h),
      (this.yUo = a),
      (this.IUo = e),
      (this.fUo = !0),
      (this.pUo = t),
      (this.vUo = 0),
      (this.MUo = i);
  }
  RUo(t) {
    this.fUo && this.MUo
      ? ((this.vUo += t),
        this.vUo >= this.pUo
          ? ((this.fUo = !1),
            (this.MUo = void 0),
            this.CurrentCamera.DeepCopy(this.DesiredCamera))
          : ((t = this.MUo.GetFloatValue(this.vUo / this.pUo)),
            this.EUo &&
              (this.CurrentCamera.ArmLength = MathUtils_1.MathUtils.Lerp(
                this.LastCamera.ArmLength,
                this.DesiredCamera.ArmLength,
                t,
              )),
            this.SUo &&
              (this.CurrentCamera.ArmRotation.Pitch =
                MathUtils_1.MathUtils.Lerp(
                  this.LastCamera.ArmRotation.Pitch,
                  this.DesiredCamera.ArmRotation.Pitch,
                  t,
                )),
            this.yUo &&
              (this.CurrentCamera.ArmRotation.Yaw = MathUtils_1.MathUtils.Lerp(
                this.LastCamera.ArmRotation.Yaw,
                this.DesiredCamera.ArmRotation.Yaw,
                t,
              )),
            this.IUo &&
              (this.CurrentCamera.ArmRotation.Roll = MathUtils_1.MathUtils.Lerp(
                this.LastCamera.ArmRotation.Roll,
                this.DesiredCamera.ArmRotation.Roll,
                t,
              ))))
      : this.CurrentCamera.DeepCopy(this.DesiredCamera);
  }
  UUo() {
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
    t < this.gUo
      ? (this.CurrentCamera.HeightOffset = MathUtils_1.MathUtils.RangeClamp(
          t,
          this.lUo,
          this.gUo,
          this.hUo,
          0,
        ))
      : (this.CurrentCamera.HeightOffset = MathUtils_1.MathUtils.RangeClamp(
          t,
          this.gUo,
          this._Uo,
          0,
          this.aUo,
        ));
  }
  UpdateAperture(t) {
    (this.CurrentCamera.Aperture = MathUtils_1.MathUtils.RangeClamp(
      t,
      this.lUo,
      this._Uo,
      this.cUo,
      this.uUo,
    )),
      this.OwnerUiCamera.GetUiCameraComponent(
        UiCameraPostEffectComponent_1.UiCameraPostEffectComponent,
      )?.SetCameraAperture(this.CurrentCamera.Aperture);
  }
  AddZoomInput(t) {
    this.CUo = t;
  }
  AddYawInput(t) {
    this.mUo = t;
  }
  AddPitchInput(t) {
    this.dUo = t;
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
