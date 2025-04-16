"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSwitchSubLevelsDirectly = void 0);
class FbSwitchSubLevelsDirectly {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.HTh = !1),
      (this.WTh = void 0),
      (this.QTh = !1),
      (this.KTh = void 0),
      (this.$Th = !1),
      (this.XTh = 0);
  }
  static Create(t) {
    if (t) return new FbSwitchSubLevelsDirectly(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get LoadLevels() {
    if (!this.HTh) {
      (this.HTh = !0), (this.WTh = new Array());
      var i = this.FbDataInternal.loadLevelsLength();
      if (i)
        for (let t = 0; t < i; ++t)
          this.WTh.push(this.FbDataInternal.loadLevels(t));
    }
    return this.WTh;
  }
  get UnloadLevels() {
    if (!this.QTh) {
      (this.QTh = !0), (this.KTh = new Array());
      var i = this.FbDataInternal.unloadLevelsLength();
      if (i)
        for (let t = 0; t < i; ++t)
          this.KTh.push(this.FbDataInternal.unloadLevels(t));
    }
    return this.KTh;
  }
  get TeleportEntityId() {
    return (
      this.$Th ||
        ((this.$Th = !0), (this.XTh = this.FbDataInternal.teleportEntityId())),
      this.XTh
    );
  }
}
exports.FbSwitchSubLevelsDirectly = FbSwitchSubLevelsDirectly;
//# sourceMappingURL=FbSwitchSubLevelsDirectly.js.map
