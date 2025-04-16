"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSceneActorRefComponent = void 0);
const fb_actor_1 = require("../../../../Game/World/EntityFb/fb-actor"),
  fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbActorRef_1 = require("../Actor/FbActorRef"),
  FbSceneActorRefGroup_1 = require("./FbSceneActorRefGroup");
class FbSceneActorRefComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.r7h = !1),
      (this.o7h = void 0),
      (this.n7h = !1),
      (this.s7h = void 0);
  }
  static Create(t) {
    if (t) return new FbSceneActorRefComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get ActorRefGroups() {
    if (!this.r7h) {
      (this.r7h = !0), (this.o7h = new Array());
      var e = this.FbDataInternal.actorRefGroupsLength();
      if (e)
        for (let t = 0; t < e; ++t) {
          var r = this.FbDataInternal.actorRefGroups(
            t,
            new fb_component_1.SceneActorRefGroup(),
          );
          this.o7h.push(FbSceneActorRefGroup_1.FbSceneActorRefGroup.Create(r));
        }
    }
    return this.o7h;
  }
  get VolumesRef() {
    if (!this.n7h) {
      (this.n7h = !0), (this.s7h = new Array());
      var e = this.FbDataInternal.volumesRefLength();
      if (e)
        for (let t = 0; t < e; ++t) {
          var r = this.FbDataInternal.volumesRef(t, new fb_actor_1.ActorRef());
          this.s7h.push(FbActorRef_1.FbActorRef.Create(r));
        }
    }
    return this.s7h;
  }
}
exports.FbSceneActorRefComponent = FbSceneActorRefComponent;
//# sourceMappingURL=FbSceneActorRefComponent.js.map
