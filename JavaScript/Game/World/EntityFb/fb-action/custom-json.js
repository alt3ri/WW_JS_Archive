"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CustomJson = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CustomJson {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, s) {
    return (this.bb_pos = t), (this.bb = s), this;
  }
  static getRootAsCustomJson(t, s) {
    return (s || new CustomJson()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsCustomJson(t, s) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (s || new CustomJson()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  name(t) {
    var s = this.bb.__offset(this.bb_pos, 4);
    return s ? this.bb.__string(this.bb_pos + s, t) : void 0;
  }
  jsonString(t) {
    var s = this.bb.__offset(this.bb_pos, 6);
    return s ? this.bb.__string(this.bb_pos + s, t) : void 0;
  }
  static startCustomJson(t) {
    t.startObject(2);
  }
  static addName(t, s) {
    t.addFieldOffset(0, s, 0);
  }
  static addJsonString(t, s) {
    t.addFieldOffset(1, s, 0);
  }
  static endCustomJson(t) {
    return t.endObject();
  }
  static createCustomJson(t, s, o) {
    return (
      CustomJson.startCustomJson(t),
      CustomJson.addName(t, s),
      CustomJson.addJsonString(t, o),
      CustomJson.endCustomJson(t)
    );
  }
}
exports.CustomJson = CustomJson;
//# sourceMappingURL=custom-json.js.map
