"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SoarTabDynamicItem = exports.MapTravelTabDynamicItem = void 0);
const UE = require("ue"),
  Vector2D_1 = require("../../../../../../../Core/Utils/Math/Vector2D"),
  UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
class MapTravelTabDynamicItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), (this.IGe = void 0);
  }
  async Init(e) {
    await super.CreateByActorAsync(e.GetOwner(), void 0, !0),
      (this.IGe = new Vector2D_1.Vector2D());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
    ];
  }
  GetItemSize(e) {
    var t = this.GetRootItem();
    return this.IGe.Set(t.GetWidth(), t.GetHeight()), this.IGe.ToUeVector2D(!0);
  }
  ClearItem() {}
}
exports.MapTravelTabDynamicItem = MapTravelTabDynamicItem;
class SoarTabDynamicItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), (this.IGe = void 0);
  }
  async Init(e) {
    await super.CreateByActorAsync(e.GetOwner(), void 0, !0),
      (this.IGe = new Vector2D_1.Vector2D());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
    ];
  }
  GetItemSize(e) {
    var t = this.GetRootItem();
    return this.IGe.Set(t.GetWidth(), t.GetHeight()), this.IGe.ToUeVector2D(!0);
  }
  ClearItem() {}
}
exports.SoarTabDynamicItem = SoarTabDynamicItem;
//# sourceMappingURL=MapTravelTabDynamicItem.js.map
