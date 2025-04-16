"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SetWuYinQuState = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SetWuYinQuState {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsSetWuYinQuState(t, e) {
    return (e || new SetWuYinQuState()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsSetWuYinQuState(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new SetWuYinQuState()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  wuYinQuName(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  state() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  static startSetWuYinQuState(t) {
    t.startObject(2);
  }
  static addWuYinQuName(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addState(t, e) {
    t.addFieldInt8(1, e, 0);
  }
  static endSetWuYinQuState(t) {
    return t.endObject();
  }
  static createSetWuYinQuState(t, e, u) {
    return (
      SetWuYinQuState.startSetWuYinQuState(t),
      SetWuYinQuState.addWuYinQuName(t, e),
      SetWuYinQuState.addState(t, u),
      SetWuYinQuState.endSetWuYinQuState(t)
    );
  }
}
exports.SetWuYinQuState = SetWuYinQuState;
//# sourceMappingURL=set-wu-yin-qu-state.js.map
