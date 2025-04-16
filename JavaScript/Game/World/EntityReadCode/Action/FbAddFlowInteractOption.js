"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbAddFlowInteractOption = void 0);
const FbInteractOption_1 = require("./FbInteractOption");
class FbAddFlowInteractOption {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.s_h = !1),
      (this.Hye = void 0),
      (this.a_h = !1),
      (this.I9o = 0),
      (this.h_h = !1),
      (this.l_h = !1);
  }
  static Create(t) {
    if (t) return new FbAddFlowInteractOption(t);
  }
  get Option() {
    return (
      this.s_h ||
        ((this.s_h = !0),
        (this.Hye = FbInteractOption_1.FbInteractOption.Create(
          this.FbDataInternal.option(),
        ))),
      this.Hye
    );
  }
  get EntityId() {
    return (
      this.a_h ||
        ((this.a_h = !0), (this.I9o = this.FbDataInternal.entityId())),
      this.I9o
    );
  }
  get DelayRemoveByQuestEnd() {
    return (
      this.h_h ||
        ((this.h_h = !0),
        (this.l_h = this.FbDataInternal.delayRemoveByQuestEnd())),
      this.l_h
    );
  }
}
exports.FbAddFlowInteractOption = FbAddFlowInteractOption;
//# sourceMappingURL=FbAddFlowInteractOption.js.map
