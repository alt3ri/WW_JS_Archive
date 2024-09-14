"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRecallModel = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  ModelBase_1 = require("../../../../../Core/Framework/ModelBase"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  UiManager_1 = require("../../../../Ui/UiManager");
class ActivityRecallModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), (this.nda = 0), (this.wfa = !1);
  }
  get ActivityId() {
    return this.nda;
  }
  set ActivityId(e) {
    this.nda = e;
  }
  get ActivityRecallForbidStart() {
    return this.wfa;
  }
  set ActivityRecallForbidStart(e) {
    this.wfa !== e &&
      e &&
      UiManager_1.UiManager.IsViewOpen("ActivityRecallStartView") &&
      UiManager_1.UiManager.CloseView("ActivityRecallStartView"),
      (this.wfa = e);
  }
  OnClear() {
    return (this.nda = 0), !(this.wfa = !1);
  }
  GetSignRewardLocalTextKeyByState(e) {
    switch (e) {
      case 0:
        return "RecallActivity_Sign_Lock";
      case 1:
        return "RecallActivity_Sign_Get";
      case 2:
        return "RecallActivity_Sign_Finish";
      default:
        return "RecallActivity_Sign_Lock";
    }
  }
  GetSignRewardPreviewReward(e) {
    var t = e.SignRewardGroup,
      t =
        ConfigManager_1.ConfigManager.ActivityRecallConfig.GetRewardConfig(
          t,
        ).Reward,
      r = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(t);
    if (r && 0 < r.DropPreview.size) {
      r = r.DropPreview;
      let [i, a] = [0, 0];
      return (
        r.forEach((e, t) => {
          0 === i && ((i = t), (a = e));
        }),
        [i, a]
      );
    }
    return (
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "ActivityRecall",
          64,
          "[回流活动]-ActivityRecallModel.GetSignRewardPreviewReward()->签到奖励的掉落包预览道具不存在",
          ["signReward:", e],
          ["dropId:", t],
        ),
      [void 0, 0]
    );
  }
  GetSignRewardPreviewItemInfo(e) {
    var [e, t] = this.GetSignRewardPreviewReward(e),
      i = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(e);
    return i
      ? [i, t]
      : (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "ActivityRecall",
            64,
            "回流活动-ActivityRecallModel.GetSignRewardPreviewItemInfo()->",
            ["签到奖励的掉落包预览道具配置不存在, itemId:", e],
            ["itemConfig:", i],
          ),
        [void 0, 0]);
  }
  GetRecallTaskScoreRewardInfoList(a) {
    var e = a.DropGroup,
      e =
        ConfigManager_1.ConfigManager.ActivityRecallConfig.GetRewardConfig(
          e,
        ).Reward,
      e =
        ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(
          e,
        ).DropPreview;
    if (0 < e.size) {
      const r = [];
      return (
        e.forEach((e, t) => {
          var i = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(t);
          void 0 !== i
            ? r.length < 2 && r.push([i, e])
            : Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "ActivityRecall",
                64,
                "回流活动-ActivityRecallModel.GetRecallTaskScoreRewardInfoList()->回归任务的积分奖励的掉落包预览道具不存在",
                ["itemId:", t],
                ["itemCount:", e],
                ["CircumScoreReward", a.Id],
              );
        }),
        r
      );
    }
    Log_1.Log.CheckWarn() &&
      Log_1.Log.Warn(
        "ActivityRecall",
        64,
        "回流活动-ActivityRecallModel.GetRecallTaskScoreRewardInfoList()->回归任务的积分奖励配置异常，请检查积分奖励|CircumScoreReward配置!",
      );
  }
  GetRecallTaskScoreItemInfo(e) {
    var t = e.TargetReward,
      t =
        ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(
          t,
        ).DropPreview;
    if (0 < t.size) {
      let a = void 0,
        r = 0;
      return (
        t.forEach((e, t) => {
          var i = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(t);
          void 0 !== i
            ? void 0 === a && ((a = i), (r = e))
            : Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "ActivityRecall",
                64,
                "回流活动-ActivityRecallModel.GetRecallTaskScoreItemInfo()->回归任务的奖励掉落包预览道具不存在",
                ["itemId:", t],
                ["itemCount:", e],
              );
        }),
        [a, r]
      );
    }
    Log_1.Log.CheckWarn() &&
      Log_1.Log.Warn(
        "ActivityRecall",
        64,
        "回流活动-ActivityRecallModel.GetRecallTaskScoreItemInfo()->回归任务的奖励配置异常，请检查积分奖励|CircumFluenceTask配置!",
        ["taskId", e.Id],
      );
  }
  GetRecallEntryConfigByEntryType(e) {
    return ConfigManager_1.ConfigManager.ActivityRecallConfig.GetRecallEntryConfigByType(
      e,
    )[0];
  }
  GetRecallRoleEntryConfigByEntryType() {
    var e =
      ConfigManager_1.ConfigManager.ActivityRecallConfig.GetRecallEntryConfigByType(
        3,
      );
    return [e[0], e[1]];
  }
  GetRecallBaseConfigsByEntryType(e) {
    return ConfigManager_1.ConfigManager.ActivityRecallConfig.GetRecallBaseConfigListByType(
      e,
    );
  }
  GetRecallBaseConfigNewestList(e) {
    let t = this.GetRecallBaseConfigsByEntryType(e).filter(
      (e) => e.ShowCondition,
    );
    return t.sort((e, t) => t.Id - e.Id), (t = t.slice(0, 3));
  }
  GetRecallRoleBaseConfigByEntryType() {
    var e = this.GetRecallBaseConfigNewestList(3);
    return [e[0], e[1]];
  }
  GetRecallBaseRewardPreviewItemInfoList(e) {
    (e = e.RewardPreview),
      (e =
        ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(
          e,
        ).DropPreview);
    if (0 < e.size) {
      const a = [];
      return (
        e.forEach((e, t) => {
          var i = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(t);
          void 0 !== i
            ? a.push([i, e])
            : Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "ActivityRecall",
                64,
                "[回流活动]ActivityRecallModel.GetRecallBaseRewardPreviewItemInfoList()->子界面奖励预览配置的掉落包包含异常id",
                ["itemId:", t],
                ["itemCount:", e],
              );
        }),
        a
      );
    }
    Log_1.Log.CheckWarn() &&
      Log_1.Log.Warn(
        "ActivityRecall",
        64,
        "[回流活动]ActivityRecallModel.GetRecallBaseRewardPreviewItemInfoList()->回流活动配置异常，请检查CircumBase配置!",
      );
  }
  GetRecallBaseRewardPreviewItemList(e) {
    var e = this.GetRecallBaseRewardPreviewItemInfoList(e),
      t = [];
    if (void 0 !== e)
      for (var [i, a] of e) {
        i = [{ IncId: 0, ItemId: i.Id }, a];
        t.push(i);
      }
    return t;
  }
}
exports.ActivityRecallModel = ActivityRecallModel;
//# sourceMappingURL=ActivityRecallModel.js.map
