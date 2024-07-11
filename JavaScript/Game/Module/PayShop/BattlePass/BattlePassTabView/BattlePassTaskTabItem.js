"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattlePassTaskTabItem = void 0);
const UE = require("ue"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  RedDotController_1 = require("../../../../RedDot/RedDotController"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../../Util/LguiUtil");
class BattlePassTaskTabItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.ScrollViewDelegate = void 0),
      (this.GridIndex = 0),
      (this.DisplayIndex = 0),
      (this.l4e = ""),
      (this.SelectedCallBack = void 0),
      (this.OnCanExecuteChange = void 0),
      (this.Lke = () => this.OnCanExecuteChange?.(this.GridIndex) ?? !0),
      (this.Bke = (t) => {
        1 === t && this.SelectedCallBack?.(this.GridIndex);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [1, UE.UIText],
      [0, UE.UIText],
      [2, UE.UIExtendToggle],
      [3, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[2, this.Bke]]);
  }
  OnStart() {
    this.GetExtendToggle(2).CanExecuteChange.Bind(this.Lke);
  }
  SetForceSwitch(t, e = !1) {
    this.GetExtendToggle(2).SetToggleState(t, e),
      this.GetExtendToggle(2).SetSelfInteractive(0 === t);
  }
  SetSelectedCallBack(t) {
    this.SelectedCallBack = t;
  }
  SetCanExecuteChange(t) {
    this.OnCanExecuteChange = t;
  }
  Refresh(t, e, s) {
    this.UpdateView(t);
  }
  GetKey(t, e) {
    return t;
  }
  Clear() {
    this.UnBindRedDot();
  }
  OnSelected() {}
  OnDeselected() {}
  UpdateView(t) {
    var e = this.GetText(0),
      s = ModelManager_1.ModelManager.BattlePassModel;
    let i = s.GetBattlePassEndTime();
    switch (t) {
      case 0:
        (this.l4e = "BattlePassAlwaysTaskTab"),
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            e,
            "Text_BattlePassAwalsTask_Text",
          );
        break;
      case 1:
        (i = Math.min(i, s.GetDayEndTime())),
          LguiUtil_1.LguiUtil.SetLocalText(e, "BattlePassDayTask"),
          (this.l4e = "BattlePassDayTaskTab");
        break;
      case 2:
        (i = Math.min(i, s.GetWeekEndTime())),
          LguiUtil_1.LguiUtil.SetLocalText(e, "BattlePassWeekTask"),
          (this.l4e = "BattlePassWeekTaskTab");
    }
    var t = this.GetText(1),
      a = TimeUtil_1.TimeUtil.CalculateHourGapBetweenNow(i, !0),
      l = Math.floor(a / TimeUtil_1.TimeUtil.OneDayHourCount),
      a = Math.floor(a - l * TimeUtil_1.TimeUtil.OneDayHourCount);
    0 < l
      ? LguiUtil_1.LguiUtil.SetLocalTextNew(
          t,
          "Text_BattlePassRefreshTime1_Text",
          l,
          a,
        )
      : 0 < a
        ? LguiUtil_1.LguiUtil.SetLocalTextNew(
            t,
            "Text_BattlePassRefreshTime2_Text",
            a,
          )
        : LguiUtil_1.LguiUtil.SetLocalTextNew(
            t,
            "Text_BattlePassRefreshTime3_Text",
          ),
      this.K8e();
  }
  K8e() {
    this.l4e &&
      RedDotController_1.RedDotController.BindRedDot(
        this.l4e,
        this.GetItem(3),
        void 0,
        0,
      );
  }
  UnBindRedDot() {
    this.l4e &&
      (RedDotController_1.RedDotController.UnBindRedDot(this.l4e),
      (this.l4e = void 0));
  }
}
exports.BattlePassTaskTabItem = BattlePassTaskTabItem;
//# sourceMappingURL=BattlePassTaskTabItem.js.map
