"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeeklyRogueSubView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiManager_1 = require("../../../Ui/UiManager"),
  ActivityDescriptionTypeA_1 = require("../../Activity/ActivityContent/UniversalComponents/Content/ActivityDescriptionTypeA"),
  ActivityRewardList_1 = require("../../Activity/ActivityContent/UniversalComponents/Content/ActivityRewardList"),
  ActivityFunctionalTypeA_1 = require("../../Activity/ActivityContent/UniversalComponents/Functional/ActivityFunctionalTypeA"),
  ActivityTitleTypeA_1 = require("../../Activity/ActivityContent/UniversalComponents/Title/ActivityTitleTypeA"),
  ActivitySubViewBase_1 = require("../../Activity/View/SubView/ActivitySubViewBase"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class WeeklyRogueSubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments),
      (this.ActivityBaseData = void 0),
      (this.LNe = void 0),
      (this.DNe = void 0),
      (this.UNe = void 0),
      (this.ANe = void 0),
      (this.RQ_ = () => {
        UiManager_1.UiManager.OpenView(
          "ActivityRewardPopUpView",
          ModelManager_1.ModelManager.WeeklyRogueModel.GetScoreRewardData(),
          (i, t) => {
            i &&
              UiManager_1.UiManager.IsViewShow("CommonActivityView") &&
              UiManager_1.UiManager.GetViewByName(
                "CommonActivityView",
              )?.AddChildViewById(t);
          },
        );
      }),
      (this.DFe = () => {
        var i = ModelManager_1.ModelManager.WeeklyRogueModel?.ActivityData;
        i
          ? (ModelManager_1.ModelManager.ActivityModel?.SaveActivityData(
              i.Id,
              i.CycleId,
              0,
              0,
              0,
            ),
            this.ActivityBaseData?.GetPreGuideQuestFinishState()
              ? ((i = { MarkId: i.GetCycleConfig().MapMark, MarkType: 6 }),
                UiManager_1.UiManager.OpenView("WorldMapView", i))
              : 0 < (i = this.ActivityBaseData.GetUnFinishPreGuideQuestId()) &&
                UiManager_1.UiManager.OpenView("QuestView", i))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "WeeklyRogue",
              34,
              "活动页面点击周常肉鸽前往 活动数据为空",
            );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIButtonComponent],
      [5, UE.UIItem],
      [6, UE.UIText],
      [7, UE.UITexture],
    ]),
      (this.BtnBindInfo = [[4, this.RQ_]]);
  }
  async OnBeforeStartAsync() {
    var i = this.GetItem(0),
      i =
        ((this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA()),
        await this.LNe.CreateThenShowByActorAsync(i.GetOwner()),
        this.GetItem(1)),
      i =
        ((this.DNe = new ActivityDescriptionTypeA_1.ActivityDescriptionTypeA()),
        await this.DNe.CreateThenShowByActorAsync(i.GetOwner()),
        this.GetItem(2)),
      i =
        ((this.UNe = new ActivityRewardList_1.ActivityRewardList()),
        await this.UNe.CreateThenShowByActorAsync(i.GetOwner()),
        this.GetItem(3));
    (this.ANe = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA(
      this.ActivityBaseData,
    )),
      await this.ANe.CreateThenShowByActorAsync(i.GetOwner());
  }
  OnStart() {
    var i,
      t,
      e = this.ActivityBaseData.LocalConfig;
    e &&
      ((i = e.DescTheme),
      (t = !StringUtils_1.StringUtils.IsEmpty(i)),
      this.LNe.SetSubTitleVisible(t),
      t && this.LNe.SetSubTitleByTextId(i),
      this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle()),
      (t = e.Desc),
      this.DNe.SetContentByTextId(t),
      (i = this.ActivityBaseData.GetPreviewReward()),
      this.UNe.SetTitleByTextId("CollectActivity_reward"),
      this.UNe.InitGridLayout(this.UNe.InitCommonGridItem),
      this.UNe.RefreshItemLayout(i),
      this.ANe.FunctionButton.SetFunction(this.DFe),
      (e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
        "CollectActivity_Button_ahead",
      )),
      this.ANe.FunctionButton.SetText(e),
      (t = this.ActivityBaseData?.GetCycleConfig()),
      this.SetTextureByPath(t.ViewBackground, this.GetTexture(7)),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(6),
        "PrefabTextItem_1382682910_Text",
        this.ActivityBaseData.Score.toString(),
        t.MaxScore,
      ),
      this.OnRefreshView());
  }
  OnRefreshView() {
    this.FNe(), this.BNe(), this._Fe();
  }
  OnTimer(i) {
    this.FNe(), this.BNe(), this._Fe();
  }
  BNe() {
    this.GetItem(5).SetUIActive(this.ActivityBaseData.HasScoreRewardEnable()),
      this.ANe.SetFunctionRedDotVisible(this.ActivityBaseData.HasNewCycle());
  }
  FNe() {
    var i,
      t = this.ActivityBaseData?.GetCycleCountDownData();
    t &&
      ((i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
        "WeeklyRogue_Activity_Time",
      )),
      (i = StringUtils_1.StringUtils.Format(i, t.CountDownText)),
      this.LNe.SetTimeTextByText(i));
  }
  _Fe() {
    this.ActivityBaseData.IsUnLock()
      ? (this.ANe.FunctionButton?.SetUiActive(!0),
        this.ANe.SetPanelConditionVisible(!1))
      : (this.ANe.FunctionButton?.SetUiActive(!1),
        this.ANe.SetPerformanceConditionLock(
          this.ActivityBaseData.ConditionGroupId,
          this.ActivityBaseData.Id,
        ));
  }
}
exports.WeeklyRogueSubView = WeeklyRogueSubView;
//# sourceMappingURL=WeeklyRogueSubView.js.map
