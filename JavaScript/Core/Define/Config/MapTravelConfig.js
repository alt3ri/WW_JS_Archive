"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapTravelConfig = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
  DicIntString_1 = require("./SubType/DicIntString");
class MapTravelConfig {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get ActivityId() {
    return this.activityid();
  }
  get MaxLevel() {
    return this.maxlevel();
  }
  get ExpItemId() {
    return this.expitemid();
  }
  get FinalRewardId() {
    return this.finalrewardid();
  }
  get TabName() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.tabnameLength(),
      this.tabnameKey,
      this.tabnameValue,
      this,
    );
  }
  tabnameKey(t) {
    return this.tabname(t)?.key();
  }
  tabnameValue(t) {
    return this.tabname(t)?.value();
  }
  get TabIcon() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.tabiconLength(),
      this.tabiconKey,
      this.tabiconValue,
      this,
    );
  }
  tabiconKey(t) {
    return this.tabicon(t)?.key();
  }
  tabiconValue(t) {
    return this.tabicon(t)?.value();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsMapTravelConfig(t, i) {
    return (i || new MapTravelConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  activityid() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  maxlevel() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  expitemid() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  finalrewardid() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetTabnameAt(t, i) {
    return this.tabname(t);
  }
  tabname(t, i) {
    var e = this.J7.__offset(this.z7, 12);
    return e
      ? (i || new DicIntString_1.DicIntString()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + e) + 4 * t),
          this.J7,
        )
      : null;
  }
  tabnameLength() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetTabiconAt(t, i) {
    return this.tabicon(t);
  }
  tabicon(t, i) {
    var e = this.J7.__offset(this.z7, 14);
    return e
      ? (i || new DicIntString_1.DicIntString()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + e) + 4 * t),
          this.J7,
        )
      : null;
  }
  tabiconLength() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
}
exports.MapTravelConfig = MapTravelConfig;
//# sourceMappingURL=MapTravelConfig.js.map
