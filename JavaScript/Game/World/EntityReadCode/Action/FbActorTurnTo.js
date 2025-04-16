"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbActorTurnTo = void 0);
const UnionActorTurnToDataHelper_1 = require("./UnionActorTurnToDataHelper");
class FbActorTurnTo {
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
    if (t) return new FbActorTurnTo(t);
  }
  get ActorIndex() {
    return (
      this.xfh ||
        ((this.xfh = !0), (this.Y_i = this.FbDataInternal.actorIndex())),
      this.Y_i
    );
  }
  get Target() {
    var t, r;
    return (
      !this.ldh &&
        ((this.ldh = !0),
        (t = this.FbDataInternal.targetType()),
        (r =
          UnionActorTurnToDataHelper_1.UnionActorTurnToDataHelper.GetUnionActorTurnToDataObject(
            t,
          ))) &&
        (this.NHo =
          UnionActorTurnToDataHelper_1.UnionActorTurnToDataHelper.ReadUnionActorTurnToData(
            t,
            this.FbDataInternal.target(r),
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
exports.FbActorTurnTo = FbActorTurnTo;
//# sourceMappingURL=FbActorTurnTo.js.map
