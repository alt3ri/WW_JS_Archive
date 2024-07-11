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
    (this.eAo = void 0),
      (this.tAo = void 0),
      (this.iAo = 0),
      (this.I1e = void 0),
      (this.oAo = void 0),
      (this.qae = void 0),
      (this.rAo = void 0),
      (this.nAo = void 0),
      (this.sAo = void 0),
      (this.aAo = void 0),
      (this.hAo = -0),
      (this.lAo = void 0),
      (this._Ao = new Map()),
      (this.uAo = -0),
      (this.cAo = void 0),
      (this.mAo = void 0),
      (this.dAo = void 0),
      (this.CAo = void 0),
      (this.gAo = () => {
        this.fAo();
      });
  }
  async AsyncPlayUiCameraAnimation(i, t, s) {
    return this.pAo(), this.PlayUiCameraAnimation(i, t, s), this.vAo().Promise;
  }
  pAo() {
    this.cAo || (this.cAo = new CustomPromise_1.CustomPromise());
  }
  vAo() {
    return this.cAo;
  }
  async WaitCameraAnimationFinished() {
    return this.pAo(), this.vAo().Promise;
  }
  PlayUiCameraAnimation(i, t, s) {
    this.ResetUiCameraBlendAnimation(),
      t.CanApplyAnimationHandle()
        ? this.MAo(i, s, t)
          ? (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "CameraAnimation",
                8,
                "播放界面摄像机动画------开始",
                ["fromHandleName", i.ToString()],
                ["toHandleName", t.ToString()],
                ["blendDataName", s],
                ["timeLength", this.uAo],
              ),
            this.eAo.Deactivate(),
            UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraSpringStructure.SetCameraActorRelativeLocation(
              Vector_1.Vector.ZeroVector,
            ),
            this.eAo.SetWidgetCameraAttachToAnimationActor(),
            this.uAo <= 0
              ? (Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "CameraAnimation",
                    8,
                    "播放界面摄像机动画时间<=0，会立马结束动画",
                    ["timeLength", this.uAo],
                  ),
                this.EAo())
              : (this.SAo(),
                this.yAo(
                  this.tAo.LevelSequence,
                  this.tAo.PlayRate,
                  this.tAo.bReverse,
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
  MAo(i, t, s) {
    return (
      (this.mAo = i),
      (this.dAo = s),
      (this.eAo =
        UiCameraAnimationManager_1.UiCameraAnimationManager.GetCurrentCameraHandle()),
      (this.tAo =
        ConfigManager_1.ConfigManager.UiCameraAnimationConfig.GetUiCameraAnimationBlendData(
          t,
        )),
      !!(this.eAo && this.tAo && this.mAo) &&
        ((i =
          UiCameraAnimationManager_1.UiCameraAnimationManager
            .UiCameraSpringStructure),
        (s =
          UiCameraAnimationManager_1.UiCameraAnimationManager
            .UiCameraPostEffectComponent),
        this.IAo(
          i.GetActorLocation(),
          i.GetActorRotation(),
          i.GetSpringArmLength(),
          i.GetSpringRelativeLocation(),
          i.GetSpringRelativeRotation(),
          s.GetFieldOfView(),
          s.GetManualFocusDistance(),
          s.GetCurrentAperture(),
          s.GetPostProcessBlendWeight(),
          this.tAo.Time,
        ),
        !0)
    );
  }
  IAo(i, t, s, e, a, h, r, o, n, m) {
    (this.I1e = i),
      (this.oAo = t),
      (this.qae = s),
      (this.rAo = e),
      (this.nAo = a),
      (this.sAo = h),
      (this.aAo = r),
      (this.hAo = o),
      (this.lAo = n),
      (this.uAo = m);
  }
  StopUiCameraAnimation() {
    var i;
    this.dAo &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "CameraAnimation",
          8,
          "播放界面摄像机动画------停止",
          ["fromHandleName", this.mAo?.ToString()],
          ["toHandleName", this.dAo?.ToString()],
        ),
      this.cAo &&
        ((i = {
          FinishType: 1,
          FromHandleData: this.mAo,
          ToHandleData: this.dAo,
        }),
        this.cAo.SetResult(i),
        (this.cAo = void 0)),
      this.fAo(!0, 1),
      this.ResetUiCameraBlendAnimation());
  }
  EAo() {
    var i;
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "CameraAnimation",
        8,
        "播放界面摄像机动画------完成",
        ["fromHandleName", this.mAo.ToString()],
        ["toHandleName", this.dAo?.ToString()],
      ),
      this.cAo &&
        ((i = {
          FinishType: 0,
          FromHandleData: this.mAo,
          ToHandleData: this.dAo,
        }),
        this.cAo.SetResult(i),
        (this.cAo = void 0)),
      this.fAo(),
      this.ResetUiCameraBlendAnimation();
  }
  ResetUiCameraBlendAnimation() {
    (this.tAo = void 0),
      (this.eAo = void 0),
      (this.mAo = void 0),
      (this.dAo = void 0),
      (this.I1e = void 0),
      (this.oAo = void 0),
      (this.qae = void 0),
      (this.rAo = void 0),
      (this.nAo = void 0),
      (this.sAo = void 0),
      (this.aAo = void 0),
      (this.lAo = void 0),
      (this.iAo = 0),
      (this.uAo = 0),
      (this.CAo = void 0),
      this._Ao.clear();
  }
  yAo(i, t, s) {
    var e;
    UE.KismetSystemLibrary.IsValidSoftObjectReference(i) &&
      (this.fAo(!0, 1),
      (e =
        UiCameraAnimationManager_1.UiCameraAnimationManager
          .UiCameraSequenceComponent).AddUiCameraSequenceFinishedCallback(
        this.gAo,
      ),
      e.LoadAndPlayUiCameraSequence(i, t, s));
  }
  fAo(i = !0, t = 0) {
    UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraSequenceComponent?.DestroyUiCameraSequence(
      i,
      t,
    );
  }
  Tick(i) {
    this.tAo &&
      this.eAo &&
      ((this.iAo += i / TimeUtil_1.TimeUtil.InverseMillisecond),
      this.iAo >= this.uAo
        ? this.EAo()
        : this.dAo &&
          ((i = this.dAo.GetUiCameraAnimationConfig()),
          this.TAo(i.LocationType),
          this.LAo(),
          this.DAo(this.dAo.GetTargetArmLength()),
          this.RAo(this.dAo.GetTargetArmOffsetLocation()),
          this.UAo(this.dAo.GetTargetArmOffsetRotation()),
          this.AAo(this.dAo.GetTargetFieldOfView()),
          this.PAo(this.dAo.GetTargetFocalDistance()),
          this.xAo(this.dAo.GetTargetAperture()),
          this.wAo(this.dAo.GetTargetPostProcessBlendWeight())));
  }
  IsPlaying() {
    return this.iAo < this.uAo;
  }
  TAo(i) {
    var t = this.dAo.GetTargetLocation();
    t && this.BAo(t, 0 !== i);
  }
  LAo() {
    var i = this.dAo.GetTargetRotation();
    i && this.bAo(i);
  }
  BAo(i, t) {
    var s = this.qAo(1);
    void 0 !== s &&
      ((i = UE.KismetMathLibrary.VLerp(this.I1e, i, s)),
      t
        ? this.eAo.SetUiCameraAnimationRelativeLocation(i)
        : this.eAo.SetUiCameraAnimationLocation(i));
  }
  bAo(i) {
    var t = this.qAo(2);
    t &&
      ((i = UE.KismetMathLibrary.RLerp(this.oAo, i, t, !0)),
      this.eAo.SetUiCameraAnimationRotation(i));
  }
  DAo(i) {
    var t = this.qAo(3);
    t &&
      ((i = MathUtils_1.MathUtils.Lerp(this.qae, i, t)),
      this.eAo.SetSpringArmLength(i));
  }
  RAo(i) {
    var t = this.qAo(4);
    t &&
      ((i = UE.KismetMathLibrary.VLerp(this.rAo, i, t)),
      this.eAo.SetSpringArmRelativeLocation(i));
  }
  UAo(i) {
    var t = this.qAo(5);
    t &&
      ((i = UE.KismetMathLibrary.RLerp(this.nAo, i, t, !0)),
      this.eAo.SetSprintArmRelativeRotation(i));
  }
  AAo(i) {
    var t = this.qAo(6);
    t &&
      ((i = MathUtils_1.MathUtils.Lerp(this.sAo, i, t)),
      this.eAo.SetCameraFieldOfView(i));
  }
  PAo(i) {
    var t = this.qAo(7);
    t &&
      ((i = MathUtils_1.MathUtils.Lerp(this.aAo, i, t)),
      this.eAo.SetCameraFocalDistance(i));
  }
  xAo(i) {
    var t = this.qAo(9);
    t &&
      ((i = MathUtils_1.MathUtils.Lerp(this.hAo, i, t)),
      this.eAo.SetCameraAperture(i));
  }
  wAo(i) {
    var t = this.qAo(8);
    t &&
      ((i = MathUtils_1.MathUtils.Lerp(this.lAo, i, t)),
      this.eAo.SetCameraPostProcessBlendWeight(i));
  }
  qAo(i) {
    return this.GetCurveFloatValue(i, this.iAo);
  }
  SAo() {
    var i;
    if (
      (this.CAo?.IsValid() ||
        ((i = this.tAo?.CommonCurve),
        UE.KismetSystemLibrary.IsValidSoftObjectReference(i) &&
          ((i = i.ToAssetPathName()),
          StringUtils_1.StringUtils.IsEmpty(i) ||
            ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.CurveFloat, (i) => {
              this.CAo = i;
            }))),
      this._Ao.size <= 0)
    ) {
      var t = this.tAo?.CurveMap,
        s = t.GetMaxIndex();
      for (let i = 0; i < s; i++) {
        const a = t.GetKey(i).valueOf();
        var e = t.Get(a);
        UE.KismetSystemLibrary.IsValidSoftObjectReference(e) &&
          ((e = e.ToAssetPathName()),
          StringUtils_1.StringUtils.IsEmpty(e) ||
            ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.CurveFloat, (i) => {
              this._Ao.set(a, i);
            }));
      }
    }
  }
  GetCurveFloat(i) {
    i = this._Ao.get(i);
    return i || this.CAo;
  }
  GetCurveFloatValue(i, t) {
    return t > this.GetTimeLength
      ? 1
      : (i = this.GetCurveFloat(i))
        ? ((i = i.GetFloatValue(t)), Math.min(i, 1))
        : void 0;
  }
  get GetTimeLength() {
    return this.uAo;
  }
}
exports.UiCameraAnimation = UiCameraAnimation;
//# sourceMappingURL=UiCameraAnimation.js.map
