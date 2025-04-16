"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhotographTab = void 0);
const UE = require("ue"),
  LocalStorage_1 = require("../../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class PhotographTab extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UIItem]];
  }
  OnBeforeShow() {
    this.RefreshRedDot();
  }
  RefreshRedDot() {
    var e = LocalStorage_1.LocalStorage.GetPlayer(
      LocalStorageDefine_1.ELocalStoragePlayerKey.FilterRedPoint,
      !0,
    );
    this.GetItem(1)?.SetUIActive(e);
  }
}
exports.PhotographTab = PhotographTab;
//# sourceMappingURL=PhotographTab.js.map
