"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SitOnGround = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SitOnGround {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, r) {
    return (this.bb_pos = t), (this.bb = r), this;
  }
  static getRootAsSitOnGround(t, r) {
    return (r || new SitOnGround()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsSitOnGround(t, r) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new SitOnGround()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var r = this.bb.__offset(this.bb_pos, 4);
    return r ? this.bb.__string(this.bb_pos + r, t) : void 0;
  }
  static startSitOnGround(t) {
    t.startObject(1);
  }
  static addType(t, r) {
    t.addFieldOffset(0, r, 0);
  }
  static endSitOnGround(t) {
    return t.endObject();
  }
  static createSitOnGround(t, r) {
    return (
      SitOnGround.startSitOnGround(t),
      SitOnGround.addType(t, r),
      SitOnGround.endSitOnGround(t)
    );
  }
}
exports.SitOnGround = SitOnGround;
//# sourceMappingURL=sit-on-ground.js.map
