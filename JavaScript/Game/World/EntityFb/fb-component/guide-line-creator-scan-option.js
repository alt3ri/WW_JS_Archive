"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GuideLineCreatorScanOption = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class GuideLineCreatorScanOption {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsGuideLineCreatorScanOption(e, t) {
    return (t || new GuideLineCreatorScanOption()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsGuideLineCreatorScanOption(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new GuideLineCreatorScanOption()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  responseRange() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  static startGuideLineCreatorScanOption(e) {
    e.startObject(1);
  }
  static addResponseRange(e, t) {
    e.addFieldInt32(0, t, 0);
  }
  static endGuideLineCreatorScanOption(e) {
    return e.endObject();
  }
  static createGuideLineCreatorScanOption(e, t) {
    return (
      GuideLineCreatorScanOption.startGuideLineCreatorScanOption(e),
      GuideLineCreatorScanOption.addResponseRange(e, t),
      GuideLineCreatorScanOption.endGuideLineCreatorScanOption(e)
    );
  }
}
exports.GuideLineCreatorScanOption = GuideLineCreatorScanOption;
//# sourceMappingURL=guide-line-creator-scan-option.js.map
