"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbActorLookAt = void 0);
const UnionActorLookAtDataHelper_1 = require("./UnionActorLookAtDataHelper");
class FbActorLookAt {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.xfh = !1),
      (this.Y_i = 0),
      (this.ldh = !1),
      (this.NHo = void 0),
      (this.Gfh = !1),
      (this.Ofh = 0);
  }
  static Create(t) {
    if (t) return new FbActorLookAt(t);
  }
  get ActorIndex() {
    return (
      this.xfh ||
        ((this.xfh = !0), (this.Y_i = this.FbDataInternal.actorIndex())),
      this.Y_i
    );
  }
  get Target() {
    var t, o;
    return (
      !this.ldh &&
        ((this.ldh = !0),
        (t = this.FbDataInternal.targetType()),
        (o =
          UnionActorLookAtDataHelper_1.UnionActorLookAtDataHelper.GetUnionActorLookAtDataObject(
            t,
          ))) &&
        (this.NHo =
          UnionActorLookAtDataHelper_1.UnionActorLookAtDataHelper.ReadUnionActorLookAtData(
            t,
            this.FbDataInternal.target(o),
          )),
      this.NHo
    );
  }
  get DelayTime() {
    return (
      this.Gfh ||
        ((this.Gfh = !0), (this.Ofh = this.FbDataInternal.delayTime())),
      this.Ofh
    );
  }
}
exports.FbActorLookAt = FbActorLookAt;
//# sourceMappingURL=FbActorLookAt.js.map
