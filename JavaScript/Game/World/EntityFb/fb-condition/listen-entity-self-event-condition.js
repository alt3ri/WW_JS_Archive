"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ListenEntitySelfEventCondition = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ListenEntitySelfEventCondition {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsListenEntitySelfEventCondition(t, i) {
    return (i || new ListenEntitySelfEventCondition()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsListenEntitySelfEventCondition(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new ListenEntitySelfEventCondition()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  eventKey(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  resetAfterConditionMet() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startListenEntitySelfEventCondition(t) {
    t.startObject(3);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addEventKey(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addResetAfterConditionMet(t, i) {
    t.addFieldInt8(2, +i, 0);
  }
  static endListenEntitySelfEventCondition(t) {
    return t.endObject();
  }
  static createListenEntitySelfEventCondition(t, i, n, e) {
    return (
      ListenEntitySelfEventCondition.startListenEntitySelfEventCondition(t),
      ListenEntitySelfEventCondition.addType(t, i),
      ListenEntitySelfEventCondition.addEventKey(t, n),
      ListenEntitySelfEventCondition.addResetAfterConditionMet(t, e),
      ListenEntitySelfEventCondition.endListenEntitySelfEventCondition(t)
    );
  }
}
exports.ListenEntitySelfEventCondition = ListenEntitySelfEventCondition;
//# sourceMappingURL=listen-entity-self-event-condition.js.map
