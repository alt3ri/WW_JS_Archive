"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Soar = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class Soar {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, r) {
    return (this.bb_pos = t), (this.bb = r), this;
  }
  static getRootAsSoar(t, r) {
    return (r || new Soar()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsSoar(t, r) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new Soar()).__init(t.readInt32(t.position()) + t.position(), t)
    );
  }
  type(t) {
    var r = this.bb.__offset(this.bb_pos, 4);
    return r ? this.bb.__string(this.bb_pos + r, t) : void 0;
  }
  static startSoar(t) {
    t.startObject(1);
  }
  static addType(t, r) {
    t.addFieldOffset(0, r, 0);
  }
  static endSoar(t) {
    return t.endObject();
  }
  static createSoar(t, r) {
    return Soar.startSoar(t), Soar.addType(t, r), Soar.endSoar(t);
  }
}
exports.Soar = Soar;
//# sourceMappingURL=soar.js.map
