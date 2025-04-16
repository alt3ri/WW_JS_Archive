"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PasserbyNpcSplineMove = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  passerby_npc_spline_js_1 = require("../fb-component/passerby-npc-spline.js");
class PasserbyNpcSplineMove {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, s) {
    return (this.bb_pos = e), (this.bb = s), this;
  }
  static getRootAsPasserbyNpcSplineMove(e, s) {
    return (s || new PasserbyNpcSplineMove()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsPasserbyNpcSplineMove(e, s) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new PasserbyNpcSplineMove()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var s = this.bb.__offset(this.bb_pos, 4);
    return s ? this.bb.__string(this.bb_pos + s, e) : void 0;
  }
  routes(e, s) {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? (s || new passerby_npc_spline_js_1.PasserbyNpcSpline()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + t) + 4 * e),
          this.bb,
        )
      : void 0;
  }
  routesLength() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__vector_len(this.bb_pos + e) : 0;
  }
  static startPasserbyNpcSplineMove(e) {
    e.startObject(2);
  }
  static addType(e, s) {
    e.addFieldOffset(0, s, 0);
  }
  static addRoutes(e, s) {
    e.addFieldOffset(1, s, 0);
  }
  static createRoutesVector(s, t) {
    s.startVector(4, t.length, 4);
    for (let e = t.length - 1; 0 <= e; e--) s.addOffset(t[e]);
    return s.endVector();
  }
  static startRoutesVector(e, s) {
    e.startVector(4, s, 4);
  }
  static endPasserbyNpcSplineMove(e) {
    return e.endObject();
  }
  static createPasserbyNpcSplineMove(e, s, t) {
    return (
      PasserbyNpcSplineMove.startPasserbyNpcSplineMove(e),
      PasserbyNpcSplineMove.addType(e, s),
      PasserbyNpcSplineMove.addRoutes(e, t),
      PasserbyNpcSplineMove.endPasserbyNpcSplineMove(e)
    );
  }
}
exports.PasserbyNpcSplineMove = PasserbyNpcSplineMove;
//# sourceMappingURL=passerby-npc-spline-move.js.map
