"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldMapModel = void 0);
const Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  Time_1 = require("../../../Core/Common/Time"),
  TrimLru_1 = require("../../../Core/Container/TrimLru"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  LocalStorage_1 = require("../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiManager_1 = require("../../Ui/UiManager"),
  MapUtil_1 = require("../Map/MapUtil"),
  MapLogger_1 = require("../Map/Misc/MapLogger"),
  WorldMapAxisInteractValidation_1 = require("./WorldMapAxisInteractValidation");
class WorldMapModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.LevelEventDisableFlag = !1),
      (this.CustomMarkSize = 0),
      (this.MapScale = -0),
      (this.MapScaleMin = -0),
      (this.MapScaleMax = -0),
      (this.zNl = !0),
      (this.JNl = !0),
      (this.ghl = void 0),
      (this.CurrentFocalMarkType = 0),
      (this.CurrentFocalMarkId = 0),
      (this.WorldMapId = void 0),
      (this.WorldMapCurrentMultiMapId = void 0),
      (this.LastBigSceneMiniMapInfo = void 0),
      (this.IsBattleViewOpen = !1),
      (this.WorldMapAxisInteractValidation =
        new WorldMapAxisInteractValidation_1.WorldMapAxisInteractValidation()),
      (this.NDl = new Map()),
      (this.FDl = new Map()),
      (this.sGl = 0),
      (this.MapRangeInfo = void 0),
      (this.NavigateMarkShowRangeInfo = void 0),
      (this.EnableInstanceDungeonFilterMark = !1),
      (this.ESc = new TrimLru_1.TrimLru(3e3)),
      (this.ISc = void 0),
      (this.PendingOpenWorldMapQuestId = void 0),
      (this.p3o = void 0),
      (this.GEr = !1);
  }
  get CustomMarksIsShow() {
    return this.zNl;
  }
  get CompletedPlayPointMarkIsShow() {
    return this.JNl;
  }
  get WaitToTeleportMarkConfigId() {
    return this.ghl;
  }
  set WaitToTeleportMarkConfigId(e) {
    this.ghl = e;
  }
  OnInit() {
    return (
      (this.CustomMarkSize =
        ConfigManager_1.ConfigManager.WorldMapConfig.GetCommonValue(
          "custom_mark_size",
        )),
      this.ResetMapScale(),
      this.WorldMapAxisInteractValidation.Init(),
      (this.sGl =
        1e3 *
        (CommonParamById_1.configCommonParamById.GetFloatConfig(
          "SoundBoxSfxCoolTime",
        ) ?? 0)),
      (this.WorldMapId = void 0),
      (this.LastBigSceneMiniMapInfo = void 0),
      (this.JNl = LocalStorage_1.LocalStorage.GetGlobal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.IsShowFinishedPlayPointMark,
        !0,
      )),
      (this.zNl = LocalStorage_1.LocalStorage.GetGlobal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.IsShowCustomMark,
        !0,
      )),
      !0
    );
  }
  OnClear() {
    return (
      this.WorldMapAxisInteractValidation.Clear(),
      this.NDl.clear(),
      this.FDl.clear(),
      MapLogger_1.MapLogger.Clear(),
      !0
    );
  }
  OnLeaveLevel() {
    return !0;
  }
  ResetMapScale() {
    this.MapScale =
      (ConfigManager_1.ConfigManager.WorldMapConfig.GetAkiMapConfig(1)
        ?.BigMapDefaultScale ?? 0) / 100;
    var e = ConfigManager_1.ConfigManager.WorldMapConfig.GetAkiMapConfig(1);
    e &&
      ((this.MapScaleMax = e.BigMapMaxScale / e.BigMapDefaultScale),
      (this.MapScaleMin = e.BigMapMinScale / e.BigMapDefaultScale));
  }
  GetEntityPosition(e, r) {
    var t = r + "_" + e;
    let o = this.ESc.Get(t);
    var a = Vector_1.Vector.Create();
    return (
      o
        ? a.FromUeVector(o)
        : ((r =
            ConfigManager_1.ConfigManager.MapConfig.GetEntityConfigByMapIdAndEntityId(
              r,
              e,
            )?.Transform[0]),
          (o = r
            ? Vector_1.Vector.Create(r.X, r.Y, r.Z)
            : Vector_1.Vector.Create(0, 0, 0)),
          this.ESc.Put(t, o),
          a.FromUeVector(o)),
      a
    );
  }
  GetEntityAreaId(e, r) {
    return (
      ModelManager_1.ModelManager.CreatureModel.GetEntityData(e, r)?.AreaId ?? 0
    );
  }
  UpdateAreaExploreInfo(e) {
    if (e) {
      var r = new Array();
      for (const t of e.HVn)
        r.push({ ExploreProgressId: t.qPs, ExplorePercent: t.BPs });
      this.p3o = { AreaId: e.p6n, ExploreProgress: r, ExplorePercent: e.BPs };
    }
  }
  GetAreaExploreInfo() {
    return this.p3o;
  }
  RecordPlaySoundMarkSfx(e) {
    var r = Time_1.Time.ServerStopTimeStamp;
    this.NDl.set(e, r);
  }
  SetPlaySoundMarkSfxForbidden(e, r) {
    this.FDl.set(e, r);
  }
  IsSoundMarkSfxCoolingDown(e) {
    var e = this.NDl.get(e) ?? 0,
      r = this.sGl;
    return Time_1.Time.ServerStopTimeStamp - e <= r;
  }
  IsSoundMarkSfxForbidden(e) {
    return this.FDl.get(e) ?? !1;
  }
  SetCompletedPlayPointMarkShow(e) {
    return (
      this.JNl !== e &&
      ((this.JNl = e),
      LocalStorage_1.LocalStorage.SetGlobal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.IsShowFinishedPlayPointMark,
        e,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.ToggleShowCompletedPlayMark,
        e,
      ),
      !0)
    );
  }
  SetCustomMarksShow(e) {
    return (
      this.zNl !== e &&
      ((this.zNl = e),
      LocalStorage_1.LocalStorage.SetGlobal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.IsShowCustomMark,
        e,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.ToggleShowCustomMark,
        e,
      ),
      !0)
    );
  }
  GetPlayerPosition() {
    var e;
    return ModelManager_1.ModelManager.MapModel.CurrentInWorld
      ? (e =
          ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(
            3,
          ))
        ? Vector_1.Vector.Create(e.ActorLocationProxy)
        : Vector_1.Vector.Create()
      : MapUtil_1.MapUtil.GetLastBigScenePlayerPosition();
  }
  IsPlayerInInstanceDungeon() {
    var e = ModelManager_1.ModelManager.GameModeModel.InstanceDungeon?.InstType,
      r =
        ModelManager_1.ModelManager.GameModeModel.InstanceDungeon?.InstSubType;
    return !(
      e === Protocol_1.Aki.Protocol.i4s.Proto_BigWorldInstance && 13 === r
    );
  }
  IsPlayerInWorldInstanceDungeon() {
    var e = ModelManager_1.ModelManager.GameModeModel.InstanceDungeon?.InstType,
      r =
        ModelManager_1.ModelManager.GameModeModel.InstanceDungeon?.InstSubType;
    return e === Protocol_1.Aki.Protocol.i4s.Proto_BigWorldInstance && 12 === r;
  }
  IsPlayerInBigWorldInstanceDungeon() {
    return (
      ModelManager_1.ModelManager.GameModeModel.InstanceDungeon?.InstType ===
      Protocol_1.Aki.Protocol.i4s.Proto_BigWorldInstance
    );
  }
  IsPlayerInStoryInstanceDungeon() {
    var e = ModelManager_1.ModelManager.GameModeModel.InstanceDungeon?.InstType,
      r =
        ModelManager_1.ModelManager.GameModeModel.InstanceDungeon?.InstSubType,
      r = 1 === r || 2 === r || 0 === r;
    return e === Protocol_1.Aki.Protocol.i4s.Proto_NormalInstance && r;
  }
  IsPlayerInActivityInstanceDungeon() {
    return (
      !this.IsPlayerInBigWorldInstanceDungeon() &&
      !this.IsPlayerInStoryInstanceDungeon()
    );
  }
  InstIsType(e, r, t) {
    e = ConfigManager_1.ConfigManager.WorldMapConfig.GetDungeonConfig(e);
    return e?.InstType === r && e?.InstSubType === t;
  }
  CheckGamePlayIsTracked(e) {
    var r, t;
    return (
      !!this.NavigateMarkShowRangeInfo &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "World",
          69,
          "检查玩法是否需要追踪",
          ["playInfo-playId", e.Id],
          ["NavigateMarkShowRangeInfo", this.NavigateMarkShowRangeInfo],
        ),
      this.NavigateMarkShowRangeInfo.GamePlayId === e.Id) &&
      !UiManager_1.UiManager.IsViewOpen("WorldMapView") &&
      ((e = this.NavigateMarkShowRangeInfo.MarkId),
      (r = this.NavigateMarkShowRangeInfo.MarkType),
      (t = this.NavigateMarkShowRangeInfo.ExploreTypeName),
      (t = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(t, t)),
      (this.NavigateMarkShowRangeInfo.IsDiscover = !0),
      ModelManager_1.ModelManager.MapModel.CreateTempMapMark(e),
      ControllerHolder_1.ControllerHolder.MapController.RequestTrackMapMark({
        MarkType: r,
        MarkId: e,
        Track: !0,
      }),
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(
        "PlayPointFind_Text",
        t,
      ),
      !0)
    );
  }
  get CurrentWorldMapConfigId() {
    return (
      this.WorldMapId ?? ModelManager_1.ModelManager.MapModel.CurrentMapConfigId
    );
  }
  get CurrentWorldMapInstanceId() {
    return void 0 === this.WorldMapId ||
      this.WorldMapId ===
        ModelManager_1.ModelManager.MapModel.CurrentMapConfigId
      ? ModelManager_1.ModelManager.CreatureModel.GetInstanceId()
      : this.WorldMapId;
  }
  GetCurrentLocateWorldMapInstanceId(e) {
    return void 0 === this.WorldMapId
      ? ModelManager_1.ModelManager.CreatureModel.GetInstanceId()
      : this.WorldMapId ===
          ModelManager_1.ModelManager.MapModel.CurrentWorldMapConfigId
        ? e &&
          (e = ModelManager_1.ModelManager.MapModel.GetDungeonEntranceConfig(
            ModelManager_1.ModelManager.GameModeModel.InstanceDungeon,
          ))
          ? e.Id
          : ModelManager_1.ModelManager.CreatureModel.GetInstanceId()
        : this.WorldMapId;
  }
  SearchMarkMapConfigId(e) {
    return (
      ConfigManager_1.ConfigManager.MapConfig.SearchMarkConfig(e)?.MapId ??
      ModelManager_1.ModelManager.WorldMapModel.CurrentWorldMapConfigId
    );
  }
  get WorldMapGravity() {
    return (
      this.ISc ?? ModelManager_1.ModelManager.MapModel.CurrentPlayerGravity
    );
  }
  set WorldMapSelectGravity(e) {
    this.ISc = e;
  }
  get WorldMapSelectGravity() {
    return this.ISc;
  }
  SetWorldMapSelectedGravity(e, r) {
    return (
      (this.WorldMapSelectGravity = this.GetFinalWorldMapGravity(e, r)),
      this.WorldMapSelectGravity
    );
  }
  GetFinalWorldMapGravity(e, r) {
    return this.IsGravityMap(e)
      ? void 0 !== r && 0 !== r
        ? r
        : ModelManager_1.ModelManager.MapModel.CurrentPlayerGravity
      : 1;
  }
  IsGravityMap(e) {
    e = ConfigManager_1.ConfigManager.WorldMapConfig.GetAkiMapConfig(e, !1);
    return void 0 !== e && e.IsGravityMap;
  }
  set EnableDebug(e) {
    this.GEr = e;
  }
  get EnableDebug() {
    return !Info_1.Info.IsBuildShipping && this.GEr;
  }
}
exports.WorldMapModel = WorldMapModel;
//# sourceMappingURL=WorldMapModel.js.map
