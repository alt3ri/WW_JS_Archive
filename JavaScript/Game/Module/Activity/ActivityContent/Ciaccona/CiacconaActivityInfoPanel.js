"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CiacconaActivityInfoPanel = void 0);
const UE = require("ue"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  CiacconaGalDefine_1 = require("../../../CiacconaGal/CiacconaGalDefine"),
  ActivityDescriptionTypeA_1 = require("../UniversalComponents/Content/ActivityDescriptionTypeA"),
  ActivityRewardList_1 = require("../UniversalComponents/Content/ActivityRewardList"),
  ActivityFunctionalTypeA_1 = require("../UniversalComponents/Functional/ActivityFunctionalTypeA"),
  ActivityTitleTypeA_1 = require("../UniversalComponents/Title/ActivityTitleTypeA");
class CiacconaActivityInfoPanel extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.R3c = e),
      (this.A3c = void 0),
      (this.P3c = void 0),
      (this.x3c = void 0),
      (this.U3c = void 0),
      (this.Qho = () => {
        var e = this.R3c.GetUnFinishPreGuideQuestId();
        switch (
          ModelManager_1.ModelManager.CiacconaGalModel.GetActivityDataById(
            this.R3c.Id,
          ).State
        ) {
          case 0:
            e && UiManager_1.UiManager.OpenView("QuestView", e);
            break;
          case 1:
          case 2:
            ControllerHolder_1.ControllerHolder.CiacconaGalController.OpenChapterEntryView(
              this.R3c.Id,
              1,
            );
        }
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    (this.A3c = new ActivityTitleTypeA_1.ActivityTitleTypeA()),
      (this.P3c = new ActivityDescriptionTypeA_1.ActivityDescriptionTypeA()),
      (this.x3c = new ActivityRewardList_1.ActivityRewardList()),
      (this.U3c = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA(
        this.R3c,
      ));
    var e = [];
    e.push(this.A3c.CreateThenShowByActorAsync(this.GetItem(0).GetOwner())),
      e.push(this.P3c.CreateThenShowByActorAsync(this.GetItem(1).GetOwner())),
      e.push(this.x3c.CreateThenShowByActorAsync(this.GetItem(2).GetOwner())),
      e.push(this.U3c.CreateThenShowByActorAsync(this.GetItem(3).GetOwner())),
      await Promise.all(e),
      this.x3c.InitGridLayout(this.x3c.InitCommonGridItem);
  }
  OnBeforeShow() {
    this.RefreshFunctionArea();
  }
  RefreshFunctionArea() {
    var e = ModelManager_1.ModelManager.CiacconaGalModel.GetActivityDataById(
        this.R3c.Id,
      ),
      e = {
        UnlockBtnFunction: this.Qho,
        UnlockBtnTextId: e.State2Unlock
          ? CiacconaGalDefine_1.TEXT_CIACCONA_GOTO_ACTIVITY
          : CiacconaGalDefine_1.TEXT_CIACCONA_GOTO_QUEST,
      },
      e =
        (this.U3c?.RefreshGeneralPerformance(e),
        ModelManager_1.ModelManager.CiacconaGalModel.HasAnyEndingReward()),
      i = ModelManager_1.ModelManager.CiacconaGalModel.HasAnyProgressReward(),
      t = ModelManager_1.ModelManager.CiacconaGalModel.HasAnySubEndingReward();
    this.U3c?.SetFunctionRedDotVisible(e || i || t);
  }
  SetTimer(e, i) {
    this.A3c?.SetTimeTextVisible(e), this.A3c?.SetTimeTextByText(i);
  }
  SetTitle(e) {
    this.A3c?.SetTitleByText(e);
  }
  SetSubTitle(e, i) {
    this.A3c?.SetSubTitleVisible(e), this.A3c?.SetSubTitleByText(i);
  }
  SetDesc(e, i) {
    this.P3c?.SetContentVisible(e), this.P3c?.SetContentByTextId(i);
  }
  SetReward(e, i) {
    this.x3c?.SetUiActive(e), this.x3c?.RefreshItemLayout(i);
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    return 0 !== e.length && (e = this.U3c?.FunctionButton?.GetRootItem())
      ? [e, e]
      : void 0;
  }
}
exports.CiacconaActivityInfoPanel = CiacconaActivityInfoPanel;
//# sourceMappingURL=CiacconaActivityInfoPanel.js.map
