"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSwitcherComponent = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbActionInfo_1 = require("../Action/FbActionInfo");
class FbSwitcherComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.Euh = !1),
      (this.Iuh = void 0),
      (this.d_h = !1),
      (this.m_h = void 0),
      (this.akh = !1),
      (this.hkh = void 0),
      (this.lkh = !1),
      (this._kh = void 0);
  }
  static Create(t) {
    if (t) return new FbSwitcherComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get Content() {
    return (
      this.Euh || ((this.Euh = !0), (this.Iuh = this.FbDataInternal.content())),
      this.Iuh
    );
  }
  get Icon() {
    return (
      this.d_h || ((this.d_h = !0), (this.m_h = this.FbDataInternal.icon())),
      this.m_h
    );
  }
  get OnActions() {
    if (!this.akh) {
      (this.akh = !0), (this.hkh = new Array());
      var i = this.FbDataInternal.onActionsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.onActions(
            t,
            new fb_action_1.ActionInfo(),
          );
          this.hkh.push(FbActionInfo_1.FbActionInfo.Create(s));
        }
    }
    return this.hkh;
  }
  get OffActions() {
    if (!this.lkh) {
      (this.lkh = !0), (this._kh = new Array());
      var i = this.FbDataInternal.offActionsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.offActions(
            t,
            new fb_action_1.ActionInfo(),
          );
          this._kh.push(FbActionInfo_1.FbActionInfo.Create(s));
        }
    }
    return this._kh;
  }
}
exports.FbSwitcherComponent = FbSwitcherComponent;
//# sourceMappingURL=FbSwitcherComponent.js.map
