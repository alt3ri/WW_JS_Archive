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
      (this._ke = void 0),
      (this.bOe = void 0),
      (this.ANe = void 0),
      (this.JGe = () => {
        return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
      }),
      (this.uke = () => {
        UiManager_1.UiManager.OpenView(
          "ActivityRewardPopUpView",
          this._ke.GetRewardViewData(),
        );
      }),
      (this.cke = () => {
        var i;
        this._ke.GetPreGuideQuestFinishState()
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
            this._ke.ReadNewInstance())
          : UiManager_1.UiManager.OpenView(
              "QuestView",
              this._ke.GetUnFinishPreGuideQuestId(),
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
      [15, UE.UIText],
    ];
  }
  async OnBeforeStartAsync() {
    var i = this.GetItem(6);
    (this.ANe = new ActivityFunctionalArea_1.ActivityFunctionalArea()),
      await this.ANe.CreateThenShowByActorAsync(i.GetOwner());
  }
  OnStart() {
    var i = this.GetScrollViewWithScrollbar(5);
    (this.bOe = new GenericScrollViewNew_1.GenericScrollViewNew(i, this.JGe)),
      this.ANe.SetRewardButtonFunction(this.uke),
      this.ANe.FunctionButton.SetFunction(this.cke);
  }
  OnSetData() {
    this._ke = this.ActivityBaseData;
  }
  OnAddEventListener() {}
  OnRemoveEventListener() {}
  OnRefreshView() {
    this.hke(), this.mke(), this._Oe(), this.BNe(), this.dke();
  }
  dke() {
    var i = this._ke.IsNewInstanceOpen(),
      e = this._ke.GetPreGuideQuestFinishState();
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
  hke() {
    var i = this._ke.GetTitle(),
      i = (this.GetText(1)?.SetText(i), this._ke.GetDesc());
    this.GetText(3)?.SetText(i),
      this.GetText(14)?.ShowTextNew("CollectActivity_Button_ahead");
  }
  mke() {
    var i = this.ActivityBaseData.GetPreviewReward();
    this.bOe.RefreshByData(i);
  }
  _Oe() {
    var i = this.ActivityBaseData.IsUnLock();
    this.ANe.SetPanelConditionVisible(!i),
      i || this.ANe.SetLockTextByText(this.GetCurrentLockConditionText()),
      this.GetItem(11)?.SetUIActive(i);
  }
  BNe() {
    var i = this._ke.IsHaveRewardToGet(),
      i = (this.ANe.SetRewardRedDotVisible(i), this._ke.IsNewInstanceOpen()),
      e = this._ke.GetPreGuideQuestFinishState();
    this.ANe.FunctionButton.SetRedDotVisible(e && i);
  }
}
exports.ActivityMowingSubView = ActivityMowingSubView;
//# sourceMappingURL=ActivityMowingSubView.js.map
