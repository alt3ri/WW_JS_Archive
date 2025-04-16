"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FanInteractByFKey = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class FanInteractByFKey {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsFanInteractByFKey(t, e) {
    return (e || new FanInteractByFKey()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsFanInteractByFKey(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new FanInteractByFKey()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  tidInteractOptionText(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startFanInteractByFKey(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addTidInteractOptionText(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endFanInteractByFKey(t) {
    return t.endObject();
  }
  static createFanInteractByFKey(t, e, a) {
    return (
      FanInteractByFKey.startFanInteractByFKey(t),
      FanInteractByFKey.addType(t, e),
      FanInteractByFKey.addTidInteractOptionText(t, a),
      FanInteractByFKey.endFanInteractByFKey(t)
    );
  }
}
exports.FanInteractByFKey = FanInteractByFKey;
//# sourceMappingURL=fan-interact-by-fkey.js.map
