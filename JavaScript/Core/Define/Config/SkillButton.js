"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkillButton = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
const DicStringInt_1 = require("./SubType/DicStringInt");
const DicStringIntArray_1 = require("./SubType/DicStringIntArray");
class SkillButton {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get RoleId() {
    return this.roleid();
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
      (t) => this.skillidtagmap(t)?.key(),
      (t) => this.skillidtagmap(t)?.value(),
    );
  }
  get SkillIconTags() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.skillicontagsLength(),
      (t) => this.skillicontags(t),
    );
  }
  get EnableTags() {
    return GameUtils_1.GameUtils.ConvertToArray(this.enabletagsLength(), (t) =>
      this.enabletags(t),
    );
  }
  get DisableTags() {
    return GameUtils_1.GameUtils.ConvertToArray(this.disabletagsLength(), (t) =>
      this.disabletags(t),
    );
  }
  get DisableSkillIdTags() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.disableskillidtagsLength(),
      (t) => this.disableskillidtags(t)?.key(),
      (t) => this.disableskillidtags(t)?.value(),
    );
  }
  get HiddenTags() {
    return GameUtils_1.GameUtils.ConvertToArray(this.hiddentagsLength(), (t) =>
      this.hiddentags(t),
    );
  }
  get IsCdVisible() {
    return this.iscdvisible();
  }
  get AttributeId() {
    return this.attributeid();
  }
  get MaxAttributeId() {
    return this.maxattributeid();
  }
  get AttributeIdTagMap() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.attributeidtagmapLength(),
      (t) => this.attributeidtagmap(t)?.key(),
      (t) => this.attributeidtagmap(t)?.value(),
    );
  }
  get MaxAttributeBurstEffectId() {
    return this.maxattributebursteffectid();
  }
  get CdCompletedEffectId() {
    return this.cdcompletedeffectid();
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
      (t) => this.dynamiceffecttagmap(t)?.key(),
      (t) => this.dynamiceffecttagmap(t)?.value(),
    );
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsSkillButton(t, i) {
    return (i || new SkillButton()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    const t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  roleid() {
    const t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  name(t) {
    const i = this.J7.__offset(this.z7, 8);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  buttontype() {
    const t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  actiontype() {
    const t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  skillid() {
    const t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetSkillidtagmapAt(t, i) {
    return this.skillidtagmap(t);
  }
  skillidtagmap(t, i) {
    const s = this.J7.__offset(this.z7, 16);
    return s
      ? (i || new DicStringInt_1.DicStringInt()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
          this.J7,
        )
      : null;
  }
  skillidtagmapLength() {
    const t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetSkillicontagsAt(t) {
    return this.skillicontags(t);
  }
  skillicontags(t, i) {
    const s = this.J7.__offset(this.z7, 18);
    return s
      ? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i)
      : null;
  }
  skillicontagsLength() {
    const t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetEnabletagsAt(t) {
    return this.enabletags(t);
  }
  enabletags(t, i) {
    const s = this.J7.__offset(this.z7, 20);
    return s
      ? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i)
      : null;
  }
  enabletagsLength() {
    const t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetDisabletagsAt(t) {
    return this.disabletags(t);
  }
  disabletags(t, i) {
    const s = this.J7.__offset(this.z7, 22);
    return s
      ? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i)
      : null;
  }
  disabletagsLength() {
    const t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetDisableskillidtagsAt(t, i) {
    return this.disableskillidtags(t);
  }
  disableskillidtags(t, i) {
    const s = this.J7.__offset(this.z7, 24);
    return s
      ? (i || new DicStringIntArray_1.DicStringIntArray()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
          this.J7,
        )
      : null;
  }
  disableskillidtagsLength() {
    const t = this.J7.__offset(this.z7, 24);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetHiddentagsAt(t) {
    return this.hiddentags(t);
  }
  hiddentags(t, i) {
    const s = this.J7.__offset(this.z7, 26);
    return s
      ? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i)
      : null;
  }
  hiddentagsLength() {
    const t = this.J7.__offset(this.z7, 26);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  iscdvisible() {
    const t = this.J7.__offset(this.z7, 28);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  attributeid() {
    const t = this.J7.__offset(this.z7, 30);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  maxattributeid() {
    const t = this.J7.__offset(this.z7, 32);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetAttributeidtagmapAt(t, i) {
    return this.attributeidtagmap(t);
  }
  attributeidtagmap(t, i) {
    const s = this.J7.__offset(this.z7, 34);
    return s
      ? (i || new DicStringIntArray_1.DicStringIntArray()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
          this.J7,
        )
      : null;
  }
  attributeidtagmapLength() {
    const t = this.J7.__offset(this.z7, 34);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  maxattributebursteffectid() {
    const t = this.J7.__offset(this.z7, 36);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  cdcompletedeffectid() {
    const t = this.J7.__offset(this.z7, 38);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  islongpresscontrolcamera() {
    const t = this.J7.__offset(this.z7, 40);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  longpresstime() {
    const t = this.J7.__offset(this.z7, 42);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetDynamiceffecttagmapAt(t, i) {
    return this.dynamiceffecttagmap(t);
  }
  dynamiceffecttagmap(t, i) {
    const s = this.J7.__offset(this.z7, 44);
    return s
      ? (i || new DicStringInt_1.DicStringInt()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
          this.J7,
        )
      : null;
  }
  dynamiceffecttagmapLength() {
    const t = this.J7.__offset(this.z7, 44);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
}
exports.SkillButton = SkillButton;
// # sourceMappingURL=SkillButton.js.map
