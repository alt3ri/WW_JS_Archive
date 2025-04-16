"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionRefineSlotItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  VisionFetterSuitItem_1 = require("../../../Phantom/Vision/View/VisionFetterSuitItem");
class VisionRefineSlotItem extends UiPanelBase_1.UiPanelBase {
  constructor(i) {
    super(),
      (this.aho = void 0),
      (this.rMt = void 0),
      (this.sMt = () => {
        this.rMt && this.rMt(!0);
      }),
      (this.aMt = () => {
        this.rMt && this.rMt(!1);
      }),
      (this.rMt = i);
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
    (this.aho = new VisionFetterSuitItem_1.VisionFetterSuitItem(
      this.GetItem(6),
    )),
      await this.aho.Init();
  }
  OnStart() {
    var i = void 0 !== this.rMt;
    this.GetUiSpriteTransition(0).SetEnable(i);
  }
  RefreshEmpty() {
    this.GetItem(1).SetUIActive(!0),
      this.GetItem(7).SetUIActive(!1),
      this.GetTexture(2).SetUIActive(!1),
      this.GetSprite(3).SetUIActive(!1),
      this.GetButton(5).RootUIComp.SetUIActive(!1),
      this.aho.SetUiActive(!1);
  }
  RefreshByData(t, s, e) {
    const h = this.GetTexture(2),
      i = this.GetSprite(3);
    var n =
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomQualityBgSprite(
          t.GetQuality(),
        ),
      n =
        (this.SetSpriteByPath(n, i, !1, void 0, () => {
          i.SetUIActive(!0);
        }),
        ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
          t.GetConfigId(),
        ));
    this.SetTextureByPath(n.IconMiddle, h, void 0, () => {
      h.SetUIActive(!0),
        this.GetItem(1).SetUIActive(!1),
        this.GetButton(5).RootUIComp.SetUIActive(!s);
      var i = t.GetFetterGroupConfig();
      void 0 !== i && (this.aho.Update(i), this.aho.SetUiActive(s)),
        this.GetItem(7).SetUIActive(!0),
        this.GetText(8).SetText(e.toString());
    });
  }
}
exports.VisionRefineSlotItem = VisionRefineSlotItem;
//# sourceMappingURL=VisionRefineSlotItem.js.map
