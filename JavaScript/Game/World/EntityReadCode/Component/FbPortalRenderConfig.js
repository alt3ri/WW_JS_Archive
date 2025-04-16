"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbPortalRenderConfig = void 0);
const fb_actor_1 = require("../../../../Game/World/EntityFb/fb-actor"),
  fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbActorRef_1 = require("../Actor/FbActorRef"),
  FbRenderFlag_1 = require("./FbRenderFlag"),
  UnionPortalViewDistanceConfigHelper_1 = require("./UnionPortalViewDistanceConfigHelper");
class FbPortalRenderConfig {
  constructor(e) {
    (this.FbDataInternal = e),
      (this.GKh = !1),
      (this.OKh = void 0),
      (this.FKh = !1),
      (this.NKh = void 0),
      (this.VKh = !1),
      (this.jKh = void 0);
  }
  static Create(e) {
    if (e) return new FbPortalRenderConfig(e);
  }
  get ViewDistance() {
    var e, t;
    return (
      !this.GKh &&
        ((this.GKh = !0),
        (e = this.FbDataInternal.viewDistanceType()),
        (t =
          UnionPortalViewDistanceConfigHelper_1.UnionPortalViewDistanceConfigHelper.GetUnionPortalViewDistanceConfigObject(
            e,
          ))) &&
        (this.OKh =
          UnionPortalViewDistanceConfigHelper_1.UnionPortalViewDistanceConfigHelper.ReadUnionPortalViewDistanceConfig(
            e,
            this.FbDataInternal.viewDistance(t),
          )),
      this.OKh
    );
  }
  get ForceRenderActors() {
    if (!this.FKh) {
      (this.FKh = !0), (this.NKh = new Array());
      var t = this.FbDataInternal.forceRenderActorsLength();
      if (t)
        for (let e = 0; e < t; ++e) {
          var i = this.FbDataInternal.forceRenderActors(
            e,
            new fb_actor_1.ActorRef(),
          );
          this.NKh.push(FbActorRef_1.FbActorRef.Create(i));
        }
    }
    return this.NKh;
  }
  get SetRenderFlags() {
    if (!this.VKh) {
      (this.VKh = !0), (this.jKh = new Array());
      var t = this.FbDataInternal.setRenderFlagsLength();
      if (t)
        for (let e = 0; e < t; ++e) {
          var i = this.FbDataInternal.setRenderFlags(
            e,
            new fb_component_1.RenderFlag(),
          );
          this.jKh.push(FbRenderFlag_1.FbRenderFlag.Create(i));
        }
    }
    return this.jKh;
  }
}
exports.FbPortalRenderConfig = FbPortalRenderConfig;
//# sourceMappingURL=FbPortalRenderConfig.js.map
