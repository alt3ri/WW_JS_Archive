"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhantomUtil = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  DataTableUtil_1 = require("../../../Core/Utils/DataTableUtil"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CombatLog_1 = require("../../Utils/CombatLog");
var ESummonType = Protocol_1.Aki.Protocol.Summon.x3s;
const PHANTOMSKILLIDSTART = 2e5,
  VISION_MORPH_SKILL_ID = 200001,
  VISION_MORPH_MULTI_SKILL_ID = 200003;
class PhantomUtil {
  static GetEntityVisionSkillId(e, t) {
    t = this.GetSkillGroupId(t);
    if (t === VISION_MORPH_SKILL_ID) {
      e = this.GetSummonedEntityByOwnerId(
        e,
        Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantVision,
      );
      if (e?.Valid) {
        e = e.Entity.GetComponent(35);
        if (e?.IsInMultiSkill())
          return e?.CanSummonerStartNextMultiSkill()
            ? (Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug(
                  "Battle",
                  18,
                  "幻象可以使用下一段技能,SkillId返回200003",
                ),
              VISION_MORPH_MULTI_SKILL_ID)
            : (Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug(
                  "Battle",
                  18,
                  "幻象还不能使用下一段技能,但是已经进入多段技能状态,SkillId返回0",
                ),
              0);
      }
    }
    return t;
  }
  static GetSkillGroupId(e) {
    return e >= PHANTOMSKILLIDSTART
      ? ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSkillBySkillId(
          e,
        ).SkillGroupId
      : (e =
            ConfigManager_1.ConfigManager.RouletteConfig.GetExploreConfigById(
              e,
            ))
        ? e.SkillGroupId
        : 0;
  }
  static GetSkillCd(e) {
    return !(e < PHANTOMSKILLIDSTART) &&
      (e =
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSkillBySkillId(
          e,
        ))
      ? e.SkillCD
      : -1;
  }
  static GetSkillBuffIds(e) {
    return !(e < PHANTOMSKILLIDSTART) &&
      (e =
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSkillBySkillId(
          e,
        ))
      ? e.BuffIds
      : [];
  }
  static GetSkillSettleIds(e) {
    return !(e < PHANTOMSKILLIDSTART) &&
      (e =
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSkillBySkillId(
          e,
        ))
      ? e.SettleIds
      : [];
  }
  static GetVisionData(e) {
    return DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(
      17,
      e.toString(),
    );
  }
  static GetSummonedEntity(e, t, r = 1) {
    var o = e.GetComponent(0);
    let n = 0;
    switch (t) {
      case ESummonType.Proto_ESummonTypeConcomitantCustom:
        var i = o.CustomServerEntityIds;
        if (0 === i.length) return;
        if (r < 1 || r > i.length)
          return void CombatLog_1.CombatLog.Error(
            "Skill",
            e,
            "获取伴生物实体失败，位置参数错误",
            ["position", r],
            ["serverEntityIds", i],
          );
        n = i[r - 1];
        break;
      case ESummonType.Proto_ESummonTypeConcomitantVision:
        n = o.VisionSkillServerEntityId;
        break;
      case ESummonType.Proto_ESummonTypeConcomitantPhantomRole:
        n = o.VisionControlCreatureDataId ?? 0;
    }
    return ModelManager_1.ModelManager.CreatureModel.GetEntity(n);
  }
  static GetSummonedEntityByOwnerId(e, t, r = 0) {
    e = ModelManager_1.ModelManager.CharacterModel?.GetHandle(e);
    if (e?.Valid) {
      e = PhantomUtil.GetSummonedEntity(e.Entity, t, r);
      if (e?.Valid) return e;
    }
  }
  static SetVisionEnable(e, t) {
    var e = e.GetComponent(0).VisionSkillServerEntityId;
    0 < e &&
      (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(e)) &&
      (ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
        e.Entity,
        t,
        "PhantomUtil.SetVisionEnable",
        !0,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnPhantomEnableStateChange,
        t,
      ));
  }
}
exports.PhantomUtil = PhantomUtil;
//# sourceMappingURL=PhantomUtil.js.map
