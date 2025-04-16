"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ToggleAirWall = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_toggle_air_wall_js_1 = require("../fb-action/union-toggle-air-wall.js"),
  actor_ref_js_1 = require("../fb-actor/actor-ref.js");
class ToggleAirWall {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, r) {
    return (this.bb_pos = t), (this.bb = r), this;
  }
  static getRootAsToggleAirWall(t, r) {
    return (r || new ToggleAirWall()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsToggleAirWall(t, r) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new ToggleAirWall()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  optionType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_toggle_air_wall_js_1.UnionToggleAirWall.NONE;
  }
  option(t) {
    var r = this.bb.__offset(this.bb_pos, 6);
    return r ? this.bb.__union(t, this.bb_pos + r) : void 0;
  }
  actorRefs(t, r) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e
      ? (r || new actor_ref_js_1.ActorRef()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + e) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  actorRefsLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startToggleAirWall(t) {
    t.startObject(3);
  }
  static addOptionType(t, r) {
    t.addFieldInt8(0, r, union_toggle_air_wall_js_1.UnionToggleAirWall.NONE);
  }
  static addOption(t, r) {
    t.addFieldOffset(1, r, 0);
  }
  static addActorRefs(t, r) {
    t.addFieldOffset(2, r, 0);
  }
  static createActorRefsVector(r, e) {
    r.startVector(4, e.length, 4);
    for (let t = e.length - 1; 0 <= t; t--) r.addOffset(e[t]);
    return r.endVector();
  }
  static startActorRefsVector(t, r) {
    t.startVector(4, r, 4);
  }
  static endToggleAirWall(t) {
    return t.endObject();
  }
  static createToggleAirWall(t, r, e, i) {
    return (
      ToggleAirWall.startToggleAirWall(t),
      ToggleAirWall.addOptionType(t, r),
      ToggleAirWall.addOption(t, e),
      ToggleAirWall.addActorRefs(t, i),
      ToggleAirWall.endToggleAirWall(t)
    );
  }
}
exports.ToggleAirWall = ToggleAirWall;
//# sourceMappingURL=toggle-air-wall.js.map
