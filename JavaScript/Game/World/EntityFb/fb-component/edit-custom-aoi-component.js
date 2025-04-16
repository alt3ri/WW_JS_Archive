"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EditCustomAoiComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class EditCustomAoiComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsEditCustomAoiComponent(t, i) {
    return (i || new EditCustomAoiComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsEditCustomAoiComponent(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new EditCustomAoiComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  entities(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.readInt32(this.bb.__vector(this.bb_pos + i) + 4 * t) : 0;
  }
  entitiesLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  entitiesArray() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? new Int32Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t),
          this.bb.__vector_len(this.bb_pos + t),
        )
      : void 0;
  }
  static startEditCustomAoiComponent(t) {
    t.startObject(2);
  }
  static addDisabled(t, i) {
    t.addFieldInt8(0, +i, 0);
  }
  static addEntities(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static createEntitiesVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; 0 <= t; t--) i.addInt32(s[t]);
    return i.endVector();
  }
  static startEntitiesVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endEditCustomAoiComponent(t) {
    return t.endObject();
  }
  static createEditCustomAoiComponent(t, i, s) {
    return (
      EditCustomAoiComponent.startEditCustomAoiComponent(t),
      EditCustomAoiComponent.addDisabled(t, i),
      EditCustomAoiComponent.addEntities(t, s),
      EditCustomAoiComponent.endEditCustomAoiComponent(t)
    );
  }
}
exports.EditCustomAoiComponent = EditCustomAoiComponent;
//# sourceMappingURL=edit-custom-aoi-component.js.map
