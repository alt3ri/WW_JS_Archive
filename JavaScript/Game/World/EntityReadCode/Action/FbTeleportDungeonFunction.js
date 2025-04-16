"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbTeleportDungeonFunction = void 0);
class FbTeleportDungeonFunction {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.Jch = !1),
      (this.l7 = !1),
      (this.Zch = !1),
      (this.euh = void 0);
  }
  static Create(t) {
    if (t) return new FbTeleportDungeonFunction(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Enable() {
    return (
      this.Jch || ((this.Jch = !0), (this.l7 = this.FbDataInternal.enable())),
      this.l7
    );
  }
  get DungeonList() {
    if (!this.Zch) {
      (this.Zch = !0), (this.euh = new Array());
      var i = this.FbDataInternal.dungeonListLength();
      if (i)
        for (let t = 0; t < i; ++t)
          this.euh.push(this.FbDataInternal.dungeonList(t));
    }
    return this.euh;
  }
}
exports.FbTeleportDungeonFunction = FbTeleportDungeonFunction;
//# sourceMappingURL=FbTeleportDungeonFunction.js.map
