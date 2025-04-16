"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoMonopolyBuffActiveShowPanel = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  DangoMonopolyDefine_1 = require("./DangoMonopolyDefine");
class DangoMonopolyBuffActiveShowPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), (this.GridData = void 0);
  }
  async Init(e, n) {
    (this.GridData = n), await this.CreateByActorAsync(e.GetOwner());
  }
  OnBeforeCreate() {}
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UISprite],
    ];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
  }
  OnStart() {
    this.GetText(1)?.SetUIActive(!1);
  }
  OnBeforeShow() {
    this.UpdateData();
  }
  UpdateData() {
    var e = this.GridData.GetDangoData()?.NameKey ?? "DangoName",
      e = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(e, e),
      n = DangoMonopolyDefine_1.dangoMonopolyTextKey.DangoMonopolyMeetDango,
      n = ConfigManager_1.ConfigManager.TextConfig.GetMultiText(n, e),
      e = (this.GetText(0)?.SetText(n), this.GetSprite(2));
    this.SetSpriteByPath(this.GetSpriteTitlePath(), e, !0);
  }
  GetSpriteTitlePath(e = !0) {
    e = e ? "SP_TuanziGetTxt" : "SP_TuanziUnlockTxt";
    return (
      ConfigManager_1.ConfigManager.UiResourceConfig?.GetResourcePath(e) ?? ""
    );
  }
}
exports.DangoMonopolyBuffActiveShowPanel = DangoMonopolyBuffActiveShowPanel;
//# sourceMappingURL=DangoMonopolyBuffActiveShowPanel.js.map
