"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbRandomInteract = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbRandomInteractOption_1 = require("./FbRandomInteractOption");
class FbRandomInteract {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.NDh = !1),
      (this.VDh = 0),
      (this.ugh = !1),
      (this.dgh = void 0);
  }
  static Create(t) {
    if (t) return new FbRandomInteract(t);
  }
  get RandomCount() {
    return (
      this.NDh ||
        ((this.NDh = !0), (this.VDh = this.FbDataInternal.randomCount())),
      this.VDh
    );
  }
  get Options() {
    if (!this.ugh) {
      (this.ugh = !0), (this.dgh = new Array());
      var e = this.FbDataInternal.optionsLength();
      if (e)
        for (let t = 0; t < e; ++t) {
          var n = this.FbDataInternal.options(
            t,
            new fb_component_1.RandomInteractOption(),
          );
          this.dgh.push(
            FbRandomInteractOption_1.FbRandomInteractOption.Create(n),
          );
        }
    }
    return this.dgh;
  }
}
exports.FbRandomInteract = FbRandomInteract;
//# sourceMappingURL=FbRandomInteract.js.map
