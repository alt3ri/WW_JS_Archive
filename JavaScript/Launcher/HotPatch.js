"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HotPatch = void 0);
const cpp_1 = require("cpp"),
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
  ProcedureUtil_1 = require("./Util/ProcedureUtil");
class HotPatch {
  static Start(e, t) {
    (HotPatch.RSr = e),
      (HotPatch.USr = t),
      LauncherLog_1.LauncherLog.Info("初始化Push"),
      HotPatchPushSdk_1.HotPatchPushSdk.StartPush(),
      LauncherLog_1.LauncherLog.Info("结束Push"),
      HotPatchKuroSdk_1.HotPatchKuroSdk.Init(),
      HotPatch.HotFixSceneManager.SetupScene(e),
      HotPatch.Wpa.ApplyGameSettings(),
      LauncherLog_1.LauncherLog.Info("播放启动进入镜头(睁开眼睛)"),
      HotPatch.HotFixSceneManager.PlayStartLaunchSeq(),
      HotPatch.HotFixSceneManager.PlayBlackSeq(() => {
        HotPatch.ProcessLine(e).catch((e) => {
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
  static async ProcessLine(a) {
    UE.KismetSystemLibrary.ControlScreensaver(!1),
      LauncherLog_1.LauncherLog.Info("热更开始"),
      (HotPatch.State = 1);
    var o = UE.KuroLauncherLibrary.NeedHotPatch();
    LauncherLog_1.LauncherLog.Info("包的构建类型是否需要执行热更流程", [
      "needHotPatch",
      o,
    ]);
    const r = new HotFixManager_1.HotFixManager();
    await r.Init(a);
    UE.GameplayStatics.GetPlayerController(a, 0).bShowMouseCursor = !0;
    a = await r.ShowPrivacyProtocolView();
    if (a) {
      await (0, ProcedureUtil_1.whetherRepeatDoOnFailedAsync)(
        async () => {
          return {
            Success:
              await BaseConfigController_1.BaseConfigController.RequestBaseData(
                r,
              ),
          };
        },
        async (e, t) => {
          return (await r.ShowDialog(
            !0,
            "HotFixTipsTitle",
            "GetRemoteConfigFailed",
            "HotFixQuit",
            "HotFixRetry",
            void 0,
          ))
            ? t()
            : (AppUtil_1.AppUtil.QuitGame(),
              await r.WaitFrame(),
              { Success: !0 });
        },
      ),
        ThinkDataLaunchReporter_1.ThinkDataLaunchReporter.InitializeInstance(),
        AppLinks_1.AppLinks.Init(),
        LauncherAudio_1.LauncherAudio.Initialize();
      var a = UE.KuroLauncherLibrary.GetPlatform(),
        c =
          (HotPatchLogReport_1.HotPatchLogReport.ReportLogin(
            HotPatchLogReport_1.LoginLogEventDefine.Update,
            "update_start",
          ),
          new HotPatchLogReport_1.HotPatchLog()),
        c =
          ((c.s_step_id = "start_hot_patch"),
          HotPatchLogReport_1.HotPatchLogReport.Report(c),
          new HotPatchLogReport_1.HotPatchLog()),
        i = { success: !0 },
        _ =
          ((c.s_step_id = "end_hot_patch"),
          new HotPatchLogReport_1.HotPatchLog()),
        p = UE.KuroVariableFunctionLibrary.HasStringValue("back_to_game"),
        n = ((_.s_step_id = "need_hot_patch_logic"), { success: !0 });
      if (((n.info = { NeedHotPatch: o, NeedBackToGame: p }), !o || p)) {
        (n.success = !1),
          (_.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(n)),
          HotPatchLogReport_1.HotPatchLogReport.Report(_),
          (i.info = n.info),
          (c.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(i)),
          HotPatchLogReport_1.HotPatchLogReport.Report(c),
          LauncherLog_1.LauncherLog.Info(
            "应用配置了不需要执行热更流程，直接进入游戏",
            ["NeedHotPatch", o],
            ["NeedBackToGame", p],
          ),
          LanguageUpdateManager_1.LanguageUpdateManager.Init(HotPatch.RSr);
        const P = await HotPatch.hma(a, r, !0);
        return P
          ? (p || (await HotPatch.wSr(r), await HotPatch.BSr(r)),
            r.Destroy(),
            void HotPatch.PSr(!1))
          : void 0;
      }
      (_.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(n)),
        HotPatchLogReport_1.HotPatchLogReport.Report(_);
      let t = void 0;
      (t = new (
        "Android" === a
          ? AndroidHotPatchProcedure_1.AndroidHotPatchProcedure
          : "iOS" === a
            ? IosHotPatchProcedure_1.IosHotPatchProcedure
            : OthersHotPatchProcedure_1.OthersHotPatchProcedure
      )(HotPatch.xSr, r)),
        HotPatchKuroSdk_1.HotPatchKuroSdk.ReportEvent(
          SdkReportData_1.HotPatchReportData.CreateData(
            1,
            new Map([["eventParams", "update_start"]]),
          ),
        );
      o = new HotPatchLogReport_1.HotPatchLog();
      if (
        ((o.s_step_id = "launcher_hp_pre_start"),
        HotPatchLogReport_1.HotPatchLogReport.Report(o),
        await t.Start())
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
        p = new HotPatchLogReport_1.HotPatchLog();
        if (
          ((p.s_step_id = "launcher_hp_get_remote_ver_config"),
          HotPatchLogReport_1.HotPatchLogReport.Report(p),
          await t.GetRemoteVersionConfig())
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
          (n = new HotPatchLogReport_1.HotPatchLog()),
            (_ =
              ((n.s_step_id = "check_app_version"),
              await t.IsAppVersionChange()));
          if (_) {
            LauncherLog_1.LauncherLog.Info(
              "需要更新app",
              ["CurAppVer", UE.KuroLauncherLibrary.GetAppVersion()],
              ["LatestAppVer", RemoteConfig_1.RemoteInfo.Config.PackageVersion],
            );
            const d = { NeedUpdateApp: !0 };
            (n.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(d)),
              HotPatchLogReport_1.HotPatchLogReport.Report(n),
              HotPatchLogReport_1.HotPatchLogReport.ReportLogin(
                HotPatchLogReport_1.LoginLogEventDefine.Update,
                "update_failed",
              ),
              (i.success = !1),
              (i.info = "app need update"),
              (c.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(i)),
              HotPatchLogReport_1.HotPatchLogReport.Report(c),
              HotPatchKuroSdk_1.HotPatchKuroSdk.ReportEvent(
                SdkReportData_1.HotPatchReportData.CreateData(
                  3,
                  new Map([["eventParams", "check_app_version_failed"]]),
                ),
              ),
              await PackageUpdateController_1.PackageUpdateController.TryOpenPackageUpdateTipsView(
                r,
              ),
              void (await r.WaitFrame());
          } else {
            const d = { NeedUpdateApp: !1 };
            (n.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(d)),
              HotPatchKuroSdk_1.HotPatchKuroSdk.ReportEvent(
                SdkReportData_1.HotPatchReportData.CreateData(
                  2,
                  new Map([["eventParams", "check_app_version"]]),
                ),
              );
            (n.s_step_result = LauncherSerialize_1.LauncherJson.Stringify({
              NeedUpdateApp: !1,
            })),
              HotPatchLogReport_1.HotPatchLogReport.Report(n),
              HotPatchKuroSdk_1.HotPatchKuroSdk.ReportEvent(
                SdkReportData_1.HotPatchReportData.CreateData(
                  4,
                  new Map([["eventParams", "update_launcher"]]),
                ),
              );
            (o = new HotPatchLogReport_1.HotPatchLog()),
              (p =
                ((o.s_step_id = "launcher_hp_update_launcher"),
                HotPatchLogReport_1.HotPatchLogReport.Report(o),
                new AppVersionMisc_1.LauncherVersionMisc())),
              (_ =
                (p.Init(HotPatch.RSr),
                new UrlPrefixDownload_1.UrlPrefixDownload())),
              (n = new ResourceUpdate_1.ResourceUpdate(
                HotPatch.RSr,
                _,
                p,
                this.xSr,
              ));
            if (await t.UpdateResource(!1, n)) {
              o = new HotPatchLogReport_1.HotPatchLog();
              if (
                ((o.s_step_id = "launcher_hp_mount_launcher"),
                HotPatchLogReport_1.HotPatchLogReport.Report(o),
                await t.MountPak(n))
              ) {
                HotPatchKuroSdk_1.HotPatchKuroSdk.ReportEvent(
                  SdkReportData_1.HotPatchReportData.CreateData(
                    5,
                    new Map([["eventParams", "update_launcher"]]),
                  ),
                );
                (_ = new HotPatchLogReport_1.HotPatchLog()),
                  (p =
                    ((_.s_step_id = "launcher_hp_wether_reboot_launcher"),
                    HotPatchLogReport_1.HotPatchLogReport.Report(_),
                    n.GetRevertInfo()));
                if (n.GetNeedRemount()) {
                  if (p.NeedRevert) {
                    for (const s of p.Paks) UE.KuroPakMountStatic.UnmountPak(s);
                    for (const H of p.Files)
                      UE.KuroLauncherLibrary.DeleteFile(H);
                  }
                  o = new HotPatchLogReport_1.HotPatchLog();
                  (o.s_step_id = "restart_launcher"),
                    HotPatchLogReport_1.HotPatchLogReport.Report(o),
                    (i.success = !0),
                    (i.info = "restart launcher"),
                    (c.s_step_result =
                      LauncherSerialize_1.LauncherJson.Stringify(i)),
                    HotPatchLogReport_1.HotPatchLogReport.Report(c),
                    LauncherLog_1.LauncherLog.Info(
                      "热更器有更新需要重启，开始重启热更器！",
                    ),
                    HotFixSceneManager_1.HotFixSceneManager.StopHotPatchBgm(),
                    r.Destroy(),
                    UE.KuroSqliteLibrary.CloseAllConnections(),
                    UE.GameplayStatics.OpenLevel(
                      HotPatch.RSr,
                      new UE.FName("/Game/Aki/Map/Launch/Bootstrap"),
                    );
                } else {
                  const P = await HotPatch.hma(a, r);
                  if (P) {
                    var _ = new HotPatchLogReport_1.HotPatchLog(),
                      n =
                        ((_.s_step_id = "launcher_hp_pak_key_update"),
                        HotPatchLogReport_1.HotPatchLogReport.Report(_),
                        PakKeyUpdate_1.PakKeyUpdate.Init(this.xSr),
                        await PakKeyUpdate_1.PakKeyUpdate.CheckPakKey(
                          void 0,
                          void 0,
                        ),
                        new HotPatchLogReport_1.HotPatchLog()),
                      h =
                        ((n.s_step_id = "launcher_hp_update_resource"),
                        HotPatchLogReport_1.HotPatchLogReport.Report(n),
                        new Array()),
                      o = new AppVersionMisc_1.ResourceVersionMisc(),
                      _ =
                        (o.Init(HotPatch.RSr),
                        new UrlPrefixDownload_1.UrlPrefixDownload()),
                      n = new ResourceUpdate_1.ResourceUpdate(
                        HotPatch.RSr,
                        _,
                        o,
                        this.xSr,
                      ),
                      _ =
                        (h.push(n),
                        LanguageUpdateManager_1.LanguageUpdateManager.Init(
                          HotPatch.RSr,
                        ),
                        LanguageUpdateManager_1.LanguageUpdateManager.GetAllLanguagesVersionMisc());
                    for (const l of _) {
                      var e = new UrlPrefixDownload_1.UrlPrefixDownload(),
                        e = new ResourceUpdate_1.ResourceUpdate(
                          HotPatch.RSr,
                          e,
                          l,
                          this.xSr,
                          !l.NeedUpdate(),
                        );
                      h.push(e);
                    }
                    if (
                      (HotPatchKuroSdk_1.HotPatchKuroSdk.ReportEvent(
                        SdkReportData_1.HotPatchReportData.CreateData(
                          4,
                          new Map([["eventParams", "update_voice"]]),
                        ),
                      ),
                      await t.UpdateResource(!0, ...h))
                    ) {
                      HotPatchKuroSdk_1.HotPatchKuroSdk.ReportEvent(
                        SdkReportData_1.HotPatchReportData.CreateData(
                          5,
                          new Map([["eventParams", "update_voice"]]),
                        ),
                      );
                      o = new HotPatchLogReport_1.HotPatchLog();
                      (o.s_step_id = "launcher_hp_pre_complete"),
                        HotPatchLogReport_1.HotPatchLogReport.Report(o),
                        t.PreComplete();
                      let e = void 0;
                      for (const L of h) {
                        var u = L.GetRevertInfo();
                        if (u.NeedRevert)
                          if (e) {
                            for (const g of u.Paks) e.Paks.add(g);
                            for (const R of u.Files) e.Files.add(R);
                          } else e = u;
                      }
                      if (p.NeedRevert)
                        if (e) {
                          for (const w of p.Paks) e.Paks.add(w);
                          for (const f of p.Files) e.Files.add(f);
                        } else e = p;
                      void 0 !== e &&
                        e.NeedRevert &&
                        UE.KuroLauncherLibrary.SetRestartApp(1);
                      n = new HotPatchLogReport_1.HotPatchLog();
                      if (
                        ((n.s_step_id = "launcher_hp_wether_restart_app"),
                        HotPatchLogReport_1.HotPatchLogReport.Report(n),
                        t.NeedRestart(...h) || (void 0 !== e && e.NeedRevert))
                      ) {
                        _ = new HotPatchLogReport_1.HotPatchLog();
                        if (
                          ((_.s_step_id =
                            "need_restart_app_to_complete_update"),
                          HotPatchLogReport_1.HotPatchLogReport.Report(_),
                          (i.success = !0),
                          (i.info = "need restart app to complete update"),
                          (c.s_step_result =
                            LauncherSerialize_1.LauncherJson.Stringify(i)),
                          HotPatchLogReport_1.HotPatchLogReport.Report(c),
                          void 0 !== e && e.NeedRevert)
                        ) {
                          for (const S of e.Paks)
                            UE.KuroPakMountStatic.UnmountPak(S);
                          for (const k of e.Files)
                            UE.KuroLauncherLibrary.DeleteFile(k);
                        }
                        o = UE.KuroLauncherLibrary.NeedRestartApp();
                        return 0 < o
                          ? void (
                              (await r.ShowDialog(
                                !1,
                                "HotFixTipsTitle",
                                1 === o
                                  ? "HotFixRestartToCompleteHotFix"
                                  : "HotFixRestartToRepairFiles",
                                void 0,
                                void 0,
                                "HotFixQuit",
                              )) &&
                              ("iOS" === a || "Windows" === a
                                ? AppUtil_1.AppUtil.QuitGame()
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
                      var p = new HotPatchLogReport_1.HotPatchLog();
                      (p.s_step_id = "launcher_hp_mount_resource"),
                        HotPatchLogReport_1.HotPatchLogReport.Report(p),
                        (await t.MountPak(...h))
                          ? (HotPatchKuroSdk_1.HotPatchKuroSdk.ReportEvent(
                              SdkReportData_1.HotPatchReportData.CreateData(
                                5,
                                new Map([["eventParams", "mount_pak"]]),
                              ),
                            ),
                            ((n =
                              new HotPatchLogReport_1.HotPatchLog()).s_step_id =
                              "launcher_hp_procedure_complete"),
                            HotPatchLogReport_1.HotPatchLogReport.Report(n),
                            await t.Complete(),
                            LauncherLog_1.LauncherLog.Info(
                              "热更流程执行完毕，开始进入游戏场景",
                            ),
                            HotPatchLogReport_1.HotPatchLogReport.ReportLogin(
                              HotPatchLogReport_1.LoginLogEventDefine.Update,
                              "update_success",
                            ),
                            (i.success = !0),
                            (c.s_step_result =
                              LauncherSerialize_1.LauncherJson.Stringify(i)),
                            HotPatchLogReport_1.HotPatchLogReport.Report(c),
                            ((_ =
                              new HotPatchLogReport_1.HotPatchLog()).s_step_id =
                              "launcher_hp_check_driver"),
                            HotPatchLogReport_1.HotPatchLogReport.Report(_),
                            await HotPatch.wSr(r),
                            ((o =
                              new HotPatchLogReport_1.HotPatchLog()).s_step_id =
                              "launcher_hp_compile_shader"),
                            HotPatchLogReport_1.HotPatchLogReport.Report(o),
                            await HotPatch.BSr(r),
                            ((a =
                              new HotPatchLogReport_1.HotPatchLog()).s_step_id =
                              "launcher_hp_close_view"),
                            HotPatchLogReport_1.HotPatchLogReport.Report(a),
                            await r.CloseHotFix(),
                            ((p =
                              new HotPatchLogReport_1.HotPatchLog()).s_step_id =
                              "launcher_hp_call_finish"),
                            HotPatchLogReport_1.HotPatchLogReport.Report(p),
                            HotPatch.PSr(!0),
                            ((n =
                              new HotPatchLogReport_1.HotPatchLog()).s_step_id =
                              "launcher_hp_all_complete"),
                            HotPatchLogReport_1.HotPatchLogReport.Report(n))
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
                            (i.success = !1),
                            (i.info = "mount game resources failed"),
                            (c.s_step_result =
                              LauncherSerialize_1.LauncherJson.Stringify(i)),
                            HotPatchLogReport_1.HotPatchLogReport.Report(c));
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
                        (i.success = !1),
                        (i.info = "update game resources failed"),
                        (c.s_step_result =
                          LauncherSerialize_1.LauncherJson.Stringify(i)),
                        HotPatchLogReport_1.HotPatchLogReport.Report(c);
                  }
                }
              } else
                HotPatchLogReport_1.HotPatchLogReport.ReportLogin(
                  HotPatchLogReport_1.LoginLogEventDefine.Update,
                  "update_failed",
                ),
                  (i.success = !1),
                  (i.info = "mount launcher failed"),
                  (c.s_step_result =
                    LauncherSerialize_1.LauncherJson.Stringify(i)),
                  HotPatchLogReport_1.HotPatchLogReport.Report(c),
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
                (i.success = !1),
                (i.info = "update launcher failed"),
                (c.s_step_result =
                  LauncherSerialize_1.LauncherJson.Stringify(i)),
                HotPatchLogReport_1.HotPatchLogReport.Report(c),
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
            (i.success = !1),
            (i.info = "get remmote version config failed"),
            (c.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(i)),
            HotPatchLogReport_1.HotPatchLogReport.Report(c),
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
          (i.success = !1),
          (i.info = "get local app version failed"),
          (c.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(i)),
          HotPatchLogReport_1.HotPatchLogReport.Report(c),
          HotPatchKuroSdk_1.HotPatchKuroSdk.ReportEvent(
            SdkReportData_1.HotPatchReportData.CreateData(
              3,
              new Map([["eventParams", "update_start_failed"]]),
            ),
          );
    } else AppUtil_1.AppUtil.QuitGame();
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
  static async hma(e, t, a = !1) {
    var o,
      r,
      c = new HotPatchLogReport_1.HotPatchLog(),
      i =
        ((c.s_step_id = "launcher_hp_check_ios_devive_support"),
        { success: !0 });
    return "iOS" !== e
      ? ((i.info = { platform: e, noHotPatchProcedure: a }),
        (c.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(i)),
        HotPatchLogReport_1.HotPatchLogReport.Report(c),
        !0)
      : ((o = new Set()).add("iPad mini4"),
        o.add("iPad Air2"),
        (r =
          UE.KuroRenderingRuntimeBPPluginBPLibrary.GetDeviceProfileBaseProfileName()),
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
            AppUtil_1.AppUtil.QuitGame(),
            await t.WaitFrame(),
            !1)
          : ((c.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(i)),
            HotPatchLogReport_1.HotPatchLogReport.Report(c),
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
    e = UE.BlueprintPathsLibrary.ProjectSavedDir() + "Resources";
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
  (HotPatch.Wpa = new HotFixGameSettingManager_1.HotFixGameSettingManager());
//# sourceMappingURL=HotPatch.js.map
