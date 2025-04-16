"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCheckDungeonFinish = void 0);
class FbCheckDungeonFinish {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.MMh = !1),
      (this.EMh = 0);
  }
  static Create(t) {
    if (t) return new FbCheckDungeonFinish(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get DungeonId() {
    return (
      this.MMh ||
        ((this.MMh = !0), (this.EMh = this.FbDataInternal.dungeonId())),
      this.EMh
    );
  }
}
exports.FbCheckDungeonFinish = FbCheckDungeonFinish;
//# sourceMappingURL=FbCheckDungeonFinish.js.map
