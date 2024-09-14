"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SummaryPopView = void 0);
const UE = require("ue"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
class SummaryPopView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.cCa = !1),
      (this.OnConfirm = () => {
        if (!this.cCa) {
          this.cCa = !0;
          const s = this.OpenParam.ConfirmFunc;
          this.CloseMe(() => {
            s?.();
          });
        }
      }),
      (this.OnCancel = () => {
        if (!this.cCa) {
          this.cCa = !0;
          const s = this.OpenParam.CancelFunc;
          this.CloseMe(() => {
            s?.();
          });
        }
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIButtonComponent],
      [2, UE.UIButtonComponent],
      [3, UE.UIText],
    ]),
      (this.BtnBindInfo = [
        [1, this.OnConfirm],
        [2, this.OnCancel],
        [0, this.OnCancel],
      ]);
  }
  OnStart() {
    this.cCa = !1;
    var s = this.OpenParam;
    this.GetText(3).SetText(s.Text);
  }
}
exports.SummaryPopView = SummaryPopView;
//# sourceMappingURL=SummaryPopView.js.map
