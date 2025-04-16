"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MovingShotManager = void 0);
const UE = require("ue"),
  ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
  Log_1 = require("../../../Core/Common/Log"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  Quat_1 = require("../../../Core/Utils/Math/Quat"),
  Transform_1 = require("../../../Core/Utils/Math/Transform"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
  PublicUtil_1 = require("../../Common/PublicUtil"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  Global_1 = require("../../Global"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  SequenceDefine_1 = require("./Sequence/SequenceDefine");
class CameraSequencePlayer {
  constructor() {
    (this.lYi = void 0),
      (this._Yi = ResourceSystem_1.ResourceSystem.InvalidId),
      (this.sye = !1),
      (this.uYi = !1),
      (this.cYi = (t) => {
        var i, s;
        (this._Yi = ResourceSystem_1.ResourceSystem.InvalidId),
          t &&
            ObjectUtils_1.ObjectUtils.IsValid(t) &&
            ((i = ActorSystem_1.ActorSystem.Spawn(
              UE.LevelSequenceActor.StaticClass(),
              new UE.TransformDouble(),
              void 0,
            )),
            (this.lYi = i),
            this.lYi.SetSequence(t),
            this.uYi &&
              ((t =
                ControllerHolder_1.ControllerHolder.CameraController.SequenceCamera.DisplayComponent.CineCamera.D_GetTransform()),
              (this.lYi.bOverrideInstanceData = !0),
              (s = this.lYi.DefaultInstanceData),
              (t = UE.KismetMathLibrary.Conv_TransformDoubleToTransform(t)),
              (s.TransformOrigin = t)),
            (s = UE.NewArray(UE.Actor)),
            (t =
              ModelManager_1.ModelManager.CameraModel.SequenceCamera
                .DisplayComponent.CineCamera),
            s.Add(t),
            t.ResetSeqCineCamSetting(),
            this.lYi.SetBindingByTag(SequenceDefine_1.CAMERA_TAG, s, !1, !0),
            i.SequencePlayer.OnStop.Add(this.mYi),
            i.SequencePlayer.Play());
      }),
      (this.mYi = () => {
        this.Stop();
      });
  }
  Play(t, i) {
    this.sye && this.Stop(),
      (this.sye = !0),
      (this.uYi = i),
      (this._Yi = ResourceSystem_1.ResourceSystem.LoadAsync(
        t,
        UE.LevelSequence,
        this.cYi,
      ));
  }
  Stop() {
    this.sye &&
      ((this.sye = !1),
      this._Yi !== ResourceSystem_1.ResourceSystem.InvalidId &&
        (ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this._Yi),
        (this._Yi = ResourceSystem_1.ResourceSystem.InvalidId)),
      this.lYi &&
        (this.lYi.SequencePlayer.OnStop.Clear(),
        this.lYi.SequencePlayer.Stop(),
        this.lYi.ResetBindings(),
        ActorSystem_1.ActorSystem.Put("CameraSequencePlayer.Stop", this.lYi)),
      (this.lYi = void 0));
  }
}
class CameraParam {
  constructor() {
    (this.Aperture = void 0),
      (this.FocalLength = 0),
      (this.FocusDistance = 0),
      (this.FocalRegion = 0);
  }
  get ApertureEnable() {
    return void 0 !== this.Aperture;
  }
  get FocalLengthEnable() {
    return void 0 !== this.FocalLength && 0 !== this.FocalLength;
  }
  get FocusDistanceEnable() {
    return void 0 !== this.FocusDistance;
  }
  get FocalRegionEnable() {
    return void 0 !== this.FocalRegion;
  }
}
class CameraCurvePlayer {
  constructor() {
    (this.dYi = void 0),
      (this.fDe = void 0),
      (this.Qih = new CameraParam()),
      (this.Kih = new CameraParam()),
      (this.CYi = Transform_1.Transform.Create()),
      (this.gYi = 0),
      (this.zZt = 0),
      (this.sye = !1);
  }
  Play(t) {
    this.sye && this.Stop(),
      (this.sye = !0),
      (this.dYi = PublicUtil_1.PublicUtil.CreateTransformFromConfig(
        t.Start.Pos,
        t.Start.Rot,
        Vector_1.Vector.OneVectorProxy,
      )),
      (this.fDe = PublicUtil_1.PublicUtil.CreateTransformFromConfig(
        t.End.Pos,
        t.End.Rot,
        Vector_1.Vector.OneVectorProxy,
      )),
      (this.gYi = t.Duration * TimeUtil_1.TimeUtil.InverseMillisecond),
      this.CYi.SetScale3D(Vector_1.Vector.OneVectorProxy),
      (this.Qih.Aperture = t.Start.Aperture),
      (this.Qih.FocalLength = t.Start.FocalLength),
      (this.Qih.FocusDistance = t.Start.FocusDistance),
      (this.Qih.FocalRegion = t.Start.FocalRegion),
      (this.Kih.Aperture = t.End.Aperture),
      (this.Kih.FocalLength = t.End.FocalLength),
      (this.Kih.FocusDistance = t.End.FocusDistance),
      (this.Kih.FocalRegion = t.End.FocalRegion);
    var t =
        ControllerHolder_1.ControllerHolder.CameraController.SequenceCamera
          .DisplayComponent.CineCamera,
      i = t.CameraComponent;
    t.D_K2_SetActorTransform(this.dYi.ToUeTransform(), !1, void 0, !0),
      this.Qih.ApertureEnable && (i.CurrentAperture = this.Qih.Aperture),
      this.Qih.FocalLengthEnable &&
        (i.CurrentFocalLength = this.Qih.FocalLength),
      this.Qih.FocusDistanceEnable &&
        (i.FocusSettings.ManualFocusDistance = this.Qih.FocusDistance),
      this.Qih.FocalRegionEnable &&
        (i.CurrentFocalRegion = this.Qih.FocalRegion);
  }
  Stop() {
    this.sye &&
      ((this.zZt = 0),
      (this.gYi = 0),
      (this.dYi = void 0),
      (this.fDe = void 0),
      this.CYi.Reset(),
      (this.sye = !1));
  }
  OnTick(t) {
    var i, s, e, h;
    this.sye &&
      ((i = (h =
        ControllerHolder_1.ControllerHolder.CameraController.SequenceCamera
          .DisplayComponent.CineCamera).CameraComponent),
      (this.zZt += t),
      this.zZt > this.gYi
        ? (h.D_K2_SetActorTransform(this.fDe.ToUeTransform(), !1, void 0, !0),
          this.Kih.ApertureEnable && (i.CurrentAperture = this.Kih.Aperture),
          this.Kih.FocalLengthEnable &&
            (i.CurrentFocalLength = this.Kih.FocalLength),
          this.Kih.FocusDistanceEnable &&
            (i.FocusSettings.ManualFocusDistance = this.Kih.FocusDistance),
          this.Kih.FocalRegionEnable &&
            (i.CurrentFocalRegion = this.Kih.FocalRegion),
          this.Stop())
        : ((t = this.zZt / this.gYi),
          (t = MathUtils_1.MathUtils.GetCubicValue(t)),
          (s = this.CYi.GetLocation()),
          (e = this.CYi.GetRotation()),
          Vector_1.Vector.Lerp(
            this.dYi.GetLocation(),
            this.fDe.GetLocation(),
            t,
            s,
          ),
          Quat_1.Quat.Slerp(
            this.dYi.GetRotation(),
            this.fDe.GetRotation(),
            t,
            e,
          ),
          h.D_K2_SetActorTransform(this.CYi.ToUeTransform(), !1, void 0, !0),
          this.Qih.ApertureEnable &&
            this.Kih.ApertureEnable &&
            (i.CurrentAperture = MathUtils_1.MathUtils.Lerp(
              this.Qih.Aperture,
              this.Kih.Aperture,
              t,
            )),
          this.Qih.FocalLengthEnable &&
            this.Kih.FocalLengthEnable &&
            ((s = MathUtils_1.MathUtils.Lerp(
              this.Qih.FocalLength,
              this.Kih.FocalLength,
              t,
            )),
            (i.CurrentFocalLength = s)),
          this.Qih.FocusDistanceEnable &&
            this.Kih.FocusDistanceEnable &&
            ((e = MathUtils_1.MathUtils.Lerp(
              this.Qih.FocusDistance,
              this.Kih.FocusDistance,
              t,
            )),
            (i.FocusSettings.ManualFocusDistance = e)),
          this.Qih.FocalRegionEnable &&
            this.Kih.FocalRegionEnable &&
            ((h = MathUtils_1.MathUtils.Lerp(
              this.Qih.FocalRegion,
              this.Kih.FocalRegion,
              t,
            )),
            (i.CurrentFocalRegion = h))));
  }
}
class CameraShakePlayer {
  constructor() {
    (this.fYi = ResourceSystem_1.ResourceSystem.InvalidId),
      (this.pYi = void 0),
      (this.sye = !1);
  }
  Play(t) {
    this.sye && this.Stop(),
      (this.sye = !0),
      (this.fYi = ResourceSystem_1.ResourceSystem.LoadAsync(
        t.CameraShakeBp + "_C",
        UE.Class,
        (t) => {
          (this.fYi = ResourceSystem_1.ResourceSystem.InvalidId),
            t?.IsValid() &&
              (this.pYi =
                Global_1.Global.CharacterCameraManager.StartMatineeCameraShake(
                  t,
                ));
        },
      ));
  }
  Stop() {
    this.sye &&
      ((this.sye = !1),
      this.fYi !== ResourceSystem_1.ResourceSystem.InvalidId &&
        (ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.fYi),
        (this.fYi = ResourceSystem_1.ResourceSystem.InvalidId)),
      this.pYi) &&
      (Global_1.Global.CharacterCameraManager.StopCameraShake(this.pYi),
      (this.pYi = void 0));
  }
}
class MovingShotManager {
  constructor() {
    (this.$pt = new CameraSequencePlayer()),
      (this.vYi = new CameraCurvePlayer()),
      (this.MYi = new CameraShakePlayer());
  }
  Play(t) {
    switch ((this.Stop(), t.Type)) {
      case IAction_1.EShowTalkCameraMotionType.Preset:
        var i = t;
        StringUtils_1.StringUtils.IsEmpty(i.Sequence) ||
          this.$pt.Play(i.Sequence, !0),
          i.CamShake && this.MYi.Play(i.CamShake),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Plot",
              26,
              "剧情预设运镜开始",
              ["path", i.Sequence],
              ["shake", i.CamShake?.CameraShakeBp],
            );
        break;
      case IAction_1.EShowTalkCameraMotionType.Tween:
        i = t;
        this.vYi.Play(i),
          i.CamShake && this.MYi.Play(i.CamShake),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Plot", 26, "剧情插值运镜开始", [
              "shake",
              i.CamShake?.CameraShakeBp,
            ]);
    }
  }
  Stop() {
    this.$pt.Stop(), this.vYi.Stop(), this.MYi.Stop();
  }
  OnTick(t) {
    this.vYi.OnTick(t);
  }
}
exports.MovingShotManager = MovingShotManager;
//# sourceMappingURL=MovingShotManager.js.map
