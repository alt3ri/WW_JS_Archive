"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhantomUtil = void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  DataTableUtil_1 = require("../../../Core/Utils/DataTableUtil"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager");
var ESummonType = Protocol_1.Aki.Protocol.Summon.L3s;
const Log_1 = require("../../../Core/Common/Log"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  PHANTOMSKILLIDSTART = 2e5,
  VISION_MORPH_SKILL_ID = 200001,
  VISION_MORPH_MULTI_SKILL_ID = 200003;
class PhantomUtil {
  static GetEntityVisionSkillId(e, t) {
    t = this.GetSkillGroupId(t);
    if (t === VISION_MORPH_SKILL_ID) {
      e = this.GetSummonedEntityByOwnerId(
        e,
        Protocol_1.Aki.Protocol.Summon.L3s.Proto_ESummonTypeConcomitantVision,
      );
      if (e?.Valid) {
        e = e.Entity.GetComponent(34);
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
  static GetSummonedEntity(e, t, r = 0) {
    var n = e.GetComponent(0);
    let o = 0;
    switch (t) {
      case ESummonType.Proto_ESummonTypeConcomitantCustom:
        var a = n.CustomServerEntityIds;
        if (r > a.length - 1) return;
        o = a[r];
        break;
      case ESummonType.Proto_ESummonTypeConcomitantVision:
        o = n.VisionSkillServerEntityId;
        break;
      case ESummonType.Proto_ESummonTypeConcomitantPhantomRole:
        o = n.VisionControlCreatureDataId ?? 0;
    }
    return ModelManager_1.ModelManager.CreatureModel.GetEntity(o);
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
