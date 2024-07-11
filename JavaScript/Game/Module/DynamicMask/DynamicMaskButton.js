"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DynamicMaskButton = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../Ui/Base/UiPanelBase"),
  UiLayerType_1 = require("../../Ui/Define/UiLayerType"),
  UiLayer_1 = require("../../Ui/UiLayer");
class DynamicMaskButton extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Gke = void 0),
      (this.nPr = void 0),
      (this.Bxo = void 0),
      (this.sPr = void 0),
      (this.ije = () => {
        this.Gke?.();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [[0, UE.UIButtonComponent]]),
      (this.BtnBindInfo = [[0, this.ije]]);
  }
  OnAfterShow() {
    var i, t;
    this.nPr?.IsValid() &&
      ((t = this.RootItem.K2_GetComponentToWorld().Inverse()),
      (i = this.nPr.RelativeLocation),
      (i = this.nPr
        .GetParentAsUIItem()
        .K2_GetComponentToWorld()
        .TransformPosition(i)),
      (t = t.TransformPosition(i)),
      this.nPr.SetUIParent(this.RootItem, !0),
      this.nPr.SetUIRelativeLocation(t));
  }
  SetButtonFunction(i) {
    this.Gke = i;
  }
  async Init() {
    await this.CreateByResourceIdAsync(
      "UiItem_BtnMask",
      UiLayer_1.UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.Pop),
    );
  }
  SetAttachChildItem(i) {
    (this.nPr = i),
      (this.Bxo = i.GetParentAsUIItem()),
      (this.sPr = i.GetRelativeTransform());
  }
  ResetItemParent() {
    this.nPr &&
      this.Bxo &&
      (this.nPr.SetUIParent(this.Bxo),
      this.nPr.K2_SetRelativeTransform(this.sPr, !1, void 0, !1));
  }
}
exports.DynamicMaskButton = DynamicMaskButton;
//# sourceMappingURL=DynamicMaskButton.js.map
