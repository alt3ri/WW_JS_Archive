"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbFlowActorUnit = void 0);
const FbActorInitialState_1 = require("./FbActorInitialState");
class FbFlowActorUnit {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.a_h = !1),
      (this.I9o = 0),
      (this.HMh = !1),
      (this.WMh = 0),
      (this.QMh = !1),
      (this.KMh = !1),
      (this.$Mh = !1),
      (this.XMh = !1),
      (this.YMh = !1),
      (this.zMh = void 0);
  }
  static Create(t) {
    if (t) return new FbFlowActorUnit(t);
  }
  get EntityId() {
    return (
      this.a_h ||
        ((this.a_h = !0), (this.I9o = this.FbDataInternal.entityId())),
      this.I9o
    );
  }
  get TalkerId() {
    return (
      this.HMh ||
        ((this.HMh = !0), (this.WMh = this.FbDataInternal.talkerId())),
      this.WMh
    );
  }
  get IsPlayer() {
    return (
      this.QMh ||
        ((this.QMh = !0), (this.KMh = this.FbDataInternal.isPlayer())),
      this.KMh
    );
  }
  get IsResetPosition() {
    return (
      this.$Mh ||
        ((this.$Mh = !0), (this.XMh = this.FbDataInternal.isResetPosition())),
      this.XMh
    );
  }
  get InitialState() {
    return (
      this.YMh ||
        ((this.YMh = !0),
        (this.zMh = FbActorInitialState_1.FbActorInitialState.Create(
          this.FbDataInternal.initialState(),
        ))),
      this.zMh
    );
  }
}
exports.FbFlowActorUnit = FbFlowActorUnit;
//# sourceMappingURL=FbFlowActorUnit.js.map
