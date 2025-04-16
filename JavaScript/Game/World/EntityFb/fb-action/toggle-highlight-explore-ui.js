"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ToggleHighlightExploreUi = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ToggleHighlightExploreUi {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(i, t) {
    return (this.bb_pos = i), (this.bb = t), this;
  }
  static getRootAsToggleHighlightExploreUi(i, t) {
    return (t || new ToggleHighlightExploreUi()).__init(
      i.readInt32(i.position()) + i.position(),
      i,
    );
  }
  static getSizePrefixedRootAsToggleHighlightExploreUi(i, t) {
    return (
      i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new ToggleHighlightExploreUi()).__init(
        i.readInt32(i.position()) + i.position(),
        i,
      )
    );
  }
  type(i) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, i) : void 0;
  }
  static startToggleHighlightExploreUi(i) {
    i.startObject(1);
  }
  static addType(i, t) {
    i.addFieldOffset(0, t, 0);
  }
  static endToggleHighlightExploreUi(i) {
    return i.endObject();
  }
  static createToggleHighlightExploreUi(i, t) {
    return (
      ToggleHighlightExploreUi.startToggleHighlightExploreUi(i),
      ToggleHighlightExploreUi.addType(i, t),
      ToggleHighlightExploreUi.endToggleHighlightExploreUi(i)
    );
  }
}
exports.ToggleHighlightExploreUi = ToggleHighlightExploreUi;
//# sourceMappingURL=toggle-highlight-explore-ui.js.map
