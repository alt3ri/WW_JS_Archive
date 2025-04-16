"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FinishState = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class FinishState {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsFinishState(t, i) {
    return (i || new FinishState()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsFinishState(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new FinishState()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  static startFinishState(t) {
    t.startObject(0);
  }
  static endFinishState(t) {
    return t.endObject();
  }
  static createFinishState(t) {
    return FinishState.startFinishState(t), FinishState.endFinishState(t);
  }
}
exports.FinishState = FinishState;
//# sourceMappingURL=finish-state.js.map
