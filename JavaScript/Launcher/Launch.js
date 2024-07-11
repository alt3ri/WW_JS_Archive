"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const puerts_1 = require("puerts");
const UE = require("ue");
const LauncherConfigLib_1 = require("./Define/LauncherConfigLib");
const HotPatch_1 = require("./HotPatch");
const HotPatchLogReport_1 = require("./HotPatchLogReport");
const AppUtil_1 = require("./Update/AppUtil");
const LauncherLanguageLib_1 = require("./Util/LauncherLanguageLib");
const LauncherLog_1 = require("./Util/LauncherLog");
const LauncherResourceLib_1 = require("./Util/LauncherResourceLib");
const LauncherStorageLib_1 = require("./Util/LauncherStorageLib");
function launch() {
  Error.stackTraceLimit = 500;
  const e = puerts_1.argv.getByName("GameInstance");
  const r = e.GetWorld();
  (e.IsStartFromLaunch = !0),
    AppUtil_1.AppUtil.SetWorldContext(r),
    LauncherStorageLib_1.LauncherStorageLib.Initialize(),
    LauncherConfigLib_1.LauncherConfigLib.Initialize(),
    LauncherLanguageLib_1.LauncherLanguageLib.Initialize(
      UE.KuroStaticLibrary.IsEditor(r),
    ),
    LauncherResourceLib_1.LauncherResourceLib.Initialize(),
    LauncherLog_1.LauncherLog.Info("launch called, starting HotPatch"),
    (HotPatchLogReport_1.HotPatchLogReport.World = r),
    HotPatch_1.HotPatch.Start(r, e);
}
launch();
// # sourceMappingURL=Launch.js.map
