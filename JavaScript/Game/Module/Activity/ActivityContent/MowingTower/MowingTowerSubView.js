"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MowingTowerSubView = void 0);
const UE = require("ue"),
  MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  RedDotController_1 = require("../../../../RedDot/RedDotController"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  DifficultUnlockTipView_1 = require("../../../InstanceDungeon/DifficultUnlockTipView"),
  ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase"),
  ActivityDescriptionTypeA_1 = require("../UniversalComponents/Content/ActivityDescriptionTypeA"),
  ActivityRewardList_1 = require("../UniversalComponents/Content/ActivityRewardList"),
  ActivityFunctionalTypeA_1 = require("../UniversalComponents/Functional/ActivityFunctionalTypeA"),
  ActivityTitleTypeA_1 = require("../UniversalComponents/Title/ActivityTitleTypeA"),
  MowingTowerController_1 = require("./MowingTowerController");
class MowingTowerSubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments),
      (this.bLl = void 0),
      (this.LNe = void 0),
      (this.DNe = void 0),
      (this.UNe = void 0),
      (this.ANe = void 0),
      (this.eRl = () => {
        this.BNe();
      }),
      (this.R2e = () => {
        (ModelManager_1.ModelManager.MowingTowerModel.CurrentSelectActivityId =
          this.ActivityBaseData.Id),
          UiManager_1.UiManager.IsViewOpen("MowingTowerRewardView") ||
            UiManager_1.UiManager.OpenView("MowingTowerRewardView");
      }),
      (this.DFe = () => {
        var i;
        this.ActivityBaseData.GetPreGuideQuestFinishState()
          ? MowingTowerController_1.MowingTowerController.OpenMowingTowerView(
              this.ActivityBaseData.Id,
            )
          : ((i = this.ActivityBaseData.GetUnFinishPreGuideQuestId()),
            UiManager_1.UiManager.OpenView("QuestView", i));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIButtonComponent],
      [5, UE.UIText],
      [6, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[4, this.R2e]]);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RefreshMowingTowerData,
      this.eRl,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RefreshMowingTowerData,
      this.eRl,
    );
  }
  async OnBeforeStartAsync() {
    var i = this.GetItem(0),
      e =
        ((this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA()),
        this.GetItem(1)),
      t =
        ((this.DNe = new ActivityDescriptionTypeA_1.ActivityDescriptionTypeA()),
        this.GetItem(2)),
      s =
        ((this.UNe = new ActivityRewardList_1.ActivityRewardList()),
        this.GetItem(3));
    (this.ANe = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA(
      this.ActivityBaseData,
    )),
      await Promise.all([
        this.LNe.CreateThenShowByActorAsync(i.GetOwner()),
        this.DNe.CreateThenShowByActorAsync(e.GetOwner()),
        this.UNe.CreateThenShowByActorAsync(t.GetOwner()),
        this.ANe.CreateThenShowByActorAsync(s.GetOwner()),
      ]),
      this.UNe.InitGridLayout(this.UNe.InitCommonGridItem),
      this.ANe.FunctionButton.SetFunction(this.DFe);
  }
  OnStart() {
    this.bLl = this.ActivityBaseData;
  }
  OnBeforeShow() {
    this.K8e();
  }
  OnBeforeHide() {
    this._Dn();
  }
  OnRefreshView() {
    this.ActivityBaseData.LocalConfig &&
      (this.Pqe(),
      this.mGe(),
      this.jqe(),
      this.VNe(),
      this.BNe(),
      this._Oe(),
      this.IUl(),
      this.Eyn());
  }
  K8e() {
    RedDotController_1.RedDotController.BindRedDot(
      "MowingTowerReward",
      this.GetItem(6),
      void 0,
      this.bLl.Id,
    );
  }
  _Dn() {
    RedDotController_1.RedDotController.UnBindGivenUi(
      "MowingTowerReward",
      this.GetItem(6),
      this.bLl.Id,
    );
  }
  Eyn() {
    var i;
    this.bLl.GetNewUnlockState() &&
      (this.bLl.CacheNewUnlock(),
      ((i = new DifficultUnlockTipView_1.DifficultUnlockTipsData()).Text =
        "MowTowerNewLevelTips"),
      UiManager_1.UiManager.OpenView("DifficultUnlockTipView", i));
  }
  _Oe() {
    this.GetItem(3)?.SetUIActive(!0);
    var i = this.ActivityBaseData.IsUnLock();
    this.ANe.SetPanelConditionVisible(!i),
      this.ANe.FunctionButton.SetUiActive(i),
      i ||
        this.ANe.SetPerformanceConditionLock(
          this.ActivityBaseData.ConditionGroupId,
          this.ActivityBaseData.Id,
        );
  }
  IUl() {
    var i = this.ActivityBaseData;
    this.GetText(5).SetText("" + i.GetFullScore());
  }
  mGe() {
    this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle());
    var [i, e] = this.GetTimeVisibleAndRemainTime();
    this.LNe.SetTimeTextVisible(i), i && this.LNe.SetTimeTextByText(e);
  }
  Pqe() {
    var i = this.ActivityBaseData.LocalConfig,
      e = i.DescTheme,
      i = i.Desc,
      t = !StringUtils_1.StringUtils.IsEmpty(e);
    this.LNe.SetSubTitleVisible(t),
      t && this.LNe.SetSubTitleByTextId(e),
      this.DNe.SetContentByTextId(i);
  }
  jqe() {
    var i = this.ActivityBaseData.GetPreviewReward();
    this.UNe.SetTitleByTextId("BossRushCollectReward"),
      this.UNe.RefreshItemLayout(i);
  }
  OnTimer(i) {
    super.OnTimer(i), this.mGe();
  }
  VNe() {
    var i =
      MultiTextLang_1.configMultiTextLang.GetLocalTextNew("BossRushEnterText");
    this.ANe.FunctionButton.SetText(i);
  }
  BNe() {
    var i = this.bLl.EntranceRedDot(),
      e = this.bLl.GetPreGuideQuestFinishState();
    this.ANe.FunctionButton.SetRedDotVisible(e && i);
  }
}
exports.MowingTowerSubView = MowingTowerSubView;
//# sourceMappingURL=MowingTowerSubView.js.map
