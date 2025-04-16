"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BlackScreen = void 0);
const GameUtils_1 = require("../../../../Game/GameUtils");
class BlackScreen {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get ShowAnimName() {
    return this.showanimname();
  }
  get HideAnimName() {
    return this.hideanimname();
  }
  __init(t, e) {
    return (this.z7 = t), (this.J7 = e), this;
  }
  static getRootAsBlackScreen(t, e) {
    return (e || new BlackScreen()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  showanimname(t) {
    var e = this.J7.__offset(this.z7, 4),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  hideanimname(t) {
    var e = this.J7.__offset(this.z7, 6),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
}
exports.BlackScreen = BlackScreen;
//# sourceMappingURL=BlackScreen.js.map
