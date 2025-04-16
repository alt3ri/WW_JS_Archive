"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbAwakeEntity = void 0);
const UnionAwakePosOptionHelper_1 = require("./UnionAwakePosOptionHelper");
class FbAwakeEntity {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.dph = !1),
      (this.Cqn = void 0),
      (this.V_1 = !1),
      (this.j_1 = !1),
      (this.V1h = !1),
      (this.j1h = void 0);
  }
  static Create(t) {
    if (t) return new FbAwakeEntity(t);
  }
  get Position() {
    var t, i;
    return (
      !this.dph &&
        ((this.dph = !0),
        (t = this.FbDataInternal.positionType()),
        (i =
          UnionAwakePosOptionHelper_1.UnionAwakePosOptionHelper.GetUnionAwakePosOptionObject(
            t,
          ))) &&
        (this.Cqn =
          UnionAwakePosOptionHelper_1.UnionAwakePosOptionHelper.ReadUnionAwakePosOption(
            t,
            this.FbDataInternal.position(i),
          )),
      this.Cqn
    );
  }
  get IsSnap() {
    return (
      this.V_1 || ((this.V_1 = !0), (this.j_1 = this.FbDataInternal.isSnap())),
      this.j_1
    );
  }
  get EntityIds() {
    if (!this.V1h) {
      (this.V1h = !0), (this.j1h = new Array());
      var i = this.FbDataInternal.entityIdsLength();
      if (i)
        for (let t = 0; t < i; ++t)
          this.j1h.push(this.FbDataInternal.entityIds(t));
    }
    return this.j1h;
  }
}
exports.FbAwakeEntity = FbAwakeEntity;
//# sourceMappingURL=FbAwakeEntity.js.map
