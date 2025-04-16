"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LangOfLogo = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class LangOfLogo {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Name() {
    return this.name();
  }
  get ZhHansLogo() {
    return this.zhhanslogo();
  }
  get EnLogo() {
    return this.enlogo();
  }
  get JpLogo() {
    return this.jplogo();
  }
  get ZhHantLogo() {
    return this.zhhantlogo();
  }
  get KrLogo() {
    return this.krlogo();
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsLangOfLogo(t, s) {
    return (s || new LangOfLogo()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  name(t) {
    var s = this.J7.__offset(this.z7, 4),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  zhhanslogo(t) {
    var s = this.J7.__offset(this.z7, 6),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  enlogo(t) {
    var s = this.J7.__offset(this.z7, 8),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  jplogo(t) {
    var s = this.J7.__offset(this.z7, 10),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  zhhantlogo(t) {
    var s = this.J7.__offset(this.z7, 12),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  krlogo(t) {
    var s = this.J7.__offset(this.z7, 14),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
}
exports.LangOfLogo = LangOfLogo;
//# sourceMappingURL=LangOfLogo.js.map
