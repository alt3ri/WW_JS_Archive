"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PerformerAiSplineMove = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class PerformerAiSplineMove {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, r) {
    return (this.bb_pos = e), (this.bb = r), this;
  }
  static getRootAsPerformerAiSplineMove(e, r) {
    return (r || new PerformerAiSplineMove()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsPerformerAiSplineMove(e, r) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new PerformerAiSplineMove()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  splineEntityId() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.readInt32(this.bb_pos + e) : 0;
  }
  static startPerformerAiSplineMove(e) {
    e.startObject(1);
  }
  static addSplineEntityId(e, r) {
    e.addFieldInt32(0, r, 0);
  }
  static endPerformerAiSplineMove(e) {
    return e.endObject();
  }
  static createPerformerAiSplineMove(e, r) {
    return (
      PerformerAiSplineMove.startPerformerAiSplineMove(e),
      PerformerAiSplineMove.addSplineEntityId(e, r),
      PerformerAiSplineMove.endPerformerAiSplineMove(e)
    );
  }
}
exports.PerformerAiSplineMove = PerformerAiSplineMove;
//# sourceMappingURL=performer-ai-spline-move.js.map
