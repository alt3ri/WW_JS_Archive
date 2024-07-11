"use strict";
let CharacterGasDebugComponent_1;
const __decorate =
  (this && this.__decorate) ||
  function (t, e, r, a) {
    let i;
    const n = arguments.length;
    let o =
      n < 3 ? e : a === null ? (a = Object.getOwnPropertyDescriptor(e, r)) : a;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      o = Reflect.decorate(t, e, r, a);
    else
      for (let s = t.length - 1; s >= 0; s--)
        (i = t[s]) && (o = (n < 3 ? i(o) : n > 3 ? i(e, r, o) : i(e, r)) || o);
    return n > 3 && o && Object.defineProperty(e, r, o), o;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterGasDebugComponent = void 0);
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const Time_1 = require("../../../../../../Core/Common/Time");
const PriorityQueue_1 = require("../../../../../../Core/Container/PriorityQueue");
const DamageById_1 = require("../../../../../../Core/Define/ConfigQuery/DamageById");
const FormationPropertyAll_1 = require("../../../../../../Core/Define/ConfigQuery/FormationPropertyAll");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent");
const EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const Net_1 = require("../../../../../../Core/Net/Net");
const GameplayTagUtils_1 = require("../../../../../../Core/Utils/GameplayTagUtils");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const StringBuilder_1 = require("../../../../../../Core/Utils/StringBuilder");
const StringUtils_1 = require("../../../../../../Core/Utils/StringUtils");
const TestModuleBridge_1 = require("../../../../../Bridge/TestModuleBridge");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const PublicUtil_1 = require("../../../../../Common/PublicUtil");
const Global_1 = require("../../../../../Global");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const FormationAttributeController_1 = require("../../../../../Module/Abilities/FormationAttributeController");
const CombatMessage_1 = require("../../../../../Module/CombatMessage/CombatMessage");
const AbilityUtils_1 = require("./AbilityUtils");
const CharacterAttributeTypes_1 = require("./CharacterAttributeTypes");
const CharacterBuffController_1 = require("./CharacterBuffController");
const CharacterStatisticsComponent_1 = require("./CharacterStatisticsComponent");
const CharacterUnifiedStateTypes_1 = require("./CharacterUnifiedStateTypes");
let ESkillGenreName;
let EMovementModeName;
const EAttributeId = Protocol_1.Aki.Protocol.KBs;
const MAX_DEBUG_STRING_NUMS = 50;
!(function (t) {
  (t[(t["普攻"] = 0)] = "普攻"),
    (t[(t["蓄力"] = 1)] = "蓄力"),
    (t[(t["E技能"] = 2)] = "E技能"),
    (t[(t["大招"] = 3)] = "大招"),
    (t[(t.QTE = 4)] = "QTE"),
    (t[(t["极限闪避反击"] = 5)] = "极限闪避反击"),
    (t[(t["地面闪避"] = 6)] = "地面闪避"),
    (t[(t["极限闪避"] = 7)] = "极限闪避"),
    (t[(t["被动技能"] = 8)] = "被动技能"),
    (t[(t["战斗幻想技"] = 9)] = "战斗幻想技"),
    (t[(t["探索幻象技"] = 10)] = "探索幻象技"),
    (t[(t["空中闪避"] = 11)] = "空中闪避");
})((ESkillGenreName = ESkillGenreName || {})),
  (function (t) {
    (t[(t.MOVE_None = 0)] = "MOVE_None"),
      (t[(t.MOVE_Walking = 1)] = "MOVE_Walking"),
      (t[(t.MOVE_NavWalking = 2)] = "MOVE_NavWalking"),
      (t[(t.MOVE_Falling = 3)] = "MOVE_Falling"),
      (t[(t.MOVE_Swimming = 4)] = "MOVE_Swimming"),
      (t[(t.MOVE_Flying = 5)] = "MOVE_Flying"),
      (t[(t.MOVE_Custom = 6)] = "MOVE_Custom"),
      (t[(t.MOVE_MAX = 7)] = "MOVE_MAX");
  })((EMovementModeName = EMovementModeName || {}));
