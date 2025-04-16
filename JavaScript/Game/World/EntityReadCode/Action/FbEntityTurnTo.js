"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbEntityTurnTo = void 0);
const UnionActorTurnToDataHelper_1 = require("./UnionActorTurnToDataHelper");
class FbEntityTurnTo {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.a_h = !1),
      (this.I9o = 0),
      (this.ldh = !1),
      (this.NHo = void 0);
  }
  static Create(t) {
    if (t) return new FbEntityTurnTo(t);
  }
  get EntityId() {
    return (
      this.a_h ||
        ((this.a_h = !0), (this.I9o = this.FbDataInternal.entityId())),
      this.I9o
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
}
exports.FbEntityTurnTo = FbEntityTurnTo;
//# sourceMappingURL=FbEntityTurnTo.js.map
