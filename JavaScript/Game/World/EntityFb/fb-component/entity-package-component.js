"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EntityPackageComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  entity_package_data_js_1 = require("../fb-component/entity-package-data.js");
class EntityPackageComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsEntityPackageComponent(t, e) {
    return (e || new EntityPackageComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsEntityPackageComponent(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new EntityPackageComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  bindTemplate() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  packageData(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e
      ? (t || new entity_package_data_js_1.EntityPackageData()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  static startEntityPackageComponent(t) {
    t.startObject(3);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addBindTemplate(t, e) {
    t.addFieldInt8(1, +e, 0);
  }
  static addPackageData(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static endEntityPackageComponent(t) {
    return t.endObject();
  }
}
exports.EntityPackageComponent = EntityPackageComponent;
//# sourceMappingURL=entity-package-component.js.map
