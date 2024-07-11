"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (e, t, i, s) {
    let n;
    const o = arguments.length;
    let r =
      o < 3 ? t : s === null ? (s = Object.getOwnPropertyDescriptor(t, i)) : s;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(e, t, i, s);
    else
      for (let h = e.length - 1; h >= 0; h--)
        (n = e[h]) && (r = (o < 3 ? n(r) : o > 3 ? n(t, i, r) : n(t, i)) || r);
    return o > 3 && r && Object.defineProperty(t, i, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MonsterDeathComponent = void 0);
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const BaseDeathComponent_1 = require("../../../Common/Component/Abilities/BaseDeathComponent");
const CharacterUnifiedStateTypes_1 = require("../../../Common/Component/Abilities/CharacterUnifiedStateTypes");
const DIE_IN_AIE_REMOVE_DELAY = 5e3;
let MonsterDeathComponent = class MonsterDeathComponent extends BaseDeathComponent_1.BaseDeathComponent {
  constructor() {
    super(...arguments),
      (this.Xte = void 0),
      (this.L7r = void 0),
      (this.DelayDestroyCallback = (e, t) => {
        t || this.PlayDeathAnimation();
      }),
      (this.DeathTagTask = void 0),
      (this.DeathTimerTask = void 0),
      (this.OnDeathEnded = () => {
        this.ClearDeathTasks(),
          this.Xte?.Valid &&
            (this.Xte.AddTag(1963731483), this.Xte.AddTag(-208062360)),
          this.Entity.Disable("[DeathComponent.SetActive] 死亡隐藏"),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.DropItemStarted,
            this.Entity?.Id,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.DelayRemoveEntityFinished,
            this.Entity,
          );
      });
  }
  OnInitData() {
    return (this.Xte = this.Entity.CheckGetComponent(185)), !0;
  }
  OnStart() {
    return (
      this.Entity.CheckGetComponent(0)?.GetLivingStatus() ===
        Protocol_1.Aki.Protocol.Rvs.Proto_Dead && this.ExecuteDeath(),
      !0
    );
  }
  OnClear() {
    return this.ClearDeathTasks(), !0;
  }
  ExecuteDeath() {
    return (
      !!super.ExecuteDeath() &&
      (EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnCharDeathLogicBegin,
        this.Entity.Id,
      ),
      this.Entity.GetComponent(157)?.RemoveBuffByEffectType(
        36,
        "实体死亡移除冰冻buff",
      ),
      this.Xte.AddTag(1008164187),
      this.Xte?.HasTag(-1615707547)
        ? (this.L7r = this.Xte.ListenForTagAddOrRemove(
            -1615707547,
            this.DelayDestroyCallback,
          ))
        : (this.Entity.GetComponent(33)?.StopAllSkills(
            "MonsterDeathComponent.ExecuteDeath",
          ),
          this.Entity.GetComponent(89)?.ResetCharState(),
          this.Entity.GetComponent(157)?.RemoveAllDurationBuffs(
            "实体死亡清理持续型buff",
          ),
          this.PlayDeathAnimation()),
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
  PlayDeathAnimation() {
    const i = this.Entity.CheckGetComponent(22);
    if (
      !ModelManager_1.ModelManager.DeadReviveModel.SkipDeathAnim &&
      !this.Xte?.HasTag(-1943786195) &&
      i?.Valid &&
      this.Entity.IsInit &&
      this.Entity.Active
    ) {
      const e = this.Entity.GetComponent(89)?.PositionState;
      if (e === CharacterUnifiedStateTypes_1.ECharPositionState.Water)
        i.PlayMontageWithCallBack(1, this.OnDeathEnded);
      else {
        if (e === CharacterUnifiedStateTypes_1.ECharPositionState.Air) {
          if (this.Xte?.HasTag(31862857))
            return (
              (this.DeathTagTask = this.Xte.ListenForTagAddOrRemove(
                31862857,
                (e, t) => {
                  t ||
                    (i.HasMontage(3)
                      ? i.PlayMontageWithCallBack(3, this.OnDeathEnded)
                      : this.OnDeathEnded());
                },
              )),
              void (this.DeathTimerTask = TimerSystem_1.TimerSystem.Delay(
                this.OnDeathEnded,
                DIE_IN_AIE_REMOVE_DELAY,
              ))
            );
          if (i.HasMontage(2))
            return void i.PlayMontageWithCallBack(2, this.OnDeathEnded);
        } else if (
          e === CharacterUnifiedStateTypes_1.ECharPositionState.Ground &&
          i.HasMontage(0)
        )
          return void i.PlayMontageWithCallBack(0, this.OnDeathEnded);
        this.OnDeathEnded();
      }
    } else this.OnDeathEnded();
  }
  ClearDeathTasks() {
    this.L7r?.EndTask(),
      (this.L7r = void 0),
      this.DeathTagTask?.EndTask(),
      (this.DeathTagTask = void 0),
      this.DeathTimerTask?.Remove(),
      (this.DeathTimerTask = void 0);
  }
};
(MonsterDeathComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(165)],
  MonsterDeathComponent,
)),
  (exports.MonsterDeathComponent = MonsterDeathComponent);
// # sourceMappingURL=MonsterDeathComponent.js.map
