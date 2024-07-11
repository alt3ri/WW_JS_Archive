"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InstanceDungeonConfig = void 0);
const Log_1 = require("../../../Core/Common/Log");
const InstanceDungeonById_1 = require("../../../Core/Define/ConfigQuery/InstanceDungeonById");
const InstanceDungeonTitleById_1 = require("../../../Core/Define/ConfigQuery/InstanceDungeonTitleById");
const InstanceEnterControlById_1 = require("../../../Core/Define/ConfigQuery/InstanceEnterControlById");
const InstanceTrialRoleConfigById_1 = require("../../../Core/Define/ConfigQuery/InstanceTrialRoleConfigById");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class InstanceDungeonConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments), (this.tai = new Map());
  }
  iai(e) {
    let n = this.tai.get(e);
    return (
      n ||
        ((n = new Array()),
        (n = Array.from(this.GetConfig(e).RecommendLevel)).sort(
          (e, n) => e[0] - n[0],
        ),
        this.tai.set(e, n)),
      n
    );
  }
  GetConfig(e) {
    const n = InstanceDungeonById_1.configInstanceDungeonById.GetConfig(e);
    if (n) return n;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("InstanceDungeon", 17, "获取副本配置错误", ["id", e]);
  }
  GetCountConfig(e) {
    const n =
      InstanceEnterControlById_1.configInstanceEnterControlById.GetConfig(e);
    if (n) return n;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("InstanceDungeon", 17, "获取副本配置错误", ["id", e]);
  }
  GetTitleConfig(e) {
    const n =
      InstanceDungeonTitleById_1.configInstanceDungeonTitleById.GetConfig(e);
    if (n) return n;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("InstanceDungeon", 17, "获取副本标题配置错误", ["id", e]);
  }
  GetTrialRoleConfig(e) {
    const n =
      InstanceTrialRoleConfigById_1.configInstanceTrialRoleConfigById.GetConfig(
        e,
      );
    if (n) return n;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("InstanceDungeon", 49, "获取副本试用角色配置错误", [
        "id",
        e,
      ]);
  }
  GetLimitChallengeTimes(e) {
    return this.GetCountConfig(e)?.EnterCount ?? 0;
  }
  CheckViewShield(e, n) {
    e = this.GetConfig(e);
    if (e.LimitViewName)
      for (const t of e.LimitViewName) if (t === n) return !0;
    return !1;
  }
  GetUnlockCondition(e) {
    return this.GetConfig(e)?.EnterCondition ?? void 0;
  }
  GetUnlockConditionGroupHintText(e) {
    return this.GetConfig(e).EnterConditionText ?? void 0;
  }
  GetRecommendLevel(e, n) {
    e = this.iai(e);
    if (!e)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("InstanceDungeon", 17, "推荐等级区间配置错误"),
        0
      );
    let t = 0;
    for (const o of e) (!t || n >= o[0]) && (t = o[1]);
    return t;
  }
  GetInstanceRewardId(e) {
    return this.GetConfig(e)?.RewardId;
  }
  GetInstanceFirstRewardId(e) {
    return this.GetConfig(e)?.FirstRewardId;
  }
  IsMiniMapShow(e) {
    return (this.GetConfig(e)?.MiniMapId ?? 0) !== 0;
  }
  GetGuide(e) {
    e = this.GetConfig(e);
    return [e?.GuideType ?? 0, e?.GuideValue ?? 0];
  }
}
exports.InstanceDungeonConfig = InstanceDungeonConfig;
// # sourceMappingURL=InstanceDungeonConfig.js.map
