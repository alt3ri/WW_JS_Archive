"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CaptionParam = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CaptionParam {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, a) {
    return (this.bb_pos = t), (this.bb = a), this;
  }
  static getRootAsCaptionParam(t, a) {
    return (a || new CaptionParam()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCaptionParam(t, a) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (a || new CaptionParam()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  startTime() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  totalTime() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  intervalTime() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  static startCaptionParam(t) {
    t.startObject(3);
  }
  static addStartTime(t, a) {
    t.addFieldFloat32(0, a, 0);
  }
  static addTotalTime(t, a) {
    t.addFieldFloat32(1, a, 0);
  }
  static addIntervalTime(t, a) {
    t.addFieldFloat32(2, a, 0);
  }
  static endCaptionParam(t) {
    return t.endObject();
  }
  static createCaptionParam(t, a, i, r) {
    return (
      CaptionParam.startCaptionParam(t),
      CaptionParam.addStartTime(t, a),
      CaptionParam.addTotalTime(t, i),
      CaptionParam.addIntervalTime(t, r),
      CaptionParam.endCaptionParam(t)
    );
  }
}
exports.CaptionParam = CaptionParam;
//# sourceMappingURL=caption-param.js.map
