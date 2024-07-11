"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiShow = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
const BlackScreen_1 = require("./SubType/BlackScreen");
class UiShow {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get ViewName() {
    return this.viewname();
  }
  get Type() {
    return this.type();
  }
  get LoadAsync() {
    return this.loadasync();
  }
  get ShowCursorType() {
    return this.showcursortype();
  }
  get ObstructUi() {
    return GameUtils_1.GameUtils.ConvertToArray(this.obstructuiLength(), (t) =>
      this.obstructui(t),
    );
  }
  get EffectStart() {
    return this.effectstart();
  }
  get EffectBone() {
    return this.effectbone();
  }
  get MontageStart() {
    return this.montagestart();
  }
  get AudioEvent() {
    return this.audioevent();
  }
  get OpenAudioEvent() {
    return this.openaudioevent();
  }
  get CloseAudioEvent() {
    return this.closeaudioevent();
  }
  get DelayTime() {
    return this.delaytime();
  }
  get EffectDelayTime() {
    return this.effectdelaytime();
  }
  get SetMaskActive() {
    return this.setmaskactive();
  }
  get TimeDilation() {
    return this.timedilation();
  }
  get IsAllowFightInput() {
    return this.isallowfightinput();
  }
  get CanOpenViewByShortcutKey() {
    return this.canopenviewbyshortcutkey();
  }
  get IsShortKeysExitView() {
    return this.isshortkeysexitview();
  }
  get ScenePointTag() {
    return this.scenepointtag();
  }
  get NeedGC() {
    return this.needgc();
  }
  get IsFullScreen() {
    return this.isfullscreen();
  }
  get CommonPopBg() {
    return this.commonpopbg();
  }
  get CommonPopBgKey() {
    return this.commonpopbgkey();
  }
  get ScenePath() {
    return this.scenepath();
  }
  get IsPermanent() {
    return this.ispermanent();
  }
  get StartBlackScreen() {
    return this.startblackscreen();
  }
  get CloseBlackScreen() {
    return this.closeblackscreen();
  }
  get SkipAnim() {
    return this.skipanim();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsUiShow(t, i) {
    return (i || new UiShow()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  viewname(t) {
    const i = this.J7.__offset(this.z7, 4);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  type(t) {
    const i = this.J7.__offset(this.z7, 6);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  loadasync() {
    const t = this.J7.__offset(this.z7, 8);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  showcursortype() {
    const t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetObstructuiAt(t) {
    return this.obstructui(t);
  }
  obstructui(t, i) {
    const e = this.J7.__offset(this.z7, 12);
    return e
      ? this.J7.__string(this.J7.__vector(this.z7 + e) + 4 * t, i)
      : null;
  }
  obstructuiLength() {
    const t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  effectstart(t) {
    const i = this.J7.__offset(this.z7, 14);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  effectbone(t) {
    const i = this.J7.__offset(this.z7, 16);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  montagestart(t) {
    const i = this.J7.__offset(this.z7, 18);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  audioevent(t) {
    const i = this.J7.__offset(this.z7, 20);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  openaudioevent(t) {
    const i = this.J7.__offset(this.z7, 22);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  closeaudioevent(t) {
    const i = this.J7.__offset(this.z7, 24);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  delaytime() {
    const t = this.J7.__offset(this.z7, 26);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  effectdelaytime() {
    const t = this.J7.__offset(this.z7, 28);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  setmaskactive() {
    const t = this.J7.__offset(this.z7, 30);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  timedilation() {
    const t = this.J7.__offset(this.z7, 32);
    return t ? this.J7.readFloat32(this.z7 + t) : 1;
  }
  isallowfightinput() {
    const t = this.J7.__offset(this.z7, 34);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  canopenviewbyshortcutkey() {
    const t = this.J7.__offset(this.z7, 36);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  isshortkeysexitview() {
    const t = this.J7.__offset(this.z7, 38);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  scenepointtag(t) {
    const i = this.J7.__offset(this.z7, 40);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  needgc() {
    const t = this.J7.__offset(this.z7, 42);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  isfullscreen() {
    const t = this.J7.__offset(this.z7, 44);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  commonpopbg() {
    const t = this.J7.__offset(this.z7, 46);
    return t ? this.J7.readInt32(this.z7 + t) : -1;
  }
  commonpopbgkey(t) {
    const i = this.J7.__offset(this.z7, 48);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  scenepath(t) {
    const i = this.J7.__offset(this.z7, 50);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  ispermanent() {
    const t = this.J7.__offset(this.z7, 52);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  startblackscreen(t) {
    const i = this.J7.__offset(this.z7, 54);
    return i
      ? (t || new BlackScreen_1.BlackScreen()).__init(
          this.J7.__indirect(this.z7 + i),
          this.J7,
        )
      : null;
  }
  closeblackscreen(t) {
    const i = this.J7.__offset(this.z7, 56);
    return i
      ? (t || new BlackScreen_1.BlackScreen()).__init(
          this.J7.__indirect(this.z7 + i),
          this.J7,
        )
      : null;
  }
  skipanim() {
    const t = this.J7.__offset(this.z7, 58);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
}
exports.UiShow = UiShow;
// # sourceMappingURL=UiShow.js.map
