"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MonitorComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  cone_trigger_shape_js_1 = require("../fb-shape/cone-trigger-shape.js");
class MonitorComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsMonitorComponent(t, e) {
    return (e || new MonitorComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsMonitorComponent(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new MonitorComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  range(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e
      ? (t || new cone_trigger_shape_js_1.ConeTriggerShape()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  availableStates(t, e) {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i
      ? this.bb.__string(this.bb.__vector(this.bb_pos + i) + 4 * t, e)
      : void 0;
  }
  availableStatesLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  stateAfterTriggered(t) {
    var e = this.bb.__offset(this.bb_pos, 10);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  stateAfterLeaved(t) {
    var e = this.bb.__offset(this.bb_pos, 12);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startMonitorComponent(t) {
    t.startObject(5);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addRange(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addAvailableStates(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static createAvailableStatesVector(e, i) {
    e.startVector(4, i.length, 4);
    for (let t = i.length - 1; 0 <= t; t--) e.addOffset(i[t]);
    return e.endVector();
  }
  static startAvailableStatesVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addStateAfterTriggered(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static addStateAfterLeaved(t, e) {
    t.addFieldOffset(4, e, 0);
  }
  static endMonitorComponent(t) {
    return t.endObject();
  }
}
exports.MonitorComponent = MonitorComponent;
//# sourceMappingURL=monitor-component.js.map
