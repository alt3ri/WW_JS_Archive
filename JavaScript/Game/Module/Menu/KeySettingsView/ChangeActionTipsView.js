"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChangeActionTipsView = void 0);
const UE = require("ue"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  ChangeActionRowView_1 = require("./ChangeActionRowView");
class ChangeActionTipsView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.JGt = void 0),
      (this.uPi = void 0),
      (this.cPi = void 0),
      (this.mPi = void 0),
      (this.dPi = !1),
      (this.CPi = () => {
        this.JGt && this.JGt(this.dPi), this.CloseMe();
      }),
      (this.gPi = () => {
        this.CloseMe();
      }),
      (this.fPi = (i, t) => {
        this.cPi.SetSelected(this.cPi.IsRevert === t),
          this.mPi.SetSelected(this.mPi.IsRevert === t),
          (this.dPi = t);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIButtonComponent],
      [2, UE.UIItem],
      [3, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [0, this.CPi],
        [1, this.gPi],
      ]);
  }
  async OnBeforeStartAsync() {
    (this.cPi = new ChangeActionRowView_1.ChangeActionRowView()),
      (this.mPi = new ChangeActionRowView_1.ChangeActionRowView()),
      this.cPi.BindOnSelected(this.fPi),
      this.mPi.BindOnSelected(this.fPi);
    var i = this.cPi.CreateByActorAsync(this.GetItem(2).GetOwner()),
      t = this.mPi.CreateByActorAsync(this.GetItem(3).GetOwner());
    await Promise.all([i, t]);
  }
  OnStart() {
    var i = this.OpenParam,
      t = i.InputControllerType;
    (this.JGt = i.OnConfirmCallback),
      (this.uPi = i.KeySettingRowData),
      this.cPi?.Refresh(this.uPi, t, !1),
      this.mPi?.Refresh(this.uPi, t, !0),
      this.cPi?.SetSelected(!0),
      this.cPi?.SetActive(!0),
      this.mPi?.SetActive(!0);
  }
  OnBeforeDestroy() {
    (this.cPi = void 0), (this.mPi = void 0), (this.JGt = void 0);
  }
}
exports.ChangeActionTipsView = ChangeActionTipsView;
//# sourceMappingURL=ChangeActionTipsView.js.map
