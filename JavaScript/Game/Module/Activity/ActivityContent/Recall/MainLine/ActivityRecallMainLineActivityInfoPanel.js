"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRecallMainLineActivityInfoPanel = void 0);
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
  ActivityRecallHelper_1 = require("../Misc/ActivityRecallHelper");
class ActivityRecallMainLineActivityInfoPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.gda = void 0),
      (this.fda = void 0),
      (this.vda = void 0),
      (this.pda = void 0),
      (this.Mda = void 0),
      (this.Tda = () => {
        const t =
          ActivityRecallHelper_1.ActivityRecallHelper.IsMainLineTaskFinish(
            this.gda,
          );
        this.pda.GetLayoutItemList().forEach((i) => {
          i.SetReceivedVisible(t);
        });
      }),
      (this.Lda = () => {
        let i =
          ActivityRecallHelper_1.ActivityRecallHelper.GetFirstUnFinishTask(
            this.gda,
          );
        void 0 !== i
          ? ActivityRecallHelper_1.ActivityRecallHelper.ReportRecallLog1024(
              1,
              i,
            )
          : ((i =
              ActivityRecallHelper_1.ActivityRecallHelper.GetFirstMainLineUnFinishTaskId()),
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
        ((this.fda = new ActivityTitleTypeA_1.ActivityTitleTypeA()),
        this.GetItem(1)),
      e =
        ((this.vda = new ActivityDescriptionTypeB_1.ActivityDescriptionTypeB()),
        this.GetItem(2)),
      s =
        ((this.pda = new ActivityRewardList_1.ActivityRewardList()),
        this.GetItem(3));
    (this.Mda = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA(void 0)),
      await Promise.all([
        this.fda.CreateThenShowByActorAsync(i.GetOwner()),
        this.vda.CreateThenShowByActorAsync(t.GetOwner()),
        this.pda.CreateThenShowByActorAsync(e.GetOwner()),
        this.Mda.CreateThenShowByActorAsync(s.GetOwner()),
      ]);
  }
  OnStart() {
    this.Mda.FunctionButton.SetFunction(this.Lda);
    var i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
      "CollectActivity_Button_ahead",
    );
    this.Mda.FunctionButton.SetText(i),
      this.pda.InitGridLayout(this.pda.InitCommonGridItem),
      this.fda.SetTimeTextVisible(!1);
  }
  RefreshByData(i) {
    (this.gda = i), this.mGe(), this.Pqe(), this.jqe(), this.Rda();
  }
  mGe() {
    this.fda.SetTitleByTextId(this.gda.Title);
  }
  Pqe() {
    var i = this.gda.SubTitle,
      t = this.gda.Description,
      e = !StringUtils_1.StringUtils.IsEmpty(i);
    this.fda.SetSubTitleVisible(e),
      e && this.fda.SetSubTitleByTextId(i),
      this.vda.SetContentByTextId(t);
  }
  jqe() {
    var i =
      ModelManager_1.ModelManager.ActivityRecallModel.GetRecallBaseRewardPreviewItemList(
        this.gda,
      );
    this.pda.RefreshItemLayout(i, this.Tda);
  }
  Rda() {
    var i = ActivityRecallHelper_1.ActivityRecallHelper.IsMainLineTaskFinish(
      this.gda,
    );
    this.Mda.FunctionButton.SetUiActive(!i),
      this.Mda.PanelActivate.SetUiActive(i),
      i
        ? this.Mda.PanelActivate.SetTextByTextId("RecallActivity_Finish")
        : this.Mda.FunctionButton.SetLocalTextNew("RecallActivity_Go");
  }
}
exports.ActivityRecallMainLineActivityInfoPanel =
  ActivityRecallMainLineActivityInfoPanel;
//# sourceMappingURL=ActivityRecallMainLineActivityInfoPanel.js.map
