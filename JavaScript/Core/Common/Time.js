"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Time = void 0);
const NetInfo_1 = require("../Net/NetInfo");
class Time {
  static get D9() {
    return Date.now();
  }
  static get TimeDilation() {
    return this.R9;
  }
  static get ServerStopTimeStamp() {
    return this.U9 + this.WorldTime + NetInfo_1.NetInfo.RttMs;
  }
  static get ServerTimeStamp() {
    return this.A9 + this.D9;
  }
  static get CombatServerTime() {
    return Math.floor(this.P9 + this.Now + NetInfo_1.NetInfo.RttMs / 2);
  }
  static SetServerTimeStamp(t, e) {
    this.A9 = t + e / 2 - this.D9;
  }
  static SetServerTimeOffset(t) {
    this.P9 = t;
  }
  static SetTimeCheckServerStopTimeStamp(t) {
    this.U9 = t;
  }
  static SetTimeDilation(t) {
    this.R9 = t;
  }
  static get DeltaTime() {
    return this.x9;
  }
  static get DeltaTimeSeconds() {
    return this.x9 * Time.w9;
  }
  static get Frame() {
    return this.B9;
  }
  static get Now() {
    return this.b9;
  }
  static get NowSeconds() {
    return this.b9 * Time.w9;
  }
  static get WorldTime() {
    return this.q9;
  }
  static get WorldTimeSeconds() {
    return this.q9 * Time.w9;
  }
  static Initialize() {
    (this.B9 = 0),
      (this.b9 = 0),
      (this.q9 = 0),
      (this.x9 = 0),
      (Time.OriginTimeDilation = 1),
      (this.R9 = 1);
  }
  static Tick(t) {
    (this.x9 = t), (this.B9 += 1), (this.b9 += t), (this.q9 += t * this.R9);
  }
}
((exports.Time = Time).w9 = 0.001),
  (Time.B9 = 0),
  (Time.b9 = 0),
  (Time.q9 = 0),
  (Time.x9 = 0),
  (Time.A9 = 0),
  (Time.U9 = 0),
  (Time.P9 = 0),
  (Time.R9 = 1),
  (Time.OriginTimeDilation = 1);
// # sourceMappingURL=Time.js.map
