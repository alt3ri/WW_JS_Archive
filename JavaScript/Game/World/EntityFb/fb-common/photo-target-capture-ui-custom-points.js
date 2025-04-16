"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhotoTargetCaptureUiCustomPoints = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  vector_info_js_1 = require("../fb-var/vector-info.js");
class PhotoTargetCaptureUiCustomPoints {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, o) {
    return (this.bb_pos = t), (this.bb = o), this;
  }
  static getRootAsPhotoTargetCaptureUiCustomPoints(t, o) {
    return (o || new PhotoTargetCaptureUiCustomPoints()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsPhotoTargetCaptureUiCustomPoints(t, o) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (o || new PhotoTargetCaptureUiCustomPoints()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var o = this.bb.__offset(this.bb_pos, 4);
    return o ? this.bb.__string(this.bb_pos + o, t) : void 0;
  }
  points(t, o) {
    var s = this.bb.__offset(this.bb_pos, 6);
    return s
      ? (o || new vector_info_js_1.VectorInfo()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  pointsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startPhotoTargetCaptureUiCustomPoints(t) {
    t.startObject(2);
  }
  static addType(t, o) {
    t.addFieldOffset(0, o, 0);
  }
  static addPoints(t, o) {
    t.addFieldOffset(1, o, 0);
  }
  static createPointsVector(o, s) {
    o.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) o.addOffset(s[t]);
    return o.endVector();
  }
  static startPointsVector(t, o) {
    t.startVector(4, o, 4);
  }
  static endPhotoTargetCaptureUiCustomPoints(t) {
    return t.endObject();
  }
  static createPhotoTargetCaptureUiCustomPoints(t, o, s) {
    return (
      PhotoTargetCaptureUiCustomPoints.startPhotoTargetCaptureUiCustomPoints(t),
      PhotoTargetCaptureUiCustomPoints.addType(t, o),
      PhotoTargetCaptureUiCustomPoints.addPoints(t, s),
      PhotoTargetCaptureUiCustomPoints.endPhotoTargetCaptureUiCustomPoints(t)
    );
  }
}
exports.PhotoTargetCaptureUiCustomPoints = PhotoTargetCaptureUiCustomPoints;
//# sourceMappingURL=photo-target-capture-ui-custom-points.js.map
