"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivitySubViewUniversal = void 0);
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
const ActivityUniversalController_1 = require("./ActivityUniversalController");
class ActivitySubViewUniversal extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments),
      (this.ActivityBaseData = void 0),
      (this.LNe = void 0),
      (this.DNe = void 0),
      (this.UNe = void 0),
      (this.ANe = void 0),
      (this.u2e = () => {
        let i;
        this.ActivityBaseData.GetPreGuideQuestFinishState()
          ? ActivityUniversalController_1.ActivityUniversalController.ActivityFunctionExecute(
              this.ActivityBaseData.Id,
            )
          : ((i = this.ActivityBaseData.GetUnFinishPreGuideQuestId()),
            UiManager_1.UiManager.OpenView("QuestView", i),
            ModelManager_1.ModelManager.ActivityModel.SendActivityViewJumpClickLogData(
              this.ActivityBaseData,
              1,
            ));
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
      (this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle()),
      (e = t.DescTheme),
      (t = t.Desc),
      (i = !StringUtils_1.StringUtils.IsEmpty(e)),
      this.DNe.SetTitleVisible(i),
      i && this.DNe.SetTitleByTextId(e),
      this.DNe.SetContentByTextId(t),
      (i = this.ActivityBaseData.GetPreviewReward()),
      this.UNe.SetTitleByTextId("CollectActivity_reward"),
      this.UNe.InitGridLayout(this.UNe.InitCommonGridItem),
      this.UNe.RefreshItemLayout(i),
      this.ANe.FunctionButton?.BindCallback(this.u2e),
      (e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
        "CollectActivity_Button_ahead",
      )),
      this.ANe.FunctionButton.SetText(e),
      this.OnRefreshView());
  }
  OnRefreshView() {
    this.Xke(), this.FNe();
  }
  FNe() {
    const [i, t] = this.GetTimeVisibleAndRemainTime();
    this.LNe.SetTimeTextVisible(i), i && this.LNe.SetTimeTextByText(t);
  }
  Xke() {
    let i;
    let t;
    let e = this.ActivityBaseData.GetExtraConfig();
    e &&
      ((i = this.ActivityBaseData.IsUnLock()),
      (e = e.FunctionType === 0),
      (t = this.ActivityBaseData.GetPreGuideQuestFinishState()),
      this.ANe.SetPanelConditionVisible(!i),
      i
        ? this.ANe.FunctionButton?.SetUiActive(!e || !t)
        : this.ANe.FunctionButton?.SetUiActive(!1),
      i ||
        ((e = this.GetCurrentLockConditionText()),
        this.ANe.SetLockTextByTextId(e)));
  }
}
exports.ActivitySubViewUniversal = ActivitySubViewUniversal;
// # sourceMappingURL=ActivitySubViewUniversal.js.map
