"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbChangePhantomFormation = void 0);
class FbChangePhantomFormation {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.mbh = !1),
      (this.Cbh = 0),
      (this.gbh = !1),
      (this.fbh = !1),
      (this.$Th = !1),
      (this.XTh = 0),
      (this.pbh = !1),
      (this.vbh = void 0);
  }
  static Create(t) {
    if (t) return new FbChangePhantomFormation(t);
  }
  get FormationId() {
    return (
      this.mbh ||
        ((this.mbh = !0), (this.Cbh = this.FbDataInternal.formationId())),
      this.Cbh
    );
  }
  get RetainRole() {
    return (
      this.gbh ||
        ((this.gbh = !0), (this.fbh = this.FbDataInternal.retainRole())),
      this.fbh
    );
  }
  get TeleportEntityId() {
    return (
      this.$Th ||
        ((this.$Th = !0), (this.XTh = this.FbDataInternal.teleportEntityId())),
      this.XTh
    );
  }
  get AppendBuffIds() {
    if (!this.pbh) {
      (this.pbh = !0), (this.vbh = new Array());
      var i = this.FbDataInternal.appendBuffIdsLength();
      if (i)
        for (let t = 0; t < i; ++t)
          this.vbh.push(Number(this.FbDataInternal.appendBuffIds(t) ?? 0));
    }
    return this.vbh;
  }
}
exports.FbChangePhantomFormation = FbChangePhantomFormation;
//# sourceMappingURL=FbChangePhantomFormation.js.map
