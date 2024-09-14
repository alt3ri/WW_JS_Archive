"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, r, i) {
    var o,
      n = arguments.length,
      s =
        n < 3
          ? e
          : null === i
            ? (i = Object.getOwnPropertyDescriptor(e, r))
            : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      s = Reflect.decorate(t, e, r, i);
    else
      for (var h = t.length - 1; 0 <= h; h--)
        (o = t[h]) && (s = (n < 3 ? o(s) : 3 < n ? o(e, r, s) : o(e, r)) || s);
    return 3 < n && s && Object.defineProperty(e, r, s), s;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcPerformComponent = exports.DEFUALT_DITHER_TIME = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  EnvironmentalPerceptionController_1 = require("../../../../World/Enviroment/EnvironmentalPerceptionController"),
  BasePerformComponent_1 = require("../../Common/Component/BasePerformComponent"),
  CharacterActorComponent_1 = require("../../Common/Component/CharacterActorComponent"),
  DEFAULT_EXIT_SHOW_RANGE_OFFSET = ((exports.DEFUALT_DITHER_TIME = 3e3), 500);
let NpcPerformComponent = class NpcPerformComponent extends BasePerformComponent_1.BasePerformComponent {
  constructor() {
    super(...arguments),
      (this.ActorComp = void 0),
      (this.Owner = void 0),
      (this.IsBeingImpacted = !1),
      (this.IsBeingAttacked = !1),
      (this.CollisionStrength = 0),
      (this.CollisionDirection = 0),
      (this.VisibleDitherEvent = void 0),
      (this.OverrideShowRange = 0),
      (this.IsForceInShowRange = !1),
      (this.IsNpcOutShowRangeInternal = !1),
      (this.IsPendingDestroy = !1),
      (this.IsUseFixLocation = !1),
      (this.DestroyVisibleDitherEvent = () => {
        this.VisibleDitherEvent &&
          (EnvironmentalPerceptionController_1.EnvironmentalPerceptionController.DestroyPlayerPerceptionEvent(
            this.VisibleDitherEvent,
          ),
          (this.VisibleDitherEvent = void 0));
      });
  }
  get IsNpcOutShowRange() {
    return this.IsNpcOutShowRangeInternal;
  }
  OnStart() {
    (this.ActorComp = this.Entity.GetComponent(2)),
      (this.AnimComp = this.Entity.GetComponent(37)),
      (this.Owner = this.ActorComp.Owner);
    var t,
      e = this.ActorComp?.CreatureData?.GetPbEntityInitData();
    return (
      e &&
        ((t = (0, IComponent_1.getComponent)(
          e.ComponentsData,
          "EntityVisibleComponent",
        )),
        (this.OverrideShowRange = t?.CustomVisibleRange ?? 0),
        (t = (0, IComponent_1.getComponent)(
          e.ComponentsData,
          "NpcPerformComponent",
        )),
        (this.IsUseFixLocation = !!t?.FixedPosition),
        this.IsUseFixLocation) &&
        this.ActorComp instanceof
          CharacterActorComponent_1.CharacterActorComponent &&
        (this.ActorComp.NeedFixBornLocation = !1),
      !0
    );
  }
  OnActivate() {
    super.OnActivate(),
      this.InitVisibleDitherCheck(),
      this.IsUseFixLocation && this.FixNpcOnInitLocation();
  }
  OnEnd() {
    return this.DestroyVisibleDitherEvent(), super.OnEnd(), !0;
  }
  OnPlayerAttack() {}
  OnPlayerAttackBegin() {}
  OnPlayerAttackEnd() {}
  OnPlayerImpact() {}
  OnPlayerImpactBegin() {}
  OnPlayerImpactEnd() {}
  SetNpcShowState(t, e) {
    this.IsNpcOutShowRangeInternal === t &&
      (this.IsNpcOutShowRangeInternal = !t);
  }
  TrySetNpcDither(t) {
    var e = this.ActorComp?.Actor?.DitherEffectController;
    e &&
      !this.IsPendingDestroy &&
      (t || this.IsForceInShowRange
        ? this.IsNpcOutShowRange &&
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "NPC",
              51,
              "进入NPC显示范围",
              ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()],
              [
                "CreatureData",
                this.ActorComp?.CreatureData.GetCreatureDataId(),
              ],
            ),
          this.SetNpcShowState(!0, "TrySetNpcDither"),
          e.EnterAppearEffect(1, 1, !1),
          this.Entity.GetComponent(73)?.EnableHeadInfo(!0))
        : this.IsNpcOutShowRange ||
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "NPC",
              51,
              "离开NPC显示范围",
              ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()],
              [
                "CreatureData",
                this.ActorComp?.CreatureData.GetCreatureDataId(),
              ],
            ),
          this.SetNpcShowState(!1, "TrySetNpcDither"),
          e.EnterDisappearEffect(1, 1, !1),
          this.Entity.GetComponent(73)?.EnableHeadInfo(!1)));
  }
  HandlePendingDestroy() {
    (this.IsPendingDestroy = !0),
      this.ActorComp.Actor.DitherEffectController?.EnterDisappearEffect(
        MathUtils_1.MathUtils.SecondToMillisecond / exports.DEFUALT_DITHER_TIME,
        1,
        !1,
      ),
      TimerSystem_1.TimerSystem.Delay(() => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.DelayRemoveEntityFinished,
          this.Entity,
        );
      }, exports.DEFUALT_DITHER_TIME);
  }
  InitVisibleDitherCheck() {
    this.SetNpcShowState(!1, "默认出生隐藏"),
      this.ActorComp.Actor.DitherEffectController.ForceResetDither(),
      (this.IsForceInShowRange =
        ControllerHolder_1.ControllerHolder.NpcPerformController.ForceNpcDitherVisibleMap.has(
          this.ActorComp.CreatureData.GetPbDataId(),
        )),
      this.IsForceInShowRange && this.TrySetNpcDither(!0);
    var t = this.GetNpcShowRange(),
      e = t + DEFAULT_EXIT_SHOW_RANGE_OFFSET;
    (this.VisibleDitherEvent =
      EnvironmentalPerceptionController_1.EnvironmentalPerceptionController.CreatePlayerPerceptionEvent()),
      this.VisibleDitherEvent.Init(
        t,
        this.Entity?.GameBudgetManagedToken,
        () => {
          this.TrySetNpcDither(!0);
        },
        () => {
          this.TrySetNpcDither(!1);
        },
        this.DestroyVisibleDitherEvent,
        void 0,
        e,
        void 0,
      );
  }
  GetNpcShowRange() {
    return (
      this.OverrideShowRange ||
      UE.KismetSystemLibrary.GetConsoleVariableFloatValue(
        "r.Kuro.NpcDisappearDistance",
      )
    );
  }
  FixNpcOnInitLocation() {
    MathUtils_1.MathUtils.CommonTempVector.DeepCopy(
      this.ActorComp.CreatureData.GetInitLocation(),
    ),
      this.ActorComp.Actor.CharacterMovement?.SetMovementMode(5),
      this.ActorComp.SetActorLocation(
        MathUtils_1.MathUtils.CommonTempVector.ToUeVector(),
        "NPC待机表演使用固定位置",
        !1,
      ),
      this.Entity.GetComponent(101)?.Disable("NPC待机表演使用固定位置");
  }
};
(NpcPerformComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(171)],
  NpcPerformComponent,
)),
  (exports.NpcPerformComponent = NpcPerformComponent);
//# sourceMappingURL=NpcPerformComponent.js.map
