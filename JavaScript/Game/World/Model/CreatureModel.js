"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CreatureModel =
    exports.globalEntityTypePerceptionType =
    exports.ENABLE_KAWAII_MASK =
    exports.DISABLE_KAWAII_MASK =
      void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  Json_1 = require("../../../Core/Common/Json"),
  Log_1 = require("../../../Core/Common/Log"),
  BlueprintConfigByBlueprintType_1 = require("../../../Core/Define/ConfigQuery/BlueprintConfigByBlueprintType"),
  LevelEntityConfigByBlueprintType_1 = require("../../../Core/Define/ConfigQuery/LevelEntityConfigByBlueprintType"),
  LevelEntityConfigByMapIdAndEntityId_1 = require("../../../Core/Define/ConfigQuery/LevelEntityConfigByMapIdAndEntityId"),
  PrefabConfigById_1 = require("../../../Core/Define/ConfigQuery/PrefabConfigById"),
  TemplateConfigByBlueprintType_1 = require("../../../Core/Define/ConfigQuery/TemplateConfigByBlueprintType"),
  TemplateConfigById_1 = require("../../../Core/Define/ConfigQuery/TemplateConfigById"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  Platform_1 = require("../../../Launcher/Platform/Platform"),
  flatbuffers = require("../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
  IEntity_1 = require("../../../UniverseEditor/Interface/IEntity"),
  IGlobal_1 = require("../../../UniverseEditor/Interface/IGlobal"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  PublicUtil_1 = require("../../Common/PublicUtil"),
  GameSettingsDefine_1 = require("../../GameSettings/GameSettingsDefine"),
  GameSettingsManager_1 = require("../../GameSettings/GameSettingsManager"),
  Global_1 = require("../../Global"),
  GlobalData_1 = require("../../GlobalData"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  SeamlessTravelController_1 = require("../../Module/SeamlessTravel/SeamlessTravelController"),
  CreatureDensityContainer_1 = require("../Define/CreatureDensityContainer"),
  EntityContainer_1 = require("../Define/EntityContainer"),
  ComponentReadHelper_1 = require("../EntityReadCode/Component/ComponentReadHelper"),
  zero = 0n,
  ONE_HUNDRED = 100;
(exports.DISABLE_KAWAII_MASK = 1),
  (exports.ENABLE_KAWAII_MASK = ~exports.DISABLE_KAWAII_MASK),
  (exports.globalEntityTypePerceptionType = [1, 2, 2, 2, 2, 4]);
class CreatureModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.EnableEntityLog = !0),
      (this.UseFbEntityConfig = !1),
      (this._Mr = 0),
      (this.uMr = void 0),
      (this.qrl = void 0),
      (this.Ypr = void 0),
      (this.NUe = 0),
      (this.ScenePlayerDataMap = new Map()),
      (this.cMr = zero),
      (this.hPr = new EntityContainer_1.EntityContainer()),
      (this.mMr = new Map()),
      (this.dMr = new Map()),
      (this.NCa = new Map()),
      (this.CMr = !1),
      (this.RemoveCreaturePendingSet = new Set()),
      (this.Lvl = void 0),
      (this.fMr = void 0),
      (this.pMr = void 0),
      (this.vMr = void 0),
      (this.MMr = void 0),
      (this.EMr = void 0),
      (this.SMr = void 0),
      (this.DelayRemoveContainer = new EntityContainer_1.EntityContainer()),
      (this.lPr = new EntityContainer_1.EntityContainer()),
      (this.uYs = new CreatureDensityContainer_1.CreatureDensityContainer()),
      (this.TMr = new Set()),
      (this.LMr = !1),
      (this.DMr = void 0),
      (this.RMr = new Map()),
      (this.UMr = void 0),
      (this.ActorMovableHandleMap = new Map()),
      (this.DisableLock = new Set()),
      (this.EntitiesSortedList = []),
      (this.LeavingLevel = !1),
      (this.ifl = 0),
      (this.AMr = () => {
        for (const t of this.GetAllEntities())
          this.dMr.has(t.Id) ||
            SeamlessTravelController_1.SeamlessTravelController.WasRoleEntityInSeamlessTraveling(
              t.Entity,
            ) ||
            this.dMr.set(
              t.Id,
              t.Entity.Disable("[CharacterModel.OnLoadMap] Loading"),
            );
        this.CMr = !0;
      }),
      (this.nye = () => {
        this.CMr = !1;
        for (var [t, e] of this.dMr) {
          t = ModelManager_1.ModelManager.CreatureModel.GetEntityById(t);
          t?.Valid && t.Entity.Enable(e, "CreatureModel.OnWorldDone");
        }
        this.dMr.clear();
      }),
      (this.bpr = (t) => {
        if (t) {
          for (const i of this.GetAllEntities()) {
            var e;
            (Global_1.Global.BaseCharacter?.IsValid() &&
              Global_1.Global.BaseCharacter.EntityId === i.Id) ||
              i.Entity.GetComponent(0).GetEntityType() ===
                Protocol_1.Aki.Protocol.kks.Proto_SceneItem ||
              this.dMr.has(i.Id) ||
              this.NCa.has(i.Id) ||
              (i.IsInit
                ? ((e = i.Entity.GetComponent(109)) &&
                    ((e = e.DisableTickWithLog(
                      "CreatureModel.OnTeleportStart",
                    )),
                    this.NCa.set(i.Id, e)),
                  (e = i.Entity.GetComponent(111)) && (e.TeleportLock = !0))
                : this.dMr.set(
                    i.Id,
                    i.Entity.Disable("CreatureModel.OnTeleportStart"),
                  ));
          }
          this.CMr = !0;
        }
      }),
      (this.Ilt = () => {
        if (this.CMr) {
          this.CMr = !1;
          for (var [t, e] of this.dMr) {
            t = ModelManager_1.ModelManager.CreatureModel.GetEntityById(t);
            t?.Valid && t.Entity.Enable(e, "CreatureModel.OnTeleportComplete");
          }
          for (var [i, r] of this.NCa) {
            i = ModelManager_1.ModelManager.CreatureModel.GetEntityById(i);
            i?.Valid &&
              (i.Entity.GetComponent(109).EnableTickWithLog(
                r,
                "CreatureModel.OnTeleportComplete",
              ),
              (r = i.Entity.GetComponent(111))) &&
              (r.OnEntityBudgetTickEnableChange(!0), (r.TeleportLock = !1));
          }
          this.dMr.clear(), this.NCa.clear();
        }
      });
  }
  get KuroLodMask() {
    return this.ifl;
  }
  OnInit() {
    (this.EnableEntityLog = Info_1.Info.IsBuildDevelopmentOrDebug),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "World",
          3,
          "实体配置信息",
          ["是否启用DB", PublicUtil_1.PublicUtil.UseDbConfig()],
          ["EnableEntityLog", this.EnableEntityLog],
        ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.AfterLoadMap,
        this.AMr,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldDone,
        this.nye,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TeleportStart,
        this.bpr,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TeleportComplete,
        this.Ilt,
      ),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "a.UseDelayAnim True",
      );
    var t = GameSettingsManager_1.GameSettingsManager.GetCurrentValueSafely(
      GameSettingsDefine_1.EFunction.DynamicBones,
    );
    return this.SetKawaiiMask(void 0 !== t && 0 < t), !0;
  }
  OnClear() {
    return (
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.AfterLoadMap,
        this.AMr,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldDone,
        this.nye,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TeleportStart,
        this.bpr,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TeleportComplete,
        this.Ilt,
      ),
      !0
    );
  }
  AddEntity(t, e) {
    this.hPr.AddEntity(t, e);
    t = this.uYs.GetItem(t);
    t && (t.EntityHandle = e);
  }
  AddLoadingEntity(t) {
    t?.Valid
      ? this.CMr &&
        !this.dMr.has(t.Id) &&
        this.dMr.set(
          t.Id,
          t.Entity.Disable("[CreatureModel.AddEntity] LoadingWorld"),
        )
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Entity", 3, "实体句柄无效。");
  }
  RemoveEntity(t, e) {
    var i = this.hPr.RemoveEntity(t),
      e =
        (this.EnableEntityLog &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Entity",
            3,
            "[实体生命周期:删除实体] 删除实体成功",
            ["CreatureDataId", t],
            ["Reason", e],
            ["Result", i],
          ),
        this.uYs.GetItem(t));
    return e && (e.EntityHandle = void 0), i;
  }
  GetAllEntities() {
    return this.hPr.GetAllEntities();
  }
  GetEntitiesInRange(t, e, i, r = !0, n = !1) {
    ControllerHolder_1.ControllerHolder.WorldController.GetEntitiesInRange(
      t,
      e,
      i,
      r,
      n,
    );
  }
  GetEntitiesInRangeWithLocation(t, e, i, r, n = !0) {
    ControllerHolder_1.ControllerHolder.WorldController.GetEntitiesInRangeWithLocation(
      t.ToUeVector(),
      e,
      i,
      r,
      n,
    );
  }
  GetEntitiesWithTag(t, e) {
    e.length = 0;
    for (const i of this.GetAllEntities())
      i.Entity.GetComponent(0).ContainsTag(t) && e.push(i);
  }
  GetEntitiesWithPbDataId(t, e) {
    e.length = 0;
    for (const i of this.GetAllEntities())
      i.Entity.GetComponent(0).GetPbDataId() === t && e.push(i);
  }
  GetEntitiesWithOwnerId(t, e) {
    e.length = 0;
    for (const i of this.GetAllEntities())
      i.Entity.GetComponent(0).GetOwnerId() === t && e.push(i);
  }
  GetEntity(t) {
    return this.hPr.GetEntity(t);
  }
  GetEntityWithDelayRemoveContainer(t) {
    return this.DelayRemoveContainer.GetEntity(t);
  }
  GetEntityWithPendingRemoveContainer(t) {
    return this.lPr.GetEntity(t);
  }
  ExistEntity(t) {
    return this.hPr.ExistEntity(t);
  }
  GetEntityById(t) {
    return this.hPr.GetEntityById(t);
  }
  GetCreatureDataId(t) {
    t = EntitySystem_1.EntitySystem.Get(t);
    return t ? t.GetComponent(0).GetCreatureDataId() : 0;
  }
  GetEntityId(t) {
    return this.hPr.GetEntity(t)?.Id ?? 0;
  }
  GetEntityIdByPbDataId(t) {
    t = this.GetEntityByPbDataId(t);
    return t ? t.Id : 0;
  }
  GetServerEntityId(t) {
    var t = EntitySystem_1.EntitySystem.Get(t);
    if (t)
      return (
        (t = t.GetComponent(0)),
        MathUtils_1.MathUtils.NumberToLong(t.GetCreatureDataId())
      );
  }
  OnLeaveLevel() {
    for (var [, t] of this.ScenePlayerDataMap) t.Clear();
    return (
      this.ScenePlayerDataMap.clear(),
      this.RemoveCreaturePendingSet.clear(),
      this.DelayRemoveContainer.Clear(),
      this.lPr.Clear(),
      this.TMr.clear(),
      this.RMr.clear(),
      this.hPr.Clear(),
      this.uYs.Clear(),
      (this.Lvl = void 0),
      (this.fMr = void 0),
      !(this.pMr = void 0)
    );
  }
  GetWorldOwner() {
    return this._Mr;
  }
  SetWorldOwner(t) {
    this._Mr = t;
  }
  GetInstanceId() {
    return this.NUe;
  }
  SetInstanceId(t) {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.OnInstanceChange,
      this.NUe,
      t,
    ),
      (this.NUe = t);
  }
  GetPlayerId() {
    var t = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
    return t || 0;
  }
  IsMyWorld() {
    return this._Mr === this.GetPlayerId();
  }
  IsWorldOwner(t) {
    return this._Mr === t;
  }
  GetScenePlayerData(t) {
    return this.ScenePlayerDataMap.get(t);
  }
  AddScenePlayerData(t, e) {
    this.ScenePlayerDataMap.set(t, e);
  }
  GetAllScenePlayers() {
    var t,
      e = new Array();
    for ([, t] of this.ScenePlayerDataMap) e.push(t);
    return e;
  }
  RemoveScenePlayerData(t) {
    var e = this.ScenePlayerDataMap.get(t);
    return e && e.Clear(), this.ScenePlayerDataMap.delete(t);
  }
  GetGameplayTagHash() {
    return this.cMr;
  }
  SetGameplayTagHash(t) {
    this.cMr = t;
  }
  SetSceneId(t) {
    this.uMr = t;
  }
  GetSceneId() {
    return this.uMr;
  }
  SetSceneTraceId(t) {
    this.qrl = t;
  }
  GetSceneTraceId() {
    return this.qrl;
  }
  SetToken(t) {
    this.Ypr = t;
  }
  GetToken() {
    return this.Ypr;
  }
  AddRemoveCreaturePending(t) {
    return (
      !this.RemoveCreaturePendingSet.has(t) &&
      (this.RemoveCreaturePendingSet.add(t), !0)
    );
  }
  RemoveRemoveCreaturePending(t) {
    return this.RemoveCreaturePendingSet.delete(t);
  }
  ClearRemoveCreaturePending() {
    this.RemoveCreaturePendingSet.clear();
  }
  InitEntityDataConfig(t) {
    return (this.Lvl = new Map()), this.AddEntityDataConfig(t);
  }
  AddEntityDataConfig(i) {
    if (!PublicUtil_1.PublicUtil.UseDbConfig()) {
      let t = "";
      var r = (0, puerts_1.$ref)(t);
      let e = (0, PublicUtil_1.getConfigPath)(
        IGlobal_1.globalConfig.LevelsDataDir + `/${i}/Level.json`,
      );
      if (
        (PublicUtil_1.PublicUtil.IsUseTempData() ||
          (e = (0, PublicUtil_1.getConfigPath)(
            IGlobal_1.globalConfigTemp.LevelsDataDir + `/${i}/Level.json`,
          )),
        UE.BlueprintPathsLibrary.FileExists(e))
      ) {
        if (
          (UE.KuroStaticLibrary.LoadFileToString(r, e),
          !(t = (0, puerts_1.$unref)(r)))
        )
          return !1;
        t = t.trim();
        var n = Info_1.Info.IsBuildDevelopmentOrDebug,
          r = JSON.parse(t),
          o = new Map();
        this.Lvl || (this.Lvl = new Map());
        for (const a of r.EntityDatas)
          (a.EdWpPath = void 0), n || (a.Name = ""), o.set(a.Id, a);
        this.Lvl.set(i, o);
      } else
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("World", 3, "不存在EntityConfigData配置文件。", [
            "Path",
            e,
          ]);
    }
    return !0;
  }
  InitDynamicEntityDataConfig() {
    var t = (0, puerts_1.$ref)("");
    let e = (0, PublicUtil_1.getConfigPath)(
      "" + IGlobal_1.globalConfig.EntityDataConfigPath,
    );
    if (
      (PublicUtil_1.PublicUtil.IsUseTempData() ||
        (e = (0, PublicUtil_1.getConfigPath)(
          "" + IGlobal_1.globalConfigTemp.EntityDataConfigPath,
        )),
      !UE.BlueprintPathsLibrary.FileExists(e))
    )
      return !1;
    if (
      (UE.KuroStaticLibrary.LoadFileToString(t, e),
      !(t = (0, puerts_1.$unref)(t)))
    )
      return !1;
    var i = Info_1.Info.IsBuildDevelopmentOrDebug,
      t = JSON.parse(t);
    this.fMr = new Map();
    for (const r of t.EntityDatas)
      (r.EdWpPath = void 0), i || (r.Name = ""), this.fMr.set(r.Id, r);
    return !0;
  }
  xMr() {
    if (!PublicUtil_1.PublicUtil.UseDbConfig()) {
      var e = (0, puerts_1.$ref)("");
      let t = (0, PublicUtil_1.getConfigPath)(
        IGlobal_1.globalConfig.BlueprintConfigPath,
      );
      if (
        (PublicUtil_1.PublicUtil.IsUseTempData() ||
          (t = (0, PublicUtil_1.getConfigPath)(
            IGlobal_1.globalConfigTemp.BlueprintConfigPath,
          )),
        UE.BlueprintPathsLibrary.FileExists(t))
      ) {
        UE.KuroStaticLibrary.LoadFileToString(e, t);
        var i,
          r,
          e = (0, puerts_1.$unref)(e),
          e = JSON.parse(e);
        for ([i, r] of Object.entries(e.BlueprintConfig)) this.vMr.set(i, r);
      }
    }
  }
  InitEntityTemplateMap(e = !1) {
    if (e || !PublicUtil_1.PublicUtil.UseDbConfig()) {
      (this.MMr = new Map()), (this.SMr = new Map());
      e = (0, puerts_1.$ref)("");
      let t = (0, PublicUtil_1.getConfigPath)(
        IGlobal_1.globalConfig.TemplateConfigPath,
      );
      if (
        (PublicUtil_1.PublicUtil.IsUseTempData() ||
          (t = (0, PublicUtil_1.getConfigPath)(
            IGlobal_1.globalConfigTemp.TemplateConfigPath,
          )),
        UE.BlueprintPathsLibrary.FileExists(t))
      ) {
        UE.KuroStaticLibrary.LoadFileToString(e, t);
        e = (0, puerts_1.$unref)(e);
        for (const i of JSON.parse(e).Templates)
          this.MMr.set(i.Id, i), this.SMr.set(i.BlueprintType, i.Id);
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "[CreatureModel.InitEntityTemplateMap] 不存在Template.json文件。",
            ["Path", t],
          );
    }
  }
  BMr(e = !1) {
    if (e || !PublicUtil_1.PublicUtil.UseDbConfig()) {
      this.EMr = new Map();
      e = (0, puerts_1.$ref)("");
      let t = (0, PublicUtil_1.getConfigPath)(
        IGlobal_1.globalConfig.PrefabConfigPath,
      );
      if (
        (PublicUtil_1.PublicUtil.IsUseTempData() ||
          (t = (0, PublicUtil_1.getConfigPath)(
            IGlobal_1.globalConfigTemp.PrefabConfigPath,
          )),
        UE.BlueprintPathsLibrary.FileExists(t))
      ) {
        UE.KuroStaticLibrary.LoadFileToString(e, t);
        e = (0, puerts_1.$unref)(e);
        for (const r of JSON.parse(e).Prefabs)
          if (r.Entities?.length) {
            let t = this.EMr.get(r.PrefabId);
            t || ((t = new Map()), this.EMr.set(r.PrefabId, t));
            for (const n of r.Entities) {
              var i = this.GetEntityTemplate(n.EntityData.BlueprintType);
              i
                ? ((i = (0, IEntity_1.decompressEntityData)(n.EntityData, i)),
                  t.set(n.EntityData.Id, i))
                : Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "Entity",
                    3,
                    "[CreatureModel.InitEntityPrefabMap] 不存在对应的Template。",
                    ["PrefabId", r.PrefabId],
                    ["Id", n.EntityData.Id],
                    ["BlueprintType", n.EntityData.BlueprintType],
                  );
            }
          }
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "[CreatureModel.InitEntityPrefabMap] 不存在Prefab.json文件。",
            ["Path", t],
          );
    }
  }
  bMr() {
    this.pMr = new Map();
    let t = (0, PublicUtil_1.getConfigPath)(
      IGlobal_1.globalConfig.EntityOwnerConfigPath,
    );
    if (
      (PublicUtil_1.PublicUtil.IsUseTempData() ||
        (t = (0, PublicUtil_1.getConfigPath)(
          IGlobal_1.globalConfigTemp.EntityOwnerConfigPath,
        )),
      UE.BlueprintPathsLibrary.FileExists(t))
    ) {
      var e = (0, puerts_1.$ref)(""),
        e =
          (UE.KuroStaticLibrary.LoadFileToString(e, t),
          (e = (0, puerts_1.$unref)(e)),
          JSON.parse(e));
      for (const i of e) {
        let t = this.pMr.get(i.LevelId);
        t || ((t = new Map()), this.pMr.set(i.LevelId, t)),
          t.set(i.EntityId, i);
      }
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Entity",
          3,
          "[CreatureModel.InitEntityTemplateMap] 不存在EntityOwner.json文件。",
          ["Path", t],
        );
  }
  GetEntityData(e, t) {
    if (void 0 === e)
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Entity",
          3,
          "[CreatureModel.GetEntityData] pbDataId为undefined，外部调用的地方要保证这个参数不能为undefined",
        );
    else {
      var i = t ?? ModelManager_1.ModelManager.GameModeModel.MapId;
      if (!PublicUtil_1.PublicUtil.UseDbConfig()) {
        let t = this.Lvl?.get(i);
        return t
          ? t?.get(e)
          : (this.AddEntityDataConfig(i), (t = this.Lvl?.get(i))?.get(e));
      }
      var r =
        LevelEntityConfigByMapIdAndEntityId_1.configLevelEntityConfigByMapIdAndEntityId.GetConfig(
          i,
          e,
        );
      if (r) {
        var n = {};
        if (
          ((n.Id = r.EntityId),
          (n.BlueprintType = r.BlueprintType),
          (n.InSleep = r.InSleep),
          (n.AreaId = r.AreaId),
          (n.Transform = {}),
          Info_1.Info.IsBuildDevelopmentOrDebug && (n.Name = r.Name),
          (n.Transform.Pos = {
            X: r.Transform[0].X / ONE_HUNDRED,
            Y: r.Transform[0].Y / ONE_HUNDRED,
            Z: r.Transform[0].Z / ONE_HUNDRED,
          }),
          (n.Transform.Rot = {
            X: r.Transform[1].X / ONE_HUNDRED,
            Y: r.Transform[1].Y / ONE_HUNDRED,
            Z: r.Transform[1].Z / ONE_HUNDRED,
          }),
          (n.Transform.Scale = {
            X: r.Transform[2].X / ONE_HUNDRED,
            Y: r.Transform[2].Y / ONE_HUNDRED,
            Z: r.Transform[2].Z / ONE_HUNDRED,
          }),
          this.UseFbEntityConfig)
        ) {
          var i =
              UE.BlueprintPathsLibrary.ProjectContentDir() +
              `Aki/Config/UniverseEditorConfig/LevelEntity/${i}_${n.Id}.bytes`,
            o = (0, puerts_1.$ref)(void 0);
          if (!UE.KuroStaticLibrary.LoadFileToArray(i, o))
            return void (
              Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Entity",
                3,
                "加载文件失败",
                ["MapId", t],
                ["PbDataId", e],
                ["File", i],
              )
            );
          (t = UE.KuroStaticLibrary.ArrayToBuffer(o)),
            (e = new Uint8Array(t)),
            (i = new flatbuffers.ByteBuffer(e));
          (n.ComponentsData =
            ComponentReadHelper_1.ComponentReadHelper.ReadComponents(i)),
            (n.BufferArray = o);
        } else n.ComponentsData = JSON.parse(r.ComponentsData);
        return n;
      }
    }
  }
  GetEntityDataByCreatureDataId(t) {
    t = this.GetEntity(t);
    if (t) {
      t = this.GetPbDataIdByEntity(t);
      if (t) return this.GetEntityData(t);
    }
  }
  GetAllEntityIdOfBlueprintType(t) {
    if (!PublicUtil_1.PublicUtil.UseDbConfig()) {
      if (void 0 === this.Lvl) return [];
      const n = new Array();
      var e = this.Lvl.get(ModelManager_1.ModelManager.GameModeModel.MapId);
      if (e)
        for (const o of e.keys()) {
          var i = e.get(o);
          i.BlueprintType === t && n.push(i.Id);
        }
      return n;
    }
    var r =
      LevelEntityConfigByBlueprintType_1.configLevelEntityConfigByBlueprintType.GetConfigList(
        t,
      );
    if (!r) return [];
    const n = new Array();
    for (const a of r) n.push(a.EntityId);
    return n;
  }
  GetDynamicEntityData(t) {
    if (this.fMr) return this.fMr.get(t);
  }
  GetEntityModel(t) {
    var e, i;
    return PublicUtil_1.PublicUtil.UseDbConfig()
      ? (e =
          BlueprintConfigByBlueprintType_1.configBlueprintConfigByBlueprintType.GetConfig(
            t,
          ))
        ? (((i = {}).EntityType = e.EntityType),
          (i.EntityLogic = e.EntityLogic),
          (i.ModelId = e.ModelId),
          (i.HalfHeight = e.HalfHeight),
          (i.TrackHeight = e.TrackHeight),
          i)
        : void 0
      : (this.vMr || ((this.vMr = new Map()), this.xMr()), this.vMr.get(t));
  }
  GetAllEntityTemplate(t = !1) {
    return this.MMr || this.InitEntityTemplateMap(t), this.MMr;
  }
  GetEntityTemplate(e) {
    if (!PublicUtil_1.PublicUtil.UseDbConfig()) {
      this.MMr || this.InitEntityTemplateMap();
      let t = 0;
      return (t = "string" == typeof e ? this.SMr.get(e) : e), this.MMr.get(t);
    }
    let t = void 0;
    if (
      (t = (
        "string" == typeof e
          ? TemplateConfigByBlueprintType_1.configTemplateConfigByBlueprintType
          : TemplateConfigById_1.configTemplateConfigById
      ).GetConfig(e))
    )
      return (
        ((e = {}).Id = t.Id),
        (e.BlueprintType = t.BlueprintType),
        (e.Name = t.Name),
        (e.ComponentsData = JSON.parse(t.ComponentsData)),
        e
      );
  }
  GetEntityPrefab(t, e) {
    if (!PublicUtil_1.PublicUtil.UseDbConfig())
      return this.EMr || this.BMr(), this.EMr.get(t)?.get(e);
    this.EMr || (this.EMr = new Map());
    let i = this.EMr.get(t);
    if (i?.size) return i.get(e);
    var r = PrefabConfigById_1.configPrefabConfigById.GetConfig(t);
    if (r) {
      (i = new Map()), this.EMr.set(t, i);
      for (const o of JSON.parse(r.Entities)) {
        var n = this.GetEntityTemplate(o.EntityData.BlueprintType);
        n
          ? ((n = (0, IEntity_1.decompressEntityData)(o.EntityData, n)),
            i.set(o.EntityData.Id, n))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Entity",
              3,
              "[CreatureModel.GetEntityPrefab] 不存在对应的Template。",
              ["PrefabId", t],
              ["Id", o.EntityData.Id],
              ["BlueprintType", o.EntityData.BlueprintType],
            );
      }
      return i.get(e);
    }
  }
  GetCompleteEntityData(t) {
    var e,
      t = this.GetEntityData(t);
    if (t)
      return (
        (e = this.GetEntityTemplate(t.BlueprintType)),
        (0, IEntity_1.decompressEntityData)(t, e)
      );
  }
  GetEntityOwner(t, e) {
    if (PublicUtil_1.PublicUtil.UseDbConfig()) {
      if (
        (this.pMr || (this.pMr = new Map()),
        this.pMr.get(t) || this.pMr.set(t, new Map()),
        !this.pMr.get(t).get(e))
      ) {
        var i = t.toString() + "_" + e.toString();
        const r =
          ConfigManager_1.ConfigManager.EntityOwnerConfig.GetEntityOwnerConfig(
            i,
          );
        if (!r) return;
        i = { LevelId: t, EntityId: e, Owner: JSON.parse(r.Owner) };
        this.pMr.get(t).set(e, i);
      }
      const r = this.pMr.get(t).get(e);
      return 0 === r.Owner.length ? void 0 : r.Owner[0];
    }
    this.pMr || this.bMr();
    i = this.pMr.get(t);
    if (i) {
      const r = i.get(e);
      if (r && 0 !== r.Owner.length) return r.Owner[0];
    }
  }
  CheckSetPrefabEntity(t) {
    this.hPr.CheckSetPrefabEntity(t);
  }
  GetPbDataIdByEntity(t) {
    return (t = t && t.Entity.GetComponent(0)) ? t.GetPbDataId() : 0;
  }
  GetEntityByPbDataId(t) {
    return this.hPr.GetEntityByPbDataId(t);
  }
  GetIsLoadingScene() {
    return this.LMr;
  }
  SetIsLoadingScene(t) {
    this.LMr = t;
  }
  GetCreatureDataIdByPbDataId(t) {
    return this.hPr.GetCreatureDataIdByPbDataId(t);
  }
  AddDelayRemoveEntity(t, e) {
    return e.Valid
      ? this.DelayRemoveContainer.ExistEntity(t)
        ? (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "World",
              3,
              "[CreatureModel.AddDelayRemoveEntity] 重复添加DelayRemoveEntityMap列表。",
              ["CreatureDataId", t],
            ),
          !1)
        : (this.DelayRemoveContainer.AddEntity(t, e),
          this.DelayRemoveContainer.CheckSetPrefabEntity(e),
          !0)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "World",
            3,
            "[CreatureModel.AddDelayRemoveEntity] entity.Valid = false，添加到DelayRemoveEntityMap列表失败。",
            ["CreatureDataId", t],
          ),
        !1);
  }
  RemoveDelayRemoveEntity(t) {
    this.DelayRemoveContainer.RemoveEntity(t);
  }
  AddPendingRemoveEntity(t, e) {
    return e?.Valid
      ? (this.lPr.AddEntity(t, e), this.lPr.CheckSetPrefabEntity(e), !0)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "World",
            3,
            "[CreatureModel.AddPendingRemoveEntity] entity.Valid = false，添加到PendingRemoveEntityQueue队列失败。",
            ["CreatureDataId", t],
            ["EntityId", e?.Id],
          ),
        !1);
  }
  PopPendingRemoveEntity() {
    return this.lPr.PopEntity();
  }
  PeekPendingRemoveEntity() {
    return this.lPr.PeekEntity();
  }
  GetPendingRemoveEntity(t) {
    return this.lPr.GetEntity(t);
  }
  GetPendingRemoveEntityByPbDataId(t) {
    return this.lPr.GetEntityByPbDataId(t);
  }
  RemovePendingRemoveEntity(t) {
    return this.lPr.RemoveEntity(t);
  }
  PendingRemoveEntitySize() {
    return this.lPr.Size();
  }
  AddPreCreature(t) {
    return this.TMr.add(t), !0;
  }
  RemovePreCreature(t) {
    return this.TMr.delete(t);
  }
  SetRestoreEntityId(t) {
    this.DMr = t;
  }
  GetRestoreEntityId() {
    return this.DMr;
  }
  RecordEntitySilenceState(t, e) {
    this.RMr.set(t, e);
  }
  CheckEntityVisible(t) {
    return (
      !!ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t) ||
      !this.RMr.get(t)
    );
  }
  GetActorRefData() {
    if (this.UMr) return this.UMr;
    this.UMr = new Map();
    let t = "";
    if (
      ((t = PublicUtil_1.PublicUtil.UseDbConfig()
        ? UE.BlueprintPathsLibrary.ProjectContentDir() +
          "Aki/Config/Json/ActorRefConfig.json"
        : (0, PublicUtil_1.getConfigPath)(
            IGlobal_1.globalConfig.ActorRefConfigPath,
          )),
      UE.BlueprintPathsLibrary.FileExists(t))
    ) {
      var e = (0, puerts_1.$ref)(""),
        e =
          (UE.KuroStaticLibrary.LoadFileToString(e, t),
          (e = (0, puerts_1.$unref)(e)) ||
            (Log_1.Log.CheckError() &&
              Log_1.Log.Error("SceneItem", 7, "配置文件为空", ["filePath", t])),
          Json_1.Json.Parse(e));
      for (const n of e.LevelRefList) {
        var i = n.LevelPath;
        let e = this.UMr.get(i);
        e = e || new Map();
        for (const o of n.StreamingGroups) {
          var r = o.EntityId;
          let t = e.get(r);
          t = t || [];
          for (const a of o.RefData)
            (a.Platform &&
              !Platform_1.Platform.CheckAssetPlatformInclude(
                a.Platform.toString(),
              )) ||
              t.push(a);
          e.set(r, t);
        }
        this.UMr.set(i, e);
      }
      return this.UMr;
    }
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("SceneItem", 7, "检查配置文件是否存在", ["filePath", t]);
  }
  GetEntityByChildActor(t) {
    t = this.GetEntityActorByChildActor(t);
    if (t) return this.GetEntityById(t.GetEntityId());
  }
  GetEntityActorByChildActor(t) {
    let e = t;
    for (
      ;
      e &&
      !UE.KuroStaticLibrary.IsImplementInterface(
        e.GetClass(),
        UE.BPI_CreatureInterface_C.StaticClass(),
      );

    )
      e = e.GetAttachParentActor();
    if (e) {
      t = e;
      if (this.GetEntityById(t.GetEntityId())?.Valid) return e;
    }
  }
  GetOwnerEntity(t) {
    t = this.mMr.get(t);
    if (t) return t[0];
  }
  AddOwnerEntityInfo(e) {
    var t = this.hPr.GetEntity(e)?.Entity?.GetComponent(0),
      i = t?.GetBaseInfo()?.ChildEntityIds;
    if (i) {
      var r = t.GetPbDataId();
      for (const n of i) {
        let t = this.mMr.get(n);
        if (t) {
          if (t[0] !== r) {
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "World",
                50,
                "子实体具有与记录不同的父实体",
                ["CreatureId", e],
                ["ChildPbDataId", n],
                ["OwnerPbDataId", t[0]],
                ["RefCount", t[1]],
              );
            continue;
          }
          t[1]++;
        } else (t = [r, 1]), this.mMr.set(n, t);
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "World",
            50,
            "添加实体Owner信息",
            ["CreatureId", e],
            ["ChildPbDataId", n],
            ["OwnerPbDataId", t[0]],
            ["RefCount", t[1]],
          );
      }
    }
  }
  RemoveOwnerEntityInfo(t) {
    var e = this.hPr
      .GetEntity(t)
      ?.Entity?.GetComponent(0)
      ?.GetBaseInfo()?.ChildEntityIds;
    if (e)
      for (const r of e) {
        var i = this.mMr.get(r);
        i &&
          (0 == --i[1] && this.mMr.delete(r), Log_1.Log.CheckDebug()) &&
          Log_1.Log.Debug(
            "World",
            50,
            "移除实体Owner信息",
            ["CreatureId", t],
            ["ChildPbDataId", r],
            ["OwnerPbDataId", i[0]],
            ["RefCount", i[1]],
          );
      }
  }
  GetDensityItemByPbDataId(t) {
    return this.uYs.GetItemByPbDataId(t);
  }
  GetOrAddDensityItem(t, e) {
    var i,
      r = this.uYs.GetItem(t);
    if (r) return r;
    let n = 0;
    return (
      2 === e.oys
        ? (n = 2)
        : 1 === e.oys &&
          ((r = e.v9n),
          (i =
            ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(r))
            ? ((i = (0, IComponent_1.getComponent)(
                i.ComponentsData,
                "BaseInfoComponent",
              )),
              (n =
                i && void 0 !== i.LowerNpcDensity
                  ? this._r_(i.LowerNpcDensity)
                  : 1))
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "World",
                6,
                "不存在的pbDataId",
                ["creatureDataID", t],
                ["pbDataId", r],
              )),
      this.uYs.AddItem(t, n, e)
    );
  }
  RemoveDensityItem(t) {
    return this.uYs.RemoveItem(t);
  }
  GetDensityLevelGroup(t) {
    return this.uYs.GetLevel(t);
  }
  SetKawaiiMask(t) {
    t
      ? (this.ifl &= exports.ENABLE_KAWAII_MASK)
      : (this.ifl |= exports.DISABLE_KAWAII_MASK);
  }
  _r_(t) {
    switch (t) {
      case 1:
        return 0;
      case 0:
        return 1;
      case 2:
        return 2;
      default:
        return 1;
    }
  }
}
exports.CreatureModel = CreatureModel;
//# sourceMappingURL=CreatureModel.js.map
