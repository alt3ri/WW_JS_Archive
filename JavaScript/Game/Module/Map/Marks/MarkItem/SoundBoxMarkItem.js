"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SoundBoxMarkItem = void 0);
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const SoundBoxMarkItemView_1 = require("../MarkItemView/SoundBoxMarkItemView");
const ServerMarkItem_1 = require("./ServerMarkItem");
class SoundBoxMarkItem extends ServerMarkItem_1.ServerMarkItem {
  constructor(e, t, r, i) {
    super(e, t, r, i), (this.DetectorId = 0), (this.NLi = !1);
  }
  get MarkType() {
    return this.ServerMarkInfo?.MarkType ?? 16;
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
    this.InnerView = new SoundBoxMarkItemView_1.SoundBoxMarkItemView(this);
  }
  SetConfigId(e) {
    (this.ServerMarkInfo.MarkConfigId = e), this.OnSetConfigId(e);
  }
  OnSetConfigId(e) {
    e = ConfigManager_1.ConfigManager.MapConfig.GetSoundBoxMarkConfig(e);
    this.OnAfterSetConfigId(e);
  }
  SetIsNew(e) {
    this.NLi = e;
  }
  GetTitleText() {
    const e = ConfigManager_1.ConfigManager.MapConfig.GetSoundBoxMarkConfig(
      this.ConfigId,
    );
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.MarkTitle);
  }
  GetDescText() {
    const e = ConfigManager_1.ConfigManager.MapConfig.GetSoundBoxMarkConfig(
      this.ConfigId,
    );
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.MarkDesc);
  }
  GetSoundBoxEntityId() {
    return this.ServerMarkInfo?.EntityConfigId;
  }
}
exports.SoundBoxMarkItem = SoundBoxMarkItem;
// # sourceMappingURL=SoundBoxMarkItem.js.map
