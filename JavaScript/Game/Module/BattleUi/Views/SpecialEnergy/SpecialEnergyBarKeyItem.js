"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SpecialEnergyBarKeyItem = void 0);
const UE = require("ue");
const InputEnums_1 = require("../../../../Input/InputEnums");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const InputMultiKeyItemGroup_1 = require("../../../Common/InputKey/InputMultiKeyItemGroup");
class SpecialEnergyBarKeyItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), (this.xet = void 0), (this.Lo = void 0);
  }
  SetConfig(e) {
    this.Lo = e;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    (this.xet = new InputMultiKeyItemGroup_1.InputMultiKeyItemGroup()),
      await this.xet.CreateByActorAsync(this.GetItem(0).GetOwner());
  }
  OnStart() {
    var e = this.Lo.KeyInfoList;
    let t = e[0];
    var e = e[1];
    let i = "";
    if (this.Lo.KeyType === 0) i = "";
    else
      switch (this.Lo.KeyType) {
        case 1:
          i = "+";
          break;
        case 2:
          i = "/";
          break;
        default:
          i = "";
      }
    t = {
      SingleActionOrAxisKeyItem: this.dmt(t),
      DoubleActionOrAxisKeyItem: e ? this.dmt(e) : void 0,
      LinkString: i,
    };
    this.xet?.Refresh(t), this.xet?.SetActive(!0);
  }
  dmt(e) {
    const t = e.Action === 1;
    return {
      ActionOrAxisName: InputEnums_1.EInputAction[e.ActionType],
      IsLongPressProcessVisible: t,
      IsTextArrowVisible: t,
    };
  }
  RefreshKeyEnable(e, t) {
    this.xet?.SetEnable(e, t);
  }
}
exports.SpecialEnergyBarKeyItem = SpecialEnergyBarKeyItem;
// # sourceMappingURL=SpecialEnergyBarKeyItem.js.map
