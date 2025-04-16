"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbBeginFlowTemplate = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbFlowActorUnit_1 = require("./FbFlowActorUnit");
class FbBeginFlowTemplate {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.ogh = !1),
      (this.ngh = !1),
      (this.GMh = !1),
      (this.OMh = void 0),
      (this.FMh = !1),
      (this.NMh = void 0),
      (this.VMh = !1),
      (this.jMh = !1),
      (this.Omh = !1),
      (this.Fmh = !1);
  }
  static Create(t) {
    if (t) return new FbBeginFlowTemplate(t);
  }
  get _folded() {
    return (
      this.ogh || ((this.ogh = !0), (this.ngh = this.FbDataInternal.folded())),
      this.ngh
    );
  }
  get Actors() {
    if (!this.GMh) {
      (this.GMh = !0), (this.OMh = new Array());
      var i = this.FbDataInternal.actorsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.actors(
            t,
            new fb_action_1.FlowActorUnit(),
          );
          this.OMh.push(FbFlowActorUnit_1.FbFlowActorUnit.Create(s));
        }
    }
    return this.OMh;
  }
  get MontageIds() {
    if (!this.FMh) {
      (this.FMh = !0), (this.NMh = new Array());
      var i = this.FbDataInternal.montageIdsLength();
      if (i)
        for (let t = 0; t < i; ++t)
          this.NMh.push(this.FbDataInternal.montageIds(t));
    }
    return this.NMh;
  }
  get UseFreeCamera() {
    return (
      this.VMh ||
        ((this.VMh = !0), (this.jMh = this.FbDataInternal.useFreeCamera())),
      this.jMh
    );
  }
  get IsSwitchMainRole() {
    return (
      this.Omh ||
        ((this.Omh = !0), (this.Fmh = this.FbDataInternal.isSwitchMainRole())),
      this.Fmh
    );
  }
}
exports.FbBeginFlowTemplate = FbBeginFlowTemplate;
//# sourceMappingURL=FbBeginFlowTemplate.js.map
