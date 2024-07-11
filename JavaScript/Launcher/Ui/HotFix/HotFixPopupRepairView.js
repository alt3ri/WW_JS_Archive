"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HotFixPopupRepairView = void 0);
const HotPatch_1 = require("../../HotPatch");
const HotFixPopupUiView_1 = require("./HotFixPopupUiView");
class HotFixPopupRepairView extends HotFixPopupUiView_1.HotFixPopupUiView {
  OnStart() {
    super.OnStart(),
      this.SetConfirmationTitle("PatchClearTitle"),
      this.SetConfirmationContent("PatchClear"),
      this.SetConfirmationLeftButtonText("HotFixCancel"),
      this.SetConfirmationRightButtonText("ConfirmText"),
      this.SetConfirmationCloseButtonActive(!0),
      this.SetConfirmationLeftButtonActive(!0),
      this.SetConfirmationRightButtonActive(!0),
      this.SetConfirmationMiddleButtonActive(!1),
      this.SetConfirmationCloseButtonCallBack(() => {
        this.SetActive(!1);
      }),
      this.SetConfirmationLeftButtonCallBack(() => {
        this.SetActive(!1);
      }),
      this.SetConfirmationRightButtonCallBack(() => {
        HotPatch_1.HotPatch.ClearPatch(), this.SetActive(!1);
      });
  }
}
exports.HotFixPopupRepairView = HotFixPopupRepairView;
// # sourceMappingURL=HotFixPopupRepairView.js.map
