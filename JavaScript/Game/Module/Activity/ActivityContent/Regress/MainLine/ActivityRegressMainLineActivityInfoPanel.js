"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRegressMainLineActivityInfoPanel = void 0);
const UE = require("ue"),
  MultiTextLang_1 = require("../../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  StringUtils_1 = require("../../../../../../Core/Utils/StringUtils"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  UiManager_1 = require("../../../../../Ui/UiManager"),
  ScrollingTipsController_1 = require("../../../../ScrollingTips/ScrollingTipsController"),
  ActivityDescriptionTypeB_1 = require("../../UniversalComponents/Content/ActivityDescriptionTypeB"),
  ActivityRewardList_1 = require("../../UniversalComponents/Content/ActivityRewardList"),
  ActivityFunctionalTypeA_1 = require("../../UniversalComponents/Functional/ActivityFunctionalTypeA"),
  ActivityTitleTypeA_1 = require("../../UniversalComponents/Title/ActivityTitleTypeA"),
  ActivityRegressHelper_1 = require("../Misc/ActivityRegressHelper");
class ActivityRegressMainLineActivityInfoPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Lo = void 0),
      (this.Pda = void 0),
      (this.xda = void 0),
      (this.bda = void 0),
      (this.Bda = void 0),
      (this.Nda = () => {
        const t =
          ModelManager_1.ModelManager.ActivityRegressModel.IsMainLineTaskFinish(
            this.Lo,
          );
        this.bda.GetLayoutItemList().forEach((i) => {
          i.SetReceivedVisible(t);
        });
      }),
      (this.Fda = () => {
        let i =
          ModelManager_1.ModelManager.ActivityRegressModel.GetFirstUnFinishTask(
            this.Lo,
          );
        void 0 !== i
          ? ActivityRegressHelper_1.ActivityRegressHelper.ReportRecallLog1024(
              1,
              i,
            )
          : ((i =
              ModelManager_1.ModelManager.ActivityRegressModel.GetFirstUnFinishMainQuestId()),
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
              "RecallActivity_Role_Precondition",
            )),
          UiManager_1.UiManager.OpenView("QuestView", i);
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
    var i = this.GetItem(0),
      t =
        ((this.Pda = new ActivityTitleTypeA_1.ActivityTitleTypeA()),
        this.GetItem(1)),
      e =
        ((this.xda = new ActivityDescriptionTypeB_1.ActivityDescriptionTypeB()),
        this.GetItem(2)),
      s =
        ((this.bda = new ActivityRewardList_1.ActivityRewardList()),
        this.GetItem(3));
    (this.Bda = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA(void 0)),
      await Promise.all([
        this.Pda.CreateThenShowByActorAsync(i.GetOwner()),
        this.xda.CreateThenShowByActorAsync(t.GetOwner()),
        this.bda.CreateThenShowByActorAsync(e.GetOwner()),
        this.Bda.CreateThenShowByActorAsync(s.GetOwner()),
      ]);
  }
  OnStart() {
    this.Bda.FunctionButton.SetFunction(this.Fda);
    var i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
      "CollectActivity_Button_ahead",
    );
    this.Bda.FunctionButton.SetText(i),
      this.bda.InitGridLayout(this.bda.InitCommonGridItem),
      this.Pda.SetTimeTextVisible(!1);
  }
  RefreshByData(i) {
    (this.Lo = i), this.mGe(), this.Pqe(), this.jqe(), this.Vda();
  }
  mGe() {
    this.Pda.SetTitleByTextId(this.Lo.Title);
  }
  Pqe() {
    var i = this.Lo.SubTitle,
      t = this.Lo.Description,
      e = !StringUtils_1.StringUtils.IsEmpty(i);
    this.Pda.SetSubTitleVisible(e),
      e && this.Pda.SetSubTitleByTextId(i),
      this.xda.SetContentByTextId(t);
  }
  jqe() {
    var i =
      ModelManager_1.ModelManager.ActivityRegressModel.GetRegressBaseRewardPreviewItemList(
        this.Lo,
      );
    this.bda.RefreshItemLayout(i, this.Nda);
  }
  Vda() {
    var i =
      ModelManager_1.ModelManager.ActivityRegressModel.IsMainLineTaskFinish(
        this.Lo,
      );
    this.Bda.FunctionButton.SetUiActive(!i),
      this.Bda.PanelActivate.SetUiActive(i),
      i
        ? this.Bda.PanelActivate.SetTextByTextId("RecallActivity_Finish")
        : this.Bda.FunctionButton.SetLocalTextNew("RecallActivity_Go");
  }
}
exports.ActivityRegressMainLineActivityInfoPanel =
  ActivityRegressMainLineActivityInfoPanel;
//# sourceMappingURL=ActivityRegressMainLineActivityInfoPanel.js.map
