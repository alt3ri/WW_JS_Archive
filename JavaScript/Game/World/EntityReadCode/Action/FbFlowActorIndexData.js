"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbFlowActorIndexData = void 0);
const FbPosAndRot_1 = require("./FbPosAndRot");
class FbFlowActorIndexData {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.Afh = !1),
      (this.V_i = 0),
      (this.Kdh = !1),
      (this.$dh = void 0);
  }
  static Create(t) {
    if (t) return new FbFlowActorIndexData(t);
  }
  get Index() {
    return (
      this.Afh || ((this.Afh = !0), (this.V_i = this.FbDataInternal.index())),
      this.V_i
    );
  }
  get Offset() {
    return (
      this.Kdh ||
        ((this.Kdh = !0),
        (this.$dh = FbPosAndRot_1.FbPosAndRot.Create(
          this.FbDataInternal.offset(),
        ))),
      this.$dh
    );
  }
}
exports.FbFlowActorIndexData = FbFlowActorIndexData;
//# sourceMappingURL=FbFlowActorIndexData.js.map
