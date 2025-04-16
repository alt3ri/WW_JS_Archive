"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CustomJsonCondition = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CustomJsonCondition {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, o) {
    return (this.bb_pos = t), (this.bb = o), this;
  }
  static getRootAsCustomJsonCondition(t, o) {
    return (o || new CustomJsonCondition()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCustomJsonCondition(t, o) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (o || new CustomJsonCondition()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var o = this.bb.__offset(this.bb_pos, 4);
    return o ? this.bb.__string(this.bb_pos + o, t) : void 0;
  }
  name(t) {
    var o = this.bb.__offset(this.bb_pos, 6);
    return o ? this.bb.__string(this.bb_pos + o, t) : void 0;
  }
  jsonString(t) {
    var o = this.bb.__offset(this.bb_pos, 8);
    return o ? this.bb.__string(this.bb_pos + o, t) : void 0;
  }
  static startCustomJsonCondition(t) {
    t.startObject(3);
  }
  static addType(t, o) {
    t.addFieldOffset(0, o, 0);
  }
  static addName(t, o) {
    t.addFieldOffset(1, o, 0);
  }
  static addJsonString(t, o) {
    t.addFieldOffset(2, o, 0);
  }
  static endCustomJsonCondition(t) {
    return t.endObject();
  }
  static createCustomJsonCondition(t, o, s, i) {
    return (
      CustomJsonCondition.startCustomJsonCondition(t),
      CustomJsonCondition.addType(t, o),
      CustomJsonCondition.addName(t, s),
      CustomJsonCondition.addJsonString(t, i),
      CustomJsonCondition.endCustomJsonCondition(t)
    );
  }
}
exports.CustomJsonCondition = CustomJsonCondition;
//# sourceMappingURL=custom-json-condition.js.map
