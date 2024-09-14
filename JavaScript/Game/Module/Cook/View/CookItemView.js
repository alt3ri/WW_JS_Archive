"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.IconItem =
    exports.ConfirmButtonCompose =
    exports.MachiningClueExItem =
    exports.MachiningClueItem =
    exports.MaterialItem =
    exports.CookItemView =
      void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  CookController_1 = require("../CookController"),
  CookDefine_1 = require("../CookDefine");
class CookItemView extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.fGt = void 0),
      (this.oft = void 0),
      (this.BTt = (t) => {
        this.oft && (this.oft(this.fGt), this.bGt());
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [6, UE.UIExtendToggle],
      [10, UE.UISprite],
      [11, UE.UITexture],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [12, UE.UIText],
    ]),
      (this.BtnBindInfo = [[6, this.BTt]]);
  }
  Refresh(t, i, s) {
    (this.fGt = t),
      this.BGt(),
      this.Kbe(),
      this.Rxt(),
      this.qGt(),
      this.bGt(),
      this.P5e(),
      this.N6e(i, !1);
  }
  BGt() {
    var t;
    0 === this.fGt.MainType
      ? 0 === this.fGt.SubType
        ? ((t = ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaById(
            this.fGt.ItemId,
          )),
          this.SetItemQualityIcon(this.GetSprite(10), t.FoodItemId))
        : this.SetItemQualityIcon(this.GetSprite(10), this.fGt.ItemId)
      : ((t = ConfigManager_1.ConfigManager.CookConfig.GetCookProcessedById(
          this.fGt.ItemId,
        )),
        this.SetItemQualityIcon(this.GetSprite(10), t.FinalItemId));
  }
  Kbe() {
    var t;
    0 === this.fGt.MainType
      ? 0 === this.fGt.SubType
        ? ((t = ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaById(
            this.fGt.ItemId,
          )),
          this.SetItemIcon(this.GetTexture(11), t.FoodItemId))
        : this.SetItemIcon(this.GetTexture(11), this.fGt.ItemId)
      : ((t = ConfigManager_1.ConfigManager.CookConfig.GetCookProcessedById(
          this.fGt.ItemId,
        )),
        this.SetItemIcon(this.GetTexture(11), t.FinalItemId));
  }
  P5e() {
    var t;
    this.fGt &&
      (0 === this.fGt.MainType
        ? ((t = ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaById(
            this.fGt.ItemId,
          )),
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(12), t.Name))
        : ((t = ConfigManager_1.ConfigManager.CookConfig.GetCookProcessedById(
            this.fGt.ItemId,
          )),
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(12), t.Name)));
  }
  Rxt() {
    var t;
    1 === this.fGt.MainType
      ? ((t = this.fGt), this.GetItem(7).SetUIActive(!t.IsUnLock))
      : ((t = this.fGt), this.GetItem(7).SetUIActive(!t.IsUnLock));
  }
  qGt() {
    var t;
    1 === this.fGt.MainType
      ? ((t = this.fGt),
        (t =
          CookController_1.CookController.CheckCanProcessed(t.ItemId) &&
          t.IsUnLock),
        this.GetItem(8).SetUIActive(!t))
      : 6e4 === (t = this.fGt).SubType
        ? this.GetItem(8).SetUIActive(!1)
        : ((t = CookController_1.CookController.CheckCanCook(t.ItemId)),
          this.GetItem(8).SetUIActive(!t));
  }
  bGt() {
    this.GetItem(9).SetUIActive(this.fGt.IsNew);
  }
  BindOnClickedCallback(t) {
    this.oft = t;
  }
  OnSelected(t) {
    this.N6e(!0);
  }
  OnDeselected(t) {
    this.N6e(!1);
  }
  N6e(t, i = !0) {
    var s = this.GetExtendToggle(6);
    t ? s.SetToggleState(1, i) : s.SetToggleState(0, !1);
  }
}
exports.CookItemView = CookItemView;
class MaterialItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.ItemData = void 0),
      (this.ItemInfo = void 0),
      (this.Index = 0),
      (this.oft = void 0),
      (this.OnClick = (t) => {
        this.oft && this.oft(this.ItemData, this.Index);
      }),
      this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UITexture],
      [4, UE.UISprite],
    ]),
      (this.BtnBindInfo = [[0, this.OnClick]]);
  }
  Update(t, i) {
    (this.ItemData = t),
      (this.Index = i),
      0 !== this.ItemData.L8n
        ? (this.ItemInfo = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(
            this.ItemData.L8n,
          ))
        : (this.ItemInfo = void 0),
      this.RefreshNeed(),
      this.RefreshHave(),
      this.Kbe(),
      this.BGt();
  }
  RefreshNeed(t = 1) {
    let i = this.ItemData.UVn;
    1 !== t && (i *= t), this.GetText(2).SetText(i.toString());
  }
  RefreshHave() {
    var t = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
      this.ItemData.L8n,
    );
    let i = void 0;
    (i = this.ItemData.K6n
      ? t < this.ItemData.UVn
        ? `<color=#dc0300>${t}</color>`
        : `<color=#ffffff>${t}</color>`
      : "<color=#ffffff>--</color>"),
      this.GetText(1).SetText(i);
  }
  Kbe() {
    this.ItemData.K6n
      ? (this.GetTexture(3).SetUIActive(!0),
        this.SetTextureByPath(this.ItemInfo.Icon, this.GetTexture(3)))
      : this.GetTexture(3).SetUIActive(!1);
  }
  BGt() {
    this.ItemData.K6n
      ? (this.GetSprite(4).SetUIActive(!0),
        this.SetItemQualityIcon(this.GetSprite(4), this.ItemData.L8n))
      : this.GetSprite(4).SetUIActive(!1);
  }
  BindOnClickedCallback(t) {
    this.oft = t;
  }
}
exports.MaterialItem = MaterialItem;
class MachiningClueItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(), this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIText],
    ];
  }
  Update(t, i) {
    this.GetSprite(0).SetUIActive(t),
      this.GetText(1).SetText(i),
      t
        ? this.GetText(1).SetColor(
            UE.Color.FromHex(CookDefine_1.INVENTORY_ACTIVE_COLOR),
          )
        : this.GetText(1).SetColor(
            UE.Color.FromHex(CookDefine_1.INVENTORY_DEACTIVE_COLOR),
          );
  }
}
exports.MachiningClueItem = MachiningClueItem;
class MachiningClueExItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(), this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIText],
      [2, UE.UIText],
    ];
  }
  Update(t, i) {
    this.GetSprite(0).SetUIActive(t),
      this.GetText(2).SetUIActive(t),
      this.GetText(1).SetUIActive(!t),
      (t ? this.GetText(2) : this.GetText(1)).SetText(i);
  }
}
exports.MachiningClueExItem = MachiningClueExItem;
class ConfirmButtonCompose extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.GGt = void 0),
      (this.eTt = () => {
        this.GGt();
      }),
      this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText],
    ]),
      (this.BtnBindInfo = [[0, this.eTt]]);
  }
  UpdateText(t) {
    this.GetText(1).SetText(t);
  }
  RefreshButton(t) {
    this.GetButton(0)
      .GetOwner()
      .GetComponentByClass(UE.UIInteractionGroup.StaticClass())
      .SetInteractable(t);
  }
  BindClickFunction(t) {
    this.GGt = t;
  }
}
exports.ConfirmButtonCompose = ConfirmButtonCompose;
class IconItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(), this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [3, UE.UITexture],
      [4, UE.UISprite],
    ];
  }
  SetIcon(t) {
    this.SetItemIcon(this.GetTexture(3), t);
  }
  SetQuality(t) {
    this.SetItemQualityIcon(this.GetSprite(4), t);
  }
}
exports.IconItem = IconItem;
//# sourceMappingURL=CookItemView.js.map
