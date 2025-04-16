"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExploreAreaData = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Macro_1 = require("../../../Core/Preprocessor/Macro"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  LocalStorage_1 = require("../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LevelPlayReportController_1 = require("../LevelPlayReport/LevelPlayReportController"),
  ExploreAreaItemData_1 = require("./ExploreAreaItemData"),
  ExploreProgressDefine_1 = require("./ExploreProgressDefine");
class ExploreAreaData {
  constructor() {
    (this.AreaId = 0),
      (this.CountryId = 0),
      (this.StateId = 0),
      (this.MapId = 0),
      (this.VVt = 0),
      (this.mOl = 1),
      (this.MaxExploreProgress = 100),
      (this.HVt = new Map()),
      (this.jVt = []),
      (this.x7l = new Map()),
      (this.WVt = ""),
      (this.KVt = 0),
      (this.dOl = []),
      (this.COl = new Map()),
      (this.gOl = !1),
      (this.pOl = !1),
      (this.v8l = {
        [LocalStorageDefine_1.ELocalStorageGlobalKey.IconPercentAreaShow]: !1,
        [LocalStorageDefine_1.ELocalStorageGlobalKey.IconPercentAreaStory]: !1,
      }),
      (this.R7l = !1),
      (this.PreviewImage = "");
  }
  get IsReachMaxProgress() {
    return this.VVt >= this.MaxExploreProgress;
  }
  fOl(t) {
    if (this.VVt !== t) {
      (this.VVt = t), (this.mOl = this.MaxExploreProgress);
      let e = !1;
      for (const r of this.dOl) {
        if (r.Goal > t) {
          this.mOl = r.Goal;
          break;
        }
        r.Achieved || ((r.State = 1), (e = !0));
      }
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnAreaExploreProgressUpdate,
        this.AreaId,
      ),
        e &&
          (ModelManager_1.ModelManager.ExploreProgressModel.SureHasAreaRewardBox(),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RedDotUpdateMapAreaBoxReward,
          ));
    }
  }
  Initialize(e) {
    (this.AreaId = e.AreaId),
      (this.WVt = e.Title),
      (this.KVt = e.SortIndex),
      (this.CountryId = e.CountryId),
      (this.StateId = e.StateId),
      (this.MapId = e.MapConfigId),
      this.vOl();
    e = ConfigManager_1.ConfigManager.AreaConfig.GetStoryConfigByAreaIdAndStage(
      this.AreaId,
      1,
    );
    e && (this.PreviewImage = e.PicResource);
  }
  vOl() {
    ConfigManager_1.ConfigManager.ExploreProgressConfig.GetAreaStageAwardConfigByAreaId(
      this.AreaId,
    )?.forEach((e) => {
      var t = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(
        e.DropReward,
      );
      const r = [];
      t?.DropPreview.forEach((e, t) => {
        r.push([{ ItemId: t, IncId: 0 }, e]);
      });
      (t =
        ModelManager_1.ModelManager.ExploreProgressModel.IsAreaStageRewardIdAchieved(
          e.Id,
        )),
        (t = {
          Id: e.Id,
          Goal: e.NeedExploreProgress,
          Rewards: r,
          Achieved: t,
          State: t ? 3 : 2,
        });
      this.dOl.push(t), this.COl.set(e.Id, t);
    }),
      (this.mOl = this.dOl[0]?.Goal ?? this.MaxExploreProgress);
  }
  Clear() {
    (this.AreaId = 0), (this.VVt = 0), (this.mOl = 1), this.HVt.clear();
  }
  AddExploreAreaItemData(e) {
    var t,
      r = e.ExploreType;
    this.HVt.has(r) ||
      ((t = new ExploreAreaItemData_1.ExploreAreaItemData()).Initialize(e),
      this.HVt.set(r, t),
      this.jVt.push(t));
  }
  AddExploreAreaItemDataFinish() {
    this.SortExploreAreaItemDataList(this.jVt), this.w7l();
  }
  SortExploreAreaItemDataList(e) {
    e.sort((e, t) => {
      return e.SortIndex !== t.SortIndex
        ? e.SortIndex - t.SortIndex
        : e.ConfigId - t.ConfigId;
    });
  }
  w7l() {
    this.x7l.clear(),
      this.jVt.forEach((t) => {
        t.SubTypes.forEach((e) => {
          this.x7l.set(e, t.ExploreType);
        });
      });
  }
  Refresh(e) {
    this.fOl(e.BPs);
    var t = ConfigManager_1.ConfigManager.ExploreProgressConfig;
    for (const a of e.HVn) {
      var r = t.GetExploreProgressConfigById(a.qPs)?.ExploreType ?? 0;
      this.HVt.get(r)?.Refresh(a);
    }
  }
  GetExploreAreaItemData(e) {
    return this.HVt.get(e);
  }
  GetAllExploreAreaItemData() {
    return this.jVt;
  }
  GetProgress() {
    return this.VVt;
  }
  GetNameId() {
    return this.WVt;
  }
  GetSortIndex() {
    return this.KVt;
  }
  GetNextStageNeedProgress() {
    return this.mOl;
  }
  GetStageProgress(e = !1) {
    e = e ? 100 : 1;
    return (this.GetProgress() / this.GetNextStageNeedProgress()) * e;
  }
  GetStageRewardDataList() {
    return this.dOl;
  }
  UpdateAchievedStageReward(e) {
    e = this.COl.get(e);
    e && ((e.Achieved = !0), (e.State = 3));
  }
  HasCanTakeStageReward() {
    return this.dOl.some((e) => 1 === e.State);
  }
  IsCollectAllStageReward() {
    return this.dOl.every((e) => 3 === e.State);
  }
  IsShowRecommendPlayPoint() {
    for (const e of this.jVt) if (e.IsShowRecommendPlayPoint) return !0;
    return !1;
  }
  GetRecommendExploreItemDataList(e = !0) {
    var t = [];
    for (const r of this.jVt)
      if (
        r.IsShowRecommendPlayPoint &&
        (t.push(r), e) &&
        t.length >= ExploreProgressDefine_1.MAX_RECOMMEND_PLAY_POINT_SHOW_NUM
      )
        break;
    return t;
  }
  GetShowRecommendExploreItemDataList() {
    const r = [];
    var e = this.GetRecommendExploreItemDataList();
    const i = this.GetLocalAreaExplorePlayStateMap(),
      a =
        (e.forEach((a) => {
          const o = i.get(a.ExploreType);
          o
            ? a.PlayProgressDataList.forEach((e, t) => {
                var t = o.PlayPointStateList[t],
                  r = 1 === e.PlayPointState;
                0 === t && r && (e.LastPlayPointState = t),
                  i.delete(a.ExploreType);
              })
            : (a.IsNewRecommendPlay = !0),
            r.push(a);
        }),
        i.forEach((e, t) => {
          t = this.HVt.get(t);
          t && t.IsFinishedPlayPoint && r.push(t);
        }),
        this.SortExploreAreaItemDataList(r),
        []);
    var t = [];
    for (const o of r)
      o.IsFinishedPlayPoint
        ? a.push(o)
        : o.IsNewRecommendPlay
          ? t.push(o)
          : (t.forEach((e, t) => {
              a[t] && (a[t].SetSequenceData(e), e.SetFlagSequenceData(!0));
            }),
            (t.length = 0),
            (a.length = 0));
    return r.filter((e) => !e.GetFlagSequenceDataAndClean());
  }
  UpdatePlayPointData(o) {
    this.P7l(o).forEach((e, t) => {
      const a = this.HVt.get(t);
      a.ClearPlayPointData(),
        e.forEach((e) => {
          var t = o[e],
            e = Number(e),
            r = this.qx_(e, t, a);
          a.AddPlayPointData({
            PlayId: e,
            EntityId: t.Nb_,
            PlayState: r ?? 0,
            IsClear: !!t.Y4_,
            ClearInfo: t.Y4_,
          });
        }),
        a.PlayPointDataAddFinish();
    }),
      (this.gOl = !0),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.AreaPlayPointUpdate,
        this.AreaId,
      );
  }
  qx_(e, t, r) {
    var a = ExploreProgressDefine_1.serverPlayState2Client[t.xI_];
    return 2 !== a &&
      !(t.Bb_ <= 0) &&
      1 === (r = r.GetMapMarkByPlayId(e))?.HistoryState
      ? (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "ExploreProgress",
            69,
            "玩法状态转换成已完成",
            ["PlayId", e],
            ["MarkId", r?.MarkId],
            [
              "MarkName",
              ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(
                r?.MarkTitle ?? "",
              ),
            ],
            ["ToState", a],
            ["ProtoData", t],
          ),
        2)
      : a;
  }
  P7l(e) {
    const a = new Map();
    return (
      Object.entries(e).forEach(([e, t]) => {
        var r = this.x7l.get(t.Vb_);
        r
          ? (a.has(r) || a.set(r, []), a.get(r).push(e))
          : Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Map",
              69,
              "没有找到探索项子类型映射到的探索类型",
              ["playId", e],
              ["playData", t],
            );
      }),
      a
    );
  }
  async CheckUpdatePlayPointData() {
    this.gOl || (await this.RequestPlayPointData());
  }
  ClearFlagUpdatePlayPointData() {
    this.gOl = !1;
  }
  async RequestPlayPointData() {
    await LevelPlayReportController_1.LevelPlayReportController.RequestPlayPointStateAsync(
      this.AreaId,
      this.GetSceneId(),
    );
  }
  GetSceneId() {
    return this.MapId;
  }
  GetStoryList() {
    const r = this.GetProgress(),
      a = this.GetLocalAreaStoryProgress();
    var e = ConfigManager_1.ConfigManager.AreaConfig.GetStoryList(this.AreaId);
    const o = [];
    return (
      e?.forEach((e) => {
        var t = { IsOpen: r >= e.Unlock };
        t.IsOpen &&
          ((t.StoryContent = e.Content), (t.StoryTitle = e.StageTitle)),
          (t.LockedDesc = e.LockText),
          (t.IsNewOpen = t.IsOpen && e.Unlock > a),
          o.push(t);
      }),
      o
    );
  }
  GetStoryProgress(e = !1) {
    var t = ConfigManager_1.ConfigManager.AreaConfig.GetStoryList(this.AreaId);
    if (!t)
      return (
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("ExploreProgress", 69, "区域故事进度获取失败", [
            "areaId",
            this.AreaId,
          ]),
        0
      );
    var e = e ? 100 : 1,
      r = this.GetProgress(),
      a = t[t?.length - 1]?.Unlock ?? this.MaxExploreProgress;
    let o = a;
    for (let e = 0; e < t.length; e++)
      if (t[e].Unlock > r) {
        o = t[e - 1]?.Unlock ?? 0;
        break;
      }
    return (o / a) * e;
  }
  HasNewStoryUnlocked() {
    return (
      !!ConfigManager_1.ConfigManager.AreaConfig.GetStoryList(this.AreaId) &&
      this.GetLocalAreaStoryProgress() < this.GetStoryProgress(!0) &&
      (this.pOl = !0)
    );
  }
  GetLocalAreaStoryProgress() {
    return (
      (
        LocalStorage_1.LocalStorage.GetGlobal(
          LocalStorageDefine_1.ELocalStorageGlobalKey.AreaStoryProgress,
        ) ?? new Map()
      ).get(this.AreaId) ?? 0
    );
  }
  SaveLocalAreaStoryProgress() {
    var e;
    return (
      !!this.pOl &&
      ((e =
        LocalStorage_1.LocalStorage.GetGlobal(
          LocalStorageDefine_1.ELocalStorageGlobalKey.AreaStoryProgress,
        ) ?? new Map()).set(this.AreaId, this.GetStoryProgress(!0)),
      LocalStorage_1.LocalStorage.SetGlobal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.AreaStoryProgress,
        e,
      ),
      (this.pOl = !0),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.AreaStoryProgressSave,
      ),
      !0)
    );
  }
  y8l() {
    var e = this.GetProgress();
    return Math.floor(e / ExploreProgressDefine_1.AREA_ICON_UNLOCK_PERCENT);
  }
  GetIconPercentData(e) {
    var t = this.y8l(),
      r = Math.min(t, this.S8l(e)),
      a = r,
      t = Math.max(0, t - r);
    return (
      0 < t && (this.v8l[e] = !0),
      { OpenCount: a, NewOpenCount: t, IconPath: this.PreviewImage }
    );
  }
  GetIconPercentDataAreaShow() {
    return this.GetIconPercentData(
      LocalStorageDefine_1.ELocalStorageGlobalKey.IconPercentAreaShow,
    );
  }
  SaveLocalIconPercentAreaShow() {
    this.M8l(LocalStorageDefine_1.ELocalStorageGlobalKey.IconPercentAreaShow);
  }
  GetIconPercentDataAreaStory() {
    return this.GetIconPercentData(
      LocalStorageDefine_1.ELocalStorageGlobalKey.IconPercentAreaStory,
    );
  }
  SaveLocalIconPercentAreaStory() {
    this.M8l(LocalStorageDefine_1.ELocalStorageGlobalKey.IconPercentAreaStory);
  }
  S8l(e) {
    return (
      (LocalStorage_1.LocalStorage.GetGlobal(e) ?? new Map()).get(
        this.AreaId,
      ) ?? 0
    );
  }
  M8l(e) {
    var t;
    this.v8l[e] &&
      ((t = LocalStorage_1.LocalStorage.GetGlobal(e) ?? new Map()).set(
        this.AreaId,
        this.y8l(),
      ),
      LocalStorage_1.LocalStorage.SetGlobal(e, t),
      (this.v8l[e] = !1));
  }
  GetStoryViewTitle() {
    var e = "AreaReportName_Text",
      t = this.GetNameId(),
      e = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(e, e),
      t = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(t, t);
    return StringUtils_1.StringUtils.Format(e, t);
  }
  SaveLocalAreaExplorePlayState() {
    var e;
    this.R7l ||
      (this.IsShowRecommendPlayPoint() &&
        ((e =
          LocalStorage_1.LocalStorage.GetGlobal(
            LocalStorageDefine_1.ELocalStorageGlobalKey.AreaExplorePlayState,
          ) ?? new Map()).set(this.AreaId, this.U7l()),
        LocalStorage_1.LocalStorage.SetGlobal(
          LocalStorageDefine_1.ELocalStorageGlobalKey.AreaExplorePlayState,
          e,
        ),
        (this.R7l = !0)));
  }
  ClearFlagSaveLocalAreaExplorePlayState() {
    this.R7l = !1;
  }
  ClearLocalAreaExplorePlayState() {
    LocalStorage_1.LocalStorage.SetGlobal(
      LocalStorageDefine_1.ELocalStorageGlobalKey.AreaExplorePlayState,
      new Map(),
    );
  }
  U7l() {
    const r = new Map();
    return (
      this.GetRecommendExploreItemDataList().forEach((e) => {
        var t = {
          ExploreType: e.ExploreType,
          PlayPointStateList: e.GetPlayPointStateList(),
        };
        r.set(e.ExploreType, t);
      }),
      r
    );
  }
  GetLocalAreaExplorePlayStateMap() {
    return (
      (
        LocalStorage_1.LocalStorage.GetGlobal(
          LocalStorageDefine_1.ELocalStorageGlobalKey.AreaExplorePlayState,
        ) ?? new Map()
      ).get(this.AreaId) ?? new Map()
    );
  }
  GetLocalFinishRecommendExploreItems() {
    if (this.IsShowRecommendPlayPoint())
      return (
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Map", 69, "当前区域还存在未完成的推荐探索项显示"),
        []
      );
    var e = this.GetLocalAreaExplorePlayStateMap();
    const t = [];
    return (
      e.forEach((e) => {
        e = this.GetExploreAreaItemData(e.ExploreType);
        e && t.push(e);
      }),
      t
    );
  }
}
exports.ExploreAreaData = ExploreAreaData;
//# sourceMappingURL=ExploreAreaData.js.map
