"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CheckMoonBuildingState = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CheckMoonBuildingState {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsCheckMoonBuildingState(t, i) {
    return (i || new CheckMoonBuildingState()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCheckMoonBuildingState(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new CheckMoonBuildingState()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  buildingId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  isBuilt() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startCheckMoonBuildingState(t) {
    t.startObject(3);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addBuildingId(t, i) {
    t.addFieldInt32(1, i, 0);
  }
  static addIsBuilt(t, i) {
    t.addFieldInt8(2, +i, 0);
  }
  static endCheckMoonBuildingState(t) {
    return t.endObject();
  }
  static createCheckMoonBuildingState(t, i, e, n) {
    return (
      CheckMoonBuildingState.startCheckMoonBuildingState(t),
      CheckMoonBuildingState.addType(t, i),
      CheckMoonBuildingState.addBuildingId(t, e),
      CheckMoonBuildingState.addIsBuilt(t, n),
      CheckMoonBuildingState.endCheckMoonBuildingState(t)
    );
  }
}
exports.CheckMoonBuildingState = CheckMoonBuildingState;
//# sourceMappingURL=check-moon-building-state.js.map
