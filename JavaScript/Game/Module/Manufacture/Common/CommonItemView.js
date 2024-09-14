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
      (this.oft = void 0),
      (this.OnClick = (i) => {
        this.oft && this.oft(this.ItemData);
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
  RefreshNeed(i = 1) {
    let e = this.ItemData.UVn;
    1 !== i && (e *= i), this.GetText(2).SetText(e.toString());
  }
  RefreshHave() {
    var i = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
      this.ItemData.L8n,
    );
    let e = void 0;
    (e = this.ItemData.K6n
      ? i < this.ItemData.UVn
        ? `<color=#dc0300>${i}</color>`
        : `<color=#ffffff>${i}</color>`
      : "<color=#ffffff>--</color>"),
      this.GetText(1).SetText(e);
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
        this.SetItemQualityIcon(this.GetSprite(4), this.ItemInfo.Id))
      : this.GetSprite(4).SetUIActive(!1);
  }
  BindOnClickedCallback(i) {
    this.oft = i;
  }
}
exports.MaterialItem = MaterialItem;
//# sourceMappingURL=CommonItemView.js.map
