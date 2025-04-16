"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbPasserbyNpcMoveState = void 0);
class FbPasserbyNpcMoveState {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.Nuh = !1),
      (this.Vuh = void 0),
      (this.p9h = !1),
      (this.v9h = void 0),
      (this.YHh = !1),
      (this.zHh = 0);
  }
  static Create(t) {
    if (t) return new FbPasserbyNpcMoveState(t);
  }
  get MoveState() {
    return (
      this.Nuh ||
        ((this.Nuh = !0), (this.Vuh = this.FbDataInternal.moveState())),
      this.Vuh
    );
  }
  get CharPositionState() {
    return (
      this.p9h ||
        ((this.p9h = !0), (this.v9h = this.FbDataInternal.charPositionState())),
      this.v9h
    );
  }
  get MoveSpeed() {
    return (
      this.YHh ||
        ((this.YHh = !0), (this.zHh = this.FbDataInternal.moveSpeed())),
      this.zHh
    );
  }
}
exports.FbPasserbyNpcMoveState = FbPasserbyNpcMoveState;
//# sourceMappingURL=FbPasserbyNpcMoveState.js.map
