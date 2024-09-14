"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PunishReportTargetListItemPanel = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../../Util/LguiUtil");
class PunishReportTargetListItemPanel extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIText],
    ];
  }
  SetDescLocalNewTxt(e) {
    var t = this.GetText(0);
    LguiUtil_1.LguiUtil.SetLocalTextNew(t, e);
  }
  SetDescTxt(e) {
    this.GetText(0).SetText(e);
  }
  SetNumTxt(e) {
    this.GetText(5).SetText(e);
  }
  SetLockActive(e) {
    this.GetItem(1).SetUIActive(e);
  }
  SetToggleEmptyActive(e) {
    this.GetItem(2).SetUIActive(e);
  }
  SetToggleSelectedActive(e) {
    this.GetItem(3).SetUIActive(e);
  }
}
exports.PunishReportTargetListItemPanel = PunishReportTargetListItemPanel;
//# sourceMappingURL=PunishReportTargetListItemPanel.js.map
