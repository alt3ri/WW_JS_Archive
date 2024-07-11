"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventTimeTrackControl = void 0);
const Log_1 = require("../../../Core/Common/Log");
const ModelManager_1 = require("../../Manager/ModelManager");
const TsInteractionUtils_1 = require("../../Module/Interaction/TsInteractionUtils");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const TimeTrackController_1 = require("../TimeTrackControl/TimeTrackController");
class LevelEventTimeTrackControl extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments),
      (this.q6s = (e) => {
        this.FinishExecute(e);
      });
  }
  ExecuteNew(e, r) {
    let o;
    e
      ? ((o = e.EntityId),
        ModelManager_1.ModelManager.CreatureModel.GetEntity(o)?.Valid
          ? (TsInteractionUtils_1.TsInteractionUtils.RegisterOpenViewName(
              "TimeTrackControlView",
            ),
            TimeTrackController_1.TimeTrackController.OpenTimeTrackControlView(
              o,
              e.ConfigIndex,
              this.q6s,
            ))
          : (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "SceneGameplay",
                46,
                "时间控制装置启动请求:LevelEventTimeTrackControl entity不合法",
              ),
            this.FinishExecute(!1)))
      : (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "SceneGameplay",
            46,
            "时间控制装置启动请求:LevelEventTimeTrackControl params转换失败",
          ),
        this.FinishExecute(!1));
  }
}
exports.LevelEventTimeTrackControl = LevelEventTimeTrackControl;
// # sourceMappingURL=LevelEventTimeTrackControl.js.map
