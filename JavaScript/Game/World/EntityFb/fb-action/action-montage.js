"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActionMontage = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ActionMontage {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsActionMontage(t, e) {
    return (e || new ActionMontage()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsActionMontage(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new ActionMontage()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  montageType(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  path(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startActionMontage(t) {
    t.startObject(2);
  }
  static addMontageType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addPath(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endActionMontage(t) {
    return t.endObject();
  }
  static createActionMontage(t, e, i) {
    return (
      ActionMontage.startActionMontage(t),
      ActionMontage.addMontageType(t, e),
      ActionMontage.addPath(t, i),
      ActionMontage.endActionMontage(t)
    );
  }
}
exports.ActionMontage = ActionMontage;
//# sourceMappingURL=action-montage.js.map
