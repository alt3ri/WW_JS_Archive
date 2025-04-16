"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InstanceGameplayModeModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
class InstanceGameplayModeModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.DefaultCameraMode = 0),
      (this.DisabledCreatureSet = new Set());
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
    this.DisabledCreatureSet.clear();
  }
}
exports.InstanceGameplayModeModel = InstanceGameplayModeModel;
//# sourceMappingURL=InstanceGameplayModeModel.js.map
