"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
const FormationPropertyAll_1 = require("../../Core/Define/ConfigQuery/FormationPropertyAll");
const PassiveSkillById_1 = require("../../Core/Define/ConfigQuery/PassiveSkillById");
const Protocol_1 = require("../../Core/Define/Net/Protocol");
const EntitySystem_1 = require("../../Core/Entity/EntitySystem");
const RegisterComponent_1 = require("../../Core/Entity/RegisterComponent");
const GameplayTagUtils_1 = require("../../Core/Utils/GameplayTagUtils");
const FormationAttributeController_1 = require("../Module/Abilities/FormationAttributeController");
const CharacterAttributeTypes_1 = require("../NewWorld/Character/Common/Component/Abilities/CharacterAttributeTypes");
const CharacterTagContainer_1 = require("../NewWorld/Character/Common/Component/Abilities/CharacterTagContainer");
const TriggerType_1 = require("../NewWorld/Character/Common/Component/Abilities/Trigger/TriggerType");
const CombatDebugController_1 = require("./CombatDebugController");
const CombatDebugDrawController_1 = require("./CombatDebugDrawController");
class CombatDebugBlueprintFunctionLibrary extends UE.BlueprintFunctionLibrary {
  static GetDebugMonsterMovePath() {
    return CombatDebugDrawController_1.CombatDebugDrawController
      .DebugMonsterMovePath;
  }
  static SetDebugMonsterMovePath(t) {
    CombatDebugDrawController_1.CombatDebugDrawController.DebugMonsterMovePath =
      t;
  }
  static GetDebugMonsterControl() {
    return CombatDebugDrawController_1.CombatDebugDrawController
      .DebugMonsterControl;
  }
  static SetDebugMonsterControl(t) {
    CombatDebugDrawController_1.CombatDebugDrawController.DebugMonsterControl =
      t;
  }
  static IsDrawEntityBoxEnabled() {
    return (
      CombatDebugDrawController_1.CombatDebugDrawController
        .IsDrawEntityBoxEnabled ?? !1
    );
  }
  static SetDrawEntityBoxEnabled(t) {
    CombatDebugDrawController_1.CombatDebugDrawController.IsDrawEntityBoxEnabled =
      t;
  }
  static IsDrawEntityBoxInfoEnabled() {
    return (
      CombatDebugDrawController_1.CombatDebugDrawController
        .IsDrawEntityBoxInfoEnabled ?? !1
    );
  }
  static SetDrawEntityBoxInfoEnabled(t) {
    CombatDebugDrawController_1.CombatDebugDrawController.IsDrawEntityBoxInfoEnabled =
      t;
  }
  static GetCombatScriptIndexes() {
    return CombatDebugController_1.CombatDebugController.ScriptHelper
      .CombatScriptIndexes;
  }
  static FilterScript(t) {
    return CombatDebugController_1.CombatDebugController.FilterCmd(t);
  }
  static TryRefreshServerDebugInfo() {
    CombatDebugController_1.CombatDebugController.RefreshServerDebugInfo();
  }
  static GetServerBuffRemainDuration(t, r) {
    return (
      EntitySystem_1.EntitySystem.Get(t)
        ?.GetComponent(20)
        ?.GetServerBuffRemainDuration(r) ?? -1
    );
  }
  static GetServerBuffTotalDuration(t, r) {
    return (
      EntitySystem_1.EntitySystem.Get(t)
        ?.GetComponent(20)
        ?.GetServerBuffTotalDuration(r) ?? -1
    );
  }
  static GetDebugBuff(t, r) {
    var t = EntitySystem_1.EntitySystem.Get(t)?.GetComponent(187);
    const e = t?.GetBuffByHandle(r);
    return (
      e ||
      (!e && (0, RegisterComponent_1.isComponentInstance)(t, 171)
        ? t.GetFormationBuffComp().GetBuffByHandle(r)
        : void 0)
    );
  }
  static GetBuffRemainDuration(t, r) {
    return (
      CombatDebugBlueprintFunctionLibrary.GetDebugBuff(
        t,
        r,
      )?.GetRemainDuration() ?? -1
    );
  }
  static GetBuffTotalDuration(t, r) {
    return (
      CombatDebugBlueprintFunctionLibrary.GetDebugBuff(t, r)?.Duration ?? -1
    );
  }
  static GetAttributeDebugString(t) {
    const r = EntitySystem_1.EntitySystem.GetComponent(t, 20);
    const e = EntitySystem_1.EntitySystem.GetComponent(t, 156);
    if (!r || !e) return "";
    const o = new Set(
      CharacterAttributeTypes_1.attrsBaseValueClampMax.values(),
    );
    const a = new Set(
      CharacterAttributeTypes_1.attrsAutoRecoverSpeedMap.values(),
    );
    const i = new Set(
      CharacterAttributeTypes_1.attrsAutoRecoverMaxMap.values(),
    );
    let n = "";
    const u = r.LGr?.dfs;
    const s = new Array(CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX);
    if (u) for (const m of u) s[m.Ugs] = m;
    for (let t = 1; t < CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX; t++) {
      if (
        !(
          CharacterAttributeTypes_1.attrsBaseValueClamp.has(t) ||
          CharacterAttributeTypes_1.attrsBaseValueClampMax.has(t) ||
          o.has(t) ||
          CharacterAttributeTypes_1.attrsAutoRecoverSpeedMap.has(t) ||
          a.has(t) ||
          i.has(t)
        )
      ) {
        const l = Protocol_1.Aki.Protocol.KBs[t].replace("Proto_", "");
        var [C, b] = [e.GetBaseValue(t), e.GetCurrentValue(t)];
        const y = b.toFixed(0);
        var b = b === C ? "" : (C < b ? "(+" : "(") + (b - C).toFixed(0) + ")";
        const u = s[t];
        var [C, c] = [u?.Pgs ?? 0, u?.NFn ?? 0];
        const _ = c.toFixed(0);
        var c = c === C ? "" : (C < c ? "(+" : "(") + (c - C).toFixed(0) + ")";
        n += `#${t} ${l} C:${y}${b} | S:${_}${c}
`;
      }
    }
    return n.trim();
  }

