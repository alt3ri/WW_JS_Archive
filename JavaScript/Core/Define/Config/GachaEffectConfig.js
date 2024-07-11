"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GachaEffectConfig = void 0);
const Color_1 = require("./SubType/Color");
class GachaEffectConfig {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get Times() {
    return this.times();
  }
  get Quality() {
    return this.quality();
  }
  get FinalShowSequencePath() {
    return this.finalshowsequencepath();
  }
  get DefaultColor() {
    return this.defaultcolor();
  }
  get FinalColor() {
    return this.finalcolor();
  }
  get DefaultProcess() {
    return this.defaultprocess();
  }
  get ChangeColorProcess() {
    return this.changecolorprocess();
  }
  get CompleteChangeColorProcess() {
    return this.completechangecolorprocess();
  }
  get PlaySequenceProcess() {
    return this.playsequenceprocess();
  }
  get SlideCurveAssetPath() {
    return this.slidecurveassetpath();
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsGachaEffectConfig(t, s) {
    return (s || new GachaEffectConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    const t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  times() {
    const t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  quality() {
    const t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  finalshowsequencepath(t) {
    const s = this.J7.__offset(this.z7, 10);
    return s ? this.J7.__string(this.z7 + s, t) : null;
  }
  defaultcolor(t) {
    const s = this.J7.__offset(this.z7, 12);
    return s
      ? (t || new Color_1.Color()).__init(
          this.J7.__indirect(this.z7 + s),
          this.J7,
        )
      : null;
  }
  finalcolor(t) {
    const s = this.J7.__offset(this.z7, 14);
    return s
      ? (t || new Color_1.Color()).__init(
          this.J7.__indirect(this.z7 + s),
          this.J7,
        )
      : null;
  }
  defaultprocess() {
    const t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.readFloat32(this.z7 + t) : 0;
  }
  changecolorprocess() {
    const t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.readFloat32(this.z7 + t) : 0;
  }
  completechangecolorprocess() {
    const t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.readFloat32(this.z7 + t) : 0;
  }
  playsequenceprocess() {
    const t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.readFloat32(this.z7 + t) : 0;
  }
  slidecurveassetpath(t) {
    const s = this.J7.__offset(this.z7, 24);
    return s ? this.J7.__string(this.z7 + s, t) : null;
  }
}
exports.GachaEffectConfig = GachaEffectConfig;
// # sourceMappingURL=GachaEffectConfig.js.map
