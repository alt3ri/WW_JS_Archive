"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const puerts_1 = require("puerts"),
  UE = require("ue"),
  LauncherConfigLib_1 = require("./Define/LauncherConfigLib"),
  HotPatch_1 = require("./HotPatch"),
  HotPatchLogReport_1 = require("./HotPatchLogReport"),
  Platform_1 = require("./Platform/Platform"),
  PlatformSdkManagerNew_1 = require("./Platform/PlatformSdk/PlatformSdkManagerNew"),
  AppUtil_1 = require("./Update/AppUtil"),
  LauncherLanguageLib_1 = require("./Util/LauncherLanguageLib"),
  LauncherLog_1 = require("./Util/LauncherLog"),
  LauncherResourceLib_1 = require("./Util/LauncherResourceLib"),
  LauncherStorageLib_1 = require("./Util/LauncherStorageLib");
function launch() {
  Error.stackTraceLimit = 500;
  var e = puerts_1.argv.getByName("GameInstance"),
    r = e.GetWorld();
  (e.IsStartFromLaunch = !0),
    AppUtil_1.AppUtil.SetWorldContext(r),
    Platform_1.Platform.Initialize(),
    LauncherStorageLib_1.LauncherStorageLib.Initialize(),
    LauncherConfigLib_1.LauncherConfigLib.Initialize(),
    LauncherLanguageLib_1.LauncherLanguageLib.Initialize(
      UE.KuroStaticLibrary.IsEditor(r),
    ),
    LauncherResourceLib_1.LauncherResourceLib.Initialize(),
    PlatformSdkManagerNew_1.PlatformSdkManagerNew.Initialize(),
    LauncherLog_1.LauncherLog.Info("launch called, starting HotPatch"),
    (HotPatchLogReport_1.HotPatchLogReport.World = r),
    HotPatch_1.HotPatch.Start(r, e);
}
launch();
//# sourceMappingURL=Launch.js.map
