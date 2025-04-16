"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TrampleUe5Component = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  action_info_js_1 = require("../fb-action/action-info.js");
class TrampleUe5Component {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsTrampleUe5Component(t, e) {
    return (e || new TrampleUe5Component()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsTrampleUe5Component(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new TrampleUe5Component()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  isDisposable() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  triggerActions(t, e) {
    var r = this.bb.__offset(this.bb_pos, 8);
    return r
      ? (e || new action_info_js_1.ActionInfo()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + r) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  triggerActionsLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  recoveryActions(t, e) {
    var r = this.bb.__offset(this.bb_pos, 10);
    return r
      ? (e || new action_info_js_1.ActionInfo()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + r) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  recoveryActionsLength() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startTrampleUe5Component(t) {
    t.startObject(4);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addIsDisposable(t, e) {
    t.addFieldInt8(1, +e, 0);
  }
  static addTriggerActions(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static createTriggerActionsVector(e, r) {
    e.startVector(4, r.length, 4);
    for (let t = r.length - 1; 0 <= t; t--) e.addOffset(r[t]);
    return e.endVector();
  }
  static startTriggerActionsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addRecoveryActions(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static createRecoveryActionsVector(e, r) {
    e.startVector(4, r.length, 4);
    for (let t = r.length - 1; 0 <= t; t--) e.addOffset(r[t]);
    return e.endVector();
  }
  static startRecoveryActionsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endTrampleUe5Component(t) {
    return t.endObject();
  }
  static createTrampleUe5Component(t, e, r, i, s) {
    return (
      TrampleUe5Component.startTrampleUe5Component(t),
      TrampleUe5Component.addDisabled(t, e),
      TrampleUe5Component.addIsDisposable(t, r),
      TrampleUe5Component.addTriggerActions(t, i),
      TrampleUe5Component.addRecoveryActions(t, s),
      TrampleUe5Component.endTrampleUe5Component(t)
    );
  }
}
exports.TrampleUe5Component = TrampleUe5Component;
//# sourceMappingURL=trample-ue5-component.js.map
