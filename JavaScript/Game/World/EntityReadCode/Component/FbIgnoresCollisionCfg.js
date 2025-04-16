"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbIgnoresCollisionCfg = void 0);
const fb_actor_1 = require("../../../../Game/World/EntityFb/fb-actor"),
  FbActorRef_1 = require("../Actor/FbActorRef");
class FbIgnoresCollisionCfg {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.QWh = !1),
      (this.KWh = void 0),
      (this.$Wh = !1),
      (this.XWh = void 0);
  }
  static Create(t) {
    if (t) return new FbIgnoresCollisionCfg(t);
  }
  get IgnoreEntitys() {
    if (!this.QWh) {
      (this.QWh = !0), (this.KWh = new Array());
      var r = this.FbDataInternal.ignoreEntitysLength();
      if (r)
        for (let t = 0; t < r; ++t)
          this.KWh.push(this.FbDataInternal.ignoreEntitys(t));
    }
    return this.KWh;
  }
  get IgnoreActors() {
    if (!this.$Wh) {
      (this.$Wh = !0), (this.XWh = new Array());
      var r = this.FbDataInternal.ignoreActorsLength();
      if (r)
        for (let t = 0; t < r; ++t) {
          var i = this.FbDataInternal.ignoreActors(
            t,
            new fb_actor_1.ActorRef(),
          );
          this.XWh.push(FbActorRef_1.FbActorRef.Create(i));
        }
    }
    return this.XWh;
  }
}
exports.FbIgnoresCollisionCfg = FbIgnoresCollisionCfg;
//# sourceMappingURL=FbIgnoresCollisionCfg.js.map
