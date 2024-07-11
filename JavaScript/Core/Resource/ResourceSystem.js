"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ResourceSystem =
    exports.SYNC_LOAD_PRIORITY =
    exports.WAIT_RENDER_ASSET_DURATION =
    exports.RENDER_ASSETS_TIMEOUT =
    exports.RENDER_ASSETS_RADIUS =
    exports.STREAMING_SOURCE_RADIUS =
    exports.CHECK_RENDERASSETS_INTERVAL =
    exports.CHECK_STREAMING_INTERVAL =
      void 0);
const cpp_1 = require("cpp"),
  puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../Common/Info"),
  Log_1 = require("../Common/Log"),
  Stats_1 = require("../Common/Stats"),
  PriorityQueue_1 = require("../Container/PriorityQueue"),
  ClassDefine_1 = require("../Define/ClassDefine"),
  GameBudgetInterfaceController_1 = require("../GameBudgetAllocator/GameBudgetInterfaceController"),
  TimeLimit_1 = require("../Performance/TimeLimit");
(exports.CHECK_STREAMING_INTERVAL = 100),
  (exports.CHECK_RENDERASSETS_INTERVAL = 100),
  (exports.STREAMING_SOURCE_RADIUS = 7e3),
  (exports.RENDER_ASSETS_RADIUS = 7e3),
  (exports.RENDER_ASSETS_TIMEOUT = 13e4),
  (exports.WAIT_RENDER_ASSET_DURATION = 42),
  (exports.SYNC_LOAD_PRIORITY = 1073741823);
