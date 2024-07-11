"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionRecoverySlotItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class VisionRecoverySlotItem extends UiPanelBase_1.UiPanelBase {
  constructor(i, s = !0) {
    super(),
      (this.oMt = void 0),
      (this.rMt = void 0),
      (this.nMt = !1),
      (this.sMt = () => {
        this.rMt && this.rMt(!0, this.oMt);
      }),
      (this.aMt = () => {
        this.rMt && this.rMt(!1, this.oMt);
      }),
      (this.rMt = i),
      (this.nMt = s);
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
        [4, this.sMt],
        [5, this.aMt],
      ]);
  }
  OnStart() {
    this.RefreshUi(this.oMt);
    var i = void 0 !== this.rMt;
    this.GetUiSpriteTransition(0).SetEnable(i);
  }
  RefreshUi(i) {
    void 0 === (this.oMt = i) ? this.RefreshEmpty() : this.RefreshByData(i);
  }
  RefreshEmpty() {
    this.GetItem(1).SetUIActive(!0),
      this.GetTexture(2).SetUIActive(!1),
      this.GetSprite(3).SetUIActive(!1),
      this.GetButton(5).RootUIComp.SetUIActive(!1);
  }
  RefreshByData(i) {
    const s = this.GetTexture(2),
      t = this.GetSprite(3);
    var e =
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomQualityBgSprite(
          i.GetQuality(),
        ),
      e =
        (this.SetSpriteByPath(e, t, !1, void 0, () => {
          t.SetUIActive(!0);
        }),
        ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
          i.GetConfigId(),
        ));
    this.SetTextureByPath(e.IconMiddle, s, void 0, () => {
      s.SetUIActive(!0),
        this.GetItem(1).SetUIActive(!1),
        this.GetButton(5).RootUIComp.SetUIActive(this.nMt);
    });
  }
}
exports.VisionRecoverySlotItem = VisionRecoverySlotItem;
//# sourceMappingURL=VisionRecoverySlotItem.js.map
