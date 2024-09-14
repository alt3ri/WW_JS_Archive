"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PreloadControllerNew = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../Core/Common/Log"),
  BulletPreloadByActorBlueprintAndBulletId_1 = require("../../../Core/Define/ConfigQuery/BulletPreloadByActorBlueprintAndBulletId"),
  CommonSkillPreloadAll_1 = require("../../../Core/Define/ConfigQuery/CommonSkillPreloadAll"),
  GameplayCueById_1 = require("../../../Core/Define/ConfigQuery/GameplayCueById"),
  ModelConfigPreloadById_1 = require("../../../Core/Define/ConfigQuery/ModelConfigPreloadById"),
  StateMachinePreloadByFsmKey_1 = require("../../../Core/Define/ConfigQuery/StateMachinePreloadByFsmKey"),
  TemplateDataPreloadById_1 = require("../../../Core/Define/ConfigQuery/TemplateDataPreloadById"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  StatSeconds_1 = require("../../../Core/Performance/StatSeconds"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  DataTableUtil_1 = require("../../../Core/Utils/DataTableUtil"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  PublicUtil_1 = require("../../Common/PublicUtil"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  AutoAttachDefine_1 = require("../../Module/AutoAttach/AutoAttachDefine"),
  NpcIconDefine_1 = require("../../Module/NPC/NpcIconDefine"),
  RoleDefine_1 = require("../../Module/RoleUi/RoleDefine"),
  SplineMoveComponent_1 = require("../../NewWorld/Common/Component/SplineMoveComponent"),
  PreloadDefine_1 = require("../../Preload/PreloadDefine"),
  RenderConfig_1 = require("../../Render/Config/RenderConfig"),
  GameModePromise_1 = require("../Define/GameModePromise"),
  PreloadConstants_1 = require("./PreloadConstants"),
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
  NEED_PRELOAD_DISTANCE = 4e6,
  CHARACTER_PREFIX_PATH = "/Game/Aki/Character/",
  animSequenceBasesRef = (0, puerts_1.$ref)(UE.NewArray(UE.AnimSequenceBase)),
  animNotifyEventsRef = (0, puerts_1.$ref)(UE.NewArray(UE.AnimNotifyEvent)),
  animationAssetSetRef = (0, puerts_1.$ref)(UE.NewSet(UE.AnimationAsset)),
  animBuffList = new Array(),
  COMMON_STATE_MACHINE = "SM_Common";
class PreloadControllerNew extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return !!this.Spr();
  }
  static Spr() {
    var o = ModelManager_1.ModelManager.PreloadModelNew;
    if (PublicUtil_1.PublicUtil.UseDbConfig()) {
      var e =
        CommonSkillPreloadAll_1.configCommonSkillPreloadAll.GetConfigList();
      if (!e?.length) return !1;
      for (const n of e) {
        var t = new PreloadDefine_1.AssetElement(void 0);
        this.ypr(n, t), o.AddCommonSkill(n.Id, n.HasMontagePath, t);
      }
    } else {
      var r = UE.KuroStaticLibrary.GetFilesRecursive(
        o.CommonSkillJsonExportPath,
        "*",
        !0,
        !1,
      );
      for (let e = 0; e < r.Num(); ++e) {
        var a = r.Get(e),
          i = (0, puerts_1.$ref)("");
        if (
          (UE.KuroStaticLibrary.LoadFileToString(i, a),
          !(i = (0, puerts_1.$unref)(i))?.length)
        )
          return (
            Log_1.Log.CheckError() &&
              Log_1.Log.Error("Preload", 4, "[预加载] 加载文件失败", [
                "path",
                a,
              ]),
            !1
          );
        i = JSON.parse(i);
        if (!i)
          return (
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Preload",
                4,
                "[预加载] 序列化skillAssetRecord失败",
                ["path", a],
              ),
            !1
          );
        a = new PreloadDefine_1.AssetElement(void 0);
        this.Ipr(i.AssetRecord, a),
          o.AddCommonSkill(i.SkillId, i.HasMontagePath, a);
      }
    }
    return !0;
  }
  static async DoPreload(e) {
    let o = !1;
    var t = ModelManager_1.ModelManager.GameModeModel,
      e = (t.PreloadCommonProfiler.Restart(), await this.Tpr(e)),
      t =
        (t.PreloadCommonProfiler.Stop(),
        e || (o = !0),
        ModelManager_1.ModelManager.GameModeModel.PreloadEntitiesProfiler.Restart(),
        await this.Wfr(
          ModelManager_1.ModelManager.GameModeModel.PreloadEntitiesProfiler,
        ));
    return (
      ModelManager_1.ModelManager.GameModeModel.PreloadEntitiesProfiler.Stop(),
      !(o = t ? o : !0)
    );
  }
  static async Tpr(e) {
    let o = !1;
    var t = await this.Kfr(),
      t =
        (t || (o = !0),
        ModelManager_1.ModelManager.CreatureModel.EnableEntityLog &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Preload", 4, "[预加载] 预加载公共主要资源结果", [
            "Success",
            t,
          ]),
        await this.Lpr());
    return (
      t || (o = !0),
      ModelManager_1.ModelManager.CreatureModel.EnableEntityLog &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Preload", 4, "[预加载] 预加载公共次要资源结果", [
          "Success",
          t,
        ]),
      e(o),
      !0
    );
  }
  static async Kfr() {
    var e = ModelManager_1.ModelManager.PreloadModelNew;
    for (const t of commonMajorPaths) e.CommonAssetElement.AddOther(t);
    for (const r of DataTableUtil_1.dataTablePaths.values())
      e.CommonAssetElement.AddOther(r);
    var o = new GameModePromise_1.GameModePromise();
    return this.LoadAssetAsync(e.CommonAssetElement, 101, !0, o), o.Promise;
  }
  static async Lpr() {
    var e = ModelManager_1.ModelManager.PreloadModelNew;
    for (const t of commonEffectPaths) e.CommonAssetElement.AddEffect(t);
    for (const r of commonOtherPaths) e.CommonAssetElement.AddOther(r);
    this.Dpr(e.CommonAssetElement, COMMON_STATE_MACHINE);
    var o = new GameModePromise_1.GameModePromise();
    return this.LoadAssetAsync(e.CommonAssetElement, 101, !0, o), o.Promise;
  }
  static async Wfr(e) {
    const o = ModelManager_1.ModelManager.PreloadModelNew;
    var t = ModelManager_1.ModelManager.CreatureModel.GetAllEntities();
    if (0 === t.length) return !1;
    var r = Vector_1.Vector.Create(
        ModelManager_1.ModelManager.GameModeModel.BornLocation,
      ),
      a = Vector_1.Vector.Create(),
      i = new Array();
    for (const u of t) {
      var n = u.Entity.GetComponent(0);
      u.IsInit ||
        n.GetLoading() ||
        n.GetRemoveState() ||
        n.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Custom ||
        n.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_PlayerEntity ||
        ((n.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Player ||
          ((n = n.GetLocation()),
          (a.X = n.X),
          (a.Y = n.Y),
          (a.Z = n.Z),
          Vector_1.Vector.DistSquared(r, a) <= NEED_PRELOAD_DISTANCE)) &&
          (i.push(u), o.AddNeedWaitEntity(u.Id)));
    }
    let _ = i.length;
    if (
      (ModelManager_1.ModelManager.CreatureModel.EnableEntityLog &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Preload",
          4,
          "[预加载] 批量预加载实体:开始",
          ["当前实体总数", t.length],
          ["需要预加载的实体个数", _],
        ),
      0 === _)
    )
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Preload", 4, "[预加载] 需要预加载的实体数量为0"),
        !1
      );
    var l,
      s = new Array();
    for (const m of i) {
      const c = m.Entity.GetComponent(0);
      m.IsInit ||
        c.GetLoading() ||
        (ModelManager_1.ModelManager.CreatureModel.EnableEntityLog &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Preload",
            4,
            "[预加载] 预加载单个实体:开始",
            ["CreatureDataId", c.GetCreatureDataId()],
            ["PbDataId", c.GetPbDataId()],
            ["Reason", "PreloadController.PreloadEntities"],
            ["Count", _],
          ),
        (l = this.PreloadEntity(m, e, (e) => {
          _--,
            ModelManager_1.ModelManager.CreatureModel.EnableEntityLog &&
              Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Preload",
                4,
                "[预加载] 预加载实体:结束",
                ["CreatureDataId", c.GetCreatureDataId()],
                ["PbDataId", c.GetPbDataId()],
                ["预加载结果", e],
                ["调用代码位置", "PreloadController.PreloadEntities"],
                ["Count", _],
              ),
            o.RemoveNeedWaitEntity(m.Id);
        })),
        s.push(l));
    }
    let f = !0;
    for (const d of await Promise.all(s)) 2 === d && (f = !1);
    return (
      ModelManager_1.ModelManager.CreatureModel.EnableEntityLog &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Preload", 4, "[预加载] 批量预加载实体:结束", [
          "预加载结果",
          f,
        ]),
      f
    );
  }
  static async PreloadEntity(e, o, t) {
    const r = ModelManager_1.ModelManager.PreloadModelNew;
    var a = new CustomPromise_1.CustomPromise();
    const i = e.Entity.GetComponent(0);
    if (i.GetRemoveState()) return t?.(4), 4;
    if (e.IsInit)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Preload",
            4,
            "[预加载] 实体重复预加载，因为这个实体handle.IsInit为true",
          ),
        t?.(2),
        2
      );
    if (i.GetPreloadFinished())
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Preload",
            4,
            "[预加载] 实体重复预加载，creatureDataComponent.GetPreloadFinished()为true",
          ),
        t?.(2),
        2
      );
    var n = StatSeconds_1.StatSecondsAccumulator.Create(
      `CreatureDataId:${i.GetCreatureDataId()}, PbDataId:` + i.GetPbDataId(),
    );
    if (
      (n.Start(),
      i.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Custom)
    )
      return (
        i.SetPreloadFinished(!0),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.PreloadEntityFinished,
          e,
        ),
        t?.(3),
        n.Stop(),
        3
      );
    let _ = void 0,
      l = void 0,
      s = void 0,
      f = void 0,
      u = void 0,
      m =
        (o &&
          ((_ = o.CreateChild(
            `预加载实体, CreatureDataId:${i.GetCreatureDataId()}, PbDataId:` +
              i.GetPbDataId(),
            !0,
          )),
          (l = _.CreateChild("预加载实体主要资源", !0)),
          (s = _.CreateChild("预加载技能资源", !0)),
          (f = _.CreateChild("预加载子弹资源", !0)),
          (u = _.CreateChild("预加载实体固有资源", !0))),
        _?.Start(),
        r.GetEntityAssetElement(i.GetCreatureDataId()));
    if (m)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Preload", 4, "[预加载] 实体重复预加载"),
        t?.(2),
        n.Stop(),
        2
      );
    if (
      (((m = new PreloadDefine_1.EntityAssetElement(e)).LoadState = 0),
      (m.Promise = a.Promise),
      m.AddCallback(t),
      (m.MainAsset.AddObjectCallback = (e, o) => {
        r.HoldPreloadObject.AddEntityAsset(i.GetCreatureDataId(), e);
      }),
      r.AddEntityAsset(i.GetCreatureDataId(), m),
      i.ModelBlueprintPath)
    ) {
      var o = i.GetPbEntityInitData();
      let e = void 0;
      if (
        (o &&
          ((o = (0, IComponent_1.getComponent)(
            o.ComponentsData,
            "ModelComponent",
          )),
          (e = o?.ModelType)),
        !this.Rpr(m.MainAsset, e))
      )
        return t?.(2), n.Stop(), 2;
    } else if (!this.Upr(m, i.GetModelId())) return t?.(2), n.Stop(), 2;
    l?.Start();
    (o = new GameModePromise_1.GameModePromise()),
      this.LoadAssetAsync(m.MainAsset, m.LoadPriority, !1, o),
      (t = await o.Promise);
    if ((l?.Stop(), !t))
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Preload", 4, "[预加载] 预加载主要资源失败", [
            "CreatureDataId",
            m.CreatureDataComponent.GetCreatureDataId(),
          ]),
        m.DoCallback(2),
        n.Stop(),
        2
      );
    if (!e?.Valid) return m.DoCallback(4), n.Stop(), 4;
    var o = e.Entity.GetComponent(201),
      c = (o && o.InitPreload(m), new Array());
    u?.Start();
    const d = new PreloadDefine_1.AssetElement(m);
    i.GetEntityConfigType() === Protocol_1.Aki.Protocol.rLs.F6n
      ? ((t = ModelManager_1.ModelManager.GameModeModel.MapId),
        (o = i.GetPbDataId()),
        (t = r.PbDataPreloadDataMap.get(t)?.get(o))
          ? this.ypr(t, d)
          : (o = i.GetTemplateId()) &&
            (t =
              TemplateDataPreloadById_1.configTemplateDataPreloadById.GetConfig(
                o,
              )) &&
            this.ypr(t, d))
      : (i.GetEntityConfigType() === Protocol_1.Aki.Protocol.rLs.lTs ||
          i.GetEntityConfigType() ===
            Protocol_1.Aki.Protocol.rLs.Proto_Template) &&
        ((o = i.GetPbDataId()),
        (t =
          TemplateDataPreloadById_1.configTemplateDataPreloadById.GetConfig(
            o,
          ))) &&
        this.ypr(t, d);
    o = new GameModePromise_1.GameModePromise();
    if (
      (this.LoadAssetAsync(d, m.LoadPriority, !1, o, (e) => {
        e ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error("Preload", 4, "[预加载] 预加载固定资源失败", [
              "CreatureDataId",
              m.CreatureDataComponent.GetCreatureDataId(),
            ]));
      }),
      c.push(o.Promise),
      u?.Stop(),
      s?.Start(),
      m.FightAssetManager.SkillAssetManager.SkillAssetMap.size)
    ) {
      let o = m.FightAssetManager.SkillAssetManager.SkillAssetMap.size;
      for (const [h, d] of m.FightAssetManager.SkillAssetManager
        .SkillAssetMap) {
        var C = new GameModePromise_1.GameModePromise();
        this.LoadAssetAsync(d, m.LoadPriority, !1, C, (e) => {
          --o || s?.Stop(),
            e ||
              (Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Preload",
                  4,
                  "[预加载] 预加载技能失败",
                  [
                    "CreatureDataId",
                    m.CreatureDataComponent.GetCreatureDataId(),
                  ],
                  ["SkillId", h],
                ));
        }),
          c.push(C.Promise);
      }
    } else s?.Stop();
    f?.Start();
    const A = m.FightAssetManager.BulletAssetManager;
    let g = A.BulletAssetMap.size;
    if (g)
      for (const [E, d] of A.BulletAssetMap) {
        var D = new GameModePromise_1.GameModePromise();
        this.LoadAssetAsync(d, m.LoadPriority, !1, D, (e) => {
          --g || f?.Stop(),
            e ||
              ((e = A.IndexMapping.get(E)),
              Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Preload",
                  4,
                  "[预加载] 预加载子弹失败",
                  [
                    "CreatureDataId",
                    m.CreatureDataComponent.GetCreatureDataId(),
                  ],
                  ["BulletId", e],
                ));
        }),
          c.push(D.Promise);
      }
    else f?.Stop();
    t = await Promise.all(c);
    if (!e.Valid) return m.DoCallback(4), n.Stop(), 4;
    if (i.GetRemoveState()) return m.DoCallback(4), n.Stop(), 4;
    let P = !0;
    for (const v of t) v || (P = !1);
    return P
      ? (a.SetResult(3),
        i.SetPreloadFinished(!0),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.PreloadEntityFinished,
          e,
        ),
        m.DoCallback(3),
        n.Stop(),
        a.Promise)
      : (m.DoCallback(2), n.Stop(), 2);
  }
  static RemoveEntity(e) {
    var o,
      t = ModelManager_1.ModelManager.PreloadModelNew,
      r = t.GetEntityAssetElement(e);
    r &&
      r.EntityHandle?.Valid &&
      4 !== r.LoadState &&
      ((r.LoadState = 4),
      (o = t.HoldPreloadObject.RemoveEntityAssets(
        r.EntityHandle.CreatureDataId,
      )) ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Preload",
            4,
            "HoldPreloadObject:RemoveEntityAssets Error",
            ["result", o],
            ["Key", r.EntityHandle.CreatureDataId],
          )),
      r.Clear(),
      t.RemoveEntityAsset(e));
  }
  static LoadAssetAsync(e, o, t, r, a) {
    this.Apr(
      e,
      o,
      (e) => {
        a?.(e), r?.SetResult(e);
      },
      t,
    );
  }
  static LoadAsset(e) {
    if (!e.NeedLoadAssets.length) return !0;
    let o = !0;
    for (const i of e.NeedLoadAssets) {
      e.AddLoading(i);
      var t,
        r,
        a = ResourceSystem_1.ResourceSystem.Load(i, UE.Object);
      e.RemoveLoading(i),
        a?.IsValid()
          ? (e.AddObject(i, a),
            a.IsA(UE.AnimMontage.StaticClass()) &&
              (t = e.GetEntityAssetElement()) &&
              (t = t.Entity?.GetComponent(22)) &&
              ((r = UE.BlueprintPathsLibrary.GetBaseFilename(i)),
              t.AddMontage(r, a, i)))
          : ((o = !1),
            Log_1.Log.CheckError() &&
              Log_1.Log.Error("Preload", 4, "[预加载] 同步加载资源失败", [
                "Path",
                i,
              ]));
    }
    return (e.NeedLoadAssets.length = 0), (e.NeedLoadAssetTypes.length = 0), o;
  }
  static FlushSkill(e, o) {
    e = e.FightAssetManager.SkillAssetManager.GetSkill(o);
    return e
      ? this.Ppr(e)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Preload", 4, "[预加载] FlushSkill失败，技能不存在", [
            "SkillId",
            o,
          ]),
        !1);
  }
  static FlushBullet(e, o) {
    e = e.FightAssetManager.BulletAssetManager.GetBullet(o);
    return e
      ? this.Ppr(e)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Preload",
            4,
            "[预加载] FlushBullet失败，子弹不存在",
            ["BulletId", o],
          ),
        !1);
  }
  static Ppr(e) {
    if (!e.Loading()) return !0;
    let o = !0;
    for (const l of e.NeedLoadAssets) {
      e.AddLoading(l);
      var t,
        r,
        a = ResourceSystem_1.ResourceSystem.Load(l, UE.Object);
      e.RemoveLoading(l),
        a?.IsValid()
          ? (e.AddObject(l, a),
            a.IsA(UE.AnimMontage.StaticClass()) &&
              (t = e.GetEntityAssetElement()) &&
              (t = t.Entity?.GetComponent(22)) &&
              ((r = UE.BlueprintPathsLibrary.GetBaseFilename(l)),
              t.AddMontage(r, a, l)))
          : ((o = !1),
            Log_1.Log.CheckError() &&
              Log_1.Log.Error("Preload", 4, "[预加载] 同步加载资源失败", [
                "Path",
                l,
              ]));
    }
    for (const s of e.LoadingSet) {
      var i,
        n,
        _ = ResourceSystem_1.ResourceSystem.Load(s, UE.Object);
      e.RemoveLoading(s),
        _?.IsValid()
          ? (e.AddObject(s, _),
            _.IsA(UE.AnimMontage.StaticClass()) &&
              (i = e.GetEntityAssetElement()) &&
              (i = i.Entity?.GetComponent(22)) &&
              ((n = UE.BlueprintPathsLibrary.GetBaseFilename(s)),
              i.AddMontage(n, _, s)))
          : ((o = !1),
            Log_1.Log.CheckError() &&
              Log_1.Log.Error("Preload", 4, "[预加载] 同步加载资源失败", [
                "Path",
                s,
              ]));
    }
    return o;
  }
  static Apr(n, _, l, s) {
    if (n.NeedLoadAssets.length) {
      let r = void 0;
      var e = n.GetEntityAssetElement();
      e && (r = e.Entity?.GetComponent(22));
      let a = n.NeedLoadAssets.length,
        i = 0;
      for (let e = 0; e < n.NeedLoadAssets.length; e++) {
        var o = n.NeedLoadAssets[e];
        const f = n.NeedLoadAssetTypes[e];
        n.AddLoading(o),
          this.xpr(o, _, (e, o, t) => {
            if ((a--, n.RemoveLoading(o), e)) {
              if (
                (1 === f &&
                  t.IsA(UE.AnimMontage.StaticClass()) &&
                  r &&
                  ((e = UE.BlueprintPathsLibrary.GetBaseFilename(o)),
                  r.AddMontage(e, t, o)),
                n.AddObject(o, t),
                s)
              )
                switch (f) {
                  case 2:
                    this.upr(n, t);
                    break;
                  case 0:
                    this.epr(n, t);
                    break;
                  case 1:
                    t.IsA(UE.AnimMontage.StaticClass())
                      ? this.hpr(n, t, animBuffList)
                      : t.IsA(UE.AnimSequenceBase.StaticClass()) &&
                        this.lpr(n, t, animBuffList);
                    break;
                  case 6:
                    this.cpr(n, t);
                }
            } else i++;
            a || (s && n.NeedLoadCount() ? this.Apr(n, _, l, s) : l?.(0 === i));
          });
      }
      (n.NeedLoadAssets.length = 0), (n.NeedLoadAssetTypes.length = 0);
    } else l?.(!0);
  }
  static epr(e, o) {
    var t, r;
    o &&
      ((t = StatSeconds_1.StatSecondsAccumulator.Create(
        "CollectAssetByActorClass",
      )).Start(),
      (r = (0, puerts_1.$ref)(void 0)),
      UE.KuroStaticLibrary.GetCharacterAnimClass(o, r),
      (o = (0, puerts_1.$unref)(r))) &&
      (this.cpr(e, o), t.Stop());
  }
  static cpr(o, e) {
    if (e) {
      (0, puerts_1.$unref)(animationAssetSetRef).Empty(),
        UE.KuroStaticLibrary.GetAnimAssetsByAnimBlueprintClass(
          e,
          animationAssetSetRef,
        );
      var t = (0, puerts_1.$unref)(animationAssetSetRef);
      if (0 !== t.Num()) {
        for (let e = 0; e < t.Num(); ++e) {
          var r = t.Get(e);
          r.IsA(UE.AnimSequence.StaticClass())
            ? this.lpr(o, r, animBuffList)
            : r.IsA(UE.AnimMontage.StaticClass()) &&
              this.hpr(o, r, animBuffList);
        }
        this._pr(o, animBuffList);
      }
    }
  }
  static lpr(o, e, t) {
    var r = StatSeconds_1.StatSecondsAccumulator.Create(
        "CollectAssetByAnimSequence",
      ),
      a =
        (r.Start(),
        (0, puerts_1.$unref)(animNotifyEventsRef).Empty(),
        UE.KuroStaticLibrary.GetAnimSequenceNotifies(e, animNotifyEventsRef),
        (0, puerts_1.$unref)(animNotifyEventsRef)),
      i = a.Num();
    if (0 !== i) {
      for (let e = 0; e < i; ++e) {
        var n = a.Get(e);
        this.Mpr(o, n, t);
      }
      r.Stop();
    }
  }
  static hpr(o, e, t) {
    var r = StatSeconds_1.StatSecondsAccumulator.Create(
      "CollectAssetByAnimMontage",
    );
    r.Start();
    (0, puerts_1.$unref)(animNotifyEventsRef).Empty(),
      UE.KuroStaticLibrary.GetAnimMontageNotifies(e, animNotifyEventsRef);
    var a = (0, puerts_1.$unref)(animNotifyEventsRef);
    if (0 < a.Num())
      for (let e = 0; e < a.Num(); ++e) {
        var i = a.Get(e);
        this.Mpr(o, i, t);
      }
    (0, puerts_1.$unref)(animSequenceBasesRef).Empty(),
      UE.KuroStaticLibrary.GetAnimSequencesByAnimMontage(
        e,
        animSequenceBasesRef,
      );
    var n = (0, puerts_1.$unref)(animSequenceBasesRef);
    if (0 < n.Num())
      for (let e = 0; e < n.Num(); ++e) {
        var _ = n.Get(e);
        this.lpr(o, _, t);
      }
    r.Stop();
  }
  static Mpr(e, o, t) {
    if (o.NotifyStateClass?.IsValid()) {
      if (o.NotifyStateClass.IsA(UE.AnimNotifyStateEffect_C.StaticClass()))
        return (r = o.NotifyStateClass.EffectDataAssetRef?.ToAssetPathName()) &&
          0 !== r.length &&
          "None" !== r
          ? void e.AddEffect(r)
          : void 0;
      if (o.NotifyStateClass.IsA(UE.TsAnimNotifyStateAddBuff_C.StaticClass()))
        return (r = o.NotifyStateClass).BuffId ? void t.push(r.BuffId) : void 0;
    }
    var r;
    if (o.Notify?.IsValid())
      return o.Notify.IsA(UE.AnimNotifyEffect_C.StaticClass())
        ? (r = o.Notify.EffectDataAssetRef?.ToAssetPathName()) &&
          0 !== r.length &&
          "None" !== r
          ? void e.AddEffect(r)
          : void 0
        : void (
            o.Notify.IsA(UE.TsAnimNotifyAddBuff_C.StaticClass()) &&
            (e = o.Notify).BuffId &&
            t.push(e.BuffId)
          );
  }
  static _pr(e, o) {
    if (o?.length) {
      var t = StatSeconds_1.StatSecondsAccumulator.Create(
          "CollectAssetByBuffIdList",
        ),
        o =
          (t.Start(),
          ConfigManager_1.ConfigManager.BuffItemConfig.GetBuffConfigs(0, o));
      if (o) for (const r of o) this.fpr(e, r);
      t.Stop();
    }
  }
  static fpr(e, o) {
    if (o) {
      var t = StatSeconds_1.StatSecondsAccumulator.Create(
        "CollectAssetByBuffInfo",
      );
      if ((t.Start(), o.GameplayCueIds))
        for (const a of o.GameplayCueIds) {
          var r = GameplayCueById_1.configGameplayCueById.GetConfig(a);
          if (r) {
            r.Path.length && e.AddEffect(r.Path);
            for (const i of r.Resources) i.length && e.AddEffect(i);
          }
        }
      t.Stop();
    }
  }
  static xpr(t, e, r) {
    t?.length
      ? ResourceSystem_1.ResourceSystem.LoadAsync(
          t,
          UE.Object,
          (e, o) => {
            e?.IsValid()
              ? r?.(!0, t, e)
              : (Log_1.Log.CheckError() &&
                  Log_1.Log.Error("Preload", 4, "[预加载] 预加载资源失败", [
                    "Path",
                    o,
                  ]),
                r?.(!1, t, void 0));
          },
          e,
        )
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Preload", 4, "[预加载] path路径为空"),
        r?.(!1, t, void 0));
  }
  static Upr(e, o) {
    if (PublicUtil_1.PublicUtil.UseDbConfig()) {
      var t =
        ModelConfigPreloadById_1.configModelConfigPreloadById.GetConfig(o);
      if (!t) return !1;
      (e.BlueprintClassPath = t.ActorClassPath), this.ypr(t, e.MainAsset);
    } else {
      t =
        "" +
        ModelManager_1.ModelManager.PreloadModelNew.ModelConfigJsonExportPath +
        o +
        ".json";
      if (UE.BlueprintPathsLibrary.FileExists(t)) {
        var o = (0, puerts_1.$ref)("");
        if (
          (UE.KuroStaticLibrary.LoadFileToString(o, t),
          !(o = (0, puerts_1.$unref)(o))?.length)
        )
          return !1;
        o = JSON.parse(o);
        (e.BlueprintClassPath = o.ActorClassPath),
          this.Ipr(o.AssetRecord, e.MainAsset);
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "World",
            4,
            "[预加载] 不存在配置文件，重新导出ModelConfig对应的配置？",
            ["Path", t],
          );
    }
    return !0;
  }
  static Rpr(e, o) {
    var t;
    return (
      !!o &&
      ((t = IComponent_1.levelPrefabBpPathConfig[o.BlueprintPath])?.length &&
        e.AddOther(t),
      o.PrefabPath?.length && e.AddOther(o.PrefabPath),
      !0)
    );
  }
  static CollectAssetBySkillId(e, o, t) {
    var r = ModelManager_1.ModelManager.PreloadModelNew,
      a = r.GetCommonSkill(o);
    let i = !1,
      n = !1,
      _ = void 0;
    if (a) {
      (i = !0), (n = a[0]);
      var l = a[1];
      (_ = new PreloadDefine_1.AssetElement(e)),
        e.FightAssetManager.SkillAssetManager.AddSkill(o, _);
      for (let e = 0; e < l.NeedLoadAssets.length; e++) {
        var s = l.NeedLoadAssets[e],
          f = l.NeedLoadAssetTypes[e];
        _.AddAsset(f, s);
      }
    }
    if (e.BlueprintClassPath?.length) {
      if (!PublicUtil_1.PublicUtil.UseDbConfig()) {
        (a = e.BlueprintClassPath.substring(CHARACTER_PREFIX_PATH.length)),
          (a = a.substring(0, a.lastIndexOf("."))),
          (r = "" + r.SkillJsonExportPath + a + `/${o}.json`);
        if (!UE.BlueprintPathsLibrary.FileExists(r))
          return void (
            t &&
            Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "World",
              4,
              "[预加载] 不存在技能配置文件",
              ["Path", r],
              ["是否公共技能", i],
              ["是否拥有蒙太奇", n],
              ["CreatureDataId", e.CreatureDataComponent?.GetCreatureDataId()],
            )
          );
        a = (0, puerts_1.$ref)("");
        if (
          (UE.KuroStaticLibrary.LoadFileToString(a, r),
          !(t = (0, puerts_1.$unref)(a))?.length)
        )
          return;
        _ ||
          ((_ = new PreloadDefine_1.AssetElement(e)),
          e.FightAssetManager.SkillAssetManager.AddSkill(o, _));
        r = JSON.parse(t);
        return this.Ipr(r.AssetRecord, _), _;
      }
      a = e.FightAssetManager.SkillAssetManager.GetEntitySkillPreload(o);
      if (a)
        return (
          (_ = _ || new PreloadDefine_1.AssetElement(e)),
          e.FightAssetManager.SkillAssetManager.AddSkill(o, _),
          this.ypr(a, _),
          _
        );
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "World",
          4,
          "[预加载] 角色蓝图无效",
          ["SkillId", o],
          ["CreatureDataId", e.CreatureDataComponent?.GetCreatureDataId()],
        );
  }
  static CollectAssetByBulletId(e, o) {
    var t = ModelManager_1.ModelManager.PreloadModelNew;
    if (!PublicUtil_1.PublicUtil.UseDbConfig()) {
      var r = e.BlueprintClassPath.substring(CHARACTER_PREFIX_PATH.length),
        r = r.substring(0, r.lastIndexOf(".")),
        t = "" + t.BulletJsonExportPath + r + `/${o}.json`;
      if (!UE.BlueprintPathsLibrary.FileExists(t))
        return void (
          Log_1.Log.CheckError() &&
          Log_1.Log.Error("World", 4, "[预加载] 不存在子弹配置文件", [
            "Path",
            t,
          ])
        );
      r = (0, puerts_1.$ref)("");
      if (
        (UE.KuroStaticLibrary.LoadFileToString(r, t),
        !(t = (0, puerts_1.$unref)(r))?.length)
      )
        return;
      const a = new PreloadDefine_1.AssetElement(e);
      e.FightAssetManager.BulletAssetManager.AddBullet(o, a);
      r = JSON.parse(t);
      return this.Ipr(r.AssetRecord, a), a;
    }
    t =
      BulletPreloadByActorBlueprintAndBulletId_1.configBulletPreloadByActorBlueprintAndBulletId.GetConfig(
        e.BlueprintClassPath,
        o,
      );
    if (t) {
      const a = new PreloadDefine_1.AssetElement(e);
      return (
        e.FightAssetManager.BulletAssetManager.AddBullet(o, a),
        this.ypr(t, a),
        a
      );
    }
  }
  static Dpr(e, o) {
    var t, r;
    return PublicUtil_1.PublicUtil.UseDbConfig()
      ? !!(r =
          StateMachinePreloadByFsmKey_1.configStateMachinePreloadByFsmKey.GetConfig(
            o,
          )) && (this.ypr(r, e), !0)
      : ((r =
          "" +
          ModelManager_1.ModelManager.PreloadModelNew
            .StateMachineJsonExportPath +
          o +
          ".json"),
        UE.BlueprintPathsLibrary.FileExists(r)
          ? ((t = ((o = ""), puerts_1.$ref)("")),
            UE.KuroStaticLibrary.LoadFileToString(t, r),
            !!(o = (0, puerts_1.$unref)(t))?.length &&
              ((t = JSON.parse(o)), this.Ipr(t.AssetRecord, e), !0))
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error("World", 4, "[预加载] 不存在状态机文件", [
                "Path",
                r,
              ]),
            !1));
  }
  static CollectAssetByStateMachineNode(e, o) {
    if (!PublicUtil_1.PublicUtil.UseDbConfig()) {
      var t =
        "" +
        ModelManager_1.ModelManager.PreloadModelNew.StateMachineJsonExportPath +
        o +
        ".json";
      if (!UE.BlueprintPathsLibrary.FileExists(t))
        return void (
          Log_1.Log.CheckError() &&
          Log_1.Log.Error("World", 4, "[预加载] 不存在状态机文件", ["Path", t])
        );
      var r = (0, puerts_1.$ref)("");
      if (
        (UE.KuroStaticLibrary.LoadFileToString(r, t),
        !(t = (0, puerts_1.$unref)(r))?.length)
      )
        return;
      const a = new PreloadDefine_1.AssetElement(e);
      r = JSON.parse(t);
      return this.Ipr(r.AssetRecord, a), a;
    }
    t =
      StateMachinePreloadByFsmKey_1.configStateMachinePreloadByFsmKey.GetConfig(
        o,
      );
    if (t) {
      const a = new PreloadDefine_1.AssetElement(e);
      return this.ypr(t, a), a;
    }
  }
  static RemoveSkill(e, o) {
    return e
      ? e.FightAssetManager.SkillAssetManager.RemoveSkill(o)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("World", 4, "[预加载] entityAssetElement参数无效"),
        !1);
  }
  static RemoveBullet(e, o) {
    e
      ? e.FightAssetManager.BulletAssetManager.RemoveBullet(o)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("World", 4, "[预加载] entityAssetElement参数无效");
  }
  static upr(o, t) {
    if (t?.IsValid()) {
      var e = StatSeconds_1.StatSecondsAccumulator.Create(
        "CollectAssetByEffectModelBase",
      );
      if ((e.Start(), t.IsA(UE.EffectModelGroup_C.StaticClass()))) {
        var r = t,
          a = r.EffectData.Num();
        for (let e = 0; e < a; ++e) {
          var i,
            n = r.EffectData.GetKey(e);
          n?.IsValid() &&
            (n.IsA(UE.EffectModelGroup_C.StaticClass())
              ? Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Preload",
                  4,
                  "[预加载]子特效不能是DA_Fx_Group",
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
                        4,
                        "[预加载]特效的mesh没有配置动画",
                        ["父特效", t.GetName()],
                        ["子特效", n.GetName()],
                      ))));
        }
      }
      e.Stop();
    }
  }
  static ypr(e, o) {
    for (const t of e.ActorClass) o.AddActorClass(t);
    for (const r of e.Animations) o.AddAnimation(r);
    for (const a of e.Effects) o.AddEffect(a);
    for (const i of e.Audios) o.AddAudio(i);
    for (const n of e.Materials) o.AddMaterial(n);
    for (const _ of e.Meshes) o.AddMesh(_);
    for (const l of e.AnimationBlueprints) o.AddAnimationBlueprint(l);
    for (const s of e.Others) o.AddOther(s);
  }
  static Ipr(e, o, t) {
    if (e)
      if (o) {
        for (const r of e.ActorClass) o.AddActorClass(r);
        for (const a of e.Animations) o.AddAnimation(a);
        for (const i of e.Effects)
          o.AddEffect(i),
            t &&
              ModelManager_1.ModelManager.PreloadModelNew.PreCreateEffect.AddPreCreateEffect(
                t,
                i,
              );
        for (const n of e.Audios) o.AddAudio(n);
        for (const _ of e.Meshes) o.AddMesh(_);
        for (const l of e.Materials) o.AddMaterial(l);
        for (const s of e.AnimationBlueprints) o.AddAnimationBlueprint(s);
        for (const f of e.Others) o.AddOther(f);
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("World", 4, "[预加载] assetElement参数无效");
    else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("World", 4, "[预加载] assetRecord参数无效");
  }
  static OnLeaveLevel() {
    var e,
      o = ModelManager_1.ModelManager.PreloadModelNew;
    o.CommonAssetElement.Clear();
    for ([, e] of o.AllEntityAssetMap) 4 !== e.LoadState && e.Clear();
    return o.ClearEntityAsset(), o.ClearPreloadResource(), !0;
  }
}
exports.PreloadControllerNew = PreloadControllerNew;
//# sourceMappingURL=PreloadControllerNew.js.map
