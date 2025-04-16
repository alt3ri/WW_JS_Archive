"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CheckTreasureBeenClaimedCondition = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CheckTreasureBeenClaimedCondition {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsCheckTreasureBeenClaimedCondition(e, t) {
    return (t || new CheckTreasureBeenClaimedCondition()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsCheckTreasureBeenClaimedCondition(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new CheckTreasureBeenClaimedCondition()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  entityId() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  static startCheckTreasureBeenClaimedCondition(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addEntityId(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static endCheckTreasureBeenClaimedCondition(e) {
    return e.endObject();
  }
  static createCheckTreasureBeenClaimedCondition(e, t, i) {
    return (
      CheckTreasureBeenClaimedCondition.startCheckTreasureBeenClaimedCondition(
        e,
      ),
      CheckTreasureBeenClaimedCondition.addType(e, t),
      CheckTreasureBeenClaimedCondition.addEntityId(e, i),
      CheckTreasureBeenClaimedCondition.endCheckTreasureBeenClaimedCondition(e)
    );
  }
}
exports.CheckTreasureBeenClaimedCondition = CheckTreasureBeenClaimedCondition;
//# sourceMappingURL=check-treasure-been-claimed-condition.js.map
