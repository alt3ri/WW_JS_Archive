"use strict";
var CharacterGasDebugComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, r, a) {
      var i,
        n = arguments.length,
        o =
          n < 3
            ? e
            : null === a
              ? (a = Object.getOwnPropertyDescriptor(e, r))
              : a;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        o = Reflect.decorate(t, e, r, a);
      else
        for (var s = t.length - 1; 0 <= s; s--)
          (i = t[s]) &&
            (o = (n < 3 ? i(o) : 3 < n ? i(e, r, o) : i(e, r)) || o);
      return 3 < n && o && Object.defineProperty(e, r, o), o;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterGasDebugComponent = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  Time_1 = require("../../../../../../Core/Common/Time"),
  PriorityQueue_1 = require("../../../../../../Core/Container/PriorityQueue"),
  FormationPropertyAll_1 = require("../../../../../../Core/Define/ConfigQuery/FormationPropertyAll"),
  Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
  EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem"),
  RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
  Net_1 = require("../../../../../../Core/Net/Net"),
  GameplayTagUtils_1 = require("../../../../../../Core/Utils/GameplayTagUtils"),
  MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
  StringBuilder_1 = require("../../../../../../Core/Utils/StringBuilder"),
  StringUtils_1 = require("../../../../../../Core/Utils/StringUtils"),
  TestModuleBridge_1 = require("../../../../../Bridge/TestModuleBridge"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  PublicUtil_1 = require("../../../../../Common/PublicUtil"),
  Global_1 = require("../../../../../Global"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  FormationAttributeController_1 = require("../../../../../Module/Abilities/FormationAttributeController"),
  CombatMessage_1 = require("../../../../../Module/CombatMessage/CombatMessage"),
  AbilityUtils_1 = require("./AbilityUtils"),
  CharacterAttributeTypes_1 = require("./CharacterAttributeTypes"),
  CharacterBuffController_1 = require("./CharacterBuffController"),
  CharacterStatisticsComponent_1 = require("./CharacterStatisticsComponent"),
  CharacterUnifiedStateTypes_1 = require("./CharacterUnifiedStateTypes");
var ESkillGenreName,
  EMovementModeName,
  EAttributeId = Protocol_1.Aki.Protocol.Vks;
const Info_1 = require("../../../../../../Core/Common/Info"),
  MAX_DEBUG_STRING_NUMS = 50;
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
    var e = new Array();
    e.push(this.ConfigId.toFixed()),
      e.push(this.Name),
      e.push(this.TargetUniqueId.toFixed());
    for (let t = 0; t < 14; t++) {
      var r = this.RecordNum.get(t);
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
    var e = new Array();
    e.push(this.ConfigId.toFixed()),
      e.push(this.Name),
      e.push(this.DamageSourceConfigId.toFixed()),
      e.push(this.SourceName),
      e.push(this.SourceUniqueId.toFixed()),
      e.push(this.TotalDamage.toFixed());
    for (let t = 0; t < 14; t++) {
      var r = this.RecordDamage.get(t);
      e.push(r ? r.toFixed() : "0");
    }
    return e;
  }
  ToCsvForMonster() {
    var e = new Array();
    e.push(this.ConfigId.toFixed()),
      e.push(this.Name),
      e.push(this.UniqueId.toFixed()),
      e.push(this.DamageSourceConfigId.toFixed()),
      e.push(this.SourceName),
      e.push(this.TotalDamage.toFixed());
    for (let t = 0; t < 14; t++) {
      var r = this.RecordDamage.get(t);
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
  EAttributeId.l5n,
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
        (this.qqr = void 0),
        (this.EnableCollisionDebugDraw = !1),
        (this.Gqr = 0),
        (this.Nqr = void 0),
        (this.Oqr = new Array()),
        (this.kqr = (t) => {
          t.includes("Tag") ||
            ((this.Gqr = this.Gqr + 1),
            this.Oqr.unshift("Num " + this.Gqr + ": " + t),
            this.Oqr.length > MAX_DEBUG_STRING_NUMS && this.Oqr.pop());
        }),
        (this.Fqr = new Array()),
        (this.Vqr = new Array()),
        (this.Hqr = (t, e, r, a, i) => {
          this.jqr.unshift(
            EMovementModeName[e] +
              "." +
              a.toFixed() +
              " ->" +
              EMovementModeName[r] +
              "." +
              i.toFixed(),
          );
        }),
        (this.Wqr = (t, e) => {
          this.jqr.unshift(
            CharacterUnifiedStateTypes_1.ECharMoveState[t] +
              " ->" +
              CharacterUnifiedStateTypes_1.ECharMoveState[e],
          );
        }),
        (this.Kqr = (t, e) => {
          this.jqr.unshift(
            CharacterUnifiedStateTypes_1.ECharPositionState[t] +
              " ->" +
              CharacterUnifiedStateTypes_1.ECharPositionState[e],
          );
        }),
        (this.Qqr = (t) => {
          this.jqr.unshift("Set NewBeHit:" + t);
        }),
        (this.jqr = new Array()),
        (this.Xqr = (t) => {
          if (CharacterGasDebugComponent_1.$qr) {
            var e = t.Attacker;
            if (this.Yqr(e)) {
              var r = new Array(),
                a =
                  (r.push(CharacterGasDebugComponent_1.SecondsSinceStartup()),
                  r.push(CharacterGasDebugComponent_1.Jqr(Date.now())),
                  e.GetComponent(0)),
                i = a.GetEntityType();
              if (i === Protocol_1.Aki.Protocol.kks.Proto_Player) {
                r.push("角色"), r.push(a.GetPbDataId().toFixed());
                var n = a.Valid ? a.GetRoleId() : 0,
                  n = ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId(n);
                if (!n) return;
                (n = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(n)),
                  (n = n
                    ? ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(
                        n.Name,
                      )
                    : "");
                r.push(n);
              } else {
                if (i !== Protocol_1.Aki.Protocol.kks.Proto_Monster) return;
                r.push("怪物"), r.push(a.GetPbDataId().toFixed());
                n = PublicUtil_1.PublicUtil.GetConfigTextByKey(
                  a.GetEntityTidName() ?? "",
                );
                r.push(n);
              }
              r.push(t.BulletRowName);
              (i = t.BulletDataMain),
                (a =
                  (r.push(i?.BulletName ?? "0"),
                  r.push(t.CollisionInfo.DamageId.toString()),
                  t.BulletInitParams.SkillId)),
                (n = (r.push(a ? a.toFixed() : ""), e.GetComponent(38))),
                (i = a ? n.GetSkillInfo(a) : void 0),
                (e =
                  (r.push(i ? ESkillGenreName[i.SkillGenre] : ""),
                  t.Entity.Id));
              CharacterGasDebugComponent_1.zqr.set(e, r),
                CharacterGasDebugComponent_1.Zqr.push(e);
            }
          }
        }),
        (this.RecordMove = (t, e, r) => {
          var a, i, n;
          CharacterGasDebugComponent_1.$qr &&
            t?.Valid &&
            this.Yqr(this.Entity) &&
            ((a = this.Entity),
            (i = new Array()).push(
              CharacterGasDebugComponent_1.SecondsSinceStartup(),
            ),
            i.push(CharacterGasDebugComponent_1.Jqr(Date.now())),
            a?.GetComponent(93) ? i.push("角色") : i.push("怪物"),
            (n = a?.CheckGetComponent(0).GetPbDataId()),
            i.push(n.toFixed(0)),
            (n = a?.GetComponent(3).Actor.GetName()),
            i.push(n),
            i.push(e.toString()),
            i.push(ESkillGenreName[r]),
            (n = a.GetComponent(171)),
            i.push(n.GetCurrentValue(EAttributeId.Proto_Atk).toFixed()),
            i.push(n.GetCurrentValue(EAttributeId.Proto_Crit).toFixed()),
            i.push(n.GetCurrentValue(EAttributeId.Proto_CritDamage).toFixed()),
            i.push(n.GetCurrentValue(EAttributeId.Proto_Life).toFixed()),
            i.push(n.GetCurrentValue(EAttributeId.Proto_Def).toFixed()),
            i.push(
              n.GetCurrentValue(EAttributeId.Proto_DamageChange).toFixed(),
            ),
            CharacterGasDebugComponent_1.eGr.push(i.join(",")),
            CharacterGasDebugComponent_1.tGr(a, t.Entity, r));
        }),
        (this.ServerDebugInfo = void 0),
        (this.ServerDebugInfoDirty = !1),
        (this.li1 = new Set()),
        (this._i1 = new Map()),
        (this.ci1 = 0),
        (this.oGr = (t, e) => {
          var e = this.Entity.GetComponent(38)?.GetSkillInfo(e),
            r =
              (CharacterGasDebugComponent_1.rGr ||
                (CharacterGasDebugComponent_1.rGr = new Map()),
              this.Entity.Id);
          if (4 === e.SkillGenre) {
            let t = CharacterGasDebugComponent_1.rGr.get(r);
            t ||
              ((t = new PriorityQueue_1.PriorityQueue(
                CharacterGasDebugComponent_1.nGr,
              )),
              CharacterGasDebugComponent_1.rGr.set(r, t));
            var a = new DamageRecordDsp(
              Time_1.Time.WorldTimeSeconds - CharacterGasDebugComponent_1.sGr,
              -1,
              !0,
              !1,
              !1,
              !1,
            );
            t.Push(a);
          } else if (12 === e.SkillGenre) {
            let t = CharacterGasDebugComponent_1.rGr.get(r);
            t ||
              ((t = new PriorityQueue_1.PriorityQueue(
                CharacterGasDebugComponent_1.nGr,
              )),
              CharacterGasDebugComponent_1.rGr.set(r, t));
            a = new DamageRecordDsp(
              Time_1.Time.WorldTimeSeconds - CharacterGasDebugComponent_1.sGr,
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
      var t = this.Entity.GetComponent(3);
      return (
        (this.qqr = t?.Actor.AbilitySystemComponent),
        this.hGr(),
        this.lGr(),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharRecordOperate,
          this.RecordMove,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharUseSkill,
          this.oGr,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.BulletCreate,
          this.Xqr,
        ),
        !0
      );
    }
    OnTick(t) {
      if (
        (CharacterGasDebugComponent_1.Qyn &&
          Time_1.Time.Frame > CharacterGasDebugComponent_1.Xyn &&
          ((CharacterGasDebugComponent_1.sGr += 0.001 * t),
          (CharacterGasDebugComponent_1.Xyn = Time_1.Time.Frame)),
        this.EnableCollisionDebugDraw)
      ) {
        var e = this.Entity.GetComponent(3);
        if (e) {
          var r = e.Actor.K2_GetComponentsByClass(
            UE.CapsuleComponent.StaticClass(),
          );
          for (let t = 0; t < r.Num(); t++) {
            var a = r.Get(t);
            UE.KismetSystemLibrary.D_DrawDebugCapsule(
              e.Actor,
              a.D_K2_GetComponentLocation(),
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
        this.Nqr?.EndTask(),
        (this.Nqr = void 0),
        this._Gr(),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharRecordOperate,
          this.RecordMove,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharUseSkill,
          this.oGr,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.BulletCreate,
          this.Xqr,
        ),
        !0
      );
    }
    hGr() {
      this.qqr &&
        ((this.Nqr =
          UE.AsyncTaskEffectDebugString.ListenForGameplayEffectExecutedDebugString(
            this.qqr,
          )),
        this.Nqr?.OnAnyGameplayEffectExecuted.Add(this.kqr));
    }
    GetGeDebugStrings() {
      return this.Oqr.join(" ");
    }
    GetTagDebugStrings() {
      return (
        this.Entity.GetComponent(203)?.TagContainer.GetDebugString() ??
        "找不到tag组件"
      );
    }
    GetTagContainerDebugString(e) {
      var r = e.GameplayTags?.Num() ?? 0;
      if (r <= 0) return "";
      let a = "";
      for (let t = 0; t < r; t++) a += e.GameplayTags.Get(t).TagName + " ";
      return a;
    }
    GetBuffEffectDebugString(t) {
      let e = "";
      for (const r of this.Entity.GetComponent(
        172,
      ).BuffEffectManager.GetAllEffects())
        this.cGr(t, String(r.BuffId)) &&
          (e += `${r.constructor.name} buffId:${r.BuffId} handle:${r.ActiveHandleId}\n`);
      return e;
    }
    GetShieldDebugString() {
      this.Fqr.length = 0;
      var t = this.Entity.GetComponent(74);
      if (t)
        for (var [, e] of t.GetDebugShieldInfo()) {
          var r = e.ShieldValue,
            a = e.Priority,
            e = e.TemplateId;
          this.Fqr.push(
            `Shield magnitude: ${r} priority: ${a} templateId: ` + e,
          );
        }
      t = this.Entity.GetComponent(171)?.GetLockDebugString() ?? "";
      return "\n\nShields:\n" + this.Fqr.join("\n") + t;
    }
    GetAttributeDebugStrings() {
      var e = this.Entity.GetComponent(171);
      if (!e) return "Invalid";
      let r = "";
      for (let t = 1; t < CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX; t++) {
        var a = e.GetBaseValue(t),
          i = e.GetCurrentValue(t),
          n = Protocol_1.Aki.Protocol.Vks[t];
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
      this.Vqr.length = 0;
      var e = this.Entity.GetComponent(171);
      for (let t = 1; t < CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX; t++) {
        var r = e.GetBaseValue(t),
          a = e.GetCurrentValue(t),
          i = Protocol_1.Aki.Protocol.Vks[t],
          i = `Attribute ID: ${t}   ${i}  
    Base: ${r.toFixed()}    Current: ${a.toFixed()} 
`;
        this.Vqr.push(i);
      }
      return this.Vqr.join("\n");
    }
    static GetFormationAttributeDebugStrings() {
      let t = "";
      for (const n of FormationPropertyAll_1.configFormationPropertyAll.GetConfigList()) {
        var e = n.Id,
          r =
            FormationAttributeController_1.FormationAttributeController.GetValue(
              e,
            ),
          a =
            FormationAttributeController_1.FormationAttributeController.GetMax(
              e,
            ),
          i =
            FormationAttributeController_1.FormationAttributeController.GetSpeed(
              e,
            );
        t += `#${e} = ${r?.toFixed(0)}/${a?.toFixed(0)} (${i?.toFixed(0)}/s)
`;
      }
      return t;
    }
    GetAllAttributeDebugInfo() {
      var a = this.Entity.GetComponent(171);
      if (!a) return "Invalid";
      let i = "";
      const n = this.ServerDebugInfo?.GSs;
      var o = new Array(CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX);
      if (n) for (const p of n) o[p.tSs] = p;
      for (let r = 1; r < CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX; r++) {
        var s = a.GetBaseValue(r),
          h = a.GetCurrentValue(r),
          u = h.toFixed(0);
        let t = (h - s).toFixed(0);
        s <= h && (t = "+" + t), (t = h === s ? "" : `(${t})`);
        var _ = Protocol_1.Aki.Protocol.Vks[r].replace("Proto_", "");
        const n = o[r];
        var C = n?.y6n.toFixed(0) ?? "0";
        let e = n ? (n.y6n - n.eSs).toFixed(0) : "0";
        n && n.y6n > n.eSs && (e = "+" + e),
          (e = n?.y6n === n?.eSs ? "" : `(${e})`),
          CharacterAttributeTypes_1.stateAttributeIds.has(r) || h === s
            ? (i += `#${r} ${_}	 C:${u} | S:${C}
`)
            : (i += `#${r} ${_}	 C:${u}(${t}) | S:${C}(${e})
`);
      }
      i += "\n队伍属性：\n";
      var t = this.ServerDebugInfo?.M6n,
        e = new Array();
      if (t) for (const D of t) e[D.E6n] = D;
      for (const d of FormationPropertyAll_1.configFormationPropertyAll.GetConfigList()) {
        var r = d.Id,
          l =
            FormationAttributeController_1.FormationAttributeController.GetValue(
              r,
            ),
          c =
            FormationAttributeController_1.FormationAttributeController.GetMax(
              r,
            ),
          f =
            FormationAttributeController_1.FormationAttributeController.GetSpeed(
              r,
            );
        const n = e[r];
        var g = n?.y6n.toFixed(0) ?? "???",
          m = n?.I6n.toFixed(0) ?? "???",
          b = n?.L6n.toFixed(0) ?? "???";
        i +=
          `#${r}	 C:${l?.toFixed(0)}/${c?.toFixed(0)} (${f?.toFixed(0)}/s)` +
          ` | S:${g}/${m} (${b}/s)
`;
      }
      return i;
    }
    lGr() {
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharMovementModeChanged,
        this.Hqr,
      ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
          this.Wqr,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnPositionStateChanged,
          this.Kqr,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnSetNewBeHit,
          this.Qqr,
        );
    }
    _Gr() {
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharMovementModeChanged,
        this.Hqr,
      ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
          this.Wqr,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnPositionStateChanged,
          this.Kqr,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnSetNewBeHit,
          this.Qqr,
        );
    }
    GetAllMovementHistory() {
      return 50 < this.jqr.length && this.jqr.pop(), this.jqr.join("\n");
    }
    DebugResetBaseValue(t, e) {
      t >= EAttributeId.Proto_Lv &&
        t < CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX &&
        this.Entity.GetComponent(171).SetBaseValue(t, e);
    }
    static get IsServerLogOff() {
      return this.mGr;
    }
    static ReceiveSwitchServerLogMode(t) {
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Battle",
          19,
          "[CharacterAbilityComponent]Server switch Buff Mode",
          ["isClientControl", t],
        ),
        (this.mGr = t);
    }
    static RequestSwitchServerMode(t) {
      var e = Protocol_1.Aki.Protocol.pis.create({
        Jjn: t,
        zjn: Protocol_1.Aki.Protocol.B4s.PAs,
      });
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Battle",
          19,
          "[CharacterDamageComponent]Request Buff Mode",
          ["isClientControl", t],
        ),
        Net_1.Net.Call(15846, e, (t) => {
          this.ReceiveSwitchServerLogMode(t.Jjn);
        });
    }
    static SecondsSinceStartup() {
      return (
        Time_1.Time.WorldTimeSeconds -
        CharacterGasDebugComponent_1.dGr -
        CharacterGasDebugComponent_1.sGr
      ).toFixed(2);
    }
    static SetDistanceMax(t) {}
    static BeginRecord() {
      (this.sGr = 0),
        (this.$qr = !0),
        (this.dGr = Time_1.Time.WorldTimeSeconds),
        (this.CGr = Time_1.Time.ServerTimeStamp),
        this.SetDamageRecord(!0),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.OnChangeRole,
          this.xie,
        ),
        (CharacterGasDebugComponent_1.rGr = void 0),
        CharacterGasDebugComponent_1.gGr(
          Global_1.Global.BaseCharacter.EntityId,
          !0,
          !1,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.OnAbsoluteTimeStop,
          this.fGr,
        );
    }
    static EndRecord() {
      var t;
      return this.$qr
        ? ((this.$qr = !1),
          this.SetDamageRecord(!1),
          EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.OnChangeRole,
            this.xie,
          ),
          EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.OnAbsoluteTimeStop,
            this.fGr,
          ),
          (t = this.pGr()),
          this.CleanupRecord(),
          t)
        : "";
    }
    static pGr() {
      var t = new Array(),
        e = "";
      let r = "";
      UE.KuroStaticLibrary.SaveStringToFile(
        "X秒,当前时间,对象,对象ID,对象名称,技能ID,技能类型,攻击,暴击,爆伤,生命,防御,伤害加成\n" +
          this.eGr.join("\n"),
        UE.BlueprintPathsLibrary.ProjectSavedDir() +
          this.Pt +
          "SkillRecord.csv",
        !0,
      );
      var a = new Array(),
        i =
          "X秒,当前时间,对象,对象ID,对象名称,子弹ID,子弹名称,伤害ID,技能ID,技能类型,子弹是否命中\n";
      for (const P of this.Zqr) {
        var n = this.zqr.get(P);
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
          i + this.vGr.join("\n"),
          UE.BlueprintPathsLibrary.ProjectSavedDir() +
            this.Pt +
            "DamageRecord.csv",
          !0,
        ),
        (i =
          "X秒,当前时间,对象,对象ID,对象名称,伤害来源,结算ID,子弹名称,伤害值,技能ID,技能名称,是否暴击,唯一ID,当前生命值,生命值上限,攻击,暴击,暴击伤害,防御,共鸣效率,共鸣能量上限,共鸣能量,普攻速度,重击速度,共鸣技能伤害加成,通用伤害加成,声骸技能伤害加成,普攻伤害加成,蓄力攻击伤害加成,共鸣解放伤害加成,连携技能伤害加成,物理伤害加成,冷凝伤害加成,热熔伤害加成,导电伤害加成,气动伤害加成,衍射伤害加成,解离伤害加成,物理伤害抗性,冷凝伤害抗性,热熔伤害抗性,导电伤害抗性,气动伤害抗性,衍射伤害抗性,解离伤害抗性,治疗效果加成,受治疗效果加成,通用受伤减免,物理伤害减免,冷凝伤害减免,热熔伤害减免,导电伤害减免,气动伤害减免,衍射伤害减免,解离伤害减免,韧性上限,韧性,韧性恢复速度,削韧倍率,被削韧倍率,狂暴上限,狂暴,狂暴恢复,空狂暴惩罚时间,破狂暴倍率,被破狂暴倍率,共振度上限,共振度上限,共振度恢复速度,空共振度惩罚时间,破共振度倍率,被破共振度倍率,当前生命值,生命值上限,攻击,暴击,暴击伤害,防御,共鸣效率,共鸣能量上限,共鸣能量,普攻速度,重击速度,共鸣技能伤害加成,通用伤害加成,声骸技能伤害加成,普攻伤害加成,蓄力攻击伤害加成,共鸣解放伤害加成,连携技能伤害加成,物理伤害加成,冷凝伤害加成,热熔伤害加成,导电伤害加成,气动伤害加成,衍射伤害加成,解离伤害加成,物理伤害抗性,冷凝伤害抗性,热熔伤害抗性,导电伤害抗性,气动伤害抗性,衍射伤害抗性,解离伤害抗性,治疗效果加成,受治疗效果加成,通用受伤减免,物理伤害减免,冷凝伤害减免,热熔伤害减免,导电伤害减免,气动伤害减免,衍射伤害减免,解离伤害减免,韧性上限,韧性,韧性恢复速度,削韧倍率,被削韧倍率,狂暴上限,狂暴,狂暴恢复,空狂暴惩罚时间,破狂暴倍率,被破狂暴倍率,共振度上限,共振度上限,共振度恢复速度,空共振度惩罚时间,破共振度倍率,被破共振度倍率,削刃,大招能量,元素能量类型,元素能量,当前生命值,生命值上限,攻击,暴击,暴击伤害,防御,共鸣效率,共鸣能量上限,共鸣能量,普攻速度,重击速度,共鸣技能伤害加成,通用伤害加成,声骸技能伤害加成,普攻伤害加成,蓄力攻击伤害加成,共鸣解放伤害加成,连携技能伤害加成,物理伤害加成,冷凝伤害加成,热熔伤害加成,导电伤害加成,气动伤害加成,衍射伤害加成,解离伤害加成,物理伤害抗性,冷凝伤害抗性,热熔伤害抗性,导电伤害抗性,气动伤害抗性,衍射伤害抗性,解离伤害抗性,治疗效果加成,受治疗效果加成,通用受伤减免,物理伤害减免,冷凝伤害减免,热熔伤害减免,导电伤害减免,气动伤害减免,衍射伤害减免,解离伤害减免,韧性上限,韧性,韧性恢复速度,削韧倍率,被削韧倍率,狂暴上限,狂暴,狂暴恢复,空狂暴惩罚时间,破狂暴倍率,被破狂暴倍率,共振度上限,共振度上限,共振度恢复速度,空共振度惩罚时间,破共振度倍率,被破共振度倍率,当前生命值,生命值上限,攻击,暴击,暴击伤害,防御,共鸣效率,共鸣能量上限,共鸣能量,普攻速度,重击速度,共鸣技能伤害加成,通用伤害加成,声骸技能伤害加成,普攻伤害加成,蓄力攻击伤害加成,共鸣解放伤害加成,连携技能伤害加成,物理伤害加成,冷凝伤害加成,热熔伤害加成,导电伤害加成,气动伤害加成,衍射伤害加成,解离伤害加成,物理伤害抗性,冷凝伤害抗性,热熔伤害抗性,导电伤害抗性,气动伤害抗性,衍射伤害抗性,解离伤害抗性,治疗效果加成,受治疗效果加成,通用受伤减免,物理伤害减免,冷凝伤害减免,热熔伤害减免,导电伤害减免,气动伤害减免,衍射伤害减免,解离伤害减免,韧性上限,韧性,韧性恢复速度,削韧倍率,被削韧倍率,狂暴上限,狂暴,狂暴恢复,空狂暴惩罚时间,破狂暴倍率,被破狂暴倍率,共振度上限,共振度上限,共振度恢复速度,空共振度惩罚时间,破共振度倍率,被破共振度倍率,白条倍率,白条倍率百分比0,白条倍率百分比1,削刃,大招能量,元素能量类型,元素能量,存在的BuffID,存在的Buff名称,存在的BuffID,存在的Buff名称\n"),
        UE.KuroStaticLibrary.SaveStringToFile(
          i + this.MGr.join("\n"),
          UE.BlueprintPathsLibrary.ProjectSavedDir() +
            this.Pt +
            "DamageRecord_Attr.csv",
          !0,
        ),
        (i =
          "X秒,当前时间,对象,对象ID,对象名称,伤害来源,结算ID,子弹名称,伤害值,技能ID,技能名称,唯一ID,是否暴击,当前生命值,生命值上限,攻击,暴击,暴击伤害,防御,共鸣效率,共鸣能量上限,共鸣能量,普攻速度,重击速度,共鸣技能伤害加成,通用伤害加成,声骸技能伤害加成,普攻伤害加成,蓄力攻击伤害加成,共鸣解放伤害加成,连携技能伤害加成,物理伤害加成,冷凝伤害加成,热熔伤害加成,导电伤害加成,气动伤害加成,衍射伤害加成,解离伤害加成,物理伤害抗性,冷凝伤害抗性,热熔伤害抗性,导电伤害抗性,气动伤害抗性,衍射伤害抗性,解离伤害抗性,治疗效果加成,受治疗效果加成,通用受伤减免,物理伤害减免,冷凝伤害减免,热熔伤害减免,导电伤害减免,气动伤害减免,衍射伤害减免,解离伤害减免,韧性上限,韧性,韧性恢复速度,削韧倍率,被削韧倍率,狂暴上限,狂暴,狂暴恢复,空狂暴惩罚时间,破狂暴倍率,被破狂暴倍率,共振度上限,共振度上限,共振度恢复速度,空共振度惩罚时间,破共振度倍率,被破共振度倍率,当前生命值,生命值上限,攻击,暴击,暴击伤害,防御,共鸣效率,共鸣能量上限,共鸣能量,普攻速度,重击速度,共鸣技能伤害加成,通用伤害加成,声骸技能伤害加成,普攻伤害加成,蓄力攻击伤害加成,共鸣解放伤害加成,连携技能伤害加成,物理伤害加成,冷凝伤害加成,热熔伤害加成,导电伤害加成,气动伤害加成,衍射伤害加成,解离伤害加成,物理伤害抗性,冷凝伤害抗性,热熔伤害抗性,导电伤害抗性,气动伤害抗性,衍射伤害抗性,解离伤害抗性,治疗效果加成,受治疗效果加成,通用受伤减免,物理伤害减免,冷凝伤害减免,热熔伤害减免,导电伤害减免,气动伤害减免,衍射伤害减免,解离伤害减免,韧性上限,韧性,韧性恢复速度,削韧倍率,被削韧倍率,狂暴上限,狂暴,狂暴恢复,空狂暴惩罚时间,破狂暴倍率,被破狂暴倍率,共振度上限,共振度上限,共振度恢复速度,空共振度惩罚时间,破共振度倍率,被破共振度倍率,削刃,大招能量,元素能量类型,元素能量,存在的BuffID,存在的Buff名称,存在的BuffID,存在的Buff名称\n"),
        UE.KuroStaticLibrary.SaveStringToFile(
          i + this.EGr.join("\n"),
          UE.BlueprintPathsLibrary.ProjectSavedDir() +
            this.Pt +
            "DamageRecord_Snipeshot.csv",
          !0,
        ),
        (r =
          "X秒,当前时间,对象,对象ID,对象名称,BuffId,Buff名称,添加or删除\n" +
          this.SGr.join("\n")),
        UE.KuroStaticLibrary.SaveStringToFile(
          r,
          UE.BlueprintPathsLibrary.ProjectSavedDir() +
            this.Pt +
            "BuffRecord.csv",
          !0,
        );
      for (const V of this.yGr.values()) t.push(V.ToCsv().join(","));
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
      for (const x of this.IGr.values()) t.push(x.ToCsvForRole().join(","));
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
      for (const j of this.TGr.values()) t.push(j.ToCsvForMonster().join(","));
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
      var o =
        Time_1.Time.WorldTimeSeconds -
        CharacterGasDebugComponent_1.dGr -
        CharacterGasDebugComponent_1.sGr;
      let s = 0;
      for (; o >= s; ) (r += ",'" + s.toString() + "s'"), (s += 0.5);
      let h = "";
      var i = (0, puerts_1.$ref)(h),
        u =
          (UE.FileSystemOperation.ReadFile(
            UE.KismetSystemLibrary.GetProjectDirectory() +
              "../Config/ResConfig/RoleDspTpl.txt",
            i,
          ),
          (h = (h = (0, puerts_1.$unref)(i)).replace("TPL_XAXIS_VALUES", r)),
          new StringBuilder_1.StringBuilder()),
        _ = new Map(),
        C = new Map(),
        l = new Map(),
        c = new Map(),
        f = new Map(),
        g = new Map(),
        m = new Map(),
        b = new Map(),
        p = new Map();
      for (s = 0; o >= s; ) {
        for (var [D, d] of CharacterGasDebugComponent_1.rGr) {
          c.has(D) || c.set(D, new Array()),
            f.has(D) || f.set(D, new Array()),
            g.has(D) || g.set(D, new Array()),
            m.has(D) || m.set(D, new Array()),
            b.has(D) || b.set(D, new Array()),
            p.has(D) || p.set(D, new Array()),
            _.has(D) || _.set(D, 0),
            C.has(D) || C.set(D, 0),
            l.has(D) || l.set(D, !1);
          let t = !1,
            e = !1;
          for (; !d.Empty; ) {
            var E = d.Top;
            if (!(E.TimeStamp <= this.dGr + s)) break;
            0 < E.DamageValue
              ? _.set(D, _.get(D) + E.DamageValue)
              : E.InGame
                ? l.set(D, !0)
                : E.OutGame
                  ? l.set(D, !1)
                  : E.QteBegin
                    ? (t = !0)
                    : E?.OutGameSkill && (e = !0),
              d.Pop(),
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug("Character", 20, "打印时间", [
                  "time",
                  E.TimeStamp,
                ]);
          }
          c.get(D).push(_.get(D)),
            f.get(D).push(l.get(D) ? "-10" : "'-'"),
            g.get(D).push(t ? "-20" : "'-'"),
            m.get(D).push(e ? "-30" : "'-'");
          var v = C.get(D);
          p.get(D).push(0 < v ? _.get(D) / v : 0),
            b.get(D).push(0 < s ? _.get(D) / s : 0),
            l.get(D) && C.set(D, C.get(D) + 0.5);
        }
        s += 0.5;
      }
      var A,
        y,
        G,
        I,
        q,
        M,
        N,
        O,
        S,
        L,
        F,
        U,
        k,
        H,
        w,
        Q,
        X,
        T = [],
        R = [],
        B = [];
      for ([A, y] of c) {
        var $ = EntitySystem_1.EntitySystem.Get(A);
        $?.Valid
          ? (T.push(A),
            ($ = ($ = $.GetComponent(0)).Valid ? $.GetRoleId() : 0),
            ($ = ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId($))
              ? (($ =
                  ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig($)),
                ($ = ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(
                  $.Name,
                )),
                R.push($),
                u.Append(
                  StringUtils_1.StringUtils.Format(
                    "{name: '{0}伤害', type: 'line', data: [{1}],},",
                    $,
                    y.join(","),
                  ),
                ))
              : B.push(A))
          : B.push(A);
      }
      for ([G, I] of b)
        B.includes(G) ||
          ((q = T.indexOf(G)),
          u.Append(
            StringUtils_1.StringUtils.Format(
              "{name: '{0}绝对DPS', type: 'line', data: [{1}],},",
              R[q],
              I.join(","),
            ),
          ));
      for ([M, N] of p)
        B.includes(M) ||
          ((O = T.indexOf(M)),
          u.Append(
            StringUtils_1.StringUtils.Format(
              "{name: '{0}站场DPS', type: 'line', data: [{1}],},",
              R[O],
              N.join(","),
            ),
          ));
      for ([S, L] of f)
        B.includes(S) ||
          ((F = T.indexOf(S)),
          u.Append(
            StringUtils_1.StringUtils.Format(
              "{name: '{0}在场上', type: 'line', data: [{1}],},",
              R[F],
              L.join(","),
            ),
          ));
      for ([U, k] of g)
        B.includes(U) ||
          ((H = T.indexOf(U)),
          u.Append(
            StringUtils_1.StringUtils.Format(
              "{name: '{0}QTE', type: 'line', data: [{1}],},",
              R[H],
              k.join(","),
            ),
          ));
      for ([w, Q] of m)
        B.includes(w) ||
          ((X = T.indexOf(w)),
          u.Append(
            StringUtils_1.StringUtils.Format(
              "{name: '{0}退场技', type: 'line', data: [{1}],},",
              R[X],
              Q.join(","),
            ),
          ));
      return (
        (h = h.replace("CONTENT_SERIES", u.ToString())),
        UE.KuroStaticLibrary.SaveStringToFile(
          h,
          UE.BlueprintPathsLibrary.ProjectSavedDir() + this.Pt + "RoleDsp.html",
          !0,
        ),
        e
      );
    }
    Yqr(t) {
      return CharacterStatisticsComponent_1.CharacterStatisticsComponent.IsInRecordArea(
        t,
      );
    }
    static RecordDamage(a, i, n, o) {
      var s = new Array(),
        n = (s.push(n), s.push(o), CharacterGasDebugComponent_1.LGr(a));
      if (n) {
        s.push(n.Type),
          s.push(n.ConfigId),
          s.push(n.Name),
          a.GetComponent(93) ? s.push("角色") : s.push("怪物"),
          s.push(MathUtils_1.MathUtils.LongToBigInt(i.KAs).toString());
        let t = ConfigManager_1.ConfigManager.BulletConfig.GetBulletData(
            a,
            MathUtils_1.MathUtils.LongToBigInt(i.Mjn).toString(),
            !1,
          ),
          e = void 0;
        t ||
          ((o =
            ControllerHolder_1.ControllerHolder.WorldController.GetCustomEntityId(
              a.Id,
              1,
            )),
          (e = EntitySystem_1.EntitySystem.Get(o))?.Valid &&
            (t = ConfigManager_1.ConfigManager.BulletConfig.GetBulletData(
              e,
              MathUtils_1.MathUtils.LongToBigInt(i.Mjn).toString(),
            ))),
          s.push(t?.BulletName ?? ""),
          s.push(i.QAs.toFixed()),
          s.push(i.r5n.toFixed());
        let r = a.GetComponent(38)?.GetSkillInfo(i.r5n);
        (r = r || e?.GetComponent(38)?.GetSkillInfo(i.r5n)),
          s.push(r?.SkillName?.toString()),
          s.push(MathUtils_1.MathUtils.LongToBigInt(i.Zjn.F4n).toString());
        var n = a?.CheckGetComponent(0).GetPbDataId().toFixed(),
          h = (s.push(n), s.length);
        for (const u of i.JAs.HAs)
          u.tSs === EAttributeId.Proto_Atk
            ? (s[h] = u.y6n.toFixed())
            : u.tSs === EAttributeId.Proto_Crit
              ? (s[h + 1] = u.y6n.toFixed())
              : u.tSs === EAttributeId.Proto_CritDamage
                ? (s[h + 2] = u.y6n.toFixed())
                : u.tSs === EAttributeId.Proto_Life
                  ? (s[h + 3] = u.y6n.toFixed())
                  : u.tSs === EAttributeId.Proto_Def
                    ? (s[h + 4] = u.y6n.toFixed())
                    : u.tSs === EAttributeId.Proto_DamageChange &&
                      (s[h + 5] = u.y6n.toFixed());
        CharacterGasDebugComponent_1.vGr.push(s.join(","));
        (o = ModelManager_1.ModelManager.CreatureModel.GetEntityId(
          MathUtils_1.MathUtils.LongToNumber(i.JAs.F4n),
        )),
          (n = EntitySystem_1.EntitySystem.Get(o));
        CharacterGasDebugComponent_1.DGr(n, a, i.QAs, r?.SkillGenre);
      }
    }
    static DGr(t, e, r, a) {
      let i = this.IGr;
      t?.GetComponent(93) || (i = this.TGr);
      var n,
        o = t.Id.toFixed() + e.Id.toFixed(),
        s = i.get(o);
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
    static tGr(t, e, r) {
      var a = t?.GetComponent(3).Actor.GetName() ?? "",
        t = t?.CheckGetComponent(0).GetPbDataId() ?? 0,
        e = e?.Id ?? 0,
        i = this.yGr.get(t + e);
      i
        ? i.RecordNum.set(r, i.RecordNum.get(r) + 1)
        : (((i = new RecordMoveSum()).ConfigId = t),
          (i.Name = a),
          (i.TargetUniqueId = e),
          i.RecordNum.set(r, 1),
          this.yGr.set(t + e, i));
    }
    cGr(t, e) {
      return !t || e.includes(t) || t.includes(e);
    }
    GetServerBuffString() {
      if (!this.ServerDebugInfo?.xAs?.SIs) return "";
      let t = "";
      for (const i of this.ServerDebugInfo.xAs.SIs) {
        var e = MathUtils_1.MathUtils.LongToNumber(i.b6n),
          r = MathUtils_1.MathUtils.LongToBigInt(i.Rjn).toString(),
          a = CharacterBuffController_1.default.GetBuffDefinition(e),
          a = a ? a.Desc : "";
        t += this.RGr(
          e.toString(),
          i.cVn,
          a,
          i.Bjn,
          i.F6n,
          i.WHn,
          r,
          i.QEs,
          i.n5n,
        );
      }
      if (0 < this.ServerDebugInfo.xAs.EIs.length) {
        t += "\nCD : \n";
        for (const n of this.ServerDebugInfo.xAs.EIs)
          if (!(n.GTs.length <= 0)) {
            t +=
              "[" + MathUtils_1.MathUtils.LongToBigInt(n.b6n).toString() + "] ";
            for (const o of n.GTs) t += o.toFixed() + ", ";
          }
      }
      return t;
    }
    GetServerBuffRemainDuration(t) {
      if (!this.ServerDebugInfo?.xAs?.SIs) return -1;
      let e = -1;
      for (const r of this.ServerDebugInfo.xAs.SIs)
        if (r.cVn === t) {
          e = r.QEs;
          break;
        }
      return e;
    }
    GetServerBuffTotalDuration(t) {
      if (!this.ServerDebugInfo?.xAs?.SIs) return -1;
      let e = 0;
      for (const r of this.ServerDebugInfo.xAs.SIs)
        if (r.cVn === t) {
          e = r.n5n;
          break;
        }
      return e;
    }
    HasBuffRequest(t) {
      return this.li1.has(t);
    }
    HasServerBuff(t) {
      if (this.ServerDebugInfo?.xAs?.SIs)
        for (const e of this.ServerDebugInfo.xAs.SIs)
          if (e.cVn === t) return !0;
      return !1;
    }
    RGr(t, e, r, a, i, n, o, s, h) {
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
        h.toFixed() +
        ". " +
        r +
        "\n"
      );
    }
    GetServerTagString() {
      let t = "";
      if (this.ServerDebugInfo?.bAs)
        for (const e of this.ServerDebugInfo.bAs)
          t =
            t +
            GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(e.m5n)
              .TagName +
            " " +
            e.m9n.toString() +
            "\n";
      if (this.ServerDebugInfo?.qAs)
        for (const r of this.ServerDebugInfo.qAs)
          t =
            t +
            "[编] " +
            GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(r.m5n)
              .TagName +
            " " +
            r.m9n.toString() +
            "\n";
      return t;
    }
    GetServerAttributeString() {
      if (!this.ServerDebugInfo?.GSs) return "";
      let t = "";
      for (const e of this.ServerDebugInfo.GSs)
        t =
          t +
          e.tSs +
          " " +
          Protocol_1.Aki.Protocol.Vks[e.tSs] +
          ":[" +
          e.eSs.toString() +
          "][" +
          e.y6n.toString() +
          "]\n";
      t += "\n队伍属性：\n";
      for (const r of this.ServerDebugInfo.M6n)
        t =
          t +
          r.E6n.toString() +
          "=" +
          r.y6n.toString() +
          "/" +
          r.I6n.toString() +
          "(" +
          r.L6n.toString() +
          "/s)\n";
      return t;
    }
    GetServerPartString() {
      if (!this.ServerDebugInfo?.BAs?.PTs) return "";
      let t = "";
      for (const e of this.ServerDebugInfo.BAs.PTs)
        t +=
          e.jjn +
          " :  " +
          e.eWn.toFixed(1) +
          " / " +
          e.l5n.toFixed(1) +
          ", " +
          e._5n +
          "\n";
      return t;
    }
    GetServerHateString() {
      if (!this.ServerDebugInfo?.ISs) return "";
      let t = "";
      for (const e of this.ServerDebugInfo.ISs)
        t +=
          MathUtils_1.MathUtils.LongToBigInt(e.F4n) +
          " : " +
          e.Z8n.toFixed(1) +
          "\n";
      return t;
    }
    GetServerShieldString() {
      if (!this.ServerDebugInfo?.Jys) return "";
      let t = "护盾总值: " + this.ServerDebugInfo.Jys.RTs + "\n";
      for (const e of this.ServerDebugInfo.Jys.LTs)
        t +=
          "[" +
          e.v9n +
          "," +
          e.uVn +
          "] " +
          (e.TTs ? "生效" : "失效") +
          ", " +
          e.ETs +
          "," +
          e.ITs +
          "," +
          e.yTs +
          "\n";
      return t;
    }
    GetCltBuffHandleSet() {
      const e = new Set();
      return (
        this.Entity.GetComponent(207)
          ?.GetAllBuffs()
          ?.forEach((t) => e.add(t.Handle)),
        e
      );
    }
    Union(e, t) {
      t.forEach((t) => !e.has(t) && e.add(t));
    }
    ServerDebugInfoRequest() {
      this.ci1 += 1;
      const e = this.ci1,
        r = this.GetCltBuffHandleSet();
      this.li1.forEach((t) => !r.has(t) && this.li1.delete(t)),
        this._i1.set(e, r);
      var t = Protocol_1.Aki.Protocol.Uis.create();
      (t.F4n = MathUtils_1.MathUtils.NumberToLong(
        ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(
          this.Entity.Id,
        ),
      )),
        Net_1.Net.Call(15019, t, (t) => {
          this._i1.has(e) &&
            (this.Union(this.li1, this._i1.get(e)), this._i1.delete(e)),
            t && ((this.ServerDebugInfo = t), (this.ServerDebugInfoDirty = !0));
        });
    }
    OnBuffAdded(t) {
      CharacterGasDebugComponent_1.$qr &&
        (t = this.UGr(t, "添加")) &&
        CharacterGasDebugComponent_1.SGr.push(t.join(","));
    }
    OnBuffRemoved(t) {
      CharacterGasDebugComponent_1.$qr &&
        (t = this.UGr(t, "删除")) &&
        CharacterGasDebugComponent_1.SGr.push(t.join(","));
    }
    UGr(t, e) {
      var r = new Array(),
        a =
          (r.push(CharacterGasDebugComponent_1.SecondsSinceStartup()),
          r.push(CharacterGasDebugComponent_1.Jqr(Date.now())),
          t.GetInstigator()),
        a = a ? CharacterGasDebugComponent_1.LGr(a) : void 0;
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
    static LGr(t) {
      var e,
        t = t.GetComponent(0),
        r = t.GetEntityType();
      return r === Protocol_1.Aki.Protocol.kks.Proto_Player
        ? ((e = t.Valid ? t.GetRoleId() : 0),
          (e = ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId(e))
            ? ((e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e)),
              {
                Name: ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(
                  e.Name,
                ),
                Type: "角色",
                ConfigId: t.GetPbDataId().toFixed(),
              })
            : void 0)
        : r === Protocol_1.Aki.Protocol.kks.Proto_Monster
          ? {
              Name: PublicUtil_1.PublicUtil.GetConfigTextByKey(
                t.GetEntityTidName() ?? "",
              ),
              Type: "怪物",
              ConfigId: t.GetPbDataId().toFixed(),
            }
          : void 0;
    }
    static SetDamageRecord(t) {
      var e = Protocol_1.Aki.Protocol.Debug.GZn.create();
      (e.tWn = t),
        Net_1.Net.Call(27732, e, (t) => {
          t &&
            Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("CombatInfo", 20, "", ["Response", t]);
        });
    }
    static OnDamageRecordNotify(e, r) {
      Info_1.Info.IsBuildShipping ||
        TestModuleBridge_1.TestModuleBridge.TryGetTestModuleExports().then(
          (t) => {
            t && t.RoleTest && t.RoleTest.RecordDamageNotify(e, r);
          },
        );
      var t,
        a,
        i = EntitySystem_1.EntitySystem.Get(
          ModelManager_1.ModelManager.CreatureModel.GetEntityId(
            MathUtils_1.MathUtils.LongToNumber(r.Zjn.F4n),
          ),
        );
      i.GetComponent(27)?.GetStatisticsEnable() &&
        ((t = (
          0.001 *
            (MathUtils_1.MathUtils.LongToNumber(r.WAs) -
              CharacterGasDebugComponent_1.CGr) -
          CharacterGasDebugComponent_1.sGr
        ).toFixed(2)),
        (a = this.Jqr(r.WAs)),
        this.RecordDamage(i, r, t, a),
        this.AGr(i, r, t, a),
        this.PGr(i, r, t, a),
        this.xGr(i, r));
    }
    static xGr(e, r) {
      var a = e.GetComponent(0);
      if (a && a.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Player) {
        this.rGr || (this.rGr = new Map());
        a = e.Id;
        let t = this.rGr.get(a);
        t ||
          ((t = new PriorityQueue_1.PriorityQueue(this.nGr)),
          this.rGr.set(a, t));
        e = new DamageRecordDsp(
          Time_1.Time.WorldTimeSeconds - CharacterGasDebugComponent_1.sGr,
          r.QAs,
          !1,
          !1,
          !1,
          !1,
        );
        t.Push(e);
      }
    }
    static gGr(t, e, r) {
      CharacterGasDebugComponent_1.rGr ||
        (CharacterGasDebugComponent_1.rGr = new Map());
      let a = CharacterGasDebugComponent_1.rGr.get(t);
      a ||
        ((a = new PriorityQueue_1.PriorityQueue(
          CharacterGasDebugComponent_1.nGr,
        )),
        CharacterGasDebugComponent_1.rGr.set(t, a));
      t = new DamageRecordDsp(
        Time_1.Time.WorldTimeSeconds - CharacterGasDebugComponent_1.sGr,
        -1,
        !1,
        e,
        r,
        !1,
      );
      a.Push(t);
    }
    static PGr(a, i, n, o) {
      var t = MathUtils_1.MathUtils.LongToNumber(i.KAs),
        s = ModelManager_1.ModelManager.DamageModel?.GetDamageConfigById(t);
      if (s) {
        var h = new Array(),
          n = (h.push(n), h.push(o), CharacterGasDebugComponent_1.LGr(a));
        if (n) {
          h.push(n.Type),
            h.push(n.ConfigId),
            h.push(n.Name),
            h.push(
              i.XAs === Protocol_1.Aki.Protocol.XAs.Proto_FromBullet
                ? "子弹"
                : "Buff",
            ),
            h.push(MathUtils_1.MathUtils.LongToBigInt(i.KAs).toString());
          let t = ConfigManager_1.ConfigManager.BulletConfig.GetBulletData(
              a,
              MathUtils_1.MathUtils.LongToBigInt(i.Mjn).toString(),
              !1,
            ),
            e = void 0;
          t ||
            ((o =
              ControllerHolder_1.ControllerHolder.WorldController.GetCustomEntityId(
                a.Id,
                1,
              )),
            (e = EntitySystem_1.EntitySystem.Get(o))?.Valid &&
              (t = ConfigManager_1.ConfigManager.BulletConfig.GetBulletData(
                e,
                MathUtils_1.MathUtils.LongToBigInt(i.Mjn).toString(),
              ))),
            h.push(t?.BulletName ?? ""),
            h.push(i.QAs.toFixed()),
            h.push(i.r5n.toFixed());
          let r = a.GetComponent(38)?.GetSkillInfo(i.r5n)?.SkillName;
          (r = r || e?.GetComponent(38)?.GetSkillInfo(i.r5n)?.SkillName),
            h.push(r?.toString() ?? ""),
            h.push(MathUtils_1.MathUtils.LongToBigInt(i.Zjn.F4n).toString()),
            h.push(i.YAs ? "1" : "0");
          var n = h.length,
            o =
              (this.wGr(i.JAs.jAs, h, n),
              this.wGr(i.Zjn.jAs, h, n + 59),
              i.Wjn),
            u =
              ((h[n + 118] = AbilityUtils_1.AbilityUtils.GetLevelValue(
                s.ToughLv,
                o,
                0,
              ).toString()),
              (h[n + 119] = AbilityUtils_1.AbilityUtils.GetLevelValue(
                s.Energy,
                o,
                0,
              ).toString()),
              (h[n + 120] = s.ElementPowerType.toString()),
              (h[n + 121] = AbilityUtils_1.AbilityUtils.GetLevelValue(
                s.ElementPower,
                o,
                0,
              ).toString()),
              new Array()),
            _ = new Array();
          for (const g of i.Zjn.$As) {
            var C = MathUtils_1.MathUtils.LongToNumber(g),
              l = CharacterBuffController_1.default.GetBuffDefinition(C);
            u.push(l.Desc), _.push(C);
          }
          (h[n + 122] = _.join("|")),
            (h[n + 123] = u.join("|")),
            (u.length = 0),
            (_.length = 0);
          for (const m of i.JAs.$As) {
            var c = MathUtils_1.MathUtils.LongToNumber(m),
              f = CharacterBuffController_1.default.GetBuffDefinition(c);
            u.push(f.Desc), _.push(c);
          }
          (h[n + 124] = _.join("|")), (h[n + 125] = u.join("|"));
          s = h.join(",");
          this.EGr.push(s),
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Recorder", 20, "结算信息Snapshot", [
                "Result",
                s,
              ]);
        }
      } else
        (o = a.GetComponent(1)?.Owner?.ActorLabel),
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Test",
              20,
              "伤害配置为空",
              ["伤害ID", t],
              ["Name", o ?? ""],
            );
    }
    static Jqr(t) {
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
    static AGr(a, i, n, o) {
      var t = MathUtils_1.MathUtils.LongToNumber(i.KAs),
        s = ModelManager_1.ModelManager.DamageModel?.GetDamageConfigById(t);
      if (s) {
        var h = new Array(),
          n = (h.push(n), h.push(o), CharacterGasDebugComponent_1.LGr(a));
        if (n) {
          h.push(n.Type),
            h.push(n.ConfigId),
            h.push(n.Name),
            h.push(
              i.XAs === Protocol_1.Aki.Protocol.XAs.Proto_FromBullet
                ? "子弹"
                : "Buff",
            ),
            h.push(MathUtils_1.MathUtils.LongToBigInt(i.KAs).toString());
          let t = ConfigManager_1.ConfigManager.BulletConfig.GetBulletData(
              a,
              MathUtils_1.MathUtils.LongToBigInt(i.Mjn).toString(),
              !1,
            ),
            e = void 0;
          t ||
            ((o =
              ControllerHolder_1.ControllerHolder.WorldController.GetCustomEntityId(
                a.Id,
                1,
              )),
            (e = EntitySystem_1.EntitySystem.Get(o))?.Valid &&
              (t = ConfigManager_1.ConfigManager.BulletConfig.GetBulletData(
                e,
                MathUtils_1.MathUtils.LongToBigInt(i.Mjn).toString(),
              ))),
            h.push(t?.BulletName ?? ""),
            h.push(i.QAs.toFixed()),
            h.push(i.r5n.toFixed());
          let r = a.GetComponent(38)?.GetSkillInfo(i.r5n)?.SkillName;
          (r = r || e?.GetComponent(38)?.GetSkillInfo(i.r5n)?.SkillName),
            h.push(r?.toString() ?? ""),
            h.push(i.YAs ? "1" : "0"),
            h.push(MathUtils_1.MathUtils.LongToBigInt(i.Zjn.F4n).toString());
          var u = h.length,
            _ =
              (CharacterGasDebugComponent_1.BGr(i.JAs.HAs, h, u, u + 122),
              EAttributeId.Proto_ElementEnergy);
          h[u + 120] = s.ElementPowerType.toString();
          for (const b of i.Zjn.HAs)
            b.tSs === EAttributeId.Proto_ToughChange
              ? (h[u + 118] = b.y6n.toFixed())
              : b.tSs === EAttributeId.Proto_Energy
                ? (h[u + 119] = b.y6n.toFixed())
                : _ && b.tSs === _ && (h[u + 121] = b.y6n.toFixed());
          CharacterGasDebugComponent_1.BGr(i.Zjn.HAs, h, u + 59, u + 181);
          var n = i.Wjn,
            C =
              ((h[u + 240] = AbilityUtils_1.AbilityUtils.GetLevelValue(
                s.HardnessLv,
                n,
                0,
              ).toString()),
              (h[u + 241] = AbilityUtils_1.AbilityUtils.GetLevelValue(
                s.Percent0,
                n,
                0,
              ).toString()),
              (h[u + 242] = AbilityUtils_1.AbilityUtils.GetLevelValue(
                s.Percent1,
                n,
                0,
              ).toString()),
              (h[u + 243] = AbilityUtils_1.AbilityUtils.GetLevelValue(
                s.ToughLv,
                n,
                0,
              ).toString()),
              (h[u + 244] = AbilityUtils_1.AbilityUtils.GetLevelValue(
                s.Energy,
                n,
                0,
              ).toString()),
              (h[u + 245] = s.ElementPowerType.toString()),
              (h[u + 246] = AbilityUtils_1.AbilityUtils.GetLevelValue(
                s.ElementPower,
                n,
                0,
              ).toString()),
              new Array()),
            l = new Array();
          for (const p of i.Zjn.$As) {
            var c = MathUtils_1.MathUtils.LongToNumber(p),
              f = CharacterBuffController_1.default.GetBuffDefinition(c);
            C.push(f.Desc), l.push(c);
          }
          (h[u + 247] = l.join("|")),
            (h[u + 248] = C.join("|")),
            (C.length = 0),
            (l.length = 0);
          for (const D of i.JAs.$As) {
            var g = MathUtils_1.MathUtils.LongToNumber(D),
              m = CharacterBuffController_1.default.GetBuffDefinition(g);
            C.push(m.Desc), l.push(g);
          }
          (h[u + 249] = l.join("|")), (h[u + 250] = C.join("|"));
          o = h.join(",");
          this.MGr.push(o),
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Recorder", 20, "结算信息Attr", ["Result", o]);
        }
      } else
        (s = a.GetComponent(1)?.Owner?.ActorLabel),
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Test",
              20,
              "伤害配置为空",
              ["伤害ID", t],
              ["Name", s ?? ""],
            );
    }
    static BGr(t, r, a, i) {
      for (const n of t)
        for (let t = 0, e = attributeIdArray.length; t < e; t++)
          if (n.tSs === attributeIdArray[t]) {
            (r[a + t] = (0 < n.y6n ? n.y6n : n.eSs).toString()),
              (r[i + t] = n.eSs.toString());
            break;
          }
    }
    static wGr(t, r, a) {
      for (const i of t)
        for (let t = 0, e = attributeIdArray.length; t < e; t++)
          if (i.tSs === attributeIdArray[t]) {
            r[a + t] = (0 < i.y6n ? i.y6n : i.eSs).toString();
            break;
          }
    }
    static CleanupRecord() {
      (CharacterGasDebugComponent_1.Qyn = !1),
        (CharacterGasDebugComponent_1.sGr = 0),
        (CharacterGasDebugComponent_1.eGr.length = 0),
        (CharacterGasDebugComponent_1.vGr.length = 0),
        CharacterGasDebugComponent_1.yGr.clear(),
        CharacterGasDebugComponent_1.IGr.clear(),
        CharacterGasDebugComponent_1.TGr.clear(),
        CharacterGasDebugComponent_1.zqr.clear(),
        (CharacterGasDebugComponent_1.Zqr.length = 0),
        (CharacterGasDebugComponent_1.SGr.length = 0),
        CharacterGasDebugComponent_1.rGr?.clear(),
        (CharacterGasDebugComponent_1.EGr.length = 0),
        (CharacterGasDebugComponent_1.MGr.length = 0);
    }
  });
