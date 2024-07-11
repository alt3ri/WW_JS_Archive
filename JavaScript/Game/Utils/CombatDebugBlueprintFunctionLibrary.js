"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  FormationPropertyAll_1 = require("../../Core/Define/ConfigQuery/FormationPropertyAll"),
  PassiveSkillById_1 = require("../../Core/Define/ConfigQuery/PassiveSkillById"),
  Protocol_1 = require("../../Core/Define/Net/Protocol"),
  EntitySystem_1 = require("../../Core/Entity/EntitySystem"),
  RegisterComponent_1 = require("../../Core/Entity/RegisterComponent"),
  GameplayTagUtils_1 = require("../../Core/Utils/GameplayTagUtils"),
  FormationAttributeController_1 = require("../Module/Abilities/FormationAttributeController"),
  CharacterAttributeTypes_1 = require("../NewWorld/Character/Common/Component/Abilities/CharacterAttributeTypes"),
  CharacterTagContainer_1 = require("../NewWorld/Character/Common/Component/Abilities/CharacterTagContainer"),
  TriggerType_1 = require("../NewWorld/Character/Common/Component/Abilities/Trigger/TriggerType"),
  CombatDebugController_1 = require("./CombatDebugController"),
  CombatDebugDrawController_1 = require("./CombatDebugDrawController");
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
    var t = EntitySystem_1.EntitySystem.Get(t)?.GetComponent(192),
      e = t?.GetBuffByHandle(r);
    return (
      e ||
      (!e && (0, RegisterComponent_1.isComponentInstance)(t, 174)
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
    var r = EntitySystem_1.EntitySystem.GetComponent(t, 20),
      e = EntitySystem_1.EntitySystem.GetComponent(t, 158);
    if (!r || !e) return "";
    var o = new Set(CharacterAttributeTypes_1.attrsBaseValueClampMax.values()),
      a = new Set(CharacterAttributeTypes_1.attrsAutoRecoverSpeedMap.values()),
      i = new Set(CharacterAttributeTypes_1.attrsAutoRecoverMaxMap.values());
    let n = "";
    const u = r.iGr?.PSs;
    var s = new Array(CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX);
    if (u) for (const m of u) s[m.QMs] = m;
    for (let t = 1; t < CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX; t++)
      if (
        !(
          CharacterAttributeTypes_1.attrsBaseValueClampMax.has(t) ||
          o.has(t) ||
          CharacterAttributeTypes_1.attrsAutoRecoverSpeedMap.has(t) ||
          a.has(t) ||
          i.has(t)
        )
      ) {
        var l = Protocol_1.Aki.Protocol.Bks[t].replace("Proto_", ""),
          [C, b] = [e.GetBaseValue(t), e.GetCurrentValue(t)],
          y = b.toFixed(0),
          b = b === C ? "" : (C < b ? "(+" : "(") + (b - C).toFixed(0) + ")";
        const u = s[t];
        var [C, c] = [u?.KMs ?? 0, u?.d6n ?? 0],
          _ = c.toFixed(0),
          c = c === C ? "" : (C < c ? "(+" : "(") + (c - C).toFixed(0) + ")";
        n += `#${t} ${l} C:${y}${b} | S:${_}${c}
`;
      }
    return n.trim();
  }
  static GetStateAttributeDebugString(t) {
    var r = EntitySystem_1.EntitySystem.GetComponent(t, 20),
      e = EntitySystem_1.EntitySystem.GetComponent(t, 158);
    if (!r || !e) return "";
    let o = "";
    const a = r.iGr?.PSs;
    var i = new Array(CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX);
    if (a) for (const c of a) i[c.QMs] = c;
    for (let t = 1; t < CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX; t++)
      if (
        CharacterAttributeTypes_1.attrsBaseValueClampMax.has(t) ||
        CharacterAttributeTypes_1.attrsAutoRecoverSpeedMap.has(t)
      ) {
        var n = Protocol_1.Aki.Protocol.Bks[t].replace("Proto_", ""),
          u = e.GetBaseValue(t).toFixed(0);
        const a = i[t];
        var s,
          l,
          C,
          b,
          y = (a?.KMs ?? 0).toFixed(0);
        CharacterAttributeTypes_1.attrsAutoRecoverSpeedMap.has(t)
          ? ((s =
              CharacterAttributeTypes_1.attrsAutoRecoverSpeedMap.get(t) ?? 0),
            (b = CharacterAttributeTypes_1.attrsAutoRecoverMaxMap.get(t) ?? 0),
            (l = e.GetCurrentValue(b).toFixed(0)),
            (b = (i[b]?.d6n ?? 0).toFixed(0)),
            (C = e.GetCurrentValue(s).toFixed(0)),
            (s = (i[s]?.d6n ?? 0).toFixed(0)),
            (o += `#${t} ${n} C:${u}/${l} (${C}/s) | S:${y}/${b} (${s}/s)
`))
          : CharacterAttributeTypes_1.attrsBaseValueClampMax.has(t) &&
            ((l = CharacterAttributeTypes_1.attrsBaseValueClampMax.get(t) ?? 0),
            (C = e.GetCurrentValue(l).toFixed(0)),
            (b = (i[l]?.d6n ?? 0).toFixed(0)),
            (o += `#${t} ${n} C:${u}/${C} | S:${y}/${b}
`));
      }
    return o.trim();
  }
  static GetFormationAttributeDebugString(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 20);
    if (!t) return "";
    let r = "";
    var t = t.iGr?.u6n,
      e = new Array();
    if (t) for (const C of t) e[C.m6n] = C;
    for (const b of FormationPropertyAll_1.configFormationPropertyAll.GetConfigList()) {
      var o = b.Id,
        a =
          FormationAttributeController_1.FormationAttributeController.GetValue(
            o,
          ),
        i =
          FormationAttributeController_1.FormationAttributeController.GetMax(o),
        n =
          FormationAttributeController_1.FormationAttributeController.GetSpeed(
            o,
          ),
        u = e[o],
        s = u?.d6n.toFixed(0) ?? "???",
        l = u?.C6n.toFixed(0) ?? "???",
        u = u?.f6n.toFixed(0) ?? "???";
      r +=
        `#${o} C:${a?.toFixed(0)}/${i?.toFixed(0)} (${n?.toFixed(0)}/s)` +
        ` | S:${s}/${l} (${u}/s)
`;
    }
    return r.trim();
  }
  static GetPassiveDebugString(t) {
    var r = EntitySystem_1.EntitySystem.GetComponent(t, 23),
      e = EntitySystem_1.EntitySystem.GetComponent(t, 25);
    if (!r) return "";
    let o = "";
    for (const u of r.GetAllPassiveSkills()) {
      var a = e?.GetTrigger(u.TriggerHandle),
        i = PassiveSkillById_1.configPassiveSkillById.GetConfig(u.SkillId),
        n = r.BOr?.GetPassiveSkillCdInfo(u.SkillId)?.CurRemainingCd,
        n =
          ((o +=
            `技能: ${u.SkillId} handle: ${u.TriggerHandle} CD:${n?.toFixed(2)}
` +
            `说明: ${i.SkillDesc}
触发器类型: ${i.TriggerType}${void 0 !== TriggerType_1.ETriggerEvent[i.TriggerType] ? "" : "(非法类型)"}
条件公式: 
${i.TriggerFormula}
`),
          a?.GetLastFormulaResult() ?? "");
      "" !== n &&
        (o += `最后触发结果:
${n}
`),
        (o += "\n\n");
    }
    return o.trim();
  }
  static GetTagsDebugString(t) {
    const i = EntitySystem_1.EntitySystem.GetComponent(t, 188)?.TagContainer;
    t = EntitySystem_1.EntitySystem.GetComponent(t, 20);
    if (!t || !i) return "";
    var r = t?.iGr?.RAs,
      t = t?.iGr?.AAs,
      e = new Map();
    const n = new Map([
      ["实体", new Map()],
      ["编队", new Map()],
    ]);
    if (r) {
      var o = n.get("实体");
      for (const u of r)
        e.set(u.o5n, e.get(u.o5n) ?? 0 + u.o9n), o.set(u.o5n, u.o9n);
    }
    if (t) {
      var a = n.get("编队");
      for (const s of t)
        e.set(s.o5n, e.get(s.o5n) ?? 0 + s.o9n), a.set(s.o5n, s.o9n);
    }
    return (
      "【客户端】\n" +
      [...i.GetAllExactTags()]
        .map((t) => {
          var r = i.GetExactTagCount(t);
          let e =
            GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t) + ` x ${r}(`;
          for (const a of i.GetAllChannels()) {
            var o = i.GetRowTagCount(a, t);
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
          var o, a;
          for ([o, a] of n.entries()) {
            var i = a.get(t);
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
//# sourceMappingURL=CombatDebugBlueprintFunctionLibrary.js.map
