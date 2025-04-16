"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HotPatch = void 0);
const cpp_1 = require("cpp"),
  puerts_1 = require("puerts"),
  UE = require("ue"),
  AppLinks_1 = require("./AppLinks"),
  BaseConfigController_1 = require("./BaseConfig/BaseConfigController"),
  LauncherEnum_1 = require("./Define/LauncherEnum"),
  ResPackageInfo_1 = require("./DiffPatch/Data/ResPackageInfo"),
  AndroidDiffPatchProcedure_1 = require("./DiffPatch/Procedure/AndroidDiffPatchProcedure"),
  IosDiffPatchProcedure_1 = require("./DiffPatch/Procedure/IosDiffPatchProcedure"),
  OhtersDiffPatchProcedure_1 = require("./DiffPatch/Procedure/OhtersDiffPatchProcedure"),
  DiffUpdate_1 = require("./DiffPatch/Update/DiffUpdate"),
  UpdateEvent_1 = require("./DiffPatch/Update/UpdateEvent"),
  VideoResUpdate_1 = require("./DiffPatch/Update/VideoResUpdate"),
  UrlPrefixDownload_1 = require("./Download/UrlPrefixDownload"),
  HotPatchKuroSdk_1 = require("./HotPatchKuroSdk/HotPatchKuroSdk"),
  SdkReportData_1 = require("./HotPatchKuroSdk/SdkReportData"),
  HotPatchLogReport_1 = require("./HotPatchLogReport"),
  AndroidHotPatchProcedure_1 = require("./HotPatchProcedure/AndroidHotPatchProcedure"),
  IosHotPatchProcedure_1 = require("./HotPatchProcedure/IosHotPatchProcedure"),
  OthersHotPatchProcedure_1 = require("./HotPatchProcedure/OthersHotPatchProcedure"),
  HotPatchPushSdk_1 = require("./HotPatchPushSdk/HotPatchPushSdk"),
  LauncherProcedure_1 = require("./LauncherProcedure"),
  LauncherLogUploadHelper_1 = require("./LogUpload/LauncherLogUploadHelper"),
  NetworkDefine_1 = require("./NetworkDefine"),
  PackageUpdateController_1 = require("./PackageUpdate/PackageUpdateController"),
  CloudGameManagerLauncher_1 = require("./Platform/CloudGameManagerLauncher"),
  Platform_1 = require("./Platform/Platform"),
  PlatformSdkConfig_1 = require("./Platform/PlatformSdk/PlatformSdkConfig"),
  PlatformSdkManagerNew_1 = require("./Platform/PlatformSdk/PlatformSdkManagerNew"),
  HotPatchInputManager_1 = require("./PlayerInput/HotPatchInputManager"),
  PreDownloadManager_1 = require("./PreDownload/PreDownloadManager"),
  RemoteConfig_1 = require("./RemoteConfig"),
  ThinkDataLaunchReporter_1 = require("./ThinkDataReport/ThinkDataLaunchReporter"),
  HotFixGameSettingManager_1 = require("./Ui/HotFix/HotFixGameSettingManager"),
  HotFixManager_1 = require("./Ui/HotFix/HotFixManager"),
  HotFixSceneManager_1 = require("./Ui/HotFix/HotFixSceneManager"),
  AppPathMisc_1 = require("./Update/AppPathMisc"),
  AppUtil_1 = require("./Update/AppUtil"),
  AppVersionMisc_1 = require("./Update/AppVersionMisc"),
  LanguageUpdateManager_1 = require("./Update/LanguageUpdateManager"),
  PakKeyUpdate_1 = require("./Update/PakKeyUpdate"),
  ResourceUpdate_1 = require("./Update/ResourceUpdate"),
  LauncherAudio_1 = require("./Util/LauncherAudio"),
  LauncherLog_1 = require("./Util/LauncherLog"),
  LauncherSerialize_1 = require("./Util/LauncherSerialize"),
  LauncherStorageLib_1 = require("./Util/LauncherStorageLib"),
  ProcedureUtil_1 = require("./Util/ProcedureUtil");
