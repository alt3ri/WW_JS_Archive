"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PakKeyUpdate = void 0);
const cpp_1 = require("cpp");
const puerts_1 = require("puerts");
const UE = require("ue");
const BaseConfigController_1 = require("../BaseConfig/BaseConfigController");
const UrlPrefixDownload_1 = require("../Download/UrlPrefixDownload");
const UrlPrefixHttpRequest_1 = require("../Download/UrlPrefixHttpRequest");
const HotPatchLogReport_1 = require("../HotPatchLogReport");
const RemoteConfig_1 = require("../RemoteConfig");
const LauncherLog_1 = require("../Util/LauncherLog");
const PakKeyLogReport_1 = require("./PakKeyLogReport");
const DOWNLOAD_TRY_COUNT = 3;
const KEYLIST_TRY_COUNT = 3;
const MIN_UPDATE_INTERVAL = 60;
class PakKeyUpdate {
  static Init(e) {
    (PakKeyUpdate.NeedExtPakKeys = UE.KuroPakKeyLibrary.NeedExtPakKeys()),
      (PakKeyUpdate.UpdateCheckInterval =
        UE.KuroPakKeyLibrary.GetUpdateInterval()),
      (PakKeyUpdate.Pt = e.GetPatchSaveDir() + "PakData");
  }
  static $ne(e) {
    (PakKeyUpdate.Myr = !1),
      (PakKeyUpdate.Lo = void 0),
      (PakKeyUpdate.Syr = 0),
      e &&
        void (PakKeyUpdate.pk = 0) !== PakKeyUpdate.Eyr &&
        (PakKeyUpdate.Eyr(), (PakKeyUpdate.Eyr = void 0));
  }
  static async CheckPakKey(e, a) {
    let t, o;
    return PakKeyUpdate.NeedExtPakKeys
      ? ((o =
          (t = 0.001 * cpp_1.KuroTime.GetMilliseconds64()) - PakKeyUpdate.pk),
        PakKeyUpdate.pk > 0 && o < MIN_UPDATE_INTERVAL
          ? (LauncherLog_1.LauncherLog.Info("尝试更新过于频繁..."), !1)
          : ((PakKeyUpdate.pk = t),
            PakKeyUpdate.Myr
              ? (LauncherLog_1.LauncherLog.Info("已经在更新中..."), !1)
              : ((PakKeyUpdate.Myr = !0),
                (await PakKeyUpdate.yyr())
                  ? !!(await PakKeyUpdate.TryDownloadFile(e, a)) &&
                    (PakKeyUpdate.$ne(!0), void 0 !== e && e(), !0)
                  : (PakKeyUpdate.$ne(!1), void 0 !== a && a(), !1))))
      : (void 0 !== e && e(), !0);
  }
  static async yyr(e = 0) {
    var a = UE.KuroLauncherLibrary.GetPlatform();
    var t = RemoteConfig_1.RemoteInfo.Config.PackageVersion;
    var a =
      BaseConfigController_1.BaseConfigController.GetMixUri() +
      `/${a}/KeyList_${t}.json`;
    PakKeyUpdate.Syr++;
    let o = e;
    PakKeyUpdate.Syr > KEYLIST_TRY_COUNT && (o++, (PakKeyUpdate.Syr = 1));
    t = UrlPrefixDownload_1.UrlPrefixSelector.GetAllPrefixList();
    if (o >= t.length)
      return (
        LauncherLog_1.LauncherLog.Error(
          "KeyList配置文件url前缀获取失败!无法下载KeyList配置!",
        ),
        (d = new PakKeyLogReport_1.PakKeyLog()),
        (r = new Date()),
        (d.event_time = r.getTime().toString()),
        (d.s_step_id = "end_download_pak_key_list"),
        (d.s_step_result = "all_failed"),
        HotPatchLogReport_1.HotPatchLogReport.Report(d),
        !1
      );
    var r = t[e];
    var d = r + a;
    var t =
      (LauncherLog_1.LauncherLog.Info(
        "开始获取KeyList配置文件",
        ["fullUrl", d],
        ["tryCount", PakKeyUpdate.Syr],
      ),
      new PakKeyLogReport_1.PakKeyLog());
    var e = new Date();
    var e =
      ((t.event_time = e.getTime().toString()),
      (t.s_url_prefix = r),
      (t.s_step_id = "start_download_pak_key_list"),
      (t.i_try_count = PakKeyUpdate.Syr.toString()),
      (t.s_file_name = a),
      HotPatchLogReport_1.HotPatchLogReport.Report(t),
      await (0, UrlPrefixHttpRequest_1.httpRequest)(d));
    if (e.Code < 200 || e.Code > 206)
      return (
        LauncherLog_1.LauncherLog.Error(
          "获取KeyList配置失败",
          ["reason", e.Result],
          ["errorCode", e.Code],
          ["tryCount", PakKeyUpdate.Syr],
        ),
        (a = new PakKeyLogReport_1.PakKeyLog()),
        (t = new Date()),
        (a.event_time = t.getTime().toString()),
        (a.s_url_prefix = r),
        (a.s_step_id = "end_download_pak_key_list"),
        (a.i_try_count = PakKeyUpdate.Syr.toString()),
        (a.s_step_result = "failed"),
        HotPatchLogReport_1.HotPatchLogReport.Report(a),
        await PakKeyUpdate.yyr(o)
      );
    LauncherLog_1.LauncherLog.Info("获取KeyList配置文件成功");
    (d = new PakKeyLogReport_1.PakKeyLog()),
      (t = new Date()),
      (d.event_time = t.getTime().toString()),
      (d.s_url_prefix = r),
      (d.s_step_id = "end_download_pak_key_list"),
      (d.s_step_result = "success"),
      HotPatchLogReport_1.HotPatchLogReport.Report(d),
      (a = (0, puerts_1.$ref)(void 0));
    return UE.KuroLauncherLibrary.Decrypt(e.Result, a)
      ? ((PakKeyUpdate.Lo = JSON.parse((0, puerts_1.$unref)(a))), !0)
      : (LauncherLog_1.LauncherLog.Error("解析KeyList配置文件内容失败"), !1);
  }
  static async TryDownloadFile(e, a) {
    if (void 0 !== PakKeyUpdate.Lo) {
      let t = UrlPrefixDownload_1.UrlPrefixSelector.GetAllPrefixList();
      const _ = PakKeyUpdate.Lo.Hash;
      let o = PakKeyUpdate.Lo.Random;
      const r = PakKeyUpdate.Lo.Key;
      var d = UE.KuroLauncherLibrary.GetPlatform();
      let p = RemoteConfig_1.RemoteInfo.Config.PackageVersion;
      var d =
        BaseConfigController_1.BaseConfigController.GetMixUri() +
        `/${d}/client_key/${p}/${o}/PakData`;
      if (_ === "" && r === "") return !0;
      if (_ === PakKeyUpdate.Iyr)
        return (
          LauncherLog_1.LauncherLog.Info("无需更新PakData", ["hash", _]), !0
        );
      LauncherLog_1.LauncherLog.Info("开始下载PakData文件");
      (p = new PakKeyLogReport_1.PakKeyLog()),
        (o = new Date()),
        (o =
          ((p.event_time = o.getTime().toString()),
          (p.s_step_id = "start_download_pak_data"),
          (p.s_file_name = d),
          HotPatchLogReport_1.HotPatchLogReport.Report(p),
          new UrlPrefixDownload_1.UrlPrefixDownload())),
        (p = new UrlPrefixDownload_1.RequestFileInfo()),
        (d =
          ((p.HashString = _),
          (p.Size = 0n),
          (p.bUseDownloadCache = !1),
          (p.Url = d),
          (p.SavePath = PakKeyUpdate.Pt),
          new Array())),
        (p =
          (d.push(p),
          await o.RequestFilesWithPrefix(d, t, DOWNLOAD_TRY_COUNT)));
      if (p) {
        const n = (e) => {
          (0, puerts_1.releaseManualReleaseDelegate)(n),
            UE.KuroPakKeyLibrary.UnbindCallback(),
            e && (PakKeyUpdate.Iyr = _),
            UE.BlueprintPathsLibrary.FileExists(PakKeyUpdate.Pt) &&
              UE.KuroLauncherLibrary.DeleteFile(PakKeyUpdate.Pt),
            LauncherLog_1.LauncherLog.Info("PakData文件数据读取结束~");
          const a = new PakKeyLogReport_1.PakKeyLog();
          const t = new Date();
          (a.event_time = t.getTime().toString()),
            (a.s_step_id = "end_apply_pak_data"),
            (a.s_step_result = e ? "success" : "failed"),
            HotPatchLogReport_1.HotPatchLogReport.Report(a),
            PakKeyUpdate.$ne(!0);
        };
        LauncherLog_1.LauncherLog.Info("下载PakData文件完成");
        (o = new PakKeyLogReport_1.PakKeyLog()), (d = new Date());
        (o.event_time = d.getTime().toString()),
          (o.s_step_id = "end_download_pak_data"),
          (o.s_step_result = "success"),
          HotPatchLogReport_1.HotPatchLogReport.Report(o),
          void 0 !== e && (PakKeyUpdate.Eyr = e),
          UE.KuroPakKeyLibrary.SetRSAPublicKey(r),
          UE.KuroPakKeyLibrary.SetCompleteCallback(
            (0, puerts_1.toManualReleaseDelegate)(n),
          ),
          UE.KuroPakKeyLibrary.LoadPakKeysFromFile(PakKeyUpdate.Pt);
      } else {
        LauncherLog_1.LauncherLog.Error("PakData文件下载失败"),
          void 0 !== a && a();
        (t = new PakKeyLogReport_1.PakKeyLog()), (p = new Date());
        (t.event_time = p.getTime().toString()),
          (t.s_step_id = "end_download_pak_data"),
          (t.s_step_result = "all_failed"),
          HotPatchLogReport_1.HotPatchLogReport.Report(t);
      }
    }
    return !1;
  }
}
((exports.PakKeyUpdate = PakKeyUpdate).Myr = !1),
  (PakKeyUpdate.pk = 0),
  (PakKeyUpdate.NeedExtPakKeys = !1),
  (PakKeyUpdate.UpdateCheckInterval = -1),
  (PakKeyUpdate.Syr = 0),
  (PakKeyUpdate.Iyr = ""),
  (PakKeyUpdate.Pt = ""),
  (PakKeyUpdate.Lo = void 0),
  (PakKeyUpdate.Eyr = void 0);
// # sourceMappingURL=PakKeyUpdate.js.map
