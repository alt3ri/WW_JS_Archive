"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BossRushSubView = void 0);
const UE = require("ue"),
  MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  DifficultUnlockTipView_1 = require("../../../InstanceDungeon/DifficultUnlockTipView"),
  WorldMapController_1 = require("../../../WorldMap/WorldMapController"),
  ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase"),
  ActivityDescriptionTypeA_1 = require("../UniversalComponents/Content/ActivityDescriptionTypeA"),
  ActivityRewardList_1 = require("../UniversalComponents/Content/ActivityRewardList"),
  ActivityFunctionalArea_1 = require("../UniversalComponents/Functional/ActivityFunctionalArea"),
  ActivityTitleTypeA_1 = require("../UniversalComponents/Title/ActivityTitleTypeA");
class BossRushSubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments),
      (this.CPr = void 0),
      (this.LNe = void 0),
      (this.DNe = void 0),
      (this.UNe = void 0),
      (this.ANe = void 0),
      (this.yLn = () => {
        this.BNe();
      }),
      (this.uke = () => {
        this.CPr.RebuildData(),
          UiManager_1.UiManager.OpenView(
            "ActivityRewardPopUpView",
            this.CPr.GetRewardViewData(),
          );
      }),
      (this.u2e = () => {
        var i;
        this.ActivityBaseData.GetPreGuideQuestFinishState()
          ? ((i = {
              MarkId:
                ConfigManager_1.ConfigManager.BossRushConfig.GetBossRushMarkByActivityId(
                  this.ActivityBaseData.Id,
                ),
              MarkType: 0,
              OpenAreaId: 0,
            }),
            WorldMapController_1.WorldMapController.OpenView(2, !1, i))
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
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.BossRushDataUpdate,
      this.yLn,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.BossRushDataUpdate,
      this.yLn,
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
    (this.ANe = new ActivityFunctionalArea_1.ActivityFunctionalArea()),
      await Promise.all([
        this.LNe.CreateThenShowByActorAsync(i.GetOwner()),
        this.DNe.CreateThenShowByActorAsync(e.GetOwner()),
        this.UNe.CreateThenShowByActorAsync(t.GetOwner()),
        this.ANe.CreateThenShowByActorAsync(s.GetOwner()),
      ]),
      this.ANe.FunctionButton.SetFunction(this.u2e),
      this.ANe.SetRewardButtonFunction(this.uke);
  }
  OnStart() {
    this.CPr = this.ActivityBaseData;
  }
  OnBeforeShow() {
    this.x6e();
  }
  OnBeforeHide() {
    this.ILn();
  }
  OnRefreshView() {
    this.ActivityBaseData.LocalConfig &&
      (this.Pqe(),
      this.mGe(),
      this.jqe(),
      this.VNe(),
      this.BNe(),
      this._Oe(),
      this.pPr());
  }
  x6e() {
    this.ANe.BindRewardRedDot("BossRushReward", this.CPr.Id);
  }
  ILn() {
    this.ANe.UnbindRewardRedDotById("BossRushReward", this.CPr.Id);
  }
  pPr() {
    var i;
    this.CPr.GetNewUnlockState() &&
      (this.CPr.CacheNewUnlock(),
      ((i = new DifficultUnlockTipView_1.DifficultUnlockTipsData()).Text =
        "BossRushUnlockTips"),
      UiManager_1.UiManager.OpenView("DifficultUnlockTipView", i));
  }
  _Oe() {
    var i = this.ActivityBaseData.IsUnLock();
    this.ANe.SetPanelConditionVisible(!i),
      i || this.ANe.SetLockTextByText(this.GetCurrentLockConditionText()),
      this.GetItem(3)?.SetUIActive(i);
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
    this.DNe.SetTitleVisible(t),
      t && this.DNe.SetTitleByTextId(e),
      this.DNe.SetContentByTextId(i);
  }
  jqe() {
    var i = this.ActivityBaseData.GetPreviewReward();
    this.UNe.SetTitleByTextId("BossRushCollectReward"),
      this.UNe.InitGridLayout(this.UNe.InitCommonGridItem),
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
    var i = this.CPr.EntranceRedDot(),
      e = this.CPr.GetPreGuideQuestFinishState();
    this.ANe.FunctionButton.SetRedDotVisible(e && i);
  }
}
exports.BossRushSubView = BossRushSubView;
//# sourceMappingURL=BossRushSubView.js.map
