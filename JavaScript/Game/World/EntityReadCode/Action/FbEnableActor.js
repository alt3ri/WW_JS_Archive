"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbEnableActor = void 0);
const fb_actor_1 = require("../../../../Game/World/EntityFb/fb-actor"),
  FbActorRef_1 = require("../Actor/FbActorRef");
class FbEnableActor {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.bLh = !1),
      (this.LLh = void 0),
      (this.ALh = !1),
      (this.xLh = void 0),
      (this.Jch = !1),
      (this.l7 = !1),
      (this.RLh = !1),
      (this.wLh = !1);
  }
  static Create(t) {
    if (t) return new FbEnableActor(t);
  }
  get ActorType() {
    return (
      this.bLh ||
        ((this.bLh = !0), (this.LLh = this.FbDataInternal.actorType())),
      this.LLh
    );
  }
  get Targets() {
    if (!this.ALh) {
      (this.ALh = !0), (this.xLh = new Array());
      var i = this.FbDataInternal.targetsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.targets(t, new fb_actor_1.ActorRef());
          this.xLh.push(FbActorRef_1.FbActorRef.Create(s));
        }
    }
    return this.xLh;
  }
  get Enable() {
    return (
      this.Jch || ((this.Jch = !0), (this.l7 = this.FbDataInternal.enable())),
      this.l7
    );
  }
  get SyncChildActor() {
    return (
      this.RLh ||
        ((this.RLh = !0), (this.wLh = this.FbDataInternal.syncChildActor())),
      this.wLh
    );
  }
}
exports.FbEnableActor = FbEnableActor;
//# sourceMappingURL=FbEnableActor.js.map
