"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkillFollowerButton = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
  DicStringInt_1 = require("./SubType/DicStringInt"),
  DicStringIntArray_1 = require("./SubType/DicStringIntArray");
class SkillFollowerButton {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get PbDataId() {
    return this.pbdataid();
  }
  get Name() {
    return this.name();
  }
  get ButtonType() {
    return this.buttontype();
  }
  get ActionType() {
    return this.actiontype();
  }
  get SkillId() {
    return this.skillid();
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
  get SkillIcon() {
    return this.skillicon();
  }
  get SkillIconTags() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.skillicontagsLength(),
      this.skillicontags,
      this,
    );
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
  get IsVisible() {
    return this.isvisible();
  }
  get IsLongPressControlCamera() {
    return this.islongpresscontrolcamera();
  }
  get LongPressTime() {
    return this.longpresstime();
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
  static getRootAsSkillFollowerButton(t, i) {
    return (i || new SkillFollowerButton()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  pbdataid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  name(t) {
    var i = this.J7.__offset(this.z7, 8);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  buttontype() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  actiontype() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  skillid() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetSkillidtagmapAt(t, i) {
    return this.skillidtagmap(t);
  }
  skillidtagmap(t, i) {
    var s = this.J7.__offset(this.z7, 16);
    return s
      ? (i || new DicStringInt_1.DicStringInt()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
          this.J7,
        )
      : null;
  }
  skillidtagmapLength() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  skillicon(t) {
    var i = this.J7.__offset(this.z7, 18);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  GetSkillicontagsAt(t) {
    return this.skillicontags(t);
  }
  skillicontags(t, i) {
    var s = this.J7.__offset(this.z7, 20);
    return s
      ? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i)
      : null;
  }
  skillicontagsLength() {
    var t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetDisabletagsAt(t) {
    return this.disabletags(t);
  }
  disabletags(t, i) {
    var s = this.J7.__offset(this.z7, 22);
    return s
      ? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i)
      : null;
  }
  disabletagsLength() {
    var t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetDisableskillidtagsAt(t, i) {
    return this.disableskillidtags(t);
  }
  disableskillidtags(t, i) {
    var s = this.J7.__offset(this.z7, 24);
    return s
      ? (i || new DicStringIntArray_1.DicStringIntArray()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
          this.J7,
        )
      : null;
  }
  disableskillidtagsLength() {
    var t = this.J7.__offset(this.z7, 24);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  isvisible() {
    var t = this.J7.__offset(this.z7, 26);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  islongpresscontrolcamera() {
    var t = this.J7.__offset(this.z7, 28);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  longpresstime() {
    var t = this.J7.__offset(this.z7, 30);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetDynamiceffecttagmapAt(t, i) {
    return this.dynamiceffecttagmap(t);
  }
  dynamiceffecttagmap(t, i) {
    var s = this.J7.__offset(this.z7, 32);
    return s
      ? (i || new DicStringInt_1.DicStringInt()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
          this.J7,
        )
      : null;
  }
  dynamiceffecttagmapLength() {
    var t = this.J7.__offset(this.z7, 32);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
}
exports.SkillFollowerButton = SkillFollowerButton;
//# sourceMappingURL=SkillFollowerButton.js.map
