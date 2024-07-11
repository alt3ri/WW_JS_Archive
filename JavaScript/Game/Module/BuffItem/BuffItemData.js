"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BuffItemData = void 0);
const Time_1 = require("../../../Core/Common/Time"),
  TimeUtil_1 = require("../../Common/TimeUtil");
class BuffItemData {
  constructor(t, e, i) {
    (this.q0t = 0),
      (this.G0t = 0),
      (this.N0t = 0),
      (this.O0t = t),
      (this.k0t = i),
      this.SetEndCdTimeStamp(e);
  }
  get ItemConfigId() {
    return this.O0t;
  }
  get EndCdTimeStamp() {
    return this.q0t;
  }
  SetEndCdTimeStamp(t) {
    (this.q0t = t / TimeUtil_1.TimeUtil.InverseMillisecond),
      (this.G0t = TimeUtil_1.TimeUtil.GetServerTime()),
      (this.N0t = Time_1.Time.WorldTimeSeconds);
  }
  SetTotalCdTime(t) {
    this.k0t = t;
  }
  GetBuffItemRemainCdTime() {
    var t = this.q0t - (Time_1.Time.WorldTimeSeconds - this.N0t + this.G0t);
    return Math.max(t, 0);
  }
  GetBuffItemTotalCdTime() {
    return this.k0t;
  }
}
exports.BuffItemData = BuffItemData;
//# sourceMappingURL=BuffItemData.js.map
