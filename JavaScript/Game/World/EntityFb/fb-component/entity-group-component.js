"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EntityGroupComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  entity_state_trigger_js_1 = require("../fb-component/entity-state-trigger.js"),
  failure_state_trigger_js_1 = require("../fb-component/failure-state-trigger.js"),
  finish_state_trigger_js_1 = require("../fb-component/finish-state-trigger.js");
class EntityGroupComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsEntityGroupComponent(t, i) {
    return (i || new EntityGroupComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsEntityGroupComponent(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new EntityGroupComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  entityIds(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.readInt32(this.bb.__vector(this.bb_pos + i) + 4 * t) : 0;
  }
  entityIdsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  entityIdsArray() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? new Int32Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t),
          this.bb.__vector_len(this.bb_pos + t),
        )
      : void 0;
  }
  stateTriggers(t, i) {
    var s = this.bb.__offset(this.bb_pos, 8);
    return s
      ? (i || new entity_state_trigger_js_1.EntityStateTrigger()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  stateTriggersLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  finishState(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    return i
      ? (t || new finish_state_trigger_js_1.FinishStateTrigger()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  failureState(t) {
    var i = this.bb.__offset(this.bb_pos, 12);
    return i
      ? (t || new failure_state_trigger_js_1.FailureStateTrigger()).__init(
          this.bb.__indirect(this.bb_pos + i),
          this.bb,
        )
      : void 0;
  }
  static startEntityGroupComponent(t) {
    t.startObject(5);
  }
  static addDisabled(t, i) {
    t.addFieldInt8(0, +i, 0);
  }
  static addEntityIds(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static createEntityIdsVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) i.addInt32(s[t]);
    return i.endVector();
  }
  static startEntityIdsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addStateTriggers(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static createStateTriggersVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) i.addOffset(s[t]);
    return i.endVector();
  }
  static startStateTriggersVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addFinishState(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static addFailureState(t, i) {
    t.addFieldOffset(4, i, 0);
  }
  static endEntityGroupComponent(t) {
    return t.endObject();
  }
}
exports.EntityGroupComponent = EntityGroupComponent;
//# sourceMappingURL=entity-group-component.js.map
