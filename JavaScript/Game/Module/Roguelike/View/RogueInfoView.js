"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueInfoView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  RoguelikeDefine_1 = require("../Define/RoguelikeDefine"),
  ElementPanel_1 = require("./ElementPanel"),
  RogueInfoOverview_1 = require("./RogueInfoOverview"),
  RogueInfoSpecialView_1 = require("./RogueInfoSpecialView"),
  RogueInfoViewTokenDetail_1 = require("./RogueInfoViewTokenDetail"),
  TopPanel_1 = require("./TopPanel");
class RogueInfoView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.TopPanel = void 0),
      (this.ElementPanel = void 0),
      (this.TokenDetailPage = void 0),
      (this.OverviewPage = void 0),
      (this.who = void 0),
      (this.SDn = void 0),
      (this.Bho = () => {
        this.OverviewPage?.RefreshPanel(),
          this.TokenDetailPage?.DetailItem?.RefreshPanel(),
          this.who?.Refresh(
            ModelManager_1.ModelManager.RoguelikeModel.RogueInfo
              .SpecialEntryList,
          );
      }),
      (this.bho = (e, i) => {
        this.TokenDetailPage.OnSelected(e, i);
      }),
      (this.qho = (e) => {
        1 === e && this.ChangePage(0);
      }),
      (this.Gho = (e) => {
        1 === e && this.ChangePage(1);
      }),
      (this.Nho = (e) => {
        1 === e && this.ChangePage(2);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIExtendToggle],
      [5, UE.UIExtendToggle],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIExtendToggle],
      [10, UE.UIItem],
      [11, UE.UIText],
    ]),
      (this.BtnBindInfo = [
        [4, this.qho],
        [5, this.Gho],
        [9, this.Nho],
      ]);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RoguelikeInfoSelectedToken,
      this.bho,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RoguelikeDataUpdate,
        this.Bho,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RoguelikeInfoSelectedToken,
      this.bho,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RoguelikeDataUpdate,
        this.Bho,
      );
  }
  async OnBeforeStartAsync() {
    (this.ElementPanel = new ElementPanel_1.ElementPanel()),
      (this.TokenDetailPage =
        new RogueInfoViewTokenDetail_1.RogueInfoViewTokenDetail()),
      (this.OverviewPage = new RogueInfoOverview_1.RogueInfoOverview()),
      (this.who = new RogueInfoSpecialView_1.RogueInfoSpecialView()),
      (this.TopPanel = new TopPanel_1.TopPanel()),
      await this.ElementPanel.CreateThenShowByActorAsync(
        this.GetItem(2).GetOwner(),
      ),
      await this.OverviewPage.CreateThenShowByActorAsync(
        this.GetItem(7).GetOwner(),
      ),
      await this.who.CreateThenShowByActorAsync(this.GetItem(10).GetOwner()),
      await this.TokenDetailPage.CreateByActorAsync(this.GetItem(6).GetOwner()),
      await this.TopPanel.CreateThenShowByActorAsync(
        this.GetItem(0).GetOwner(),
      ),
      await this.TopPanel.RefreshCurrency([
        RoguelikeDefine_1.INSIDE_CURRENCY_ID,
      ]);
  }
  OnStart() {
    (this.TopPanel.CloseCallback = () => {
      this.CloseMe();
    }),
      this.ElementPanel.Refresh(),
      this.TokenDetailPage.Update(
        ModelManager_1.ModelManager.RoguelikeModel.RogueInfo.BuffEntryList,
      ),
      this.who.Refresh(
        ModelManager_1.ModelManager.RoguelikeModel.RogueInfo.SpecialEntryList,
      ),
      this.GetExtendToggle(4).SetToggleState(1, !1),
      this.ChangePage(0);
  }
  ChangePage(e) {
    void 0 !== this.SDn &&
      (0 === this.SDn
        ? this.OverviewPage
        : 1 === this.SDn
          ? this.TokenDetailPage
          : this.who
      ).UiViewSequence.PlaySequence("Close");
    var i = ModelManager_1.ModelManager.RoguelikeModel.RogueInfo;
    this.TokenDetailPage.SetActive(1 === e),
      this.OverviewPage.SetActive(0 === e),
      this.who.SetActive(2 === e),
      this.TokenDetailPage.Update(i.BuffEntryList),
      0 === e
        ? (this.GetItem(8).SetUIActive(!1),
          this.OverviewPage.UiViewSequence.PlaySequence("Start"))
        : 1 === e
          ? (this.TokenDetailPage.UiViewSequence.PlaySequence("Start"),
            this.GetItem(8).SetUIActive(0 === i.BuffEntryList.length),
            LguiUtil_1.LguiUtil.SetLocalTextNew(
              this.GetText(11),
              "RogueNoTokenTips",
            ))
          : (this.who.UiViewSequence.PlaySequence("Start"),
            this.GetItem(8).SetUIActive(0 === i.SpecialEntryList.length),
            LguiUtil_1.LguiUtil.SetLocalTextNew(
              this.GetText(11),
              "RogueNoSpecialTips",
            ));
  }
}
exports.RogueInfoView = RogueInfoView;
//# sourceMappingURL=RogueInfoView.js.map
