"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GravityDirectionWorldAxis = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class GravityDirectionWorldAxis {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(i, t) {
    return (this.bb_pos = i), (this.bb = t), this;
  }
  static getRootAsGravityDirectionWorldAxis(i, t) {
    return (t || new GravityDirectionWorldAxis()).__init(
      i.readInt32(i.position()) + i.position(),
      i,
    );
  }
  static getSizePrefixedRootAsGravityDirectionWorldAxis(i, t) {
    return (
      i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new GravityDirectionWorldAxis()).__init(
        i.readInt32(i.position()) + i.position(),
        i,
      )
    );
  }
  type(i) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, i) : void 0;
  }
  worldAxis(i) {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__string(this.bb_pos + t, i) : void 0;
  }
  static startGravityDirectionWorldAxis(i) {
    i.startObject(2);
  }
  static addType(i, t) {
    i.addFieldOffset(0, t, 0);
  }
  static addWorldAxis(i, t) {
    i.addFieldOffset(1, t, 0);
  }
  static endGravityDirectionWorldAxis(i) {
    return i.endObject();
  }
  static createGravityDirectionWorldAxis(i, t, r) {
    return (
      GravityDirectionWorldAxis.startGravityDirectionWorldAxis(i),
      GravityDirectionWorldAxis.addType(i, t),
      GravityDirectionWorldAxis.addWorldAxis(i, r),
      GravityDirectionWorldAxis.endGravityDirectionWorldAxis(i)
    );
  }
}
exports.GravityDirectionWorldAxis = GravityDirectionWorldAxis;
//# sourceMappingURL=gravity-direction-world-axis.js.map
