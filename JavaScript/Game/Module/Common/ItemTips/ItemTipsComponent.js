"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemTipsComponentContentComponent = exports.ItemTipsComponent =
    void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../Core/Common/Log"),
  GlobalData_1 = require("../../../GlobalData"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  ItemTipsAbyssDangoComponent_1 = require("../../Dango/DangoAbyss/View/ItemTipsAbyssDangoComponent"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  LevelSequencePlayer_1 = require("../LevelSequencePlayer"),
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
    this.bco();
  }
  bco() {
    this.SPe?.PlaySequencePurely("Start");
  }
  async PlayCloseSequence() {
    var e = new CustomPromise_1.CustomPromise();
    await this.SPe.PlaySequenceAsync("Close", e);
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
      (this.lxt = new Map([
        [0, ItemTipsMaterialComponent_1.TipsMaterialComponent],
        [1, ItemTipsWeaponComponent_1.TipsWeaponComponent],
        [2, ItemTipsVisionComponent_1.TipsVisionComponent],
        [3, ItemTipsCharacterComponent_1.ItemTipsCharacterComponent],
        [6, ItemTipsAbyssDangoComponent_1.ItemTipsAbyssDangoComponent],
      ]));
  }
  GetComponentByType(e) {
    if (!this.hxt.has(e)) {
      var t = this.lxt.get(e);
      if (!t)
        return void (
          Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Item",
            37,
            "[ItemTips] 常规Tips组件未注册,请检查类型",
            ["Type", e],
          )
        );
      t = new t(this.GetItem(4));
      this.hxt.set(e, t);
    }
    return this.hxt.get(e);
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
    this.Zd1(e), this.em1(e), this.tm1(e), this.uxt(e.ConfigId);
  }
  Zd1(e) {
    var t,
      i = this.GetText(0);
    e.IsQualityByType
      ? i.SetUIActive(!1)
      : ((t = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(
          e.QualityId,
        )),
        (t = UE.Color.FromHex(t.DropColor)),
        this.GetText(0).SetColor(t),
        LguiUtil_1.LguiUtil.SetLocalTextNew(i, e.Title));
  }
  em1(e) {
    var t,
      i = this.GetUiNiagara(3),
      s = (i.DeactivateSystem(), this.GetTexture(1));
    e.IsQualityByType
      ? s.SetUIActive(!1)
      : ((t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
          "T_TipsQualityTypeLevel" + e.QualityId,
        )),
        (e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemQualityConfig(
          e.QualityId,
        ).QualityColor),
        (e = UE.Color.FromHex(e)),
        i.SetColor(e),
        i.ActivateSystem(!0),
        this.SetTextureByPath(t, s));
  }
  tm1(e) {
    var t = this.GetTexture(2);
    e.IsIconByType
      ? t.SetUIActive(!1)
      : (t.SetUIActive(!0), this.SetItemIcon(t, e.ConfigId));
  }
  uxt(e) {
    var t = this.GetText(5);
    GlobalData_1.GlobalData.IsPlayInEditor
      ? (LguiUtil_1.LguiUtil.SetLocalText(t, "CommonTipsDebugItemId", e),
        t.SetUIActive(!0))
      : t.SetUIActive(!1);
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    return 0 !== e.length && "DangoPlugin" === e[0]
      ? this.hxt?.get(6)?.GetGuideUiItemAndUiItemForShowEx(e)
      : void 0;
  }
}
exports.ItemTipsComponentContentComponent = ItemTipsComponentContentComponent;
//# sourceMappingURL=ItemTipsComponent.js.map
