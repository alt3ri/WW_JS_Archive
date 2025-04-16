"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DestroyAllChild = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DestroyAllChild {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsDestroyAllChild(t, e) {
    return (e || new DestroyAllChild()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsDestroyAllChild(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new DestroyAllChild()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  static startDestroyAllChild(t) {
    t.startObject(0);
  }
  static endDestroyAllChild(t) {
    return t.endObject();
  }
  static createDestroyAllChild(t) {
    return (
      DestroyAllChild.startDestroyAllChild(t),
      DestroyAllChild.endDestroyAllChild(t)
    );
  }
}
exports.DestroyAllChild = DestroyAllChild;
//# sourceMappingURL=destroy-all-child.js.map
