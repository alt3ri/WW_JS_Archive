"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Trigger = void 0);
const Time_1 = require("../../../../../../../Core/Common/Time"),
  EntitySystem_1 = require("../../../../../../../Core/Entity/EntitySystem"),
  Macro_1 = require("../../../../../../../Core/Preprocessor/Macro"),
  GameplayTagUtils_1 = require("../../../../../../../Core/Utils/GameplayTagUtils"),
  Vector_1 = require("../../../../../../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  FormationAttributeController_1 = require("../../../../../../Module/Abilities/FormationAttributeController"),
  SceneTeamEvent_1 = require("../../../../../../Module/SceneTeam/SceneTeamEvent"),
  CombatLog_1 = require("../../../../../../Utils/CombatLog"),
  ConditionFormula_1 = require("../../../../../../Utils/Trigger/ConditionFormula"),
  CampUtils_1 = require("../../../Blueprint/Utils/CampUtils"),
  AbilityEvent_1 = require("../AbilityEvent"),
  CharacterAttributeTypes_1 = require("../CharacterAttributeTypes"),
  TriggerType_1 = require("./TriggerType");
function getTarget(t, e) {
  switch (e) {
    case 0:
      return t;
    case 1:
      return SceneTeamEvent_1.SceneTeam.Local;
    case 2:
      return SceneTeamEvent_1.SceneTeam.All;
    case 3:
      return;
  }
}
class Trigger {
  constructor(t, e, i, s, r, n) {
    if (
      ((this.Config = t),
      (this.Handle = e),
      (this.OwnerTriggerComp = i),
      (this.Callback = r),
      (this.Checker = n),
      (this.Rgr = void 0),
      (this.TriggerType = void 0),
      (this.dce = !1),
      (this.fYo = 0),
      (this.DebugName = void 0),
      (this.IterationLock = -1),
      !t)
    )
      throw new Error("找不到对应的Trigger配置");
    if (
      ((this.TriggerType = TriggerType_1.ETriggerEvent[t.Type]),
      void 0 === this.TriggerType)
    )
      throw new Error("找不到对应的Trigger触发器类型");
    (e = t.Formula), (r = t.Params?.length ? JSON.parse(t.Params) : {});
    (r.Owner = i?.Entity),
      (this.Rgr = new ConditionFormula_1.Formula(e)
        .SetBuiltinFunctions(s)
        .AddBuiltinFunction(
          "Accumulate",
          (t, e, i = !0) =>
            !!i && ((this.fYo += t), this.fYo >= e) && !(this.fYo = 0),
        )
        .SetDefaultParams(r));
  }
  OnInitParams(t) {}
  SetActive(t) {
    this.dce !== t && ((this.dce = t) ? this.OnActive() : this.OnInactive());
  }
  Destroy() {
    this.SetActive(!1),
      (this.OwnerTriggerComp = void 0),
      (this.Config = void 0),
      (this.Callback = void 0);
  }
  static GetClass(t) {
    switch (t) {
      case TriggerType_1.ETriggerEvent.HitTrigger:
        return HitTrigger;
      case TriggerType_1.ETriggerEvent["temp_hittrigger1.0"]:
        return HitTriggerIncludingVision;
      case TriggerType_1.ETriggerEvent.BeHitTrigger:
        return BeHitTrigger;
      case TriggerType_1.ETriggerEvent.AttributeChangedTrigger:
        return AttributeChangedTrigger;
      case TriggerType_1.ETriggerEvent.TeamAttributeChangeTrigger:
        return TeamAttributeChangedTrigger;
      case TriggerType_1.ETriggerEvent.TagTrigger:
        return TagTrigger;
      case TriggerType_1.ETriggerEvent.TagStackTrigger:
        return TagStackTrigger;
      case TriggerType_1.ETriggerEvent.LimitDodgeTrigger:
        return LimitDodgeTrigger;
      case TriggerType_1.ETriggerEvent.SkillTrigger:
        return SkillTrigger;
      case TriggerType_1.ETriggerEvent.DamageTrigger:
        return DamageTrigger;
      case TriggerType_1.ETriggerEvent.BeDamageTrigger:
        return BeDamageTrigger;
      case TriggerType_1.ETriggerEvent.GlobalDamageTrigger:
        return GlobalDamageTrigger;
      case TriggerType_1.ETriggerEvent.DeathTrigger:
        return DeathTrigger;
      case TriggerType_1.ETriggerEvent.KillTrigger:
        return KillTrigger;
      case TriggerType_1.ETriggerEvent.GameplayEventTrigger:
        return GameplayEventTrigger;
      case TriggerType_1.ETriggerEvent.QteGoBattleTrigger:
        return QteGoBattleTrigger;
      case TriggerType_1.ETriggerEvent.QteGoDownTrigger:
        return QteGoDownTrigger;
      case TriggerType_1.ETriggerEvent.BuffInstigatorTrigger:
        return BuffInstigatorTrigger;
      case TriggerType_1.ETriggerEvent.BuffVictimTrigger:
        return BuffVictimTrigger;
      case TriggerType_1.ETriggerEvent.VisionTrigger:
        return VisionTrigger;
      case TriggerType_1.ETriggerEvent.DamageIdTrigger:
        return DamageIdTrigger;
      case TriggerType_1.ETriggerEvent.BuffAddFailureTrigger:
        return BuffAddFailureTrigger;
    }
  }
  EvaluateAndExecute(t) {
    if (this.Rgr.Evaluate(t))
      try {
        this.TryLock()
          ? (this.Callback?.(this.Rgr.Params, t), this.Unlock())
          : CombatLog_1.CombatLog.Error(
              "PassiveSkill",
              this.OwnerTriggerComp?.Entity,
              "被动技能不能在同一个调用栈中递归触发",
              ["触发器", ""],
              ["Formula", ""],
            );
      } catch (t) {
        t instanceof Error
          ? CombatLog_1.CombatLog.ErrorWithStack(
              "PassiveSkill",
              this.OwnerTriggerComp?.Entity,
              "触发器回调函数执行错误",
              t,
              ["触发器", ""],
              ["Formula", ""],
              ["错误信息", t.message],
            )
          : CombatLog_1.CombatLog.Error(
              "PassiveSkill",
              this.OwnerTriggerComp?.Entity,
              "触发器回调函数执行错误",
              ["触发器", ""],
              ["Formula", ""],
              ["错误信息", t],
            );
      }
    else;
  }
  TryLock() {
    return (
      this.IterationLock !== Time_1.Time.Frame &&
      ((this.IterationLock = Time_1.Time.Frame), !0)
    );
  }
  Unlock() {
    this.IterationLock = -1;
  }
}
exports.Trigger = Trigger;
const INVALID_HIT_COUNT = 9999;
class BeHitTrigger extends Trigger {
  constructor() {
    super(...arguments),
      (this.TargetType = 0),
      (this.OnHitLocal = (t, e) => {
        this.OnEvent(e);
      }),
      (this.OnHitRemote = (t) => {
        this.OnEvent(t);
      });
  }
  OnInitParams(t) {
    this.TargetType = Number(t[0] ?? 0);
  }
  OnActive() {
    var t = getTarget(this.OwnerTriggerComp?.Entity, this.TargetType);
    t &&
      (EventSystem_1.EventSystem.HasWithTarget(
        t,
        EventDefine_1.EEventName.CharBeHitLocal,
        this.OnHitLocal,
      ) ||
        EventSystem_1.EventSystem.AddWithTarget(
          t,
          EventDefine_1.EEventName.CharBeHitLocal,
          this.OnHitLocal,
        ),
      EventSystem_1.EventSystem.HasWithTarget(
        t,
        EventDefine_1.EEventName.CharBeHitRemote,
        this.OnHitRemote,
      ) ||
        EventSystem_1.EventSystem.AddWithTarget(
          t,
          EventDefine_1.EEventName.CharBeHitRemote,
          this.OnHitRemote,
        ));
  }
  OnInactive() {
    var t = getTarget(this.OwnerTriggerComp?.Entity, this.TargetType);
    t &&
      (EventSystem_1.EventSystem.HasWithTarget(
        t,
        EventDefine_1.EEventName.CharBeHitLocal,
        this.OnHitLocal,
      ) &&
        EventSystem_1.EventSystem.RemoveWithTarget(
          t,
          EventDefine_1.EEventName.CharBeHitLocal,
          this.OnHitLocal,
        ),
      EventSystem_1.EventSystem.HasWithTarget(
        t,
        EventDefine_1.EEventName.CharBeHitRemote,
        this.OnHitRemote,
      )) &&
      EventSystem_1.EventSystem.RemoveWithTarget(
        t,
        EventDefine_1.EEventName.CharBeHitRemote,
        this.OnHitRemote,
      );
  }
  OnEvent(t) {
    (this.Checker && !this.Checker()) ||
      ((t = {
        Attacker: t.Attacker,
        Victim: t.Target,
        SkillID: t.SkillId,
        SkillType: t.SkillGenre,
        BulletID: Number(t.BulletId),
        CounterType: t.CounterAttackType,
        SkillHitCount: t.SkillHitCount ?? INVALID_HIT_COUNT,
        BulletHitCount: t.BulletHitCount ?? INVALID_HIT_COUNT,
        BattleFlags: t.BattleFlags,
      }),
      this.EvaluateAndExecute(t));
  }
}
class HitTrigger extends Trigger {
  constructor() {
    super(...arguments),
      (this.TargetType = 0),
      (this.OnHitLocal = (t, e) => {
        this.OnEvent(e);
      }),
      (this.OnHitRemote = (t) => {
        this.OnEvent(t);
      });
  }
  OnInitParams(t) {
    this.TargetType = Number(t[0] ?? 0);
  }
  OnActive() {
    var t = getTarget(this.OwnerTriggerComp?.Entity, this.TargetType);
    t &&
      (EventSystem_1.EventSystem.HasWithTarget(
        t,
        EventDefine_1.EEventName.CharHitLocal,
        this.OnHitLocal,
      ) ||
        EventSystem_1.EventSystem.AddWithTarget(
          t,
          EventDefine_1.EEventName.CharHitLocal,
          this.OnHitLocal,
        ),
      EventSystem_1.EventSystem.HasWithTarget(
        t,
        EventDefine_1.EEventName.CharHitRemote,
        this.OnHitRemote,
      ) ||
        EventSystem_1.EventSystem.AddWithTarget(
          t,
          EventDefine_1.EEventName.CharHitRemote,
          this.OnHitRemote,
        ));
  }
  OnInactive() {
    var t = getTarget(this.OwnerTriggerComp?.Entity, this.TargetType);
    t &&
      EventSystem_1.EventSystem.HasWithTarget(
        t,
        EventDefine_1.EEventName.CharHitLocal,
        this.OnHitLocal,
      ) &&
      EventSystem_1.EventSystem.RemoveWithTarget(
        t,
        EventDefine_1.EEventName.CharHitLocal,
        this.OnHitLocal,
      );
  }
  OnEvent(t) {
    (this.Checker && !this.Checker()) ||
      ((t = {
        Attacker: t.Attacker,
        Victim: t.Target,
        SkillID: t.SkillId,
        SkillType: t.SkillGenre,
        BulletID: Number(t.BulletId),
        CounterType: t.CounterAttackType,
        SkillHitCount: t.SkillHitCount ?? INVALID_HIT_COUNT,
        BulletHitCount: t.BulletHitCount ?? INVALID_HIT_COUNT,
        BattleFlags: t.BattleFlags,
      }),
      this.EvaluateAndExecute(t));
  }
}
class HitTriggerIncludingVision extends Trigger {
  constructor() {
    super(...arguments),
      (this.TargetType = 0),
      (this.OnEvent = (t, e) => {
        (this.Checker && !this.Checker()) ||
          ((e = {
            Attacker: e.Attacker,
            Victim: e.Target,
            SkillID: e.SkillId,
            SkillType: e.SkillGenre,
            BulletID: Number(e.BulletId),
            CounterType: e.CounterAttackType,
          }),
          this.EvaluateAndExecute(e));
      });
  }
  OnInitParams(t) {
    this.TargetType = Number(t[0] ?? 0);
  }
  OnActive() {
    var t = getTarget(this.OwnerTriggerComp?.Entity, this.TargetType);
    t &&
      !EventSystem_1.EventSystem.HasWithTarget(
        t,
        EventDefine_1.EEventName.CharHitIncludingVision,
        this.OnEvent,
      ) &&
      EventSystem_1.EventSystem.AddWithTarget(
        t,
        EventDefine_1.EEventName.CharHitIncludingVision,
        this.OnEvent,
      );
  }
  OnInactive() {
    var t = getTarget(this.OwnerTriggerComp?.Entity, this.TargetType);
    t &&
      EventSystem_1.EventSystem.HasWithTarget(
        t,
        EventDefine_1.EEventName.CharHitIncludingVision,
        this.OnEvent,
      ) &&
      EventSystem_1.EventSystem.RemoveWithTarget(
        t,
        EventDefine_1.EEventName.CharHitIncludingVision,
        this.OnEvent,
      );
  }
}
class AttributeChangedTrigger extends Trigger {
  constructor() {
    super(...arguments),
      (this.TargetType = 0),
      (this.AttributeId =
        CharacterAttributeTypes_1.EAttributeId.Proto_EAttributeType_None),
      (this.OnEvent = (t, e, i) => {
        (this.Checker && !this.Checker()) ||
          this.EvaluateAndExecute({ NewValue: e, OldValue: i });
      });
  }
  OnInitParams(t) {
    (this.TargetType = Number(t[0] ?? 0)),
      (this.AttributeId = Number(t[1] ?? 0));
  }
  OnActive() {
    var t, e;
    0 === this.TargetType &&
      (t = this.OwnerTriggerComp?.Entity.GetComponent(171)) &&
      ((e = t.GetCurrentValue(this.AttributeId)),
      this.OnEvent(this.AttributeId, e, e),
      t.AddListener(this.AttributeId, this.OnEvent));
  }
  OnInactive() {
    0 === this.TargetType &&
      this.OwnerTriggerComp?.Entity.GetComponent(171)?.RemoveListener(
        this.AttributeId,
        this.OnEvent,
      );
  }
}
class TeamAttributeChangedTrigger extends Trigger {
  constructor() {
    super(...arguments),
      (this.AttributeId = 1),
      (this.OnEvent = (t, e, i) => {
        (this.Checker && !this.Checker()) ||
          ((e = {
            NewValue: e,
            OldValue: i,
            MaxValue:
              FormationAttributeController_1.FormationAttributeController.GetMax(
                t,
              ),
          }),
          this.EvaluateAndExecute(e));
      });
  }
  OnInitParams(t) {
    this.AttributeId = Number(t[0] ?? 0);
  }
  OnActive() {
    var t =
      FormationAttributeController_1.FormationAttributeController.GetValue(
        this.AttributeId,
      );
    this.OnEvent(this.AttributeId, t, t),
      FormationAttributeController_1.FormationAttributeController.AddValueListener(
        this.AttributeId,
        this.OnEvent,
      );
  }
  OnInactive() {
    FormationAttributeController_1.FormationAttributeController.RemoveValueListener(
      this.AttributeId,
      this.OnEvent,
    );
  }
}
class TagTrigger extends Trigger {
  constructor() {
    super(...arguments),
      (this.CheckRemove = !1),
      (this.TargetType = 0),
      (this.InitBehavior = 0),
      (this.TagId = 0),
      (this.OnEvent = (t, e) => {
        (this.Checker && !this.Checker()) ||
          (e !== this.CheckRemove && this.EvaluateAndExecute({}));
      });
  }
  OnInitParams(t) {
    (this.TagId = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(
      t[0].trim(),
    )),
      void 0 === this.TagId &&
        CombatLog_1.CombatLog.Error(
          "PassiveSkill",
          this.OwnerTriggerComp?.Entity,
          "被动技能的tag找不到对应的tagId",
          ["tag", t[1]],
        ),
      (this.CheckRemove = !!Number(t[1] ?? 0)),
      (this.TargetType = Number(t[2] ?? 0)),
      (this.InitBehavior = Number(t[3] ?? 0));
  }
  OnActive() {
    if (void 0 !== this.TagId) {
      var t = this.OwnerTriggerComp?.Entity.GetComponent(203);
      if (t) {
        switch (this.InitBehavior) {
          case 1:
            t.HasTag(this.TagId) && this.OnEvent(this.TagId, !0);
            break;
          case 2:
            t.HasTag(this.TagId) || this.OnEvent(this.TagId, !1);
        }
        t.AddTagAddOrRemoveListener(this.TagId, this.OnEvent);
      }
    }
  }
  OnInactive() {
    void 0 !== this.TagId &&
      this.OwnerTriggerComp?.Entity.GetComponent(
        203,
      )?.RemoveTagAddOrRemoveListener(this.TagId, this.OnEvent);
  }
}
class TagStackTrigger extends Trigger {
  constructor() {
    super(...arguments),
      (this.TagId = 0),
      (this.OldCount = 0),
      (this.InitBehavior = 0),
      (this.OnEvent = (t, e) => {
        var i;
        (this.Checker && !this.Checker()) ||
          ((i = { NewStack: t, OldStack: this.OldCount }),
          (this.OldCount = t),
          this.EvaluateAndExecute(i));
      });
  }
  OnInitParams(t) {
    (this.TagId = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(
      t[0].trim(),
    )),
      void 0 === this.TagId &&
        CombatLog_1.CombatLog.Error(
          "PassiveSkill",
          this.OwnerTriggerComp?.Entity,
          "被动技能的tag找不到对应的tagId",
          ["tag", t[0]],
        ),
      (this.InitBehavior = Number(t[1] ?? 0));
  }
  OnActive() {
    if (void 0 !== this.TagId) {
      var t = this.OwnerTriggerComp?.Entity.GetComponent(203);
      if (t) {
        var e = t.GetTagCount(this.TagId);
        switch (this.InitBehavior) {
          case 1:
            0 < e && this.OnEvent(e, this.TagId);
            break;
          case 2:
            e <= 0 && this.OnEvent(e, this.TagId);
        }
        (this.OldCount = e), t.AddTagChangedListener(this.TagId, this.OnEvent);
      }
    }
  }
  OnInactive() {
    void 0 !== this.TagId &&
      this.OwnerTriggerComp?.Entity.GetComponent(203)?.RemoveTagChangedListener(
        this.TagId,
        this.OnEvent,
      );
  }
}
class LimitDodgeTrigger extends Trigger {
  constructor() {
    super(...arguments),
      (this.TargetType = 0),
      (this.OnEvent = (t, e, i, s) => {
        (this.Checker && !this.Checker()) ||
          ((e = {
            Attacker: t,
            Victim: e,
            SkillID: i,
            SkillType: EntitySystem_1.EntitySystem.Get(t.Id)
              ?.GetComponent(39)
              ?.GetSkillInfo(i)?.SkillGenre,
            BulletID: s,
          }),
          this.EvaluateAndExecute(e));
      });
  }
  OnInitParams(t) {
    this.TargetType = Number(t[0] ?? 0);
  }
  OnActive() {
    var t = getTarget(this.OwnerTriggerComp?.Entity, this.TargetType);
    t &&
      !EventSystem_1.EventSystem.HasWithTarget(
        t,
        EventDefine_1.EEventName.CharLimitDodge,
        this.OnEvent,
      ) &&
      EventSystem_1.EventSystem.AddWithTarget(
        t,
        EventDefine_1.EEventName.CharLimitDodge,
        this.OnEvent,
      );
  }
  OnInactive() {
    var t = getTarget(this.OwnerTriggerComp?.Entity, this.TargetType);
    t &&
      EventSystem_1.EventSystem.HasWithTarget(
        t,
        EventDefine_1.EEventName.CharLimitDodge,
        this.OnEvent,
      ) &&
      EventSystem_1.EventSystem.RemoveWithTarget(
        t,
        EventDefine_1.EEventName.CharLimitDodge,
        this.OnEvent,
      );
  }
}
class SkillTrigger extends Trigger {
  constructor() {
    super(...arguments),
      (this.TargetType = 0),
      (this.SkillId = void 0),
      (this.CheckEnd = !1),
      (this.OnSelfEvent = (t, e) => {
        if (
          (!this.Checker || this.Checker()) &&
          !(this.SkillId && 0 <= this.SkillId && e !== this.SkillId)
        ) {
          var t = EntitySystem_1.EntitySystem.Get(t)?.GetComponent(39),
            i = t?.GetSkillInfo(e);
          if (t && i) {
            var s = [];
            for (let t = 0; t < i.SkillTag.Num(); t++) {
              var r = i?.SkillTag.Get(t)?.TagName;
              void 0 !== r && s.push(r);
            }
            t = t.GetSkill(e);
            t &&
              ((e = {
                SkillType: i?.SkillGenre,
                SkillTags: s,
                SkillID: e,
                BattleFlags: t.BattleFlags,
              }),
              this.EvaluateAndExecute(e));
          }
        }
      });
  }
  OnInitParams(t) {
    (this.TargetType = Number(t[0] ?? 0)),
      (this.SkillId = Number(t[1] ?? 0)),
      (this.CheckEnd = !!Number(t[2] ?? 0));
  }
  OnActive() {
    var t = getTarget(this.OwnerTriggerComp?.Entity, this.TargetType);
    t &&
      (this.CheckEnd
        ? EventSystem_1.EventSystem.HasWithTarget(
            t,
            EventDefine_1.EEventName.OnSkillEnd,
            this.OnSelfEvent,
          ) ||
          EventSystem_1.EventSystem.AddWithTarget(
            t,
            EventDefine_1.EEventName.OnSkillEnd,
            this.OnSelfEvent,
          )
        : (EventSystem_1.EventSystem.HasWithTarget(
            t,
            EventDefine_1.EEventName.CharUseSkill,
            this.OnSelfEvent,
          ) ||
            EventSystem_1.EventSystem.AddWithTarget(
              t,
              EventDefine_1.EEventName.CharUseSkill,
              this.OnSelfEvent,
            ),
          EventSystem_1.EventSystem.HasWithTarget(
            t,
            EventDefine_1.EEventName.CharUseSkillRemote,
            this.OnSelfEvent,
          ) ||
            EventSystem_1.EventSystem.AddWithTarget(
              t,
              EventDefine_1.EEventName.CharUseSkillRemote,
              this.OnSelfEvent,
            )));
  }
  OnInactive() {
    var t = getTarget(this.OwnerTriggerComp?.Entity, this.TargetType);
    t &&
      (this.CheckEnd
        ? EventSystem_1.EventSystem.HasWithTarget(
            t,
            EventDefine_1.EEventName.OnSkillEnd,
            this.OnSelfEvent,
          ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            t,
            EventDefine_1.EEventName.OnSkillEnd,
            this.OnSelfEvent,
          )
        : EventSystem_1.EventSystem.HasWithTarget(
            t,
            EventDefine_1.EEventName.CharUseSkill,
            this.OnSelfEvent,
          ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            t,
            EventDefine_1.EEventName.CharUseSkill,
            this.OnSelfEvent,
          ));
  }
}
class DamageTrigger extends Trigger {
  constructor() {
    super(...arguments),
      (this.TargetType = 0),
      (this.CalculateType = 0),
      (this.OnEvent = (t, e, i, s) => {
        var r, n;
        (this.Checker && !this.Checker()) ||
          ((r = s.Damage),
          (n = s.DamageData).CalculateType === this.CalculateType &&
            ((t = {
              Attacker: t,
              Victim: e,
              DamageID: n.Id,
              SkillID: i?.SkillId ?? 0,
              SkillType: i?.SkillGenre,
              DamageType: n.Type,
              DamageSubType: n.SubType,
              ElementType: s.Element,
              DamageValue: -r,
              IsCritical: i.IsCritical,
              SkillDamageCount: i?.SkillDamageCount ?? INVALID_HIT_COUNT,
              BattleFlags: i.BattleFlags,
            }),
            this.EvaluateAndExecute(t)));
      });
  }
  OnInitParams(t) {
    (this.TargetType = Number(t[0] ?? 0)),
      (this.CalculateType = Number(t[1] ?? 0));
  }
  OnActive() {
    var t = getTarget(this.OwnerTriggerComp?.Entity, this.TargetType);
    t &&
      !EventSystem_1.EventSystem.HasWithTarget(
        t,
        EventDefine_1.EEventName.CharDamage,
        this.OnEvent,
      ) &&
      EventSystem_1.EventSystem.AddWithTarget(
        t,
        EventDefine_1.EEventName.CharDamage,
        this.OnEvent,
      );
  }
  OnInactive() {
    var t = getTarget(this.OwnerTriggerComp?.Entity, this.TargetType);
    t &&
      EventSystem_1.EventSystem.HasWithTarget(
        t,
        EventDefine_1.EEventName.CharDamage,
        this.OnEvent,
      ) &&
      EventSystem_1.EventSystem.RemoveWithTarget(
        t,
        EventDefine_1.EEventName.CharDamage,
        this.OnEvent,
      );
  }
}
class GlobalDamageTrigger extends Trigger {
  constructor() {
    super(...arguments),
      (this.CalculateType = 0),
      (this.DistSquared = 0),
      (this.OnEvent = (t, e, i, s) => {
        var r, n, h, a;
        (this.Checker && !this.Checker()) ||
          ((r = s.Damage),
          (n = s.DamageData).CalculateType === this.CalculateType &&
            this.OwnerTriggerComp?.Entity.Valid &&
            ((a =
              this.OwnerTriggerComp?.Entity.GetComponent(
                3,
              )?.ActorLocationProxy),
            (h = e.GetComponent(3)?.ActorLocationProxy),
            a) &&
            h &&
            (Vector_1.Vector.DistSquared(a, h) > this.DistSquared ||
              ((a = {
                Attacker: t,
                Victim: e,
                DamageID: n.Id,
                SkillID: i?.SkillId ?? 0,
                SkillType: i?.SkillGenre,
                DamageType: n.Type,
                DamageSubType: n.SubType,
                ElementType: s.Element,
                DamageValue: -r,
                IsCritical: i.IsCritical,
                SkillDamageCount: i?.SkillDamageCount ?? INVALID_HIT_COUNT,
                BulletDamageCount: i?.BulletDamageCount ?? INVALID_HIT_COUNT,
                BattleFlags: i.BattleFlags,
              }),
              this.EvaluateAndExecute(a))));
      });
  }
  OnInitParams(t) {
    this.CalculateType = Number(t[0] ?? 0);
    t = Number(t[1] ?? 0);
    this.DistSquared = t * t;
  }
  OnActive() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.GlobalCharDamage,
      this.OnEvent,
    );
  }
  OnInactive() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.GlobalCharDamage,
      this.OnEvent,
    );
  }
}
class BeDamageTrigger extends Trigger {
  constructor() {
    super(...arguments),
      (this.TargetType = 0),
      (this.CalculateType = 0),
      (this.OnEvent = (t, e, i, s) => {
        var r, n;
        (this.Checker && !this.Checker()) ||
          ((r = s.Damage),
          (n = s.DamageData).CalculateType === this.CalculateType &&
            ((t = {
              Attacker: t,
              Victim: e,
              DamageID: n.Id,
              SkillID: i?.SkillId ?? 0,
              SkillType: i?.SkillGenre,
              DamageType: n.Type,
              DamageSubType: n.SubType,
              ElementType: s.Element,
              DamageValue: -r,
              IsCritical: i.IsCritical,
              SkillDamageCount: i?.SkillDamageCount ?? INVALID_HIT_COUNT,
              BulletDamageCount: i?.BulletDamageCount ?? INVALID_HIT_COUNT,
              BattleFlags: i.BattleFlags,
            }),
            this.EvaluateAndExecute(t)));
      });
  }
  OnInitParams(t) {
    (this.TargetType = Number(t[0] ?? 0)),
      (this.CalculateType = Number(t[1] ?? 0));
  }
  OnActive() {
    var t = getTarget(this.OwnerTriggerComp?.Entity, this.TargetType);
    t &&
      !EventSystem_1.EventSystem.HasWithTarget(
        t,
        EventDefine_1.EEventName.CharBeDamage,
        this.OnEvent,
      ) &&
      EventSystem_1.EventSystem.AddWithTarget(
        t,
        EventDefine_1.EEventName.CharBeDamage,
        this.OnEvent,
      );
  }
  OnInactive() {
    var t = getTarget(this.OwnerTriggerComp?.Entity, this.TargetType);
    t &&
      EventSystem_1.EventSystem.HasWithTarget(
        t,
        EventDefine_1.EEventName.CharBeDamage,
        this.OnEvent,
      ) &&
      EventSystem_1.EventSystem.RemoveWithTarget(
        t,
        EventDefine_1.EEventName.CharBeDamage,
        this.OnEvent,
      );
  }
}
class DeathTrigger extends Trigger {
  constructor() {
    super(...arguments),
      (this.TargetType = 0),
      (this.OnEvent = (t, e, i, s) => {
        var r, n;
        (this.Checker && !this.Checker()) ||
          ((r = s.Damage),
          (n = s.DamageData),
          i.IsTargetKilled &&
            ((t = {
              Attacker: t,
              Victim: e,
              DamageID: n.Id,
              SkillID: i?.SkillId ?? 0,
              SkillType: i?.SkillGenre,
              DamageType: n.Type,
              DamageSubType: n.SubType,
              ElementType: s.Element,
              DamageValue: -r,
              IsCritical: i.IsCritical,
            }),
            this.EvaluateAndExecute(t)));
      });
  }
  OnInitParams(t) {
    this.TargetType = Number(t[0] ?? 0);
  }
  OnActive() {
    var t = getTarget(this.OwnerTriggerComp?.Entity, this.TargetType);
    t &&
      !EventSystem_1.EventSystem.HasWithTarget(
        t,
        EventDefine_1.EEventName.CharBeDamage,
        this.OnEvent,
      ) &&
      EventSystem_1.EventSystem.AddWithTarget(
        t,
        EventDefine_1.EEventName.CharBeDamage,
        this.OnEvent,
      );
  }
  OnInactive() {
    var t = getTarget(this.OwnerTriggerComp?.Entity, this.TargetType);
    t &&
      EventSystem_1.EventSystem.HasWithTarget(
        t,
        EventDefine_1.EEventName.CharBeDamage,
        this.OnEvent,
      ) &&
      EventSystem_1.EventSystem.RemoveWithTarget(
        t,
        EventDefine_1.EEventName.CharBeDamage,
        this.OnEvent,
      );
  }
}
class KillTrigger extends Trigger {
  constructor() {
    super(...arguments),
      (this.TargetType = 0),
      (this.OnEvent = (t, e, i, s) => {
        var r, n;
        (this.Checker && !this.Checker()) ||
          ((r = s.Damage),
          (n = s.DamageData),
          i.IsTargetKilled &&
            ((t = {
              Attacker: t,
              Victim: e,
              DamageID: n.Id,
              SkillID: i?.SkillId ?? 0,
              SkillType: i?.SkillGenre,
              DamageType: n.Type,
              DamageSubType: n.SubType,
              ElementType: s.Element,
              DamageValue: -r,
              IsCritical: i.IsCritical,
            }),
            this.EvaluateAndExecute(t)));
      });
  }
  OnInitParams(t) {
    this.TargetType = Number(t[0] ?? 0);
  }
  OnActive() {
    var t = getTarget(this.OwnerTriggerComp?.Entity, this.TargetType);
    t &&
      !EventSystem_1.EventSystem.HasWithTarget(
        t,
        EventDefine_1.EEventName.CharDamage,
        this.OnEvent,
      ) &&
      EventSystem_1.EventSystem.AddWithTarget(
        t,
        EventDefine_1.EEventName.CharDamage,
        this.OnEvent,
      );
  }
  OnInactive() {
    var t = getTarget(this.OwnerTriggerComp?.Entity, this.TargetType);
    t &&
      EventSystem_1.EventSystem.HasWithTarget(
        t,
        EventDefine_1.EEventName.CharDamage,
        this.OnEvent,
      ) &&
      EventSystem_1.EventSystem.RemoveWithTarget(
        t,
        EventDefine_1.EEventName.CharDamage,
        this.OnEvent,
      );
  }
}
class GameplayEventTrigger extends Trigger {
  constructor() {
    super(...arguments),
      (this.TagId = 0),
      (this.OnEvent = (t) => {
        (this.Checker && !this.Checker()) || this.EvaluateAndExecute({});
      });
  }
  OnInitParams(t) {
    (this.TagId = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(
      t[0].trim(),
    )),
      void 0 === this.TagId &&
        CombatLog_1.CombatLog.Error(
          "PassiveSkill",
          this.OwnerTriggerComp?.Entity,
          "被动技能的GameplayEvent找不到对应的tagId",
          ["GameplayEvent", t[1]],
        );
  }
  OnActive() {
    void 0 !== this.TagId &&
      this.OwnerTriggerComp?.Entity.GetComponent(17)?.AddGameplayEventListener(
        this.TagId,
        this.OnEvent,
      );
  }
  OnInactive() {
    void 0 !== this.TagId &&
      this.OwnerTriggerComp?.Entity.GetComponent(
        17,
      )?.RemoveGameplayEventListener(this.TagId, this.OnEvent);
  }
}
class QteGoBattleTrigger extends Trigger {
  constructor() {
    super(...arguments),
      (this.TargetType = 0),
      (this.OnEvent = (t, e) => {
        if (!this.Checker || this.Checker()) {
          switch (this.TargetType) {
            case 0:
              if (t !== this.OwnerTriggerComp?.Entity.Id) return;
              break;
            case 1:
              var i = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(
                t,
                { ParamType: 1 },
              );
              if (i && i.IsMyRole()) break;
              return;
          }
          var s = EntitySystem_1.EntitySystem.Get(t),
            e = EntitySystem_1.EntitySystem.Get(e);
          this.EvaluateAndExecute({ GoBattleEntity: s, GoDownEntity: e });
        }
      });
  }
  OnInitParams(t) {
    this.TargetType = Number(t[0] ?? 0);
  }
  OnActive() {
    EventSystem_1.EventSystem.Has(
      EventDefine_1.EEventName.CharExecuteQte,
      this.OnEvent,
    ) ||
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CharExecuteQte,
        this.OnEvent,
      ),
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.CharExecuteMultiQte,
        this.OnEvent,
      ) ||
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.CharExecuteMultiQte,
          this.OnEvent,
        );
  }
  OnInactive() {
    EventSystem_1.EventSystem.Has(
      EventDefine_1.EEventName.CharExecuteQte,
      this.OnEvent,
    ) &&
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CharExecuteQte,
        this.OnEvent,
      ),
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.CharExecuteMultiQte,
        this.OnEvent,
      ) &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.CharExecuteMultiQte,
          this.OnEvent,
        );
  }
}
class QteGoDownTrigger extends Trigger {
  constructor() {
    super(...arguments),
      (this.TargetType = 0),
      (this.OnEvent = (t, e) => {
        if (!this.Checker || this.Checker()) {
          switch (this.TargetType) {
            case 0:
              if (e !== this.OwnerTriggerComp?.Entity.Id) return;
              break;
            case 1:
              var i = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(
                e,
                { ParamType: 1 },
              );
              if (i && i.IsMyRole()) break;
              return;
          }
          var t = EntitySystem_1.EntitySystem.Get(t),
            s = EntitySystem_1.EntitySystem.Get(e);
          this.EvaluateAndExecute({ GoBattleEntity: t, GoDownEntity: s });
        }
      });
  }
  OnInitParams(t) {
    this.TargetType = Number(t[0] ?? 0);
  }
  OnActive() {
    EventSystem_1.EventSystem.Has(
      EventDefine_1.EEventName.CharExecuteQte,
      this.OnEvent,
    ) ||
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CharExecuteQte,
        this.OnEvent,
      ),
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.CharExecuteMultiQte,
        this.OnEvent,
      ) ||
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.CharExecuteMultiQte,
          this.OnEvent,
        );
  }
  OnInactive() {
    EventSystem_1.EventSystem.Has(
      EventDefine_1.EEventName.CharExecuteQte,
      this.OnEvent,
    ) &&
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CharExecuteQte,
        this.OnEvent,
      ),
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.CharExecuteMultiQte,
        this.OnEvent,
      ) &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.CharExecuteMultiQte,
          this.OnEvent,
        );
  }
}
class BuffInstigatorTrigger extends Trigger {
  constructor() {
    super(...arguments),
      (this.TargetType = 0),
      (this.ListenBuffIds = new Set()),
      (this.OnEvent = (t, e, i) => {
        (this.Checker && !this.Checker()) ||
          this.EvaluateAndExecute({ BuffId: t, Victim: e, Attacker: i });
      });
  }
  OnInitParams(t) {
    this.TargetType = Number(t[0] ?? 0);
    t = t[1]?.split("#");
    if (t)
      for (const i of t) {
        var e = Number(i);
        Number.isInteger(e) && 0 < e && this.ListenBuffIds.add(e);
      }
  }
  OnActive() {
    var t = getTarget(this.OwnerTriggerComp?.Entity, this.TargetType);
    if (t)
      for (const e of this.ListenBuffIds)
        AbilityEvent_1.AbilityEvent.Add(t, 1, e, this.OnEvent);
  }
  OnInactive() {
    var t = getTarget(this.OwnerTriggerComp?.Entity, this.TargetType);
    if (t)
      for (const e of this.ListenBuffIds)
        AbilityEvent_1.AbilityEvent.Remove(t, 1, e, this.OnEvent);
  }
}
class BuffVictimTrigger extends Trigger {
  constructor() {
    super(...arguments),
      (this.TargetType = 0),
      (this.ListenBuffIds = new Map()),
      (this.OnEvent = (e, i, s) => {
        if (!this.Checker || this.Checker()) {
          let t = !1;
          var r = this.ListenBuffIds.get(e);
          if (r) {
            for (var [n, h] of r)
              if (
                (0 === n && s >= h && i < h) ||
                (1 === n && s <= h && i > h)
              ) {
                t = !0;
                break;
              }
            t &&
              this.EvaluateAndExecute({ BuffId: e, OldStack: i, NewStack: s });
          }
        }
      });
  }
  OnInitParams(e) {
    this.TargetType = Number(e[0] ?? 0);
    for (let t = 1; t < e.length; t++) {
      var i = e[t]?.split("#");
      if (i) {
        var s = Number(i[0]),
          r = Number(i[1]),
          i = Number(i[2]);
        if (
          !Number.isInteger(r) ||
          !Number.isInteger(i) ||
          !Number.isInteger(s)
        )
          return void CombatLog_1.CombatLog.Error(
            "PassiveSkill",
            this.OwnerTriggerComp?.Entity,
            "BuffVictimTrigger参数错误",
            ["triggerName", ""],
            ["params", e],
          );
        let t = this.ListenBuffIds.get(r);
        t || this.ListenBuffIds.set(r, (t = [])), t.push([s, i]);
      }
    }
  }
  OnActive() {
    var t = getTarget(this.OwnerTriggerComp?.Entity, this.TargetType);
    if (t)
      for (const e of this.ListenBuffIds.keys())
        AbilityEvent_1.AbilityEvent.Add(t, 0, e, this.OnEvent);
  }
  OnInactive() {
    var t = getTarget(this.OwnerTriggerComp?.Entity, this.TargetType);
    if (t)
      for (const e of this.ListenBuffIds.keys())
        AbilityEvent_1.AbilityEvent.Remove(t, 0, e, this.OnEvent);
  }
}
class VisionTrigger extends Trigger {
  constructor() {
    super(...arguments),
      (this.kXo = 0),
      (this.hen = void 0),
      (this.$Sc = 0),
      (this.WSc = -1),
      (this.QSc = new Map()),
      (this.OnEvent = (t) => {
        var e;
        (this.Checker && !this.Checker()) ||
          ((-1 === this.hen || t === this.hen) &&
            ((e = this.QSc.get(t) ?? 0),
            this.QSc.set(t, e + 1),
            this.WSc < 0 || e < this.WSc) &&
            (this.$Sc++,
            (t = { TriggerCount: this.$Sc }),
            this.EvaluateAndExecute(t)));
      });
  }
  OnInitParams(t) {
    (this.kXo = Number(t[0] ?? 0)),
      (this.hen = Number(t[1] ?? 0)),
      (this.WSc = Number(t[2] ?? -1));
  }
  OnActive() {
    var t = getTarget(this.OwnerTriggerComp?.Entity, this.kXo);
    t &&
      !EventSystem_1.EventSystem.HasWithTarget(
        t,
        EventDefine_1.EEventName.ActivateAbilityVision,
        this.OnEvent,
      ) &&
      EventSystem_1.EventSystem.AddWithTarget(
        t,
        EventDefine_1.EEventName.ActivateAbilityVision,
        this.OnEvent,
      );
  }
  OnInactive() {
    var t = getTarget(this.OwnerTriggerComp?.Entity, this.kXo);
    t &&
      EventSystem_1.EventSystem.HasWithTarget(
        t,
        EventDefine_1.EEventName.ActivateAbilityVision,
        this.OnEvent,
      ) &&
      EventSystem_1.EventSystem.RemoveWithTarget(
        t,
        EventDefine_1.EEventName.ActivateAbilityVision,
        this.OnEvent,
      );
  }
}
class DamageIdTrigger extends Trigger {
  constructor() {
    super(...arguments),
      (this.kXo = 0),
      (this.qpi = 0),
      (this.ListenDamageIds = []),
      (this.OnEvent = (t, e, i, s) => {
        if (
          this.ListenDamageIds.includes(s.DamageData.Id) &&
          (!this.Checker || this.Checker()) &&
          this.OwnerTriggerComp?.Entity.Valid
        ) {
          if (3 === this.kXo) {
            var s = this.OwnerTriggerComp?.Entity.GetComponent(3)?.Actor.Camp,
              r = e.GetComponent(3)?.Actor.Camp;
            if (2 !== CampUtils_1.CampUtils.GetCampRelationship(s, r)) return;
          }
          (s =
            this.OwnerTriggerComp?.Entity.GetComponent(3)?.ActorLocationProxy),
            (r = e.GetComponent(3)?.ActorLocationProxy);
          s &&
            r &&
            (Vector_1.Vector.DistSquared(s, r) > this.qpi ||
              this.EvaluateAndExecute());
        }
      });
  }
  OnInitParams(t) {
    this.kXo = Number(t[0] ?? 0);
    var e = Number(t[1] ?? 0);
    (this.qpi = e * e),
      (this.ListenDamageIds = t[2]?.split("#").map((t) => Number(t)));
  }
  OnActive() {
    var t;
    3 === this.kXo
      ? EventSystem_1.EventSystem.Has(
          EventDefine_1.EEventName.GlobalCharDamage,
          this.OnEvent,
        ) ||
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.GlobalCharDamage,
          this.OnEvent,
        )
      : (t = getTarget(this.OwnerTriggerComp?.Entity, this.kXo)) &&
        !EventSystem_1.EventSystem.HasWithTarget(
          t,
          EventDefine_1.EEventName.CharBeDamage,
          this.OnEvent,
        ) &&
        EventSystem_1.EventSystem.AddWithTarget(
          t,
          EventDefine_1.EEventName.CharBeDamage,
          this.OnEvent,
        );
  }
  OnInactive() {
    var t;
    3 === this.kXo
      ? EventSystem_1.EventSystem.Has(
          EventDefine_1.EEventName.GlobalCharDamage,
          this.OnEvent,
        ) &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.GlobalCharDamage,
          this.OnEvent,
        )
      : (t = getTarget(this.OwnerTriggerComp?.Entity, this.kXo)) &&
        EventSystem_1.EventSystem.HasWithTarget(
          t,
          EventDefine_1.EEventName.CharBeDamage,
          this.OnEvent,
        ) &&
        EventSystem_1.EventSystem.RemoveWithTarget(
          t,
          EventDefine_1.EEventName.CharBeDamage,
          this.OnEvent,
        );
  }
}
class BuffAddFailureTrigger extends Trigger {
  constructor() {
    super(...arguments),
      (this.TargetType = 0),
      (this.ListenBuffIds = []),
      (this.ContextIds = []),
      (this.VicTimIds = []),
      (this.TriggerOncePerContext = !1),
      (this.OnEvent = (t, e, i, s, r) => {
        if (!this.Checker || this.Checker()) {
          if (this.TriggerOncePerContext) {
            const n = r ?? 0n;
            r = this.ContextIds.findIndex((t) => t === n);
            if (-1 === r)
              this.ContextIds.push(n),
                this.VicTimIds.push(e.Id),
                this.ContextIds.length >
                  BuffAddFailureTrigger.ContextCapacity &&
                  (this.ContextIds.shift(), this.VicTimIds.shift());
            else if (this.VicTimIds[r] !== e.Id) return;
          }
          r = {
            BuffId: t,
            Victim: e,
            Attacker: i,
            StackCount: s,
            Listener: this.OwnerTriggerComp?.Entity,
          };
          this.EvaluateAndExecute(r);
        }
      });
  }
  OnInitParams(t) {
    (this.TargetType = Number(t[0] ?? 0)),
      (this.ListenBuffIds = t[1]?.split("#").map((t) => Number(t))),
      (this.TriggerOncePerContext = 1 === Number(t[2] ?? 0));
  }
  OnActive() {
    var t = getTarget(this.OwnerTriggerComp?.Entity, this.TargetType);
    if (t)
      for (const e of this.ListenBuffIds)
        AbilityEvent_1.AbilityEvent.Add(t, 2, e, this.OnEvent);
  }
  OnInactive() {
    var t = getTarget(this.OwnerTriggerComp?.Entity, this.TargetType);
    if (t)
      for (const e of this.ListenBuffIds)
        AbilityEvent_1.AbilityEvent.Remove(t, 2, e, this.OnEvent);
  }
}
BuffAddFailureTrigger.ContextCapacity = 15;
//# sourceMappingURL=Trigger.js.map
