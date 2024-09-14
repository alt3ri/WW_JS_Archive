"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LauncherConfigLib = void 0);
const cpp_1 = require("cpp"),
  puerts_1 = require("puerts"),
  UE = require("ue"),
  LauncherLanguageLib_1 = require("../Util/LauncherLanguageLib"),
  LauncherLog_1 = require("../Util/LauncherLog"),
  LauncherMenuConfig_1 = require("./LauncherMenuConfig"),
  LaunchGameSettingMenuConfig_1 = require("./LaunchGameSettingMenuConfig");
class DbInfo {
  constructor(n, e) {
    (this.ConfigDbPath = n), (this.TextDb = e);
  }
}
const DB = "lang_hot_patch.db",
  TABLE = "HotPatchText";
class LauncherConfigLib {
  static Initialize() {
    if (!this.gU) {
      this.gU = !0;
      var n = cpp_1.KuroApplication.ProjectContentDir(),
        i =
          ((LauncherConfigLib.te = n + "Aki/ConfigDB/"),
          LauncherMenuConfig_1.LauncherMenuConfig.GetTableName());
      let e = 0;
      var n = n + "Aki/ConfigDB/aki_base.csv",
        a = UE.KuroStaticLibrary.LoadFileToStringArray(n);
      for (let n = 1; n < a.Num(); n++) {
        var u = a.Get(n).split(",");
        if (
          !(u.length <= 2) &&
          (LauncherConfigLib.aSr ||
            (u[0] === i &&
              ((LauncherConfigLib.aSr = new DbInfo(
                LauncherConfigLib.te + u[1],
                u[2],
              )),
              e++)),
          2 <= e)
        )
          break;
      }
    }
  }
  static GetMenuConfigByFunctionId(n) {
    var e =
        `SELECT * FROM \`${LauncherMenuConfig_1.LauncherMenuConfig.GetTableName()}\` WHERE FunctionId=` +
        n,
      i = new UE.KuroSqliteResultSet();
    if (
      UE.KuroSqliteLibrary.Query(LauncherConfigLib.aSr.ConfigDbPath, e, i) &&
      i.HasValue()
    )
      return (
        (e = LauncherMenuConfig_1.LauncherMenuConfig.Parse(i)), i.Release(), e
      );
    LauncherLog_1.LauncherLog.Error("查询LauncherMenuConfig失败", [
      "functionId",
      n,
    ]);
  }
  static GetGameSettingsMenuConfigByFunctionId(n) {
    var e =
        `SELECT * FROM \`${LaunchGameSettingMenuConfig_1.LaunchGameSettingMenuConfig.GetTableName()}\` WHERE FunctionId=` +
        n,
      i = new UE.KuroSqliteResultSet();
    if (
      UE.KuroSqliteLibrary.Query(LauncherConfigLib.aSr.ConfigDbPath, e, i) &&
      i.HasValue()
    )
      return (
        (e =
          LaunchGameSettingMenuConfig_1.LaunchGameSettingMenuConfig.Parse(i)),
        i.Release(),
        e
      );
    LauncherLog_1.LauncherLog.Error("查询LauncherMenuConfig失败", [
      "functionId",
      n,
    ]);
  }
  static IsLanguageValid(n) {
    var e = `SELECT * FROM \`${LauncherMenuConfig_1.LauncherMenuConfig.GetLanguageTableName()}\` WHERE LanguageCode='${n}'`,
      i = new UE.KuroSqliteResultSet();
    return UE.KuroSqliteLibrary.Query(
      LauncherConfigLib.aSr.ConfigDbPath,
      e,
      i,
    ) && i.HasValue()
      ? ((e = LauncherMenuConfig_1.LauncherMenuConfig.ParseLanguageDefine(i)),
        LauncherLog_1.LauncherLog.Info(
          "读取到的多语言配置",
          ["languageCode", n],
          ["config", e],
        ),
        i.Release(),
        !!e && e.IsShow)
      : (LauncherLog_1.LauncherLog.Error("查询LanguageDefine失败", [
          "languageCode",
          n,
        ]),
        !1);
  }
  static GetHotPatchText(n) {
    if (n) {
      var e = LauncherConfigLib.hSr.get(n);
      if (e) return e;
      var i = `SELECT * FROM \`${TABLE}\` WHERE Id="${n}"`,
        a = new UE.KuroSqliteResultSet(),
        u = UE.KuroSqliteLibrary.Query(LauncherConfigLib.lSr(DB), i, a),
        r = (0, puerts_1.$ref)(void 0);
      if (u && a.HasValue()) {
        if (a.GetString("Content", r))
          return (
            a.Release(),
            (e = (0, puerts_1.$unref)(r)),
            LauncherConfigLib.hSr.set(n, e),
            e
          );
        LauncherLog_1.LauncherLog.Error(
          "获取HotPatchText多语言数据字段失败，没有Content字段",
        );
      } else
        LauncherLog_1.LauncherLog.Error(
          "查询HotPatchText多语言表失败",
          ["textId", n],
          ["DB", LauncherConfigLib.lSr(DB)],
          ["command", i],
        );
    }
  }
  static lSr(n, e = void 0) {
    e =
      (e || LauncherLanguageLib_1.LauncherLanguageLib.GetPackageLanguage()) +
      "/" +
      n;
    return LauncherConfigLib.te + e;
  }
}
((exports.LauncherConfigLib = LauncherConfigLib).te = ""),
  (LauncherConfigLib.aSr = void 0),
  (LauncherConfigLib.hSr = new Map()),
  (LauncherConfigLib.gU = !1);
//# sourceMappingURL=LauncherConfigLib.js.map
