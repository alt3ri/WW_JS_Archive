"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AnimalModel = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_animal_model_type_js_1 = require("../fb-component/union-animal-model-type.js");
class AnimalModel {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsAnimalModel(t, i) {
    return (i || new AnimalModel()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsAnimalModel(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new AnimalModel()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  blueprintPath(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  animalModelType() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_animal_model_type_js_1.UnionAnimalModelType.NONE;
  }
  animalModel(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    return i ? this.bb.__union(t, this.bb_pos + i) : void 0;
  }
  abp(t) {
    var i = this.bb.__offset(this.bb_pos, 12);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  static startAnimalModel(t) {
    t.startObject(5);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addBlueprintPath(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addAnimalModelType(t, i) {
    t.addFieldInt8(
      2,
      i,
      union_animal_model_type_js_1.UnionAnimalModelType.NONE,
    );
  }
  static addAnimalModel(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static addAbp(t, i) {
    t.addFieldOffset(4, i, 0);
  }
  static endAnimalModel(t) {
    return t.endObject();
  }
  static createAnimalModel(t, i, e, a, l, s) {
    return (
      AnimalModel.startAnimalModel(t),
      AnimalModel.addType(t, i),
      AnimalModel.addBlueprintPath(t, e),
      AnimalModel.addAnimalModelType(t, a),
      AnimalModel.addAnimalModel(t, l),
      AnimalModel.addAbp(t, s),
      AnimalModel.endAnimalModel(t)
    );
  }
}
exports.AnimalModel = AnimalModel;
//# sourceMappingURL=animal-model.js.map
