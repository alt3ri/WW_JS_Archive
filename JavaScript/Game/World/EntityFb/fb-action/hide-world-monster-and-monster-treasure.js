"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HideWorldMonsterAndMonsterTreasure = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class HideWorldMonsterAndMonsterTreasure {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, r) {
    return (this.bb_pos = e), (this.bb = r), this;
  }
  static getRootAsHideWorldMonsterAndMonsterTreasure(e, r) {
    return (r || new HideWorldMonsterAndMonsterTreasure()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsHideWorldMonsterAndMonsterTreasure(e, r) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new HideWorldMonsterAndMonsterTreasure()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var r = this.bb.__offset(this.bb_pos, 4);
    return r ? this.bb.__string(this.bb_pos + r, e) : void 0;
  }
  static startHideWorldMonsterAndMonsterTreasure(e) {
    e.startObject(1);
  }
  static addType(e, r) {
    e.addFieldOffset(0, r, 0);
  }
  static endHideWorldMonsterAndMonsterTreasure(e) {
    return e.endObject();
  }
  static createHideWorldMonsterAndMonsterTreasure(e, r) {
    return (
      HideWorldMonsterAndMonsterTreasure.startHideWorldMonsterAndMonsterTreasure(
        e,
      ),
      HideWorldMonsterAndMonsterTreasure.addType(e, r),
      HideWorldMonsterAndMonsterTreasure.endHideWorldMonsterAndMonsterTreasure(
        e,
      )
    );
  }
}
exports.HideWorldMonsterAndMonsterTreasure = HideWorldMonsterAndMonsterTreasure;
//# sourceMappingURL=hide-world-monster-and-monster-treasure.js.map
