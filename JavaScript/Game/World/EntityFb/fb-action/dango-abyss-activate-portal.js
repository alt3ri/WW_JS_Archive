"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoAbyssActivatePortal = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DangoAbyssActivatePortal {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, s) {
    return (this.bb_pos = t), (this.bb = s), this;
  }
  static getRootAsDangoAbyssActivatePortal(t, s) {
    return (s || new DangoAbyssActivatePortal()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsDangoAbyssActivatePortal(t, s) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new DangoAbyssActivatePortal()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  static startDangoAbyssActivatePortal(t) {
    t.startObject(0);
  }
  static endDangoAbyssActivatePortal(t) {
    return t.endObject();
  }
  static createDangoAbyssActivatePortal(t) {
    return (
      DangoAbyssActivatePortal.startDangoAbyssActivatePortal(t),
      DangoAbyssActivatePortal.endDangoAbyssActivatePortal(t)
    );
  }
}
exports.DangoAbyssActivatePortal = DangoAbyssActivatePortal;
//# sourceMappingURL=dango-abyss-activate-portal.js.map
