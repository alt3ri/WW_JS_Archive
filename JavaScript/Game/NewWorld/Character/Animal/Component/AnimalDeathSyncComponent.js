"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, i, n) {
    var o,
      s = arguments.length,
      r =
        s < 3
          ? t
          : null === n
            ? (n = Object.getOwnPropertyDescriptor(t, i))
            : n;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      r = Reflect.decorate(e, t, i, n);
    else
      for (var h = e.length - 1; 0 <= h; h--)
        (o = e[h]) && (r = (s < 3 ? o(r) : 3 < s ? o(t, i, r) : o(t, i)) || r);
    return 3 < s && r && Object.defineProperty(t, i, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AnimalDeathSyncComponent = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  BaseDeathComponent_1 = require("../../Common/Component/Abilities/BaseDeathComponent"),
  CharacterUnifiedStateTypes_1 = require("../../Common/Component/Abilities/CharacterUnifiedStateTypes"),
  DISAPPEAR_REMOVE_DELAY = 1600;
let AnimalDeathSyncComponent = class AnimalDeathSyncComponent extends BaseDeathComponent_1.BaseDeathComponent {
  constructor() {
    super(...arguments),
      (this.Xte = void 0),
      (this.HBr = void 0),
      (this.gne = (e) => {
        0 === e.DamageId ||
          this.Xte.HasTag(501201e3) ||
          this.Xte.HasTag(1008164187) ||
          (this.Entity.GetComponent(46)?.DisableAi("动物死亡"),
          this.Xte?.AddTag(1008164187),
          ControllerHolder_1.ControllerHolder.CreatureController.AnimalDieRequest(
            this.Entity.GetComponent(0).GetCreatureDataId(),
            this.Entity.GetComponent(1).ActorLocationProxy,
          ));
      }),
      (this.PlayDieAnimation = () => {
        this.Xte.HasTag(-1943786195) || !this.MontageComponent?.Valid
          ? this.OnDeathEnded()
          : this.Xte.HasTag(1961456719)
            ? TimerSystem_1.TimerSystem.Delay(
                this.OnDeathEnded,
                DISAPPEAR_REMOVE_DELAY,
              )
            : this.HBr.PositionState ===
                CharacterUnifiedStateTypes_1.ECharPositionState.Water
              ? this.PlayDeathMontageWithType(1, this.OnDeathEnded)
              : this.PlayDeathMontageWithType(0, this.OnDeathEnded);
      }),
      (this.OnDeathEnded = () => {
        this.Entity.Disable(
          "[BaseAttributeComponent.DieAnimationFinished] 死亡动画播放完后隐藏",
        ),
          ControllerHolder_1.ControllerHolder.CreatureController.DelayRemoveEntityFinished(
            this.Entity,
          );
      });
  }
  OnStart() {
    return (
      !!super.OnStart() &&
      ((this.Xte = this.Entity.CheckGetComponent(203)),
      (this.HBr = this.Entity.CheckGetComponent(99)),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharBeHitLocal,
        this.gne,
      ),
      this.Entity.CheckGetComponent(0).GetLivingStatus() ===
        Protocol_1.Aki.Protocol.JEs.Proto_Dead &&
        TimerSystem_1.TimerSystem.Next(() => {
          this.ExecuteDeath(void 0);
        }),
      !0)
    );
  }
  OnEnd() {
    return (
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharBeHitLocal,
        this.gne,
      ),
      !0
    );
  }
  ExecuteDeath(e) {
    return (
      !!super.ExecuteDeath(e) &&
      (this.Xte?.AddTag(1008164187),
      this.HBr?.ResetCharState(),
      this.PlayDieAnimation(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.CharOnRoleDead,
        this.Entity.Id,
      ),
      EventSystem_1.EventSystem.EmitWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharOnRoleDeadTargetSelf,
      ),
      !0)
    );
  }
};
(AnimalDeathSyncComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(168)],
  AnimalDeathSyncComponent,
)),
  (exports.AnimalDeathSyncComponent = AnimalDeathSyncComponent);
//# sourceMappingURL=AnimalDeathSyncComponent.js.map
