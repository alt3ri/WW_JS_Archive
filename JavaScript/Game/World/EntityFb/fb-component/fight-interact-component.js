"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FightInteractComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  vector_info_js_1 = require("../fb-var/vector-info.js");
class FightInteractComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsFightInteractComponent(t, e) {
    return (e || new FightInteractComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsFightInteractComponent(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new FightInteractComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  lockRange() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  lockOffset(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e
      ? (t || new vector_info_js_1.VectorInfo()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  static startFightInteractComponent(t) {
    t.startObject(3);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addLockRange(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static addLockOffset(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static endFightInteractComponent(t) {
    return t.endObject();
  }
}
exports.FightInteractComponent = FightInteractComponent;
//# sourceMappingURL=fight-interact-component.js.map
