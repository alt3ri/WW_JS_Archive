"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EnableFunction = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class EnableFunction {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, n) {
    return (this.bb_pos = t), (this.bb = n), this;
  }
  static getRootAsEnableFunction(t, n) {
    return (n || new EnableFunction()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsEnableFunction(t, n) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (n || new EnableFunction()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var n = this.bb.__offset(this.bb_pos, 4);
    return n ? this.bb.__string(this.bb_pos + n, t) : void 0;
  }
  static startEnableFunction(t) {
    t.startObject(1);
  }
  static addType(t, n) {
    t.addFieldOffset(0, n, 0);
  }
  static endEnableFunction(t) {
    return t.endObject();
  }
  static createEnableFunction(t, n) {
    return (
      EnableFunction.startEnableFunction(t),
      EnableFunction.addType(t, n),
      EnableFunction.endEnableFunction(t)
    );
  }
}
exports.EnableFunction = EnableFunction;
//# sourceMappingURL=enable-function.js.map
