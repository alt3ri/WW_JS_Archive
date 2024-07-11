"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BossRushSubView = void 0);
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const DifficultUnlockTipView_1 = require("../../../InstanceDungeon/DifficultUnlockTipView");
const WorldMapController_1 = require("../../../WorldMap/WorldMapController");
const ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase");
const ActivityDescriptionTypeA_1 = require("../UniversalComponents/Content/ActivityDescriptionTypeA");
const ActivityRewardList_1 = require("../UniversalComponents/Content/ActivityRewardList");
const ActivityFunctionalArea_1 = require("../UniversalComponents/Functional/ActivityFunctionalArea");
const ActivityTitleTypeA_1 = require("../UniversalComponents/Title/ActivityTitleTypeA");
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
        let i;
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
    const i = this.GetItem(0);
    const e =
      ((this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA()),
      this.GetItem(1));
    const t =
      ((this.DNe = new ActivityDescriptionTypeA_1.ActivityDescriptionTypeA()),
      this.GetItem(2));
    const s =
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
    let i;
    this.CPr.GetNewUnlockState() &&
      (this.CPr.CacheNewUnlock(),
      ((i = new DifficultUnlockTipView_1.DifficultUnlockTipsData()).Text =
        "BossRushUnlockTips"),
      UiManager_1.UiManager.OpenView("DifficultUnlockTipView", i));
  }
  _Oe() {
    const i = this.ActivityBaseData.IsUnLock();
    this.ANe.SetPanelConditionVisible(!i),
      i || this.ANe.SetLockTextByText(this.GetCurrentLockConditionText()),
      this.GetItem(3)?.SetUIActive(i);
  }
  mGe() {
    this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle());
    const [i, e] = this.GetTimeVisibleAndRemainTime();
    this.LNe.SetTimeTextVisible(i), i && this.LNe.SetTimeTextByText(e);
  }
  Pqe() {
    var i = this.ActivityBaseData.LocalConfig;
    const e = i.DescTheme;
    var i = i.Desc;
    const t = !StringUtils_1.StringUtils.IsEmpty(e);
    this.DNe.SetTitleVisible(t),
      t && this.DNe.SetTitleByTextId(e),
      this.DNe.SetContentByTextId(i);
  }
  jqe() {
    const i = this.ActivityBaseData.GetPreviewReward();
    this.UNe.SetTitleByTextId("BossRushCollectReward"),
      this.UNe.InitGridLayout(this.UNe.InitCommonGridItem),
      this.UNe.RefreshItemLayout(i);
  }
  OnTimer(i) {
    super.OnTimer(i), this.mGe();
  }
  VNe() {
    const i =
      MultiTextLang_1.configMultiTextLang.GetLocalTextNew("BossRushEnterText");
    this.ANe.FunctionButton.SetText(i);
  }
  BNe() {
    const i = this.CPr.EntranceRedDot();
    const e = this.CPr.GetPreGuideQuestFinishState();
    this.ANe.FunctionButton.SetRedDotVisible(e && i);
  }
}
exports.BossRushSubView = BossRushSubView;
// # sourceMappingURL=BossRushSubView.js.map
