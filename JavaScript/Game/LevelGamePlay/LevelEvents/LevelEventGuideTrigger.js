"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventGuideTrigger = void 0);
const Log_1 = require("../../../Core/Common/Log");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const GuideController_1 = require("../../Module/Guide/GuideController");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventGuideTrigger extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments),
      (this.mDe = 0),
      (this.YO = void 0),
      (this.IDe = IAction_1.EGuideTriggerType.BeginnerGuide),
      (this.TDe = void 0),
      (this.LDe = () => {
        ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(
          this.YO,
          void 0,
        ) &&
          (TimerSystem_1.TimerSystem.Remove(this.TDe),
          this.IDe === IAction_1.EGuideTriggerType.AttackGuide
            ? (EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.ComboTeachingViewOpen,
                this.mDe,
              ),
              this.IsAsync,
              this.FinishExecute(!0))
            : (Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("Guide", 17, "行为节点调用引导", [
                  "组Id",
                  this.mDe,
                ]),
              !GuideController_1.GuideController.TryStartGuide(this.mDe) ||
              this.IsAsync
                ? this.FinishExecute(!0)
                : (EventSystem_1.EventSystem.Add(
                    EventDefine_1.EEventName.GuideGroupFinished,
                    this.dDe,
                  ),
                  EventSystem_1.EventSystem.Add(
                    EventDefine_1.EEventName.GuideGroupBreak,
                    this.dDe,
                  ),
                  EventSystem_1.EventSystem.Add(
                    EventDefine_1.EEventName.GuideGroupRest,
                    this.dDe,
                  ))));
      }),
      (this.DDe = () => {
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.ComboTeachingCloseGuide,
          this.DDe,
        ),
          EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.ComboTeachingFinish,
            this.DDe,
          ),
          this.FinishExecute(!0);
      }),
      (this.dDe = (e) => {
        e === this.mDe &&
          ((this.mDe = 0),
          EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.GuideGroupFinished,
            this.dDe,
          ),
          EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.GuideGroupBreak,
            this.dDe,
          ),
          EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.GuideGroupRest,
            this.dDe,
          ),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Guide", 17, "行为触发的引导组执行完毕", [
              "组Id",
              e,
            ]),
          this.FinishExecute(!0));
      });
  }
  ExecuteInGm(e, t) {
    this.FinishExecute(!0);
  }
  Execute(e, t) {
    e &&
      (e = e.get("GuideGroupId")) &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Guide", 17, "行为触发了引导组", ["组Id", e]),
      GuideController_1.GuideController.TryStartGuide(parseInt(e)));
  }
  ExecuteNew(e, t) {
    e &&
      ((this.YO = { Type: 0, Conditions: e.Conditions ?? [] }),
      (this.mDe = e.GuideId),
      (this.IDe = e.Type),
      (this.TDe = TimerSystem_1.TimerSystem.Forever(this.LDe, 1e3)),
      this.LDe());
  }
}
exports.LevelEventGuideTrigger = LevelEventGuideTrigger;
// # sourceMappingURL=LevelEventGuideTrigger.js.map
