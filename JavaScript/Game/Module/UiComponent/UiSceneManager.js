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
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon"),
  CameraController_1 = require("../../Camera/CameraController"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  GameSettingsDefine_1 = require("../../GameSettings/GameSettingsDefine"),
  GameSettingsDeviceRender_1 = require("../../GameSettings/GameSettingsDeviceRender"),
  GameSettingsManager_1 = require("../../GameSettings/GameSettingsManager"),
  Global_1 = require("../../Global"),
  GlobalData_1 = require("../../GlobalData"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  RenderModuleController_1 = require("../../Render/Manager/RenderModuleController"),
  WorldController_1 = require("../../World/Controller/WorldController"),
  SkeletalObserverManager_1 = require("../SkeletalObserver/SkeletalObserverManager"),
  UiModelUtil_1 = require("../UiModel/UiModelUtil"),
  TsUiSceneDangoActor_1 = require("./TsUiSceneDangoActor"),
  UiSceneDangoActorManager_1 = require("./UiSceneDangoActorManager"),
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
    var r, n;
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
              (n =
                RenderModuleController_1.RenderModuleController.GetKuroUiSceneLoadOffset()),
              0 === r.GetUiSceneLoadingState(e)
                ? (r.PreloadUiScene(e, n.op_ToVector()),
                  RenderModuleController_1.RenderModuleController.UiSceneOffsetTransform.SetLocation(
                    n,
                  ),
                  (RenderModuleController_1.RenderModuleController.DebugUiSceneLoadOffset =
                    n),
                  (RenderModuleController_1.RenderModuleController.DebugInUiSceneRendering =
                    !0))
                : Log_1.Log.CheckError() &&
                  Log_1.Log.Error("UiSceneManager", 10, "进入3d ui 失败"),
              (this.LoadSuccessFunction = a),
              GlobalData_1.GlobalData.SetUiState(1))
            : (UE.KuroGISystem.GetKuroGISystem(
                GlobalData_1.GlobalData.World.GetWorld(),
              ).Start3DUISceneRendering(e) ||
                (Log_1.Log.CheckError() &&
                  Log_1.Log.Error("UiSceneManager", 10, "进入3d ui 失败")),
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
              Log_1.Log.Error("UiSceneManager", 10, "退出3d ui 失败")),
          GlobalData_1.GlobalData.SetUiState(0))
        : GlobalData_1.GlobalData.World &&
          (UE.KuroGISystem.GetKuroGISystem(
            GlobalData_1.GlobalData.World.GetWorld(),
          ).End3DUISceneRendering() ||
            (Log_1.Log.CheckError() &&
              Log_1.Log.Error("UiSceneManager", 10, "退出3d ui 失败")),
          GlobalData_1.GlobalData.SetUiState(
            UiSceneManager.GetUiSceneLoadingState(),
          )),
      (this.LoadSuccessFunction = void 0),
      Info_1.Info.IsPcOrGamepadPlatform()) ||
      (GameSettingsManager_1.GameSettingsManager.ReApply(
        GameSettingsDefine_1.EFunction.MOBILERESOLUTION,
      ),
      UE.LGUIBPLibrary.FreeUnusedResourcesInRenderTargetPool(),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "UiSceneManager",
          16,
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
                        16,
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
        16,
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
      Log_1.Log.Warn("UiSceneManager", 16, "[WeaponObserverStack]为空");
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
      Log_1.Log.Warn("UiSceneManager", 16, "[WeaponScabbardStack]为空");
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
        Log_1.Log.Warn("UiSceneManager", 16, "[PhantomObserver]重复初始化")
      : (UiSceneManager.Mxo = UiSceneManager.fxo(7));
  }
  static GetPhantomObserver() {
    if (UiSceneManager.Mxo) return UiSceneManager.Mxo;
    Log_1.Log.CheckWarn() &&
      Log_1.Log.Warn("UiSceneManager", 16, "[PhantomObserver]未初始化");
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
        Log_1.Log.Warn("UiSceneManager", 16, "[HandBookObserver]重复初始化")
      : (UiSceneManager.Exo = UiSceneManager.fxo(7));
  }
  static GetHandBookObserver() {
    if (UiSceneManager.Exo) return UiSceneManager.Exo;
    Log_1.Log.CheckWarn() &&
      Log_1.Log.Warn("UiSceneManager", 16, "[HandBookObserver]未初始化");
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
      Log_1.Log.Warn("UiSceneManager", 16, "[RoleSystemActorStack]为空");
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
    let a = !1,
      r = !1;
    if (
      (this.Sxo.Empty ||
        ((r = this.Sxo.Peek() === e),
        UiSceneManager.Sxo.Delete(e),
        (e = e.GetRoleActorIndex()),
        (a =
          UiSceneRoleActorManager_1.UiSceneRoleActorManager.DestroyUiSceneRoleActor(
            e,
          ))),
      !this.Sxo.Empty && r)
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
        Log_1.Log.Warn("UiSceneManager", 16, "[GachaItemObserver]重复初始化")
      : (UiSceneManager.MKt = UiSceneManager.fxo(3));
  }
  static GetGachaItemObserver() {
    var e = UiSceneManager.MKt;
    if (e) return e;
    Log_1.Log.CheckWarn() &&
      Log_1.Log.Warn("UiSceneManager", 16, "[GachaItemObserver]未初始化");
  }
  static DestroyGachaItemObserver() {
    UiSceneManager.MKt &&
      (SkeletalObserverManager_1.SkeletalObserverManager.DestroySkeletalObserver(
        UiSceneManager.MKt,
      ),
      (UiSceneManager.MKt = void 0));
  }
  static InitDreamLinkRoleSkeletalHandle() {
    void 0 !== UiSceneManager.deh
      ? Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "DreamLink",
          34,
          "[DreamLinkRoleSkeletalHandle]重复初始化",
        )
      : (UiSceneManager.deh = UiSceneManager.fxo(9));
  }
  static GetDreamLinkRoleSkeletalHandle() {
    if (UiSceneManager.deh) return UiSceneManager.deh;
    Log_1.Log.CheckWarn() &&
      Log_1.Log.Warn(
        "UiSceneManager",
        34,
        "[DreamLinkRoleSkeletalHandle]未初始化",
      );
  }
  static HasDreamLinkRoleSkeletalHandle() {
    return void 0 !== UiSceneManager.deh;
  }
  static DestroyDreamLinkRoleSkeletalHandle() {
    UiSceneManager.deh &&
      (SkeletalObserverManager_1.SkeletalObserverManager.DestroySkeletalObserver(
        UiSceneManager.deh,
      ),
      (UiSceneManager.deh = void 0));
  }
  static InitDreamLinkWeaponSkeletalHandle() {
    var e = UiSceneManager.fxo(10);
    return UiSceneManager.Hil.push(e), e;
  }
  static HasDreamLinkWeaponSkeletalHandle() {
    return 0 < UiSceneManager.Hil.length;
  }
  static DestroyAllDreamLinkWeaponSkeletalHandle() {
    for (const e of UiSceneManager.Hil)
      SkeletalObserverManager_1.SkeletalObserverManager.DestroySkeletalObserver(
        e,
      );
    UiSceneManager.Hil.length = 0;
  }
  static CreateHandBookVision(e) {
    var e = ActorSystem_1.ActorSystem.Get(e, new UE.TransformDouble(), void 0),
      a = UE.KuroCollectActorComponent.GetActorWithTag(
        FNameUtil_1.FNameUtil.GetDynamicFName("MonsterCase"),
        1,
      ),
      r = e?.K2_GetComponentsByClass(UE.SkeletalMeshComponent.StaticClass());
    if (r) for (let e = 0; e < r.Num(); e++) r.Get(e).SetTickableWhenPaused(!0);
    var n = e?.K2_GetComponentsByClass(UE.StaticMeshComponent.StaticClass());
    if (n) for (let e = 0; e < n.Num(); e++) n.Get(e).SetTickableWhenPaused(!0);
    var t = a.D_K2_GetActorLocation(),
      a = a.K2_GetActorRotation();
    e.D_K2_SetActorLocationAndRotation(t, a, !1, void 0, !1),
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
      ActorSystem_1.ActorSystem.Put(
        "UiSceneManager.DestroyHandBookVision",
        this.yxo,
      ),
      (this.yxo = void 0));
  }
  static InitVisionSkeletalHandle() {
    void 0 !== UiSceneManager.tHi
      ? Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Phantom", 16, "[VisionSkeletalHandle]重复初始化")
      : (UiSceneManager.tHi = UiSceneManager.fxo(7));
  }
  static HasVisionSkeletalHandle() {
    return void 0 !== UiSceneManager.tHi;
  }
  static GetVisionSkeletalHandle() {
    var e = UiSceneManager.tHi;
    if (e) return e;
    Log_1.Log.CheckWarn() &&
      Log_1.Log.Warn("UiSceneManager", 16, "[VisionSkeletalHandle]未初始化");
  }
  static DestroyVisionSkeletalHandle() {
    UiSceneManager.tHi &&
      (SkeletalObserverManager_1.SkeletalObserverManager.DestroySkeletalObserver(
        UiSceneManager.tHi,
      ),
      (UiSceneManager.tHi = void 0));
  }
  static InitAbyssDangoObserver() {
    void 0 !== UiSceneManager.XLc
      ? Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("UiSceneManager", 27, "[AbyssDangoObserver]重复初始化")
      : (UiSceneManager.XLc = UiSceneManager.fxo(15));
  }
  static GetAbyssDangoObserver() {
    var e = UiSceneManager.XLc;
    if (e) return e;
    Log_1.Log.CheckWarn() &&
      Log_1.Log.Warn("UiSceneManager", 27, "[AbyssDangoObserver]未初始化");
  }
  static DestroyAbyssDangoObserver() {
    UiSceneManager.XLc &&
      (SkeletalObserverManager_1.SkeletalObserverManager.DestroySkeletalObserver(
        UiSceneManager.XLc,
      ),
      (UiSceneManager.XLc = void 0));
  }
  static InitLordSkeletalHandle() {
    void 0 !== UiSceneManager.oPl
      ? Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("UiSceneManager", 43, "[VisionSkeletalHandle]重复初始化")
      : (UiSceneManager.oPl = UiSceneManager.fxo(12));
  }
  static HasLordSkeletalHandle() {
    return void 0 !== UiSceneManager.oPl;
  }
  static GetLordSkeletalHandle() {
    var e = UiSceneManager.oPl;
    if (e) return e;
    Log_1.Log.CheckWarn() &&
      Log_1.Log.Warn("UiSceneManager", 43, "[LordSkeletalHandle]未初始化");
  }
  static DestroyLordSkeletalHandle() {
    UiSceneManager.oPl &&
      (SkeletalObserverManager_1.SkeletalObserverManager.DestroySkeletalObserver(
        UiSceneManager.oPl,
      ),
      (UiSceneManager.oPl = void 0));
  }
  static InitDangoActor(e) {
    return UiSceneDangoActorManager_1.UiSceneDangoActorManager.CreateUiSceneDangoActor(
      e,
    );
  }
  static DestroyDangoActor(e) {
    UiSceneDangoActorManager_1.UiSceneDangoActorManager.DestroyUiSceneDangoActor(
      e.GetActorIndex(),
    );
  }
  static RayTraceDangoActor(e) {
    var a = Global_1.Global.CharacterController;
    if (a) {
      var r = (0, puerts_1.$ref)(this._Sc),
        n = (0, puerts_1.$ref)(this.cSc),
        e =
          (this.AYe.Set(e.X, e.Y),
          UE.GameplayStatics.DeprojectScreenToWorld(a, this.AYe, r, n));
      if (e) {
        var e = (0, puerts_1.$unref)(r),
          r = (0, puerts_1.$unref)(n),
          n =
            (this.PBa.DeepCopy(a.GetViewTarget().K2_GetActorLocation()),
            CameraController_1.CameraController.CameraLocation.Subtraction(
              this.PBa,
              this.PBa,
            ),
            ModelManager_1.ModelManager.TraceElementModel.CommonStartLocation),
          a =
            (n.DeepCopy(e),
            n.Addition(this.PBa, n),
            ModelManager_1.ModelManager.TraceElementModel.CommonEndLocation),
          e =
            (a.DeepCopy(e.op_Addition(r.op_Multiply(5e3))),
            a.Addition(this.PBa, a),
            ModelManager_1.ModelManager.TraceElementModel.GetLineTrace()),
          r =
            ((e.WorldContextObject = GlobalData_1.GlobalData.World),
            e.ActorsToIgnore.Empty(),
            TraceElementCommon_1.TraceElementCommon.SetStartLocation(e, n),
            TraceElementCommon_1.TraceElementCommon.SetEndLocation(e, a),
            TraceElementCommon_1.TraceElementCommon.LineTrace(
              e,
              "RayTraceDangoActor",
            ));
        if (r)
          return (n = e.HitResult.Actors.Get(0)) instanceof
            TsUiSceneDangoActor_1.default
            ? n
            : void 0;
        e.ClearCacheData();
      }
    }
  }
  static async LoadDangoActorList(e, a) {
    if (e.length <= 0) return [];
    var r = [];
    const n = new CustomPromise_1.CustomPromise(),
      t = [];
    t.length = e.length;
    for (const c of e) {
      var i = UiSceneManager.InitDangoActor(c.UiModelUseWay),
        o = (r.push(i), i.Model.CheckGetComponent(1)),
        l = i.Model.CheckGetComponent(22);
      o?.SetTransformByTag(c.DangoPointCase),
        l?.LoadModelByDangoId(c.DangoId, !0, () => {
          t.length--, t.length <= 0 && n.SetResult(void 0);
        }),
        a?.(i);
    }
    return await n.Promise, r;
  }
  static InitGliderSkeletalHandle() {
    void 0 !== UiSceneManager.rkc
      ? Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("UiSceneManager", 43, "[GliderSkeletalHandle]重复初始化")
      : (UiSceneManager.rkc = UiSceneManager.fxo(16));
  }
  static HasGliderSkeletalHandle() {
    return void 0 !== UiSceneManager.rkc;
  }
  static GetGliderSkeletalHandle() {
    var e = UiSceneManager.rkc;
    if (e) return e;
    Log_1.Log.CheckWarn() &&
      Log_1.Log.Warn("UiSceneManager", 43, "[GliderSkeletalHandle]未初始化");
  }
  static DestroyGliderSkeletalHandle() {
    UiSceneManager.rkc &&
      (SkeletalObserverManager_1.SkeletalObserverManager.DestroySkeletalObserver(
        UiSceneManager.rkc,
      ),
      (UiSceneManager.rkc = void 0));
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
          10,
          "当前场景找不到反射地板蓝图类BP_UIShowRoom",
        );
  }
  static async LoadScene(e, a) {
    await WorldController_1.WorldController.StartWorldOriginInUiMode();
    const r = new CustomPromise_1.CustomPromise();
    UiSceneManager.OpenUiScene(e, () => {
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Role", 43, "3D UI场景加载成功！"),
        this.Ixo(),
        a(),
        r.SetResult(void 0);
    }) || (a(), r.SetResult(void 0)),
      await r.Promise,
      this.SetSceneFloorReflection(!0, !0);
  }
  static async ExitScene() {
    await WorldController_1.WorldController.EndWorldOriginInUiMode(),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.Shadow.ForceUpdateCSMOnce 1",
      ),
      this.SetSceneFloorReflection(!1, !1),
      UiSceneManager.CloseUiScene();
  }
  static SetSceneFloorReflection(e, a) {
    (this.Jeh === e && !a) ||
      ((this.Jeh = e)
        ? UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "r.Kuro.EnablePlanarReflection 1",
          )
        : UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "r.Kuro.EnablePlanarReflection 0",
          ));
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
  static HideObserverWithCallback(e, a, r) {
    var n;
    e &&
      ((n = e.Model), UiModelUtil_1.UiModelUtil.SetVisible(n, !1)) &&
      UiModelUtil_1.UiModelUtil.PlayEffectOnRootWithCallback(n, a, () => {
        r(e);
      });
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
      UiSceneDangoActorManager_1.UiSceneDangoActorManager.ClearAllUiSceneDangoActor(),
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
  (UiSceneManager.deh = void 0),
  (UiSceneManager.Hil = []),
  (UiSceneManager.yxo = void 0),
  (UiSceneManager.tHi = void 0),
  (UiSceneManager.XLc = void 0),
  (UiSceneManager.oPl = void 0),
  (UiSceneManager._Sc = new UE.Vector()),
  (UiSceneManager.cSc = new UE.Vector()),
  (UiSceneManager.PBa = Vector_1.Vector.Create()),
  (UiSceneManager.AYe = new UE.Vector2D()),
  (UiSceneManager.rkc = void 0),
  (UiSceneManager.Jeh = !0),
  (UiSceneManager.Txo = 0),
  (UiSceneManager.Lxo = 0);
//# sourceMappingURL=UiSceneManager.js.map
