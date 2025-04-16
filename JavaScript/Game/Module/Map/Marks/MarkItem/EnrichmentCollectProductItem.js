"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EnrichmentCollectProductItem = void 0);
const ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  EnrichmentCollectProductItemView_1 = require("../MarkItemView/EnrichmentCollectProductItemView"),
  ServerMarkItem_1 = require("./ServerMarkItem");
class EnrichmentCollectProductItem extends ServerMarkItem_1.ServerMarkItem {
  get MarkType() {
    return 23;
  }
  constructor(e, r, t, i) {
    super(e, r, t, i);
  }
  GetMarkItemViewType() {
    return 8;
  }
  CreateView() {
    return new EnrichmentCollectProductItemView_1.EnrichmentCollectProductItemView(
      this,
    );
  }
  OnInitialize() {
    super.OnInitialize();
    var e = this.ServerMarkInfo;
    this.SetTrackData(e.TrackTarget);
    this.SetConfigId(6), this.UpdateVisibleRelativeState();
  }
  SetConfigId(e) {
    this.OnSetConfigId(e);
  }
  OnSetConfigId(e) {
    e = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(e);
    this.OnAfterSetConfigId({
      ShowRange: e.ShowRange,
      MarkPic: e.UnlockMarkPic,
      ShowPriority: e.ShowPriority,
      Scale: e.Scale,
      CornerScale: e.CornerScale,
    });
  }
  GetInteractiveFlag() {
    return !1;
  }
}
exports.EnrichmentCollectProductItem = EnrichmentCollectProductItem;
//# sourceMappingURL=EnrichmentCollectProductItem.js.map
