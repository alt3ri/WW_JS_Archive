"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PreloadController = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  LogProfiler_1 = require("../../../Core/Common/LogProfiler"),
  Stats_1 = require("../../../Core/Common/Stats"),
  Queue_1 = require("../../../Core/Container/Queue"),
  AiBaseById_1 = require("../../../Core/Define/ConfigQuery/AiBaseById"),
  AiStateMachineConfigById_1 = require("../../../Core/Define/ConfigQuery/AiStateMachineConfigById"),
  GameplayCueById_1 = require("../../../Core/Define/ConfigQuery/GameplayCueById"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  StatSeconds_1 = require("../../../Core/Performance/StatSeconds"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  DataTableUtil_1 = require("../../../Core/Utils/DataTableUtil"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  PreCreateEffect_1 = require("../../Effect/PreCreateEffect"),
  GlobalData_1 = require("../../GlobalData"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  AutoAttachDefine_1 = require("../../Module/AutoAttach/AutoAttachDefine"),
  NpcIconDefine_1 = require("../../Module/NPC/NpcIconDefine"),
  RoleDefine_1 = require("../../Module/RoleUi/RoleDefine"),
  SplineMoveComponent_1 = require("../../NewWorld/Common/Component/SplineMoveComponent"),
  RenderConfig_1 = require("../../Render/Config/RenderConfig"),
  PreloadModel_1 = require("../Model/PreloadModel"),
  PreloadConstants_1 = require("./PreloadConstants"),
  VISION_DATA_PATH = "/Game/Aki/Character/Vision/DT_Vision.DT_Vision",
  commonMajorPaths = [
    "/Game/Aki/Data/Fight/DT_CommonNewBulletDataMain.DT_CommonNewBulletDataMain",
    "/Game/Aki/Data/Fight/DT_CommonHitEffect.DT_CommonHitEffect",
    "/Game/Aki/Character/Vision/DT_Vision.DT_Vision",
    "/Game/Aki/Data/Fight/DT_Common_Role_SkillInfo.DT_Common_Role_SkillInfo",
    "/Game/Aki/Data/Fight/DT_Common_Monster_SkillInfo.DT_Common_Monster_SkillInfo",
    "/Game/Aki/Data/Fight/DT_Common_Vision_SkillInfo.DT_Common_Vision_SkillInfo",
    "/Game/Aki/Data/Fight/DT_CharacterFightInfo.DT_CharacterFightInfo",
    "/Game/Aki/Data/Fight/DT_CaughtInfo.DT_CaughtInfo",
    "/Game/Aki/Data/Fight/DA_DefaultBulletConfig.DA_DefaultBulletConfig",
    "/Game/Aki/Data/Fight/DT_QteTag.DT_QteTag",
  ],
  commonOtherPaths = [
    "/Game/Aki/UI/UIResources/UiFight/Atlas/SP_FightPutong.SP_FightPutong",
    "/Game/Aki/Character/BaseCharacter/Abilities/GA/GA_Base.GA_Base_C",
    "/Game/Aki/Effect/UI/Niagaras/Common/NS_Fx_LGUI_FightQTE_001.NS_Fx_LGUI_FightQTE_001",
    "/Game/Aki/Effect/UI/Niagaras/Common/NS_Fx_LGUI_FightQTE_002.NS_Fx_LGUI_FightQTE_002",
    "/Game/Aki/Effect/MaterialController/Common/DA_Fx_Character_ChangeRole.DA_Fx_Character_ChangeRole",
    "/Game/Aki/Effect/BluePrint/BP_FX_Common/BP_Fx_Scanning.BP_Fx_Scanning_C",
    "/Game/Aki/Effect/BluePrint/BP_FX_Common/BP_Fx_Control_Obj.BP_Fx_Control_Obj_C",
    "/Game/Aki/Data/Fight/BulletCampAsset/DT_AllBulletCampAsset.DT_AllBulletCampAsset",
    "/Game/Aki/Data/Fight/BulletDataAsset/DT_AllBulletLogicTypeNew.DT_AllBulletLogicTypeNew",
    "/Game/Aki/Data/Fight/CommonGB/DT_AllKuroBpDataGroup.DT_AllKuroBpDataGroup",
    "/Game/Aki/Effect/Niagara/NI_Common/NS_Fx_Control_Obj_Beam.NS_Fx_Control_Obj_Beam",
    "/Game/Aki/Effect/MaterialController/Common/DA_Fx_HuluWarning.DA_Fx_HuluWarning",
    "/Game/Aki/Data/Fight/UI/DT_PanelQte.DT_PanelQte",
    "/Game/Aki/UI/Framework/PredefColor/DT_PredefColor.DT_PredefColor",
    "/Game/Aki/Effect/MaterialController/Common/DA_Fx_UIChangeRole.DA_Fx_UIChangeRole",
    RenderConfig_1.RenderConfig.CharMaterialContainerDataPath,
    RenderConfig_1.RenderConfig.EmptyMaterialPath,
    RoleDefine_1.UI_ABP_PATH,
    NpcIconDefine_1.HEADSTATE_SCALE_CURVE_PATH,
    NpcIconDefine_1.DIALOG_SCALE_CURVE_PATH,
    AutoAttachDefine_1.INERTIA_CURVE_PATH,
    AutoAttachDefine_1.VELOCITY_CURVE_PATH,
    AutoAttachDefine_1.BOUNDARY_CURVE_PATH,
    PreloadConstants_1.ACC_LERP_CURVE_PATH,
    PreloadConstants_1.SWIM_ACCELERATOR_CURVE_PATH,
    PreloadConstants_1.SWIM_ROTATOR_CURVE_PATH,
    PreloadConstants_1.BASE_MOVE_INHERIT_CURVE_PATH,
    SplineMoveComponent_1.SplineMoveComponent.DaPath,
    PreloadConstants_1.ANGLE_TO_STEP_FREQUENCY_CURVE_PATH,
    PreloadConstants_1.ANGLE_TO_STEP_LENGTH_CURVE_PATH,
    PreloadConstants_1.BATTLE_SETTLEMENT_TIME_SCALE_CURVE_PATH,
  ],
  commonEffectPaths = [
    "/Game/Aki/Data/Camera/DA_FightCameraConfig.DA_FightCameraConfig",
    "/Game/Aki/Data/Fight/BulletDataAsset/DA_CommonBullet.DA_CommonBullet",
    "/Game/Aki/Effect/EffectGroup/Common/DA_Fx_Group_WeaponEnd.DA_Fx_Group_WeaponEnd",
    "/Game/Aki/Effect/EffectGroup/Common/DA_Fx_Group_ChangeRole.DA_Fx_Group_ChangeRole",
    "/Game/Aki/Effect/EffectGroup/Common/DA_Fx_Group_ChangeRoleStart.DA_Fx_Group_ChangeRoleStart",
    "/Game/Aki/Effect/EffectGroup/Common/DA_Fx_Group_Control_Obj_Hand.DA_Fx_Group_Control_Obj_Hand",
    "/Game/Aki/Effect/DataAsset/Niagara/BigWorld/DA_Fx_Animal_Vanish.DA_Fx_Animal_Vanish",
    "/Game/Aki/Effect/EffectGroup/Common/DA_Fx_Group_XieZou_Qidong00.DA_Fx_Group_XieZou_Qidong00",
    "/Game/Aki/Effect/EffectGroup/Common/DA_Fx_Group_XieZou_Gaowen00.DA_Fx_Group_XieZou_Gaowen00",
    "/Game/Aki/Effect/MaterialController/Common/DA_Fx_HuluStart.DA_Fx_HuluStart",
    "/Game/Aki/Effect/MaterialController/Common/DA_Fx_TimeFreeze_LimitDodge.DA_Fx_TimeFreeze_LimitDodge",
    "/Game/Aki/Effect/EffectGroup/Common/DA_Fx_Group_Press_Smoke.DA_Fx_Group_Press_Smoke",
    "/Game/Aki/Effect/EffectGroup/Common/DA_Fx_Group_Hook_Miaodian_Lock.DA_Fx_Group_Hook_Miaodian_Lock",
    "/Game/Aki/Effect/EffectGroup/Common/DA_Fx_Group_Hook_Miaodian_LockDown.DA_Fx_Group_Hook_Miaodian_LockDown",
    "/Game/Aki/Effect/EffectGroup/Common/DA_Fx_Group_ChangeRole_Play.DA_Fx_Group_ChangeRole_Play",
  ],
  animSequenceBasesRef = (0, puerts_1.$ref)(UE.NewArray(UE.AnimSequenceBase)),
  animNotifyEventsRef = (0, puerts_1.$ref)(UE.NewArray(UE.AnimNotifyEvent)),
  animationAssetSetRef = (0, puerts_1.$ref)(UE.NewSet(UE.AnimationAsset)),
  animBuffList = new Array(),
  COMMON_STATE_MACHINE = "SM_Common",
  NEED_PRELOAD_DISTANCE = 4e6;
class PreloadController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return !0;
  }
  static OnClear() {
    return !0;
  }
  static DoPreload(o, a) {
    var e = ModelManager_1.ModelManager.PreloadModel;
    if (e.IsUsePreload) {
      e.HoldPreloadObject.Clear(), (e.ResourcesLoadTime.length = 0);
      const r = StatSeconds_1.StatSecondsAccumulator.Create("DoPreload"),
        i = (r.Start(), ModelManager_1.ModelManager.GameModeModel);
      i.PreloadCommonProfiler.Restart(),
        this.jfr((e) => {
          if (e) {
            i.PreloadCommonProfiler.Stop(),
              i.PreloadEntitiesProfiler.Restart(),
              o(!0);
            const t =
              StatSeconds_1.StatSecondsAccumulator.Create("PreloadEntities");
            t.Start(),
              this.Wfr(
                ModelManager_1.ModelManager.GameModeModel
                  .PreloadEntitiesProfiler,
                (e) => {
                  t.Stop(),
                    r.Stop(),
                    ModelManager_1.ModelManager.GameModeModel.PreloadEntitiesProfiler.Stop(),
                    a(e);
                },
              );
          } else r.Stop(), i.PreloadCommonProfiler.Stop(), o(!1), a?.(!1);
        });
    } else o(!0), a(!0);
  }
  static jfr(l) {
    const s = StatSeconds_1.StatSecondsAccumulator.Create("PreloadLoadCommon");
    s.Start();
    var e = ModelManager_1.ModelManager.PreloadModel;
    const _ = ConfigManager_1.ConfigManager.WorldConfig;
    var t = ModelManager_1.ModelManager.GameModeModel;
    const f = e.CommonAssetElement;
    ModelManager_1.ModelManager.CreatureModel.EnableEntityLog &&
      Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Preload", 3, "预加载:PreloadLoadCommon(开始)"),
      this.Kfr(t.PreloadCommonProfiler, (e) => {
        if (e) {
          e =
            ModelManager_1.ModelManager.GameModeModel.PreloadCommonProfiler.CreateChild(
              "搜集公共资源的次要资源",
              !0,
            );
          e.Start(),
            _.GetRoleCommonSkillInfo(),
            _.GetMonsterCommonSkillInfo(),
            _.GetVisionCommonSkillInfo(),
            _.GetCommonBulletData();
          for (const a of commonOtherPaths) f.AddOtherAsset(a);
          for (const r of DataTableUtil_1.dataTablePaths.values())
            f.AddOtherAsset(r);
          for (const i of commonEffectPaths) f.AddEffectAsset(i);
          var t =
            AiStateMachineConfigById_1.configAiStateMachineConfigById.GetConfig(
              COMMON_STATE_MACHINE,
            );
          for (const n of JSON.parse(t.StateMachineJson).Nodes)
            this.CollectAssetByStateMachineNode(f, n);
          e.Stop();
          const o =
            ModelManager_1.ModelManager.GameModeModel.PreloadCommonProfiler.CreateChild(
              "加载公共资源次要资源",
              !0,
            );
          o.Restart(),
            this.CheckPreloadByAssetElement(
              f,
              o,
              (e) => {
                o.Stop(),
                  s.Stop(),
                  e
                    ? (ModelManager_1.ModelManager.CreatureModel
                        .EnableEntityLog &&
                        Log_1.Log.CheckInfo() &&
                        Log_1.Log.Info(
                          "Preload",
                          3,
                          "预加载:PreloadLoadCommon(结束)",
                        ),
                      l(!0))
                    : (Log_1.Log.CheckError() &&
                        Log_1.Log.Error(
                          "World",
                          3,
                          "[PreloadManager.PreloadLoadCommon] 预加载公共资源失败。",
                        ),
                      l(!1));
              },
              0,
            );
        } else
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "World",
              3,
              "[PreloadManager.PreloadLoadCommon] 预加载公共资源Major失败。",
            ),
            l(!1);
      });
  }
  static Kfr(e, o) {
    var t = ModelManager_1.ModelManager.PreloadModel.CommonAssetElement;
    const a = StatSeconds_1.StatSecondsAccumulator.Create("PreloadCommonMajor"),
      r = e.CreateChild("收集并加载公共的主要资源", !0);
    ModelManager_1.ModelManager.CreatureModel.EnableEntityLog &&
      Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Preload", 3, "预加载:PreloadCommonMajor(开始)"),
      a.Start(),
      r.Restart();
    for (const n of commonMajorPaths) t.AddMajorAsset(n);
    var i = new Array();
    for (const l of t.MajorAssets) i.push(l);
    this.Xfr(t, t.MajorAssets, i, r, (e, t) => {
      r.Stop(),
        a.Stop(),
        e
          ? (ModelManager_1.ModelManager.CreatureModel.EnableEntityLog &&
              Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Preload", 3, "预加载:PreloadCommonMajor(结束)"),
            o?.(e))
          : o(!1);
    });
  }
  static Wfr(e, o) {
    const a = ModelManager_1.ModelManager.PreloadModel;
    if (a.LoadAssetOneByOneState) this.$fr(e, o);
    else {
      var r = ModelManager_1.ModelManager.CreatureModel.GetAllEntities();
      if (0 === r.length) o(!0);
      else {
        var i = Vector_1.Vector.Create(
            ModelManager_1.ModelManager.GameModeModel.BornLocation,
          ),
          n = Vector_1.Vector.Create(),
          l = new Array();
        for (const _ of r) {
          var s = _.Entity.GetComponent(0);
          _.IsInit ||
            s.GetLoading() ||
            s.GetRemoveState() ||
            s.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Custom ||
            ((s.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Player ||
              ((s = s.GetLocation()),
              (n.X = s.X),
              (n.Y = s.Y),
              (n.Z = s.Z),
              Vector_1.Vector.DistSquared(i, n) <= NEED_PRELOAD_DISTANCE)) &&
              (l.push(_), a.AddNeedWaitEntity(_.Id)));
        }
        let t = l.length;
        if (
          (ModelManager_1.ModelManager.CreatureModel.EnableEntityLog &&
            Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Preload",
              3,
              "过滤需要预加载的实体",
              ["当前实体总数", r.length],
              ["需要预加载的实体个数", t],
            ),
          0 === t)
        )
          o(!0);
        else
          for (const f of l) {
            const c = f.Entity.GetComponent(0);
            f.IsInit ||
              c.GetLoading() ||
              (ModelManager_1.ModelManager.CreatureModel.EnableEntityLog &&
                Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "Preload",
                  3,
                  "预加载实体:开始",
                  ["CreatureDataId", c.GetCreatureDataId()],
                  ["PbDataId", c.GetPbDataId()],
                  ["Reason", "PreloadController.PreloadEntities"],
                  ["Count", t],
                ),
              this.PreloadEntity(f, e, (e) => {
                t--,
                  ModelManager_1.ModelManager.CreatureModel.EnableEntityLog &&
                    Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info(
                      "Preload",
                      3,
                      "预加载实体:结束",
                      ["CreatureDataId", c.GetCreatureDataId()],
                      ["PbDataId", c.GetPbDataId()],
                      ["预加载结果", e],
                      ["调用代码位置", "PreloadController.PreloadEntities"],
                      ["Count", t],
                    ),
                  a.RemoveNeedWaitEntity(f.Id),
                  t <= 0 && o?.(e);
              }));
          }
      }
    }
  }
  static $fr(e, t) {
    var o = ModelManager_1.ModelManager.CreatureModel.GetAllEntities();
    let a = void 0;
    e &&
      (a = e.CreateChild("逐个加载Entity，实体个数:" + o.length, !0)).Start();
    var r = new Array();
    for (const i of o) r.push(i);
    this.Yfr(r, 0, a, (e) => {
      a?.Stop(), t(e);
    });
  }
  static Yfr(t, o, a, r) {
    var e, i;
    o >= t.length
      ? r(!0)
      : ((i = (e = t[o]).Entity.GetComponent(0)),
        !e || i.GetRemoveState()
          ? this.Yfr(t, o + 1, a, (e) => {
              r(e);
            })
          : this.PreloadEntity(e, a, (e) => {
              e
                ? o < t.length
                  ? this.Yfr(t, o + 1, a, (e) => {
                      r(e);
                    })
                  : r(!0)
                : r(!1);
            }));
  }
  static PreloadEntity(t, n, l) {
    if (ModelManager_1.ModelManager.PreloadModel.IsUsePreload) {
      const s = t.Entity.GetComponent(0),
        _ = StatSeconds_1.StatSecondsAccumulator.Create(
          `CreatureDataId:${s.GetCreatureDataId()}, PbDataId:` +
            s.GetPbDataId(),
        );
      _.Start();
      let o = void 0,
        e = void 0,
        a = void 0,
        r = void 0,
        i = void 0;
      if (
        (n &&
          ((o = n.CreateChild(
            `预加载实体, CreatureDataId:${s.GetCreatureDataId()}, PbDataId:` +
              s.GetPbDataId(),
            !0,
          )),
          (e = o.CreateChild("搜集实体主要资源", !0)),
          (a = o.CreateChild("搜集实体次要资源", !0)),
          (r = o.CreateChild("预加载实体主要资源", !0)),
          (i = o.CreateChild("预加载实体次要资源", !0))),
        o?.Start(),
        s.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Custom)
      )
        o?.Stop(), _.Stop(), l?.(!0);
      else {
        e?.Start();
        const f = this.Jfr(t);
        f
          ? (o?.SetDescribe(
              f.CharacterPath + ", 优先级:" + f.GetLoadPriority(),
            ),
            e?.Stop(),
            f && 3 === f.LoadState
              ? (o?.Stop(), _.Stop(), l?.(!0))
              : 0 !== f.LoadState
                ? (_.Stop(), o?.Stop(), l?.(!1))
                : ((f.LoadState = 1),
                  s.GetEntityType() ===
                    Protocol_1.Aki.Protocol.kks.Proto_Player &&
                    ModelManager_1.ModelManager.CreatureModel.EnableEntityLog &&
                    Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info(
                      "Preload",
                      3,
                      "预加载实体:预加载主要资源（开始）",
                      ["CreatureDataId", s.GetCreatureDataId()],
                      ["PbDataId", s.GetPbDataId()],
                    ),
                  r?.Start(),
                  this.zfr(f, r, (e) => {
                    if (
                      (r?.Stop(),
                      s.GetEntityType() ===
                        Protocol_1.Aki.Protocol.kks.Proto_Player &&
                        ModelManager_1.ModelManager.CreatureModel
                          .EnableEntityLog &&
                        Log_1.Log.CheckInfo() &&
                        Log_1.Log.Info(
                          "Preload",
                          3,
                          "预加载实体:预加载主要资源（结束）",
                          ["CreatureDataId", s.GetCreatureDataId()],
                          ["PbDataId", s.GetPbDataId()],
                          ["结果", e],
                        ),
                      e)
                    )
                      if (f && 4 !== f.LoadState)
                        if ((a?.Start(), this.Zfr(f))) {
                          a?.Stop();
                          const t = StatSeconds_1.StatSecondsAccumulator.Create(
                            `CheckPreloadEntityMinor: CreatureDataId:${s.GetCreatureDataId()} PbDataI:` +
                              s.GetPbDataId(),
                          );
                          t.Start(),
                            s.GetEntityType() ===
                              Protocol_1.Aki.Protocol.kks.Proto_Player &&
                              ModelManager_1.ModelManager.CreatureModel
                                .EnableEntityLog &&
                              Log_1.Log.CheckInfo() &&
                              Log_1.Log.Info(
                                "Preload",
                                3,
                                "预加载实体:预加载次要资源（开始）",
                                ["CreatureDataId", s.GetCreatureDataId()],
                                ["PbDataId", s.GetPbDataId()],
                              ),
                            i?.Start(),
                            this.CheckPreloadByAssetElement(
                              f,
                              i,
                              (e) => {
                                t.Stop(),
                                  i?.Stop(),
                                  s.GetEntityType() ===
                                    Protocol_1.Aki.Protocol.kks.Proto_Player &&
                                    ModelManager_1.ModelManager.CreatureModel
                                      .EnableEntityLog &&
                                    Log_1.Log.CheckInfo() &&
                                    Log_1.Log.Info(
                                      "Preload",
                                      3,
                                      "预加载实体:预加载次要资源（结束）",
                                      ["CreatureDataId", s.GetCreatureDataId()],
                                      ["PbDataId", s.GetPbDataId()],
                                      ["结果", e],
                                    ),
                                  f && 4 !== f.LoadState
                                    ? e
                                      ? ((f.LoadState = 3),
                                        _.Stop(),
                                        o?.Stop(),
                                        s.SetPreloadFinished(!0),
                                        EventSystem_1.EventSystem.Emit(
                                          EventDefine_1.EEventName
                                            .PreloadEntityFinished,
                                          f.EntityHandle,
                                        ),
                                        l?.(!0))
                                      : (Log_1.Log.CheckError() &&
                                          Log_1.Log.Error(
                                            "World",
                                            3,
                                            "[PreloadManager.PreloadEntity] 预加载实体次要资源是失败。",
                                            [
                                              "CreatureDataId",
                                              s?.GetCreatureDataId(),
                                            ],
                                            ["PbDataId", s?.GetPbDataId()],
                                          ),
                                        _.Stop(),
                                        l?.(!1))
                                    : (_.Stop(), l?.(!1));
                              },
                              0,
                            );
                        } else _.Stop(), a?.Stop(), o?.Stop(), l?.(!1);
                      else _.Stop(), o?.Stop(), l?.(!1);
                    else
                      Log_1.Log.CheckError() &&
                        Log_1.Log.Error(
                          "World",
                          3,
                          "[PreloadManager.PreloadEntity] 预加载实体失败。",
                          ["CreatureDataId", s.GetCreatureDataId()],
                          ["PbDataId", s.GetPbDataId()],
                        ),
                        _.Stop(),
                        o?.Stop(),
                        l?.(!1);
                  })))
          : (e?.Stop(), o?.Stop(), _.Stop(), l?.(!1));
      }
    } else l(!0);
  }
  static RemovePreloadEntity(e) {
    var t = ModelManager_1.ModelManager.PreloadModel,
      o = t.AllEntityAssetMap.get(e);
    if (o && 4 !== o.LoadState) {
      (o.LoadState = 4),
        t.HoldPreloadObject.RemoveEntityAssets(o.EntityHandle.Id);
      for (const a of o.AssetPathSet) t.RemovePreloadResource(a);
      t.RemoveEntityAsset(e);
    }
  }
  static HasAsset(e) {
    return ModelManager_1.ModelManager.PreloadModel.PreloadAssetMap.has(e);
  }
  static IsEntityPreload(e) {
    return ModelManager_1.ModelManager.PreloadModel.AllEntityAssetMap.has(e);
  }
  static zfr(o, e, a) {
    if (o.MajorAssets.size) {
      const r = StatSeconds_1.StatSecondsAccumulator.Create(
        "PreloadEntityMajor:" + o.CreatureDataComponent.GetCreatureDataId(),
      );
      r.Start();
      var t = new Array();
      for (const i of o.MajorAssets) t.push(i);
      this.Xfr(o, o.MajorAssets, t, e, (e, t) => {
        r.Stop(),
          e && (t = t.get(o.BlueprintClassPath))?.IsValid()
            ? (this.epr(o, t), this.tpr.Start(), a?.(e))
            : (this.tpr.Start(), a(!1)),
          this.tpr.Stop();
      });
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Preload",
          3,
          "实体预加载主要资源MajorAssets为空。",
          ["CreatureDataId", o.CreatureDataComponent.GetCreatureDataId()],
          ["PbDataId", o.CreatureDataComponent.GetPbDataId()],
          ["ModelId", o.CreatureDataComponent.GetModelId()],
        ),
        a?.(!1);
  }
  static EntityIsDone(e) {
    return (
      3 ===
      ModelManager_1.ModelManager.PreloadModel.AllEntityAssetMap.get(e)
        ?.LoadState
    );
  }
  static Jfr(e) {
    var t = e.Entity.GetComponent(0),
      o = ModelManager_1.ModelManager.PreloadModel,
      a = o.AllEntityAssetMap.get(t.GetCreatureDataId());
    if (a) return a;
    var r = StatSeconds_1.StatSecondsAccumulator.Create(
      "CollectAssetByEntityMajor:" + t.GetCreatureDataId(),
    );
    r.Start(),
      ((a = new PreloadModel_1.EntityAssetElement(e)).LoadState = 0),
      o.AddEntityAsset(t.GetCreatureDataId(), a);
    const i = t.GetModelConfig();
    if (i) {
      t.ModelBlueprintPath?.length &&
        ((a.BlueprintClassPath = t.ModelBlueprintPath),
        a.AddMajorAsset(t.ModelBlueprintPath));
      e = i.蓝图.ToAssetPathName();
      if (
        (0 < e.length &&
          ((o = (a.BlueprintClassPath = e).lastIndexOf("/")),
          (a.CharacterPath = e.substring(0, o)),
          a.AddMajorAsset(e)),
        t.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Player ||
          t.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Monster ||
          t.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Vision)
      ) {
        o = a.BlueprintClassPath;
        if (!o || 0 === o.length || "None" === o) {
          e = t.GetModelId();
          if (
            (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "World",
                3,
                "[PreloadController.CollectAssetByEntityMajor] 预加载的实体没有配置蓝图。",
                ["CreatureDataId", t.GetCreatureDataId()],
                ["PbDataId", t.GetPbDataId()],
                ["ModelId", e],
                ["BlueprintClassPath", o],
              ),
            GlobalData_1.GlobalData.IsPlayInEditor)
          ) {
            const i = DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(
              0,
              e.toString(),
            );
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "World",
                3,
                "[PreloadController.CollectAssetByEntityMajor] 预加载的实体没有配置蓝图(直接从表中查询)。",
                ["ModelId", e],
                ["BlueprintClassPath", i?.蓝图.ToAssetPathName()],
              );
          }
          return void r.Stop();
        }
        (e =
          ConfigManager_1.ConfigManager.WorldConfig.GetCharacterFightInfo(o)),
          (o = e?.SkillDataTable.ToAssetPathName()),
          (o =
            (o && 0 < o.length && "None" !== o && a.AddMajorAsset(o),
            e?.BulletDataTable.ToAssetPathName())),
          (o =
            (o && 0 < o.length && "None" !== o && a.AddMajorAsset(o),
            e?.PartHitEffect?.ToAssetPathName())),
          (o =
            (o &&
              0 < o.length &&
              "None" !== o &&
              ((a.PartHitEffectPath = o), a.AddMajorAsset(o)),
            e?.HitEffectTable.ToAssetPathName())),
          (o =
            (o && 0 < o.length && "None" !== o && a.AddMajorAsset(o),
            this.GetCurCharacterLoadType()));
        0 !== o &&
          (this.LGn(e?.SkillDataTableMap, o, a),
          this.LGn(e?.BulletDataTableMap, o, a),
          this.LGn(e?.HitEffectTableMap, o, a));
      }
      return r.Stop(), a;
    }
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "World",
        3,
        "[PreloadManager.CollectAssetByCreatureMajor] 不存在实体配置表，预加载失败。",
        ["CreatureDataId", t.GetCreatureDataId()],
        ["PbDataId", t.GetPbDataId()],
      ),
      r.Stop();
  }
  static LGn(e, t, o) {
    e &&
      (e = e.Get(t)?.ToAssetPathName()) &&
      0 < e.length &&
      "None" !== e &&
      o.AddMajorAsset(e);
  }
  static Zfr(e) {
    var t, o, a, r, i;
    return (
      !e.CollectMinorAsset &&
      ((t = StatSeconds_1.StatSecondsAccumulator.Create(
        "CollectAssetByEntityMinor:" +
          e.CreatureDataComponent.GetCreatureDataId(),
        e.CreatureDataComponent.GetPbDataId().toString(),
      )).Start(),
      (e.CollectMinorAsset = !0),
      (o = this.ipr(e)),
      (a = this.rpr(e)),
      (r = this.CollectAssetByBullet(e)),
      (i = this.CollectAssetByStateMachine(e)),
      this.npr(e),
      this.spr(e),
      t.Stop(),
      o) &&
      a &&
      r &&
      i
    );
  }
  static CheckPreloadByAssetElement(t, e, o, a = 0) {
    let r = void 0;
    (r = e
      ? e.CreateChild(
          `CheckPreloadByAssetElement 层:${a} 个数:` + t.NeedLoadCount(),
          !0,
        )
      : r)?.Start(),
      t.NeedLoadCount()
        ? ((e = new Queue_1.Queue()),
          0 < t.OtherAssetSet.size && e.Push([6, t.OtherAssetSet]),
          0 < t.AnimationAssetSet.size && e.Push([0, t.AnimationAssetSet]),
          0 < t.AnimationBlueprintClassAssetSet.size &&
            e.Push([5, t.AnimationBlueprintClassAssetSet]),
          0 < t.MeshAssetSet.size && e.Push([3, t.MeshAssetSet]),
          0 < t.AudioAssetSet.size && e.Push([2, t.AudioAssetSet]),
          0 < t.EffectAssetSet.size &&
            (PreCreateEffect_1.PreCreateEffect.IsNeedPreCreateEffect()
              ? e.Push([1, t.EffectAssetSet])
              : t.EffectAssetSet.clear()),
          this.apr(t, r, e, (e) => {
            t.NeedLoadCount()
              ? this.CheckPreloadByAssetElement(
                  t,
                  r,
                  (e) => {
                    o(e);
                  },
                  a + 1,
                )
              : (r?.Stop(), o(!t.HasError));
          }))
        : (r?.Stop(), o(!0));
  }
  static apr(l, s, _, f) {
    if (0 === _.Size) f(!0);
    else {
      var e = _.Pop();
      const c = e[0];
      e = e[1];
      const d = StatSeconds_1.StatSecondsAccumulator.Create(
        `LoadAssetsByQueue: ${PreloadModel_1.preloadAssetTypeForName.get(c)}, 个数:` +
          e.size,
      );
      let n = void 0;
      if (
        (s &&
          (n = s.CreateChild(
            PreloadModel_1.preloadAssetTypeForName.get(c) + " 个数:" + e.size,
            !0,
          )),
        d.Start(),
        n?.Start(),
        0 === e.size)
      )
        n?.Stop(), d.Stop(), f(!0);
      else {
        var t = new Array();
        for (const o of e) t.push(o);
        this.Xfr(l, e, t, n, (e, t) => {
          if ((n?.Stop(), d.Stop(), e || (l.HasError = !0), 0 === c)) {
            animBuffList.length = 0;
            for (var [, o] of t)
              o.IsA(UE.AnimMontage.StaticClass())
                ? this.hpr(l, o, animBuffList)
                : o.IsA(UE.AnimSequenceBase.StaticClass()) &&
                  this.lpr(l, o, animBuffList);
            this.CollectAssetByBuffIdList(l, animBuffList);
          }
          if (1 === c)
            for (var [a, r] of t)
              r.IsA(UE.EffectModelBase.StaticClass()) &&
                l instanceof PreloadModel_1.EntityAssetElement &&
                ModelManager_1.ModelManager.PreloadModel.PreCreateEffect.AddPreCreateEffect(
                  l.EntityHandle.Id,
                  a,
                ),
                this.upr(l, r);
          if (5 === c) for (var [, i] of t) this.cpr(l, i);
          0 === _.Size
            ? f(e)
            : this.apr(l, s, _, (e) => {
                f(e);
              });
        });
      }
    }
  }
  static Xfr(i, e, n, t, l) {
    var s = ModelManager_1.ModelManager.PreloadModel;
    if (s.LoadAssetOneByOneState) this.LoadAssetsOneByOne(i, e, n, t, l);
    else {
      let o = void 0,
        a = ((o = t ? t.CreateChild("批量预加载资源", !0) : o)?.Start(), 0),
        r = 0;
      const _ = new Map();
      for (const f of n)
        e.delete(f),
          s.AddPreloadResource(f),
          ResourceSystem_1.ResourceSystem.LoadAsync(
            f,
            UE.Object,
            (e, t) => {
              e?.IsValid()
                ? (a++, i.AddObject(t, e), _.set(t, e))
                : (Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "World",
                      3,
                      "[PreloadManager.PreloadAssetsInternal] 批量预加载资源失败，asset.IsValid() = false。",
                      ["Path", t],
                    ),
                  r++),
                r + a < n.length || (o?.Stop(), l?.(0 === r, _));
            },
            i.GetLoadPriority(),
          );
    }
  }
  static LoadAssetsOneByOne(e, t, o, a, r) {
    let i = void 0;
    a &&
      (i = a.CreateChild("逐个加载资源列表，资源个数:" + t.size, !0)).Start();
    const n = new Map();
    this.LoadAssetsRecursive(e, t, o, 0, i, n, (e) => {
      i?.Stop(), r(e, n);
    });
  }
  static LoadAssetsRecursive(a, r, i, n, l, s, _) {
    if (0 === i.length || n === i.length) _(!0);
    else {
      const f = i[n];
      let o = void 0;
      l && (o = l.CreateChild(`加载资源:${f} `, !0)).Start(),
        r.delete(f),
        ModelManager_1.ModelManager.PreloadModel.AddPreloadResource(f),
        ResourceSystem_1.ResourceSystem.LoadAsync(
          f,
          UE.Object,
          (e, t) => {
            o?.Stop(),
              ModelManager_1.ModelManager.PreloadModel.AddResourcesLoadTime([
                t,
                o ? o.Time : 0,
              ]),
              e
                ? e.IsValid()
                  ? (a.AddObject(f, e),
                    s.set(t, e),
                    n < i.length
                      ? this.LoadAssetsRecursive(a, r, i, n + 1, l, s, (e) => {
                          _(e);
                        })
                      : _?.(!0))
                  : (Log_1.Log.CheckError() &&
                      Log_1.Log.Error(
                        "World",
                        3,
                        "[PreloadManager.LoadAssetsRecursive] asset.IsValid() = false。",
                        ["资源Path", t],
                      ),
                    _?.(!1))
                : (Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "World",
                      3,
                      "[PreloadManager.LoadAssetsRecursive] 预加载资源失败, asset = undefined。",
                      ["资源Path", t],
                    ),
                  _?.(!1));
          },
          a.GetLoadPriority(),
        );
    }
  }
  static LoadAsset(e, t) {}
  static npr(e) {}
  static spr(t) {
    if (t.PartHitEffectPath?.length) {
      var e = void 0,
        o =
          ((e = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
            t.PartHitEffectPath,
            UE.BP_PartHitEffect_C,
          ))?.IsValid() ||
            (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "World",
                3,
                "预加载部位资源失败。",
                ["Path", t.PartHitEffectPath],
                ["CreatureDataId", t.CreatureDataComponent.GetCreatureDataId()],
              ),
            t.PrintDebugInfo()),
          e?.PartCollision),
        a = o?.Num();
      if (a)
        for (let e = 0; e < a; ++e) {
          var r = o.Get(e),
            i = r.Audio?.ToAssetPathName(),
            r = r.Effect?.ToAssetPathName();
          i?.length &&
            "None" !== i &&
            t.AddEffectAsset(i) &&
            t instanceof PreloadModel_1.EntityAssetElement &&
            ModelManager_1.ModelManager.PreloadModel.PreCreateEffect.AddPreCreateEffect(
              t.EntityHandle.Id,
              i,
            ),
            r?.length &&
              "None" !== r &&
              t.AddEffectAsset(r) &&
              t instanceof PreloadModel_1.EntityAssetElement &&
              ModelManager_1.ModelManager.PreloadModel.PreCreateEffect.AddPreCreateEffect(
                t.EntityHandle.Id,
                r,
              );
        }
    }
  }
  static ipr(t) {
    var e = StatSeconds_1.StatSecondsAccumulator.Create(
        "CollectAssetByModelConfig:" +
          t.CreatureDataComponent.GetCreatureDataId(),
        t.CreatureDataComponent.GetPbDataId().toString(),
      ),
      o = (e.Start(), t.CreatureDataComponent.GetModelConfig());
    if (!o)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "World",
            3,
            "[PreloadManager.PreloadEntityActor] 不存在modelConfig。",
            ["PbDataId", t.CreatureDataComponent.GetPbDataId()],
          ),
        e.Stop(),
        !1
      );
    var a = o.动画蓝图.ToAssetPathName(),
      a =
        (a &&
          0 < a.length &&
          "None" !== a &&
          t.AddAnimationBlueprintClassAsset(a),
        o.网格体);
    UE.KismetSystemLibrary.IsValidSoftObjectReference(a) &&
      t.AddOtherAsset(a.ToAssetPathName());
    var a = o.场景交互物.AssetPathName?.toString(),
      r =
        (a && 0 < a.length && "None" !== a && t.AddOtherAsset(a),
        o.常驻特效列表),
      i = r?.Num();
    if (i)
      for (let e = 0; e < i; ++e) {
        var n = r.GetKey(e),
          n = r.Get(n).AssetPathName;
        t.AddEffectAsset(n.toString());
      }
    a = o.DA.AssetPathName.toString();
    return a && "None" !== a && t.AddOtherAsset(a), e.Stop(), !0;
  }
  static rpr(e) {
    var t,
      o,
      a = StatSeconds_1.StatSecondsAccumulator.Create(
        "CollectAssetBySkill:" + e.CreatureDataComponent.GetCreatureDataId(),
        e.CreatureDataComponent.GetPbDataId().toString(),
      ),
      r = (a.Start(), e.CreatureDataComponent);
    return (
      r.GetEntityType() !== Protocol_1.Aki.Protocol.kks.Proto_Player &&
      r.GetEntityType() !== Protocol_1.Aki.Protocol.kks.Proto_Monster &&
      r.GetEntityType() !== Protocol_1.Aki.Protocol.kks.Proto_Vision
        ? a.Stop()
        : ((r = e.BlueprintClassPath),
          (t =
            ConfigManager_1.ConfigManager.WorldConfig.GetCharacterFightInfo(
              r,
            )?.SkillDataTable.ToAssetPathName()) &&
            0 < t.length &&
            "None" !== t &&
            ((o = void 0),
            (o = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
              t,
              UE.DataTable,
            ))?.IsValid()
              ? (e.SkillDataTable = o)
              : Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn(
                  "Character",
                  3,
                  "[PreloadController.CollectAssetBySkill] 加载角色技能表失败。",
                  ["Path", r],
                  ["技能表Path", t],
                )),
          e.AddOtherAsset(VISION_DATA_PATH),
          this.mpr(e),
          a.Stop()),
      !0
    );
  }
  static mpr(e) {
    var t = e.CreatureDataComponent;
    if (e.SkillDataTable) {
      var o = new Array(),
        a =
          (DataTableUtil_1.DataTableUtil.GetDataTableAllRowNamesFromTable(
            e.SkillDataTable,
            o,
          ),
          new Array());
      for (const P of o) {
        var r = this.dpr(e, P);
        if (r) {
          this.CollectEntityAbility(e, r),
            this.CollectEntitySkillMontage(e, P, r);
          var i = r.SkillStartBuff;
          if (i?.Num())
            for (let e = 0; e < i.Num(); ++e) {
              var n = i.Get(e);
              n && a.push(n);
            }
          var l = r.SkillEndBuff;
          if (l?.Num())
            for (let e = 0; e < l.Num(); ++e) {
              var s = l.Get(e);
              s && a.push(s);
            }
        }
      }
      this.CollectAssetByBuffIdList(e, a);
    }
    var o = ConfigManager_1.ConfigManager.WorldConfig,
      _ = o.GetCharacterFightInfo(e.BlueprintClassPath),
      f = this.GetCurCharacterLoadType();
    if (0 !== f) {
      _ = _?.SkillDataTableMap.Get(f)?.ToAssetPathName();
      if (_ && 0 < _.length && "None" !== _) {
        var c = ResourceSystem_1.ResourceSystem.GetLoadedAsset(_, UE.DataTable);
        if (c) {
          var f = new Array(),
            d =
              (DataTableUtil_1.DataTableUtil.GetDataTableAllRowNamesFromTable(
                c,
                f,
              ),
              new Array());
          for (const h of f) {
            var C = DataTableUtil_1.DataTableUtil.GetDataTableRow(c, h);
            if (C) {
              this.CollectEntityAbility(e, C),
                this.CollectEntitySkillMontage(e, h, C);
              var u = C.SkillStartBuff;
              if (u?.Num())
                for (let e = 0; e < u.Num(); ++e) {
                  var m = u.Get(e);
                  m && d.push(m);
                }
              var g = C.SkillEndBuff;
              if (g?.Num())
                for (let e = 0; e < g.Num(); ++e) {
                  var A = g.Get(e);
                  A && d.push(A);
                }
            }
          }
          this.CollectAssetByBuffIdList(e, d);
        }
      }
    }
    if (t.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Player)
      for (const E of o.GetRoleCommonSkillRowNames()) {
        var M = this.dpr(e, E);
        M &&
          (this.CollectEntityAbility(e, M),
          this.CollectEntitySkillMontage(e, E, M));
      }
    else if (t.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Monster)
      for (const B of o.GetMonsterCommonSkillRowNames()) {
        var v = this.dpr(e, B);
        v &&
          (this.CollectEntityAbility(e, v),
          this.CollectEntitySkillMontage(e, B, v));
      }
    else if (t.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Vision)
      for (const y of o.GetVisionCommonSkillRowNames()) {
        var D = this.dpr(e, y);
        D &&
          (this.CollectEntityAbility(e, D),
          this.CollectEntitySkillMontage(e, y, D));
      }
  }
  static fpr(e, t) {
    if (t) {
      var o = StatSeconds_1.StatSecondsAccumulator.Create(
        "CollectAssetByBuffInfo",
      );
      if ((o.Start(), t.GameplayCueIds))
        for (const r of t.GameplayCueIds) {
          var a = GameplayCueById_1.configGameplayCueById.GetConfig(r);
          if (a) {
            a.Path.length && e.AddEffectAsset(a.Path);
            for (const i of a.Resources) i.length && e.AddEffectAsset(i);
          }
        }
      o.Stop();
    }
  }
  static CollectAssetByBuffIdList(e, t) {
    if (t?.length) {
      var o = StatSeconds_1.StatSecondsAccumulator.Create(
          "CollectAssetByBuffIdList",
        ),
        t =
          (o.Start(),
          ConfigManager_1.ConfigManager.BuffItemConfig.GetBuffConfigs(
            e instanceof PreloadModel_1.EntityAssetElement
              ? e.EntityHandle.Id
              : -1,
            t,
          ));
      if (t) for (const a of t) this.fpr(e, a);
      o.Stop();
    }
  }
  static dpr(t, o) {
    let a = DataTableUtil_1.DataTableUtil.GetDataTableRow(
      t.SkillDataTable,
      o.toString(),
    );
    if (!a) {
      var r = ConfigManager_1.ConfigManager.WorldConfig;
      let e = void 0;
      t.CreatureDataComponent.GetEntityType() ===
      Protocol_1.Aki.Protocol.kks.Proto_Player
        ? (e = r.GetRoleCommonSkillInfo())
        : t.CreatureDataComponent.GetEntityType() ===
            Protocol_1.Aki.Protocol.kks.Proto_Monster
          ? (e = r.GetMonsterCommonSkillInfo())
          : t.CreatureDataComponent.GetEntityType() ===
              Protocol_1.Aki.Protocol.kks.Proto_Vision &&
            (e = r.GetVisionCommonSkillInfo()),
        e &&
          (a = DataTableUtil_1.DataTableUtil.GetDataTableRow(e, o.toString()));
    }
    return a;
  }
  static CollectEntityAbility(e, t) {
    t &&
      1 === t.SkillMode &&
      (t = t.SkillGA.AssetPathName.toString()) &&
      0 < t.length &&
      "None" !== t &&
      e.AddOtherAsset(t);
  }
  static CollectEntitySkillMontage(t, o, e) {
    var a = e.Animations,
      r = e.ExportSpecialAnim;
    if (a?.Num() || r?.Num()) {
      if (a?.Num())
        for (let e = 0; e < a.Num(); ++e) {
          var i = a.Get(e).AssetPathName.toString();
          i && 0 !== i.length && "None" !== i && t.AddAnimationAsset(i);
        }
      if (r?.Num())
        for (let e = 0; e < r.Num(); ++e) {
          var n = r.Get(e).AssetPathName.toString();
          n && 0 !== n.length && "None" !== n && t.AddAnimationAsset(n);
        }
    } else if (e.MontagePaths?.Num()) {
      var l = e.MontagePaths;
      for (let e = 0; e < l.Num(); ++e) {
        var s = l.Get(e);
        (s && 0 !== s.length) ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "World",
              3,
              "[PreloadManager.CollectEntitySkillMontage] 实体的MontagePath配置了空蒙太奇名称。",
              ["索引:", e],
              ["SkillId:", o],
              ["CreatureDataId:", t.CreatureDataComponent.GetCreatureDataId()],
              ["PbDataId:", t.CreatureDataComponent.GetPbDataId()],
            ));
      }
    }
  }
  static ppr(t) {
    var e = new LogProfiler_1.LogProfiler("CollectAssetByCommonBullet耗时"),
      o =
        (e.Start(),
        StatSeconds_1.StatSecondsAccumulator.Create(
          "CollectAssetByCommonBullet",
        )),
      a =
        (o.Start(),
        ConfigManager_1.ConfigManager.WorldConfig.GetCommonBulletData()),
      r = DataTableUtil_1.DataTableUtil.GetDataTableAllRowFromTable(a),
      i = ModelManager_1.ModelManager.PreloadModel,
      n = r.length;
    for (let e = 0; e < n; ++e) {
      var l = r[e],
        s = l.基础设置,
        _ = l.逻辑设置,
        f = l.表现效果设置,
        l = l.执行逻辑,
        s = s.命中判定类型预设,
        s =
          (UE.KismetSystemLibrary.IsValidSoftObjectReference(s) &&
            i.CommonAssetElement.AddOtherAsset(s.ToAssetPathName()),
          _.预设),
        _ =
          (UE.KismetSystemLibrary.IsValidSoftObjectReference(s) &&
            i.CommonAssetElement.AddOtherAsset(s.ToAssetPathName()),
          f.子弹特效DA),
        c =
          (UE.KismetSystemLibrary.IsValidSoftObjectReference(_) &&
            i.CommonAssetElement.AddEffectAsset(_.ToAssetPathName()),
          f.命中特效DA?.Num()),
        d = f.命中特效DA;
      if (c)
        for (let e = 0; e < c; ++e) {
          var C = d.GetKey(e),
            C = d.Get(C),
            u = C?.ToAssetPathName();
          u &&
            0 < u?.length &&
            "None" !== u &&
            i.CommonAssetElement.AddEffectAsset(u) &&
            i.PreCreateEffect.AddPreCreateEffect(t, C.ToAssetPathName());
        }
      var s = f.命中时攻击者震屏,
        _ =
          (UE.KismetSystemLibrary.IsValidSoftClassReference(s) &&
            i.CommonAssetElement.AddOtherAsset(s.ToAssetPathName()),
          f.命中时受击者震屏),
        s =
          (UE.KismetSystemLibrary.IsValidSoftClassReference(_) &&
            i.CommonAssetElement.AddOtherAsset(_.ToAssetPathName()),
          l.GB组),
        m =
          (UE.KismetSystemLibrary.IsValidSoftObjectReference(s) &&
            i.CommonAssetElement.AddOtherAsset(s.ToAssetPathName()),
          l.命中后对攻击者应用GE的Id);
      if (m?.Num())
        for (let e = 0; e < m.Num(); ++e)
          this.CollectAssetByCommonBulletBuff(t, m.Get(e));
      var g = l.命中后对受击者应用GE的Id;
      if (g?.Num())
        for (let e = 0; e < g.Num(); ++e)
          this.CollectAssetByCommonBulletBuff(t, g.Get(e));
      var A = l.能量恢复类GE数组的Id;
      if (A?.Num())
        for (let e = 0; e < A.Num(); ++e)
          this.CollectAssetByCommonBulletBuff(t, A.Get(e));
      var M = l.命中后对在场上角色应用的GE的Id;
      if (M?.Num())
        for (let e = 0; e < M.Num(); ++e)
          this.CollectAssetByCommonBulletBuff(t, M.Get(e));
      var v = l.受击对象进入应用的GE的Id;
      if (v?.Num())
        for (let e = 0; e < v.Num(); ++e)
          this.CollectAssetByCommonBulletBuff(t, v.Get(e));
    }
    o.Stop(), e.Stop();
  }
  static CollectAssetByCommonBulletBuff(e, t) {
    if (t) {
      e = ConfigManager_1.ConfigManager.BuffItemConfig.GetBuffConfig(e, t);
      if (e) {
        var o = ModelManager_1.ModelManager.PreloadModel;
        if (e.GameplayCueIds)
          for (const r of e.GameplayCueIds) {
            var a = GameplayCueById_1.configGameplayCueById.GetConfig(r);
            a &&
              a.Path &&
              0 !== a.Path.length &&
              o.CommonAssetElement.AddEffectAsset(a.Path);
          }
      }
    }
  }
  static CollectAssetByBullet(e) {
    var t,
      o,
      a,
      r = StatSeconds_1.StatSecondsAccumulator.Create(
        "CollectAssetByBullet:" + e.CreatureDataComponent.GetCreatureDataId(),
        e.CreatureDataComponent.GetPbDataId().toString(),
      ),
      i = (r.Start(), e.CreatureDataComponent);
    return (
      i.GetEntityType() !== Protocol_1.Aki.Protocol.kks.Proto_Player &&
      i.GetEntityType() !== Protocol_1.Aki.Protocol.kks.Proto_Monster &&
      i.GetEntityType() !== Protocol_1.Aki.Protocol.kks.Proto_Vision
        ? r.Stop()
        : ((i = e.BlueprintClassPath),
          (t = (o =
            ConfigManager_1.ConfigManager.WorldConfig.GetCharacterFightInfo(
              i,
            ))?.BulletDataTable.ToAssetPathName()) &&
            0 !== t.length &&
            "None" !== t &&
            ((a = void 0),
            (a = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
              t,
              UE.DataTable,
            ))?.IsValid()
              ? (this.CollectAssetByBulletDt(a, e),
                o &&
                  0 !== (a = this.GetCurCharacterLoadType()) &&
                  (o = o?.BulletDataTableMap.Get(a)?.ToAssetPathName()) &&
                  0 < o.length &&
                  "None" !== o &&
                  (a = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
                    o,
                    UE.DataTable,
                  )) &&
                  this.CollectAssetByBulletDt(a, e))
              : Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn(
                  "Character",
                  3,
                  "[CollectAssetByBullet.PreloadController] 加载角色子弹表失败。",
                  ["Path", i],
                  ["子弹表Path", t],
                )),
          r.Stop()),
      !0
    );
  }
  static CollectAssetByBulletDt(t, o) {
    if (t.IsValid()) {
      var a = DataTableUtil_1.DataTableUtil.GetDataTableAllRowFromTable(t),
        r = a.length;
      for (let e = 0; e < r; ++e) {
        var i = a[e];
        this.vpr(o, i) ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Preload",
              37,
              "[CollectEntityAssetByBulletDataMain]Collect Entity Bullet Failed",
              ["EntityId", o?.Entity?.Id],
              ["BulletDataMain", t.GetName()],
              ["RowStructName", t.RowStructName],
              ["BulletCount", r],
              ["ErrorIndex", e],
            ));
      }
    }
  }
  static CollectAssetByStateMachine(e) {
    var t = e.CreatureDataComponent.GetPbEntityInitData();
    let o = 0;
    t = (o =
      t?.ComponentsData &&
      (t = (0, IComponent_1.getComponent)(t.ComponentsData, "AiComponent"))
        ?.AiId &&
      !t.Disabled
        ? t.AiId
        : o)
      ? AiBaseById_1.configAiBaseById.GetConfig(o)
      : void 0;
    if (t?.StateMachine) {
      var a =
        AiStateMachineConfigById_1.configAiStateMachineConfigById.GetConfig(
          t.StateMachine,
        );
      if (a?.StateMachineJson) {
        var a = JSON.parse(a.StateMachineJson),
          r = e.Entity.GetComponent(68);
        r.StateMachineName = t.StateMachine;
        for (const i of (r.StateMachineJsonObject = a).Nodes)
          this.CollectAssetByStateMachineNode(e, i);
      }
    }
    return !0;
  }
  static CollectAssetByStateMachineNode(e, t) {
    if (t.BindStates && 0 < t.BindStates.length)
      for (const a of t.BindStates)
        switch (a.Type) {
          case 1:
            this.CollectAssetByBuffIdList(e, [BigInt(a.BindBuff.BuffId)]);
            break;
          case 104:
            for (const r of a.BindCue.CueIds)
              this.CollectAssetByCueId(e, BigInt(r));
            break;
          case 113:
            a.BindPalsy.CounterAttackEffect &&
              e.AddOtherAsset(a.BindPalsy.CounterAttackEffect),
              a.BindPalsy.CounterAttackCamera &&
                e.AddOtherAsset(a.BindPalsy.CounterAttackCamera);
        }
    var o = [];
    t.OnEnterActions &&
      0 < t.OnEnterActions?.length &&
      o.push(...t.OnEnterActions),
      t.OnExitActions &&
        0 < t.OnExitActions?.length &&
        o.push(...t.OnExitActions);
    for (const i of o)
      switch (i.Type) {
        case 1:
          this.CollectAssetByBuffIdList(e, [BigInt(i.ActionAddBuff.BuffId)]);
          break;
        case 101:
          for (const n of i.ActionCue.CueIds)
            this.CollectAssetByCueId(e, BigInt(n));
      }
  }
  static CollectAssetByCueId(e, t) {
    t = GameplayCueById_1.configGameplayCueById.GetConfig(t);
    t && t.Path && 0 !== t.Path.length && e.AddEffectAsset(t.Path);
  }
  static vpr(t, e) {
    var o = StatSeconds_1.StatSecondsAccumulator.Create(
        "CollectEntityAssetByBulletDataMain",
      ),
      a = (o.Start(), e.基础设置),
      r = e.逻辑设置,
      i = e.表现效果设置,
      n = e.执行逻辑;
    if (!a)
      return (
        (l = t),
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Preload",
            37,
            "[CollectEntityAssetByBulletDataMain]BaseSetting Is Undefiend",
            ["EntityId", l?.Entity?.Id],
            ["BulletDataMain", e.子弹名称],
          ),
        o.Stop(),
        !1
      );
    var l = a.命中判定类型预设,
      e =
        (UE.KismetSystemLibrary.IsValidSoftObjectReference(l) &&
          t.AddOtherAsset(l.ToAssetPathName()),
        r.预设),
      a =
        (UE.KismetSystemLibrary.IsValidSoftObjectReference(e) &&
          t.AddOtherAsset(e.ToAssetPathName()),
        i.子弹特效DA),
      s =
        (UE.KismetSystemLibrary.IsValidSoftObjectReference(a) &&
          t.AddEffectAsset(a.ToAssetPathName()),
        i.命中特效DA),
      _ = s?.Num();
    if (_)
      for (let e = 0; e < _; ++e) {
        var f = s.GetKey(e),
          f = s.Get(f),
          c = f?.ToAssetPathName();
        c &&
          0 < c?.length &&
          "None" !== c &&
          t.AddEffectAsset(c) &&
          t instanceof PreloadModel_1.EntityAssetElement &&
          (t.CreatureDataComponent.GetEntityType() ===
          Protocol_1.Aki.Protocol.kks.Proto_Player
            ? ModelManager_1.ModelManager.PreloadModel.PreCreateEffect.AddPreCreateHitEffect(
                t.EntityHandle.Id,
                f.ToAssetPathName(),
              )
            : ModelManager_1.ModelManager.PreloadModel.PreCreateEffect.AddPreCreateEffect(
                t.EntityHandle.Id,
                f.ToAssetPathName(),
              ));
      }
    var l = i.命中时攻击者震屏,
      r =
        (UE.KismetSystemLibrary.IsValidSoftClassReference(l) &&
          t.AddOtherAsset(l.ToAssetPathName()),
        i.命中时受击者震屏),
      e =
        (UE.KismetSystemLibrary.IsValidSoftClassReference(r) &&
          t.AddOtherAsset(r.ToAssetPathName()),
        n.GB组),
      d =
        (UE.KismetSystemLibrary.IsValidSoftObjectReference(e) &&
          t.AddOtherAsset(e.ToAssetPathName()),
        new Array()),
      C = n.命中后对攻击者应用GE的Id;
    if (C?.Num())
      for (let e = 0; e < C.Num(); ++e) {
        var u = C.Get(e);
        u && d.push(u);
      }
    var m = n.命中后对受击者应用GE的Id;
    if (m?.Num())
      for (let e = 0; e < m.Num(); ++e) {
        var g = m.Get(e);
        g && d.push(g);
      }
    var A = n.能量恢复类GE数组的Id;
    if (A?.Num())
      for (let e = 0; e < A.Num(); ++e) {
        var M = A.Get(e);
        M && d.push(M);
      }
    var v = n.命中后对在场上角色应用的GE的Id;
    if (v?.Num())
      for (let e = 0; e < v.Num(); ++e) {
        var D = v.Get(e);
        D && d.push(D);
      }
    var P = n.受击对象进入应用的GE的Id;
    if (P?.Num())
      for (let e = 0; e < P.Num(); ++e) {
        var h = P.Get(e);
        h && d.push(h);
      }
    return this.CollectAssetByBuffIdList(t, d), o.Stop(), !0;
  }
  static lpr(t, e, o) {
    var a = StatSeconds_1.StatSecondsAccumulator.Create(
        "CollectAssetByAnimSequence",
      ),
      r =
        (a.Start(),
        (0, puerts_1.$unref)(animNotifyEventsRef).Empty(),
        UE.KuroStaticLibrary.GetAnimSequenceNotifies(e, animNotifyEventsRef),
        (0, puerts_1.$unref)(animNotifyEventsRef)),
      i = r?.Num();
    if (i) {
      for (let e = 0; e < i; ++e) {
        var n = r.Get(e);
        this.Mpr(t, n, o);
      }
      a.Stop();
    }
  }
  static hpr(t, e, o) {
    var a = StatSeconds_1.StatSecondsAccumulator.Create(
      "CollectAssetByAnimMontage",
    );
    a.Start();
    (0, puerts_1.$unref)(animNotifyEventsRef).Empty(),
      UE.KuroStaticLibrary.GetAnimMontageNotifies(e, animNotifyEventsRef),
      UE.KuroStaticLibrary.SetMontageANIndex(e);
    var r = (0, puerts_1.$unref)(animNotifyEventsRef);
    if (r?.Num())
      for (let e = 0; e < r.Num(); ++e) {
        var i = r.Get(e);
        this.Mpr(t, i, o);
      }
    (0, puerts_1.$unref)(animSequenceBasesRef).Empty(),
      UE.KuroStaticLibrary.GetAnimSequencesByAnimMontage(
        e,
        animSequenceBasesRef,
      );
    var n = (0, puerts_1.$unref)(animSequenceBasesRef);
    if (n?.Num())
      for (let e = 0; e < n.Num(); ++e) {
        var l = n.Get(e);
        this.lpr(t, l, o);
      }
    a.Stop();
  }
  static Mpr(e, t, o) {
    if (t.NotifyStateClass?.IsValid()) {
      if (t.NotifyStateClass.IsA(UE.AnimNotifyStateEffect_C.StaticClass()))
        return (a = t.NotifyStateClass.EffectDataAssetRef?.ToAssetPathName()) &&
          0 !== a.length &&
          "None" !== a
          ? void e.AddEffectAsset(a)
          : void 0;
      if (t.NotifyStateClass.IsA(UE.TsAnimNotifyStateAddBuff_C.StaticClass()))
        return (a = t.NotifyStateClass).BuffId ? void o.push(a.BuffId) : void 0;
    }
    var a;
    if (t.Notify?.IsValid())
      return t.Notify.IsA(UE.AnimNotifyEffect_C.StaticClass())
        ? (a = t.Notify.EffectDataAssetRef?.ToAssetPathName()) &&
          0 !== a.length &&
          "None" !== a
          ? void e.AddEffectAsset(a)
          : void 0
        : void (
            t.Notify.IsA(UE.TsAnimNotifyAddBuff_C.StaticClass()) &&
            (e = t.Notify).BuffId &&
            o.push(e.BuffId)
          );
  }
  static upr(t, o) {
    if (o?.IsValid()) {
      var e = StatSeconds_1.StatSecondsAccumulator.Create(
        "CollectAssetByEffectModelBase",
      );
      if ((e.Start(), o.IsA(UE.EffectModelGroup_C.StaticClass()))) {
        var a = o,
          r = a.EffectData?.Num();
        if (r)
          for (let e = 0; e < r; ++e) {
            var i,
              n = a.EffectData.GetKey(e);
            n?.IsValid() &&
              (n.IsA(UE.EffectModelGroup_C.StaticClass())
                ? Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "Preload",
                    3,
                    "子特效不能是DA_Fx_Group",
                    ["父特效", o.GetName()],
                    ["子特效", n.GetName()],
                  )
                : (this.upr(t, n),
                  n.IsA(UE.EffectModelSkeletalMesh_C.StaticClass()) &&
                    ((i = n.AnimationRef)?.IsValid()
                      ? i.IsA(UE.AnimSequence.StaticClass())
                        ? this.lpr(t, i, animBuffList)
                        : i.IsA(UE.AnimMontage.StaticClass()) &&
                          this.hpr(t, i, animBuffList)
                      : Log_1.Log.CheckError() &&
                        Log_1.Log.Error(
                          "Preload",
                          3,
                          "特效的mesh没有配置动画",
                          ["父特效", o.GetName()],
                          ["子特效", n.GetName()],
                        ))));
          }
      }
      e.Stop();
    }
  }
  static cpr(t, e) {
    if (e) {
      PreloadController.Epr.Start(),
        (0, puerts_1.$unref)(animationAssetSetRef).Empty(),
        UE.KuroStaticLibrary.GetAnimAssetsByAnimBlueprintClass(
          e,
          animationAssetSetRef,
        );
      var o = (0, puerts_1.$unref)(animationAssetSetRef),
        a = UE.KuroStaticLibrary.GetDefaultObject(e);
      if (a && 0 < a.ExtraRibbonAnims?.Num())
        for (let e = 0; e < a.ExtraRibbonAnims?.Num(); e++) {
          var r = a.ExtraRibbonAnims.GetKey(e),
            r = a.ExtraRibbonAnims.Get(r);
          r && o.Add(r);
        }
      if (o?.Num()) {
        for (let e = (animBuffList.length = 0); e < o.Num(); ++e) {
          var i = o.Get(e);
          i.IsA(UE.AnimSequence.StaticClass())
            ? this.lpr(t, i, animBuffList)
            : i.IsA(UE.AnimMontage.StaticClass()) &&
              this.hpr(t, i, animBuffList);
        }
        this.CollectAssetByBuffIdList(t, animBuffList);
      }
      PreloadController.Epr.Stop();
    }
  }
  static epr(t, e) {
    if (e) {
      var o = StatSeconds_1.StatSecondsAccumulator.Create(
          "CollectAssetByActorClass",
        ),
        a = (o.Start(), (0, puerts_1.$ref)(void 0)),
        a =
          (UE.KuroStaticLibrary.GetCharacterAnimClass(e, a),
          (0, puerts_1.$unref)(a));
      if (e.IsChildOf(UE.TsBaseCharacter_C.StaticClass())) {
        var r = e?.SimpleConstructionScript;
        if (r)
          for (let e = 0; e < r.AllNodes.Num(); e++) {
            var i = r.AllNodes.Get(e);
            i &&
              i.ComponentClass === UE.SkeletalMeshComponent.StaticClass() &&
              (i = i.ComponentTemplate?.GetAnimClass()) &&
              this.cpr(t, i);
          }
      }
      a && (this.cpr(t, a), o.Stop());
    }
  }
  static OnLeaveLevel() {
    var e,
      t = ModelManager_1.ModelManager.PreloadModel;
    t.CommonAssetElement.Clear();
    for ([, e] of t.AllEntityAssetMap) 4 !== e.LoadState && e.Clear();
    return t.ClearEntityAsset(), t.ClearPreloadResource(), !0;
  }
  static GetCurCharacterLoadType() {
    return ModelManager_1.ModelManager.RoguelikeModel.CheckInRoguelike()
      ? 1
      : 0;
  }
}
((exports.PreloadController = PreloadController).tpr = Stats_1.Stat.Create(
  "PreloadEntityMajor Cb",
)),
  (PreloadController.Epr = Stats_1.Stat.Create(
    "CollectAssetByAnimationBlueprintClass",
  ));
//# sourceMappingURL=PreloadController.js.map
