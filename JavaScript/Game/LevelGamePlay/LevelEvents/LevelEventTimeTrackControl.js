"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventTimeTrackControl = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
  TsInteractionUtils_1 = require("../../Module/Interaction/TsInteractionUtils"),
  LevelGeneralBase_1 = require("../LevelGeneralBase"),
  TimeTrackController_1 = require("../TimeTrackControl/TimeTrackController");
class LevelEventTimeTrackControl extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments),
      (this.q6s = (e) => {
        this.FinishExecute(e);
      });
  }
  ExecuteNew(e, r) {
    var t;
    e &&
      ((t = e.EntityId),
      ModelManager_1.ModelManager.CreatureModel.GetEntity(t)?.Valid) &&
      (TsInteractionUtils_1.TsInteractionUtils.RegisterOpenViewName(
        "TimeTrackControlView",
      ),
      TimeTrackController_1.TimeTrackController.OpenTimeTrackControlView(
        t,
        e.ConfigIndex,
        this.q6s,
      ));
  }
}
exports.LevelEventTimeTrackControl = LevelEventTimeTrackControl;
//# sourceMappingURL=LevelEventTimeTrackControl.js.map
