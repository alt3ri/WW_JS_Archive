"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CameraAssistant = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  ActorSystem_1 = require("../../../../../Core/Actor/ActorSystem"),
  Log_1 = require("../../../../../Core/Common/Log"),
  CameraBlueprintFunctionLibrary_1 = require("../../../../Camera/CameraBlueprintFunctionLibrary"),
  CameraController_1 = require("../../../../Camera/CameraController"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiCameraPostEffectComponent_1 = require("../../../UiCamera/UiCameraComponent/UiCameraPostEffectComponent"),
  UiCameraManager_1 = require("../../../UiCamera/UiCameraManager"),
  SequenceDefine_1 = require("../SequenceDefine"),
  SeqBaseAssistant_1 = require("./SeqBaseAssistant");
class CameraAssistant extends SeqBaseAssistant_1.SeqBaseAssistant {
  constructor() {
    super(...arguments),
      (this.aio = !1),
      (this.YQs = void 0),
      (this.JQs = void 0);
  }
  PreAllPlay() {
    var e;
    this.Model.IsViewTargetControl &&
      ((e = this.Model.SequenceData.CameraBlendInTime),
      CameraController_1.CameraController.EnterCameraMode(1, e),
      (this.aio = !0),
      ModelManager_1.ModelManager.PlotModel.PlotConfig.IsPreStreaming) &&
      (this.YQs ||
        (this.YQs = ActorSystem_1.ActorSystem.Spawn(
          UE.BP_StreamingSourceActor_C.StaticClass(),
          new UE.Transform(),
          void 0,
        )),
      this.JQs ||
        ((this.JQs = ActorSystem_1.ActorSystem.Spawn(
          UE.BP_StreamingSourceActor_C.StaticClass(),
          new UE.Transform(),
          void 0,
        )),
        (e =
          ModelManager_1.ModelManager.CameraModel.SequenceCamera
            .DisplayComponent.CineCamera),
        this.JQs.K2_AttachToActor(e, void 0, 2, 1, 1, !1)));
  }
  PreEachPlay() {
    var e = UE.NewArray(UE.Actor),
      r =
        ModelManager_1.ModelManager.CameraModel.SequenceCamera.DisplayComponent
          .CineCamera;
    r.ResetSeqCineCamSetting(),
      e.Add(r),
      this.Model.CurLevelSeqActor.SetBindingByTag(
        SequenceDefine_1.CAMERA_TAG,
        e,
        !1,
        !0,
      ),
      CameraController_1.CameraController.SequenceCamera.DisplayComponent.CineCamera.K2_SetActorTransform(
        ModelManager_1.ModelManager.CameraModel.CameraTransform,
        !1,
        void 0,
        !0,
      );
  }
  EachStop() {
    ModelManager_1.ModelManager.CameraModel.SequenceCamera.DisplayComponent.CineCamera.ResetSeqCineCamSetting();
  }
  AllStop() {
    var e, r, a;
    this.Model.IsViewTargetControl &&
      (this.Model.Config.KeepCamera
        ? (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Plot", 27, "剧情Seq结束时相机状态: KeepCamera"),
          (this.aio = !1),
          (a = ModelManager_1.ModelManager.CameraModel).SaveSeqCamera(),
          (a = a.GetSavedSeqCameraThings()) ||
            (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Camera",
                8,
                "读取Sequence相机信息时，信息不存在",
              )),
          (e = UiCameraManager_1.UiCameraManager.Get()).SetWorldLocation(
            a.CameraLocation,
          ),
          e.SetWorldRotation(a.CameraRotation),
          (r = e.GetUiCameraComponent(
            UiCameraPostEffectComponent_1.UiCameraPostEffectComponent,
          )).SetCameraAperture(a.CurrentAperture),
          r.SetCameraFocalDistance(a.FocusSettings.ManualFocusDistance),
          r.SetCameraFieldOfView(a.FieldOfView),
          CameraController_1.CameraController.ExitCameraMode(1),
          e.Enter())
        : (this.Model.Config.ResetCamera
            ? (Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug(
                  "Plot",
                  27,
                  "剧情Seq结束时相机状态: ResetCamera",
                ),
              CameraBlueprintFunctionLibrary_1.default.ResetFightCameraPitchAndArmLength())
            : (Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug(
                  "Plot",
                  27,
                  "剧情Seq结束时相机状态: 继承seq相机",
                ),
              ((r =
                CameraController_1.CameraController.SequenceCamera.DisplayComponent.CineCamera.K2_GetActorRotation()).Roll =
                0),
              CameraController_1.CameraController.FightCamera.LogicComponent.SetRotation(
                r,
              )),
          (a = this.Model.SequenceData.CameraBlendOutTime),
          (this.aio = !1),
          0 === a &&
            ControllerHolder_1.ControllerHolder.SequenceController.DisableMotionBlurAwhile(),
          CameraController_1.CameraController.ExitCameraMode(1, a, 0, 0)));
  }
  End() {
    this.aio && CameraController_1.CameraController.ExitCameraMode(1),
      ModelManager_1.ModelManager.CameraModel.SequenceCamera.DisplayComponent.CineCamera.ResetSeqCineCamSetting(),
      this.YQs &&
        this.YQs.WorldPartitionStreamingSource?.DisableStreamingSource(),
      this.JQs &&
        this.JQs.WorldPartitionStreamingSource?.DisableStreamingSource();
  }
  CalcPreloadLocation() {
    if (ModelManager_1.ModelManager.PlotModel.PlotConfig.IsPreStreaming) {
      this.JQs?.WorldPartitionStreamingSource?.EnableStreamingSource();
      var a =
        this.Model.CurLevelSeqActor.SequencePlayer.GetCurrentTime().Time
          .FrameNumber.Value;
      let e = SequenceDefine_1.MAX_FRAME,
        r = !1;
      for (const i of this.Model.CurShotStartFrames)
        if (i > a) {
          (e = i + 1), (r = !0);
          break;
        }
      var o = this.Model.CurLevelSeqActor?.GetSequence(),
        t = (0, puerts_1.$ref)(void 0);
      r &&
      UE.KuroSequenceRuntimeFunctionLibrary.GetFrameTransformByTag(
        o,
        SequenceDefine_1.CAMERA_TAG,
        e,
        t,
      )
        ? (this.YQs?.K2_SetActorTransform(
            (0, puerts_1.$unref)(t),
            !1,
            void 0,
            !0,
          ),
          this.YQs?.WorldPartitionStreamingSource?.EnableStreamingSource(),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Plot",
              39,
              "演出相机预流送",
              ["CurFrame", a],
              ["TarFrame", e],
              [
                "curPos",
                ModelManager_1.ModelManager.CameraModel.SequenceCamera.DisplayComponent.CineCamera.K2_GetActorLocation(),
              ],
              ["tarPos", this.YQs?.K2_GetActorLocation()],
            ))
        : this.YQs?.WorldPartitionStreamingSource?.DisableStreamingSource();
    }
  }
}
exports.CameraAssistant = CameraAssistant;
//# sourceMappingURL=CameraAssistant.js.map
