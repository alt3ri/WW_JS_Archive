"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EntityListComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class EntityListComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsEntityListComponent(t, i) {
    return (i || new EntityListComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsEntityListComponent(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new EntityListComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startEntityListComponent(t) {
    t.startObject(1);
  }
  static addDisabled(t, i) {
    t.addFieldInt8(0, +i, 0);
  }
  static endEntityListComponent(t) {
    return t.endObject();
  }
  static createEntityListComponent(t, i) {
    return (
      EntityListComponent.startEntityListComponent(t),
      EntityListComponent.addDisabled(t, i),
      EntityListComponent.endEntityListComponent(t)
    );
  }
}
exports.EntityListComponent = EntityListComponent;
//# sourceMappingURL=entity-list-component.js.map
