"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DaolingAuthentication = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DaolingAuthentication {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsDaolingAuthentication(t, i) {
    return (i || new DaolingAuthentication()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsDaolingAuthentication(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new DaolingAuthentication()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  static startDaolingAuthentication(t) {
    t.startObject(1);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static endDaolingAuthentication(t) {
    return t.endObject();
  }
  static createDaolingAuthentication(t, i) {
    return (
      DaolingAuthentication.startDaolingAuthentication(t),
      DaolingAuthentication.addType(t, i),
      DaolingAuthentication.endDaolingAuthentication(t)
    );
  }
}
exports.DaolingAuthentication = DaolingAuthentication;
//# sourceMappingURL=daoling-authentication.js.map
