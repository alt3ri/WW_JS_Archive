"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhantomUtil = void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  DataTableUtil_1 = require("../../../Core/Utils/DataTableUtil"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager");
var ESummonType = Protocol_1.Aki.Protocol.Oqs;
const ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  PHANTOMSKILLIDSTART = 2e5,
  VISION_MORPH_SKILL_ID = 200001,
  VISION_MORPH_MULTI_SKILL_ID = 200003;
class PhantomUtil {
  static GetEntityVisionSkillId(e, t) {
    t = this.GetSkillGroupId(t);
    if (t === VISION_MORPH_SKILL_ID) {
      e = ModelManager_1.ModelManager.CharacterModel?.GetHandle(e);
      if (e?.Valid)
        if (e.Entity.GetComponent(34)?.CanSummonerStartNextMultiSkill())
          return VISION_MORPH_MULTI_SKILL_ID;
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
    var a = e.GetComponent(0);
    let n = 0;
    switch (t) {
      case ESummonType.Proto_ESummonTypeConcomitantCustom:
        var o = a.CustomServerEntityIds;
        if (r > o.length - 1) return;
        n = o[r];
        break;
      case ESummonType.Proto_ESummonTypeConcomitantVision:
        n = a.VisionSkillServerEntityId;
        break;
      case ESummonType.Proto_ESummonTypeConcomitantPhantomRole:
        n = a.VisionControlCreatureDataId ?? 0;
    }
    return ModelManager_1.ModelManager.CreatureModel.GetEntity(n);
  }
  static SetVisionEnable(e, t) {
    var e = e.GetComponent(0).VisionSkillServerEntityId;
    0 < e &&
      (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(e)) &&
      ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
        e.Entity,
        t,
        "PhantomUtil.SetVisionEnable",
        !0,
      );
  }
}
exports.PhantomUtil = PhantomUtil;
//# sourceMappingURL=PhantomUtil.js.map
