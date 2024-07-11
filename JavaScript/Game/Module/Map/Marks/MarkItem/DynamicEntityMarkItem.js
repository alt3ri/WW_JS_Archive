"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DynamicEntityMarkItem = void 0);
const ModelManager_1 = require("../../../../Manager/ModelManager");
const DynamicEntityMarkItemView_1 = require("../MarkItemView/DynamicEntityMarkItemView");
const DynamicConfigMarkItem_1 = require("./DynamicConfigMarkItem");
class DynamicEntityMarkItem extends DynamicConfigMarkItem_1.DynamicConfigMarkItem {
  constructor(e, t, i, r, a, n) {
    super(e, t, i, a, n, 1), (this.TrackTarget = r);
  }
  Initialize() {
    this.MarkConfig.Scale && this.SetConfigScale(this.MarkConfig.Scale),
      this.InitShowCondition(),
      this.UpdateTrackState();
  }
  OnCreateView() {
    this.InnerView = new DynamicEntityMarkItemView_1.DynamicEntityMarkItemView(
      this,
    );
  }
  CheckCanShowView() {
    return (
      (typeof this.TrackTarget !== "number" ||
        !!ModelManager_1.ModelManager.CreatureModel.CheckEntityVisible(
          this.TrackTarget,
        )) &&
      super.CheckCanShowView()
    );
  }
}
exports.DynamicEntityMarkItem = DynamicEntityMarkItem;
// # sourceMappingURL=DynamicEntityMarkItem.js.map
