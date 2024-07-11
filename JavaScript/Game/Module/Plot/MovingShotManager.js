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
        var e, i;
        (this._Yi = ResourceSystem_1.ResourceSystem.InvalidId),
          t &&
            ObjectUtils_1.ObjectUtils.IsValid(t) &&
            ((e = ActorSystem_1.ActorSystem.Spawn(
              UE.LevelSequenceActor.StaticClass(),
              new UE.Transform(),
              void 0,
            )),
            (this.lYi = e),
            this.lYi.SetSequence(t),
            this.uYi &&
              ((t =
                ControllerHolder_1.ControllerHolder.CameraController.SequenceCamera.DisplayComponent.CineCamera.GetTransform()),
              (this.lYi.bOverrideInstanceData = !0),
              (this.lYi.DefaultInstanceData.TransformOrigin = t)),
            (t = UE.NewArray(UE.Actor)),
            (i =
              ModelManager_1.ModelManager.CameraModel.SequenceCamera
                .DisplayComponent.CineCamera),
            t.Add(i),
            i.ResetSeqCineCamSetting(),
            this.lYi.SetBindingByTag(SequenceDefine_1.CAMERA_TAG, t, !1, !0),
            e.SequencePlayer.OnStop.Add(this.mYi),
            e.SequencePlayer.Play());
      }),
      (this.mYi = () => {
        this.Stop();
      });
  }
  Play(t, e) {
    this.sye && this.Stop(),
      (this.sye = !0),
      (this.uYi = e),
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
        ActorSystem_1.ActorSystem.Put(this.lYi)),
      (this.lYi = void 0));
  }
}
class CameraCurvePlayer {
  constructor() {
    (this.dYi = void 0),
      (this.fDe = void 0),
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
      ControllerHolder_1.ControllerHolder.CameraController.SequenceCamera.DisplayComponent.CineCamera.K2_SetActorTransform(
        this.dYi.ToUeTransform(),
        !1,
        void 0,
        !0,
      );
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
    var e, i, s;
    this.sye &&
      ((e =
        ControllerHolder_1.ControllerHolder.CameraController.SequenceCamera
          .DisplayComponent.CineCamera),
      (this.zZt += t),
      this.zZt > this.gYi
        ? (e.K2_SetActorTransform(this.fDe.ToUeTransform(), !1, void 0, !0),
          this.Stop())
        : ((t = this.zZt / this.gYi),
          (t = MathUtils_1.MathUtils.GetCubicValue(t)),
          (i = this.CYi.GetLocation()),
          (s = this.CYi.GetRotation()),
          Vector_1.Vector.Lerp(
            this.dYi.GetLocation(),
            this.fDe.GetLocation(),
            t,
            i,
          ),
          Quat_1.Quat.Slerp(
            this.dYi.GetRotation(),
            this.fDe.GetRotation(),
            t,
            s,
          ),
          e.K2_SetActorTransform(this.CYi.ToUeTransform(), !1, void 0, !0)));
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
        var e = t;
        StringUtils_1.StringUtils.IsEmpty(e.Sequence) ||
          this.$pt.Play(e.Sequence, !0),
          e.CamShake && this.MYi.Play(e.CamShake),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Plot",
              27,
              "剧情预设运镜开始",
              ["path", e.Sequence],
              ["shake", e.CamShake?.CameraShakeBp],
            );
        break;
      case IAction_1.EShowTalkCameraMotionType.Tween:
        e = t;
        this.vYi.Play(e),
          e.CamShake && this.MYi.Play(e.CamShake),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Plot", 27, "剧情插值运镜开始", [
              "shake",
              e.CamShake?.CameraShakeBp,
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
