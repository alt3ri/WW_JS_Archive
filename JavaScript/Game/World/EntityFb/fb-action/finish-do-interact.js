"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FinishDoInteract = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class FinishDoInteract {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsFinishDoInteract(t, i) {
    return (i || new FinishDoInteract()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsFinishDoInteract(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new FinishDoInteract()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  static startFinishDoInteract(t) {
    t.startObject(0);
  }
  static endFinishDoInteract(t) {
    return t.endObject();
  }
  static createFinishDoInteract(t) {
    return (
      FinishDoInteract.startFinishDoInteract(t),
      FinishDoInteract.endFinishDoInteract(t)
    );
  }
}
exports.FinishDoInteract = FinishDoInteract;
//# sourceMappingURL=finish-do-interact.js.map
