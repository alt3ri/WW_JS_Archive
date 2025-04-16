"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ProbabilityRefreshGroup = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  probability_refresh_item_js_1 = require("../fb-component/probability-refresh-item.js");
class ProbabilityRefreshGroup {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, r) {
    return (this.bb_pos = t), (this.bb = r), this;
  }
  static getRootAsProbabilityRefreshGroup(t, r) {
    return (r || new ProbabilityRefreshGroup()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsProbabilityRefreshGroup(t, r) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new ProbabilityRefreshGroup()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  checkOccupation(t) {
    var r = this.bb.__offset(this.bb_pos, 4);
    return r ? this.bb.__string(this.bb_pos + r, t) : void 0;
  }
  refreshItems(t, r) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e
      ? (
          r || new probability_refresh_item_js_1.ProbabilityRefreshItem()
        ).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + e) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  refreshItemsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startProbabilityRefreshGroup(t) {
    t.startObject(2);
  }
  static addCheckOccupation(t, r) {
    t.addFieldOffset(0, r, 0);
  }
  static addRefreshItems(t, r) {
    t.addFieldOffset(1, r, 0);
  }
  static createRefreshItemsVector(r, e) {
    r.startVector(4, e.length, 4);
    for (let t = e.length - 1; 0 <= t; t--) r.addOffset(e[t]);
    return r.endVector();
  }
  static startRefreshItemsVector(t, r) {
    t.startVector(4, r, 4);
  }
  static endProbabilityRefreshGroup(t) {
    return t.endObject();
  }
  static createProbabilityRefreshGroup(t, r, e) {
    return (
      ProbabilityRefreshGroup.startProbabilityRefreshGroup(t),
      ProbabilityRefreshGroup.addCheckOccupation(t, r),
      ProbabilityRefreshGroup.addRefreshItems(t, e),
      ProbabilityRefreshGroup.endProbabilityRefreshGroup(t)
    );
  }
}
exports.ProbabilityRefreshGroup = ProbabilityRefreshGroup;
//# sourceMappingURL=probability-refresh-group.js.map
