"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbEntityGroupComponent = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbEntityStateTrigger_1 = require("./FbEntityStateTrigger"),
  FbFailureStateTrigger_1 = require("./FbFailureStateTrigger"),
  FbFinishStateTrigger_1 = require("./FbFinishStateTrigger");
class FbEntityGroupComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.V1h = !1),
      (this.j1h = void 0),
      (this.gVh = !1),
      (this.fVh = void 0),
      (this.pVh = !1),
      (this.vVh = void 0),
      (this.yVh = !1),
      (this.SVh = void 0);
  }
  static Create(t) {
    if (t) return new FbEntityGroupComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
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
  get StateTriggers() {
    if (!this.gVh) {
      (this.gVh = !0), (this.fVh = new Array());
      var i = this.FbDataInternal.stateTriggersLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.stateTriggers(
            t,
            new fb_component_1.EntityStateTrigger(),
          );
          this.fVh.push(FbEntityStateTrigger_1.FbEntityStateTrigger.Create(e));
        }
    }
    return this.fVh;
  }
  get FinishState() {
    return (
      this.pVh ||
        ((this.pVh = !0),
        (this.vVh = FbFinishStateTrigger_1.FbFinishStateTrigger.Create(
          this.FbDataInternal.finishState(),
        ))),
      this.vVh
    );
  }
  get FailureState() {
    return (
      this.yVh ||
        ((this.yVh = !0),
        (this.SVh = FbFailureStateTrigger_1.FbFailureStateTrigger.Create(
          this.FbDataInternal.failureState(),
        ))),
      this.SVh
    );
  }
}
exports.FbEntityGroupComponent = FbEntityGroupComponent;
//# sourceMappingURL=FbEntityGroupComponent.js.map
