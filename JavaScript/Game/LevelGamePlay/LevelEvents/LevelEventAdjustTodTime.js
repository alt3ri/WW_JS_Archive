"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventAdjustTodTime = void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  TimeOfDayController_1 = require("../../Module/TimeOfDay/TimeOfDayController"),
  TimeOfDayModel_1 = require("../../Module/TimeOfDay/TimeOfDayModel"),
  UiManager_1 = require("../../Ui/UiManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventAdjustTodTime extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, r, o) {
    if (e) {
      const i = TimeOfDayModel_1.TodDayTime.ConvertFromHourMinute(
        e.Hour,
        e.Min,
      );
      i < 0
        ? this.FinishExecute(!1)
        : e.ShowUi
          ? UiManager_1.UiManager.ResetToBattleView((e) => {
              e &&
                UiManager_1.UiManager.OpenView(
                  "TimeOfDaySecondView",
                  void 0,
                  () => {
                    EventSystem_1.EventSystem.Emit(
                      EventDefine_1.EEventName.AdjustTimeInAnim,
                      ModelManager_1.ModelManager.TimeOfDayModel.GameTime
                        .Second,
                      i,
                      () => {
                        this.FinishExecute(!0);
                      },
                    );
                  },
                );
            })
          : (TimeOfDayController_1.TimeOfDayController.AdjustTime(
              i,
              Protocol_1.Aki.Protocol.h4s.Proto_LevelPlayAuto,
            ),
            this.FinishExecute(!0));
    } else this.FinishExecute(!1);
  }
}
exports.LevelEventAdjustTodTime = LevelEventAdjustTodTime;
//# sourceMappingURL=LevelEventAdjustTodTime.js.map
