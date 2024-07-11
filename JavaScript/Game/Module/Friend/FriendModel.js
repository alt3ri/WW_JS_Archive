"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FriendModel = exports.LocalFriendApplication = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
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
      (this.J6t = new Map()),
      (this.z6t = new Map()),
      (this.Z6t = new Map()),
      (this.e8t = new Map()),
      (this.FreshFriendApplicationIds = new Set()),
      (this.RecentlyTeamList = new Map()),
      (this.t8t = void 0),
      (this.i8t = void 0),
      (this.o8t = void 0),
      (this.TestDataLoaded = !1),
      (this.CachePlayerData = void 0),
      (this.r8t = new Set()),
      (this.n8t = new Set()),
      (this.s8t = new Set()),
      (this.ApplyCdTime =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "apply_valid_time",
        ));
  }
  OnClear() {
    return (
      (this.t8t = void 0),
      (this.i8t = void 0),
      (this.o8t = void 0),
      this.Z6t.clear(),
      this.r8t.clear(),
      this.n8t.clear(),
      this.s8t.clear(),
      this.a8t(),
      !0
    );
  }
  LoadLocalFriendApplication() {
    var e,
      t =
        LocalStorage_1.LocalStorage.GetPlayer(
          LocalStorageDefine_1.ELocalStoragePlayerKey.LocalFriendApplication,
        ) ?? new Map();
    for (const i of this.z6t.values())
      t.has(i.ApplyPlayerData.PlayerId) &&
        (e = t.get(i.ApplyPlayerData.PlayerId)).CreatedTime ===
          i.ApplyCreatedTime &&
        ((i.Fresh = e.Fresh),
        i.Fresh ||
          this.FreshFriendApplicationIds.delete(i.ApplyPlayerData.PlayerId));
  }
  a8t() {
    var e = new Map();
    for (const i of this.z6t.keys()) {
      var t = new LocalFriendApplication();
      (t.Fresh = this.z6t.get(i).Fresh),
        (t.CreatedTime = this.z6t.get(i).ApplyCreatedTime),
        e.set(i, t);
    }
    LocalStorage_1.LocalStorage.SetPlayer(
      LocalStorageDefine_1.ELocalStoragePlayerKey.LocalFriendApplication,
      e,
    );
  }
  GetFriendListCount() {
    return this.J6t.size;
  }
  GetFriendApplyCount() {
    return this.z6t.size;
  }
  GetFriendSortedListIds() {
    var e = new Array();
    for (const t of this.J6t.keys()) e.push(t);
    return FriendController_1.FriendController.GetSortedFriendListByRules(
      e,
      FriendController_1.FriendController.FriendListSortHook,
    );
  }
  GetFriendApplyListIds() {
    var e = new Array();
    for (const t of this.z6t.keys()) e.push(t);
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
    for (const t of this.Z6t.values()) e.push(t.PlayerId);
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
    for (const t of this.e8t.keys()) e.push(t);
    return FriendController_1.FriendController.GetSortedBlackOrApplyList(e);
  }
  GetFriendById(e) {
    if (e) return this.J6t.get(e);
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("Friend", 28, "获取选中玩家时id不存在");
  }
  GetFriendDataInApplicationById(e) {
    if (this.z6t.has(e)) return this.z6t.get(e).ApplyPlayerData;
  }
  GetBlockedPlayerById(e) {
    return this.e8t.get(e);
  }
  GetFriendSearchResultById(e) {
    return this.Z6t.get(e);
  }
  AddFriend(e) {
    this.J6t.set(e.PlayerId, e);
  }
  HasFriend(e) {
    return this.J6t.has(e);
  }
  DeleteFriend(e) {
    this.J6t.has(e) &&
      (this.J6t.delete(e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnRemoveFriend,
        e,
      )),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.UpdateFriendViewShow,
      );
  }
  IsMyFriend(e) {
    return this.J6t.has(e);
  }
  AddFriendApplication(e) {
    this.z6t.set(e.ApplyPlayerData.PlayerId, e),
      this.FreshFriendApplicationIds.add(e.ApplyPlayerData.PlayerId);
  }
  HasFriendApplication(e) {
    return this.z6t.has(e);
  }
  DeleteFriendApplication(e) {
    this.z6t.has(e) &&
      (this.z6t.delete(e), this.FreshFriendApplicationIds.has(e)) &&
      this.FreshFriendApplicationIds.delete(e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.UpdateFriendViewShow,
      );
  }
  MarkDirtyNewApplications() {
    for (const e of this.z6t.values())
      (e.Fresh = !1),
        this.FreshFriendApplicationIds.delete(e.ApplyPlayerData.PlayerId);
  }
  AddFriendSearchResults(e) {
    this.Z6t.set(e.PlayerId, e);
  }
  ClearFriendSearchResults() {
    this.Z6t.clear();
  }
  AddToBlackList(e) {
    this.e8t.set(e.GetBlockedPlayerData.PlayerId, e);
  }
  HasBlockedPlayer(e) {
    return this.e8t.has(e);
  }
  DeleteBlockedPlayer(e) {
    this.e8t.delete(e);
  }
  GetSelectedPlayerOrItemInstance(e) {
    var t = e ?? this.t8t;
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
      for (const e of this.J6t.keys())
        this.J6t.get(e).Debug && this.J6t.delete(e);
      for (const t of this.z6t.keys())
        this.z6t.get(t).ApplyPlayerData.Debug &&
          (this.z6t.delete(t), this.FreshFriendApplicationIds.has(t)) &&
          this.FreshFriendApplicationIds.delete(t);
      for (const i of this.e8t.keys())
        this.e8t.get(i).GetBlockedPlayerData.Debug && this.e8t.delete(i);
      for (const r of this.Z6t.keys())
        this.Z6t.get(r).Debug && this.Z6t.delete(r);
      this.TestDataLoaded = !1;
    }
  }
  CurrentApplyFriendListHasPlayer(e) {
    return this.r8t.has(e);
  }
  AddPlayerToApplyFriendList(e) {
    this.r8t.has(e) || this.r8t.add(e);
  }
  ClearApplyFriendList() {
    this.r8t.clear();
  }
  CurrentApproveFriendListHasPlayer(e) {
    return this.n8t.has(e);
  }
  AddPlayerToApproveFriendList(e) {
    this.n8t.has(e) || this.n8t.add(e);
  }
  ClearApproveFriendList() {
    this.n8t.clear();
  }
  CurrentRefuseFriendListHasPlayer(e) {
    return this.s8t.has(e);
  }
  AddPlayerToRefuseFriendList(e) {
    this.s8t.has(e) || this.s8t.add(e);
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
    this.s8t.clear();
  }
  GetApplyViewDataList(e) {
    var t = [];
    if (e) for (const r of e) this.z6t.has(r) && t.push(this.z6t.get(r));
    else for (var [, i] of this.z6t) t.push(i);
    return t;
  }
  get SelectedPlayerId() {
    return this.t8t;
  }
  set SelectedPlayerId(e) {
    this.t8t = e;
  }
  get FilterState() {
    return this.i8t;
  }
  set FilterState(e) {
    this.i8t = e;
  }
  get ShowingView() {
    return this.o8t;
  }
  set ShowingView(e) {
    this.o8t = e;
  }
}
exports.FriendModel = FriendModel;
//# sourceMappingURL=FriendModel.js.map
