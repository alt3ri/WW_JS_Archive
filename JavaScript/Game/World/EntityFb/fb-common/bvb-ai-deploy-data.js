"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BvbAiDeployData = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class BvbAiDeployData {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsBvbAiDeployData(t, e) {
    return (e || new BvbAiDeployData()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsBvbAiDeployData(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new BvbAiDeployData()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startBvbAiDeployData(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endBvbAiDeployData(t) {
    return t.endObject();
  }
  static createBvbAiDeployData(t, e) {
    return (
      BvbAiDeployData.startBvbAiDeployData(t),
      BvbAiDeployData.addType(t, e),
      BvbAiDeployData.endBvbAiDeployData(t)
    );
  }
}
exports.BvbAiDeployData = BvbAiDeployData;
//# sourceMappingURL=bvb-ai-deploy-data.js.map