class LoadCallbackTask {
  constructor(e, s, t) {
    (this.Id = e), (this.Priority = s), (this.Callback = t);
  }
}
class ResourceSystem {
  static Initialize() {
    (0, puerts_1.registerLoadType)((e) => {
      ResourceSystem.jY(e);
    }),
      (ResourceSystem.WY = new UE.KuroResourceManager()),
      ResourceSystem.WY.LoadResourceDelegate.Bind((e) => {
        ResourceSystem.KY(e);
      }),
      ResourceSystem.QY.clear(),
      ResourceSystem.XY.clear(),
      (ResourceSystem.$Y = cpp_1.KuroApplication.IsAsyncLoadingThreadEnabled());
  }
  static SetCallbackTimeLimit(e) {
    ResourceSystem.YY.TimeLimit = 1e3 * e;
  }
  static UpdateDelayCallback(e = !0) {
    if (!ResourceSystem.Fxn) {
      for (
        ResourceSystem.Fxn = !0;
        !ResourceSystem.zY.Empty && !ResourceSystem.YY.IsTimeLimitExceeded();

      ) {
        var s = ResourceSystem.zY.Pop();
        ResourceSystem.ZY.delete(s.Id)
          ? (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Resource",
                1,
                "预加载回调执行失败，任务已被取消",
                [
                  "ResourceSystem.DelayTaskQueue.Empty",
                  ResourceSystem.zY.Empty,
                ],
                [
                  "IsTimeLimitExceeded",
                  ResourceSystem.YY.IsTimeLimitExceeded(),
                ],
              ),
            ResourceSystem.WY.Release(s.Id))
          : s.Callback();
      }
      e && ResourceSystem.YY.ResetCost(), (ResourceSystem.Fxn = !1);
    }
  }
  static eJ(s, t) {
    0 === s.size && t?.();
    const o = Date.now();
    for (const r of s)
      ResourceSystem.tJ(r, () => {
        var e;
        s.delete(r),
          0 === s.size &&
            ((e = Date.now()),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Resource",
                1,
                "预加载类型结束 ",
                ["count", s.size],
                ["cost", e - o],
              ),
            t?.());
      });
  }
  static PreloadSimpleTypes(e = void 0) {
    var s = new Set();
    for (const t in ClassDefine_1.typeDefined)
      ResourceSystem.XY.has(t) ||
        (0 !== ClassDefine_1.typeDefined[t][0] && s.add(t));
    ResourceSystem.eJ(s, e);
  }
  static PreloadOtherTypes(e = void 0) {
    var s = new Set();
    for (const t in ClassDefine_1.typeDefined)
      ResourceSystem.XY.has(t) || s.add(t);
    ResourceSystem.eJ(s, e);
  }
  static iJ(e) {
    var s = ClassDefine_1.typeDefined[e];
    return (
      s ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Resource", 1, "该类型没有注册", ["name", e])),
      s
    );
  }
  static oJ(e, s) {
    var t = s[1];
    if (t) {
      if (0 !== t.length) return t;
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Resource",
          1,
          "加载类型路径长度为零",
          ["name", e],
          ["type", s[0]],
        );
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Resource",
          1,
          "加载类型路径为空",
          ["name", e],
          ["type", s[0]],
        );
  }
  static jY(s) {
    if (!ResourceSystem.XY.has(s)) {
      var t = ResourceSystem.iJ(s);
      if (t) {
        var o = ResourceSystem.oJ(s, t);
        if (o) {
          var r = t[0];
          Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Resource",
              1,
              "运行时加载类型",
              ["name", s],
              ["type", r],
              ["path", o],
            );
          let e = void 0;
          switch (r) {
            case 0:
              e = ResourceSystem.Load(o, UE.BlueprintGeneratedClass);
              break;
            case 1:
              e = ResourceSystem.Load(o, UE.UserDefinedStruct);
              break;
            case 2:
              e = ResourceSystem.Load(o, UE.UserDefinedEnum);
              break;
            default:
              return void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Resource",
                  1,
                  "加载类型错误",
                  ["name", s],
                  ["type", r],
                  ["path", o],
                )
              );
          }
          e
            ? ResourceSystem.XY.set(s, e)
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Resource",
                1,
                "加载类型失败",
                ["name", s],
                ["type", r],
                ["path", o],
              );
        }
      }
    }
  }
  static tJ(t, o) {
    if (!ResourceSystem.XY.has(t)) {
      var e = ResourceSystem.iJ(t);
      if (e) {
        var s = ResourceSystem.oJ(t, e);
        if (s) {
          const c = e[0];
          var r = (e, s) => {
            e
              ? ResourceSystem.XY.set(t, e)
              : Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Resource",
                  1,
                  "预加载类型失败",
                  ["name", t],
                  ["type", c],
                  ["path", s],
                ),
              o();
          };
          switch (c) {
            case 0:
              ResourceSystem.LoadAsync(s, UE.BlueprintGeneratedClass, r, 100);
              break;
            case 1:
              ResourceSystem.LoadAsync(s, UE.UserDefinedStruct, r, 100);
              break;
            case 2:
              ResourceSystem.LoadAsync(s, UE.UserDefinedEnum, r, 100);
              break;
            default:
              Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Resource",
                  1,
                  "预加载类型错误",
                  ["name", t],
                  ["type", c],
                  ["path", s],
                ),
                o();
          }
        }
      }
    }
  }
  static KY(e) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Resource", 31, "OnLoadComplete", ["id", e]);
    var s = ResourceSystem.QY.get(e);
    s &&
      (ResourceSystem.QY.delete(e),
      ResourceSystem.zY.Push(s),
      ResourceSystem.UpdateDelayCallback(!1));
  }
  static rJ(e) {
    return e
      ? 0 === e.length
        ? (Log_1.Log.CheckError() &&
            Log_1.Log.Error("Resource", 1, "路径长度为零", ["path", e]),
          !1)
        : !!e.startsWith("/") ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error("Resource", 1, "传入资源路径不符合规范", [
              "path",
              e,
            ]),
          !1)
      : (Log_1.Log.CheckError() && Log_1.Log.Error("Resource", 1, "路径为空"),
        !1);
  }
  static nJ(e, s) {
    if (ResourceSystem.rJ(e))
      if (s) {
        var t = s.StaticClass();
        if (t) {
          if (t.IsValid()) return t;
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Resource",
              1,
              "传入类型获取到的 UE Class 无效",
              ["path", e],
              ["type", s],
            );
        } else
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Resource",
              1,
              "传入类型获取到的 UE Class 为空",
              ["path", e],
              ["type", s],
            );
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Resource", 1, "传入类型为空", ["path", e]);
  }
  static Ed(e, s, t) {
    var o = ResourceSystem.WY.GetAsset(s);
    if ((ResourceSystem.WY.Release(s), ResourceSystem.sJ(o, e, t))) return o;
  }
  static sJ(e, s, t) {
    return e
      ? e.IsValid()
        ? !!e.IsA(t) ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Resource",
              1,
              "传入类型与资产类型不匹配",
              ["path", s],
              ["type", t.GetName()],
              ["asset", e.GetClass().GetName()],
            ),
          !1)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error("Resource", 1, "资源加载资产无效", ["path", s]),
          !1)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Resource", 1, "资源加载资产为空", ["path", s]),
        !1);
  }
  static Load(e, s, t = 105) {
    s = ResourceSystem.nJ(e, s);
    if (s) {
      var o = ++ResourceSystem.hJ,
        t = ResourceSystem.WY.LoadAsyncWithId(e, o, t);
      if (-1 !== t) {
        if (0 === t)
          if (!ResourceSystem.WY.WaitComplete(o, 0))
            return void (
              Log_1.Log.CheckError() &&
              Log_1.Log.Error("Resource", 1, "资源加载同步等待完成失败", [
                "path",
                e,
              ])
            );
        return ResourceSystem.Ed(e, o, s);
      }
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Resource", 1, "资源加载异常", ["path", e]);
    }
  }
  static SyncLoad(e, s) {
    s = ResourceSystem.nJ(e, s);
    if (s) {
      var t = ++ResourceSystem.hJ,
        o = ResourceSystem.WY.LoadAsyncWithId(e, t, exports.SYNC_LOAD_PRIORITY);
      if (-1 !== o)
        return (
          0 === o &&
            (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Resource", 29, "强制同步加载", ["path", e]),
            ResourceSystem.WY.SyncLoad(t)),
          ResourceSystem.Ed(e, t, s)
        );
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Resource", 29, "资源加载异常", ["path", e]);
    }
  }
  static GetLoadedAsset(e, s) {
    s = ResourceSystem.nJ(e, s);
    if (s) {
      var t = ResourceSystem.WY.GetLoadedAsset(e);
      if (ResourceSystem.sJ(t, e, s)) return t;
    }
  }
  static LoadAsync(e, s, t, o = 100) {
    if (!t)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Resource", 1, "资源加载回调方法为空", ["path", e]),
        ResourceSystem.InvalidId
      );
    if (o < 100 || 105 <= o)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Resource",
            1,
            "资源加载优先级错误",
            ["path", e],
            ["priority", o],
          ),
        ResourceSystem.InvalidId
      );
    let r = ++ResourceSystem.hJ;
    const c = void 0,
      a = ResourceSystem.nJ(e, s);
    if (!a)
      return (
        ResourceSystem.zY.Push(
          new LoadCallbackTask(r, o, () => {
            ResourceSystem.TryCallback(t, void 0, e, c);
          }),
        ),
        ResourceSystem.InvalidId
      );
    s = ResourceSystem.WY.LoadAsyncWithId(e, r, o);
    switch (
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Resource",
          31,
          "资源加载",
          ["path", e],
          ["id", r],
          ["priority", o],
          ["result", s],
        ),
      s)
    ) {
      case -1:
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Resource", 1, "资源加载错误", ["path", e]),
          ResourceSystem.zY.Push(
            new LoadCallbackTask(r, o, () => {
              ResourceSystem.TryCallback(t, void 0, e, c);
            }),
          ),
          (r = ResourceSystem.InvalidId);
        break;
      case 0:
        ResourceSystem.QY.set(
          r,
          new LoadCallbackTask(r, o, () => {
            ResourceSystem.TryCallback(t, ResourceSystem.Ed(e, r, a), e, c);
          }),
        );
        break;
      case 1:
        ResourceSystem.zY.Push(
          new LoadCallbackTask(r, o, () => {
            ResourceSystem.TryCallback(t, ResourceSystem.Ed(e, r, a), e, c);
          }),
        ),
          ResourceSystem.UpdateDelayCallback(!1);
    }
    return r;
  }
  static TryCallback(e, s, t, o) {
    var r = cpp_1.KuroTime.GetMicroseconds64();
    try {
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Resource", 31, "执行资源加载回调", ["path", t]),
        e(s, t);
    } catch (e) {
      e instanceof Error
        ? Log_1.Log.CheckError() &&
          Log_1.Log.ErrorWithStack(
            "Resource",
            1,
            "资源加载回调方法执行异常",
            e,
            ["path", t],
            ["error", e.message],
          )
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Resource",
            1,
            "资源加载回调方法执行异常",
            ["path", t],
            ["error", e],
          );
    }
    e = cpp_1.KuroTime.GetMicroseconds64();
    ResourceSystem.YY.AddCost(e - r);
  }
  static CancelAsyncLoad(e) {
    ResourceSystem.QY.delete(e)
      ? (ResourceSystem.WY.Release(e),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Resource", 31, "取消Loading中的异步加载", ["id", e]))
      : (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Resource", 31, "取消等待回调的异步加载", ["id", e]),
        ResourceSystem.ZY.add(e));
  }
  static IsAsyncLoadingThreadEnabled() {
    return ResourceSystem.$Y;
  }
  static SetLoadModeInLoading(e, s) {
    var t;
    s && 0 !== s.length
      ? ResourceSystem.uJ.has(s)
        ? ((t = ResourceSystem.uJ.get(s)), ResourceSystem.uJ.set(s, ++t))
        : (ResourceSystem.uJ.set(s, 1),
          1 < ResourceSystem.uJ.size ||
            (Info_1.Info.IsPlayInEditor
              ? (UE.KismetSystemLibrary.ExecuteConsoleCommand(
                  e,
                  "s.AsyncLoadingTimeLimit 5000",
                ),
                UE.KismetSystemLibrary.ExecuteConsoleCommand(
                  e,
                  "s.LevelStreamingActorsUpdateTimeLimit 1000",
                ),
                UE.KismetSystemLibrary.ExecuteConsoleCommand(
                  e,
                  "wp.Runtime.MaxLoadingLevelStreamingCells 200",
                ))
              : (UE.KismetSystemLibrary.ExecuteConsoleCommand(
                  e,
                  "s.AsyncLoadingTimeLimit 50",
                ),
                UE.KismetSystemLibrary.ExecuteConsoleCommand(
                  e,
                  "s.LevelStreamingActorsUpdateTimeLimit 1000",
                ),
                UE.KismetSystemLibrary.ExecuteConsoleCommand(
                  e,
                  "wp.Runtime.MaxLoadingLevelStreamingCells 40",
                )),
            ResourceSystem.SetCallbackTimeLimit(0),
            GameBudgetInterfaceController_1.GameBudgetInterfaceController.UpdateMinUpdateFifoBudgetTime(
              9999,
            )))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("GameMode", 3, "SetLoadModeInLoading reason 为空");
  }
  static SetLoadModeInGame(e, s) {
    var t = ResourceSystem.uJ.get(s);
    t
      ? (1 < t ? ResourceSystem.uJ.set(s, t - 1) : ResourceSystem.uJ.delete(s),
        0 < ResourceSystem.uJ.size ||
          (Info_1.Info.IsPlayInEditor
            ? (UE.KismetSystemLibrary.ExecuteConsoleCommand(
                e,
                "s.AsyncLoadingTimeLimit 20",
              ),
              UE.KismetSystemLibrary.ExecuteConsoleCommand(
                e,
                "s.LevelStreamingActorsUpdateTimeLimit 20",
              ))
            : (UE.KismetSystemLibrary.ExecuteConsoleCommand(
                e,
                "s.AsyncLoadingTimeLimit 5",
              ),
              UE.KismetSystemLibrary.ExecuteConsoleCommand(
                e,
                "s.LevelStreamingActorsUpdateTimeLimit 5",
              )),
          UE.KismetSystemLibrary.ExecuteConsoleCommand(
            e,
            "wp.Runtime.MaxLoadingLevelStreamingCells 4",
          ),
          ResourceSystem.SetCallbackTimeLimit(5),
          GameBudgetInterfaceController_1.GameBudgetInterfaceController.UpdateMinUpdateFifoBudgetTime(
            3,
          )))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "GameMode",
          3,
          "SetLoadModeInGame reason 不成对",
          ["Reason", s],
          ["Count", t],
        );
  }
}
((exports.ResourceSystem = ResourceSystem).WY = void 0),
  (ResourceSystem.QY = new Map()),
  (ResourceSystem.zY = new PriorityQueue_1.PriorityQueue((e, s) =>
    e.Priority === s.Priority ? e.Id - s.Id : s.Priority - e.Priority,
  )),
  (ResourceSystem.ZY = new Set()),
  (ResourceSystem.YY = new TimeLimit_1.TimeLimit()),
  (ResourceSystem.Fxn = !1),
  (ResourceSystem.XY = new Map()),
  (ResourceSystem.aJ = void 0),
  (ResourceSystem.lJ = void 0),
  (ResourceSystem._J = void 0),
  (ResourceSystem.JY = void 0),
  (ResourceSystem.cJ = void 0),
  (ResourceSystem.mJ = void 0),
  (ResourceSystem.hJ = 0),
  (ResourceSystem.$Y = !1),
  (ResourceSystem.InvalidId = -1),
  (ResourceSystem.uJ = new Map()),
  ResourceSystem.Initialize();
//# sourceMappingURL=ResourceSystem.js.map
