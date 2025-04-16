"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InstanceDungeonTowerDefensePanelItem = void 0);
const ue_1 = require("ue"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  TowerDefenceController_1 = require("../../TowerDefence/TowerDefenceController"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class InstanceDungeonTowerDefensePanelItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Uth = void 0),
      (this.hih = () => {
        var e =
          TowerDefenceController_1.TowerDefenseController.BuildPreviewRewardData();
        e &&
          UiManager_1.UiManager.OpenView(
            "ActivityRewardPopUpView",
            e,
            (e, n) => {
              e &&
                UiManager_1.UiManager.IsViewShow(
                  "InstanceDungeonEntranceView",
                ) &&
                UiManager_1.UiManager.GetViewByName(
                  "InstanceDungeonEntranceView",
                )?.AddChildViewById(n);
            },
          );
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
    this.Uth?.HaveRefresh && this.RefreshItem();
  }
  RefreshItem() {
    var e;
    this.InAsyncLoading()
      ? (this.Uth = { HaveRefresh: !0 })
      : (this.GetItem(2).SetUIActive(
          TowerDefenceController_1.TowerDefenseController.CheckHasReward(),
        ),
        (e =
          TowerDefenceController_1.TowerDefenseController.BuildTotalScoreContent()),
        this.GetText(1).SetText("" + e),
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(3),
          "TowerDefence_PintDesc",
        ));
  }
}
exports.InstanceDungeonTowerDefensePanelItem =
  InstanceDungeonTowerDefensePanelItem;
//# sourceMappingURL=InstanceDungeonTowerDefensePanelItem.js.map
