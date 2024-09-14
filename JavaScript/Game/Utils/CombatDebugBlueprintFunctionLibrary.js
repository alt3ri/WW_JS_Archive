"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  FormationPropertyAll_1 = require("../../Core/Define/ConfigQuery/FormationPropertyAll"),
  PassiveSkillById_1 = require("../../Core/Define/ConfigQuery/PassiveSkillById"),
  EntitySystem_1 = require("../../Core/Entity/EntitySystem"),
  RegisterComponent_1 = require("../../Core/Entity/RegisterComponent"),
  GameplayTagUtils_1 = require("../../Core/Utils/GameplayTagUtils"),
  EventDefine_1 = require("../Common/Event/EventDefine"),
  EventSystem_1 = require("../Common/Event/EventSystem"),
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
  static OpenMonsterServerLogic(t) {
    t = "CloseMonsterServerLogic#" + (t ? 0 : 1);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RunGm, t);
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
  static GetServerBuffRemainDuration(t, e) {
    return (
      EntitySystem_1.EntitySystem.Get(t)
        ?.GetComponent(20)
        ?.GetServerBuffRemainDuration(e) ?? -1
    );
  }
  static GetServerBuffTotalDuration(t, e) {
    return (
      EntitySystem_1.EntitySystem.Get(t)
        ?.GetComponent(20)
        ?.GetServerBuffTotalDuration(e) ?? -1
    );
  }
  static GetDebugBuff(t, e) {
    var t = EntitySystem_1.EntitySystem.Get(t)?.GetComponent(194),
      r = t?.GetBuffByHandle(e);
    return (
      r ||
      (!r && (0, RegisterComponent_1.isComponentInstance)(t, 175)
        ? t.GetFormationBuffComp().GetBuffByHandle(e)
        : void 0)
    );
  }
  static GetBuffRemainDuration(t, e) {
    return (
      CombatDebugBlueprintFunctionLibrary.GetDebugBuff(
        t,
        e,
      )?.GetRemainDuration() ?? -1
    );
  }
  static GetBuffTotalDuration(t, e) {
    return (
      CombatDebugBlueprintFunctionLibrary.GetDebugBuff(t, e)?.Duration ?? -1
    );
  }
  static GetAttributeDebugString(t) {
    var e = EntitySystem_1.EntitySystem.GetComponent(t, 20),
      r = EntitySystem_1.EntitySystem.GetComponent(t, 159);
    if (!e || !r) return "";
    var n = new Set(CharacterAttributeTypes_1.attributeIdsWithMax.values()),
      o = new Set(CharacterAttributeTypes_1.attrsAutoRecoverSpeedMap.values()),
      a = new Set(CharacterAttributeTypes_1.attrsAutoRecoverMaxMap.values());
    let i = "";
    const u = e.iGr?.GSs;
    var s = new Array(CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX);
    if (u) for (const m of u) s[m.tSs] = m;
    for (let t = 1; t < CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX; t++)
      if (
        !(
          CharacterAttributeTypes_1.attributeIdsWithMax.has(t) ||
          n.has(t) ||
          CharacterAttributeTypes_1.attrsAutoRecoverSpeedMap.has(t) ||
          o.has(t) ||
          a.has(t)
        )
      ) {
        var [l, C] = [r.GetBaseValue(t), r.GetCurrentValue(t)],
          b = C.toFixed(0),
          C = C === l ? "" : (l < C ? "(+" : "(") + (C - l).toFixed(0) + ")";
        const u = s[t];
        var [l, y] = [u?.eSs ?? 0, u?.y6n ?? 0],
          c = y.toFixed(0),
          y = y === l ? "" : (l < y ? "(+" : "(") + (y - l).toFixed(0) + ")";
        i += `#${t} undefined C:${b}${C} | S:${c}${y}
`;
      }
    return i.trim();
  }
  static GetStateAttributeDebugString(t) {
    var e = EntitySystem_1.EntitySystem.GetComponent(t, 20),
      r = EntitySystem_1.EntitySystem.GetComponent(t, 159);
    if (!e || !r) return "";
    let n = "";
    const o = e.iGr?.GSs;
    var a = new Array(CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX);
    if (o) for (const c of o) a[c.tSs] = c;
    for (let t = 1; t < CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX; t++)
      if (
        CharacterAttributeTypes_1.attributeIdsWithMax.has(t) ||
        CharacterAttributeTypes_1.attrsAutoRecoverSpeedMap.has(t)
      ) {
        var i = void 0,
          u = r.GetBaseValue(t).toFixed(0);
        const o = a[t];
        var s,
          l,
          C,
          b,
          y = (o?.eSs ?? 0).toFixed(0);
        CharacterAttributeTypes_1.attrsAutoRecoverSpeedMap.has(t)
          ? ((s =
              CharacterAttributeTypes_1.attrsAutoRecoverSpeedMap.get(t) ?? 0),
            (b = CharacterAttributeTypes_1.attrsAutoRecoverMaxMap.get(t) ?? 0),
            (l = r.GetCurrentValue(b).toFixed(0)),
            (b = (a[b]?.y6n ?? 0).toFixed(0)),
            (C = r.GetCurrentValue(s).toFixed(0)),
            (s = (a[s]?.y6n ?? 0).toFixed(0)),
            (n += `#${t} ${i} C:${u}/${l} (${C}/s) | S:${y}/${b} (${s}/s)
`))
          : CharacterAttributeTypes_1.attributeIdsWithMax.has(t) &&
            ((l = CharacterAttributeTypes_1.attributeIdsWithMax.get(t) ?? 0),
            (C = r.GetCurrentValue(l).toFixed(0)),
            (b = (a[l]?.y6n ?? 0).toFixed(0)),
            (n += `#${t} ${i} C:${u}/${C} | S:${y}/${b}
`));
      }
    return n.trim();
  }
  static GetFormationAttributeDebugString(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 20);
    if (!t) return "";
    let e = "";
    var t = t.iGr?.M6n,
      r = new Array();
    if (t) for (const C of t) r[C.E6n] = C;
    for (const b of FormationPropertyAll_1.configFormationPropertyAll.GetConfigList()) {
      var n = b.Id,
        o =
          FormationAttributeController_1.FormationAttributeController.GetValue(
            n,
          ),
        a =
          FormationAttributeController_1.FormationAttributeController.GetMax(n),
        i =
          FormationAttributeController_1.FormationAttributeController.GetSpeed(
            n,
          ),
        u = r[n],
        s = u?.y6n.toFixed(0) ?? "???",
        l = u?.I6n.toFixed(0) ?? "???",
        u = u?.L6n.toFixed(0) ?? "???";
      e +=
        `#${n} C:${o?.toFixed(0)}/${a?.toFixed(0)} (${i?.toFixed(0)}/s)` +
        ` | S:${s}/${l} (${u}/s)
`;
    }
    return e.trim();
  }
  static GetPassiveDebugString(t) {
    var e = EntitySystem_1.EntitySystem.GetComponent(t, 23),
      r = EntitySystem_1.EntitySystem.GetComponent(t, 25);
    if (!e) return "";
    let n = "";
    for (const u of e.GetAllPassiveSkills()) {
      var o = r?.GetTrigger(u.TriggerHandle),
        a = PassiveSkillById_1.configPassiveSkillById.GetConfig(u.SkillId),
        i = e.BOr?.GetPassiveSkillCdInfo(u.SkillId)?.CurRemainingCd,
        i =
          ((n +=
            `技能: ${u.SkillId} handle: ${u.TriggerHandle} CD:${i?.toFixed(2)}
` +
            `说明: ${a.SkillDesc}
触发器类型: ${a.TriggerType}${void 0 !== TriggerType_1.ETriggerEvent[a.TriggerType] ? "" : "(非法类型)"}
条件公式: 
${a.TriggerFormula}
`),
          o?.GetLastFormulaResult() ?? "");
      "" !== i &&
        (n += `最后触发结果:
${i}
`),
        (n += "\n\n");
    }
    return n.trim();
  }
  static GetTagsDebugString(t) {
    const a = EntitySystem_1.EntitySystem.GetComponent(t, 190)?.TagContainer;
    t = EntitySystem_1.EntitySystem.GetComponent(t, 20);
    if (!t || !a) return "";
    var e = t?.iGr?.bAs,
      t = t?.iGr?.qAs,
      r = new Map();
    const i = new Map([
      ["实体", new Map()],
      ["编队", new Map()],
    ]);
    if (e) {
      var n = i.get("实体");
      for (const u of e)
        r.set(u.m5n, r.get(u.m5n) ?? 0 + u.m9n), n.set(u.m5n, u.m9n);
    }
    if (t) {
      var o = i.get("编队");
      for (const s of t)
        r.set(s.m5n, r.get(s.m5n) ?? 0 + s.m9n), o.set(s.m5n, s.m9n);
    }
    return (
      "【客户端】\n" +
      [...a.GetAllExactTags()]
        .map((t) => {
          var e = a.GetExactTagCount(t);
          let r =
            GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t) + ` x ${e}(`;
          for (const o of a.GetAllChannels()) {
            var n = a.GetRowTagCount(o, t);
            n &&
              (r += CharacterTagContainer_1.channelDebugName[o] + ` x ${n} `);
          }
          return r.trimEnd() + ")\n";
        })
        .sort((t, e) => t.localeCompare(e))
        .join("") +
      "\n【服务端】\n" +
      [...r.entries()]
        .map(([t, e]) => {
          let r =
            GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t) + ` x ${e}(`;
          var n, o;
          for ([n, o] of i.entries()) {
            var a = o.get(t);
            a && (r += n + ` x ${a} `);
          }
          return r.trimEnd() + ")\n";
        })
        .sort((t, e) => t.localeCompare(e))
        .join("")
    ).trim();
  }
  static GetCueDebugString(t, e = "") {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 19);
    if (!t) return "";
    let r = "";
    var n = [...e.matchAll(/[0-9]+/g)].map((t) => t[0] ?? "");
    for (const o of t.GetAllCurrentCueRef())
      (0 < n.length && !n.some((t) => String(o.CueConfig.Id).includes(t))) ||
        (r += `CueId: ${o.CueConfig.Id} Handle: ${o.Handle} BuffId: ${o.BuffId}
`);
    return r;
  }
}
exports.default = CombatDebugBlueprintFunctionLibrary;
//# sourceMappingURL=CombatDebugBlueprintFunctionLibrary.js.map
