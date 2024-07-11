"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FriendModel = exports.LocalFriendApplication = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  LocalStorage_1 = require("../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  FriendController_1 = require("./FriendController"),
  FriendData_1 = require("./FriendData");
class LocalFriendApplication {
  constructor() {
    (this.Fresh = !1), (this.CreatedTime = -0);
  }
}
exports.LocalFriendApplication = LocalFriendApplication;
class FriendModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.JVt = new Map()),
      (this.zVt = new Map()),
      (this.ZVt = new Map()),
      (this.e6t = new Map()),
      (this.FreshFriendApplicationIds = new Set()),
      (this.RecentlyTeamList = new Map()),
      (this.t6t = void 0),
      (this.i6t = void 0),
      (this.o6t = void 0),
      (this.TestDataLoaded = !1),
      (this.CachePlayerData = void 0),
      (this.r6t = new Set()),
      (this.n6t = new Set()),
      (this.s6t = new Set());
  }
  OnClear() {
    return (
      (this.t6t = void 0),
      (this.i6t = void 0),
      (this.o6t = void 0),
      this.ZVt.clear(),
      this.r6t.clear(),
      this.n6t.clear(),
      this.s6t.clear(),
      this.a6t(),
      !0
    );
  }
  LoadLocalFriendApplication() {
    var e,
      t =
        LocalStorage_1.LocalStorage.GetPlayer(
          LocalStorageDefine_1.ELocalStoragePlayerKey.LocalFriendApplication,
        ) ?? new Map();
    for (const i of this.zVt.values())
      t.has(i.ApplyPlayerData.PlayerId) &&
        (e = t.get(i.ApplyPlayerData.PlayerId)).CreatedTime ===
          i.ApplyCreatedTime &&
        ((i.Fresh = e.Fresh),
        i.Fresh ||
          this.FreshFriendApplicationIds.delete(i.ApplyPlayerData.PlayerId));
  }
  a6t() {
    var e = new Map();
    for (const i of this.zVt.keys()) {
      var t = new LocalFriendApplication();
      (t.Fresh = this.zVt.get(i).Fresh),
        (t.CreatedTime = this.zVt.get(i).ApplyCreatedTime),
        e.set(i, t);
    }
    LocalStorage_1.LocalStorage.SetPlayer(
      LocalStorageDefine_1.ELocalStoragePlayerKey.LocalFriendApplication,
      e,
    );
  }
  GetFriendListCount() {
    return this.JVt.size;
  }
  GetFriendSortedListIds() {
    var e = new Array();
    for (const t of this.JVt.keys()) e.push(t);
    return FriendController_1.FriendController.GetSortedFriendListByRules(
      e,
      FriendController_1.FriendController.FriendListSortHook,
    );
  }
  GetFriendApplyListIds() {
    var e = new Array();
    for (const t of this.zVt.keys()) e.push(t);
    return FriendController_1.FriendController.GetSortedBlackOrApplyList(e);
  }
  GetRecentlyTeamIds() {
    var e = new Array();
    for (const t of this.RecentlyTeamList.keys()) e.push(t);
    return (
      e.sort((e, t) => {
        (e = this.GetRecentlyTeamData(e)), (t = this.GetRecentlyTeamData(t));
        return e.TeamTime > t.TeamTime ? 1 : -1;
      }),
      e
    );
  }
  HasNewFriendApplication() {
    return 0 < this.FreshFriendApplicationIds.size;
  }
  GetFriendSearchResultListIds() {
    var e = new Array();
    for (const t of this.ZVt.values()) e.push(t.PlayerId);
    return (
      e.sort((e, t) => {
        (e = this.GetFriendById(e)), (t = this.GetFriendById(t));
        return e.PlayerId - t.PlayerId;
      }),
      e
    );
  }
  GetBlackListIds() {
    var e = new Array();
    for (const t of this.e6t.keys()) e.push(t);
    return FriendController_1.FriendController.GetSortedBlackOrApplyList(e);
  }
  GetFriendById(e) {
    if (e) return this.JVt.get(e);
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("Friend", 28, "获取选中玩家时id不存在");
  }
  GetFriendDataInApplicationById(e) {
    if (this.zVt.has(e)) return this.zVt.get(e).ApplyPlayerData;
  }
  GetBlockedPlayerById(e) {
    return this.e6t.get(e);
  }
  GetFriendSearchResultById(e) {
    return this.ZVt.get(e);
  }
  AddFriend(e) {
    this.JVt.set(e.PlayerId, e);
  }
  HasFriend(e) {
    return this.JVt.has(e);
  }
  DeleteFriend(e) {
    this.JVt.has(e) &&
      (this.JVt.delete(e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnRemoveFriend,
        e,
      )),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.UpdateFriendViewShow,
      );
  }
  IsMyFriend(e) {
    return this.JVt.has(e);
  }
  AddFriendApplication(e) {
    this.zVt.set(e.ApplyPlayerData.PlayerId, e),
      this.FreshFriendApplicationIds.add(e.ApplyPlayerData.PlayerId);
  }
  HasFriendApplication(e) {
    return this.zVt.has(e);
  }
  DeleteFriendApplication(e) {
    this.zVt.has(e) &&
      (this.zVt.delete(e), this.FreshFriendApplicationIds.has(e)) &&
      this.FreshFriendApplicationIds.delete(e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.UpdateFriendViewShow,
      );
  }
  MarkDirtyNewApplications() {
    for (const e of this.zVt.values())
      (e.Fresh = !1),
        this.FreshFriendApplicationIds.delete(e.ApplyPlayerData.PlayerId);
  }
  AddFriendSearchResults(e) {
    this.ZVt.set(e.PlayerId, e);
  }
  ClearFriendSearchResults() {
    this.ZVt.clear();
  }
  AddToBlackList(e) {
    this.e6t.set(e.GetBlockedPlayerData.PlayerId, e);
  }
  HasBlockedPlayer(e) {
    return this.e6t.has(e);
  }
  DeleteBlockedPlayer(e) {
    this.e6t.delete(e);
  }
  GetSelectedPlayerOrItemInstance(e) {
    var t = e ?? this.t6t;
    if (this.ShowingView)
      switch (this.ShowingView) {
        case "FriendView":
          switch (this.FilterState) {
            case 1:
              return this.GetFriendById(t);
            case 2:
              return this.GetFriendDataInApplicationById(t);
            case 3:
              return this.GetRecentlyTeamData(t).PlayerData;
            default:
              return void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error("Friend", 28, "所属页签错误！", [
                  "页签filter",
                  this.FilterState,
                ])
              );
          }
        case "FriendSearchView":
          return this.IsMyFriend(t)
            ? this.GetFriendById(t)
            : this.GetFriendSearchResultById(t);
        case "FriendBlackListView":
          return this.GetBlockedPlayerById(t).GetBlockedPlayerData;
        case "OnlineWorldHallView":
          return this.GetFriendById(t);
        default:
          return void (
            Log_1.Log.CheckError() &&
            Log_1.Log.Error("Friend", 28, "当前展示View错误！", [
              "view名",
              this.ShowingView,
            ])
          );
      }
  }
  ResetShowingView() {
    this.ShowingView = "FriendView";
  }
  ClearTestFriendData() {
    if (this.TestDataLoaded) {
      for (const e of this.JVt.keys())
        this.JVt.get(e).Debug && this.JVt.delete(e);
      for (const t of this.zVt.keys())
        this.zVt.get(t).ApplyPlayerData.Debug &&
          (this.zVt.delete(t), this.FreshFriendApplicationIds.has(t)) &&
          this.FreshFriendApplicationIds.delete(t);
      for (const i of this.e6t.keys())
        this.e6t.get(i).GetBlockedPlayerData.Debug && this.e6t.delete(i);
      for (const r of this.ZVt.keys())
        this.ZVt.get(r).Debug && this.ZVt.delete(r);
      this.TestDataLoaded = !1;
    }
  }
  CurrentApplyFriendListHasPlayer(e) {
    return this.r6t.has(e);
  }
  AddPlayerToApplyFriendList(e) {
    this.r6t.has(e) || this.r6t.add(e);
  }
  ClearApplyFriendList() {
    this.r6t.clear();
  }
  CurrentApproveFriendListHasPlayer(e) {
    return this.n6t.has(e);
  }
  AddPlayerToApproveFriendList(e) {
    this.n6t.has(e) || this.n6t.add(e);
  }
  ClearApproveFriendList() {
    this.n6t.clear();
  }
  CurrentRefuseFriendListHasPlayer(e) {
    return this.s6t.has(e);
  }
  AddPlayerToRefuseFriendList(e) {
    this.s6t.has(e) || this.s6t.add(e);
  }
  static GetOfflineStrAndGap(e) {
    e = TimeUtil_1.TimeUtil.CalculateDayTimeStampGapBetweenNow(e, !1);
    let t = "FriendOfflineToday";
    return (
      e <= 1
        ? (t = "FriendOfflineToday")
        : 1 < e && e <= 30
          ? (t = "FriendOfflineSomeDay")
          : 30 < e && (t = "FriendOfflineOverMonth"),
      [t, e]
    );
  }
  InitRecentlyTeamDataByResponse(e) {
    if (e) {
      this.RecentlyTeamList.clear();
      for (const i of e) {
        var t = new FriendData_1.RecentlyTeamData();
        t.InitData(i), this.RecentlyTeamList.set(t.PlayerData.PlayerId, t);
      }
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.UpdateRecentlyTeamDataEvent,
      );
    }
  }
  GetRecentlyTeamData(e) {
    return this.RecentlyTeamList.get(e);
  }
  ClearRefuseFriendList() {
    this.s6t.clear();
  }
  get SelectedPlayerId() {
    return this.t6t;
  }
  set SelectedPlayerId(e) {
    this.t6t = e;
  }
  get FilterState() {
    return this.i6t;
  }
  set FilterState(e) {
    this.i6t = e;
  }
  get ShowingView() {
    return this.o6t;
  }
  set ShowingView(e) {
    this.o6t = e;
  }
}
exports.FriendModel = FriendModel;
//# sourceMappingURL=FriendModel.js.map
