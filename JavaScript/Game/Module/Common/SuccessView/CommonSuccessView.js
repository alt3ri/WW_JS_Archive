"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonSuccessView = void 0);
const UE = require("ue"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  CommonSuccessData_1 = require("./CommonSuccessData");
class CommonSuccessView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Pe = void 0),
      (this.TimerId = void 0),
      (this.Rvt = () => {
        this.Pe.GetNeedDelay() || this.$Oe();
      });
  }
  OnBeforeCreate() {
    (this.Pe = this.OpenParam ?? new CommonSuccessData_1.CommonSuccessData()),
      this.Dbt();
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIButtonComponent],
      [4, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[3, this.Rvt]]);
  }
  OnAfterPlayStartSequence() {
    this.UiViewSequence.PlaySequencePurely("Xunhuan"), this.Rbt();
  }
  OnAfterShow() {
    this.Ubt(), this.Abt(), this.Pbt();
  }
  Dbt() {
    var i = this.Pe.GetAudioPath();
    i && this.SetAudioEvent(i);
  }
  Ubt() {
    var i,
      e = this.Pe.GetTitleText();
    e && ((i = this.GetText(0)), LguiUtil_1.LguiUtil.SetLocalText(i, e));
  }
  Abt() {
    var i = this.Pe.GetSubTitleText(),
      e = this.GetText(1);
    i
      ? (e.SetUIActive(!0), LguiUtil_1.LguiUtil.SetLocalText(e, i))
      : e.SetUIActive(!1);
  }
  Pbt() {
    var i,
      e = this.Pe.GetClickText();
    e &&
      (this.GetItem(4).SetUIActive(!0),
      (i = this.GetText(2)),
      LguiUtil_1.LguiUtil.SetLocalText(i, e));
  }
  Rbt() {
    this.Pe.GetNeedDelay() &&
      (this.TimerId = TimerSystem_1.TimerSystem.Delay(() => {
        this.$Oe();
      }, CommonSuccessView.rbt));
  }
  $Oe() {
    var i = this.Pe.GetClickFunction();
    i && i(), (this.TimerId = void 0), this.CloseMe();
  }
  OnBeforeDestroy() {
    void 0 !== this.TimerId &&
      (TimerSystem_1.TimerSystem.Remove(this.TimerId), (this.TimerId = void 0));
  }
}
(exports.CommonSuccessView = CommonSuccessView).rbt = 1500;
//# sourceMappingURL=CommonSuccessView.js.map
