"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkillButton = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
  DicIntInt_1 = require("./SubType/DicIntInt"),
  DicIntIntArray_1 = require("./SubType/DicIntIntArray");
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
  get SkillIconTags() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.skillicontagsLength(),
      this.skillicontags,
      this,
    );
  }
  get EnableTags() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.enabletagsLength(),
      this.enabletags,
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
  get HiddenTags() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.hiddentagsLength(),
      this.hiddentags,
      this,
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
      this.attributeidtagmapKey,
      this.attributeidtagmapValue,
      this,
    );
  }
  attributeidtagmapKey(t) {
    return this.attributeidtagmap(t)?.key();
  }
  attributeidtagmapValue(t) {
    return this.attributeidtagmap(t)?.value();
  }
  get AttributeEnableTags() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.attributeenabletagsLength(),
      this.attributeenabletags,
      this,
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
  get CustomHandleId() {
    return this.customhandleid();
  }
  get ShowLongPressTags() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.showlongpresstagsLength(),
      this.showlongpresstags,
      this,
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
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  roleid() {
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
      ? (i || new DicIntInt_1.DicIntInt()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
          this.J7,
        )
      : null;
  }
  skillidtagmapLength() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetSkillicontagsAt(t) {
    return this.skillicontags(t);
  }
  skillicontags(t) {
    var i = this.J7.__offset(this.z7, 18);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  skillicontagsLength() {
    var t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  skillicontagsArray() {
    var t = this.J7.__offset(this.z7, 18);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  GetEnabletagsAt(t) {
    return this.enabletags(t);
  }
  enabletags(t) {
    var i = this.J7.__offset(this.z7, 20);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  enabletagsLength() {
    var t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  enabletagsArray() {
    var t = this.J7.__offset(this.z7, 20);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  GetDisabletagsAt(t) {
    return this.disabletags(t);
  }
  disabletags(t) {
    var i = this.J7.__offset(this.z7, 22);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  disabletagsLength() {
    var t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  disabletagsArray() {
    var t = this.J7.__offset(this.z7, 22);
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
    var s = this.J7.__offset(this.z7, 24);
    return s
      ? (i || new DicIntIntArray_1.DicIntIntArray()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
          this.J7,
        )
      : null;
  }
  disableskillidtagsLength() {
    var t = this.J7.__offset(this.z7, 24);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetHiddentagsAt(t) {
    return this.hiddentags(t);
  }
  hiddentags(t) {
    var i = this.J7.__offset(this.z7, 26);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  hiddentagsLength() {
    var t = this.J7.__offset(this.z7, 26);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  hiddentagsArray() {
    var t = this.J7.__offset(this.z7, 26);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  iscdvisible() {
    var t = this.J7.__offset(this.z7, 28);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  attributeid() {
    var t = this.J7.__offset(this.z7, 30);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  maxattributeid() {
    var t = this.J7.__offset(this.z7, 32);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetAttributeidtagmapAt(t, i) {
    return this.attributeidtagmap(t);
  }
  attributeidtagmap(t, i) {
    var s = this.J7.__offset(this.z7, 34);
    return s
      ? (i || new DicIntIntArray_1.DicIntIntArray()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
          this.J7,
        )
      : null;
  }
  attributeidtagmapLength() {
    var t = this.J7.__offset(this.z7, 34);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetAttributeenabletagsAt(t) {
    return this.attributeenabletags(t);
  }
  attributeenabletags(t) {
    var i = this.J7.__offset(this.z7, 36);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  attributeenabletagsLength() {
    var t = this.J7.__offset(this.z7, 36);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  attributeenabletagsArray() {
    var t = this.J7.__offset(this.z7, 36);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  maxattributebursteffectid() {
    var t = this.J7.__offset(this.z7, 38);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  cdcompletedeffectid() {
    var t = this.J7.__offset(this.z7, 40);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  islongpresscontrolcamera() {
    var t = this.J7.__offset(this.z7, 42);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  longpresstime() {
    var t = this.J7.__offset(this.z7, 44);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetDynamiceffecttagmapAt(t, i) {
    return this.dynamiceffecttagmap(t);
  }
  dynamiceffecttagmap(t, i) {
    var s = this.J7.__offset(this.z7, 46);
    return s
      ? (i || new DicIntInt_1.DicIntInt()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
          this.J7,
        )
      : null;
  }
  dynamiceffecttagmapLength() {
    var t = this.J7.__offset(this.z7, 46);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  customhandleid() {
    var t = this.J7.__offset(this.z7, 48);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetShowlongpresstagsAt(t) {
    return this.showlongpresstags(t);
  }
  showlongpresstags(t) {
    var i = this.J7.__offset(this.z7, 50);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  showlongpresstagsLength() {
    var t = this.J7.__offset(this.z7, 50);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  showlongpresstagsArray() {
    var t = this.J7.__offset(this.z7, 50);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
}
exports.SkillButton = SkillButton;
//# sourceMappingURL=SkillButton.js.map
