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
      (this.gpt = () => {
        this.Pe.GetNeedDelay() || this.$Oe();
      });
  }
  OnBeforeCreate() {
    (this.Pe = this.OpenParam ?? new CommonSuccessData_1.CommonSuccessData()),
      this.IBt();
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIButtonComponent],
      [4, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[3, this.gpt]]);
  }
  OnAfterPlayStartSequence() {
    this.UiViewSequence.PlaySequencePurely("Xunhuan"), this.TBt();
  }
  OnAfterShow() {
    this.LBt(), this.DBt(), this.RBt();
  }
  IBt() {
    var i = this.Pe.GetAudioPath();
    i && this.SetAudioEvent(i);
  }
  LBt() {
    var i,
      e = this.Pe.GetTitleText();
    e && ((i = this.GetText(0)), LguiUtil_1.LguiUtil.SetLocalText(i, e));
  }
  DBt() {
    var i = this.Pe.GetSubTitleText(),
      e = this.GetText(1);
    i
      ? (e.SetUIActive(!0), LguiUtil_1.LguiUtil.SetLocalText(e, i))
      : e.SetUIActive(!1);
  }
  RBt() {
    var i,
      e = this.Pe.GetClickText();
    e &&
      (this.GetItem(4).SetUIActive(!0),
      (i = this.GetText(2)),
      LguiUtil_1.LguiUtil.SetLocalText(i, e));
  }
  TBt() {
    this.Pe.GetNeedDelay() &&
      (this.TimerId = TimerSystem_1.TimerSystem.Delay(() => {
        this.$Oe();
      }, CommonSuccessView.tBt));
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
(exports.CommonSuccessView = CommonSuccessView).tBt = 1500;
//# sourceMappingURL=CommonSuccessView.js.map
