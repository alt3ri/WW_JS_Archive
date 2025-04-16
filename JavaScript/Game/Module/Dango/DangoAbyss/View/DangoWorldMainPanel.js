"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoWorldMainPanel = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  UiSequencePlayer_1 = require("../../../../Ui/Base/UiSequencePlayer"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  ActivityControllerHolder_1 = require("../../../Activity/ActivityControllerHolder"),
  BattleChildViewPanel_1 = require("../../../BattleUi/Views/BattleChildViewPanel/BattleChildViewPanel"),
  AbyssButtonItem_1 = require("./AbyssButtonItem"),
  DangoWorldQuestItem_1 = require("./DangoWorldQuestItem");
class DangoWorldMainPanel extends BattleChildViewPanel_1.BattleChildViewPanel {
  constructor() {
    super(...arguments),
      (this.$8i = void 0),
      (this.fkc = void 0),
      (this.Gfc = void 0),
      (this.Ffc = void 0),
      (this.df1 = void 0),
      (this.rcr = void 0),
      (this.pE1 = () => {
        (this.$8i =
          ModelManager_1.ModelManager.DangoAbyssModel.GetCurrentOpenAbyssActivityData()),
          this.Og();
      }),
      (this.Kco = () => {
        this.aNc();
      }),
      (this.tC1 = () => {
        ModelManager_1.ModelManager.DangoAbyssModel.GetDangoUpAvailable() &&
          ActivityControllerHolder_1.ActivityControllerHolder.DangoAbyssActivityController.OpenCurrentRoleUpView();
      }),
      (this.iyi = () => {
        ModelManager_1.ModelManager.DangoAbyssModel.GetShopAvailable() &&
          UiManager_1.UiManager.OpenView("DangoAbyssShopView");
      }),
      (this.AMo = () => {
        ControllerHolder_1.ControllerHolder.DangoAbyssController.OpenCurrentActivityAbyssEntrance() ||
          ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.LeaveInstanceDungeon();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIScrollViewWithScrollbarComponent],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.AMo]]);
  }
  AddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnAbyssRoleInfoUpdate,
      this.Kco,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnAbyssAddRole,
        this.Kco,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnActivityOpen,
        this.pE1,
      );
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnAbyssRoleInfoUpdate,
      this.Kco,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnAbyssAddRole,
        this.Kco,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnActivityOpen,
        this.pE1,
      );
  }
  async OnBeforeStartAsync() {
    this.rcr = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem);
    var e = [];
    (this.Gfc = new AbyssButtonItem_1.AbyssButtonItem()),
      e.push(this.Gfc.CreateThenShowByActorAsync(this.GetItem(5).GetOwner())),
      this.Gfc.BindClickCallBack(this.tC1),
      (this.Ffc = new AbyssButtonItem_1.AbyssButtonItem()),
      e.push(this.Ffc.CreateThenShowByActorAsync(this.GetItem(4).GetOwner())),
      this.Ffc.BindClickCallBack(this.iyi),
      (this.fkc = new ProgressPanel()),
      e.push(this.fkc.CreateThenShowByActorAsync(this.GetItem(3).GetOwner())),
      await Promise.all(e),
      (this.df1 = new DangoWorldQuestItem_1.DangoWorldQuestItem()),
      this.df1.Init(this.GetScrollViewWithScrollbar(1), this.GetItem(2)),
      (this.$8i =
        ModelManager_1.ModelManager.DangoAbyssModel.GetCurrentOpenAbyssActivityData()),
      (this.Visible = !0),
      this.ShowBattleChildViewPanel(),
      this.AddEvents(),
      this.rcr.PlaySequencePurely("Loop");
  }
  OnBeforeDestroy() {
    this.RemoveEvents(),
      this.df1?.Clear(),
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData?.SetChildVisible(
        9,
        5,
        !0,
      ),
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData?.SetChildVisible(
        9,
        7,
        !0,
      ),
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData?.SetChildVisible(
        9,
        8,
        !0,
      ),
      this.rcr?.Clear();
  }
  OnBeforeShow() {
    this.Og(), this.BNe();
  }
  BNe() {
    this.Gfc?.BindRedDot("RedDotDangoDevelop");
  }
  Og() {
    this.df1?.Refresh(), this.aNc(), this.iC1();
  }
  aNc() {
    this.$8i && this.fkc.Refresh(this.$8i);
  }
  iC1() {
    var e;
    this.$8i &&
      ((e = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoUpAvailable()),
      this.Gfc.SetUiActive(e),
      (e = ModelManager_1.ModelManager.DangoAbyssModel.GetShopAvailable()),
      this.Ffc.SetUiActive(e));
  }
  OnTickBattleChildViewPanel(e) {
    this.df1?.Tick();
  }
  OnBeforeHide() {
    this.W8e();
  }
  W8e() {
    this.Gfc?.UnBindRedDot();
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    if (2 === t.length) {
      let e = void 0;
      return (
        "DangoUp" === t[1] && (e = this.GetItem(5)),
        "DangoShop" === t[1] && (e = this.GetItem(4)),
        (e = "CloseBtn" === t[1] ? this.GetButton(0)?.RootUIComp : e)
          ? [e, e]
          : void 0
      );
    }
  }
}
exports.DangoWorldMainPanel = DangoWorldMainPanel;
class ProgressPanel extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UITexture],
    ];
  }
  Refresh(e) {
    var t = e.GetAbyssWorldProgressText(),
      t = (this.GetText(1).SetText(t), e.GetAbyssWorldProgressPercentage());
    this.GetTexture(2).SetFillAmount(t);
  }
}
//# sourceMappingURL=DangoWorldMainPanel.js.map
