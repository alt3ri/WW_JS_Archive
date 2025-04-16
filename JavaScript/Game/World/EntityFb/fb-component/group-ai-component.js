"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GroupAiComponent = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  union_group_ai_option_js_1 = require("../fb-component/union-group-ai-option.js");
class GroupAiComponent {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, i) {
    return (this.bb_pos = t), (this.bb = i), this;
  }
  static getRootAsGroupAiComponent(t, i) {
    return (i || new GroupAiComponent()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsGroupAiComponent(t, i) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (i || new GroupAiComponent()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  entities(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    return i ? this.bb.readInt32(this.bb.__vector(this.bb_pos + i) + 4 * t) : 0;
  }
  entitiesLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  entitiesArray() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t
      ? new Int32Array(
          this.bb.bytes().buffer,
          this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t),
          this.bb.__vector_len(this.bb_pos + t),
        )
      : void 0;
  }
  optionType() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return t
      ? this.bb.readUint8(this.bb_pos + t)
      : union_group_ai_option_js_1.UnionGroupAiOption.NONE;
  }
  option(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    return i ? this.bb.__union(t, this.bb_pos + i) : void 0;
  }
  static startGroupAiComponent(t) {
    t.startObject(4);
  }
  static addDisabled(t, i) {
    t.addFieldInt8(0, +i, 0);
  }
  static addEntities(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static createEntitiesVector(i, o) {
    i.startVector(4, o.length, 4);
    for (let t = o.length - 1; 0 <= t; t--) i.addInt32(o[t]);
    return i.endVector();
  }
  static startEntitiesVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addOptionType(t, i) {
    t.addFieldInt8(2, i, union_group_ai_option_js_1.UnionGroupAiOption.NONE);
  }
  static addOption(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static endGroupAiComponent(t) {
    return t.endObject();
  }
  static createGroupAiComponent(t, i, o, n, s) {
    return (
      GroupAiComponent.startGroupAiComponent(t),
      GroupAiComponent.addDisabled(t, i),
      GroupAiComponent.addEntities(t, o),
      GroupAiComponent.addOptionType(t, n),
      GroupAiComponent.addOption(t, s),
      GroupAiComponent.endGroupAiComponent(t)
    );
  }
}
exports.GroupAiComponent = GroupAiComponent;
//# sourceMappingURL=group-ai-component.js.map
