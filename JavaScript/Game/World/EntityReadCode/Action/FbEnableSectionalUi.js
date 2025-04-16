"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbEnableSectionalUi = void 0);
class FbEnableSectionalUi {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.iSh = !1),
      (this.rSh = !1),
      (this.oSh = !1),
      (this.nSh = !1),
      (this.sSh = !1),
      (this.aSh = !1),
      (this.hSh = !1),
      (this.lSh = !1),
      (this._Sh = !1),
      (this.cSh = !1),
      (this.uSh = !1),
      (this.dSh = !1),
      (this.OAc = !1),
      (this.qAc = void 0);
  }
  static Create(t) {
    if (t) return new FbEnableSectionalUi(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get ShowMiniMap() {
    return (
      this.iSh ||
        ((this.iSh = !0), (this.rSh = this.FbDataInternal.showMiniMap())),
      this.rSh
    );
  }
  get ShowQuestTrack() {
    return (
      this.oSh ||
        ((this.oSh = !0), (this.nSh = this.FbDataInternal.showQuestTrack())),
      this.nSh
    );
  }
  get ShowEsc() {
    return (
      this.sSh || ((this.sSh = !0), (this.aSh = this.FbDataInternal.showEsc())),
      this.aSh
    );
  }
  get ShowSystem() {
    return (
      this.hSh ||
        ((this.hSh = !0), (this.lSh = this.FbDataInternal.showSystem())),
      this.lSh
    );
  }
  get ShowScreenEffect() {
    return (
      this._Sh ||
        ((this._Sh = !0), (this.cSh = this.FbDataInternal.showScreenEffect())),
      this.cSh
    );
  }
  get ShowOther() {
    return (
      this.uSh ||
        ((this.uSh = !0), (this.dSh = this.FbDataInternal.showOther())),
      this.dSh
    );
  }
  get AlwaysShowUiSections() {
    if (!this.OAc) {
      (this.OAc = !0), (this.qAc = new Array());
      var i = this.FbDataInternal.alwaysShowUiSectionsLength();
      if (i)
        for (let t = 0; t < i; ++t)
          this.qAc.push(this.FbDataInternal.alwaysShowUiSections(t));
    }
    return this.qAc;
  }
}
exports.FbEnableSectionalUi = FbEnableSectionalUi;
//# sourceMappingURL=FbEnableSectionalUi.js.map
