"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SoundBoxMarkItem = void 0);
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  SoundBoxMarkItemView_1 = require("../MarkItemView/SoundBoxMarkItemView"),
  ServerMarkItem_1 = require("./ServerMarkItem");
class SoundBoxMarkItem extends ServerMarkItem_1.ServerMarkItem {
  constructor(e, t, r, i) {
    super(e, t, r, i), (this.DetectorId = 0), (this.NDi = !1);
  }
  get MarkType() {
    return this.ServerMarkInfo?.MarkType ?? 16;
  }
  get IsNewCustomMarkItem() {
    return this.NDi;
  }
  Initialize() {
    super.Initialize();
    var e = this.ServerMarkInfo;
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
    this.NDi = e;
  }
  GetTitleText() {
    var e = ConfigManager_1.ConfigManager.MapConfig.GetSoundBoxMarkConfig(
      this.ConfigId,
    );
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.MarkTitle);
  }
  GetDescText() {
    var e = ConfigManager_1.ConfigManager.MapConfig.GetSoundBoxMarkConfig(
      this.ConfigId,
    );
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.MarkDesc);
  }
  GetSoundBoxEntityId() {
    return this.ServerMarkInfo?.EntityConfigId;
  }
}
exports.SoundBoxMarkItem = SoundBoxMarkItem;
//# sourceMappingURL=SoundBoxMarkItem.js.map
