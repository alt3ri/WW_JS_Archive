"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhotoTargetCaptureUiEachRequiredPoints = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class PhotoTargetCaptureUiEachRequiredPoints {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsPhotoTargetCaptureUiEachRequiredPoints(t, e) {
    return (e || new PhotoTargetCaptureUiEachRequiredPoints()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsPhotoTargetCaptureUiEachRequiredPoints(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new PhotoTargetCaptureUiEachRequiredPoints()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startPhotoTargetCaptureUiEachRequiredPoints(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endPhotoTargetCaptureUiEachRequiredPoints(t) {
    return t.endObject();
  }
  static createPhotoTargetCaptureUiEachRequiredPoints(t, e) {
    return (
      PhotoTargetCaptureUiEachRequiredPoints.startPhotoTargetCaptureUiEachRequiredPoints(
        t,
      ),
      PhotoTargetCaptureUiEachRequiredPoints.addType(t, e),
      PhotoTargetCaptureUiEachRequiredPoints.endPhotoTargetCaptureUiEachRequiredPoints(
        t,
      )
    );
  }
}
exports.PhotoTargetCaptureUiEachRequiredPoints =
  PhotoTargetCaptureUiEachRequiredPoints;
//# sourceMappingURL=photo-target-capture-ui-each-required-points.js.map
