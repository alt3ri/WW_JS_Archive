"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BabelTowerSubView = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  RedDotController_1 = require("../../../../RedDot/RedDotController"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  PayShopViewData_1 = require("../../../PayShop/PayShopData/PayShopViewData"),
  ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController"),
  ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase"),
  ActivityDescriptionTypeA_1 = require("../UniversalComponents/Content/ActivityDescriptionTypeA"),
  ActivityRewardList_1 = require("../UniversalComponents/Content/ActivityRewardList"),
  ActivityFunctionalTypeA_1 = require("../UniversalComponents/Functional/ActivityFunctionalTypeA"),
  ActivityTitleTypeA_1 = require("../UniversalComponents/Title/ActivityTitleTypeA"),
  BabelTowerController_1 = require("./BabelTowerController");
class BabelTowerSubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments),
      (this.LNe = void 0),
      (this.DNe = void 0),
      (this.UNe = void 0),
      (this.ANe = void 0),
      (this.DFe = () => {
        var e;
        this.ActivityBaseData.GetPreGuideQuestFinishState()
          ? UiManager_1.UiManager.OpenView("BabelTowerMainView")
          : ((e = this.ActivityBaseData.GetUnFinishPreGuideQuestId()),
            UiManager_1.UiManager.OpenView("QuestView", e));
      }),
      (this.Ud_ = () => {
        var e;
        this.ActivityBaseData.GetPreGuideQuestFinishState()
          ? UiManager_1.UiManager.OpenView("BabelTowerQuestView")
          : ((e = this.ActivityBaseData.GetUnFinishPreGuideQuestId()),
            UiManager_1.UiManager.OpenView("QuestView", e));
      }),
      (this.zDo = () => {
        var e;
        this.ActivityBaseData.GetPreGuideQuestFinishState()
          ? BabelTowerController_1.BabelTowerController.GetBabelTowerData().CheckIfInOpenTime()
            ? (((e = new PayShopViewData_1.PayShopViewData()).PayShopId = 213),
              (e.ShowShopIdList = [213]),
              ControllerHolder_1.ControllerHolder.PayShopController.OpenPayShopView(
                e,
              ))
            : ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
                "BabelTowerIsNotOpen",
              )
          : ((e = this.ActivityBaseData.GetUnFinishPreGuideQuestId()),
            UiManager_1.UiManager.OpenView("QuestView", e));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIButtonComponent],
      [5, UE.UIButtonComponent],
      [6, UE.UIText],
      [7, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [4, this.Ud_],
        [5, this.zDo],
      ]);
  }
  async OnBeforeStartAsync() {
    var e = this.GetItem(0),
      t =
        ((this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA()),
        this.GetItem(1)),
      i =
        ((this.DNe = new ActivityDescriptionTypeA_1.ActivityDescriptionTypeA()),
        this.GetItem(2)),
      r =
        ((this.UNe = new ActivityRewardList_1.ActivityRewardList()),
        this.GetItem(3));
    (this.ANe = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA(
      this.ActivityBaseData,
    )),
      await Promise.all([
        this.LNe.CreateThenShowByActorAsync(e.GetOwner()),
        this.DNe.CreateThenShowByActorAsync(t.GetOwner()),
        this.UNe.CreateThenShowByActorAsync(i.GetOwner()),
        this.ANe.CreateThenShowByActorAsync(r.GetOwner()),
      ]),
      this.UNe.InitGridLayout(this.UNe.InitCommonGridItem),
      this.ANe.FunctionButton.SetFunction(this.DFe),
      this.ANe.SetRewardButtonVisible(!1);
  }
  OnStart() {
    RedDotController_1.RedDotController.BindRedDot(
      "BabelTowerQuestRedDot",
      this.GetItem(7),
    );
  }
  OnBeforeDestroy() {
    RedDotController_1.RedDotController.UnBindGivenUi(
      "BabelTowerQuestRedDot",
      this.GetItem(7),
    );
  }
  OnRefreshView() {
    this.ActivityBaseData.LocalConfig &&
      (this.Pqe(), this.mGe(), this.jqe(), this._Oe(), this.$Tc(), this.WTc());
  }
  Pqe() {
    var e = this.ActivityBaseData.LocalConfig,
      t = e.DescTheme,
      e = e.Desc,
      i = !StringUtils_1.StringUtils.IsEmpty(t);
    this.LNe.SetSubTitleVisible(i),
      i && this.LNe.SetSubTitleByTextId(t),
      this.DNe.SetContentByTextId(e);
  }
  mGe() {
    this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle());
    var [e, t] = this.GetTimeVisibleAndRemainTime();
    this.LNe.SetTimeTextVisible(e), e && this.LNe.SetTimeTextByText(t);
  }
  jqe() {
    var e = this.ActivityBaseData.GetPreviewReward();
    this.UNe.RefreshItemLayout(e);
  }
  _Oe() {
    var e = this.ActivityBaseData.IsUnLock();
    this.ANe.SetPanelConditionVisible(!e),
      e ||
        this.ANe.SetPerformanceConditionLock(
          this.ActivityBaseData.ConditionGroupId,
          this.ActivityBaseData.Id,
        ),
      this.ANe.FunctionButton.SetUiActive(e);
  }
  $Tc() {
    var e = BabelTowerController_1.BabelTowerController.GetBabelTowerData(),
      e = e.GetDifficultyNewLevelRedDot(0) || e.GetDifficultyNewLevelRedDot(1);
    this.ANe.SetFunctionRedDotVisible(e);
  }
  WTc() {
    var e = BabelTowerController_1.BabelTowerController.GetBabelTowerData();
    this.GetText(6).SetText(
      e.CurrentItemCount +
        "/" +
        ModelManager_1.ModelManager.BabelTowerModel.ItemCountMax,
    );
  }
}
exports.BabelTowerSubView = BabelTowerSubView;
//# sourceMappingURL=BabelTowerSubView.js.map
