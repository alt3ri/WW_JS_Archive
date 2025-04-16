"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbBuffProducerComponent = void 0);
const UnionAddBuffModeHelper_1 = require("./UnionAddBuffModeHelper");
class FbBuffProducerComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.M5h = !1),
      (this.E5h = void 0),
      (this.I5h = !1),
      (this.T5h = 0);
  }
  static Create(t) {
    if (t) return new FbBuffProducerComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get AddBuffMode() {
    var t, e;
    return (
      !this.M5h &&
        ((this.M5h = !0),
        (t = this.FbDataInternal.addBuffModeType()),
        (e =
          UnionAddBuffModeHelper_1.UnionAddBuffModeHelper.GetUnionAddBuffModeObject(
            t,
          ))) &&
        (this.E5h =
          UnionAddBuffModeHelper_1.UnionAddBuffModeHelper.ReadUnionAddBuffMode(
            t,
            this.FbDataInternal.addBuffMode(e),
          )),
      this.E5h
    );
  }
  get BuffId() {
    return (
      this.I5h ||
        ((this.I5h = !0), (this.T5h = Number(this.FbDataInternal.buffId()))),
      this.T5h
    );
  }
}
exports.FbBuffProducerComponent = FbBuffProducerComponent;
//# sourceMappingURL=FbBuffProducerComponent.js.map
