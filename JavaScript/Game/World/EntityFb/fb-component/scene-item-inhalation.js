"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemInhalation = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SceneItemInhalation {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsSceneItemInhalation(t, e) {
    return (e || new SceneItemInhalation()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsSceneItemInhalation(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new SceneItemInhalation()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0;
  }
  static startSceneItemInhalation(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endSceneItemInhalation(t) {
    return t.endObject();
  }
  static createSceneItemInhalation(t, e) {
    return (
      SceneItemInhalation.startSceneItemInhalation(t),
      SceneItemInhalation.addType(t, e),
      SceneItemInhalation.endSceneItemInhalation(t)
    );
  }
}
exports.SceneItemInhalation = SceneItemInhalation;
//# sourceMappingURL=scene-item-inhalation.js.map
