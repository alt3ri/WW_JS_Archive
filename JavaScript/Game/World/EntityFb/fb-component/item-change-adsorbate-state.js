"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemChangeAdsorbateState = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ItemChangeAdsorbateState {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsItemChangeAdsorbateState(t, e) {
    return (e || new ItemChangeAdsorbateState()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsItemChangeAdsorbateState(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new ItemChangeAdsorbateState()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  static startItemChangeAdsorbateState(t) {
    t.startObject(0);
  }
  static endItemChangeAdsorbateState(t) {
    return t.endObject();
  }
  static createItemChangeAdsorbateState(t) {
    return (
      ItemChangeAdsorbateState.startItemChangeAdsorbateState(t),
      ItemChangeAdsorbateState.endItemChangeAdsorbateState(t)
    );
  }
}
exports.ItemChangeAdsorbateState = ItemChangeAdsorbateState;
//# sourceMappingURL=item-change-adsorbate-state.js.map
