"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbDynamicTeleportComponent = void 0);
const FbPosA_1 = require("../Action/FbPosA");
class FbDynamicTeleportComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.Kdh = !1),
      (this.$dh = void 0),
      (this.DWh = !1),
      (this.BWh = 0);
  }
  static Create(t) {
    if (t) return new FbDynamicTeleportComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get Offset() {
    return (
      this.Kdh ||
        ((this.Kdh = !0),
        (this.$dh = FbPosA_1.FbPosA.Create(this.FbDataInternal.offset()))),
      this.$dh
    );
  }
  get PhantomSkillId() {
    return (
      this.DWh ||
        ((this.DWh = !0), (this.BWh = this.FbDataInternal.phantomSkillId())),
      this.BWh
    );
  }
}
exports.FbDynamicTeleportComponent = FbDynamicTeleportComponent;
//# sourceMappingURL=FbDynamicTeleportComponent.js.map
