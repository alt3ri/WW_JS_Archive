"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcPerformDestroyState = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  StateBase_1 = require("../../../../../Core/Utils/StateMachine/StateBase"),
  IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  NpcPerformComponent_1 = require("../Component/NpcPerformComponent");
class NpcPerformDestroyState extends StateBase_1.StateBase {
  constructor() {
    super(...arguments),
      (this.ActorComp = void 0),
      (this.PerformComp = void 0),
      (this.eta = void 0),
      (this.M1a = !1),
      (this.wCe = 0);
  }
  OnCreate(e) {
    e?.DeathInteract && (this.eta = e.DeathInteract.Montage);
    e = this.Owner.Entity.GetComponent(0)?.GetPbEntityInitData();
    e &&
      (0, IComponent_1.getComponent)(e.ComponentsData, "EntityVisibleComponent")
        ?.UseFadeEffect &&
      ((this.M1a = !0), (this.wCe = NpcPerformComponent_1.DEFUALT_DITHER_TIME));
  }
  OnEnter(e) {
    this.rta();
  }
  rta() {
    2 === this.Owner.Entity.GetComponent(0).GetSubEntityType()
      ? this.sta()
      : this.nta();
  }
  sta() {
    var e = MathUtils_1.MathUtils.SecondToMillisecond / this.wCe;
    this.ActorComp.Actor.DitherEffectController?.EnterDisappearEffect(e, 1, !0),
      TimerSystem_1.TimerSystem.Delay(() => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.DelayRemoveEntityFinished,
          this.Owner.Entity,
        );
      }, NpcPerformComponent_1.DEFUALT_DITHER_TIME);
  }
  nta() {
    let e = void 0;
    (e = this.eta
      ? this.eta.IsAbp
        ? ModelManager_1.ModelManager.PlotModel.GetAbpMontageConfig(
            this.eta.MontageId,
          )
        : ModelManager_1.ModelManager.PlotModel.GetMontageConfig(
            this.eta.MontageId,
          )
      : e)
      ? this.PerformComp.LoadAsync(e.ActionMontage, (e, t) => {
          this?.ActorComp?.Actor?.IsValid &&
            e?.IsValid() &&
            (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "NPC",
                51,
                "播放销毁Montage",
                ["PbDataId", this.ActorComp.CreatureData.GetPbDataId()],
                ["Path", t],
              ),
            this.PerformComp?.PlayOnce(e),
            (this.wCe =
              e.SequenceLength * MathUtils_1.MathUtils.SecondToMillisecond)),
            this.S1a();
        })
      : this.S1a();
  }
  S1a() {
    var e;
    0 === this.wCe
      ? EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.DelayRemoveEntityFinished,
          this.Owner.Entity,
        )
      : (this.M1a &&
          ((e = MathUtils_1.MathUtils.SecondToMillisecond / this.wCe),
          this.ActorComp.Actor.DitherEffectController?.EnterDisappearEffect(
            e,
            1,
            !1,
          )),
        TimerSystem_1.TimerSystem.Delay(() => {
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.DelayRemoveEntityFinished,
            this.Owner.Entity,
          );
        }, this.wCe));
  }
}
exports.NpcPerformDestroyState = NpcPerformDestroyState;
//# sourceMappingURL=NpcPerformDestroyState.js.map
