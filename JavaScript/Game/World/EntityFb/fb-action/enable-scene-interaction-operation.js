"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EnableSceneInteractionOperation = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class EnableSceneInteractionOperation {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsEnableSceneInteractionOperation(e, t) {
    return (t || new EnableSceneInteractionOperation()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsEnableSceneInteractionOperation(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new EnableSceneInteractionOperation()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  static startEnableSceneInteractionOperation(e) {
    e.startObject(1);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static endEnableSceneInteractionOperation(e) {
    return e.endObject();
  }
  static createEnableSceneInteractionOperation(e, t) {
    return (
      EnableSceneInteractionOperation.startEnableSceneInteractionOperation(e),
      EnableSceneInteractionOperation.addType(e, t),
      EnableSceneInteractionOperation.endEnableSceneInteractionOperation(e)
    );
  }
}
exports.EnableSceneInteractionOperation = EnableSceneInteractionOperation;
//# sourceMappingURL=enable-scene-interaction-operation.js.map
