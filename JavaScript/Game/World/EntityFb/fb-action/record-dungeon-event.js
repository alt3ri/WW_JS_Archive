"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RecordDungeonEvent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_dungeon_event_type_js_1 = require("../fb-action/union-dungeon-event-type.js");
class RecordDungeonEvent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, n) {
    return (this.bb_pos = e), (this.bb = n), this;
  }
  static getRootAsRecordDungeonEvent(e, n) {
    return (n || new RecordDungeonEvent()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsRecordDungeonEvent(e, n) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (n || new RecordDungeonEvent()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  eventConfigType() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e
      ? this.bb.readUint8(this.bb_pos + e)
      : union_dungeon_event_type_js_1.UnionDungeonEventType.NONE;
  }
  eventConfig(e) {
    var n = this.bb.__offset(this.bb_pos, 6);
    return n ? this.bb.__union(e, this.bb_pos + n) : void 0;
  }
  static startRecordDungeonEvent(e) {
    e.startObject(2);
  }
  static addEventConfigType(e, n) {
    e.addFieldInt8(
      0,
      n,
      union_dungeon_event_type_js_1.UnionDungeonEventType.NONE,
    );
  }
  static addEventConfig(e, n) {
    e.addFieldOffset(1, n, 0);
  }
  static endRecordDungeonEvent(e) {
    return e.endObject();
  }
  static createRecordDungeonEvent(e, n, t) {
    return (
      RecordDungeonEvent.startRecordDungeonEvent(e),
      RecordDungeonEvent.addEventConfigType(e, n),
      RecordDungeonEvent.addEventConfig(e, t),
      RecordDungeonEvent.endRecordDungeonEvent(e)
    );
  }
}
exports.RecordDungeonEvent = RecordDungeonEvent;
//# sourceMappingURL=record-dungeon-event.js.map
