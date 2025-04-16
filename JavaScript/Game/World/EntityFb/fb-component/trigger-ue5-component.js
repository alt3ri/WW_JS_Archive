"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TriggerUe5Component = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  trigger_actions_js_1 = require("../fb-action/trigger-actions.js");
class TriggerUe5Component {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsTriggerUe5Component(t, e) {
    return (e || new TriggerUe5Component()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsTriggerUe5Component(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new TriggerUe5Component()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  maxTriggerTimes() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  isNotLoad() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  triggerActions(t) {
    var e = this.bb.__offset(this.bb_pos, 10);
    return e
      ? (t || new trigger_actions_js_1.TriggerActions()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  static startTriggerUe5Component(t) {
    t.startObject(4);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addMaxTriggerTimes(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static addIsNotLoad(t, e) {
    t.addFieldInt8(2, +e, 0);
  }
  static addTriggerActions(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static endTriggerUe5Component(t) {
    return t.endObject();
  }
}
exports.TriggerUe5Component = TriggerUe5Component;
//# sourceMappingURL=trigger-ue5-component.js.map