(CharacterGasDebugComponent.mGr = !1),
  (CharacterGasDebugComponent.$qr = !1),
  (CharacterGasDebugComponent.dGr = 0),
  (CharacterGasDebugComponent.CGr = 0),
  (CharacterGasDebugComponent.eGr = new Array()),
  (CharacterGasDebugComponent.vGr = new Array()),
  (CharacterGasDebugComponent.yGr = new Map()),
  (CharacterGasDebugComponent.IGr = new Map()),
  (CharacterGasDebugComponent.TGr = new Map()),
  (CharacterGasDebugComponent.zqr = new Map()),
  (CharacterGasDebugComponent.Zqr = new Array()),
  (CharacterGasDebugComponent.Pt = "Statistics/FightDataRecord/"),
  (CharacterGasDebugComponent.SGr = new Array()),
  (CharacterGasDebugComponent.rGr = void 0),
  (CharacterGasDebugComponent.nGr = (t, e) => t.TimeStamp - e.TimeStamp),
  (CharacterGasDebugComponent.xie = (t, e) => {
    CharacterGasDebugComponent_1.gGr(t.Id, !0, !1),
      e && CharacterGasDebugComponent_1.gGr(e.Id, !1, !0);
  }),
  (CharacterGasDebugComponent.EGr = new Array()),
  (CharacterGasDebugComponent.MGr = new Array()),
  (CharacterGasDebugComponent.Qyn = !1),
  (CharacterGasDebugComponent.sGr = 0),
  (CharacterGasDebugComponent.Xyn = 0),
  (CharacterGasDebugComponent.fGr = (t) => {
    CharacterGasDebugComponent_1.Qyn = t;
  }),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("s3n", !0)],
    CharacterGasDebugComponent,
    "OnDamageRecordNotify",
    null,
  ),
  (CharacterGasDebugComponent = CharacterGasDebugComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(22)],
      CharacterGasDebugComponent,
    )),
  (exports.CharacterGasDebugComponent = CharacterGasDebugComponent);
//# sourceMappingURL=CharacterGasDebugComponent.js.map
