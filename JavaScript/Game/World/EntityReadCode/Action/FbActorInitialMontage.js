"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbActorInitialMontage = void 0);
const FbMontageId_1 = require("./FbMontageId");
class FbActorInitialMontage {
  constructor(t) {
    (this.FbDataInternal = t), (this.Rfh = !1), (this.wfh = void 0);
  }
  static Create(t) {
    if (t) return new FbActorInitialMontage(t);
  }
  get MontageId() {
    return (
      this.Rfh ||
        ((this.Rfh = !0),
        (this.wfh = FbMontageId_1.FbMontageId.Create(
          this.FbDataInternal.montageId(),
        ))),
      this.wfh
    );
  }
}
exports.FbActorInitialMontage = FbActorInitialMontage;
//# sourceMappingURL=FbActorInitialMontage.js.map
