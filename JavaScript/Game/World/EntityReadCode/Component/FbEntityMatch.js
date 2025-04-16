"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbEntityMatch = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbEntityCategory_1 = require("./FbEntityCategory"),
  FbEntityState_1 = require("./FbEntityState");
class FbEntityMatch {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.Wkh = !1),
      (this.Qkh = !1),
      (this.Kkh = !1),
      (this.$kh = !1),
      (this.Xkh = !1),
      (this.Ykh = void 0),
      (this.Dxh = !1),
      (this.Bxh = void 0),
      (this.zkh = !1),
      (this.Jkh = void 0);
  }
  static Create(t) {
    if (t) return new FbEntityMatch(t);
  }
  get AllCharacter() {
    return (
      this.Wkh ||
        ((this.Wkh = !0), (this.Qkh = this.FbDataInternal.allCharacter())),
      this.Qkh
    );
  }
  get OnlyPlayer() {
    return (
      this.Kkh ||
        ((this.Kkh = !0), (this.$kh = this.FbDataInternal.onlyPlayer())),
      this.$kh
    );
  }
  get Categories() {
    if (!this.Xkh) {
      (this.Xkh = !0), (this.Ykh = new Array());
      var i = this.FbDataInternal.categoriesLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.categories(
            t,
            new fb_component_1.EntityCategory(),
          );
          this.Ykh.push(FbEntityCategory_1.FbEntityCategory.Create(s));
        }
    }
    return this.Ykh;
  }
  get States() {
    if (!this.Dxh) {
      (this.Dxh = !0), (this.Bxh = new Array());
      var i = this.FbDataInternal.statesLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.states(
            t,
            new fb_component_1.EntityState(),
          );
          this.Bxh.push(FbEntityState_1.FbEntityState.Create(s));
        }
    }
    return this.Bxh;
  }
  get PerformanceStates() {
    if (!this.zkh) {
      (this.zkh = !0), (this.Jkh = new Array());
      var i = this.FbDataInternal.performanceStatesLength();
      if (i)
        for (let t = 0; t < i; ++t)
          this.Jkh.push(this.FbDataInternal.performanceStates(t));
    }
    return this.Jkh;
  }
}
exports.FbEntityMatch = FbEntityMatch;
//# sourceMappingURL=FbEntityMatch.js.map
