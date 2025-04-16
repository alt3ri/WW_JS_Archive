"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BuildingBlockFoundation = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class BuildingBlockFoundation {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(i, t) {
    return (this.bb_pos = i), (this.bb = t), this;
  }
  static getRootAsBuildingBlockFoundation(i, t) {
    return (t || new BuildingBlockFoundation()).__init(
      i.readInt32(i.position()) + i.position(),
      i,
    );
  }
  static getSizePrefixedRootAsBuildingBlockFoundation(i, t) {
    return (
      i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new BuildingBlockFoundation()).__init(
        i.readInt32(i.position()) + i.position(),
        i,
      )
    );
  }
  type(i) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, i) : void 0;
  }
  static startBuildingBlockFoundation(i) {
    i.startObject(1);
  }
  static addType(i, t) {
    i.addFieldOffset(0, t, 0);
  }
  static endBuildingBlockFoundation(i) {
    return i.endObject();
  }
  static createBuildingBlockFoundation(i, t) {
    return (
      BuildingBlockFoundation.startBuildingBlockFoundation(i),
      BuildingBlockFoundation.addType(i, t),
      BuildingBlockFoundation.endBuildingBlockFoundation(i)
    );
  }
}
exports.BuildingBlockFoundation = BuildingBlockFoundation;
//# sourceMappingURL=building-block-foundation.js.map
