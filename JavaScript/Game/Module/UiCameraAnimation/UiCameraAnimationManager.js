"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (a, e, t, i) {
    var r,
      n = arguments.length,
      o =
        n < 3
          ? e
          : null === i
            ? (i = Object.getOwnPropertyDescriptor(e, t))
            : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      o = Reflect.decorate(a, e, t, i);
    else
      for (var s = a.length - 1; 0 <= s; s--)
        (r = a[s]) && (o = (n < 3 ? r(o) : 3 < n ? r(e, t, o) : r(e, t)) || o);
    return 3 < n && o && Object.defineProperty(e, t, o), o;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiCameraAnimationManager = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  Stack_1 = require("../../../Core/Container/Stack"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  PerformanceDecorators_1 = require("../../../Core/Performance/PerformanceDecorators"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  CameraController_1 = require("../../Camera/CameraController"),
  CameraUtility_1 = require("../../Camera/CameraUtility"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  Global_1 = require("../../Global"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CharacterController_1 = require("../../NewWorld/Character/CharacterController"),
  SkeletalObserverManager_1 = require("../SkeletalObserver/SkeletalObserverManager"),
  UiCameraPostEffectComponent_1 = require("../UiCamera/UiCameraComponent/UiCameraPostEffectComponent"),
  UiCameraSequenceComponent_1 = require("../UiCamera/UiCameraComponent/UiCameraSequenceComponent"),
  UiCameraManager_1 = require("../UiCamera/UiCameraManager"),
  UiCameraSpringStructure_1 = require("../UiCamera/UiCameraStructure/UiCameraSpringStructure"),
  UiSceneManager_1 = require("../UiComponent/UiSceneManager"),
  UiCameraAnimation_1 = require("./UiCameraAnimation"),
  UiCameraAnimationDefine_1 = require("./UiCameraAnimationDefine"),
  UiCameraAnimationHandle_1 = require("./UiCameraAnimationHandle"),
  UiCameraHandleData_1 = require("./UiCameraContext/UiCameraHandleData"),
  UiCameraMappingData_1 = require("./UiCameraContext/UiCameraMappingData");
class UiCameraAnimationManager {
  static Initialize() {
    (this.LoadingViewCameraAnimationLength =
      CommonParamById_1.configCommonParamById.GetIntConfig(
        "LoadingViewCameraAnimationLength",
      )),
      (this.LoadingViewManualFocusDistance =
        CommonParamById_1.configCommonParamById.GetFloatConfig(
          "LoadingViewManualFocusDistance",
        )),
      (this.LoadingViewAperture =
        CommonParamById_1.configCommonParamById.GetFloatConfig(
          "LoadingViewAperture",
        )),
      this.nPo();
  }
  static Clear() {
    this.ClearDisplay(), this.sPo();
  }
  static nPo() {
    for (const t of ConfigManager_1.ConfigManager.UiCameraAnimationConfig.GetAllUiCameraMappingConfig()) {
      var a = new UiCameraMappingData_1.UiCameraMappingData(t, !1);
      this.aPo.set(t.ViewName, a);
    }
    for (const i of ConfigManager_1.ConfigManager.UiCameraAnimationConfig.GetAllChildUiCameraMappingConfig()) {
      var e = new UiCameraMappingData_1.UiCameraMappingData(i, !0);
      this.aPo.set(i.ViewName, e);
    }
  }
  static GetCameraMappingData(a) {
    return this.aPo.get(a);
  }
  static sPo() {
    this.aPo.clear();
  }
  static hPo(a) {
    this.lPo.Push(a);
  }
  static _Po(a) {
    let e = this.lPo.Peek();
    for (var t = a.UniqueId; e && e.UniqueId !== t; )
      this.lPo.Pop(), (e = this.lPo.Peek());
    return this.lPo.Pop(), this.GetLastHandleData();
  }
  static uPo(a) {
    let e = this.lPo.Peek();
    for (var t = a.UniqueId; e && e.UniqueId !== t; )
      this.lPo.Pop(), (e = this.lPo.Peek());
    return this.GetLastHandleData();
  }
  static cPo(a) {
    const e = this.mPo(a);
    if (!e) return !1;
    var t = ConfigManager_1.ConfigManager.DynamicTabConfig.GetViewTabList(
        e.ViewName,
      ),
      i = [];
    let r = !1;
    for (const e of this.lPo)
      if (e.UniqueId === a) i.push(e), (r = !0);
      else if (r) {
        if (!this.dPo(t, e.ViewName)) break;
        i.push(e);
      }
    for (const e of i) this.lPo.Delete(e);
    return !0;
  }
  static dPo(a, e) {
    for (const t of a) if (t.ChildViewName === e) return !0;
    return !1;
  }
  static mPo(a) {
    for (const e of this.lPo) if (e.UniqueId === a) return e;
  }
  static GetLastHandleData() {
    return this.lPo.Peek();
  }
  static CPo() {
    var a = new UiCameraAnimationHandle_1.UiCameraAnimationHandle();
    return a.Initialize(), a;
  }
  static gPo(a, e = !0, t = !0) {
    this.CurrentCameraHandle
      ? this.CurrentCameraHandle.Deactivate()
      : (this.CurrentCameraHandle = this.CPo()),
      this.CurrentCameraHandle.Activate(a, e, t);
  }
  static fPo(e, t = !0, i = !0) {
    this.IsPlayingAnimation()
      ? this.pPo.WaitCameraAnimationFinished().then(
          (a) => {
            0 === a.FinishType && this.gPo(e, t, i);
          },
          () => {},
        )
      : this.gPo(e, t, i);
  }
  static PushCameraHandleByOpenView(e, t, i = !0) {
    if (UiCameraAnimationManager.CanPushCameraHandle(e)) {
      var r = UiCameraAnimationManager.GetLastHandleData();
      if (r && r.UniqueId === t)
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "CameraAnimation",
            8,
            "此界面已经在栈顶",
            ["PushHandleData", r?.ToString()],
            ["viewId", t],
          );
      else {
        var n = UiCameraHandleData_1.UiCameraHandleData.NewByView(e);
        if (t) {
          t = this.mPo(t);
          if (t)
            return (
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "CameraAnimation",
                  8,
                  "此界面已经入栈,则抛出之后的所有界面镜头状态",
                  ["PushHandleData", t.ToString()],
                ),
              void this.uPo(t)
            );
        }
        let a = void 0;
        t = r?.ViewName;
        t && (a = this.GetBlendName(t, e)),
          this.PushCameraHandle(n, i, !0, a, !0);
      }
    }
  }
  static PushCameraHandleByHandleName(
    a,
    e = !0,
    t = !0,
    i = UiCameraAnimationDefine_1.DEFAULT_BLEND_NAME,
    r = !1,
    n = void 0,
    o,
  ) {
    var s;
    if (!StringUtils_1.StringUtils.IsBlank(a))
      return (
        (o = UiCameraHandleData_1.UiCameraHandleData.NewByHandleName(a, o)),
        (s = this.GetLastHandleData())
          ? ((s = s.ViewName),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "CameraAnimation",
                8,
                "手动播放镜头动画，将镜头数据的ViewName设置为栈顶的数据",
                ["HandleName", a],
                ["ViewName", s],
              ),
            (o.ViewName = s))
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "CameraAnimation",
              8,
              "手动播放镜头动画时，当前没有播放任何Ui镜头状态",
              ["HandleName", a],
            ),
        this.PushCameraHandle(o, e, t, i, r, n),
        o
      );
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "CameraAnimation",
        8,
        "镜头动画的HandleName为空，镜头动画异常",
      );
  }
  static PushCameraHandle(a, e = !0, t = !0, i, r = !1, n = void 0) {
    var o = UiCameraAnimationManager.GetLastHandleData();
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "CameraAnimation",
        8,
        "镜头状态数据------入栈",
        ["PushHandleData", a.ToString()],
        ["LastTopHandleData", o?.ToString()],
      ),
      r && this.vPo(a)
        ? Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "CameraAnimation",
            8,
            "镜头状态数据------新的镜头状态和旧的镜头状态一致，不会再次播放推入镜头状态表现",
            [
              "CurrentHandleData",
              this.CurrentCameraHandle?.GetHandleData().ToString(),
            ],
            ["NewHandleData", a.ToString()],
          )
        : (this.hPo(a),
          this.StopUiCameraAnimation(),
          this.MPo(a, o, e, t, i, n));
  }
  static PopCameraHandleByCloseView(a, e, t, i = !0) {
    UiCameraAnimationManager.CanPushCameraHandle(a) &&
      (i
        ? ((i = this.GetBlendName(a, e)),
          (e = this.mPo(t)),
          this.PopCameraHandle(e, i))
        : (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "CameraAnimation",
              8,
              "仅删除镜头状态，不做任何表现",
              ["closeViewName", a],
              ["closeViewId", t],
            ),
          this.cPo(t)));
  }
  static PopCameraHandle(a, e) {
    var t;
    a
      ? ((t = this._Po(a)),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "CameraAnimation",
            8,
            "镜头状态数据------出栈",
            ["popHandleData", a.ToString()],
            ["TopHandleData", t?.ToString()],
            ["blendName", e],
          ),
        this.StopUiCameraAnimation(),
        this.MPo(t, a, void 0 !== e, !0, e))
      : this.ClearDisplay();
  }
  static vPo(a) {
    var e;
    return (
      !!this.CurrentCameraHandle &&
      !(
        !(e = this.lPo.Peek()) ||
        !this.UiCamera?.GetIsEntered() ||
        !e.IsEqual(a) ||
        (this.CurrentCameraHandle.SetHandleData(a), 0)
      )
    );
  }
  static MPo(a, e, t = !0, i = !0, r, n = void 0) {
    var o;
    return (
      (this.UiCamera = UiCameraManager_1.UiCameraManager.Get()),
      (this.UiCameraPostEffectComponent = this.UiCamera.GetUiCameraComponent(
        UiCameraPostEffectComponent_1.UiCameraPostEffectComponent,
      )),
      (this.UiCameraSequenceComponent = this.UiCamera.GetUiCameraComponent(
        UiCameraSequenceComponent_1.UiCameraSequenceComponent,
      )),
      this.EPo &&
        (this.EPo.StopSequence(), (this.EPo = void 0), this.UiCamera.Exit()),
      a
        ? (a.Refresh(),
          this.SPo(a),
          StringUtils_1.StringUtils.IsEmpty(r)
            ? (Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "CameraAnimation",
                  8,
                  "镜头状态数据------入栈是BlendName为空，直接激活镜头状态",
                  ["PushHandleData", a.ToString()],
                  ["blendName", r],
                ),
              this.fPo(a, t, i),
              3)
            : e
              ? t
                ? !(o =
                    ConfigManager_1.ConfigManager.UiCameraAnimationConfig.GetUiCameraAnimationBlendData(
                      r,
                    )) || o.Time <= 0
                  ? (Log_1.Log.CheckInfo() &&
                      Log_1.Log.Info(
                        "CameraAnimation",
                        8,
                        "没有混合配置或播放界面摄像机动画时间<=0，直接激活镜头",
                        ["blendName", r],
                      ),
                    this.gPo(a, !1, !1),
                    3)
                  : (UiCameraAnimationManager.AsyncPlayCameraAnimation(
                      e,
                      a,
                      r,
                    ).then(
                      (a) => {
                        this.j3t(a, n);
                      },
                      () => {},
                    ),
                    1)
                : (Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info(
                      "CameraAnimation",
                      8,
                      "镜头状态数据------不需要播放镜头动画，直接激活镜头状态",
                      ["LastHandleData", e.ToString()],
                      ["PushHandleData", a.ToString()],
                    ),
                  this.gPo(a, !1, !1),
                  3)
              : (this.fPo(a, t, i), 3))
        : ((o = this.GetCurrentCameraHandle())
            ? (this.EPo = o).Revert(!0, () => {
                this.ClearDisplay();
              })
            : this.ClearDisplay(),
          2)
    );
  }
  static SPo(a) {
    this.UiCameraSpringStructure?.IsValid() ||
      a.IsEmptyState ||
      (this.UiCameraSpringStructure = this.UiCamera.PushStructure(
        UiCameraSpringStructure_1.UiCameraSpringStructure,
      ));
  }
  static j3t(a, e = void 0) {
    var t = a.FromHandleData,
      i = a.ToHandleData;
    0 === a.FinishType
      ? (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "CameraAnimation",
            8,
            "镜头状态数据------入栈动画结束",
            ["LastHandleData", t.ToString()],
            ["PushHandleData", i.ToString()],
            ["FinishType", a.FinishType],
          ),
        this.gPo(i, !1, !1))
      : Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "CameraAnimation",
          8,
          "镜头状态数据------入栈动画被停止",
          ["LastHandleData", t.ToString()],
          ["PushHandleData", i.ToString()],
          ["FinishType", a.FinishType],
        ),
      e && e(a),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnPlayCameraAnimationFinish,
        a,
      );
  }
  static CanPushCameraHandle(a) {
    a = this.GetCameraMappingData(a);
    return !!a && a.CanPushCameraHandle();
  }
  static ReactivateCameraHandle(a = !1, e = !1) {
    var t, i;
    this.CurrentCameraHandle &&
      !this.CurrentCameraHandle.GetIsPendingRevert() &&
      (t = this.CurrentCameraHandle.GetHandleData()) &&
      ((i = t.ViewName),
      StringUtils_1.StringUtils.IsEmpty(i) ||
        ((i = UiCameraAnimationManager.GetCameraMappingData(i)) &&
          ((t.HandleName = i.GetSourceHandleName()), t.Refresh())),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("CameraAnimation", 8, "重新激活镜头状态", [
          "handleData",
          t.ToString(),
        ]),
      this.CurrentCameraHandle.Activate(t, a, e));
  }
  static DeactivateCurrentCameraHandle() {
    this.CurrentCameraHandle && this.CurrentCameraHandle.Deactivate();
  }
  static GetCurrentCameraHandle() {
    return this.CurrentCameraHandle;
  }
  static GetBlendName(a, e) {
    a = this.GetCameraMappingData(a);
    if (a) return a.GetToBlendName(e);
  }
  static IsPlayingAnimation() {
    return !!this.pPo && this.pPo.IsPlaying();
  }
  static IsPlayingBlendInSequence() {
    return (
      !!this.CurrentCameraHandle &&
      this.CurrentCameraHandle.GetIsPlayingBlendInSequence()
    );
  }
  static ClearDisplay() {
    this.StopUiCameraAnimation(),
      this.yPo(),
      UiCameraManager_1.UiCameraManager.Destroy();
    for (const a of this.lPo) a.Reset();
    this.lPo.Clear(),
      this.CurrentCameraHandle?.Reset(),
      (this.UiCamera = void 0),
      (this.UiCameraSpringStructure = void 0),
      (this.UiCameraPostEffectComponent = void 0),
      (this.CurrentCameraHandle = void 0),
      (this.EPo = void 0),
      this.IPo.clear(),
      this.TPo.clear();
  }
  static GenerateHandleDataUniqueId() {
    return this.LPo++;
  }
  static async AsyncPlayCameraAnimation(a, e, t) {
    return (
      this.pPo
        ? this.pPo.StopUiCameraAnimation()
        : (this.pPo = new UiCameraAnimation_1.UiCameraAnimation()),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnPlayCameraAnimationStart,
      ),
      this.pPo.AsyncPlayUiCameraAnimation(a, e, t)
    );
  }
  static PlayCameraAnimationFromCurrent(a, e) {
    var t = this.GetLastHandleData();
    return this.PushCameraHandleByHandleName(a, !0, !0, e), t;
  }
  static PlayBackCurrent(a = UiCameraAnimationDefine_1.DEFAULT_BLEND_NAME) {
    const e = this.CurrentCameraHandle?.GetHandleData();
    var t;
    e &&
      (!(t =
        ConfigManager_1.ConfigManager.UiCameraAnimationConfig.GetUiCameraAnimationBlendData(
          a,
        )) || t.Time <= 0
        ? (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "CameraAnimation",
              8,
              "没有混合配置或播放界面摄像机动画时间<=0，直接激活镜头",
              ["blendName", a],
            ),
          this.gPo(e, !1, !1))
        : this.AsyncPlayCameraAnimation(e, e, a).then(
            (a) => {
              0 === a.FinishType && this.gPo(e);
            },
            () => {},
          ));
  }
  static StopUiCameraAnimation() {
    this.pPo && (this.pPo.StopUiCameraAnimation(), (this.pPo = void 0));
  }
  static Tick(a) {
    this.pPo && this.pPo.Tick(a),
      this.CurrentCameraHandle && this.CurrentCameraHandle.Tick(a);
  }
  static BroadUiCameraSequenceEvent(a) {
    UiCameraManager_1.UiCameraManager.Get()
      .GetUiCameraComponent(
        UiCameraSequenceComponent_1.UiCameraSequenceComponent,
      )
      .ExecuteUiCameraSequenceEvent(a),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnExecuteUiCameraSequenceEvent,
        a,
      );
  }
  static IsActivate() {
    return 0 < this.lPo.Size;
  }
  static GetHandleDataStack() {
    return this.lPo;
  }
  static GetTargetActor(a) {
    switch (a) {
      case 2:
        return ModelManager_1.ModelManager.InteractionModel
          .CurrentInteractUeActor;
      case 1:
        return CharacterController_1.CharacterController.GetActor(
          ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity,
        );
      case 3:
        return UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor();
      case 4:
        return SkeletalObserverManager_1.SkeletalObserverManager.GetLastSkeletalObserver()?.Model?.CheckGetComponent(
          1,
        )?.Actor;
      case 5:
        return UiSceneManager_1.UiSceneManager.GetHandBookCaseActor();
      default:
        return;
    }
  }
  static GetTargetBodyKey(a) {
    switch (a) {
      case 1:
        var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem;
        return e
          ? ((e = e.GetConfigId),
            (e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e))
              ? e.RoleBody
              : void 0)
          : void 0;
      case 3:
        var e = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor();
        return e
          ? ((e = (e.Model?.CheckGetComponent(11)).RoleConfigId),
            (e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e))
              ? e.RoleBody
              : void 0)
          : void 0;
      case 2:
        (e =
          ModelManager_1.ModelManager.InteractionModel.CurrentInteractEntityId),
          (e = EntitySystem_1.EntitySystem.Get(e));
        if (!e?.Valid) return;
        switch (e.GetComponent(0).GetModelConfig().体型类型) {
          case 0:
            return;
          case 5:
            return "FemaleM";
          case 4:
            return "FemaleS";
          case 6:
            return "FemaleXL";
          case 2:
            return "MaleM";
          case 1:
            return "MaleS";
          case 3:
            return "MaleXL";
          default:
            return;
        }
      default:
        return;
    }
  }
  static GetTargetActorSkeletalMesh(a, e = 0) {
    switch (a) {
      case 2:
        var t =
          ModelManager_1.ModelManager.InteractionModel.CurrentInteractUeActor;
        return t
          ? t.GetComponentByClass(UE.SkeletalMeshComponent.StaticClass())
          : void 0;
      case 1:
        t = CharacterController_1.CharacterController.GetActor(
          ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity,
        );
        return t
          ? t.GetComponentByClass(UE.SkeletalMeshComponent.StaticClass())
          : void 0;
      case 3:
        t = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor();
        return t ? t.Model?.CheckGetComponent(1)?.MainMeshComponent : void 0;
      case 4:
        return SkeletalObserverManager_1.SkeletalObserverManager.GetLastSkeletalObserver()?.Model?.CheckGetComponent(
          1,
        )?.MainMeshComponent;
      case 5:
        t = UiSceneManager_1.UiSceneManager.GetHandBookVision();
        return t
          ? t.GetComponentByClass(UE.SkeletalMeshComponent.StaticClass())
          : void 0;
      default:
        return;
    }
  }
  static yPo() {
    this.EnablePlayerActor(),
      this.EnableCustomCreatureActor(),
      Global_1.Global.BaseCharacter?.SetDitherEffect(1, 2);
  }
  static DisablePlayerActor() {
    var a,
      e,
      t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    t?.Valid
      ? (t = t.Entity)?.Valid
        ? (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("CameraAnimation", 8, "Ui镜头隐藏玩家Actor"),
          (a = t.GetComponent(1)) &&
            ((e = t.Id),
            this.IPo.has(e)
              ? Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "CameraAnimation",
                  8,
                  "已经隐藏过对应的玩家Actor",
                  ["entityId", e],
                  ["PlayerActorDisableHandleIdMap", this.IPo],
                )
              : ((e = a.DisableActor("Ui镜头Sequence中隐藏角色")),
                this.IPo.set(t.Id, e))))
        : Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "CameraAnimation",
            8,
            "Ui镜头隐藏玩家Actor-失败，因为找不到当前玩家Entity",
          )
      : Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "CameraAnimation",
          8,
          "Ui镜头隐藏玩家Actor-失败，因为找不到当前玩家EntityHandle",
        );
  }
  static IsDisablePlayer() {
    return this.IsActivate() && 0 < this.IPo.size;
  }
  static EnablePlayerActor() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("CameraAnimation", 8, "Ui镜头在清理表现时显示玩家Actor", [
        "DisableHandleId",
        this.IPo,
      ]);
    for (var [a, e] of this.IPo) {
      var t = EntitySystem_1.EntitySystem.Get(a);
      if (!t?.Valid)
        return void (
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "CameraAnimation",
            8,
            "Ui镜头在清理表现时显示玩家Actor-失败，因为找不到当前玩家Entity",
            ["EntityId", a],
          )
        );
      t = t.GetComponent(1);
      t
        ? t.EnableActor(e)
        : Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "CameraAnimation",
            8,
            "Ui镜头在清理表现时显示玩家Actor-失败，因为当前玩家实体找不到BaseActorComponent",
            ["EntityId", a],
          );
    }
    this.IPo.clear();
  }
  static DisableCustomCreatureActor(e) {
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    if (t?.Valid) {
      var i = t.Entity.GetComponent(0);
      if (i) {
        i = i.CustomServerEntityIds;
        if (!(e > i.length || 0 === e)) {
          var t = t.Entity.Id,
            r = i[e - 1],
            r = ModelManager_1.ModelManager.CreatureModel.GetEntity(r);
          if (r?.Valid) {
            var n = r.Entity.GetComponent(1);
            if (n) {
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug(
                  "Battle",
                  4,
                  "隐藏伴生物",
                  ["customServerEntityIds", i],
                  ["customEntity", r.Id],
                );
              let a = this.TPo.get(t);
              a || ((a = new Map()), this.TPo.set(t, a)),
                a.has(e) ||
                  ((i = n.DisableActor("Ui镜头Sequence中隐藏角色伴生物")),
                  a.set(e, i));
            }
          }
        }
      }
    }
  }
  static EnableCustomCreatureActor() {
    for (var [a, e] of this.TPo) {
      a = EntitySystem_1.EntitySystem.Get(a).GetComponent(0);
      if (!a) return;
      var t,
        i,
        r = a.CustomServerEntityIds;
      for ([t, i] of e) {
        var n = r[t - 1],
          n = ModelManager_1.ModelManager.CreatureModel.GetEntity(n);
        if (!n) return;
        var o = n.Entity.GetComponent(1);
        if (!o) return;
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Battle",
            4,
            "显示伴生物",
            ["customServerEntityIds", r],
            ["customEntity", n.Id],
          ),
          o.EnableActor(i);
      }
    }
    this.TPo.clear();
  }
  static ResetFightCameraRotation() {
    var a;
    !Global_1.Global.BaseCharacter ||
      (a =
        CameraController_1.CameraController.FightCamera
          .LogicComponent).CameraGuideController?.IsLockCameraInput() ||
      (a.SetRotation(
        CameraUtility_1.CameraUtility.GetCameraDefaultFocusUeRotator(),
      ),
      a.ResetFightCameraLogic(!1));
  }
}
(UiCameraAnimationManager.LPo = 0),
  (UiCameraAnimationManager.aPo = new Map()),
  (UiCameraAnimationManager.lPo = new Stack_1.Stack()),
  (UiCameraAnimationManager.CurrentCameraHandle = void 0),
  (UiCameraAnimationManager.pPo = void 0),
  (UiCameraAnimationManager.EPo = void 0),
  (UiCameraAnimationManager.LoadingViewCameraAnimationLength = 0),
  (UiCameraAnimationManager.LoadingViewManualFocusDistance = 0),
  (UiCameraAnimationManager.LoadingViewAperture = void 0),
  (UiCameraAnimationManager.IPo = new Map()),
  (UiCameraAnimationManager.TPo = new Map()),
  (UiCameraAnimationManager.UiCamera = void 0),
  (UiCameraAnimationManager.UiCameraSpringStructure = void 0),
  (UiCameraAnimationManager.UiCameraPostEffectComponent = void 0),
  (UiCameraAnimationManager.UiCameraSequenceComponent = void 0),
  __decorate(
    [
      (0, PerformanceDecorators_1.PerformanceFunctionEx)(
        "UiCameraAnimationManager.Tick",
      ),
    ],
    UiCameraAnimationManager,
    "Tick",
    null,
  ),
  (exports.UiCameraAnimationManager = UiCameraAnimationManager);
//# sourceMappingURL=UiCameraAnimationManager.js.map
