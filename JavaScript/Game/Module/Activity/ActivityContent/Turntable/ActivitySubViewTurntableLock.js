"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivitySubViewTurntableLock = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase"),
  ActivityDescriptionTypeA_1 = require("../UniversalComponents/Content/ActivityDescriptionTypeA"),
  ActivityRewardList_1 = require("../UniversalComponents/Content/ActivityRewardList"),
  ActivityFunctionalTypeA_1 = require("../UniversalComponents/Functional/ActivityFunctionalTypeA"),
  ActivityTitleTypeA_1 = require("../UniversalComponents/Title/ActivityTitleTypeA");
class ActivitySubViewTurntableLock extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments),
      (this.ActivityTurntableData = void 0),
      (this.LNe = void 0),
      (this.DNe = void 0),
      (this.UNe = void 0),
      (this.ANe = void 0),
      (this.DFe = () => {
        var i;
        this.ActivityBaseData.GetPreGuideQuestFinishState() ||
          ((i = this.ActivityBaseData.GetUnFinishPreGuideQuestId()),
          this.ActivityTurntableData.SavePreQuestRedDot(i),
          UiManager_1.UiManager.OpenView("QuestView", i));
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
    ];
  }
  OnSetData() {
    this.ActivityTurntableData = this.ActivityBaseData;
  }
  async OnBeforeStartAsync() {
    var i = this.GetItem(1),
      i =
        ((this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA()),
        await this.LNe.CreateThenShowByActorAsync(i.GetOwner()),
        this.GetItem(2)),
      i =
        ((this.DNe = new ActivityDescriptionTypeA_1.ActivityDescriptionTypeA()),
        await this.DNe.CreateThenShowByActorAsync(i.GetOwner()),
        this.GetItem(3)),
      i =
        ((this.UNe = new ActivityRewardList_1.ActivityRewardList()),
        await this.UNe.CreateThenShowByActorAsync(i.GetOwner()),
        this.GetItem(4));
    (this.ANe = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA()),
      await this.ANe.CreateThenShowByActorAsync(i.GetOwner());
  }
  OnStart() {
    var i,
      t,
      e = this.ActivityBaseData.LocalConfig;
    e &&
      ((t = e.DescTheme),
      (i = !StringUtils_1.StringUtils.IsEmpty(t)),
      this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle()),
      this.LNe.SetSubTitleVisible(i),
      i && this.LNe.SetSubTitleByTextId(t),
      (i = e.Desc),
      this.DNe.SetContentByTextId(i),
      (t = this.ActivityBaseData.GetPreviewReward()),
      this.UNe.SetTitleByTextId("CollectActivity_reward"),
      this.UNe.InitGridLayout(this.UNe.InitCommonGridItem),
      this.UNe.RefreshItemLayout(t),
      this.ANe.FunctionButton?.BindCallback(this.DFe),
      this.ANe.FunctionButton.RefreshText("CollectActivity_Button_ahead"));
  }
  OnRefreshView() {
    this.FNe(), this._Fe(), this.BNe();
  }
  OnTimer(i) {
    this.FNe();
  }
  _Fe() {
    var i = this.ActivityBaseData.IsUnLock();
    this.ANe.FunctionButton?.SetUiActive(i),
      this.ANe.SetPanelConditionVisible(!i),
      i ||
        (this.ANe.FunctionButton?.SetUiActive(!1),
        (i = this.GetCurrentLockConditionText()),
        this.ANe.SetLockTextByTextId(i));
  }
  FNe() {
    var [i, t] = this.GetTimeVisibleAndRemainTime();
    this.LNe.SetTimeTextVisible(i), i && this.LNe.SetTimeTextByText(t);
  }
  BNe() {
    var i = this.ActivityTurntableData.IsHasPreQuestRedDot();
    this.ANe.SetFunctionRedDotVisible(i);
  }
}
exports.ActivitySubViewTurntableLock = ActivitySubViewTurntableLock;
//# sourceMappingURL=ActivitySubViewTurntableLock.js.map
