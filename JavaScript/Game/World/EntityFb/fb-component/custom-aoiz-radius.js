"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CustomAoizRadius = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CustomAoizRadius {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, s) {
    return (this.bb_pos = t), (this.bb = s), this;
  }
  static getRootAsCustomAoizRadius(t, s) {
    return (s || new CustomAoizRadius()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCustomAoizRadius(t, s) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new CustomAoizRadius()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  up() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  down() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startCustomAoizRadius(t) {
    t.startObject(2);
  }
  static addUp(t, s) {
    t.addFieldInt32(0, s, 0);
  }
  static addDown(t, s) {
    t.addFieldInt32(1, s, 0);
  }
  static endCustomAoizRadius(t) {
    return t.endObject();
  }
  static createCustomAoizRadius(t, s, i) {
    return (
      CustomAoizRadius.startCustomAoizRadius(t),
      CustomAoizRadius.addUp(t, s),
      CustomAoizRadius.addDown(t, i),
      CustomAoizRadius.endCustomAoizRadius(t)
    );
  }
}
exports.CustomAoizRadius = CustomAoizRadius;
//# sourceMappingURL=custom-aoiz-radius.js.map
