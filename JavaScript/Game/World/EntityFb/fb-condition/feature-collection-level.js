"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FeatureCollectionLevel = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class FeatureCollectionLevel {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsFeatureCollectionLevel(e, t) {
    return (t || new FeatureCollectionLevel()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsFeatureCollectionLevel(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new FeatureCollectionLevel()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  id() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  compare(e) {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  level() {
    var e = this.bb.__offset(this.bb_pos, 10);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  static startFeatureCollectionLevel(e) {
    e.startObject(4);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addId(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static addCompare(e, t) {
    e.addFieldOffset(2, t, 0);
  }
  static addLevel(e, t) {
    e.addFieldInt32(3, t, 0);
  }
  static endFeatureCollectionLevel(e) {
    return e.endObject();
  }
  static createFeatureCollectionLevel(e, t, i, l, r) {
    return (
      FeatureCollectionLevel.startFeatureCollectionLevel(e),
      FeatureCollectionLevel.addType(e, t),
      FeatureCollectionLevel.addId(e, i),
      FeatureCollectionLevel.addCompare(e, l),
      FeatureCollectionLevel.addLevel(e, r),
      FeatureCollectionLevel.endFeatureCollectionLevel(e)
    );
  }
}
exports.FeatureCollectionLevel = FeatureCollectionLevel;
//# sourceMappingURL=feature-collection-level.js.map
