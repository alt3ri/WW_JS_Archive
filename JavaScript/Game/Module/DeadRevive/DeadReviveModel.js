"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DeadReviveModel = void 0);
const ReviveById_1 = require("../../../Core/Define/ConfigQuery/ReviveById"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase");
class DeadReviveModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.IsAutoRevive = !1),
      (this.IsShowRevive = !1),
      (this.ReviveLimitTime = 0),
      (this.RevivePosition = void 0),
      (this.ReviveRotator = void 0),
      (this.ReviveConfig = void 0),
      (this.SkipFallInjure = !1),
      (this.SkipDeathAnim = !1),
      (this.ReviveFlowIncId = 0);
  }
  InitReviveConfig(e) {
    (this.ReviveConfig && this.ReviveConfig.Id === e) ||
      (this.ReviveConfig = ReviveById_1.configReviveById.GetConfig(e));
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
    this.ClearReviveData(),
      (this.RevivePosition = void 0),
      (this.ReviveRotator = void 0),
      (this.ReviveFlowIncId = 0);
  }
  ClearReviveData() {
    (this.ReviveLimitTime = 0),
      (this.IsShowRevive = !1),
      (this.IsAutoRevive = !1);
  }
}
exports.DeadReviveModel = DeadReviveModel;
//# sourceMappingURL=DeadReviveModel.js.map
