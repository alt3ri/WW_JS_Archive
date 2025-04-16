"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExecRiskHarvestEffect = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ExecRiskHarvestEffect {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsExecRiskHarvestEffect(t, e) {
    return (e || new ExecRiskHarvestEffect()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsExecRiskHarvestEffect(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new ExecRiskHarvestEffect()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  id() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  static startExecRiskHarvestEffect(t) {
    t.startObject(1);
  }
  static addId(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static endExecRiskHarvestEffect(t) {
    return t.endObject();
  }
  static createExecRiskHarvestEffect(t, e) {
    return (
      ExecRiskHarvestEffect.startExecRiskHarvestEffect(t),
      ExecRiskHarvestEffect.addId(t, e),
      ExecRiskHarvestEffect.endExecRiskHarvestEffect(t)
    );
  }
}
exports.ExecRiskHarvestEffect = ExecRiskHarvestEffect;
//# sourceMappingURL=exec-risk-harvest-effect.js.map
