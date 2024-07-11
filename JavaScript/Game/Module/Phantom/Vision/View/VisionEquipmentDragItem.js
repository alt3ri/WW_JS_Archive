"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionEquipmentDragItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  VisionFetterSuitItem_1 = require("./VisionFetterSuitItem");
class VisionEquipmentDragItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(), (this.wqe = void 0), (this.bxt = void 0), (this.wqe = e);
  }
  async Init() {
    await this.CreateByActorAsync(this.wqe.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UITexture],
      [2, UE.UIDraggableComponent],
      [3, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    (this.bxt = new VisionFetterSuitItem_1.VisionFetterSuitItem(
      this.GetItem(3),
    )),
      await this.bxt.Init(),
      this.bxt.SetActive(!1);
  }
  OnStart() {}
  GetDragComponent() {
    return this.GetDraggable(2);
  }
  UpdateItem(e) {
    var t = e.GetQuality(),
      t =
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomQualityBgSprite(
          t,
        ),
      i = e.GetFetterGroupConfig(),
      i =
        (this.bxt.Update(i),
        this.SetSpriteByPath(t, this.GetSprite(0), !1),
        ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
          e.GetConfigId(!0),
        ));
    this.SetTextureByPath(i.IconMiddle, this.GetTexture(1));
  }
}
exports.VisionEquipmentDragItem = VisionEquipmentDragItem;
//# sourceMappingURL=VisionEquipmentDragItem.js.map
