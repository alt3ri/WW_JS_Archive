"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PasserbyNpcSpline = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  passerby_npc_move_state_js_1 = require("../fb-component/passerby-npc-move-state.js");
class PasserbyNpcSpline {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, s) {
    return (this.bb_pos = t), (this.bb = s), this;
  }
  static getRootAsPasserbyNpcSpline(t, s) {
    return (s || new PasserbyNpcSpline()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsPasserbyNpcSpline(t, s) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new PasserbyNpcSpline()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  splineEntityId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  spawnWeight() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  isLoop() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  moveState(t) {
    var s = this.bb.__offset(this.bb_pos, 10);
    return s
      ? (t || new passerby_npc_move_state_js_1.PasserbyNpcMoveState()).__init(
          this.bb.__indirect(this.bb_pos + s),
          this.bb,
        )
      : void 0;
  }
  static startPasserbyNpcSpline(t) {
    t.startObject(4);
  }
  static addSplineEntityId(t, s) {
    t.addFieldInt32(0, s, 0);
  }
  static addSpawnWeight(t, s) {
    t.addFieldInt32(1, s, 0);
  }
  static addIsLoop(t, s) {
    t.addFieldInt8(2, +s, 0);
  }
  static addMoveState(t, s) {
    t.addFieldOffset(3, s, 0);
  }
  static endPasserbyNpcSpline(t) {
    return t.endObject();
  }
}
exports.PasserbyNpcSpline = PasserbyNpcSpline;
//# sourceMappingURL=passerby-npc-spline.js.map
