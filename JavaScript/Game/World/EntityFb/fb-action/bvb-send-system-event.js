"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BvbSendSystemEvent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_bvb_event_data_js_1 = require("../fb-common/union-bvb-event-data.js");
class BvbSendSystemEvent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsBvbSendSystemEvent(t, e) {
    return (e || new BvbSendSystemEvent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsBvbSendSystemEvent(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new BvbSendSystemEvent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  eventDataType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_bvb_event_data_js_1.UnionBvbEventData.NONE;
  }
  eventData(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__union(t, this.bb_pos + e) : void 0;
  }
  static startBvbSendSystemEvent(t) {
    t.startObject(2);
  }
  static addEventDataType(t, e) {
    t.addFieldInt8(0, e, union_bvb_event_data_js_1.UnionBvbEventData.NONE);
  }
  static addEventData(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endBvbSendSystemEvent(t) {
    return t.endObject();
  }
  static createBvbSendSystemEvent(t, e, n) {
    return (
      BvbSendSystemEvent.startBvbSendSystemEvent(t),
      BvbSendSystemEvent.addEventDataType(t, e),
      BvbSendSystemEvent.addEventData(t, n),
      BvbSendSystemEvent.endBvbSendSystemEvent(t)
    );
  }
}
exports.BvbSendSystemEvent = BvbSendSystemEvent;
//# sourceMappingURL=bvb-send-system-event.js.map
