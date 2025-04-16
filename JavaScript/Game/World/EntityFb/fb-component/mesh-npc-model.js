"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MeshNpcModel = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class MeshNpcModel {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsMeshNpcModel(e, t) {
    return (t || new MeshNpcModel()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsMeshNpcModel(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new MeshNpcModel()).__init(
        e.readInt32(e.position()) + e.position(),
        e,
      )
    );
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  mesh(e) {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__string(this.bb_pos + t, e) : void 0;
  }
  static startMeshNpcModel(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addMesh(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static endMeshNpcModel(e) {
    return e.endObject();
  }
  static createMeshNpcModel(e, t, s) {
    return (
      MeshNpcModel.startMeshNpcModel(e),
      MeshNpcModel.addType(e, t),
      MeshNpcModel.addMesh(e, s),
      MeshNpcModel.endMeshNpcModel(e)
    );
  }
}
exports.MeshNpcModel = MeshNpcModel;
//# sourceMappingURL=mesh-npc-model.js.map
