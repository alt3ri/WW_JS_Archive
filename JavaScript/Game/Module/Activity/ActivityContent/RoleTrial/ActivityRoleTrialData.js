"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRoleTrialData = exports.stateResolver = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ActivityData_1 = require("../../ActivityData");
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
    return this.Gke === 2;
  }
  IsRoleInstanceOn() {
    return this.Gke === 3;
  }
  PhraseEx(t) {
    (this.RoleIdList.length = 0), (this.RoleTrialIdList.length = 0);
    t = t.v0s;
    if (t)
      for (const o of t.o0s) {
        const e = exports.stateResolver[o.r0s];
        const r =
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
    const e =
      ConfigManager_1.ConfigManager.ActivityRoleTrialConfig.GetRoleTrialInfoConfigByRoleId(
        t,
      );
    if (e && e.RewardItem) {
      let r;
      let o;
      const a = this.GetRewardStateByRoleId(t);
      const i = [];
      for ([r, o] of e.RewardItem) {
        const s = [{ IncId: 0, ItemId: r }, o];
        i.push({ Item: s, HasClaimed: a === 2 });
      }
      return i;
    }
  }
  NeedSelfControlFirstRedPoint() {
    return !1;
  }
  GetExDataRedPointShowState() {
    for (const [, t] of this.qke) if (t === 1) return !0;
    return !1;
  }
}
exports.ActivityRoleTrialData = ActivityRoleTrialData;
// # sourceMappingURL=ActivityRoleTrialData.js.map
