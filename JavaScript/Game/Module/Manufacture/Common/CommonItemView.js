"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MaterialItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class MaterialItem extends UiPanelBase_1.UiPanelBase {
  constructor(i) {
    super(),
      (this.ItemData = void 0),
      (this.ItemInfo = void 0),
      (this.Wgt = void 0),
      (this.OnClick = (i) => {
        this.Wgt && this.Wgt(this.ItemData);
      }),
      this.CreateThenShowByActor(i.GetOwner());
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
  Update(i) {
    (this.ItemData = i),
      0 !== this.ItemData.G3n
        ? (this.ItemInfo = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(
            this.ItemData.G3n,
          ))
        : (this.ItemInfo = void 0),
      this.RefreshNeed(),
      this.RefreshHave(),
      this.Kbe(),
      this.Pqt();
  }
  RefreshNeed(i = 1) {
    let e = this.ItemData.k4n;
    1 !== i && (e *= i), this.GetText(2).SetText(e.toString());
  }
  RefreshHave() {
    var i = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
      this.ItemData.G3n,
    );
    let e = void 0;
    (e = this.ItemData.m3n
      ? i < this.ItemData.k4n
        ? `<color=#dc0300>${i}</color>`
        : `<color=#ffffff>${i}</color>`
      : "<color=#ffffff>--</color>"),
      this.GetText(1).SetText(e);
  }
  Kbe() {
    this.ItemData.m3n
      ? (this.GetTexture(3).SetUIActive(!0),
        this.SetTextureByPath(this.ItemInfo.Icon, this.GetTexture(3)))
      : this.GetTexture(3).SetUIActive(!1);
  }
  Pqt() {
    this.ItemData.m3n
      ? (this.GetSprite(4).SetUIActive(!0),
        this.SetItemQualityIcon(this.GetSprite(4), this.ItemInfo.Id))
      : this.GetSprite(4).SetUIActive(!1);
  }
  BindOnClickedCallback(i) {
    this.Wgt = i;
  }
}
exports.MaterialItem = MaterialItem;
//# sourceMappingURL=CommonItemView.js.map
