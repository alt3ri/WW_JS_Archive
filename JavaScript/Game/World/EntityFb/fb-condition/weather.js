"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Weather = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class Weather {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsWeather(t, e) {
    return (e || new Weather()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsWeather(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new Weather()).__init(t.readInt32(t.position()) + t.position(), t)
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  compare(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  weather(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  weatherId() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startWeather(t) {
    t.startObject(4);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addCompare(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addWeather(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static addWeatherId(t, e) {
    t.addFieldInt32(3, e, 0);
  }
  static endWeather(t) {
    return t.endObject();
  }
  static createWeather(t, e, r, s, a) {
    return (
      Weather.startWeather(t),
      Weather.addType(t, e),
      Weather.addCompare(t, r),
      Weather.addWeather(t, s),
      Weather.addWeatherId(t, a),
      Weather.endWeather(t)
    );
  }
}
exports.Weather = Weather;
//# sourceMappingURL=weather.js.map
