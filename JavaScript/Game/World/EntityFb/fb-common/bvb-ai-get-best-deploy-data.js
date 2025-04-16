"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BvbAiGetBestDeployData = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class BvbAiGetBestDeployData {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsBvbAiGetBestDeployData(t, e) {
    return (e || new BvbAiGetBestDeployData()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsBvbAiGetBestDeployData(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new BvbAiGetBestDeployData()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startBvbAiGetBestDeployData(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endBvbAiGetBestDeployData(t) {
    return t.endObject();
  }
  static createBvbAiGetBestDeployData(t, e) {
    return (
      BvbAiGetBestDeployData.startBvbAiGetBestDeployData(t),
      BvbAiGetBestDeployData.addType(t, e),
      BvbAiGetBestDeployData.endBvbAiGetBestDeployData(t)
    );
  }
}
exports.BvbAiGetBestDeployData = BvbAiGetBestDeployData;
//# sourceMappingURL=bvb-ai-get-best-deploy-data.js.map
