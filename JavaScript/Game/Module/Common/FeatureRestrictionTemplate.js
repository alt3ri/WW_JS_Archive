"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FeatureRestrictionTemplate = void 0);
const ConfigManager_1 = require("../../Manager/ConfigManager");
class FeatureRestrictionTemplate {
  constructor(t, e = 0) {
    (this.eNn = 0),
      (this.tNn = 0),
      (this.iNn = 2),
      (this.rNn = 0),
      (this.iNn = t),
      (this.rNn = e);
  }
  oNn(t) {
    this.eNn = this.eNn | t;
  }
  nNn(t, e) {
    return (t & e) === e;
  }
  sNn() {
    let t = 0;
    return (
      ConfigManager_1.ConfigManager.CommonConfig?.GetPioneerFlag() && (t |= 8),
      t
    );
  }
  aNn() {
    return 0;
  }
  Check() {
    switch (this.rNn) {
      case 1:
        return !0;
      case 2:
        return !1;
    }
    switch (this.iNn) {
      case 0:
        return this.nNn(this.sNn(), this.eNn);
      case 1:
        return this.nNn(this.aNn(), this.tNn);
      case 2:
        return this.nNn(this.sNn(), this.eNn) && this.nNn(this.aNn(), this.tNn);
      default:
        return !1;
    }
  }
  static get TemplateForPioneerClient() {
    var t;
    return (
      FeatureRestrictionTemplate.hNn ||
      ((t = new FeatureRestrictionTemplate(0)).oNn(8),
      (FeatureRestrictionTemplate.hNn = t))
    );
  }
}
(exports.FeatureRestrictionTemplate = FeatureRestrictionTemplate).hNn = void 0;
//# sourceMappingURL=FeatureRestrictionTemplate.js.map
