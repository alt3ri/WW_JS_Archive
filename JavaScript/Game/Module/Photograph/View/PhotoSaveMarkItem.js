"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhotoSaveMarkItem = void 0);
const UE = require("ue"),
  LocalStorage_1 = require("../../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class PhotoSaveMarkItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.DateText = void 0),
      (this.LogoConfigName = "PhotoLogo");
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
      [2, UE.UIText],
    ]),
      this.DateText && this.ComponentRegisterInfos.push([3, UE.UIText]);
  }
  OnStart() {
    var e =
      ConfigManager_1.ConfigManager.UiResourceConfig.GetLogoPathByLanguage(
        this.LogoConfigName,
      );
    const a = this.GetTexture(0);
    a.SetUIActive(!1),
      this.SetTextureByPath(e, this.GetTexture(0), void 0, () => {
        a && (a.SetUIActive(!0), a.SetSizeFromTexture());
      }),
      this.GetText(1).SetText(
        ModelManager_1.ModelManager.FunctionModel.GetPlayerName() ?? "",
      ),
      LguiUtil_1.LguiUtil.SetLocalText(
        this.GetText(2),
        "FriendMyUid",
        ModelManager_1.ModelManager.FunctionModel.PlayerId,
      );
    e = this.GetText(3);
    this.DateText && e && e.SetText(this.DateText);
  }
  OnAfterShow() {
    var e = LocalStorage_1.LocalStorage.GetGlobal(
      LocalStorageDefine_1.ELocalStorageGlobalKey.PhotoAndShareShowPlayerName,
      !0,
    );
    this.SetUiActive(e);
  }
}
exports.PhotoSaveMarkItem = PhotoSaveMarkItem;
//# sourceMappingURL=PhotoSaveMarkItem.js.map
