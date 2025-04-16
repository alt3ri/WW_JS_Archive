"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GazeNextPointAfterInteract = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  gaze_condition_js_1 = require("../fb-component/gaze-condition.js"),
  gaze_performance_js_1 = require("../fb-component/gaze-performance.js");
class GazeNextPointAfterInteract {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsGazeNextPointAfterInteract(t, e) {
    return (e || new GazeNextPointAfterInteract()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsGazeNextPointAfterInteract(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new GazeNextPointAfterInteract()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  gazeCondition(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e
      ? (t || new gaze_condition_js_1.GazeCondition()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  gazePerformance(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e
      ? (t || new gaze_performance_js_1.GazePerformance()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  static startGazeNextPointAfterInteract(t) {
    t.startObject(2);
  }
  static addGazeCondition(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addGazePerformance(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endGazeNextPointAfterInteract(t) {
    return t.endObject();
  }
}
exports.GazeNextPointAfterInteract = GazeNextPointAfterInteract;
//# sourceMappingURL=gaze-next-point-after-interact.js.map
