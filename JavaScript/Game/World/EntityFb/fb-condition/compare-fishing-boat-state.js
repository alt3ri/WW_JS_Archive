"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CompareFishingBoatState = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CompareFishingBoatState {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsCompareFishingBoatState(t, i) {
    return (i || new CompareFishingBoatState()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCompareFishingBoatState(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new CompareFishingBoatState()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  isStop() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  fishingPort() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startCompareFishingBoatState(t) {
    t.startObject(3);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addIsStop(t, i) {
    t.addFieldInt8(1, +i, 0);
  }
  static addFishingPort(t, i) {
    t.addFieldInt32(2, i, 0);
  }
  static endCompareFishingBoatState(t) {
    return t.endObject();
  }
  static createCompareFishingBoatState(t, i, a, e) {
    return (
      CompareFishingBoatState.startCompareFishingBoatState(t),
      CompareFishingBoatState.addType(t, i),
      CompareFishingBoatState.addIsStop(t, a),
      CompareFishingBoatState.addFishingPort(t, e),
      CompareFishingBoatState.endCompareFishingBoatState(t)
    );
  }
}
exports.CompareFishingBoatState = CompareFishingBoatState;
//# sourceMappingURL=compare-fishing-boat-state.js.map
