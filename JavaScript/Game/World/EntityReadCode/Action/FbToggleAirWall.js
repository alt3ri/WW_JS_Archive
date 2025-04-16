"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbToggleAirWall = void 0);
const fb_actor_1 = require("../../../../Game/World/EntityFb/fb-actor"),
  UnionToggleAirWallHelper_1 = require("./UnionToggleAirWallHelper"),
  FbActorRef_1 = require("../Actor/FbActorRef");
class FbToggleAirWall {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.s_h = !1),
      (this.Hye = void 0),
      (this.PLh = !1),
      (this.ULh = void 0);
  }
  static Create(t) {
    if (t) return new FbToggleAirWall(t);
  }
  get Option() {
    var t, e;
    return (
      !this.s_h &&
        ((this.s_h = !0),
        (t = this.FbDataInternal.optionType()),
        (e =
          UnionToggleAirWallHelper_1.UnionToggleAirWallHelper.GetUnionToggleAirWallObject(
            t,
          ))) &&
        (this.Hye =
          UnionToggleAirWallHelper_1.UnionToggleAirWallHelper.ReadUnionToggleAirWall(
            t,
            this.FbDataInternal.option(e),
          )),
      this.Hye
    );
  }
  get ActorRefs() {
    if (!this.PLh) {
      (this.PLh = !0), (this.ULh = new Array());
      var e = this.FbDataInternal.actorRefsLength();
      if (e)
        for (let t = 0; t < e; ++t) {
          var r = this.FbDataInternal.actorRefs(t, new fb_actor_1.ActorRef());
          this.ULh.push(FbActorRef_1.FbActorRef.Create(r));
        }
    }
    return this.ULh;
  }
}
exports.FbToggleAirWall = FbToggleAirWall;
//# sourceMappingURL=FbToggleAirWall.js.map
