"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CreatureModel = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  Json_1 = require("../../../Core/Common/Json"),
  Log_1 = require("../../../Core/Common/Log"),
  Time_1 = require("../../../Core/Common/Time"),
  BlueprintConfigByBlueprintType_1 = require("../../../Core/Define/ConfigQuery/BlueprintConfigByBlueprintType"),
  LevelEntityConfigByBlueprintType_1 = require("../../../Core/Define/ConfigQuery/LevelEntityConfigByBlueprintType"),
  LevelEntityConfigByMapIdAndEntityId_1 = require("../../../Core/Define/ConfigQuery/LevelEntityConfigByMapIdAndEntityId"),
  PrefabConfigById_1 = require("../../../Core/Define/ConfigQuery/PrefabConfigById"),
  TemplateConfigByBlueprintType_1 = require("../../../Core/Define/ConfigQuery/TemplateConfigByBlueprintType"),
  TemplateConfigById_1 = require("../../../Core/Define/ConfigQuery/TemplateConfigById"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  EntityHelper_1 = require("../../../Core/Entity/EntityHelper"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
  IEntity_1 = require("../../../UniverseEditor/Interface/IEntity"),
  IGlobal_1 = require("../../../UniverseEditor/Interface/IGlobal"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  PublicUtil_1 = require("../../Common/PublicUtil"),
  Global_1 = require("../../Global"),
  GlobalData_1 = require("../../GlobalData"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CreatureDensityContainer_1 = require("../Define/CreatureDensityContainer"),
  EntityContainer_1 = require("../Define/EntityContainer"),
  zero = 0n,
  ONE_HUNDRED = 100;
class CreatureModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.mvr = 0),
      (this.dvr = void 0),
      (this.zfr = void 0),
      (this.NUe = 0),
      (this.ScenePlayerDataMap = new Map()),
      (this.Cvr = zero),
      (this.xPr = new EntityContainer_1.EntityContainer()),
      (this.gvr = new Map()),
      (this.fvr = new Map()),
      (this.pvr = !1),
      (this.RemoveCreaturePendingSet = new Set()),
      (this.vvr = void 0),
      (this.Mvr = void 0),
      (this.Svr = void 0),
      (this.Evr = void 0),
      (this.yvr = void 0),
      (this.Ivr = void 0),
      (this.Tvr = void 0),
      (this.DelayRemoveContainer = new EntityContainer_1.EntityContainer()),
      (this.wPr = new EntityContainer_1.EntityContainer()),
      (this.GVs = new CreatureDensityContainer_1.CreatureDensityContainer()),
      (this.Rvr = new Set()),
      (this.Uvr = !1),
      (this.Avr = void 0),
      (this.Pvr = new Map()),
      (this.xvr = void 0),
      (this.EntityDisableHandleMap = new Map()),
      (this.ActorMovableHandleMap = new Map()),
      (this.DisableLock = new Set()),
      (this.EntitiesSortedList = []),
      (this.LeavingLevel = !1),
      (this.wvr = () => {
        for (const t of this.GetAllEntities())
          this.fvr.has(t.Id) ||
            this.fvr.set(
              t.Id,
              t.Entity.Disable("[CharacterModel.OnLoadMap] Loading"),
            );
        this.pvr = !0;
      }),
      (this.nye = () => {
        this.pvr = !1;
        for (var [t, e] of this.fvr) {
          t = ModelManager_1.ModelManager.CreatureModel.GetEntityById(t);
          t?.Valid && t.Entity.Enable(e, "CreatureModel.OnWorldDone");
        }
        this.fvr.clear();
      }),
      (this.Gfr = (t) => {
        if (t) {
          for (const e of this.GetAllEntities())
            (Global_1.Global.BaseCharacter?.IsValid() &&
              Global_1.Global.BaseCharacter.EntityId === e.Id) ||
              e.Entity.GetComponent(0).GetEntityType() ===
                Protocol_1.Aki.Protocol.HBs.Proto_SceneItem ||
              this.fvr.has(e.Id) ||
              this.fvr.set(
                e.Id,
                e.Entity.Disable("CreatureModel.OnTeleportStart"),
              );
          this.pvr = !0;
        }
      }),
      (this.uht = () => {
        if (this.pvr) {
          this.pvr = !1;
          for (var [t, e] of this.fvr) {
            t = ModelManager_1.ModelManager.CreatureModel.GetEntityById(t);
            t?.Valid && t.Entity.Enable(e, "CreatureModel.OnTeleportComplete");
          }
          this.fvr.clear();
        }
      });
  }
  OnInit() {
    return (
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("World", 3, "是否启用DB", [
          "启用状态",
          PublicUtil_1.PublicUtil.UseDbConfig(),
        ]),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.AfterLoadMap,
        this.wvr,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldDone,
        this.nye,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TeleportStart,
        this.Gfr,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TeleportComplete,
        this.uht,
      ),
      !0
    );
  }
  OnClear() {
    return (
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.AfterLoadMap,
        this.wvr,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldDone,
        this.nye,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TeleportStart,
        this.Gfr,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TeleportComplete,
        this.uht,
      ),
      !0
    );
  }
  AddEntity(t, e) {
    this.xPr.AddEntity(t, e);
    t = this.GVs.GetItem(t);
    t && (t.EntityHandle = e);
  }
  AddLoadingEntity(t) {
    t?.Valid
      ? this.pvr &&
        !this.fvr.has(t.Id) &&
        this.fvr.set(
          t.Id,
          t.Entity.Disable("[CreatureModel.AddEntity] LoadingWorld"),
        )
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Entity", 3, "实体句柄无效。");
  }
  RemoveEntity(t, e) {
    var i = this.xPr.RemoveEntity(t),
      e =
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Entity",
            3,
            "[实体生命周期:删除实体] 删除实体成功",
            ["CreatureDataId", t],
            ["Reason", e],
            ["Result", i],
          ),
        this.GVs.GetItem(t));
    return e && (e.EntityHandle = void 0), i;
  }
  GetAllEntities() {
    return this.xPr.GetAllEntities();
  }
  Bvr(i, r, n) {
    if (!(i.length < 1) && r < n) {
      var o = i[Math.floor((r + n) / 2)];
      let t = r,
        e = n;
      for (var s; t <= e; ) {
        for (; i[t].Entity.DistanceWithCamera < o.Entity.DistanceWithCamera; )
          t++;
        for (; i[e].Entity.DistanceWithCamera > o.Entity.DistanceWithCamera; )
          e--;
        t <= e && ((s = i[t]), (i[t] = i[e]), (i[e] = s), t++, e--);
      }
      this.Bvr(i, r, e), this.Bvr(i, t, n);
    }
  }
  GetEntitiesInRange(t, e, i, r = !0) {
    if (EntityHelper_1.EntitySystemHelper.IsFilterDirty) {
      EntityHelper_1.EntitySystemHelper.IsFilterDirty = !1;
      let e = 0;
      for (let t = 0; t < this.EntitiesSortedList.length; t++) {
        var n = this.EntitiesSortedList[t];
        n.Valid && !n.Entity
          ? Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Entity",
              3,
              "EntityHandle的Valid为true,但Entity为undefined，逻辑存在严重漏洞",
              ["EntityId", n.Id],
            )
          : n.Valid &&
            !n.Entity.GetComponent(0).GetRemoveState() &&
            (this.EntitiesSortedList[e++] = this.EntitiesSortedList[t]);
      }
      this.EntitiesSortedList.length = e;
    }
    EntityHelper_1.EntitySystemHelper.IsSortDirty &&
      EntityHelper_1.EntitySystemHelper.SortedFrame !== Time_1.Time.Frame &&
      ((EntityHelper_1.EntitySystemHelper.IsSortDirty = !1),
      this.Bvr(this.EntitiesSortedList, 0, this.EntitiesSortedList.length - 1),
      (EntityHelper_1.EntitySystemHelper.SortedFrame = Time_1.Time.Frame));
    let o = 0,
      s = this.EntitiesSortedList.length - 1;
    var a;
    for (o; o <= s; ) {
      var l = Math.floor((o + s) / 2);
      this.EntitiesSortedList[l].Entity.DistanceWithCamera <= t
        ? (o = l + 1)
        : (s = l - 1);
    }
    for (a = o, o = 0, s = a - 1; o <= s; ) {
      var h = Math.floor((o + s) / 2);
      this.EntitiesSortedList[h].Entity.DistanceWithCamera < 0
        ? (o = h + 1)
        : (s = h - 1);
    }
    var u = o,
      _ = (r && (i.length = 0), void 0),
      y = void 0;
    for (let t = u; t < a; t++)
      if ((_ = (y = this.EntitiesSortedList[t]).Entity.GetComponent(0)))
        switch (e) {
          case 0:
            i.push(y);
            break;
          case 2:
            _.IsCharacter() && i.push(y);
            break;
          case 1:
            _.IsSceneItem() && i.push(y);
            break;
          case 3:
            (_.IsCharacter() || _.IsSceneItem()) && i.push(y);
            break;
          case 4:
            _.IsCustom() && i.push(y);
        }
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
    return this.xPr.GetEntity(t);
  }
  GetEntityWithDelayRemoveContainer(t) {
    return this.DelayRemoveContainer.GetEntity(t);
  }
  ExistEntity(t) {
    return this.xPr.ExistEntity(t);
  }
  GetEntityById(t) {
    return this.xPr.GetEntityById(t);
  }
  GetCreatureDataId(t) {
    t = EntitySystem_1.EntitySystem.Get(t);
    return t ? t.GetComponent(0).GetCreatureDataId() : 0;
  }
  GetEntityId(t) {
    return this.xPr.GetEntity(t)?.Id ?? 0;
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
      this.wPr.Clear(),
      this.Rvr.clear(),
      this.Pvr.clear(),
      this.xPr.Clear(),
      this.GVs.Clear(),
      (this.vvr = void 0),
      (this.Mvr = void 0),
      !(this.Svr = void 0)
    );
  }
  GetWorldOwner() {
    return this.mvr;
  }
  SetWorldOwner(t) {
    this.mvr = t;
  }
  GetInstanceId() {
    return this.NUe;
  }
  SetInstanceId(t) {
    this.NUe = t;
  }
  GetPlayerId() {
    var t = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
    return t || 0;
  }
  IsMyWorld() {
    return this.mvr === this.GetPlayerId();
  }
  IsWorldOwner(t) {
    return this.mvr === t;
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
    return this.Cvr;
  }
  SetGameplayTagHash(t) {
    this.Cvr = t;
  }
  SetSceneId(t) {
    this.dvr = t;
  }
  GetSceneId() {
    return this.dvr;
  }
  SetToken(t) {
    this.zfr = t;
  }
  GetToken() {
    return this.zfr;
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
  InitEntityDataConfig(i) {
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
          i = JSON.parse(t);
        this.vvr = new Map();
        for (const o of i.EntityDatas)
          (o.EdWpPath = void 0), n || (o.Name = ""), this.vvr.set(o.Id, o);
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
    this.Mvr = new Map();
    for (const r of t.EntityDatas)
      (r.EdWpPath = void 0), i || (r.Name = ""), this.Mvr.set(r.Id, r);
    return !0;
  }
  bvr() {
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
        for ([i, r] of Object.entries(e.BlueprintConfig)) this.Evr.set(i, r);
      }
    }
  }
  qvr(e = !1) {
    if (e || !PublicUtil_1.PublicUtil.UseDbConfig()) {
      (this.yvr = new Map()), (this.Tvr = new Map());
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
          this.yvr.set(i.Id, i), this.Tvr.set(i.BlueprintType, i.Id);
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
  Gvr(e = !1) {
    if (e || !PublicUtil_1.PublicUtil.UseDbConfig()) {
      this.Ivr = new Map();
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
            let t = this.Ivr.get(r.PrefabId);
            t || ((t = new Map()), this.Ivr.set(r.PrefabId, t));
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
  Nvr() {
    this.Svr = new Map();
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
        let t = this.Svr.get(i.LevelId);
        t || ((t = new Map()), this.Svr.set(i.LevelId, t)),
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
  GetEntityData(t) {
    var e;
    if (void 0 !== t)
      return !PublicUtil_1.PublicUtil.UseDbConfig() && this.vvr
        ? this.vvr.get(t)
        : (t =
              LevelEntityConfigByMapIdAndEntityId_1.configLevelEntityConfigByMapIdAndEntityId.GetConfig(
                ModelManager_1.ModelManager.GameModeModel.MapId,
                t,
              ))
          ? (((e = {}).Id = t.EntityId),
            (e.BlueprintType = t.BlueprintType),
            (e.InSleep = t.InSleep),
            (e.AreaId = t.AreaId),
            (e.Transform = {}),
            Info_1.Info.IsBuildDevelopmentOrDebug && (e.Name = t.Name),
            (e.Transform.Pos = {
              X: t.Transform[0].X / ONE_HUNDRED,
              Y: t.Transform[0].Y / ONE_HUNDRED,
              Z: t.Transform[0].Z / ONE_HUNDRED,
            }),
            (e.Transform.Rot = {
              X: t.Transform[1].X / ONE_HUNDRED,
              Y: t.Transform[1].Y / ONE_HUNDRED,
              Z: t.Transform[1].Z / ONE_HUNDRED,
            }),
            (e.Transform.Scale = {
              X: t.Transform[2].X / ONE_HUNDRED,
              Y: t.Transform[2].Y / ONE_HUNDRED,
              Z: t.Transform[2].Z / ONE_HUNDRED,
            }),
            (e.ComponentsData = JSON.parse(t.ComponentsData)),
            e)
          : void 0;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "Entity",
        3,
        "[CreatureModel.GetEntityData] pbDataId为undefined，外部调用的地方要保证这个参数不能为undefined",
      );
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
      if (void 0 === this.vvr) return [];
      const r = new Array();
      for (const n of this.vvr.keys()) {
        var e = this.vvr.get(n);
        e.BlueprintType === t && r.push(e.Id);
      }
      return r;
    }
    var i =
      LevelEntityConfigByBlueprintType_1.configLevelEntityConfigByBlueprintType.GetConfigList(
        t,
      );
    if (!i) return [];
    const r = new Array();
    for (const o of i) r.push(o.EntityId);
    return r;
  }
  GetDynamicEntityData(t) {
    if (this.Mvr) return this.Mvr.get(t);
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
          i)
        : void 0
      : (this.Evr || ((this.Evr = new Map()), this.bvr()), this.Evr.get(t));
  }
  GetAllEntityTemplate(t = !1) {
    return this.yvr || this.qvr(t), this.yvr;
  }
  GetEntityTemplate(e) {
    if (!PublicUtil_1.PublicUtil.UseDbConfig()) {
      this.yvr || this.qvr();
      let t = 0;
      return (t = "string" == typeof e ? this.Tvr.get(e) : e), this.yvr.get(t);
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
      return this.Ivr || this.Gvr(), this.Ivr.get(t)?.get(e);
    this.Ivr || (this.Ivr = new Map());
    let i = this.Ivr.get(t);
    if (i?.size) return i.get(e);
    var r = PrefabConfigById_1.configPrefabConfigById.GetConfig(t);
    if (r) {
      (i = new Map()), this.Ivr.set(t, i);
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
        (this.Svr || (this.Svr = new Map()),
        this.Svr.get(t) || this.Svr.set(t, new Map()),
        !this.Svr.get(t).get(e))
      ) {
        var i = t.toString() + "_" + e.toString();
        const r =
          ConfigManager_1.ConfigManager.EntityOwnerConfig.GetEntityOwnerConfig(
            i,
          );
        if (!r) return;
        i = { LevelId: t, EntityId: e, Owner: JSON.parse(r.Owner) };
        this.Svr.get(t).set(e, i);
      }
      const r = this.Svr.get(t).get(e);
      return 0 === r.Owner.length ? void 0 : r.Owner[0];
    }
    this.Svr || this.Nvr();
    i = this.Svr.get(t);
    if (i) {
      const r = i.get(e);
      if (r && 0 !== r.Owner.length) return r.Owner[0];
    }
  }
  CheckSetPrefabEntity(t) {
    this.xPr.CheckSetPrefabEntity(t);
  }
  GetPbDataIdByEntity(t) {
    return (t = t && t.Entity.GetComponent(0)) ? t.GetPbDataId() : 0;
  }
  GetEntityByPbDataId(t) {
    return this.xPr.GetEntityByPbDataId(t);
  }
  GetIsLoadingScene() {
    return this.Uvr;
  }
  SetIsLoadingScene(t) {
    this.Uvr = t;
  }
  GetCreatureDataIdByPbDataId(t) {
    return this.xPr.GetCreatureDataIdByPbDataId(t);
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
      ? (this.wPr.AddEntity(t, e), this.wPr.CheckSetPrefabEntity(e), !0)
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
    return this.wPr.PopEntity();
  }
  GetPendingRemoveEntity(t) {
    return this.wPr.GetEntity(t);
  }
  GetPendingRemoveEntityByPbDataId(t) {
    return this.wPr.GetEntityByPbDataId(t);
  }
  RemovePendingRemoveEntity(t) {
    return this.wPr.RemoveEntity(t);
  }
  PendingRemoveEntitySize() {
    return this.wPr.Size();
  }
  AddPreCreature(t) {
    return this.Rvr.add(t), !0;
  }
  RemovePreCreature(t) {
    return this.Rvr.delete(t);
  }
  SetRestoreEntityId(t) {
    this.Avr = t;
  }
  GetRestoreEntityId() {
    return this.Avr;
  }
  RecordEntitySilenceState(t, e) {
    this.Pvr.set(t, e);
  }
  CheckEntityVisible(t) {
    return (
      !!ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t) ||
      !this.Pvr.get(t)
    );
  }
  GetActorRefData() {
    if (this.xvr) return this.xvr;
    this.xvr = new Map();
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
        let e = this.xvr.get(i);
        e = e || new Map();
        for (const o of n.StreamingGroups) {
          var r = o.EntityId;
          let t = e.get(r);
          t = t || [];
          for (const s of o.RefData)
            ("Desktop" === s.Platform && !GlobalData_1.GlobalData.IsSm5) ||
              ("Mobile" === s.Platform && !GlobalData_1.GlobalData.IsEs3) ||
              t.push(s);
          e.set(r, t);
        }
        this.xvr.set(i, e);
      }
      return this.xvr;
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
    t = this.gvr.get(t);
    if (t) return t[0];
  }
  AddOwnerEntityInfo(e) {
    var t = this.xPr.GetEntity(e)?.Entity?.GetComponent(0),
      i = t?.GetBaseInfo()?.ChildEntityIds;
    if (i) {
      var r = t.GetPbDataId();
      for (const n of i) {
        let t = this.gvr.get(n);
        if (t) {
          if (t[0] !== r) {
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "World",
                51,
                "子实体具有与记录不同的父实体",
                ["CreatureId", e],
                ["ChildPbDataId", n],
                ["OwnerPbDataId", t[0]],
                ["RefCount", t[1]],
              );
            continue;
          }
          t[1]++;
        } else (t = [r, 1]), this.gvr.set(n, t);
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "World",
            51,
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
    var e = this.xPr
      .GetEntity(t)
      ?.Entity?.GetComponent(0)
      ?.GetBaseInfo()?.ChildEntityIds;
    if (e)
      for (const r of e) {
        var i = this.gvr.get(r);
        i &&
          (0 == --i[1] && this.gvr.delete(r), Log_1.Log.CheckDebug()) &&
          Log_1.Log.Debug(
            "World",
            51,
            "移除实体Owner信息",
            ["CreatureId", t],
            ["ChildPbDataId", r],
            ["OwnerPbDataId", i[0]],
            ["RefCount", i[1]],
          );
      }
  }
  GetOrAddDensityItem(t, e) {
    var i = this.GVs.GetItem(t);
    if (i) return i;
    (i = e.R5n),
      (i = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(i)),
      (i = (0, IComponent_1.getComponent)(
        i.ComponentsData,
        "BaseInfoComponent",
      ));
    let r = 0;
    return (
      2 === i?.Category.NpcType
        ? (r = 2)
        : 1 === i?.Category.NpcType &&
          (r = void 0 === i.LowerNpcDensity ? 1 : i?.LowerNpcDensity),
      this.GVs.AddItem(t, r, e)
    );
  }
  RemoveDensityItem(t) {
    var e = this.GVs.GetItem(t);
    return this.GVs.RemoveItem(t), e;
  }
  GetDensityLevelGroup(t) {
    return this.GVs.GetLevel(t);
  }
}
exports.CreatureModel = CreatureModel;
//# sourceMappingURL=CreatureModel.js.map
