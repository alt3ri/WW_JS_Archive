"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ToggleMapMarkState = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ToggleMapMarkState {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsToggleMapMarkState(t, e) {
    return (e || new ToggleMapMarkState()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsToggleMapMarkState(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new ToggleMapMarkState()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startToggleMapMarkState(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endToggleMapMarkState(t) {
    return t.endObject();
  }
  static createToggleMapMarkState(t, e) {
    return (
      ToggleMapMarkState.startToggleMapMarkState(t),
      ToggleMapMarkState.addType(t, e),
      ToggleMapMarkState.endToggleMapMarkState(t)
    );
  }
}
exports.ToggleMapMarkState = ToggleMapMarkState;
//# sourceMappingURL=toggle-map-mark-state.js.map