class HotPatch {
  static Start(t, e) {
    if ("IOS" === cpp_1.KuroApplication.IniPlatformName()) {
      UE.KuroRenderingRuntimeBPPluginBPLibrary.SetSceneRenderingState(t, !0),
        UE.KismetSystemLibrary.ExecuteConsoleCommand(t, "r.fog 1");
      var a = UE.KuroLauncherLibrary.GetAppVersion(),
        a =
          UE.KuroLauncherLibrary.GameSavedDir() +
          `Resources/${a}/LauncherMount.txt`;
      let e = "";
      var o = (0, puerts_1.$ref)(void 0),
        a =
          (LauncherLog_1.LauncherLog.Info("manifest path", ["path", a]),
          UE.BlueprintPathsLibrary.FileExists(a) &&
            UE.KuroStaticLibrary.LoadFileToString(o, a) &&
            (LauncherLog_1.LauncherLog.Info("取到launcher挂载清单的值"),
            (e = (0, puerts_1.$unref)(o))),
          LauncherStorageLib_1.LauncherStorageLib.GetDeviceSavedString(
            "__kr_blvr__",
            "",
          )),
        o = a !== e,
        a =
          (LauncherLog_1.LauncherLog.Info(
            "修复launcher而重启",
            ["kr_br", o],
            ["cur", e],
            ["blvr", a],
          ),
          new HotPatchLogReport_1.HotPatchLog()),
        r = ((a.s_step_id = "fix_launcher_restart_tiwce"), { kr_br: o });
      if (
        ((a.s_step_result = JSON.stringify(r)),
        HotPatchLogReport_1.HotPatchLogReport.Report(a),
        o)
      )
        return (
          LauncherStorageLib_1.LauncherStorageLib.SetDeviceSavedString(
            "__kr_blvr__",
            e,
          ),
          LauncherLog_1.LauncherLog.Info("热更器因 kr_br 重启"),
          LauncherProcedure_1.LauncherProcedure.Destroy(),
          UE.KuroSqliteLibrary.CloseAllConnections(),
          UE.KuroRenderingRuntimeBPPluginBPLibrary.SetSceneRenderingState(
            t,
            !1,
          ),
          UE.KismetSystemLibrary.ExecuteConsoleCommand(t, "r.fog 0"),
          UE.KuroLauncherLibrary.ReloadShaderLibrary(),
          void UE.GameplayStatics.OpenLevel(
            t,
            new UE.FName("/Game/Aki/Map/Launch/Bootstrap"),
          )
        );
    }
    (HotPatch.RSr = t),
      (HotPatch.USr = e),
      LauncherLog_1.LauncherLog.Info("初始化Push"),
      HotPatchPushSdk_1.HotPatchPushSdk.StartPush(),
      LauncherLog_1.LauncherLog.Info("结束Push"),
      HotPatchKuroSdk_1.HotPatchKuroSdk.Init(),
      LauncherAudio_1.LauncherAudio.Init(),
      HotPatch.HotFixSceneManager.SetupScene(t),
      HotPatch.KSa.ApplyGameSettings(),
      LauncherLog_1.LauncherLog.Info("播放启动进入镜头(睁开眼睛)"),
      Platform_1.Platform.IsCloudGame() &&
        (LauncherLog_1.LauncherLog.Info("CloudGame HotPatchEnterGame"),
        UE.KuroCloudGameWrapper.SendDataToPipeBinary("HotPatchEnterGame")),
      HotPatch.HotFixSceneManager.PlayStartLaunchSeq(),
      HotPatch.HotFixSceneManager.PlayBlackSeq(() => {
        LauncherEnum_1.IS_DIFF_PATCH
          ? HotPatch.ProcessLineDiff(t).catch((e) => {
              LauncherLog_1.LauncherLog.ErrorWithStack(e.message, e);
            })
          : HotPatch.ProcessLine(t).catch((e) => {
              LauncherLog_1.LauncherLog.ErrorWithStack(e.message, e);
            });
      });
  }
  static StartLogin() {
    HotPatch.USr.MountGamePak(),
      LauncherLog_1.LauncherLog.Info(
        "Game Pak mounted, preloading Blueprint Types.",
      ),
      UE.KuroLauncherLibrary.ReloadShaderLibrary(),
      UE.KuroLauncherLibrary.PreloadRequiredBp(),
      UE.KuroStaticLibrary.IsEditor(HotPatch.USr) ||
        UE.KismetSystemLibrary.ExecuteConsoleCommand(
          HotPatch.USr.GetWorld(),
          "DisableAllScreenMessages",
        ),
      UE.Actor.SetKuroNetMode(1),
      LauncherLog_1.LauncherLog.Info(
        "Launch success, ready to call main. Byebye launcher.",
      ),
      BaseConfigController_1.BaseConfigController.LoadConfigVersion(),
      BaseConfigController_1.BaseConfigController.LoadPatchBuildInfo(!0),
      UE.WwiseExternalSourceStatics.InitExternalSourceConfigs(),
      UE.PuertsBlueprintLibrary.SetEnableBlueprintBind(!0),
      require("../Game/Main");
  }
  static PSr(e) {
    UE.KismetSystemLibrary.ControlScreensaver(!0),
      (HotPatch.State = 3),
      LauncherLog_1.LauncherLog.Info("热更完成"),
      HotPatch.HotFixSceneManager.Destroy(),
      Platform_1.Platform.IsCloudGameRunningHotPatch()
        ? AppUtil_1.AppUtil.QuitGameOnPatchSuccess("HotPatchFinish")
        : HotPatch.StartLogin();
  }
  static async ProcessLine(e) {
    UE.KismetSystemLibrary.ControlScreensaver(!1),
      LauncherLog_1.LauncherLog.Info("热更开始"),
      (HotPatch.State = 1);
    var t = UE.KuroLauncherLibrary.NeedHotPatch();
    LauncherLog_1.LauncherLog.Info("包的构建类型是否需要执行热更流程", [
      "needHotPatch",
      t,
    ]);
    const a = new HotFixManager_1.HotFixManager();
    await a.Init(e);
    var o = UE.KuroVariableFunctionLibrary.HasStringValue("back_to_game");
    UE.GameplayStatics.GetPlayerController(e, 0).bShowMouseCursor = !0;
    let r = void 0;
    r = Platform_1.Platform.IsPs5Platform()
      ? async (e, t) => (
          await a.ShowDialog(
            !1,
            "HotFixTipsTitle",
            "GetRemoteConfigFailed",
            void 0,
            void 0,
            "HotFixRetry",
          ),
          t()
        )
      : async (e, t) => {
          return (await a.ShowDialog(
            !0,
            "HotFixTipsTitle",
            "GetRemoteConfigFailed",
            "HotFixQuit",
            "HotFixRetry",
            void 0,
          ))
            ? t()
            : (AppUtil_1.AppUtil.QuitGame("ProcessLine"),
              await a.WaitFrame(),
              { Success: !0 });
        };
    const c = async () => {
      return {
        Success:
          await BaseConfigController_1.BaseConfigController.RequestBaseData(a),
      };
    };
    if (
      (await (0, ProcedureUtil_1.whetherRepeatDoOnFailedAsync)(c, r),
      PlatformSdkManagerNew_1.PlatformSdkManagerNew.IfNeedPlatformSdkConfig)
    ) {
      const c = async () => {
        return {
          Success:
            await PlatformSdkConfig_1.PlatformSdkConfig.RequestBaseData(a),
        };
      };
      await (0, ProcedureUtil_1.whetherRepeatDoOnFailedAsync)(c, r);
    }
    let i = PlatformSdkManagerNew_1.PlatformSdkManagerNew.Initialize(e);
    if (!i) {
      var _ = async () =>
        a.ShowDialog(
          !1,
          "HotFixTipsTitle",
          "SdkInitializeFail",
          void 0,
          void 0,
          "HotFixQuit",
        );
      if (!Platform_1.Platform.IsPs5Platform())
        return void ((await _()) && AppUtil_1.AppUtil.QuitGame("ProcessLine"));
      for (; !i; )
        await _(),
          await HotPatchInputManager_1.HotPatchInputManager.WaitAnyKeyPress(),
          PlatformSdkManagerNew_1.PlatformSdkManagerNew.UnInitialize(),
          (i = PlatformSdkManagerNew_1.PlatformSdkManagerNew.Initialize(e));
    }
    let n = await a.ShowPrivacyProtocolView();
    if (!n) {
      if (!Platform_1.Platform.IsPs5Platform())
        return void AppUtil_1.AppUtil.QuitGame("ProcessLine");
      for (; !n; )
        await HotPatchInputManager_1.HotPatchInputManager.WaitAnyKeyPress(),
          (n = await a.ShowPrivacyProtocolView());
    }
    ThinkDataLaunchReporter_1.ThinkDataLaunchReporter.InitializeInstance(),
      LauncherLogUploadHelper_1.LauncherLogUploadHelper.InitLogUpload(),
      AppLinks_1.AppLinks.Init(),
      LauncherAudio_1.LauncherAudio.InitIosAuditPackage();
    var p = cpp_1.KuroApplication.IniPlatformNameIncludeEditor(),
      h =
        (HotPatchLogReport_1.HotPatchLogReport.ReportLogin(
          HotPatchLogReport_1.LoginLogEventDefine.Update,
          "update_start",
        ),
        new HotPatchLogReport_1.HotPatchLog()),
      h =
        ((h.s_step_id = "start_hot_patch"),
        HotPatchLogReport_1.HotPatchLogReport.Report(h),
        new HotPatchLogReport_1.HotPatchLog()),
      u = { success: !0 },
      P =
        ((h.s_step_id = "end_hot_patch"),
        new HotPatchLogReport_1.HotPatchLog()),
      d = ((P.s_step_id = "need_hot_patch_logic"), { success: !0 });
    if (((d.info = { NeedHotPatch: t, NeedBackToGame: o }), !t)) {
      (d.success = !1),
        (P.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(d)),
        HotPatchLogReport_1.HotPatchLogReport.Report(P),
        (u.info = d.info),
        (h.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(u)),
        HotPatchLogReport_1.HotPatchLogReport.Report(h),
        LauncherLog_1.LauncherLog.Info(
          "应用配置了不需要执行热更流程，直接进入游戏",
          ["NeedHotPatch", t],
        ),
        LanguageUpdateManager_1.LanguageUpdateManager.Init(HotPatch.RSr);
      const g = await HotPatch.rga(p, a, !0);
      return g
        ? (await HotPatch.P4a(a),
          await HotPatch.wSr(a),
          await HotPatch.BSr(a),
          a.Destroy(),
          void HotPatch.PSr(!1))
        : void 0;
    }
    (P.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(d)),
      HotPatchLogReport_1.HotPatchLogReport.Report(P);
    let s = void 0;
    (s = new (
      "Android" === p
        ? AndroidHotPatchProcedure_1.AndroidHotPatchProcedure
        : "IOS" === p
          ? IosHotPatchProcedure_1.IosHotPatchProcedure
          : OthersHotPatchProcedure_1.OthersHotPatchProcedure
    )(HotPatch.xSr, a)),
      HotPatchKuroSdk_1.HotPatchKuroSdk.ReportEvent(
        SdkReportData_1.HotPatchReportData.CreateData(
          1,
          new Map([["eventParams", "update_start"]]),
        ),
      );
    t = new HotPatchLogReport_1.HotPatchLog();
    if (
      ((t.s_step_id = "launcher_hp_pre_start"),
      HotPatchLogReport_1.HotPatchLogReport.Report(t),
      await s.Start())
    ) {
      HotPatchKuroSdk_1.HotPatchKuroSdk.ReportEvent(
        SdkReportData_1.HotPatchReportData.CreateData(
          2,
          new Map([["eventParams", "update_start"]]),
        ),
      ),
        HotPatchKuroSdk_1.HotPatchKuroSdk.ReportEvent(
          SdkReportData_1.HotPatchReportData.CreateData(
            1,
            new Map([["eventParams", "update_remote"]]),
          ),
        ),
        (HotPatch.State = 2);
      d = new HotPatchLogReport_1.HotPatchLog();
      if (
        ((d.s_step_id = "launcher_hp_get_remote_ver_config"),
        HotPatchLogReport_1.HotPatchLogReport.Report(d),
        await s.GetRemoteVersionConfig())
      ) {
        HotPatchKuroSdk_1.HotPatchKuroSdk.ReportEvent(
          SdkReportData_1.HotPatchReportData.CreateData(
            2,
            new Map([["eventParams", "update_remote"]]),
          ),
        ),
          HotPatchKuroSdk_1.HotPatchKuroSdk.ReportEvent(
            SdkReportData_1.HotPatchReportData.CreateData(
              1,
              new Map([["eventParams", "check_app_version"]]),
            ),
          );
        (P = new HotPatchLogReport_1.HotPatchLog()),
          (t =
            ((P.s_step_id = "check_app_version"),
            await s.IsAppVersionChange()));
        if (t) {
          LauncherLog_1.LauncherLog.Info(
            "需要更新app",
            ["CurAppVer", UE.KuroLauncherLibrary.GetAppVersion()],
            ["LatestAppVer", RemoteConfig_1.RemoteInfo.Config.PackageVersion],
          );
          const f = { NeedUpdateApp: !0 };
          (P.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(f)),
            HotPatchLogReport_1.HotPatchLogReport.Report(P),
            HotPatchLogReport_1.HotPatchLogReport.ReportLogin(
              HotPatchLogReport_1.LoginLogEventDefine.Update,
              "update_failed",
            ),
            (u.success = !1),
            (u.info = "app need update"),
            (h.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(u)),
            HotPatchLogReport_1.HotPatchLogReport.Report(h),
            HotPatchKuroSdk_1.HotPatchKuroSdk.ReportEvent(
              SdkReportData_1.HotPatchReportData.CreateData(
                3,
                new Map([["eventParams", "check_app_version_failed"]]),
              ),
            ),
            await PackageUpdateController_1.PackageUpdateController.TryOpenPackageUpdateTipsView(
              a,
            ),
            void (await a.WaitFrame());
        } else {
          const f = { NeedUpdateApp: !1 };
          (P.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(f)),
            HotPatchKuroSdk_1.HotPatchKuroSdk.ReportEvent(
              SdkReportData_1.HotPatchReportData.CreateData(
                2,
                new Map([["eventParams", "check_app_version"]]),
              ),
            );
          (P.s_step_result = LauncherSerialize_1.LauncherJson.Stringify({
            NeedUpdateApp: !1,
          })),
            HotPatchLogReport_1.HotPatchLogReport.Report(P),
            HotPatchKuroSdk_1.HotPatchKuroSdk.ReportEvent(
              SdkReportData_1.HotPatchReportData.CreateData(
                4,
                new Map([["eventParams", "update_launcher"]]),
              ),
            );
          (d =
            BaseConfigController_1.BaseConfigController.GetIosAuditFirstDownloadTip()),
            (t =
              BaseConfigController_1.BaseConfigController.GetIosAuditFirstDownloadTipWithSkip()),
            (P = cpp_1.KuroApplication.IniPlatformName());
          if (
            (LauncherLog_1.LauncherLog.Info(
              "[iOS母包] [BackToGame] [ProcessLine] 是否跳过热更",
              ["needBackToGame", o],
              ["iosAuditFirstDownloadTip", d],
              ["iosAuditFirstDownloadTipWithSkip", t],
              ["platformName", P],
            ),
            o || t)
          )
            a.Destroy(), HotPatch.PSr(!1);
          else {
            (d = new HotPatchLogReport_1.HotPatchLog()),
              (P =
                ((d.s_step_id = "launcher_hp_update_launcher"),
                HotPatchLogReport_1.HotPatchLogReport.Report(d),
                new AppVersionMisc_1.LauncherVersionMisc())),
              (o =
                (P.Init(HotPatch.RSr),
                new UrlPrefixDownload_1.UrlPrefixDownload())),
              (t = new ResourceUpdate_1.ResourceUpdate(
                HotPatch.RSr,
                o,
                P,
                this.xSr,
              ));
            if (await s.UpdateResource(!1, t)) {
              d = new HotPatchLogReport_1.HotPatchLog();
              if (
                ((d.s_step_id = "launcher_hp_mount_launcher"),
                HotPatchLogReport_1.HotPatchLogReport.Report(d),
                await s.MountPak(t))
              ) {
                HotPatchKuroSdk_1.HotPatchKuroSdk.ReportEvent(
                  SdkReportData_1.HotPatchReportData.CreateData(
                    5,
                    new Map([["eventParams", "update_launcher"]]),
                  ),
                );
                (o = new HotPatchLogReport_1.HotPatchLog()),
                  (P =
                    ((o.s_step_id = "launcher_hp_wether_reboot_launcher"),
                    HotPatchLogReport_1.HotPatchLogReport.Report(o),
                    t.GetRevertInfo()));
                if (t.GetNeedRemount()) {
                  if (P.NeedRevert) {
                    for (const w of P.Paks) UE.KuroPakMountStatic.UnmountPak(w);
                    for (const R of P.Files)
                      UE.KuroLauncherLibrary.DeleteFile(R);
                  }
                  d = new HotPatchLogReport_1.HotPatchLog();
                  (d.s_step_id = "restart_launcher"),
                    HotPatchLogReport_1.HotPatchLogReport.Report(d),
                    (u.success = !0),
                    (u.info = "restart launcher"),
                    (h.s_step_result =
                      LauncherSerialize_1.LauncherJson.Stringify(u)),
                    HotPatchLogReport_1.HotPatchLogReport.Report(h),
                    LauncherLog_1.LauncherLog.Info(
                      "热更器有更新需要重启，开始重启热更器！",
                    ),
                    HotFixSceneManager_1.HotFixSceneManager.StopHotPatchBgm(),
                    a.Destroy(),
                    LauncherProcedure_1.LauncherProcedure.Destroy(),
                    UE.KuroSqliteLibrary.CloseAllConnections(),
                    UE.GameplayStatics.OpenLevel(
                      HotPatch.RSr,
                      new UE.FName("/Game/Aki/Map/Launch/Bootstrap"),
                    );
                } else {
                  const g = await HotPatch.rga(p, a);
                  if (g) {
                    var o = new HotPatchLogReport_1.HotPatchLog(),
                      t =
                        ((o.s_step_id = "launcher_hp_pak_key_update"),
                        HotPatchLogReport_1.HotPatchLogReport.Report(o),
                        PakKeyUpdate_1.PakKeyUpdate.Init(this.xSr),
                        await PakKeyUpdate_1.PakKeyUpdate.CheckPakKey(
                          void 0,
                          void 0,
                        ),
                        new HotPatchLogReport_1.HotPatchLog()),
                      l =
                        ((t.s_step_id = "launcher_hp_update_resource"),
                        HotPatchLogReport_1.HotPatchLogReport.Report(t),
                        new Array()),
                      d = new AppVersionMisc_1.ResourceVersionMisc(),
                      o =
                        (d.Init(HotPatch.RSr),
                        new UrlPrefixDownload_1.UrlPrefixDownload()),
                      t = new ResourceUpdate_1.ResourceUpdate(
                        HotPatch.RSr,
                        o,
                        d,
                        this.xSr,
                      ),
                      o =
                        (l.push(t),
                        LanguageUpdateManager_1.LanguageUpdateManager.Init(
                          HotPatch.RSr,
                        ),
                        LanguageUpdateManager_1.LanguageUpdateManager.GetAllLanguagesVersionMisc());
                    for (const k of o) {
                      var H = new UrlPrefixDownload_1.UrlPrefixDownload(),
                        H = new ResourceUpdate_1.ResourceUpdate(
                          HotPatch.RSr,
                          H,
                          k,
                          this.xSr,
                          !k.NeedUpdate(),
                        );
                      l.push(H);
                    }
                    if (
                      (HotPatchKuroSdk_1.HotPatchKuroSdk.ReportEvent(
                        SdkReportData_1.HotPatchReportData.CreateData(
                          4,
                          new Map([["eventParams", "update_voice"]]),
                        ),
                      ),
                      await s.UpdateResource(!0, ...l))
                    ) {
                      HotPatchKuroSdk_1.HotPatchKuroSdk.ReportEvent(
                        SdkReportData_1.HotPatchReportData.CreateData(
                          5,
                          new Map([["eventParams", "update_voice"]]),
                        ),
                      );
                      d = new HotPatchLogReport_1.HotPatchLog();
                      (d.s_step_id = "launcher_hp_pre_complete"),
                        HotPatchLogReport_1.HotPatchLogReport.Report(d),
                        s.PreComplete();
                      let e = void 0;
                      for (const m of l) {
                        var L = m.GetRevertInfo();
                        if (L.NeedRevert)
                          if (e) {
                            for (const S of L.Paks) e.Paks.add(S);
                            for (const v of L.Files) e.Files.add(v);
                          } else e = L;
                      }
                      if (P.NeedRevert)
                        if (e) {
                          for (const U of P.Paks) e.Paks.add(U);
                          for (const M of P.Files) e.Files.add(M);
                        } else e = P;
                      void 0 !== e &&
                        e.NeedRevert &&
                        UE.KuroLauncherLibrary.SetRestartApp(1);
                      t = new HotPatchLogReport_1.HotPatchLog();
                      if (
                        ((t.s_step_id = "launcher_hp_wether_restart_app"),
                        HotPatchLogReport_1.HotPatchLogReport.Report(t),
                        s.NeedRestart(...l) || (void 0 !== e && e.NeedRevert))
                      ) {
                        o = new HotPatchLogReport_1.HotPatchLog();
                        if (
                          ((o.s_step_id =
                            "need_restart_app_to_complete_update"),
                          HotPatchLogReport_1.HotPatchLogReport.Report(o),
                          (u.success = !0),
                          (u.info = "need restart app to complete update"),
                          (h.s_step_result =
                            LauncherSerialize_1.LauncherJson.Stringify(u)),
                          HotPatchLogReport_1.HotPatchLogReport.Report(h),
                          void 0 !== e && e.NeedRevert)
                        ) {
                          for (const D of e.Paks)
                            UE.KuroPakMountStatic.UnmountPak(D);
                          for (const E of e.Files)
                            UE.KuroLauncherLibrary.DeleteFile(E);
                        }
                        return CloudGameManagerLauncher_1
                          .CloudGameManagerLauncher.IsPreLaunch
                          ? void AppUtil_1.AppUtil.QuitGame("ProcessLine")
                          : 0 < (d = UE.KuroLauncherLibrary.NeedRestartApp())
                            ? void (
                                (await a.ShowDialog(
                                  !1,
                                  "HotFixTipsTitle",
                                  1 === d
                                    ? "HotFixRestartToCompleteHotFix"
                                    : "HotFixRestartToRepairFiles",
                                  void 0,
                                  void 0,
                                  "HotFixQuit",
                                )) &&
                                ("IOS" === p || "Windows" === p || "Mac" === p
                                  ? (Platform_1.Platform.IsCloudGame() &&
                                      (LauncherLog_1.LauncherLog.Info(
                                        "CloudGame HotPatchExitGame",
                                      ),
                                      UE.KuroCloudGameWrapper.SendDataToPipeBinary(
                                        "HotPatchExitGame",
                                      )),
                                    AppUtil_1.AppUtil.QuitGame("ProcessLine"))
                                  : UE.KuroLauncherLibrary.RestartApplication(
                                      '@echo off\nset /a "pid=%~1"\nset "exe_path=%~2"\n:waitloop\ntasklist | findstr /C:" %pid% " >nul\nif errorlevel 1 (\n\tgoto launch\n) else (\n\ttaskkill /pid %pid% /f >nul\n\ttimeout /t 1 /nobreak >nul\n\tgoto waitloop\n)\n:launch\nstart "" "%exe_path%"\nexit 0',
                                    ))
                              )
                            : void 0;
                      }
                      HotPatchKuroSdk_1.HotPatchKuroSdk.ReportEvent(
                        SdkReportData_1.HotPatchReportData.CreateData(
                          4,
                          new Map([["eventParams", "mount_pak"]]),
                        ),
                      );
                      var P = new HotPatchLogReport_1.HotPatchLog();
                      (P.s_step_id = "launcher_hp_mount_resource"),
                        HotPatchLogReport_1.HotPatchLogReport.Report(P),
                        (await s.MountPak(...l))
                          ? (HotPatchKuroSdk_1.HotPatchKuroSdk.ReportEvent(
                              SdkReportData_1.HotPatchReportData.CreateData(
                                5,
                                new Map([["eventParams", "mount_pak"]]),
                              ),
                            ),
                            ((t =
                              new HotPatchLogReport_1.HotPatchLog()).s_step_id =
                              "launcher_hp_procedure_complete"),
                            HotPatchLogReport_1.HotPatchLogReport.Report(t),
                            await s.Complete(),
                            LauncherLog_1.LauncherLog.Info(
                              "热更流程执行完毕，开始进入游戏场景",
                            ),
                            HotPatchLogReport_1.HotPatchLogReport.ReportLogin(
                              HotPatchLogReport_1.LoginLogEventDefine.Update,
                              "update_success",
                            ),
                            (u.success = !0),
                            (h.s_step_result =
                              LauncherSerialize_1.LauncherJson.Stringify(u)),
                            HotPatchLogReport_1.HotPatchLogReport.Report(h),
                            ((o =
                              new HotPatchLogReport_1.HotPatchLog()).s_step_id =
                              "launcher_hp_check_driver"),
                            HotPatchLogReport_1.HotPatchLogReport.Report(o),
                            await HotPatch.P4a(a),
                            await HotPatch.wSr(a),
                            ((d =
                              new HotPatchLogReport_1.HotPatchLog()).s_step_id =
                              "launcher_hp_compile_shader"),
                            HotPatchLogReport_1.HotPatchLogReport.Report(d),
                            await HotPatch.BSr(a),
                            ((p =
                              new HotPatchLogReport_1.HotPatchLog()).s_step_id =
                              "launcher_hp_close_view"),
                            HotPatchLogReport_1.HotPatchLogReport.Report(p),
                            await a.CloseHotFix(),
                            ((P =
                              new HotPatchLogReport_1.HotPatchLog()).s_step_id =
                              "launcher_hp_call_finish"),
                            HotPatchLogReport_1.HotPatchLogReport.Report(P),
                            HotPatch.PSr(!0),
                            ((t =
                              new HotPatchLogReport_1.HotPatchLog()).s_step_id =
                              "launcher_hp_all_complete"),
                            HotPatchLogReport_1.HotPatchLogReport.Report(t))
                          : (HotPatchKuroSdk_1.HotPatchKuroSdk.ReportEvent(
                              SdkReportData_1.HotPatchReportData.CreateData(
                                6,
                                new Map([["eventParams", "mount_pak_failed"]]),
                              ),
                            ),
                            HotPatchLogReport_1.HotPatchLogReport.ReportLogin(
                              HotPatchLogReport_1.LoginLogEventDefine.Update,
                              "update_failed",
                            ),
                            (u.success = !1),
                            (u.info = "mount game resources failed"),
                            (h.s_step_result =
                              LauncherSerialize_1.LauncherJson.Stringify(u)),
                            HotPatchLogReport_1.HotPatchLogReport.Report(h));
                    } else
                      HotPatchKuroSdk_1.HotPatchKuroSdk.ReportEvent(
                        SdkReportData_1.HotPatchReportData.CreateData(
                          6,
                          new Map([
                            [
                              "eventParams",
                              "update_voice_update_resource_fail",
                            ],
                          ]),
                        ),
                      ),
                        HotPatchLogReport_1.HotPatchLogReport.ReportLogin(
                          HotPatchLogReport_1.LoginLogEventDefine.Update,
                          "update_failed",
                        ),
                        (u.success = !1),
                        (u.info = "update game resources failed"),
                        (h.s_step_result =
                          LauncherSerialize_1.LauncherJson.Stringify(u)),
                        HotPatchLogReport_1.HotPatchLogReport.Report(h);
                  }
                }
              } else
                HotPatchLogReport_1.HotPatchLogReport.ReportLogin(
                  HotPatchLogReport_1.LoginLogEventDefine.Update,
                  "update_failed",
                ),
                  (u.success = !1),
                  (u.info = "mount launcher failed"),
                  (h.s_step_result =
                    LauncherSerialize_1.LauncherJson.Stringify(u)),
                  HotPatchLogReport_1.HotPatchLogReport.Report(h),
                  HotPatchKuroSdk_1.HotPatchKuroSdk.ReportEvent(
                    SdkReportData_1.HotPatchReportData.CreateData(
                      6,
                      new Map([
                        ["eventParams", "update_launcher_mountpak_failed"],
                      ]),
                    ),
                  );
            } else
              HotPatchLogReport_1.HotPatchLogReport.ReportLogin(
                HotPatchLogReport_1.LoginLogEventDefine.Update,
                "update_failed",
              ),
                (u.success = !1),
                (u.info = "update launcher failed"),
                (h.s_step_result =
                  LauncherSerialize_1.LauncherJson.Stringify(u)),
                HotPatchLogReport_1.HotPatchLogReport.Report(h),
                HotPatchKuroSdk_1.HotPatchKuroSdk.ReportEvent(
                  SdkReportData_1.HotPatchReportData.CreateData(
                    6,
                    new Map([
                      ["eventParams", "update_launcher_updateResource_failed"],
                    ]),
                  ),
                );
          }
        }
      } else
        HotPatchLogReport_1.HotPatchLogReport.ReportLogin(
          HotPatchLogReport_1.LoginLogEventDefine.Update,
          "update_failed",
        ),
          (u.success = !1),
          (u.info = "get remmote version config failed"),
          (h.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(u)),
          HotPatchLogReport_1.HotPatchLogReport.Report(h),
          HotPatchKuroSdk_1.HotPatchKuroSdk.ReportEvent(
            SdkReportData_1.HotPatchReportData.CreateData(
              3,
              new Map([["eventParams", "update_remote_failed"]]),
            ),
          );
    } else
      HotPatchLogReport_1.HotPatchLogReport.ReportLogin(
        HotPatchLogReport_1.LoginLogEventDefine.Update,
        "update_failed",
      ),
        (u.success = !1),
        (u.info = "get local app version failed"),
        (h.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(u)),
        HotPatchLogReport_1.HotPatchLogReport.Report(h),
        HotPatchKuroSdk_1.HotPatchKuroSdk.ReportEvent(
          SdkReportData_1.HotPatchReportData.CreateData(
            3,
            new Map([["eventParams", "update_start_failed"]]),
          ),
        );
  }
  static async ProcessLineDiff(e) {
    UE.KismetSystemLibrary.ControlScreensaver(!1),
      LauncherLog_1.LauncherLog.Info("热更开始"),
      (HotPatch.State = 1);
    var a = UE.KuroLauncherLibrary.NeedHotPatch();
    LauncherLog_1.LauncherLog.Info("包的构建类型是否需要执行热更流程", [
      "needHotPatch",
      a,
    ]);
    const o = new HotFixManager_1.HotFixManager();
    await o.Init(e),
      (UE.GameplayStatics.GetPlayerController(e, 0).bShowMouseCursor = !0);
    let t = void 0;
    t = Platform_1.Platform.IsPs5Platform()
      ? async (e, t) => (
          await o.ShowDialog(
            !1,
            "HotFixTipsTitle",
            "GetRemoteConfigFailed",
            void 0,
            void 0,
            "HotFixRetry",
          ),
          t()
        )
      : async (e, t) => {
          return (await o.ShowDialog(
            !0,
            "HotFixTipsTitle",
            "GetRemoteConfigFailed",
            "HotFixQuit",
            "HotFixRetry",
            void 0,
          ))
            ? t()
            : (AppUtil_1.AppUtil.QuitGame("ProcessLine"),
              await o.WaitFrame(),
              { Success: !0 });
        };
    const r = async () => {
      return {
        Success:
          await BaseConfigController_1.BaseConfigController.RequestBaseData(o),
      };
    };
    if (
      (await (0, ProcedureUtil_1.whetherRepeatDoOnFailedAsync)(r, t),
      PlatformSdkManagerNew_1.PlatformSdkManagerNew.IfNeedPlatformSdkConfig)
    ) {
      const r = async () => {
        return {
          Success:
            await PlatformSdkConfig_1.PlatformSdkConfig.RequestBaseData(o),
        };
      };
      await (0, ProcedureUtil_1.whetherRepeatDoOnFailedAsync)(r, t);
    }
    let c = PlatformSdkManagerNew_1.PlatformSdkManagerNew.Initialize(e);
    if (!c) {
      var i = async () =>
        o.ShowDialog(
          !1,
          "HotFixTipsTitle",
          "SdkInitializeFail",
          void 0,
          void 0,
          "HotFixQuit",
        );
      if (!Platform_1.Platform.IsPs5Platform())
        return void ((await i()) && AppUtil_1.AppUtil.QuitGame("ProcessLine"));
      for (; !c; )
        await i(),
          await HotPatchInputManager_1.HotPatchInputManager.WaitAnyKeyPress(),
          PlatformSdkManagerNew_1.PlatformSdkManagerNew.UnInitialize(),
          (c = PlatformSdkManagerNew_1.PlatformSdkManagerNew.Initialize(e));
    }
    let _ = await o.ShowPrivacyProtocolView();
    if (!_) {
      if (!Platform_1.Platform.IsPs5Platform())
        return void AppUtil_1.AppUtil.QuitGame("ProcessLine");
      for (; !_; )
        await HotPatchInputManager_1.HotPatchInputManager.WaitAnyKeyPress(),
          (_ = await o.ShowPrivacyProtocolView());
    }
    ThinkDataLaunchReporter_1.ThinkDataLaunchReporter.InitializeInstance(),
      LauncherLogUploadHelper_1.LauncherLogUploadHelper.InitLogUpload(),
      AppLinks_1.AppLinks.Init(),
      LauncherAudio_1.LauncherAudio.InitIosAuditPackage();
    var n = cpp_1.KuroApplication.IniPlatformNameIncludeEditor(),
      p =
        (HotPatchLogReport_1.HotPatchLogReport.ReportLogin(
          HotPatchLogReport_1.LoginLogEventDefine.Update,
          "update_start",
        ),
        new HotPatchLogReport_1.HotPatchLog()),
      p =
        ((p.s_step_id = "start_hot_patch"),
        HotPatchLogReport_1.HotPatchLogReport.Report(p),
        new HotPatchLogReport_1.HotPatchLog()),
      h = { success: !0 },
      u =
        ((p.s_step_id = "end_hot_patch"),
        new HotPatchLogReport_1.HotPatchLog()),
      P = UE.KuroVariableFunctionLibrary.HasStringValue("back_to_game"),
      d = ((u.s_step_id = "need_hot_patch_logic"), { success: !0 });
    if (((d.info = { NeedHotPatch: a, NeedBackToGame: P }), !a)) {
      (d.success = !1),
        (u.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(d)),
        HotPatchLogReport_1.HotPatchLogReport.Report(u),
        (h.info = d.info),
        (p.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(h)),
        HotPatchLogReport_1.HotPatchLogReport.Report(p),
        LauncherLog_1.LauncherLog.Info(
          "应用配置了不需要执行热更流程，直接进入游戏",
          ["NeedHotPatch", a],
        ),
        LanguageUpdateManager_1.LanguageUpdateManager.Init(HotPatch.RSr);
      const H = await HotPatch.rga(n, o, !0);
      return H
        ? (await HotPatch.P4a(o),
          await HotPatch.wSr(o),
          await HotPatch.BSr(o),
          o.Destroy(),
          void HotPatch.PSr(!1))
        : void 0;
    }
    (u.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(d)),
      HotPatchLogReport_1.HotPatchLogReport.Report(u);
    let s = void 0;
    (s = new (
      "Android" === n
        ? AndroidDiffPatchProcedure_1.AndroidDiffPatchProcedure
        : "IOS" === n
          ? IosDiffPatchProcedure_1.IosDiffPatchProcedure
          : OhtersDiffPatchProcedure_1.OthersDiffPatchProcedure
    )(HotPatch.xSr, o)),
      VideoResUpdate_1.VideoResUpdate.Init(
        HotPatch.xSr,
        !0,
        !UE.KuroStaticLibrary.DirectoryExists(HotPatch.xSr.GetPatchSaveDir()),
      ),
      HotPatchKuroSdk_1.HotPatchKuroSdk.ReportEvent(
        SdkReportData_1.HotPatchReportData.CreateData(
          1,
          new Map([["eventParams", "update_start"]]),
        ),
      );
    a = new HotPatchLogReport_1.HotPatchLog();
    if (
      ((a.s_step_id = "launcher_hp_pre_start"),
      HotPatchLogReport_1.HotPatchLogReport.Report(a),
      await s.Start())
    ) {
      HotPatchKuroSdk_1.HotPatchKuroSdk.ReportEvent(
        SdkReportData_1.HotPatchReportData.CreateData(
          2,
          new Map([["eventParams", "update_start"]]),
        ),
      ),
        HotPatchKuroSdk_1.HotPatchKuroSdk.ReportEvent(
          SdkReportData_1.HotPatchReportData.CreateData(
            1,
            new Map([["eventParams", "update_remote"]]),
          ),
        ),
        (HotPatch.State = 2);
      d = new HotPatchLogReport_1.HotPatchLog();
      if (
        ((d.s_step_id = "launcher_hp_get_remote_ver_config"),
        HotPatchLogReport_1.HotPatchLogReport.Report(d),
        await s.GetRemoteVersionConfig())
      ) {
        HotPatchKuroSdk_1.HotPatchKuroSdk.ReportEvent(
          SdkReportData_1.HotPatchReportData.CreateData(
            2,
            new Map([["eventParams", "update_remote"]]),
          ),
        ),
          HotPatchKuroSdk_1.HotPatchKuroSdk.ReportEvent(
            SdkReportData_1.HotPatchReportData.CreateData(
              1,
              new Map([["eventParams", "check_app_version"]]),
            ),
          );
        (u = new HotPatchLogReport_1.HotPatchLog()),
          (a =
            ((u.s_step_id = "check_app_version"),
            await s.IsAppVersionChange()));
        if (a) {
          LauncherLog_1.LauncherLog.Info(
            "需要更新app",
            ["CurAppVer", UE.KuroLauncherLibrary.GetAppVersion()],
            [
              "LatestAppVer",
              RemoteConfig_1.RemoteInfo.NewConfig.PackageVersion,
            ],
          );
          const L = { NeedUpdateApp: !0 };
          (u.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(L)),
            HotPatchLogReport_1.HotPatchLogReport.Report(u),
            HotPatchLogReport_1.HotPatchLogReport.ReportLogin(
              HotPatchLogReport_1.LoginLogEventDefine.Update,
              "update_failed",
            ),
            (h.success = !1),
            (h.info = "app need update"),
            (p.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(h)),
            HotPatchLogReport_1.HotPatchLogReport.Report(p),
            HotPatchKuroSdk_1.HotPatchKuroSdk.ReportEvent(
              SdkReportData_1.HotPatchReportData.CreateData(
                3,
                new Map([["eventParams", "check_app_version_failed"]]),
              ),
            ),
            await PackageUpdateController_1.PackageUpdateController.TryOpenPackageUpdateTipsView(
              o,
            ),
            void (await o.WaitFrame());
        } else {
          const L = { NeedUpdateApp: !1 };
          (u.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(L)),
            HotPatchKuroSdk_1.HotPatchKuroSdk.ReportEvent(
              SdkReportData_1.HotPatchReportData.CreateData(
                2,
                new Map([["eventParams", "check_app_version"]]),
              ),
            );
          (u.s_step_result = LauncherSerialize_1.LauncherJson.Stringify({
            NeedUpdateApp: !1,
          })),
            HotPatchLogReport_1.HotPatchLogReport.Report(u),
            HotPatchKuroSdk_1.HotPatchKuroSdk.ReportEvent(
              SdkReportData_1.HotPatchReportData.CreateData(
                4,
                new Map([["eventParams", "update_launcher"]]),
              ),
            ),
            PreDownloadManager_1.PreDownloadManager.Get(),
            ResPackageInfo_1.ResPackageInfo.Init(HotPatch.xSr),
            LanguageUpdateManager_1.LanguageUpdateManager.Init(HotPatch.RSr);
          (d =
            BaseConfigController_1.BaseConfigController.GetIosAuditFirstDownloadTip()),
            (a =
              BaseConfigController_1.BaseConfigController.GetIosAuditFirstDownloadTipWithSkip()),
            (u = cpp_1.KuroApplication.IniPlatformName());
          if (
            (LauncherLog_1.LauncherLog.Info(
              "[iOS母包] [BackToGame] [ProcessLineDiff] 是否跳过热更",
              ["needBackToGame", P],
              ["iosAuditFirstDownloadTip", d],
              ["iosAuditFirstDownloadTipWithSkip", a],
              ["platformName", u],
            ),
            P || a)
          )
            o.Destroy(), HotPatch.PSr(!1);
          else {
            (d = new HotPatchLogReport_1.HotPatchLog()),
              (u =
                ((d.s_step_id = "launcher_hp_update_launcher"),
                HotPatchLogReport_1.HotPatchLogReport.Report(d),
                new UrlPrefixDownload_1.UrlPrefixDownload())),
              (P = new UpdateEvent_1.UpdateReportEvent("launcher")),
              (a = new UpdateEvent_1.UpdateUiEvent(o, "launcher")),
              (d = new DiffUpdate_1.DiffUpdate(
                [ResPackageInfo_1.ResPackageInfo.LauncherInfo],
                u,
                a,
                P,
              ));
            if (await s.UpdateResource(!1, d, !1)) {
              var u = new HotPatchLogReport_1.HotPatchLog(),
                a =
                  ((u.s_step_id = "launcher_hp_mount_launcher"),
                  HotPatchLogReport_1.HotPatchLogReport.Report(u),
                  HotPatchKuroSdk_1.HotPatchKuroSdk.ReportEvent(
                    SdkReportData_1.HotPatchReportData.CreateData(
                      5,
                      new Map([["eventParams", "update_launcher"]]),
                    ),
                  ),
                  new HotPatchLogReport_1.HotPatchLog()),
                P =
                  ((a.s_step_id = "launcher_hp_wether_reboot_launcher"),
                  HotPatchLogReport_1.HotPatchLogReport.Report(a),
                  d.NeedReboot());
              if (P)
                d.MountFiles(),
                  ((u = new HotPatchLogReport_1.HotPatchLog()).s_step_id =
                    "restart_launcher"),
                  HotPatchLogReport_1.HotPatchLogReport.Report(u),
                  (h.success = !0),
                  (h.info = "restart launcher"),
                  (p.s_step_result =
                    LauncherSerialize_1.LauncherJson.Stringify(h)),
                  HotPatchLogReport_1.HotPatchLogReport.Report(p),
                  LauncherLog_1.LauncherLog.Info(
                    "热更器有更新需要重启，开始重启热更器！",
                  ),
                  HotFixSceneManager_1.HotFixSceneManager.StopHotPatchBgm(),
                  o.Destroy(),
                  LauncherProcedure_1.LauncherProcedure.Destroy(),
                  UE.KuroSqliteLibrary.CloseAllConnections(),
                  UE.GameplayStatics.OpenLevel(
                    HotPatch.RSr,
                    new UE.FName("/Game/Aki/Map/Launch/Bootstrap"),
                  );
              else {
                const H = await HotPatch.rga(n, o);
                if (H) {
                  (a = new HotPatchLogReport_1.HotPatchLog()),
                    (d =
                      ((a.s_step_id = "launcher_hp_pak_key_update"),
                      HotPatchLogReport_1.HotPatchLogReport.Report(a),
                      PakKeyUpdate_1.PakKeyUpdate.Init(this.xSr),
                      await PakKeyUpdate_1.PakKeyUpdate.CheckPakKey(
                        void 0,
                        void 0,
                      ),
                      VideoResUpdate_1.VideoResUpdate.GetIsSeparateVideo() &&
                        (await PakKeyUpdate_1.PakKeyUpdate.CheckVideoPakKey(
                          void 0,
                          void 0,
                        )),
                      new HotPatchLogReport_1.HotPatchLog())),
                    (u =
                      ((d.s_step_id = "launcher_hp_update_resource"),
                      HotPatchLogReport_1.HotPatchLogReport.Report(d),
                      new UrlPrefixDownload_1.UrlPrefixDownload())),
                    (a = new UpdateEvent_1.UpdateReportEvent("resource")),
                    (d = new UpdateEvent_1.UpdateUiEvent(o, "resource"));
                  let e = [ResPackageInfo_1.ResPackageInfo.ResourceInfo];
                  var l = ResPackageInfo_1.ResPackageInfo.GetAllLanguageInfos();
                  let t = !1;
                  for (const g of l)
                    g.SkipLangUpdateButMountFileModify() && (t = !0);
                  e = e.concat(l);
                  l = new DiffUpdate_1.DiffUpdate(e, u, d, a);
                  if (
                    (HotPatchKuroSdk_1.HotPatchKuroSdk.ReportEvent(
                      SdkReportData_1.HotPatchReportData.CreateData(
                        4,
                        new Map([["eventParams", "update_voice"]]),
                      ),
                    ),
                    await s.UpdateResource(
                      !0,
                      l,
                      VideoResUpdate_1.VideoResUpdate.GetIsSeparateVideo(),
                    ))
                  ) {
                    HotPatchKuroSdk_1.HotPatchKuroSdk.ReportEvent(
                      SdkReportData_1.HotPatchReportData.CreateData(
                        5,
                        new Map([["eventParams", "update_voice"]]),
                      ),
                    );
                    (u = new HotPatchLogReport_1.HotPatchLog()),
                      (d =
                        ((u.s_step_id = "launcher_hp_pre_complete"),
                        HotPatchLogReport_1.HotPatchLogReport.Report(u),
                        s.PreComplete(),
                        new HotPatchLogReport_1.HotPatchLog()));
                    if (
                      ((d.s_step_id = "launcher_hp_wether_restart_app"),
                      HotPatchLogReport_1.HotPatchLogReport.Report(d),
                      (P = l.NeedReboot()) || t)
                    )
                      return (
                        ((a = new HotPatchLogReport_1.HotPatchLog()).s_step_id =
                          "need_restart_app_to_complete_update"),
                        HotPatchLogReport_1.HotPatchLogReport.Report(a),
                        (h.success = !0),
                        (h.info = "need restart app to complete update"),
                        (p.s_step_result =
                          LauncherSerialize_1.LauncherJson.Stringify(h)),
                        HotPatchLogReport_1.HotPatchLogReport.Report(p),
                        CloudGameManagerLauncher_1.CloudGameManagerLauncher
                          .IsPreLaunch
                          ? void AppUtil_1.AppUtil.QuitGame("ProcessLine")
                          : ((u =
                              P && l.IsHotFixOrNot()
                                ? "HotFixRestartToCompleteHotFix"
                                : "HotFixRestartToRepairFiles"),
                            void (
                              (await o.ShowDialog(
                                !1,
                                "HotFixTipsTitle",
                                u,
                                void 0,
                                void 0,
                                "HotFixQuit",
                              )) &&
                              ("IOS" === n || "Windows" === n || "Mac" === n
                                ? AppUtil_1.AppUtil.QuitGame("ProcessLine")
                                : UE.KuroLauncherLibrary.RestartApplication(
                                    '@echo off\nset /a "pid=%~1"\nset "exe_path=%~2"\n:waitloop\ntasklist | findstr /C:" %pid% " >nul\nif errorlevel 1 (\n\tgoto launch\n) else (\n\ttaskkill /pid %pid% /f >nul\n\ttimeout /t 1 /nobreak >nul\n\tgoto waitloop\n)\n:launch\nstart "" "%exe_path%"\nexit 0',
                                  ))
                            ))
                      );
                    HotPatchKuroSdk_1.HotPatchKuroSdk.ReportEvent(
                      SdkReportData_1.HotPatchReportData.CreateData(
                        4,
                        new Map([["eventParams", "mount_pak"]]),
                      ),
                    );
                    (d = new HotPatchLogReport_1.HotPatchLog()),
                      (a =
                        ((d.s_step_id = "launcher_hp_mount_resource"),
                        HotPatchLogReport_1.HotPatchLogReport.Report(d),
                        l.MountFiles(),
                        VideoResUpdate_1.VideoResUpdate.GetIsSeparateVideo() &&
                          VideoResUpdate_1.VideoResUpdate.MountPaks(),
                        HotPatchKuroSdk_1.HotPatchKuroSdk.ReportEvent(
                          SdkReportData_1.HotPatchReportData.CreateData(
                            5,
                            new Map([["eventParams", "mount_pak"]]),
                          ),
                        ),
                        new HotPatchLogReport_1.HotPatchLog())),
                      (P =
                        ((a.s_step_id = "launcher_hp_procedure_complete"),
                        HotPatchLogReport_1.HotPatchLogReport.Report(a),
                        await s.Complete(),
                        LauncherLog_1.LauncherLog.Info(
                          "热更流程执行完毕，开始进入游戏场景",
                        ),
                        HotPatchLogReport_1.HotPatchLogReport.ReportLogin(
                          HotPatchLogReport_1.LoginLogEventDefine.Update,
                          "update_success",
                        ),
                        (h.success = !0),
                        (p.s_step_result =
                          LauncherSerialize_1.LauncherJson.Stringify(h)),
                        HotPatchLogReport_1.HotPatchLogReport.Report(p),
                        new HotPatchLogReport_1.HotPatchLog())),
                      (u =
                        ((P.s_step_id = "launcher_hp_check_driver"),
                        HotPatchLogReport_1.HotPatchLogReport.Report(P),
                        await HotPatch.P4a(o),
                        await HotPatch.wSr(o),
                        new HotPatchLogReport_1.HotPatchLog())),
                      (n =
                        ((u.s_step_id = "launcher_hp_compile_shader"),
                        HotPatchLogReport_1.HotPatchLogReport.Report(u),
                        await HotPatch.BSr(o),
                        new HotPatchLogReport_1.HotPatchLog())),
                      (d =
                        ((n.s_step_id = "launcher_hp_close_view"),
                        HotPatchLogReport_1.HotPatchLogReport.Report(n),
                        await o.CloseHotFix(),
                        new HotPatchLogReport_1.HotPatchLog())),
                      (l =
                        ((d.s_step_id = "launcher_hp_call_finish"),
                        HotPatchLogReport_1.HotPatchLogReport.Report(d),
                        HotPatch.PSr(!0),
                        new HotPatchLogReport_1.HotPatchLog()));
                    (l.s_step_id = "launcher_hp_all_complete"),
                      HotPatchLogReport_1.HotPatchLogReport.Report(l);
                  } else
                    HotPatchKuroSdk_1.HotPatchKuroSdk.ReportEvent(
                      SdkReportData_1.HotPatchReportData.CreateData(
                        6,
                        new Map([
                          ["eventParams", "update_voice_update_resource_fail"],
                        ]),
                      ),
                    ),
                      HotPatchLogReport_1.HotPatchLogReport.ReportLogin(
                        HotPatchLogReport_1.LoginLogEventDefine.Update,
                        "update_failed",
                      ),
                      (h.success = !1),
                      (h.info = "update game resources failed"),
                      (p.s_step_result =
                        LauncherSerialize_1.LauncherJson.Stringify(h)),
                      HotPatchLogReport_1.HotPatchLogReport.Report(p);
                }
              }
            } else
              HotPatchLogReport_1.HotPatchLogReport.ReportLogin(
                HotPatchLogReport_1.LoginLogEventDefine.Update,
                "update_failed",
              ),
                (h.success = !1),
                (h.info = "update launcher failed"),
                (p.s_step_result =
                  LauncherSerialize_1.LauncherJson.Stringify(h)),
                HotPatchLogReport_1.HotPatchLogReport.Report(p),
                HotPatchKuroSdk_1.HotPatchKuroSdk.ReportEvent(
                  SdkReportData_1.HotPatchReportData.CreateData(
                    6,
                    new Map([
                      ["eventParams", "update_launcher_updateResource_failed"],
                    ]),
                  ),
                );
          }
        }
      } else
        HotPatchLogReport_1.HotPatchLogReport.ReportLogin(
          HotPatchLogReport_1.LoginLogEventDefine.Update,
          "update_failed",
        ),
          (h.success = !1),
          (h.info = "get remmote version config failed"),
          (p.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(h)),
          HotPatchLogReport_1.HotPatchLogReport.Report(p),
          HotPatchKuroSdk_1.HotPatchKuroSdk.ReportEvent(
            SdkReportData_1.HotPatchReportData.CreateData(
              3,
              new Map([["eventParams", "update_remote_failed"]]),
            ),
          );
    } else
      HotPatchLogReport_1.HotPatchLogReport.ReportLogin(
        HotPatchLogReport_1.LoginLogEventDefine.Update,
        "update_failed",
      ),
        (h.success = !1),
        (h.info = "get local app version failed"),
        (p.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(h)),
        HotPatchLogReport_1.HotPatchLogReport.Report(p),
        HotPatchKuroSdk_1.HotPatchKuroSdk.ReportEvent(
          SdkReportData_1.HotPatchReportData.CreateData(
            3,
            new Map([["eventParams", "update_start_failed"]]),
          ),
        );
  }
  static bSr(e, t) {
    var a = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetRHIDeviceName();
    if (t && !a.includes("Adreno")) return e;
    (t = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetRHIDriverVersion()),
      (a = t.split("V@"));
    let o = "",
      r = e;
    e = (o = 1 < a.length ? a[1] : o).match(/\d+/g);
    return (
      e && 0 < e.length && (r = parseInt(e[0])),
      LauncherLog_1.LauncherLog.Info(
        "",
        ["DriverVersion", t],
        ["glVersion", r],
      ),
      r
    );
  }
  static async rga(e, t, a = !1) {
    var o,
      r,
      c = new HotPatchLogReport_1.HotPatchLog(),
      i =
        ((c.s_step_id = "launcher_hp_check_ios_devive_support"),
        { success: !0 });
    return "IOS" !== e
      ? ((i.info = { platform: e, noHotPatchProcedure: a }),
        (c.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(i)),
        HotPatchLogReport_1.HotPatchLogReport.Report(c),
        !0)
      : ((o = new Set()).add("iPadMini4"),
        o.add("iPadAir2"),
        (r =
          UE.KuroRenderingRuntimeBPPluginBPLibrary.GetDeviceProfileProfileName()),
        (i.info = { platform: e, device: r, noHotPatchProcedure: a }),
        LauncherLog_1.LauncherLog.Info("print ios device info.", ["device", r]),
        o.has(r)
          ? ((i.success = !1),
            (c.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(i)),
            HotPatchLogReport_1.HotPatchLogReport.Report(c),
            LauncherLog_1.LauncherLog.Info(
              "ios device is not support! app will quit.",
              ["device", r],
            ),
            await t.ShowDialog(
              !1,
              "HotFixTipsTitle",
              "MobileChipOutOfVersion",
              void 0,
              void 0,
              "ConfirmText",
            ),
            AppUtil_1.AppUtil.QuitGame("DeviceSupport"),
            await t.WaitFrame(),
            !1)
          : ((c.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(i)),
            HotPatchLogReport_1.HotPatchLogReport.Report(c),
            !0));
  }
  static async wSr(e) {
    var t;
    "Android" === cpp_1.KuroApplication.IniPlatformName() &&
      0 < (t = HotPatch.bSr(-1, !1)) &&
      t < 378 &&
      (await e.ShowDialog(
        !1,
        "HotFixTipsTitle",
        "MobileDriverOutOfVersion",
        void 0,
        void 0,
        "ConfirmText",
      ));
  }
  static w4a(e) {
    e = /(\d{1,2})-(\d{1,2})-(\d{4})/.exec(e);
    return 4 === e?.length && Number(e[3]) < 2023;
  }
  static async P4a(e) {
    var t;
    "Windows" === cpp_1.KuroApplication.IniPlatformNameIncludeEditor() &&
      ((t = "Unknown"),
      (t = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetRHIDriverDate()),
      HotPatch.w4a(t)) &&
      (await e.ShowDialog(
        !1,
        "HotFixTipsTitle",
        "EquipmentDriveOutOfVersion",
        void 0,
        void 0,
        "ConfirmText",
      ));
  }
  static async BSr(e) {
    UE.KuroLauncherLibrary.ResumeCompileShader();
    let t = UE.KuroLauncherLibrary.GetRemainPrecompileShaders();
    if (t <= 0)
      LauncherLog_1.LauncherLog.Info("precompile shaders remain <= 0", [
        "remain",
        t,
      ]);
    else {
      var a = UE.KuroLauncherLibrary.GetTotalPrecompileShaders();
      if (a < t)
        LauncherLog_1.LauncherLog.Error(
          "precompile shaders total < remain.",
          ["remain", t],
          ["total", a],
        );
      else {
        var o = new HotPatchLogReport_1.HotPatchLog(),
          r =
            ((o.s_step_id = "start_show_precompile_shader"),
            { remain: t, total: a });
        for (
          o.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(r),
            HotPatchLogReport_1.HotPatchLogReport.Report(o),
            e.ShowInfo(!0, void 0),
            LauncherLog_1.LauncherLog.Info(
              "begin show precompile shaders progress.",
              ["remain", t],
              ["total", a],
            ),
            await e.WaitFrame(15),
            UE.KuroLauncherLibrary.SetPrecompileShaderBatchMode(
              NetworkDefine_1.ETsCompileShaderBatchMode.Precompile,
            );
          0 < t;

        ) {
          var c = (a - t) / a,
            i = (100 * c).toFixed(0) + "%";
          LauncherLog_1.LauncherLog.Debug(
            "precompile shaders progress.",
            ["remain", t],
            ["total", a],
            ["rate", c],
            ["percent", i],
          ),
            await e.UpdateProgress(!0, c, "CompilingShader", i),
            await e.WaitFrame(15),
            (t = UE.KuroLauncherLibrary.GetRemainPrecompileShaders());
        }
        await e.UpdateProgress(!0, 1, "CompilingShader", "100%"),
          await e.WaitFrame();
        r = new HotPatchLogReport_1.HotPatchLog();
        (r.s_step_id = "end_show_precompile_shader"),
          HotPatchLogReport_1.HotPatchLogReport.Report(r);
      }
    }
  }
  static ClearPatch() {
    LauncherLog_1.LauncherLog.Info("开始清理补丁！");
    var e = new HotPatchLogReport_1.HotPatchLog();
    if (
      ((e.s_step_id = "clear_patch_resources"),
      HotPatchLogReport_1.HotPatchLogReport.Report(e),
      LauncherEnum_1.IS_DIFF_PATCH)
    ) {
      ResPackageInfo_1.ResPackageInfo.LauncherInfo.ClearRecord(),
        ResPackageInfo_1.ResPackageInfo.ResourceInfo.ClearRecord();
      for (const t of ResPackageInfo_1.ResPackageInfo.GetAllLanguageInfos())
        t.ClearRecord();
    } else {
      new AppVersionMisc_1.LauncherVersionMisc().ClearAllPatchVersion(
        HotPatch.RSr,
      );
      new AppVersionMisc_1.ResourceVersionMisc().ClearAllPatchVersion(
        HotPatch.RSr,
      ),
        LanguageUpdateManager_1.LanguageUpdateManager.Init(HotPatch.RSr);
      e =
        LanguageUpdateManager_1.LanguageUpdateManager.GetAllLanguagesVersionMisc();
      for (const a of e) a.ClearAllPatchVersion(HotPatch.RSr);
    }
    LauncherProcedure_1.LauncherProcedure.Destroy(),
      cpp_1.UKuroAnimJsSubsystem.UnregisterUpdateAnimInfoFunction(HotPatch.USr),
      UE.KuroSqliteLibrary.CloseAllConnections(),
      UE.KuroPrepareStatementLib.CloseAllConnection(),
      HotFixSceneManager_1.HotFixSceneManager.StopHotPatchBgm(),
      UE.KuroLauncherLibrary.WillClearPatchPaks(),
      UE.GameplayStatics.OpenLevel(
        HotPatch.RSr,
        new UE.FName("/Game/Aki/Map/Launch/Bootstrap"),
      );
  }
}
((exports.HotPatch = HotPatch).State = 0),
  (HotPatch.xSr = new AppPathMisc_1.AppPathMisc()),
  (HotPatch.HotFixSceneManager = new HotFixSceneManager_1.HotFixSceneManager()),
  (HotPatch.KSa = new HotFixGameSettingManager_1.HotFixGameSettingManager());
//# sourceMappingURL=HotPatch.js.map
