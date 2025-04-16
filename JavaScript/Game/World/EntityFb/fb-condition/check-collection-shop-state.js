"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CheckCollectionShopState = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CheckCollectionShopState {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsCheckCollectionShopState(t, e) {
    return (e || new CheckCollectionShopState()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCheckCollectionShopState(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new CheckCollectionShopState()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  shopType(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startCheckCollectionShopState(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addShopType(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endCheckCollectionShopState(t) {
    return t.endObject();
  }
  static createCheckCollectionShopState(t, e, o) {
    return (
      CheckCollectionShopState.startCheckCollectionShopState(t),
      CheckCollectionShopState.addType(t, e),
      CheckCollectionShopState.addShopType(t, o),
      CheckCollectionShopState.endCheckCollectionShopState(t)
    );
  }
}
exports.CheckCollectionShopState = CheckCollectionShopState;
//# sourceMappingURL=check-collection-shop-state.js.map
