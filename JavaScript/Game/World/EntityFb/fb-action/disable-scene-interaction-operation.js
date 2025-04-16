"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DisableSceneInteractionOperation = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DisableSceneInteractionOperation {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsDisableSceneInteractionOperation(e, t) {
    return (t || new DisableSceneInteractionOperation()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsDisableSceneInteractionOperation(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new DisableSceneInteractionOperation()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  static startDisableSceneInteractionOperation(e) {
    e.startObject(1);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static endDisableSceneInteractionOperation(e) {
    return e.endObject();
  }
  static createDisableSceneInteractionOperation(e, t) {
    return (
      DisableSceneInteractionOperation.startDisableSceneInteractionOperation(e),
      DisableSceneInteractionOperation.addType(e, t),
      DisableSceneInteractionOperation.endDisableSceneInteractionOperation(e)
    );
  }
}
exports.DisableSceneInteractionOperation = DisableSceneInteractionOperation;
//# sourceMappingURL=disable-scene-interaction-operation.js.map
