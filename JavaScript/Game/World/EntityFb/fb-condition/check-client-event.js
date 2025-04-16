"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CheckClientEvent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CheckClientEvent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsCheckClientEvent(t, e) {
    return (e || new CheckClientEvent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCheckClientEvent(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new CheckClientEvent()).__init(
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
  static startCheckClientEvent(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addEventName(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endCheckClientEvent(t) {
    return t.endObject();
  }
  static createCheckClientEvent(t, e, i) {
    return (
      CheckClientEvent.startCheckClientEvent(t),
      CheckClientEvent.addType(t, e),
      CheckClientEvent.addEventName(t, i),
      CheckClientEvent.endCheckClientEvent(t)
    );
  }
}
exports.CheckClientEvent = CheckClientEvent;
//# sourceMappingURL=check-client-event.js.map
