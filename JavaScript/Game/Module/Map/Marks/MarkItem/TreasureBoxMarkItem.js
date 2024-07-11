"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TreasureBoxMarkItem = void 0);
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const TreasureBoxMarkItemView_1 = require("../MarkItemView/TreasureBoxMarkItemView");
const ServerMarkItem_1 = require("./ServerMarkItem");
class TreasureBoxMarkItem extends ServerMarkItem_1.ServerMarkItem {
  constructor(e, r, t, i) {
    super(e, r, t, i), (this.DetectorId = 0), (this.NLi = !1);
  }
  get MarkType() {
    return 18;
  }
  get IsNewCustomMarkItem() {
    return this.NLi;
  }
  Initialize() {
    super.Initialize();
    const e = this.ServerMarkInfo;
    this.SetTrackData(e.TrackTarget),
      this.SetConfigId(this.ConfigId),
      this.UpdateTrackState();
  }
  OnCreateView() {
    this.InnerView = new TreasureBoxMarkItemView_1.TreasureBoxMarkItemView(
      this,
    );
  }
  SetConfigId(e) {
    (this.ServerMarkInfo.MarkConfigId = e), this.OnSetConfigId(e);
  }
  OnSetConfigId(e) {
    e = ConfigManager_1.ConfigManager.MapConfig.GetTreasureBoxMarkConfig(e);
    this.OnAfterSetConfigId(e);
  }
  SetIsNew(e) {
    this.NLi = e;
  }
  GetTitleText() {
    const e = ConfigManager_1.ConfigManager.MapConfig.GetTreasureBoxMarkConfig(
      this.ConfigId,
    );
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.MarkTitle);
  }
  GetDescText() {
    const e = ConfigManager_1.ConfigManager.MapConfig.GetTreasureBoxMarkConfig(
      this.ConfigId,
    );
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.MarkDesc);
  }
}
exports.TreasureBoxMarkItem = TreasureBoxMarkItem;
// # sourceMappingURL=TreasureBoxMarkItem.js.map
