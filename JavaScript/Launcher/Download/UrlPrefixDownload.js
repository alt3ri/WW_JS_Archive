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
      o = BaseConfigController_1.BaseConfigController.GetCdnUrl();
    if (o)
      for (const i of o) {
        var t = i.url,
          r = i.weight;
        e.set(t, Number(r));
      }
    return e;
  }
  static SetUrl(e, o, t) {
    LauncherLog_1.LauncherLog.Info(
      "设置远程前缀参数",
      ["primary", e],
      ["speedRatio", o],
      ["priceRatio", t],
    );
    var r = new HotPatchLogReport_1.HotPatchLog(),
      i =
        ((r.s_step_id = "set_remote_prefix"),
        (r.s_step_result = e + `|${o}|` + t),
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
    UrlPrefixSelector.CSr(i, o, t);
  }
  static CSr(o, e, t) {
    if (0 < o.size) {
      UrlPrefixSelector.mSr = new Array();
      let e = 0;
      for (var [r, i] of o) {
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
      (UrlPrefixSelector.vSr = t || INLINE_PRICE_RATIO);
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
        UrlPrefixSelector.mSr.sort((e, o) => o.EvalPoint - e.EvalPoint),
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
      UrlPrefixSelector.mSr.sort((e, o) => o.EvalPoint - e.EvalPoint);
    var o = new Array();
    for (const t of UrlPrefixSelector.mSr) o.push(t.Address);
    return e || (0, ProcedureUtil_1.randomArray)(o), o;
  }
  static CalculateUrlPoint(e, o) {
    return o * UrlPrefixSelector.pSr - e * UrlPrefixSelector.vSr;
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
    (this.MSr = void 0), (this.ESr = !1), (this.QSa = !1), (this.SSr = void 0);
  }
  CancelDownload() {
    this.QSa || (this.MSr && this.MSr.Cancel(), (this.ESr = !0));
  }
  async StartEvaluatePrefix(e, o = !1, t = void 0) {
    if (e.length <= 0)
      return {
        Complete: !1,
        FileIndex: 0,
        DownloadState: DownloadDefine_1.EDownloadState.None,
        HttpCode: 0,
      };
    (this.ESr = !1),
      o && (this.SSr = t),
      1 < e.length &&
        e.sort((e, o) => (e.Size < o.Size ? 1 : e.Size > o.Size ? -1 : 0));
    var o = UrlPrefixSelector.GetPrimaryPrefixList(),
      t = new HotPatchLogReport_1.HotPatchLog(),
      r = ((t.s_step_id = "start_prefixes_evaluate"), { success: !0 }),
      i = [];
    for (const d of o) {
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
      (t.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(r)),
      HotPatchLogReport_1.HotPatchLogReport.Report(t);
    var t = await this.ySr(o, e),
      a = new HotPatchLogReport_1.HotPatchLog();
    (a.s_step_id = "end_prefixes_evaluate"), (i.length = 0);
    for (const f of o) {
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
    return t.Complete
      ? ((r.success = !0),
        (r.info = { msg: "evaluate complete", info: i }),
        (a.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(r)),
        HotPatchLogReport_1.HotPatchLogReport.Report(a),
        UrlPrefixSelector.Evaluated(),
        {
          Complete: !0,
          FileIndex: t.FileIndex,
          DownloadState: t.DownloadState,
          HttpCode: t.HttpCode,
        })
      : (t.FileIndex < e.length
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
          FileIndex: t.FileIndex,
          DownloadState: t.DownloadState,
          HttpCode: t.HttpCode,
        });
  }
  async RequestFiles(o, e, t, r = void 0, i = !1) {
    if (o.length <= 0)
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
        var n = await this.StartEvaluatePrefix(o);
        if (!n.Complete)
          return n.FileIndex < o.length
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
            ["fileCount", o.length],
            ["fileIndex", e],
            ["prefixCount", a.length],
            ["tryCount", t],
          ),
          await this.ISr(a, o, t, 0, e));
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
  async RequestFilesWithPrefix(e, o, t, r = void 0) {
    if (e.length <= 0) return !0;
    (this.ESr = !1), (this.MSr = new UE.DownloaderProxy()), (this.SSr = r);
    try {
      LauncherLog_1.LauncherLog.Info(
        "开始下载文件列表",
        ["fileCount", e.length],
        ["fileIndex", 0],
        ["prefixCount", o.length],
        ["tryCount", t],
      );
      var i = await this.ISr(o, e, t, 0, 0);
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
  async ySr(e, o, t = 0, r = 0) {
    if (e.length <= 1) {
      LauncherLog_1.LauncherLog.Info(
        "只有一个前缀不用评估，直接使用这个唯一的前缀",
        ["prefixCount", e.length],
        ["prefixIndex", t],
        ["fileCount", o.length],
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
    let i = 0 <= t ? t : 0,
      n = 0 <= r ? r : 0;
    for (var a = e.length; i < a; i++) {
      var l = e[i];
      if (
        (LauncherLog_1.LauncherLog.Info(
          "开始评估前缀列表",
          ["prefixCount", e.length],
          ["prefixIndex", i],
          ["prefix", l.Address],
          ["fileCount", o.length],
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
              o,
              n,
              1,
              l.RemainDownloadTime,
              !0,
              l.DownloadedSize,
            ));
        if (
          ((n = c.FileIndex),
          !(c.RemainedTime <= 0 || (c.FileIndex < o.length && !this.ESr)))
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
              ["fileCount", o.length],
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
        (d =
          c.SpendTime <= 0
            ? 0
            : Number(c.DownloadedSize / bigIntKb) / c.SpendTime),
          (l.Speed = d),
          (l.EvalPoint = UrlPrefixSelector.CalculateUrlPoint(l.Price, d)),
          (l.IsEvaluated = !0),
          LauncherLog_1.LauncherLog.Info(
            "评估前缀列表，当前前缀评估已完成，换下一前缀评估",
            ["prefix", l.Address],
            ["point", l.EvalPoint],
            ["fileCount", o.length],
            ["fileIndex", c.FileIndex],
            ["downSize", c.DownloadedSize],
            ["spendTime", c.SpendTime],
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
      ["fileCount", o.length],
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
  async ISr(e, o, t, r = 0, i = 0) {
    if (e.length <= 0)
      return (
        LauncherLog_1.LauncherLog.Error(
          "使用前缀列表下载文件列表出错，传入的前缀数组为空",
          ["prefixCount", e.length],
          ["prefixIndex", r],
          ["fileCount", o.length],
          ["fileIndex", i],
          ["tryCount", t],
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
          ["fileCount", o.length],
          ["fileIndex", a],
          ["tryCount", t],
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
            ["fileCount", o.length],
            ["fileIndex", a],
            ["tryCount", t],
          ),
          await this.TSr(s, n, o, a, t));
      if (((a = u.FileIndex), u.Complete)) {
        LauncherLog_1.LauncherLog.Info(
          "使用前缀列表下载文件列表成功",
          ["prefixCount", e.length],
          ["prefixIndex", n],
          ["prefix", s],
          ["fileCount", o.length],
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
          ["fileCount", o.length],
          ["fileIndex", u.FileIndex],
          ["tryCount", t],
        );
    }
    return { Success: l, DownloadState: d, HttpCode: f };
  }
  async TSr(e, o, t, r, i, n = -1, a = !1, l = bigIntZero) {
    if (t.length <= 0) {
      LauncherLog_1.LauncherLog.Info(
        "使用前缀下载文件列表时，该文件列表为空",
        ["urlPrefix", e],
        ["fileCount", t.length],
        ["downloadedSize", l],
      );
      const p = {
        Complete: !0,
        SpendTime: 0,
        RemainedTime: n,
        DownloadedSize: l,
        FileIndex: r,
        DownloadState: DownloadDefine_1.EDownloadState.Success,
        HttpCode: 0,
      };
      return p;
    }
    LauncherLog_1.LauncherLog.Info(
      "开始使用前缀下载文件列表",
      ["urlPrefix", e],
      ["fileCount", t.length],
      ["fileIndex", r],
      ["tryCount", i],
      ["tryTime", n],
      ["bLimitTime", a],
      ["downloadedSize", l],
    );
    let d = 0,
      f = l,
      c = n,
      s = r;
    for (var u = t.length; s < u; s++) {
      var _ = t[s],
        _ = await this.LSr(e, o, _, i, c, a);
      if (
        ((f += _.DownloadedSize),
        (c = _.RemainedTime),
        (d += _.SpendTime),
        !_.Complete)
      )
        return (
          LauncherLog_1.LauncherLog.Info(
            "使用前缀下载文件列表失败，",
            ["urlPrefix", e],
            ["fileCount", t.length],
            ["fileIndex", s],
            ["downloadedSize", f],
          ),
          {
            Complete: !1,
            SpendTime: d,
            RemainedTime: _.RemainedTime,
            DownloadedSize: f,
            FileIndex: s,
            DownloadState: _.DownloadState,
            HttpCode: _.HttpCode,
          }
        );
    }
    LauncherLog_1.LauncherLog.Info(
      "使用前缀下载文件列表时，该文件列表已全部下载完成",
      ["urlPrefix", e],
      ["fileCount", t.length],
      ["fileIndex", s],
      ["downloadedSize", f],
    );
    const p = {
      Complete: !0,
      SpendTime: d,
      RemainedTime: c,
      DownloadedSize: f,
      FileIndex: s,
      DownloadState: DownloadDefine_1.EDownloadState.Success,
      HttpCode: 0,
    };
    return p;
  }
  async LSr(t, e, r, i, o, n, a = bigIntZero) {
    if (this.ESr)
      return (
        LauncherLog_1.LauncherLog.Info(
          "使用前缀下载文件，下载被取消",
          ["urlPrefix", t],
          ["file", r.FileName],
          ["tryCount", i],
          ["downloadedSize", a],
        ),
        {
          Complete: !1,
          SpendTime: 0,
          RemainedTime: o,
          DownloadedSize: a,
          DownloadState: DownloadDefine_1.EDownloadState.DownloadCanceled,
          HttpCode: 0,
        }
      );
    let l = o,
      d = 0,
      f = a,
      c = DownloadDefine_1.EDownloadState.None,
      s = 0;
    for (let o = 0; o < i; o++) {
      if (this.ESr)
        return (
          LauncherLog_1.LauncherLog.Info(
            "使用前缀下载文件，下载被取消(for-trycount)",
            ["urlPrefix", t],
            ["file", r.FileName],
            ["tryCount", i],
            ["i", o],
            ["downloadedSize", f],
          ),
          {
            Complete: !1,
            SpendTime: d,
            RemainedTime: l,
            DownloadedSize: f,
            DownloadState: DownloadDefine_1.EDownloadState.DownloadCanceled,
            HttpCode: 0,
          }
        );
      if (n && l <= 0)
        return {
          Complete: !1,
          SpendTime: d,
          RemainedTime: 0,
          DownloadedSize: f,
          DownloadState: DownloadDefine_1.EDownloadState.DownloadCanceled,
          HttpCode: 0,
        };
      LauncherLog_1.LauncherLog.Info(
        "开始使用前缀下载文件",
        ["urlPrefix", t],
        ["file", r.FileName],
        ["fileSize", r.Size],
        ["tryCount", o],
        ["tryDownloadTime", l],
        ["bLimitTime", n],
        ["downloadedSize", f],
      );
      var u = new HotPatchLogReport_1.HotPatchLog(),
        u =
          ((u.s_url_prefix = t),
          (u.i_try_count = o.toString()),
          (u.s_step_id = "prefix_download_file_start"),
          (u.s_file_name = r.FileName),
          HotPatchLogReport_1.HotPatchLogReport.Report(u),
          new HotPatchLogReport_1.HotPatchLog()),
        _ =
          ((u.s_url_prefix = t),
          (u.i_try_count = o.toString()),
          (u.s_step_id = "prefix_download_file_end"),
          (u.s_file_name = r.FileName),
          { success: !0 });
      try {
        (this.MSr = new UE.DownloaderProxy()), (this.QSa = !1);
        var p = await this.DSr(t, e, n, r, n ? l : -1);
        if (
          ((f += p.DownloadedSize),
          (d += p.SpendTime),
          (l = p.RemainedTime),
          p.Complete)
        ) {
          LauncherLog_1.LauncherLog.Info(
            "使用前缀下载文件完成",
            ["urlPrefix", t],
            ["file", r.FileName],
            ["fileSize", r.Size],
            ["RemainedTime", l],
            ["bLimitTime", n],
            ["downloadedSize", f],
          ),
            (u.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(_)),
            HotPatchLogReport_1.HotPatchLogReport.Report(u);
          const h = {
            Complete: !0,
            SpendTime: d,
            RemainedTime: l,
            DownloadedSize: f,
            DownloadState: p.DownloadState,
            HttpCode: p.HttpCode,
          };
          return h;
        }
        (c = p.DownloadState),
          (s = p.HttpCode),
          LauncherLog_1.LauncherLog.Info(
            "使用前缀下载文件失败",
            ["urlPrefix", t],
            ["file", r.FileName],
            ["fileSize", r.Size],
            ["RemainedTime", l],
            ["bLimitTime", n],
            ["downloadedSize", f],
          ),
          (_.info = { msg: "not complete", info: p }),
          (_.success = !1),
          (u.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(_)),
          HotPatchLogReport_1.HotPatchLogReport.Report(u);
      } catch (e) {
        e instanceof Error
          ? LauncherLog_1.LauncherLog.ErrorWithStack(
              "使用前缀下载文件出现异常导致下载失败",
              e,
              ["urlPrefix", t],
              ["file", r.FileName],
              ["fileSize", r.Size],
              ["error", e.message],
            )
          : LauncherLog_1.LauncherLog.Error(
              "使用前缀下载文件出现异常导致下载失败",
              ["urlPrefix", t],
              ["file", r.FileName],
              ["fileSize", r.Size],
              ["error", e],
            ),
          (_.info = { msg: "download_exception", info: "" + e }),
          (_.success = !1),
          (u.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(_)),
          HotPatchLogReport_1.HotPatchLogReport.Report(u);
        _ = new HotPatchLogReport_1.HotPatchLog();
        (_.s_url_prefix = t),
          (_.i_try_count = o.toString()),
          (_.s_step_id = "download_exception"),
          (_.s_file_name = r.FileName),
          (_.s_step_result = "" + e),
          HotPatchLogReport_1.HotPatchLogReport.Report(_);
      }
    }
    const h = {
      Complete: !1,
      SpendTime: d,
      RemainedTime: l,
      DownloadedSize: f,
      DownloadState: c,
      HttpCode: s,
    };
    return h;
  }
  async DSr(L, S, e, w, P) {
    return new Promise((_) => {
      const p = new Date(),
        h = (e, o, t) => {
          var r;
          this.SSr &&
            ((r = cpp_1.KuroApplication.IsBuildShipping()
              ? w.HashString
              : w.FileName),
            this.SSr(w.FileName, r, e, o, t));
        },
        x = (e, o) => {
          this.QSa = !0;
          var t = new Date(),
            r = 7 === e,
            i =
              (w.Size && 0n < w.Size && r && h(0n, 0n, w.Size),
              (0, puerts_1.releaseManualReleaseDelegate)(x),
              (0, puerts_1.releaseManualReleaseDelegate)(h),
              this.MSr.UnbindCallback(),
              0 <= P),
            n =
              0 < this.MSr.GetTotalDownloadTime()
                ? this.MSr.GetTotalDownloadTime()
                : 0;
          let a = i ? P - n : -1,
            l = this.MSr.GetReceivedSize();
          (1 !== e && 4 !== e && 5 !== e) || ((a = P), (l = bigIntZero)),
            w.Size < bigIntZero && (w.Size = this.MSr.GetContentLength()),
            LauncherLog_1.LauncherLog.Info(
              "下载任务结束！不一定完成下载，有可能取消了",
              ["fileName", w.FileName],
              ["requireFileSize", w.Size],
              ["savedSize", this.MSr.GetSavedSize()],
              ["downloadState", e],
              ["downloadStateString", DownloadDefine_1.EDownloadState[e]],
              ["httpState", o],
            );
          var d = this.MSr.GetReceivedSize(),
            f = Number(d / 1024n),
            t = 0.001 * (t.getTime() - p.getTime()),
            c = new HotPatchLogReport_1.HotPatchLog(),
            s =
              ((c.s_url_prefix = L),
              (c.s_file_name = w.FileName),
              (c.s_step_id = "end_download_file"),
              (c.i_download_state = e.toString()),
              UE.KuroLauncherLibrary.GetNetworkConnectionType()),
            u = {
              urlPriority: S,
              isEvalute: i,
              httpCode: o,
              network: "" + NetworkDefine_1.ENetworkType[s],
              end: "down end.",
            },
            u =
              ((c.s_step_result =
                LauncherSerialize_1.LauncherJson.Stringify(u)),
              (c.s_download_speed = (f / t).toFixed(3) + "KB/s"),
              HotPatchLogReport_1.HotPatchLogReport.Report(c),
              new HotPatchLogReport_1.HotPatchLog()),
            c =
              ((u.s_step_id = "hp_download_info"),
              (u.i_download_size = 0n < d ? f : 0),
              (u.f_download_spend = t),
              (u.s_url_prefix = L),
              (u.s_file_name = w.FileName),
              {
                urlPriority: S,
                isBgDownload: !1,
                isEvalute: i,
                httpCode: o,
                network: "" + NetworkDefine_1.ENetworkType[s],
              }),
            d =
              ((u.s_step_result =
                LauncherSerialize_1.LauncherJson.Stringify(c)),
              HotPatchLogReport_1.HotPatchLogReport.Report(u),
              {
                Complete: r,
                SpendTime: n,
                RemainedTime: a,
                DownloadedSize: l,
                DownloadState: e,
                HttpCode: o,
              });
          _(d);
        };
      var e = w.SavePath.substr(0, w.SavePath.lastIndexOf("/")),
        o = UE.BlueprintPathsLibrary.DirectoryExists(e),
        e =
          (o || UE.KuroLauncherLibrary.MakeDirectory(e),
          o &&
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
        o =
          ((e.s_url_prefix = L),
          (e.s_step_id = "start_download_file"),
          (e.s_file_name = w.FileName),
          UE.KuroLauncherLibrary.GetNetworkConnectionType()),
        o = { network: "" + NetworkDefine_1.ENetworkType[o] },
        o =
          ((e.s_step_result = LauncherSerialize_1.LauncherJson.Stringify(o)),
          HotPatchLogReport_1.HotPatchLogReport.Report(e),
          L + w.Url);
      LauncherLog_1.LauncherLog.Info(
        "开始下载",
        ["url", o],
        ["savePath", w.SavePath],
      ),
        this.MSr.SetProgressCallback((0, puerts_1.toManualReleaseDelegate)(h)),
        this.MSr.SetCompleteCallback((0, puerts_1.toManualReleaseDelegate)(x)),
        this.MSr.Start(
          L + w.Url,
          w.SavePath,
          exports.DOWNLOAD_SUFFIX,
          w.Size,
          P,
          !1,
          w.bUseDownloadCache,
          w.HashString,
          TIME_OUT,
          BaseConfigController_1.BaseConfigController.IsUseNewHttpTimer(),
        );
    });
  }
}
exports.UrlPrefixDownload = UrlPrefixDownload;
//# sourceMappingURL=UrlPrefixDownload.js.map
