"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSwitchPermission = void 0);
class FbSwitchPermission {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.qH_ = !1),
      (this.OH_ = !1),
      (this.GH_ = !1),
      (this.FH_ = void 0);
  }
  static Create(t) {
    if (t) return new FbSwitchPermission(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get IsAllowClientSwitch() {
    return (
      this.qH_ ||
        ((this.qH_ = !0),
        (this.OH_ = this.FbDataInternal.isAllowClientSwitch())),
      this.OH_
    );
  }
  get Levels() {
    if (!this.GH_) {
      (this.GH_ = !0), (this.FH_ = new Array());
      var i = this.FbDataInternal.levelsLength();
      if (i)
        for (let t = 0; t < i; ++t)
          this.FH_.push(this.FbDataInternal.levels(t));
    }
    return this.FH_;
  }
}
exports.FbSwitchPermission = FbSwitchPermission;
//# sourceMappingURL=FbSwitchPermission.js.map
