"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LogUploadHelper = void 0);
const Net_1 = require("../../../Core/Net/Net"),
  LocalStorage_1 = require("../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager");
class LogUploadHelper {
  static CreateParams() {
    return {
      Net: Net_1.Net,
      PlayerInfoModel: ModelManager_1.ModelManager.PlayerInfoModel,
      LocalStorage: {
        GetRecentlyLoginUid: () =>
          LocalStorage_1.LocalStorage.GetGlobal(
            LocalStorageDefine_1.ELocalStorageGlobalKey.RecentlyLoginUID,
          ),
      },
      KuroSdkController: ControllerHolder_1.ControllerHolder.KuroSdkController,
      LoginModel: {
        GetSdkLoginConfigUid: () =>
          ModelManager_1.ModelManager.LoginModel.GetSdkLoginConfig()?.Uid,
      },
    };
  }
}
exports.LogUploadHelper = LogUploadHelper;
//# sourceMappingURL=LogUploadHelper.js.map
