"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TreasureBoxDetectorMarkItem = void 0);
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  TreasureBoxDetectorMarkItemView_1 = require("../MarkItemView/TreasureBoxDetectorMarkItemView"),
  ServerMarkItem_1 = require("./ServerMarkItem");
class TreasureBoxDetectorMarkItem extends ServerMarkItem_1.ServerMarkItem {
  constructor(e, t, r, i) {
    super(e, t, r, i), (this.TeleportId = 0), (this.NDi = !1);
  }
  get MarkType() {
    return 17;
  }
  get IsNewCustomMarkItem() {
    return this.NDi;
  }
  OnInitialize() {
    super.OnInitialize();
    var e = this.ServerMarkInfo;
    this.SetTrackData(e.TrackTarget),
      this.SetConfigId(this.ConfigId),
      this.UpdateVisibleRelativeState();
  }
  GetMarkItemViewType() {
    return 26;
  }
  CreateView() {
    return new TreasureBoxDetectorMarkItemView_1.TreasureBoxDetectorMarkItemView(
      this,
    );
  }
  SetConfigId(e) {
    (this.ServerMarkInfo.MarkConfigId = e), this.OnSetConfigId(e);
  }
  OnSetConfigId(e) {
    e =
      ConfigManager_1.ConfigManager.MapConfig.GetTreasureBoxDetectorMarkConfig(
        e,
      );
    (this.MarkItemEntity.GetOrAddComponent(15).TreasureBoxDetectorMarkConfig =
      e),
      this.OnAfterSetConfigId(e);
  }
  SetIsNew(e) {
    this.NDi = e;
  }
  GetTitleText() {
    var e =
      ConfigManager_1.ConfigManager.MapConfig.GetTreasureBoxDetectorMarkConfig(
        this.ConfigId,
      );
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.MarkTitle);
  }
  GetDescText() {
    var e =
      ConfigManager_1.ConfigManager.MapConfig.GetTreasureBoxDetectorMarkConfig(
        this.ConfigId,
      );
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.MarkDesc);
  }
}
exports.TreasureBoxDetectorMarkItem = TreasureBoxDetectorMarkItem;
//# sourceMappingURL=TreasureBoxDetectorMarkItem.js.map
