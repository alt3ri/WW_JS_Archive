"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbPassengerTeleportConfig = void 0);
const FbPosA_1 = require("../Action/FbPosA");
class FbPassengerTeleportConfig {
  constructor(s) {
    (this.FbDataInternal = s), (this.DEc = !1), (this.BEc = void 0);
  }
  static Create(s) {
    if (s) return new FbPassengerTeleportConfig(s);
  }
  get PosA() {
    return (
      this.DEc ||
        ((this.DEc = !0),
        (this.BEc = FbPosA_1.FbPosA.Create(this.FbDataInternal.posA()))),
      this.BEc
    );
  }
}
exports.FbPassengerTeleportConfig = FbPassengerTeleportConfig;
//# sourceMappingURL=FbPassengerTeleportConfig.js.map
