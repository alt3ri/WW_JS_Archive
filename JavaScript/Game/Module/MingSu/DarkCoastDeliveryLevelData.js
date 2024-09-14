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
      (this.dHa = !1),
      (this.CHa = !1),
      (this.DKi = !1),
      (this.gHa = !1),
      (this.fHa = void 0),
      (this.Config = t),
      (this.Id = t.Id),
      (this.Goal = e),
      (this.THs = s);
  }
  pHa() {
    var t, e;
    this.fHa = [];
    for ([
      t,
      e,
    ] of ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreview(
      this.THs,
    ))
      this.fHa.push([{ ItemId: t, IncId: 0 }, e]);
  }
  SetDefeatedGuardState(t) {
    this.dHa = t;
  }
  SetReceivedGuardRewardState(t) {
    this.CHa = t;
  }
  SetIsUnLockState(t) {
    this.DKi = this.Id <= t;
  }
  GetIsUnLock() {
    return this.DKi;
  }
  SetReceiveRewardState(t) {
    this.gHa = t;
  }
  GetDarkCoastDeliveryGuardState() {
    return this.CHa ? 4 : this.dHa ? 3 : this.DKi ? 1 : 0;
  }
  GetDarkCoastDeliveryRewardState() {
    return this.gHa ? 2 : this.DKi ? 1 : 0;
  }
  GetRewardItems() {
    return void 0 === this.fHa && this.pHa(), this.fHa;
  }
}
exports.DarkCoastDeliveryLevelData = DarkCoastDeliveryLevelData;
//# sourceMappingURL=DarkCoastDeliveryLevelData.js.map
