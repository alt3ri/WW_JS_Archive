"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlowActionUnlockEntity = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  FlowActionBase_1 = require("./FlowActionBase");
class FlowActionUnlockEntity extends FlowActionBase_1.FlowActionBase {
  OnExecute() {
    for (const e of this.ActionInfo.Params.EntityIds) {
      var o =
        ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
          e,
        )?.Entity?.GetComponent(194);
      o
        ? o.RemoveServerTagByIdLocal(-662723379, "FlowActionUnlockEntity")
        : Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Plot",
            31,
            "找不对对应的实体",
            ["pbDataId", e],
            ["actionId", this.ActionInfo.ActionId],
          );
    }
  }
}
exports.FlowActionUnlockEntity = FlowActionUnlockEntity;
//# sourceMappingURL=FlowActionUnlockEntity.js.map
