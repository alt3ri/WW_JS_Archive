"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingCabinItem = void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  GridProxyAbstract_1 = require("../../../../../Module/Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../../../../Module/Util/Layout/GenericLayout"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
class FishingCabinItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Layout = void 0),
      (this.Gke = void 0),
      (this.Bqe = () => {
        return new GridItem();
      }),
      (this.ije = () => {
        this.Gke?.();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIGridLayout],
      [2, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.ije]]);
  }
  OnStart() {
    this.Layout = new GenericLayout_1.GenericLayout(
      this.GetGridLayout(1),
      this.Bqe,
    );
  }
  OnBeforeDestroy() {
    this.Gke = void 0;
  }
  SetFunction(e) {
    this.Gke = e;
  }
  RefreshCabin() {
    var e = ModelManager_1.ModelManager.DockyardModel.BackpackPosDataDoublyList;
    this.Layout.RefreshByData(e.flat());
  }
}
exports.FishingCabinItem = FishingCabinItem;
class GridItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UISprite],
    ];
  }
  Refresh(e) {
    var t = -1 === e,
      e = 0 < e,
      i = this.GetSprite(0);
    i.SetUIActive(!t),
      this.GetSprite(1).SetUIActive(t),
      i.SetChangeColor(e, i.changeColor);
  }
}
//# sourceMappingURL=FishingCabinItem.js.map
