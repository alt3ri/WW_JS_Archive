"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MoveTriggerController = void 0);
const UE = require("ue");
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const TsBaseCharacter_1 = require("../../Character/TsBaseCharacter");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
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
      (MoveTriggerController.Mbi = ActorSystem_1.ActorSystem.Get(
        UE.KuroMoveTriggerController.StaticClass(),
        MathUtils_1.MathUtils.DefaultTransform,
      )),
      MoveTriggerController.Mbi &&
        (UE.KuroMoveTriggerController.RegisterController(
          MoveTriggerController.Mbi,
        ),
        MoveTriggerController.Mbi.Callback.Add((r) => {
          for (let e = 0; e < r.Num(); ++e) {
            const t = r.Get(e);
            if (
              t.Actor instanceof TsBaseCharacter_1.default &&
              t.Actor?.IsValid()
            ) {
              const o = t.Actor?.CharacterActorComponent?.Entity;
              if (o?.Valid && t.Area === 0) {
                const l = o.GetComponent(66);
                t.EnterOverlap
                  ? l?.Valid &&
                    (l.InSwimTriggerCount++, l.LogSwimTriggerCount())
                  : l?.Valid &&
                    l.InSwimTriggerCount > 0 &&
                    (l.IsRole
                      ? TimerSystem_1.TimerSystem.Delay(() => {
                          l?.Valid &&
                            l.InSwimTriggerCount > 0 &&
                            (l.InSwimTriggerCount--, l.LogSwimTriggerCount());
                        }, 1e3)
                      : (l.InSwimTriggerCount--, l.LogSwimTriggerCount()));
              }
            }
          }
        }),
        MoveTriggerController.Mbi.InitAllTriggers());
  }
  static LeaveLevel() {
    return MoveTriggerController.ClearController(), !0;
  }
  static ClearController() {
    MoveTriggerController.Mbi &&
      ActorSystem_1.ActorSystem.Put(MoveTriggerController.Mbi),
      UE.KuroMoveTriggerController.UnRegisterController(),
      (MoveTriggerController.Mbi = void 0);
  }
}
(exports.MoveTriggerController = MoveTriggerController).Mbi = void 0;
// # sourceMappingURL=KuroMoveTriggerController.js.map
