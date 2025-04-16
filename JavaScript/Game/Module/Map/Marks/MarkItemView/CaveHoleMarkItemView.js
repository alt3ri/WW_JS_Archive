"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CaveHoleMarkItemView = void 0);
const ConfigMarkItemView_1 = require("./ConfigMarkItemView"),
  CaveHoleMarkItemChildIconHandle_1 = require("./Handles/CaveHoleMarkItemChildIconHandle");
class CaveHoleMarkItemView extends ConfigMarkItemView_1.ConfigMarkItemView {
  constructor(e) {
    super(e), (this.cil = void 0), (this.cil = e);
  }
  OnBeforeDestroy() {
    super.OnBeforeDestroy(), (this.cil = void 0);
  }
  UpdateIcon() {
    var e = this.MarkConfig.UnlockMarkPic;
    this.OnIconPathChanged(e);
  }
  OnAfterShow() {
    super.OnAfterShow(), this.UpdateIcon();
  }
  OnIconPathChanged(e) {
    var t;
    void 0 !== this.cil &&
      ((t = this.GetSprite(1)).SetUIActive(!0),
      this.LoadIcon(t, e),
      this.MarkItemChildIconHandle.Update(),
      this.MarkItemChildIconHandle.ApplyModified());
  }
  CreateChildIconHandle(e) {
    return new CaveHoleMarkItemChildIconHandle_1.CaveHoleMarkItemChildIconHandle(
      e,
    );
  }
}
exports.CaveHoleMarkItemView = CaveHoleMarkItemView;
//# sourceMappingURL=CaveHoleMarkItemView.js.map
