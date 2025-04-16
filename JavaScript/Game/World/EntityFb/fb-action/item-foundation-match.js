"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemFoundationMatch = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ItemFoundationMatch {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsItemFoundationMatch(t, e) {
    return (e || new ItemFoundationMatch()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsItemFoundationMatch(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new ItemFoundationMatch()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  matchEntityId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startItemFoundationMatch(t) {
    t.startObject(1);
  }
  static addMatchEntityId(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static endItemFoundationMatch(t) {
    return t.endObject();
  }
  static createItemFoundationMatch(t, e) {
    return (
      ItemFoundationMatch.startItemFoundationMatch(t),
      ItemFoundationMatch.addMatchEntityId(t, e),
      ItemFoundationMatch.endItemFoundationMatch(t)
    );
  }
}
exports.ItemFoundationMatch = ItemFoundationMatch;
//# sourceMappingURL=item-foundation-match.js.map
