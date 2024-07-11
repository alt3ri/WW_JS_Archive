"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GuideFocusNew = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class GuideFocusNew {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get GuideId() {
    return this.guideid();
  }
  get ViewName() {
    return this.viewname();
  }
  get DynamicTabName() {
    return this.dynamictabname();
  }
  get Platform() {
    return this.platform();
  }
  get HookName() {
    return this.hookname();
  }
  get HookNameForShow() {
    return this.hooknameforshow();
  }
  get ExtraParam() {
    return GameUtils_1.GameUtils.ConvertToArray(this.extraparamLength(), (t) =>
      this.extraparam(t),
    );
  }
  get ExtraParamDesc() {
    return this.extraparamdesc();
  }
  get ContentDirection() {
    return this.contentdirection();
  }
  get ShowArrow() {
    return this.showarrow();
  }
  get Content() {
    return this.content();
  }
  get Button() {
    return GameUtils_1.GameUtils.ConvertToArray(this.buttonLength(), (t) =>
      this.button(t),
    );
  }
  get InputEnums() {
    return GameUtils_1.GameUtils.ConvertToArray(this.inputenumsLength(), (t) =>
      this.inputenums(t),
    );
  }
  get LimitInputEnums() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.limitinputenumsLength(),
      (t) => this.limitinputenums(t),
    );
  }
  get ShowMouse() {
    return this.showmouse();
  }
  get UseMask() {
    return this.usemask();
  }
  get UseClick() {
    return this.useclick();
  }
  get ClickAnywhere() {
    return this.clickanywhere();
  }
  get ClickAnywhereShowTime() {
    return this.clickanywhereshowtime();
  }
  get OnlyFrame() {
    return this.onlyframe();
  }
  get OnlyText() {
    return this.onlytext();
  }
  get RoleHeadId() {
    return this.roleheadid();
  }
  get TextInScreen() {
    return this.textinscreen();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsGuideFocusNew(t, i) {
    return (i || new GuideFocusNew()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  guideid() {
    const t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  viewname(t) {
    const i = this.J7.__offset(this.z7, 6);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  dynamictabname(t) {
    const i = this.J7.__offset(this.z7, 8);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  platform(t) {
    const i = this.J7.__offset(this.z7, 10);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  hookname(t) {
    const i = this.J7.__offset(this.z7, 12);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  hooknameforshow(t) {
    const i = this.J7.__offset(this.z7, 14);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  GetExtraparamAt(t) {
    return this.extraparam(t);
  }
  extraparam(t, i) {
    const s = this.J7.__offset(this.z7, 16);
    return s
      ? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i)
      : null;
  }
  extraparamLength() {
    const t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  extraparamdesc(t) {
    const i = this.J7.__offset(this.z7, 18);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  contentdirection(t) {
    const i = this.J7.__offset(this.z7, 20);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  showarrow() {
    const t = this.J7.__offset(this.z7, 22);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  content(t) {
    const i = this.J7.__offset(this.z7, 24);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  GetButtonAt(t) {
    return this.button(t);
  }
  button(t, i) {
    const s = this.J7.__offset(this.z7, 26);
    return s
      ? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i)
      : null;
  }
  buttonLength() {
    const t = this.J7.__offset(this.z7, 26);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetInputenumsAt(t) {
    return this.inputenums(t);
  }
  inputenums(t, i) {
    const s = this.J7.__offset(this.z7, 28);
    return s
      ? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i)
      : null;
  }
  inputenumsLength() {
    const t = this.J7.__offset(this.z7, 28);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetLimitinputenumsAt(t) {
    return this.limitinputenums(t);
  }
  limitinputenums(t, i) {
    const s = this.J7.__offset(this.z7, 30);
    return s
      ? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i)
      : null;
  }
  limitinputenumsLength() {
    const t = this.J7.__offset(this.z7, 30);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  showmouse() {
    const t = this.J7.__offset(this.z7, 32);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  usemask() {
    const t = this.J7.__offset(this.z7, 34);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  useclick() {
    const t = this.J7.__offset(this.z7, 36);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  clickanywhere() {
    const t = this.J7.__offset(this.z7, 38);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  clickanywhereshowtime() {
    const t = this.J7.__offset(this.z7, 40);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  onlyframe() {
    const t = this.J7.__offset(this.z7, 42);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  onlytext() {
    const t = this.J7.__offset(this.z7, 44);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  roleheadid() {
    const t = this.J7.__offset(this.z7, 46);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  textinscreen() {
    const t = this.J7.__offset(this.z7, 48);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
}
exports.GuideFocusNew = GuideFocusNew;
// # sourceMappingURL=GuideFocusNew.js.map
