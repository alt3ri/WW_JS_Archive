"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TreasureBoxComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class TreasureBoxComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsTreasureBoxComponent(e, t) {
    return (t || new TreasureBoxComponent()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsTreasureBoxComponent(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new TreasureBoxComponent()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  disabled() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return !!e && !!this.bb.readInt8(this.bb_pos + e);
  }
  typeId() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  static startTreasureBoxComponent(e) {
    e.startObject(2);
  }
  static addDisabled(e, t) {
    e.addFieldInt8(0, +t, 0);
  }
  static addTypeId(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static endTreasureBoxComponent(e) {
    return e.endObject();
  }
  static createTreasureBoxComponent(e, t, r) {
    return (
      TreasureBoxComponent.startTreasureBoxComponent(e),
      TreasureBoxComponent.addDisabled(e, t),
      TreasureBoxComponent.addTypeId(e, r),
      TreasureBoxComponent.endTreasureBoxComponent(e)
    );
  }
}
exports.TreasureBoxComponent = TreasureBoxComponent;
//# sourceMappingURL=treasure-box-component.js.map
