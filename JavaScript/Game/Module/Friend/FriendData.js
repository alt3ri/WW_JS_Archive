"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FriendData =
    exports.RecentlyTeamData =
    exports.FriendApplyData =
    exports.FriendBlackListData =
      void 0);
const Log_1 = require("../../../Core/Common/Log"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  PlatformSdkManagerNew_1 = require("../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  PersonalDefine_1 = require("../Personal/Model/PersonalDefine");
class FriendBlackListData {
  constructor() {
    this.j6t = void 0;
  }
  async InitializeFriendBlackListData(t) {
    (this.j6t = new FriendData()), await this.j6t.SetPlayerBasicInfo(t);
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
    (this.j6t = void 0), (this.W6t = -0), (this.Fresh = !0), (this.jra = 0);
  }
  async InitializeFriendApply(t) {
    (this.j6t = new FriendData()),
      await this.j6t.SetPlayerBasicInfo(t.YVn),
      (this.W6t = Number(MathUtils_1.MathUtils.LongToBigInt(t.wUs)));
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
    return this.jra - TimeUtil_1.TimeUtil.GetServerTime();
  }
  set ApplyTimeLeftTime(t) {
    this.jra = t + ModelManager_1.ModelManager.FriendModel.ApplyCdTime;
  }
}
exports.FriendApplyData = FriendApplyData;
class RecentlyTeamData {
  constructor() {
    (this.PlayerData = new FriendData()), (this.TeamTime = -0);
  }
  async InitData(t) {
    await this.PlayerData.SetPlayerBasicInfo(t.YVn),
      (this.TeamTime = Number(MathUtils_1.MathUtils.LongToBigInt(t.GUs)));
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
      (this.CardUnlockList = []),
      (this.jxa = ""),
      (this.Wxa = ""),
      (this.Qxa = !1),
      (this.Kxa = "");
  }
  async SetFriendDataAttribute(t) {
    await this.SetPlayerBasicInfo(t.YVn),
      (this.Y6t = t.JVn),
      this.Y6t ||
        ((t = ModelManager_1.ModelManager.FriendModel.GetFriendById(t.YVn.W5n)),
        (this.Y6t = t?.Y6t));
  }
  async SetPlayerBasicInfo(e) {
    (this.xe = e.W5n),
      (this.he = e.H8n),
      (this.B8 = e.F6n),
      (this.K6t = e.dSs),
      (this.Q6t = e.mSs),
      (this.X6t = e.CSs),
      (this.$6t = Number(MathUtils_1.MathUtils.LongToBigInt(e.fSs))),
      this.Y6t ||
        ((t = ModelManager_1.ModelManager.FriendModel.GetFriendById(e.W5n)),
        (this.Y6t = t?.Y6t)),
      (this.WorldLevel = e.cSs),
      (this.TeamMemberCount = e.vSs),
      (this.Signature = e.zVn),
      (this.CurCard = e.ESs),
      0 === this.CurCard &&
        (this.CurCard =
          ConfigManager_1.ConfigManager.FriendConfig.GetDefaultBackgroundCardId()),
      (this.RoleShowList = []);
    var t,
      i = e.MSs.length;
    for (let t = 0; t < i; t++) {
      var s = e.MSs[t];
      this.RoleShowList.push(new PersonalDefine_1.RoleShowEntry(s.Q6n, s.F6n));
    }
    (this.CardShowList = e.SSs),
      (this.CardUnlockList = []),
      e.SSs.forEach((t) => {
        this.CardUnlockList.push(
          new PersonalDefine_1.PersonalCardData(t, !0, !0),
        );
      }),
      (this.Birthday = e.ZVn),
      (this.IsBirthdayDisplay = e.ySs),
      e.$xa &&
        ((this.jxa = e.$xa),
        (this.Wxa = e.Vxa),
        (this.Kxa = e.hwa),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Friend",
            28,
            "FriendSdkData",
            ["SdkUserId", this.jxa],
            ["SdkOnlineId", this.Wxa],
            ["this.SdkAccountId", this.Kxa],
          ),
        StringUtils_1.StringUtils.IsEmpty(this.jxa) ||
          (await this.RefreshSdkBlockState()));
  }
  async RefreshSdkBlockState() {
    var t = await ModelManager_1.ModelManager.KuroSdkModel.GetSdkBlockUserMap();
    t &&
      (t = t.get(this.Kxa)) &&
      ((this.Qxa = t), Log_1.Log.CheckDebug()) &&
      Log_1.Log.Debug("Friend", 28, "BlockBySdk", ["state", this.Qxa]);
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
  GetSdkOnlineId() {
    return this.Wxa;
  }
  GetSdkUserId() {
    return this.jxa;
  }
  GetAccountId() {
    return this.Kxa;
  }
  IfSdkCanShowFriend() {
    var t =
      PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.GetSdkFriendOnlyState();
    return !t || "" !== this.jxa;
  }
  GetBlockBySdk() {
    return this.Qxa;
  }
  CanShowInFriendList() {
    return !this.GetBlockBySdk() && this.IfSdkCanShowFriend();
  }
}
exports.FriendData = FriendData;
//# sourceMappingURL=FriendData.js.map
