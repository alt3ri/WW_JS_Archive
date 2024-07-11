"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AchievementProgressItem = void 0);
const UE = require("ue");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class AchievementProgressItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(), this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIText],
    ];
  }
  RefreshGroupState(e) {
    this.GetItem(0).SetUIActive(!1),
      this.GetItem(1).SetUIActive(!1),
      this.GetText(2).SetUIActive(!1),
      e.GetFinishState() === 2
        ? (this.GetItem(0).SetUIActive(!0),
          this.GetText(2).SetUIActive(!0),
          this.GetText(2).SetText(
            TimeUtil_1.TimeUtil.DateFormat4(
              new Date(
                e.GetFinishTime() * TimeUtil_1.TimeUtil.InverseMillisecond,
              ),
            ),
          ))
        : e.GetFinishState() === 0 && this.GetItem(1).SetUIActive(!0);
  }
  RefreshState(e) {
    this.GetItem(0).SetUIActive(!1),
      this.GetItem(1).SetUIActive(!1),
      this.GetText(2).SetUIActive(!1),
      e.GetFinishState() === 2
        ? (this.GetItem(0).SetUIActive(!0), this.GetText(2).SetUIActive(!0))
        : e.GetFinishState() === 0 && this.GetItem(1).SetUIActive(!0);
  }
}
exports.AchievementProgressItem = AchievementProgressItem;
// # sourceMappingURL=AchievementProgressItem.js.map
