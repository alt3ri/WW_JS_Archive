"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DynamicPortalCreatorComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_dynamic_portal_create_js_1 = require("../fb-component/union-dynamic-portal-create.js");
class DynamicPortalCreatorComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, r) {
    return (this.bb_pos = t), (this.bb = r), this;
  }
  static getRootAsDynamicPortalCreatorComponent(t, r) {
    return (r || new DynamicPortalCreatorComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsDynamicPortalCreatorComponent(t, r) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new DynamicPortalCreatorComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  modelType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_dynamic_portal_create_js_1.UnionDynamicPortalCreate.NONE;
  }
  model(t) {
    var r = this.bb.__offset(this.bb_pos, 8);
    return r ? this.bb.__union(t, this.bb_pos + r) : void 0;
  }
  static startDynamicPortalCreatorComponent(t) {
    t.startObject(3);
  }
  static addDisabled(t, r) {
    t.addFieldInt8(0, +r, 0);
  }
  static addModelType(t, r) {
    t.addFieldInt8(
      1,
      r,
      union_dynamic_portal_create_js_1.UnionDynamicPortalCreate.NONE,
    );
  }
  static addModel(t, r) {
    t.addFieldOffset(2, r, 0);
  }
  static endDynamicPortalCreatorComponent(t) {
    return t.endObject();
  }
  static createDynamicPortalCreatorComponent(t, r, o, e) {
    return (
      DynamicPortalCreatorComponent.startDynamicPortalCreatorComponent(t),
      DynamicPortalCreatorComponent.addDisabled(t, r),
      DynamicPortalCreatorComponent.addModelType(t, o),
      DynamicPortalCreatorComponent.addModel(t, e),
      DynamicPortalCreatorComponent.endDynamicPortalCreatorComponent(t)
    );
  }
}
exports.DynamicPortalCreatorComponent = DynamicPortalCreatorComponent;
//# sourceMappingURL=dynamic-portal-creator-component.js.map
