"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LauncherConfigLib = void 0);
const cpp_1 = require("cpp");
const puerts_1 = require("puerts");
const UE = require("ue");
const LauncherLanguageLib_1 = require("../Util/LauncherLanguageLib");
const LauncherLog_1 = require("../Util/LauncherLog");
const LauncherMenuConfig_1 = require("./LauncherMenuConfig");
class DbInfo {
  constructor(e, n) {
    (this.ConfigDbPath = e), (this.TextDb = n);
  }
}
const DB = "lang_hot_patch.db";
const TABLE = "HotPatchText";
class LauncherConfigLib {
  static Initialize() {
    if (!this.gU) {
      this.gU = !0;
      var e = cpp_1.KuroApplication.ProjectContentDir();
      const i =
        ((LauncherConfigLib.te = e + "Aki/ConfigDB/"),
        LauncherMenuConfig_1.LauncherMenuConfig.GetTableName());
      let n = 0;
      var e = e + "Aki/ConfigDB/aki_base.csv";
      const a = UE.KuroStaticLibrary.LoadFileToStringArray(e);
      for (let e = 1; e < a.Num(); e++) {
        const r = a.Get(e).split(",");
        if (
          !(r.length <= 2) &&
          (LauncherConfigLib._Sr ||
            (r[0] === i &&
              ((LauncherConfigLib._Sr = new DbInfo(
                LauncherConfigLib.te + r[1],
                r[2],
              )),
              n++)),
          n >= 2)
        )
          break;
      }
    }
  }
  static GetMenuConfigByFunctionId(e) {
    let n =
      `SELECT FunctionId, OptionsDefault FROM \`${LauncherMenuConfig_1.LauncherMenuConfig.GetTableName()}\` WHERE FunctionId=` +
      e;
    const i = new UE.KuroSqliteResultSet();
    if (
      UE.KuroSqliteLibrary.Query(LauncherConfigLib._Sr.ConfigDbPath, n, i) &&
      i.HasValue()
    )
      return (
        (n = LauncherMenuConfig_1.LauncherMenuConfig.Parse(i)), i.Release(), n
      );
    LauncherLog_1.LauncherLog.Error("查询LauncherMenuConfig失败", [
      "functionId",
      e,
    ]);
  }
  static IsLanguageValid(e) {
    let n = `SELECT * FROM \`${LauncherMenuConfig_1.LauncherMenuConfig.GetLanguageTableName()}\` WHERE LanguageCode='${e}'`;
    const i = new UE.KuroSqliteResultSet();
    return UE.KuroSqliteLibrary.Query(
      LauncherConfigLib._Sr.ConfigDbPath,
      n,
      i,
    ) && i.HasValue()
      ? ((n = LauncherMenuConfig_1.LauncherMenuConfig.ParseLanguageDefine(i)),
        LauncherLog_1.LauncherLog.Info(
          "读取到的多语言配置",
          ["languageCode", e],
          ["config", n],
        ),
        i.Release(),
        !!n && n.IsShow)
      : (LauncherLog_1.LauncherLog.Error("查询LanguageDefine失败", [
          "languageCode",
          e,
        ]),
        !1);
  }
  static GetHotPatchText(e) {
    if (e) {
      let n = LauncherConfigLib.uSr.get(e);
      if (n) return n;
      const i = `SELECT * FROM \`${TABLE}\` WHERE Id="${e}"`;
      const a = new UE.KuroSqliteResultSet();
      const r = UE.KuroSqliteLibrary.Query(LauncherConfigLib.cSr(DB), i, a);
      const u = (0, puerts_1.$ref)(void 0);
      if (r && a.HasValue()) {
        if (a.GetString("Content", u))
          return (
            a.Release(),
            (n = (0, puerts_1.$unref)(u)),
            LauncherConfigLib.uSr.set(e, n),
            n
          );
        LauncherLog_1.LauncherLog.Error(
          "获取HotPatchText多语言数据字段失败，没有Content字段",
        );
      } else
        LauncherLog_1.LauncherLog.Error(
          "查询HotPatchText多语言表失败",
          ["textId", e],
          ["DB", LauncherConfigLib.cSr(DB)],
          ["command", i],
        );
    }
  }
  static cSr(e, n = void 0) {
    n =
      (n || LauncherLanguageLib_1.LauncherLanguageLib.GetPackageLanguage()) +
      "/" +
      e;
    return LauncherConfigLib.te + n;
  }
}
((exports.LauncherConfigLib = LauncherConfigLib).te = ""),
  (LauncherConfigLib._Sr = void 0),
  (LauncherConfigLib.uSr = new Map()),
  (LauncherConfigLib.gU = !1);
// # sourceMappingURL=LauncherConfigLib.js.map
