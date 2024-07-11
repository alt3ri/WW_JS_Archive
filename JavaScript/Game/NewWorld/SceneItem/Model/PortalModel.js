"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PortalModel = void 0);
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
class PortalModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), (this.Osr = void 0);
  }
  OnInit() {
    return (this.Osr = new Map()), !0;
  }
  AddPortalPair(e, t) {
    this.Osr.has(e) || this.Osr.set(e, t);
  }
  RemovePortalPair(e) {
    this.Osr.delete(e);
  }
  GetPortal(e) {
    return this.Osr.get(e);
  }
  OnClear() {
    return !(this.Osr = void 0);
  }
}
exports.PortalModel = PortalModel;
//# sourceMappingURL=PortalModel.js.map
