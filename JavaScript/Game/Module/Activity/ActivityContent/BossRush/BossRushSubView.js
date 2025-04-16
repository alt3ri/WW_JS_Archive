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
  RedDotController_1 = require("../../../../RedDot/RedDotController"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  DifficultUnlockTipView_1 = require("../../../InstanceDungeon/DifficultUnlockTipView"),
  WorldMapController_1 = require("../../../WorldMap/WorldMapController"),
  ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase"),
  ActivityDescriptionTypeA_1 = require("../UniversalComponents/Content/ActivityDescriptionTypeA"),
  ActivityRewardList_1 = require("../UniversalComponents/Content/ActivityRewardList"),
  ActivityFunctionalArea_1 = require("../UniversalComponents/Functional/ActivityFunctionalArea"),
  ActivityTitleTypeA_1 = require("../UniversalComponents/Title/ActivityTitleTypeA"),
  BossRushController_1 = require("./BossRushController");
class BossRushSubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments),
      (this.pyn = void 0),
      (this.LNe = void 0),
      (this.DNe = void 0),
      (this.UNe = void 0),
      (this.ANe = void 0),
      (this.xB_ = () => {
        (ModelManager_1.ModelManager.BossRushModel.OnlyOpenRewardView = !0),
          BossRushController_1.BossRushController.OpenBossRushView(
            this.ActivityBaseData.Id,
          );
      }),
      (this.lDn = () => {
        this.BNe();
      }),
      (this.DFe = () => {
        var e;
        this.ActivityBaseData.GetPreGuideQuestFinishState()
          ? ((e = {
              MarkId:
                ConfigManager_1.ConfigManager.BossRushConfig.GetBossRushMarkByActivityId(
                  this.ActivityBaseData.Id,
                ),
              MarkType: 0,
              OpenFogId: 0,
            }),
            WorldMapController_1.WorldMapController.OpenView(2, !1, e))
          : ((e = this.ActivityBaseData.GetUnFinishPreGuideQuestId()),
            UiManager_1.UiManager.OpenView("QuestView", e));
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
      (this.BtnBindInfo = [[4, this.xB_]]);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.BossRushDataUpdate,
      this.lDn,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.BossRushDataUpdate,
      this.lDn,
    );
  }
  async OnBeforeStartAsync() {
    var e = this.GetItem(0),
      i =
        ((this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA()),
        this.GetItem(1)),
      t =
        ((this.DNe = new ActivityDescriptionTypeA_1.ActivityDescriptionTypeA()),
        this.GetItem(2)),
      s =
        ((this.UNe = new ActivityRewardList_1.ActivityRewardList()),
        this.GetItem(3));
    (this.ANe = new ActivityFunctionalArea_1.ActivityFunctionalArea(
      this.ActivityBaseData,
    )),
      await Promise.all([
        this.LNe.CreateThenShowByActorAsync(e.GetOwner()),
        this.DNe.CreateThenShowByActorAsync(i.GetOwner()),
        this.UNe.CreateThenShowByActorAsync(t.GetOwner()),
        this.ANe.CreateThenShowByActorAsync(s.GetOwner()),
      ]),
      this.UNe.InitGridLayout(this.UNe.InitCommonGridItem),
      this.ANe.FunctionButton.SetFunction(this.DFe),
      this.ANe.SetRewardButtonVisible(!1);
  }
  OnStart() {
    this.pyn = this.ActivityBaseData;
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
      this.Eyn(),
      this.Qbe());
  }
  Qbe() {
    var e = this.pyn.GetFinishTaskCount(),
      i = this.pyn.GetAllTaskCount();
    this.GetText(5).SetText(e + "/" + i);
  }
  K8e() {
    RedDotController_1.RedDotController.BindRedDot(
      "BossRushReward",
      this.GetItem(6),
      void 0,
      this.pyn.Id,
    );
  }
  _Dn() {
    RedDotController_1.RedDotController.UnBindGivenUi(
      "BossRushReward",
      this.GetItem(6),
    );
  }
  Eyn() {
    var e;
    this.pyn.GetNewUnlockState() &&
      (this.pyn.CacheNewUnlock(),
      ((e = new DifficultUnlockTipView_1.DifficultUnlockTipsData()).Text =
        "BossRushUnlockTips"),
      UiManager_1.UiManager.OpenView("DifficultUnlockTipView", e));
  }
  _Oe() {
    var e = this.ActivityBaseData.IsUnLock();
    this.ANe.SetPanelConditionVisible(!e),
      e ||
        this.ANe.SetPerformanceConditionLock(
          this.ActivityBaseData.ConditionGroupId,
          this.ActivityBaseData.Id,
        ),
      this.ANe.FunctionButton.SetUiActive(e);
  }
  mGe() {
    this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle());
    var [e, i] = this.GetTimeVisibleAndRemainTime();
    this.LNe.SetTimeTextVisible(e), e && this.LNe.SetTimeTextByText(i);
  }
  Pqe() {
    var e = this.ActivityBaseData.LocalConfig,
      i = e.DescTheme,
      e = e.Desc,
      t = !StringUtils_1.StringUtils.IsEmpty(i);
    this.LNe.SetSubTitleVisible(t),
      t && this.LNe.SetSubTitleByTextId(i),
      this.DNe.SetContentByTextId(e);
  }
  jqe() {
    var e = this.ActivityBaseData.GetPreviewReward();
    this.UNe.SetTitleByTextId("BossRushCollectReward"),
      this.UNe.RefreshItemLayout(e);
  }
  OnTimer(e) {
    super.OnTimer(e), this.mGe();
  }
  VNe() {
    var e =
      MultiTextLang_1.configMultiTextLang.GetLocalTextNew("BossRushEnterText");
    this.ANe.FunctionButton.SetText(e);
  }
  BNe() {
    var e = this.pyn.EntranceRedDot(),
      i = this.pyn.GetPreGuideQuestFinishState();
    this.ANe.FunctionButton.SetRedDotVisible(i && e);
  }
}
exports.BossRushSubView = BossRushSubView;
//# sourceMappingURL=BossRushSubView.js.map
