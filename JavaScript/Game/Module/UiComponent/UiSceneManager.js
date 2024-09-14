"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiSceneManager = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
  CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  Stack_1 = require("../../../Core/Container/Stack"),
  FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  CameraController_1 = require("../../Camera/CameraController"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  GameSettingsDeviceRender_1 = require("../../GameSettings/GameSettingsDeviceRender"),
  GameSettingsManager_1 = require("../../GameSettings/GameSettingsManager"),
  GlobalData_1 = require("../../GlobalData"),
  RenderModuleController_1 = require("../../Render/Manager/RenderModuleController"),
  SkeletalObserverManager_1 = require("../SkeletalObserver/SkeletalObserverManager"),
  UiModelUtil_1 = require("../UiModel/UiModelUtil"),
  UiSceneRoleActorManager_1 = require("./UiSceneRoleActorManager");
class UiSceneManager {
  static Initialize() {
    GlobalData_1.GlobalData.SetUiState(0),
      (UiSceneManager.CurUiSceneName = ""),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ResetModuleAfterResetToBattleView,
        UiSceneManager.fWi,
      );
  }
  static OpenUiScene(e, a) {
    var r, t;
    return (
      1 !== UiSceneManager.GetUiSceneLoadingState() &&
      !!GlobalData_1.GlobalData.World &&
      (UiSceneManager.CurUiSceneName === e
        ? a?.()
        : ("" !== UiSceneManager.CurUiSceneName &&
            UiSceneManager.ForceCloseUiScene(),
          (UiSceneManager.CurUiSceneName = e),
          RenderModuleController_1.RenderModuleController
            .DebugNewUiSceneWorkflow
            ? ((r = UE.KuroUiSceneSystem.GetKuroUiSceneSystem(
                GlobalData_1.GlobalData.World.GetWorld(),
              )),
              (t =
                RenderModuleController_1.RenderModuleController.GetKuroUiSceneLoadOffset()),
              0 === r.GetUiSceneLoadingState(e)
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
    this.gxo();
  }
  static ForceCloseUiSceneImmediately() {
    this.gxo();
  }
  static gxo() {
    var e, a;
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
      Info_1.Info.IsPcOrGamepadPlatform()) ||
      (GameSettingsManager_1.GameSettingsManager.ReApply(67),
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
    var e, a, r;
    GlobalData_1.GlobalData.IsUiSceneLoading &&
      (RenderModuleController_1.RenderModuleController.DebugNewUiSceneWorkflow
        ? ((e = UE.KuroUiSceneSystem.GetKuroUiSceneSystem(
            GlobalData_1.GlobalData.World.GetWorld(),
          )),
          (a = UiSceneManager.CurUiSceneName),
          2 !== (r = e.GetUiSceneLoadingState(a)) ||
          RenderModuleController_1.RenderModuleController
            .DebugStartShowingUiSceneRendering
            ? 3 === r
              ? (GlobalData_1.GlobalData.SetUiState(2),
                this.LoadSuccessFunction &&
                  (this.LoadSuccessFunction(),
                  Info_1.Info.IsPcOrGamepadPlatform() ||
                    (UE.KismetSystemLibrary.ExecuteConsoleCommand(
                      GlobalData_1.GlobalData.World,
                      "r.TemporalAA.Sharpness 1.0",
                    ),
                    GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsAndroidPlatformLow()
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
        : 2 === (r = UiSceneManager.GetUiSceneLoadingState())
          ? (GlobalData_1.GlobalData.SetUiState(2),
            this.LoadSuccessFunction && this.LoadSuccessFunction(),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.UiSceneLoaded,
            ))
          : GlobalData_1.GlobalData.SetUiState(r));
  }
  static fxo(e) {
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
  static InitWeaponObserver(e = !1) {
    (e = e ? 4 : 3), (e = UiSceneManager.fxo(e));
    return this.pxo.Push(e), e;
  }
  static GetWeaponObserver() {
    if (!this.pxo.Empty) return this.pxo.Peek();
    Log_1.Log.CheckWarn() &&
      Log_1.Log.Warn("UiSceneManager", 17, "[WeaponObserverStack]为空");
  }
  static DestroyWeaponObserver(e) {
    this.pxo.Empty ||
      (this.pxo.Delete(e),
      SkeletalObserverManager_1.SkeletalObserverManager.DestroySkeletalObserver(
        e,
      ));
  }
  static DestroyAllWeaponObserver() {
    for (; !this.pxo.Empty; ) {
      var e = this.pxo.Pop();
      this.DestroyWeaponObserver(e);
    }
  }
  static InitWeaponScabbardObserver() {
    var e = UiSceneManager.fxo(3);
    return this.vxo.Push(e), e;
  }
  static GetWeaponScabbardObserver() {
    if (!this.vxo.Empty) return this.vxo.Peek();
    Log_1.Log.CheckWarn() &&
      Log_1.Log.Warn("UiSceneManager", 17, "[WeaponScabbardStack]为空");
  }
  static DestroyWeaponScabbardObserver(e) {
    this.vxo.Empty ||
      (this.vxo.Delete(e),
      SkeletalObserverManager_1.SkeletalObserverManager.DestroySkeletalObserver(
        e,
      ));
  }
  static DestroyAllWeaponScabbardObserver() {
    for (; !this.vxo.Empty; ) {
      var e = this.vxo.Pop();
      this.DestroyWeaponScabbardObserver(e);
    }
  }
  static InitPhantomObserver() {
    void 0 !== UiSceneManager.Mxo
      ? Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("UiSceneManager", 17, "[PhantomObserver]重复初始化")
      : (UiSceneManager.Mxo = UiSceneManager.fxo(7));
  }
  static GetPhantomObserver() {
    if (UiSceneManager.Mxo) return UiSceneManager.Mxo;
    Log_1.Log.CheckWarn() &&
      Log_1.Log.Warn("UiSceneManager", 17, "[PhantomObserver]未初始化");
  }
  static DestroyPhantomObserver() {
    UiSceneManager.Mxo &&
      (SkeletalObserverManager_1.SkeletalObserverManager.DestroySkeletalObserver(
        UiSceneManager.Mxo,
      ),
      (UiSceneManager.Mxo = void 0));
  }
  static InitHandBookObserver() {
    void 0 !== UiSceneManager.Exo
      ? Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("UiSceneManager", 17, "[HandBookObserver]重复初始化")
      : (UiSceneManager.Exo = UiSceneManager.fxo(7));
  }
  static GetHandBookObserver() {
    if (UiSceneManager.Exo) return UiSceneManager.Exo;
    Log_1.Log.CheckWarn() &&
      Log_1.Log.Warn("UiSceneManager", 17, "[HandBookObserver]未初始化");
  }
  static DestroyHandBookObserver() {
    UiSceneManager.Exo &&
      (SkeletalObserverManager_1.SkeletalObserverManager.DestroySkeletalObserver(
        UiSceneManager.Exo,
      ),
      (UiSceneManager.Exo = void 0));
  }
  static InitRoleSystemRoleActor(e) {
    var a = this.Sxo.Peek(),
      a =
        (a && a.SetMoveOutActor(),
        UiSceneRoleActorManager_1.UiSceneRoleActorManager.CreateUiSceneRoleActor(
          e,
        ));
    return this.Sxo.Push(a), a;
  }
  static GetRoleSystemRoleActor() {
    if (!this.Sxo.Empty) return UiSceneManager.Sxo.Peek();
    Log_1.Log.CheckWarn() &&
      Log_1.Log.Warn("UiSceneManager", 17, "[RoleSystemActorStack]为空");
  }
  static HasRoleSystemRoleActor() {
    return !this.Sxo.Empty;
  }
  static HideRoleSystemRoleActor() {
    var e;
    this.Sxo.Empty ||
      ((e = UiSceneManager.Sxo.Peek().Model),
      UiModelUtil_1.UiModelUtil.SetVisible(e, !1));
  }
  static ShowRoleSystemRoleActor() {
    var e;
    this.Sxo.Empty ||
      ((e = UiSceneManager.Sxo.Peek().Model),
      UiModelUtil_1.UiModelUtil.SetVisible(e, !0));
  }
  static DestroyRoleSystemRoleActor(e) {
    let a = !1;
    if (
      (this.Sxo.Empty ||
        (UiSceneManager.Sxo.Delete(e),
        (e = e.GetRoleActorIndex()),
        (a =
          UiSceneRoleActorManager_1.UiSceneRoleActorManager.DestroyUiSceneRoleActor(
            e,
          ))),
      !this.Sxo.Empty)
    ) {
      const e = UiSceneManager.Sxo.Peek();
      e.SetMoveInActor();
    }
    return a;
  }
  static DestroyAllRoleSystemRoleActor() {
    for (; !this.Sxo.Empty; ) {
      var e = this.Sxo.Pop().GetRoleActorIndex();
      UiSceneRoleActorManager_1.UiSceneRoleActorManager.DestroyUiSceneRoleActor(
        e,
      );
    }
  }
  static InitGachaItemObserver() {
    void 0 !== UiSceneManager.MKt
      ? Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("UiSceneManager", 17, "[GachaItemObserver]重复初始化")
      : (UiSceneManager.MKt = UiSceneManager.fxo(3));
  }
  static GetGachaItemObserver() {
    var e = UiSceneManager.MKt;
    if (e) return e;
    Log_1.Log.CheckWarn() &&
      Log_1.Log.Warn("UiSceneManager", 17, "[GachaItemObserver]未初始化");
  }
  static DestroyGachaItemObserver() {
    UiSceneManager.MKt &&
      (SkeletalObserverManager_1.SkeletalObserverManager.DestroySkeletalObserver(
        UiSceneManager.MKt,
      ),
      (UiSceneManager.MKt = void 0));
  }
  static CreateHandBookVision(e) {
    var e = ActorSystem_1.ActorSystem.Get(e, new UE.Transform(), void 0),
      a = UE.KuroCollectActorComponent.GetActorWithTag(
        FNameUtil_1.FNameUtil.GetDynamicFName("MonsterCase"),
        1,
      ),
      r = e?.K2_GetComponentsByClass(UE.SkeletalMeshComponent.StaticClass());
    if (r) for (let e = 0; e < r.Num(); e++) r.Get(e).SetTickableWhenPaused(!0);
    var t = e?.K2_GetComponentsByClass(UE.StaticMeshComponent.StaticClass());
    if (t) for (let e = 0; e < t.Num(); e++) t.Get(e).SetTickableWhenPaused(!0);
    var n = a.K2_GetActorLocation(),
      a = a.K2_GetActorRotation();
    e.K2_SetActorLocationAndRotation(n, a, !1, void 0, !1),
      this.yxo && this.DestroyHandBookVision(),
      (this.yxo = e);
  }
  static GetHandBookVision() {
    return this.yxo;
  }
  static GetHandBookCaseActor() {
    return UE.KuroCollectActorComponent.GetActorWithTag(
      FNameUtil_1.FNameUtil.GetDynamicFName("MonsterCase"),
      1,
    );
  }
  static DestroyHandBookVision() {
    this.yxo &&
      (this.yxo.PlayEnd(),
      ActorSystem_1.ActorSystem.Put(this.yxo),
      (this.yxo = void 0));
  }
  static InitVisionSkeletalHandle() {
    void 0 !== UiSceneManager.tHi
      ? Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Phantom", 17, "[VisionSkeletalHandle]重复初始化")
      : (UiSceneManager.tHi = UiSceneManager.fxo(7));
  }
  static HasVisionSkeletalHandle() {
    return void 0 !== UiSceneManager.tHi;
  }
  static GetVisionSkeletalHandle() {
    var e = UiSceneManager.tHi;
    if (e) return e;
    Log_1.Log.CheckWarn() &&
      Log_1.Log.Warn("UiSceneManager", 17, "[VisionSkeletalHandle]未初始化");
  }
  static DestroyVisionSkeletalHandle() {
    UiSceneManager.tHi &&
      (SkeletalObserverManager_1.SkeletalObserverManager.DestroySkeletalObserver(
        UiSceneManager.tHi,
      ),
      (UiSceneManager.tHi = void 0));
  }
  static AddUiShowRoomShowActor(e, a) {
    var r = UE.KuroCollectActorComponent.GetActorWithTag(
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
        this.Ixo(),
        a.SetResult(void 0);
    }) || a.SetResult(void 0),
      await a.Promise;
  }
  static ExitScene() {
    UE.KismetSystemLibrary.ExecuteConsoleCommand(
      GlobalData_1.GlobalData.World,
      "r.Shadow.ForceUpdateCSMOnce 1",
    ),
      UiSceneManager.CloseUiScene();
  }
  static Ixo() {
    GlobalData_1.GlobalData.World &&
      (CameraController_1.CameraController.ExitCameraMode(2, 0, 2, 0),
      CameraController_1.CameraController.EnterCameraMode(2, 0, 2, 0));
  }
  static SetUiStartSequenceFrame(e) {
    0 === this.Txo && (this.Txo = e);
  }
  static SetUiEndSequenceFrame(e) {
    0 === this.Lxo && (this.Lxo = e);
  }
  static ClearUiSequenceFrame() {
    (this.Txo = 0), (this.Lxo = 0);
  }
  static GetUiStartSequenceFrame() {
    return this.Txo;
  }
  static GetUiEndSequenceFrame() {
    return this.Lxo;
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
  (UiSceneManager.fWi = () => {
    UiSceneManager.ForceCloseUiSceneImmediately();
  }),
  (UiSceneManager.pxo = new Stack_1.Stack()),
  (UiSceneManager.vxo = new Stack_1.Stack()),
  (UiSceneManager.Mxo = void 0),
  (UiSceneManager.Exo = void 0),
  (UiSceneManager.Sxo = new Stack_1.Stack()),
  (UiSceneManager.MKt = void 0),
  (UiSceneManager.yxo = void 0),
  (UiSceneManager.tHi = void 0),
  (UiSceneManager.Txo = 0),
  (UiSceneManager.Lxo = 0);
//# sourceMappingURL=UiSceneManager.js.map
