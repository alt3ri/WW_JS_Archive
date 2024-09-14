"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRoleTrialData = exports.stateResolver = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ActivityData_1 = require("../../ActivityData");
exports.stateResolver = {
  [Protocol_1.Aki.Protocol.Lps.Proto_Running]: 0,
  [Protocol_1.Aki.Protocol.Lps.Proto_WaitTakeReward]: 1,
  [Protocol_1.Aki.Protocol.Lps.Proto_Finish]: 2,
};
class ActivityRoleTrialData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments),
      (this.RoleIdList = []),
      (this.RoleTrialIdList = []),
      (this.Z2e = new Map()),
      (this.CurrentRoleId = 0),
      (this.eFe = 0);
  }
  SetRoleTrialState(t) {
    this.eFe = t;
  }
  IsRolePreviewOn() {
    return 2 === this.eFe;
  }
  IsRoleInstanceOn() {
    return 3 === this.eFe;
  }
  PhraseEx(t) {
    (this.RoleIdList.length = 0), (this.RoleTrialIdList.length = 0);
    t = t.Vps;
    if (t)
      for (const o of t.Rps) {
        var e = exports.stateResolver[o.Lps],
          r =
            ConfigManager_1.ConfigManager.ActivityRoleTrialConfig.GetRoleTrialInfoConfigByRoleId(
              o.Q6n,
            );
        this.RoleTrialIdList.push(r.TrialRoleId),
          this.RoleIdList.push(o.Q6n),
          this.Z2e.set(o.Q6n, e);
      }
  }
  GetRewardStateByRoleId(t) {
    return this.Z2e.get(t) ?? 0;
  }
  SetRewardStateByRoleId(t, e) {
    this.Z2e.set(t, e);
  }
  GetInstanceIdByRoleId(t) {
    return ConfigManager_1.ConfigManager.ActivityRoleTrialConfig.GetRoleTrialInfoConfigByRoleId(
      t,
    )?.InstanceId;
  }
  GetRewardDataByRoleId(t) {
    var e =
      ConfigManager_1.ConfigManager.ActivityRoleTrialConfig.GetRoleTrialInfoConfigByRoleId(
        t,
      );
    if (e && e.RewardItem) {
      var r,
        o,
        a = this.GetRewardStateByRoleId(t),
        i = [];
      for ([r, o] of e.RewardItem) {
        var s = [{ IncId: 0, ItemId: r }, o];
        i.push({ Item: s, HasClaimed: 2 === a });
      }
      return i;
    }
  }
  NeedSelfControlFirstRedPoint() {
    return !1;
  }
  GetExDataRedPointShowState() {
    for (var [, t] of this.Z2e) if (1 === t) return !0;
    return !1;
  }
}
exports.ActivityRoleTrialData = ActivityRoleTrialData;
//# sourceMappingURL=ActivityRoleTrialData.js.map
