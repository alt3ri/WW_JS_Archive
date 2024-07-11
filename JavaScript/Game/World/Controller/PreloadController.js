"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PreloadController = void 0);
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const LogProfiler_1 = require("../../../Core/Common/LogProfiler");
const Stats_1 = require("../../../Core/Common/Stats");
const Queue_1 = require("../../../Core/Container/Queue");
const AiBaseById_1 = require("../../../Core/Define/ConfigQuery/AiBaseById");
const AiStateMachineConfigById_1 = require("../../../Core/Define/ConfigQuery/AiStateMachineConfigById");
const GameplayCueById_1 = require("../../../Core/Define/ConfigQuery/GameplayCueById");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const DataTableUtil_1 = require("../../../Core/Utils/DataTableUtil");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const PreCreateEffect_1 = require("../../Effect/PreCreateEffect");
const GlobalData_1 = require("../../GlobalData");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const AutoAttachDefine_1 = require("../../Module/AutoAttach/AutoAttachDefine");
const NpcIconDefine_1 = require("../../Module/NPC/NpcIconDefine");
const RoleDefine_1 = require("../../Module/RoleUi/RoleDefine");
const SplineMoveComponent_1 = require("../../NewWorld/Common/Component/SplineMoveComponent");
const RenderConfig_1 = require("../../Render/Config/RenderConfig");
const PreloadModel_1 = require("../Model/PreloadModel");
const PreloadConstants_1 = require("./PreloadConstants");
const VISION_DATA_PATH = "/Game/Aki/Character/Vision/DT_Vision.DT_Vision";
const commonMajorPaths = [
  "/Game/Aki/Data/Fight/DT_CommonNewBulletDataMain.DT_CommonNewBulletDataMain",
  "/Game/Aki/Data/Fight/DT_CommonHitEffect.DT_CommonHitEffect",
  "/Game/Aki/Character/Vision/DT_Vision.DT_Vision",
  "/Game/Aki/Data/Fight/DT_Common_Role_SkillInfo.DT_Common_Role_SkillInfo",
  "/Game/Aki/Data/Fight/DT_Common_Monster_SkillInfo.DT_Common_Monster_SkillInfo",
  "/Game/Aki/Data/Fight/DT_Common_Vision_SkillInfo.DT_Common_Vision_SkillInfo",
  "/Game/Aki/Data/Fight/DT_CharacterFightInfo.DT_CharacterFightInfo",
  "/Game/Aki/Data/Fight/DT_CaughtInfo.DT_CaughtInfo",
  "/Game/Aki/Data/Fight/DA_DefaultBulletConfig.DA_DefaultBulletConfig",
];
const commonOtherPaths = [
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
];
const commonEffectPaths = [
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
];
const animSequenceBasesRef = (0, puerts_1.$ref)(
  UE.NewArray(UE.AnimSequenceBase),
);
const animNotifyEventsRef = (0, puerts_1.$ref)(UE.NewArray(UE.AnimNotifyEvent));
const animationAssetSetRef = (0, puerts_1.$ref)(UE.NewSet(UE.AnimationAsset));
const animBuffList = new Array();
const COMMON_STATE_MACHINE = "SM_Common";
const NEED_PRELOAD_DISTANCE = 4e6;
class PreloadController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return !0;
  }
  static OnClear() {
    return !0;
  }
  static DoPreload(o, t) {
    const e = ModelManager_1.ModelManager.PreloadModel;
    if (e.IsUsePreload) {
      e.HoldPreloadObject.Clear();
      e.ResourcesLoadTime.length = 0;
      const a = ModelManager_1.ModelManager.GameModeModel;
      a.PreloadCommonProfiler.Restart(),
        this.Q0r((e) => {
          e
            ? (a.PreloadCommonProfiler.Stop(),
              a.PreloadEntitiesProfiler.Restart(),
              o(!0),
              this.X0r(
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
  static Q0r(l) {
    const e = ModelManager_1.ModelManager.PreloadModel;
    const _ = ConfigManager_1.ConfigManager.WorldConfig;
    const o = ModelManager_1.ModelManager.GameModeModel;
    const s = e.CommonAssetElement;
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Preload", 3, "预加载:PreloadLoadCommon(开始)"),
      this.$0r(o.PreloadCommonProfiler, (e) => {
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
          const o =
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
  static $0r(e, t) {
    const o = ModelManager_1.ModelManager.PreloadModel.CommonAssetElement;
    const a = e.CreateChild("收集并加载公共的主要资源", !0);
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Preload", 3, "预加载:PreloadCommonMajor(开始)"),
      a.Restart();
    for (const i of commonMajorPaths) o.AddMajorAsset(i);
    const r = new Array();
    for (const n of o.MajorAssets) r.push(n);
    this.J0r(o, o.MajorAssets, r, a, (e, o) => {
      a.Stop(),
        e
          ? (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Preload", 3, "预加载:PreloadCommonMajor(结束)"),
            t?.(e))
          : t(!1);
    });
  }
  static X0r(e, t) {
    const a = ModelManager_1.ModelManager.PreloadModel;
    if (a.LoadAssetOneByOneState) this.z0r(e, t);
    else {
      const r = ModelManager_1.ModelManager.CreatureModel.GetAllEntities();
      if (r.length === 0) t(!0);
      else {
        const i = Vector_1.Vector.Create(
          ModelManager_1.ModelManager.GameModeModel.BornLocation,
        );
        const n = Vector_1.Vector.Create();
        const l = new Array();
        for (const s of r) {
          let _ = s.Entity.GetComponent(0);
          s.IsInit ||
            _.GetLoading() ||
            _.GetRemoveState() ||
            _.GetEntityType() === Protocol_1.Aki.Protocol.HBs.Proto_Custom ||
            ((_.GetEntityType() === Protocol_1.Aki.Protocol.HBs.Proto_Player ||
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
          o === 0)
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
  static z0r(e, o) {
    const t = ModelManager_1.ModelManager.CreatureModel.GetAllEntities();
    let a = void 0;
    e &&
      (a = e.CreateChild("逐个加载Entity，实体个数:" + t.length, !0)).Start();
    const r = new Array();
    for (const i of t) r.push(i);
    this.Z0r(r, 0, a, (e) => {
      a?.Stop(), o(e);
    });
  }
  static Z0r(o, t, a, r) {
    let e, i;
    t >= o.length
      ? r(!0)
      : ((i = (e = o[t]).Entity.GetComponent(0)),
        !e || i.GetRemoveState()
          ? this.Z0r(o, t + 1, a, (e) => {
              r(e);
            })
          : this.PreloadEntity(e, a, (e) => {
              e
                ? t < o.length
                  ? this.Z0r(o, t + 1, a, (e) => {
                      r(e);
                    })
                  : r(!0)
                : r(!1);
            }));
  }
  static PreloadEntity(i, n, l) {
    if (ModelManager_1.ModelManager.PreloadModel.IsUsePreload) {
      const _ = i.Entity.GetComponent(0);
      let o = void 0;
      let e = void 0;
      let t = void 0;
      let a = void 0;
      let r = void 0;
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
        _.GetEntityType() === Protocol_1.Aki.Protocol.HBs.Proto_Custom)
      )
        o?.Stop(), l?.(!0);
      else {
        e?.Start();
        const s = this.efr(i);
        s
          ? (o?.SetDescribe(
              s.CharacterPath + ", 优先级:" + s.GetLoadPriority(),
            ),
            e?.Stop(),
            s && s.LoadState === 3
              ? (o?.Stop(), l?.(!0))
              : s.LoadState !== 0
                ? (o?.Stop(), l?.(!1))
                : ((s.LoadState = 1),
                  _.GetEntityType() ===
                    Protocol_1.Aki.Protocol.HBs.Proto_Player &&
                    Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info(
                      "Preload",
                      3,
                      "预加载实体:预加载主要资源（开始）",
                      ["CreatureDataId", _.GetCreatureDataId()],
                      ["PbDataId", _.GetPbDataId()],
                    ),
                  a?.Start(),
                  this.tfr(s, a, (e) => {
                    a?.Stop(),
                      _.GetEntityType() ===
                        Protocol_1.Aki.Protocol.HBs.Proto_Player &&
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
                        ? s && s.LoadState !== 4
                          ? (t?.Start(),
                            this.ifr(s)
                              ? (t?.Stop(),
                                _.GetEntityType() ===
                                  Protocol_1.Aki.Protocol.HBs.Proto_Player &&
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
                                        Protocol_1.Aki.Protocol.HBs
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
                                      s && s.LoadState !== 4
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
    const o = ModelManager_1.ModelManager.PreloadModel;
    const t = o.AllEntityAssetMap.get(e);
    if (t && t.LoadState !== 4) {
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
  static tfr(t, e, a) {
    if (t.MajorAssets.size) {
      const o = new Array();
      for (const r of t.MajorAssets) o.push(r);
      this.J0r(t, t.MajorAssets, o, e, (e, o) => {
        e && (o = o.get(t.BlueprintClassPath))?.IsValid()
          ? (this.ofr(t, o), a?.(e))
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
      ModelManager_1.ModelManager.PreloadModel.AllEntityAssetMap.get(e)
        ?.LoadState === 3
    );
  }
  static efr(e) {
    const o = e.Entity.GetComponent(0);
    let t = ModelManager_1.ModelManager.PreloadModel;
    let a = t.AllEntityAssetMap.get(o.GetCreatureDataId());
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
        (e.length > 0 &&
          ((t = (a.BlueprintClassPath = e).lastIndexOf("/")),
          (a.CharacterPath = e.substring(0, t)),
          a.AddMajorAsset(e)),
        o.GetEntityType() === Protocol_1.Aki.Protocol.HBs.Proto_Player ||
          o.GetEntityType() === Protocol_1.Aki.Protocol.HBs.Proto_Monster ||
          o.GetEntityType() === Protocol_1.Aki.Protocol.HBs.Proto_Vision)
      ) {
        t = a.BlueprintClassPath;
        if (!t || t.length === 0 || t === "None") {
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
            (t && t.length > 0 && t !== "None" && a.AddMajorAsset(t),
            e?.BulletDataTable.ToAssetPathName())),
          (t =
            (t && t.length > 0 && t !== "None" && a.AddMajorAsset(t),
            e?.PartHitEffect?.ToAssetPathName())),
          (t =
            (t &&
              t.length > 0 &&
              t !== "None" &&
              ((a.PartHitEffectPath = t), a.AddMajorAsset(t)),
            e?.HitEffectTable.ToAssetPathName())),
          (t =
            (t && t.length > 0 && t !== "None" && a.AddMajorAsset(t),
            this.GetCurCharacterLoadType()));
        t !== 0 &&
          (this.VBn(e?.SkillDataTableMap, t, a),
          this.VBn(e?.BulletDataTableMap, t, a),
          this.VBn(e?.HitEffectTableMap, t, a));
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
  static VBn(e, o, t) {
    e &&
      (e = e.Get(o)?.ToAssetPathName()) &&
      e.length > 0 &&
      e !== "None" &&
      t.AddMajorAsset(e);
  }
  static ifr(e) {
    let o, t, a, r;
    return (
      !e.CollectMinorAsset &&
      ((e.CollectMinorAsset = !void 0),
      (o = this.nfr(e)),
      (t = this.sfr(e)),
      (a = this.CollectAssetByBullet(e)),
      (r = this.CollectAssetByStateMachine(e)),
      this.afr(e),
      this.hfr(e),
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
          o.OtherAssetSet.size > 0 && e.Push([6, o.OtherAssetSet]),
          o.AnimationAssetSet.size > 0 && e.Push([0, o.AnimationAssetSet]),
          o.AnimationBlueprintClassAssetSet.size > 0 &&
            e.Push([5, o.AnimationBlueprintClassAssetSet]),
          o.MeshAssetSet.size > 0 && e.Push([3, o.MeshAssetSet]),
          o.AudioAssetSet.size > 0 && e.Push([2, o.AudioAssetSet]),
          o.EffectAssetSet.size > 0 &&
            (PreCreateEffect_1.PreCreateEffect.IsNeedPreCreateEffect()
              ? e.Push([1, o.EffectAssetSet])
              : o.EffectAssetSet.clear()),
          this.lfr(o, r, e, (e) => {
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
  static lfr(l, _, s, f) {
    if (s.Size === 0) f(!0);
    else {
      let e = s.Pop();
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
        e.size === 0)
      )
        n?.Stop(), f(!0);
      else {
        const o = new Array();
        for (const t of e) o.push(t);
        this.J0r(l, e, o, n, (e, o) => {
          if ((n?.Stop(), e || (l.HasError = !0), c === 0)) {
            animBuffList.length = 0;
            for (const [, t] of o)
              t.IsA(UE.AnimMontage.StaticClass())
                ? this._fr(l, t, animBuffList)
                : t.IsA(UE.AnimSequenceBase.StaticClass()) &&
                  this.ufr(l, t, animBuffList);
            this.CollectAssetByBuffIdList(l, animBuffList);
          }
          if (c === 1)
            for (const [a, r] of o)
              r.IsA(UE.EffectModelBase.StaticClass()) &&
                l instanceof PreloadModel_1.EntityAssetElement &&
                ModelManager_1.ModelManager.PreloadModel.PreCreateEffect.AddPreCreateEffect(
                  l.EntityHandle.Id,
                  a,
                ),
                this.mfr(l, r);
          if (c === 5) for (const [, i] of o) this.dfr(l, i);
          s.Size === 0
            ? f(e)
            : this.lfr(l, _, s, (e) => {
                f(e);
              });
        });
      }
    }
  }
  static J0r(i, e, n, o, l) {
    const _ = ModelManager_1.ModelManager.PreloadModel;
    if (_.LoadAssetOneByOneState) this.LoadAssetsOneByOne(i, e, n, o, l);
    else {
      let t = void 0;
      let a = ((t = o ? o.CreateChild("批量预加载资源", !0) : t)?.Start(), 0);
      let r = 0;
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
                r + a < n.length || (t?.Stop(), l?.(r === 0, s));
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
    if (i.length === 0 || n === i.length) s(!0);
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
  static afr(e) {
    let o = e.BlueprintClassPath;
    if (o?.length) {
      o = ConfigManager_1.ConfigManager.WorldConfig.GetMontageMap(o);
      if (o?.size)
        for (let [, t] of o) {
          t = t?.ToAssetPathName();
          t && t.length !== 0 && t !== "None" && e.AddAnimationAsset(t);
        }
    }
  }
  static hfr(o) {
    if (o.PartHitEffectPath?.length) {
      let e = void 0;
      const t =
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
        e?.PartCollision);
      const a = t?.Num();
      if (a)
        for (let e = 0; e < a; ++e) {
          var r = t.Get(e);
          const i = r.Audio?.ToAssetPathName();
          var r = r.Effect?.ToAssetPathName();
          i?.length &&
            i !== "None" &&
            o.AddEffectAsset(i) &&
            o instanceof PreloadModel_1.EntityAssetElement &&
            ModelManager_1.ModelManager.PreloadModel.PreCreateEffect.AddPreCreateEffect(
              o.EntityHandle.Id,
              i,
            ),
            r?.length &&
              r !== "None" &&
              o.AddEffectAsset(r) &&
              o instanceof PreloadModel_1.EntityAssetElement &&
              ModelManager_1.ModelManager.PreloadModel.PreCreateEffect.AddPreCreateEffect(
                o.EntityHandle.Id,
                r,
              );
        }
    }
  }
  static nfr(o) {
    const e = o.CreatureDataComponent.GetModelConfig();
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
    var t = e.动画蓝图.ToAssetPathName();
    var t =
      (t &&
        t.length > 0 &&
        t !== "None" &&
        o.AddAnimationBlueprintClassAsset(t),
      e.网格体);
    UE.KismetSystemLibrary.IsValidSoftObjectReference(t) &&
      o.AddOtherAsset(t.ToAssetPathName());
    var t = e.场景交互物.AssetPathName?.toString();
    const a =
      (t && t.length > 0 && t !== "None" && o.AddOtherAsset(t), e.常驻特效列表);
    const r = a?.Num();
    if (r)
      for (let e = 0; e < r; ++e) {
        var i = a.GetKey(e);
        var i = a.Get(i).AssetPathName;
        o.AddEffectAsset(i.toString());
      }
    t = e.DA.AssetPathName.toString();
    return t && t !== "None" && o.AddOtherAsset(t), !0;
  }
  static sfr(e) {
    let o;
    let t;
    let a = e.CreatureDataComponent;
    return (
      (a.GetEntityType() !== Protocol_1.Aki.Protocol.HBs.Proto_Player &&
        a.GetEntityType() !== Protocol_1.Aki.Protocol.HBs.Proto_Monster &&
        a.GetEntityType() !== Protocol_1.Aki.Protocol.HBs.Proto_Vision) ||
        ((a = e.BlueprintClassPath),
        (o =
          ConfigManager_1.ConfigManager.WorldConfig.GetCharacterFightInfo(
            a,
          )?.SkillDataTable.ToAssetPathName()) &&
          o.length > 0 &&
          o !== "None" &&
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
        this.Cfr(e)),
      !0
    );
  }
  static Cfr(o) {
    const e = o.CreatureDataComponent;
    if (o.SkillDataTable) {
      var t = (0, puerts_1.$ref)(void 0);
      const a =
        (UE.DataTableFunctionLibrary.GetDataTableRowNames(o.SkillDataTable, t),
        new Array());
      const r = (0, puerts_1.$unref)(t);
      if (r?.Num())
        for (let e = 0; e < r.Num(); e++) {
          const i = r.Get(e).toString();
          const n = this.gfr(o, i);
          if (n) {
            this.CollectEntityAbility(o, n),
              this.CollectEntitySkillMontage(o, i, n);
            const l = n.SkillStartBuff;
            if (l?.Num())
              for (let e = 0; e < l.Num(); ++e) {
                const _ = l.Get(e);
                _ && a.push(_);
              }
            const s = n.SkillEndBuff;
            if (s?.Num())
              for (let e = 0; e < s.Num(); ++e) {
                const f = s.Get(e);
                f && a.push(f);
              }
          }
        }
      this.CollectAssetByBuffIdList(o, a);
    }
    var t = ConfigManager_1.ConfigManager.WorldConfig;
    let c = t.GetCharacterFightInfo(o.BlueprintClassPath);
    var d = this.GetCurCharacterLoadType();
    if (d !== 0) {
      c = c?.SkillDataTableMap.Get(d)?.ToAssetPathName();
      if (c && c.length > 0 && c !== "None") {
        const C = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
          c,
          UE.DataTable,
        );
        var d = (0, puerts_1.$ref)(void 0);
        const m =
          (UE.DataTableFunctionLibrary.GetDataTableRowNames(C, d), new Array());
        const u = (0, puerts_1.$unref)(d);
        if (u?.Num())
          for (let e = 0; e < u.Num(); e++) {
            const g = u.Get(e).toString();
            const A = DataTableUtil_1.DataTableUtil.GetDataTableRow(C, g);
            if (A) {
              this.CollectEntityAbility(o, A),
                this.CollectEntitySkillMontage(o, g, A);
              const v = A.SkillStartBuff;
              if (v?.Num())
                for (let e = 0; e < v.Num(); ++e) {
                  const h = v.Get(e);
                  h && m.push(h);
                }
              const D = A.SkillEndBuff;
              if (D?.Num())
                for (let e = 0; e < D.Num(); ++e) {
                  const P = D.Get(e);
                  P && m.push(P);
                }
            }
          }
        this.CollectAssetByBuffIdList(o, m);
      }
    }
    if (e.GetEntityType() === Protocol_1.Aki.Protocol.HBs.Proto_Player) {
      (c = (0, puerts_1.$ref)(void 0)),
        (d =
          (UE.DataTableFunctionLibrary.GetDataTableRowNames(
            t.GetRoleCommonSkillInfo(),
            c,
          ),
          t.GetRoleCommonSkillRowNames()));
      for (const B of d) {
        const M = this.gfr(o, B);
        M &&
          (this.CollectEntityAbility(o, M),
          this.CollectEntitySkillMontage(o, B, M));
      }
    } else if (
      e.GetEntityType() === Protocol_1.Aki.Protocol.HBs.Proto_Monster
    ) {
      (c = (0, puerts_1.$ref)(void 0)),
        (d =
          (UE.DataTableFunctionLibrary.GetDataTableRowNames(
            t.GetMonsterCommonSkillInfo(),
            c,
          ),
          t.GetMonsterCommonSkillRowNames()));
      for (const y of d) {
        const E = this.gfr(o, y);
        E &&
          (this.CollectEntityAbility(o, E),
          this.CollectEntitySkillMontage(o, y, E));
      }
    } else if (e.GetEntityType() === Protocol_1.Aki.Protocol.HBs.Proto_Vision) {
      (c = (0, puerts_1.$ref)(void 0)),
        (d =
          (UE.DataTableFunctionLibrary.GetDataTableRowNames(
            t.GetVisionCommonSkillInfo(),
            c,
          ),
          t.GetVisionCommonSkillRowNames()));
      for (const L of d) {
        const p = this.gfr(o, L);
        p &&
          (this.CollectEntityAbility(o, p),
          this.CollectEntitySkillMontage(o, L, p));
      }
    }
  }
  static vfr(e, o) {
    if (o)
      if (o.GameplayCueIds)
        for (const a of o.GameplayCueIds) {
          const t = GameplayCueById_1.configGameplayCueById.GetConfig(a);
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
      if (o) for (const t of o) this.vfr(e, t);
    }
  }
  static gfr(o, t) {
    let a = DataTableUtil_1.DataTableUtil.GetDataTableRow(
      o.SkillDataTable,
      t.toString(),
    );
    if (!a) {
      const r = ConfigManager_1.ConfigManager.WorldConfig;
      let e = void 0;
      o.CreatureDataComponent.GetEntityType() ===
      Protocol_1.Aki.Protocol.HBs.Proto_Player
        ? (e = r.GetRoleCommonSkillInfo())
        : o.CreatureDataComponent.GetEntityType() ===
            Protocol_1.Aki.Protocol.HBs.Proto_Monster
          ? (e = r.GetMonsterCommonSkillInfo())
          : o.CreatureDataComponent.GetEntityType() ===
              Protocol_1.Aki.Protocol.HBs.Proto_Vision &&
            (e = r.GetVisionCommonSkillInfo()),
        e &&
          (a = DataTableUtil_1.DataTableUtil.GetDataTableRow(e, t.toString()));
    }
    return a;
  }
  static CollectEntityAbility(e, o) {
    o &&
      o.SkillMode === 1 &&
      (o = o.SkillGA.AssetPathName.toString()) &&
      o.length > 0 &&
      o !== "None" &&
      e.AddOtherAsset(o);
  }
  static CollectEntitySkillMontage(t, a, e) {
    const o = e.Animations;
    const r = e.ExportSpecialAnim;
    if (o?.Num() || r?.Num()) {
      if (o?.Num())
        for (let e = 0; e < o.Num(); ++e) {
          const i = o.Get(e).AssetPathName.toString();
          i && i.length !== 0 && i !== "None" && t.AddAnimationAsset(i);
        }
      if (r?.Num())
        for (let e = 0; e < r.Num(); ++e) {
          const n = r.Get(e).AssetPathName.toString();
          n && n.length !== 0 && n !== "None" && t.AddAnimationAsset(n);
        }
    } else if (e.MontagePaths?.Num()) {
      let o = !1;
      const l = e.MontagePaths;
      for (let e = 0; e < l.Num(); ++e) {
        const _ = l.Get(e);
        (_ && _.length !== 0) ||
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
        const s = t.CharacterPath;
        for (let e = 0; e < l.Num(); ++e) {
          var f = l.Get(e);
          var f = ConfigManager_1.ConfigManager.WorldConfig.GetSkillMontage(
            s,
            f,
          )?.ToAssetPathName();
          f && f.length !== 0 && f !== "None" && t.AddAnimationAsset(f);
        }
      }
    }
  }
  static Mfr(o) {
    const e = new LogProfiler_1.LogProfiler("CollectAssetByCommonBullet耗时");
    const t =
      (e.Start(),
      ConfigManager_1.ConfigManager.WorldConfig.GetCommonBulletData());
    const a = DataTableUtil_1.DataTableUtil.GetAllDataTableRowFromTable(t);
    if (a) {
      const r = ModelManager_1.ModelManager.PreloadModel;
      const i = a.length;
      for (let e = 0; e < i; ++e) {
        var n = a[e];
        var l = n.基础设置;
        var _ = n.逻辑设置;
        const s = n.表现效果设置;
        var n = n.执行逻辑;
        var l = l.命中判定类型预设;
        var l =
          (UE.KismetSystemLibrary.IsValidSoftObjectReference(l) &&
            r.CommonAssetElement.AddOtherAsset(l.ToAssetPathName()),
          _.预设);
        var _ =
          (UE.KismetSystemLibrary.IsValidSoftObjectReference(l) &&
            r.CommonAssetElement.AddOtherAsset(l.ToAssetPathName()),
          s.子弹特效DA);
        const f =
          (UE.KismetSystemLibrary.IsValidSoftObjectReference(_) &&
            r.CommonAssetElement.AddEffectAsset(_.ToAssetPathName()),
          s.命中特效DA?.Num());
        const c = s.命中特效DA;
        if (f)
          for (let e = 0; e < f; ++e) {
            var d = c.GetKey(e);
            var d = c.Get(d);
            const C = d?.ToAssetPathName();
            C &&
              C?.length > 0 &&
              C !== "None" &&
              r.CommonAssetElement.AddEffectAsset(C) &&
              r.PreCreateEffect.AddPreCreateEffect(o, d.ToAssetPathName());
          }
        var l = s.命中时攻击者震屏;
        var _ =
          (UE.KismetSystemLibrary.IsValidSoftClassReference(l) &&
            r.CommonAssetElement.AddOtherAsset(l.ToAssetPathName()),
          s.命中时受击者震屏);
        var l =
          (UE.KismetSystemLibrary.IsValidSoftClassReference(_) &&
            r.CommonAssetElement.AddOtherAsset(_.ToAssetPathName()),
          n.GB组);
        const m =
          (UE.KismetSystemLibrary.IsValidSoftObjectReference(l) &&
            r.CommonAssetElement.AddOtherAsset(l.ToAssetPathName()),
          n.命中后对攻击者应用GE的Id);
        if (m?.Num())
          for (let e = 0; e < m.Num(); ++e)
            this.CollectAssetByCommonBulletBuff(o, m.Get(e));
        const u = n.命中后对受击者应用GE的Id;
        if (u?.Num())
          for (let e = 0; e < u.Num(); ++e)
            this.CollectAssetByCommonBulletBuff(o, u.Get(e));
        const g = n.能量恢复类GE数组的Id;
        if (g?.Num())
          for (let e = 0; e < g.Num(); ++e)
            this.CollectAssetByCommonBulletBuff(o, g.Get(e));
        const A = n.命中后对在场上角色应用的GE的Id;
        if (A?.Num())
          for (let e = 0; e < A.Num(); ++e)
            this.CollectAssetByCommonBulletBuff(o, A.Get(e));
        const v = n.受击对象进入应用的GE的Id;
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
        const t = ModelManager_1.ModelManager.PreloadModel;
        if (e.GameplayCueIds)
          for (const r of e.GameplayCueIds) {
            const a = GameplayCueById_1.configGameplayCueById.GetConfig(r);
            a &&
              a.Path &&
              a.Path.length !== 0 &&
              t.CommonAssetElement.AddEffectAsset(a.Path);
          }
      }
    }
  }
  static CollectAssetByBullet(e) {
    let o;
    let t;
    let a;
    let r = e.CreatureDataComponent;
    return (
      (r.GetEntityType() !== Protocol_1.Aki.Protocol.HBs.Proto_Player &&
        r.GetEntityType() !== Protocol_1.Aki.Protocol.HBs.Proto_Monster &&
        r.GetEntityType() !== Protocol_1.Aki.Protocol.HBs.Proto_Vision) ||
        ((r = e.BlueprintClassPath),
        (o = (t =
          ConfigManager_1.ConfigManager.WorldConfig.GetCharacterFightInfo(
            r,
          ))?.BulletDataTable.ToAssetPathName()) &&
          o.length !== 0 &&
          o !== "None" &&
          ((a = void 0),
          (a = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
            o,
            UE.DataTable,
          ))?.IsValid()
            ? (this.CollectAssetByBulletDt(a, e),
              t &&
                (a = this.GetCurCharacterLoadType()) !== 0 &&
                (t = t?.BulletDataTableMap.Get(a)?.ToAssetPathName()) &&
                t.length > 0 &&
                t !== "None" &&
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
  static CollectAssetByBulletDt(e, o) {
    if (e.IsValid()) {
      const t = DataTableUtil_1.DataTableUtil.GetAllDataTableRowFromTable(e);
      if (t) {
        const a = t.length;
        for (let e = 0; e < a; ++e) {
          const r = t[e];
          this.Sfr(o, r);
        }
      }
    }
  }
  static CollectAssetByStateMachine(e) {
    let o = e.CreatureDataComponent.GetPbEntityInitData();
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
        var a = JSON.parse(a.StateMachineJson);
        const r = e.Entity.GetComponent(65);
        r.StateMachineName = o.StateMachine;
        for (const i of (r.StateMachineJsonObject = a).Nodes)
          this.CollectAssetByStateMachineNode(e, i);
      }
    }
    return !0;
  }
  static CollectAssetByStateMachineNode(e, o) {
    if (o.BindStates && o.BindStates.length > 0)
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
    const t = [];
    o.OnEnterActions &&
      o.OnEnterActions?.length > 0 &&
      t.push(...o.OnEnterActions),
      o.OnExitActions &&
        o.OnExitActions?.length > 0 &&
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
    o && o.Path && o.Path.length !== 0 && e.AddEffectAsset(o.Path);
  }
  static Sfr(o, e) {
    var t = e.基础设置;
    var a = e.逻辑设置;
    const r = e.表现效果设置;
    var e = e.执行逻辑;
    var t = t.命中判定类型预设;
    var t =
      (UE.KismetSystemLibrary.IsValidSoftObjectReference(t) &&
        o.AddOtherAsset(t.ToAssetPathName()),
      a.预设);
    var a =
      (UE.KismetSystemLibrary.IsValidSoftObjectReference(t) &&
        o.AddOtherAsset(t.ToAssetPathName()),
      r.子弹特效DA);
    const i =
      (UE.KismetSystemLibrary.IsValidSoftObjectReference(a) &&
        o.AddEffectAsset(a.ToAssetPathName()),
      r.命中特效DA);
    const n = i?.Num();
    if (n)
      for (let e = 0; e < n; ++e) {
        var l = i.GetKey(e);
        var l = i.Get(l);
        const _ = l?.ToAssetPathName();
        _ &&
          _?.length > 0 &&
          _ !== "None" &&
          o.AddEffectAsset(_) &&
          o instanceof PreloadModel_1.EntityAssetElement &&
          (o.CreatureDataComponent.GetEntityType() ===
          Protocol_1.Aki.Protocol.HBs.Proto_Player
            ? ModelManager_1.ModelManager.PreloadModel.PreCreateEffect.AddPreCreateHitEffect(
                o.EntityHandle.Id,
                l.ToAssetPathName(),
              )
            : ModelManager_1.ModelManager.PreloadModel.PreCreateEffect.AddPreCreateEffect(
                o.EntityHandle.Id,
                l.ToAssetPathName(),
              ));
      }
    var t = r.命中时攻击者震屏;
    var a =
      (UE.KismetSystemLibrary.IsValidSoftClassReference(t) &&
        o.AddOtherAsset(t.ToAssetPathName()),
      r.命中时受击者震屏);
    var t =
      (UE.KismetSystemLibrary.IsValidSoftClassReference(a) &&
        o.AddOtherAsset(a.ToAssetPathName()),
      e.GB组);
    const s =
      (UE.KismetSystemLibrary.IsValidSoftObjectReference(t) &&
        o.AddOtherAsset(t.ToAssetPathName()),
      new Array());
    const f = e.命中后对攻击者应用GE的Id;
    if (f?.Num())
      for (let e = 0; e < f.Num(); ++e) {
        const c = f.Get(e);
        c && s.push(c);
      }
    const d = e.命中后对受击者应用GE的Id;
    if (d?.Num())
      for (let e = 0; e < d.Num(); ++e) {
        const C = d.Get(e);
        C && s.push(C);
      }
    const m = e.能量恢复类GE数组的Id;
    if (m?.Num())
      for (let e = 0; e < m.Num(); ++e) {
        const u = m.Get(e);
        u && s.push(u);
      }
    const g = e.命中后对在场上角色应用的GE的Id;
    if (g?.Num())
      for (let e = 0; e < g.Num(); ++e) {
        const A = g.Get(e);
        A && s.push(A);
      }
    const v = e.受击对象进入应用的GE的Id;
    if (v?.Num())
      for (let e = 0; e < v.Num(); ++e) {
        const h = v.Get(e);
        h && s.push(h);
      }
    this.CollectAssetByBuffIdList(o, s);
  }
  static ufr(o, e, t) {
    (0, puerts_1.$unref)(animNotifyEventsRef).Empty(),
      UE.KuroStaticLibrary.GetAnimSequenceNotifies(e, animNotifyEventsRef);
    const a = (0, puerts_1.$unref)(animNotifyEventsRef);
    const r = a?.Num();
    if (r)
      for (let e = 0; e < r; ++e) {
        const i = a.Get(e);
        this.Efr(o, i, t);
      }
  }
  static _fr(o, e, t) {
    (0, puerts_1.$unref)(animNotifyEventsRef).Empty(),
      UE.KuroStaticLibrary.GetAnimMontageNotifies(e, animNotifyEventsRef),
      UE.KuroStaticLibrary.SetMontageANIndex(e);
    const a = (0, puerts_1.$unref)(animNotifyEventsRef);
    if (a?.Num())
      for (let e = 0; e < a.Num(); ++e) {
        const r = a.Get(e);
        this.Efr(o, r, t);
      }
    (0, puerts_1.$unref)(animSequenceBasesRef).Empty(),
      UE.KuroStaticLibrary.GetAnimSequencesByAnimMontage(
        e,
        animSequenceBasesRef,
      );
    const i = (0, puerts_1.$unref)(animSequenceBasesRef);
    if (i?.Num())
      for (let e = 0; e < i.Num(); ++e) {
        const n = i.Get(e);
        this.ufr(o, n, t);
      }
  }
  static Efr(e, o, t) {
    if (o.NotifyStateClass?.IsValid()) {
      if (o.NotifyStateClass.IsA(UE.AnimNotifyStateEffect_C.StaticClass()))
        return (a = o.NotifyStateClass.EffectDataAssetRef?.ToAssetPathName()) &&
          a.length !== 0 &&
          a !== "None"
          ? void e.AddEffectAsset(a)
          : void 0;
      if (o.NotifyStateClass.IsA(UE.TsAnimNotifyStateAddBuff_C.StaticClass()))
        return (a = o.NotifyStateClass).BuffId ? void t.push(a.BuffId) : void 0;
    }
    let a;
    if (o.Notify?.IsValid())
      return o.Notify.IsA(UE.AnimNotifyEffect_C.StaticClass())
        ? (a = o.Notify.EffectDataAssetRef?.ToAssetPathName()) &&
          a.length !== 0 &&
          a !== "None"
          ? void e.AddEffectAsset(a)
          : void 0
        : void (
            o.Notify.IsA(UE.TsAnimNotifyAddBuff_C.StaticClass()) &&
            (e = o.Notify).BuffId &&
            t.push(e.BuffId)
          );
  }
  static mfr(o, t) {
    if (t?.IsValid())
      if (t.IsA(UE.EffectModelGroup_C.StaticClass())) {
        const a = t;
        const r = a.EffectData?.Num();
        if (r)
          for (let e = 0; e < r; ++e) {
            var i;
            const n = a.EffectData.GetKey(e);
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
                : (this.mfr(o, n),
                  n.IsA(UE.EffectModelSkeletalMesh_C.StaticClass()) &&
                    ((i = n.AnimationRef)?.IsValid()
                      ? i.IsA(UE.AnimSequence.StaticClass())
                        ? this.ufr(o, i, animBuffList)
                        : i.IsA(UE.AnimMontage.StaticClass()) &&
                          this._fr(o, i, animBuffList)
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
  static dfr(o, e) {
    if (e) {
      (0, puerts_1.$unref)(animationAssetSetRef).Empty(),
        UE.KuroStaticLibrary.GetAnimAssetsByAnimBlueprintClass(
          e,
          animationAssetSetRef,
        );
      const t = (0, puerts_1.$unref)(animationAssetSetRef);
      if (t?.Num()) {
        for (let e = (animBuffList.length = 0); e < t.Num(); ++e) {
          const a = t.Get(e);
          a.IsA(UE.AnimSequence.StaticClass())
            ? this.ufr(o, a, animBuffList)
            : a.IsA(UE.AnimMontage.StaticClass()) &&
              this._fr(o, a, animBuffList);
        }
        this.CollectAssetByBuffIdList(o, animBuffList);
      }
    }
  }
  static ofr(e, o) {
    let t;
    o &&
      ((t = (0, puerts_1.$ref)(void 0)),
      UE.KuroStaticLibrary.GetCharacterAnimClass(o, t),
      (o = (0, puerts_1.$unref)(t))) &&
      this.dfr(e, o);
  }
  static OnLeaveLevel() {
    let e;
    const o = ModelManager_1.ModelManager.PreloadModel;
    o.CommonAssetElement.Clear();
    for ([, e] of o.AllEntityAssetMap) e.LoadState !== 4 && e.Clear();
    return o.ClearEntityAsset(), o.ClearPreloadResource(), !0;
  }
  static GetCurCharacterLoadType() {
    return ModelManager_1.ModelManager.RoguelikeModel.CheckInRoguelike()
      ? 1
      : 0;
  }
}
((exports.PreloadController = PreloadController).rfr = void 0),
  (PreloadController.yfr = void 0);
// # sourceMappingURL=PreloadController.js.map
