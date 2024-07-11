"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivitySubViewRogue = void 0);
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase");
const ActivityDescriptionTypeA_1 = require("../UniversalComponents/Content/ActivityDescriptionTypeA");
const ActivityRewardList_1 = require("../UniversalComponents/Content/ActivityRewardList");
const ActivityFunctionalTypeA_1 = require("../UniversalComponents/Functional/ActivityFunctionalTypeA");
const ActivityTitleTypeA_1 = require("../UniversalComponents/Title/ActivityTitleTypeA");
const ActivityRogueController_1 = require("./ActivityRogueController");
class ActivitySubViewRogue extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments),
      (this.ActivityBaseData = void 0),
      (this.LNe = void 0),
      (this.DNe = void 0),
      (this.UNe = void 0),
      (this.ANe = void 0),
      (this.u2e = () => {
        let i = this.ActivityBaseData.GetPreGuideQuestFinishState();
        const t = this.ActivityBaseData.GetRogueActivityState();
        i || t !== 0
          ? ActivityRogueController_1.ActivityRogueController.ActivityFunctionExecute(
              this.ActivityBaseData.Id,
            )
          : ((i = this.ActivityBaseData.GetUnFinishPreGuideQuestId()),
            UiManager_1.UiManager.OpenView("QuestView", i),
            ModelManager_1.ModelManager.ActivityModel.SendActivityViewJumpClickLogData(
              this.ActivityBaseData,
              1,
            )),
          (this.ActivityBaseData.FunctionBtnRedDot = !1);
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
  OnSetData() {}
  async OnBeforeStartAsync() {
    var i = this.GetItem(0);
    var i =
      ((this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA()),
      await this.LNe.CreateThenShowByActorAsync(i.GetOwner()),
      this.GetItem(1));
    var i =
      ((this.DNe = new ActivityDescriptionTypeA_1.ActivityDescriptionTypeA()),
      await this.DNe.CreateThenShowByActorAsync(i.GetOwner()),
      this.GetItem(2));
    var i =
      ((this.UNe = new ActivityRewardList_1.ActivityRewardList()),
      await this.UNe.CreateThenShowByActorAsync(i.GetOwner()),
      this.GetItem(3));
    (this.ANe = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA()),
      await this.ANe.CreateThenShowByActorAsync(i.GetOwner());
  }
  OnStart() {
    let i;
    let t = this.ActivityBaseData.LocalConfig;
    let e = this.ActivityBaseData.GetExtraConfig();
    t &&
      e &&
      ((e = t.DescTheme),
      (i = !StringUtils_1.StringUtils.IsEmpty(e)),
      this.LNe.SetSubTitleVisible(i),
      i && this.LNe.SetSubTitleByTextId(e),
      this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle()),
      (i = t.Desc),
      this.DNe.SetContentByTextId(i),
      this.DNe.SetTitleVisible(!1),
      (e = this.ActivityBaseData.GetPreviewReward()),
      this.UNe.SetTitleByTextId("CollectActivity_reward"),
      this.UNe.InitGridLayout(this.UNe.InitCommonGridItem),
      this.UNe.RefreshItemLayout(e),
      this.ANe.FunctionButton?.BindCallback(this.u2e),
      (t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
        "CollectActivity_Button_ahead",
      )),
      this.ANe.FunctionButton.SetText(t),
      this.OnRefreshView());
  }
  OnRefreshView() {
    this.Xke(), this.FNe(), this.BNe();
  }
  OnTimer(i) {
    this.OnRefreshView();
  }
  BNe() {
    this.ANe?.SetFunctionRedDotVisible(this.ActivityBaseData.RedPointShowState);
  }
  FNe() {
    let i;
    this.ActivityBaseData.GetRogueActivityState() === 0
      ? (([, i] = this.GetTimeVisibleAndRemainTime()),
        this.LNe.SetTimeTextByText(i))
      : this.LNe.SetTimeTextByTextId("Rogue_Function_End_Tip");
  }
  Xke() {
    let i;
    let t = this.ActivityBaseData.GetExtraConfig();
    t &&
      ((i = this.ActivityBaseData.IsUnLock()),
      (t = t.FunctionType === 0),
      i
        ? t
          ? (this.ANe.FunctionButton?.SetUiActive(!1),
            this.ANe.SetPanelConditionVisible(!1))
          : ((i = this.ActivityBaseData.GetRogueActivityState()),
            this.ANe.FunctionButton?.SetUiActive(i !== 2),
            this.ANe.SetPanelConditionVisible(i === 2),
            this.ANe.SetLockTextByTextId("Rogue_Function_End_Tip"))
        : (this.ANe.FunctionButton?.SetUiActive(!1),
          (t = this.GetCurrentLockConditionText()),
          this.ANe.SetLockTextByTextId(t),
          this.ANe.SetPanelConditionVisible(!0)));
  }
}
exports.ActivitySubViewRogue = ActivitySubViewRogue;
// # sourceMappingURL=ActivitySubViewRogue.js.map
