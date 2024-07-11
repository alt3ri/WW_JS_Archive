"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, r, i) {
    var o,
      s = arguments.length,
      n =
        s < 3
          ? t
          : null === i
            ? (i = Object.getOwnPropertyDescriptor(t, r))
            : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      n = Reflect.decorate(e, t, r, i);
    else
      for (var a = e.length - 1; 0 <= a; a--)
        (o = e[a]) && (n = (s < 3 ? o(n) : 3 < s ? o(t, r, n) : o(t, r)) || n);
    return 3 < s && n && Object.defineProperty(t, r, n), n;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterSkillTriggerComponent = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  CombatLog_1 = require("../../../../../Utils/CombatLog"),
  TriggerType_1 = require("../Abilities/Trigger/TriggerType");
let CharacterSkillTriggerComponent = class CharacterSkillTriggerComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.cBe = void 0),
      (this.EIe = void 0),
      (this.iHs = void 0);
  }
  OnInit() {
    return (
      (this.cBe = this.Entity.CheckGetComponent(33)),
      (this.EIe = this.Entity.CheckGetComponent(0)),
      (this.iHs = this.Entity.CheckGetComponent(25)),
      !0
    );
  }
  OnStart() {
    return this.dVs(), !0;
  }
  OnEnd() {
    return !0;
  }
  dVs() {
    if (this.cBe.DtSkillInfo) {
      var e = (0, puerts_1.$ref)(void 0),
        t =
          (UE.DataTableFunctionLibrary.GetDataTableRowNames(
            this.cBe.DtSkillInfo,
            e,
          ),
          (0, puerts_1.$unref)(e));
      for (let e = 0; e < t.Num(); e++) {
        var r = Number(t.Get(e).toString()),
          i = this.cBe.GetSkillInfo(r);
        this.CVs(r, i);
      }
    }
    let o = [];
    switch (this.EIe.GetEntityType()) {
      case Protocol_1.Aki.Protocol.wks.Proto_Player:
        o =
          ConfigManager_1.ConfigManager.WorldConfig.GetRoleCommonSkillRowNames();
        break;
      case Protocol_1.Aki.Protocol.wks.Proto_Vision:
        o =
          ConfigManager_1.ConfigManager.WorldConfig.GetVisionCommonSkillRowNames();
        break;
      case Protocol_1.Aki.Protocol.wks.Proto_Monster:
        o =
          ConfigManager_1.ConfigManager.WorldConfig.GetMonsterCommonSkillRowNames();
    }
    for (const h of o) {
      var s = Number(h),
        n = this.cBe.GetSkillInfo(s);
      this.CVs(s, n);
    }
    if (this.cBe.DtSkillInfoExtra) {
      var e = (0, puerts_1.$ref)(void 0),
        a =
          (UE.DataTableFunctionLibrary.GetDataTableRowNames(
            this.cBe.DtSkillInfoExtra,
            e,
          ),
          (0, puerts_1.$unref)(e));
      for (let e = 0; e < a.Num(); e++) {
        var l = Number(a.Get(e).toString()),
          g = this.cBe.GetSkillInfo(l);
        this.CVs(l, g);
      }
    }
  }
  CVs(r, t) {
    if (t)
      for (let e = 0; e < t.SkillTriggers.Num(); e++) {
        var i,
          o = t.SkillTriggers.Get(e),
          s = [];
        if (o.TriggerPreset)
          for (let e = 0; e < o.TriggerPreset.Num(); e++)
            s.push(o.TriggerPreset.Get(e));
        TriggerType_1.ETriggerEvent[o.TriggerType] ===
        TriggerType_1.ETriggerEvent.GlobalDamageTrigger
          ? CombatLog_1.CombatLog.Error(
              "Skill",
              this.Entity,
              "禁止白名单之外的技能使用全局伤害监听",
              ["skillId", r],
            )
          : ((i = this.iHs.AddTrigger(
              {
                Type: o.TriggerType,
                Preset: s,
                Params: o.TriggerParams || "{}",
                Formula: o.TriggerFormula || "TRUE",
              },
              (e, t) => {
                this.cBe.BeginSkill(r, { Context: "技能触发器触发" });
              },
            )),
            this.iHs.SetTriggerActive(i, !0));
      }
  }
  AddSkillTriggerDebug(e, t) {
    this.CVs(e, t);
  }
};
(CharacterSkillTriggerComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(191)],
  CharacterSkillTriggerComponent,
)),
  (exports.CharacterSkillTriggerComponent = CharacterSkillTriggerComponent);
//# sourceMappingURL=CharacterSkillTriggerComponent.js.map
