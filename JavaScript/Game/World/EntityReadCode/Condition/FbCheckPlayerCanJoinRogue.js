"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCheckPlayerCanJoinRogue = void 0);
class FbCheckPlayerCanJoinRogue {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.lJh = !1),
      (this._Jh = !1),
      (this.cJh = !1),
      (this.uJh = void 0);
  }
  static Create(t) {
    if (t) return new FbCheckPlayerCanJoinRogue(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get CanJoin() {
    return (
      this.lJh || ((this.lJh = !0), (this._Jh = this.FbDataInternal.canJoin())),
      this._Jh
    );
  }
  get RogueType() {
    return (
      this.cJh ||
        ((this.cJh = !0), (this.uJh = this.FbDataInternal.rogueType())),
      this.uJh
    );
  }
}
exports.FbCheckPlayerCanJoinRogue = FbCheckPlayerCanJoinRogue;
//# sourceMappingURL=FbCheckPlayerCanJoinRogue.js.map
