"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, r, i) {
    var n,
      s = arguments.length,
      o =
        s < 3
          ? t
          : null === i
            ? (i = Object.getOwnPropertyDescriptor(t, r))
            : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      o = Reflect.decorate(e, t, r, i);
    else
      for (var h = e.length - 1; 0 <= h; h--)
        (n = e[h]) && (o = (s < 3 ? n(o) : 3 < s ? n(t, r, o) : n(t, r)) || o);
    return 3 < s && o && Object.defineProperty(t, r, o), o;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcPerformComponent = exports.DEFUALT_DITHER_TIME = void 0);
const UE = require("ue"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  BasePerformComponent_1 = require("../../Common/Component/BasePerformComponent");
exports.DEFUALT_DITHER_TIME = 3e3;
let NpcPerformComponent = class NpcPerformComponent extends BasePerformComponent_1.BasePerformComponent {
  constructor() {
    super(...arguments),
      (this.ActorComp = void 0),
      (this.Owner = void 0),
      (this.IsBeingImpacted = !1),
      (this.IsBeingAttacked = !1),
      (this.CollisionStrength = 0),
      (this.CollisionDirection = 0),
      (this.OverrideShowRange = 0),
      (this.IsNpcOutShowRangeInternal = !1),
      (this.IsPendingDestroy = !1);
  }
  get IsNpcOutShowRange() {
    return this.IsNpcOutShowRangeInternal;
  }
  OnStart() {
    (this.ActorComp = this.Entity.GetComponent(2)),
      (this.AnimComp = this.Entity.GetComponent(36)),
      (this.Owner = this.ActorComp.Owner);
    var e = this.ActorComp?.CreatureData?.GetPbEntityInitData();
    return (
      e &&
        ((e = (0, IComponent_1.getComponent)(
          e.ComponentsData,
          "EntityVisibleComponent",
        )),
        (this.OverrideShowRange = e?.CustomVisibleRange ?? 0)),
      !0
    );
  }
  OnActivate() {
    this.SetNpcShowState(!1, "默认出生隐藏"),
      this.ActorComp?.Actor.DitherEffectController?.ForceResetDither();
  }
  OnTick(e) {
    !this.AnimComp || this.IsPendingDestroy || this.TrySetNpcDither();
  }
  OnPlayerAttack() {}
  OnPlayerAttackBegin() {}
  OnPlayerAttackEnd() {}
  OnPlayerImpact() {}
  OnPlayerImpactBegin() {}
  OnPlayerImpactEnd() {}
  SetNpcShowState(e, t) {
    this.IsNpcOutShowRangeInternal === e &&
      (this.IsNpcOutShowRangeInternal = !e);
  }
  TrySetNpcDither(e = 0) {
    var t, r, i, n, s;
    this.ActorComp?.CreatureData.IsNpc() &&
      (t = this.ActorComp?.Actor?.DitherEffectController) &&
      ((r =
        this.OverrideShowRange ||
        UE.KismetSystemLibrary.GetConsoleVariableFloatValue(
          "r.Kuro.NpcDisappearDistance",
        )),
      (i = t.CurrentDitherValue),
      (n = t.IsInAutoAnimationValue),
      (s = t.DitherSpeedRateValue),
      r <= (e = 0 !== e ? e : this.Entity.DistanceWithCamera) &&
      0 < i &&
      (!n || 0 < s)
        ? (this.SetNpcShowState(!1, "TrySetNpcDither"),
          t.EnterDisappearEffect(1, 1, !1),
          this.Entity.GetComponent(72)?.EnableHeadInfo(!1))
        : e < r &&
          i < 1 &&
          (!n || s <= 0) &&
          (this.SetNpcShowState(!0, "TrySetNpcDither"),
          t.EnterAppearEffect(1, 1, !1),
          this.Entity.GetComponent(72)?.EnableHeadInfo(!0)));
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
};
(NpcPerformComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(170)],
  NpcPerformComponent,
)),
  (exports.NpcPerformComponent = NpcPerformComponent);
//# sourceMappingURL=NpcPerformComponent.js.map
