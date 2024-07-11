"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BuildingTipsInfoViewController = void 0);
const ConfigManager_1 = require("../../../../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../../../Manager/ModelManager"),
  UiManager_1 = require("../../../../../../../Ui/UiManager"),
  ConfirmBoxController_1 = require("../../../../../../ConfirmBox/ConfirmBoxController"),
  ConfirmBoxDefine_1 = require("../../../../../../ConfirmBox/ConfirmBoxDefine"),
  WorldMapController_1 = require("../../../../../../WorldMap/WorldMapController");
class BuildingTipsInfoViewController {
  constructor() {
    (this.Yzt = void 0),
      (this.jio = void 0),
      (this.SwitchPrev = () => {
        this.qDn(!0),
          this.Yzt.UiViewSequence.StopPrevSequence(!1, !0),
          this.Yzt.UiViewSequence.PlaySequence("Switch"),
          this.Refresh();
      }),
      (this.SwitchNext = () => {
        this.qDn(!1),
          this.Yzt.UiViewSequence.StopPrevSequence(!1, !0),
          this.Yzt.UiViewSequence.PlaySequence("Switch"),
          this.Refresh();
      }),
      (this.JumpToMap = () => {
        var i = ConfigManager_1.ConfigManager.BuildingConfig.GetBuildingById(
          this.jio.BuildingId,
        );
        0 < i.MapMarkId &&
          ((i = { MarkId: i.MapMarkId, MarkType: 0 }),
          WorldMapController_1.WorldMapController.OpenView(2, !1, i));
      }),
      (this.JumpToConditionTip = () => {
        var i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(197);
        i.FunctionMap.set(2, () => {
          var i = ConfigManager_1.ConfigManager.BuildingConfig.GetBuildingById(
            this.jio.BuildingId,
          );
          ControllerHolder_1.ControllerHolder.MoonChasingController.OpenTaskView(
            i.JumpType,
            i.JumpParam,
          );
        }),
          ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(i);
      }),
      (this.CloseSelf = () => {
        var i = UiManager_1.UiManager.GetViewByName(
          "MoonChasingMainView",
        )?.OpenParam;
        i && (i.RefreshBuildingId = this.jio.BuildingId), this.Yzt.CloseMe();
      }),
      (this.UnlockOrLevelUp = () => {
        var i =
          ModelManager_1.ModelManager.MoonChasingBuildingModel.GetBuildingDataById(
            this.jio.BuildingId,
          );
        i.IsCanLevelUp
          ? i.IsBuild
            ? ((this.Yzt.UiViewSequence.HideSequenceName = "HideView02"),
              ControllerHolder_1.ControllerHolder.MoonChasingController.BuildingLevelUpRequest(
                this.jio.BuildingId,
              ))
            : ((this.Yzt.UiViewSequence.HideSequenceName = "HideView01"),
              ControllerHolder_1.ControllerHolder.MoonChasingController.BuildingUnLockRequest(
                this.jio.BuildingId,
              ))
          : ((i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
              205,
            )).FunctionMap.set(2, () => {
              ControllerHolder_1.ControllerHolder.MoonChasingController.OpenBusinessMainView();
            }),
            ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(i));
      });
  }
  qDn(i) {
    var r =
      ModelManager_1.ModelManager.MoonChasingBuildingModel.GetBuildingDataSize();
    this.jio.BuildingId = i
      ? 0 < this.jio.BuildingId - 1
        ? this.jio.BuildingId - 1
        : r
      : this.jio.BuildingId + 1 <= r
        ? this.jio.BuildingId + 1
        : 1;
  }
  RegisterView(i) {
    (this.Yzt = i), (this.jio = i.OpenParam);
  }
  async Refresh() {
    this.Yzt.RefreshText(this.jio.BuildingId),
      await this.Yzt.RefreshAttribute(this.jio.BuildingId),
      this.Yzt.RefreshRoleItem(this.jio.BuildingId),
      this.Yzt.RefreshBottom(this.jio.BuildingId),
      this.Yzt.RefreshTexture(this.jio.BuildingId);
  }
}
exports.BuildingTipsInfoViewController = BuildingTipsInfoViewController;
//# sourceMappingURL=BuildingTipsInfoViewController.js.map
