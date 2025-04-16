"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TakePlotPhoto = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class TakePlotPhoto {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, o) {
    return (this.bb_pos = t), (this.bb = o), this;
  }
  static getRootAsTakePlotPhoto(t, o) {
    return (o || new TakePlotPhoto()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsTakePlotPhoto(t, o) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (o || new TakePlotPhoto()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  static startTakePlotPhoto(t) {
    t.startObject(0);
  }
  static endTakePlotPhoto(t) {
    return t.endObject();
  }
  static createTakePlotPhoto(t) {
    return (
      TakePlotPhoto.startTakePlotPhoto(t), TakePlotPhoto.endTakePlotPhoto(t)
    );
  }
}
exports.TakePlotPhoto = TakePlotPhoto;
//# sourceMappingURL=take-plot-photo.js.map
