"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelPlayReportMarkItem = void 0);
const ModelManager_1 = require("../../../../Manager/ModelManager"),
  LevelPlayReportMarkItemView_1 = require("../MarkItemView/LevelPlayReportMarkItemView"),
  ConfigMarkItem_1 = require("./ConfigMarkItem");
class LevelPlayReportMarkItem extends ConfigMarkItem_1.ConfigMarkItem {
  constructor(e, r, t, a, i, s = 1) {
    super(e, r, t, a, i, s);
  }
  GetMarkItemViewType() {
    return 14;
  }
  CreateView() {
    return new LevelPlayReportMarkItemView_1.LevelPlayReportMarkItemView(this);
  }
  IsPunishReportFinish() {
    return this.MarkItemEntity.GetComponent(10).IsFinish;
  }
  CanGetReward() {
    var e = this.MarkConfig.RelativeId;
    return ModelManager_1.ModelManager.LevelPlayReportModel.HaveLevelPlayReportRewardCanGet(
      this.MarkConfig.RelativeDungeonId,
      e,
    );
  }
  GetPunishReportTarget() {
    var e = this.MarkConfig.RelativeId;
    return ModelManager_1.ModelManager.LevelPlayReportModel.GetLevelPlayReportTarget(
      this.MarkConfig.RelativeDungeonId,
      e,
    );
  }
  InitIcon() {
    this.UpdateIconPath();
  }
  UpdateIconPath() {
    this.IconPath = this.MarkConfig.UnlockMarkPic;
  }
  GamePlayIsFinish() {
    return this.IsPunishReportFinish();
  }
}
exports.LevelPlayReportMarkItem = LevelPlayReportMarkItem;
//# sourceMappingURL=LevelPlayReportMarkItem.js.map
