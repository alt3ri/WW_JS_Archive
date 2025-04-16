"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoAbyssCreateRewardTreasureBox = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DangoAbyssCreateRewardTreasureBox {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, r) {
    return (this.bb_pos = e), (this.bb = r), this;
  }
  static getRootAsDangoAbyssCreateRewardTreasureBox(e, r) {
    return (r || new DangoAbyssCreateRewardTreasureBox()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsDangoAbyssCreateRewardTreasureBox(e, r) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new DangoAbyssCreateRewardTreasureBox()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  static startDangoAbyssCreateRewardTreasureBox(e) {
    e.startObject(0);
  }
  static endDangoAbyssCreateRewardTreasureBox(e) {
    return e.endObject();
  }
  static createDangoAbyssCreateRewardTreasureBox(e) {
    return (
      DangoAbyssCreateRewardTreasureBox.startDangoAbyssCreateRewardTreasureBox(
        e,
      ),
      DangoAbyssCreateRewardTreasureBox.endDangoAbyssCreateRewardTreasureBox(e)
    );
  }
}
exports.DangoAbyssCreateRewardTreasureBox = DangoAbyssCreateRewardTreasureBox;
//# sourceMappingURL=dango-abyss-create-reward-treasure-box.js.map
