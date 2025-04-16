"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DisableAlertAreaDungeonCondition = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DisableAlertAreaDungeonCondition {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsDisableAlertAreaDungeonCondition(e, t) {
    return (t || new DisableAlertAreaDungeonCondition()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsDisableAlertAreaDungeonCondition(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new DisableAlertAreaDungeonCondition()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.readUint8(this.bb_pos + e) : 0;
  }
  relatedDungeonId() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  static startDisableAlertAreaDungeonCondition(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldInt8(0, t, 0);
  }
  static addRelatedDungeonId(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static endDisableAlertAreaDungeonCondition(e) {
    return e.endObject();
  }
  static createDisableAlertAreaDungeonCondition(e, t, n) {
    return (
      DisableAlertAreaDungeonCondition.startDisableAlertAreaDungeonCondition(e),
      DisableAlertAreaDungeonCondition.addType(e, t),
      DisableAlertAreaDungeonCondition.addRelatedDungeonId(e, n),
      DisableAlertAreaDungeonCondition.endDisableAlertAreaDungeonCondition(e)
    );
  }
}
exports.DisableAlertAreaDungeonCondition = DisableAlertAreaDungeonCondition;
//# sourceMappingURL=disable-alert-area-dungeon-condition.js.map
