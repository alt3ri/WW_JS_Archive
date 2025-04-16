"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, r, i) {
    var o,
      n = arguments.length,
      s =
        n < 3
          ? t
          : null === i
            ? (i = Object.getOwnPropertyDescriptor(t, r))
            : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      s = Reflect.decorate(e, t, r, i);
    else
      for (var l = e.length - 1; 0 <= l; l--)
        (o = e[l]) && (s = (n < 3 ? o(s) : 3 < n ? o(t, r, s) : o(t, r)) || s);
    return 3 < n && s && Object.defineProperty(t, r, s), s;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterSkillTriggerComponent = void 0);
const EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
  CombatLog_1 = require("../../../../../Utils/CombatLog"),
  TriggerType_1 = require("../Abilities/Trigger/TriggerType");
let CharacterSkillTriggerComponent = class CharacterSkillTriggerComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments), (this.cBe = void 0), (this.dHs = void 0);
  }
  OnInit() {
    return (
      (this.cBe = this.Entity.CheckGetComponent(38)),
      (this.dHs = this.Entity.CheckGetComponent(28)),
      !0
    );
  }
  OnStart() {
    return !0;
  }
  OnActivate() {
    for (const t of this.cBe.GetAllSkillData()) {
      var e = this.cBe.GetSkillInfo(t);
      this.pVs(t, e);
    }
    return !0;
  }
  OnEnd() {
    return !0;
  }
  pVs(r, t) {
    if (t)
      for (let e = 0; e < t.SkillTriggers.Num(); e++) {
        var i = t.SkillTriggers.Get(e);
        if (i.TriggerType in TriggerType_1.ETriggerEvent) {
          var o,
            n = [];
          if (i.TriggerPreset)
            for (let e = 0; e < i.TriggerPreset.Num(); e++)
              n.push(i.TriggerPreset.Get(e));
          TriggerType_1.ETriggerEvent[i.TriggerType] ===
          TriggerType_1.ETriggerEvent.GlobalDamageTrigger
            ? CombatLog_1.CombatLog.Error(
                "Skill",
                this.Entity,
                "禁止白名单之外的技能使用全局伤害监听",
                ["skillId", r],
              )
            : ((o = this.dHs.AddTrigger(
                {
                  Type: i.TriggerType,
                  Preset: n,
                  Params: i.TriggerParams || "{}",
                  Formula: i.TriggerFormula || "TRUE",
                },
                (e, t) => {
                  this.cBe.BeginSkill(r, { Reason: "技能触发器触发" });
                },
              )),
              this.dHs.SetTriggerActive(o, !0));
        } else
          CombatLog_1.CombatLog.Error(
            "Skill",
            this.Entity,
            "技能触发器类型不合法",
            ["技能Id", r],
            ["触发器类型", i.TriggerType],
          );
      }
  }
  AddSkillTriggerDebug(e, t) {
    this.pVs(e, t);
  }
};
(CharacterSkillTriggerComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(206)],
  CharacterSkillTriggerComponent,
)),
  (exports.CharacterSkillTriggerComponent = CharacterSkillTriggerComponent);
//# sourceMappingURL=CharacterSkillTriggerComponent.js.map
