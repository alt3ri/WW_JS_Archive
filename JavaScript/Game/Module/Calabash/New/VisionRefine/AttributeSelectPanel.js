"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AttributeSelectPanel = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  AttributeSelectGrid_1 = require("./AttributeSelectGrid");
class AttributeSelectPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.eGe = void 0),
      (this.CallBackClick = void 0),
      (this.G1o = () => {
        var e = new AttributeSelectGrid_1.AttributeSelectGrid();
        return (e.OnClickToggleCallBack = this.zdc), e;
      }),
      (this.zdc = (e, t) => {
        this.CallBackClick && this.CallBackClick(e),
          this.eGe.DeselectCurrentGridProxy(),
          this.eGe.SelectGridProxy(t);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIGridLayout],
      [1, UE.UIItem],
      [2, UE.UIText],
    ];
  }
  OnStart() {
    LguiUtil_1.LguiUtil.TrySetLocalTextNew(
      this.GetText(2),
      "VisionRefineAttributeSelect",
    ),
      (this.eGe = new GenericLayout_1.GenericLayout(
        this.GetGridLayout(0),
        this.G1o,
        this.GetItem(1).GetOwner(),
      ));
  }
  RefreshByData(e) {
    this.eGe.RefreshByData(e);
  }
}
exports.AttributeSelectPanel = AttributeSelectPanel;
//# sourceMappingURL=AttributeSelectPanel.js.map
