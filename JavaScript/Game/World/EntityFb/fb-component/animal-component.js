"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AnimalComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_special_animal_config_js_1 = require("../fb-component/union-special-animal-config.js");
class AnimalComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsAnimalComponent(t, i) {
    return (i || new AnimalComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsAnimalComponent(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new AnimalComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  isStare() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  animalAttackRange() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  moveRange() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  canKillSelf() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  specialAnimalConfigType() {
    var t = this.bb.__offset(this.bb_pos, 14);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_special_animal_config_js_1.UnionSpecialAnimalConfig.NONE;
  }
  specialAnimalConfig(t) {
    var i = this.bb.__offset(this.bb_pos, 16);
    return i ? this.bb.__union(t, this.bb_pos + i) : void 0;
  }
  static startAnimalComponent(t) {
    t.startObject(7);
  }
  static addDisabled(t, i) {
    t.addFieldInt8(0, +i, 0);
  }
  static addIsStare(t, i) {
    t.addFieldInt8(1, +i, 0);
  }
  static addAnimalAttackRange(t, i) {
    t.addFieldInt32(2, i, 0);
  }
  static addMoveRange(t, i) {
    t.addFieldInt32(3, i, 0);
  }
  static addCanKillSelf(t, i) {
    t.addFieldInt8(4, +i, 0);
  }
  static addSpecialAnimalConfigType(t, i) {
    t.addFieldInt8(
      5,
      i,
      union_special_animal_config_js_1.UnionSpecialAnimalConfig.NONE,
    );
  }
  static addSpecialAnimalConfig(t, i) {
    t.addFieldOffset(6, i, 0);
  }
  static endAnimalComponent(t) {
    return t.endObject();
  }
  static createAnimalComponent(t, i, n, a, e, s, o, l) {
    return (
      AnimalComponent.startAnimalComponent(t),
      AnimalComponent.addDisabled(t, i),
      AnimalComponent.addIsStare(t, n),
      AnimalComponent.addAnimalAttackRange(t, a),
      AnimalComponent.addMoveRange(t, e),
      AnimalComponent.addCanKillSelf(t, s),
      AnimalComponent.addSpecialAnimalConfigType(t, o),
      AnimalComponent.addSpecialAnimalConfig(t, l),
      AnimalComponent.endAnimalComponent(t)
    );
  }
}
exports.AnimalComponent = AnimalComponent;
//# sourceMappingURL=animal-component.js.map
