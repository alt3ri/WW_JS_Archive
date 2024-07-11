"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterListModule = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../../../../../Ui/Base/UiPanelBase"),
  GenericLayout_1 = require("../../../../../../../Util/Layout/GenericLayout");
class CharacterListModule extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.eGe = void 0),
      (this.mke = void 0),
      (this.dke = () => this.mke()),
      (this.mke = e);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UILayoutBase],
      [1, UE.UIItem],
    ];
  }
  OnStart() {
    this.eGe = new GenericLayout_1.GenericLayout(
      this.GetLayoutBase(0),
      this.dke,
      this.GetItem(1).GetOwner(),
    );
  }
  async RefreshByDataAsync(e) {
    await this.eGe?.RefreshByDataAsync(e);
  }
  GetItemList() {
    return this.eGe.GetLayoutItemList();
  }
}
exports.CharacterListModule = CharacterListModule;
//# sourceMappingURL=CharacterListModule.js.map
