"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhotoTargetCaptureUiRequiredPointsCenter = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class PhotoTargetCaptureUiRequiredPointsCenter {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsPhotoTargetCaptureUiRequiredPointsCenter(t, e) {
    return (e || new PhotoTargetCaptureUiRequiredPointsCenter()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsPhotoTargetCaptureUiRequiredPointsCenter(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new PhotoTargetCaptureUiRequiredPointsCenter()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startPhotoTargetCaptureUiRequiredPointsCenter(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endPhotoTargetCaptureUiRequiredPointsCenter(t) {
    return t.endObject();
  }
  static createPhotoTargetCaptureUiRequiredPointsCenter(t, e) {
    return (
      PhotoTargetCaptureUiRequiredPointsCenter.startPhotoTargetCaptureUiRequiredPointsCenter(
        t,
      ),
      PhotoTargetCaptureUiRequiredPointsCenter.addType(t, e),
      PhotoTargetCaptureUiRequiredPointsCenter.endPhotoTargetCaptureUiRequiredPointsCenter(
        t,
      )
    );
  }
}
exports.PhotoTargetCaptureUiRequiredPointsCenter =
  PhotoTargetCaptureUiRequiredPointsCenter;
//# sourceMappingURL=photo-target-capture-ui-required-points-center.js.map
