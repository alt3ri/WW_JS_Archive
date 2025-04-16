"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionRecoverySlotItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  VisionFetterSuitItem_1 = require("../../../Phantom/Vision/View/VisionFetterSuitItem");
class VisionRecoverySlotItem extends UiPanelBase_1.UiPanelBase {
  constructor(i, t = !0) {
    super(),
      (this.oMt = void 0),
      (this.VHa = void 0),
      (this.rMt = void 0),
      (this.nMt = !1),
      (this.sMt = () => {
        this.rMt && this.rMt(!0, this.oMt);
      }),
      (this.aMt = () => {
        this.rMt && this.rMt(!1, this.oMt);
      }),
      (this.rMt = i),
      (this.nMt = t);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [1, UE.UIItem],
      [2, UE.UITexture],
      [0, UE.UISpriteTransition],
      [3, UE.UISprite],
      [4, UE.UIButtonComponent],
      [5, UE.UIButtonComponent],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIText],
    ]),
      (this.BtnBindInfo = [
        [4, this.sMt],
        [5, this.aMt],
      ]);
  }
  async OnBeforeStartAsync() {
    (this.VHa = new VisionFetterSuitItem_1.VisionFetterSuitItem(
      this.GetItem(6),
    )),
      await this.VHa.Init();
  }
  OnStart() {
    this.RefreshUi(this.oMt);
    var i = void 0 !== this.rMt;
    this.GetUiSpriteTransition(0).SetEnable(i), this.GetItem(7).SetUIActive(!1);
  }
  RefreshUi(i) {
    void 0 === (this.oMt = i) ? this.RefreshEmpty() : this.RefreshByData(i);
  }
  RefreshEmpty() {
    this.GetItem(1).SetUIActive(!0),
      this.GetTexture(2).SetUIActive(!1),
      this.GetSprite(3).SetUIActive(!1),
      this.GetButton(5).RootUIComp.SetUIActive(!1),
      this.VHa.SetUiActive(!1),
      this.GetItem(7).SetUIActive(!1);
  }
  RefreshByData(t) {
    const s = this.GetTexture(2),
      i = this.GetSprite(3);
    var e =
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomQualityBgSprite(
          t.GetQuality(),
        ),
      e =
        (this.SetSpriteByPath(e, i, !1, void 0, () => {
          i.SetUIActive(!0);
        }),
        ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
          t.GetConfigId(),
        )),
      e =
        (this.SetTextureByPath(e.IconMiddle, s, void 0, () => {
          s.SetUIActive(!0),
            this.GetItem(1).SetUIActive(!1),
            this.GetButton(5).RootUIComp.SetUIActive(this.nMt);
          var i = t.GetFetterGroupConfig();
          void 0 !== i && this.VHa.Update(i),
            this.VHa.SetUiActive(!this.nMt && void 0 !== i);
        }),
        t.GetConfig().Rarity),
      e =
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomRareConfig(
          e,
        ).Cost;
    this.GetItem(7).SetUIActive(!0), this.GetText(8).SetText(e.toString());
  }
}
exports.VisionRecoverySlotItem = VisionRecoverySlotItem;
//# sourceMappingURL=VisionRecoverySlotItem.js.map
