"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FixFoundationRelation = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class FixFoundationRelation {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsFixFoundationRelation(t, i) {
    return (i || new FixFoundationRelation()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsFixFoundationRelation(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new FixFoundationRelation()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  static startFixFoundationRelation(t) {
    t.startObject(0);
  }
  static endFixFoundationRelation(t) {
    return t.endObject();
  }
  static createFixFoundationRelation(t) {
    return (
      FixFoundationRelation.startFixFoundationRelation(t),
      FixFoundationRelation.endFixFoundationRelation(t)
    );
  }
}
exports.FixFoundationRelation = FixFoundationRelation;
//# sourceMappingURL=fix-foundation-relation.js.map
