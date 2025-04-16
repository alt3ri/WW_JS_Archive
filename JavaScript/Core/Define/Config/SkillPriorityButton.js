"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkillPriorityButton = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
  DicIntInt_1 = require("./SubType/DicIntInt"),
  DicIntIntArray_1 = require("./SubType/DicIntIntArray");
class SkillPriorityButton {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get ButtonType() {
    return this.buttontype();
  }
  get Name() {
    return this.name();
  }
  get SkillIdTagMap() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.skillidtagmapLength(),
      this.skillidtagmapKey,
      this.skillidtagmapValue,
      this,
    );
  }
  skillidtagmapKey(t) {
    return this.skillidtagmap(t)?.key();
  }
  skillidtagmapValue(t) {
    return this.skillidtagmap(t)?.value();
  }
  get DisableTags() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.disabletagsLength(),
      this.disabletags,
      this,
    );
  }
  get DisableSkillIdTags() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.disableskillidtagsLength(),
      this.disableskillidtagsKey,
      this.disableskillidtagsValue,
      this,
    );
  }
  disableskillidtagsKey(t) {
    return this.disableskillidtags(t)?.key();
  }
  disableskillidtagsValue(t) {
    return this.disableskillidtags(t)?.value();
  }
  get DynamicEffectTagMap() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.dynamiceffecttagmapLength(),
      this.dynamiceffecttagmapKey,
      this.dynamiceffecttagmapValue,
      this,
    );
  }
  dynamiceffecttagmapKey(t) {
    return this.dynamiceffecttagmap(t)?.key();
  }
  dynamiceffecttagmapValue(t) {
    return this.dynamiceffecttagmap(t)?.value();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsSkillPriorityButton(t, i) {
    return (i || new SkillPriorityButton()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  buttontype() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  name(t) {
    var i = this.J7.__offset(this.z7, 8),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  GetSkillidtagmapAt(t, i) {
    return this.skillidtagmap(t);
  }
  skillidtagmap(t, i) {
    var s = this.J7.__offset(this.z7, 10);
    return s
      ? (i || new DicIntInt_1.DicIntInt()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
          this.J7,
        )
      : null;
  }
  skillidtagmapLength() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetDisabletagsAt(t) {
    return this.disabletags(t);
  }
  disabletags(t) {
    var i = this.J7.__offset(this.z7, 12);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  disabletagsLength() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  disabletagsArray() {
    var t = this.J7.__offset(this.z7, 12);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  GetDisableskillidtagsAt(t, i) {
    return this.disableskillidtags(t);
  }
  disableskillidtags(t, i) {
    var s = this.J7.__offset(this.z7, 14);
    return s
      ? (i || new DicIntIntArray_1.DicIntIntArray()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
          this.J7,
        )
      : null;
  }
  disableskillidtagsLength() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetDynamiceffecttagmapAt(t, i) {
    return this.dynamiceffecttagmap(t);
  }
  dynamiceffecttagmap(t, i) {
    var s = this.J7.__offset(this.z7, 16);
    return s
      ? (i || new DicIntInt_1.DicIntInt()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
          this.J7,
        )
      : null;
  }
  dynamiceffecttagmapLength() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
}
exports.SkillPriorityButton = SkillPriorityButton;
//# sourceMappingURL=SkillPriorityButton.js.map
