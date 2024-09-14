"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UrlPrefixDownload =
    exports.RequestFileInfo =
    exports.UrlPrefixSelector =
    exports.DOWNLOAD_SUFFIX =
      void 0);
const cpp_1 = require("cpp"),
  puerts_1 = require("puerts"),
  UE = require("ue"),
  BaseConfigController_1 = require("../BaseConfig/BaseConfigController"),
  HotPatchLogReport_1 = require("../HotPatchLogReport"),
  NetworkDefine_1 = require("../NetworkDefine"),
  LauncherLog_1 = require("../Util/LauncherLog"),
  LauncherSerialize_1 = require("../Util/LauncherSerialize"),
  ProcedureUtil_1 = require("../Util/ProcedureUtil"),
  DownloadDefine_1 = require("./DownloadDefine"),
  INLINE_SPEED_RATIO = 0.8,
  INLINE_PRICE_RATIO = 0.2,
  TEST_TIME = 5,
  TIME_OUT = ((exports.DOWNLOAD_SUFFIX = ".download"), 3),
  bigIntZero = 0n,
  bigIntTwoToPowerOfTen = 1024n,
  bigIntKb = bigIntTwoToPowerOfTen;
class UrlPrefixInfo {
  constructor() {
    (this.Address = ""),
      (this.Price = 0),
      (this.OriginOrder = 0),
      (this.EvalPoint = 0),
      (this.IsEvaluated = !1),
      (this.RemainDownloadTime = -0),
      (this.DownloadedSize = void 0),
      (this.Speed = 0);
  }
}
class UrlPrefixSelector {
  static Init() {
    UrlPrefixSelector.mSr ||
      UrlPrefixSelector.CSr(
        UrlPrefixSelector.gSr(),
        void 0 !== BaseConfigController_1.BaseConfigController.GetSpeedRatio()
          ? BaseConfigController_1.BaseConfigController.GetSpeedRatio()
          : INLINE_SPEED_RATIO,
        void 0 !== BaseConfigController_1.BaseConfigController.GetPriceRatio()
          ? BaseConfigController_1.BaseConfigController.GetPriceRatio()
          : INLINE_PRICE_RATIO,
      );
  }
  static gSr() {
    var e = new Map(),
      t = BaseConfigController_1.BaseConfigController.GetCdnUrl();
    if (t)
      for (const i of t) {
        var o = i.url,
          r = i.weight;
        e.set(o, Number(r));
      }
    return e;
  }
  static SetUrl(e, t, o) {
    LauncherLog_1.LauncherLog.Info(
      "设置远程前缀参数",
      ["primary", e],
      ["speedRatio", t],
      ["priceRatio", o],
    );
    var r = new HotPatchLogReport_1.HotPatchLog(),
      i =
        ((r.s_step_id = "set_remote_prefix"),
        (r.s_step_result = e + `|${t}|` + o),
        HotPatchLogReport_1.HotPatchLogReport.Report(r),
        new Map());
    if (e) {
      r = e.trim();
      if ("" !== r)
        for (const a of r.split(";")) {
          var n = a.split(",");
          n.length < 2 || i.set(n[0].trim(), Number(n[1].trim()));
        }
    }
    UrlPrefixSelector.CSr(i, t, o);
  }
  static CSr(t, e, o) {
    if (0 < t.size) {
      UrlPrefixSelector.mSr = new Array();
      let e = 0;
      for (var [r, i] of t) {
        var n = new UrlPrefixInfo();
        (n.Address = r),
          (n.Price = i),
          (n.OriginOrder = e++),
          (n.EvalPoint = 0),
          (n.IsEvaluated = !1),
          (n.RemainDownloadTime = TEST_TIME),
          (n.DownloadedSize = bigIntZero),
          (n.Speed = 0),
          UrlPrefixSelector.mSr.push(n);
      }
      (0, ProcedureUtil_1.randomArray)(UrlPrefixSelector.mSr);
    }
    (UrlPrefixSelector.pSr = e || INLINE_SPEED_RATIO),
      (UrlPrefixSelector.vSr = o || INLINE_PRICE_RATIO);
  }
  static Reset() {
    for (const e of UrlPrefixSelector.mSr)
      (e.DownloadedSize = 0n),
        (e.Speed = 0),
        (e.RemainDownloadTime = TEST_TIME),
        (e.EvalPoint = 0),
        (e.IsEvaluated = !1);
    1 < UrlPrefixSelector.mSr.length &&
      (0, ProcedureUtil_1.randomArray)(UrlPrefixSelector.mSr);
  }
  static Evaluated() {
    if (
      (1 < UrlPrefixSelector.mSr.length &&
        UrlPrefixSelector.mSr.sort((e, t) => t.EvalPoint - e.EvalPoint),
      UrlPrefixSelector.mSr && 0 < UrlPrefixSelector.mSr.length)
    )
      for (const e of UrlPrefixSelector.mSr)
        LauncherLog_1.LauncherLog.Info(
          "整体完成评估",
          ["prefix", e.Address],
          ["size", e.DownloadedSize],
          ["price", e.Price],
          ["point", e.EvalPoint],
        );
  }
  static GetPrimaryPrefixList() {
    return (
      (0, ProcedureUtil_1.randomArray)(UrlPrefixSelector.mSr),
      UrlPrefixSelector.mSr
    );
  }
  static GetAllPrefixList(e = !1) {
    e &&
      1 < UrlPrefixSelector.mSr.length &&
      UrlPrefixSelector.mSr.sort((e, t) => t.EvalPoint - e.EvalPoint);
    var t = new Array();
    for (const o of UrlPrefixSelector.mSr) t.push(o.Address);
    return e || (0, ProcedureUtil_1.randomArray)(t), t;
  }
  static CalculateUrlPoint(e, t) {
    return t * UrlPrefixSelector.pSr - e * UrlPrefixSelector.vSr;
  }
}
exports.UrlPrefixSelector = UrlPrefixSelector;
class RequestFileInfo {
  constructor() {
    (this.FileName = ""),
      (this.Url = ""),
      (this.SavePath = ""),
      (this.Size = void 0),
      (this.HashString = ""),
      (this.bUseDownloadCache = !1);
  }
}
exports.RequestFileInfo = RequestFileInfo;
class UrlPrefixDownload {
  constructor() {
    (this.MSr = void 0), (this.ESr = !1), (this.jSa = !1), (this.SSr = void 0);
  }
  CancelDownload() {
    this.jSa || (this.MSr && this.MSr.Cancel(), (this.ESr = !0));
  }
  async StartEvaluatePrefix(e, t = !1, o = void 0) {
    if (e.length <= 0)
      return {
        Complete: !1,
        FileIndex: 0,
        DownloadState: DownloadDefine_1.EDownloadState.None,
        HttpCode: 0,
      };
    (this.ESr = !1),
      t && (this.SSr = o),
      1 < e.length &&
        e.sort((e, t) => (e.Size < t.Size ? 1 : e.Size > t.Size ? -1 : 0));
    var t = UrlPrefixSelector.GetPrimaryPrefixList(),
      o = new HotPatchLogReport_1.HotPatchLog(),
      r = ((o.s_step_id = "start_prefixes_evaluate"), { success: !0 }),
      i = [];
    for (const d of t) {
      var n = {
        Address: d.Address,
        IsEvaluated: d.IsEvaluated,
        EvalPoint: d.EvalPoint,
        RemainTime: d.RemainDownloadTime,
        DownloadSize: d.DownloadedSize,
        kSpeed: d.Speed,
      };
      i.push(n);
    }
    (r.info = i),
      (o.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(r)),
      HotPatchLogReport_1.HotPatchLogReport.Report(o);
    var o = await this.ySr(t, e),
      a = new HotPatchLogReport_1.HotPatchLog();
    (a.s_step_id = "end_prefixes_evaluate"), (i.length = 0);
    for (const f of t) {
      var l = {
        Address: f.Address,
        IsEvaluated: f.IsEvaluated,
        EvalPoint: f.EvalPoint,
        RemainTime: f.RemainDownloadTime,
        DownloadSize: f.DownloadedSize,
        kSpeed: f.Speed,
        price: f.Price,
      };
      i.push(l);
    }
    return o.Complete
      ? ((r.success = !0),
        (r.info = { msg: "evaluate complete", info: i }),
        (a.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(r)),
        HotPatchLogReport_1.HotPatchLogReport.Report(a),
        UrlPrefixSelector.Evaluated(),
        {
          Complete: !0,
          FileIndex: o.FileIndex,
          DownloadState: o.DownloadState,
          HttpCode: o.HttpCode,
        })
      : (o.FileIndex < e.length
          ? ((r.success = !1),
            (r.info = {
              msg: "evaluate not complete, download neither",
              info: i,
            }),
            (a.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(r)),
            HotPatchLogReport_1.HotPatchLogReport.Report(a),
            LauncherLog_1.LauncherLog.Info("文件未下载完，评估也未完成"))
          : ((r.success = !1),
            (r.info = {
              msg: "evaluate not complete, but download complete",
              info: i,
            }),
            (a.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(r)),
            HotPatchLogReport_1.HotPatchLogReport.Report(a),
            LauncherLog_1.LauncherLog.Info(
              "完成所有文件下载，但是未能完成评估",
            )),
        {
          Complete: !1,
          FileIndex: o.FileIndex,
          DownloadState: o.DownloadState,
          HttpCode: o.HttpCode,
        });
  }
  async RequestFiles(t, e, o, r = void 0, i = !1) {
    if (t.length <= 0)
      return {
        Success: !0,
        DownloadState: DownloadDefine_1.EDownloadState.Success,
        HttpCode: 0,
      };
    (this.ESr = !1),
      e && (UrlPrefixSelector.Init(), UrlPrefixSelector.Reset()),
      (this.SSr = r);
    try {
      let e = 0;
      if (i) {
        var n = await this.StartEvaluatePrefix(t);
        if (!n.Complete)
          return n.FileIndex < t.length
            ? {
                Success: !1,
                DownloadState: n.DownloadState,
                HttpCode: n.HttpCode,
              }
            : {
                Success: !0,
                DownloadState: DownloadDefine_1.EDownloadState.Success,
                HttpCode: 0,
              };
        e = n.FileIndex;
      }
      var a = UrlPrefixSelector.GetAllPrefixList(i),
        l =
          (LauncherLog_1.LauncherLog.Info(
            "已完成评估，开始进入正式下载文件列表",
            ["fileCount", t.length],
            ["fileIndex", e],
            ["prefixCount", a.length],
            ["tryCount", o],
          ),
          await this.ISr(a, t, o, 0, e));
      return (
        LauncherLog_1.LauncherLog.Info("下载文件列表结束", ["success", l]), l
      );
    } catch (e) {
      return (
        e instanceof Error
          ? LauncherLog_1.LauncherLog.ErrorWithStack("请求的文件列表异常", e, [
              "error",
              e.message,
            ])
          : LauncherLog_1.LauncherLog.Error("请求的文件列表异常", ["error", e]),
        {
          Success: !1,
          DownloadState: DownloadDefine_1.EDownloadState.None,
          HttpCode: 0,
        }
      );
    }
  }
  async RequestFilesWithPrefix(e, t, o, r = void 0) {
    if (e.length <= 0) return !0;
    (this.ESr = !1), (this.MSr = new UE.DownloaderProxy()), (this.SSr = r);
    try {
      LauncherLog_1.LauncherLog.Info(
        "开始下载文件列表",
        ["fileCount", e.length],
        ["fileIndex", 0],
        ["prefixCount", t.length],
        ["tryCount", o],
      );
      var i = await this.ISr(t, e, o, 0, 0);
      return (
        LauncherLog_1.LauncherLog.Info("下载文件列表结束", ["success", i]),
        i.Success
      );
    } catch (e) {
      return (
        e instanceof Error
          ? LauncherLog_1.LauncherLog.ErrorWithStack("请求的文件列表异常", e, [
              "error",
              e.message,
            ])
          : LauncherLog_1.LauncherLog.Error("请求的文件列表异常", ["error", e]),
        !1
      );
    }
  }
  async ySr(e, t, o = 0, r = 0) {
    if (e.length <= 1) {
      LauncherLog_1.LauncherLog.Info(
        "只有一个前缀不用评估，直接使用这个唯一的前缀",
        ["prefixCount", e.length],
        ["prefixIndex", o],
        ["fileCount", t.length],
        ["fileIndex", r],
      );
      const s = {
        Complete: !0,
        FileIndex: r,
        DownloadState: DownloadDefine_1.EDownloadState.Success,
        HttpCode: 0,
      };
      return s;
    }
    let i = 0 <= o ? o : 0,
      n = 0 <= r ? r : 0;
    for (var a = e.length; i < a; i++) {
      var l = e[i];
      if (
        (LauncherLog_1.LauncherLog.Info(
          "开始评估前缀列表",
          ["prefixCount", e.length],
          ["prefixIndex", i],
          ["prefix", l.Address],
          ["fileCount", t.length],
          ["fileIndex", n],
        ),
        !l.IsEvaluated)
      ) {
        var d,
          f = new HotPatchLogReport_1.HotPatchLog(),
          c =
            ((f.s_url_prefix = l.Address),
            (f.s_step_id = "evaluate_prefix"),
            await this.TSr(
              l.Address,
              i,
              t,
              n,
              1,
              l.RemainDownloadTime,
              !0,
              l.DownloadedSize,
            ));
        if (
          ((n = c.FileIndex),
          !(c.RemainedTime <= 0 || (c.FileIndex < t.length && !this.ESr)))
        )
          return (
            (l.DownloadedSize = c.DownloadedSize),
            (l.RemainDownloadTime = c.RemainedTime),
            LauncherLog_1.LauncherLog.Info(
              "评估前缀列表，当前前缀评估未完成",
              ["prefixCount", e.length],
              ["prefixIndex", i],
              ["prefix", l.Address],
              ["remainTime", c.RemainedTime],
              ["downloadSize", c.DownloadedSize],
              ["fileCount", t.length],
              ["fileIndex", c.FileIndex],
            ),
            (d = {
              IsComplete: !1,
              RemainTime: l.RemainDownloadTime,
              DownloadSize: l.DownloadedSize,
            }),
            (f.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(d)),
            HotPatchLogReport_1.HotPatchLogReport.Report(f),
            {
              Complete: !1,
              FileIndex: n,
              DownloadState: c.DownloadState,
              HttpCode: c.HttpCode,
            }
          );
        (d = Number(c.DownloadedSize / bigIntKb) / TEST_TIME),
          (l.Speed = d),
          (l.EvalPoint = UrlPrefixSelector.CalculateUrlPoint(l.Price, d)),
          (l.IsEvaluated = !0),
          LauncherLog_1.LauncherLog.Info(
            "评估前缀列表，当前前缀评估已完成，换下一前缀评估",
            ["prefix", l.Address],
            ["point", l.EvalPoint],
            ["fileCount", t.length],
            ["fileIndex", c.FileIndex],
          ),
          (c = {
            IsComplete: !0,
            Point: l.EvalPoint,
            DownloadSize: l.DownloadedSize,
            Speed: l.Speed,
          }),
          (f.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(c)),
          HotPatchLogReport_1.HotPatchLogReport.Report(f);
      }
    }
    LauncherLog_1.LauncherLog.Info(
      "评估前缀列表，使用的下标已超出前缀数组长度，评估完成",
      ["prefixCount", e.length],
      ["prefixIndex", i],
      ["fileCount", t.length],
      ["fileIndex", n],
    );
    const s = {
      Complete: !0,
      FileIndex: n,
      DownloadState: DownloadDefine_1.EDownloadState.Success,
      HttpCode: 0,
    };
    return s;
  }
  async ISr(e, t, o, r = 0, i = 0) {
    if (e.length <= 0)
      return (
        LauncherLog_1.LauncherLog.Error(
          "使用前缀列表下载文件列表出错，传入的前缀数组为空",
          ["prefixCount", e.length],
          ["prefixIndex", r],
          ["fileCount", t.length],
          ["fileIndex", i],
          ["tryCount", o],
        ),
        {
          Success: !1,
          DownloadState: DownloadDefine_1.EDownloadState.None,
          HttpCode: 0,
        }
      );
    let n = 0 <= r ? r : 0,
      a = 0 <= i ? i : 0;
    if (n >= e.length)
      return (
        LauncherLog_1.LauncherLog.Info(
          "使用前缀列表下载文件列表失败，前缀轮询已超出数组长度",
          ["prefixCount", e.length],
          ["prefixIndex", n],
          ["fileCount", t.length],
          ["fileIndex", a],
          ["tryCount", o],
        ),
        {
          Success: !1,
          DownloadState: DownloadDefine_1.EDownloadState.None,
          HttpCode: 0,
        }
      );
    let l = !1,
      d = DownloadDefine_1.EDownloadState.None,
      f = 0;
    for (var c = e.length; n < c; n++) {
      var s = e[n],
        u =
          (LauncherLog_1.LauncherLog.Info(
            "开始使用前缀列表下载文件列表",
            ["prefixCount", e.length],
            ["prefixIndex", n],
            ["prefix", s],
            ["fileCount", t.length],
            ["fileIndex", a],
            ["tryCount", o],
          ),
          await this.TSr(s, n, t, a, o));
      if (((a = u.FileIndex), u.Complete)) {
        LauncherLog_1.LauncherLog.Info(
          "使用前缀列表下载文件列表成功",
          ["prefixCount", e.length],
          ["prefixIndex", n],
          ["prefix", s],
          ["fileCount", t.length],
          ["fileIndex", u.FileIndex],
        ),
          (l = !0);
        break;
      }
      (d = u.DownloadState),
        (f = u.HttpCode),
        LauncherLog_1.LauncherLog.Info(
          "使用前缀列表下载文件列表失败，使用下一个前缀下载",
          ["prefixCount", e.length],
          ["prefixIndex", n + 1],
          ["prefix", s],
          ["fileCount", t.length],
          ["fileIndex", u.FileIndex],
          ["tryCount", o],
        );
    }
    return { Success: l, DownloadState: d, HttpCode: f };
  }
  async TSr(e, t, o, r, i, n = -1, a = !1, l = bigIntZero) {
    if (o.length <= 0) {
      LauncherLog_1.LauncherLog.Info(
        "使用前缀下载文件列表时，该文件列表为空",
        ["urlPrefix", e],
        ["fileCount", o.length],
        ["downloadedSize", l],
      );
      const _ = {
        Complete: !0,
        RemainedTime: n,
        DownloadedSize: l,
        FileIndex: r,
        DownloadState: DownloadDefine_1.EDownloadState.Success,
        HttpCode: 0,
      };
      return _;
    }
    LauncherLog_1.LauncherLog.Info(
      "开始使用前缀下载文件列表",
      ["urlPrefix", e],
      ["fileCount", o.length],
      ["fileIndex", r],
      ["tryCount", i],
      ["tryTime", n],
      ["bLimitTime", a],
      ["downloadedSize", l],
    );
    let d = l,
      f = n,
      c = r;
    for (var s = o.length; c < s; c++) {
      var u = o[c],
        u = await this.LSr(e, t, u, i, f, a);
      if (((d += u.DownloadedSize), (f = u.RemainedTime), !u.Complete))
        return (
          LauncherLog_1.LauncherLog.Info(
            "使用前缀下载文件列表失败，",
            ["urlPrefix", e],
            ["fileCount", o.length],
            ["fileIndex", c],
            ["downloadedSize", d],
          ),
          {
            Complete: !1,
            RemainedTime: u.RemainedTime,
            DownloadedSize: d,
            FileIndex: c,
            DownloadState: u.DownloadState,
            HttpCode: u.HttpCode,
          }
        );
    }
    LauncherLog_1.LauncherLog.Info(
      "使用前缀下载文件列表时，该文件列表已全部下载完成",
      ["urlPrefix", e],
      ["fileCount", o.length],
      ["fileIndex", c],
      ["downloadedSize", d],
    );
    const _ = {
      Complete: !0,
      RemainedTime: f,
      DownloadedSize: d,
      FileIndex: c,
      DownloadState: DownloadDefine_1.EDownloadState.Success,
      HttpCode: 0,
    };
    return _;
  }
  async LSr(o, e, r, i, t, n, a = bigIntZero) {
    if (this.ESr)
      return (
        LauncherLog_1.LauncherLog.Info(
          "使用前缀下载文件，下载被取消",
          ["urlPrefix", o],
          ["file", r.FileName],
          ["tryCount", i],
          ["downloadedSize", a],
        ),
        {
          Complete: !1,
          RemainedTime: t,
          DownloadedSize: a,
          DownloadState: DownloadDefine_1.EDownloadState.DownloadCanceled,
          HttpCode: 0,
        }
      );
    let l = t,
      d = a,
      f = DownloadDefine_1.EDownloadState.None,
      c = 0;
    for (let t = 0; t < i; t++) {
      if (this.ESr)
        return (
          LauncherLog_1.LauncherLog.Info(
            "使用前缀下载文件，下载被取消(for-trycount)",
            ["urlPrefix", o],
            ["file", r.FileName],
            ["tryCount", i],
            ["i", t],
            ["downloadedSize", d],
          ),
          {
            Complete: !1,
            RemainedTime: l,
            DownloadedSize: d,
            DownloadState: DownloadDefine_1.EDownloadState.DownloadCanceled,
            HttpCode: 0,
          }
        );
      if (n && l <= 0)
        return {
          Complete: !1,
          RemainedTime: 0,
          DownloadedSize: d,
          DownloadState: DownloadDefine_1.EDownloadState.DownloadCanceled,
          HttpCode: 0,
        };
      LauncherLog_1.LauncherLog.Info(
        "开始使用前缀下载文件",
        ["urlPrefix", o],
        ["file", r.FileName],
        ["fileSize", r.Size],
        ["tryCount", t],
        ["tryDownloadTime", l],
        ["bLimitTime", n],
        ["downloadedSize", d],
      );
      var s = new HotPatchLogReport_1.HotPatchLog(),
        s =
          ((s.s_url_prefix = o),
          (s.i_try_count = t.toString()),
          (s.s_step_id = "prefix_download_file_start"),
          (s.s_file_name = r.FileName),
          HotPatchLogReport_1.HotPatchLogReport.Report(s),
          new HotPatchLogReport_1.HotPatchLog()),
        u =
          ((s.s_url_prefix = o),
          (s.i_try_count = t.toString()),
          (s.s_step_id = "prefix_download_file_end"),
          (s.s_file_name = r.FileName),
          { success: !0 });
      try {
        (this.MSr = new UE.DownloaderProxy()), (this.jSa = !1);
        var _ = await this.DSr(o, e, n, r, n ? l : -1);
        if (((d += _.DownloadedSize), (l = _.RemainedTime), _.Complete)) {
          LauncherLog_1.LauncherLog.Info(
            "使用前缀下载文件完成",
            ["urlPrefix", o],
            ["file", r.FileName],
            ["fileSize", r.Size],
            ["RemainedTime", l],
            ["bLimitTime", n],
            ["downloadedSize", d],
          ),
            (s.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(u)),
            HotPatchLogReport_1.HotPatchLogReport.Report(s);
          const p = {
            Complete: !0,
            RemainedTime: l,
            DownloadedSize: d,
            DownloadState: _.DownloadState,
            HttpCode: _.HttpCode,
          };
          return p;
        }
        (f = _.DownloadState),
          (c = _.HttpCode),
          LauncherLog_1.LauncherLog.Info(
            "使用前缀下载文件失败",
            ["urlPrefix", o],
            ["file", r.FileName],
            ["fileSize", r.Size],
            ["RemainedTime", l],
            ["bLimitTime", n],
            ["downloadedSize", d],
          ),
          (u.info = { msg: "not complete", info: _ }),
          (u.success = !1),
          (s.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(u)),
          HotPatchLogReport_1.HotPatchLogReport.Report(s);
      } catch (e) {
        e instanceof Error
          ? LauncherLog_1.LauncherLog.ErrorWithStack(
              "使用前缀下载文件出现异常导致下载失败",
              e,
              ["urlPrefix", o],
              ["file", r.FileName],
              ["fileSize", r.Size],
              ["error", e.message],
            )
          : LauncherLog_1.LauncherLog.Error(
              "使用前缀下载文件出现异常导致下载失败",
              ["urlPrefix", o],
              ["file", r.FileName],
              ["fileSize", r.Size],
              ["error", e],
            ),
          (u.info = { msg: "download_exception", info: "" + e }),
          (u.success = !1),
          (s.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(u)),
          HotPatchLogReport_1.HotPatchLogReport.Report(s);
        u = new HotPatchLogReport_1.HotPatchLog();
        (u.s_url_prefix = o),
          (u.i_try_count = t.toString()),
          (u.s_step_id = "download_exception"),
          (u.s_file_name = r.FileName),
          (u.s_step_result = "" + e),
          HotPatchLogReport_1.HotPatchLogReport.Report(u);
      }
    }
    const p = {
      Complete: !1,
      RemainedTime: l,
      DownloadedSize: d,
      DownloadState: f,
      HttpCode: c,
    };
    return p;
  }
  async DSr(x, L, e, w, S) {
    return new Promise((u) => {
      const _ = new Date(),
        p = (e, t, o) => {
          var r;
          this.SSr &&
            ((r = cpp_1.FKuroUtilityForPuerts.IsBuildShipping()
              ? w.HashString
              : w.FileName),
            this.SSr(w.FileName, r, e, t, o));
        },
        h = (e, t) => {
          this.jSa = !0;
          var o = new Date(),
            r = 7 === e,
            i =
              (w.Size && 0n < w.Size && r && p(0n, 0n, w.Size),
              (0, puerts_1.releaseManualReleaseDelegate)(h),
              (0, puerts_1.releaseManualReleaseDelegate)(p),
              this.MSr.UnbindCallback(),
              0 <= S);
          let n = i ? S - this.MSr.GetTotalDownloadTime() : -1,
            a = this.MSr.GetReceivedSize();
          (1 !== e && 4 !== e && 5 !== e) || ((n = S), (a = bigIntZero)),
            w.Size < bigIntZero && (w.Size = this.MSr.GetContentLength()),
            LauncherLog_1.LauncherLog.Info(
              "下载任务结束！不一定完成下载，有可能取消了",
              ["fileName", w.FileName],
              ["requireFileSize", w.Size],
              ["savedSize", this.MSr.GetSavedSize()],
              ["downloadState", e],
              ["downloadStateString", DownloadDefine_1.EDownloadState[e]],
              ["httpState", t],
            );
          var l = this.MSr.GetReceivedSize(),
            d = Number(l / 1024n),
            o = 0.001 * (o.getTime() - _.getTime()),
            f = new HotPatchLogReport_1.HotPatchLog(),
            c =
              ((f.s_url_prefix = x),
              (f.s_file_name = w.FileName),
              (f.s_step_id = "end_download_file"),
              (f.i_download_state = e.toString()),
              UE.KuroLauncherLibrary.GetNetworkConnectionType()),
            s = {
              urlPriority: L,
              isEvalute: i,
              httpCode: t,
              network: "" + NetworkDefine_1.ENetworkType[c],
              end: "down end.",
            },
            s =
              ((f.s_step_result =
                LauncherSerialize_1.LauncherJson.Stringify(s)),
              (f.s_download_speed = (d / o).toFixed(3) + "KB/s"),
              HotPatchLogReport_1.HotPatchLogReport.Report(f),
              new HotPatchLogReport_1.HotPatchLog()),
            f =
              ((s.s_step_id = "hp_download_info"),
              (s.i_download_size = 0n < l ? d : 0),
              (s.f_download_spend = o),
              (s.s_url_prefix = x),
              (s.s_file_name = w.FileName),
              {
                urlPriority: L,
                isBgDownload: !1,
                isEvalute: i,
                httpCode: t,
                network: "" + NetworkDefine_1.ENetworkType[c],
              }),
            l =
              ((s.s_step_result =
                LauncherSerialize_1.LauncherJson.Stringify(f)),
              HotPatchLogReport_1.HotPatchLogReport.Report(s),
              {
                Complete: r,
                RemainedTime: n,
                DownloadedSize: a,
                DownloadState: e,
                HttpCode: t,
              });
          u(l);
        };
      var e = w.SavePath.substr(0, w.SavePath.lastIndexOf("/")),
        t = UE.BlueprintPathsLibrary.DirectoryExists(e),
        e =
          (t || UE.KuroLauncherLibrary.MakeDirectory(e),
          t &&
            w.Size === bigIntZero &&
            UE.BlueprintPathsLibrary.FileExists(
              w.SavePath + exports.DOWNLOAD_SUFFIX,
            ) &&
            (LauncherLog_1.LauncherLog.Info(
              "未知文件大小的，删除之前下载的临时文件",
            ),
            UE.KuroLauncherLibrary.DeleteFile(
              w.SavePath + exports.DOWNLOAD_SUFFIX,
            )),
          new HotPatchLogReport_1.HotPatchLog()),
        t =
          ((e.s_url_prefix = x),
          (e.s_step_id = "start_download_file"),
          (e.s_file_name = w.FileName),
          UE.KuroLauncherLibrary.GetNetworkConnectionType()),
        t = { network: "" + NetworkDefine_1.ENetworkType[t] },
        t =
          ((e.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(t)),
          HotPatchLogReport_1.HotPatchLogReport.Report(e),
          x + w.Url);
      LauncherLog_1.LauncherLog.Info(
        "开始下载",
        ["url", t],
        ["savePath", w.SavePath],
      ),
        this.MSr.SetProgressCallback((0, puerts_1.toManualReleaseDelegate)(p)),
        this.MSr.SetCompleteCallback((0, puerts_1.toManualReleaseDelegate)(h)),
        this.MSr.Start(
          x + w.Url,
          w.SavePath,
          exports.DOWNLOAD_SUFFIX,
          w.Size,
          S,
          !1,
          w.bUseDownloadCache,
          w.HashString,
          TIME_OUT,
        );
    });
  }
}
exports.UrlPrefixDownload = UrlPrefixDownload;
//# sourceMappingURL=UrlPrefixDownload.js.map
