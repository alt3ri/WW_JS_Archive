"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbHideWorldEntityAndLevelPlayGroup = void 0);
class FbHideWorldEntityAndLevelPlayGroup {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.hxh = !1),
      (this.lxh = void 0),
      (this.oxh = !1),
      (this.nxh = void 0),
      (this._xh = !1),
      (this.cxh = void 0),
      (this.uxh = !1),
      (this.dxh = void 0),
      (this.P9_ = !1),
      (this.x9_ = void 0);
  }
  static Create(t) {
    if (t) return new FbHideWorldEntityAndLevelPlayGroup(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get HideRangeEntities() {
    if (!this.hxh) {
      (this.hxh = !0), (this.lxh = new Array());
      var i = this.FbDataInternal.hideRangeEntitiesLength();
      if (i)
        for (let t = 0; t < i; ++t)
          this.lxh.push(this.FbDataInternal.hideRangeEntities(t));
    }
    return this.lxh;
  }
  get ExcludeEntities() {
    if (!this.oxh) {
      (this.oxh = !0), (this.nxh = new Array());
      var i = this.FbDataInternal.excludeEntitiesLength();
      if (i)
        for (let t = 0; t < i; ++t)
          this.nxh.push(this.FbDataInternal.excludeEntities(t));
    }
    return this.nxh;
  }
  get ExcludeLevelPlays() {
    if (!this._xh) {
      (this._xh = !0), (this.cxh = new Array());
      var i = this.FbDataInternal.excludeLevelPlaysLength();
      if (i)
        for (let t = 0; t < i; ++t)
          this.cxh.push(this.FbDataInternal.excludeLevelPlays(t));
    }
    return this.cxh;
  }
  get AppendEntities() {
    if (!this.uxh) {
      (this.uxh = !0), (this.dxh = new Array());
      var i = this.FbDataInternal.appendEntitiesLength();
      if (i)
        for (let t = 0; t < i; ++t)
          this.dxh.push(this.FbDataInternal.appendEntities(t));
    }
    return this.dxh;
  }
  get AppendLevelPlays() {
    if (!this.P9_) {
      (this.P9_ = !0), (this.x9_ = new Array());
      var i = this.FbDataInternal.appendLevelPlaysLength();
      if (i)
        for (let t = 0; t < i; ++t)
          this.x9_.push(this.FbDataInternal.appendLevelPlays(t));
    }
    return this.x9_;
  }
}
exports.FbHideWorldEntityAndLevelPlayGroup = FbHideWorldEntityAndLevelPlayGroup;
//# sourceMappingURL=FbHideWorldEntityAndLevelPlayGroup.js.map
