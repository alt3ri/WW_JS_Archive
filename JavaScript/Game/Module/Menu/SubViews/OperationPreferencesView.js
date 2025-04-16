"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OperationPreferencesView = void 0);
const UE = require("ue"),
  LocalStorage_1 = require("../../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
class OperationPreferencesView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.lPe = () => {
        this.CloseMe();
      }),
      (this.wrh = (e) => {
        e = 1 === e;
        LocalStorage_1.LocalStorage.SetGlobal(
          LocalStorageDefine_1.ELocalStorageGlobalKey
            .GamepadOperationPreferences,
          e,
        );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIExtendToggle],
    ]),
      (this.BtnBindInfo = [
        [0, this.lPe],
        [1, this.wrh],
      ]);
  }
  OnStart() {
    var e =
      ModelManager_1.ModelManager.MenuModel?.GetGamepadOperationPreferences()
        ? 1
        : 0;
    this.GetExtendToggle(1)?.SetToggleState(e, !1);
  }
}
exports.OperationPreferencesView = OperationPreferencesView;
//# sourceMappingURL=OperationPreferencesView.js.map
