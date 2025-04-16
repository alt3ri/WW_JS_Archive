"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EntityPackageNode = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class EntityPackageNode {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsEntityPackageNode(t, e) {
    return (e || new EntityPackageNode()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsEntityPackageNode(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new EntityPackageNode()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  entityId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  children(t, e) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i
      ? (e || new EntityPackageNode()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  childrenLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startEntityPackageNode(t) {
    t.startObject(2);
  }
  static addEntityId(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static addChildren(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static createChildrenVector(e, i) {
    e.startVector(4, i.length, 4);
    for (let t = i.length - 1; 0 <= t; t--) e.addOffset(i[t]);
    return e.endVector();
  }
  static startChildrenVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endEntityPackageNode(t) {
    return t.endObject();
  }
  static createEntityPackageNode(t, e, i) {
    return (
      EntityPackageNode.startEntityPackageNode(t),
      EntityPackageNode.addEntityId(t, e),
      EntityPackageNode.addChildren(t, i),
      EntityPackageNode.endEntityPackageNode(t)
    );
  }
}
exports.EntityPackageNode = EntityPackageNode;
//# sourceMappingURL=entity-package-node.js.map
