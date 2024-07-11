"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleAudio = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
  DicIntString_1 = require("./SubType/DicIntString");
class RoleAudio {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get Name() {
    return this.name();
  }
  get FastClimbEvent() {
    return this.fastclimbevent();
  }
  get VisionMorphEvent() {
    return this.visionmorphevent();
  }
  get VisionSummonEvent() {
    return this.visionsummonevent();
  }
  get OpenTreasureBoxEvent() {
    return this.opentreasureboxevent();
  }
  get ScanTreasureBoxEvent() {
    return this.scantreasureboxevent();
  }
  get JoinTeamEvent() {
    return this.jointeamevent();
  }
  get LostHealthEventMap() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.losthealtheventmapLength(),
      (t) => this.losthealtheventmap(t)?.key(),
      (t) => this.losthealtheventmap(t)?.value(),
    );
  }
  get LowStrengthEventList() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.lowstrengtheventlistLength(),
      (t) => this.lowstrengtheventlist(t),
    );
  }
  get BreakUpEventList() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.breakupeventlistLength(),
      (t) => this.breakupeventlist(t),
    );
  }
  __init(t, e) {
    return (this.z7 = t), (this.J7 = e), this;
  }
  static getRootAsRoleAudio(t, e) {
    return (e || new RoleAudio()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  name(t) {
    var e = this.J7.__offset(this.z7, 6);
    return e ? this.J7.__string(this.z7 + e, t) : null;
  }
  fastclimbevent(t) {
    var e = this.J7.__offset(this.z7, 8);
    return e ? this.J7.__string(this.z7 + e, t) : null;
  }
  visionmorphevent(t) {
    var e = this.J7.__offset(this.z7, 10);
    return e ? this.J7.__string(this.z7 + e, t) : null;
  }
  visionsummonevent(t) {
    var e = this.J7.__offset(this.z7, 12);
    return e ? this.J7.__string(this.z7 + e, t) : null;
  }
  opentreasureboxevent(t) {
    var e = this.J7.__offset(this.z7, 14);
    return e ? this.J7.__string(this.z7 + e, t) : null;
  }
  scantreasureboxevent(t) {
    var e = this.J7.__offset(this.z7, 16);
    return e ? this.J7.__string(this.z7 + e, t) : null;
  }
  jointeamevent(t) {
    var e = this.J7.__offset(this.z7, 18);
    return e ? this.J7.__string(this.z7 + e, t) : null;
  }
  GetLosthealtheventmapAt(t, e) {
    return this.losthealtheventmap(t);
  }
  losthealtheventmap(t, e) {
    var s = this.J7.__offset(this.z7, 20);
    return s
      ? (e || new DicIntString_1.DicIntString()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
          this.J7,
        )
      : null;
  }
  losthealtheventmapLength() {
    var t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetLowstrengtheventlistAt(t) {
    return this.lowstrengtheventlist(t);
  }
  lowstrengtheventlist(t, e) {
    var s = this.J7.__offset(this.z7, 22);
    return s
      ? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, e)
      : null;
  }
  lowstrengtheventlistLength() {
    var t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetBreakupeventlistAt(t) {
    return this.breakupeventlist(t);
  }
  breakupeventlist(t, e) {
    var s = this.J7.__offset(this.z7, 24);
    return s
      ? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, e)
      : null;
  }
  breakupeventlistLength() {
    var t = this.J7.__offset(this.z7, 24);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
}
exports.RoleAudio = RoleAudio;
//# sourceMappingURL=RoleAudio.js.map