class RecordMoveSum {
  constructor() {
    (this.Name = ""),
      (this.ConfigId = 0),
      (this.TargetUniqueId = 0),
      (this.RecordNum = new Map());
  }
  ToCsv() {
    const e = new Array();
    e.push(this.ConfigId.toFixed()),
      e.push(this.Name),
      e.push(this.TargetUniqueId.toFixed());
    for (let t = 0; t < 14; t++) {
      const r = this.RecordNum.get(t);
      e.push(r ? r.toFixed() : "0");
    }
    return e;
  }
}
class RecordDamageSum {
  constructor() {
    (this.ConfigId = 0),
      (this.Name = ""),
      (this.UniqueId = 0),
      (this.DamageSourceConfigId = 0),
      (this.SourceName = ""),
      (this.SourceUniqueId = 0),
      (this.TotalDamage = 0),
      (this.RecordDamage = new Map());
  }
  ToCsvForRole() {
    const e = new Array();
    e.push(this.ConfigId.toFixed()),
      e.push(this.Name),
      e.push(this.DamageSourceConfigId.toFixed()),
      e.push(this.SourceName),
      e.push(this.SourceUniqueId.toFixed()),
      e.push(this.TotalDamage.toFixed());
    for (let t = 0; t < 14; t++) {
      const r = this.RecordDamage.get(t);
      e.push(r ? r.toFixed() : "0");
    }
    return e;
  }
  ToCsvForMonster() {
    const e = new Array();
    e.push(this.ConfigId.toFixed()),
      e.push(this.Name),
      e.push(this.UniqueId.toFixed()),
      e.push(this.DamageSourceConfigId.toFixed()),
      e.push(this.SourceName),
      e.push(this.TotalDamage.toFixed());
    for (let t = 0; t < 14; t++) {
      const r = this.RecordDamage.get(t);
      e.push(r ? r.toFixed() : "0");
    }
    return e;
  }
}
class DamageRecordDsp {
  constructor(t, e, r, a, i, n) {
    (this.TimeStamp = t),
      (this.DamageValue = e),
      (this.QteBegin = r),
      (this.InGame = a),
      (this.OutGame = i),
      (this.OutGameSkill = n);
  }
}
const attributeIdArray = [
  EAttributeId.Proto_Life,
  EAttributeId.Tkn,
  EAttributeId.Proto_Atk,
  EAttributeId.Proto_Crit,
  EAttributeId.Proto_CritDamage,
  EAttributeId.Proto_Def,
  EAttributeId.Proto_EnergyEfficiency,
  EAttributeId.Proto_EnergyMax,
  EAttributeId.Proto_Energy,
  EAttributeId.Proto_AutoAttackSpeed,
  EAttributeId.Proto_CastAttackSpeed,
  EAttributeId.Proto_DamageChangeNormalSkill,
  EAttributeId.Proto_DamageChange,
  EAttributeId.Proto_DamageChangePhantom,
  EAttributeId.Proto_DamageChangeAuto,
  EAttributeId.Proto_DamageChangeCast,
  EAttributeId.Proto_DamageChangeUltra,
  EAttributeId.Proto_DamageChangeQte,
  EAttributeId.Proto_DamageChangePhys,
  EAttributeId.Proto_DamageChangeElement1,
  EAttributeId.Proto_DamageChangeElement2,
  EAttributeId.Proto_DamageChangeElement3,
  EAttributeId.Proto_DamageChangeElement4,
  EAttributeId.Proto_DamageChangeElement5,
  EAttributeId.Proto_DamageChangeElement6,
  EAttributeId.Proto_DamageResistancePhys,
  EAttributeId.Proto_DamageResistanceElement1,
  EAttributeId.Proto_DamageResistanceElement2,
  EAttributeId.Proto_DamageResistanceElement3,
  EAttributeId.Proto_DamageResistanceElement4,
  EAttributeId.Proto_DamageResistanceElement5,
  EAttributeId.Proto_DamageResistanceElement6,
  EAttributeId.Proto_HealChange,
  EAttributeId.Proto_HealedChange,
  EAttributeId.Proto_DamageReduce,
  EAttributeId.Proto_DamageReducePhys,
  EAttributeId.Proto_DamageReduceElement1,
  EAttributeId.Proto_DamageReduceElement2,
  EAttributeId.Proto_DamageReduceElement3,
  EAttributeId.Proto_DamageReduceElement4,
  EAttributeId.Proto_DamageReduceElement5,
  EAttributeId.Proto_DamageReduceElement6,
  EAttributeId.Proto_ToughMax,
  EAttributeId.Proto_Tough,
  EAttributeId.Proto_ToughRecover,
  EAttributeId.Proto_ToughChange,
  EAttributeId.Proto_ToughReduce,
  EAttributeId.Proto_RageMax,
  EAttributeId.Proto_Rage,
  EAttributeId.Proto_RageRecover,
  EAttributeId.Proto_RagePunishTime,
  EAttributeId.Proto_RageChange,
  EAttributeId.Proto_RageReduce,
  EAttributeId.Proto_HardnessMax,
  EAttributeId.Proto_Hardness,
  EAttributeId.Proto_HardnessRecover,
  EAttributeId.Proto_HardnessPunishTime,
  EAttributeId.Proto_HardnessChange,
  EAttributeId.Proto_HardnessReduce,
];
let CharacterGasDebugComponent =
  (CharacterGasDebugComponent_1 = class CharacterGasDebugComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.sGr = void 0),
        (this.EnableCollisionDebugDraw = !1),
        (this.aGr = 0),
        (this.hGr = void 0),
        (this.lGr = new Array()),
        (this._Gr = (t) => {
          t.includes("Tag") ||
            ((this.aGr = this.aGr + 1),
            this.lGr.unshift("Num " + this.aGr + ": " + t),
            this.lGr.length > MAX_DEBUG_STRING_NUMS && this.lGr.pop());
        }),
        (this.uGr = new Array()),
        (this.cGr = new Array()),
        (this.mGr = (t, e, r, a, i) => {
          this.dGr.unshift(
            EMovementModeName[e] +
              "." +
              a.toFixed() +
              " ->" +
              EMovementModeName[r] +
              "." +
              i.toFixed(),
          );
        }),
        (this.CGr = (t, e) => {
          this.dGr.unshift(
            CharacterUnifiedStateTypes_1.ECharMoveState[t] +
              " ->" +
              CharacterUnifiedStateTypes_1.ECharMoveState[e],
          );
        }),
        (this.gGr = (t, e) => {
          this.dGr.unshift(
            CharacterUnifiedStateTypes_1.ECharPositionState[t] +
              " ->" +
              CharacterUnifiedStateTypes_1.ECharPositionState[e],
          );
        }),
        (this.fGr = (t) => {
          this.dGr.unshift("Set NewBeHit:" + t);
        }),
        (this.dGr = new Array()),
        (this.pGr = (t) => {
          if (CharacterGasDebugComponent_1.vGr) {
            let e = t.Attacker;
            if (this.MGr(e)) {
              const r = new Array();
              let a =
                (r.push(CharacterGasDebugComponent_1.SecondsSinceStartup()),
                r.push(CharacterGasDebugComponent_1.SGr(Date.now())),
                e.GetComponent(0));
              let i = a.GetEntityType();
              if (i === Protocol_1.Aki.Protocol.HBs.Proto_Player) {
                r.push("角色"), r.push(a.GetPbDataId().toFixed());
                var n = a.Valid ? a.GetRoleId() : 0;
                var n =
                  ModelManager_1.ModelManager.RoleModel.GetRoleDataById(
                    n,
                  )?.GetRoleId() ?? 0;
                if (!n) return;
                (n = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(n)),
                  (n = n
                    ? ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(
                        n.Name,
                      )
                    : "");
                r.push(n);
              } else {
                if (i !== Protocol_1.Aki.Protocol.HBs.Proto_Monster) return;
                r.push("怪物"), r.push(a.GetPbDataId().toFixed());
                n = PublicUtil_1.PublicUtil.GetConfigTextByKey(
                  a.GetBaseInfo()?.TidName ?? "",
                );
                r.push(n);
              }
              r.push(t.BulletRowName);
              (i = t.BulletDataMain),
                (a =
                  (r.push(i?.BulletName ?? "0"),
                  r.push(i.Base.DamageId.toString()),
                  t.BulletInitParams.SkillId)),
                (n = (r.push(a ? a.toFixed() : ""), e.GetComponent(33))),
                (i = a ? n.GetSkillInfo(a) : void 0),
                (e =
                  (r.push(i ? ESkillGenreName[i.SkillGenre] : ""),
                  t.Entity.Id));
              CharacterGasDebugComponent_1.EGr.set(e, r),
                CharacterGasDebugComponent_1.yGr.push(e);
            }
          }
        }),
        (this.RecordMove = (t, e, r) => {
          let a, i, n;
          CharacterGasDebugComponent_1.vGr &&
            t?.Valid &&
            this.MGr(this.Entity) &&
            ((a = this.Entity),
            (i = new Array()).push(
              CharacterGasDebugComponent_1.SecondsSinceStartup(),
            ),
            i.push(CharacterGasDebugComponent_1.SGr(Date.now())),
            a?.GetComponent(83) ? i.push("角色") : i.push("怪物"),
            (n = a?.CheckGetComponent(0).GetPbDataId()),
            i.push(n.toFixed(0)),
            (n = a?.GetComponent(3).Actor.GetName()),
            i.push(n),
            i.push(e.toString()),
            i.push(ESkillGenreName[r]),
            (n = a.GetComponent(156)),
            i.push(n.GetCurrentValue(EAttributeId.Proto_Atk).toFixed()),
            i.push(n.GetCurrentValue(EAttributeId.Proto_Crit).toFixed()),
            i.push(n.GetCurrentValue(EAttributeId.Proto_CritDamage).toFixed()),
            i.push(n.GetCurrentValue(EAttributeId.Proto_Life).toFixed()),
            i.push(n.GetCurrentValue(EAttributeId.Proto_Def).toFixed()),
            i.push(
              n.GetCurrentValue(EAttributeId.Proto_DamageChange).toFixed(),
            ),
            CharacterGasDebugComponent_1.IGr.push(i.join(",")),
            CharacterGasDebugComponent_1.TGr(a, t.Entity, r));
        }),
        (this.LGr = void 0),
        (this.ServerDebugInfoDirty = !1),
        (this.DGr = (t, e) => {
          var e = this.Entity.GetComponent(33)?.GetSkillInfo(e);
          const r =
            (CharacterGasDebugComponent_1.RGr ||
              (CharacterGasDebugComponent_1.RGr = new Map()),
            this.Entity.Id);
          if (e.SkillGenre === 4) {
            let t = CharacterGasDebugComponent_1.RGr.get(r);
            t ||
              ((t = new PriorityQueue_1.PriorityQueue(
                CharacterGasDebugComponent_1.AGr,
              )),
              CharacterGasDebugComponent_1.RGr.set(r, t));
            var a = new DamageRecordDsp(
              Time_1.Time.WorldTimeSeconds - CharacterGasDebugComponent_1.UGr,
              -1,
              !0,
              !1,
              !1,
              !1,
            );
            t.Push(a);
          } else if (e.SkillGenre === 12) {
            let t = CharacterGasDebugComponent_1.RGr.get(r);
            t ||
              ((t = new PriorityQueue_1.PriorityQueue(
                CharacterGasDebugComponent_1.AGr,
              )),
              CharacterGasDebugComponent_1.RGr.set(r, t));
            a = new DamageRecordDsp(
              Time_1.Time.WorldTimeSeconds - CharacterGasDebugComponent_1.UGr,
              -1,
              !1,
              !1,
              !1,
              !0,
            );
            t.Push(a);
          }
        });
    }
    OnStart() {
      const t = this.Entity.GetComponent(3);
      return (
        (this.sGr = t?.Actor.AbilitySystemComponent),
        CharacterGasDebugComponent_1.PGr(),
        this.xGr(),
        this.wGr(),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharRecordOperate,
          this.RecordMove,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharUseSkill,
          this.DGr,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.BulletCreate,
          this.pGr,
        ),
        !0
      );
    }
    OnTick(t) {
      if (
        (CharacterGasDebugComponent_1.FEn &&
          Time_1.Time.Frame > CharacterGasDebugComponent_1.VEn &&
          ((CharacterGasDebugComponent_1.UGr += 0.001 * t),
          (CharacterGasDebugComponent_1.VEn = Time_1.Time.Frame)),
        this.EnableCollisionDebugDraw)
      ) {
        const e = this.Entity.GetComponent(3);
        if (e) {
          const r = e.Actor.K2_GetComponentsByClass(
            UE.CapsuleComponent.StaticClass(),
          );
          for (let t = 0; t < r.Num(); t++) {
            const a = r.Get(t);
            UE.KismetSystemLibrary.DrawDebugCapsule(
              e.Actor,
              a.K2_GetComponentLocation(),
              a.CapsuleHalfHeight,
              a.CapsuleRadius,
              a.K2_GetComponentRotation(),
              new UE.LinearColor(1, 1, 0, 1),
              0,
              1,
            );
          }
        }
      }
    }
    OnEnd() {
      return (
        this.hGr?.EndTask(),
        (this.hGr = void 0),
        this.BGr(),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharRecordOperate,
          this.RecordMove,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharUseSkill,
          this.DGr,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.BulletCreate,
          this.pGr,
        ),
        !0
      );
    }
    static PGr() {
      this.bGr ||
        ((this.bGr = !0),
        GameplayTagUtils_1.GameplayTagUtils.CheckGameplayTagIdUniqueness());
    }
    xGr() {
      this.sGr &&
        ((this.hGr =
          UE.AsyncTaskEffectDebugString.ListenForGameplayEffectExecutedDebugString(
            this.sGr,
          )),
        this.hGr?.OnAnyGameplayEffectExecuted.Add(this._Gr));
    }
    GetGeDebugStrings() {
      return this.lGr.join(" ");
    }
    GetTagDebugStrings() {
      return (
        this.Entity.GetComponent(185)?.TagContainer.GetDebugString() ??
        "找不到tag组件"
      );
    }
    GetTagContainerDebugString(e) {
      const r = e.GameplayTags?.Num() ?? 0;
      if (r <= 0) return "";
      let a = "";
      for (let t = 0; t < r; t++) a += e.GameplayTags.Get(t).TagName + " ";
      return a;
    }
    GetBuffEffectDebugString(t) {
      let e = "";
      for (const r of this.Entity.GetComponent(
        157,
      ).BuffEffectManager.GetAllEffects())
        this.qGr(t, String(r.BuffId)) &&
          (e += `${r.constructor.name} buffId:${r.BuffId} handle:${r.ActiveHandleId}\n`);
      return e;
    }
    GetShieldDebugString() {
      this.uGr.length = 0;
      let t = this.Entity.GetComponent(64);
      if (t)
        for (var [, e] of t.GetDebugShieldInfo()) {
          const r = e.ShieldValue;
          const a = e.Priority;
          var e = e.TemplateId;
          this.uGr.push(
            `Shield magnitude: ${r} priority: ${a} templateId: ` + e,
          );
        }
      t = this.Entity.GetComponent(156)?.GetLockDebugString() ?? "";
      return "\n\nShields:\n" + this.uGr.join("\n") + t;
    }
    GetAttributeDebugStrings() {
      const e = this.Entity.GetComponent(156);
      if (!e) return "Invalid";
      let r = "";
      for (let t = 1; t < CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX; t++) {
        const a = e.GetBaseValue(t);
        const i = e.GetCurrentValue(t);
        const n = Protocol_1.Aki.Protocol.KBs[t];
        CharacterAttributeTypes_1.stateAttributeIds.has(t) || i === a
          ? (r += `#${t} ${n}	= ${i.toFixed(0)}
`)
          : (r +=
              a < i
                ? `#${t} ${n}	= ${i.toFixed(0)}(+${(i - a).toFixed(0)})
`
                : `#${t} ${n}	= ${i.toFixed(0)}(${(i - a).toFixed(0)})
`);
      }
      return (r +=
        "\n队伍属性：\n" +
        CharacterGasDebugComponent_1.GetFormationAttributeDebugStrings());
    }

    GetAllAttributeDebugStrings() {
      this.cGr.length = 0;
      const e = this.Entity.GetComponent(156);
      for (let t = 1; t < CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX; t++) {
        const r = e.GetBaseValue(t);
        const a = e.GetCurrentValue(t);
        var i = Protocol_1.Aki.Protocol.KBs[t];
        var i = `Attribute ID: ${t}   ${i}  
    Base: ${r.toFixed()}    Current: ${a.toFixed()} 
`;
        this.cGr.push(i);
      }
      return this.cGr.join("\n");
    }

    static GetFormationAttributeDebugStrings() {
      let t = "";
      for (const n of FormationPropertyAll_1.configFormationPropertyAll.GetConfigList()) {
        const e = n.Id;
        const r =
          FormationAttributeController_1.FormationAttributeController.GetValue(
            e,
          );
        const a =
          FormationAttributeController_1.FormationAttributeController.GetMax(e);
        const i =
          FormationAttributeController_1.FormationAttributeController.GetSpeed(
            e,
          );
        t += `#${e} = ${r?.toFixed(0)}/${a?.toFixed(0)} (${i?.toFixed(0)}/s)
`;
      }
      return t;
    }

    GetAllAttributeDebugInfo() {
      const a = this.Entity.GetComponent(156);
      if (!a) return "Invalid";
      let i = "";
      const n = this.LGr?.dfs;
      const o = new Array(CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX);
      if (n) for (const d of n) o[d.Ugs] = d;
      for (let r = 1; r < CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX; r++) {
        const s = a.GetBaseValue(r);
        const u = a.GetCurrentValue(r);
        const h = u.toFixed(0);
        let t = (u - s).toFixed(0);
        s <= u && (t = "+" + t), (t = u === s ? "" : `(${t})`);
        const _ = Protocol_1.Aki.Protocol.KBs[r].replace("Proto_", "");
        const n = o[r];
        const C = n?.NFn.toFixed(0) ?? "0";
        let e = n ? (n.NFn - n.Pgs).toFixed(0) : "0";
        n && n.NFn > n.Pgs && (e = "+" + e),
          (e = n?.NFn === n?.Pgs ? "" : `(${e})`),
          CharacterAttributeTypes_1.stateAttributeIds.has(r) || u === s
            ? (i += `#${r} ${_}	 C:${h} | S:${C}
`)
            : (i += `#${r} ${_}	 C:${h}(${t}) | S:${C}(${e})
`);
      }
      i += "\n队伍属性：\n";
      const t = this.LGr?.qFn;
      const e = new Array();
      if (t) for (const D of t) e[D.OFn] = D;
      for (const p of FormationPropertyAll_1.configFormationPropertyAll.GetConfigList()) {
        const r = p.Id;
        const l =
          FormationAttributeController_1.FormationAttributeController.GetValue(
            r,
          );
        const c =
          FormationAttributeController_1.FormationAttributeController.GetMax(r);
        const g =
          FormationAttributeController_1.FormationAttributeController.GetSpeed(
            r,
          );
        const n = e[r];
        const f = n?.NFn.toFixed(0) ?? "???";
        const m = n?.kFn.toFixed(0) ?? "???";
        const b = n?.VFn.toFixed(0) ?? "???";
        i +=
          `#${r}	 C:${l?.toFixed(0)}/${c?.toFixed(0)} (${g?.toFixed(0)}/s)` +
          ` | S:${f}/${m} (${b}/s)
`;
      }
      return i;
    }

    wGr() {
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharMovementModeChanged,
        this.mGr,
      ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
          this.CGr,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnPositionStateChanged,
          this.gGr,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnSetNewBeHit,
          this.fGr,
        );
    }
    BGr() {
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharMovementModeChanged,
        this.mGr,
      ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
          this.CGr,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnPositionStateChanged,
          this.gGr,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnSetNewBeHit,
          this.fGr,
        );
    }
    GetAllMovementHistory() {
      return this.dGr.length > 50 && this.dGr.pop(), this.dGr.join("\n");
    }
    DebugResetBaseValue(t, e) {
      t >= EAttributeId.Proto_Lv &&
        t < CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX &&
        this.Entity.GetComponent(156).SetBaseValue(t, e);
    }
    static get IsServerLogOff() {
      return this.GGr;
    }
    static ReceiveSwitchServerLogMode(t) {
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Battle",
          20,
          "[CharacterAbilityComponent]Server switch Buff Mode",
          ["isClientControl", t],
        ),
        (this.GGr = t);
    }
    static RequestSwitchServerMode(t) {
      const e = Protocol_1.Aki.Protocol.vzn.create({
        u9n: t,
        c9n: Protocol_1.Aki.Protocol.kOs.oTs,
      });
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Battle",
          20,
          "[CharacterDamageComponent]Request Buff Mode",
          ["isClientControl", t],
        ),
        Net_1.Net.Call(17453, e, (t) => {
          this.ReceiveSwitchServerLogMode(t.u9n);
        });
    }
    static SecondsSinceStartup() {
      return (
        Time_1.Time.WorldTimeSeconds -
        CharacterGasDebugComponent_1.NGr -
        CharacterGasDebugComponent_1.UGr
      ).toFixed(2);
    }
    static SetDistanceMax(t) {}
    static BeginRecord() {
      (this.UGr = 0),
        (this.vGr = !0),
        (this.NGr = Time_1.Time.WorldTimeSeconds),
        (this.OGr = Time_1.Time.ServerTimeStamp),
        this.SetDamageRecord(!0),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.OnChangeRole,
          this.xie,
        ),
        (CharacterGasDebugComponent_1.RGr = void 0),
        CharacterGasDebugComponent_1.kGr(
          Global_1.Global.BaseCharacter.EntityId,
          !0,
          !1,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.OnAbsoluteTimeStop,
          this.FGr,
        );
    }
    static EndRecord() {
      let t;
      return this.vGr
        ? ((this.vGr = !1),
          this.SetDamageRecord(!1),
          EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.OnChangeRole,
            this.xie,
          ),
          EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.OnAbsoluteTimeStop,
            this.FGr,
          ),
          (t = this.VGr()),
          this.CleanupRecord(),
          t)
        : "";
    }
    static VGr() {
      const t = new Array();
      let e = "";
      let r = "";
      UE.KuroStaticLibrary.SaveStringToFile(
        "X秒,当前时间,对象,对象ID,对象名称,技能ID,技能类型,攻击,暴击,爆伤,生命,防御,伤害加成\n" +
          this.IGr.join("\n"),
        UE.BlueprintPathsLibrary.ProjectSavedDir() +
          this.Pt +
          "SkillRecord.csv",
        !0,
      );
      const a = new Array();
      var i =
        "X秒,当前时间,对象,对象ID,对象名称,子弹ID,子弹名称,伤害ID,技能ID,技能类型,子弹是否命中\n";
      for (const P of this.yGr) {
        const n = this.EGr.get(P);
        n.push(
          ModelManager_1.ModelManager.BulletModel.IsBulletHit(P) ? "1" : "0",
        ),
          a.push(n.join(","));
      }
      UE.KuroStaticLibrary.SaveStringToFile(
        i + a.join("\n"),
        UE.BlueprintPathsLibrary.ProjectSavedDir() +
          this.Pt +
          "BulletRecord.csv",
        !0,
      ),
        (i =
          "X秒,当前时间,对象,对象ID,对象名称,伤害来源,结算ID,子弹名称,伤害值,技能ID,技能名称,唯一ID,Config ID,攻击,暴击,爆伤,生命,防御,伤害加成\n"),
        UE.KuroStaticLibrary.SaveStringToFile(
          i + this.HGr.join("\n"),
          UE.BlueprintPathsLibrary.ProjectSavedDir() +
            this.Pt +
            "DamageRecord.csv",
          !0,
        ),
        (i =
          "X秒,当前时间,对象,对象ID,对象名称,伤害来源,结算ID,子弹名称,伤害值,技能ID,技能名称,是否暴击,唯一ID,当前生命值,生命值上限,攻击,暴击,暴击伤害,防御,共鸣效率,共鸣能量上限,共鸣能量,普攻速度,重击速度,共鸣技能伤害加成,通用伤害加成,声骸技能伤害加成,普攻伤害加成,蓄力攻击伤害加成,共鸣解放伤害加成,连携技能伤害加成,物理伤害加成,冷凝伤害加成,热熔伤害加成,导电伤害加成,气动伤害加成,衍射伤害加成,解离伤害加成,物理伤害抗性,冷凝伤害抗性,热熔伤害抗性,导电伤害抗性,气动伤害抗性,衍射伤害抗性,解离伤害抗性,治疗效果加成,受治疗效果加成,通用受伤减免,物理伤害减免,冷凝伤害减免,热熔伤害减免,导电伤害减免,气动伤害减免,衍射伤害减免,解离伤害减免,韧性上限,韧性,韧性恢复速度,削韧倍率,被削韧倍率,狂暴上限,狂暴,狂暴恢复,空狂暴惩罚时间,破狂暴倍率,被破狂暴倍率,共振度上限,共振度上限,共振度恢复速度,空共振度惩罚时间,破共振度倍率,被破共振度倍率,当前生命值,生命值上限,攻击,暴击,暴击伤害,防御,共鸣效率,共鸣能量上限,共鸣能量,普攻速度,重击速度,共鸣技能伤害加成,通用伤害加成,声骸技能伤害加成,普攻伤害加成,蓄力攻击伤害加成,共鸣解放伤害加成,连携技能伤害加成,物理伤害加成,冷凝伤害加成,热熔伤害加成,导电伤害加成,气动伤害加成,衍射伤害加成,解离伤害加成,物理伤害抗性,冷凝伤害抗性,热熔伤害抗性,导电伤害抗性,气动伤害抗性,衍射伤害抗性,解离伤害抗性,治疗效果加成,受治疗效果加成,通用受伤减免,物理伤害减免,冷凝伤害减免,热熔伤害减免,导电伤害减免,气动伤害减免,衍射伤害减免,解离伤害减免,韧性上限,韧性,韧性恢复速度,削韧倍率,被削韧倍率,狂暴上限,狂暴,狂暴恢复,空狂暴惩罚时间,破狂暴倍率,被破狂暴倍率,共振度上限,共振度上限,共振度恢复速度,空共振度惩罚时间,破共振度倍率,被破共振度倍率,削刃,大招能量,元素能量类型,元素能量,当前生命值,生命值上限,攻击,暴击,暴击伤害,防御,共鸣效率,共鸣能量上限,共鸣能量,普攻速度,重击速度,共鸣技能伤害加成,通用伤害加成,声骸技能伤害加成,普攻伤害加成,蓄力攻击伤害加成,共鸣解放伤害加成,连携技能伤害加成,物理伤害加成,冷凝伤害加成,热熔伤害加成,导电伤害加成,气动伤害加成,衍射伤害加成,解离伤害加成,物理伤害抗性,冷凝伤害抗性,热熔伤害抗性,导电伤害抗性,气动伤害抗性,衍射伤害抗性,解离伤害抗性,治疗效果加成,受治疗效果加成,通用受伤减免,物理伤害减免,冷凝伤害减免,热熔伤害减免,导电伤害减免,气动伤害减免,衍射伤害减免,解离伤害减免,韧性上限,韧性,韧性恢复速度,削韧倍率,被削韧倍率,狂暴上限,狂暴,狂暴恢复,空狂暴惩罚时间,破狂暴倍率,被破狂暴倍率,共振度上限,共振度上限,共振度恢复速度,空共振度惩罚时间,破共振度倍率,被破共振度倍率,当前生命值,生命值上限,攻击,暴击,暴击伤害,防御,共鸣效率,共鸣能量上限,共鸣能量,普攻速度,重击速度,共鸣技能伤害加成,通用伤害加成,声骸技能伤害加成,普攻伤害加成,蓄力攻击伤害加成,共鸣解放伤害加成,连携技能伤害加成,物理伤害加成,冷凝伤害加成,热熔伤害加成,导电伤害加成,气动伤害加成,衍射伤害加成,解离伤害加成,物理伤害抗性,冷凝伤害抗性,热熔伤害抗性,导电伤害抗性,气动伤害抗性,衍射伤害抗性,解离伤害抗性,治疗效果加成,受治疗效果加成,通用受伤减免,物理伤害减免,冷凝伤害减免,热熔伤害减免,导电伤害减免,气动伤害减免,衍射伤害减免,解离伤害减免,韧性上限,韧性,韧性恢复速度,削韧倍率,被削韧倍率,狂暴上限,狂暴,狂暴恢复,空狂暴惩罚时间,破狂暴倍率,被破狂暴倍率,共振度上限,共振度上限,共振度恢复速度,空共振度惩罚时间,破共振度倍率,被破共振度倍率,白条倍率,白条倍率百分比0,白条倍率百分比1,削刃,大招能量,元素能量类型,元素能量,存在的BuffID,存在的Buff名称,存在的BuffID,存在的Buff名称\n"),
        UE.KuroStaticLibrary.SaveStringToFile(
          i + this.jGr.join("\n"),
          UE.BlueprintPathsLibrary.ProjectSavedDir() +
            this.Pt +
            "DamageRecord_Attr.csv",
          !0,
        ),
        (i =
          "X秒,当前时间,对象,对象ID,对象名称,伤害来源,结算ID,子弹名称,伤害值,技能ID,技能名称,唯一ID,是否暴击,当前生命值,生命值上限,攻击,暴击,暴击伤害,防御,共鸣效率,共鸣能量上限,共鸣能量,普攻速度,重击速度,共鸣技能伤害加成,通用伤害加成,声骸技能伤害加成,普攻伤害加成,蓄力攻击伤害加成,共鸣解放伤害加成,连携技能伤害加成,物理伤害加成,冷凝伤害加成,热熔伤害加成,导电伤害加成,气动伤害加成,衍射伤害加成,解离伤害加成,物理伤害抗性,冷凝伤害抗性,热熔伤害抗性,导电伤害抗性,气动伤害抗性,衍射伤害抗性,解离伤害抗性,治疗效果加成,受治疗效果加成,通用受伤减免,物理伤害减免,冷凝伤害减免,热熔伤害减免,导电伤害减免,气动伤害减免,衍射伤害减免,解离伤害减免,韧性上限,韧性,韧性恢复速度,削韧倍率,被削韧倍率,狂暴上限,狂暴,狂暴恢复,空狂暴惩罚时间,破狂暴倍率,被破狂暴倍率,共振度上限,共振度上限,共振度恢复速度,空共振度惩罚时间,破共振度倍率,被破共振度倍率,当前生命值,生命值上限,攻击,暴击,暴击伤害,防御,共鸣效率,共鸣能量上限,共鸣能量,普攻速度,重击速度,共鸣技能伤害加成,通用伤害加成,声骸技能伤害加成,普攻伤害加成,蓄力攻击伤害加成,共鸣解放伤害加成,连携技能伤害加成,物理伤害加成,冷凝伤害加成,热熔伤害加成,导电伤害加成,气动伤害加成,衍射伤害加成,解离伤害加成,物理伤害抗性,冷凝伤害抗性,热熔伤害抗性,导电伤害抗性,气动伤害抗性,衍射伤害抗性,解离伤害抗性,治疗效果加成,受治疗效果加成,通用受伤减免,物理伤害减免,冷凝伤害减免,热熔伤害减免,导电伤害减免,气动伤害减免,衍射伤害减免,解离伤害减免,韧性上限,韧性,韧性恢复速度,削韧倍率,被削韧倍率,狂暴上限,狂暴,狂暴恢复,空狂暴惩罚时间,破狂暴倍率,被破狂暴倍率,共振度上限,共振度上限,共振度恢复速度,空共振度惩罚时间,破共振度倍率,被破共振度倍率,削刃,大招能量,元素能量类型,元素能量,存在的BuffID,存在的Buff名称,存在的BuffID,存在的Buff名称\n"),
        UE.KuroStaticLibrary.SaveStringToFile(
          i + this.WGr.join("\n"),
          UE.BlueprintPathsLibrary.ProjectSavedDir() +
            this.Pt +
            "DamageRecord_Snipeshot.csv",
          !0,
        ),
        (r =
          "X秒,当前时间,对象,对象ID,对象名称,BuffId,Buff名称,添加or删除\n" +
          this.KGr.join("\n")),
        UE.KuroStaticLibrary.SaveStringToFile(
          r,
          UE.BlueprintPathsLibrary.ProjectSavedDir() +
            this.Pt +
            "BuffRecord.csv",
          !0,
        );
      for (const V of this.QGr.values()) t.push(V.ToCsv().join(","));
      (r =
        "对象ID,对象名称,唯一Id,普攻,蓄力,E技能,大招,QTE,极限闪避反击,地面闪避,极限闪避,被动技能,战斗幻想技,探索幻象技,空中闪避\n" +
        t.join("\n")),
        UE.KuroStaticLibrary.SaveStringToFile(
          r,
          UE.BlueprintPathsLibrary.ProjectSavedDir() + this.Pt + "MoveSum.csv",
          !0,
        ),
        (t.length = 0),
        (e += r + "\n"),
        (i =
          "角色ID,角色名称,受伤来源ConfigId,受伤来源名称,受伤来源唯一ID,总伤害,普攻,蓄力,E技能,大招,QTE,极限闪避反击,地面闪避,极限闪避,被动技能,战斗幻想技,探索幻象技,空中闪避\n");
      for (const x of this.XGr.values()) t.push(x.ToCsvForRole().join(","));
      (r = i + t.join("\n")),
        UE.KuroStaticLibrary.SaveStringToFile(
          r,
          UE.BlueprintPathsLibrary.ProjectSavedDir() +
            this.Pt +
            "RoleDamageSum.csv",
          !0,
        ),
        (t.length = 0),
        (e += r + "\n"),
        (i =
          "怪物ConfigID,怪物名称,怪物唯一Id,攻击者ConfigId,攻击者名称,总伤害,普攻,蓄力,E技能,大招,QTE,极限闪避反击,地面闪避,极限闪避,被动技能,战斗幻想技,探索幻象技,空中闪避\n");
      for (const j of this.$Gr.values()) t.push(j.ToCsvForMonster().join(","));
      (r = i + t.join("\n")),
        UE.KuroStaticLibrary.SaveStringToFile(
          r,
          UE.BlueprintPathsLibrary.ProjectSavedDir() +
            this.Pt +
            "MonsterDamageSum.csv",
          !0,
        ),
        (t.length = 0),
        (e += r + "\n"),
        (r = "");
      const o =
        Time_1.Time.WorldTimeSeconds -
        CharacterGasDebugComponent_1.NGr -
        CharacterGasDebugComponent_1.UGr;
      let s = 0;
      for (; o >= s; ) (r += ",'" + s.toString() + "s'"), (s += 0.5);
      let u = "";
      var i = (0, puerts_1.$ref)(u);
      const h =
        (UE.FileSystemOperation.ReadFile(
          UE.KismetSystemLibrary.GetProjectDirectory() +
            "../Config/ResConfig/RoleDspTpl.txt",
          i,
        ),
        (u = (u = (0, puerts_1.$unref)(i)).replace("TPL_XAXIS_VALUES", r)),
        new StringBuilder_1.StringBuilder());
      const _ = new Map();
      const C = new Map();
      const l = new Map();
      const c = new Map();
      const g = new Map();
      const f = new Map();
      const m = new Map();
      const b = new Map();
      const d = new Map();
      for (s = 0; o >= s; ) {
        for (const [D, p] of CharacterGasDebugComponent_1.RGr) {
          c.has(D) || c.set(D, new Array()),
            g.has(D) || g.set(D, new Array()),
            f.has(D) || f.set(D, new Array()),
            m.has(D) || m.set(D, new Array()),
            b.has(D) || b.set(D, new Array()),
            d.has(D) || d.set(D, new Array()),
            _.has(D) || _.set(D, 0),
            C.has(D) || C.set(D, 0),
            l.has(D) || l.set(D, !1);
          let t = !1;
          let e = !1;
          for (; !p.Empty; ) {
            const E = p.Top;
            if (!(E.TimeStamp <= this.NGr + s)) break;
            E.DamageValue > 0
              ? _.set(D, _.get(D) + E.DamageValue)
              : E.InGame
                ? l.set(D, !0)
                : E.OutGame
                  ? l.set(D, !1)
                  : E.QteBegin
                    ? (t = !0)
                    : E?.OutGameSkill && (e = !0),
              p.Pop(),
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug("Character", 21, "打印时间", [
                  "time",
                  E.TimeStamp,
                ]);
          }
          c.get(D).push(_.get(D)),
            g.get(D).push(l.get(D) ? "-10" : "'-'"),
            f.get(D).push(t ? "-20" : "'-'"),
            m.get(D).push(e ? "-30" : "'-'");
          const v = C.get(D);
          d.get(D).push(v > 0 ? _.get(D) / v : 0),
            b.get(D).push(s > 0 ? _.get(D) / s : 0),
            l.get(D) && C.set(D, C.get(D) + 0.5);
        }
        s += 0.5;
      }
      let A;
      let y;
      let I;
      let G;
      let q;
      let M;
      let N;
      let O;
      let S;
      let L;
      let F;
      let U;
      let k;
      let Q;
      let w;
      let X;
      let H;
      const T = [];
      const R = [];
      const B = [];
      for ([A, y] of c) {
        let $ = EntitySystem_1.EntitySystem.Get(A);
        $?.Valid
          ? (T.push(A),
            ($ = ($ = $.GetComponent(0)).Valid ? $.GetRoleId() : 0),
            ($ =
              ModelManager_1.ModelManager.RoleModel.GetRoleDataById(
                $,
              )?.GetRoleId())
              ? (($ =
                  ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig($)),
                ($ = ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(
                  $.Name,
                )),
                R.push($),
                h.Append(
                  StringUtils_1.StringUtils.Format(
                    "{name: '{0}伤害', type: 'line', data: [{1}],},",
                    $,
                    y.join(","),
                  ),
                ))
              : B.push(A))
          : B.push(A);
      }
      for ([I, G] of b)
        B.includes(I) ||
          ((q = T.indexOf(I)),
          h.Append(
            StringUtils_1.StringUtils.Format(
              "{name: '{0}绝对DPS', type: 'line', data: [{1}],},",
              R[q],
              G.join(","),
            ),
          ));
      for ([M, N] of d)
        B.includes(M) ||
          ((O = T.indexOf(M)),
          h.Append(
            StringUtils_1.StringUtils.Format(
              "{name: '{0}站场DPS', type: 'line', data: [{1}],},",
              R[O],
              N.join(","),
            ),
          ));
      for ([S, L] of g)
        B.includes(S) ||
          ((F = T.indexOf(S)),
          h.Append(
            StringUtils_1.StringUtils.Format(
              "{name: '{0}在场上', type: 'line', data: [{1}],},",
              R[F],
              L.join(","),
            ),
          ));
      for ([U, k] of f)
        B.includes(U) ||
          ((Q = T.indexOf(U)),
          h.Append(
            StringUtils_1.StringUtils.Format(
              "{name: '{0}QTE', type: 'line', data: [{1}],},",
              R[Q],
              k.join(","),
            ),
          ));
      for ([w, X] of m)
        B.includes(w) ||
          ((H = T.indexOf(w)),
          h.Append(
            StringUtils_1.StringUtils.Format(
              "{name: '{0}退场技', type: 'line', data: [{1}],},",
              R[H],
              X.join(","),
            ),
          ));
      return (
        (u = u.replace("CONTENT_SERIES", h.ToString())),
        UE.KuroStaticLibrary.SaveStringToFile(
          u,
          UE.BlueprintPathsLibrary.ProjectSavedDir() + this.Pt + "RoleDsp.html",
          !0,
        ),
        e
      );
    }
    MGr(t) {
      return CharacterStatisticsComponent_1.CharacterStatisticsComponent.IsInRecordArea(
        t,
      );
    }
    static RecordDamage(a, i, n, o) {
      const s = new Array();
      var n = (s.push(n), s.push(o), CharacterGasDebugComponent_1.YGr(a));
      if (n) {
        s.push(n.Type),
          s.push(n.ConfigId),
          s.push(n.Name),
          a.GetComponent(83) ? s.push("角色") : s.push("怪物"),
          s.push(MathUtils_1.MathUtils.LongToBigInt(i.STs).toString());
        let t = ConfigManager_1.ConfigManager.BulletConfig.GetBulletData(
          a,
          MathUtils_1.MathUtils.LongToBigInt(i.wVn).toString(),
          !1,
        );
        let e = void 0;
        t ||
          ((o =
            ControllerHolder_1.ControllerHolder.WorldController.GetCustomEntityId(
              a.Id,
              1,
            )),
          (e = EntitySystem_1.EntitySystem.Get(o))?.Valid &&
            (t = ConfigManager_1.ConfigManager.BulletConfig.GetBulletData(
              e,
              MathUtils_1.MathUtils.LongToBigInt(i.wVn).toString(),
            ))),
          s.push(t?.BulletName ?? ""),
          s.push(i.ETs.toFixed()),
          s.push(i.vkn.toFixed());
        let r = a.GetComponent(33)?.GetSkillInfo(i.vkn);
        (r = r || e?.GetComponent(33)?.GetSkillInfo(i.vkn)),
          s.push(r?.SkillName?.toString()),
          s.push(MathUtils_1.MathUtils.LongToBigInt(i.m9n.rkn).toString());
        var n = a?.CheckGetComponent(0).GetPbDataId().toFixed();
        const u = (s.push(n), s.length);
        for (const h of i.TTs.vTs)
          h.Ugs === EAttributeId.Proto_Atk
            ? (s[u] = h.NFn.toFixed())
            : h.Ugs === EAttributeId.Proto_Crit
              ? (s[u + 1] = h.NFn.toFixed())
              : h.Ugs === EAttributeId.Proto_CritDamage
                ? (s[u + 2] = h.NFn.toFixed())
                : h.Ugs === EAttributeId.Proto_Life
                  ? (s[u + 3] = h.NFn.toFixed())
                  : h.Ugs === EAttributeId.Proto_Def
                    ? (s[u + 4] = h.NFn.toFixed())
                    : h.Ugs === EAttributeId.Proto_DamageChange &&
                      (s[u + 5] = h.NFn.toFixed());
        CharacterGasDebugComponent_1.HGr.push(s.join(","));
        (o = ModelManager_1.ModelManager.CreatureModel.GetEntityId(
          MathUtils_1.MathUtils.LongToNumber(i.TTs.rkn),
        )),
          (n = EntitySystem_1.EntitySystem.Get(o));
        CharacterGasDebugComponent_1.JGr(n, a, i.ETs, r?.SkillGenre);
      }
    }
    static JGr(t, e, r, a) {
      let i = this.XGr;
      t?.GetComponent(83) || (i = this.$Gr);
      let n;
      const o = t.Id.toFixed() + e.Id.toFixed();
      let s = i.get(o);
      s
        ? ((s.TotalDamage += r),
          (n = s.RecordDamage.get(a) ?? 0),
          s.RecordDamage.set(a, n + r))
        : ((s = new RecordDamageSum()),
          (n = t?.CheckGetComponent(0).GetPbDataId()),
          (s.ConfigId = n ?? 0),
          (s.UniqueId = t.Id),
          (s.Name = t?.GetComponent(3).Actor.GetName() ?? ""),
          (n = e?.CheckGetComponent(0).GetPbDataId()),
          (s.DamageSourceConfigId = n),
          (s.SourceName = e?.GetComponent(3).Actor.GetName()),
          (s.SourceUniqueId = e?.Id),
          (s.TotalDamage = r),
          (t = s.RecordDamage.get(a) ?? 0),
          s.RecordDamage.set(a, t + r),
          i.set(o, s));
    }
    static TGr(t, e, r) {
      const a = t?.GetComponent(3).Actor.GetName() ?? "";
      var t = t?.CheckGetComponent(0).GetPbDataId() ?? 0;
      var e = e?.Id ?? 0;
      let i = this.QGr.get(t + e);
      i
        ? i.RecordNum.set(r, i.RecordNum.get(r) + 1)
        : (((i = new RecordMoveSum()).ConfigId = t),
          (i.Name = a),
          (i.TargetUniqueId = e),
          i.RecordNum.set(r, 1),
          this.QGr.set(t + e, i));
    }
    qGr(t, e) {
      return !t || e.includes(t) || t.includes(e);
    }
    GetServerBuffString() {
      if (!this.LGr?.aTs?.zps) return "";
      let t = "";
      for (const s of this.LGr.aTs.zps) {
        const e = MathUtils_1.MathUtils.LongToBigInt(s.JFn);
        const r = MathUtils_1.MathUtils.LongToBigInt(s.jVn).toString();
        var a = CharacterBuffController_1.default.GetBuffDefinition(e);
        var a = a ? a.Desc : "";
        t += this.zGr(
          e.toString(),
          s.y4n,
          a,
          s.QVn,
          s.r3n,
          s.rVn,
          r,
          s.Ivs,
          s.Skn,
        );
      }
      if (!this.LGr?.jEs) return "";
      for (const u of this.LGr.jEs) {
        const i = MathUtils_1.MathUtils.LongToBigInt(u.Ekn);
        const n = MathUtils_1.MathUtils.LongToBigInt(u.jVn).toString();
        var o = CharacterBuffController_1.default.GetBuffDefinition(i);
        var o = o ? o.Desc : "";
        t += this.zGr(
          "编 " + i.toString(),
          u.E4n,
          o,
          u.QVn,
          u.r3n,
          u.rVn,
          n,
          u.Ivs ?? 0,
          u.Skn ?? 0,
        );
      }
      if (this.LGr.aTs.Zps.length > 0) {
        t += "\nCD : \n";
        for (const h of this.LGr.aTs.Zps)
          if (!(h.uSs.length <= 0)) {
            t +=
              "[" + MathUtils_1.MathUtils.LongToBigInt(h.JFn).toString() + "] ";
            for (const _ of h.uSs) t += _.toFixed() + ", ";
          }
      }
      return t;
    }
    GetServerBuffRemainDuration(t) {
      if (!this.LGr?.aTs?.zps) return -1;
      let e = -1;
      for (const r of this.LGr.aTs.zps)
        if (r.y4n === t) {
          e = r.Ivs;
          break;
        }
      return e;
    }
    GetServerBuffTotalDuration(t) {
      if (!this.LGr?.aTs?.zps) return -1;
      let e = 0;
      for (const r of this.LGr.aTs.zps)
        if (r.y4n === t) {
          e = r.Skn;
          break;
        }
      return e;
    }
    zGr(t, e, r, a, i, n, o, s, u) {
      return (
        "[" +
        t +
        ", " +
        e +
        "] " +
        a +
        "层," +
        i +
        "级," +
        (n ? "激活. " : "失效. ") +
        "施:" +
        o +
        ". 时:" +
        s.toFixed(1) +
        "/" +
        u.toFixed() +
        ". " +
        r +
        "\n"
      );
    }
    GetServerTagString() {
      let t = "";
      if (this.LGr?.hTs)
        for (const e of this.LGr.hTs)
          t =
            t +
            GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(e.Ukn)
              .TagName +
            " " +
            e.I5n.toString() +
            "\n";
      if (this.LGr?._Ts)
        for (const r of this.LGr._Ts)
          t =
            t +
            "[编] " +
            GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(r.Ukn)
              .TagName +
            " " +
            r.I5n.toString() +
            "\n";
      return t;
    }
    GetServerAttributeString() {
      if (!this.LGr?.dfs) return "";
      let t = "";
      for (const e of this.LGr.dfs)
        t =
          t +
          e.Ugs +
          " " +
          Protocol_1.Aki.Protocol.KBs[e.Ugs] +
          ":[" +
          e.Pgs.toString() +
          "][" +
          e.NFn.toString() +
          "]\n";
      t += "\n队伍属性：\n";
      for (const r of this.LGr.qFn)
        t =
          t +
          r.OFn.toString() +
          "=" +
          r.NFn.toString() +
          "/" +
          r.kFn.toString() +
          "(" +
          r.VFn.toString() +
          "/s)\n";
      return t;
    }
    GetServerPartString() {
      if (!this.LGr?.lTs?.oSs) return "";
      let t = "";
      for (const e of this.LGr.lTs.oSs)
        t +=
          e.o9n +
          " :  " +
          e.d9n.toFixed(1) +
          " / " +
          e.Tkn.toFixed(1) +
          ", " +
          e.Lkn +
          "\n";
      return t;
    }
    GetServerHateString() {
      if (!this.LGr?.efs) return "";
      let t = "";
      for (const e of this.LGr.efs)
        t +=
          MathUtils_1.MathUtils.LongToBigInt(e.rkn) +
          " : " +
          e._4n.toFixed(1) +
          "\n";
      return t;
    }
    GetServerShieldString() {
      if (!this.LGr?.Rps) return "";
      let t = "护盾总值: " + this.LGr.Rps.tSs + "\n";
      for (const e of this.LGr.Rps.eSs)
        t +=
          "[" +
          e.R5n +
          "," +
          e.E4n +
          "] " +
          (e.ZMs ? "生效" : "失效") +
          ", " +
          e.YMs +
          "," +
          e.zMs +
          "," +
          e.JMs +
          "\n";
      return t;
    }
    ServerDebugInfoRequest() {
      const t = Protocol_1.Aki.Protocol.Pzn.create();
      (t.rkn = MathUtils_1.MathUtils.NumberToLong(
        ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(
          this.Entity.Id,
        ),
      )),
        Net_1.Net.Call(12552, t, (t) => {
          t && ((this.LGr = t), (this.ServerDebugInfoDirty = !0));
        });
    }
    OnBuffAdded(t) {
      CharacterGasDebugComponent_1.vGr &&
        (t = this.ZGr(t, "添加")) &&
        CharacterGasDebugComponent_1.KGr.push(t.join(","));
    }
    OnBuffRemoved(t) {
      CharacterGasDebugComponent_1.vGr &&
        (t = this.ZGr(t, "删除")) &&
        CharacterGasDebugComponent_1.KGr.push(t.join(","));
    }
    ZGr(t, e) {
      const r = new Array();
      var a =
        (r.push(CharacterGasDebugComponent_1.SecondsSinceStartup()),
        r.push(CharacterGasDebugComponent_1.SGr(Date.now())),
        t.GetInstigator());
      var a = a ? CharacterGasDebugComponent_1.YGr(a) : void 0;
      if (a)
        return (
          r.push(a.Type),
          r.push(a.ConfigId),
          r.push(a.Name),
          r.push(t.Config.Id.toString()),
          r.push(t.Config.Desc),
          r.push(e),
          r
        );
    }
    static YGr(t) {
      let e;
      var t = t.GetComponent(0);
      const r = t.GetEntityType();
      return r === Protocol_1.Aki.Protocol.HBs.Proto_Player
        ? ((e = t.Valid ? t.GetRoleId() : 0),
          (e =
            ModelManager_1.ModelManager.RoleModel.GetRoleDataById(
              e,
            )?.GetRoleId())
            ? ((e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e)),
              {
                Name: ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(
                  e.Name,
                ),
                Type: "角色",
                ConfigId: t.GetPbDataId().toFixed(),
              })
            : void 0)
        : r === Protocol_1.Aki.Protocol.HBs.Proto_Monster
          ? {
              Name: PublicUtil_1.PublicUtil.GetConfigTextByKey(
                t.GetBaseInfo()?.TidName ?? "",
              ),
              Type: "怪物",
              ConfigId: t.GetPbDataId().toFixed(),
            }
          : void 0;
    }
    static SetDamageRecord(t) {
      const e = Protocol_1.Aki.Protocol.Debug.qXn.create();
      (e.C9n = t),
        Net_1.Net.Call(8311, e, (t) => {
          t &&
            Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("CombatInfo", 21, "", ["Response", t]);
        });
    }
    static OnDamageRecordNotify(e, r) {
      TestModuleBridge_1.TestModuleBridge.TryGetTestModuleExports().then(
        (t) => {
          t && t.RoleTest && t.RoleTest.RecordDamageNotify(e, r);
        },
      );
      let t;
      let a;
      const i = EntitySystem_1.EntitySystem.Get(
        ModelManager_1.ModelManager.CreatureModel.GetEntityId(
          MathUtils_1.MathUtils.LongToNumber(r.m9n.rkn),
        ),
      );
      i.GetComponent(24)?.GetStatisticsEnable() &&
        ((t = (
          0.001 *
            (MathUtils_1.MathUtils.LongToNumber(r.MTs) -
              CharacterGasDebugComponent_1.OGr) -
          CharacterGasDebugComponent_1.UGr
        ).toFixed(2)),
        (a = this.SGr(r.MTs)),
        this.RecordDamage(i, r, t, a),
        this.eNr(i, r, t, a),
        this.tNr(i, r, t, a),
        this.iNr(i, r));
    }
    static iNr(e, r) {
      let a = e.GetComponent(0);
      if (a && a.GetEntityType() === Protocol_1.Aki.Protocol.HBs.Proto_Player) {
        this.RGr || (this.RGr = new Map());
        a = e.Id;
        let t = this.RGr.get(a);
        t ||
          ((t = new PriorityQueue_1.PriorityQueue(this.AGr)),
          this.RGr.set(a, t));
        e = new DamageRecordDsp(
          Time_1.Time.WorldTimeSeconds - CharacterGasDebugComponent_1.UGr,
          r.ETs,
          !1,
          !1,
          !1,
          !1,
        );
        t.Push(e);
      }
    }
    static kGr(t, e, r) {
      CharacterGasDebugComponent_1.RGr ||
        (CharacterGasDebugComponent_1.RGr = new Map());
      let a = CharacterGasDebugComponent_1.RGr.get(t);
      a ||
        ((a = new PriorityQueue_1.PriorityQueue(
          CharacterGasDebugComponent_1.AGr,
        )),
        CharacterGasDebugComponent_1.RGr.set(t, a));
      t = new DamageRecordDsp(
        Time_1.Time.WorldTimeSeconds - CharacterGasDebugComponent_1.UGr,
        -1,
        !1,
        e,
        r,
        !1,
      );
      a.Push(t);
    }
    static tNr(a, i, n, o) {
      const s = new Array();
      var n = (s.push(n), s.push(o), CharacterGasDebugComponent_1.YGr(a));
      if (n) {
        s.push(n.Type),
          s.push(n.ConfigId),
          s.push(n.Name),
          s.push(
            i.yTs === Protocol_1.Aki.Protocol.yTs.Proto_FromBullet
              ? "子弹"
              : "Buff",
          ),
          s.push(MathUtils_1.MathUtils.LongToBigInt(i.STs).toString());
        let t = ConfigManager_1.ConfigManager.BulletConfig.GetBulletData(
          a,
          MathUtils_1.MathUtils.LongToBigInt(i.wVn).toString(),
          !1,
        );
        let e = void 0;
        t ||
          ((o =
            ControllerHolder_1.ControllerHolder.WorldController.GetCustomEntityId(
              a.Id,
              1,
            )),
          (e = EntitySystem_1.EntitySystem.Get(o))?.Valid &&
            (t = ConfigManager_1.ConfigManager.BulletConfig.GetBulletData(
              e,
              MathUtils_1.MathUtils.LongToBigInt(i.wVn).toString(),
            ))),
          s.push(t?.BulletName ?? ""),
          s.push(i.ETs.toFixed()),
          s.push(i.vkn.toFixed());
        let r = a.GetComponent(33)?.GetSkillInfo(i.vkn)?.SkillName;
        (r = r || e?.GetComponent(33)?.GetSkillInfo(i.vkn)?.SkillName),
          s.push(r?.toString() ?? ""),
          s.push(MathUtils_1.MathUtils.LongToBigInt(i.m9n.rkn).toString()),
          s.push(i.ITs ? "1" : "0");
        var n = s.length;
        var o =
          (this.oNr(i.TTs.pTs, s, n),
          this.oNr(i.m9n.pTs, s, n + 59),
          DamageById_1.configDamageById.GetConfig(
            MathUtils_1.MathUtils.LongToBigInt(i.STs),
          ));
        var a = i.n9n;
        const u =
          ((s[n + 118] = AbilityUtils_1.AbilityUtils.GetLevelValue(
            o.ToughLv,
            a,
            0,
          ).toString()),
          (s[n + 119] = AbilityUtils_1.AbilityUtils.GetLevelValue(
            o.Energy,
            a,
            0,
          ).toString()),
          (s[n + 120] = o.ElementPowerType.toString()),
          (s[n + 121] = AbilityUtils_1.AbilityUtils.GetLevelValue(
            o.ElementPower,
            a,
            0,
          ).toString()),
          new Array());
        const h = new Array();
        for (const g of i.m9n.fTs) {
          const _ = MathUtils_1.MathUtils.LongToBigInt(g);
          const C = CharacterBuffController_1.default.GetBuffDefinition(_);
          u.push(C.Desc), h.push(_);
        }
        (s[n + 122] = h.join("|")),
          (s[n + 123] = u.join("|")),
          (u.length = 0),
          (h.length = 0);
        for (const f of i.TTs.fTs) {
          const l = MathUtils_1.MathUtils.LongToBigInt(f);
          const c = CharacterBuffController_1.default.GetBuffDefinition(l);
          u.push(c.Desc), h.push(l);
        }
        (s[n + 124] = h.join("|")), (s[n + 125] = u.join("|"));
        o = s.join(",");
        this.WGr.push(o),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Recorder", 21, "结算信息Snapshot", ["Result", o]);
      }
    }
    static SGr(t) {
      t = new Date(MathUtils_1.MathUtils.LongToNumber(t));
      return StringUtils_1.StringUtils.Format(
        "{0}月{1}日{2}:{3}:{4}:{5}",
        t.getMonth().toString(),
        t.getDate().toString(),
        t.getHours().toString(),
        t.getMinutes().toString(),
        t.getSeconds().toString(),
        t.getMilliseconds().toString(),
      );
    }
    static eNr(i, n, o, s) {
      const u = new Array();
      var o = (u.push(o), u.push(s), CharacterGasDebugComponent_1.YGr(i));
      if (o) {
        u.push(o.Type),
          u.push(o.ConfigId),
          u.push(o.Name),
          u.push(
            n.yTs === Protocol_1.Aki.Protocol.yTs.Proto_FromBullet
              ? "子弹"
              : "Buff",
          ),
          u.push(MathUtils_1.MathUtils.LongToBigInt(n.STs).toString());
        let t = ConfigManager_1.ConfigManager.BulletConfig.GetBulletData(
          i,
          MathUtils_1.MathUtils.LongToBigInt(n.wVn).toString(),
          !1,
        );
        let e = void 0;
        t ||
          ((s =
            ControllerHolder_1.ControllerHolder.WorldController.GetCustomEntityId(
              i.Id,
              1,
            )),
          (e = EntitySystem_1.EntitySystem.Get(s))?.Valid &&
            (t = ConfigManager_1.ConfigManager.BulletConfig.GetBulletData(
              e,
              MathUtils_1.MathUtils.LongToBigInt(n.wVn).toString(),
            ))),
          u.push(t?.BulletName ?? ""),
          u.push(n.ETs.toFixed()),
          u.push(n.vkn.toFixed());
        let r = i.GetComponent(33)?.GetSkillInfo(n.vkn)?.SkillName;
        (r = r || e?.GetComponent(33)?.GetSkillInfo(n.vkn)?.SkillName),
          u.push(r?.toString() ?? ""),
          u.push(n.ITs ? "1" : "0"),
          u.push(MathUtils_1.MathUtils.LongToBigInt(n.m9n.rkn).toString());
        const h = u.length;
        var o =
          (CharacterGasDebugComponent_1.rNr(n.TTs.vTs, u, h, h + 122),
          DamageById_1.configDamageById.GetConfig(
            MathUtils_1.MathUtils.LongToBigInt(n.STs),
          ));
        let a = void 0;
        o.ElementPowerType === 1
          ? (a = EAttributeId.Proto_ElementPower1)
          : o.ElementPowerType === 2
            ? (a = EAttributeId.Proto_ElementPower2)
            : o.ElementPowerType === 3
              ? (a = EAttributeId.Proto_ElementPower3)
              : o.ElementPowerType === 4
                ? (a = EAttributeId.Proto_ElementPower4)
                : o.ElementPowerType === 5
                  ? (a = EAttributeId.Proto_ElementPower5)
                  : o.ElementPowerType === 6 &&
                    (a = EAttributeId.Proto_ElementPower6),
          (u[h + 120] = o.ElementPowerType.toString());
        for (const m of n.m9n.vTs)
          m.Ugs === EAttributeId.Proto_ToughChange
            ? (u[h + 118] = m.NFn.toFixed())
            : m.Ugs === EAttributeId.Proto_Energy
              ? (u[h + 119] = m.NFn.toFixed())
              : a && m.Ugs === a && (u[h + 121] = m.NFn.toFixed());
        CharacterGasDebugComponent_1.rNr(n.m9n.vTs, u, h + 59, h + 181);
        var s = n.n9n;
        const _ =
          ((u[h + 240] = AbilityUtils_1.AbilityUtils.GetLevelValue(
            o.HardnessLv,
            s,
            0,
          ).toString()),
          (u[h + 241] = AbilityUtils_1.AbilityUtils.GetLevelValue(
            o.Percent0,
            s,
            0,
          ).toString()),
          (u[h + 242] = AbilityUtils_1.AbilityUtils.GetLevelValue(
            o.Percent1,
            s,
            0,
          ).toString()),
          (u[h + 243] = AbilityUtils_1.AbilityUtils.GetLevelValue(
            o.ToughLv,
            s,
            0,
          ).toString()),
          (u[h + 244] = AbilityUtils_1.AbilityUtils.GetLevelValue(
            o.Energy,
            s,
            0,
          ).toString()),
          (u[h + 245] = o.ElementPowerType.toString()),
          (u[h + 246] = AbilityUtils_1.AbilityUtils.GetLevelValue(
            o.ElementPower,
            s,
            0,
          ).toString()),
          new Array());
        const C = new Array();
        for (const b of n.m9n.fTs) {
          const l = MathUtils_1.MathUtils.LongToBigInt(b);
          const c = CharacterBuffController_1.default.GetBuffDefinition(l);
          _.push(c.Desc), C.push(l);
        }
        (u[h + 247] = C.join("|")),
          (u[h + 248] = _.join("|")),
          (_.length = 0),
          (C.length = 0);
        for (const d of n.TTs.fTs) {
          const g = MathUtils_1.MathUtils.LongToBigInt(d);
          const f = CharacterBuffController_1.default.GetBuffDefinition(g);
          _.push(f.Desc), C.push(g);
        }
        (u[h + 249] = C.join("|")), (u[h + 250] = _.join("|"));
        i = u.join(",");
        this.jGr.push(i),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Recorder", 21, "结算信息Attr", ["Result", i]);
      }
    }
    static rNr(t, r, a, i) {
      for (const n of t)
        for (let t = 0, e = attributeIdArray.length; t < e; t++)
          if (n.Ugs === attributeIdArray[t]) {
            (r[a + t] = (n.NFn > 0 ? n.NFn : n.Pgs).toString()),
              (r[i + t] = n.Pgs.toString());
            break;
          }
    }
    static oNr(t, r, a) {
      for (const i of t)
        for (let t = 0, e = attributeIdArray.length; t < e; t++)
          if (i.Ugs === attributeIdArray[t]) {
            r[a + t] = (i.NFn > 0 ? i.NFn : i.Pgs).toString();
            break;
          }
    }
    static CleanupRecord() {
      (CharacterGasDebugComponent_1.FEn = !1),
        (CharacterGasDebugComponent_1.UGr = 0),
        (CharacterGasDebugComponent_1.IGr.length = 0),
        (CharacterGasDebugComponent_1.HGr.length = 0),
        CharacterGasDebugComponent_1.QGr.clear(),
        CharacterGasDebugComponent_1.XGr.clear(),
        CharacterGasDebugComponent_1.$Gr.clear(),
        CharacterGasDebugComponent_1.EGr.clear(),
        (CharacterGasDebugComponent_1.yGr.length = 0),
        (CharacterGasDebugComponent_1.KGr.length = 0),
        CharacterGasDebugComponent_1.RGr?.clear(),
        (CharacterGasDebugComponent_1.WGr.length = 0),
        (CharacterGasDebugComponent_1.jGr.length = 0);
    }
  });
