"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoMonopolyBuffActiveGetPanel = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class DangoMonopolyBuffActiveGetPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.GridData = void 0),
      (this.OnClickCallback = void 0),
      (this.OnClickBtnConfirm = () => {
        this.OnClickCallback?.();
      });
  }
  async Init(t, e) {
    (this.GridData = e), await this.CreateByActorAsync(t.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIItem],
      [5, UE.UIText],
    ]),
      (this.BtnBindInfo = [[0, this.OnClickBtnConfirm]]);
  }
  OnBeforeShow() {
    this.UpdateData();
  }
  UpdateData() {
    var t = this.GridData.GetDangoData(),
      e = this.GridData.GetAddPropertyConfig(),
      s = t?.NameKey ?? "DangoName",
      t = t?.DangoSay ?? "";
    this.GetText(1)?.ShowTextNew(s),
      this.GetText(5)?.ShowTextNew(e?.Desc ?? ""),
      this.GetItem(4)?.SetUIActive(!1),
      this.GetButton(0)?.RootUIComp.SetUIActive(!1),
      this.UpdateDangoSay(t);
  }
  SetDialogVisible(t) {
    this.GetItem(2)?.SetUIActive(t);
  }
  UpdateDangoSay(t) {
    var e = !!t;
    this.SetDialogVisible(e), e && this.GetText(3)?.ShowTextNew(t);
  }
}
exports.DangoMonopolyBuffActiveGetPanel = DangoMonopolyBuffActiveGetPanel;
//# sourceMappingURL=DangoMonopolyBuffActiveGetPanel.js.map
