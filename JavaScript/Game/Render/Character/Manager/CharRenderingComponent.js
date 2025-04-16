"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharRenderingComponent = void 0);
const UE = require("ue"),
  Info_1 = require("../../../../Core/Common/Info"),
  Log_1 = require("../../../../Core/Common/Log"),
  EffectEnvironment_1 = require("../../../../Core/Effect/EffectEnvironment"),
  FNameUtil_1 = require("../../../../Core/Utils/FNameUtil"),
  TsBaseCharacter_1 = require("../../../Character/TsBaseCharacter"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  GlobalData_1 = require("../../../GlobalData"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  WorldModel_1 = require("../../../World/Model/WorldModel"),
  RenderConfig_1 = require("../../Config/RenderConfig"),
  RenderModuleConfig_1 = require("../../Manager/RenderModuleConfig"),
  RenderModuleController_1 = require("../../Manager/RenderModuleController"),
  RenderUtil_1 = require("../../Utils/RenderUtil"),
  CharRuntimeMaterialControllerGroupInfo_1 = require("../Components/MaterialController/CharRuntimeMaterialControllerGroupInfo");
class CharRenderingComponent extends UE.KuroCharRenderingComponent {
  constructor() {
    super(...arguments),
      (this.RenderType = void 0),
      (this.InteractionConfig = void 0),
      (this.DecalShadowConfig = void 0),
      (this.AllRenderComps = void 0),
      (this.AllRenderCompsMap = void 0),
      (this.IsInit = !1),
      (this.IsStartInvoke = !1),
      (this.DeltaTime = 0),
      (this.IsOnMobile = !1),
      (this.AllMaterialControlRuntimeDataGroupMap = void 0),
      (this.IndexCount = 0),
      (this.TempRemoveList = void 0),
      (this.SequenceHandleIds = void 0),
      (this.IsDebug = !1),
      (this.CachedOwner = void 0),
      (this.CachedOwnerName = ""),
      (this.CachedOwnerEntity = void 0),
      (this.LogicOwner = void 0),
      (this.IsLogicOwnerTsEffectActor = !1),
      (this.IsUiUpdate = !1),
      (this.UseMaterialContainerV2 = !0),
      (this.DisableFightDither = !1),
      (this.FightDitherRateCache = 1),
      (this.OnRoleGoDownFinishEventAdded = !1),
      (this.RemoveInteractionOnRoleGoDownFinish = void 0),
      (this.IsInDebugModeInternal = !1),
      (this.IsRecordInternal = !1);
  }
  Constructor() {
    (this.RenderType = void 0),
      (this.AllRenderComps = void 0),
      (this.AllRenderCompsMap = void 0),
      (this.IsInit = !1),
      (this.IsStartInvoke = !1),
      (this.DeltaTime = 0),
      (this.IsOnMobile = !1),
      (this.AllMaterialControlRuntimeDataGroupMap = void 0),
      (this.IndexCount = 0),
      (this.TempRemoveList = void 0),
      (this.SequenceHandleIds = void 0),
      (this.IsDebug = !1),
      (this.CachedOwner = void 0),
      (this.CachedOwnerName = ""),
      (this.CachedOwnerEntity = void 0),
      (this.LogicOwner = void 0),
      (this.IsLogicOwnerTsEffectActor = !1),
      (this.IsUiUpdate = !1),
      (this.UseMaterialContainerV2 = !0),
      (this.DisableFightDither = !1),
      (this.FightDitherRateCache = 1),
      (this.OnRoleGoDownFinishEventAdded = !1),
      (this.RemoveInteractionOnRoleGoDownFinish = void 0),
      (this.IsInDebugModeInternal = !1),
      (this.IsRecordInternal = !1);
  }
  QuickInitAndAddData(e, t = void 0) {
    RenderModuleConfig_1.RenderStats.Init(),
      this.CheckInit() || this.Init(6),
      this.GetOwner() instanceof UE.TsBaseCharacter_C ||
        (t && this.AddComponentByCase(0, t.SkeletalMeshComponent));
    t = this.AddMaterialControllerData(e);
    return this.SequenceHandleIds.push(t), t;
  }
  QuickInitAndAddDataWithMeshComponent(e, t = void 0) {
    RenderModuleConfig_1.RenderStats.Init(),
      this.CheckInit() || this.Init(6),
      this.GetOwner() instanceof UE.TsBaseCharacter_C ||
        (t && this.AddComponentByCase(0, t));
    t = this.AddMaterialControllerData(e);
    return this.SequenceHandleIds.push(t), t;
  }
  QuickInitAndAddDataGroup(e, t = void 0) {
    RenderModuleConfig_1.RenderStats.Init(),
      this.CheckInit() || this.Init(6),
      this.GetOwner() instanceof UE.TsBaseCharacter_C ||
        (t && this.AddComponentByCase(0, t.SkeletalMeshComponent));
    t = this.AddMaterialControllerDataGroup(e);
    return this.SequenceHandleIds.push(t), t;
  }
  QuickInitAndAddDataGroupWithMeshComponent(e, t = void 0) {
    RenderModuleConfig_1.RenderStats.Init(),
      this.CheckInit() || this.Init(6),
      this.GetOwner() instanceof UE.TsBaseCharacter_C ||
        (t && this.AddComponentByCase(0, t));
    t = this.AddMaterialControllerDataGroup(e);
    return this.SequenceHandleIds.push(t), t;
  }
  Init(e) {
    RenderModuleConfig_1.RenderStats.StatCharRenderingComponentInit?.Start();
    let t = !1;
    if (
      ((this.CachedOwner = this.GetOwner()),
      (this.CachedOwnerName = this.CachedOwner.GetName().toString()),
      this.CachedOwner instanceof TsBaseCharacter_1.default &&
        (this.CachedOwnerEntity = this.CachedOwner.GetEntityNoBlueprint()),
      this.IsInit &&
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("RenderCharacter", 13, "材质控制器已初始化", [
            "Actor",
            this.CachedOwnerName,
          ]),
        (t = !0)),
      9 === e &&
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RenderCharacter",
            13,
            "错误：初始化参数错误. 初始化类型不应为Error",
            ["Actor", this.CachedOwnerName],
          ),
        (t = !0)),
      !t)
    ) {
      8 === e && (this.IsUiUpdate = GlobalData_1.GlobalData.IsUiSceneOpen),
        (this.DeltaTime = 0),
        (this.IsOnMobile =
          0 ===
          UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldFeatureLevel(
            GlobalData_1.GlobalData.World,
          )),
        (this.AllRenderComps = new Array()),
        (this.AllRenderCompsMap = new Map()),
        (this.IsInit = !1),
        (this.IsStartInvoke = !1),
        (this.RenderType = e),
        (this.TempRemoveList = []),
        (this.SequenceHandleIds = []),
        (this.IsDebug = !1);
      for (const i of this.GetRenderComps())
        this.AllRenderCompsMap.has(i.GetComponentId())
          ? Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "RenderCharacter",
              13,
              "错误:重复添加渲染模块 ID",
              ["Actor", this.CachedOwnerName],
              ["渲染模块ID", i.GetComponentId()],
            )
          : (this.AllRenderCompsMap.set(i.GetComponentId(), i),
            this.AllRenderComps.push(i),
            i.Awake(this));
      (this.IsInit = !0),
        (this.IsStartInvoke = !1),
        (this.IndexCount = 0),
        (this.AllMaterialControlRuntimeDataGroupMap = new Map()),
        this.InvokeStart();
    }
    RenderModuleConfig_1.RenderStats.StatCharRenderingComponentInit?.Stop();
  }
  SetLogicOwner(e) {
    (this.LogicOwner = e),
      this.LogicOwner &&
        (EffectEnvironment_1.EffectEnvironment.OpenCppOptimize
          ? (this.IsLogicOwnerTsEffectActor = this.LogicOwner.IsA(
              UE.EffectSystemActor.StaticClass(),
            ))
          : (this.IsLogicOwnerTsEffectActor = this.LogicOwner.IsA(
              UE.TsEffectActor_C.StaticClass(),
            )));
  }
  AddComponent(e, t) {
    this.IsInDebugMode &&
      Log_1.Log.CheckWarn() &&
      Log_1.Log.Warn(
        "RenderCharacter",
        40,
        "【DEPRECATED】请使用AddComponentByCase接口",
      ),
      this.AddComponentInner(e, t, !1);
  }
  AddComponentWithEmptyMaterial(e, t) {
    this.AddComponentInner(e, t, !0);
  }
  RemoveComponent(e) {
    this.IsInDebugMode &&
      Log_1.Log.CheckWarn() &&
      Log_1.Log.Warn(
        "RenderCharacter",
        40,
        "【DEPRECATED】请使用RemoveComponentByCase接口",
      ),
      this.RemoveComponentInner(e);
  }
  AddComponentByCase(e, t) {
    t
      ? (e = RenderConfig_1.RenderConfig.MaterialControlAllCaseArray[e]) &&
        this.AddComponentInner(e, t, !1)
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("RenderCharacter", 13, "添加的MeshComponent是失效的", [
          "Actor",
          this.CachedOwner.GetName(),
        ]);
  }
  RemoveComponentByCase(e) {
    e = RenderConfig_1.RenderConfig.MaterialControlAllCaseArray[e];
    e && this.RemoveComponentInner(e);
  }
  AddComponentInner(t, i, r) {
    if (this.UseMaterialContainerV2) this.AddComponentInnerV2(t, i, r);
    else {
      var n = this.GetComponent(
          RenderConfig_1.RenderConfig.IdMaterialContainer,
        ),
        o = this.GetComponent(RenderConfig_1.RenderConfig.IdMaterialController);
      let e = !1;
      o && o.RemoveSkeletalMeshMaterialControllerData(t),
        n &&
          (n.RemoveSkeletalComponent(t), (e = n.AddSkeletalComponent(i, t, r))),
        e ||
          (Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "RenderCharacter",
              13,
              "添加的MeshComponent是失效的!",
              ["Actor", this.CachedOwner.GetName()],
            ));
    }
    this.AddComponentForDecalShadow(t, i);
  }
  AddComponentInnerV2(e, t, i) {
    var r = this.GetComponent(
      RenderConfig_1.RenderConfig.IdMaterialContainerV2,
    );
    r && (r.RemoveSkeletalComponent(e), r.AddSkeletalComponent(t, e, i));
  }
  RemoveComponentInner(e) {
    var t, i;
    this.UseMaterialContainerV2
      ? this.RemoveComponentInnerV2(e)
      : ((t = this.GetComponent(
          RenderConfig_1.RenderConfig.IdMaterialContainer,
        )),
        (i = this.GetComponent(
          RenderConfig_1.RenderConfig.IdMaterialController,
        )) && i.RemoveSkeletalMeshMaterialControllerData(e),
        t &&
          !t.RemoveSkeletalComponent(e) &&
          Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "RenderCharacter",
            13,
            "无法找到要删除的MeshComponent",
            ["Actor", this.GetOwner().GetName()],
          )),
      this.RemoveComponentFromDecalShadow(e);
  }
  RemoveComponentInnerV2(e) {
    var t = this.GetComponent(
      RenderConfig_1.RenderConfig.IdMaterialContainerV2,
    );
    t && t.RemoveSkeletalComponent(e);
  }
  GetSkeletalMeshComponent(e) {
    if (this.UseMaterialContainerV2) {
      var t = this.GetComponent(
        RenderConfig_1.RenderConfig.IdMaterialContainerV2,
      );
      if (t) return t.GetSkeletalComponent(e);
    } else {
      t = this.GetComponent(RenderConfig_1.RenderConfig.IdMaterialContainer);
      if (t) return t.AllBodyInfoList.get(e)?.SkeletalComp;
    }
  }
  CheckInit() {
    return this.IsInit;
  }
  SetDebug(e) {
    this.IsDebug = e;
  }
  GetDebugInfo() {
    var e = this.GetComponent(RenderConfig_1.RenderConfig.IdMaterialController);
    if (e)
      return this.IsDebug
        ? ((e.EnableDebug = !0), e.DebugInfo)
        : void (e.EnableDebug = !1);
  }
  GetComponent(e) {
    if (this.IsInit && this.AllRenderCompsMap.has(e))
      return this.AllRenderCompsMap.get(e);
  }
  Tick(e) {
    this.Update(e);
  }
  ReceiveEndPlay(e) {
    2 !== e && this.Destroy();
  }
  GetDeltaTime() {
    return this.DeltaTime;
  }
  GetTimeDilation() {
    let e = RenderModuleController_1.RenderModuleController.IsGamePaused
      ? 0
      : RenderModuleController_1.RenderModuleController.GlobalTimeDilation;
    var t;
    return 0 === e
      ? 0
      : (this.LogicOwner &&
          this.IsLogicOwnerTsEffectActor &&
          (EffectEnvironment_1.EffectEnvironment.OpenCppOptimize
            ? ((t = this.LogicOwner), (e *= t.GetTimeScale()))
            : ((t = this.LogicOwner), (e *= t.GetTimeScale()))),
        e);
  }
  GetInWater(e = 2) {
    return this.GetComponent(
      RenderConfig_1.RenderConfig.IdSceneInteraction,
    )?.GetInWater(e);
  }
  GetRenderType() {
    return this.RenderType;
  }
  ResetAllRenderingState() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "RenderCharacter",
        25,
        "材质控制器 ResetAllRenderingState:",
        ["Actor", this.CachedOwnerName],
      );
    for (const e of this.AllRenderComps)
      e.GetIsInitSuc() && e.OnResetRenderState();
    for (const t of this.AllMaterialControlRuntimeDataGroupMap.keys())
      EventSystem_1.EventSystem.EmitWithTarget(
        this,
        EventDefine_1.EEventName.OnRemoveMaterialControllerGroup,
        t,
      );
    this.AllMaterialControlRuntimeDataGroupMap?.clear();
  }
  ResetAllRenderingStateForDebug() {
    var e = this.GetComponent(RenderConfig_1.RenderConfig.IdMaterialController);
    e &&
      0 < e.AllMaterialControlRuntimeDataMap.size &&
      (e.PrintCurrentInfo(), this.ResetAllRenderingState());
  }
  AddMaterialControllerDataGroup(e) {
    return this.AddMaterialControllerDataGroupWithAnimObject(e);
  }
  AddMaterialControllerDataGroupWithAnimObject(e, t) {
    var i = e;
    if (!i) return -1;
    var r = ++this.IndexCount;
    let n = 0;
    (n = this.UseMaterialContainerV2
      ? this.GetComponent(
          RenderConfig_1.RenderConfig.IdMaterialControllerV2,
        ).GetEffectCount()
      : this.GetComponent(RenderConfig_1.RenderConfig.IdMaterialController)
          .AllMaterialControlRuntimeDataMap.size) >
      RenderConfig_1.RenderConfig.RefErrorCount &&
      Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "RenderCharacter",
        13,
        "材质控制器添加失败，超过单个角色的材质控制器队列数量，检查是否进行了材质控制器移除和材质控制器特效的持续时间",
        ["Actor", this.GetOwner().GetName()],
        ["添加的材质控制器名称", e.GetName()],
        ["ID", r],
      ),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "RenderCharacter",
          40,
          "添加材质控制器组",
          ["Actor", this.GetOwner().GetName()],
          ["添加的材质控制器名称", e.GetName()],
          ["ID", r],
        ),
      i.CleanOriginEffect && this.ResetAllRenderingState();
    var o =
      new CharRuntimeMaterialControllerGroupInfo_1.CharMaterialControlRuntimeDataGroup();
    return (
      o.Init(this, i, t),
      this.AllMaterialControlRuntimeDataGroupMap.set(r, o),
      EventSystem_1.EventSystem.EmitWithTarget(
        this,
        EventDefine_1.EEventName.OnAddMaterialControllerGroup,
        e,
        r,
      ),
      r
    );
  }
  RemoveMaterialControllerDataGroup(e) {
    e = this.AllMaterialControlRuntimeDataGroupMap.get(e);
    e && e.EndState();
  }
  RemoveMaterialControllerDataGroupWithEnding(e) {
    e = this.AllMaterialControlRuntimeDataGroupMap.get(e);
    e && e.EndStateWithEnding();
  }
  GetCachedOwner() {
    return this.CachedOwner;
  }
  GetCachedOwnerName() {
    return this.CachedOwnerName;
  }
  GetCachedOwnerEntity() {
    return this.CachedOwnerEntity;
  }
  AddMaterialControllerDataInner(e, t, i) {
    if (!e) return -1;
    RenderModuleConfig_1.RenderStats.StatCharRenderingComponentAddData?.Start(),
      e.CleanOriginEffect && this.ResetAllRenderingState();
    let r = -1;
    if (this.UseMaterialContainerV2)
      r = this.AddMaterialControllerDataInnerV2(e, t, i);
    else {
      i = this.GetComponent(RenderConfig_1.RenderConfig.IdMaterialController);
      if (!i)
        return (
          RenderModuleConfig_1.RenderStats.StatCharRenderingComponentAddData?.Stop(),
          -1
        );
      if (CharRenderingComponent.DisableForDebug)
        return (
          this.ResetAllRenderingStateForDebug(),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "RenderCharacter",
              40,
              "【DEBUG】材质控制已关闭",
              ["Actor", this.GetOwner().GetName()],
              ["材质控制器", e.GetName()],
            ),
          RenderModuleConfig_1.RenderStats.StatCharRenderingComponentAddData?.Stop(),
          -1
        );
      (r = i.AddMaterialControllerData(e, t)),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "RenderCharacter",
            25,
            "添加材质控制器",
            ["Actor", this.GetOwner().GetName()],
            ["材质控制器", e.GetName()],
            ["handle", r],
            ["CleanOriginEffect", e.CleanOriginEffect],
          );
    }
    return (
      EventSystem_1.EventSystem.EmitWithTarget(
        this,
        EventDefine_1.EEventName.OnAddMaterialController,
        e,
        t,
        r,
      ),
      RenderModuleConfig_1.RenderStats.StatCharRenderingComponentAddData?.Stop(),
      r
    );
  }
  AddMaterialControllerDataInnerV2(e, t, i) {
    var r = this.GetComponent(
      RenderConfig_1.RenderConfig.IdMaterialControllerV2,
    );
    return r ? r.AddMaterialControllerData(e, t, i) : -1;
  }
  AddMaterialControllerDataWithUserData(e, t) {
    return this.AddMaterialControllerDataInner(e, t);
  }
  AddMaterialControllerDataWithAnimObject(e, t, i) {
    return this.AddMaterialControllerDataInner(e, i, t);
  }
  AddMaterialControllerData(e) {
    return this.AddMaterialControllerDataInner(e, void 0);
  }
  RemoveMaterialControllerData(e) {
    var t;
    this.UseMaterialContainerV2
      ? (t = this.GetComponent(
          RenderConfig_1.RenderConfig.IdMaterialControllerV2,
        )) && t.RemoveMaterialControllerData(e)
      : (t = this.GetComponent(
          RenderConfig_1.RenderConfig.IdMaterialController,
        )) && t.RemoveMaterialControllerData(e);
  }
  UpdateMaterialEffectsOnly() {
    var e;
    this.UseMaterialContainerV2 &&
      (e = this.GetComponent(
        RenderConfig_1.RenderConfig.IdMaterialContainerV2,
      )) &&
      e.UpdateEffectsOnly();
  }
  SetEffectPause(e, t) {
    var i;
    this.UseMaterialContainerV2 &&
      (i = this.GetComponent(
        RenderConfig_1.RenderConfig.IdMaterialContainerV2,
      )) &&
      i.SetEffectPause(e, t);
  }
  RemoveMaterialControllerDataWithEnding(e) {
    var t;
    this.UseMaterialContainerV2
      ? (t = this.GetComponent(
          RenderConfig_1.RenderConfig.IdMaterialControllerV2,
        )) && t.RemoveMaterialControllerDataWithEnding(e)
      : (t = this.GetComponent(
          RenderConfig_1.RenderConfig.IdMaterialController,
        )) && t.RemoveMaterialControllerDataWithEnding(e);
  }
  UpdateNpcDitherComponent() {
    var e;
    this.IsInit &&
      (3 !== this.RenderType
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error("RenderCharacter", 11, "NPC更新不是NPC类型")
        : (e = this.GetComponent(RenderConfig_1.RenderConfig.IdDitherEffect)) &&
          e.UpdateNpcDitherComponent());
  }
  SetDitherEffect(t, i) {
    var r = this.GetComponent(RenderConfig_1.RenderConfig.IdDitherEffect);
    if (r) {
      let e = t;
      1 === i &&
        ((this.FightDitherRateCache = t),
        (e = this.DisableFightDither ? 1 : t)),
        (e = CharRenderingComponent.GlobalDisableDitherEffect ? 1 : e);
      try {
        r.SetDitherEffect(e, i),
          this.SetBodyEffectOpacity(r.GetDitherRate()),
          this.SetDecalShadowOpacity(r.GetDitherRate()),
          this.SetRealtimeShadowOpacity(r.GetDitherRate());
      } catch {
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Render",
            25,
            "CharacterRenderingComponent.SetDitherEffect执行异常",
          );
      }
    }
  }
  SetDisableFightDither(e) {
    (this.DisableFightDither = e),
      this.SetDitherEffect(this.FightDitherRateCache, 1);
  }
  SetDitherApplyAll() {
    var e = this.GetComponent(RenderConfig_1.RenderConfig.IdDitherEffect);
    e && e.SetDitherMask([], !1);
  }
  SetDitherApplyHeadsOnly() {
    var e = this.GetComponent(RenderConfig_1.RenderConfig.IdDitherEffect);
    e && e.SetDitherMask(RenderConfig_1.RenderConfig.MeshPartsHeadArray, !0);
  }
  RegisterBodyEffect(e) {
    var t = this.GetComponent(RenderConfig_1.RenderConfig.IdBodyEffect);
    t && t.RegisterEffect(e);
  }
  UnregisterBodyEffect(e) {
    var t = this.GetComponent(RenderConfig_1.RenderConfig.IdBodyEffect);
    t && t.UnregisterEffect(e);
  }
  SetBodyEffectOpacity(e) {
    var t = this.GetComponent(RenderConfig_1.RenderConfig.IdBodyEffect);
    t && t.SetOpacity(e);
  }
  AddInteraction(e, t = 1) {
    var i;
    e &&
      ((i = this.GetComponent(
        RenderConfig_1.RenderConfig.IdSceneInteraction,
      )) &&
        !i.GetIsPossed() &&
        i.PossCharacter(e, t),
      (i = this.GetComponent(RenderConfig_1.RenderConfig.IdGrassInteraction)) &&
        i.SetConfig(e),
      !this.OnRoleGoDownFinishEventAdded) &&
      this.CachedOwnerEntity &&
      ((this.RemoveInteractionOnRoleGoDownFinish = () => {
        this.RemoveInteraction();
      }),
      EventSystem_1.EventSystem.AddWithTarget(
        this.CachedOwnerEntity,
        EventDefine_1.EEventName.OnRoleGoDownFinish,
        this.RemoveInteractionOnRoleGoDownFinish,
      ),
      (this.OnRoleGoDownFinishEventAdded = !0));
  }
  RemoveInteraction() {
    var e = this.GetComponent(RenderConfig_1.RenderConfig.IdSceneInteraction),
      e =
        (e && e.UnpossCharacter(),
        this.GetComponent(RenderConfig_1.RenderConfig.IdGrassInteraction));
    e && e.SetEnabled(!1);
  }
  SetMaterialPropertyFloat(e, t, i, r, n) {
    var o = this.GetComponent(RenderConfig_1.RenderConfig.IdPropertyModifier);
    o &&
      o.SetPropertyFloat(e, t, i, FNameUtil_1.FNameUtil.GetDynamicFName(r), n);
  }
  SetMaterialPropertyColor(e, t, i, r, n) {
    var o = this.GetComponent(RenderConfig_1.RenderConfig.IdPropertyModifier);
    o &&
      o.SetPropertyColor(e, t, i, FNameUtil_1.FNameUtil.GetDynamicFName(r), n);
  }
  SetMaterialPropertyFloatV2(e, t, i, r, n) {
    var o = this.GetComponent(
      RenderConfig_1.RenderConfig.IdMaterialContainerV2,
    );
    o && o.SetFloatUpdateParamPermanent(e, t, i, r, n);
  }
  SetMaterialPropertyColorV2(e, t, i, r, n) {
    var o = this.GetComponent(
      RenderConfig_1.RenderConfig.IdMaterialContainerV2,
    );
    o && o.SetColorUpdateParamPermanent(e, t, i, r, n);
  }
  SetMaterialReplaceV2(e, t, i, r) {
    var n = this.GetComponent(
      RenderConfig_1.RenderConfig.IdMaterialContainerV2,
    );
    n && n.SetExternalMaterialReplace(e, t, i, r);
  }
  RemoveExternalMaterialReplaceV2(e, t, i) {
    var r = this.GetComponent(
      RenderConfig_1.RenderConfig.IdMaterialContainerV2,
    );
    r && r.RemoveExternalMaterialReplace(e, t, i);
  }
  SetStarScarEnergy(e) {
    var t;
    this.UseMaterialContainerV2
      ? (t = this.GetComponent(
          RenderConfig_1.RenderConfig.IdMaterialContainerV2,
        )) &&
        t.SetFloatUpdateParamPermanent(
          RenderConfig_1.RenderConfig.StarScarEnergyControl,
          e,
          1,
          2,
          11,
        )
      : (t = this.GetComponent(
          RenderConfig_1.RenderConfig.IdMaterialContainer,
        )) && t.SetStarScarEnergy(e);
  }
  SetNoWater(e) {
    var t;
    this.UseMaterialContainerV2
      ? (t = this.GetComponent(
          RenderConfig_1.RenderConfig.IdMaterialContainerV2,
        )) && t.SetNoWater(e)
      : (t = this.GetComponent(
          RenderConfig_1.RenderConfig.IdMaterialContainer,
        )) && t.SetNoWater(e);
  }
  SetCapsuleDither(e) {}
  SetDecalShadowEnabled(e) {
    var t = this.GetComponent(RenderConfig_1.RenderConfig.IdDecalShadow);
    t && (e ? t.EnableDecalShadow() : t.DisableDecalShadow());
  }
  SetRealtimeShadowEnabled(e) {
    var t = this.GetComponent(RenderConfig_1.RenderConfig.IdDecalShadow);
    t && (e ? t.EnableRealtimeShadow() : t.DisableRealtimeShadow());
  }
  DisableAllShadowByDecalShadowComponent() {
    var e = this.GetComponent(RenderConfig_1.RenderConfig.IdDecalShadow);
    e && e.DisableAllShadow();
  }
  AddComponentForDecalShadow(e, t) {
    var i = this.GetComponent(RenderConfig_1.RenderConfig.IdDecalShadow);
    i && i.AddPrimitiveComponent(e, t);
  }
  RemoveComponentFromDecalShadow(e) {
    var t = this.GetComponent(RenderConfig_1.RenderConfig.IdDecalShadow);
    t && t.RemovePrimitiveComponent(e);
  }
  SetDecalShadowOpacity(e) {
    var t = this.GetComponent(RenderConfig_1.RenderConfig.IdDecalShadow);
    t && t.SetDecalShadowOpacity(e);
  }
  SetRealtimeShadowOpacity(e) {
    var t = this.GetComponent(RenderConfig_1.RenderConfig.IdDecalShadow);
    t && t.SetRealtimeShadowOpacity(e);
  }
  Update(e) {
    if (
      (CharRenderingComponent.DisableForDebug &&
        this.ResetAllRenderingStateForDebug(),
      RenderModuleConfig_1.RenderStats.StatCharRenderingComponentUpdate?.Start(),
      (this.DeltaTime = e),
      this.IsInit)
    ) {
      RenderModuleConfig_1.RenderStats.StatCharRenderingComponentDataGroupBeforeUpdate?.Start();
      for (const t of this.AllMaterialControlRuntimeDataGroupMap.values())
        t.IsDead || t.BeforeUpdateState(e, this.GetTimeDilation());
      RenderModuleConfig_1.RenderStats.StatCharRenderingComponentDataGroupBeforeUpdate?.Stop(),
        RenderModuleConfig_1.RenderStats.StatCharRenderingComponentUpdateInner?.Start();
      for (const i of this.AllRenderComps) i.GetIsInitSuc() && i.Update();
      RenderModuleConfig_1.RenderStats.StatCharRenderingComponentUpdateInner?.Stop(),
        RenderModuleConfig_1.RenderStats.StatCharRenderingComponentLateUpdate?.Start();
      for (const r of this.AllRenderComps) r.GetIsInitSuc() && r.LateUpdate();
      RenderModuleConfig_1.RenderStats.StatCharRenderingComponentLateUpdate?.Stop(),
        RenderModuleConfig_1.RenderStats.StatCharRenderingComponentDataGroupAfterUpdate?.Start(),
        this.DataGroupAfterUpdate(e),
        RenderModuleConfig_1.RenderStats.StatCharRenderingComponentDataGroupAfterUpdate?.Stop();
    }
    RenderModuleConfig_1.RenderStats.StatCharRenderingComponentUpdate?.Stop();
  }
  DataGroupAfterUpdate(e) {
    for (const r of this.AllMaterialControlRuntimeDataGroupMap.keys()) {
      var t = this.AllMaterialControlRuntimeDataGroupMap.get(r);
      t.AfterUpdateState(e), t.IsDead && this.TempRemoveList.push(r);
    }
    if (this.TempRemoveList?.length) {
      for (let e = 0; e < this.TempRemoveList.length; e++) {
        var i = this.TempRemoveList[e];
        this.AllMaterialControlRuntimeDataGroupMap.delete(i),
          GlobalData_1.GlobalData.BpEventManager.材质播放结束时.Broadcast(i),
          EventSystem_1.EventSystem.EmitWithTarget(
            this,
            EventDefine_1.EEventName.OnRemoveMaterialControllerGroup,
            i,
          ),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "RenderCharacter",
              40,
              "移除材质控制器组:",
              ["Actor", this.GetOwner().GetName()],
              ["ID", i],
            );
      }
      this.TempRemoveList.length = 0;
    }
  }
  SetEffectProgress(e, t) {
    var i;
    this.UseMaterialContainerV2
      ? (i = this.GetComponent(
          RenderConfig_1.RenderConfig.IdMaterialControllerV2,
        )) && i.SetEffectProgress(e, t)
      : (i = this.GetComponent(
          RenderConfig_1.RenderConfig.IdMaterialController,
        )) && i.SetEffectProgress(e, t);
  }
  RefreshMaterialController() {
    var e;
    this.UseMaterialContainerV2 &&
      (e = this.GetComponent(
        RenderConfig_1.RenderConfig.IdMaterialContainerV2,
      )) &&
      e.ForceUpdateOnce();
  }
  IsMaterialControllerDataValid(e) {
    if (this.UseMaterialContainerV2) {
      const t = this.GetComponent(
        RenderConfig_1.RenderConfig.IdMaterialControllerV2,
      );
      return t ? t.GetRuntimeMaterialControllerValid(e) : !1;
    }
    const t = this.GetComponent(
      RenderConfig_1.RenderConfig.IdMaterialController,
    );
    return !!t && t.GetRuntimeMaterialControllerValid(e);
  }
  Destroy() {
    if (this.IsInit) {
      this.ResetAllRenderingState();
      for (const e of this.AllRenderComps) e.Destroy();
      (this.AllRenderComps = new Array()),
        this.AllRenderCompsMap.clear(),
        (this.IsInit = !1),
        (this.IsStartInvoke = !1),
        (this.RenderType = 9),
        this.CachedOwnerEntity &&
          (EventSystem_1.EventSystem.RemoveWithTarget(
            this.CachedOwnerEntity,
            EventDefine_1.EEventName.OnRoleGoDownFinish,
            this.RemoveInteractionOnRoleGoDownFinish,
          ),
          (this.OnRoleGoDownFinishEventAdded = !1)),
        RenderModuleController_1.RenderModuleController.RemoveCharRenderShell(
          this,
        )
          ? Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("RenderCharacter", 13, "材质控制器已正常销毁", [
              "Actor",
              this.GetOwner().GetName(),
            ])
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("RenderCharacter", 13, "材质控制器销毁失败", [
              "Actor",
              this.GetOwner().GetName(),
            ]);
    }
  }
  OnFinalizedLevelSequence() {
    for (const t of this.SequenceHandleIds.values())
      this.RemoveMaterialControllerData(t),
        this.RemoveMaterialControllerDataGroup(t);
    this.SequenceHandleIds = [];
    var e = this.GetOwner().Mesh;
    e.SetCustomPrimitiveDataFloat(0, 0),
      e.SetCustomPrimitiveDataFloat(1, 0),
      (e.ExposeToCinematicsCustomLightFactor = 0),
      (e.ExposeToCinematicsCustomLightYaw = 0);
  }
  GetRenderComps() {
    return (
      (this.UseMaterialContainerV2 =
        RenderConfig_1.RenderConfig.UseMaterialContainerV2),
      RenderUtil_1.RenderUtil.GetRenderComps(
        this.RenderType,
        this.UseMaterialContainerV2,
      )
    );
  }
  InvokeStart() {
    if (!this.IsStartInvoke) {
      this.IsStartInvoke = !0;
      for (const e of this.AllRenderComps)
        try {
          e.Start();
        } catch {
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "RenderCharacter",
              25,
              "错误:组件初始化错误:",
              ["Actor", this.GetOwner().GetName()],
              ["组件ID", e.GetComponentId()],
            );
        }
      for (const t of this.AllRenderComps)
        t.GetIsInitSuc() ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "RenderCharacter",
              13,
              "错误:组件初始化错误:",
              ["Actor", this.GetOwner().GetName()],
              ["组件ID", t.GetComponentId()],
            ));
      !this.IsRecord &&
        Info_1.Info.IsGameRunning() &&
        RenderModuleController_1.RenderModuleController.AddCharRenderShell(
          this,
        );
    }
  }
  ShouldTickAfterGoDown() {
    if (this.UseMaterialContainerV2) {
      var e = this.GetComponent(
        RenderConfig_1.RenderConfig.IdMaterialContainerV2,
      );
      if (e) return e.GetAnyUnloopEffect();
    }
    return !1;
  }
  get IsInDebugMode() {
    return (
      Info_1.Info.IsGameRunning()
        ? void 0 === this.IsInDebugModeInternal &&
          (this.IsInDebugModeInternal =
            ModelManager_1.ModelManager.GameModeModel.IsSilentLogin ||
            WorldModel_1.WorldModel.IsStandalone ||
            this.IsRecord ||
            GlobalData_1.GlobalData.IsPlayInEditor)
        : (this.IsInDebugModeInternal =
            WorldModel_1.WorldModel.IsStandalone ||
            this.IsRecord ||
            GlobalData_1.GlobalData.IsPlayInEditor),
      this.IsInDebugModeInternal
    );
  }
  get IsRecord() {
    return (
      void 0 === this.IsRecordInternal &&
        (this.IsRecordInternal =
          this.GetOwner() instanceof UE.KuroRecordCharacter),
      this.IsRecordInternal
    );
  }
  ReceiveBeginPlay() {
    this.SetComponentTickEnabled(this.IsRecord);
  }
  ReceiveTick(e) {
    this.IsRecord && this.Update(e);
  }
  ReceiveSeqTick(e) {
    Info_1.Info.IsGameRunning() || this.Update(e);
  }
}
((exports.CharRenderingComponent =
  CharRenderingComponent).MotionVelocitySquared = [4e4, 25e4]),
  (CharRenderingComponent.MotionMeshShadingRate = [3, 6]),
  (CharRenderingComponent.DisableForDebug = !1),
  (CharRenderingComponent.GlobalDisableDitherEffect = !1),
  (exports.default = CharRenderingComponent);
//# sourceMappingURL=CharRenderingComponent.js.map
