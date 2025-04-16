"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapModel = void 0);
const Json_1 = require("../../../Core/Common/Json"),
  Log_1 = require("../../../Core/Common/Log"),
  TeleporterById_1 = require("../../../Core/Define/ConfigQuery/TeleporterById"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  Global_1 = require("../../Global"),
  UnopenedAreaController_1 = require("../../LevelGamePlay/UnopenedArea/UnopenedAreaController"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  MapDefine_1 = require("./MapDefine"),
  MapUtil_1 = require("./MapUtil"),
  MapLogger_1 = require("./Misc/MapLogger");
class MapModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.MDi = 0),
      (this.EDi = void 0),
      (this.SDi = void 0),
      (this.yDi = void 0),
      (this.IDi = void 0),
      (this.TDi = void 0),
      (this.LDi = void 0),
      (this.Nhl = void 0),
      (this.DDi = void 0),
      (this.VCc = void 0),
      (this.UDi = void 0),
      (this.ADi = void 0),
      (this.SSl = void 0),
      (this.PDi = void 0),
      (this.UnlockMultiMapIds = void 0),
      (this.UnlockMapBlockIds = void 0),
      (this.LastSafeLocation = Vector_1.Vector.Create()),
      (this.CacheEnrichmentAreaWorldMapCircle = void 0),
      (this.CacheEnrichmentAreaEntityId = 0),
      (this.Wcl = void 0),
      (this.Qcl = void 0),
      (this.MapLifeEventListenerTriggerMap = void 0),
      (this.jCc = []),
      (this.kd1 = new Map());
  }
  OnInit() {
    return (
      (this.EDi = new Map()),
      (this.LDi = new Map()),
      (this.Nhl = new Map()),
      (this.DDi = new Map()),
      (this.ADi = new Map()),
      (this.SSl = new Set()),
      (this.UDi = new Map()),
      (this.TDi = new Map()),
      (this.SDi = new Map()),
      (this.yDi = new Map()),
      (this.IDi = new Map()),
      (this.PDi = new Map()),
      (this.MapLifeEventListenerTriggerMap = new Map()),
      (this.Wcl = new Map()),
      (this.Qcl = new Map()),
      (this.UnlockMapBlockIds = []),
      (this.UnlockMultiMapIds = []),
      (this.kd1 = new Map()),
      !0
    );
  }
  OnChangeMode() {
    return (
      ModelManager_1.ModelManager.TrackModel.ClearTrackData(),
      ModelManager_1.ModelManager.MapModel.SetCurTrackMark(void 0),
      !0
    );
  }
  OnClear() {
    return (
      this.EDi.clear(),
      this.LDi.clear(),
      this.Nhl.clear(),
      this.DDi.clear(),
      this.ADi.clear(),
      this.SSl.clear(),
      this.SDi.clear(),
      this.yDi.clear(),
      this.IDi.clear(),
      this.PDi.clear(),
      this.Wcl.clear(),
      this.Qcl.clear(),
      this.kd1.clear(),
      (this.EDi = void 0),
      (this.LDi = void 0),
      (this.Nhl = void 0),
      (this.DDi = void 0),
      (this.ADi = void 0),
      (this.SSl = void 0),
      (this.VCc = void 0),
      (this.UnlockMapBlockIds = void 0),
      (this.UnlockMultiMapIds = void 0),
      (this.CacheEnrichmentAreaWorldMapCircle = void 0),
      !(this.CacheEnrichmentAreaEntityId = 0)
    );
  }
  GetUnlockedTeleportMap() {
    return this.LDi;
  }
  GetDynamicMark(e) {
    return this.TDi?.get(e);
  }
  GetMark(e, t) {
    return this.EDi.get(e)?.get(t);
  }
  GetMarkByType(e) {
    return this.EDi.get(e);
  }
  GetMarkCountByType(e) {
    return this.EDi.get(e)?.size ?? 0;
  }
  GetConfigMarkTrackTarget(e) {
    e = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(e);
    if (void 0 !== e) {
      if (e.EntityConfigId) return e.EntityConfigId;
      if (e.MarkVector) return Vector_1.Vector.Create(e.MarkVector);
    }
    return 0;
  }
  GetMarkByQuestId(e) {
    var t = this.GetMarkByType(12);
    if (t)
      for (const a of t.values()) {
        var r = a;
        if (r.NodeId) {
          var i = r.TreeId,
            i =
              ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
                i,
              );
          if (i && i.TreeConfigId === e) return r;
        } else if (r.TreeId === e) return r;
      }
  }
  GetAllDynamicMarks() {
    return this.EDi;
  }
  GetDynamicMarkInfoById(t) {
    let r = void 0;
    return (
      this.EDi.forEach((e) => {
        e.has(t) && (r = e.get(t));
      }),
      r
    );
  }
  SetCurTrackMark(e) {
    this.VCc = e;
  }
  IsEqualToCurTrack(e) {
    return (
      e?.MarkId === this.VCc?.MarkId &&
      e?.MarkType === this.VCc?.MarkType &&
      e?.Track === this.VCc?.Track
    );
  }
  GetCurTrackMark() {
    return this.VCc;
  }
  CreateServerSaveMark(e) {
    this.xDi(e);
  }
  CreateTempMapMark(e) {
    this.SSl.add(e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.CreateTempMapMark,
        e,
      );
  }
  GetPendingAddTempMapMarkList() {
    return this.SSl;
  }
  ClearPendingAddTempMapMarkList() {
    this.SSl.clear();
  }
  CreateMapMark(e) {
    return (e.MarkId = this.SpawnDynamicMarkId()), this.xDi(e), e.MarkId;
  }
  CacheMapFishingShipMark(e) {
    this.jCc.length = 0;
    for (const t of e)
      this.jCc.push({
        InstanceId: t.r6n ?? 0,
        TemplateId: t.IIs ?? 0,
        PositionX: t.P5n?.X ?? 0,
        PositionY: t.P5n?.Y ?? 0,
        PositionZ: t.P5n?.Z ?? 0,
      }),
        MapLogger_1.MapLogger.Debug(63, "标记系统->CacheMapFishingShipMark", [
          "MarkInfo",
          t,
        ]);
    this.TryRecreateShipMark();
  }
  TryRecreateShipMark() {
    var e = ModelManager_1.ModelManager.MapModel.GetMarkCountByType(31);
    if (!(0 < e))
      for (const r of this.jCc) {
        var t = new MapDefine_1.FishingShipMarkCreateInfo({
          TrackTarget: Vector_1.Vector.Create(
            r.PositionX,
            r.PositionY,
            r.PositionZ,
          ),
          MarkConfigId: MapDefine_1.FISHING_SHIP_MARK_ID,
          MarkType: 31,
          TrackSource: 1,
          EntityConfigId: r.TemplateId,
          MapAndDungeonInfo: { DungeonId: r.InstanceId },
        });
        this.CreateMapMark(t);
      }
  }
  SyncLocalShipLocationToCacheInfo() {
    var e = this.GetMarkByType(31);
    if (e)
      for (const [, i] of e) {
        var t = this.jCc.filter(
            (e) =>
              e.TemplateId === i.EntityConfigId &&
              e.InstanceId === i.InstanceDungeonId,
          ),
          r = MapUtil_1.MapUtil.GetTrackPositionByTrackTargetConfig(
            i.TrackTarget,
            i.MapId,
          );
        if (0 < t?.length)
          for (const a of t)
            (a.PositionX = r.X), (a.PositionY = r.Y), (a.PositionZ = r.Z);
        else
          this.jCc.push({
            InstanceId: i.InstanceDungeonId ?? 0,
            TemplateId: i.EntityConfigId ?? 0,
            PositionX: r.X,
            PositionY: r.Y,
            PositionZ: r.Z,
          });
      }
  }
  wDi(e) {
    return !(
      12 === e.MarkType ||
      15 === e.MarkType ||
      17 === e.MarkType ||
      9 === e.MarkType
    );
  }
  ResetDynamicMarkData() {
    this.UDi.clear(), this.PDi.clear();
    var e = this.EDi.get(12),
      t = this.EDi.get(7);
    this.EDi?.clear(), this.TDi?.clear(), this.Vlh(12, e), this.Vlh(7, t);
  }
  Vlh(e, t) {
    t &&
      (this.EDi?.set(e, t),
      t.forEach((e) => {
        this.TDi?.set(e.MarkId, e);
      }));
  }
  xDi(r) {
    if (this.EDi) {
      MapLogger_1.MapLogger.Debug(63, "标记系统->CreateDynamicMark", [
        "DynamicMarkCreateInfo",
        r,
      ]);
      let e = this.EDi.get(r.MarkType),
        t = (e || ((e = new Map()), this.EDi.set(r.MarkType, e)), void 0);
      e.forEach((e) => {
        this.wDi(r) &&
          e.TrackTarget instanceof Vector_1.Vector &&
          r.TrackTarget instanceof Vector_1.Vector &&
          e.TrackTarget.Equality(r.TrackTarget) &&
          (t = e),
          e.MarkId === r.MarkId && (t = e);
      }),
        t &&
          (MapLogger_1.MapLogger.Debug(63, "标记系统->existMarkInfo", [
            "DynamicMarkCreateInfo",
            r,
          ]),
          this.RemoveMapMark(t.MarkType, t.MarkId)),
        e.set(r.MarkId, r),
        this.TDi?.set(r.MarkId, r),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.CreateMapMark,
          r,
        );
    }
  }
  SetTrackMark(e, t, r) {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.TrackMapMark,
      e,
      t,
      r,
    ),
      r ||
        (this.EDi &&
          (r = this.EDi.get(e)) &&
          r.get(t)?.DestroyOnUnTrack &&
          this.RemoveMapMark(e, t));
  }
  IsMarkIdExist(e, t) {
    var r;
    return (
      !!(this.EDi && e && t) &&
      ((r = this.EDi.get(e))
        ? r.has(t)
        : void 0 !==
            (r = ConfigManager_1.ConfigManager.MapConfig.SearchMarkConfig(t)) &&
          r.ObjectType === e)
    );
  }
  GetMarkTypeByMarkId(e) {
    var t = this.GetDynamicMark(e);
    return void 0 !== t
      ? t.MarkType
      : ConfigManager_1.ConfigManager.MapConfig.SearchMarkConfig(e)?.ObjectType;
  }
  GetSoundBoxDetectMark() {
    var e = this.GetMarkByType(16);
    return (e && 0 < e.size) || ((e = this.GetMarkByType(21)) && 0 < e.size)
      ? [(e = e.values().next().value).MarkId, e.MarkType]
      : void 0;
  }
  GetSoundBoxDetectMarkCalc() {
    var e = this.GetMarkByType(16),
      t = this.GetMarkByType(21);
    if (e?.size || t?.size) {
      const r = ModelManager_1.ModelManager.MapModel.CurrentWorldMapConfigId,
        o = [];
      if (
        (e?.forEach((e) => {
          e.MapId === r && o.push(e);
        }),
        t?.forEach((e) => {
          e.MapId === r && o.push(e);
        }),
        0 < o.length)
      ) {
        let i = o[0],
          a = Number.MAX_VALUE;
        const n = ModelManager_1.ModelManager.WorldMapModel.GetPlayerPosition();
        return (
          o.forEach((e, t) => {
            var r = Vector_1.Vector.Create(e.TrackTarget),
              r = Vector_1.Vector.Dist(n, r);
            r < a && ((a = r), (i = e));
          }),
          [i.MarkId, i.MarkType]
        );
      }
      return this.GetSoundBoxDetectMark();
    }
  }
  IsConfigMarkIdUnlock(e) {
    var t = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(e);
    return (
      !!t &&
      !!ModelManager_1.ModelManager.MapModel.IsMarkIdExist(t.ObjectType, e) &&
      ((e = this.BDi(t)), (t = this.bDi(t)), e) &&
      t
    );
  }
  BDi(e) {
    return 1 === e.FogShow || this.CheckFogUnlocked(e.FogHide);
  }
  bDi(e) {
    var t = e.ShowCondition,
      e = e.MarkId;
    return t < 0
      ? this.GetMarkExtraShowState(e).IsShow
      : 0 === t || this.IsMarkUnlockedByServer(e);
  }
  RemoveMapMark(e, t) {
    var r;
    this.EDi &&
      void 0 !== e &&
      void 0 !== t &&
      (r = this.EDi.get(e)) &&
      ((r = r.delete(t)), this.TDi?.delete(t), r) &&
      (MapLogger_1.MapLogger.Debug(
        63,
        "标记系统->RemoveMapMark",
        ["markType", e],
        ["markId", t],
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RemoveMapMark,
        e,
        t,
      ));
  }
  RemoveMapMarkByType(e) {
    var t = this.GetMarkByType(e);
    if (void 0 !== t && 0 < t.size) {
      var r = new Set();
      for (const a of t.values()) {
        var i = a.MarkId;
        r.add(i);
      }
      for (const o of r) this.RemoveMapMark(e, o);
    }
  }
  RemoveMapMarksByConfigId(e, t) {
    if (this.EDi && void 0 !== e && void 0 !== t) {
      t = this.EDi.get(e);
      if (t) {
        var r,
          i,
          a = [];
        for ([r, i] of t) i.MarkType === e && a.push(r);
        for (const o of a) this.RemoveMapMark(e, o);
      }
    }
  }
  RemoveDynamicMapMark(e) {
    var t = this.TDi?.get(e);
    t
      ? this.RemoveMapMark(t?.MarkType, t?.MarkId)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Map", 63, "找不到mark id:", ["markId", e]);
  }
  UpdateCustomMarkInfo(e, t) {
    var r;
    this.EDi &&
      ((r = this.EDi.get(9))
        ? (r.get(e).TrackTarget = t)
        : Log_1.Log.CheckError() && Log_1.Log.Error("Map", 63, "找不到markId"));
  }
  ReplaceCustomMarkIcon(e, t) {
    var r;
    this.EDi &&
      (r = this.EDi.get(9)) &&
      (r = r.get(e)) &&
      ((r.MarkConfigId = t),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.MapReplaceMarkResponse,
        9,
        e,
        t,
      ));
  }
  SpawnDynamicMarkId() {
    return --this.MDi;
  }
  UnlockTeleports(e, t = !1) {
    if ((t && this.LDi.clear(), !(e.length <= 0))) {
      var r = new Array();
      for (const a of e) {
        var i = TeleporterById_1.configTeleporterById.GetConfig(a);
        i && r.push(i);
      }
      for (const o of r)
        o.TeleportEntityConfigId &&
          ControllerHolder_1.ControllerHolder.CreatureController.ChangeLockTagByTeleportPbDataId(
            o.TeleportEntityConfigId,
            1196894179,
          ),
          this.LDi.set(o.Id, !0),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.UnlockTeleport,
            o.Id,
          );
    }
  }
  CheckTeleportUnlocked(e) {
    return this.LDi.get(e);
  }
  GetAllUnlockedFogs() {
    return this.Nhl;
  }
  GetAllUnlockedAreas() {
    return this.DDi;
  }
  AddUnlockedFogs(e) {
    this.Nhl.set(e, !0),
      this.Fhl(e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.MapOpenFogChange,
        e,
      );
  }
  FullUpdateUnlockedFogs(e) {
    this.Nhl.clear(), this.DDi.clear();
    for (const t of e) this.Nhl.set(t, !0), this.Fhl(t);
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.MapOpenFogFullUpdate,
      this.Nhl,
    );
  }
  Fhl(e) {
    e = ConfigManager_1.ConfigManager.WorldMapConfig.GetMapFogConfig(e);
    e && this.DDi.set(e.AreaId, !0);
  }
  CheckAreasUnlocked(e, t = !0) {
    return !(0 !== e || !t) || (this.DDi.get(e) ?? !1);
  }
  CheckFogUnlocked(e) {
    return 0 === e || (this.Nhl.get(e) ?? !1);
  }
  IsMarkFogUnlock(e) {
    e = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(e);
    return (
      void 0 !== e &&
      (1 === e.FogShow ||
        ModelManager_1.ModelManager.MapModel.CheckFogUnlocked(e?.FogHide))
    );
  }
  SetUnlockMultiMapIds(e) {
    this.UnlockMultiMapIds = e;
  }
  SetUnlockMapBlockIds(e) {
    (this.UnlockMapBlockIds = e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.MiniMapForceUpdate,
      );
  }
  CheckUnlockMultiMapIds(e) {
    return this.UnlockMultiMapIds.includes(e);
  }
  CheckUnlockMapBlockIds(e, t, r) {
    let i = 0;
    var a = [];
    for (const n of this.UnlockMapBlockIds ?? []) {
      var o =
        ConfigManager_1.ConfigManager.MapConfig.GetUnlockMapTileConfigById(n);
      void 0 !== o &&
        o.Block === e &&
        o.GravityFlip === t &&
        o.MapConfigId === r &&
        a.push(o);
    }
    return (
      0 < a.length &&
        (a.sort((e, t) => t.Priority - e.Priority), (i = a[0].Id)),
      i
    );
  }
  CheckIsInMultiMapWithAreaId(e) {
    let t = 0;
    for (const r of ConfigManager_1.ConfigManager.MapConfig?.GetAllSubMapConfig())
      if (r.Area.includes(e)) {
        t = r.Id;
        break;
      }
    return t;
  }
  AddEntityIdToPendingList(e, t) {
    this.ADi.set(e, t);
  }
  RemoveEntityIdToPendingList(e) {
    this.ADi.delete(e);
  }
  GetEntityPendingList() {
    return this.ADi;
  }
  IsInMapPolygon(e) {
    if (!this.CurrentInWorld) return !0;
    this.LastSafeLocation.IsNearlyZero() && this.LastSafeLocation.DeepCopy(e);
    var t =
        ModelManager_1.ModelManager.GameModeModel.InstanceDungeon.MapConfigId,
      r = ModelManager_1.ModelManager.GameModeModel.InstanceDungeon.Id,
      t = UnopenedAreaController_1.UnopenedAreaController.OnCheckUnopenedArea(
        e,
        t,
        r,
      );
    return t && this.LastSafeLocation.DeepCopy(e), t;
  }
  GetLastSafeLocation() {
    return this.LastSafeLocation;
  }
  IsInUnopenedAreaPullback() {
    return (
      !!ModelManager_1.ModelManager.GameModeModel.WorldDone &&
      !ModelManager_1.ModelManager.GameModeModel.IsTeleport &&
      !!ModelManager_1.ModelManager.MapModel.CurrentInWorld &&
      UnopenedAreaController_1.UnopenedAreaController.CheckInPullback()
    );
  }
  SetMarkExtraShowState(e, t, r, i) {
    return (
      this.UDi.set(e, { Id: e, IsShow: t, NeedFocus: r, ShowFlag: i }),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnMarkItemShowStateChange,
        e,
      ),
      r
    );
  }
  GetMarkExtraShowState(e) {
    let t = this.UDi.get(e);
    void 0 === t &&
      (t = {
        Id: e,
        IsShow: !1,
        NeedFocus: !1,
        ShowFlag: Protocol_1.Aki.Protocol.U5s.Proto_ShowNormal,
      });
    var r = this.GetMarkTypeByMarkId(e);
    return (
      void 0 !== r &&
        this.IsMarkForbidGravityTeleport(e, r) &&
        (t.ShowFlag = Protocol_1.Aki.Protocol.U5s.Proto_ShowDisable),
      t
    );
  }
  IsMarkForbidGravityTeleport(e, t) {
    var r = this.GetMarkMapConfigId(e, t);
    return (
      2 === this.GetMarkMapGravity(e, t) &&
      ModelManager_1.ModelManager.WorldMapModel.IsGravityMap(r) &&
      ModelManager_1.ModelManager.OnlineModel.GetIsTeamModel() &&
      this.IsMarkCanTeleport(e, t)
    );
  }
  IsMarkCanTeleport(e, t) {
    return (
      5 === t ||
      6 === t ||
      (void 0 !==
        (t = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(e)) &&
        1 === t.EnableQuickTransfer)
    );
  }
  GetCurMapBorderConfig(t, r, i, a) {
    var e = this.GetCurMapBorderByFilterFunc((e) => {
      var t = e.InstanceDungeonId === r && e.GravityFlip === a;
      return 0 !== e.instanceDungeonIdMapType
        ? t && e.instanceDungeonIdMapType === i
        : t;
    });
    return void 0 !== e
      ? e
      : (this.GetCurMapBorderByFilterFunc(
          (e) =>
            e.MapId === t && e.GravityFlip === a && 0 === e.InstanceDungeonId,
        ) ??
          ConfigManager_1.ConfigManager.MapConfig.GetMapBorderConfig(
            MapDefine_1.DEFAULT_MAP_BORDER_ID,
            t,
          ));
  }
  GetCurMapBorderByFilterFunc(e) {
    let t = void 0;
    for (const i of ConfigManager_1.ConfigManager.MapConfig.GetMapBorderConfigList()) {
      var r = i.ConditionId;
      if (e(i)) {
        let e = !1;
        if (
          !(e =
            0 === r ||
            ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckCondition(
              r.toString(),
              void 0,
              !1,
            ))
        )
          break;
        t = i;
      }
    }
    return t;
  }
  ForceSetMarkVisible(e, t, r) {
    let i = this.SDi.get(e);
    void 0 === i && ((i = new Map()), this.SDi.set(e, i)), i.set(t, r);
  }
  GetMarkForceVisible(e, t) {
    let r = !0;
    e = this.SDi.get(e);
    return (r = e && e.has(t) ? (e.get(t) ?? !1) : r);
  }
  AddOccupationInfo(e) {
    var t = ConfigManager_1.ConfigManager.QuestNewConfig.GetNewOccupationConfig(
      e.qEs,
    );
    if (
      t &&
      t.OccupationData &&
      !StringUtils_1.StringUtils.IsEmpty(t.OccupationData) &&
      "Empty" !== t.OccupationData
    ) {
      t = Json_1.Json.Parse(t.OccupationData);
      if (t) {
        t = t.LevelPlayIds;
        for (const r of t)
          this.yDi.set(r, MathUtils_1.MathUtils.LongToBigInt(e.w5n));
        this.IDi.set(e.qEs, t);
      }
    }
  }
  RemoveOccupationInfo(e) {
    if (this.IDi.has(e)) {
      var t = this.IDi.get(e);
      this.IDi.delete(e);
      for (const r of t) this.yDi.delete(r);
    }
  }
  IsLevelPlayOccupied(e) {
    e = this.yDi.get(e);
    return { IsOccupied: !!e, QuestId: e };
  }
  IsMarkUnlockedByServer(e) {
    return this.PDi.get(e) ?? !1;
  }
  SetMarkServerOpenState(e, t) {
    this.PDi.set(e, t);
  }
  GetMarkAreaText(e, t) {
    e =
      ConfigManager_1.ConfigManager.MapConfig.GetEntityConfigByMapIdAndEntityId(
        e,
        t,
      )?.AreaId ?? 0;
    return this.GetMarkAreaTextByAreaId(e);
  }
  GetMarkAreaTextByAreaId(e) {
    var t = ConfigManager_1.ConfigManager.AreaConfig.GetParentAreaId(e),
      e = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(e),
      r = e
        ? ConfigManager_1.ConfigManager.AreaConfig.GetAreaLocalName(e.Title)
        : "",
      t = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(t),
      i = t
        ? ConfigManager_1.ConfigManager.AreaConfig.GetAreaLocalName(t.Title)
        : "",
      e = e
        ? ConfigManager_1.ConfigManager.InfluenceConfig.GetCountryTitle(
            e.CountryId,
          )
        : "",
      a = t?.Level ?? 0;
    return 0 === t?.Father || a <= 0 ? e + "-" + r : e + `-${i}-` + r;
  }
  UpdateBoxSlotInfo(e) {
    this.Wcl.set(e.T7n, e);
  }
  RemoveBoxSlotInfo(e) {
    for (var [, t] of this.Wcl)
      if (t.b7n === e) {
        this.Wcl.delete(t.T7n);
        break;
      }
  }
  FullUpdateBoxSlotInfo(e) {
    this.Wcl.clear();
    for (const t of e) this.UpdateBoxSlotInfo(t);
  }
  GetBoxSlotInfoByMarkId(e) {
    for (var [, t] of this.Wcl) if (t.T7n === e) return t;
  }
  UpdateTemporaryTeleportInfo(e) {
    this.Qcl.set(e.T7n, e);
    var t = this.GetDynamicMark(e.T7n);
    t &&
      ((t.TeleportId = MathUtils_1.MathUtils.LongToNumber(e.R7n)), e.Hac) &&
      (t.AreaId = e.Hac);
  }
  RemoveTemporaryTeleportInfo(e) {
    for (var [, t] of this.Qcl)
      if (t.T7n === e) {
        this.Qcl.delete(t.T7n);
        break;
      }
  }
  FullUpdateTemporaryTeleportInfo(e) {
    this.Qcl.clear();
    for (const t of e) this.UpdateTemporaryTeleportInfo(t);
  }
  GetDungeonMapConfigId(e) {
    var t;
    return 0 === e ||
      void 0 ===
        (t = ConfigManager_1.ConfigManager.WorldMapConfig.GetDungeonConfig(e))
      ? e
      : t.MapConfigId;
  }
  GetDungeonLocateWorldMapId(e) {
    if (0 !== e) {
      e = ConfigManager_1.ConfigManager.WorldMapConfig.GetDungeonConfig(e);
      if (void 0 !== e)
        return (12 === e.InstSubType ? this.GetDungeonEntranceConfig(e) : e)
          .MapConfigId;
    }
  }
  GetDungeonLocateWorldMapLocation(e, t) {
    if (0 !== t) {
      var r,
        i,
        t = ConfigManager_1.ConfigManager.WorldMapConfig.GetDungeonConfig(t);
      if (void 0 !== t)
        return 12 === t.InstSubType
          ? void 0 !== (r = this.GetDungeonEntranceConfig(t))
            ? ((i = t.EntranceEntities[0].EntranceEntityId),
              ModelManager_1.ModelManager.WorldMapModel.GetEntityPosition(
                i,
                r.MapConfigId,
              ))
            : void 0
          : ModelManager_1.ModelManager.WorldMapModel.GetEntityPosition(
              e,
              t.MapConfigId,
            );
    }
  }
  GetDungeonExitLocation(e, t) {
    if (0 !== t) {
      var r,
        t = ConfigManager_1.ConfigManager.WorldMapConfig.GetDungeonConfig(t);
      if (void 0 !== t)
        return 12 === t.InstSubType
          ? ((r = t.ExitEntities[0]),
            ModelManager_1.ModelManager.WorldMapModel.GetEntityPosition(
              r,
              t.MapConfigId,
            ))
          : ModelManager_1.ModelManager.WorldMapModel.GetEntityPosition(
              e,
              t.MapConfigId,
            );
    }
  }
  GetDungeonEntranceConfig(e) {
    var t, r;
    if (!(e.EntranceEntities.length < 1))
      return (
        (t = e.EntranceEntities[0].DungeonId),
        void 0 ===
          (r =
            ConfigManager_1.ConfigManager.WorldMapConfig.GetDungeonConfig(t)) &&
          MapLogger_1.MapLogger.ErrorOnce(
            e.Id,
            63,
            "世界副本查找入口实体失败->入口副本配置为空",
            ["副本Id", e.Id],
            ["entranceDungeonId", t],
          ),
        r
      );
    MapLogger_1.MapLogger.ErrorOnce(
      e.Id,
      63,
      "世界副本查找入口实体失败->实体列表为空",
      ["副本Id", e.Id],
    );
  }
  GetMarkMapConfigId(e, t) {
    t = this.GetMark(t, e);
    return void 0 === t
      ? (ConfigManager_1.ConfigManager.MapConfig.SearchMarkConfig(e)?.MapId ??
          MapDefine_1.BIG_WORLD_MAP_ID)
      : (t.MapId ?? MapDefine_1.BIG_WORLD_MAP_ID);
  }
  GetMarkMapGravity(e, t) {
    t = this.GetMark(t, e);
    return void 0 === t
      ? (ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(e)
          ?.GravityFlip ?? 1)
      : (t.MapGravity ?? 1);
  }
  get CurrentMapConfigId() {
    var e = ModelManager_1.ModelManager.GameModeModel.InstanceDungeon;
    return 0 !== e.ViewMapId ? e.ViewMapId : e.MapConfigId;
  }
  GetDungeonWorldMapConfigId(e) {
    var t = ConfigManager_1.ConfigManager.WorldMapConfig.GetDungeonConfig(e);
    return void 0 !== t && 0 !== t.ViewMapId
      ? t.ViewMapId
      : (this.GetDungeonLocateWorldMapId(e) ?? t.MapConfigId);
  }
  get CurrentWorldMapConfigId() {
    var e = ModelManager_1.ModelManager.GameModeModel.InstanceDungeon;
    return 0 !== e.ViewMapId
      ? e.ViewMapId
      : (this.GetDungeonLocateWorldMapId(e.Id) ?? e.MapConfigId);
  }
  get CurrentInWorld() {
    var e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    return ConfigManager_1.ConfigManager.WorldMapConfig.IsDungeonInWorld(e);
  }
  get CurrentPlayerGravity() {
    return Global_1.Global.BaseCharacter?.CharacterActorComponent?.MoveComp
      ?.IsStandardGravity
      ? 1
      : 2;
  }
  get CurrentPlayerGravityDirection() {
    return Global_1.Global.BaseCharacter?.CharacterActorComponent?.MoveComp
      ?.GravityDirect;
  }
  get IsPlayerInStandardGravity() {
    return 1 === this.CurrentPlayerGravity;
  }
  GetInstanceIdByWorldMapId(e) {
    return e !== ModelManager_1.ModelManager.MapModel.CurrentWorldMapConfigId &&
      ConfigManager_1.ConfigManager.WorldMapConfig.IsMapInWorld(e)
      ? e
      : ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
  }
  AddMarkHideInfo(e) {
    var t = this.GetMarkHideInfoKey(e.w7n, e.A5n);
    this.kd1.set(t, e);
  }
  ClearMarkHideInfo() {
    this.kd1.clear();
  }
  GetMarkHideInfoKey(e, t) {
    return e + "_" + t;
  }
  IsMarkHideByServer(e, t) {
    (e = this.GetMarkHideInfoKey(e, t)), (t = this.kd1.get(e));
    return void 0 !== t && !StringUtils_1.StringUtils.IsEmpty(t.ed1);
  }
  GetMarkHideReason(e, t) {
    (e = this.GetMarkHideInfoKey(e, t)), (t = this.kd1.get(e));
    if (void 0 !== t?.ed1) return this.ParseHideReason(t?.ed1);
  }
  ParseHideReason(e) {
    if ("d" === e.toLowerCase())
      return ConfigManager_1.ConfigManager.TextConfig.GetMultiText(
        "Mark_Occupied_Not_Refresh_Text",
      );
    var e = e.split("_"),
      t = e[0].toLowerCase(),
      e = Number(e[1]);
    if ("q" === t)
      return (
        (r = ModelManager_1.ModelManager.QuestNewModel.GetQuestName(e)),
        ConfigManager_1.ConfigManager.TextConfig.GetMultiText(
          "Mark_Quest_Occupied_Text",
          r,
        )
      );
    if ("l" === t) {
      var r = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfo(e);
      if (void 0 !== r)
        return (
          (t = r.Name),
          ConfigManager_1.ConfigManager.TextConfig.GetMultiText(
            "Mark_Play_Occupied_Text",
            t,
          )
        );
    }
  }
}
exports.MapModel = MapModel;
//# sourceMappingURL=MapModel.js.map