  static GetStateAttributeDebugString(t) {
    const r = EntitySystem_1.EntitySystem.GetComponent(t, 20);
    const e = EntitySystem_1.EntitySystem.GetComponent(t, 156);
    if (!r || !e) return "";
    let o = "";
    const a = r.LGr?.dfs;
    const i = new Array(CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX);
    if (a) for (const c of a) i[c.Ugs] = c;
    for (let t = 1; t < CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX; t++) {
      if (
        CharacterAttributeTypes_1.attrsBaseValueClamp.has(t) ||
        CharacterAttributeTypes_1.attrsBaseValueClampMax.has(t) ||
        CharacterAttributeTypes_1.attrsAutoRecoverSpeedMap.has(t)
      ) {
        const n = Protocol_1.Aki.Protocol.KBs[t].replace("Proto_", "");
        const u = e.GetBaseValue(t).toFixed(0);
        const a = i[t];
        var s;
        var l;
        var C;
        var b;
        const y = (a?.Pgs ?? 0).toFixed(0);
        CharacterAttributeTypes_1.attrsAutoRecoverSpeedMap.has(t)
          ? ((b =
              CharacterAttributeTypes_1.attrsAutoRecoverSpeedMap.get(t) ?? 0),
            (C = CharacterAttributeTypes_1.attrsAutoRecoverMaxMap.get(t) ?? 0),
            (s = e.GetCurrentValue(C).toFixed(0)),
            (C = (i[C]?.NFn ?? 0).toFixed(0)),
            (l = e.GetCurrentValue(b).toFixed(0)),
            (b = (i[b]?.NFn ?? 0).toFixed(0)),
            (o += `#${t} ${n} C:${u}/${s} (${l}/s) | S:${y}/${C} (${b}/s)
`))
          : CharacterAttributeTypes_1.attrsBaseValueClamp.has(t)
            ? ((s = CharacterAttributeTypes_1.attrsBaseValueClamp.get(t) ?? 0),
              (o += `#${t} ${n} C:${u}/${s} | S:${y}/${s}
`))
            : CharacterAttributeTypes_1.attrsBaseValueClampMax.has(t) &&
              ((l =
                CharacterAttributeTypes_1.attrsBaseValueClampMax.get(t) ?? 0),
              (C = e.GetCurrentValue(l).toFixed(0)),
              (b = (i[l]?.NFn ?? 0).toFixed(0)),
              (o += `#${t} ${n} C:${u}/${C} | S:${y}/${b}
`));
      }
    }
    return o.trim();
  }

