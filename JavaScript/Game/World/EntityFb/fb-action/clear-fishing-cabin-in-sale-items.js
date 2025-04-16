"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ClearFishingCabinInSaleItems = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ClearFishingCabinInSaleItems {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, i) {
    return (this.bb_pos = e), (this.bb = i), this;
  }
  static getRootAsClearFishingCabinInSaleItems(e, i) {
    return (i || new ClearFishingCabinInSaleItems()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsClearFishingCabinInSaleItems(e, i) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new ClearFishingCabinInSaleItems()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  static startClearFishingCabinInSaleItems(e) {
    e.startObject(0);
  }
  static endClearFishingCabinInSaleItems(e) {
    return e.endObject();
  }
  static createClearFishingCabinInSaleItems(e) {
    return (
      ClearFishingCabinInSaleItems.startClearFishingCabinInSaleItems(e),
      ClearFishingCabinInSaleItems.endClearFishingCabinInSaleItems(e)
    );
  }
}
exports.ClearFishingCabinInSaleItems = ClearFishingCabinInSaleItems;
//# sourceMappingURL=clear-fishing-cabin-in-sale-items.js.map
