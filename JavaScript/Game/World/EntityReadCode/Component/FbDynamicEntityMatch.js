"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbDynamicEntityMatch = void 0);
const FbEntityCategory_1 = require("./FbEntityCategory"),
  FbEntityState_1 = require("./FbEntityState");
class FbDynamicEntityMatch {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.Rwh = !1),
      (this.wwh = void 0),
      (this.yFh = !1),
      (this.SFh = void 0),
      (this.V1h = !1),
      (this.j1h = void 0),
      (this.Bch = !1),
      (this.Cbo = void 0),
      (this.MFh = !1),
      (this.EFh = void 0),
      (this.IFh = !1),
      (this.TFh = void 0);
  }
  static Create(t) {
    if (t) return new FbDynamicEntityMatch(t);
  }
  get Category() {
    return (
      this.Rwh ||
        ((this.Rwh = !0),
        (this.wwh = FbEntityCategory_1.FbEntityCategory.Create(
          this.FbDataInternal.category(),
        ))),
      this.wwh
    );
  }
  get CategoryType() {
    return (
      this.yFh ||
        ((this.yFh = !0), (this.SFh = this.FbDataInternal.categoryType())),
      this.SFh
    );
  }
  get EntityIds() {
    if (!this.V1h) {
      (this.V1h = !0), (this.j1h = new Array());
      var i = this.FbDataInternal.entityIdsLength();
      if (i)
        for (let t = 0; t < i; ++t)
          this.j1h.push(this.FbDataInternal.entityIds(t));
    }
    return this.j1h;
  }
  get State() {
    return (
      this.Bch ||
        ((this.Bch = !0),
        (this.Cbo = FbEntityState_1.FbEntityState.Create(
          this.FbDataInternal.state(),
        ))),
      this.Cbo
    );
  }
  get HasProperty() {
    if (!this.MFh) {
      (this.MFh = !0), (this.EFh = new Array());
      var i = this.FbDataInternal.hasPropertyLength();
      if (i)
        for (let t = 0; t < i; ++t)
          this.EFh.push(this.FbDataInternal.hasProperty(t));
    }
    return this.EFh;
  }
  get NoProperty() {
    if (!this.IFh) {
      (this.IFh = !0), (this.TFh = new Array());
      var i = this.FbDataInternal.noPropertyLength();
      if (i)
        for (let t = 0; t < i; ++t)
          this.TFh.push(this.FbDataInternal.noProperty(t));
    }
    return this.TFh;
  }
}
exports.FbDynamicEntityMatch = FbDynamicEntityMatch;
//# sourceMappingURL=FbDynamicEntityMatch.js.map
