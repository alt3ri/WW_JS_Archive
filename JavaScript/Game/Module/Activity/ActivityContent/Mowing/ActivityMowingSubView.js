"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityMowingSubView = void 0);
const UE = require("ue"),
  CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
  MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid"),
  ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController"),
  GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew"),
  WorldMapController_1 = require("../../../WorldMap/WorldMapController"),
  ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase"),
  ActivityFunctionalArea_1 = require("../UniversalComponents/Functional/ActivityFunctionalArea");
class ActivityMowingSubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments),
      (this.D2e = void 0),
      (this.bOe = void 0),
      (this.ANe = void 0),
      (this.JGe = () => {
        return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
      }),
      (this.R2e = () => {
        UiManager_1.UiManager.OpenView(
          "ActivityRewardPopUpView",
          this.D2e.GetRewardViewData(),
        );
      }),
      (this.U2e = () => {
        var i;
        this.D2e.GetPreGuideQuestFinishState()
          ? ((i = {
              MarkId:
                CommonParamById_1.configCommonParamById.GetIntConfig(
                  "MowingMark",
                ),
              MarkType:
                CommonParamById_1.configCommonParamById.GetIntConfig(
                  "MowingMarkType",
                ),
              OpenAreaId: 0,
            }),
            WorldMapController_1.WorldMapController.OpenView(2, !1, i),
            this.D2e.ReadNewInstance())
          : UiManager_1.UiManager.OpenView(
              "QuestView",
              this.D2e.GetUnFinishPreGuideQuestId(),
            );
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIItem],
      [5, UE.UIScrollViewWithScrollbarComponent],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIButtonComponent],
      [9, UE.UIButtonComponent],
      [10, UE.UIText],
      [11, UE.UIItem],
      [12, UE.UIItem],
      [13, UE.UIText],
      [14, UE.UIText],
    ];
  }
  async OnBeforeStartAsync() {
    var i = this.GetItem(6);
    (this.ANe = new ActivityFunctionalArea_1.ActivityFunctionalArea(
      this.ActivityBaseData,
    )),
      await this.ANe.CreateThenShowByActorAsync(i.GetOwner());
  }
  OnStart() {
    var i = this.GetScrollViewWithScrollbar(5);
    (this.bOe = new GenericScrollViewNew_1.GenericScrollViewNew(i, this.JGe)),
      this.ANe.SetRewardButtonFunction(this.R2e),
      this.ANe.FunctionButton.SetFunction(this.U2e);
  }
  OnSetData() {
    this.D2e = this.ActivityBaseData;
  }
  OnAddEventListener() {}
  OnRemoveEventListener() {}
  OnRefreshView() {
    this.T2e(), this.A2e(), this._Oe(), this.BNe(), this.P2e();
  }
  P2e() {
    var i = this.D2e.IsNewInstanceOpen(),
      e = this.D2e.GetPreGuideQuestFinishState();
    i &&
      e &&
      ((i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
        "ActivityMowing_Newlevelunlock",
      )),
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(i));
  }
  OnTimer(i) {
    var [e, t] = this.GetTimeVisibleAndRemainTime();
    this.GetText(10).SetUIActive(e), e && this.GetText(10).SetText(t);
  }
  T2e() {
    var i = this.D2e.GetTitle(),
      i = (this.GetText(1)?.SetText(i), this.D2e.GetDesc());
    this.GetText(3)?.SetText(i),
      this.GetText(14)?.ShowTextNew("CollectActivity_Button_ahead");
  }
  A2e() {
    var i = this.ActivityBaseData.GetPreviewReward();
    this.bOe.RefreshByData(i);
  }
  _Oe() {
    var i = this.ActivityBaseData.IsUnLock();
    this.ANe.SetPanelConditionVisible(!i),
      i ||
        this.ANe.SetPerformanceConditionLock(
          this.ActivityBaseData.ConditionGroupId,
          this.ActivityBaseData.Id,
        ),
      this.GetItem(11)?.SetUIActive(i);
  }
  BNe() {
    var i = this.D2e.IsHaveRewardToGet(),
      i = (this.ANe.SetRewardRedDotVisible(i), this.D2e.IsNewInstanceOpen()),
      e = this.D2e.GetPreGuideQuestFinishState();
    this.ANe.FunctionButton.SetRedDotVisible(e && i);
  }
}
exports.ActivityMowingSubView = ActivityMowingSubView;
//# sourceMappingURL=ActivityMowingSubView.js.map
