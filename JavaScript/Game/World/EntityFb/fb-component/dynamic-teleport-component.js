"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DynamicTeleportComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  pos_a_js_1 = require("../fb-action/pos-a.js");
class DynamicTeleportComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsDynamicTeleportComponent(t, e) {
    return (e || new DynamicTeleportComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsDynamicTeleportComponent(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new DynamicTeleportComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  offset(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e
      ? (t || new pos_a_js_1.PosA()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  phantomSkillId() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startDynamicTeleportComponent(t) {
    t.startObject(3);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addOffset(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addPhantomSkillId(t, e) {
    t.addFieldInt32(2, e, 0);
  }
  static endDynamicTeleportComponent(t) {
    return t.endObject();
  }
}
exports.DynamicTeleportComponent = DynamicTeleportComponent;
//# sourceMappingURL=dynamic-teleport-component.js.map
