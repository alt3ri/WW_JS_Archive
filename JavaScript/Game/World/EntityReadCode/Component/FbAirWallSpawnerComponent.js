"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbAirWallSpawnerComponent = void 0);
const fb_actor_1 = require("../../../../Game/World/EntityFb/fb-actor"),
  FbActorRef_1 = require("../Actor/FbActorRef");
class FbAirWallSpawnerComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.yRh = !1),
      (this.SRh = 0),
      (this.MRh = !1),
      (this.ERh = void 0),
      (this.IRh = !1),
      (this.TRh = 0),
      (this.mSh = !1),
      (this.CSh = 0),
      (this.bRh = !1),
      (this.LRh = void 0),
      (this.ARh = !1),
      (this.xRh = !1),
      (this.RRh = !1),
      (this.wRh = !1),
      (this.PRh = !1),
      (this.URh = void 0);
  }
  static Create(t) {
    if (t) return new FbAirWallSpawnerComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get SplineEntity() {
    return (
      this.yRh ||
        ((this.yRh = !0), (this.SRh = this.FbDataInternal.splineEntity())),
      this.SRh
    );
  }
  get WallName() {
    return (
      this.MRh ||
        ((this.MRh = !0), (this.ERh = this.FbDataInternal.wallName())),
      this.ERh
    );
  }
  get Thickness() {
    return (
      this.IRh ||
        ((this.IRh = !0), (this.TRh = this.FbDataInternal.thickness())),
      this.TRh
    );
  }
  get Height() {
    return (
      this.mSh || ((this.mSh = !0), (this.CSh = this.FbDataInternal.height())),
      this.CSh
    );
  }
  get BiasDirection() {
    return (
      this.bRh ||
        ((this.bRh = !0), (this.LRh = this.FbDataInternal.biasDirection())),
      this.LRh
    );
  }
  get IsExtend() {
    return (
      this.ARh ||
        ((this.ARh = !0), (this.xRh = this.FbDataInternal.isExtend())),
      this.xRh
    );
  }
  get HasCover() {
    return (
      this.RRh ||
        ((this.RRh = !0), (this.wRh = this.FbDataInternal.hasCover())),
      this.wRh
    );
  }
  get WallActorsRef() {
    if (!this.PRh) {
      (this.PRh = !0), (this.URh = new Array());
      var i = this.FbDataInternal.wallActorsRefLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.wallActorsRef(
            t,
            new fb_actor_1.ActorRef(),
          );
          this.URh.push(FbActorRef_1.FbActorRef.Create(s));
        }
    }
    return this.URh;
  }
}
exports.FbAirWallSpawnerComponent = FbAirWallSpawnerComponent;
//# sourceMappingURL=FbAirWallSpawnerComponent.js.map
