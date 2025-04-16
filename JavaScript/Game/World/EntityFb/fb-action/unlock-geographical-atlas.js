"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnlockGeographicalAtlas = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class UnlockGeographicalAtlas {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, a) {
    return (this.bb_pos = t), (this.bb = a), this;
  }
  static getRootAsUnlockGeographicalAtlas(t, a) {
    return (a || new UnlockGeographicalAtlas()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsUnlockGeographicalAtlas(t, a) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (a || new UnlockGeographicalAtlas()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var a = this.bb.__offset(this.bb_pos, 4);
    return a ? this.bb.__string(this.bb_pos + a, t) : void 0;
  }
  id() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startUnlockGeographicalAtlas(t) {
    t.startObject(2);
  }
  static addType(t, a) {
    t.addFieldOffset(0, a, 0);
  }
  static addId(t, a) {
    t.addFieldInt32(1, a, 0);
  }
  static endUnlockGeographicalAtlas(t) {
    return t.endObject();
  }
  static createUnlockGeographicalAtlas(t, a, s) {
    return (
      UnlockGeographicalAtlas.startUnlockGeographicalAtlas(t),
      UnlockGeographicalAtlas.addType(t, a),
      UnlockGeographicalAtlas.addId(t, s),
      UnlockGeographicalAtlas.endUnlockGeographicalAtlas(t)
    );
  }
}
exports.UnlockGeographicalAtlas = UnlockGeographicalAtlas;
//# sourceMappingURL=unlock-geographical-atlas.js.map
