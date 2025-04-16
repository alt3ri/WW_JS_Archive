"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChangeInteractOptionText = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ChangeInteractOptionText {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsChangeInteractOptionText(t, e) {
    return (e || new ChangeInteractOptionText()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsChangeInteractOptionText(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new ChangeInteractOptionText()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  tidContent(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startChangeInteractOptionText(t) {
    t.startObject(1);
  }
  static addTidContent(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endChangeInteractOptionText(t) {
    return t.endObject();
  }
  static createChangeInteractOptionText(t, e) {
    return (
      ChangeInteractOptionText.startChangeInteractOptionText(t),
      ChangeInteractOptionText.addTidContent(t, e),
      ChangeInteractOptionText.endChangeInteractOptionText(t)
    );
  }
}
exports.ChangeInteractOptionText = ChangeInteractOptionText;
//# sourceMappingURL=change-interact-option-text.js.map
