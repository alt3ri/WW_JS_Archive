"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiSceneManager = void 0);
const puerts_1 = require("puerts");
const UE = require("ue");
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Log_1 = require("../../../Core/Common/Log");
const Stack_1 = require("../../../Core/Container/Stack");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const CameraController_1 = require("../../Camera/CameraController");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const GameQualitySettingsManager_1 = require("../../GameQualitySettings/GameQualitySettingsManager");
const GlobalData_1 = require("../../GlobalData");
const RenderModuleController_1 = require("../../Render/Manager/RenderModuleController");
const SkeletalObserverManager_1 = require("../SkeletalObserver/SkeletalObserverManager");
const UiModelUtil_1 = require("../UiModel/UiModelUtil");
const UiSceneRoleActorManager_1 = require("./UiSceneRoleActorManager");
class UiSceneManager {
  static Initialize() {
    GlobalData_1.GlobalData.SetUiState(0),
      (UiSceneManager.CurUiSceneName = ""),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ResetModuleByResetToBattleView,
        UiSceneManager.vji,
      );
  }
  static OpenUiScene(e, a) {
    let r, t;
    return (
      UiSceneManager.GetUiSceneLoadingState() !== 1 &&
      !!GlobalData_1.GlobalData.World &&
      (UiSceneManager.CurUiSceneName === e
        ? a?.()
        : (UiSceneManager.CurUiSceneName !== "" &&
            UiSceneManager.ForceCloseUiScene(),
          (UiSceneManager.CurUiSceneName = e),
          RenderModuleController_1.RenderModuleController
            .DebugNewUiSceneWorkflow
            ? ((r = UE.KuroUiSceneSystem.GetKuroUiSceneSystem(
                GlobalData_1.GlobalData.World.GetWorld(),
              )),
              (t =
                RenderModuleController_1.RenderModuleController.GetKuroUiSceneLoadOffset()),
              r.GetUiSceneLoadingState(e) === 0
                ? (r.PreloadUiScene(e, t),
                  RenderModuleController_1.RenderModuleController.UiSceneOffsetTransform.SetLocation(
                    t,
                  ),
                  (RenderModuleController_1.RenderModuleController.DebugUiSceneLoadOffset =
                    t),
                  (RenderModuleController_1.RenderModuleController.DebugInUiSceneRendering =
                    !0))
                : Log_1.Log.CheckError() &&
                  Log_1.Log.Error("UiSceneManager", 11, "进入3d ui 失败"),
              (this.LoadSuccessFunction = a),
              GlobalData_1.GlobalData.SetUiState(1))
            : (UE.KuroGISystem.GetKuroGISystem(
                GlobalData_1.GlobalData.World.GetWorld(),
              ).Start3DUISceneRendering(e) ||
                (Log_1.Log.CheckError() &&
                  Log_1.Log.Error("UiSceneManager", 11, "进入3d ui 失败")),
              (this.LoadSuccessFunction = a),
              GlobalData_1.GlobalData.SetUiState(
                UiSceneManager.GetUiSceneLoadingState(),
              )),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.UiSceneStartLoad,
          )),
      !0)
    );
  }
  static CloseUiScene() {
    UiSceneManager.ForceCloseUiScene();
  }
  static ForceCloseUiScene() {
    this.vPo();
  }
  static ForceCloseUiSceneImmediately() {
    this.vPo();
  }
  static vPo() {
    let e, a;
    StringUtils_1.StringUtils.IsEmpty(UiSceneManager.CurUiSceneName) ||
      ((UiSceneManager.CurUiSceneName = ""),
      RenderModuleController_1.RenderModuleController.DebugNewUiSceneWorkflow
        ? GlobalData_1.GlobalData.World &&
          ((RenderModuleController_1.RenderModuleController.DebugInUiSceneRendering =
            !1),
          (a = (e = UE.KuroUiSceneSystem.GetKuroUiSceneSystem(
            GlobalData_1.GlobalData.World.GetWorld(),
          )).GetCurrentUiSceneRenderingSceneName()),
          e.UnloadUiScene(a) ||
            (Log_1.Log.CheckError() &&
              Log_1.Log.Error("UiSceneManager", 11, "退出3d ui 失败")),
          GlobalData_1.GlobalData.SetUiState(0))
        : GlobalData_1.GlobalData.World &&
          (UE.KuroGISystem.GetKuroGISystem(
            GlobalData_1.GlobalData.World.GetWorld(),
          ).End3DUISceneRendering() ||
            (Log_1.Log.CheckError() &&
              Log_1.Log.Error("UiSceneManager", 11, "退出3d ui 失败")),
          GlobalData_1.GlobalData.SetUiState(
            UiSceneManager.GetUiSceneLoadingState(),
          )),
      (this.LoadSuccessFunction = void 0),
      GameQualitySettingsManager_1.GameQualitySettingsManager.IsPcPlatform()) ||
      (GameQualitySettingsManager_1.GameQualitySettingsManager.Get()
        .GetCurrentQualityInfo()
        .ApplyMobileResolution(),
      UE.LGUIBPLibrary.FreeUnusedResourcesInRenderTargetPool(),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "UiSceneManager",
          17,
          "退出UI场景时，还原r.ScreenPercentage为初始值，并调用FreeUnusedResourcesInRenderTargetPool清理RT",
        ));
  }
  static GetUiSceneLoadingState() {
    return GlobalData_1.GlobalData.World
      ? UE.KuroGISystem.GetKuroGISystem(
          GlobalData_1.GlobalData.World.GetWorld(),
        ).GetUISceneRenderingState()
      : 0;
  }
  static Tick() {
    let e, a, r;
    GlobalData_1.GlobalData.IsUiSceneLoading &&
      (RenderModuleController_1.RenderModuleController.DebugNewUiSceneWorkflow
        ? ((e = UE.KuroUiSceneSystem.GetKuroUiSceneSystem(
            GlobalData_1.GlobalData.World.GetWorld(),
          )),
          (a = UiSceneManager.CurUiSceneName),
          (r = e.GetUiSceneLoadingState(a)) !== 2 ||
          RenderModuleController_1.RenderModuleController
            .DebugStartShowingUiSceneRendering
            ? r === 3
              ? (GlobalData_1.GlobalData.SetUiState(2),
                this.LoadSuccessFunction &&
                  (this.LoadSuccessFunction(),
                  GameQualitySettingsManager_1.GameQualitySettingsManager.IsPcPlatform() ||
                    (UE.KismetSystemLibrary.ExecuteConsoleCommand(
                      GlobalData_1.GlobalData.World,
                      "r.TemporalAA.Sharpness 1.0",
                    ),
                    GameQualitySettingsManager_1.GameQualitySettingsManager.IsAndroidPlatformLow()
                      ? UE.KismetSystemLibrary.ExecuteConsoleCommand(
                          GlobalData_1.GlobalData.World,
                          "r.ScreenPercentage 80",
                        )
                      : UE.KismetSystemLibrary.ExecuteConsoleCommand(
                          GlobalData_1.GlobalData.World,
                          "r.ScreenPercentage 100",
                        ),
                    Log_1.Log.CheckDebug() &&
                      Log_1.Log.Debug(
                        "UiSceneManager",
                        17,
                        "进入UI场景时，将r.ScreenPercentage设置为100",
                      ))),
                EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.UiSceneLoaded,
                ),
                (RenderModuleController_1.RenderModuleController.DebugStartShowingUiSceneRendering =
                  !1))
              : GlobalData_1.GlobalData.SetUiState(1)
            : (e.StartUiSceneRendering(a),
              (RenderModuleController_1.RenderModuleController.DebugStartShowingUiSceneRendering =
                !0)))
        : (r = UiSceneManager.GetUiSceneLoadingState()) === 2
          ? (GlobalData_1.GlobalData.SetUiState(2),
            this.LoadSuccessFunction && this.LoadSuccessFunction(),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.UiSceneLoaded,
            ))
          : GlobalData_1.GlobalData.SetUiState(r));
  }
  static MPo(e) {
    if (GlobalData_1.GlobalData.World)
      return SkeletalObserverManager_1.SkeletalObserverManager.NewSkeletalObserver(
        e,
      );
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "UiSceneManager",
        17,
        "SpawnSkeletalObserverHandle failed, GlobalData.World is null",
      );
  }
  static InitWeaponObserver() {
    const e = UiSceneManager.MPo(3);
    return this.SPo.Push(e), e;
  }
  static GetWeaponObserver() {
    if (!this.SPo.Empty) return this.SPo.Peek();
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("UiSceneManager", 17, "[WeaponObserverStack]为空");
  }
  static DestroyWeaponObserver(e) {
    this.SPo.Empty ||
      (this.SPo.Delete(e),
      SkeletalObserverManager_1.SkeletalObserverManager.DestroySkeletalObserver(
        e,
      ));
  }
  static DestroyAllWeaponObserver() {
    for (; !this.SPo.Empty; ) {
      const e = this.SPo.Pop();
      this.DestroyWeaponObserver(e);
    }
  }
  static InitWeaponScabbardObserver() {
    const e = UiSceneManager.MPo(3);
    return this.EPo.Push(e), e;
  }
  static GetWeaponScabbardObserver() {
    if (!this.EPo.Empty) return this.EPo.Peek();
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("UiSceneManager", 17, "[WeaponScabbardStack]为空");
  }
  static DestroyWeaponScabbardObserver(e) {
    this.EPo.Empty ||
      (this.EPo.Delete(e),
      SkeletalObserverManager_1.SkeletalObserverManager.DestroySkeletalObserver(
        e,
      ));
  }
  static DestroyAllWeaponScabbardObserver() {
    for (; !this.EPo.Empty; ) {
      const e = this.EPo.Pop();
      this.DestroyWeaponScabbardObserver(e);
    }
  }
  static InitPhantomObserver() {
    void 0 !== UiSceneManager.yPo
      ? Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("UiSceneManager", 17, "[PhantomObserver]重复初始化")
      : (UiSceneManager.yPo = UiSceneManager.MPo(6));
  }
  static GetPhantomObserver() {
    if (UiSceneManager.yPo) return UiSceneManager.yPo;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("UiSceneManager", 17, "[PhantomObserver]未初始化");
  }
  static DestroyPhantomObserver() {
    UiSceneManager.yPo &&
      (SkeletalObserverManager_1.SkeletalObserverManager.DestroySkeletalObserver(
        UiSceneManager.yPo,
      ),
      (UiSceneManager.yPo = void 0));
  }
  static InitHandBookObserver() {
    void 0 !== UiSceneManager.IPo
      ? Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("UiSceneManager", 17, "[HandBookObserver]重复初始化")
      : (UiSceneManager.IPo = UiSceneManager.MPo(6));
  }
  static GetHandBookObserver() {
    if (UiSceneManager.IPo) return UiSceneManager.IPo;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("UiSceneManager", 17, "[HandBookObserver]未初始化");
  }
  static DestroyHandBookObserver() {
    UiSceneManager.IPo &&
      (SkeletalObserverManager_1.SkeletalObserverManager.DestroySkeletalObserver(
        UiSceneManager.IPo,
      ),
      (UiSceneManager.IPo = void 0));
  }
  static InitRoleSystemRoleActor(e) {
    var a = this.TPo.Peek();
    var a =
      (a && a.SetMoveOutActor(),
      UiSceneRoleActorManager_1.UiSceneRoleActorManager.CreateUiSceneRoleActor(
        e,
      ));
    return this.TPo.Push(a), a;
  }
  static GetRoleSystemRoleActor() {
    if (!this.TPo.Empty) return UiSceneManager.TPo.Peek();
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("UiSceneManager", 17, "[RoleSystemActorStack]为空");
  }
  static HasRoleSystemRoleActor() {
    return !this.TPo.Empty;
  }
  static HideRoleSystemRoleActor() {
    let e;
    this.TPo.Empty ||
      ((e = UiSceneManager.TPo.Peek().Model),
      UiModelUtil_1.UiModelUtil.SetVisible(e, !1));
  }
  static ShowRoleSystemRoleActor() {
    let e;
    this.TPo.Empty ||
      ((e = UiSceneManager.TPo.Peek().Model),
      UiModelUtil_1.UiModelUtil.SetVisible(e, !0));
  }
  static DestroyRoleSystemRoleActor(e) {
    let a = !1;
    if (
      (this.TPo.Empty ||
        (UiSceneManager.TPo.Delete(e),
        (e = e.GetRoleActorIndex()),
        (a =
          UiSceneRoleActorManager_1.UiSceneRoleActorManager.DestroyUiSceneRoleActor(
            e,
          ))),
      !this.TPo.Empty)
    ) {
      const e = UiSceneManager.TPo.Peek();
      e.SetMoveInActor();
    }
    return a;
  }
  static DestroyAllRoleSystemRoleActor() {
    for (; !this.TPo.Empty; ) {
      const e = this.TPo.Pop().GetRoleActorIndex();
      UiSceneRoleActorManager_1.UiSceneRoleActorManager.DestroyUiSceneRoleActor(
        e,
      );
    }
  }
  static InitGachaItemObserver() {
    void 0 !== UiSceneManager.MWt
      ? Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("UiSceneManager", 17, "[GachaItemObserver]重复初始化")
      : (UiSceneManager.MWt = UiSceneManager.MPo(3));
  }
  static GetGachaItemObserver() {
    const e = UiSceneManager.MWt;
    if (e) return e;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("UiSceneManager", 17, "[GachaItemObserver]未初始化");
  }
  static DestroyGachaItemObserver() {
    UiSceneManager.MWt &&
      (SkeletalObserverManager_1.SkeletalObserverManager.DestroySkeletalObserver(
        UiSceneManager.MWt,
      ),
      (UiSceneManager.MWt = void 0));
  }
  static CreateHandBookVision(e) {
    var e = ActorSystem_1.ActorSystem.Get(e, new UE.Transform(), void 0);
    var a = UE.KuroCollectActorComponent.GetActorWithTag(
      FNameUtil_1.FNameUtil.GetDynamicFName("MonsterCase"),
      1,
    );
    const r = e?.K2_GetComponentsByClass(
      UE.SkeletalMeshComponent.StaticClass(),
    );
    if (r) for (let e = 0; e < r.Num(); e++) r.Get(e).SetTickableWhenPaused(!0);
    const t = a.K2_GetActorLocation();
    var a = a.K2_GetActorRotation();
    e.K2_SetActorLocationAndRotation(t, a, !1, void 0, !1),
      this.LPo && this.DestroyHandBookVision(),
      (this.LPo = e);
  }
  static GetHandBookVision() {
    return this.LPo;
  }
  static GetHandBookCaseActor() {
    return UE.KuroCollectActorComponent.GetActorWithTag(
      FNameUtil_1.FNameUtil.GetDynamicFName("MonsterCase"),
      1,
    );
  }
  static DestroyHandBookVision() {
    this.LPo &&
      (this.LPo.PlayEnd(),
      ActorSystem_1.ActorSystem.Put(this.LPo),
      (this.LPo = void 0));
  }
  static InitVisionSkeletalHandle() {
    void 0 !== UiSceneManager.i7i
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error("Phantom", 17, "[VisionSkeletalHandle]重复初始化")
      : (UiSceneManager.i7i = UiSceneManager.MPo(6));
  }
  static HasVisionSkeletalHandle() {
    return void 0 !== UiSceneManager.i7i;
  }
  static GetVisionSkeletalHandle() {
    const e = UiSceneManager.i7i;
    if (e) return e;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("UiSceneManager", 17, "[VisionSkeletalHandle]未初始化");
  }
  static DestroyVisionSkeletalHandle() {
    UiSceneManager.i7i &&
      (SkeletalObserverManager_1.SkeletalObserverManager.DestroySkeletalObserver(
        UiSceneManager.i7i,
      ),
      (UiSceneManager.i7i = void 0));
  }
  static AddUiShowRoomShowActor(e, a) {
    const r = UE.KuroCollectActorComponent.GetActorWithTag(
      FNameUtil_1.FNameUtil.GetDynamicFName("BP_UIShowRoom"),
      1,
    );
    r
      ? ((e = (0, puerts_1.$ref)(e)), r.AddShowActor(e, a))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "UiSceneManager",
          11,
          "当前场景找不到反射地板蓝图类BP_UIShowRoom",
        );
  }
  static async LoadScene(e) {
    const a = new CustomPromise_1.CustomPromise();
    UiSceneManager.OpenUiScene(e, () => {
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Role", 44, "3D UI场景加载成功！"),
        this.DPo(),
        a.SetResult(void 0);
    }) || a.SetResult(void 0),
      await a.Promise;
  }
  static ExitScene() {
    UiSceneManager.CloseUiScene();
  }
  static DPo() {
    GlobalData_1.GlobalData.World &&
      (CameraController_1.CameraController.ExitCameraMode(2, 0, 2, 0),
      CameraController_1.CameraController.EnterCameraMode(2, 0, 2, 0));
  }
  static SetUiStartSequenceFrame(e) {
    this.RPo === 0 && (this.RPo = e);
  }
  static SetUiEndSequenceFrame(e) {
    this.UPo === 0 && (this.UPo = e);
  }
  static ClearUiSequenceFrame() {
    (this.RPo = 0), (this.UPo = 0);
  }
  static GetUiStartSequenceFrame() {
    return this.RPo;
  }
  static GetUiEndSequenceFrame() {
    return this.UPo;
  }
  static HideObserver(e, a) {
    e &&
      ((e = e.Model), UiModelUtil_1.UiModelUtil.SetVisible(e, !1)) &&
      UiModelUtil_1.UiModelUtil.PlayEffectOnRoot(e, a);
  }
  static GetActorByTag(e) {
    return UE.KuroCollectActorComponent.GetActorWithTag(
      FNameUtil_1.FNameUtil.GetDynamicFName(e),
      1,
    );
  }
  static Clear() {
    SkeletalObserverManager_1.SkeletalObserverManager.ClearAllSkeletalObserver(),
      UiSceneRoleActorManager_1.UiSceneRoleActorManager.ClearAllUiSceneRoleActor(),
      UiSceneManager.DestroyGachaItemObserver(),
      UiSceneManager.DestroyHandBookObserver(),
      UiSceneManager.DestroyHandBookVision(),
      UiSceneManager.DestroyPhantomObserver(),
      UiSceneManager.DestroyAllRoleSystemRoleActor(),
      UiSceneManager.DestroyAllWeaponObserver(),
      UiSceneManager.DestroyAllWeaponScabbardObserver();
  }
}
((exports.UiSceneManager = UiSceneManager).CurUiSceneName = ""),
  (UiSceneManager.LoadSuccessFunction = void 0),
  (UiSceneManager.vji = () => {
    UiSceneManager.ForceCloseUiSceneImmediately();
  }),
  (UiSceneManager.SPo = new Stack_1.Stack()),
  (UiSceneManager.EPo = new Stack_1.Stack()),
  (UiSceneManager.yPo = void 0),
  (UiSceneManager.IPo = void 0),
  (UiSceneManager.TPo = new Stack_1.Stack()),
  (UiSceneManager.MWt = void 0),
  (UiSceneManager.LPo = void 0),
  (UiSceneManager.i7i = void 0),
  (UiSceneManager.RPo = 0),
  (UiSceneManager.UPo = 0);
// # sourceMappingURL=UiSceneManager.js.map
