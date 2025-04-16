"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbActorLookAtOtherActor = void 0);
class FbActorLookAtOtherActor {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.Yfh = !1),
      (this.d3l = !1),
      (this.xfh = !1),
      (this.Y_i = 0);
  }
  static Create(t) {
    if (t) return new FbActorLookAtOtherActor(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Lock() {
    return (
      this.Yfh || ((this.Yfh = !0), (this.d3l = this.FbDataInternal.lock())),
      this.d3l
    );
  }
  get ActorIndex() {
    return (
      this.xfh ||
        ((this.xfh = !0), (this.Y_i = this.FbDataInternal.actorIndex())),
      this.Y_i
    );
  }
}
exports.FbActorLookAtOtherActor = FbActorLookAtOtherActor;
//# sourceMappingURL=FbActorLookAtOtherActor.js.map
