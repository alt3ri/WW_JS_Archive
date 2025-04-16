"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SetSportsState = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_sport_state_js_1 = require("../fb-action/union-sport-state.js");
class SetSportsState {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsSetSportsState(t, e) {
    return (e || new SetSportsState()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsSetSportsState(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new SetSportsState()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  configType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_sport_state_js_1.UnionSportState.NONE;
  }
  config(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__union(t, this.bb_pos + e) : void 0;
  }
  static startSetSportsState(t) {
    t.startObject(2);
  }
  static addConfigType(t, e) {
    t.addFieldInt8(0, e, union_sport_state_js_1.UnionSportState.NONE);
  }
  static addConfig(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endSetSportsState(t) {
    return t.endObject();
  }
  static createSetSportsState(t, e, s) {
    return (
      SetSportsState.startSetSportsState(t),
      SetSportsState.addConfigType(t, e),
      SetSportsState.addConfig(t, s),
      SetSportsState.endSetSportsState(t)
    );
  }
}
exports.SetSportsState = SetSportsState;
//# sourceMappingURL=set-sports-state.js.map
