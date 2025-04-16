"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EventRotator = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  action_info_js_1 = require("../fb-action/action-info.js");
class EventRotator {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, s) {
    return (this.bb_pos = t), (this.bb = s), this;
  }
  static getRootAsEventRotator(t, s) {
    return (s || new EventRotator()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsEventRotator(t, s) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new EventRotator()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  startActions(t, s) {
    var r = this.bb.__offset(this.bb_pos, 4);
    return r
      ? (s || new action_info_js_1.ActionInfo()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + r) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  startActionsLength() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  endActions(t, s) {
    var r = this.bb.__offset(this.bb_pos, 6);
    return r
      ? (s || new action_info_js_1.ActionInfo()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + r) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  endActionsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startEventRotator(t) {
    t.startObject(2);
  }
  static addStartActions(t, s) {
    t.addFieldOffset(0, s, 0);
  }
  static createStartActionsVector(s, r) {
    s.startVector(4, r.length, 4);
    for (let t = r.length - 1; 0 <= t; t--) s.addOffset(r[t]);
    return s.endVector();
  }
  static startStartActionsVector(t, s) {
    t.startVector(4, s, 4);
  }
  static addEndActions(t, s) {
    t.addFieldOffset(1, s, 0);
  }
  static createEndActionsVector(s, r) {
    s.startVector(4, r.length, 4);
    for (let t = r.length - 1; 0 <= t; t--) s.addOffset(r[t]);
    return s.endVector();
  }
  static startEndActionsVector(t, s) {
    t.startVector(4, s, 4);
  }
  static endEventRotator(t) {
    return t.endObject();
  }
  static createEventRotator(t, s, r) {
    return (
      EventRotator.startEventRotator(t),
      EventRotator.addStartActions(t, s),
      EventRotator.addEndActions(t, r),
      EventRotator.endEventRotator(t)
    );
  }
}
exports.EventRotator = EventRotator;
//# sourceMappingURL=event-rotator.js.map
