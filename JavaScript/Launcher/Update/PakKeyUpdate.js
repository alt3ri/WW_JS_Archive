"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PakKeyUpdate = void 0);
const cpp_1 = require("cpp"),
  puerts_1 = require("puerts"),
  UE = require("ue"),
  BaseConfigController_1 = require("../BaseConfig/BaseConfigController"),
  LauncherEnum_1 = require("../Define/LauncherEnum"),
  UrlPrefixDownload_1 = require("../Download/UrlPrefixDownload"),
  UrlPrefixHttpRequest_1 = require("../Download/UrlPrefixHttpRequest"),
  HotPatchLogReport_1 = require("../HotPatchLogReport"),
  RemoteConfig_1 = require("../RemoteConfig"),
  LauncherLog_1 = require("../Util/LauncherLog"),
  PakKeyLogReport_1 = require("./PakKeyLogReport"),
  DOWNLOAD_TRY_COUNT = 3,
  KEYLIST_TRY_COUNT = 3,
  MIN_UPDATE_INTERVAL = 60;
class PakKeyUpdate {
  static Init(e) {
    (PakKeyUpdate.NeedExtPakKeys = UE.KuroPakKeyLibrary.NeedExtPakKeys()),
      (PakKeyUpdate.UpdateCheckInterval =
        UE.KuroPakKeyLibrary.GetUpdateInterval()),
      (PakKeyUpdate.Pt = e.GetPatchSaveDir() + "PakData"),
      (PakKeyUpdate.Rb1 = e.GetPatchSaveDir() + "VideoPakData"),
      UE.KuroPakKeyLibrary.SetLoadCallback(
        (0, puerts_1.toManualReleaseDelegate)(PakKeyUpdate.kM1),
      );
  }
  static Destroy() {
    (0, puerts_1.releaseManualReleaseDelegate)(PakKeyUpdate.kM1),
      UE.KuroPakKeyLibrary.UnbindLoadCallback();
  }
  static $ne(e) {
    (PakKeyUpdate.fIr = !1),
      (PakKeyUpdate.Lo = void 0),
      (PakKeyUpdate.pIr = 0),
      e &&
        void (PakKeyUpdate.pk = 0) !== PakKeyUpdate.vIr &&
        (PakKeyUpdate.vIr(), (PakKeyUpdate.vIr = void 0));
  }
  static async CheckPakKey(e, a) {
    var t, o;
    return PakKeyUpdate.NeedExtPakKeys
      ? ((o =
          (t = 0.001 * cpp_1.KuroTime.GetMilliseconds64()) - PakKeyUpdate.pk),
        0 < PakKeyUpdate.pk && o < MIN_UPDATE_INTERVAL
          ? (LauncherLog_1.LauncherLog.Info("尝试更新过于频繁..."), !1)
          : ((PakKeyUpdate.pk = t),
            PakKeyUpdate.fIr
              ? (LauncherLog_1.LauncherLog.Info("已经在更新中..."), !1)
              : ((PakKeyUpdate.fIr = !0),
                (await PakKeyUpdate.MIr())
                  ? !!(await PakKeyUpdate.TryDownloadFile(e, a)) &&
                    (PakKeyUpdate.$ne(!0), void 0 !== e && e(), !0)
                  : (PakKeyUpdate.$ne(!1), void 0 !== a && a(), !1))))
      : (void 0 !== e && e(), !0);
  }
  static async MIr(e = 0) {
    var a = cpp_1.KuroApplication.IniPlatformNameIncludeEditor(),
      t = (
        LauncherEnum_1.IS_DIFF_PATCH
          ? RemoteConfig_1.RemoteInfo.NewConfig
          : RemoteConfig_1.RemoteInfo.Config
      ).PackageVersion,
      a =
        BaseConfigController_1.BaseConfigController.GetMixUri() +
        `/${a}/KeyList_${t}.json`;
    PakKeyUpdate.pIr++;
    let o = e;
    PakKeyUpdate.pIr > KEYLIST_TRY_COUNT && (o++, (PakKeyUpdate.pIr = 1));
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
    var r = t[e],
      d = r + a,
      t =
        (LauncherLog_1.LauncherLog.Info(
          "开始获取KeyList配置文件",
          ["fullUrl", d],
          ["tryCount", PakKeyUpdate.pIr],
        ),
        new PakKeyLogReport_1.PakKeyLog()),
      e = new Date(),
      e =
        ((t.event_time = e.getTime().toString()),
        (t.s_url_prefix = r),
        (t.s_step_id = "start_download_pak_key_list"),
        (t.i_try_count = PakKeyUpdate.pIr.toString()),
        (t.s_file_name = a),
        HotPatchLogReport_1.HotPatchLogReport.Report(t),
        await (0, UrlPrefixHttpRequest_1.httpRequest)(d));
    if (e.Code < 200 || 206 < e.Code)
      return (
        LauncherLog_1.LauncherLog.Error(
          "获取KeyList配置失败",
          ["reason", e.Result],
          ["errorCode", e.Code],
          ["tryCount", PakKeyUpdate.pIr],
        ),
        (a = new PakKeyLogReport_1.PakKeyLog()),
        (t = new Date()),
        (a.event_time = t.getTime().toString()),
        (a.s_url_prefix = r),
        (a.s_step_id = "end_download_pak_key_list"),
        (a.i_try_count = PakKeyUpdate.pIr.toString()),
        (a.s_step_result = "failed"),
        HotPatchLogReport_1.HotPatchLogReport.Report(a),
        await PakKeyUpdate.MIr(o)
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
      var t = UrlPrefixDownload_1.UrlPrefixSelector.GetAllPrefixList();
      const p = PakKeyUpdate.Lo.Hash;
      var o = PakKeyUpdate.Lo.Random,
        r = PakKeyUpdate.Lo.Key,
        d = cpp_1.KuroApplication.IniPlatformNameIncludeEditor(),
        _ = (
          LauncherEnum_1.IS_DIFF_PATCH
            ? RemoteConfig_1.RemoteInfo.NewConfig
            : RemoteConfig_1.RemoteInfo.Config
        ).PackageVersion,
        d =
          BaseConfigController_1.BaseConfigController.GetMixUri() +
          `/${d}/client_key/${_}/${o}/PakData`;
      if ("" === p && "" === r) return !0;
      if (p === PakKeyUpdate.EIr)
        return (
          LauncherLog_1.LauncherLog.Info("无需更新PakData", ["hash", p]), !0
        );
      LauncherLog_1.LauncherLog.Info("开始下载PakData文件");
      var _ = new PakKeyLogReport_1.PakKeyLog(),
        o = new Date(),
        o =
          ((_.event_time = o.getTime().toString()),
          (_.s_step_id = "start_download_pak_data"),
          (_.s_file_name = d),
          HotPatchLogReport_1.HotPatchLogReport.Report(_),
          new UrlPrefixDownload_1.UrlPrefixDownload()),
        _ = new UrlPrefixDownload_1.RequestFileInfo(),
        d =
          ((_.HashString = p),
          (_.Size = 0n),
          (_.bUseDownloadCache = !1),
          (_.Url = d),
          (_.SavePath = PakKeyUpdate.Pt),
          new Array()),
        _ =
          (d.push(_), await o.RequestFilesWithPrefix(d, t, DOWNLOAD_TRY_COUNT));
      _
        ? (LauncherLog_1.LauncherLog.Info("下载PakData文件完成"),
          (o = new PakKeyLogReport_1.PakKeyLog()),
          (d = new Date()),
          (o.event_time = d.getTime().toString()),
          (o.s_step_id = "end_download_pak_data"),
          (o.s_step_result = "success"),
          HotPatchLogReport_1.HotPatchLogReport.Report(o),
          void 0 !== e && (PakKeyUpdate.vIr = e),
          this.OM1.set(p, (e) => {
            e && (PakKeyUpdate.EIr = p),
              UE.BlueprintPathsLibrary.FileExists(PakKeyUpdate.Pt) &&
                UE.KuroLauncherLibrary.DeleteFile(PakKeyUpdate.Pt),
              LauncherLog_1.LauncherLog.Info("PakData文件数据读取结束~");
            var a = new PakKeyLogReport_1.PakKeyLog(),
              t = new Date();
            (a.event_time = t.getTime().toString()),
              (a.s_step_id = "end_apply_pak_data"),
              (a.s_step_result = e ? "success" : "failed"),
              HotPatchLogReport_1.HotPatchLogReport.Report(a),
              PakKeyUpdate.$ne(!0);
          }),
          UE.KuroPakKeyLibrary.LoadKeys(r, PakKeyUpdate.Pt, p))
        : (LauncherLog_1.LauncherLog.Error("PakData文件下载失败"),
          void 0 !== a && a(),
          (t = new PakKeyLogReport_1.PakKeyLog()),
          (_ = new Date()),
          (t.event_time = _.getTime().toString()),
          (t.s_step_id = "end_download_pak_data"),
          (t.s_step_result = "all_failed"),
          HotPatchLogReport_1.HotPatchLogReport.Report(t));
    }
    return !1;
  }
  static async CheckVideoPakKey(e, a) {
    var t, o;
    return PakKeyUpdate.NeedExtPakKeys
      ? ((o =
          (t = 0.001 * cpp_1.KuroTime.GetMilliseconds64()) - PakKeyUpdate.Lb1),
        0 < PakKeyUpdate.Lb1 && o < MIN_UPDATE_INTERVAL
          ? (LauncherLog_1.LauncherLog.Info("尝试更新过于频繁..."), !1)
          : ((PakKeyUpdate.Lb1 = t),
            PakKeyUpdate.wb1
              ? (LauncherLog_1.LauncherLog.Info("已经在更新中..."), !1)
              : ((PakKeyUpdate.wb1 = !0),
                (await PakKeyUpdate.Ab1())
                  ? !!(await PakKeyUpdate.TryDownloadVideoFile(e, a)) &&
                    (PakKeyUpdate.Pb1(!0), void 0 !== e && e(), !0)
                  : (PakKeyUpdate.Pb1(!1), void 0 !== a && a(), !1))))
      : (void 0 !== e && e(), !0);
  }
  static async Ab1(e = 0) {
    var a = cpp_1.KuroApplication.IniPlatformNameIncludeEditor(),
      a =
        BaseConfigController_1.BaseConfigController.GetMixUri() +
        `/${a}/KeyList.json`;
    PakKeyUpdate.xb1++;
    let t = e;
    PakKeyUpdate.xb1 > KEYLIST_TRY_COUNT && (t++, (PakKeyUpdate.xb1 = 1));
    var o = UrlPrefixDownload_1.UrlPrefixSelector.GetAllPrefixList();
    if (t >= o.length)
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
    var r = o[e],
      d = r + a,
      o =
        (LauncherLog_1.LauncherLog.Info(
          "开始获取KeyList配置文件",
          ["fullUrl", d],
          ["tryCount", PakKeyUpdate.xb1],
        ),
        new PakKeyLogReport_1.PakKeyLog()),
      e = new Date(),
      e =
        ((o.event_time = e.getTime().toString()),
        (o.s_url_prefix = r),
        (o.s_step_id = "start_download_pak_key_list"),
        (o.i_try_count = PakKeyUpdate.xb1.toString()),
        (o.s_file_name = a),
        HotPatchLogReport_1.HotPatchLogReport.Report(o),
        await (0, UrlPrefixHttpRequest_1.httpRequest)(d));
    if (e.Code < 200 || 206 < e.Code)
      return (
        LauncherLog_1.LauncherLog.Error(
          "获取KeyList配置失败",
          ["reason", e.Result],
          ["errorCode", e.Code],
          ["tryCount", PakKeyUpdate.xb1],
        ),
        (a = new PakKeyLogReport_1.PakKeyLog()),
        (o = new Date()),
        (a.event_time = o.getTime().toString()),
        (a.s_url_prefix = r),
        (a.s_step_id = "end_download_pak_key_list"),
        (a.i_try_count = PakKeyUpdate.xb1.toString()),
        (a.s_step_result = "failed"),
        HotPatchLogReport_1.HotPatchLogReport.Report(a),
        await PakKeyUpdate.Ab1(t)
      );
    LauncherLog_1.LauncherLog.Info("获取KeyList配置文件成功");
    (d = new PakKeyLogReport_1.PakKeyLog()),
      (o = new Date()),
      (d.event_time = o.getTime().toString()),
      (d.s_url_prefix = r),
      (d.s_step_id = "end_download_pak_key_list"),
      (d.s_step_result = "success"),
      HotPatchLogReport_1.HotPatchLogReport.Report(d),
      (a = (0, puerts_1.$ref)(void 0));
    return UE.KuroLauncherLibrary.Decrypt(e.Result, a)
      ? ((PakKeyUpdate.Db1 = JSON.parse((0, puerts_1.$unref)(a))), !0)
      : (LauncherLog_1.LauncherLog.Error("解析KeyList配置文件内容失败"), !1);
  }
  static async TryDownloadVideoFile(e, a) {
    if (void 0 !== PakKeyUpdate.Db1) {
      var t = UrlPrefixDownload_1.UrlPrefixSelector.GetAllPrefixList();
      const p = PakKeyUpdate.Db1.Hash;
      var o = PakKeyUpdate.Db1.Random,
        r = PakKeyUpdate.Db1.Key,
        d = cpp_1.KuroApplication.IniPlatformNameIncludeEditor(),
        _ = (
          LauncherEnum_1.IS_DIFF_PATCH
            ? RemoteConfig_1.RemoteInfo.NewConfig
            : RemoteConfig_1.RemoteInfo.Config
        ).PackageVersion,
        d =
          BaseConfigController_1.BaseConfigController.GetMixUri() +
          `/${d}/client_key/${_}/${o}/PakData`;
      if ("" === p && "" === r) return !0;
      if (p === PakKeyUpdate.Ub1)
        return (
          LauncherLog_1.LauncherLog.Info("无需更新VideoPakData", ["hash", p]),
          !0
        );
      LauncherLog_1.LauncherLog.Info("开始下载VideoPakData文件");
      var _ = new PakKeyLogReport_1.PakKeyLog(),
        o = new Date(),
        o =
          ((_.event_time = o.getTime().toString()),
          (_.s_step_id = "start_download_pak_data"),
          (_.s_file_name = d),
          HotPatchLogReport_1.HotPatchLogReport.Report(_),
          new UrlPrefixDownload_1.UrlPrefixDownload()),
        _ = new UrlPrefixDownload_1.RequestFileInfo(),
        d =
          ((_.HashString = p),
          (_.Size = 0n),
          (_.bUseDownloadCache = !1),
          (_.Url = d),
          (_.SavePath = PakKeyUpdate.Rb1),
          new Array()),
        _ =
          (d.push(_), await o.RequestFilesWithPrefix(d, t, DOWNLOAD_TRY_COUNT));
      _
        ? (LauncherLog_1.LauncherLog.Info("下载VideoPakData文件完成"),
          (o = new PakKeyLogReport_1.PakKeyLog()),
          (d = new Date()),
          (o.event_time = d.getTime().toString()),
          (o.s_step_id = "end_download_video_pak_data"),
          (o.s_step_result = "success"),
          HotPatchLogReport_1.HotPatchLogReport.Report(o),
          void 0 !== e && (PakKeyUpdate.vIr = e),
          this.OM1.set(p, (e) => {
            e && (PakKeyUpdate.Ub1 = p),
              UE.BlueprintPathsLibrary.FileExists(PakKeyUpdate.Rb1) &&
                UE.KuroLauncherLibrary.DeleteFile(PakKeyUpdate.Rb1),
              LauncherLog_1.LauncherLog.Info("VideoPakData文件数据读取结束~");
            var a = new PakKeyLogReport_1.PakKeyLog(),
              t = new Date();
            (a.event_time = t.getTime().toString()),
              (a.s_step_id = "end_apply_pak_data"),
              (a.s_step_result = e ? "success" : "failed"),
              HotPatchLogReport_1.HotPatchLogReport.Report(a),
              PakKeyUpdate.Pb1(!0);
          }),
          UE.KuroPakKeyLibrary.LoadKeys(r, PakKeyUpdate.Rb1, p))
        : (LauncherLog_1.LauncherLog.Error("VideoPakData文件下载失败"),
          void 0 !== a && a(),
          (t = new PakKeyLogReport_1.PakKeyLog()),
          (_ = new Date()),
          (t.event_time = _.getTime().toString()),
          (t.s_step_id = "end_download_video_pak_data"),
          (t.s_step_result = "all_failed"),
          HotPatchLogReport_1.HotPatchLogReport.Report(t));
    }
    return !1;
  }
  static Pb1(e) {
    (PakKeyUpdate.wb1 = !1),
      (PakKeyUpdate.Db1 = void 0),
      (PakKeyUpdate.xb1 = 0),
      e &&
        void (PakKeyUpdate.Lb1 = 0) !== PakKeyUpdate.Bb1 &&
        (PakKeyUpdate.Bb1(), (PakKeyUpdate.Bb1 = void 0));
  }
}
(exports.PakKeyUpdate = PakKeyUpdate),
  ((_a = PakKeyUpdate).fIr = !1),
  (PakKeyUpdate.pk = 0),
  (PakKeyUpdate.NeedExtPakKeys = !1),
  (PakKeyUpdate.UpdateCheckInterval = -1),
  (PakKeyUpdate.pIr = 0),
  (PakKeyUpdate.EIr = ""),
  (PakKeyUpdate.Pt = ""),
  (PakKeyUpdate.Lo = void 0),
  (PakKeyUpdate.vIr = void 0),
  (PakKeyUpdate.xb1 = 0),
  (PakKeyUpdate.wb1 = !1),
  (PakKeyUpdate.Lb1 = 0),
  (PakKeyUpdate.Rb1 = ""),
  (PakKeyUpdate.Ub1 = ""),
  (PakKeyUpdate.Db1 = void 0),
  (PakKeyUpdate.Bb1 = void 0),
  (PakKeyUpdate.OM1 = new Map()),
  (PakKeyUpdate.kM1 = (e, a) => {
    _a.OM1.has(a) && (_a.OM1.get(a)(e), _a.OM1.delete(a));
  });
//# sourceMappingURL=PakKeyUpdate.js.map