  static GetFormationAttributeDebugString(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 20);
    if (!t) return "";
    let r = "";
    var t = t.LGr?.qFn;
    const e = new Array();
    if (t) for (const C of t) e[C.OFn] = C;
    for (const b of FormationPropertyAll_1.configFormationPropertyAll.GetConfigList()) {
      const o = b.Id;
      const a =
        FormationAttributeController_1.FormationAttributeController.GetValue(o);
      const i =
        FormationAttributeController_1.FormationAttributeController.GetMax(o);
      const n =
        FormationAttributeController_1.FormationAttributeController.GetSpeed(o);
      var u = e[o];
      const s = u?.NFn.toFixed(0) ?? "???";
      const l = u?.kFn.toFixed(0) ?? "???";
      var u = u?.VFn.toFixed(0) ?? "???";
      r +=
        `#${o} C:${a?.toFixed(0)}/${i?.toFixed(0)} (${n?.toFixed(0)}/s)` +
        ` | S:${s}/${l} (${u}/s)
`;
    }
    return r.trim();
  }

  static GetPassiveDebugString(t) {
    const r = EntitySystem_1.EntitySystem.GetComponent(t, 23);
    const e = EntitySystem_1.EntitySystem.GetComponent(t, 25);
    if (!r) return "";
    let o = "";
    for (const u of r.GetAllPassiveSkills()) {
      const a = e?.GetTrigger(u.TriggerHandle);
      const i = PassiveSkillById_1.configPassiveSkillById.GetConfig(u.SkillId);
      var n = r.rkr?.GetPassiveSkillCdInfo(u.SkillId)?.CurRemainingCd;
      var n =
        ((o +=
          `技能: ${u.SkillId} handle: ${u.TriggerHandle} CD:${n?.toFixed(2)}
` +
          `说明: ${i.SkillDesc}
触发器类型: ${i.TriggerType}${void 0 !== TriggerType_1.ETriggerEvent[i.TriggerType] ? "" : "(非法类型)"}
条件公式: 
${i.TriggerFormula}
`),
        a?.GetLastFormulaResult() ?? "");
      n !== "" &&
        (o += `最后触发结果:
${n}
`),
        (o += "\n\n");
    }
    return o.trim();
  }

  static GetTagsDebugString(t) {
    const i = EntitySystem_1.EntitySystem.GetComponent(t, 185)?.TagContainer;
    t = EntitySystem_1.EntitySystem.GetComponent(t, 20);
    if (!t || !i) return "";
    const r = t?.LGr?.hTs;
    var t = t?.LGr?._Ts;
    const e = new Map();
    const n = new Map([
      ["实体", new Map()],
      ["编队", new Map()],
    ]);
    if (r) {
      const o = n.get("实体");
      for (const u of r)
        e.set(u.Ukn, e.get(u.Ukn) ?? 0 + u.I5n), o.set(u.Ukn, u.I5n);
    }
    if (t) {
      const a = n.get("编队");
      for (const s of t)
        e.set(s.Ukn, e.get(s.Ukn) ?? 0 + s.I5n), a.set(s.Ukn, s.I5n);
    }
    return (
      "【客户端】\n" +
      [...i.GetAllExactTags()]
        .map((t) => {
          const r = i.GetExactTagCount(t);
          let e =
            GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t) + ` x ${r}(`;
          for (const a of i.GetAllChannels()) {
            const o = i.GetRowTagCount(a, t);
            o &&
              (e += CharacterTagContainer_1.channelDebugName[a] + ` x ${o} `);
          }
          return e.trimEnd() + ")\n";
        })
        .sort((t, r) => t.localeCompare(r))
        .join("") +
      "\n【服务端】\n" +
      [...e.entries()]
        .map(([t, r]) => {
          let e =
            GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t) + ` x ${r}(`;
          let o, a;
          for ([o, a] of n.entries()) {
            const i = a.get(t);
            i && (e += o + ` x ${i} `);
          }
          return e.trimEnd() + ")\n";
        })
        .sort((t, r) => t.localeCompare(r))
        .join("")
    ).trim();
  }
}
exports.default = CombatDebugBlueprintFunctionLibrary;
// # sourceMappingURL=CombatDebugBlueprintFunctionLibrary.js.map
