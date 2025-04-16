"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RestorePhantom = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class RestorePhantom {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsRestorePhantom(t, e) {
    return (e || new RestorePhantom()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsRestorePhantom(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new RestorePhantom()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  static startRestorePhantom(t) {
    t.startObject(0);
  }
  static endRestorePhantom(t) {
    return t.endObject();
  }
  static createRestorePhantom(t) {
    return (
      RestorePhantom.startRestorePhantom(t), RestorePhantom.endRestorePhantom(t)
    );
  }
}
exports.RestorePhantom = RestorePhantom;
//# sourceMappingURL=restore-phantom.js.map
