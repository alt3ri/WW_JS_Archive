"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbModifyActorMaterial = void 0);
const fb_actor_1 = require("../../../../Game/World/EntityFb/fb-actor"),
  UnionModifyActorMaterialTypeHelper_1 = require("./UnionModifyActorMaterialTypeHelper"),
  FbActorRef_1 = require("../Actor/FbActorRef");
class FbModifyActorMaterial {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.PLh = !1),
      (this.ULh = void 0),
      (this.bSh = !1),
      (this.TAe = void 0);
  }
  static Create(t) {
    if (t) return new FbModifyActorMaterial(t);
  }
  get ActorRefs() {
    if (!this.PLh) {
      (this.PLh = !0), (this.ULh = new Array());
      var r = this.FbDataInternal.actorRefsLength();
      if (r)
        for (let t = 0; t < r; ++t) {
          var e = this.FbDataInternal.actorRefs(t, new fb_actor_1.ActorRef());
          this.ULh.push(FbActorRef_1.FbActorRef.Create(e));
        }
    }
    return this.ULh;
  }
  get Config() {
    var t, r;
    return (
      !this.bSh &&
        ((this.bSh = !0),
        (t = this.FbDataInternal.configType()),
        (r =
          UnionModifyActorMaterialTypeHelper_1.UnionModifyActorMaterialTypeHelper.GetUnionModifyActorMaterialTypeObject(
            t,
          ))) &&
        (this.TAe =
          UnionModifyActorMaterialTypeHelper_1.UnionModifyActorMaterialTypeHelper.ReadUnionModifyActorMaterialType(
            t,
            this.FbDataInternal.config(r),
          )),
      this.TAe
    );
  }
}
exports.FbModifyActorMaterial = FbModifyActorMaterial;
//# sourceMappingURL=FbModifyActorMaterial.js.map
