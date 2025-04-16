"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MowingTowerGotoNextFloor = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class MowingTowerGotoNextFloor {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(o, t) {
    return (this.bb_pos = o), (this.bb = t), this;
  }
  static getRootAsMowingTowerGotoNextFloor(o, t) {
    return (t || new MowingTowerGotoNextFloor()).__init(
      o.readInt32(o.position()) + o.position(),
      o,
    );
  }
  static getSizePrefixedRootAsMowingTowerGotoNextFloor(o, t) {
    return (
      o.setPosition(o.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new MowingTowerGotoNextFloor()).__init(
        o.readInt32(o.position()) + o.position(),
        o,
      )
    );
  }
  static startMowingTowerGotoNextFloor(o) {
    o.startObject(0);
  }
  static endMowingTowerGotoNextFloor(o) {
    return o.endObject();
  }
  static createMowingTowerGotoNextFloor(o) {
    return (
      MowingTowerGotoNextFloor.startMowingTowerGotoNextFloor(o),
      MowingTowerGotoNextFloor.endMowingTowerGotoNextFloor(o)
    );
  }
}
exports.MowingTowerGotoNextFloor = MowingTowerGotoNextFloor;
//# sourceMappingURL=mowing-tower-goto-next-floor.js.map
