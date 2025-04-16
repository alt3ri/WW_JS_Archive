"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExploreProgressModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  LocalStorage_1 = require("../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  MapUtil_1 = require("../Map/MapUtil"),
  ExploreCountryData_1 = require("./ExploreCountryData"),
  ExploreProgressDefine_1 = require("./ExploreProgressDefine");
class ExploreProgressModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.YVt = new Map()),
      (this.QVt = new Map()),
      (this.JVt = []),
      (this.SelectedCountryId = 0),
      (this.SelectedAreaId = 0),
      (this.AOl = new Map()),
      (this.DOl = new Set()),
      (this.ROl = !1),
      (this.OnlinePlayersAreaMap = new Map()),
      (this.TrackTaskAreaId = 0),
      (this.TrackTaskIconPath = ""),
      (this.E8l = void 0),
      (this.IQl = new Set());
  }
  get GetIsRedDotAreaRewardBox() {
    return this.ROl;
  }
  OnClear() {
    return this.ClearExploreAreaData(), !0;
  }
  OnLeaveLevel() {
    return this.ClearExploreAreaData(), !0;
  }
  InitializeExploreAreaData() {
    var e = ConfigManager_1.ConfigManager.InfluenceConfig.GetCountryList(),
      t = ConfigManager_1.ConfigManager.AreaConfig;
    this.JVt.length = 0;
    for (const s of e) {
      var r = new ExploreCountryData_1.ExploreCountryData(),
        a =
          (r.Initialize(s),
          this.YVt.set(s.Id, r),
          t.GetAreaConfigByCountryAndLevel(
            s.Id,
            ExploreProgressDefine_1.AREA_LEVEL,
          ));
      for (const n of a) {
        var o = n.AreaId,
          i = r.AddExploreAreaData(n);
        this.QVt.set(o, i), this.JVt.push(o);
      }
      r.UpdateStateAreaDataListSort();
    }
  }
  InitializeCurrentCountryIdAndAreaId() {
    var e = ModelManager_1.ModelManager.AreaModel,
      e =
        ((this.SelectedCountryId = e.GetAreaCountryId() ?? 0),
        this.SelectedCountryId <= 0 &&
          ((this.SelectedCountryId =
            ExploreProgressDefine_1.DEFAULT_COUNTRY_ID),
          Log_1.Log.CheckInfo()) &&
          Log_1.Log.Info(
            "ExploreProgress",
            63,
            "初始化所有探索度区域数据时，找不到所在国家则选中皇龙",
            ["CountryId", this.SelectedCountryId],
          ),
        MapUtil_1.MapUtil.GetWorldMapLevelOneAreaId());
    this.GetExploreAreaData(e)
      ? (this.SelectedAreaId = e)
      : ((e = this.GetExploreCountryData(
          this.SelectedCountryId,
        ).GetExploreAreaDataList()),
        (this.SelectedAreaId = e[0].AreaId),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "ExploreProgress",
            63,
            "初始化所有探索度区域数据时，若玩家当前所在区域没有在对应区域探索数据，则选中当前国家的第一个区域",
            ["AreaId", this.SelectedAreaId],
          ));
  }
  ClearExploreAreaData() {
    this.YVt.clear(), this.QVt.clear(), (this.JVt.length = 0);
  }
  RefreshExploreAreaData(e) {
    this.QVt.get(e.p6n)?.Refresh(e);
  }
  GetExploreCountryData(e) {
    return this.YVt.get(e);
  }
  GetExploreAreaData(e) {
    return this.QVt.get(e);
  }
  GetExploreCountryDataMap() {
    return this.YVt;
  }
  GetExploreCountryDataList() {
    return Array.from(this.YVt.values());
  }
  GetAllAreaDataListSortCountryState() {
    var e,
      t = [];
    for ([, e] of this.YVt)
      for (const r of e.GetStateDataList()) t.push(...r.ExploreAreaDataList);
    return t;
  }
  GetAllAreaIdList() {
    return this.JVt;
  }
  InitAreaStageRewardIdToAreaIdMap() {
    if (!(0 < this.AOl.size))
      for (const e of ConfigManager_1.ConfigManager.ExploreProgressConfig.GetAreaStageRewardConfigList())
        this.AOl.set(e.Id, e.Area);
  }
  UpdateAreaStageRewardDataList(e) {
    this.InitAreaStageRewardIdToAreaIdMap();
    for (const r of e) {
      var t = this.AOl.get(r);
      void 0 !== t && this.GetExploreAreaData(t)?.UpdateAchievedStageReward(r),
        this.DOl.add(r);
    }
    this.POl(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RedDotUpdateMapAreaBoxReward,
      );
  }
  IsAreaStageRewardIdAchieved(e) {
    return this.DOl.has(e);
  }
  GetCurrentCountryData() {
    return this.GetExploreCountryData(this.SelectedCountryId);
  }
  POl() {
    for (const e of this.JVt)
      if (this.GetExploreAreaData(e)?.HasCanTakeStageReward())
        return void (this.ROl = !0);
    this.ROl = !1;
  }
  SureHasAreaRewardBox() {
    this.ROl = !0;
  }
  IsCollectAllStageReward() {
    return this.JVt.every(
      (e) => !!this.GetExploreAreaData(e)?.IsCollectAllStageReward(),
    );
  }
  UpdatePlayPointState(e, t) {
    this.GetExploreAreaData(e)?.UpdatePlayPointData(t);
  }
  UpdateOnlinePlayersArea(e) {
    this.OnlinePlayersAreaMap.clear();
    for (var [t, r] of Object.entries(e))
      this.OnlinePlayersAreaMap.set(parseInt(t), r);
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.UpdateOnlinePlayersArea,
    );
  }
  GetOnlinePlayersArea(e) {
    return this.OnlinePlayersAreaMap.get(e);
  }
  GetOnlinePlayerIndexListByAreaId(r) {
    const a = [];
    return (
      this.OnlinePlayersAreaMap.forEach((e, t) => {
        ConfigManager_1.ConfigManager.AreaConfig.GetLevelOneAreaId(e) === r &&
          (e =
            ModelManager_1.ModelManager.OnlineModel?.GetCurrentTeamListById(t))
            ?.PlayerNumber &&
          a.push(e.PlayerNumber);
      }),
      a
    );
  }
  SetTrackTaskAreaId(e, t) {
    (this.TrackTaskAreaId = e), (this.TrackTaskIconPath = t);
  }
  ClearTrackTaskAreaId() {
    (this.TrackTaskAreaId = 0), (this.TrackTaskIconPath = "");
  }
  ClearTrackExploreAreaItemData() {
    this.E8l = void 0;
  }
  CheckTrackExploreAreaItemData() {
    this.E8l &&
      (this.E8l.TrackPlayPoint(), this.ClearTrackExploreAreaItemData());
  }
  SetTrackExploreAreaItemData(e, t) {
    var r;
    t
      ? (r = this.GetExploreAreaData(e)) &&
        (this.E8l = r.GetExploreAreaItemData(t))
      : (this.E8l = e);
  }
  WorldMapViewClose() {
    this.ClearTrackExploreAreaItemData(), this.D7l();
  }
  D7l() {
    var e = MapUtil_1.MapUtil.GetWorldMapLevelOneAreaId(),
      e = this.GetExploreAreaData(e);
    e?.SaveLocalAreaExplorePlayState(),
      e?.ClearFlagSaveLocalAreaExplorePlayState();
  }
  GetLocalShowNoteIdMap() {
    return this.IQl;
  }
  SetLocalShowNoteIdMap(e) {
    this.IQl.add(e);
  }
  SaveToLocalShowNoteIdMap() {
    LocalStorage_1.LocalStorage.SetPlayer(
      LocalStorageDefine_1.ELocalStoragePlayerKey.ShowNoteIdMap,
      this.IQl,
    );
  }
  LoadLocalShowNoteIdMap() {
    this.IQl =
      LocalStorage_1.LocalStorage.GetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.ShowNoteIdMap,
      ) ?? new Set();
  }
  ClearShowNoteIdMap() {
    this.IQl.clear();
  }
}
exports.ExploreProgressModel = ExploreProgressModel;
//# sourceMappingURL=ExploreProgressModel.js.map
