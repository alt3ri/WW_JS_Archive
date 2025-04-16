"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkyboxGlobalTrigger = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SkyboxGlobalTrigger {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(r, t) {
    return (this.bb_pos = r), (this.bb = t), this;
  }
  static getRootAsSkyboxGlobalTrigger(r, t) {
    return (t || new SkyboxGlobalTrigger()).__init(
      r.readInt32(r.position()) + r.position(),
      r,
    );
  }
  static getSizePrefixedRootAsSkyboxGlobalTrigger(r, t) {
    return (
      r.setPosition(r.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new SkyboxGlobalTrigger()).__init(
        r.readInt32(r.position()) + r.position(),
        r,
      )
    );
  }
  type() {
    var r = this.bb.__offset(this.bb_pos, 4);
    return r ? this.bb.readUint8(this.bb_pos + r) : 0;
  }
  static startSkyboxGlobalTrigger(r) {
    r.startObject(1);
  }
  static addType(r, t) {
    r.addFieldInt8(0, t, 0);
  }
  static endSkyboxGlobalTrigger(r) {
    return r.endObject();
  }
  static createSkyboxGlobalTrigger(r, t) {
    return (
      SkyboxGlobalTrigger.startSkyboxGlobalTrigger(r),
      SkyboxGlobalTrigger.addType(r, t),
      SkyboxGlobalTrigger.endSkyboxGlobalTrigger(r)
    );
  }
}
exports.SkyboxGlobalTrigger = SkyboxGlobalTrigger;
//# sourceMappingURL=skybox-global-trigger.js.map
