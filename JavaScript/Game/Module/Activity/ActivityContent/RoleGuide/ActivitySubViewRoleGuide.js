"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivitySubViewRoleGuide = void 0);
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const RoleController_1 = require("../../../RoleUi/RoleController");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase");
const ActivityRoleDescribeComponent_1 = require("../UniversalComponents/ActivityRoleDescribeComponent");
const ActivitySmallItemGrid_1 = require("../UniversalComponents/ActivitySmallItemGrid");
const ActivityDescriptionTypeB_1 = require("../UniversalComponents/Content/ActivityDescriptionTypeB");
const ActivityRewardList_1 = require("../UniversalComponents/Content/ActivityRewardList");
const ActivityFunctionalTypeA_1 = require("../UniversalComponents/Functional/ActivityFunctionalTypeA");
const ActivityTitleTypeA_1 = require("../UniversalComponents/Title/ActivityTitleTypeA");
class ActivitySubViewRoleGuide extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments),
      (this.ActivityBaseData = void 0),
      (this.LNe = void 0),
      (this.DNe = void 0),
      (this.UNe = void 0),
      (this.Dke = void 0),
      (this.ANe = void 0),
      (this.Rke = () => {
        return new ActivitySmallItemGrid_1.ActivitySmallItemGrid();
      }),
      (this.Uke = () => {
        let i = this.ActivityBaseData.ShowQuestId;
        ModelManager_1.ModelManager.QuestNewModel.GetQuestState(i) === 2
          ? UiManager_1.UiManager.OpenView("QuestView", i)
          : ((i = this.ActivityBaseData.RoleGuideConfig.ShowQuestGetWay),
            StringUtils_1.StringUtils.IsEmpty(i) ||
              ((i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i)),
              StringUtils_1.StringUtils.IsEmpty(i)) ||
              ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
                i,
              ));
      }),
      (this.Ake = () => {
        const i = this.ActivityBaseData.RoleQuestId;
        ModelManager_1.ModelManager.QuestNewModel.GetQuestState(i) === 2 &&
          UiManager_1.UiManager.OpenView("QuestView", i);
      }),
      (this.Pke = () => {
        const i = [this.ActivityBaseData.RoleTrialId];
        RoleController_1.RoleController.OpenRoleMainView(1, 0, i);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIText],
      [8, UE.UIButtonComponent],
      [9, UE.UIItem],
      [10, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [8, this.Uke],
        [10, this.Pke],
      ]);
  }
  OnSetData() {}
  async OnBeforeStartAsync() {
    var i = this.GetItem(0);
    var i =
      ((this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA()),
      await this.LNe.CreateThenShowByActorAsync(i.GetOwner()),
      this.GetItem(1));
    var i =
      ((this.DNe = new ActivityDescriptionTypeB_1.ActivityDescriptionTypeB()),
      await this.DNe.CreateThenShowByActorAsync(i.GetOwner()),
      this.GetItem(2));
    var i =
      ((this.UNe = new ActivityRewardList_1.ActivityRewardList()),
      await this.UNe.CreateThenShowByActorAsync(i.GetOwner()),
      this.GetItem(4));
    var i =
      ((this.Dke =
        new ActivityRoleDescribeComponent_1.ActivityRoleDescribeComponent()),
      await this.Dke.CreateThenShowByActorAsync(i.GetOwner()),
      this.GetItem(3));
    var i =
      ((this.ANe = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA()),
      await this.ANe.CreateThenShowByActorAsync(i.GetOwner()),
      this.GetItem(9));
    const t = this.ActivityBaseData.GetRoleResourcePath();
    StringUtils_1.StringUtils.IsEmpty(t) || (await this.LoadPrefabAsync(t, i));
  }
  OnStart() {
    var i = this.ActivityBaseData.LocalConfig;
    var i =
      (this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle()),
      this.DNe.SetContentVisible(!StringUtils_1.StringUtils.IsEmpty(i?.Desc)),
      i?.Desc && this.DNe.SetContentByTextId(i.Desc),
      this.DNe.SetTitleVisible(
        !StringUtils_1.StringUtils.IsEmpty(i?.DescTheme),
      ),
      i?.DescTheme && this.DNe.SetTitleByTextId(i.DescTheme),
      this.UNe.SetTitleByTextId("Activity_RoleGuideActivity_RewardDesc"),
      this.UNe.InitGridLayout(this.Rke),
      this.ANe.FunctionButton.BindCallback(this.Ake),
      MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
        "CollectActivity_Button_ahead",
      ));
    this.ANe.FunctionButton.SetText(i),
      this.Dke.Update(this.ActivityBaseData.RoleId),
      this.OnRefreshView();
  }
  OnRefreshView() {
    this.FNe(), this.xke(), this.jqe(), this._Oe();
  }
  OnTimer(i) {
    this.FNe();
  }
  FNe() {
    const [i, t] = this.GetTimeVisibleAndRemainTime();
    this.LNe.SetTimeTextVisible(i), i && this.LNe.SetTimeTextByText(t);
  }
  xke() {
    let i;
    let t = this.ActivityBaseData?.ShowQuestId;
    t
      ? ((t = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(t) !== 3),
        (i = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(
          this.ActivityBaseData.RoleQuestId,
        )),
        (t = t && !(i === 3)),
        this.GetItem(6).SetUIActive(t),
        t &&
          ((i = this.ActivityBaseData.RoleGuideConfig.ShowQuestTips),
          (t = !StringUtils_1.StringUtils.IsEmpty(i)),
          this.GetText(7).SetUIActive(t),
          t) &&
          this.GetText(7).ShowTextNew(i))
      : this.GetItem(6).SetUIActive(!1);
  }
  jqe() {
    const i =
      ModelManager_1.ModelManager.QuestNewModel.GetQuestState(
        this.ActivityBaseData.RoleQuestId,
      ) === 3;
    const t = [];
    for (const s of this.ActivityBaseData.GetPreviewReward()) {
      const e = { Item: s, HasClaimed: i };
      t.push(e);
    }
    this.UNe.RefreshItemLayout(t);
  }
  _Oe() {
    let i;
    var t = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(
      this.ActivityBaseData.RoleQuestId,
    );
    const e = this.ActivityBaseData.IsUnLock();
    var t = t === 3;
    e ||
      ((i = this.GetCurrentLockConditionText()),
      this.ANe.SetLockTextByTextId(i)),
      this.ANe.SetPanelConditionVisible(!e),
      this.ANe.FunctionButton.SetActive(e && !t),
      this.GetItem(5)?.SetUIActive(e && t);
  }
}
exports.ActivitySubViewRoleGuide = ActivitySubViewRoleGuide;
// # sourceMappingURL=ActivitySubViewRoleGuide.js.map
