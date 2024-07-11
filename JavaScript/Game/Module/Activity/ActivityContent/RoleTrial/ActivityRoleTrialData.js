"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRoleTrialData = exports.stateResolver = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ActivityData_1 = require("../../ActivityData");
exports.stateResolver = {
  [Protocol_1.Aki.Protocol.r0s.Proto_Running]: 0,
  [Protocol_1.Aki.Protocol.r0s.Proto_WaitTakeReward]: 1,
  [Protocol_1.Aki.Protocol.r0s.Proto_Finish]: 2,
};
class ActivityRoleTrialData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments),
      (this.RoleIdList = []),
      (this.RoleTrialIdList = []),
      (this.qke = new Map()),
      (this.CurrentRoleId = 0),
      (this.Gke = 0);
  }
  SetRoleTrialState(t) {
    this.Gke = t;
  }
  IsRolePreviewOn() {
    return 2 === this.Gke;
  }
  IsRoleInstanceOn() {
    return 3 === this.Gke;
  }
  PhraseEx(t) {
    (this.RoleIdList.length = 0), (this.RoleTrialIdList.length = 0);
    t = t.v0s;
    if (t)
      for (const o of t.o0s) {
        var e = exports.stateResolver[o.r0s],
          r =
            ConfigManager_1.ConfigManager.ActivityRoleTrialConfig.GetRoleTrialInfoConfigByRoleId(
              o.l3n,
            );
        this.RoleTrialIdList.push(r.TrialRoleId),
          this.RoleIdList.push(o.l3n),
          this.qke.set(o.l3n, e);
      }
  }
  GetRewardStateByRoleId(t) {
    return this.qke.get(t) ?? 0;
  }
  SetRewardStateByRoleId(t, e) {
    this.qke.set(t, e);
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
    for (var [, t] of this.qke) if (1 === t) return !0;
    return !1;
  }
}
exports.ActivityRoleTrialData = ActivityRoleTrialData;
//# sourceMappingURL=ActivityRoleTrialData.js.map
