"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DarkCoastDeliveryLevelData = void 0);
const ConfigManager_1 = require("../../Manager/ConfigManager");
class DarkCoastDeliveryLevelData {
  constructor(t, e, s) {
    (this.Id = 0),
      (this.Config = void 0),
      (this.THs = 0),
      (this.Goal = 0),
      (this.gQa = !1),
      (this.fQa = !1),
      (this.DKi = !1),
      (this.pQa = !1),
      (this.vQa = void 0),
      (this.Config = t),
      (this.Id = t.Id),
      (this.Goal = e),
      (this.THs = s);
  }
  MQa() {
    var t, e;
    this.vQa = [];
    for ([
      t,
      e,
    ] of ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreview(
      this.THs,
    ))
      this.vQa.push([{ ItemId: t, IncId: 0 }, e]);
  }
  SetDefeatedGuardState(t) {
    this.gQa = t;
  }
  SetReceivedGuardRewardState(t) {
    this.fQa = t;
  }
  SetIsUnLockState(t) {
    this.DKi = this.Id <= t;
  }
  GetIsUnLock() {
    return this.DKi;
  }
  SetReceiveRewardState(t) {
    this.pQa = t;
  }
  GetDarkCoastDeliveryGuardState() {
    return this.fQa ? 4 : this.gQa ? 3 : this.DKi ? 1 : 0;
  }
  GetDarkCoastDeliveryRewardState() {
    return this.pQa ? 2 : this.DKi ? 1 : 0;
  }
  GetRewardItems() {
    return void 0 === this.vQa && this.MQa(), this.vQa;
  }
}
exports.DarkCoastDeliveryLevelData = DarkCoastDeliveryLevelData;
//# sourceMappingURL=DarkCoastDeliveryLevelData.js.map
