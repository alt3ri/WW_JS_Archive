"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MoveTriggerController = void 0);
const UE = require("ue"),
  ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  TsBaseCharacter_1 = require("../../Character/TsBaseCharacter"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem");
class MoveTriggerController extends ControllerBase_1.ControllerBase {
  static OnClear() {
    return (
      MoveTriggerController.ClearController(),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldDone,
        MoveTriggerController.nye,
      ),
      !0
    );
  }
  static OnInit() {
    return (
      UE.KuroMoveTriggerController.UnRegisterController(),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldDone,
        MoveTriggerController.nye,
      ),
      !0
    );
  }
  static nye() {
    MoveTriggerController.ClearController(),
      (MoveTriggerController.Mqi = ActorSystem_1.ActorSystem.Get(
        UE.KuroMoveTriggerController.StaticClass(),
        MathUtils_1.MathUtils.DefaultTransform,
      )),
      MoveTriggerController.Mqi &&
        (UE.KuroMoveTriggerController.RegisterController(
          MoveTriggerController.Mqi,
        ),
        MoveTriggerController.Mqi.Callback.Add((r) => {
          for (let e = 0; e < r.Num(); ++e) {
            var t = r.Get(e);
            if (
              t.Actor instanceof TsBaseCharacter_1.default &&
              t.Actor?.IsValid()
            ) {
              var o = t.Actor?.CharacterActorComponent?.Entity;
              if (o?.Valid && 0 === t.Area) {
                const l = o.GetComponent(68);
                t.EnterOverlap
                  ? l?.Valid &&
                    (l.InSwimTriggerCount++, l.LogSwimTriggerCount())
                  : l?.Valid &&
                    0 < l.InSwimTriggerCount &&
                    (l.IsRole
                      ? TimerSystem_1.TimerSystem.Delay(() => {
                          l?.Valid &&
                            0 < l.InSwimTriggerCount &&
                            (l.InSwimTriggerCount--, l.LogSwimTriggerCount());
                        }, 1e3)
                      : (l.InSwimTriggerCount--, l.LogSwimTriggerCount()));
              }
            }
          }
        }),
        MoveTriggerController.Mqi.InitAllTriggers());
  }
  static LeaveLevel() {
    return MoveTriggerController.ClearController(), !0;
  }
  static ClearController() {
    MoveTriggerController.Mqi &&
      ActorSystem_1.ActorSystem.Put(MoveTriggerController.Mqi),
      UE.KuroMoveTriggerController.UnRegisterController(),
      (MoveTriggerController.Mqi = void 0);
  }
}
(exports.MoveTriggerController = MoveTriggerController).Mqi = void 0;
//# sourceMappingURL=KuroMoveTriggerController.js.map
