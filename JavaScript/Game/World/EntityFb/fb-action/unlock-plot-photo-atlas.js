"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnlockPlotPhotoAtlas = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class UnlockPlotPhotoAtlas {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, o) {
    return (this.bb_pos = t), (this.bb = o), this;
  }
  static getRootAsUnlockPlotPhotoAtlas(t, o) {
    return (o || new UnlockPlotPhotoAtlas()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsUnlockPlotPhotoAtlas(t, o) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (o || new UnlockPlotPhotoAtlas()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var o = this.bb.__offset(this.bb_pos, 4);
    return o ? this.bb.__string(this.bb_pos + o, t) : void 0;
  }
  id() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startUnlockPlotPhotoAtlas(t) {
    t.startObject(2);
  }
  static addType(t, o) {
    t.addFieldOffset(0, o, 0);
  }
  static addId(t, o) {
    t.addFieldInt32(1, o, 0);
  }
  static endUnlockPlotPhotoAtlas(t) {
    return t.endObject();
  }
  static createUnlockPlotPhotoAtlas(t, o, s) {
    return (
      UnlockPlotPhotoAtlas.startUnlockPlotPhotoAtlas(t),
      UnlockPlotPhotoAtlas.addType(t, o),
      UnlockPlotPhotoAtlas.addId(t, s),
      UnlockPlotPhotoAtlas.endUnlockPlotPhotoAtlas(t)
    );
  }
}
exports.UnlockPlotPhotoAtlas = UnlockPlotPhotoAtlas;
//# sourceMappingURL=unlock-plot-photo-atlas.js.map
