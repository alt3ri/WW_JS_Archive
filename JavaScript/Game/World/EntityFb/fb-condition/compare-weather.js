"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CompareWeather = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CompareWeather {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsCompareWeather(e, t) {
    return (t || new CompareWeather()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsCompareWeather(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new CompareWeather()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  compare(e) {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  weather(e) {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  weatherId() {
    var e = this.bb.__offset(this.bb_pos, 10);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  static startCompareWeather(e) {
    e.startObject(4);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addCompare(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static addWeather(e, t) {
    e.addFieldOffset(2, t, 0);
  }
  static addWeatherId(e, t) {
    e.addFieldInt32(3, t, 0);
  }
  static endCompareWeather(e) {
    return e.endObject();
  }
  static createCompareWeather(e, t, r, a, s) {
    return (
      CompareWeather.startCompareWeather(e),
      CompareWeather.addType(e, t),
      CompareWeather.addCompare(e, r),
      CompareWeather.addWeather(e, a),
      CompareWeather.addWeatherId(e, s),
      CompareWeather.endCompareWeather(e)
    );
  }
}
exports.CompareWeather = CompareWeather;
//# sourceMappingURL=compare-weather.js.map
