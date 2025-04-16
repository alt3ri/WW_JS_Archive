"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LauncherLogUploadHelper = void 0);
const HotPatchKuroSdk_1 = require("../HotPatchKuroSdk/HotPatchKuroSdk"),
  LauncherStorageLib_1 = require("../Util/LauncherStorageLib"),
  LauncherLogUpload_1 = require("./LauncherLogUpload");
class LauncherLogUploadHelper {
  static CreateParams() {
    return {
      Net: { IsServerConnected: () => !1 },
      PlayerInfoModel: { GetId: () => 0 },
      LocalStorage: {
        GetRecentlyLoginUid: () =>
          LauncherStorageLib_1.LauncherStorageLib.GetGlobal(
            LauncherStorageLib_1.ELauncherStorageGlobalKey.RecentlyLoginUID,
          ),
      },
      KuroSdkController: {
        CanUseSdk: () => HotPatchKuroSdk_1.HotPatchKuroSdk.CanUseSdk(),
      },
      LoginModel: { GetSdkLoginConfigUid: () => {} },
    };
  }
  static InitLogUpload() {
    LauncherLogUpload_1.LauncherLogUpload.SetParams(
      LauncherLogUploadHelper.CreateParams(),
    ),
      LauncherLogUpload_1.LauncherLogUpload.Init();
  }
}
exports.LauncherLogUploadHelper = LauncherLogUploadHelper;
//# sourceMappingURL=LauncherLogUploadHelper.js.map
