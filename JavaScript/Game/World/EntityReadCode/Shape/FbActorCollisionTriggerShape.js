"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbActorCollisionTriggerShape = void 0);
const FbActorRef_1 = require("../Actor/FbActorRef");
class FbActorCollisionTriggerShape {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.L7h = !1),
      (this.A7h = void 0);
  }
  static Create(t) {
    if (t) return new FbActorCollisionTriggerShape(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get ActorRef() {
    return (
      this.L7h ||
        ((this.L7h = !0),
        (this.A7h = FbActorRef_1.FbActorRef.Create(
          this.FbDataInternal.actorRef(),
        ))),
      this.A7h
    );
  }
}
exports.FbActorCollisionTriggerShape = FbActorCollisionTriggerShape;
//# sourceMappingURL=FbActorCollisionTriggerShape.js.map
