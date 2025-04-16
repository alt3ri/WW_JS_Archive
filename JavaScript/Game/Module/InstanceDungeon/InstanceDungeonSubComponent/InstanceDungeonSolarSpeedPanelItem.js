"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InstanceDungeonSolarSpeedPanelItem = void 0);
const ue_1 = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  ActivityControllerHolder_1 = require("../../Activity/ActivityControllerHolder"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class InstanceDungeonSolarSpeedPanelItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Uth = void 0),
      (this.hih = () => {
        ActivityControllerHolder_1.ActivityControllerHolder.ActivitySolarSpeedController.HandleOnClickRewardInActivitySubView();
      }),
      (this.O6_ = () => {
        this.RefreshItem();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, ue_1.UIButtonComponent],
      [1, ue_1.UIText],
      [2, ue_1.UIItem],
      [3, ue_1.UIText],
    ]),
      (this.BtnBindInfo = [[0, this.hih]]);
  }
  OnStart() {
    LguiUtil_1.LguiUtil.TrySetLocalTextNew(
      this.GetText(1),
      "BossRushCollectReward",
    ),
      this.Uth?.HaveRefresh && this.RefreshItem();
  }
  async OnBeforeStartAsync() {
    return (
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SolarSpeedRewarded,
        this.O6_,
      ),
      Promise.resolve()
    );
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.SolarSpeedRewarded,
      this.O6_,
    );
  }
  RefreshItem() {
    var e;
    this.InAsyncLoading()
      ? (this.Uth = { HaveRefresh: !0 })
      : ((e = ModelManager_1.ModelManager.SolarSpeedModel),
        this.GetItem(2).SetUIActive(e.HasRewardRedDot),
        LguiUtil_1.LguiUtil.TrySetLocalTextNew(
          this.GetText(3),
          "parkour_award_2_1",
          e.CurrentCompletedCount,
          e.TotalRewardCount,
        ));
  }
}
exports.InstanceDungeonSolarSpeedPanelItem = InstanceDungeonSolarSpeedPanelItem;
//# sourceMappingURL=InstanceDungeonSolarSpeedPanelItem.js.map
