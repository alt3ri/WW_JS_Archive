"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionRecoverySlotItem = void 0);
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class VisionRecoverySlotItem extends UiPanelBase_1.UiPanelBase {
  constructor(i, s = !0) {
    super(),
      (this.Wpt = void 0),
      (this.Kpt = void 0),
      (this.Qpt = !1),
      (this.Xpt = () => {
        this.Kpt && this.Kpt(!0, this.Wpt);
      }),
      (this.$pt = () => {
        this.Kpt && this.Kpt(!1, this.Wpt);
      }),
      (this.Kpt = i),
      (this.Qpt = s);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [1, UE.UIItem],
      [2, UE.UITexture],
      [0, UE.UISpriteTransition],
      [3, UE.UISprite],
      [4, UE.UIButtonComponent],
      [5, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [4, this.Xpt],
        [5, this.$pt],
      ]);
  }
  OnStart() {
    this.RefreshUi(this.Wpt);
    const i = void 0 !== this.Kpt;
    this.GetUiSpriteTransition(0).SetEnable(i);
  }
  RefreshUi(i) {
    void 0 === (this.Wpt = i) ? this.RefreshEmpty() : this.RefreshByData(i);
  }
  RefreshEmpty() {
    this.GetItem(1).SetUIActive(!0),
      this.GetTexture(2).SetUIActive(!1),
      this.GetSprite(3).SetUIActive(!1),
      this.GetButton(5).RootUIComp.SetUIActive(!1);
  }
  RefreshByData(i) {
    const s = this.GetTexture(2);
    const t = this.GetSprite(3);
    var e =
      ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomQualityBgSprite(
        i.GetQuality(),
      );
    var e =
      (this.SetSpriteByPath(e, t, !1, void 0, () => {
        t.SetUIActive(!0);
      }),
      ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
        i.GetConfigId(),
      ));
    this.SetTextureByPath(e.IconMiddle, s, void 0, () => {
      s.SetUIActive(!0),
        this.GetItem(1).SetUIActive(!1),
        this.GetButton(5).RootUIComp.SetUIActive(this.Qpt);
    });
  }
}
exports.VisionRecoverySlotItem = VisionRecoverySlotItem;
// # sourceMappingURL=VisionRecoverySlotItem.js.map
