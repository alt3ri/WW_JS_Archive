"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.StopGuestCartethyia = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class StopGuestCartethyia {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsStopGuestCartethyia(t, e) {
    return (e || new StopGuestCartethyia()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsStopGuestCartethyia(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new StopGuestCartethyia()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startStopGuestCartethyia(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endStopGuestCartethyia(t) {
    return t.endObject();
  }
  static createStopGuestCartethyia(t, e) {
    return (
      StopGuestCartethyia.startStopGuestCartethyia(t),
      StopGuestCartethyia.addType(t, e),
      StopGuestCartethyia.endStopGuestCartethyia(t)
    );
  }
}
exports.StopGuestCartethyia = StopGuestCartethyia;
//# sourceMappingURL=stop-guest-cartethyia.js.map
