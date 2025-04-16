"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventTimeTrackControl = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  TsInteractionUtils_1 = require("../../Module/Interaction/TsInteractionUtils"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventTimeTrackControl extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments),
      (this.BJs = (e) => {
        this.FinishExecute(e);
      });
  }
  ExecuteNew(e, r) {
    var o;
    e
      ? ((o = e.EntityId),
        ModelManager_1.ModelManager.CreatureModel.GetEntity(o)?.Valid
          ? (TsInteractionUtils_1.TsInteractionUtils.RegisterOpenViewName(
              "TimeTrackControlView",
            ),
            ControllerHolder_1.ControllerHolder.TimeTrackController.OpenTimeTrackControlView(
              o,
              e.ConfigIndex,
              this.BJs,
            ))
          : (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "SceneGameplay",
                45,
                "时间控制装置启动请求:LevelEventTimeTrackControl entity不合法",
              ),
            this.FinishExecute(!1)))
      : (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "SceneGameplay",
            45,
            "时间控制装置启动请求:LevelEventTimeTrackControl params转换失败",
          ),
        this.FinishExecute(!1));
  }
}
exports.LevelEventTimeTrackControl = LevelEventTimeTrackControl;
//# sourceMappingURL=LevelEventTimeTrackControl.js.map
