"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhotoTargetCaptureUiEntityZero = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class PhotoTargetCaptureUiEntityZero {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsPhotoTargetCaptureUiEntityZero(t, e) {
    return (e || new PhotoTargetCaptureUiEntityZero()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsPhotoTargetCaptureUiEntityZero(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new PhotoTargetCaptureUiEntityZero()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startPhotoTargetCaptureUiEntityZero(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endPhotoTargetCaptureUiEntityZero(t) {
    return t.endObject();
  }
  static createPhotoTargetCaptureUiEntityZero(t, e) {
    return (
      PhotoTargetCaptureUiEntityZero.startPhotoTargetCaptureUiEntityZero(t),
      PhotoTargetCaptureUiEntityZero.addType(t, e),
      PhotoTargetCaptureUiEntityZero.endPhotoTargetCaptureUiEntityZero(t)
    );
  }
}
exports.PhotoTargetCaptureUiEntityZero = PhotoTargetCaptureUiEntityZero;
//# sourceMappingURL=photo-target-capture-ui-entity-zero.js.map
