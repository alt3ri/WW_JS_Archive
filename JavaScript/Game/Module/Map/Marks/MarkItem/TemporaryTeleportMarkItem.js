"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TemporaryTeleportMarkItem = void 0);
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const TemporaryTeleportMarkItemView_1 = require("../MarkItemView/TemporaryTeleportMarkItemView");
const ServerMarkItem_1 = require("./ServerMarkItem");
class TemporaryTeleportMarkItem extends ServerMarkItem_1.ServerMarkItem {
  constructor(e, r, t, i) {
    super(e, r, t, i),
      (this.TeleportId = 0),
      (this.NLi = !1),
      (this.TeleportId = e.TeleportId ?? 0);
  }
  get MarkType() {
    return 15;
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
    this.InnerView =
      new TemporaryTeleportMarkItemView_1.TemporaryTeleportMarkItemView(this);
  }
  SetConfigId(e) {
    (this.ServerMarkInfo.MarkConfigId = e), this.OnSetConfigId(e);
  }
  OnSetConfigId(e) {
    e =
      ConfigManager_1.ConfigManager.MapConfig.GetTemporaryTeleportMarkConfigById(
        e,
      );
    this.OnAfterSetConfigId(e);
  }
  SetIsNew(e) {
    this.NLi = e;
  }
  GetTitleText() {
    const e =
      ConfigManager_1.ConfigManager.MapConfig.GetTemporaryTeleportMarkConfigById(
        this.ConfigId,
      );
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.MarkTitle);
  }
  GetDescText() {
    const e =
      ConfigManager_1.ConfigManager.MapConfig.GetTemporaryTeleportMarkConfigById(
        this.ConfigId,
      );
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.MarkDesc);
  }
}
exports.TemporaryTeleportMarkItem = TemporaryTeleportMarkItem;
// # sourceMappingURL=TemporaryTeleportMarkItem.js.map
