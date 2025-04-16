"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlotAudio = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class PlotAudio {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get ExternalSourceSetting() {
    return this.externalsourcesetting();
  }
  get FileName() {
    return this.filename();
  }
  get GlobalLanguage() {
    return this.globallanguage();
  }
  get CheckGenderEn() {
    return this.checkgenderen();
  }
  get CheckGenderJa() {
    return this.checkgenderja();
  }
  get CheckGenderKo() {
    return this.checkgenderko();
  }
  get CheckGenderZh() {
    return this.checkgenderzh();
  }
  get TailTime() {
    return this.tailtime();
  }
  __init(t, e) {
    return (this.z7 = t), (this.J7 = e), this;
  }
  static getRootAsPlotAudio(t, e) {
    return (e || new PlotAudio()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id(t) {
    var e = this.J7.__offset(this.z7, 4),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  externalsourcesetting(t) {
    var e = this.J7.__offset(this.z7, 6),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  filename(t) {
    var e = this.J7.__offset(this.z7, 8),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  globallanguage() {
    var t = this.J7.__offset(this.z7, 10);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  checkgenderen() {
    var t = this.J7.__offset(this.z7, 12);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  checkgenderja() {
    var t = this.J7.__offset(this.z7, 14);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  checkgenderko() {
    var t = this.J7.__offset(this.z7, 16);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  checkgenderzh() {
    var t = this.J7.__offset(this.z7, 18);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  tailtime() {
    var t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.readInt32(this.z7 + t) : -1;
  }
}
exports.PlotAudio = PlotAudio;
//# sourceMappingURL=PlotAudio.js.map
