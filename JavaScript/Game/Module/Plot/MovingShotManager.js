"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MovingShotManager = void 0);
const UE = require("ue");
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const Log_1 = require("../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const Quat_1 = require("../../../Core/Utils/Math/Quat");
const Transform_1 = require("../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const PublicUtil_1 = require("../../Common/PublicUtil");
const TimeUtil_1 = require("../../Common/TimeUtil");
const Global_1 = require("../../Global");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const SequenceDefine_1 = require("./Sequence/SequenceDefine");
class CameraSequencePlayer {
  constructor() {
    (this.u$i = void 0),
      (this.c$i = ResourceSystem_1.ResourceSystem.InvalidId),
      (this.sye = !1),
      (this.m$i = !1),
      (this.d$i = (t) => {
        let e, i;
        (this.c$i = ResourceSystem_1.ResourceSystem.InvalidId),
          t &&
            ObjectUtils_1.ObjectUtils.IsValid(t) &&
            ((e = ActorSystem_1.ActorSystem.Spawn(
              UE.LevelSequenceActor.StaticClass(),
              new UE.Transform(),
              void 0,
            )),
            (this.u$i = e),
            this.u$i.SetSequence(t),
            this.m$i &&
              ((t =
                ControllerHolder_1.ControllerHolder.CameraController.SequenceCamera.DisplayComponent.CineCamera.GetTransform()),
              (this.u$i.bOverrideInstanceData = !0),
              (this.u$i.DefaultInstanceData.TransformOrigin = t)),
            (t = UE.NewArray(UE.Actor)),
            (i =
              ModelManager_1.ModelManager.CameraModel.SequenceCamera
                .DisplayComponent.CineCamera),
            t.Add(i),
            i.ResetSeqCineCamSetting(),
            this.u$i.SetBindingByTag(SequenceDefine_1.CAMERA_TAG, t, !1, !0),
            e.SequencePlayer.OnStop.Add(this.C$i),
            e.SequencePlayer.Play());
      }),
      (this.C$i = () => {
        this.Stop();
      });
  }
  Play(t, e) {
    this.sye && this.Stop(),
      (this.sye = !0),
      (this.m$i = e),
      (this.c$i = ResourceSystem_1.ResourceSystem.LoadAsync(
        t,
        UE.LevelSequence,
        this.d$i,
      ));
  }
  Stop() {
    this.sye &&
      ((this.sye = !1),
      this.c$i !== ResourceSystem_1.ResourceSystem.InvalidId &&
        (ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.c$i),
        (this.c$i = ResourceSystem_1.ResourceSystem.InvalidId)),
      this.u$i &&
        (this.u$i.SequencePlayer.OnStop.Clear(),
        this.u$i.SequencePlayer.Stop(),
        this.u$i.ResetBindings(),
        ActorSystem_1.ActorSystem.Put(this.u$i)),
      (this.u$i = void 0));
  }
}
class CameraCurvePlayer {
  constructor() {
    (this.g$i = void 0),
      (this.fDe = void 0),
      (this.f$i = Transform_1.Transform.Create()),
      (this.p$i = 0),
      (this.zzt = 0),
      (this.sye = !1);
  }
  Play(t) {
    this.sye && this.Stop(),
      (this.sye = !0),
      (this.g$i = PublicUtil_1.PublicUtil.CreateTransformFromConfig(
        t.Start.Pos,
        t.Start.Rot,
        Vector_1.Vector.OneVectorProxy,
      )),
      (this.fDe = PublicUtil_1.PublicUtil.CreateTransformFromConfig(
        t.End.Pos,
        t.End.Rot,
        Vector_1.Vector.OneVectorProxy,
      )),
      (this.p$i = t.Duration * TimeUtil_1.TimeUtil.InverseMillisecond),
      this.f$i.SetScale3D(Vector_1.Vector.OneVectorProxy),
      ControllerHolder_1.ControllerHolder.CameraController.SequenceCamera.DisplayComponent.CineCamera.K2_SetActorTransform(
        this.g$i.ToUeTransform(),
        !1,
        void 0,
        !0,
      );
  }
  Stop() {
    this.sye &&
      ((this.zzt = 0),
      (this.p$i = 0),
      (this.g$i = void 0),
      (this.fDe = void 0),
      this.f$i.Reset(),
      (this.sye = !1));
  }
  OnTick(t) {
    let e, i, s;
    this.sye &&
      ((e =
        ControllerHolder_1.ControllerHolder.CameraController.SequenceCamera
          .DisplayComponent.CineCamera),
      (this.zzt += t),
      this.zzt > this.p$i
        ? (e.K2_SetActorTransform(this.fDe.ToUeTransform(), !1, void 0, !0),
          this.Stop())
        : ((t = this.zzt / this.p$i),
          (t = MathUtils_1.MathUtils.GetCubicValue(t)),
          (i = this.f$i.GetLocation()),
          (s = this.f$i.GetRotation()),
          Vector_1.Vector.Lerp(
            this.g$i.GetLocation(),
            this.fDe.GetLocation(),
            t,
            i,
          ),
          Quat_1.Quat.Slerp(
            this.g$i.GetRotation(),
            this.fDe.GetRotation(),
            t,
            s,
          ),
          e.K2_SetActorTransform(this.f$i.ToUeTransform(), !1, void 0, !0)));
  }
}
class CameraShakePlayer {
  constructor() {
    (this.v$i = ResourceSystem_1.ResourceSystem.InvalidId),
      (this.M$i = void 0),
      (this.sye = !1);
  }
  Play(t) {
    this.sye && this.Stop(),
      (this.sye = !0),
      (this.v$i = ResourceSystem_1.ResourceSystem.LoadAsync(
        t.CameraShakeBp + "_C",
        UE.Class,
        (t) => {
          (this.v$i = ResourceSystem_1.ResourceSystem.InvalidId),
            t?.IsValid() &&
              (this.M$i =
                Global_1.Global.CharacterCameraManager.StartMatineeCameraShake(
                  t,
                ));
        },
      ));
  }
  Stop() {
    this.sye &&
      ((this.sye = !1),
      this.v$i !== ResourceSystem_1.ResourceSystem.InvalidId &&
        (ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.v$i),
        (this.v$i = ResourceSystem_1.ResourceSystem.InvalidId)),
      this.M$i) &&
      (Global_1.Global.CharacterCameraManager.StopCameraShake(this.M$i),
      (this.M$i = void 0));
  }
}
class MovingShotManager {
  constructor() {
    (this.Gft = new CameraSequencePlayer()),
      (this.S$i = new CameraCurvePlayer()),
      (this.E$i = new CameraShakePlayer());
  }
  Play(t) {
    switch ((this.Stop(), t.Type)) {
      case IAction_1.EShowTalkCameraMotionType.Preset:
        var e = t;
        StringUtils_1.StringUtils.IsEmpty(e.Sequence) ||
          this.Gft.Play(e.Sequence, !0),
          e.CamShake && this.E$i.Play(e.CamShake),
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
        this.S$i.Play(e),
          e.CamShake && this.E$i.Play(e.CamShake),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Plot", 27, "剧情插值运镜开始", [
              "shake",
              e.CamShake?.CameraShakeBp,
            ]);
    }
  }
  Stop() {
    this.Gft.Stop(), this.S$i.Stop(), this.E$i.Stop();
  }
  OnTick(t) {
    this.S$i.OnTick(t);
  }
}
exports.MovingShotManager = MovingShotManager;
// # sourceMappingURL=MovingShotManager.js.map
