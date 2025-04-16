"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TreasureBoxDetectorMarkItemView = void 0);
const UE = require("ue"),
  TreasureBoxDetectorItemRangeHandle_1 = require("./Handles/TreasureBoxDetectorItemRangeHandle"),
  ServerMarkItemView_1 = require("./ServerMarkItemView");
class TreasureBoxDetectorMarkItemView extends ServerMarkItemView_1.ServerMarkItemView {
  constructor(e) {
    super(e),
      (this.KRi = void 0),
      (this.kh_ = void 0),
      (this.KRi = new UE.VectorDouble());
  }
  OnInitialize() {
    super.OnInitialize(), this.kh_.SetVisible(!0);
  }
  OnReset() {
    super.OnReset(), this.kh_.SetVisible(!0);
  }
  CreateComponentHandles() {
    super.CreateComponentHandles(),
      (this.kh_ = this.Oh_(this.MarkComponentContext)),
      this.MarkItemComponentHandleMap.set(2, this.kh_);
  }
  Oh_(e) {
    return new TreasureBoxDetectorItemRangeHandle_1.TreasureBoxDetectorItemRangeHandle(
      e,
    );
  }
  SetScale(e) {
    this.IsHolderValid() &&
      (this.KRi.Set(e, e, e),
      this.RootItem.D_SetWorldScale3D(this.KRi),
      this.kh_?.UpdateRangeScale());
  }
}
exports.TreasureBoxDetectorMarkItemView = TreasureBoxDetectorMarkItemView;
//# sourceMappingURL=TreasureBoxDetectorMarkItemView.js.map
