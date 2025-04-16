"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BvbSelectCardsEndData = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class BvbSelectCardsEndData {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsBvbSelectCardsEndData(t, e) {
    return (e || new BvbSelectCardsEndData()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsBvbSelectCardsEndData(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new BvbSelectCardsEndData()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startBvbSelectCardsEndData(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endBvbSelectCardsEndData(t) {
    return t.endObject();
  }
  static createBvbSelectCardsEndData(t, e) {
    return (
      BvbSelectCardsEndData.startBvbSelectCardsEndData(t),
      BvbSelectCardsEndData.addType(t, e),
      BvbSelectCardsEndData.endBvbSelectCardsEndData(t)
    );
  }
}
exports.BvbSelectCardsEndData = BvbSelectCardsEndData;
//# sourceMappingURL=bvb-select-cards-end-data.js.map
