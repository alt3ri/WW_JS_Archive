"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoGlobalModel = void 0);
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
class DangoGlobalModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), (this.Config = void 0);
  }
  OnClear() {
    return this.qFt(), !0;
  }
  OnLeaveLevel() {
    return this.qFt(), !0;
  }
  OnChangeMode() {
    return this.qFt(), !0;
  }
  qFt() {
    this.Config = void 0;
  }
}
exports.DangoGlobalModel = DangoGlobalModel;
//# sourceMappingURL=DangoGlobalModel.js.map
