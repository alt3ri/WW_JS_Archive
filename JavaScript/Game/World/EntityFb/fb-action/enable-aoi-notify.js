"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EnableAoiNotify = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class EnableAoiNotify {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsEnableAoiNotify(t, i) {
    return (i || new EnableAoiNotify()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsEnableAoiNotify(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new EnableAoiNotify()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  state(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  static startEnableAoiNotify(t) {
    t.startObject(1);
  }
  static addState(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static endEnableAoiNotify(t) {
    return t.endObject();
  }
  static createEnableAoiNotify(t, i) {
    return (
      EnableAoiNotify.startEnableAoiNotify(t),
      EnableAoiNotify.addState(t, i),
      EnableAoiNotify.endEnableAoiNotify(t)
    );
  }
}
exports.EnableAoiNotify = EnableAoiNotify;
//# sourceMappingURL=enable-aoi-notify.js.map
