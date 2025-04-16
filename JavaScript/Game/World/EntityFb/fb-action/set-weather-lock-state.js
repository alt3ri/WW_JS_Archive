"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SetWeatherLockState = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SetWeatherLockState {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsSetWeatherLockState(t, e) {
    return (e || new SetWeatherLockState()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsSetWeatherLockState(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new SetWeatherLockState()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  lockState(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  areaIds(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readInt32(this.bb.__vector(this.bb_pos + e) + 4 * t) : 0;
  }
  areaIdsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  areaIdsArray() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? new Int32Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t),
          this.bb.__vector_len(this.bb_pos + t),
        )
      : void 0;
  }
  static startSetWeatherLockState(t) {
    t.startObject(2);
  }
  static addLockState(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addAreaIds(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static createAreaIdsVector(e, r) {
    e.startVector(4, r.length, 4);
    for (let t = r.length - 1; 0 <= t; t--) e.addInt32(r[t]);
    return e.endVector();
  }
  static startAreaIdsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endSetWeatherLockState(t) {
    return t.endObject();
  }
  static createSetWeatherLockState(t, e, r) {
    return (
      SetWeatherLockState.startSetWeatherLockState(t),
      SetWeatherLockState.addLockState(t, e),
      SetWeatherLockState.addAreaIds(t, r),
      SetWeatherLockState.endSetWeatherLockState(t)
    );
  }
}
exports.SetWeatherLockState = SetWeatherLockState;
//# sourceMappingURL=set-weather-lock-state.js.map
