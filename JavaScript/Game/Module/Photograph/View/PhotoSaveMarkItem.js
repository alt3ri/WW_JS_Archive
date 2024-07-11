"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhotoSaveMarkItem = void 0);
const UE = require("ue");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class PhotoSaveMarkItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
      [2, UE.UIText],
    ];
  }
  OnStart() {
    const e =
      ConfigManager_1.ConfigManager.UiResourceConfig.GetLogoPathByLanguage(
        "PhotoLogo",
      );
    this.GetTexture(0).SetUIActive(!1),
      this.SetTextureByPath(e, this.GetTexture(0), void 0, () => {
        this.GetTexture(0).SetUIActive(!0);
      }),
      this.GetText(1).SetText(
        ModelManager_1.ModelManager.FunctionModel.GetPlayerName() ?? "",
      ),
      LguiUtil_1.LguiUtil.SetLocalText(
        this.GetText(2),
        "FriendMyUid",
        ModelManager_1.ModelManager.FunctionModel.PlayerId,
      ),
      this.RefreshNameVisible();
  }
  RefreshNameVisible() {
    const e = LocalStorage_1.LocalStorage.GetGlobal(
      LocalStorageDefine_1.ELocalStorageGlobalKey.PhotoAndShareShowPlayerName,
      !0,
    );
    this.GetText(1)?.SetUIActive(e), this.GetText(2)?.SetUIActive(e);
  }
}
exports.PhotoSaveMarkItem = PhotoSaveMarkItem;
// # sourceMappingURL=PhotoSaveMarkItem.js.map
