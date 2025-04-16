"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbPasserbyNpcSpline = void 0);
const FbPasserbyNpcMoveState_1 = require("./FbPasserbyNpcMoveState");
class FbPasserbyNpcSpline {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.kuh = !1),
      (this.Guh = 0),
      (this.PQh = !1),
      (this.UQh = 0),
      (this.Dfh = !1),
      (this.Bfh = !1),
      (this.Nuh = !1),
      (this.Vuh = void 0);
  }
  static Create(t) {
    if (t) return new FbPasserbyNpcSpline(t);
  }
  get SplineEntityId() {
    return (
      this.kuh ||
        ((this.kuh = !0), (this.Guh = this.FbDataInternal.splineEntityId())),
      this.Guh
    );
  }
  get SpawnWeight() {
    return (
      this.PQh ||
        ((this.PQh = !0), (this.UQh = this.FbDataInternal.spawnWeight())),
      this.UQh
    );
  }
  get IsLoop() {
    return (
      this.Dfh || ((this.Dfh = !0), (this.Bfh = this.FbDataInternal.isLoop())),
      this.Bfh
    );
  }
  get MoveState() {
    return (
      this.Nuh ||
        ((this.Nuh = !0),
        (this.Vuh = FbPasserbyNpcMoveState_1.FbPasserbyNpcMoveState.Create(
          this.FbDataInternal.moveState(),
        ))),
      this.Vuh
    );
  }
}
exports.FbPasserbyNpcSpline = FbPasserbyNpcSpline;
//# sourceMappingURL=FbPasserbyNpcSpline.js.map
