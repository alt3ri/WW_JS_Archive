"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LimitPlayerUI = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class LimitPlayerUI {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsLimitPlayerUI(t, i) {
    return (i || new LimitPlayerUI()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsLimitPlayerUI(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new LimitPlayerUI()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  static startLimitPlayerUI(t) {
    t.startObject(1);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static endLimitPlayerUI(t) {
    return t.endObject();
  }
  static createLimitPlayerUI(t, i) {
    return (
      LimitPlayerUI.startLimitPlayerUI(t),
      LimitPlayerUI.addType(t, i),
      LimitPlayerUI.endLimitPlayerUI(t)
    );
  }
}
exports.LimitPlayerUI = LimitPlayerUI;
//# sourceMappingURL=limit-player-ui.js.map
