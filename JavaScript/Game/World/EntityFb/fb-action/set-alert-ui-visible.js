"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SetAlertUiVisible = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SetAlertUiVisible {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsSetAlertUiVisible(t, i) {
    return (i || new SetAlertUiVisible()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsSetAlertUiVisible(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new SetAlertUiVisible()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  areaId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  isVisible() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startSetAlertUiVisible(t) {
    t.startObject(3);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addAreaId(t, i) {
    t.addFieldInt32(1, i, 0);
  }
  static addIsVisible(t, i) {
    t.addFieldInt8(2, +i, 0);
  }
  static endSetAlertUiVisible(t) {
    return t.endObject();
  }
  static createSetAlertUiVisible(t, i, e, s) {
    return (
      SetAlertUiVisible.startSetAlertUiVisible(t),
      SetAlertUiVisible.addType(t, i),
      SetAlertUiVisible.addAreaId(t, e),
      SetAlertUiVisible.addIsVisible(t, s),
      SetAlertUiVisible.endSetAlertUiVisible(t)
    );
  }
}
exports.SetAlertUiVisible = SetAlertUiVisible;
//# sourceMappingURL=set-alert-ui-visible.js.map
