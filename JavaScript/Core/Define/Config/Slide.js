"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Slide = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntFloat_1 = require("./SubType/DicIntFloat");
const FloatRange_1 = require("./SubType/FloatRange");
class Slide {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get FallingLateralFrictions() {
    return GameUtils_1.GameUtils.ConvertToMap(
      this.fallinglateralfrictionsLength(),
      (t) => this.fallinglateralfrictions(t)?.key(),
      (t) => this.fallinglateralfrictions(t)?.value(),
    );
  }
  get SlideFriction() {
    return this.slidefriction();
  }
  get SlideAccel() {
    return this.slideaccel();
  }
  get SlideAccelUp() {
    return this.slideaccelup();
  }
  get SlideAccelDown() {
    return this.slideacceldown();
  }
  get MaxSlideHorizontalSeed() {
    return this.maxslidehorizontalseed();
  }
  get SlideModeSwitchRange() {
    return this.slidemodeswitchrange();
  }
  get Ski() {
    return this.ski();
  }
  get SkiMaxSpHor() {
    return this.skimaxsphor();
  }
  get SkiMaxSpVer() {
    return this.skimaxspver();
  }
  get JumpRate() {
    return this.jumprate();
  }
  get TurnSpeed() {
    return this.turnspeed();
  }
  get SkiHorizontalInputSpeedThreshold() {
    return this.skihorizontalinputspeedthreshold();
  }
  get SpeedReduceCurve() {
    return this.speedreducecurve();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsSlide(t, i) {
    return (i || new Slide()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id(t) {
    const i = this.J7.__offset(this.z7, 4);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  GetFallinglateralfrictionsAt(t, i) {
    return this.fallinglateralfrictions(t);
  }
  fallinglateralfrictions(t, i) {
    const e = this.J7.__offset(this.z7, 6);
    return e
      ? (i || new DicIntFloat_1.DicIntFloat()).__init(
          this.J7.__indirect(this.J7.__vector(this.z7 + e) + 4 * t),
          this.J7,
        )
      : null;
  }
  fallinglateralfrictionsLength() {
    const t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  slidefriction() {
    const t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readFloat32(this.z7 + t) : 2;
  }
  slideaccel() {
    const t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readFloat32(this.z7 + t) : 1;
  }
  slideaccelup() {
    const t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readFloat32(this.z7 + t) : 1;
  }
  slideacceldown() {
    const t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readFloat32(this.z7 + t) : 1;
  }
  maxslidehorizontalseed() {
    const t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.readFloat32(this.z7 + t) : 500;
  }
  slidemodeswitchrange(t) {
    const i = this.J7.__offset(this.z7, 18);
    return i
      ? (t || new FloatRange_1.FloatRange()).__init(
          this.J7.__indirect(this.z7 + i),
          this.J7,
        )
      : null;
  }
  ski() {
    const t = this.J7.__offset(this.z7, 20);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  skimaxsphor() {
    const t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.readFloat32(this.z7 + t) : 2e3;
  }
  skimaxspver() {
    const t = this.J7.__offset(this.z7, 24);
    return t ? this.J7.readFloat32(this.z7 + t) : 2e3;
  }
  jumprate() {
    const t = this.J7.__offset(this.z7, 26);
    return t ? this.J7.readFloat32(this.z7 + t) : 1;
  }
  turnspeed() {
    const t = this.J7.__offset(this.z7, 28);
    return t ? this.J7.readFloat32(this.z7 + t) : 720;
  }
  skihorizontalinputspeedthreshold(t) {
    const i = this.J7.__offset(this.z7, 30);
    return i
      ? (t || new FloatRange_1.FloatRange()).__init(
          this.J7.__indirect(this.z7 + i),
          this.J7,
        )
      : null;
  }
  speedreducecurve(t) {
    const i = this.J7.__offset(this.z7, 32);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
}
exports.Slide = Slide;
// # sourceMappingURL=Slide.js.map
