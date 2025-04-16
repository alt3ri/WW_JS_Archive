"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.StringValue = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class StringValue {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsStringValue(t, e) {
    return (e || new StringValue()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsStringValue(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new StringValue()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  v(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startStringValue(t) {
    t.startObject(1);
  }
  static addV(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endStringValue(t) {
    return t.endObject();
  }
  static createStringValue(t, e) {
    return (
      StringValue.startStringValue(t),
      StringValue.addV(t, e),
      StringValue.endStringValue(t)
    );
  }
}
exports.StringValue = StringValue;
//# sourceMappingURL=string-value.js.map
