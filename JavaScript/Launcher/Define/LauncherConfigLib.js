"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LauncherConfigLib = void 0);
const cpp_1 = require("cpp"),
  puerts_1 = require("puerts"),
  UE = require("ue"),
  LauncherLanguageLib_1 = require("../Util/LauncherLanguageLib"),
  LauncherLog_1 = require("../Util/LauncherLog"),
  LauncherDownLoadConfig_1 = require("./LauncherDownLoadConfig"),
  LauncherMenuConfig_1 = require("./LauncherMenuConfig"),
  LauncherServerLimitConfig_1 = require("./LauncherServerLimitConfig"),
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
          LauncherMenuConfig_1.LauncherMenuConfig.GetTableName()),
        r =
          LauncherServerLimitConfig_1.LauncherServerLimitConfig.GetTableName(),
        L = LauncherDownLoadConfig_1.LauncherDownLoadConfig.GetTableName();
      let e = 0;
      var n = n + "Aki/ConfigDB/aki_base.csv",
        a = UE.KuroStaticLibrary.LoadFileToStringArray(n);
      for (let n = 1; n < a.Num(); n++) {
        var o = a.Get(n).split(",");
        if (
          !(o.length <= 2) &&
          (LauncherConfigLib.aSr ||
            (o[0] === i &&
              ((LauncherConfigLib.aSr = new DbInfo(
                LauncherConfigLib.te + o[1],
                o[2],
              )),
              e++)),
          LauncherConfigLib.Qic ||
            (o[0] === r &&
              ((LauncherConfigLib.Qic = new DbInfo(
                LauncherConfigLib.te + o[1],
                o[2],
              )),
              e++)),
          LauncherConfigLib.Cb1 ||
            (o[0] === L &&
              ((LauncherConfigLib.Cb1 = new DbInfo(
                LauncherConfigLib.te + o[1],
                o[2],
              )),
              e++)),
          3 <= e)
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
  static GetServerLimitConfig(n) {
    var e =
        `SELECT * FROM \`${LauncherServerLimitConfig_1.LauncherServerLimitConfig.GetTableName()}\` WHERE Id=` +
        n,
      i = new UE.KuroSqliteResultSet();
    if (
      UE.KuroSqliteLibrary.Query(LauncherConfigLib.Qic.ConfigDbPath, e, i) &&
      i.HasValue()
    )
      return (
        (e = LauncherServerLimitConfig_1.LauncherServerLimitConfig.Parse(i)),
        i.Release(),
        e
      );
    LauncherLog_1.LauncherLog.Error("查询LauncherServerLimitConfig失败", [
      "regionId",
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
        r = new UE.KuroSqliteResultSet(),
        L = UE.KuroSqliteLibrary.Query(LauncherConfigLib.lSr(DB), i, r),
        a = (0, puerts_1.$ref)(void 0);
      if (L && r.HasValue()) {
        if (r.GetString("Content", a))
          return (
            r.Release(),
            (e = (0, puerts_1.$unref)(a)),
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
  static GetDownLoadTabConfig(n) {
    var e =
        `SELECT * FROM \`${LauncherDownLoadConfig_1.LauncherDownLoadConfig.GetTableName()}\` WHERE Id=` +
        n,
      i = new UE.KuroSqliteResultSet();
    if (
      UE.KuroSqliteLibrary.Query(LauncherConfigLib.Cb1.ConfigDbPath, e, i) &&
      i.HasValue()
    )
      return (
        (e = LauncherDownLoadConfig_1.LauncherDownLoadConfig.Parse(i)),
        LauncherLog_1.LauncherLog.Info(
          "GetDownLoadTabConfig",
          ["config.Id", n],
          ["config", e],
          ["rs.IsValid();", i.IsValid()],
        ),
        i.Release(),
        e
      );
    LauncherLog_1.LauncherLog.Error("查询LauncherDownLoadConfig失败", [
      "regionId",
      n,
    ]);
  }
}
((exports.LauncherConfigLib = LauncherConfigLib).te = ""),
  (LauncherConfigLib.aSr = void 0),
  (LauncherConfigLib.Qic = void 0),
  (LauncherConfigLib.Cb1 = void 0),
  (LauncherConfigLib.hSr = new Map()),
  (LauncherConfigLib.gU = !1);
//# sourceMappingURL=LauncherConfigLib.js.map
