"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattlePassTaskTabItem = void 0);
const UE = require("ue");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class BattlePassTaskTabItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.ScrollViewDelegate = void 0),
      (this.GridIndex = 0),
      (this.DisplayIndex = 0),
      (this.QFe = ""),
      (this.SelectedCallBack = void 0),
      (this.OnCanExecuteChange = void 0),
      (this.T7e = () => this.OnCanExecuteChange?.(this.GridIndex) ?? !0),
      (this.x4e = (t) => {
        t === 1 && this.SelectedCallBack?.(this.GridIndex);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [1, UE.UIText],
      [0, UE.UIText],
      [2, UE.UIExtendToggle],
      [3, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[2, this.x4e]]);
  }
  OnStart() {
    this.GetExtendToggle(2).CanExecuteChange.Bind(this.T7e);
  }
  SetForceSwitch(t, e = !1) {
    this.GetExtendToggle(2).SetToggleState(t, e),
      this.GetExtendToggle(2).SetSelfInteractive(t === 0);
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
    const e = this.GetText(0);
    const s = ModelManager_1.ModelManager.BattlePassModel;
    let i = s.GetBattlePassEndTime();
    switch (t) {
      case 0:
        (this.QFe = "BattlePassAlwaysTaskTab"),
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            e,
            "Text_BattlePassAwalsTask_Text",
          );
        break;
      case 1:
        (i = Math.min(i, s.GetDayEndTime())),
          LguiUtil_1.LguiUtil.SetLocalText(e, "BattlePassDayTask"),
          (this.QFe = "BattlePassDayTaskTab");
        break;
      case 2:
        (i = Math.min(i, s.GetWeekEndTime())),
          LguiUtil_1.LguiUtil.SetLocalText(e, "BattlePassWeekTask"),
          (this.QFe = "BattlePassWeekTaskTab");
    }
    var t = this.GetText(1);
    var a = TimeUtil_1.TimeUtil.CalculateHourGapBetweenNow(i, !0);
    const l = Math.floor(a / TimeUtil_1.TimeUtil.OneDayHourCount);
    var a = Math.floor(a - l * TimeUtil_1.TimeUtil.OneDayHourCount);
    l > 0
      ? LguiUtil_1.LguiUtil.SetLocalTextNew(
          t,
          "Text_BattlePassRefreshTime1_Text",
          l,
          a,
        )
      : a > 0
        ? LguiUtil_1.LguiUtil.SetLocalTextNew(
            t,
            "Text_BattlePassRefreshTime2_Text",
            a,
          )
        : LguiUtil_1.LguiUtil.SetLocalTextNew(
            t,
            "Text_BattlePassRefreshTime3_Text",
          ),
      this.x6e();
  }
  x6e() {
    this.QFe &&
      RedDotController_1.RedDotController.BindRedDot(
        this.QFe,
        this.GetItem(3),
        void 0,
        0,
      );
  }
  UnBindRedDot() {
    this.QFe &&
      (RedDotController_1.RedDotController.UnBindRedDot(this.QFe),
      (this.QFe = void 0));
  }
}
exports.BattlePassTaskTabItem = BattlePassTaskTabItem;
// # sourceMappingURL=BattlePassTaskTabItem.js.map
