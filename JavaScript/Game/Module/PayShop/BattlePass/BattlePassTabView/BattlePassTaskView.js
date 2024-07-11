"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattlePassTaskView = void 0);
const UE = require("ue"),
  CommonDefine_1 = require("../../../../../Core/Define/CommonDefine"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiTabViewBase_1 = require("../../../../Ui/Base/UiTabViewBase"),
  ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView"),
  BattlePassBackgroundPanel_1 = require("./BattlePassBackgroundPanel"),
  BattlePassTaskLoopItem_1 = require("./BattlePassTaskLoopItem"),
  BattlePassTaskTabItem_1 = require("./BattlePassTaskTabItem");
class BattlePassTaskView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments),
      (this.NOe = CommonDefine_1.INVALID_VALUE),
      (this.M2i = void 0),
      (this.A2i = void 0),
      (this.M2t = void 0),
      (this.P2i = []),
      (this.s8e = [1, 2, 0]),
      (this.x2i = () => {
        this.w2i();
      }),
      (this.B2i = (e) => {
        this.NOe !== CommonDefine_1.INVALID_VALUE &&
          ((1 === this.s8e[this.NOe] || (2 === this.s8e[this.NOe] && e)) &&
            ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
              new ConfirmBoxDefine_1.ConfirmBoxDataNew(146),
            ),
          this.w2i());
      }),
      (this.I2i = () => new BattlePassTaskLoopItem_1.BattlePassTaskLoopItem()),
      (this.hPe = () => {
        var e = new BattlePassTaskTabItem_1.BattlePassTaskTabItem();
        return (
          e.SetSelectedCallBack(this.b2i), e.SetCanExecuteChange(this.gke), e
        );
      }),
      (this.b2i = (e) => {
        var t;
        e !== this.NOe &&
          ((t = this.NOe),
          (this.NOe = e),
          t !== CommonDefine_1.INVALID_VALUE &&
            (e = this.A2i.GetLayoutItemByIndex(t)) &&
            e.SetForceSwitch(0),
          this.w2i());
      }),
      (this.gke = (e) => this.NOe !== e);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIVerticalLayout],
      [2, UE.UILoopScrollViewComponent],
      [3, UE.UIItem],
    ];
  }
  async wRn() {
    this.M2i = new BattlePassBackgroundPanel_1.BattlePassBackgroundPanel();
    var e = { IsRewardPanel: !1, WeaponObservers: this.ExtraParams };
    await this.M2i.OnlyCreateByActorAsync(this.GetItem(0).GetOwner(), e),
      this.AddChild(this.M2i);
  }
  async BRn() {
    (this.NOe = CommonDefine_1.INVALID_VALUE),
      (this.A2i = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(1),
        this.hPe,
      )),
      await this.A2i.RefreshByDataAsync(this.s8e),
      (this.M2t = new LoopScrollView_1.LoopScrollView(
        this.GetLoopScrollViewComponent(2),
        this.GetItem(3).GetOwner(),
        this.I2i,
      )),
      this.SelectToggleByIndex(0, !0);
  }
  async OnBeforeStartAsync() {
    await Promise.all([this.wRn(), this.BRn()]);
  }
  OnAfterShow() {
    this.UiViewSequence?.PlaySequence("Switch"), this.w2i();
  }
  SelectToggleByIndex(e, t = !1) {
    if (t) {
      const i = this.A2i.GetLayoutItemByIndex(this.NOe);
      i && i.SetForceSwitch(0), (this.NOe = CommonDefine_1.INVALID_VALUE);
    }
    const i = this.A2i.GetLayoutItemByIndex(e);
    i && i.SetForceSwitch(1, !0);
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.UpdateBattlePassTaskEvent,
      this.x2i,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ReceiveBattlePassTaskEvent,
        this.B2i,
      );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.UpdateBattlePassTaskEvent,
      this.x2i,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ReceiveBattlePassTaskEvent,
        this.B2i,
      );
  }
  w2i() {
    this.NOe !== CommonDefine_1.INVALID_VALUE &&
      (ModelManager_1.ModelManager.BattlePassModel.GetTaskList(
        this.s8e[this.NOe],
        this.P2i,
      ),
      this.M2t.ReloadData(this.P2i));
  }
  OnBeforeDestroy() {
    this.M2t && (this.M2t.ClearGridProxies(), (this.M2t = void 0)),
      (this.P2i = []);
  }
}
exports.BattlePassTaskView = BattlePassTaskView;
//# sourceMappingURL=BattlePassTaskView.js.map
