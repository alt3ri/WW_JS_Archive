"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcPerformDestroyState = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  NpcPerformComponent_1 = require("../Component/NpcPerformComponent"),
  NpcPerformBaseState_1 = require("./NpcPerformBaseState");
class NpcPerformDestroyState extends NpcPerformBaseState_1.NpcPerformBaseState {
  constructor() {
    super(...arguments),
      (this.mra = void 0),
      (this.ral = void 0),
      (this.oal = !1),
      (this.nal = void 0),
      (this.sal = void 0),
      (this.aal = !1),
      (this.Tca = !1),
      (this.wCe = 0);
  }
  OnCreate(t) {
    super.OnCreate(t),
      (this.mra = t?.DeathInteract?.Montage),
      (this.nal = t?.DeathInteract?.MaterialDa);
    var t = this.Owner.Entity.GetComponent(0)?.GetPbEntityInitData();
    t &&
      ((t = (0, IComponent_1.getComponent)(
        t.ComponentsData,
        "EntityVisibleComponent",
      )),
      (this.Tca = !!t?.UseFadeEffect));
  }
  OnEnter(t) {
    this.gra();
  }
  gra() {
    2 === this.Owner.Entity.GetComponent(0).GetSubEntityType()
      ? this.vra()
      : this.pra();
  }
  vra() {
    this.ActorComp.Actor.DitherEffectController?.EnterDisappearEffect(
      MathUtils_1.MathUtils.SecondToMillisecond /
        NpcPerformComponent_1.DEFUALT_DITHER_TIME,
      1,
      !0,
    ),
      TimerSystem_1.TimerSystem.Delay(() => {
        ControllerHolder_1.ControllerHolder.CreatureController.DelayRemoveEntityFinished(
          this.Owner?.Entity,
        );
      }, NpcPerformComponent_1.DEFUALT_DITHER_TIME);
  }
  pra() {
    this.lal(), this.hal();
  }
  lal() {
    let t = void 0;
    (t = this.mra
      ? this.mra.IsAbp
        ? ModelManager_1.ModelManager.PlotModel.GetAbpMontageConfig(
            this.mra.MontageId,
          )
        : ModelManager_1.ModelManager.PlotModel.GetMontageConfig(
            this.mra.MontageId,
          )
      : t)
      ? ResourceSystem_1.ResourceSystem.LoadAsync(
          t.ActionMontage,
          UE.AnimMontage,
          (t, e) => {
            (this.oal = !0), (this.ral = t), this._al();
          },
        )
      : ((this.oal = !0), this._al());
  }
  hal() {
    this.nal && "" !== this.nal
      ? ResourceSystem_1.ResourceSystem.LoadAsync(
          this.nal,
          UE.PD_HolographicEffect_C,
          (t, e) => {
            (this.aal = !0), (this.sal = t), this._al();
          },
        )
      : ((this.aal = !0), this._al());
  }
  _al() {
    var t;
    this?.ActorComp?.Actor?.IsValid() &&
      this.oal &&
      this.aal &&
      (this.sal?.IsValid() &&
        ((t = this.sal),
        (this.wCe =
          (t.Start + t.Loop) * MathUtils_1.MathUtils.SecondToMillisecond),
        this.PerformComp?.MaterialController?.ApplySimpleMaterialEffectByAsset(
          this.sal,
        ),
        Log_1.Log.CheckDebug()) &&
        Log_1.Log.Debug(
          "NPC",
          50,
          "播放销毁材质表现",
          ["PbDataId", this.ActorComp.CreatureData.GetPbDataId()],
          ["Path", this.nal],
          ["Time", this.wCe],
        ),
      this.ral?.IsValid() &&
        ((t =
          this.ral.SequenceLength * MathUtils_1.MathUtils.SecondToMillisecond),
        0 === this.wCe && (this.wCe = t),
        this.PerformComp?.ClearAction(),
        this.PerformComp?.PlayPerformMontage(3, {
          MontageAsset: this.ral,
          IsLoop: !1,
        }),
        Log_1.Log.CheckDebug()) &&
        Log_1.Log.Debug(
          "NPC",
          50,
          "播放销毁Montage",
          ["PbDataId", this.ActorComp.CreatureData.GetPbDataId()],
          ["Montage", this.ral.GetName()],
          ["Time", t],
        ),
      this.Tca &&
        (0 === this.wCe &&
          (this.wCe = NpcPerformComponent_1.DEFUALT_DITHER_TIME),
        this.ActorComp.Actor.DitherEffectController?.EnterDisappearEffect(
          MathUtils_1.MathUtils.SecondToMillisecond / this.wCe,
          1,
          !1,
        )),
      this.ual());
  }
  ual() {
    0 === this.wCe
      ? ControllerHolder_1.ControllerHolder.CreatureController.DelayRemoveEntityFinished(
          this.Owner.Entity,
        )
      : TimerSystem_1.TimerSystem.Delay(() => {
          ControllerHolder_1.ControllerHolder.CreatureController.DelayRemoveEntityFinished(
            this.Owner?.Entity,
          );
        }, this.wCe);
  }
}
exports.NpcPerformDestroyState = NpcPerformDestroyState;
//# sourceMappingURL=NpcPerformDestroyState.js.map
