"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (e, t, a, r) {
    let i;
    const s = arguments.length;
    let o =
      s < 3 ? t : r === null ? (r = Object.getOwnPropertyDescriptor(t, a)) : r;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      o = Reflect.decorate(e, t, a, r);
    else
      for (let n = e.length - 1; n >= 0; n--)
        (i = e[n]) && (o = (s < 3 ? i(o) : s > 3 ? i(t, a, o) : i(t, a)) || o);
    return s > 3 && o && Object.defineProperty(t, a, o), o;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CameraController = void 0);
const puerts_1 = require("puerts");
const UE = require("ue");
const ActorSystem_1 = require("../../Core/Actor/ActorSystem");
const Log_1 = require("../../Core/Common/Log");
const Time_1 = require("../../Core/Common/Time");
const ControllerBase_1 = require("../../Core/Framework/ControllerBase");
const PerformanceDecorators_1 = require("../../Core/Performance/PerformanceDecorators");
const TimerSystem_1 = require("../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../Core/Utils/MathUtils");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
const Global_1 = require("../Global");
const GlobalData_1 = require("../GlobalData");
const ModelManager_1 = require("../Manager/ModelManager");
const CameraParams_1 = require("./CameraParams");
const CameraUtility_1 = require("./CameraUtility");
const author = 15;
const SECOND_TO_MILLISECOND = 1e3;
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
  static get CameraLocation() {
    return this.Model.CameraLocation;
  }
  static get CameraRotator() {
    return this.Model.CameraRotator;
  }
  static get CameraDitherStartHideDistance() {
    return this.Model.CameraDitherStartHideDistance;
  }
  static OnPossess(e) {
    this.FightCamera.LogicComponent.SetPawn(e),
      this.SequenceCamera.PlayerComponent.SetPawn(e);
  }
  static SetViewTarget(e, t, a = 0, r = 0, i = 0, s, o) {
    let n;
    e?.IsValid()
      ? (n = this.GetPlayerController()) &&
        ((n.bShouldPerformFullTickWhenPaused = !0),
        (this.Model.CurrentCameraActor = e),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Battle",
            34,
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
      Log_1.Log.Debug("Battle", 34, "绑定相机 ResetViewTarget", [
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
    let t, a;
    this.Model.CurrentCameraActor?.IsValid() &&
      (this.Model.CameraLocation.FromUeVector(
        this.Model.CurrentCameraActor.K2_GetActorLocation(),
      ),
      this.Model.CameraRotator.DeepCopy(
        this.Model.CurrentCameraActor.K2_GetActorRotation(),
      ),
      (this.Model.CameraTransform =
        this.Model.CurrentCameraActor.GetTransform()),
      (a =
        !(t = Global_1.Global.BaseCharacter?.CharacterActorComponent)?.Actor ||
        t.Actor.bHidden),
      this.Model.CameraMode === 1 && a
        ? this.GetPlayerController()?.SetAudioListenerOverride(
            void 0,
            this.Model.CameraLocation.ToUeVector(),
            this.Model.CameraRotator.ToUeRotator(),
          )
        : this.GetPlayerController()?.SetAudioListenerOverride(
            void 0,
            t?.ActorLocation,
            this.Model.CameraRotator.ToUeRotator(),
          ),
      this.UpdateCameraDitherRadius());
  }
  static EnterCameraMode(e, t = 0, a = 0, r = 0, i = () => {}, s = !1) {
    return e === 0
      ? (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Camera",
            15,
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
    return e === 0
      ? (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Camera",
            15,
            "战斗镜头不应主动切换，应由其他镜头退出时被动切换",
          ),
        !1)
      : (this.Model.DisableMode(e),
        this.uhe(this.Model.GetNextMode(), t, a, r, i));
  }
  static uhe(e, t = 0, a = 0, r = 0, i = () => {}) {
    const s = this.Model;
    if (s.CameraMode === e) return !1;
    s.SetCameraMode(e);
    let o = void 0;
    switch (
      ((e !== 1 && e !== 3) ||
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
      default:
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Camera",
              author,
              "CameraManager.SwitchCameraMode: 错误的镜头模式 ",
              ["mode", e],
            ),
          !1
        );
    }
    return (
      this.SetViewTarget(o, "SwitchMode", t, a, r, !0, !0),
      t > 0
        ? TimerSystem_1.TimerSystem.Delay(() => {
            i && i();
          }, t * SECOND_TO_MILLISECOND)
        : i && i(),
      !0
    );
  }
  static RefreshSequenceCamera() {
    this.Model.CameraMode === 1 &&
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
    const e = this.SpawnActor(UE.CameraActor.StaticClass());
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
      MathUtils_1.MathUtils.DefaultTransform,
    );
  }
  static GetCharacter() {
    return Global_1.Global.BaseCharacter;
  }
  static GetPlayerController() {
    return Global_1.Global.CharacterController;
  }
  static GetCameraConfigs(e = void 0) {
    const t = (0, puerts_1.$ref)(UE.NewArray(UE.SCamera_Setting));
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
    const t = (0, puerts_1.$ref)(UE.NewArray(UE.SCameraConfig));
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
      ModelManager_1.ModelManager.CameraModel.OrbitalCamera.SetTimeDilation(e);
  }
  static PlayWorldCameraShake(e, t, a, r, i, s) {
    this.IsSettlementCamera() ||
      (CameraController.Model.ShakeModify > 0 &&
        UE.GameplayStatics.PlayWorldCameraShakeWithModifier(
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
      (Global_1.Global.CharacterCameraManager.StartCameraShake(e, t, a, r),
      i && this.PlayForceFeedbackFromCameraShake(e));
  }
  static PlayForceFeedbackFromCameraShake(e) {
    ModelManager_1.ModelManager.PlatformModel?.IsGamepad() &&
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
    if (this.Model.CameraMode !== 0) {
      let e = this.Model.CameraMode;
      for (; e !== 0; )
        this.Model.DisableMode(e), (e = this.Model.GetNextMode());
      this.uhe(e, t, a, r, i);
    }
  }
  static IsSequenceCameraInCinematic() {
    const e = CameraController.SequenceCamera?.GetComponent(10);
    return !!e?.Valid && e.GetIsInCinematic();
  }
  static UpdateCameraDitherRadius() {
    if (!(Time_1.Time.Now < this.Model.NextFindStartHideDistanceTime)) {
      this.Model.NextFindStartHideDistanceTime =
        Time_1.Time.Now + CameraParams_1.FIND_DITHER_START_HIDE_DISTANCE_PERIOD;
      let e;
      const t = [];
      ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRange(
        CameraParams_1.DITHER_START_HIDE_DISTANCE_THRESHOLD,
        2,
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
}
__decorate(
  [
    (0, PerformanceDecorators_1.PerformanceFunctionEx)(
      "CameraController.OnTick",
    ),
  ],
  CameraController,
  "OnTick",
  null,
),
  (exports.CameraController = CameraController);
// # sourceMappingURL=CameraController.js.map
