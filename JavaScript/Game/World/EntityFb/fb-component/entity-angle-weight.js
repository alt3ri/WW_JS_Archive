"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EntityAngleWeight = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class EntityAngleWeight {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsEntityAngleWeight(t, e) {
    return (e || new EntityAngleWeight()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsEntityAngleWeight(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new EntityAngleWeight()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  angle() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  weight() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startEntityAngleWeight(t) {
    t.startObject(2);
  }
  static addAngle(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static addWeight(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static endEntityAngleWeight(t) {
    return t.endObject();
  }
  static createEntityAngleWeight(t, e, i) {
    return (
      EntityAngleWeight.startEntityAngleWeight(t),
      EntityAngleWeight.addAngle(t, e),
      EntityAngleWeight.addWeight(t, i),
      EntityAngleWeight.endEntityAngleWeight(t)
    );
  }
}
exports.EntityAngleWeight = EntityAngleWeight;
//# sourceMappingURL=entity-angle-weight.js.map
