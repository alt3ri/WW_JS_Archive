"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PreloadControllerNew = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../Core/Common/Log"),
  Stats_1 = require("../../../Core/Common/Stats"),
  BulletPreloadByActorBlueprintAndBulletId_1 = require("../../../Core/Define/ConfigQuery/BulletPreloadByActorBlueprintAndBulletId"),
  CommonSkillPreloadAll_1 = require("../../../Core/Define/ConfigQuery/CommonSkillPreloadAll"),
  EntitySkillPreloadByActorBlueprintAndSkillId_1 = require("../../../Core/Define/ConfigQuery/EntitySkillPreloadByActorBlueprintAndSkillId"),
  GameplayCueById_1 = require("../../../Core/Define/ConfigQuery/GameplayCueById"),
  ModelConfigPreloadById_1 = require("../../../Core/Define/ConfigQuery/ModelConfigPreloadById"),
  StateMachinePreloadByFsmKey_1 = require("../../../Core/Define/ConfigQuery/StateMachinePreloadByFsmKey"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
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
        var t = new PreloadDefine_1.AssetElement();
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
              Log_1.Log.Error("Preload", 3, "[预加载] 加载文件失败", [
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
                3,
                "[预加载] 序列化skillAssetRecord失败",
                ["path", a],
              ),
            !1
          );
        a = new PreloadDefine_1.AssetElement();
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
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Preload", 3, "[预加载] 预加载公共主要资源结果", [
            "Success",
            t,
          ]),
        await this.Lpr());
    return (
      t || (o = !0),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Preload", 3, "[预加载] 预加载公共次要资源结果", [
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
    const o = ModelManager_1.ModelManager.PreloadModel;
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
        n.GetEntityType() === Protocol_1.Aki.Protocol.wks.Proto_Custom ||
        ((n.GetEntityType() === Protocol_1.Aki.Protocol.wks.Proto_Player ||
          ((n = n.GetLocation()),
          (a.X = n.X),
          (a.Y = n.Y),
          (a.Z = n.Z),
          Vector_1.Vector.DistSquared(r, a) <= NEED_PRELOAD_DISTANCE)) &&
          (i.push(u), o.AddNeedWaitEntity(u.Id)));
    }
    let _ = i.length;
    if (
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Preload",
          3,
          "[预加载] 批量预加载实体:开始",
          ["当前实体总数", t.length],
          ["需要预加载的实体个数", _],
        ),
      0 === _)
    )
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Preload", 3, "[预加载] 需要预加载的实体数量为0"),
        !1
      );
    var l,
      s = new Array();
    for (const m of i) {
      const c = m.Entity.GetComponent(0);
      m.IsInit ||
        c.GetLoading() ||
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Preload",
            3,
            "[预加载] 预加载单个实体:开始",
            ["CreatureDataId", c.GetCreatureDataId()],
            ["PbDataId", c.GetPbDataId()],
            ["Reason", "PreloadController.PreloadEntities"],
            ["Count", _],
          ),
        (l = this.PreloadEntity(m, e, (e) => {
          _--,
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Preload",
                3,
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
    for (const d of await Promise.all(s)) 1 === d && (f = !1);
    return (
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Preload", 3, "[预加载] 批量预加载实体:结束", [
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
    if (i.GetRemoveState()) return t?.(3), 3;
    if (e.IsInit)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Preload",
            3,
            "[预加载] 实体重复预加载，因为这个实体handle.IsInit为true",
          ),
        t?.(1),
        1
      );
    if (i.GetPreloadFinished())
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Preload",
            3,
            "[预加载] 实体重复预加载，creatureDataComponent.GetPreloadFinished()为true",
          ),
        t?.(1),
        1
      );
    if (i.GetEntityType() === Protocol_1.Aki.Protocol.wks.Proto_Custom)
      return (
        i.SetPreloadFinished(!0),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.PreloadEntityFinished,
          e,
        ),
        t?.(2),
        2
      );
    let n = void 0,
      _ = void 0,
      l = void 0,
      s = void 0,
      f = void 0,
      u =
        (o &&
          ((n = o.CreateChild(
            `预加载实体, CreatureDataId:${i.GetCreatureDataId()}, PbDataId:` +
              i.GetPbDataId(),
            !0,
          )),
          (_ = n.CreateChild("预加载实体主要资源", !0)),
          (l = n.CreateChild("预加载技能资源", !0)),
          (s = n.CreateChild("预加载子弹资源", !0)),
          (f = n.CreateChild("预加载状态机资源", !0))),
        n?.Start(),
        r.GetEntityAssetElement(i.GetCreatureDataId()));
    if (u)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Preload", 3, "[预加载] 实体重复预加载"),
        t?.(1),
        1
      );
    if (
      (((u = new PreloadDefine_1.EntityAssetElement(e)).LoadState = 0),
      (u.Promise = a.Promise),
      u.AddCallback(t),
      (u.MainAsset.AddObjectCallback = (e, o) => {
        r.HoldPreloadObject.AddEntityAsset(i.GetCreatureDataId(), e);
      }),
      r.AddEntityAsset(i.GetCreatureDataId(), u),
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
        !this.Rpr(u.MainAsset, e))
      )
        return t?.(1), 1;
    } else if (!this.Upr(u, i.GetModelId())) return t?.(1), 1;
    _?.Start();
    (o = new GameModePromise_1.GameModePromise()),
      this.LoadAssetAsync(u.MainAsset, u.LoadPriority, !1, o),
      (t = await o.Promise);
    if ((_?.Stop(), !t))
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Preload", 3, "[预加载] 预加载主要资源失败", [
            "CreatureDataId",
            u.CreatureDataComponent.GetCreatureDataId(),
          ]),
        u.DoCallback(1),
        1
      );
    var o = e.Entity.GetComponent(199),
      m = (o && o.InitPreload(u), new Array());
    if (
      (l?.Start(), u.FightAssetManager.SkillAssetManager.SkillAssetMap.size)
    ) {
      let o = u.FightAssetManager.SkillAssetManager.SkillAssetMap.size;
      for (const [E, p] of u.FightAssetManager.SkillAssetManager
        .SkillAssetMap) {
        var c = new GameModePromise_1.GameModePromise();
        this.LoadAssetAsync(p, u.LoadPriority, !1, c, (e) => {
          --o || l?.Stop(),
            e ||
              (Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Preload",
                  3,
                  "[预加载] 预加载技能失败",
                  [
                    "CreatureDataId",
                    u.CreatureDataComponent.GetCreatureDataId(),
                  ],
                  ["SkillId", E],
                ));
        }),
          m.push(c.Promise);
      }
    } else l?.Stop();
    s?.Start();
    const d = u.FightAssetManager.BulletAssetManager;
    let C = d.BulletAssetMap.size;
    if (C)
      for (const [v, L] of d.BulletAssetMap) {
        var A = new GameModePromise_1.GameModePromise();
        this.LoadAssetAsync(L, u.LoadPriority, !1, A, (e) => {
          --C || s?.Stop(),
            e ||
              ((e = d.IndexMapping.get(v)),
              Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Preload",
                  3,
                  "[预加载] 预加载子弹失败",
                  [
                    "CreatureDataId",
                    u.CreatureDataComponent.GetCreatureDataId(),
                  ],
                  ["BulletId", e],
                ));
        }),
          m.push(A.Promise);
      }
    else s?.Stop();
    f?.Start();
    const g = u.FightAssetManager.StateMachineAssetManager;
    let P = g.StateMachineAssetMap.size;
    if (P)
      for (const [B, M] of g.StateMachineAssetMap) {
        var D = new GameModePromise_1.GameModePromise();
        this.LoadAssetAsync(M, u.LoadPriority, !1, D, (e) => {
          --P || f?.Stop(),
            e ||
              ((e = g.IndexMapping.get(B)),
              Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Preload",
                  3,
                  "[预加载] 预加载状态机失败",
                  [
                    "CreatureDataId",
                    u.CreatureDataComponent.GetCreatureDataId(),
                  ],
                  ["FsmKey", e],
                ));
        }),
          m.push(D.Promise);
      }
    else f?.Stop();
    t = await Promise.all(m);
    if (!e.Valid) return u.DoCallback(3), 3;
    if (i.GetRemoveState()) return u.DoCallback(3), 3;
    let h = !0;
    for (const G of t) G || (h = !1);
    return h
      ? (a.SetResult(2),
        i.SetPreloadFinished(!0),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.PreloadEntityFinished,
          e,
        ),
        u.DoCallback(2),
        a.Promise)
      : (u.DoCallback(1), 1);
  }
  static RemoveEntity(e) {
    var o = ModelManager_1.ModelManager.PreloadModelNew,
      t = o.GetEntityAssetElement(e);
    t &&
      t.EntityHandle?.Valid &&
      3 !== t.LoadState &&
      ((t.LoadState = 3),
      o.HoldPreloadObject.RemoveEntityAssets(t.EntityHandle.Id),
      t.Clear(),
      o.RemoveEntityAsset(e));
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
    for (var [, t] of e.NeedLoadAssets) {
      e.AddLoading(t);
      var r = ResourceSystem_1.ResourceSystem.Load(t, UE.Object);
      e.RemoveLoading(t),
        r?.IsValid()
          ? e.AddLoaded(t) && e.AddObject(t, r)
          : ((o = !1),
            Log_1.Log.CheckError() &&
              Log_1.Log.Error("Preload", 3, "[预加载] 同步加载资源失败", [
                "Path",
                t,
              ]));
    }
    return (e.NeedLoadAssets.length = 0), o;
  }
  static FlushSkill(e, o) {
    e = e.FightAssetManager.SkillAssetManager.GetSkill(o);
    return e
      ? this.Ppr(e)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Preload", 3, "[预加载] FlushSkill失败，技能不存在", [
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
            3,
            "[预加载] FlushBullet失败，子弹不存在",
            ["BulletId", o],
          ),
        !1);
  }
  static Ppr(e) {
    if (!e.Loading()) return !0;
    let o = !0;
    for (var [, t] of e.NeedLoadAssets) {
      e.AddLoading(t);
      var r = ResourceSystem_1.ResourceSystem.Load(t, UE.Object);
      e.RemoveLoading(t),
        r?.IsValid()
          ? e.AddLoaded(t) && e.AddObject(t, r)
          : ((o = !1),
            Log_1.Log.CheckError() &&
              Log_1.Log.Error("Preload", 3, "[预加载] 同步加载资源失败", [
                "Path",
                t,
              ]));
    }
    for (const i of e.LoadingSet) {
      var a = ResourceSystem_1.ResourceSystem.Load(i, UE.Object);
      e.RemoveLoading(i),
        a?.IsValid()
          ? e.AddLoaded(i) && e.AddObject(i, a)
          : ((o = !1),
            Log_1.Log.CheckError() &&
              Log_1.Log.Error("Preload", 3, "[预加载] 同步加载资源失败", [
                "Path",
                i,
              ]));
    }
    return o;
  }
  static Apr(i, n, _, l) {
    if (i.NeedLoadAssets.length) {
      var e = void 0,
        e = new Array();
      for (const o of i.NeedLoadAssets) e.push(o), i.AddLoading(o[1]);
      i.NeedLoadAssets.length = 0;
      let r = e.length,
        a = 0;
      for (const [s, t] of e)
        this.xpr(t, n, (e, o, t) => {
          if ((r--, i.RemoveLoading(o), e)) {
            if ((i.AddLoaded(o) && i.AddObject(o, t), l))
              switch (s) {
                case 2:
                  this.upr(i, t);
                  break;
                case 0:
                  this.epr(i, t);
                  break;
                case 1:
                  t.IsA(UE.AnimMontage.StaticClass())
                    ? this.hpr(i, t, animBuffList)
                    : t.IsA(UE.AnimSequenceBase.StaticClass()) &&
                      this.lpr(i, t, animBuffList);
                  break;
                case 6:
                  this.cpr(i, t);
              }
          } else a++;
          r || (l && i.NeedLoadCount() ? this.Apr(i, n, _, l) : _?.(0 === a));
        });
    } else _?.(!0);
  }
  static epr(e, o) {
    var t;
    o &&
      ((t = (0, puerts_1.$ref)(void 0)),
      UE.KuroStaticLibrary.GetCharacterAnimClass(o, t),
      (o = (0, puerts_1.$unref)(t))) &&
      this.cpr(e, o);
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
    (0, puerts_1.$unref)(animNotifyEventsRef).Empty(),
      UE.KuroStaticLibrary.GetAnimSequenceNotifies(e, animNotifyEventsRef);
    var r = (0, puerts_1.$unref)(animNotifyEventsRef),
      a = r.Num();
    if (0 !== a)
      for (let e = 0; e < a; ++e) {
        var i = r.Get(e);
        this.Mpr(o, i, t);
      }
  }
  static hpr(o, e, t) {
    (0, puerts_1.$unref)(animNotifyEventsRef).Empty(),
      UE.KuroStaticLibrary.GetAnimMontageNotifies(e, animNotifyEventsRef),
      UE.KuroStaticLibrary.SetMontageANIndex(e);
    var r = (0, puerts_1.$unref)(animNotifyEventsRef);
    if (0 < r.Num())
      for (let e = 0; e < r.Num(); ++e) {
        var a = r.Get(e);
        this.Mpr(o, a, t);
      }
    (0, puerts_1.$unref)(animSequenceBasesRef).Empty(),
      UE.KuroStaticLibrary.GetAnimSequencesByAnimMontage(
        e,
        animSequenceBasesRef,
      );
    var i = (0, puerts_1.$unref)(animSequenceBasesRef);
    if (0 < i.Num())
      for (let e = 0; e < i.Num(); ++e) {
        var n = i.Get(e);
        this.lpr(o, n, t);
      }
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
      o = ConfigManager_1.ConfigManager.BuffItemConfig.GetBuffConfigs(0, o);
      if (o) for (const t of o) this.fpr(e, t);
    }
  }
  static fpr(e, o) {
    if (o)
      if (o.GameplayCueIds)
        for (const r of o.GameplayCueIds) {
          var t = GameplayCueById_1.configGameplayCueById.GetConfig(r);
          if (t) {
            t.Path.length && e.AddEffect(t.Path);
            for (const a of t.Resources) a.length && e.AddEffect(a);
          }
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
                  Log_1.Log.Error("Preload", 3, "[预加载] 预加载资源失败", [
                    "Path",
                    o,
                  ]),
                r?.(!1, t, void 0));
          },
          e,
        )
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Preload", 3, "[预加载] path路径为空"),
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
            3,
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
      var l,
        s,
        a = a[1];
      (_ = new PreloadDefine_1.AssetElement()),
        e.FightAssetManager.SkillAssetManager.AddSkill(o, _);
      for ([l, s] of a.NeedLoadAssets) _.AddAsset(l, s);
      if (!n) return _;
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
              3,
              "[预加载] 不存在技能配置文件",
              ["Path", r],
              ["是否公共技能", i],
              ["是否拥有蒙太奇", n],
              ["CreatureDataId", e.CreatureDataComponent.GetCreatureDataId()],
            )
          );
        a = (0, puerts_1.$ref)("");
        if (
          (UE.KuroStaticLibrary.LoadFileToString(a, r),
          !(t = (0, puerts_1.$unref)(a))?.length)
        )
          return;
        _ ||
          ((_ = new PreloadDefine_1.AssetElement()),
          e.FightAssetManager.SkillAssetManager.AddSkill(o, _));
        r = JSON.parse(t);
        return this.Ipr(r.AssetRecord, _), _;
      }
      a =
        EntitySkillPreloadByActorBlueprintAndSkillId_1.configEntitySkillPreloadByActorBlueprintAndSkillId.GetConfig(
          e.BlueprintClassPath,
          o,
        );
      if (a)
        return (
          _ ||
            ((_ = new PreloadDefine_1.AssetElement()),
            e.FightAssetManager.SkillAssetManager.AddSkill(o, _)),
          this.ypr(a, _),
          _
        );
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "World",
          3,
          "[预加载] 角色蓝图无效",
          ["SkillId", o],
          ["CreatureDataId", e.CreatureDataComponent.GetCreatureDataId()],
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
          Log_1.Log.Error("World", 3, "[预加载] 不存在子弹配置文件", [
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
      const a = new PreloadDefine_1.AssetElement();
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
      const a = new PreloadDefine_1.AssetElement();
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
              Log_1.Log.Error("World", 3, "[预加载] 不存在状态机文件", [
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
          Log_1.Log.Error("World", 3, "[预加载] 不存在状态机文件", ["Path", t])
        );
      var r = (0, puerts_1.$ref)("");
      if (
        (UE.KuroStaticLibrary.LoadFileToString(r, t),
        !(t = (0, puerts_1.$unref)(r))?.length)
      )
        return;
      const a = new PreloadDefine_1.AssetElement();
      e.FightAssetManager.StateMachineAssetManager.AddStateMachine(o, a);
      r = JSON.parse(t);
      return this.Ipr(r.AssetRecord, a), a;
    }
    t =
      StateMachinePreloadByFsmKey_1.configStateMachinePreloadByFsmKey.GetConfig(
        o,
      );
    if (t) {
      const a = new PreloadDefine_1.AssetElement();
      return (
        e.FightAssetManager.StateMachineAssetManager.AddStateMachine(o, a),
        this.ypr(t, a),
        a
      );
    }
  }
  static RemoveSkill(e, o) {
    return e
      ? e.FightAssetManager.SkillAssetManager.RemoveSkill(o)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("World", 3, "[预加载] entityAssetElement参数无效"),
        !1);
  }
  static RemoveBullet(e, o) {
    e
      ? e.FightAssetManager.BulletAssetManager.RemoveBullet(o)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("World", 3, "[预加载] entityAssetElement参数无效");
  }
  static upr(o, t) {
    if (t?.IsValid())
      if (t.IsA(UE.EffectModelGroup_C.StaticClass())) {
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
              ModelManager_1.ModelManager.PreloadModel.PreCreateEffect.AddPreCreateEffect(
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
          Log_1.Log.Error("World", 3, "[预加载] assetElement参数无效");
    else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("World", 3, "[预加载] assetRecord参数无效");
  }
}
exports.PreloadControllerNew = PreloadControllerNew;
//# sourceMappingURL=PreloadControllerNew.js.map
