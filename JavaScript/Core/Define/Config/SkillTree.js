"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkillTree = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
const ConfigPropValue_1 = require("./SubType/ConfigPropValue");
const DicIntInt_1 = require("./SubType/DicIntInt");
class SkillTree {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get NodeIndex() {
    return this.nodeindex();
  }
  get NodeGroup() {
    return this.nodegroup();
  }
  get ParentNodes() {
    return GameUtils_1.GameUtils.ConvertToArray(this.parentnodesLength(), (t) =>
      this.parentnodes(t),
    );
  }
  get NodeType() {
    return this.nodetype();
  }
  get Coordinate() {
    return this.coordinate();
  }
  get Condition() {
    return GameUtils_1.GameUtils.ConvertToArray(this.conditionLength(), (t) =>
      this.condition(t),
    );
  }
  get SkillId() {
    return this.skillid();
  }
  get PropertyNodeTitle() {
    return this.propertynodetitle();
  }
  get PropertyNodeDescribe() {
    return this.propertynodedescribe();
  }
  get PropertyNodeParam() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.propertynodeparamLength(),
      (t) => this.propertynodeparam(t),
    );
  }
  get PropertyNodeIcon() {
    return this.propertynodeicon();
  }
  get Property() {
    return GameUtils_1.GameUtils.ConvertToArray(this.propertyLength(), (t) =>
      this.property(t),
    );
  }
  get Consume() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.consumeLength(),
      (t) => this.consume(t)?.key(),
      (t) => this.consume(t)?.value(),
    );
  }
  get UnLockCondition() {
    return this.unlockcondition();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsSkillTree(t, i) {
    return (i || new SkillTree()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    const t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  nodeindex() {
    const t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  nodegroup() {
    const t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetParentnodesAt(t) {
    return this.parentnodes(t);
  }
  parentnodes(t) {
    const i = this.J7.__offset(this.z7, 10);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  parentnodesLength() {
    const t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  parentnodesArray() {
    const t = this.J7.__offset(this.z7, 10);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  nodetype() {
    const t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  coordinate() {
    const t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetConditionAt(t) {
    return this.condition(t);
  }
  condition(t) {
    const i = this.J7.__offset(this.z7, 16);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  conditionLength() {
    const t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  conditionArray() {
    const t = this.J7.__offset(this.z7, 16);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  skillid() {
    const t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  propertynodetitle(t) {
    const i = this.J7.__offset(this.z7, 20);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  propertynodedescribe(t) {
    const i = this.J7.__offset(this.z7, 22);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  GetPropertynodeparamAt(t) {
    return this.propertynodeparam(t);
  }
  propertynodeparam(t, i) {
    const r = this.J7.__offset(this.z7, 24);
    return r
      ? this.J7.__string(this.J7.__vector(this.z7 + r) + 4 * t, i)
      : null;
  }
  propertynodeparamLength() {
    const t = this.J7.__offset(this.z7, 24);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  propertynodeicon(t) {
    const i = this.J7.__offset(this.z7, 26);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  GetPropertyAt(t, i) {
    return this.property(t);
  }
  property(t, i) {
    const r = this.J7.__offset(this.z7, 28);
    return r
      ? (i || new ConfigPropValue_1.ConfigPropValue()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
          this.J7,
        )
      : null;
  }
  propertyLength() {
    const t = this.J7.__offset(this.z7, 28);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetConsumeAt(t, i) {
    return this.consume(t);
  }
  consume(t, i) {
    const r = this.J7.__offset(this.z7, 30);
    return r
      ? (i || new DicIntInt_1.DicIntInt()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
          this.J7,
        )
      : null;
  }
  consumeLength() {
    const t = this.J7.__offset(this.z7, 30);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  unlockcondition() {
    const t = this.J7.__offset(this.z7, 32);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.SkillTree = SkillTree;
// # sourceMappingURL=SkillTree.js.map
