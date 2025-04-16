"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SolarSpeedConfigContext = void 0);
const DropPackageById_1 = require("../../../../../../Core/Define/ConfigQuery/DropPackageById"),
  InstanceDungeonById_1 = require("../../../../../../Core/Define/ConfigQuery/InstanceDungeonById"),
  SettleFlagAll_1 = require("../../../../../../Core/Define/ConfigQuery/SettleFlagAll"),
  TeamParKOurCfgAll_1 = require("../../../../../../Core/Define/ConfigQuery/TeamParKOurCfgAll"),
  TeamParKOurRewardAll_1 = require("../../../../../../Core/Define/ConfigQuery/TeamParKOurRewardAll"),
  TeamParKOurRewardById_1 = require("../../../../../../Core/Define/ConfigQuery/TeamParKOurRewardById"),
  ActivityData_1 = require("../../../ActivityData"),
  SolarSpeedDefine_1 = require("../SolarSpeedDefine");
class SolarSpeedConfigContext extends ActivityData_1.ActivityBaseData {
  constructor(e) {
    super(),
      (this.i5l = void 0),
      (this.p3_ = void 0),
      (this.v3_ = void 0),
      (this.y3_ = void 0),
      (this.S3_ = void 0),
      (this.i5l = e);
  }
  get CurrentCfgCache() {
    return void 0 === this.p3_ && this.M3_(), this.p3_;
  }
  get CurrentRewardCache() {
    return void 0 === this.v3_ && this.E3_(), this.v3_;
  }
  get SortedSettleCfgCache() {
    if (void 0 === this.S3_) {
      this.S3_ = [];
      var e = SettleFlagAll_1.configSettleFlagAll.GetConfigList();
      if (void 0 !== e) {
        for (const t of e) this.S3_.push(t);
        this.S3_.sort((e, t) => e.Priority - t.Priority);
      }
    }
    return this.S3_;
  }
  get I3_() {
    return void 0 === this.y3_ && this.M3_(), this.y3_;
  }
  M3_() {
    (this.p3_ = new Map()), (this.y3_ = new Map());
    for (const e of TeamParKOurCfgAll_1.configTeamParKOurCfgAll.GetConfigList())
      e.ActivityId === this.i5l.CurrentActivityId &&
        (this.p3_.set(e.Id, e), this.y3_.set(e.InstId, e.Id));
  }
  E3_() {
    this.v3_ = new Map();
    for (const e of TeamParKOurRewardAll_1.configTeamParKOurRewardAll.GetConfigList())
      e.ActivityId === this.i5l.CurrentActivityId && this.v3_.set(e.Id, e);
  }
  Dispose() {
    this.CurrentCfgCache.clear(), this.CurrentRewardCache.clear();
  }
  GetInfoPicturePathById(e) {
    return this.CurrentCfgCache.get(e)?.DescPicPath;
  }
  GetLevelIdByInstanceId(e) {
    return this.I3_.get(e);
  }
  GetInfoPicturePathByInstanceId(e) {
    e = this.GetLevelIdByInstanceId(e);
    if (void 0 !== e) return this.GetInfoPicturePathById(e);
  }
  GetTitleTextIdById(e) {
    e = this.CurrentCfgCache.get(e)?.InstId;
    if (void 0 !== e)
      return InstanceDungeonById_1.configInstanceDungeonById.GetConfig(e)
        ?.MapName;
  }
  GetRomePathById(e) {
    e = this.CurrentCfgCache.get(e)?.InstId;
    if (void 0 !== e)
      return InstanceDungeonById_1.configInstanceDungeonById.GetConfig(e)
        ?.DifficultyIcon;
  }
  GetTaskListById(e) {
    return e === SolarSpeedDefine_1.SOLAR_SPEED_BONUS_LEVEL_ID
      ? SolarSpeedDefine_1.bonusRewardList
      : (this.CurrentCfgCache.get(e)?.TaskList ?? []);
  }
  GetRewardThresholdById(e) {
    return this.CurrentRewardCache.get(e)?.RewardThreshold ?? 0;
  }
  GetRewardItemDataListById(e) {
    var t = [],
      e = TeamParKOurRewardById_1.configTeamParKOurRewardById.GetConfig(e);
    if (void 0 !== e) {
      e = DropPackageById_1.configDropPackageById.GetConfig(e.Reward);
      if (void 0 !== e)
        for (var [r, i] of e.DropPreview) {
          r = [{ IncId: 0, ItemId: r }, i];
          t.push(r);
        }
    }
    return t;
  }
  GetRewardTitleTextId(e) {
    return TeamParKOurRewardById_1.configTeamParKOurRewardById.GetConfig(e)
      ?.TaskTitle;
  }
}
exports.SolarSpeedConfigContext = SolarSpeedConfigContext;
//# sourceMappingURL=SolarSpeedConfigContext.js.map
