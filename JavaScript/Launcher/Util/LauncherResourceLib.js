"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LauncherResourceLib = void 0);
const UE = require("ue"),
  LauncherLog_1 = require("./LauncherLog");
class LauncherResourceLib {
  static Initialize() {
    this.gU ||
      ((this.gU = !0),
      (LauncherResourceLib._Ke = new Map()),
      (LauncherResourceLib.Xyr = new UE.KuroResourceManager()),
      LauncherResourceLib.Xyr.LoadResourceDelegate.Bind((e) => {
        LauncherResourceLib.KY(e);
      }));
  }
  static Load(e, L, r = 0) {
    let c = void 0;
    if (LauncherResourceLib.Xyr && LauncherResourceLib.Xyr.IsValid()) {
      if (LauncherResourceLib.rJ(e)) {
        var u = LauncherResourceLib.pJo++,
          r = LauncherResourceLib.Xyr.LoadAsyncWithId(e, u, r);
        if (-1 === r)
          LauncherLog_1.LauncherLog.Error(
            "LauncherResourceLib.Load()传入的handleId重复！",
            ["handleId", u],
          );
        else {
          L = L ? L.StaticClass() : void 0;
          if (L)
            if (L.IsValid()) {
              if (1 === r) return (c = LauncherResourceLib.Ed(e, u, L));
              LauncherResourceLib.Xyr.WaitComplete(u, 0)
                ? (c = LauncherResourceLib.Ed(e, u, L))
                : LauncherLog_1.LauncherLog.Error(
                    "LauncherResourceLib.Load()加载资源失败！",
                    ["Path", e],
                  );
            } else
              LauncherLog_1.LauncherLog.Error(
                "LauncherResourceLib.Load()传入的目标类型无效",
              );
          else
            LauncherLog_1.LauncherLog.Error(
              "LauncherResourceLib.Load()传入的目标类型为空",
            );
        }
      }
    } else
      LauncherLog_1.LauncherLog.Error(
        "LauncherResourceLib尚未初始化，就使用了Load接口！",
      );
    return c;
  }
  static LoadAsync(L, r, c, e = 0) {
    let u = -1;
    if (LauncherResourceLib.Xyr && LauncherResourceLib.Xyr.IsValid()) {
      if (LauncherResourceLib.rJ(L)) {
        const o = (e, L) => {
          try {
            c(e, L);
          } catch (e) {
            e instanceof Error
              ? LauncherLog_1.LauncherLog.ErrorWithStack(
                  "资源加载回调方法执行异常",
                  e,
                  ["路径", L],
                  ["错误", e.message],
                )
              : LauncherLog_1.LauncherLog.Error(
                  "资源加载回调方法执行异常",
                  ["路径", L],
                  ["错误", e],
                );
          }
        };
        var a = () => {
            var e = r ? r.StaticClass() : void 0;
            e
              ? e.IsValid()
                ? ((e = LauncherResourceLib.Ed(L, u, e)), o(e, L))
                : (LauncherLog_1.LauncherLog.Error(
                    "LauncherResourceLib.Load()传入的目标类型无效",
                  ),
                  o(void 0, L))
              : (LauncherLog_1.LauncherLog.Error(
                  "LauncherResourceLib.Load()传入的目标类型为空",
                ),
                o(void 0, L));
          },
          e =
            ((u = LauncherResourceLib.pJo++),
            LauncherResourceLib.Xyr.LoadAsyncWithId(L, u, e));
        1 === e ? a() : this._Ke.set(u, a);
      }
    } else
      LauncherLog_1.LauncherLog.Error(
        "LauncherResourceLib尚未初始化，就使用了Load接口！",
      );
    return u;
  }
  static Ed(e, L, r) {
    var c = LauncherResourceLib.Xyr.GetAsset(L);
    if ((LauncherResourceLib.Xyr.Release(L), c))
      if (c.IsValid()) {
        if (c.IsA(r)) return c;
        LauncherLog_1.LauncherLog.Error(
          "LauncherResourceLib.Load()加载到的资源与传入类型不匹配",
          ["path", e],
          ["assetType", c.GetClass().GetName()],
          ["desireType", r.GetName()],
        );
      } else
        LauncherLog_1.LauncherLog.Error(
          "LauncherResourceLib.Load()加载到的资源无效",
          ["path", e],
        );
    else
      LauncherLog_1.LauncherLog.Error(
        "LauncherResourceLib.Load()加载到的资源为空",
        ["path", e],
      );
  }
  static rJ(e) {
    return e
      ? 0 === e.length
        ? (LauncherLog_1.LauncherLog.Error("路径长度为零", ["路径", e]), !1)
        : !!e.startsWith("/") ||
          (LauncherLog_1.LauncherLog.Error("传入资源路径不符合规范", [
            "路径",
            e,
          ]),
          !1)
      : (LauncherLog_1.LauncherLog.Error("路径为空"), !1);
  }
  static KY(e) {
    var L = LauncherResourceLib._Ke.get(e);
    L && (LauncherResourceLib._Ke.delete(e), L());
  }
}
((exports.LauncherResourceLib = LauncherResourceLib).pJo = 0),
  (LauncherResourceLib.gU = !1);
//# sourceMappingURL=LauncherResourceLib.js.map
