"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DynamicPortalConfig = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DynamicPortalConfig {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsDynamicPortalConfig(t, i) {
    return (i || new DynamicPortalConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsDynamicPortalConfig(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new DynamicPortalConfig()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  portalModel(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  templateId(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  static startDynamicPortalConfig(t) {
    t.startObject(2);
  }
  static addPortalModel(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addTemplateId(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static endDynamicPortalConfig(t) {
    return t.endObject();
  }
  static createDynamicPortalConfig(t, i, a) {
    return (
      DynamicPortalConfig.startDynamicPortalConfig(t),
      DynamicPortalConfig.addPortalModel(t, i),
      DynamicPortalConfig.addTemplateId(t, a),
      DynamicPortalConfig.endDynamicPortalConfig(t)
    );
  }
}
exports.DynamicPortalConfig = DynamicPortalConfig;
//# sourceMappingURL=dynamic-portal-config.js.map
