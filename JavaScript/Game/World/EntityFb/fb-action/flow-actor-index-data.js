"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlowActorIndexData = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  pos_and_rot_js_1 = require("../fb-action/pos-and-rot.js");
class FlowActorIndexData {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, s) {
    return (this.bb_pos = t), (this.bb = s), this;
  }
  static getRootAsFlowActorIndexData(t, s) {
    return (s || new FlowActorIndexData()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsFlowActorIndexData(t, s) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new FlowActorIndexData()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  index() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  offset(t) {
    var s = this.bb.__offset(this.bb_pos, 6);
    return s
      ? (t || new pos_and_rot_js_1.PosAndRot()).__init(
          this.bb.__indirect(this.bb_pos + s),
          this.bb,
        )
      : void 0;
  }
  static startFlowActorIndexData(t) {
    t.startObject(2);
  }
  static addIndex(t, s) {
    t.addFieldInt32(0, s, 0);
  }
  static addOffset(t, s) {
    t.addFieldOffset(1, s, 0);
  }
  static endFlowActorIndexData(t) {
    return t.endObject();
  }
}
exports.FlowActorIndexData = FlowActorIndexData;
//# sourceMappingURL=flow-actor-index-data.js.map
