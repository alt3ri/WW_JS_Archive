"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbUndergroundStateInfo = void 0);
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbUndergroundStateInfo {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.Q_h = !1),
      (this.K_h = 0),
      (this.wkh = !1),
      (this.Pkh = void 0);
  }
  static Create(t) {
    if (t) return new FbUndergroundStateInfo(t);
  }
  get StateId() {
    return (
      this.Q_h || ((this.Q_h = !0), (this.K_h = this.FbDataInternal.stateId())),
      this.K_h
    );
  }
  get RestartPos() {
    return (
      this.wkh ||
        ((this.wkh = !0),
        (this.Pkh = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.restartPos(),
        ))),
      this.Pkh
    );
  }
}
exports.FbUndergroundStateInfo = FbUndergroundStateInfo;
//# sourceMappingURL=FbUndergroundStateInfo.js.map
