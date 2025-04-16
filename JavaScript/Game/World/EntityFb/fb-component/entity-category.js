"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EntityCategory = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class EntityCategory {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsEntityCategory(t, i) {
    return (i || new EntityCategory()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsEntityCategory(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new EntityCategory()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  mainType(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  entityPlotBindingType(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  controlMatchType(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  monsterMatchType() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  itemFoundation(t) {
    var i = this.bb.__offset(this.bb_pos, 12);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  hideInFlowType() {
    var t = this.bb.__offset(this.bb_pos, 14);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  exploratoryDegree() {
    var t = this.bb.__offset(this.bb_pos, 16);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0;
  }
  traceMatchType() {
    var t = this.bb.__offset(this.bb_pos, 18);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  destructibleType(t) {
    var i = this.bb.__offset(this.bb_pos, 20);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  collectType(t) {
    var i = this.bb.__offset(this.bb_pos, 22);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  npcType() {
    var t = this.bb.__offset(this.bb_pos, 24);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  animalType() {
    var t = this.bb.__offset(this.bb_pos, 26);
    return t ? this.bb.readUint8(this.bb_pos + t) : 0;
  }
  bulletPenetrationType(t) {
    var i = this.bb.__offset(this.bb_pos, 28);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  mechanismType(t) {
    var i = this.bb.__offset(this.bb_pos, 30);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  inhaledItemType(t) {
    var i = this.bb.__offset(this.bb_pos, 32);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  pullStatueMatchType(t) {
    var i = this.bb.__offset(this.bb_pos, 34);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  vehicleType(t) {
    var i = this.bb.__offset(this.bb_pos, 36);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  fishingMechanismType(t) {
    var i = this.bb.__offset(this.bb_pos, 38);
    return i ? this.bb.__string(this.bb_pos + i, t) : void 0;
  }
  static startEntityCategory(t) {
    t.startObject(18);
  }
  static addMainType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addEntityPlotBindingType(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addControlMatchType(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static addMonsterMatchType(t, i) {
    t.addFieldInt8(3, i, 0);
  }
  static addItemFoundation(t, i) {
    t.addFieldOffset(4, i, 0);
  }
  static addHideInFlowType(t, i) {
    t.addFieldInt8(5, i, 0);
  }
  static addExploratoryDegree(t, i) {
    t.addFieldInt32(6, i, 0);
  }
  static addTraceMatchType(t, i) {
    t.addFieldInt8(7, i, 0);
  }
  static addDestructibleType(t, i) {
    t.addFieldOffset(8, i, 0);
  }
  static addCollectType(t, i) {
    t.addFieldOffset(9, i, 0);
  }
  static addNpcType(t, i) {
    t.addFieldInt8(10, i, 0);
  }
  static addAnimalType(t, i) {
    t.addFieldInt8(11, i, 0);
  }
  static addBulletPenetrationType(t, i) {
    t.addFieldOffset(12, i, 0);
  }
  static addMechanismType(t, i) {
    t.addFieldOffset(13, i, 0);
  }
  static addInhaledItemType(t, i) {
    t.addFieldOffset(14, i, 0);
  }
  static addPullStatueMatchType(t, i) {
    t.addFieldOffset(15, i, 0);
  }
  static addVehicleType(t, i) {
    t.addFieldOffset(16, i, 0);
  }
  static addFishingMechanismType(t, i) {
    t.addFieldOffset(17, i, 0);
  }
  static endEntityCategory(t) {
    return t.endObject();
  }
  static createEntityCategory(
    t,
    i,
    e,
    s,
    a,
    r,
    h,
    y,
    n,
    o,
    d,
    c,
    u,
    p,
    g,
    l,
    v,
    T,
    C,
  ) {
    return (
      EntityCategory.startEntityCategory(t),
      EntityCategory.addMainType(t, i),
      EntityCategory.addEntityPlotBindingType(t, e),
      EntityCategory.addControlMatchType(t, s),
      EntityCategory.addMonsterMatchType(t, a),
      EntityCategory.addItemFoundation(t, r),
      EntityCategory.addHideInFlowType(t, h),
      EntityCategory.addExploratoryDegree(t, y),
      EntityCategory.addTraceMatchType(t, n),
      EntityCategory.addDestructibleType(t, o),
      EntityCategory.addCollectType(t, d),
      EntityCategory.addNpcType(t, c),
      EntityCategory.addAnimalType(t, u),
      EntityCategory.addBulletPenetrationType(t, p),
      EntityCategory.addMechanismType(t, g),
      EntityCategory.addInhaledItemType(t, l),
      EntityCategory.addPullStatueMatchType(t, v),
      EntityCategory.addVehicleType(t, T),
      EntityCategory.addFishingMechanismType(t, C),
      EntityCategory.endEntityCategory(t)
    );
  }
}
exports.EntityCategory = EntityCategory;
//# sourceMappingURL=entity-category.js.map
