"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoAbyssGotoNextFloor = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DangoAbyssGotoNextFloor {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(o, t) {
    return (this.bb_pos = o), (this.bb = t), this;
  }
  static getRootAsDangoAbyssGotoNextFloor(o, t) {
    return (t || new DangoAbyssGotoNextFloor()).__init(
      o.readInt32(o.position()) + o.position(),
      o,
    );
  }
  static getSizePrefixedRootAsDangoAbyssGotoNextFloor(o, t) {
    return (
      o.setPosition(o.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new DangoAbyssGotoNextFloor()).__init(
        o.readInt32(o.position()) + o.position(),
        o,
      )
    );
  }
  static startDangoAbyssGotoNextFloor(o) {
    o.startObject(0);
  }
  static endDangoAbyssGotoNextFloor(o) {
    return o.endObject();
  }
  static createDangoAbyssGotoNextFloor(o) {
    return (
      DangoAbyssGotoNextFloor.startDangoAbyssGotoNextFloor(o),
      DangoAbyssGotoNextFloor.endDangoAbyssGotoNextFloor(o)
    );
  }
}
exports.DangoAbyssGotoNextFloor = DangoAbyssGotoNextFloor;
//# sourceMappingURL=dango-abyss-goto-next-floor.js.map
