"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EntityBundleChildInfo = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class EntityBundleChildInfo {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsEntityBundleChildInfo(t, i) {
    return (i || new EntityBundleChildInfo()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsEntityBundleChildInfo(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new EntityBundleChildInfo()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  isDisable() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  childId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  entityId() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startEntityBundleChildInfo(t) {
    t.startObject(3);
  }
  static addIsDisable(t, i) {
    t.addFieldInt8(0, +i, 0);
  }
  static addChildId(t, i) {
    t.addFieldInt32(1, i, 0);
  }
  static addEntityId(t, i) {
    t.addFieldInt32(2, i, 0);
  }
  static endEntityBundleChildInfo(t) {
    return t.endObject();
  }
  static createEntityBundleChildInfo(t, i, n, e) {
    return (
      EntityBundleChildInfo.startEntityBundleChildInfo(t),
      EntityBundleChildInfo.addIsDisable(t, i),
      EntityBundleChildInfo.addChildId(t, n),
      EntityBundleChildInfo.addEntityId(t, e),
      EntityBundleChildInfo.endEntityBundleChildInfo(t)
    );
  }
}
exports.EntityBundleChildInfo = EntityBundleChildInfo;
//# sourceMappingURL=entity-bundle-child-info.js.map
