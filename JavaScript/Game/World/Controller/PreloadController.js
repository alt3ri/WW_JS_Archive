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
  static DoPreload(o, t) {
    var e = ModelManager_1.ModelManager.PreloadModel;
    if (e.IsUsePreload) {
      e.HoldPreloadObject.Clear();
      e.ResourcesLoadTime.length = 0;
      const a = ModelManager_1.ModelManager.GameModeModel;
      a.PreloadCommonProfiler.Restart(),
        this.jfr((e) => {
          e
            ? (a.PreloadCommonProfiler.Stop(),
              a.PreloadEntitiesProfiler.Restart(),
              o(!0),
              this.Wfr(
                ModelManager_1.ModelManager.GameModeModel
                  .PreloadEntitiesProfiler,
                (e) => {
                  ModelManager_1.ModelManager.GameModeModel.PreloadEntitiesProfiler.Stop(),
                    t(e);
                },
              ))
            : (a.PreloadCommonProfiler.Stop(), o(!1), t?.(!1));
        });
    } else o(!0), t(!0);
  }
  static jfr(l) {
    var e = ModelManager_1.ModelManager.PreloadModel;
    const _ = ConfigManager_1.ConfigManager.WorldConfig;
    var o = ModelManager_1.ModelManager.GameModeModel;
    const s = e.CommonAssetElement;
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Preload", 3, "预加载:PreloadLoadCommon(开始)"),
      this.Kfr(o.PreloadCommonProfiler, (e) => {
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
          for (const a of commonOtherPaths) s.AddOtherAsset(a);
          for (const r of DataTableUtil_1.dataTablePaths.values())
            s.AddOtherAsset(r);
          for (const i of commonEffectPaths) s.AddEffectAsset(i);
          var o =
            AiStateMachineConfigById_1.configAiStateMachineConfigById.GetConfig(
              COMMON_STATE_MACHINE,
            );
          for (const n of JSON.parse(o.StateMachineJson).Nodes)
            this.CollectAssetByStateMachineNode(s, n);
          e.Stop();
          const t =
            ModelManager_1.ModelManager.GameModeModel.PreloadCommonProfiler.CreateChild(
              "加载公共资源次要资源",
              !0,
            );
          t.Restart(),
            this.CheckPreloadByAssetElement(
              s,
              t,
              (e) => {
                t.Stop(),
                  e
                    ? (Log_1.Log.CheckInfo() &&
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
  static Kfr(e, t) {
    var o = ModelManager_1.ModelManager.PreloadModel.CommonAssetElement;
    const a = e.CreateChild("收集并加载公共的主要资源", !0);
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Preload", 3, "预加载:PreloadCommonMajor(开始)"),
      a.Restart();
    for (const i of commonMajorPaths) o.AddMajorAsset(i);
    var r = new Array();
    for (const n of o.MajorAssets) r.push(n);
    this.Xfr(o, o.MajorAssets, r, a, (e, o) => {
      a.Stop(),
        e
          ? (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Preload", 3, "预加载:PreloadCommonMajor(结束)"),
            t?.(e))
          : t(!1);
    });
  }
  static Wfr(e, t) {
    const a = ModelManager_1.ModelManager.PreloadModel;
    if (a.LoadAssetOneByOneState) this.$fr(e, t);
    else {
      var r = ModelManager_1.ModelManager.CreatureModel.GetAllEntities();
      if (0 === r.length) t(!0);
      else {
        var i = Vector_1.Vector.Create(
            ModelManager_1.ModelManager.GameModeModel.BornLocation,
          ),
          n = Vector_1.Vector.Create(),
          l = new Array();
        for (const s of r) {
          var _ = s.Entity.GetComponent(0);
          s.IsInit ||
            _.GetLoading() ||
            _.GetRemoveState() ||
            _.GetEntityType() === Protocol_1.Aki.Protocol.wks.Proto_Custom ||
            ((_.GetEntityType() === Protocol_1.Aki.Protocol.wks.Proto_Player ||
              ((_ = _.GetLocation()),
              (n.X = _.X),
              (n.Y = _.Y),
              (n.Z = _.Z),
              Vector_1.Vector.DistSquared(i, n) <= NEED_PRELOAD_DISTANCE)) &&
              (l.push(s), a.AddNeedWaitEntity(s.Id)));
        }
        let o = l.length;
        if (
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Preload",
              3,
              "过滤需要预加载的实体",
              ["当前实体总数", r.length],
              ["需要预加载的实体个数", o],
            ),
          0 === o)
        )
          t(!0);
        else
          for (const f of l) {
            const c = f.Entity.GetComponent(0);
            f.IsInit ||
              c.GetLoading() ||
              (Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "Preload",
                  3,
                  "预加载实体:开始",
                  ["CreatureDataId", c.GetCreatureDataId()],
                  ["PbDataId", c.GetPbDataId()],
                  ["Reason", "PreloadController.PreloadEntities"],
                  ["Count", o],
                ),
              this.PreloadEntity(f, e, (e) => {
                o--,
                  Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info(
                      "Preload",
                      3,
                      "预加载实体:结束",
                      ["CreatureDataId", c.GetCreatureDataId()],
                      ["PbDataId", c.GetPbDataId()],
                      ["预加载结果", e],
                      ["调用代码位置", "PreloadController.PreloadEntities"],
                      ["Count", o],
                    ),
                  a.RemoveNeedWaitEntity(f.Id),
                  o <= 0 && t?.(e);
              }));
          }
      }
    }
  }
  static $fr(e, o) {
    var t = ModelManager_1.ModelManager.CreatureModel.GetAllEntities();
    let a = void 0;
    e &&
      (a = e.CreateChild("逐个加载Entity，实体个数:" + t.length, !0)).Start();
    var r = new Array();
    for (const i of t) r.push(i);
    this.Yfr(r, 0, a, (e) => {
      a?.Stop(), o(e);
    });
  }
  static Yfr(o, t, a, r) {
    var e, i;
    t >= o.length
      ? r(!0)
      : ((i = (e = o[t]).Entity.GetComponent(0)),
        !e || i.GetRemoveState()
          ? this.Yfr(o, t + 1, a, (e) => {
              r(e);
            })
          : this.PreloadEntity(e, a, (e) => {
              e
                ? t < o.length
                  ? this.Yfr(o, t + 1, a, (e) => {
                      r(e);
                    })
                  : r(!0)
                : r(!1);
            }));
  }
  static PreloadEntity(i, n, l) {
    if (ModelManager_1.ModelManager.PreloadModel.IsUsePreload) {
      const _ = i.Entity.GetComponent(0);
      let o = void 0,
        e = void 0,
        t = void 0,
        a = void 0,
        r = void 0;
      if (
        (n &&
          ((o = n.CreateChild(
            `预加载实体, CreatureDataId:${_.GetCreatureDataId()}, PbDataId:` +
              _.GetPbDataId(),
            !0,
          )),
          (e = o.CreateChild("搜集实体主要资源", !0)),
          (t = o.CreateChild("搜集实体次要资源", !0)),
          (a = o.CreateChild("预加载实体主要资源", !0)),
          (r = o.CreateChild("预加载实体次要资源", !0))),
        o?.Start(),
        _.GetEntityType() === Protocol_1.Aki.Protocol.wks.Proto_Custom)
      )
        o?.Stop(), l?.(!0);
      else {
        e?.Start();
        const s = this.Jfr(i);
        s
          ? (o?.SetDescribe(
              s.CharacterPath + ", 优先级:" + s.GetLoadPriority(),
            ),
            e?.Stop(),
            s && 3 === s.LoadState
              ? (o?.Stop(), l?.(!0))
              : 0 !== s.LoadState
                ? (o?.Stop(), l?.(!1))
                : ((s.LoadState = 1),
                  _.GetEntityType() ===
                    Protocol_1.Aki.Protocol.wks.Proto_Player &&
                    Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info(
                      "Preload",
                      3,
                      "预加载实体:预加载主要资源（开始）",
                      ["CreatureDataId", _.GetCreatureDataId()],
                      ["PbDataId", _.GetPbDataId()],
                    ),
                  a?.Start(),
                  this.zfr(s, a, (e) => {
                    a?.Stop(),
                      _.GetEntityType() ===
                        Protocol_1.Aki.Protocol.wks.Proto_Player &&
                        Log_1.Log.CheckInfo() &&
                        Log_1.Log.Info(
                          "Preload",
                          3,
                          "预加载实体:预加载主要资源（结束）",
                          ["CreatureDataId", _.GetCreatureDataId()],
                          ["PbDataId", _.GetPbDataId()],
                          ["结果", e],
                        ),
                      e
                        ? s && 4 !== s.LoadState
                          ? (t?.Start(),
                            this.Zfr(s)
                              ? (t?.Stop(),
                                _.GetEntityType() ===
                                  Protocol_1.Aki.Protocol.wks.Proto_Player &&
                                  Log_1.Log.CheckInfo() &&
                                  Log_1.Log.Info(
                                    "Preload",
                                    3,
                                    "预加载实体:预加载次要资源（开始）",
                                    ["CreatureDataId", _.GetCreatureDataId()],
                                    ["PbDataId", _.GetPbDataId()],
                                  ),
                                r?.Start(),
                                this.CheckPreloadByAssetElement(
                                  s,
                                  r,
                                  (e) => {
                                    r?.Stop(),
                                      _.GetEntityType() ===
                                        Protocol_1.Aki.Protocol.wks
                                          .Proto_Player &&
                                        Log_1.Log.CheckInfo() &&
                                        Log_1.Log.Info(
                                          "Preload",
                                          3,
                                          "预加载实体:预加载次要资源（结束）",
                                          [
                                            "CreatureDataId",
                                            _.GetCreatureDataId(),
                                          ],
                                          ["PbDataId", _.GetPbDataId()],
                                          ["结果", e],
                                        ),
                                      s && 4 !== s.LoadState
                                        ? e
                                          ? ((s.LoadState = 3),
                                            o?.Stop(),
                                            _.SetPreloadFinished(!0),
                                            EventSystem_1.EventSystem.Emit(
                                              EventDefine_1.EEventName
                                                .PreloadEntityFinished,
                                              s.EntityHandle,
                                            ),
                                            l?.(!0))
                                          : (Log_1.Log.CheckError() &&
                                              Log_1.Log.Error(
                                                "World",
                                                3,
                                                "[PreloadManager.PreloadEntity] 预加载实体次要资源是失败。",
                                                [
                                                  "CreatureDataId",
                                                  _?.GetCreatureDataId(),
                                                ],
                                                ["PbDataId", _?.GetPbDataId()],
                                              ),
                                            l?.(!1))
                                        : l?.(!1);
                                  },
                                  0,
                                ))
                              : (t?.Stop(), o?.Stop(), l?.(!1)))
                          : (o?.Stop(), l?.(!1))
                        : (Log_1.Log.CheckError() &&
                            Log_1.Log.Error(
                              "World",
                              3,
                              "[PreloadManager.PreloadEntity] 预加载实体失败。",
                              ["CreatureDataId", _.GetCreatureDataId()],
                              ["PbDataId", _.GetPbDataId()],
                            ),
                          o?.Stop(),
                          l?.(!1));
                  })))
          : (e?.Stop(), o?.Stop(), l?.(!1));
      }
    } else l(!0);
  }
  static RemovePreloadEntity(e) {
    var o = ModelManager_1.ModelManager.PreloadModel,
      t = o.AllEntityAssetMap.get(e);
    if (t && 4 !== t.LoadState) {
      (t.LoadState = 4),
        o.HoldPreloadObject.RemoveEntityAssets(t.EntityHandle.Id);
      for (const a of t.AssetPathSet) o.RemovePreloadResource(a);
      o.RemoveEntityAsset(e);
    }
  }
  static HasAsset(e) {
    return ModelManager_1.ModelManager.PreloadModel.PreloadAssetMap.has(e);
  }
  static IsEntityPreload(e) {
    return ModelManager_1.ModelManager.PreloadModel.AllEntityAssetMap.has(e);
  }
  static zfr(t, e, a) {
    if (t.MajorAssets.size) {
      var o = new Array();
      for (const r of t.MajorAssets) o.push(r);
      this.Xfr(t, t.MajorAssets, o, e, (e, o) => {
        e && (o = o.get(t.BlueprintClassPath))?.IsValid()
          ? (this.epr(t, o), a?.(e))
          : a(!1);
      });
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Preload",
          3,
          "实体预加载主要资源MajorAssets为空。",
          ["CreatureDataId", t.CreatureDataComponent.GetCreatureDataId()],
          ["PbDataId", t.CreatureDataComponent.GetPbDataId()],
          ["ModelId", t.CreatureDataComponent.GetModelId()],
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
    var o = e.Entity.GetComponent(0),
      t = ModelManager_1.ModelManager.PreloadModel,
      a = t.AllEntityAssetMap.get(o.GetCreatureDataId());
    if (a) return a;
    ((a = new PreloadModel_1.EntityAssetElement(e)).LoadState = 0),
      t.AddEntityAsset(o.GetCreatureDataId(), a);
    const r = o.GetModelConfig();
    if (r) {
      o.ModelBlueprintPath?.length &&
        ((a.BlueprintClassPath = o.ModelBlueprintPath),
        a.AddMajorAsset(o.ModelBlueprintPath));
      e = r.蓝图.ToAssetPathName();
      if (
        (0 < e.length &&
          ((t = (a.BlueprintClassPath = e).lastIndexOf("/")),
          (a.CharacterPath = e.substring(0, t)),
          a.AddMajorAsset(e)),
        o.GetEntityType() === Protocol_1.Aki.Protocol.wks.Proto_Player ||
          o.GetEntityType() === Protocol_1.Aki.Protocol.wks.Proto_Monster ||
          o.GetEntityType() === Protocol_1.Aki.Protocol.wks.Proto_Vision)
      ) {
        t = a.BlueprintClassPath;
        if (!t || 0 === t.length || "None" === t) {
          e = o.GetModelId();
          if (
            (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "World",
                3,
                "[PreloadController.CollectAssetByEntityMajor] 预加载的实体没有配置蓝图。",
                ["CreatureDataId", o.GetCreatureDataId()],
                ["PbDataId", o.GetPbDataId()],
                ["ModelId", e],
                ["BlueprintClassPath", t],
              ),
            GlobalData_1.GlobalData.IsPlayInEditor)
          ) {
            const r = DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(
              0,
              e.toString(),
            );
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "World",
                3,
                "[PreloadController.CollectAssetByEntityMajor] 预加载的实体没有配置蓝图(直接从表中查询)。",
                ["ModelId", e],
                ["BlueprintClassPath", r?.蓝图.ToAssetPathName()],
              );
          }
          return;
        }
        (e =
          ConfigManager_1.ConfigManager.WorldConfig.GetCharacterFightInfo(t)),
          (t = e?.SkillDataTable.ToAssetPathName()),
          (t =
            (t && 0 < t.length && "None" !== t && a.AddMajorAsset(t),
            e?.BulletDataTable.ToAssetPathName())),
          (t =
            (t && 0 < t.length && "None" !== t && a.AddMajorAsset(t),
            e?.PartHitEffect?.ToAssetPathName())),
          (t =
            (t &&
              0 < t.length &&
              "None" !== t &&
              ((a.PartHitEffectPath = t), a.AddMajorAsset(t)),
            e?.HitEffectTable.ToAssetPathName())),
          (t =
            (t && 0 < t.length && "None" !== t && a.AddMajorAsset(t),
            this.GetCurCharacterLoadType()));
        0 !== t &&
          (this.fGn(e?.SkillDataTableMap, t, a),
          this.fGn(e?.BulletDataTableMap, t, a),
          this.fGn(e?.HitEffectTableMap, t, a));
      }
      return a;
    }
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "World",
        3,
        "[PreloadManager.CollectAssetByCreatureMajor] 不存在实体配置表，预加载失败。",
        ["CreatureDataId", o.GetCreatureDataId()],
        ["PbDataId", o.GetPbDataId()],
      );
  }
  static fGn(e, o, t) {
    e &&
      (e = e.Get(o)?.ToAssetPathName()) &&
      0 < e.length &&
      "None" !== e &&
      t.AddMajorAsset(e);
  }
  static Zfr(e) {
    var o, t, a, r;
    return (
      !e.CollectMinorAsset &&
      ((e.CollectMinorAsset = !void 0),
      (o = this.ipr(e)),
      (t = this.rpr(e)),
      (a = this.CollectAssetByBullet(e)),
      (r = this.CollectAssetByStateMachine(e)),
      this.npr(e),
      this.spr(e),
      o) &&
      t &&
      a &&
      r
    );
  }
  static CheckPreloadByAssetElement(o, e, t, a = 0) {
    let r = void 0;
    (r = e
      ? e.CreateChild(
          `CheckPreloadByAssetElement 层:${a} 个数:` + o.NeedLoadCount(),
          !0,
        )
      : r)?.Start(),
      o.NeedLoadCount()
        ? ((e = new Queue_1.Queue()),
          0 < o.OtherAssetSet.size && e.Push([6, o.OtherAssetSet]),
          0 < o.AnimationAssetSet.size && e.Push([0, o.AnimationAssetSet]),
          0 < o.AnimationBlueprintClassAssetSet.size &&
            e.Push([5, o.AnimationBlueprintClassAssetSet]),
          0 < o.MeshAssetSet.size && e.Push([3, o.MeshAssetSet]),
          0 < o.AudioAssetSet.size && e.Push([2, o.AudioAssetSet]),
          0 < o.EffectAssetSet.size &&
            (PreCreateEffect_1.PreCreateEffect.IsNeedPreCreateEffect()
              ? e.Push([1, o.EffectAssetSet])
              : o.EffectAssetSet.clear()),
          this.apr(o, r, e, (e) => {
            o.NeedLoadCount()
              ? this.CheckPreloadByAssetElement(
                  o,
                  r,
                  (e) => {
                    t(e);
                  },
                  a + 1,
                )
              : (r?.Stop(), t(!o.HasError));
          }))
        : (r?.Stop(), t(!0));
  }
  static apr(l, _, s, f) {
    if (0 === s.Size) f(!0);
    else {
      var e = s.Pop();
      const c = e[0];
      e = e[1];
      let n = void 0;
      if (
        ((n = _
          ? _.CreateChild(
              PreloadModel_1.preloadAssetTypeForName.get(c) + " 个数:" + e.size,
              !0,
            )
          : n)?.Start(),
        0 === e.size)
      )
        n?.Stop(), f(!0);
      else {
        var o = new Array();
        for (const t of e) o.push(t);
        this.Xfr(l, e, o, n, (e, o) => {
          if ((n?.Stop(), e || (l.HasError = !0), 0 === c)) {
            animBuffList.length = 0;
            for (var [, t] of o)
              t.IsA(UE.AnimMontage.StaticClass())
                ? this.hpr(l, t, animBuffList)
                : t.IsA(UE.AnimSequenceBase.StaticClass()) &&
                  this.lpr(l, t, animBuffList);
            this.CollectAssetByBuffIdList(l, animBuffList);
          }
          if (1 === c)
            for (var [a, r] of o)
              r.IsA(UE.EffectModelBase.StaticClass()) &&
                l instanceof PreloadModel_1.EntityAssetElement &&
                ModelManager_1.ModelManager.PreloadModel.PreCreateEffect.AddPreCreateEffect(
                  l.EntityHandle.Id,
                  a,
                ),
                this.upr(l, r);
          if (5 === c) for (var [, i] of o) this.cpr(l, i);
          0 === s.Size
            ? f(e)
            : this.apr(l, _, s, (e) => {
                f(e);
              });
        });
      }
    }
  }
  static Xfr(i, e, n, o, l) {
    var _ = ModelManager_1.ModelManager.PreloadModel;
    if (_.LoadAssetOneByOneState) this.LoadAssetsOneByOne(i, e, n, o, l);
    else {
      let t = void 0,
        a = ((t = o ? o.CreateChild("批量预加载资源", !0) : t)?.Start(), 0),
        r = 0;
      const s = new Map();
      for (const f of n)
        e.delete(f),
          _.AddPreloadResource(f),
          ResourceSystem_1.ResourceSystem.LoadAsync(
            f,
            UE.Object,
            (e, o) => {
              e?.IsValid()
                ? (a++, i.AddObject(o, e), s.set(o, e))
                : (Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "World",
                      3,
                      "[PreloadManager.PreloadAssetsInternal] 批量预加载资源失败，asset.IsValid() = false。",
                      ["Path", o],
                    ),
                  r++),
                r + a < n.length || (t?.Stop(), l?.(0 === r, s));
            },
            i.GetLoadPriority(),
          );
    }
  }
  static LoadAssetsOneByOne(e, o, t, a, r) {
    let i = void 0;
    a &&
      (i = a.CreateChild("逐个加载资源列表，资源个数:" + o.size, !0)).Start();
    const n = new Map();
    this.LoadAssetsRecursive(e, o, t, 0, i, n, (e) => {
      i?.Stop(), r(e, n);
    });
  }
  static LoadAssetsRecursive(a, r, i, n, l, _, s) {
    if (0 === i.length || n === i.length) s(!0);
    else {
      const f = i[n];
      let t = void 0;
      l && (t = l.CreateChild(`加载资源:${f} `, !0)).Start(),
        r.delete(f),
        ModelManager_1.ModelManager.PreloadModel.AddPreloadResource(f),
        ResourceSystem_1.ResourceSystem.LoadAsync(
          f,
          UE.Object,
          (e, o) => {
            t?.Stop(),
              ModelManager_1.ModelManager.PreloadModel.AddResourcesLoadTime([
                o,
                t ? t.Time : 0,
              ]),
              e
                ? e.IsValid()
                  ? (a.AddObject(f, e),
                    _.set(o, e),
                    n < i.length
                      ? this.LoadAssetsRecursive(a, r, i, n + 1, l, _, (e) => {
                          s(e);
                        })
                      : s?.(!0))
                  : (Log_1.Log.CheckError() &&
                      Log_1.Log.Error(
                        "World",
                        3,
                        "[PreloadManager.LoadAssetsRecursive] asset.IsValid() = false。",
                        ["资源Path", o],
                      ),
                    s?.(!1))
                : (Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "World",
                      3,
                      "[PreloadManager.LoadAssetsRecursive] 预加载资源失败, asset = undefined。",
                      ["资源Path", o],
                    ),
                  s?.(!1));
          },
          a.GetLoadPriority(),
        );
    }
  }
  static LoadAsset(e, o) {}
  static npr(e) {
    var o = e.BlueprintClassPath;
    if (o?.length) {
      o = ConfigManager_1.ConfigManager.WorldConfig.GetMontageMap(o);
      if (o?.size)
        for (var [, t] of o) {
          t = t?.ToAssetPathName();
          t && 0 !== t.length && "None" !== t && e.AddAnimationAsset(t);
        }
    }
  }
  static spr(o) {
    if (o.PartHitEffectPath?.length) {
      var e = void 0,
        t =
          ((e = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
            o.PartHitEffectPath,
            UE.BP_PartHitEffect_C,
          ))?.IsValid() ||
            (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "World",
                3,
                "预加载部位资源失败。",
                ["Path", o.PartHitEffectPath],
                ["CreatureDataId", o.CreatureDataComponent.GetCreatureDataId()],
              ),
            o.PrintDebugInfo()),
          e?.PartCollision),
        a = t?.Num();
      if (a)
        for (let e = 0; e < a; ++e) {
          var r = t.Get(e),
            i = r.Audio?.ToAssetPathName(),
            r = r.Effect?.ToAssetPathName();
          i?.length &&
            "None" !== i &&
            o.AddEffectAsset(i) &&
            o instanceof PreloadModel_1.EntityAssetElement &&
            ModelManager_1.ModelManager.PreloadModel.PreCreateEffect.AddPreCreateEffect(
              o.EntityHandle.Id,
              i,
            ),
            r?.length &&
              "None" !== r &&
              o.AddEffectAsset(r) &&
              o instanceof PreloadModel_1.EntityAssetElement &&
              ModelManager_1.ModelManager.PreloadModel.PreCreateEffect.AddPreCreateEffect(
                o.EntityHandle.Id,
                r,
              );
        }
    }
  }
  static ipr(o) {
    var e = o.CreatureDataComponent.GetModelConfig();
    if (!e)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "World",
            3,
            "[PreloadManager.PreloadEntityActor] 不存在modelConfig。",
            ["PbDataId", o.CreatureDataComponent.GetPbDataId()],
          ),
        !1
      );
    var t = e.动画蓝图.ToAssetPathName(),
      t =
        (t &&
          0 < t.length &&
          "None" !== t &&
          o.AddAnimationBlueprintClassAsset(t),
        e.网格体);
    UE.KismetSystemLibrary.IsValidSoftObjectReference(t) &&
      o.AddOtherAsset(t.ToAssetPathName());
    var t = e.场景交互物.AssetPathName?.toString(),
      a =
        (t && 0 < t.length && "None" !== t && o.AddOtherAsset(t),
        e.常驻特效列表),
      r = a?.Num();
    if (r)
      for (let e = 0; e < r; ++e) {
        var i = a.GetKey(e),
          i = a.Get(i).AssetPathName;
        o.AddEffectAsset(i.toString());
      }
    t = e.DA.AssetPathName.toString();
    return t && "None" !== t && o.AddOtherAsset(t), !0;
  }
  static rpr(e) {
    var o,
      t,
      a = e.CreatureDataComponent;
    return (
      (a.GetEntityType() !== Protocol_1.Aki.Protocol.wks.Proto_Player &&
        a.GetEntityType() !== Protocol_1.Aki.Protocol.wks.Proto_Monster &&
        a.GetEntityType() !== Protocol_1.Aki.Protocol.wks.Proto_Vision) ||
        ((a = e.BlueprintClassPath),
        (o =
          ConfigManager_1.ConfigManager.WorldConfig.GetCharacterFightInfo(
            a,
          )?.SkillDataTable.ToAssetPathName()) &&
          0 < o.length &&
          "None" !== o &&
          ((t = void 0),
          (t = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
            o,
            UE.DataTable,
          ))?.IsValid()
            ? (e.SkillDataTable = t)
            : Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Character",
                3,
                "[PreloadController.CollectAssetBySkill] 加载角色技能表失败。",
                ["Path", a],
                ["技能表Path", o],
              )),
        e.AddOtherAsset(VISION_DATA_PATH),
        this.mpr(e)),
      !0
    );
  }
  static mpr(o) {
    var e = o.CreatureDataComponent;
    if (o.SkillDataTable) {
      var t = (0, puerts_1.$ref)(void 0),
        a =
          (UE.DataTableFunctionLibrary.GetDataTableRowNames(
            o.SkillDataTable,
            t,
          ),
          new Array()),
        r = (0, puerts_1.$unref)(t);
      if (r?.Num())
        for (let e = 0; e < r.Num(); e++) {
          var i = r.Get(e).toString(),
            n = this.dpr(o, i);
          if (n) {
            this.CollectEntityAbility(o, n),
              this.CollectEntitySkillMontage(o, i, n);
            var l = n.SkillStartBuff;
            if (l?.Num())
              for (let e = 0; e < l.Num(); ++e) {
                var _ = l.Get(e);
                _ && a.push(_);
              }
            var s = n.SkillEndBuff;
            if (s?.Num())
              for (let e = 0; e < s.Num(); ++e) {
                var f = s.Get(e);
                f && a.push(f);
              }
          }
        }
      this.CollectAssetByBuffIdList(o, a);
    }
    var t = ConfigManager_1.ConfigManager.WorldConfig,
      c = t.GetCharacterFightInfo(o.BlueprintClassPath),
      d = this.GetCurCharacterLoadType();
    if (0 !== d) {
      c = c?.SkillDataTableMap.Get(d)?.ToAssetPathName();
      if (c && 0 < c.length && "None" !== c) {
        var C = ResourceSystem_1.ResourceSystem.GetLoadedAsset(c, UE.DataTable),
          d = (0, puerts_1.$ref)(void 0),
          u =
            (UE.DataTableFunctionLibrary.GetDataTableRowNames(C, d),
            new Array()),
          m = (0, puerts_1.$unref)(d);
        if (m?.Num())
          for (let e = 0; e < m.Num(); e++) {
            var g = m.Get(e).toString(),
              A = DataTableUtil_1.DataTableUtil.GetDataTableRow(C, g);
            if (A) {
              this.CollectEntityAbility(o, A),
                this.CollectEntitySkillMontage(o, g, A);
              var v = A.SkillStartBuff;
              if (v?.Num())
                for (let e = 0; e < v.Num(); ++e) {
                  var h = v.Get(e);
                  h && u.push(h);
                }
              var D = A.SkillEndBuff;
              if (D?.Num())
                for (let e = 0; e < D.Num(); ++e) {
                  var P = D.Get(e);
                  P && u.push(P);
                }
            }
          }
        this.CollectAssetByBuffIdList(o, u);
      }
    }
    if (e.GetEntityType() === Protocol_1.Aki.Protocol.wks.Proto_Player) {
      (c = (0, puerts_1.$ref)(void 0)),
        (d =
          (UE.DataTableFunctionLibrary.GetDataTableRowNames(
            t.GetRoleCommonSkillInfo(),
            c,
          ),
          t.GetRoleCommonSkillRowNames()));
      for (const p of d) {
        var M = this.dpr(o, p);
        M &&
          (this.CollectEntityAbility(o, M),
          this.CollectEntitySkillMontage(o, p, M));
      }
    } else if (
      e.GetEntityType() === Protocol_1.Aki.Protocol.wks.Proto_Monster
    ) {
      (c = (0, puerts_1.$ref)(void 0)),
        (d =
          (UE.DataTableFunctionLibrary.GetDataTableRowNames(
            t.GetMonsterCommonSkillInfo(),
            c,
          ),
          t.GetMonsterCommonSkillRowNames()));
      for (const y of d) {
        var E = this.dpr(o, y);
        E &&
          (this.CollectEntityAbility(o, E),
          this.CollectEntitySkillMontage(o, y, E));
      }
    } else if (e.GetEntityType() === Protocol_1.Aki.Protocol.wks.Proto_Vision) {
      (c = (0, puerts_1.$ref)(void 0)),
        (d =
          (UE.DataTableFunctionLibrary.GetDataTableRowNames(
            t.GetVisionCommonSkillInfo(),
            c,
          ),
          t.GetVisionCommonSkillRowNames()));
      for (const L of d) {
        var B = this.dpr(o, L);
        B &&
          (this.CollectEntityAbility(o, B),
          this.CollectEntitySkillMontage(o, L, B));
      }
    }
  }
  static fpr(e, o) {
    if (o)
      if (o.GameplayCueIds)
        for (const a of o.GameplayCueIds) {
          var t = GameplayCueById_1.configGameplayCueById.GetConfig(a);
          if (t) {
            t.Path.length && e.AddEffectAsset(t.Path);
            for (const r of t.Resources) r.length && e.AddEffectAsset(r);
          }
        }
  }
  static CollectAssetByBuffIdList(e, o) {
    if (o?.length) {
      o = ConfigManager_1.ConfigManager.BuffItemConfig.GetBuffConfigs(
        e instanceof PreloadModel_1.EntityAssetElement ? e.EntityHandle.Id : -1,
        o,
      );
      if (o) for (const t of o) this.fpr(e, t);
    }
  }
  static dpr(o, t) {
    let a = DataTableUtil_1.DataTableUtil.GetDataTableRow(
      o.SkillDataTable,
      t.toString(),
    );
    if (!a) {
      var r = ConfigManager_1.ConfigManager.WorldConfig;
      let e = void 0;
      o.CreatureDataComponent.GetEntityType() ===
      Protocol_1.Aki.Protocol.wks.Proto_Player
        ? (e = r.GetRoleCommonSkillInfo())
        : o.CreatureDataComponent.GetEntityType() ===
            Protocol_1.Aki.Protocol.wks.Proto_Monster
          ? (e = r.GetMonsterCommonSkillInfo())
          : o.CreatureDataComponent.GetEntityType() ===
              Protocol_1.Aki.Protocol.wks.Proto_Vision &&
            (e = r.GetVisionCommonSkillInfo()),
        e &&
          (a = DataTableUtil_1.DataTableUtil.GetDataTableRow(e, t.toString()));
    }
    return a;
  }
  static CollectEntityAbility(e, o) {
    o &&
      1 === o.SkillMode &&
      (o = o.SkillGA.AssetPathName.toString()) &&
      0 < o.length &&
      "None" !== o &&
      e.AddOtherAsset(o);
  }
  static CollectEntitySkillMontage(t, a, e) {
    var o = e.Animations,
      r = e.ExportSpecialAnim;
    if (o?.Num() || r?.Num()) {
      if (o?.Num())
        for (let e = 0; e < o.Num(); ++e) {
          var i = o.Get(e).AssetPathName.toString();
          i && 0 !== i.length && "None" !== i && t.AddAnimationAsset(i);
        }
      if (r?.Num())
        for (let e = 0; e < r.Num(); ++e) {
          var n = r.Get(e).AssetPathName.toString();
          n && 0 !== n.length && "None" !== n && t.AddAnimationAsset(n);
        }
    } else if (e.MontagePaths?.Num()) {
      let o = !1;
      var l = e.MontagePaths;
      for (let e = 0; e < l.Num(); ++e) {
        var _ = l.Get(e);
        (_ && 0 !== _.length) ||
          ((o = !0),
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "World",
              3,
              "[PreloadManager.CollectEntitySkillMontage] 实体的MontagePath配置了空蒙太奇名称。",
              ["索引:", e],
              ["SkillId:", a],
              ["CreatureDataId:", t.CreatureDataComponent.GetCreatureDataId()],
              ["PbDataId:", t.CreatureDataComponent.GetPbDataId()],
            ));
      }
      if (!o) {
        var s = t.CharacterPath;
        for (let e = 0; e < l.Num(); ++e) {
          var f = l.Get(e),
            f = ConfigManager_1.ConfigManager.WorldConfig.GetSkillMontage(
              s,
              f,
            )?.ToAssetPathName();
          f && 0 !== f.length && "None" !== f && t.AddAnimationAsset(f);
        }
      }
    }
  }
  static ppr(o) {
    var e = new LogProfiler_1.LogProfiler("CollectAssetByCommonBullet耗时"),
      t =
        (e.Start(),
        ConfigManager_1.ConfigManager.WorldConfig.GetCommonBulletData()),
      a = DataTableUtil_1.DataTableUtil.GetAllDataTableRowFromTable(t);
    if (a) {
      var r = ModelManager_1.ModelManager.PreloadModel,
        i = a.length;
      for (let e = 0; e < i; ++e) {
        var n = a[e],
          l = n.基础设置,
          _ = n.逻辑设置,
          s = n.表现效果设置,
          n = n.执行逻辑,
          l = l.命中判定类型预设,
          l =
            (UE.KismetSystemLibrary.IsValidSoftObjectReference(l) &&
              r.CommonAssetElement.AddOtherAsset(l.ToAssetPathName()),
            _.预设),
          _ =
            (UE.KismetSystemLibrary.IsValidSoftObjectReference(l) &&
              r.CommonAssetElement.AddOtherAsset(l.ToAssetPathName()),
            s.子弹特效DA),
          f =
            (UE.KismetSystemLibrary.IsValidSoftObjectReference(_) &&
              r.CommonAssetElement.AddEffectAsset(_.ToAssetPathName()),
            s.命中特效DA?.Num()),
          c = s.命中特效DA;
        if (f)
          for (let e = 0; e < f; ++e) {
            var d = c.GetKey(e),
              d = c.Get(d),
              C = d?.ToAssetPathName();
            C &&
              0 < C?.length &&
              "None" !== C &&
              r.CommonAssetElement.AddEffectAsset(C) &&
              r.PreCreateEffect.AddPreCreateEffect(o, d.ToAssetPathName());
          }
        var l = s.命中时攻击者震屏,
          _ =
            (UE.KismetSystemLibrary.IsValidSoftClassReference(l) &&
              r.CommonAssetElement.AddOtherAsset(l.ToAssetPathName()),
            s.命中时受击者震屏),
          l =
            (UE.KismetSystemLibrary.IsValidSoftClassReference(_) &&
              r.CommonAssetElement.AddOtherAsset(_.ToAssetPathName()),
            n.GB组),
          u =
            (UE.KismetSystemLibrary.IsValidSoftObjectReference(l) &&
              r.CommonAssetElement.AddOtherAsset(l.ToAssetPathName()),
            n.命中后对攻击者应用GE的Id);
        if (u?.Num())
          for (let e = 0; e < u.Num(); ++e)
            this.CollectAssetByCommonBulletBuff(o, u.Get(e));
        var m = n.命中后对受击者应用GE的Id;
        if (m?.Num())
          for (let e = 0; e < m.Num(); ++e)
            this.CollectAssetByCommonBulletBuff(o, m.Get(e));
        var g = n.能量恢复类GE数组的Id;
        if (g?.Num())
          for (let e = 0; e < g.Num(); ++e)
            this.CollectAssetByCommonBulletBuff(o, g.Get(e));
        var A = n.命中后对在场上角色应用的GE的Id;
        if (A?.Num())
          for (let e = 0; e < A.Num(); ++e)
            this.CollectAssetByCommonBulletBuff(o, A.Get(e));
        var v = n.受击对象进入应用的GE的Id;
        if (v?.Num())
          for (let e = 0; e < v.Num(); ++e)
            this.CollectAssetByCommonBulletBuff(o, v.Get(e));
      }
      e.Stop();
    }
  }
  static CollectAssetByCommonBulletBuff(e, o) {
    if (o) {
      e = ConfigManager_1.ConfigManager.BuffItemConfig.GetBuffConfig(e, o);
      if (e) {
        var t = ModelManager_1.ModelManager.PreloadModel;
        if (e.GameplayCueIds)
          for (const r of e.GameplayCueIds) {
            var a = GameplayCueById_1.configGameplayCueById.GetConfig(r);
            a &&
              a.Path &&
              0 !== a.Path.length &&
              t.CommonAssetElement.AddEffectAsset(a.Path);
          }
      }
    }
  }
  static CollectAssetByBullet(e) {
    var o,
      t,
      a,
      r = e.CreatureDataComponent;
    return (
      (r.GetEntityType() !== Protocol_1.Aki.Protocol.wks.Proto_Player &&
        r.GetEntityType() !== Protocol_1.Aki.Protocol.wks.Proto_Monster &&
        r.GetEntityType() !== Protocol_1.Aki.Protocol.wks.Proto_Vision) ||
        ((r = e.BlueprintClassPath),
        (o = (t =
          ConfigManager_1.ConfigManager.WorldConfig.GetCharacterFightInfo(
            r,
          ))?.BulletDataTable.ToAssetPathName()) &&
          0 !== o.length &&
          "None" !== o &&
          ((a = void 0),
          (a = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
            o,
            UE.DataTable,
          ))?.IsValid()
            ? (this.CollectAssetByBulletDt(a, e),
              t &&
                0 !== (a = this.GetCurCharacterLoadType()) &&
                (t = t?.BulletDataTableMap.Get(a)?.ToAssetPathName()) &&
                0 < t.length &&
                "None" !== t &&
                (a = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
                  t,
                  UE.DataTable,
                )) &&
                this.CollectAssetByBulletDt(a, e))
            : Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Character",
                3,
                "[CollectAssetByBullet.PreloadController] 加载角色子弹表失败。",
                ["Path", r],
                ["子弹表Path", o],
              ))),
      !0
    );
  }
  static CollectAssetByBulletDt(o, t) {
    if (o.IsValid()) {
      var a = DataTableUtil_1.DataTableUtil.GetAllDataTableRowFromTable(o);
      if (a) {
        var r = a.length;
        for (let e = 0; e < r; ++e) {
          var i = a[e];
          this.vpr(t, i) ||
            (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Preload",
                37,
                "[CollectEntityAssetByBulletDataMain]Collect Entity Bullet Failed",
                ["EntityId", t?.Entity?.Id],
                ["BulletDataMain", o.GetName()],
                ["RowStructName", o.RowStructName],
                ["BulletCount", r],
                ["ErrorIndex", e],
              ));
        }
      }
    }
  }
  static CollectAssetByStateMachine(e) {
    var o = e.CreatureDataComponent.GetPbEntityInitData();
    let t = 0;
    o = (t =
      o?.ComponentsData &&
      (o = (0, IComponent_1.getComponent)(o.ComponentsData, "AiComponent"))
        ?.AiId &&
      !o.Disabled
        ? o.AiId
        : t)
      ? AiBaseById_1.configAiBaseById.GetConfig(t)
      : void 0;
    if (o?.StateMachine) {
      var a =
        AiStateMachineConfigById_1.configAiStateMachineConfigById.GetConfig(
          o.StateMachine,
        );
      if (a?.StateMachineJson) {
        var a = JSON.parse(a.StateMachineJson),
          r = e.Entity.GetComponent(67);
        r.StateMachineName = o.StateMachine;
        for (const i of (r.StateMachineJsonObject = a).Nodes)
          this.CollectAssetByStateMachineNode(e, i);
      }
    }
    return !0;
  }
  static CollectAssetByStateMachineNode(e, o) {
    if (o.BindStates && 0 < o.BindStates.length)
      for (const a of o.BindStates)
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
    var t = [];
    o.OnEnterActions &&
      0 < o.OnEnterActions?.length &&
      t.push(...o.OnEnterActions),
      o.OnExitActions &&
        0 < o.OnExitActions?.length &&
        t.push(...o.OnExitActions);
    for (const i of t)
      switch (i.Type) {
        case 1:
          this.CollectAssetByBuffIdList(e, [BigInt(i.ActionAddBuff.BuffId)]);
          break;
        case 101:
          for (const n of i.ActionCue.CueIds)
            this.CollectAssetByCueId(e, BigInt(n));
      }
  }
  static CollectAssetByCueId(e, o) {
    o = GameplayCueById_1.configGameplayCueById.GetConfig(o);
    o && o.Path && 0 !== o.Path.length && e.AddEffectAsset(o.Path);
  }
  static vpr(o, e) {
    var t = e.基础设置,
      a = e.逻辑设置,
      r = e.表现效果设置,
      i = e.执行逻辑;
    if (!t)
      return (
        (n = o),
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Preload",
            37,
            "[CollectEntityAssetByBulletDataMain]BaseSetting Is Undefiend",
            ["EntityId", n?.Entity?.Id],
            ["BulletDataMain", e.子弹名称],
          ),
        !1
      );
    var n = t.命中判定类型预设,
      e =
        (UE.KismetSystemLibrary.IsValidSoftObjectReference(n) &&
          o.AddOtherAsset(n.ToAssetPathName()),
        a.预设),
      t =
        (UE.KismetSystemLibrary.IsValidSoftObjectReference(e) &&
          o.AddOtherAsset(e.ToAssetPathName()),
        r.子弹特效DA),
      l =
        (UE.KismetSystemLibrary.IsValidSoftObjectReference(t) &&
          o.AddEffectAsset(t.ToAssetPathName()),
        r.命中特效DA),
      _ = l?.Num();
    if (_)
      for (let e = 0; e < _; ++e) {
        var s = l.GetKey(e),
          s = l.Get(s),
          f = s?.ToAssetPathName();
        f &&
          0 < f?.length &&
          "None" !== f &&
          o.AddEffectAsset(f) &&
          o instanceof PreloadModel_1.EntityAssetElement &&
          (o.CreatureDataComponent.GetEntityType() ===
          Protocol_1.Aki.Protocol.wks.Proto_Player
            ? ModelManager_1.ModelManager.PreloadModel.PreCreateEffect.AddPreCreateHitEffect(
                o.EntityHandle.Id,
                s.ToAssetPathName(),
              )
            : ModelManager_1.ModelManager.PreloadModel.PreCreateEffect.AddPreCreateEffect(
                o.EntityHandle.Id,
                s.ToAssetPathName(),
              ));
      }
    var n = r.命中时攻击者震屏,
      a =
        (UE.KismetSystemLibrary.IsValidSoftClassReference(n) &&
          o.AddOtherAsset(n.ToAssetPathName()),
        r.命中时受击者震屏),
      e =
        (UE.KismetSystemLibrary.IsValidSoftClassReference(a) &&
          o.AddOtherAsset(a.ToAssetPathName()),
        i.GB组),
      c =
        (UE.KismetSystemLibrary.IsValidSoftObjectReference(e) &&
          o.AddOtherAsset(e.ToAssetPathName()),
        new Array()),
      d = i.命中后对攻击者应用GE的Id;
    if (d?.Num())
      for (let e = 0; e < d.Num(); ++e) {
        var C = d.Get(e);
        C && c.push(C);
      }
    var u = i.命中后对受击者应用GE的Id;
    if (u?.Num())
      for (let e = 0; e < u.Num(); ++e) {
        var m = u.Get(e);
        m && c.push(m);
      }
    var g = i.能量恢复类GE数组的Id;
    if (g?.Num())
      for (let e = 0; e < g.Num(); ++e) {
        var A = g.Get(e);
        A && c.push(A);
      }
    var v = i.命中后对在场上角色应用的GE的Id;
    if (v?.Num())
      for (let e = 0; e < v.Num(); ++e) {
        var h = v.Get(e);
        h && c.push(h);
      }
    var D = i.受击对象进入应用的GE的Id;
    if (D?.Num())
      for (let e = 0; e < D.Num(); ++e) {
        var P = D.Get(e);
        P && c.push(P);
      }
    return this.CollectAssetByBuffIdList(o, c), !0;
  }
  static lpr(o, e, t) {
    (0, puerts_1.$unref)(animNotifyEventsRef).Empty(),
      UE.KuroStaticLibrary.GetAnimSequenceNotifies(e, animNotifyEventsRef);
    var a = (0, puerts_1.$unref)(animNotifyEventsRef),
      r = a?.Num();
    if (r)
      for (let e = 0; e < r; ++e) {
        var i = a.Get(e);
        this.Mpr(o, i, t);
      }
  }
  static hpr(o, e, t) {
    (0, puerts_1.$unref)(animNotifyEventsRef).Empty(),
      UE.KuroStaticLibrary.GetAnimMontageNotifies(e, animNotifyEventsRef),
      UE.KuroStaticLibrary.SetMontageANIndex(e);
    var a = (0, puerts_1.$unref)(animNotifyEventsRef);
    if (a?.Num())
      for (let e = 0; e < a.Num(); ++e) {
        var r = a.Get(e);
        this.Mpr(o, r, t);
      }
    (0, puerts_1.$unref)(animSequenceBasesRef).Empty(),
      UE.KuroStaticLibrary.GetAnimSequencesByAnimMontage(
        e,
        animSequenceBasesRef,
      );
    var i = (0, puerts_1.$unref)(animSequenceBasesRef);
    if (i?.Num())
      for (let e = 0; e < i.Num(); ++e) {
        var n = i.Get(e);
        this.lpr(o, n, t);
      }
  }
  static Mpr(e, o, t) {
    if (o.NotifyStateClass?.IsValid()) {
      if (o.NotifyStateClass.IsA(UE.AnimNotifyStateEffect_C.StaticClass()))
        return (a = o.NotifyStateClass.EffectDataAssetRef?.ToAssetPathName()) &&
          0 !== a.length &&
          "None" !== a
          ? void e.AddEffectAsset(a)
          : void 0;
      if (o.NotifyStateClass.IsA(UE.TsAnimNotifyStateAddBuff_C.StaticClass()))
        return (a = o.NotifyStateClass).BuffId ? void t.push(a.BuffId) : void 0;
    }
    var a;
    if (o.Notify?.IsValid())
      return o.Notify.IsA(UE.AnimNotifyEffect_C.StaticClass())
        ? (a = o.Notify.EffectDataAssetRef?.ToAssetPathName()) &&
          0 !== a.length &&
          "None" !== a
          ? void e.AddEffectAsset(a)
          : void 0
        : void (
            o.Notify.IsA(UE.TsAnimNotifyAddBuff_C.StaticClass()) &&
            (e = o.Notify).BuffId &&
            t.push(e.BuffId)
          );
  }
  static upr(o, t) {
    if (t?.IsValid())
      if (t.IsA(UE.EffectModelGroup_C.StaticClass())) {
        var a = t,
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
                    ["父特效", t.GetName()],
                    ["子特效", n.GetName()],
                  )
                : (this.upr(o, n),
                  n.IsA(UE.EffectModelSkeletalMesh_C.StaticClass()) &&
                    ((i = n.AnimationRef)?.IsValid()
                      ? i.IsA(UE.AnimSequence.StaticClass())
                        ? this.lpr(o, i, animBuffList)
                        : i.IsA(UE.AnimMontage.StaticClass()) &&
                          this.hpr(o, i, animBuffList)
                      : Log_1.Log.CheckError() &&
                        Log_1.Log.Error(
                          "Preload",
                          3,
                          "特效的mesh没有配置动画",
                          ["父特效", t.GetName()],
                          ["子特效", n.GetName()],
                        ))));
          }
      }
  }
  static cpr(o, e) {
    if (e) {
      (0, puerts_1.$unref)(animationAssetSetRef).Empty(),
        UE.KuroStaticLibrary.GetAnimAssetsByAnimBlueprintClass(
          e,
          animationAssetSetRef,
        );
      var t = (0, puerts_1.$unref)(animationAssetSetRef),
        a = UE.KuroStaticLibrary.GetDefaultObject(e);
      if (a && 0 < a.ExtraRibbonAnims?.Num())
        for (let e = 0; e < a.ExtraRibbonAnims?.Num(); e++) {
          var r = a.ExtraRibbonAnims.GetKey(e),
            r = a.ExtraRibbonAnims.Get(r);
          r && t.Add(r);
        }
      if (t?.Num()) {
        for (let e = (animBuffList.length = 0); e < t.Num(); ++e) {
          var i = t.Get(e);
          i.IsA(UE.AnimSequence.StaticClass())
            ? this.lpr(o, i, animBuffList)
            : i.IsA(UE.AnimMontage.StaticClass()) &&
              this.hpr(o, i, animBuffList);
        }
        this.CollectAssetByBuffIdList(o, animBuffList);
      }
    }
  }
  static epr(o, e) {
    if (e) {
      var t = (0, puerts_1.$ref)(void 0),
        t =
          (UE.KuroStaticLibrary.GetCharacterAnimClass(e, t),
          (0, puerts_1.$unref)(t));
      if (e.IsChildOf(UE.TsBaseCharacter_C.StaticClass())) {
        var a = e?.SimpleConstructionScript;
        if (a)
          for (let e = 0; e < a.AllNodes.Num(); e++) {
            var r = a.AllNodes.Get(e);
            r &&
              r.ComponentClass === UE.SkeletalMeshComponent.StaticClass() &&
              (r = r.ComponentTemplate?.GetAnimClass()) &&
              this.cpr(o, r);
          }
      }
      t && this.cpr(o, t);
    }
  }
  static OnLeaveLevel() {
    var e,
      o = ModelManager_1.ModelManager.PreloadModel;
    o.CommonAssetElement.Clear();
    for ([, e] of o.AllEntityAssetMap) 4 !== e.LoadState && e.Clear();
    return o.ClearEntityAsset(), o.ClearPreloadResource(), !0;
  }
  static GetCurCharacterLoadType() {
    return ModelManager_1.ModelManager.RoguelikeModel.CheckInRoguelike()
      ? 1
      : 0;
  }
}
((exports.PreloadController = PreloadController).tpr = void 0),
  (PreloadController.Epr = void 0);
//# sourceMappingURL=PreloadController.js.map
