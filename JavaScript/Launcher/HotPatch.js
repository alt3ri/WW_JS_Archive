"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HotPatch = void 0);
const cpp_1 = require("cpp"),
  puerts_1 = require("puerts"),
  UE = require("ue"),
  AppLinks_1 = require("./AppLinks"),
  BaseConfigController_1 = require("./BaseConfig/BaseConfigController"),
  UrlPrefixDownload_1 = require("./Download/UrlPrefixDownload"),
  HotPatchKuroSdk_1 = require("./HotPatchKuroSdk/HotPatchKuroSdk"),
  SdkReportData_1 = require("./HotPatchKuroSdk/SdkReportData"),
  HotPatchLogReport_1 = require("./HotPatchLogReport"),
  AndroidHotPatchProcedure_1 = require("./HotPatchProcedure/AndroidHotPatchProcedure"),
  IosHotPatchProcedure_1 = require("./HotPatchProcedure/IosHotPatchProcedure"),
  OthersHotPatchProcedure_1 = require("./HotPatchProcedure/OthersHotPatchProcedure"),
  HotPatchPushSdk_1 = require("./HotPatchPushSdk/HotPatchPushSdk"),
  NetworkDefine_1 = require("./NetworkDefine"),
  PackageUpdateController_1 = require("./PackageUpdate/PackageUpdateController"),
  Platform_1 = require("./Platform/Platform"),
  PlatformSdkManagerNew_1 = require("./Platform/PlatformSdk/PlatformSdkManagerNew"),
  HotPatchInputManager_1 = require("./PlayerInput/HotPatchInputManager"),
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
    if ("iOS" === UE.KuroLauncherLibrary.GetPlatform()) {
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
          LauncherStorageLib_1.LauncherStorageLib.GetGlobalString(
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
          LauncherStorageLib_1.LauncherStorageLib.SetGlobalString(
            "__kr_blvr__",
            e,
          ),
          LauncherLog_1.LauncherLog.Info("热更器因 kr_br 重启"),
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
      HotPatch.WSa.ApplyGameSettings(),
      LauncherLog_1.LauncherLog.Info("播放启动进入镜头(睁开眼睛)"),
      HotPatch.HotFixSceneManager.PlayStartLaunchSeq(),
      HotPatch.HotFixSceneManager.PlayBlackSeq(() => {
        HotPatch.ProcessLine(t).catch((e) => {
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
      BaseConfigController_1.BaseConfigController.UpdatePackageConfig(!0),
      UE.WwiseExternalSourceStatics.InitExternalSourceConfigs(),
      require("../Game/Main");
  }
  static PSr(e) {
    UE.KismetSystemLibrary.ControlScreensaver(!0),
      (HotPatch.State = 3),
      LauncherLog_1.LauncherLog.Info("热更完成"),
      HotPatch.HotFixSceneManager.Destroy(),
      HotPatch.StartLogin();
  }
  static async ProcessLine(t) {
    UE.KismetSystemLibrary.ControlScreensaver(!1),
      LauncherLog_1.LauncherLog.Info("热更开始"),
      (HotPatch.State = 1);
    var a = UE.KuroLauncherLibrary.NeedHotPatch();
    LauncherLog_1.LauncherLog.Info("包的构建类型是否需要执行热更流程", [
      "needHotPatch",
      a,
    ]);
    const o = new HotFixManager_1.HotFixManager();
    await o.Init(t),
      (UE.GameplayStatics.GetPlayerController(t, 0).bShowMouseCursor = !0);
    let e = PlatformSdkManagerNew_1.PlatformSdkManagerNew.Initialize();
    if (!e) {
      var r = async () =>
        o.ShowDialog(
          !1,
          "HotFixTipsTitle",
          "SdkInitializeFail",
          void 0,
          void 0,
          "HotFixQuit",
        );
      if (!Platform_1.Platform.IsPs5Platform())
        return void ((await r()) && AppUtil_1.AppUtil.QuitGame("ProcessLine"));
      for (; !e; )
        await r(),
          await HotPatchInputManager_1.HotPatchInputManager.WaitAnyKeyPress(),
          PlatformSdkManagerNew_1.PlatformSdkManagerNew.UnInitialize(),
          (e = PlatformSdkManagerNew_1.PlatformSdkManagerNew.Initialize());
    }
    let i = await o.ShowPrivacyProtocolView();
    if (!i) {
      if (!Platform_1.Platform.IsPs5Platform())
        return void AppUtil_1.AppUtil.QuitGame("ProcessLine");
      for (; !i; )
        await HotPatchInputManager_1.HotPatchInputManager.WaitAnyKeyPress(),
          (i = await o.ShowPrivacyProtocolView());
    }
    let c = void 0;
    c = Platform_1.Platform.IsPs5Platform()
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
    await (0, ProcedureUtil_1.whetherRepeatDoOnFailedAsync)(async () => {
      return {
        Success:
          await BaseConfigController_1.BaseConfigController.RequestBaseData(o),
      };
    }, c),
      ThinkDataLaunchReporter_1.ThinkDataLaunchReporter.InitializeInstance(),
      AppLinks_1.AppLinks.Init(),
      LauncherAudio_1.LauncherAudio.InitIosAuditPackage();
    var t = UE.KuroLauncherLibrary.GetPlatform(),
      _ =
        (HotPatchLogReport_1.HotPatchLogReport.ReportLogin(
          HotPatchLogReport_1.LoginLogEventDefine.Update,
          "update_start",
        ),
        new HotPatchLogReport_1.HotPatchLog()),
      _ =
        ((_.s_step_id = "start_hot_patch"),
        HotPatchLogReport_1.HotPatchLogReport.Report(_),
        new HotPatchLogReport_1.HotPatchLog()),
      n = { success: !0 },
      p =
        ((_.s_step_id = "end_hot_patch"),
        new HotPatchLogReport_1.HotPatchLog()),
      h = UE.KuroVariableFunctionLibrary.HasStringValue("back_to_game"),
      u = ((p.s_step_id = "need_hot_patch_logic"), { success: !0 });
    if (((u.info = { NeedHotPatch: a, NeedBackToGame: h }), !a || h)) {
      (u.success = !1),
        (p.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(u)),
        HotPatchLogReport_1.HotPatchLogReport.Report(p),
        (n.info = u.info),
        (_.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(n)),
        HotPatchLogReport_1.HotPatchLogReport.Report(_),
        LauncherLog_1.LauncherLog.Info(
          "应用配置了不需要执行热更流程，直接进入游戏",
          ["NeedHotPatch", a],
          ["NeedBackToGame", h],
        ),
        LanguageUpdateManager_1.LanguageUpdateManager.Init(HotPatch.RSr);
      const H = await HotPatch.rga(t, o, !0);
      return H
        ? (h ||
            (await HotPatch.gFa(o),
            await HotPatch.wSr(o),
            await HotPatch.BSr(o)),
          o.Destroy(),
          void HotPatch.PSr(!1))
        : void 0;
    }
    (p.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(u)),
      HotPatchLogReport_1.HotPatchLogReport.Report(p);
    let P = void 0;
    (P = new (
      "Android" === t
        ? AndroidHotPatchProcedure_1.AndroidHotPatchProcedure
        : "iOS" === t
          ? IosHotPatchProcedure_1.IosHotPatchProcedure
          : OthersHotPatchProcedure_1.OthersHotPatchProcedure
    )(HotPatch.xSr, o)),
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
      await P.Start())
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
      h = new HotPatchLogReport_1.HotPatchLog();
      if (
        ((h.s_step_id = "launcher_hp_get_remote_ver_config"),
        HotPatchLogReport_1.HotPatchLogReport.Report(h),
        await P.GetRemoteVersionConfig())
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
          (p =
            ((u.s_step_id = "check_app_version"),
            await P.IsAppVersionChange()));
        if (p) {
          LauncherLog_1.LauncherLog.Info(
            "需要更新app",
            ["CurAppVer", UE.KuroLauncherLibrary.GetAppVersion()],
            ["LatestAppVer", RemoteConfig_1.RemoteInfo.Config.PackageVersion],
          );
          const L = { NeedUpdateApp: !0 };
          (u.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(L)),
            HotPatchLogReport_1.HotPatchLogReport.Report(u),
            HotPatchLogReport_1.HotPatchLogReport.ReportLogin(
              HotPatchLogReport_1.LoginLogEventDefine.Update,
              "update_failed",
            ),
            (n.success = !1),
            (n.info = "app need update"),
            (_.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(n)),
            HotPatchLogReport_1.HotPatchLogReport.Report(_),
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
            );
          (a = new HotPatchLogReport_1.HotPatchLog()),
            (h =
              ((a.s_step_id = "launcher_hp_update_launcher"),
              HotPatchLogReport_1.HotPatchLogReport.Report(a),
              new AppVersionMisc_1.LauncherVersionMisc())),
            (p =
              (h.Init(HotPatch.RSr),
              new UrlPrefixDownload_1.UrlPrefixDownload())),
            (u = new ResourceUpdate_1.ResourceUpdate(
              HotPatch.RSr,
              p,
              h,
              this.xSr,
            ));
          if (await P.UpdateResource(!1, u)) {
            a = new HotPatchLogReport_1.HotPatchLog();
            if (
              ((a.s_step_id = "launcher_hp_mount_launcher"),
              HotPatchLogReport_1.HotPatchLogReport.Report(a),
              await P.MountPak(u))
            ) {
              HotPatchKuroSdk_1.HotPatchKuroSdk.ReportEvent(
                SdkReportData_1.HotPatchReportData.CreateData(
                  5,
                  new Map([["eventParams", "update_launcher"]]),
                ),
              );
              (p = new HotPatchLogReport_1.HotPatchLog()),
                (h =
                  ((p.s_step_id = "launcher_hp_wether_reboot_launcher"),
                  HotPatchLogReport_1.HotPatchLogReport.Report(p),
                  u.GetRevertInfo()));
              if (u.GetNeedRemount()) {
                if (h.NeedRevert) {
                  for (const g of h.Paks) UE.KuroPakMountStatic.UnmountPak(g);
                  for (const w of h.Files) UE.KuroLauncherLibrary.DeleteFile(w);
                }
                a = new HotPatchLogReport_1.HotPatchLog();
                (a.s_step_id = "restart_launcher"),
                  HotPatchLogReport_1.HotPatchLogReport.Report(a),
                  (n.success = !0),
                  (n.info = "restart launcher"),
                  (_.s_step_result =
                    LauncherSerialize_1.LauncherJson.Stringify(n)),
                  HotPatchLogReport_1.HotPatchLogReport.Report(_),
                  LauncherLog_1.LauncherLog.Info(
                    "热更器有更新需要重启，开始重启热更器！",
                  ),
                  HotFixSceneManager_1.HotFixSceneManager.StopHotPatchBgm(),
                  o.Destroy(),
                  UE.KuroSqliteLibrary.CloseAllConnections(),
                  UE.GameplayStatics.OpenLevel(
                    HotPatch.RSr,
                    new UE.FName("/Game/Aki/Map/Launch/Bootstrap"),
                  );
              } else {
                const H = await HotPatch.rga(t, o);
                if (H) {
                  var p = new HotPatchLogReport_1.HotPatchLog(),
                    u =
                      ((p.s_step_id = "launcher_hp_pak_key_update"),
                      HotPatchLogReport_1.HotPatchLogReport.Report(p),
                      PakKeyUpdate_1.PakKeyUpdate.Init(this.xSr),
                      await PakKeyUpdate_1.PakKeyUpdate.CheckPakKey(
                        void 0,
                        void 0,
                      ),
                      new HotPatchLogReport_1.HotPatchLog()),
                    d =
                      ((u.s_step_id = "launcher_hp_update_resource"),
                      HotPatchLogReport_1.HotPatchLogReport.Report(u),
                      new Array()),
                    a = new AppVersionMisc_1.ResourceVersionMisc(),
                    p =
                      (a.Init(HotPatch.RSr),
                      new UrlPrefixDownload_1.UrlPrefixDownload()),
                    u = new ResourceUpdate_1.ResourceUpdate(
                      HotPatch.RSr,
                      p,
                      a,
                      this.xSr,
                    ),
                    p =
                      (d.push(u),
                      LanguageUpdateManager_1.LanguageUpdateManager.Init(
                        HotPatch.RSr,
                      ),
                      LanguageUpdateManager_1.LanguageUpdateManager.GetAllLanguagesVersionMisc());
                  for (const R of p) {
                    var s = new UrlPrefixDownload_1.UrlPrefixDownload(),
                      s = new ResourceUpdate_1.ResourceUpdate(
                        HotPatch.RSr,
                        s,
                        R,
                        this.xSr,
                        !R.NeedUpdate(),
                      );
                    d.push(s);
                  }
                  if (
                    (HotPatchKuroSdk_1.HotPatchKuroSdk.ReportEvent(
                      SdkReportData_1.HotPatchReportData.CreateData(
                        4,
                        new Map([["eventParams", "update_voice"]]),
                      ),
                    ),
                    await P.UpdateResource(!0, ...d))
                  ) {
                    HotPatchKuroSdk_1.HotPatchKuroSdk.ReportEvent(
                      SdkReportData_1.HotPatchReportData.CreateData(
                        5,
                        new Map([["eventParams", "update_voice"]]),
                      ),
                    );
                    a = new HotPatchLogReport_1.HotPatchLog();
                    (a.s_step_id = "launcher_hp_pre_complete"),
                      HotPatchLogReport_1.HotPatchLogReport.Report(a),
                      P.PreComplete();
                    let e = void 0;
                    for (const f of d) {
                      var l = f.GetRevertInfo();
                      if (l.NeedRevert)
                        if (e) {
                          for (const U of l.Paks) e.Paks.add(U);
                          for (const v of l.Files) e.Files.add(v);
                        } else e = l;
                    }
                    if (h.NeedRevert)
                      if (e) {
                        for (const k of h.Paks) e.Paks.add(k);
                        for (const S of h.Files) e.Files.add(S);
                      } else e = h;
                    void 0 !== e &&
                      e.NeedRevert &&
                      UE.KuroLauncherLibrary.SetRestartApp(1);
                    u = new HotPatchLogReport_1.HotPatchLog();
                    if (
                      ((u.s_step_id = "launcher_hp_wether_restart_app"),
                      HotPatchLogReport_1.HotPatchLogReport.Report(u),
                      P.NeedRestart(...d) || (void 0 !== e && e.NeedRevert))
                    ) {
                      p = new HotPatchLogReport_1.HotPatchLog();
                      if (
                        ((p.s_step_id = "need_restart_app_to_complete_update"),
                        HotPatchLogReport_1.HotPatchLogReport.Report(p),
                        (n.success = !0),
                        (n.info = "need restart app to complete update"),
                        (_.s_step_result =
                          LauncherSerialize_1.LauncherJson.Stringify(n)),
                        HotPatchLogReport_1.HotPatchLogReport.Report(_),
                        void 0 !== e && e.NeedRevert)
                      ) {
                        for (const m of e.Paks)
                          UE.KuroPakMountStatic.UnmountPak(m);
                        for (const M of e.Files)
                          UE.KuroLauncherLibrary.DeleteFile(M);
                      }
                      a = UE.KuroLauncherLibrary.NeedRestartApp();
                      return 0 < a
                        ? void (
                            (await o.ShowDialog(
                              !1,
                              "HotFixTipsTitle",
                              1 === a
                                ? "HotFixRestartToCompleteHotFix"
                                : "HotFixRestartToRepairFiles",
                              void 0,
                              void 0,
                              "HotFixQuit",
                            )) &&
                            ("iOS" === t || "Windows" === t
                              ? AppUtil_1.AppUtil.QuitGame("ProcessLine")
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
                    var h = new HotPatchLogReport_1.HotPatchLog();
                    (h.s_step_id = "launcher_hp_mount_resource"),
                      HotPatchLogReport_1.HotPatchLogReport.Report(h),
                      (await P.MountPak(...d))
                        ? (HotPatchKuroSdk_1.HotPatchKuroSdk.ReportEvent(
                            SdkReportData_1.HotPatchReportData.CreateData(
                              5,
                              new Map([["eventParams", "mount_pak"]]),
                            ),
                          ),
                          ((u =
                            new HotPatchLogReport_1.HotPatchLog()).s_step_id =
                            "launcher_hp_procedure_complete"),
                          HotPatchLogReport_1.HotPatchLogReport.Report(u),
                          await P.Complete(),
                          LauncherLog_1.LauncherLog.Info(
                            "热更流程执行完毕，开始进入游戏场景",
                          ),
                          HotPatchLogReport_1.HotPatchLogReport.ReportLogin(
                            HotPatchLogReport_1.LoginLogEventDefine.Update,
                            "update_success",
                          ),
                          (n.success = !0),
                          (_.s_step_result =
                            LauncherSerialize_1.LauncherJson.Stringify(n)),
                          HotPatchLogReport_1.HotPatchLogReport.Report(_),
                          ((p =
                            new HotPatchLogReport_1.HotPatchLog()).s_step_id =
                            "launcher_hp_check_driver"),
                          HotPatchLogReport_1.HotPatchLogReport.Report(p),
                          await HotPatch.gFa(o),
                          await HotPatch.wSr(o),
                          ((a =
                            new HotPatchLogReport_1.HotPatchLog()).s_step_id =
                            "launcher_hp_compile_shader"),
                          HotPatchLogReport_1.HotPatchLogReport.Report(a),
                          await HotPatch.BSr(o),
                          ((t =
                            new HotPatchLogReport_1.HotPatchLog()).s_step_id =
                            "launcher_hp_close_view"),
                          HotPatchLogReport_1.HotPatchLogReport.Report(t),
                          await o.CloseHotFix(),
                          ((h =
                            new HotPatchLogReport_1.HotPatchLog()).s_step_id =
                            "launcher_hp_call_finish"),
                          HotPatchLogReport_1.HotPatchLogReport.Report(h),
                          HotPatch.PSr(!0),
                          ((u =
                            new HotPatchLogReport_1.HotPatchLog()).s_step_id =
                            "launcher_hp_all_complete"),
                          HotPatchLogReport_1.HotPatchLogReport.Report(u))
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
                          (n.success = !1),
                          (n.info = "mount game resources failed"),
                          (_.s_step_result =
                            LauncherSerialize_1.LauncherJson.Stringify(n)),
                          HotPatchLogReport_1.HotPatchLogReport.Report(_));
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
                      (n.success = !1),
                      (n.info = "update game resources failed"),
                      (_.s_step_result =
                        LauncherSerialize_1.LauncherJson.Stringify(n)),
                      HotPatchLogReport_1.HotPatchLogReport.Report(_);
                }
              }
            } else
              HotPatchLogReport_1.HotPatchLogReport.ReportLogin(
                HotPatchLogReport_1.LoginLogEventDefine.Update,
                "update_failed",
              ),
                (n.success = !1),
                (n.info = "mount launcher failed"),
                (_.s_step_result =
                  LauncherSerialize_1.LauncherJson.Stringify(n)),
                HotPatchLogReport_1.HotPatchLogReport.Report(_),
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
              (n.success = !1),
              (n.info = "update launcher failed"),
              (_.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(n)),
              HotPatchLogReport_1.HotPatchLogReport.Report(_),
              HotPatchKuroSdk_1.HotPatchKuroSdk.ReportEvent(
                SdkReportData_1.HotPatchReportData.CreateData(
                  6,
                  new Map([
                    ["eventParams", "update_launcher_updateResource_failed"],
                  ]),
                ),
              );
        }
      } else
        HotPatchLogReport_1.HotPatchLogReport.ReportLogin(
          HotPatchLogReport_1.LoginLogEventDefine.Update,
          "update_failed",
        ),
          (n.success = !1),
          (n.info = "get remmote version config failed"),
          (_.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(n)),
          HotPatchLogReport_1.HotPatchLogReport.Report(_),
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
        (n.success = !1),
        (n.info = "get local app version failed"),
        (_.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(n)),
        HotPatchLogReport_1.HotPatchLogReport.Report(_),
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
      i = new HotPatchLogReport_1.HotPatchLog(),
      c =
        ((i.s_step_id = "launcher_hp_check_ios_devive_support"),
        { success: !0 });
    return "iOS" !== e
      ? ((c.info = { platform: e, noHotPatchProcedure: a }),
        (i.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(c)),
        HotPatchLogReport_1.HotPatchLogReport.Report(i),
        !0)
      : ((o = new Set()).add("iPadMini4"),
        o.add("iPadAir2"),
        (r =
          UE.KuroRenderingRuntimeBPPluginBPLibrary.GetDeviceProfileProfileName()),
        (c.info = { platform: e, device: r, noHotPatchProcedure: a }),
        LauncherLog_1.LauncherLog.Info("print ios device info.", ["device", r]),
        o.has(r)
          ? ((c.success = !1),
            (i.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(c)),
            HotPatchLogReport_1.HotPatchLogReport.Report(i),
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
          : ((i.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(c)),
            HotPatchLogReport_1.HotPatchLogReport.Report(i),
            !0));
  }
  static async wSr(e) {
    var t;
    "Android" === UE.KuroLauncherLibrary.GetPlatform() &&
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
  static pFa(e) {
    e = /(\d{1,2})-(\d{1,2})-(\d{4})/.exec(e);
    return 4 === e?.length && Number(e[3]) < 2023;
  }
  static async gFa(e) {
    var t;
    "Windows" === UE.KuroLauncherLibrary.GetPlatform() &&
      ((t = "Unknown"),
      (t = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetRHIDriverDate()),
      HotPatch.pFa(t)) &&
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
          var i = (a - t) / a,
            c = (100 * i).toFixed(0) + "%";
          LauncherLog_1.LauncherLog.Debug(
            "precompile shaders progress.",
            ["remain", t],
            ["total", a],
            ["rate", i],
            ["percent", c],
          ),
            await e.UpdateProgress(!0, i, "CompilingShader", c),
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
    (e.s_step_id = "clear_patch_resources"),
      HotPatchLogReport_1.HotPatchLogReport.Report(e),
      new AppVersionMisc_1.LauncherVersionMisc().ClearAllPatchVersion(
        HotPatch.RSr,
      );
    new AppVersionMisc_1.ResourceVersionMisc().ClearAllPatchVersion(
      HotPatch.RSr,
    ),
      LanguageUpdateManager_1.LanguageUpdateManager.Init(HotPatch.RSr);
    e =
      LanguageUpdateManager_1.LanguageUpdateManager.GetAllLanguagesVersionMisc();
    for (const t of e) t.ClearAllPatchVersion(HotPatch.RSr);
    UE.KuroPakMountStatic.UnmountAllPaks();
    e = UE.KuroLauncherLibrary.GameSavedDir() + "Resources";
    UE.KuroLauncherLibrary.DeleteDirectory(e),
      AppLinks_1.AppLinks.Destroy(),
      LauncherAudio_1.LauncherAudio.Destroy(),
      cpp_1.UKuroAnimJsSubsystem.UnregisterUpdateAnimInfoFunction(HotPatch.USr),
      UE.KuroSqliteLibrary.CloseAllConnections(),
      UE.KuroPrepareStatementLib.CloseAllConnection(),
      UE.KuroLauncherLibrary.ReloadShaderLibrary(),
      HotFixSceneManager_1.HotFixSceneManager.StopHotPatchBgm(),
      UE.GameplayStatics.OpenLevel(
        HotPatch.RSr,
        new UE.FName("/Game/Aki/Map/Launch/Bootstrap"),
      );
  }
}
((exports.HotPatch = HotPatch).State = 0),
  (HotPatch.xSr = new AppPathMisc_1.AppPathMisc()),
  (HotPatch.HotFixSceneManager = new HotFixSceneManager_1.HotFixSceneManager()),
  (HotPatch.WSa = new HotFixGameSettingManager_1.HotFixGameSettingManager());
//# sourceMappingURL=HotPatch.js.map
