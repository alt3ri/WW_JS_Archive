"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InteractFlow = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  play_flow_js_1 = require("../fb-action/play-flow.js");
class InteractFlow {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsInteractFlow(t, e) {
    return (e || new InteractFlow()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsInteractFlow(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new InteractFlow()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  flow(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e
      ? (t || new play_flow_js_1.PlayFlow()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  static startInteractFlow(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addFlow(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endInteractFlow(t) {
    return t.endObject();
  }
}
exports.InteractFlow = InteractFlow;
//# sourceMappingURL=interact-flow.js.map
