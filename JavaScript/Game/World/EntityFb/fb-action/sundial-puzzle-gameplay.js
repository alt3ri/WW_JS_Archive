"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SundialPuzzleGameplay = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SundialPuzzleGameplay {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, a) {
    return (this.bb_pos = e), (this.bb = a), this;
  }
  static getRootAsSundialPuzzleGameplay(e, a) {
    return (a || new SundialPuzzleGameplay()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsSundialPuzzleGameplay(e, a) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (a || new SundialPuzzleGameplay()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var a = this.bb.__offset(this.bb_pos, 4);
    return a ? this.bb.__string(this.bb_pos + a, e) : void 0;
  }
  static startSundialPuzzleGameplay(e) {
    e.startObject(1);
  }
  static addType(e, a) {
    e.addFieldOffset(0, a, 0);
  }
  static endSundialPuzzleGameplay(e) {
    return e.endObject();
  }
  static createSundialPuzzleGameplay(e, a) {
    return (
      SundialPuzzleGameplay.startSundialPuzzleGameplay(e),
      SundialPuzzleGameplay.addType(e, a),
      SundialPuzzleGameplay.endSundialPuzzleGameplay(e)
    );
  }
}
exports.SundialPuzzleGameplay = SundialPuzzleGameplay;
//# sourceMappingURL=sundial-puzzle-gameplay.js.map
