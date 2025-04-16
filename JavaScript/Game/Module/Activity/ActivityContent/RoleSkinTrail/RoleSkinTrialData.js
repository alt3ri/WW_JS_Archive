"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleSkinTrialData = exports.RoleSkinTrailContentData = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ActivityData_1 = require("../../ActivityData");
class RoleSkinTrailContentData {
  constructor() {
    (this.RoleId = 0),
      (this.Id = 0),
      (this.ChallengeState = Protocol_1.Aki.Protocol.Lps.Proto_Running);
  }
  GetRewardData() {
    var t =
      ConfigManager_1.ConfigManager.RoleSkinTrialConfig.GetRoleSkinTrialInfoByRoleId(
        this.RoleId,
      );
    if (t && t.DropId) {
      var e,
        r,
        n = [];
      for ([e, r] of ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(
        t.DropId,
      ).DropPreview) {
        var i = {
          Item: [{ IncId: 0, ItemId: e }, r],
          HasClaimed: this.ChallengeState === Protocol_1.Aki.Protocol.Lps.a3_,
        };
        n.push(i);
      }
      return n;
    }
  }
  GetRoleSkinTrialInfo() {
    return ConfigManager_1.ConfigManager.RoleSkinTrialConfig.GetRoleSkinTrialInfoByRoleId(
      this.RoleId,
    );
  }
  GetInstanceDungeonId() {
    return this.GetRoleSkinTrialInfo().InstanceId;
  }
  GetAccessId() {
    return this.GetRoleSkinTrialInfo().AccessId;
  }
  GetRoleSkinTrialUiConfig() {
    return ConfigManager_1.ConfigManager.RoleSkinTrialConfig.GetRoleSkinTrialUiConfigById(
      this.GetRoleSkinTrialInfo().UiConfigId,
    );
  }
  Phrase(t) {
    (this.Id = t.v7l),
      (this.RoleId =
        ConfigManager_1.ConfigManager.RoleSkinTrialConfig.GetRoleSkinTrialInfoById(
          this.Id,
        ).RoleId),
      (this.ChallengeState = t.Lps);
  }
}
exports.RoleSkinTrailContentData = RoleSkinTrailContentData;
class RoleSkinTrialData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments), (this.S7l = []);
  }
  PhraseEx(t) {
    this.S7l.length = 0;
    for (const r of t.XS_.HM_) {
      var e = new RoleSkinTrailContentData();
      e.Phrase(r), this.S7l.push(e);
    }
  }
  FinishRewardById(t) {
    t = this.GetRoleSkinTrailContentDataById(t);
    t && (t.ChallengeState = Protocol_1.Aki.Protocol.Lps.a3_);
  }
  GetRoleSkinTrailContentDataByRoleId(e) {
    return this.S7l.find((t) => t.RoleId === e);
  }
  GetRoleSkinTrailContentDataById(e) {
    return this.S7l.find((t) => t.Id === e);
  }
  GetConfig() {
    return ConfigManager_1.ConfigManager.RoleSkinTrialConfig.GetRoleSkinTrialActivityByActivityId(
      this.Id,
    );
  }
  GetSelectIdByIndex(t) {
    var e = this.GetRoleList();
    return e.length <= t ? 0 : e[t];
  }
  GetInstanceIdById(t) {
    return ConfigManager_1.ConfigManager.RoleSkinTrialConfig.GetRoleSkinTrialInfoById(
      t,
    )?.InstanceId;
  }
  GetRoleList() {
    return this.GetConfig().RoleIdList;
  }
  GetRewardStateById(t) {
    t = this.GetRoleSkinTrailContentDataById(t);
    return t ? t.ChallengeState : Protocol_1.Aki.Protocol.Lps.Proto_Running;
  }
  GetRewardDataById(t) {
    t = this.GetRoleSkinTrailContentDataById(t);
    if (t) return t.GetRewardData();
  }
  GetInfoByRoleIdAndInstanceDungeonId(t, e) {
    for (const n of this.S7l)
      if (n.RoleId === t) {
        var r = n.GetRoleSkinTrialInfo();
        if (r.InstanceId === e) return r;
      }
  }
  GetRoleSkinTrialUiConfigById(t) {
    t = this.GetRoleSkinTrailContentDataById(t);
    if (t) return t.GetRoleSkinTrialUiConfig();
  }
  GetAccessIdById(t) {
    t = this.GetRoleSkinTrailContentDataById(t);
    return t ? t.GetAccessId() : 0;
  }
  NeedSelfControlFirstRedPoint() {
    return !1;
  }
  GetExDataRedPointShowState() {
    for (const t of this.S7l)
      if (t.ChallengeState === Protocol_1.Aki.Protocol.Lps.Proto_WaitTakeReward)
        return !0;
    return !1;
  }
}
exports.RoleSkinTrialData = RoleSkinTrialData;
//# sourceMappingURL=RoleSkinTrialData.js.map
