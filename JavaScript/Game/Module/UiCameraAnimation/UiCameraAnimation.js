"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiCameraAnimation = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../Core/Common/Log"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  UiCameraAnimationManager_1 = require("./UiCameraAnimationManager");
class UiCameraAnimation {
  constructor() {
    (this.oUo = void 0),
      (this.rUo = void 0),
      (this.nUo = 0),
      (this.I1e = void 0),
      (this.sUo = void 0),
      (this.qae = void 0),
      (this.aUo = void 0),
      (this.hUo = void 0),
      (this.lUo = void 0),
      (this._Uo = void 0),
      (this.uUo = -0),
      (this.cUo = void 0),
      (this.mUo = new Map()),
      (this.dUo = -0),
      (this.CUo = void 0),
      (this.gUo = void 0),
      (this.fUo = void 0),
      (this.pUo = void 0),
      (this.vUo = () => {
        this.MUo();
      });
  }
  async AsyncPlayUiCameraAnimation(i, t, s) {
    return this.SUo(), this.PlayUiCameraAnimation(i, t, s), this.EUo().Promise;
  }
  SUo() {
    this.CUo || (this.CUo = new CustomPromise_1.CustomPromise());
  }
  EUo() {
    return this.CUo;
  }
  async WaitCameraAnimationFinished() {
    return this.SUo(), this.EUo().Promise;
  }
  PlayUiCameraAnimation(i, t, s) {
    this.ResetUiCameraBlendAnimation(),
      t.CanApplyAnimationHandle()
        ? this.yUo(i, s, t)
          ? (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "CameraAnimation",
                8,
                "播放界面摄像机动画------开始",
                ["fromHandleName", i.ToString()],
                ["toHandleName", t.ToString()],
                ["blendDataName", s],
                ["timeLength", this.dUo],
              ),
            this.oUo.Deactivate(),
            UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraSpringStructure.SetCameraActorRelativeLocation(
              Vector_1.Vector.ZeroVector,
            ),
            this.oUo.SetWidgetCameraAttachToAnimationActor(),
            this.dUo <= 0
              ? (Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "CameraAnimation",
                    8,
                    "播放界面摄像机动画时间<=0，会立马结束动画",
                    ["timeLength", this.dUo],
                  ),
                this.IUo())
              : (this.TUo(),
                this.LUo(
                  this.rUo.LevelSequence,
                  this.rUo.PlayRate,
                  this.rUo.bReverse,
                )))
          : Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "CameraAnimation",
              8,
              "刷新动画数据失败",
              ["fromHandleName", i.ToString()],
              ["toHandleName", t.ToString()],
              ["blendDataName", s],
            )
        : Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "CameraAnimation",
            8,
            "无法播放镜头动画：原因是找不到对应插槽或骨骼模型为空",
            ["toHandleData", t.ToString()],
          );
  }
  yUo(i, t, s) {
    return (
      (this.gUo = i),
      (this.fUo = s),
      (this.oUo =
        UiCameraAnimationManager_1.UiCameraAnimationManager.GetCurrentCameraHandle()),
      (this.rUo =
        ConfigManager_1.ConfigManager.UiCameraAnimationConfig.GetUiCameraAnimationBlendData(
          t,
        )),
      !!(this.oUo && this.rUo && this.gUo) &&
        ((i =
          UiCameraAnimationManager_1.UiCameraAnimationManager
            .UiCameraSpringStructure),
        (s =
          UiCameraAnimationManager_1.UiCameraAnimationManager
            .UiCameraPostEffectComponent),
        this.DUo(
          i.GetActorLocation(),
          i.GetActorRotation(),
          i.GetSpringArmLength(),
          i.GetSpringRelativeLocation(),
          i.GetSpringRelativeRotation(),
          s.GetFieldOfView(),
          s.GetManualFocusDistance(),
          s.GetCurrentAperture(),
          s.GetPostProcessBlendWeight(),
          this.rUo.Time,
        ),
        !0)
    );
  }
  DUo(i, t, s, e, a, h, r, o, n, m) {
    (this.I1e = i),
      (this.sUo = t),
      (this.qae = s),
      (this.aUo = e),
      (this.hUo = a),
      (this.lUo = h),
      (this._Uo = r),
      (this.uUo = o),
      (this.cUo = n),
      (this.dUo = m);
  }
  StopUiCameraAnimation() {
    var i;
    this.fUo &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "CameraAnimation",
          8,
          "播放界面摄像机动画------停止",
          ["fromHandleName", this.gUo?.ToString()],
          ["toHandleName", this.fUo?.ToString()],
        ),
      this.CUo &&
        ((i = {
          FinishType: 1,
          FromHandleData: this.gUo,
          ToHandleData: this.fUo,
        }),
        this.CUo.SetResult(i),
        (this.CUo = void 0)),
      this.MUo(!0, 1),
      this.ResetUiCameraBlendAnimation());
  }
  IUo() {
    var i;
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "CameraAnimation",
        8,
        "播放界面摄像机动画------完成",
        ["fromHandleName", this.gUo.ToString()],
        ["toHandleName", this.fUo?.ToString()],
      ),
      this.CUo &&
        ((i = {
          FinishType: 0,
          FromHandleData: this.gUo,
          ToHandleData: this.fUo,
        }),
        this.CUo.SetResult(i),
        (this.CUo = void 0)),
      this.MUo(),
      this.ResetUiCameraBlendAnimation();
  }
  ResetUiCameraBlendAnimation() {
    (this.rUo = void 0),
      (this.oUo = void 0),
      (this.gUo = void 0),
      (this.fUo = void 0),
      (this.I1e = void 0),
      (this.sUo = void 0),
      (this.qae = void 0),
      (this.aUo = void 0),
      (this.hUo = void 0),
      (this.lUo = void 0),
      (this._Uo = void 0),
      (this.cUo = void 0),
      (this.nUo = 0),
      (this.dUo = 0),
      (this.pUo = void 0),
      this.mUo.clear();
  }
  LUo(i, t, s) {
    var e;
    UE.KismetSystemLibrary.IsValidSoftObjectReference(i) &&
      (this.MUo(!0, 1),
      (e =
        UiCameraAnimationManager_1.UiCameraAnimationManager
          .UiCameraSequenceComponent).AddUiCameraSequenceFinishedCallback(
        this.vUo,
      ),
      e.LoadAndPlayUiCameraSequence(i, t, s));
  }
  MUo(i = !0, t = 0) {
    UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraSequenceComponent?.DestroyUiCameraSequence(
      i,
      t,
    );
  }
  Tick(i) {
    this.rUo &&
      this.oUo &&
      ((this.nUo += i / TimeUtil_1.TimeUtil.InverseMillisecond),
      this.nUo >= this.dUo
        ? this.IUo()
        : this.fUo &&
          ((i = this.fUo.GetUiCameraAnimationConfig()),
          this.RUo(i.LocationType),
          this.UUo(),
          this.AUo(this.fUo.GetTargetArmLength()),
          this.PUo(this.fUo.GetTargetArmOffsetLocation()),
          this.xUo(this.fUo.GetTargetArmOffsetRotation()),
          this.wUo(this.fUo.GetTargetFieldOfView()),
          this.BUo(this.fUo.GetTargetFocalDistance()),
          this.bUo(this.fUo.GetTargetAperture()),
          this.qUo(this.fUo.GetTargetPostProcessBlendWeight())));
  }
  IsPlaying() {
    return this.nUo < this.dUo;
  }
  RUo(i) {
    var t = this.fUo.GetTargetLocation();
    t && this.GUo(t, 0 !== i);
  }
  UUo() {
    var i = this.fUo.GetTargetRotation();
    i && this.NUo(i);
  }
  GUo(i, t) {
    var s = this.OUo(1);
    void 0 !== s &&
      ((i = UE.KismetMathLibrary.VLerp(this.I1e, i, s)),
      t
        ? this.oUo.SetUiCameraAnimationRelativeLocation(i)
        : this.oUo.SetUiCameraAnimationLocation(i));
  }
  NUo(i) {
    var t = this.OUo(2);
    t &&
      ((i = UE.KismetMathLibrary.RLerp(this.sUo, i, t, !0)),
      this.oUo.SetUiCameraAnimationRotation(i));
  }
  AUo(i) {
    var t = this.OUo(3);
    t &&
      ((i = MathUtils_1.MathUtils.Lerp(this.qae, i, t)),
      this.oUo.SetSpringArmLength(i));
  }
  PUo(i) {
    var t = this.OUo(4);
    t &&
      ((i = UE.KismetMathLibrary.VLerp(this.aUo, i, t)),
      this.oUo.SetSpringArmRelativeLocation(i));
  }
  xUo(i) {
    var t = this.OUo(5);
    t &&
      ((i = UE.KismetMathLibrary.RLerp(this.hUo, i, t, !0)),
      this.oUo.SetSprintArmRelativeRotation(i));
  }
  wUo(i) {
    var t = this.OUo(6);
    t &&
      ((i = MathUtils_1.MathUtils.Lerp(this.lUo, i, t)),
      this.oUo.SetCameraFieldOfView(i));
  }
  BUo(i) {
    var t = this.OUo(7);
    t &&
      ((i = MathUtils_1.MathUtils.Lerp(this._Uo, i, t)),
      this.oUo.SetCameraFocalDistance(i));
  }
  bUo(i) {
    var t = this.OUo(9);
    t &&
      ((i = MathUtils_1.MathUtils.Lerp(this.uUo, i, t)),
      this.oUo.SetCameraAperture(i));
  }
  qUo(i) {
    var t = this.OUo(8);
    t &&
      ((i = MathUtils_1.MathUtils.Lerp(this.cUo, i, t)),
      this.oUo.SetCameraPostProcessBlendWeight(i));
  }
  OUo(i) {
    return this.GetCurveFloatValue(i, this.nUo);
  }
  TUo() {
    var i;
    if (
      (this.pUo?.IsValid() ||
        ((i = this.rUo?.CommonCurve),
        UE.KismetSystemLibrary.IsValidSoftObjectReference(i) &&
          ((i = i.ToAssetPathName()),
          StringUtils_1.StringUtils.IsEmpty(i) ||
            ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.CurveFloat, (i) => {
              this.pUo = i;
            }))),
      this.mUo.size <= 0)
    ) {
      var t = this.rUo?.CurveMap,
        s = t.GetMaxIndex();
      for (let i = 0; i < s; i++) {
        const a = t.GetKey(i).valueOf();
        var e = t.Get(a);
        UE.KismetSystemLibrary.IsValidSoftObjectReference(e) &&
          ((e = e.ToAssetPathName()),
          StringUtils_1.StringUtils.IsEmpty(e) ||
            ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.CurveFloat, (i) => {
              this.mUo.set(a, i);
            }));
      }
    }
  }
  GetCurveFloat(i) {
    i = this.mUo.get(i);
    return i || this.pUo;
  }
  GetCurveFloatValue(i, t) {
    return t > this.GetTimeLength
      ? 1
      : (i = this.GetCurveFloat(i))
        ? ((i = i.GetFloatValue(t)), Math.min(i, 1))
        : void 0;
  }
  get GetTimeLength() {
    return this.dUo;
  }
}
exports.UiCameraAnimation = UiCameraAnimation;
//# sourceMappingURL=UiCameraAnimation.js.map
