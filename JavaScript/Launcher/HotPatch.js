"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HotPatch = void 0);
const cpp_1 = require("cpp");
const UE = require("ue");
const AppLinks_1 = require("./AppLinks");
const BaseConfigController_1 = require("./BaseConfig/BaseConfigController");
const UrlPrefixDownload_1 = require("./Download/UrlPrefixDownload");
const HotPatchKuroSdk_1 = require("./HotPatchKuroSdk/HotPatchKuroSdk");
const SdkReportData_1 = require("./HotPatchKuroSdk/SdkReportData");
const HotPatchLogReport_1 = require("./HotPatchLogReport");
const AndroidHotPatchProcedure_1 = require("./HotPatchProcedure/AndroidHotPatchProcedure");
const IosHotPatchProcedure_1 = require("./HotPatchProcedure/IosHotPatchProcedure");
const OthersHotPatchProcedure_1 = require("./HotPatchProcedure/OthersHotPatchProcedure");
const HotPatchPushSdk_1 = require("./HotPatchPushSdk/HotPatchPushSdk");
const NetworkDefine_1 = require("./NetworkDefine");
const PackageUpdateController_1 = require("./PackageUpdate/PackageUpdateController");
const RemoteConfig_1 = require("./RemoteConfig");
const ThinkDataLaunchReporter_1 = require("./ThinkDataReport/ThinkDataLaunchReporter");
const HotFixGameSettingManager_1 = require("./Ui/HotFix/HotFixGameSettingManager");
const HotFixManager_1 = require("./Ui/HotFix/HotFixManager");
const HotFixSceneManager_1 = require("./Ui/HotFix/HotFixSceneManager");
const AppPathMisc_1 = require("./Update/AppPathMisc");
const AppUtil_1 = require("./Update/AppUtil");
const AppVersionMisc_1 = require("./Update/AppVersionMisc");
const LanguageUpdateManager_1 = require("./Update/LanguageUpdateManager");
const PakKeyUpdate_1 = require("./Update/PakKeyUpdate");
const ResourceUpdate_1 = require("./Update/ResourceUpdate");
const LauncherAudio_1 = require("./Util/LauncherAudio");
const LauncherLog_1 = require("./Util/LauncherLog");
const ProcedureUtil_1 = require("./Util/ProcedureUtil");
const LauncherSerialize_1 = require("./Util/LauncherSerialize");
class HotPatch {
  static Start(e, t) {
    (HotPatch.PSr = e),
      (HotPatch.xSr = t),
      LauncherLog_1.LauncherLog.Info("初始化Push"),
      HotPatchPushSdk_1.HotPatchPushSdk.StartPush(),
      LauncherLog_1.LauncherLog.Info("结束Push"),
      HotPatchKuroSdk_1.HotPatchKuroSdk.Init(),
      HotPatch.wSr.SetupScene(e),
      HotPatch.xOn.ApplyGameSettings(),
      LauncherLog_1.LauncherLog.Info("播放启动进入镜头(睁开眼睛)"),
      HotPatch.wSr.PlayStartLaunchSeq(),
      HotPatch.wSr.PlayBlackSeq(() => {
        HotPatch.ProcessLine(e).catch((e) => {
          LauncherLog_1.LauncherLog.ErrorWithStack(e.message, e);
        });
      });
  }
  static StartLogin() {
    HotPatch.xSr.MountGamePak(),
      LauncherLog_1.LauncherLog.Info(
        "Game Pak mounted, preloading Blueprint Types.",
      ),
      UE.KuroLauncherLibrary.ReloadShaderLibrary(),
      UE.KuroLauncherLibrary.PreloadRequiredBp(),
      UE.KuroStaticLibrary.IsEditor(HotPatch.xSr) ||
        UE.KismetSystemLibrary.ExecuteConsoleCommand(
          HotPatch.xSr.GetWorld(),
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
  static BSr(e) {
    UE.KismetSystemLibrary.ControlScreensaver(!0),
      (HotPatch.State = 3),
      LauncherLog_1.LauncherLog.Info("热更完成"),
      HotPatch.wSr.Destroy(),
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
      LauncherAudio_1.LauncherAudio.Initialize(),
      HotPatchLogReport_1.HotPatchLogReport.ReportLogin(
        HotPatchLogReport_1.LoginLogEventDefine.Update,
        "update_start",
      );
    var a = new HotPatchLogReport_1.HotPatchLog();
    var a =
      ((a.s_step_id = "start_hot_patch"),
      HotPatchLogReport_1.HotPatchLogReport.Report(a),
      new HotPatchLogReport_1.HotPatchLog());
    const c = { success: !0 };
    const e =
      ((a.s_step_id = "end_hot_patch"), new HotPatchLogReport_1.HotPatchLog());
    if (((e.s_step_id = "need_hot_patch_logic"), o)) {
      (e.s_step_result = "true"),
        HotPatchLogReport_1.HotPatchLogReport.Report(e);
      let t = void 0;
      var o = UE.KuroLauncherLibrary.GetPlatform();
      var _ =
        ((t = new (
          o === "Android"
            ? AndroidHotPatchProcedure_1.AndroidHotPatchProcedure
            : o === "iOS"
              ? IosHotPatchProcedure_1.IosHotPatchProcedure
              : OthersHotPatchProcedure_1.OthersHotPatchProcedure
        )(HotPatch.bSr, r)),
        HotPatchKuroSdk_1.HotPatchKuroSdk.ReportEvent(
          SdkReportData_1.HotPatchReportData.CreateData(
            1,
            new Map([["eventParams", "update_start"]]),
          ),
        ),
        new HotPatchLogReport_1.HotPatchLog());
      if (
        ((_.s_step_id = "launcher_hp_pre_start"),
        HotPatchLogReport_1.HotPatchLogReport.Report(_),
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
        _ = new HotPatchLogReport_1.HotPatchLog();
        if (
          ((_.s_step_id = "launcher_hp_get_remote_ver_config"),
          HotPatchLogReport_1.HotPatchLogReport.Report(_),
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
          var _ = new HotPatchLogReport_1.HotPatchLog();
          var p =
            ((_.s_step_id = "check_app_version"), await t.IsAppVersionChange());
          if (p) {
            LauncherLog_1.LauncherLog.Info(
              "需要更新app",
              ["CurAppVer", UE.KuroLauncherLibrary.GetAppVersion()],
              ["LatestAppVer", RemoteConfig_1.RemoteInfo.Config.PackageVersion],
            );
            const P = { NeedUpdateApp: !0 };
            (_.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(P)),
              HotPatchLogReport_1.HotPatchLogReport.Report(_),
              HotPatchLogReport_1.HotPatchLogReport.ReportLogin(
                HotPatchLogReport_1.LoginLogEventDefine.Update,
                "update_failed",
              ),
              (c.success = !1),
              (c.info = "app need update"),
              (a.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(c)),
              HotPatchLogReport_1.HotPatchLogReport.Report(a),
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
            const P = { NeedUpdateApp: !1 };
            (_.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(P)),
              HotPatchKuroSdk_1.HotPatchKuroSdk.ReportEvent(
                SdkReportData_1.HotPatchReportData.CreateData(
                  2,
                  new Map([["eventParams", "check_app_version"]]),
                ),
              );
            (_.s_step_result = LauncherSerialize_1.LauncherJson.Stringify({
              NeedUpdateApp: !1,
            })),
              HotPatchLogReport_1.HotPatchLogReport.Report(_),
              HotPatchKuroSdk_1.HotPatchKuroSdk.ReportEvent(
                SdkReportData_1.HotPatchReportData.CreateData(
                  4,
                  new Map([["eventParams", "update_launcher"]]),
                ),
              );
            (p = new HotPatchLogReport_1.HotPatchLog()),
              (_ =
                ((p.s_step_id = "launcher_hp_update_launcher"),
                HotPatchLogReport_1.HotPatchLogReport.Report(p),
                new AppVersionMisc_1.LauncherVersionMisc())),
              (p =
                (_.Init(HotPatch.PSr),
                new UrlPrefixDownload_1.UrlPrefixDownload())),
              (p = new ResourceUpdate_1.ResourceUpdate(
                HotPatch.PSr,
                p,
                _,
                this.bSr,
              ));
            if (await t.UpdateResource(!1, p)) {
              _ = new HotPatchLogReport_1.HotPatchLog();
              if (
                ((_.s_step_id = "launcher_hp_mount_launcher"),
                HotPatchLogReport_1.HotPatchLogReport.Report(_),
                await t.MountPak(p))
              ) {
                HotPatchKuroSdk_1.HotPatchKuroSdk.ReportEvent(
                  SdkReportData_1.HotPatchReportData.CreateData(
                    5,
                    new Map([["eventParams", "update_launcher"]]),
                  ),
                );
                (_ = new HotPatchLogReport_1.HotPatchLog()),
                  (_ =
                    ((_.s_step_id = "launcher_hp_wether_reboot_launcher"),
                    HotPatchLogReport_1.HotPatchLogReport.Report(_),
                    p.GetRevertInfo()));
                if (p.GetNeedRemount()) {
                  if (_.NeedRevert) {
                    for (const d of _.Paks) UE.KuroPakMountStatic.UnmountPak(d);
                    for (const s of _.Files)
                      UE.KuroLauncherLibrary.DeleteFile(s);
                  }
                  p = new HotPatchLogReport_1.HotPatchLog();
                  (p.s_step_id = "restart_launcher"),
                    HotPatchLogReport_1.HotPatchLogReport.Report(p),
                    (c.success = !0),
                    (c.info = "restart launcher"),
                    (a.s_step_result =
                      LauncherSerialize_1.LauncherJson.Stringify(c)),
                    HotPatchLogReport_1.HotPatchLogReport.Report(a),
                    LauncherLog_1.LauncherLog.Info(
                      "热更器有更新需要重启，开始重启热更器！",
                    ),
                    HotFixSceneManager_1.HotFixSceneManager.StopHotPatchBgm(),
                    r.Destroy(),
                    UE.KuroSqliteLibrary.CloseAllConnections(),
                    UE.GameplayStatics.OpenLevel(
                      HotPatch.PSr,
                      new UE.FName("/Game/Aki/Map/Launch/Bootstrap"),
                    );
                } else {
                  var p = new HotPatchLogReport_1.HotPatchLog();
                  var p =
                    ((p.s_step_id = "launcher_hp_pak_key_update"),
                    HotPatchLogReport_1.HotPatchLogReport.Report(p),
                    PakKeyUpdate_1.PakKeyUpdate.Init(this.bSr),
                    await PakKeyUpdate_1.PakKeyUpdate.CheckPakKey(
                      void 0,
                      void 0,
                    ),
                    new HotPatchLogReport_1.HotPatchLog());
                  const i =
                    ((p.s_step_id = "launcher_hp_update_resource"),
                    HotPatchLogReport_1.HotPatchLogReport.Report(p),
                    new Array());
                  var p = new AppVersionMisc_1.ResourceVersionMisc();
                  var n =
                    (p.Init(HotPatch.PSr),
                    new UrlPrefixDownload_1.UrlPrefixDownload());
                  var n = new ResourceUpdate_1.ResourceUpdate(
                    HotPatch.PSr,
                    n,
                    p,
                    this.bSr,
                  );
                  var p =
                    (i.push(n),
                    LanguageUpdateManager_1.LanguageUpdateManager.Init(
                      HotPatch.PSr,
                    ),
                    LanguageUpdateManager_1.LanguageUpdateManager.GetAllLanguagesVersionMisc());
                  for (const H of p) {
                    var h = new UrlPrefixDownload_1.UrlPrefixDownload();
                    var h = new ResourceUpdate_1.ResourceUpdate(
                      HotPatch.PSr,
                      h,
                      H,
                      this.bSr,
                      !H.NeedUpdate(),
                    );
                    i.push(h);
                  }
                  if (
                    (HotPatchKuroSdk_1.HotPatchKuroSdk.ReportEvent(
                      SdkReportData_1.HotPatchReportData.CreateData(
                        4,
                        new Map([["eventParams", "update_voice"]]),
                      ),
                    ),
                    await t.UpdateResource(!0, ...i))
                  ) {
                    HotPatchKuroSdk_1.HotPatchKuroSdk.ReportEvent(
                      SdkReportData_1.HotPatchReportData.CreateData(
                        5,
                        new Map([["eventParams", "update_voice"]]),
                      ),
                    );
                    n = new HotPatchLogReport_1.HotPatchLog();
                    (n.s_step_id = "launcher_hp_pre_complete"),
                      HotPatchLogReport_1.HotPatchLogReport.Report(n),
                      t.PreComplete();
                    let e = void 0;
                    for (const l of i) {
                      const u = l.GetRevertInfo();
                      if (u.NeedRevert)
                        if (e) {
                          for (const g of u.Paks) e.Paks.add(g);
                          for (const L of u.Files) e.Files.add(L);
                        } else e = u;
                    }
                    if (_.NeedRevert)
                      if (e) {
                        for (const R of _.Paks) e.Paks.add(R);
                        for (const w of _.Files) e.Files.add(w);
                      } else e = _;
                    void 0 !== e &&
                      e.NeedRevert &&
                      UE.KuroLauncherLibrary.SetRestartApp(1);
                    p = new HotPatchLogReport_1.HotPatchLog();
                    if (
                      ((p.s_step_id = "launcher_hp_wether_restart_app"),
                      HotPatchLogReport_1.HotPatchLogReport.Report(p),
                      t.NeedRestart(...i) || (void 0 !== e && e.NeedRevert))
                    ) {
                      n = new HotPatchLogReport_1.HotPatchLog();
                      if (
                        ((n.s_step_id = "need_restart_app_to_complete_update"),
                        HotPatchLogReport_1.HotPatchLogReport.Report(n),
                        (c.success = !0),
                        (c.info = "need restart app to complete update"),
                        (a.s_step_result =
                          LauncherSerialize_1.LauncherJson.Stringify(c)),
                        HotPatchLogReport_1.HotPatchLogReport.Report(a),
                        void 0 !== e && e.NeedRevert)
                      ) {
                        for (const f of e.Paks)
                          UE.KuroPakMountStatic.UnmountPak(f);
                        for (const k of e.Files)
                          UE.KuroLauncherLibrary.DeleteFile(k);
                      }
                      _ = UE.KuroLauncherLibrary.NeedRestartApp();
                      return _ > 0
                        ? void (
                            (await r.ShowDialog(
                              !1,
                              "HotFixTipsTitle",
                              _ === 1
                                ? "HotFixRestartToCompleteHotFix"
                                : "HotFixRestartToRepairFiles",
                              void 0,
                              void 0,
                              "HotFixQuit",
                            )) &&
                            (o === "iOS" || o === "Windows"
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
                    p = new HotPatchLogReport_1.HotPatchLog();
                    (p.s_step_id = "launcher_hp_mount_resource"),
                      HotPatchLogReport_1.HotPatchLogReport.Report(p),
                      (await t.MountPak(...i))
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
                          (c.success = !0),
                          (a.s_step_result =
                            LauncherSerialize_1.LauncherJson.Stringify(c)),
                          HotPatchLogReport_1.HotPatchLogReport.Report(a),
                          ((_ =
                            new HotPatchLogReport_1.HotPatchLog()).s_step_id =
                            "launcher_hp_check_driver"),
                          HotPatchLogReport_1.HotPatchLogReport.Report(_),
                          await HotPatch.qSr(r),
                          ((o =
                            new HotPatchLogReport_1.HotPatchLog()).s_step_id =
                            "launcher_hp_compile_shader"),
                          HotPatchLogReport_1.HotPatchLogReport.Report(o),
                          await HotPatch.GSr(r),
                          ((p =
                            new HotPatchLogReport_1.HotPatchLog()).s_step_id =
                            "launcher_hp_close_view"),
                          HotPatchLogReport_1.HotPatchLogReport.Report(p),
                          await r.CloseHotFix(),
                          ((n =
                            new HotPatchLogReport_1.HotPatchLog()).s_step_id =
                            "launcher_hp_call_finish"),
                          HotPatchLogReport_1.HotPatchLogReport.Report(n),
                          HotPatch.BSr(!0),
                          ((_ =
                            new HotPatchLogReport_1.HotPatchLog()).s_step_id =
                            "launcher_hp_all_complete"),
                          HotPatchLogReport_1.HotPatchLogReport.Report(_))
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
                          (c.success = !1),
                          (c.info = "mount game resources failed"),
                          (a.s_step_result =
                            LauncherSerialize_1.LauncherJson.Stringify(c)),
                          HotPatchLogReport_1.HotPatchLogReport.Report(a));
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
                      (c.success = !1),
                      (c.info = "update game resources failed"),
                      (a.s_step_result =
                        LauncherSerialize_1.LauncherJson.Stringify(c)),
                      HotPatchLogReport_1.HotPatchLogReport.Report(a);
                }
              } else
                HotPatchLogReport_1.HotPatchLogReport.ReportLogin(
                  HotPatchLogReport_1.LoginLogEventDefine.Update,
                  "update_failed",
                ),
                  (c.success = !1),
                  (c.info = "mount launcher failed"),
                  (a.s_step_result =
                    LauncherSerialize_1.LauncherJson.Stringify(c)),
                  HotPatchLogReport_1.HotPatchLogReport.Report(a),
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
                (c.success = !1),
                (c.info = "update launcher failed"),
                (a.s_step_result =
                  LauncherSerialize_1.LauncherJson.Stringify(c)),
                HotPatchLogReport_1.HotPatchLogReport.Report(a),
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
            (c.success = !1),
            (c.info = "get remmote version config failed"),
            (a.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(c)),
            HotPatchLogReport_1.HotPatchLogReport.Report(a),
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
          (c.success = !1),
          (c.info = "get local app version failed"),
          (a.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(c)),
          HotPatchLogReport_1.HotPatchLogReport.Report(a),
          HotPatchKuroSdk_1.HotPatchKuroSdk.ReportEvent(
            SdkReportData_1.HotPatchReportData.CreateData(
              3,
              new Map([["eventParams", "update_start_failed"]]),
            ),
          );
    } else
      (e.s_step_result = "false"),
        HotPatchLogReport_1.HotPatchLogReport.Report(e),
        (c.success = !0),
        (c.info = "not need hot patch logic"),
        (a.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(c)),
        HotPatchLogReport_1.HotPatchLogReport.Report(a),
        LauncherLog_1.LauncherLog.Info(
          "应用配置了不需要执行热更流程，直接进入游戏",
        ),
        LanguageUpdateManager_1.LanguageUpdateManager.Init(HotPatch.PSr),
        await HotPatch.qSr(r),
        await HotPatch.GSr(r),
        r.Destroy(),
        HotPatch.BSr(!1);
  }
  static NSr(e, t) {
    let a = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetRHIDeviceName();
    if (t && !a.includes("Adreno")) return e;
    (t = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetRHIDriverVersion()),
      (a = t.split("V@"));
    let o = "";
    let r = e;
    e = (o = a.length > 1 ? a[1] : o).match(/\d+/g);
    return (
      e && e.length > 0 && (r = parseInt(e[0])),
      LauncherLog_1.LauncherLog.Info(
        "",
        ["DriverVersion", t],
        ["glVersion", r],
      ),
      r
    );
  }
  static async qSr(e) {
    let t;
    UE.KuroLauncherLibrary.GetPlatform() === "Android" &&
      (t = HotPatch.NSr(-1, !1)) > 0 &&
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
  static async GSr(e) {
    UE.KuroLauncherLibrary.ResumeCompileShader();
    let t = UE.KuroLauncherLibrary.GetRemainPrecompileShaders();
    if (t <= 0)
      LauncherLog_1.LauncherLog.Info("precompile shaders remain <= 0", [
        "remain",
        t,
      ]);
    else {
      const a = UE.KuroLauncherLibrary.GetTotalPrecompileShaders();
      if (a < t)
        LauncherLog_1.LauncherLog.Error(
          "precompile shaders total < remain.",
          ["remain", t],
          ["total", a],
        );
      else {
        const o = new HotPatchLogReport_1.HotPatchLog();
        let r =
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
          t > 0;

        ) {
          const c = (a - t) / a;
          const _ = (100 * c).toFixed(0) + "%";
          LauncherLog_1.LauncherLog.Debug(
            "precompile shaders progress.",
            ["remain", t],
            ["total", a],
            ["rate", c],
            ["percent", _],
          ),
            await e.UpdateProgress(!0, c, "CompilingShader", _),
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
    let e = new HotPatchLogReport_1.HotPatchLog();
    (e.s_step_id = "clear_patch_resources"),
      HotPatchLogReport_1.HotPatchLogReport.Report(e),
      new AppVersionMisc_1.LauncherVersionMisc().ClearAllPatchVersion(
        HotPatch.PSr,
      );
    new AppVersionMisc_1.ResourceVersionMisc().ClearAllPatchVersion(
      HotPatch.PSr,
    ),
      LanguageUpdateManager_1.LanguageUpdateManager.Init(HotPatch.PSr);
    e =
      LanguageUpdateManager_1.LanguageUpdateManager.GetAllLanguagesVersionMisc();
    for (const t of e) t.ClearAllPatchVersion(HotPatch.PSr);
    UE.KuroPakMountStatic.UnmountAllPaks();
    e = UE.BlueprintPathsLibrary.ProjectSavedDir() + "Resources";
    UE.KuroLauncherLibrary.DeleteDirectory(e),
      AppLinks_1.AppLinks.Destroy(),
      LauncherAudio_1.LauncherAudio.Destroy(),
      cpp_1.UKuroAnimJsSubsystem.UnregisterUpdateAnimInfoFunction(HotPatch.xSr),
      UE.KuroSqliteLibrary.CloseAllConnections(),
      UE.KuroPrepareStatementLib.CloseAllConnection(),
      UE.KuroLauncherLibrary.ReloadShaderLibrary(),
      HotFixSceneManager_1.HotFixSceneManager.StopHotPatchBgm(),
      UE.GameplayStatics.OpenLevel(
        HotPatch.PSr,
        new UE.FName("/Game/Aki/Map/Launch/Bootstrap"),
      );
  }
}
((exports.HotPatch = HotPatch).State = 0),
  (HotPatch.bSr = new AppPathMisc_1.AppPathMisc()),
  (HotPatch.wSr = new HotFixSceneManager_1.HotFixSceneManager()),
  (HotPatch.xOn = new HotFixGameSettingManager_1.HotFixGameSettingManager());
// # sourceMappingURL=HotPatch.js.map