(CharacterGasDebugComponent.bGr = !1),
  (CharacterGasDebugComponent.GGr = !1),
  (CharacterGasDebugComponent.vGr = !1),
  (CharacterGasDebugComponent.NGr = 0),
  (CharacterGasDebugComponent.OGr = 0),
  (CharacterGasDebugComponent.IGr = new Array()),
  (CharacterGasDebugComponent.HGr = new Array()),
  (CharacterGasDebugComponent.QGr = new Map()),
  (CharacterGasDebugComponent.XGr = new Map()),
  (CharacterGasDebugComponent.$Gr = new Map()),
  (CharacterGasDebugComponent.EGr = new Map()),
  (CharacterGasDebugComponent.yGr = new Array()),
  (CharacterGasDebugComponent.Pt = "Statistics/FightDataRecord/"),
  (CharacterGasDebugComponent.KGr = new Array()),
  (CharacterGasDebugComponent.RGr = void 0),
  (CharacterGasDebugComponent.AGr = (t, e) => t.TimeStamp - e.TimeStamp),
  (CharacterGasDebugComponent.xie = (t, e) => {
    CharacterGasDebugComponent_1.kGr(t.Id, !0, !1),
      e && CharacterGasDebugComponent_1.kGr(e.Id, !1, !0);
  }),
  (CharacterGasDebugComponent.WGr = new Array()),
  (CharacterGasDebugComponent.jGr = new Array()),
  (CharacterGasDebugComponent.FEn = !1),
  (CharacterGasDebugComponent.UGr = 0),
  (CharacterGasDebugComponent.VEn = 0),
  (CharacterGasDebugComponent.FGr = (t) => {
    CharacterGasDebugComponent_1.FEn = t;
  }),
  __decorate(
    [CombatMessage_1.CombatNet.SyncHandle("E2n")],
    CharacterGasDebugComponent,
    "OnDamageRecordNotify",
    null,
  ),
  (CharacterGasDebugComponent = CharacterGasDebugComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(20)],
      CharacterGasDebugComponent,
    )),
  (exports.CharacterGasDebugComponent = CharacterGasDebugComponent);
// # sourceMappingURL=CharacterGasDebugComponent.js.map
