"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CheckSystemEventBvb = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CheckSystemEventBvb {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsCheckSystemEventBvb(t, e) {
    return (e || new CheckSystemEventBvb()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCheckSystemEventBvb(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new CheckSystemEventBvb()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  eventName(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startCheckSystemEventBvb(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addEventName(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endCheckSystemEventBvb(t) {
    return t.endObject();
  }
  static createCheckSystemEventBvb(t, e, s) {
    return (
      CheckSystemEventBvb.startCheckSystemEventBvb(t),
      CheckSystemEventBvb.addType(t, e),
      CheckSystemEventBvb.addEventName(t, s),
      CheckSystemEventBvb.endCheckSystemEventBvb(t)
    );
  }
}
exports.CheckSystemEventBvb = CheckSystemEventBvb;
//# sourceMappingURL=check-system-event-bvb.js.map
