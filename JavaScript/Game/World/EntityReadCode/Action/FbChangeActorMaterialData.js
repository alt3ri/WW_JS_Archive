"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbChangeActorMaterialData = void 0);
const fb_actor_1 = require("../../../../Game/World/EntityFb/fb-actor"),
  FbActorRef_1 = require("../Actor/FbActorRef");
class FbChangeActorMaterialData {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.DLh = !1),
      (this.BLh = void 0),
      (this.PLh = !1),
      (this.ULh = void 0);
  }
  static Create(t) {
    if (t) return new FbChangeActorMaterialData(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get MaterialData() {
    return (
      this.DLh ||
        ((this.DLh = !0), (this.BLh = this.FbDataInternal.materialData())),
      this.BLh
    );
  }
  get ActorRefs() {
    if (!this.PLh) {
      (this.PLh = !0), (this.ULh = new Array());
      var i = this.FbDataInternal.actorRefsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var r = this.FbDataInternal.actorRefs(t, new fb_actor_1.ActorRef());
          this.ULh.push(FbActorRef_1.FbActorRef.Create(r));
        }
    }
    return this.ULh;
  }
}
exports.FbChangeActorMaterialData = FbChangeActorMaterialData;
//# sourceMappingURL=FbChangeActorMaterialData.js.map
