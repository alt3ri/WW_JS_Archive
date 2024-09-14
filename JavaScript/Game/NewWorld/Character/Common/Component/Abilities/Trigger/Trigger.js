"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Trigger = void 0);
const EntitySystem_1 = require("../../../../../../../Core/Entity/EntitySystem"),
  GameplayTagUtils_1 = require("../../../../../../../Core/Utils/GameplayTagUtils"),
  Vector_1 = require("../../../../../../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  FormationAttributeController_1 = require("../../../../../../Module/Abilities/FormationAttributeController"),
  SceneTeamEvent_1 = require("../../../../../../Module/SceneTeam/SceneTeamEvent"),
  CombatLog_1 = require("../../../../../../Utils/CombatLog"),
  ConditionFormula_1 = require("../../../../../../Utils/Trigger/ConditionFormula"),
  CharacterAttributeTypes_1 = require("../CharacterAttributeTypes"),
  TriggerType_1 = require("./TriggerType");
class Trigger {
  constructor(e, t, i, s, n, r) {
    if (
      ((this.Config = e),
      (this.Handle = t),
      (this.OwnerTriggerComp = i),
      (this.Callback = n),
      (this.Checker = r),
      (this.Formula = void 0),
      (this.TriggerType = void 0),
      (this.dce = !1),
      (this.fYo = 0),
      !e)
    )
      throw new Error("找不到对应的Trigger配置");
    if (
      ((this.TriggerType = TriggerType_1.ETriggerEvent[e.Type]),
      void 0 === this.TriggerType)
    )
      throw new Error("找不到对应的Trigger触发器类型");
    (t = e.Formula), (n = e.Params?.length ? JSON.parse(e.Params) : {});
    (n.Owner = i.Entity),
      (this.Formula = new ConditionFormula_1.Formula(t)
        .SetBuiltinFunctions(s)
        .AddBuiltinFunction(
          "Accumulate",
          (e, t, i = !0) =>
            !!i && ((this.fYo += e), this.fYo >= t) && !(this.fYo = 0),
        )
        .SetDefaultParams(n));
  }
  OnInitParams(e) {}
  SetActive(e) {
    this.dce !== e && ((this.dce = e) ? this.OnActive() : this.OnInactive());
  }
  Destroy() {
    this.SetActive(!1),
      (this.OwnerTriggerComp = void 0),
      (this.Config = void 0),
      (this.Callback = void 0);
  }
  GetLastFormulaResult() {
    return this.Formula.GetLastResult();
  }
  static GetClass(e) {
    switch (e) {
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
      case TriggerType_1.ETriggerEvent.GameplayEventTrigger:
        return GameplayEventTrigger;
      case TriggerType_1.ETriggerEvent.QteGoBattleTrigger:
        return QteGoBattleTrigger;
      case TriggerType_1.ETriggerEvent.QteGoDownTrigger:
        return QteGoDownTrigger;
    }
  }
}
class BeHitTrigger extends (exports.Trigger = Trigger) {
  constructor() {
    super(...arguments),
      (this.TargetType = 0),
      (this.OnHitLocal = (e, t) => {
        this.OnEvent(t);
      }),
      (this.OnHitRemote = (e) => {
        this.OnEvent(e);
      });
  }
  OnInitParams(e) {
    this.TargetType = Number(e[0] ?? 0);
  }
  GetEventTarget() {
    switch (this.TargetType) {
      case 0:
        return this.OwnerTriggerComp?.Entity;
      case 1:
        return SceneTeamEvent_1.SceneTeam.Local;
      case 2:
        return SceneTeamEvent_1.SceneTeam.All;
    }
  }
  OnActive() {
    var e = this.GetEventTarget();
    e &&
      (EventSystem_1.EventSystem.HasWithTarget(
        e,
        EventDefine_1.EEventName.CharBeHitLocal,
        this.OnHitLocal,
      ) ||
        EventSystem_1.EventSystem.AddWithTarget(
          e,
          EventDefine_1.EEventName.CharBeHitLocal,
          this.OnHitLocal,
        ),
      EventSystem_1.EventSystem.HasWithTarget(
        e,
        EventDefine_1.EEventName.CharBeHitRemote,
        this.OnHitRemote,
      ) ||
        EventSystem_1.EventSystem.AddWithTarget(
          e,
          EventDefine_1.EEventName.CharBeHitRemote,
          this.OnHitRemote,
        ));
  }
  OnInactive() {
    var e = this.GetEventTarget();
    e &&
      (EventSystem_1.EventSystem.HasWithTarget(
        e,
        EventDefine_1.EEventName.CharBeHitLocal,
        this.OnHitLocal,
      ) &&
        EventSystem_1.EventSystem.RemoveWithTarget(
          e,
          EventDefine_1.EEventName.CharBeHitLocal,
          this.OnHitLocal,
        ),
      EventSystem_1.EventSystem.HasWithTarget(
        e,
        EventDefine_1.EEventName.CharBeHitRemote,
        this.OnHitRemote,
      )) &&
      EventSystem_1.EventSystem.RemoveWithTarget(
        e,
        EventDefine_1.EEventName.CharBeHitRemote,
        this.OnHitRemote,
      );
  }
  OnEvent(e) {
    (this.Checker && !this.Checker()) ||
      ((e = {
        Attacker: e.Attacker,
        Victim: e.Target,
        SkillID: e.SkillId,
        SkillType: e.SkillGenre,
        BulletID: Number(e.BulletId),
        CounterType: e.CounterAttackType,
      }),
      this.Formula.Evaluate(e) && this?.Callback(this.Formula.Params, e));
  }
}
class HitTrigger extends Trigger {
  constructor() {
    super(...arguments),
      (this.TargetType = 0),
      (this.OnHitLocal = (e, t) => {
        this.OnEvent(t);
      }),
      (this.OnHitRemote = (e) => {
        this.OnEvent(e);
      });
  }
  OnInitParams(e) {
    this.TargetType = Number(e[0] ?? 0);
  }
  GetEventTarget() {
    switch (this.TargetType) {
      case 0:
        return this.OwnerTriggerComp?.Entity;
      case 1:
        return SceneTeamEvent_1.SceneTeam.Local;
      case 2:
        return SceneTeamEvent_1.SceneTeam.All;
    }
  }
  OnActive() {
    var e = this.GetEventTarget();
    e &&
      (EventSystem_1.EventSystem.HasWithTarget(
        e,
        EventDefine_1.EEventName.CharHitLocal,
        this.OnHitLocal,
      ) ||
        EventSystem_1.EventSystem.AddWithTarget(
          e,
          EventDefine_1.EEventName.CharHitLocal,
          this.OnHitLocal,
        ),
      EventSystem_1.EventSystem.HasWithTarget(
        e,
        EventDefine_1.EEventName.CharHitRemote,
        this.OnHitRemote,
      ) ||
        EventSystem_1.EventSystem.AddWithTarget(
          e,
          EventDefine_1.EEventName.CharHitRemote,
          this.OnHitRemote,
        ));
  }
  OnInactive() {
    var e = this.GetEventTarget();
    e &&
      EventSystem_1.EventSystem.HasWithTarget(
        e,
        EventDefine_1.EEventName.CharHitLocal,
        this.OnHitLocal,
      ) &&
      EventSystem_1.EventSystem.RemoveWithTarget(
        e,
        EventDefine_1.EEventName.CharHitLocal,
        this.OnHitLocal,
      );
  }
  OnEvent(e) {
    (this.Checker && !this.Checker()) ||
      ((e = {
        Attacker: e.Attacker,
        Victim: e.Target,
        SkillID: e.SkillId,
        SkillType: e.SkillGenre,
        BulletID: Number(e.BulletId),
        CounterType: e.CounterAttackType,
      }),
      this.Formula.Evaluate(e) && this?.Callback(this.Formula.Params, e));
  }
}
class HitTriggerIncludingVision extends Trigger {
  constructor() {
    super(...arguments),
      (this.TargetType = 0),
      (this.OnEvent = (e, t) => {
        (this.Checker && !this.Checker()) ||
          ((t = {
            Attacker: t.Attacker,
            Victim: t.Target,
            SkillID: t.SkillId,
            SkillType: t.SkillGenre,
            BulletID: Number(t.BulletId),
            CounterType: t.CounterAttackType,
          }),
          this.Formula.Evaluate(t) && this?.Callback(this.Formula.Params, t));
      });
  }
  OnInitParams(e) {
    this.TargetType = Number(e[0] ?? 0);
  }
  GetEventTarget() {
    switch (this.TargetType) {
      case 0:
        return this.OwnerTriggerComp?.Entity;
      case 1:
        return SceneTeamEvent_1.SceneTeam.Local;
      case 2:
        return SceneTeamEvent_1.SceneTeam.All;
    }
  }
  OnActive() {
    var e = this.GetEventTarget();
    e &&
      !EventSystem_1.EventSystem.HasWithTarget(
        e,
        EventDefine_1.EEventName.CharHitIncludingVision,
        this.OnEvent,
      ) &&
      EventSystem_1.EventSystem.AddWithTarget(
        e,
        EventDefine_1.EEventName.CharHitIncludingVision,
        this.OnEvent,
      );
  }
  OnInactive() {
    var e = this.GetEventTarget();
    e &&
      EventSystem_1.EventSystem.HasWithTarget(
        e,
        EventDefine_1.EEventName.CharHitIncludingVision,
        this.OnEvent,
      ) &&
      EventSystem_1.EventSystem.RemoveWithTarget(
        e,
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
      (this.OnEvent = (e, t, i) => {
        (this.Checker && !this.Checker()) ||
          (this.Formula.Evaluate((t = { NewValue: t, OldValue: i })) &&
            this.Callback &&
            this.Callback(this.Formula.Params, t));
      });
  }
  OnInitParams(e) {
    (this.TargetType = Number(e[0] ?? 0)),
      (this.AttributeId = Number(e[1] ?? 0));
  }
  OnActive() {
    var e, t;
    0 === this.TargetType &&
      (e = this.OwnerTriggerComp.Entity.GetComponent(159)) &&
      ((t = e.GetCurrentValue(this.AttributeId)),
      this.OnEvent(this.AttributeId, t, t),
      e.AddListener(this.AttributeId, this.OnEvent));
  }
  OnInactive() {
    0 === this.TargetType &&
      this.OwnerTriggerComp?.Entity.GetComponent(159)?.RemoveListener(
        this.AttributeId,
        this.OnEvent,
      );
  }
}
class TeamAttributeChangedTrigger extends Trigger {
  constructor() {
    super(...arguments),
      (this.AttributeId = 1),
      (this.OnEvent = (e, t, i) => {
        (this.Checker && !this.Checker()) ||
          ((t = {
            NewValue: t,
            OldValue: i,
            MaxValue:
              FormationAttributeController_1.FormationAttributeController.GetMax(
                e,
              ),
          }),
          this.Formula.Evaluate(t) &&
            this.Callback &&
            this.Callback(this.Formula.Params, t));
      });
  }
  OnInitParams(e) {
    this.AttributeId = Number(e[0] ?? 0);
  }
  OnActive() {
    var e =
      FormationAttributeController_1.FormationAttributeController.GetValue(
        this.AttributeId,
      );
    this.OnEvent(this.AttributeId, e, e),
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
      (this.TagId = 0),
      (this.OnEvent = (e, t) => {
        var i;
        (this.Checker && !this.Checker()) ||
          ((i = {}),
          t !== this.CheckRemove &&
            this.Formula.Evaluate(i) &&
            this?.Callback(this.Formula.Params, i));
      });
  }
  OnInitParams(e) {
    (this.TagId = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(
      e[0].trim(),
    )),
      void 0 === this.TagId &&
        CombatLog_1.CombatLog.Error(
          "PassiveSkill",
          this.OwnerTriggerComp?.Entity,
          "被动技能的tag找不到对应的tagId",
          ["tag", e[1]],
        ),
      (this.CheckRemove = !!Number(e[1] ?? 0));
  }
  OnActive() {
    void 0 !== this.TagId &&
      this.OwnerTriggerComp?.Entity.GetComponent(
        190,
      )?.AddTagAddOrRemoveListener(this.TagId, this.OnEvent);
  }
  OnInactive() {
    void 0 !== this.TagId &&
      this.OwnerTriggerComp?.Entity.GetComponent(
        190,
      )?.RemoveTagAddOrRemoveListener(this.TagId, this.OnEvent);
  }
}
class LimitDodgeTrigger extends Trigger {
  constructor() {
    super(...arguments),
      (this.TargetType = 0),
      (this.OnEvent = (e, t, i, s) => {
        (this.Checker && !this.Checker()) ||
          ((t = {
            Attacker: e,
            Victim: t,
            SkillID: i,
            SkillType: EntitySystem_1.EntitySystem.Get(e.Id)
              ?.GetComponent(34)
              ?.GetSkillInfo(i)?.SkillGenre,
            BulletID: s,
          }),
          this.Formula.Evaluate(t) && this?.Callback(this.Formula.Params, t));
      });
  }
  OnInitParams(e) {
    this.TargetType = Number(e[0] ?? 0);
  }
  OnActive() {
    let e = void 0;
    switch (this.TargetType) {
      case 0:
        e = this.OwnerTriggerComp?.Entity;
        break;
      case 1:
        e = SceneTeamEvent_1.SceneTeam.Local;
        break;
      case 2:
        e = SceneTeamEvent_1.SceneTeam.All;
    }
    e &&
      !EventSystem_1.EventSystem.HasWithTarget(
        e,
        EventDefine_1.EEventName.CharLimitDodge,
        this.OnEvent,
      ) &&
      EventSystem_1.EventSystem.AddWithTarget(
        e,
        EventDefine_1.EEventName.CharLimitDodge,
        this.OnEvent,
      );
  }
  OnInactive() {
    let e = void 0;
    switch (this.TargetType) {
      case 0:
        e = this.OwnerTriggerComp?.Entity;
        break;
      case 1:
        e = SceneTeamEvent_1.SceneTeam.Local;
        break;
      case 2:
        e = SceneTeamEvent_1.SceneTeam.All;
    }
    e &&
      EventSystem_1.EventSystem.HasWithTarget(
        e,
        EventDefine_1.EEventName.CharLimitDodge,
        this.OnEvent,
      ) &&
      EventSystem_1.EventSystem.RemoveWithTarget(
        e,
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
      (this.OnSelfEvent = (e, t) => {
        if (
          (!this.Checker || this.Checker()) &&
          !(this.SkillId && 0 <= this.SkillId && t !== this.SkillId)
        ) {
          var i = EntitySystem_1.EntitySystem.Get(e)
            ?.GetComponent(34)
            ?.GetSkillInfo(t);
          if (i) {
            var s = [];
            for (let e = 0; e < i.SkillTag.Num(); e++) {
              var n = i?.SkillTag.Get(e)?.TagName;
              void 0 !== n && s.push(n);
            }
            e = { SkillType: i?.SkillGenre, SkillTags: s, SkillID: t };
            this.Formula.Evaluate(e) &&
              this.Callback &&
              this.Callback(this.Formula.Params, e);
          }
        }
      });
  }
  OnInitParams(e) {
    (this.TargetType = Number(e[0] ?? 0)),
      (this.SkillId = Number(e[1] ?? 0)),
      (this.CheckEnd = !!Number(e[2] ?? 0));
  }
  OnActive() {
    let e = void 0;
    switch (this.TargetType) {
      case 0:
        e = this.OwnerTriggerComp?.Entity;
        break;
      case 1:
        e = SceneTeamEvent_1.SceneTeam.Local;
        break;
      case 2:
        e = SceneTeamEvent_1.SceneTeam.All;
    }
    e &&
      (this.CheckEnd
        ? EventSystem_1.EventSystem.HasWithTarget(
            e,
            EventDefine_1.EEventName.OnSkillEnd,
            this.OnSelfEvent,
          ) ||
          EventSystem_1.EventSystem.AddWithTarget(
            e,
            EventDefine_1.EEventName.OnSkillEnd,
            this.OnSelfEvent,
          )
        : (EventSystem_1.EventSystem.HasWithTarget(
            e,
            EventDefine_1.EEventName.CharUseSkill,
            this.OnSelfEvent,
          ) ||
            EventSystem_1.EventSystem.AddWithTarget(
              e,
              EventDefine_1.EEventName.CharUseSkill,
              this.OnSelfEvent,
            ),
          EventSystem_1.EventSystem.HasWithTarget(
            e,
            EventDefine_1.EEventName.CharUseSkillRemote,
            this.OnSelfEvent,
          ) ||
            EventSystem_1.EventSystem.AddWithTarget(
              e,
              EventDefine_1.EEventName.CharUseSkillRemote,
              this.OnSelfEvent,
            )));
  }
  OnInactive() {
    let e = void 0;
    switch (this.TargetType) {
      case 0:
        e = this.OwnerTriggerComp?.Entity;
        break;
      case 1:
        e = SceneTeamEvent_1.SceneTeam.Local;
        break;
      case 2:
        e = SceneTeamEvent_1.SceneTeam.All;
    }
    e &&
      (this.CheckEnd
        ? EventSystem_1.EventSystem.HasWithTarget(
            e,
            EventDefine_1.EEventName.OnSkillEnd,
            this.OnSelfEvent,
          ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            e,
            EventDefine_1.EEventName.OnSkillEnd,
            this.OnSelfEvent,
          )
        : EventSystem_1.EventSystem.HasWithTarget(
            e,
            EventDefine_1.EEventName.CharUseSkill,
            this.OnSelfEvent,
          ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            e,
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
      (this.OnEvent = (e, t, i, s, n) => {
        (this.Checker && !this.Checker()) ||
          (s.CalculateType === this.CalculateType &&
            ((e = {
              Attacker: e,
              Victim: t,
              DamageID: s.Id,
              SkillID: n?.SkillId ?? 0,
              SkillType: n?.SkillGenre,
              DamageType: s.Type,
              DamageSubType: s.SubType,
              ElementType: s.Element,
              DamageValue: -i,
              IsCritical: n.IsCritical,
            }),
            this.Formula.Evaluate(e)) &&
            this?.Callback(this.Formula.Params, e));
      });
  }
  OnInitParams(e) {
    (this.TargetType = Number(e[0] ?? 0)),
      (this.CalculateType = Number(e[1] ?? 0));
  }
  OnActive() {
    let e = void 0;
    switch (this.TargetType) {
      case 0:
        e = this.OwnerTriggerComp?.Entity;
        break;
      case 1:
        e = SceneTeamEvent_1.SceneTeam.Local;
        break;
      case 2:
        e = SceneTeamEvent_1.SceneTeam.All;
    }
    e &&
      !EventSystem_1.EventSystem.HasWithTarget(
        e,
        EventDefine_1.EEventName.CharDamage,
        this.OnEvent,
      ) &&
      EventSystem_1.EventSystem.AddWithTarget(
        e,
        EventDefine_1.EEventName.CharDamage,
        this.OnEvent,
      );
  }
  OnInactive() {
    let e = void 0;
    switch (this.TargetType) {
      case 0:
        e = this.OwnerTriggerComp?.Entity;
        break;
      case 1:
        e = SceneTeamEvent_1.SceneTeam.Local;
        break;
      case 2:
        e = SceneTeamEvent_1.SceneTeam.All;
    }
    e &&
      EventSystem_1.EventSystem.HasWithTarget(
        e,
        EventDefine_1.EEventName.CharDamage,
        this.OnEvent,
      ) &&
      EventSystem_1.EventSystem.RemoveWithTarget(
        e,
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
      (this.OnEvent = (e, t, i, s, n) => {
        var r, h;
        (this.Checker && !this.Checker()) ||
          (s.CalculateType === this.CalculateType &&
            this.OwnerTriggerComp?.Entity.Valid &&
            ((h =
              this.OwnerTriggerComp?.Entity.GetComponent(
                3,
              )?.ActorLocationProxy),
            (r = t.GetComponent(3)?.ActorLocationProxy),
            h) &&
            r &&
            (Vector_1.Vector.DistSquared(h, r) > this.DistSquared ||
              ((h = {
                Attacker: e,
                Victim: t,
                DamageID: s.Id,
                SkillID: n?.SkillId ?? 0,
                SkillType: n?.SkillGenre,
                DamageType: s.Type,
                DamageSubType: s.SubType,
                ElementType: s.Element,
                DamageValue: -i,
                IsCritical: n.IsCritical,
              }),
              this.Formula.Evaluate(h) &&
                this?.Callback(this.Formula.Params, h))));
      });
  }
  OnInitParams(e) {
    this.CalculateType = Number(e[0] ?? 0);
    e = Number(e[1] ?? 0);
    this.DistSquared = e * e;
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
      (this.OnEvent = (e, t, i, s, n) => {
        (this.Checker && !this.Checker()) ||
          (s.CalculateType === this.CalculateType &&
            ((e = {
              Attacker: e,
              Victim: t,
              DamageID: s.Id,
              SkillID: n?.SkillId ?? 0,
              SkillType: n?.SkillGenre,
              DamageType: s.Type,
              DamageSubType: s.SubType,
              ElementType: s.Element,
              DamageValue: -i,
              IsCritical: n.IsCritical,
            }),
            this.Formula.Evaluate(e)) &&
            this?.Callback(this.Formula.Params, e));
      });
  }
  OnInitParams(e) {
    (this.TargetType = Number(e[0] ?? 0)),
      (this.CalculateType = Number(e[1] ?? 0));
  }
  OnActive() {
    let e = void 0;
    switch (this.TargetType) {
      case 0:
        e = this.OwnerTriggerComp?.Entity;
        break;
      case 1:
        e = SceneTeamEvent_1.SceneTeam.Local;
        break;
      case 2:
        e = SceneTeamEvent_1.SceneTeam.All;
    }
    e &&
      !EventSystem_1.EventSystem.HasWithTarget(
        e,
        EventDefine_1.EEventName.CharBeDamage,
        this.OnEvent,
      ) &&
      EventSystem_1.EventSystem.AddWithTarget(
        e,
        EventDefine_1.EEventName.CharBeDamage,
        this.OnEvent,
      );
  }
  OnInactive() {
    let e = void 0;
    switch (this.TargetType) {
      case 0:
        e = this.OwnerTriggerComp?.Entity;
        break;
      case 1:
        e = SceneTeamEvent_1.SceneTeam.Local;
        break;
      case 2:
        e = SceneTeamEvent_1.SceneTeam.All;
    }
    e &&
      EventSystem_1.EventSystem.HasWithTarget(
        e,
        EventDefine_1.EEventName.CharBeDamage,
        this.OnEvent,
      ) &&
      EventSystem_1.EventSystem.RemoveWithTarget(
        e,
        EventDefine_1.EEventName.CharBeDamage,
        this.OnEvent,
      );
  }
}
class GameplayEventTrigger extends Trigger {
  constructor() {
    super(...arguments),
      (this.TagId = 0),
      (this.OnEvent = (e) => {
        var t;
        (this.Checker && !this.Checker()) ||
          (this.Formula.Evaluate((t = {})) &&
            this?.Callback(this.Formula.Params, t));
      });
  }
  OnInitParams(e) {
    (this.TagId = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(
      e[0].trim(),
    )),
      void 0 === this.TagId &&
        CombatLog_1.CombatLog.Error(
          "PassiveSkill",
          this.OwnerTriggerComp?.Entity,
          "被动技能的GameplayEvent找不到对应的tagId",
          ["GameplayEvent", e[1]],
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
      (this.OnEvent = (e, t) => {
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
          t = {
            GoBattleEntity: EntitySystem_1.EntitySystem.Get(e),
            GoDownEntity: EntitySystem_1.EntitySystem.Get(t),
          };
          this.Formula.Evaluate(t) && this?.Callback(this.Formula.Params, t);
        }
      });
  }
  OnInitParams(e) {
    this.TargetType = Number(e[0] ?? 0);
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
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.CharExecuteMultiQte,
          this.OnEvent,
        );
  }
}
class QteGoDownTrigger extends Trigger {
  constructor() {
    super(...arguments),
      (this.TargetType = 0),
      (this.OnEvent = (e, t) => {
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
          e = {
            GoBattleEntity: EntitySystem_1.EntitySystem.Get(e),
            GoDownEntity: EntitySystem_1.EntitySystem.Get(t),
          };
          this.Formula.Evaluate(e) && this?.Callback(this.Formula.Params, e);
        }
      });
  }
  OnInitParams(e) {
    this.TargetType = Number(e[0] ?? 0);
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
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.CharExecuteMultiQte,
          this.OnEvent,
        );
  }
}
//# sourceMappingURL=Trigger.js.map
