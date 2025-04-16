"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MeshAnimalModel = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class MeshAnimalModel {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(e, t) {
    return (this.bb_pos = e), (this.bb = t), this;
  }
  static getRootAsMeshAnimalModel(e, t) {
    return (t || new MeshAnimalModel()).__init(
      e.readInt32(e.position()) + e.position(),
      e,
    );
  }
  static getSizePrefixedRootAsMeshAnimalModel(e, t) {
    return (
      e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new MeshAnimalModel()).__init(
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
  static startMeshAnimalModel(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addMesh(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static endMeshAnimalModel(e) {
    return e.endObject();
  }
  static createMeshAnimalModel(e, t, s) {
    return (
      MeshAnimalModel.startMeshAnimalModel(e),
      MeshAnimalModel.addType(e, t),
      MeshAnimalModel.addMesh(e, s),
      MeshAnimalModel.endMeshAnimalModel(e)
    );
  }
}
exports.MeshAnimalModel = MeshAnimalModel;
//# sourceMappingURL=mesh-animal-model.js.map
