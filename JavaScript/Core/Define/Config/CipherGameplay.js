"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CipherGameplay = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class CipherGameplay {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get Password() {
    return this.password();
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsCipherGameplay(t, s) {
    return (s || new CipherGameplay()).__init(
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
  password() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.CipherGameplay = CipherGameplay;
//# sourceMappingURL=CipherGameplay.js.map
