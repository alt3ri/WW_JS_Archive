"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CameraController = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  ActorSystem_1 = require("../../Core/Actor/ActorSystem"),
  Info_1 = require("../../Core/Common/Info"),
  Log_1 = require("../../Core/Common/Log"),
  Time_1 = require("../../Core/Common/Time"),
  ControllerBase_1 = require("../../Core/Framework/ControllerBase"),
  TimerSystem_1 = require("../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../Common/Event/EventDefine"),
  EventSystem_1 = require("../Common/Event/EventSystem"),
  Global_1 = require("../Global"),
  GlobalData_1 = require("../GlobalData"),
  ModelManager_1 = require("../Manager/ModelManager"),
  CameraParams_1 = require("./CameraParams"),
  CameraUtility_1 = require("./CameraUtility"),
  SECOND_TO_MILLISECOND = 1e3,
  CONSTRAIN_ASPECT_RATIO = 1.76,
  constrainAspectRatioGameplayTag = 1831918996;
class CameraController extends ControllerBase_1.ControllerBase {
  static get Model() {
    return ModelManager_1.ModelManager.CameraModel;
  }
  static get FightCamera() {
    return this.Model.FightCamera;
  }
  static get SequenceCamera() {
    return this.Model.SequenceCamera;
  }
  static get WidgetCamera() {
    return this.Model.WidgetCamera;
  }
  static get SceneCamera() {
    return this.Model.SceneCamera;
  }
  static get OrbitalCamera() {
    return this.Model.OrbitalCamera;
  }
  static get FreeCamera() {
    return this.Model.FreeCamera;
  }
  static get CameraLocation() {
    return this.Model.CameraLocation;
  }
  static get CameraRotator() {
    return this.Model.CameraRotator;
  }
  static get CameraDitherStartHideDistance() {
    return this.Model.CameraDitherStartHideDistance;
  }
  static OnInit() {
    return (
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnChangeRole,
        CameraController.xie,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BeforeLoadMap,
        CameraController.SMe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.AfterLoadMap,
        CameraController.yMe,
      ),
      super.OnInit()
    );
  }
  static OnPossess(e) {
    this.FightCamera.LogicComponent.SetPawn(e),
      this.SequenceCamera.PlayerComponent.SetPawn(e);
  }
  static SetViewTarget(e, t, a = 0, r = 0, i = 0, s, o) {
    var n;
    e?.IsValid()
      ? (n = this.GetPlayerController()) &&
        ((n.bShouldPerformFullTickWhenPaused = !0),
        (this.Model.CurrentCameraActor = e),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Battle",
            33,
            "绑定相机 SetViewTarget",
            ["name", e.GetName()],
            ["blendTime", a],
            ["reason", t],
          ),
        n.SetViewTargetWithBlend(
          e,
          CameraUtility_1.CameraUtility.CharacterMovementBaseIsMoving() ? 0 : a,
          r,
          i,
          s ?? !1,
          o ?? !1,
        ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.CameraViewTargetChanged,
          CameraUtility_1.CameraUtility.CharacterMovementBaseIsMoving() ? 0 : a,
        ))
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Camera", 6, "Camera not valid");
  }
  static ResetViewTarget(e = 0, t = 0, a = 0) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Battle", 33, "绑定相机 ResetViewTarget", [
        "name",
        this.Model.CurrentCameraActor.GetName(),
      ]),
      this.GetPlayerController().SetViewTargetWithBlend(
        this.Model.CurrentCameraActor,
        e,
        t,
        a,
        !0,
        !0,
      );
  }
  static OnTick(e) {
    this.Model.CurrentCameraActor?.IsValid() &&
      (this.Model.CameraLocation.FromUeVector(
        this.Model.CurrentCameraActor.D_K2_GetActorLocation(),
      ),
      this.Model.CameraRotator.DeepCopy(
        this.Model.CurrentCameraActor.K2_GetActorRotation(),
      ),
      (this.Model.CameraTransform =
        this.Model.CurrentCameraActor.D_GetTransform()),
      this.UpdateCameraDitherRadius());
  }
  static EnterCameraMode(e, t = 0, a = 0, r = 0, i = () => {}, s = !1) {
    return 0 === e
      ? (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Camera",
            14,
            "战斗镜头不应主动切换，应由其他镜头退出时被动切换",
          ),
        !1)
      : (this.Model.EnableMode(e),
        this.Model.IsInHigherMode(e)
          ? (Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Camera",
                6,
                "意图进入较低优先级的镜头",
                ["CurrentMode", this.Model.CameraMode],
                ["NewMode", e],
              ),
            s && i && i(),
            !1)
          : this.uhe(e, t, a, r, i));
  }
  static ExitCameraMode(e, t = 0, a = 0, r = 0, i = () => {}) {
    return 0 === e
      ? (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Camera",
            14,
            "战斗镜头不应主动切换，应由其他镜头退出时被动切换",
          ),
        !1)
      : (this.Model.DisableMode(e),
        this.uhe(this.Model.GetNextMode(), t, a, r, i));
  }
  static GetCameraRotation(e) {
    var t = this.FightCamera?.LogicComponent;
    return (
      0 === this.Model.CameraMode &&
      !CameraController?.IsInCameraModeBlending &&
      t
        ? e.FromUeRotator(t.CameraRotation)
        : e.FromUeRotator(
            Global_1.Global.CharacterCameraManager.GetCameraRotation(),
          ),
      e
    );
  }
  static uhe(e, t = 0, a = 0, r = 0, i = () => {}) {
    var s = this.Model;
    if (s.CameraMode === e) return !1;
    s.SetCameraMode(e);
    let o = void 0;
    switch (
      ((1 !== e && 3 !== e) ||
        Global_1.Global.CharacterCameraManager.StopAllCameraShakes(),
      e)
    ) {
      case 0:
        o = this.FightCamera.DisplayComponent.CameraActor;
        break;
      case 1:
        o = this.SequenceCamera.DisplayComponent.CineCamera;
        break;
      case 2:
        o = this.WidgetCamera.DisplayComponent.CineCamera;
        break;
      case 3:
        o = this.SceneCamera.DisplayComponent.CineCamera;
        break;
      case 4:
        o = this.OrbitalCamera.DisplayComponent.CineCamera;
        break;
      case 5:
        o = this.FreeCamera.DisplayComponent.CameraActor;
        break;
      default:
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Camera",
              57,
              "CameraManager.SwitchCameraMode: 错误的镜头模式 ",
              ["mode", e],
            ),
          !1
        );
    }
    return (
      this.SetViewTarget(o, "SwitchMode", t, a, r, !0, !0),
      0 < t
        ? ((this.IsInCameraModeBlending = !0),
          TimerSystem_1.TimerSystem.Delay(() => {
            (this.IsInCameraModeBlending = !1), i && i();
          }, t * SECOND_TO_MILLISECOND))
        : ((this.IsInCameraModeBlending = !1), i && i()),
      !0
    );
  }
  static RefreshSequenceCamera() {
    1 === this.Model.CameraMode &&
      this.SetViewTarget(
        this.SequenceCamera.DisplayComponent.CineCamera,
        "RefreshMode",
      );
  }
  static EnterDialogueMode(e, t = !1) {
    this.FightCamera.LogicComponent.EnterSequenceDialogue(e, t);
  }
  static ExitDialogMode() {
    this.FightCamera.LogicComponent.ExitSequenceDialogue();
  }
  static EnterCameraExplore(e, t, a, r, i, s, o) {
    this.FightCamera.LogicComponent.EnterCameraExplore(e, t, a, r, i, s, o);
  }
  static ExitCameraExplore(e) {
    this.FightCamera.LogicComponent.ExitCameraExplore(e);
  }
  static SpawnCameraActor() {
    var e = this.SpawnActor(UE.CameraActor.StaticClass());
    return (e.CameraComponent.bConstrainAspectRatio = !1), e;
  }
  static SetInputEnable(e, t) {
    this.FightCamera.LogicComponent.CameraInputController.SetInputEnable(e, t);
  }
  static SpawnCineCamera() {
    return this.SpawnActor(UE.BP_CineCamera_C.StaticClass());
  }
  static SpawnActor(e) {
    return ActorSystem_1.ActorSystem.Get(
      e,
      MathUtils_1.MathUtils.DefaultTransformDouble,
    );
  }
  static GetCharacter() {
    return Global_1.Global.BaseCharacter;
  }
  static GetPlayerController() {
    return Global_1.Global.CharacterController;
  }
  static GetCameraConfigs(e = void 0) {
    var t = (0, puerts_1.$ref)(UE.NewArray(UE.SCamera_Setting));
    return (
      UE.BPL_CameraUtility_C.DtGetCameraConfigs(
        t,
        e,
        GlobalData_1.GlobalData.World,
      ),
      (0, puerts_1.$unref)(t)
    );
  }
  static GetCameraConfigList(e = void 0) {
    var t = (0, puerts_1.$ref)(UE.NewArray(UE.SCameraConfig));
    return (
      UE.BPL_CameraUtility_C.DtGetCameraConfigList(
        t,
        e,
        GlobalData_1.GlobalData.World,
      ),
      (0, puerts_1.$unref)(t)
    );
  }
  static GetPlayerCameraManager() {
    return Global_1.Global.CharacterCameraManager;
  }
  static SetTimeDilation(e) {
    ModelManager_1.ModelManager.CameraModel.FightCamera.SetTimeDilation(e),
      ModelManager_1.ModelManager.CameraModel.SequenceCamera.SetTimeDilation(e),
      ModelManager_1.ModelManager.CameraModel.WidgetCamera.SetTimeDilation(e),
      ModelManager_1.ModelManager.CameraModel.OrbitalCamera.SetTimeDilation(e),
      ModelManager_1.ModelManager.CameraModel.FreeCamera?.SetTimeDilation(e),
      (Global_1.Global.CharacterCameraManager.CameraModifyCustomTimeDilation =
        e);
  }
  static PlayWorldCameraShake(e, t, a, r, i, s) {
    this.IsSettlementCamera() ||
      this.IsSequenceCameraInCinematic() ||
      (0 < CameraController.Model.ShakeModify &&
        UE.GameplayStatics.D_PlayWorldCameraShakeWithModifier(
          GlobalData_1.GlobalData.World,
          e,
          t,
          a,
          r,
          i,
          s,
          CameraController.Model.ShakeModify,
        ),
      this.PlayForceFeedbackFromCameraShake(e));
  }
  static PlayCameraShake(e, t = void 0, a = void 0, r = void 0, i = !1) {
    !Global_1.Global.CharacterCameraManager?.IsValid() ||
      this.IsSettlementCamera() ||
      this.IsSequenceCameraInCinematic() ||
      (Global_1.Global.CharacterCameraManager.StartCameraShake(e, t, a, r),
      i && this.PlayForceFeedbackFromCameraShake(e));
  }
  static PlayForceFeedbackFromCameraShake(e) {
    Info_1.Info.IsInGamepad() &&
      e?.IsChildOf(UE.BP_CameraShakeAndForceFeedback_C.StaticClass()) &&
      (e = UE.KuroStaticLibrary.GetDefaultObject(e).ForceFeedbackEffect) &&
      Global_1.Global.CharacterController &&
      Global_1.Global.CharacterController.PlayKuroForceFeedback(
        e,
        void 0,
        !1,
        !1,
        !1,
      );
  }
  static LoadCharacterCameraConfig(e) {
    this.FightCamera.LogicComponent.CameraConfigController.LoadCharacterConfig(
      e,
    );
  }
  static UnloadCharacterCameraConfig(e) {
    this.FightCamera.LogicComponent.CameraConfigController.UnloadCharacterConfig(
      e,
    );
  }
  static ReturnLockOnCameraMode(t = 0, a = 0, r = 0, i = () => {}) {
    if (0 !== this.Model.CameraMode) {
      let e = this.Model.CameraMode;
      for (; 0 !== e; )
        this.Model.DisableMode(e), (e = this.Model.GetNextMode());
      this.uhe(e, t, a, r, i);
    }
  }
  static IsSequenceCameraInCinematic() {
    var e = CameraController.SequenceCamera?.GetComponent(10);
    return !!e?.Valid && e.GetIsInCinematic();
  }
  static UpdateCameraDitherRadius() {
    if (!(Time_1.Time.Now < this.Model.NextFindStartHideDistanceTime)) {
      this.Model.NextFindStartHideDistanceTime =
        Time_1.Time.Now + CameraParams_1.FIND_DITHER_START_HIDE_DISTANCE_PERIOD;
      var e,
        t = [];
      ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRange(
        CameraParams_1.DITHER_START_HIDE_DISTANCE_THRESHOLD,
        62,
        t,
      ),
        (this.Model.CameraDitherStartHideDistance =
          this.FightCamera.LogicComponent.StartHideDistance);
      for (const a of t)
        a.Entity?.Active &&
          (!(e = a.Entity.GetComponent(3)) ||
            e.StartHideDistance <= this.Model.CameraDitherStartHideDistance ||
            (this.Model.CameraDitherStartHideDistance = e.StartHideDistance));
    }
  }
  static IsSettlementCamera() {
    return (
      !!this.FightCamera?.LogicComponent?.SettlementCamera &&
      this.FightCamera.LogicComponent.SettlementCamera.IsPlayingSettlementCamera()
    );
  }
  static StopAllCameraShakes() {
    Global_1.Global.CharacterCameraManager.StopAllCameraShakes();
  }
  static SetFirstPersonEnable(e) {
    this.Model.FirstPersonEnabled = e;
  }
  static uml(e) {
    var t,
      a,
      r = this.FightCamera?.LogicComponent?.CameraActor;
    r?.IsValid() &&
      Global_1.Global.CharacterController &&
      (r.CameraComponent.bConstrainAspectRatio === e ||
        ((t = (0, puerts_1.$ref)(0)),
        (a = (0, puerts_1.$ref)(0)),
        Global_1.Global.CharacterController.GetViewportSize(t, a),
        (0, puerts_1.$unref)(t) / (0, puerts_1.$unref)(a) >=
          CONSTRAIN_ASPECT_RATIO) ||
        (r.CameraComponent.bConstrainAspectRatio = e));
  }
  static OnClear() {
    return (
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BeforeLoadMap,
        CameraController.SMe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.AfterLoadMap,
        CameraController.yMe,
      ),
      super.OnClear()
    );
  }
}
((exports.CameraController = CameraController).IsInCameraModeBlending = !1),
  (CameraController.xie = (e, t) => {
    t?.Valid &&
      (t = t.Entity.GetComponent(203))?.Valid &&
      t.RemoveTagAddOrRemoveListener(
        constrainAspectRatioGameplayTag,
        CameraController.cml,
      ),
      e?.Valid &&
        (t = e.Entity.GetComponent(203))?.Valid &&
        (t.AddTagAddOrRemoveListener(
          constrainAspectRatioGameplayTag,
          CameraController.cml,
        ),
        CameraController.uml(t.HasTag(constrainAspectRatioGameplayTag)));
  }),
  (CameraController.cml = (e, t) => {
    CameraController.uml(t);
  }),
  (CameraController.SMe = () => {
    var e = CameraController.GetPlayerCameraManager()?.AnimCameraActor;
    e?.IsValid() &&
      ModelManager_1.ModelManager.SeamlessTravelModel.AddSeamlessTravelActor(e);
  }),
  (CameraController.yMe = () => {
    var e = CameraController.GetPlayerCameraManager()?.AnimCameraActor;
    e?.IsValid() &&
      ModelManager_1.ModelManager.SeamlessTravelModel.RemoveSeamlessTravelActor(
        e,
      );
  });
//# sourceMappingURL=CameraController.js.map
