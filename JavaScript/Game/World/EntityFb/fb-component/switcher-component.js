"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SwitcherComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  action_info_js_1 = require("../fb-action/action-info.js");
class SwitcherComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsSwitcherComponent(t, i) {
    return (i || new SwitcherComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsSwitcherComponent(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new SwitcherComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  content(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  icon(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  onActions(t, i) {
    var e = this.bb.__offset(this.bb_pos, 10);
    return e
      ? (i || new action_info_js_1.ActionInfo()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + e) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  onActionsLength() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  offActions(t, i) {
    var e = this.bb.__offset(this.bb_pos, 12);
    return e
      ? (i || new action_info_js_1.ActionInfo()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + e) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  offActionsLength() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startSwitcherComponent(t) {
    t.startObject(5);
  }
  static addDisabled(t, i) {
    t.addFieldInt8(0, +i, 0);
  }
  static addContent(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addIcon(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static addOnActions(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static createOnActionsVector(i, e) {
    i.startVector(4, e.length, 4);
    for (let t = e.length - 1; 0 <= t; t--) i.addOffset(e[t]);
    return i.endVector();
  }
  static startOnActionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addOffActions(t, i) {
    t.addFieldOffset(4, i, 0);
  }
  static createOffActionsVector(i, e) {
    i.startVector(4, e.length, 4);
    for (let t = e.length - 1; 0 <= t; t--) i.addOffset(e[t]);
    return i.endVector();
  }
  static startOffActionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endSwitcherComponent(t) {
    return t.endObject();
  }
  static createSwitcherComponent(t, i, e, n, s, o) {
    return (
      SwitcherComponent.startSwitcherComponent(t),
      SwitcherComponent.addDisabled(t, i),
      SwitcherComponent.addContent(t, e),
      SwitcherComponent.addIcon(t, n),
      SwitcherComponent.addOnActions(t, s),
      SwitcherComponent.addOffActions(t, o),
      SwitcherComponent.endSwitcherComponent(t)
    );
  }
}
exports.SwitcherComponent = SwitcherComponent;
//# sourceMappingURL=switcher-component.js.map
