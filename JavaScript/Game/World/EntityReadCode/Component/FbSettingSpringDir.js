"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSettingSpringDir = void 0);
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbSettingSpringDir {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.Uqh = !1),
      (this.Dqh = !1),
      (this.Bqh = !1),
      (this.qqh = !1),
      (this.kqh = !1),
      (this.Gqh = void 0);
  }
  static Create(t) {
    if (t) return new FbSettingSpringDir(t);
  }
  get IsSettingDir() {
    return (
      this.Uqh ||
        ((this.Uqh = !0), (this.Dqh = this.FbDataInternal.isSettingDir())),
      this.Dqh
    );
  }
  get IsRotator() {
    return (
      this.Bqh ||
        ((this.Bqh = !0), (this.qqh = this.FbDataInternal.isRotator())),
      this.qqh
    );
  }
  get SpringDir() {
    return (
      this.kqh ||
        ((this.kqh = !0),
        (this.Gqh = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.springDir(),
        ))),
      this.Gqh
    );
  }
}
exports.FbSettingSpringDir = FbSettingSpringDir;
//# sourceMappingURL=FbSettingSpringDir.js.map
