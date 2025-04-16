"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OpenSystemFunction = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class OpenSystemFunction {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsOpenSystemFunction(t, e) {
    return (e || new OpenSystemFunction()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsOpenSystemFunction(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new OpenSystemFunction()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  functionId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startOpenSystemFunction(t) {
    t.startObject(1);
  }
  static addFunctionId(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static endOpenSystemFunction(t) {
    return t.endObject();
  }
  static createOpenSystemFunction(t, e) {
    return (
      OpenSystemFunction.startOpenSystemFunction(t),
      OpenSystemFunction.addFunctionId(t, e),
      OpenSystemFunction.endOpenSystemFunction(t)
    );
  }
}
exports.OpenSystemFunction = OpenSystemFunction;
//# sourceMappingURL=open-system-function.js.map
