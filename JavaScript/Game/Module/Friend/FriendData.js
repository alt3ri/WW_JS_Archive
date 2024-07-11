"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FriendData =
    exports.RecentlyTeamData =
    exports.FriendApplyData =
    exports.FriendBlackListData =
      void 0);
const MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  PersonalDefine_1 = require("../Personal/Model/PersonalDefine");
class FriendBlackListData {
  constructor() {
    this.j6t = void 0;
  }
  InitializeFriendBlackListData(t) {
    (this.j6t = new FriendData()), this.j6t.SetPlayerBasicInfo(t);
  }
  get GetBlockedPlayerData() {
    return this.j6t;
  }
  set GetBlockedPlayerData(t) {
    this.j6t = t;
  }
}
exports.FriendBlackListData = FriendBlackListData;
class FriendApplyData {
  constructor() {
    (this.j6t = void 0), (this.W6t = -0), (this.Fresh = !0), (this.Tta = 0);
  }
  InitializeFriendApply(t) {
    (this.j6t = new FriendData()),
      this.j6t.SetPlayerBasicInfo(t.FVn),
      (this.W6t = Number(MathUtils_1.MathUtils.LongToBigInt(t.TUs)));
  }
  get ApplyCreatedTime() {
    return this.W6t;
  }
  set ApplyCreatedTime(t) {
    this.W6t = t;
  }
  get ApplyPlayerData() {
    return this.j6t;
  }
  set ApplyPlayerData(t) {
    this.j6t = t;
  }
  get ApplyTimeLeftTime() {
    return this.Tta - TimeUtil_1.TimeUtil.GetServerTime();
  }
  set ApplyTimeLeftTime(t) {
    this.Tta = t + ModelManager_1.ModelManager.FriendModel.ApplyCdTime;
  }
}
exports.FriendApplyData = FriendApplyData;
class RecentlyTeamData {
  constructor() {
    (this.PlayerData = new FriendData()), (this.TeamTime = -0);
  }
  InitData(t) {
    this.PlayerData.SetPlayerBasicInfo(t.FVn),
      (this.TeamTime = Number(MathUtils_1.MathUtils.LongToBigInt(t.PUs)));
  }
  GetOfflineDay() {
    var t = this.TeamTime;
    return TimeUtil_1.TimeUtil.CalculateDayTimeStampGapBetweenNow(t, !1);
  }
}
exports.RecentlyTeamData = RecentlyTeamData;
class FriendData {
  constructor() {
    (this.xe = 0),
      (this.he = ""),
      (this.B8 = 0),
      (this.K6t = 0),
      (this.Q6t = 0),
      (this.X6t = !1),
      (this.$6t = 0),
      (this.Y6t = void 0),
      (this.Debug = !1),
      (this.WorldLevel = 0),
      (this.TeamMemberCount = 0),
      (this.Signature = ""),
      (this.CurCard = 0),
      (this.RoleShowList = []),
      (this.CardShowList = []),
      (this.Birthday = 0),
      (this.IsBirthdayDisplay = !1),
      (this.CardUnlockList = []);
  }
  SetFriendDataAttribute(t) {
    this.SetPlayerBasicInfo(t.FVn),
      (this.Y6t = t.VVn),
      this.Y6t ||
        ((t = ModelManager_1.ModelManager.FriendModel.GetFriendById(t.FVn.q5n)),
        (this.Y6t = t?.Y6t));
  }
  SetPlayerBasicInfo(e) {
    (this.xe = e.q5n),
      (this.he = e.w8n),
      (this.B8 = e.P6n),
      (this.K6t = e.sSs),
      (this.Q6t = e.aSs),
      (this.X6t = e.hSs),
      (this.$6t = Number(MathUtils_1.MathUtils.LongToBigInt(e._Ss))),
      this.Y6t ||
        ((t = ModelManager_1.ModelManager.FriendModel.GetFriendById(e.q5n)),
        (this.Y6t = t?.Y6t)),
      (this.WorldLevel = e.nSs),
      (this.TeamMemberCount = e.uSs),
      (this.Signature = e.HVn),
      (this.CurCard = e.CSs),
      0 === this.CurCard &&
        (this.CurCard =
          ConfigManager_1.ConfigManager.FriendConfig.GetDefaultBackgroundCardId()),
      (this.RoleShowList = []);
    var t,
      i = e.dSs.length;
    for (let t = 0; t < i; t++) {
      var s = e.dSs[t];
      this.RoleShowList.push(new PersonalDefine_1.RoleShowEntry(s.O6n, s.P6n));
    }
    (this.CardShowList = e.mSs),
      (this.CardUnlockList = []),
      e.mSs.forEach((t) => {
        this.CardUnlockList.push(
          new PersonalDefine_1.PersonalCardData(t, !0, !0),
        );
      }),
      (this.Birthday = e.jVn),
      (this.IsBirthdayDisplay = e.gSs);
  }
  get PlayerId() {
    return this.xe;
  }
  set PlayerId(t) {
    this.xe = t;
  }
  get PlayerName() {
    return this.he;
  }
  set PlayerName(t) {
    this.he = t;
  }
  get PlayerLevel() {
    return this.B8;
  }
  set PlayerLevel(t) {
    this.B8 = t;
  }
  get PlayerHeadPhoto() {
    return this.K6t;
  }
  get PlayerHeadFrame() {
    return this.Q6t;
  }
  get PlayerIsOnline() {
    return this.X6t;
  }
  set PlayerIsOnline(t) {
    this.X6t = t;
  }
  get PlayerLastOfflineTime() {
    return this.$6t;
  }
  set PlayerLastOfflineTime(t) {
    this.$6t = t;
  }
  GetOfflineDay() {
    var t = this.PlayerLastOfflineTime;
    return TimeUtil_1.TimeUtil.CalculateDayTimeStampGapBetweenNow(t, !1);
  }
  get FriendRemark() {
    return this.Y6t;
  }
  set FriendRemark(t) {
    this.Y6t = t;
  }
}
exports.FriendData = FriendData;
//# sourceMappingURL=FriendData.js.map
