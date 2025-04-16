"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AreaAtmosphereInfo = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class AreaAtmosphereInfo {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get DAPath() {
    return this.dapath();
  }
  get IsTOD() {
    return this.istod();
  }
  get Priority() {
    return this.priority();
  }
  get FadeTime() {
    return this.fadetime();
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsAreaAtmosphereInfo(t, s) {
    return (s || new AreaAtmosphereInfo()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  dapath(t) {
    var s = this.J7.__offset(this.z7, 6),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  istod() {
    var t = this.J7.__offset(this.z7, 8);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  priority() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  fadetime() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 3;
  }
}
exports.AreaAtmosphereInfo = AreaAtmosphereInfo;
//# sourceMappingURL=AreaAtmosphereInfo.js.map
