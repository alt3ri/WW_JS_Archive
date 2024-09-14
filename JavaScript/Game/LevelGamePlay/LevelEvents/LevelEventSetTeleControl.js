"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventSetTeleControl = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSetTeleControl extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, t) {
    var l;
    "OpenGravity" !== e.Config.Type
      ? this.FinishExecute(!0)
      : ((l = (e =
          ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(
            e.Config.EntityId,
          ))?.Entity?.GetComponent(143)),
        e?.Valid && l
          ? l.CurrentState === l.DropState
            ? this.FinishExecute(!0)
            : l.CurrentState !== l.ResetState
              ? (Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "LevelEvent",
                    40,
                    "[LevelEventSetTeleControl] 被控物不处于Reset状态",
                  ),
                this.FinishExecute(!1))
              : ((l.CurrentState = l.DropState),
                l.TryEnableTick(),
                this.FinishExecute(!0))
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "LevelEvent",
                40,
                "[LevelEventSetTeleControl] 找不到对应的实体组件",
              ),
            this.FinishExecute(!1)));
  }
}
exports.LevelEventSetTeleControl = LevelEventSetTeleControl;
//# sourceMappingURL=LevelEventSetTeleControl.js.map
