"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemTipsComponent = void 0);
const UE = require("ue");
const GlobalData_1 = require("../../../GlobalData");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const ItemTipsCharacterComponent_1 = require("./SubComponents/ItemTipsCharacterComponent");
const ItemTipsMaterialComponent_1 = require("./SubComponents/ItemTipsMaterialComponent");
const ItemTipsVisionComponent_1 = require("./SubComponents/ItemTipsVisionComponent");
const ItemTipsWeaponComponent_1 = require("./SubComponents/ItemTipsWeaponComponent");
class ItemTipsComponent extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.ItemType = void 0),
      (this.rPt = void 0),
      (this.nPt = new Map()),
      (this.sPt = {
        0: ItemTipsMaterialComponent_1.TipsMaterialComponent,
        1: ItemTipsWeaponComponent_1.TipsWeaponComponent,
        2: ItemTipsVisionComponent_1.TipsVisionComponent,
        3: ItemTipsCharacterComponent_1.ItemTipsCharacterComponent,
      });
  }
  GetComponentByType(e) {
    let t;
    return (
      this.nPt.has(e) ||
        ((t = new this.sPt[e](this.GetItem(4))), this.nPt.set(e, t)),
      this.nPt.get(e)
    );
  }
  RefreshTipsComponentByType(e) {
    this.GetComponentByType(e.ItemType).Refresh(e),
      this.GetComponentByType(e.ItemType).SetVisible(!0);
  }
  SetTipsComponentVisibleByType(e, t) {
    e = this.nPt.get(e);
    e && e.SetVisible(t);
  }
  SetTipsComponentLockButton(e) {
    void 0 !== this.ItemType &&
      this.GetComponentByType(this.ItemType).SetLockButtonShow(e);
  }
  SetTipsNumShow(e) {
    void 0 !== this.ItemType &&
      this.GetComponentByType(this.ItemType).SetPanelNumVisible(e);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UITexture],
      [2, UE.UITexture],
      [3, UE.UINiagara],
      [4, UE.UIItem],
      [5, UE.UIText],
    ];
  }
  OnBeforeDestroy() {
    this.nPt.forEach((e, t) => {
      e.Destroy();
    }),
      this.nPt.clear(),
      this.rPt && (this.rPt = void 0);
  }
  Refresh(e) {
    void 0 !== this.ItemType &&
      this.SetTipsComponentVisibleByType(this.ItemType, !1),
      (this.ItemType = e.ItemType),
      this.aPt(e),
      this.RefreshTipsComponentByType(e),
      this.SetActive(!0);
  }
  aPt(e) {
    const t = this.GetUiNiagara(3);
    var i =
      (t.DeactivateSystem(),
      ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(e.QualityId));
    var i = UE.Color.FromHex(i.DropColor);
    var i =
      (this.GetText(0).SetColor(i),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.Title),
      ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
        "T_TipsQualityTypeLevel" + e.QualityId,
      ));
    var s = ConfigManager_1.ConfigManager.InventoryConfig.GetItemQualityConfig(
      e.QualityId,
    ).QualityColor;
    var s = UE.Color.FromHex(s);
    t.SetColor(s),
      t.ActivateSystem(!0),
      this.SetTextureByPath(i, this.GetTexture(1)),
      this.SetItemIcon(this.GetTexture(2), e.ConfigId),
      this.hPt(e.ConfigId);
  }
  hPt(e) {
    const t = this.GetText(5);
    GlobalData_1.GlobalData.IsPlayInEditor
      ? (LguiUtil_1.LguiUtil.SetLocalText(t, "CommonTipsDebugItemId", e),
        t.SetUIActive(!0))
      : t.SetUIActive(!1);
  }
}
exports.ItemTipsComponent = ItemTipsComponent;
// # sourceMappingURL=ItemTipsComponent.js.map
