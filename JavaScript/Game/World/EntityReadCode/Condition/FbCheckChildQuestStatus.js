"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCheckChildQuestStatus = void 0);
class FbCheckChildQuestStatus {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.$ch = !1),
      (this.Xch = 0),
      (this.Dzh = !1),
      (this.h0i = void 0);
  }
  static Create(t) {
    if (t) return new FbCheckChildQuestStatus(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get NodeId() {
    return (
      this.$ch || ((this.$ch = !0), (this.Xch = this.FbDataInternal.nodeId())),
      this.Xch
    );
  }
  get Status() {
    return (
      this.Dzh || ((this.Dzh = !0), (this.h0i = this.FbDataInternal.status())),
      this.h0i
    );
  }
}
exports.FbCheckChildQuestStatus = FbCheckChildQuestStatus;
//# sourceMappingURL=FbCheckChildQuestStatus.js.map
