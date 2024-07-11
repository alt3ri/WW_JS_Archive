"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemTipsComponentContentComponent = exports.ItemTipsComponent =
    void 0);
const UE = require("ue"),
  GlobalData_1 = require("../../../GlobalData"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  LevelSequencePlayer_1 = require("../LevelSequencePlayer"),
  ItemTipsBaseSubComponent_1 = require("./SubComponents/ItemTipsBaseSubComponent"),
  ItemTipsCharacterComponent_1 = require("./SubComponents/ItemTipsCharacterComponent"),
  ItemTipsMaterialComponent_1 = require("./SubComponents/ItemTipsMaterialComponent"),
  ItemTipsVisionComponent_1 = require("./SubComponents/ItemTipsVisionComponent"),
  ItemTipsWeaponComponent_1 = require("./SubComponents/ItemTipsWeaponComponent");
class ItemTipsComponent extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), (this.SPe = void 0), (this.zz = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    (this.zz = new ItemTipsComponentContentComponent()),
      await this.zz.CreateByActorAsync(this.GetItem(0).GetOwner());
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnBeforeShow() {
    this.PlayStartSequence();
  }
  PlayStartSequence() {
    this.SPe?.PlaySequencePurely("Start");
  }
  RefreshTipsComponentByType(e) {
    this.zz?.RefreshTipsComponentByType(e);
  }
  Refresh(e) {
    this.zz?.Refresh(e);
  }
  SetTipsNumShow(e) {
    this.zz?.SetTipsNumShow(e);
  }
  SetTipsComponentLockButton(e) {
    this.zz?.SetTipsComponentLockButton(e);
  }
}
exports.ItemTipsComponent = ItemTipsComponent;
class ItemTipsComponentContentComponent extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.ItemType = void 0),
      (this.axt = void 0),
      (this.hxt = new Map()),
      (this.lxt = {
        [0]: ItemTipsMaterialComponent_1.TipsMaterialComponent,
        1: ItemTipsWeaponComponent_1.TipsWeaponComponent,
        2: ItemTipsVisionComponent_1.TipsVisionComponent,
        3: ItemTipsCharacterComponent_1.ItemTipsCharacterComponent,
        4: ItemTipsBaseSubComponent_1.TipsBaseSubComponent,
      });
  }
  GetComponentByType(e) {
    var t;
    return (
      this.hxt.has(e) ||
        ((t = new this.lxt[e](this.GetItem(4))), this.hxt.set(e, t)),
      this.hxt.get(e)
    );
  }
  RefreshTipsComponentByType(e) {
    this.GetComponentByType(e.ItemType).Refresh(e),
      this.GetComponentByType(e.ItemType).SetVisible(!0);
  }
  SetTipsComponentVisibleByType(e, t) {
    e = this.hxt.get(e);
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
    this.hxt.forEach((e, t) => {
      e.Destroy();
    }),
      this.hxt.clear(),
      this.axt && (this.axt = void 0);
  }
  Refresh(e) {
    void 0 !== this.ItemType &&
      this.SetTipsComponentVisibleByType(this.ItemType, !1),
      (this.ItemType = e.ItemType),
      this._xt(e),
      this.RefreshTipsComponentByType(e),
      this.SetActive(!0);
  }
  _xt(e) {
    var t = this.GetUiNiagara(3),
      i =
        (t.DeactivateSystem(),
        ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(e.QualityId)),
      i = UE.Color.FromHex(i.DropColor),
      i =
        (this.GetText(0).SetColor(i),
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.Title),
        ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
          "T_TipsQualityTypeLevel" + e.QualityId,
        )),
      s = ConfigManager_1.ConfigManager.InventoryConfig.GetItemQualityConfig(
        e.QualityId,
      ).QualityColor,
      s = UE.Color.FromHex(s);
    t.SetColor(s),
      t.ActivateSystem(!0),
      this.SetTextureByPath(i, this.GetTexture(1)),
      this.SetItemIcon(this.GetTexture(2), e.ConfigId),
      this.uxt(e.ConfigId);
  }
  uxt(e) {
    var t = this.GetText(5);
    GlobalData_1.GlobalData.IsPlayInEditor
      ? (LguiUtil_1.LguiUtil.SetLocalText(t, "CommonTipsDebugItemId", e),
        t.SetUIActive(!0))
      : t.SetUIActive(!1);
  }
}
exports.ItemTipsComponentContentComponent = ItemTipsComponentContentComponent;
//# sourceMappingURL=ItemTipsComponent.js.map
