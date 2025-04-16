"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoMonopolyTaskView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  CommonCurrencyItemListComponent_1 = require("../../../Common/CommonCurrencyItemListComponent"),
  TabComponent_1 = require("../../../Common/TabComponent/TabComponent"),
  ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine"),
  ShipTowerTeamTabItem_1 = require("../../../ShipTower/View/ShipTowerTeamTabItem"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  DangoMonopolyDefine_1 = require("./DangoMonopolyDefine"),
  DangoMonopolyTaskItem_1 = require("./DangoMonopolyTaskItem"),
  DangoMonopolyViewBase_1 = require("./DangoMonopolyViewBase");
class DangoMonopolyTaskView extends DangoMonopolyViewBase_1.DangoMonopolyViewBase {
  constructor() {
    super(...arguments),
      (this.OpenParam = void 0),
      (this.Ivt = void 0),
      (this.I6e = 0),
      (this.bOe = void 0),
      (this.sma = void 0),
      (this.Cfe = 0),
      (this.IsNeedClose = !1),
      (this.CurrencyItemListComponent = void 0),
      (this.IsShowRemainTime = !1),
      (this.fqe = () => {
        return new ShipTowerTeamTabItem_1.ShipTowerTeamTabItem();
      }),
      (this.KOl = (e) => {
        this.I6e = e;
        e = this.OpenParam?.TaskList[this.I6e];
        e && this.$4c(e);
      }),
      (this.rOe = () => {
        var e = new DangoMonopolyTaskItem_1.DangoMonopolyTaskItem();
        return (e.ClickCallBack = this.j4c), e;
      }),
      (this.j4c = (e) => {
        this.ActivityData?.RequestReceiveTask(e.Id);
      }),
      (this.I5t = () => {
        this.CloseMe();
      }),
      (this.W4c = (e) => {
        switch (e) {
          case 0:
            this.KOl(this.I6e);
            break;
          case 1:
          case 2:
            this.ShowTipClose();
        }
        this.UpdateTabRedDotState();
      }),
      (this.kOe = () => {
        var e, t;
        this.Cfe &&
          ((e = Math.max(this.Cfe - TimeUtil_1.TimeUtil.GetServerTime(), 0)),
          (e = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat3(e)),
          (t = this.GetText(4)),
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            t,
            DangoMonopolyDefine_1.dangoMonopolyTextKey.TaskRefresh,
            e.CountDownText,
          ));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIItem],
      [2, UE.UIVerticalLayout],
      [3, UE.UIItem],
      [4, UE.UIText],
      [5, UE.UIButtonComponent],
      [6, UE.UIText],
      [7, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [0, this.I5t],
        [5, this.I5t],
      ]);
  }
  Es_() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("DangoMonopoly", 69, this.constructor.name, [
        "DataParam",
        this.OpenParam,
      ]);
  }
  async OnBeforeStartAsync() {
    this.Es_(),
      await super.OnBeforeStartAsync(),
      (this.Ivt = new TabComponent_1.TabComponent(
        this.GetItem(1),
        this.fqe,
        this.KOl,
        void 0,
      )),
      (this.bOe = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(2),
        this.rOe,
        this.GetItem(3).GetOwner(),
      ));
    var e = this.OpenParam?.TaskList.length ?? 2;
    await this.Ivt.RefreshTabItemByLengthAsync(e),
      this.GetText(4)?.SetUIActive(!1),
      (this.CurrencyItemListComponent =
        new CommonCurrencyItemListComponent_1.CommonCurrencyItemListComponent(
          this.GetItem(7),
        )),
      await this.CurrencyItemListComponent.SetCurrencyItemList([
        this.ActivityData.DiceItemId,
      ]);
  }
  OnStart() {
    this.GetText(6)?.ShowTextNew(
      DangoMonopolyDefine_1.dangoMonopolyTextKey.TaskTitle,
    );
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.DangoMonopolyTaskUpdate,
      this.W4c,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.DangoMonopolyTaskUpdate,
      this.W4c,
    );
  }
  OnBeforeShow() {
    this.Q4c(),
      this.IsShowRemainTime &&
        (this.sma = TimerSystem_1.RealTimeTimerSystem.Forever(this.kOe, 200));
  }
  OnAfterHide() {
    this.jm();
  }
  Q4c() {
    var e,
      t,
      i = this.Ivt.GetTabItemMap(),
      o = this.OpenParam?.TaskList ?? [];
    for ([e, t] of i)
      t.UpdateNameText(o[e].TaskTypeName),
        t.UpdateRedDotVisible(this.GetTaskListRedDotState(e));
    this.Ivt.SelectToggleByIndex(this.K4c(), !0);
  }
  UpdateTabRedDotState() {
    var e, t;
    for ([e, t] of this.Ivt.GetTabItemMap())
      t.UpdateRedDotVisible(this.GetTaskListRedDotState(e));
  }
  GetTaskListRedDotState(e) {
    return (this.OpenParam?.TaskList ?? [])[e].TaskList.some(
      (e) => e.IsCanReceive() || !this.ActivityData.TaskLookedSet.has(e.Id),
    );
  }
  UpdateTabRedDotStateByIndex(e) {
    var t = this.Ivt.GetTabItemByIndex(e),
      i = this.OpenParam?.TaskList ?? [];
    t?.UpdateRedDotVisible(i[e].TaskList.some((e) => e.IsCanReceive()));
  }
  K4c() {
    var e = this.OpenParam.TaskId ?? 0;
    const t = this.ActivityData?.TaskIdMap.get(e)?.TaskType;
    e = this.OpenParam.TaskList;
    if (t) {
      const i = e.findIndex((e) => e.TaskType === t);
      return Math.max(i, 0);
    }
    const i = e.findIndex(
      (e) => 0 <= e.TaskList.findIndex((e) => e.IsCanReceive()),
    );
    return Math.max(i, 0);
  }
  OnBeforeDestroy() {}
  $4c(e) {
    this.bOe?.RefreshByData(e.TaskList, void 0, !0),
      this.UpdateRemainTimeInfo(e);
    e = e.TaskList.map((e) => e.Id);
    this.ActivityData?.AddNewTaskIdList(e) &&
      this.UpdateTabRedDotStateByIndex(this.I6e);
  }
  UpdateRemainTimeInfo(e) {
    var t = this.GetText(4);
    if (this.IsShowRemainTime)
      (this.Cfe = e.EndTime), t?.SetUIActive(0 < this.Cfe), this.kOe();
    else
      switch (e.TaskType) {
        case 0:
          t?.SetUIActive(!0),
            t?.ShowTextNew(
              DangoMonopolyDefine_1.dangoMonopolyTextKey.TaskRefreshTipsDay,
            );
          break;
        case 1:
          t?.SetUIActive(!0),
            t?.ShowTextNew(
              DangoMonopolyDefine_1.dangoMonopolyTextKey.TaskRefreshTipsWeek,
            );
          break;
        default:
          t?.SetUIActive(!1);
      }
  }
  ShowTipClose() {
    var e;
    this.IsNeedClose ||
      ((this.IsNeedClose = !0),
      ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
        146,
      )).IsEscViewTriggerCallBack = !1),
      e.FunctionMap.set(1, this.CloseMe.bind(this)),
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
        e,
      ));
  }
  jm() {
    TimerSystem_1.RealTimeTimerSystem.Has(this.sma) &&
      (TimerSystem_1.RealTimeTimerSystem.Remove(this.sma), (this.sma = void 0));
  }
}
exports.DangoMonopolyTaskView = DangoMonopolyTaskView;
//# sourceMappingURL=DangoMonopolyTaskView.js.map
