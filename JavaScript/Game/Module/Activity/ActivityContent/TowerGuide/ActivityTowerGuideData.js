"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityTowerGuideData = void 0);
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActivityData_1 = require("../../ActivityData");
const ActivityTowerGuideController_1 = require("./ActivityTowerGuideController");
class ActivityTowerGuideData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments),
      (this.TowerDifficultIdList = [1, 2]),
      (this.kFe = new Map()),
      (this.FFe = new Map()),
      (this.TrialRoleId = 0),
      (this.MapMarkId = 0);
  }
  PhraseEx(e) {
    ActivityTowerGuideController_1.ActivityTowerGuideController.CurrentActivityId =
      this.Id;
    for (const r of this.TowerDifficultIdList) this.SetRewardClaimed(r, !1);
    ActivityTowerGuideController_1.ActivityTowerGuideController.RequestTowerRewardInfo();
    const t =
      ConfigManager_1.ConfigManager.ActivityTowerGuideConfig?.GetTowerGuideById(
        1,
      );
    t && ((this.TrialRoleId = t.TrialRoleId), (this.MapMarkId = t.MapMark));
  }
  GetExDataRedPointShowState() {
    for (const e of this.TowerDifficultIdList)
      if (this.GetTowerProgressState(e) === 2) return !0;
    return !1;
  }
  GetViewState() {
    if (!this.IsUnLock()) return 0;
    let e = !0;
    for (const t of this.TowerDifficultIdList)
      if (this.GetTowerProgressState(t) !== 3) {
        e = !1;
        break;
      }
    return e ? 2 : 1;
  }
  SetRewardClaimed(e, t) {
    this.FFe.set(e, t), this.RefreshRewardState(e);
  }
  RefreshRewardState(e) {
    const t = this.VFe(e);
    this.kFe.set(e, t),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        this.Id,
      );
  }
  VFe(e) {
    return this.IsUnLock()
      ? ModelManager_1.ModelManager.TowerModel.GetDifficultyIsClear(e)
        ? void 0 !== (e = this.FFe.get(e)) && e
          ? 3
          : 2
        : 1
      : 0;
  }
  GetTowerProgress(e) {
    return ModelManager_1.ModelManager.TowerModel.GetDifficultyProgress(e);
  }
  GetTowerProgressState(e) {
    return this.kFe.get(e) ?? 0;
  }
  GetTrialRoleData() {
    return ModelManager_1.ModelManager.RoleModel.GetRoleDataById(
      this.TrialRoleId,
    );
  }
}
exports.ActivityTowerGuideData = ActivityTowerGuideData;
// # sourceMappingURL=ActivityTowerGuideData.js.map
