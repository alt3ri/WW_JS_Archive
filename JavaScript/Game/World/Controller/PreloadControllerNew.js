"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PreloadControllerNew = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../Core/Common/Log"),
  Stats_1 = require("../../../Core/Common/Stats"),
  CharacterPreloadById_1 = require("../../../Core/Define/ConfigQuery/CharacterPreloadById"),
  GameplayCueById_1 = require("../../../Core/Define/ConfigQuery/GameplayCueById"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  StatSeconds_1 = require("../../../Core/Performance/StatSeconds"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  DataTableUtil_1 = require("../../../Core/Utils/DataTableUtil"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  BaseConfigController_1 = require("../../../Launcher/BaseConfig/BaseConfigController"),
  IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  PublicUtil_1 = require("../../Common/PublicUtil"),
  InputModel_1 = require("../../Input/InputModel"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  AutoAttachDefine_1 = require("../../Module/AutoAttach/AutoAttachDefine"),
  NpcIconDefine_1 = require("../../Module/NPC/NpcIconDefine"),
  RoleDefine_1 = require("../../Module/RoleUi/RoleDefine"),
  CharacterGlideComponent_1 = require("../../NewWorld/Character/Common/Component/CharacterGlideComponent"),
  CharacterSplineMoveComponent_1 = require("../../NewWorld/Character/Common/Component/CharacterSplineMoveComponent"),
  PreloadDefine_1 = require("../../Preload/PreloadDefine"),
  RenderConfig_1 = require("../../Render/Config/RenderConfig"),
  GameModePromise_1 = require("../Define/GameModePromise"),
  PreloadConstants_1 = require("./PreloadConstants"),
  commonMajorPaths = [
    "/Game/Aki/Data/Fight/CDT_CommonBulletData.CDT_CommonBulletData",
    "/Game/Aki/Data/Fight/DT_CommonHitEffect.DT_CommonHitEffect",
    "/Game/Aki/Character/Vision/DT_Vision.DT_Vision",
    "/Game/Aki/Data/Fight/DT_Common_Role_SkillInfo.DT_Common_Role_SkillInfo",
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
    "/Game/Aki/Data/Qte/DT_CommonQte.DT_CommonQte",
    "/Game/Aki/Data/Qte/DT_BattleQte.DT_BattleQte",
    "/Game/Aki/UI/Framework/PredefColor/DT_PredefColor.DT_PredefColor",
    "/Game/Aki/Effect/MaterialController/Common/DA_Fx_UIChangeRole.DA_Fx_UIChangeRole",
    "/Game/Aki/TypeScript/Game/Render/Scene/Item/SceneInteractionActor.SceneInteractionActor_C",
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
    CharacterSplineMoveComponent_1.CharacterSplineMoveComponent.DaPath,
    PreloadConstants_1.ANGLE_TO_STEP_FREQUENCY_CURVE_PATH,
    PreloadConstants_1.ANGLE_TO_STEP_LENGTH_CURVE_PATH,
    PreloadConstants_1.BATTLE_SETTLEMENT_TIME_SCALE_CURVE_PATH,
    CharacterGlideComponent_1.SOAR_CONFIG_BASE_PATH,
    CharacterGlideComponent_1.SOAR_CAMERA_SHAKE_PATH,
    CharacterGlideComponent_1.SOAR_CAMERA_SHAKE_CURVE_PATH,
    CharacterGlideComponent_1.SOAR_AUTO_FLIGHT_PATH,
    InputModel_1.INPUT_COMMAND_TRANSFORM_DT_PATH,
  ],
  commonEffectPaths = [
    "/Game/Aki/Data/Camera/DA_FightCameraConfig.DA_FightCameraConfig",
    "/Game/Aki/Data/Fight/BulletDataAsset/DA_CommonBullet.DA_CommonBullet",
    "/Game/Aki/Effect/EffectGroup/Common/DA_Fx_Group_WeaponEnd.DA_Fx_Group_WeaponEnd",
    "/Game/Aki/Effect/EffectGroup/R2T1JinxiMd20011/DA_Fx_Group_R1s_Shoudao.DA_Fx_Group_R1s_Shoudao",
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
  iosAuditAppIgnoreAssets = new Set([
    "/Game/Aki/Sequence/Manager/DT_SequenceMember",
  ]),
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
      var e = o.GetCommonSkillPreloadData();
      if (!e?.length) return !1;
      for (const i of e) {
        var t = new PreloadDefine_1.AssetElement(void 0);
        this.ypr(i, t), o.AddCommonSkill(i.Id, i.HasMontagePath, t);
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
          n = (0, puerts_1.$ref)("");
        if (
          (UE.KuroStaticLibrary.LoadFileToString(n, a),
          !(n = (0, puerts_1.$unref)(n))?.length)
        )
          return (
            Log_1.Log.CheckError() &&
              Log_1.Log.Error("Preload", 4, "[预加载] 加载文件失败", [
                "path",
                a,
              ]),
            !1
          );
        n = JSON.parse(n);
        if (!n)
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
        this.ypr(n.AssetRecord, a),
          o.AddCommonSkill(n.SkillId, n.HasMontagePath, a);
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
    for (const t of commonMajorPaths)
      (BaseConfigController_1.BaseConfigController.GetIosAuditFirstDownloadTipWithSkip() &&
        iosAuditAppIgnoreAssets.has(t)) ||
        e.CommonAssetElement.AddOther(t);
    for (const r of DataTableUtil_1.dataTablePaths.values())
      (BaseConfigController_1.BaseConfigController.GetIosAuditFirstDownloadTipWithSkip() &&
        iosAuditAppIgnoreAssets.has(r)) ||
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
      n = new Array();
    for (const u of t) {
      var i = u.Entity.GetComponent(0);
      u.IsInit ||
        i.GetLoading() ||
        i.GetRemoveState() ||
        i.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Custom ||
        i.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_PlayerEntity ||
        ((i.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Player ||
          ((i = i.GetLocation()),
          (a.X = i.X),
          (a.Y = i.Y),
          (a.Z = i.Z),
          Vector_1.Vector.DistSquared(r, a) <= NEED_PRELOAD_DISTANCE)) &&
          (n.push(u), o.AddNeedWaitEntity(u.Id)));
    }
    let _ = n.length;
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
    for (const d of n) {
      const c = d.Entity.GetComponent(0);
      d.IsInit ||
        c.GetLoading() ||
        (ControllerHolder_1.ControllerHolder.CreatureController.CheckEnableEntityLog(
          d,
        ) &&
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
        (l = this.PreloadEntity(d, e, (e) => {
          _--,
            ControllerHolder_1.ControllerHolder.CreatureController.CheckEnableEntityLog(
              d,
            ) &&
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
            o.RemoveNeedWaitEntity(d.Id);
        })),
        s.push(l));
    }
    let f = !0;
    for (const m of await Promise.all(s)) 2 === m && (f = !1);
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
    const n = e.Entity.GetComponent(0);
    if (n.GetRemoveState()) return t?.(4), 4;
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
    if (n.GetPreloadFinished())
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
    var i = StatSeconds_1.StatSecondsAccumulator.Create(
      `CreatureDataId:${n.GetCreatureDataId()}, PbDataId:` + n.GetPbDataId(),
    );
    if (
      (i.Start(),
      n.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Custom)
    )
      return (
        n.SetPreloadFinished(!0),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.PreloadEntityFinished,
          e,
        ),
        t?.(3),
        i.Stop(),
        3
      );
    let _ = void 0,
      l = void 0,
      s = void 0,
      f = void 0,
      u = void 0,
      d =
        (o &&
          ((_ = o.CreateChild(
            `预加载实体, CreatureDataId:${n.GetCreatureDataId()}, PbDataId:` +
              n.GetPbDataId(),
            !0,
          )),
          (l = _.CreateChild("预加载实体主要资源", !0)),
          (s = _.CreateChild("预加载技能资源", !0)),
          (f = _.CreateChild("预加载子弹资源", !0)),
          (u = _.CreateChild("预加载实体固有资源", !0))),
        _?.Start(),
        r.GetEntityAssetElement(n.GetCreatureDataId()));
    if (d)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Preload", 4, "[预加载] 实体重复预加载"),
        t?.(2),
        _?.Stop(),
        i.Stop(),
        2
      );
    ((d = new PreloadDefine_1.EntityAssetElement(e)).LoadState = 0),
      (d.Promise = a.Promise),
      d.AddCallback(t),
      (d.MainAsset.AddObjectCallback = (e, o) => {
        r.HoldPreloadObject.AddEntityAsset(n.GetCreatureDataId(), e);
      });
    o = n.GetModelConfig();
    if (
      (o && o.特效替换表 && o.蒙太奇替换表
        ? (0 < (c = o.特效替换表.ToAssetPathName()).length &&
            (d?.MainAsset.SetupReplaceEffect(c),
            e.Entity.GetComponent(3).SetReplaceEffect(
              d?.MainAsset.ReplaceEffectMap,
            )),
          0 < (c = o.蒙太奇替换表.ToAssetPathName()).length &&
            (d?.MainAsset.SetupReplaceMontage(c),
            e.Entity.GetComponent(3).SetReplaceMontage(
              d?.MainAsset.ReplaceMontageMap,
            )))
        : o ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Preload",
              4,
              "[预加载] ModelConfig为空",
              ["CreatureDataId", d?.CreatureDataComponent?.GetCreatureDataId()],
              ["EntityId", e.Entity?.Id],
              ["ModelId", n?.GetModelId()],
            )),
      r.AddEntityAsset(n.GetCreatureDataId(), d),
      n.ModelBlueprintPath)
    ) {
      var c = n.GetPbEntityInitData();
      let e = void 0;
      if (
        (c &&
          (e = (0, IComponent_1.getComponent)(
            c.ComponentsData,
            "ModelComponent",
          )),
        !this.Svl(d.MainAsset, e))
      )
        return t?.(2), _?.Stop(), i.Stop(), 2;
    } else if (!this.CollectAssetByModelId(d, n.GetModelId()))
      return t?.(2), _?.Stop(), i.Stop(), 2;
    n.IsAutoRole() &&
      (c = n.GetAutoRoleConfig()?.Id) &&
      (t = CharacterPreloadById_1.configCharacterPreloadById.GetConfig(c)) &&
      this.ypr(t, d.MainAsset),
      l?.Start();
    (c = new GameModePromise_1.GameModePromise()),
      ModelManager_1.ModelManager.PreloadModelNew?.EnablePreloadLog &&
        Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Preload",
          4,
          "[预加载] 开始预加载主要资源",
          ["CreatureDataId", d?.CreatureDataComponent?.GetCreatureDataId()],
          ["EntityId", e.Entity?.Id],
          ["ModelId", n?.GetModelId()],
          ["Dis", o?.描述],
          ["BP", o?.蓝图.ToAssetPathName()],
          [
            "\nAssets",
            "\n" +
              Array.from(d.MainAsset.AssetPathSet)
                .map((e) => "" + e)
                .join("\n"),
          ],
        ),
      this.LoadAssetAsync(d.MainAsset, d.LoadPriority, !1, c),
      (t = await c.Promise);
    if ((l?.Stop(), !t))
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Preload", 4, "[预加载] 预加载主要资源失败", [
            "CreatureDataId",
            d.CreatureDataComponent.GetCreatureDataId(),
          ]),
        d.DoCallback(2),
        _?.Stop(),
        i.Stop(),
        2
      );
    if (!e?.Valid) return d.DoCallback(4), _?.Stop(), i.Stop(), 4;
    var o = e.Entity.GetComponent(216),
      m = (o && o.InitPreload(d), new Array());
    u?.Start();
    const C = new PreloadDefine_1.AssetElement(d);
    switch (n.GetEntityConfigType()) {
      case Protocol_1.Aki.Protocol.rLs.F6n:
        var A = ModelManager_1.ModelManager.GameModeModel.MapId,
          g = n.GetPbDataId(),
          A = r.PbDataPreloadDataMap.get(A)?.get(g);
        if (A) this.ypr(A, C);
        else {
          g = n.GetTemplateId();
          if (!g) break;
          A = r.GetTemplatePreloadData(g);
          A && this.ypr(A, C);
        }
        break;
      case Protocol_1.Aki.Protocol.rLs.lTs:
        var g = n.GetPbEntityInitData()?.BlueprintType;
        g &&
          (A =
            ModelManager_1.ModelManager.CreatureModel.GetEntityTemplate(g)) &&
          (g = r.GetTemplatePreloadData(A.Id)) &&
          this.ypr(g, C);
        break;
      case Protocol_1.Aki.Protocol.rLs.Proto_Template:
        (A = n.GetPbDataId()), (g = r.GetTemplatePreloadData(A));
        g && this.ypr(g, C);
    }
    c = new GameModePromise_1.GameModePromise();
    if (
      (ModelManager_1.ModelManager.PreloadModelNew?.EnablePreloadLog &&
        Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Preload",
          4,
          "[预加载] 开始预加载主体固定资源资源",
          ["CreatureDataId", d.CreatureDataComponent.GetCreatureDataId()],
          ["EntityConfigType", n.GetEntityConfigType()],
          [
            "\nAssets",
            "\n" +
              Array.from(C.AssetPathSet)
                .map((e) => "" + e)
                .join("\n"),
          ],
        ),
      this.LoadAssetAsync(C, d.LoadPriority, !1, c, (e) => {
        e ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error("Preload", 4, "[预加载] 预加载固定资源失败", [
              "CreatureDataId",
              d.CreatureDataComponent.GetCreatureDataId(),
            ]));
      }),
      m.push(c.Promise),
      u?.Stop(),
      s?.Start(),
      d.FightAssetManager.SkillAssetManager.SkillAssetMap.size)
    ) {
      let o = d.FightAssetManager.SkillAssetManager.SkillAssetMap.size;
      for (const [M, C] of d.FightAssetManager.SkillAssetManager
        .SkillAssetMap) {
        ModelManager_1.ModelManager.PreloadModelNew?.EnablePreloadLog &&
          Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Preload",
            4,
            "[预加载] 开始预加载技能资源",
            ["CreatureDataId", d.CreatureDataComponent.GetCreatureDataId()],
            ["SkillId", M],
            [
              "\nAssets",
              "\n" +
                Array.from(C.AssetPathSet)
                  .map((e) => "" + e)
                  .join("\n"),
            ],
          );
        var P = new GameModePromise_1.GameModePromise();
        this.LoadAssetAsync(C, d.LoadPriority, !1, P, (e) => {
          --o || s?.Stop(),
            e ||
              (Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Preload",
                  4,
                  "[预加载] 预加载技能失败",
                  [
                    "CreatureDataId",
                    d.CreatureDataComponent.GetCreatureDataId(),
                  ],
                  ["SkillId", M],
                ));
        }),
          m.push(P.Promise);
      }
    } else s?.Stop();
    f?.Start();
    const D = d.FightAssetManager.BulletAssetManager;
    let h = D.BulletAssetMap.size;
    if (h)
      for (const [L, C] of D.BulletAssetMap) {
        var p,
          E = new GameModePromise_1.GameModePromise();
        ModelManager_1.ModelManager.PreloadModelNew?.EnablePreloadLog &&
          ((p = D.IndexMapping.get(L)), Log_1.Log.CheckDebug()) &&
          Log_1.Log.Debug(
            "Preload",
            4,
            "[预加载] 开始预加载子弹资源",
            ["CreatureDataId", d.CreatureDataComponent.GetCreatureDataId()],
            ["bulletId", p],
            [
              "\nAssets",
              "\n" +
                Array.from(C.AssetPathSet)
                  .map((e) => "" + e)
                  .join("\n"),
            ],
          ),
          this.LoadAssetAsync(C, d.LoadPriority, !1, E, (e) => {
            --h || f?.Stop(),
              e ||
                ((e = D.IndexMapping.get(L)),
                Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "Preload",
                    4,
                    "[预加载] 预加载子弹失败",
                    [
                      "CreatureDataId",
                      d.CreatureDataComponent.GetCreatureDataId(),
                    ],
                    ["BulletId", e],
                  ));
          }),
          m.push(E.Promise);
      }
    else f?.Stop();
    t = await Promise.all(m);
    if (!e.Valid) return d.DoCallback(4), _?.Stop(), i.Stop(), 4;
    if (n.GetRemoveState()) return d.DoCallback(4), _?.Stop(), i.Stop(), 4;
    let v = !0;
    for (const G of t) G || (v = !1);
    return v
      ? (a.SetResult(3),
        n.SetPreloadFinished(!0),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.PreloadEntityFinished,
          e,
        ),
        d.DoCallback(3),
        _?.Stop(),
        i.Stop(),
        a.Promise)
      : (d.DoCallback(2), _?.Stop(), i.Stop(), 2);
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
    for (const n of e.NeedLoadAssets) {
      e.AddLoading(n);
      var t,
        r,
        a = ResourceSystem_1.ResourceSystem.Load(n, UE.Object);
      e.RemoveLoading(n),
        a?.IsValid()
          ? (e.AddObject(n, a),
            a.IsA(UE.AnimMontage.StaticClass()) &&
              (t = e.GetEntityAssetElement()) &&
              (t = t.Entity?.GetComponent(25)) &&
              ((r = UE.BlueprintPathsLibrary.GetBaseFilename(n)),
              t.AddMontage(r, a, n)))
          : ((o = !1),
            Log_1.Log.CheckError() &&
              Log_1.Log.Error("Preload", 4, "[预加载] 同步加载资源失败", [
                "Path",
                n,
              ]));
    }
    return (e.NeedLoadAssets.length = 0), (e.NeedLoadAssetTypes.length = 0), o;
  }
  static FlushSkill(e, o) {
    var t,
      e = e.FightAssetManager.SkillAssetManager.GetSkill(o);
    return e
      ? (([e, t] = this.Ppr(e)),
        e && t
          ? (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Preload",
                3,
                "[预加载] 技能资源预加载中，立马使用技能会变成同步加载",
                ["SkillId", o],
              ),
            !1)
          : e)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Preload", 4, "[预加载] FlushSkill失败，技能不存在", [
            "SkillId",
            o,
          ]),
        !1);
  }
  static FlushBullet(e, o) {
    var t,
      e = e.FightAssetManager.BulletAssetManager.GetBullet(o);
    return e
      ? (([e, t] = this.Ppr(e)),
        e &&
          t &&
          Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Preload",
            3,
            "[预加载] 子弹资源预加载中，立马使用子弹会变成同步加载",
            ["bulletId", o],
          ),
        e)
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
    if (!e.Loading()) return [!0, !1];
    let o = !0;
    for (const s of e.NeedLoadAssets) {
      e.AddLoading(s);
      var t,
        r,
        a = ResourceSystem_1.ResourceSystem.Load(s, UE.Object);
      e.RemoveLoading(s),
        a?.IsValid()
          ? (e.AddObject(s, a),
            a.IsA(UE.AnimMontage.StaticClass()) &&
              (t = e.GetEntityAssetElement()) &&
              (t = t.Entity?.GetComponent(25)) &&
              ((r = UE.BlueprintPathsLibrary.GetBaseFilename(s)),
              t.AddMontage(r, a, s)))
          : ((o = !1),
            Log_1.Log.CheckError() &&
              Log_1.Log.Error("Preload", 4, "[预加载] 同步加载资源失败", [
                "Path",
                s,
              ]));
    }
    var n = 0 < e.LoadingSet.size;
    for (const f of e.LoadingSet) {
      var i,
        _,
        l = ResourceSystem_1.ResourceSystem.Load(f, UE.Object);
      e.RemoveLoading(f),
        l?.IsValid()
          ? (e.AddObject(f, l),
            l.IsA(UE.AnimMontage.StaticClass()) &&
              (i = e.GetEntityAssetElement()) &&
              (i = i.Entity?.GetComponent(25)) &&
              ((_ = UE.BlueprintPathsLibrary.GetBaseFilename(f)),
              i.AddMontage(_, l, f)))
          : ((o = !1),
            Log_1.Log.CheckError() &&
              Log_1.Log.Error("Preload", 4, "[预加载] 同步加载资源失败", [
                "Path",
                f,
              ]));
    }
    return [o, n];
  }
  static Apr(i, _, l, s) {
    if (i.NeedLoadAssets.length) {
      let r = void 0;
      var e = i.GetEntityAssetElement();
      e && (r = e.Entity?.GetComponent(24));
      let a = i.NeedLoadAssets.length,
        n = 0;
      for (let e = 0; e < i.NeedLoadAssets.length; e++) {
        var o = i.NeedLoadAssets[e];
        const f = i.NeedLoadAssetTypes[e];
        i.AddLoading(o),
          this.xpr(o, _, (e, o, t) => {
            if ((a--, i.RemoveLoading(o), e)) {
              if (
                (1 === f &&
                  t.IsA(UE.AnimMontage.StaticClass()) &&
                  r &&
                  ((e = UE.BlueprintPathsLibrary.GetBaseFilename(o)),
                  r.AddMontage(e, t, o)),
                i.AddObject(o, t),
                s)
              )
                switch (f) {
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
            } else n++;
            a || (s && i.NeedLoadCount() ? this.Apr(i, _, l, s) : l?.(0 === n));
          });
      }
      (i.NeedLoadAssets.length = 0), (i.NeedLoadAssetTypes.length = 0);
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
      n = a.Num();
    if (0 !== n) {
      for (let e = 0; e < n; ++e) {
        var i = a.Get(e);
        this.Mpr(o, i, t);
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
        var n = a.Get(e);
        this.Mpr(o, n, t);
      }
    (0, puerts_1.$unref)(animSequenceBasesRef).Empty(),
      UE.KuroStaticLibrary.GetAnimSequencesByAnimMontage(
        e,
        animSequenceBasesRef,
      );
    var i = (0, puerts_1.$unref)(animSequenceBasesRef);
    if (0 < i.Num())
      for (let e = 0; e < i.Num(); ++e) {
        var _ = i.Get(e);
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
            for (const n of r.Resources) n.length && e.AddEffect(n);
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
  static CollectAssetByModelId(e, o, t = !0) {
    var r = ModelManager_1.ModelManager.PreloadModelNew;
    if (PublicUtil_1.PublicUtil.UseDbConfig()) {
      var a = r.GetModelConfigPreloadData(o);
      if (!a) return !1;
      t && (e.BlueprintClassPath = a.ActorClassPath), this.ypr(a, e.MainAsset);
    } else {
      a = "" + r.ModelConfigJsonExportPath + o + ".json";
      if (UE.BlueprintPathsLibrary.FileExists(a)) {
        r = (0, puerts_1.$ref)("");
        if (
          (UE.KuroStaticLibrary.LoadFileToString(r, a),
          !(o = (0, puerts_1.$unref)(r))?.length)
        )
          return !1;
        r = JSON.parse(o);
        t && (e.BlueprintClassPath = r.ActorClassPath),
          this.ypr(r.AssetRecord, e.MainAsset);
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "World",
            4,
            "[预加载] 不存在配置文件，重新导出ModelConfig对应的配置？",
            ["Path", a],
          );
    }
    return !0;
  }
  static Svl(e, o) {
    if (!o) return !1;
    var t = o.ModelType;
    switch (t.Type) {
      case "LevelPrefab":
        var r = IComponent_1.levelPrefabBpPathConfig[t.BlueprintPath];
        r?.length && e.AddOther(r),
          t.PrefabPath?.length && e.AddOther(t.PrefabPath);
        break;
      case "Npc":
        if (
          (t.BlueprintPath.length && e.AddActorClass(t.BlueprintPath),
          t.Abp?.length && e.AddAnimationBlueprint(t.Abp),
          t.NpcModel)
        )
          switch (t.NpcModel.Type) {
            case "Da":
              e.AddAsset(7, t.NpcModel.Da);
              break;
            case "Mesh":
              e.AddAsset(4, t.NpcModel.Mesh);
          }
    }
    return !0;
  }
  static CollectAssetBySkillId(e, o, t) {
    var r = ModelManager_1.ModelManager.PreloadModelNew,
      a = r.GetCommonSkill(o);
    let n = !1,
      i = !1,
      _ = void 0;
    if (a) {
      (n = !0), (i = a[0]);
      var l = a[1];
      (_ = new PreloadDefine_1.AssetElement(e)),
        e.FightAssetManager.SkillAssetManager.AddSkill(o, _);
      for (let e = 0; e < l.NeedLoadAssets.length; e++) {
        var s = l.NeedLoadAssets[e],
          f = l.NeedLoadAssetTypes[e];
        PreloadControllerNew.gEc.Start(),
          _.AddAsset(f, s),
          PreloadControllerNew.gEc.Stop();
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
              ["是否公共技能", n],
              ["是否拥有蒙太奇", i],
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
        return this.ypr(r.AssetRecord, _), _;
      }
      PreloadControllerNew.gEc.Start();
      a = e.FightAssetManager.SkillAssetManager.GetEntitySkillPreload(o);
      if (a)
        return (
          (_ = _ || new PreloadDefine_1.AssetElement(e)),
          e.FightAssetManager.SkillAssetManager.AddSkill(o, _),
          PreloadControllerNew.gEc.Stop(),
          PreloadControllerNew.CEc.Start(),
          this.ypr(a, _),
          PreloadControllerNew.CEc.Stop(),
          _
        );
      PreloadControllerNew.gEc.Stop();
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
        r = "" + t.BulletJsonExportPath + r + `/${o}.json`;
      if (!UE.BlueprintPathsLibrary.FileExists(r))
        return void (
          Log_1.Log.CheckError() &&
          Log_1.Log.Error("World", 4, "[预加载] 不存在子弹配置文件", [
            "Path",
            r,
          ])
        );
      var a = (0, puerts_1.$ref)("");
      if (
        (UE.KuroStaticLibrary.LoadFileToString(a, r),
        !(r = (0, puerts_1.$unref)(a))?.length)
      )
        return;
      const n = new PreloadDefine_1.AssetElement(e);
      e.FightAssetManager.BulletAssetManager.AddBullet(o, n);
      a = JSON.parse(r);
      return this.ypr(a.AssetRecord, n), n;
    }
    PreloadControllerNew.FR1.Start();
    r = t.GetBulletPreloadData(e.BlueprintClassPath, o);
    if (r) {
      const n = new PreloadDefine_1.AssetElement(e);
      return (
        e.FightAssetManager.BulletAssetManager.AddBullet(o, n),
        PreloadControllerNew.FR1.Stop(),
        PreloadControllerNew.NR1.Start(),
        this.ypr(r, n),
        PreloadControllerNew.NR1.Stop(),
        n
      );
    }
    PreloadControllerNew.FR1.Stop();
  }
  static Dpr(e, o) {
    var t,
      r = ModelManager_1.ModelManager.PreloadModelNew;
    return PublicUtil_1.PublicUtil.UseDbConfig()
      ? !!(t = r.GetStateMachinePreloadData(o)) && (this.ypr(t, e), !0)
      : ((t = "" + r.StateMachineJsonExportPath + o + ".json"),
        UE.BlueprintPathsLibrary.FileExists(t)
          ? ((o = ((r = ""), puerts_1.$ref)("")),
            UE.KuroStaticLibrary.LoadFileToString(o, t),
            !!(r = (0, puerts_1.$unref)(o))?.length &&
              ((o = JSON.parse(r)), this.ypr(o.AssetRecord, e), !0))
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error("World", 4, "[预加载] 不存在状态机文件", [
                "Path",
                t,
              ]),
            !1));
  }
  static CollectAssetByStateMachineNode(e, o) {
    var t = ModelManager_1.ModelManager.PreloadModelNew;
    if (!PublicUtil_1.PublicUtil.UseDbConfig()) {
      var r = "" + t.StateMachineJsonExportPath + o + ".json";
      if (!UE.BlueprintPathsLibrary.FileExists(r))
        return void (
          Log_1.Log.CheckError() &&
          Log_1.Log.Error("World", 4, "[预加载] 不存在状态机文件", ["Path", r])
        );
      var a = (0, puerts_1.$ref)("");
      if (
        (UE.KuroStaticLibrary.LoadFileToString(a, r),
        !(r = (0, puerts_1.$unref)(a))?.length)
      )
        return;
      const n = new PreloadDefine_1.AssetElement(e);
      a = JSON.parse(r);
      return this.ypr(a.AssetRecord, n), n;
    }
    r = t.GetStateMachinePreloadData(o);
    if (r) {
      const n = new PreloadDefine_1.AssetElement(e);
      return this.ypr(r, n), n;
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
          var n,
            i = r.EffectData.GetKey(e);
          i?.IsValid() &&
            (i.IsA(UE.EffectModelGroup_C.StaticClass())
              ? Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Preload",
                  4,
                  "[预加载]子特效不能是DA_Fx_Group",
                  ["父特效", t.GetName()],
                  ["子特效", i.GetName()],
                )
              : (this.upr(o, i),
                i.IsA(UE.EffectModelSkeletalMesh_C.StaticClass()) &&
                  ((n = i.AnimationRef)?.IsValid()
                    ? n.IsA(UE.AnimSequence.StaticClass())
                      ? this.lpr(o, n, animBuffList)
                      : n.IsA(UE.AnimMontage.StaticClass()) &&
                        this.hpr(o, n, animBuffList)
                    : Log_1.Log.CheckError() &&
                      Log_1.Log.Error(
                        "Preload",
                        4,
                        "[预加载]特效的mesh没有配置动画",
                        ["父特效", t.GetName()],
                        ["子特效", i.GetName()],
                      ))));
        }
      }
      e.Stop();
    }
  }
  static ypr(e, o) {
    if (e.ActorClass) for (const r of e.ActorClass) o.AddActorClass(r);
    if (e.Animations) for (const a of e.Animations) o.AddAnimation(a);
    if (e.Effects)
      for (const n of e.Effects) {
        o.AddEffect(n);
        var t = o.GetEntityAssetElement()?.Entity?.Id;
        t &&
          ModelManager_1.ModelManager.PreloadModelNew.PreCreateEffect.AddPreCreateEffect(
            t,
            n,
          );
      }
    if (e.Audios) for (const i of e.Audios) o.AddAudio(i);
    if (e.Materials) for (const _ of e.Materials) o.AddMaterial(_);
    if (e.Meshes) for (const l of e.Meshes) o.AddMesh(l);
    if (e.AnimationBlueprints)
      for (const s of e.AnimationBlueprints) o.AddAnimationBlueprint(s);
    if (e.Others) for (const f of e.Others) o.AddOther(f);
  }
  static OnLeaveLevel() {
    var e,
      o = ModelManager_1.ModelManager.PreloadModelNew;
    o.CommonAssetElement.Clear();
    for ([, e] of o.AllEntityAssetMap) 4 !== e.LoadState && e.Clear();
    return o.ClearEntityAsset(), o.ClearPreloadResource(), !0;
  }
}
((exports.PreloadControllerNew = PreloadControllerNew).gEc =
  Stats_1.Stat.Create("PreloadController.AddSkillAsset")),
  (PreloadControllerNew.CEc = Stats_1.Stat.Create(
    "PreloadController.CopySkillAssets",
  )),
  (PreloadControllerNew.FR1 = Stats_1.Stat.Create(
    "PreloadController.AddBulletAsset",
  )),
  (PreloadControllerNew.NR1 = Stats_1.Stat.Create(
    "PreloadController.CopyBulletAssets",
  ));
//# sourceMappingURL=PreloadControllerNew.js.map
