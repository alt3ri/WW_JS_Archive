"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EntityMarkItem = void 0);
const ModelManager_1 = require("../../../../Manager/ModelManager"),
  EntityMarkItemView_1 = require("../MarkItemView/EntityMarkItemView"),
  ConfigMarkItem_1 = require("./ConfigMarkItem");
class EntityMarkItem extends ConfigMarkItem_1.ConfigMarkItem {
  constructor(e, t, r, i, a, n) {
    super(e, t, r, a, n, 1), (this.TrackTarget = i);
  }
  GetMarkItemViewType() {
    return 9;
  }
  CreateView() {
    return new EntityMarkItemView_1.EntityMarkItemView(this);
  }
  InitPosition() {
    this.TrackTarget ||
      this.SetTrackData(
        ModelManager_1.ModelManager.MapModel.GetConfigMarkTrackTarget(
          this.MarkId,
        ),
      ),
      this.UpdateVisibleRelativeState();
  }
  CheckCanShowView() {
    return (
      ("number" != typeof this.TrackTarget ||
        !!ModelManager_1.ModelManager.CreatureModel.CheckEntityVisible(
          this.TrackTarget,
        )) &&
      super.CheckCanShowView()
    );
  }
}
exports.EntityMarkItem = EntityMarkItem;
//# sourceMappingURL=EntityMarkItem.js.map
