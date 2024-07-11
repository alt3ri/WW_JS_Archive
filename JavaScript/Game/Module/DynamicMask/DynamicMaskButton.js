"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DynamicMaskButton = void 0);
const UE = require("ue");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
const UiLayerType_1 = require("../../Ui/Define/UiLayerType");
const UiLayer_1 = require("../../Ui/UiLayer");
class DynamicMaskButton extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Qyt = void 0),
      (this.UPr = void 0),
      (this.GPo = void 0),
      (this.APr = void 0),
      (this.j7e = () => {
        this.Qyt?.();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [[0, UE.UIButtonComponent]]),
      (this.BtnBindInfo = [[0, this.j7e]]);
  }
  OnAfterShow() {
    let i, t;
    this.UPr?.IsValid() &&
      ((t = this.RootItem.K2_GetComponentToWorld().Inverse()),
      (i = this.UPr.RelativeLocation),
      (i = this.UPr.GetParentAsUIItem()
        .K2_GetComponentToWorld()
        .TransformPosition(i)),
      (t = t.TransformPosition(i)),
      this.UPr.SetUIParent(this.RootItem, !0),
      this.UPr.SetUIRelativeLocation(t));
  }
  SetButtonFunction(i) {
    this.Qyt = i;
  }
  async Init() {
    await this.CreateByResourceIdAsync(
      "UiItem_BtnMask",
      UiLayer_1.UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.Pop),
    );
  }
  SetAttachChildItem(i) {
    (this.UPr = i),
      (this.GPo = i.GetParentAsUIItem()),
      (this.APr = i.GetRelativeTransform());
  }
  ResetItemParent() {
    this.UPr &&
      this.GPo &&
      (this.UPr.SetUIParent(this.GPo),
      this.UPr.K2_SetRelativeTransform(this.APr, !1, void 0, !1));
  }
}
exports.DynamicMaskButton = DynamicMaskButton;
// # sourceMappingURL=DynamicMaskButton.js.map
