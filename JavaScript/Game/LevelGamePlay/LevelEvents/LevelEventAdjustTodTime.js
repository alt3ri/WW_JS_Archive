"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventAdjustTodTime = void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  TimeOfDayModel_1 = require("../../Module/TimeOfDay/TimeOfDayModel"),
  UiManager_1 = require("../../Ui/UiManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventAdjustTodTime extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, o, r) {
    if (e)
      if (
        6 !== o.Type ||
        o.BtType !== Protocol_1.Aki.Protocol.hps.Proto_BtTypeInst
      )
        this.FinishExecute(!0);
      else {
        o = e;
        const t = TimeOfDayModel_1.TodDayTime.ConvertFromHourMinute(
          o.Hour,
          o.Min,
        );
        t < 0
          ? this.FinishExecute(!1)
          : o.ShowUi
            ? UiManager_1.UiManager.ResetToBattleView((e) => {
                e
                  ? UiManager_1.UiManager.OpenView(
                      "TimeOfDaySecondView",
                      void 0,
                      (e) => {
                        e
                          ? EventSystem_1.EventSystem.Emit(
                              EventDefine_1.EEventName.AdjustTimeInAnim,
                              ModelManager_1.ModelManager.TimeOfDayModel
                                .GameTime.Second,
                              t,
                              () => {
                                this.FinishExecute(!0);
                              },
                            )
                          : (ControllerHolder_1.ControllerHolder.TimeOfDayController.AdjustTime(
                              t,
                              Protocol_1.Aki.Protocol.C4s.Proto_LevelPlayAuto,
                            ),
                            this.FinishExecute(!0));
                      },
                    )
                  : (ControllerHolder_1.ControllerHolder.TimeOfDayController.AdjustTime(
                      t,
                      Protocol_1.Aki.Protocol.C4s.Proto_LevelPlayAuto,
                    ),
                    this.FinishExecute(!0));
              })
            : (ControllerHolder_1.ControllerHolder.TimeOfDayController.AdjustTime(
                t,
                Protocol_1.Aki.Protocol.C4s.Proto_LevelPlayAuto,
              ),
              this.FinishExecute(!0));
      }
    else this.FinishExecute(!1);
  }
}
exports.LevelEventAdjustTodTime = LevelEventAdjustTodTime;
//# sourceMappingURL=LevelEventAdjustTodTime.js.map
