"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbChangeFlowTemplate = void 0);
const FbFlowTemplateMode_1 = require("./FbFlowTemplateMode"),
  FbPosA_1 = require("./FbPosA");
class FbChangeFlowTemplate {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.sfh = !1),
      (this.afh = void 0),
      (this.hfh = !1),
      (this.lfh = void 0),
      (this.DMh = !1),
      (this.BMh = void 0),
      (this.qMh = !1),
      (this.kMh = void 0);
  }
  static Create(t) {
    if (t) return new FbChangeFlowTemplate(t);
  }
  get TemplateMode() {
    return (
      this.sfh ||
        ((this.sfh = !0),
        (this.afh = FbFlowTemplateMode_1.FbFlowTemplateMode.Create(
          this.FbDataInternal.templateMode(),
        ))),
      this.afh
    );
  }
  get TargetPos() {
    return (
      this.hfh ||
        ((this.hfh = !0),
        (this.lfh = FbPosA_1.FbPosA.Create(this.FbDataInternal.targetPos()))),
      this.lfh
    );
  }
  get ActorIdArray() {
    if (!this.DMh) {
      (this.DMh = !0), (this.BMh = new Array());
      var e = this.FbDataInternal.actorIdArrayLength();
      if (e)
        for (let t = 0; t < e; ++t)
          this.BMh.push(this.FbDataInternal.actorIdArray(t));
    }
    return this.BMh;
  }
  get TalkerIds() {
    if (!this.qMh) {
      (this.qMh = !0), (this.kMh = new Array());
      var e = this.FbDataInternal.talkerIdsLength();
      if (e)
        for (let t = 0; t < e; ++t)
          this.kMh.push(this.FbDataInternal.talkerIds(t));
    }
    return this.kMh;
  }
}
exports.FbChangeFlowTemplate = FbChangeFlowTemplate;
//# sourceMappingURL=FbChangeFlowTemplate.js.map
