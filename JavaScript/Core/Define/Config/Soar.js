"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Soar = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class Soar {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get HangSocket() {
    return this.hangsocket();
  }
  get Scale() {
    return this.scale();
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsSoar(t, s) {
    return (s || new Soar()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id(t) {
    var s = this.J7.__offset(this.z7, 4),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  hangsocket(t) {
    var s = this.J7.__offset(this.z7, 6),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  scale() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readFloat32(this.z7 + t) : 1;
  }
}
exports.Soar = Soar;
//# sourceMappingURL=Soar.js.map
