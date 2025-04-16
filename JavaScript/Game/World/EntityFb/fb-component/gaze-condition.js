"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GazeCondition = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  cone_trigger_shape_js_1 = require("../fb-shape/cone-trigger-shape.js");
class GazeCondition {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsGazeCondition(t, e) {
    return (e || new GazeCondition()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsGazeCondition(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new GazeCondition()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  gazeInDistance() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  scanRange(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e
      ? (t || new cone_trigger_shape_js_1.ConeTriggerShape()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  static startGazeCondition(t) {
    t.startObject(2);
  }
  static addGazeInDistance(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static addScanRange(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endGazeCondition(t) {
    return t.endObject();
  }
}
exports.GazeCondition = GazeCondition;
//# sourceMappingURL=gaze-condition.js.map
