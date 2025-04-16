"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbActorRef = void 0);
class FbActorRef {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.uRh = !1),
      (this.dRh = void 0),
      (this.mRh = !1),
      (this.CRh = void 0),
      (this.gRh = !1),
      (this.fRh = void 0);
  }
  static Create(t) {
    if (t) return new FbActorRef(t);
  }
  get ActorName() {
    return (
      this.uRh ||
        ((this.uRh = !0), (this.dRh = this.FbDataInternal.actorName())),
      this.dRh
    );
  }
  get PathName() {
    return (
      this.mRh ||
        ((this.mRh = !0), (this.CRh = this.FbDataInternal.pathName())),
      this.CRh
    );
  }
  get Platform() {
    return (
      this.gRh ||
        ((this.gRh = !0), (this.fRh = this.FbDataInternal.platform())),
      this.fRh
    );
  }
}
exports.FbActorRef = FbActorRef;
//# sourceMappingURL=FbActorRef.js.map
