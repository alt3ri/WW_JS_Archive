"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DefaultAkEvent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DefaultAkEvent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsDefaultAkEvent(t, e) {
    return (e || new DefaultAkEvent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsDefaultAkEvent(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new DefaultAkEvent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startDefaultAkEvent(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endDefaultAkEvent(t) {
    return t.endObject();
  }
  static createDefaultAkEvent(t, e) {
    return (
      DefaultAkEvent.startDefaultAkEvent(t),
      DefaultAkEvent.addType(t, e),
      DefaultAkEvent.endDefaultAkEvent(t)
    );
  }
}
exports.DefaultAkEvent = DefaultAkEvent;
//# sourceMappingURL=default-ak-event.js.map
