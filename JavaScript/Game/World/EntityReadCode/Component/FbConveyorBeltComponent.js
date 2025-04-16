"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbConveyorBeltComponent = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbConveyorBeltState_1 = require("./FbConveyorBeltState");
class FbConveyorBeltComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.RWh = !1),
      (this.wWh = void 0);
  }
  static Create(t) {
    if (t) return new FbConveyorBeltComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get StateGroups() {
    if (!this.RWh) {
      (this.RWh = !0), (this.wWh = new Array());
      var e = this.FbDataInternal.stateGroupsLength();
      if (e)
        for (let t = 0; t < e; ++t) {
          var o = this.FbDataInternal.stateGroups(
            t,
            new fb_component_1.ConveyorBeltState(),
          );
          this.wWh.push(FbConveyorBeltState_1.FbConveyorBeltState.Create(o));
        }
    }
    return this.wWh;
  }
}
exports.FbConveyorBeltComponent = FbConveyorBeltComponent;
//# sourceMappingURL=FbConveyorBeltComponent.js.map
