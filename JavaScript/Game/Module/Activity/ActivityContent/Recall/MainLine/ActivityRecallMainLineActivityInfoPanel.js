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
      (this.n_a = void 0),
      (this.s_a = void 0),
      (this.a_a = void 0),
      (this.h_a = void 0),
      (this.l_a = void 0),
      (this.d_a = () => {
        const t =
          ActivityRecallHelper_1.ActivityRecallHelper.IsMainLineTaskFinish(
            this.n_a,
          );
        this.h_a.GetLayoutItemList().forEach((i) => {
          i.SetReceivedVisible(t);
        });
      }),
      (this.C_a = () => {
        let i =
          ActivityRecallHelper_1.ActivityRecallHelper.GetFirstUnFinishTask(
            this.n_a,
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
        ((this.s_a = new ActivityTitleTypeA_1.ActivityTitleTypeA()),
        this.GetItem(1)),
      e =
        ((this.a_a = new ActivityDescriptionTypeB_1.ActivityDescriptionTypeB()),
        this.GetItem(2)),
      s =
        ((this.h_a = new ActivityRewardList_1.ActivityRewardList()),
        this.GetItem(3));
    (this.l_a = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA()),
      await Promise.all([
        this.s_a.CreateThenShowByActorAsync(i.GetOwner()),
        this.a_a.CreateThenShowByActorAsync(t.GetOwner()),
        this.h_a.CreateThenShowByActorAsync(e.GetOwner()),
        this.l_a.CreateThenShowByActorAsync(s.GetOwner()),
      ]);
  }
  OnStart() {
    this.l_a.FunctionButton.BindCallback(this.C_a);
    var i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
      "CollectActivity_Button_ahead",
    );
    this.l_a.FunctionButton.SetText(i),
      this.h_a.InitGridLayout(this.h_a.InitCommonGridItem),
      this.s_a.SetTimeTextVisible(!1);
  }
  RefreshByData(i) {
    (this.n_a = i), this.mGe(), this.Pqe(), this.jqe(), this.g_a();
  }
  mGe() {
    this.s_a.SetTitleByTextId(this.n_a.Title);
  }
  Pqe() {
    var i = this.n_a.SubTitle,
      t = this.n_a.Description,
      e = !StringUtils_1.StringUtils.IsEmpty(i);
    this.s_a.SetSubTitleVisible(e),
      e && this.s_a.SetSubTitleByTextId(i),
      this.a_a.SetContentByTextId(t);
  }
  jqe() {
    var i =
      ModelManager_1.ModelManager.ActivityRecallModel.GetRecallBaseRewardPreviewItemList(
        this.n_a,
      );
    this.h_a.RefreshItemLayout(i, this.d_a);
  }
  g_a() {
    var i = ActivityRecallHelper_1.ActivityRecallHelper.IsMainLineTaskFinish(
      this.n_a,
    );
    this.l_a.FunctionButton.RefreshEnable(!i),
      i
        ? this.l_a.FunctionButton.RefreshTextNew("RecallActivity_Finish")
        : this.l_a.FunctionButton.RefreshTextNew("RecallActivity_Go");
  }
}
exports.ActivityRecallMainLineActivityInfoPanel =
  ActivityRecallMainLineActivityInfoPanel;
//# sourceMappingURL=ActivityRecallMainLineActivityInfoPanel.js.map
