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
      (this.mra = void 0),
      (this.Sca = !1),
      (this.wCe = 0);
  }
  OnCreate(e) {
    e?.DeathInteract && (this.mra = e.DeathInteract.Montage);
    e = this.Owner.Entity.GetComponent(0)?.GetPbEntityInitData();
    e &&
      (0, IComponent_1.getComponent)(e.ComponentsData, "EntityVisibleComponent")
        ?.UseFadeEffect &&
      ((this.Sca = !0), (this.wCe = NpcPerformComponent_1.DEFUALT_DITHER_TIME));
  }
  OnEnter(e) {
    this.gra();
  }
  gra() {
    2 === this.Owner.Entity.GetComponent(0).GetSubEntityType()
      ? this.vra()
      : this.pra();
  }
  vra() {
    var e = MathUtils_1.MathUtils.SecondToMillisecond / this.wCe;
    this.ActorComp.Actor.DitherEffectController?.EnterDisappearEffect(e, 1, !0),
      TimerSystem_1.TimerSystem.Delay(() => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.DelayRemoveEntityFinished,
          this.Owner.Entity,
        );
      }, NpcPerformComponent_1.DEFUALT_DITHER_TIME);
  }
  pra() {
    let e = void 0;
    (e = this.mra
      ? this.mra.IsAbp
        ? ModelManager_1.ModelManager.PlotModel.GetAbpMontageConfig(
            this.mra.MontageId,
          )
        : ModelManager_1.ModelManager.PlotModel.GetMontageConfig(
            this.mra.MontageId,
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
            this.Eca();
        })
      : this.Eca();
  }
  Eca() {
    var e;
    0 === this.wCe
      ? EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.DelayRemoveEntityFinished,
          this.Owner.Entity,
        )
      : (this.Sca &&
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
