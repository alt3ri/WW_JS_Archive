"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const EffectContext_1 = require("./EffectContext/EffectContext");
const EffectParameterNiagara_1 = require("./EffectParameter/EffectParameterNiagara");
const EffectSystem_1 = require("./EffectSystem");
class TsEffectFunctionLibrary extends UE.BlueprintFunctionLibrary {
  static SpawnEffect(e, t, f, c, n, o) {
    if (t?.IsValid())
      if (n) {
        let a;
        if (!(n.length < EffectSystem_1.EFFECT_REASON_LENGTH_LIMIT))
          return (
            (a = `[蓝图:${t.GetName()}] ` + n),
            EffectSystem_1.EffectSystem.SpawnEffect(
              e,
              c,
              f,
              a,
              new EffectContext_1.EffectContext(void 0, t),
            ) ?? 0
          );
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "TsEffectFunctionLibrary.SpawnEffectWithActor的Reason字符串长度必须大于等于限制字符数量",
            ["蓝图对象", t.GetName()],
            ["Reason", n],
            ["限制的字符数量", EffectSystem_1.EFFECT_REASON_LENGTH_LIMIT],
          );
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "TsEffectFunctionLibrary.SpawnEffectWithActor的Reason不能使用undefined",
            ["蓝图对象", t.GetName()],
            ["Reason", n],
          );
    else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RenderEffect",
          3,
          "TsEffectFunctionLibrary.SpawnEffect失败，因为CallObject无效",
          ["Path", f],
          ["Reason", n],
        );
  }
  static SpawnEffectUI(e, t, f, c, n) {
    if (t?.IsValid())
      if (n) {
        let o;
        if (!(n.length < EffectSystem_1.EFFECT_REASON_LENGTH_LIMIT))
          return (
            (o = `[蓝图:${t.GetName()}] ` + n),
            EffectSystem_1.EffectSystem.SpawnEffect(
              e,
              c,
              f,
              o,
              new EffectContext_1.EffectContext(void 0, t),
              1,
            ) ?? 0
          );
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "TsEffectFunctionLibrary.SpawnEffectUI的Reason字符串长度必须大于等于限制字符数量",
            ["蓝图对象", t.GetName()],
            ["Reason", n],
            ["限制的字符数量", EffectSystem_1.EFFECT_REASON_LENGTH_LIMIT],
          );
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "TsEffectFunctionLibrary.SpawnEffectUI的Reason不能使用undefined",
            ["蓝图对象", t.GetName()],
            ["Reason", n],
          );
    else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RenderEffect",
          3,
          "TsEffectFunctionLibrary.SpawnEffectUI失败，因为CallObject无效",
          ["Path", f],
          ["Reason", n],
        );
  }
  static SpawnEffectWithActor(e, t, f, c, n, o, a) {
    let i = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldType(e);
    if (i === 2 || i === 4)
      if (f?.IsValid())
        if (t?.IsValid())
          if (n) {
            if (!(n.length < EffectSystem_1.EFFECT_REASON_LENGTH_LIMIT))
              return (
                (i = `[蓝图:${t.GetName()}] ` + n),
                EffectSystem_1.EffectSystem.SpawnEffectWithActor(
                  e,
                  void 0,
                  f,
                  c,
                  i,
                  !0,
                  new EffectContext_1.EffectContext(void 0, t),
                  void 0,
                  void 0,
                  !1,
                  void 0,
                  a.valueOf(),
                )
              );
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Entity",
                3,
                "TsEffectFunctionLibrary.SpawnEffectWithActor的Reason字符串长度必须大于等于限制字符数量",
                ["蓝图对象", t.GetName()],
                ["Reason", n],
                ["限制的字符数量", EffectSystem_1.EFFECT_REASON_LENGTH_LIMIT],
              );
          } else
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Entity",
                3,
                "TsEffectFunctionLibrary.SpawnEffectWithActor的Reason不能使用undefined",
                ["蓝图对象", t.GetName()],
                ["Reason", n],
              );
        else
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "RenderEffect",
              3,
              "SpawnEffectWithActor失败，因为CallObject无效",
              ["Actor", f.GetName()],
              ["Reason", n],
            );
      else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RenderEffect",
            3,
            "TsEffectFunctionLibrary.SpawnEffectWithActor失败，因为effectActor参数无效",
            ["Reason", n],
          );
    else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RenderEffect",
          30,
          "TsEffectFunctionLibrary.SpawnEffectWithActor仅能于编辑时调用",
          ["Path", c],
          ["Reason", n],
        );
  }
  static InitializeWithPreview(e) {
    EffectSystem_1.EffectSystem.InitializeWithPreview(e);
  }
  static EffectHandleIsValid(e) {
    return EffectSystem_1.EffectSystem.IsValid(e);
  }
  static StopEffect(e, t, f, c, n) {
    let o;
    return t?.IsValid()
      ? f
        ? f.length < EffectSystem_1.EFFECT_REASON_LENGTH_LIMIT
          ? (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Entity",
                3,
                "TsEffectFunctionLibrary.StopEffect的Reason字符串长度必须大于等于限制字符数量",
                ["蓝图对象", t.GetName()],
                ["Reason", f],
                ["限制的字符数量", EffectSystem_1.EFFECT_REASON_LENGTH_LIMIT],
              ),
            !1)
          : e
            ? ((o = `[蓝图:${t.GetName()}] ` + f),
              EffectSystem_1.EffectSystem.StopEffectById(e, o, c))
            : (Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "RenderEffect",
                  3,
                  "特效句柄无效",
                  ["CallObject", t.GetName()],
                  ["Reason", f],
                  ["Handle", e],
                ),
              !1)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Entity",
              3,
              "TsEffectFunctionLibrary.StopEffect的Reason不能使用undefined",
              ["蓝图对象", t.GetName()],
              ["Reason", f],
              ["Handle", e],
            ),
          !1)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RenderEffect",
            3,
            "CallObject无效",
            ["Reason", f],
            ["Handle", e],
          ),
        !1);
  }
  static PlayEffect(e, t, f) {
    return t?.IsValid()
      ? f
        ? f.length < EffectSystem_1.EFFECT_REASON_LENGTH_LIMIT
          ? (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Entity",
                3,
                "TsEffectFunctionLibrary.PlayEffect的Reason字符串长度必须大于等于限制字符数量",
                ["蓝图对象", t.GetName()],
                ["Reason", f],
                ["限制的字符数量", EffectSystem_1.EFFECT_REASON_LENGTH_LIMIT],
              ),
            !1)
          : !!e ||
            (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "RenderEffect",
                3,
                "特效句柄无效",
                ["CallObject", t.GetName()],
                ["Reason", f],
                ["Handle", e],
              ),
            !1)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Entity",
              3,
              "TsEffectFunctionLibrary.PlayEffect的Reason不能使用undefined",
              ["蓝图对象", t.GetName()],
              ["Reason", f],
              ["Handle", e],
            ),
          !1)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RenderEffect",
            3,
            "CallObject无效",
            ["Reason", f],
            ["Handle", e],
          ),
        !1);
  }
  static SetEffectParameterNiagara(e, t, f, c, n, o) {
    if (e) {
      const a = new EffectParameterNiagara_1.EffectParameterNiagara();
      if (t) {
        const i = (0, puerts_1.$unref)(t);
        const r = i.Num();
        if (r > 0) {
          a.UserParameterFloat = [];
          for (let e = 0; e < r; ++e)
            a.UserParameterFloat.push([i.Get(e).Name, i.Get(e).Value]);
        }
      }
      if (f) {
        const s = (0, puerts_1.$unref)(f);
        const E = s.Num();
        if (E > 0) {
          a.UserParameterColor = [];
          for (let e = 0; e < E; ++e)
            a.UserParameterColor.push([s.Get(e).Name, s.Get(e).Value]);
        }
      }
      if (c) {
        const _ = (0, puerts_1.$unref)(c);
        const y = _.Num();
        if (y > 0) {
          a.UserParameterVector = [];
          for (let e = 0; e < y; ++e)
            a.UserParameterVector.push([_.Get(e).Name, _.Get(e).Value]);
        }
      }
      if (n) {
        const L = (0, puerts_1.$unref)(n);
        const S = L.Num();
        if (S > 0) {
          a.MaterialParameterFloat = [];
          for (let e = 0; e < S; ++e)
            a.MaterialParameterFloat.push([L.Get(e).Name, L.Get(e).Value]);
        }
      }
      if (o) {
        const g = (0, puerts_1.$unref)(o);
        const l = g.Num();
        if (l > 0) {
          a.MaterialParameterColor = [];
          for (let e = 0; e < l; ++e)
            a.MaterialParameterColor.push([g.Get(e).Name, g.Get(e).Value]);
        }
      }
      EffectSystem_1.EffectSystem.SetEffectParameterNiagara(e, a);
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("RenderEffect", 26, "特效句柄无效");
  }
  static EditorTickHandle(e, t) {
    EffectSystem_1.EffectSystem.TickHandleInEditor(e, t);
  }
  static GetEffectActor(e) {
    return EffectSystem_1.EffectSystem.GetSureEffectActor(e);
  }
  static GetPlayType(e) {
    switch (e) {
      case 1:
        return !0;
      case 2:
        return !1;
      default:
    }
  }
  static AttachEffectActorToActor(e, t, f, c, n, o, a) {
    EffectSystem_1.EffectSystem.IsValid(e) &&
      t &&
      EffectSystem_1.EffectSystem.GetEffectActor(e).K2_AttachToActor(
        t,
        f,
        c,
        n,
        o,
        a,
      );
  }
  static AttachEffectActorToComponent(e, t, f, c, n, o, a) {
    EffectSystem_1.EffectSystem.IsValid(e) &&
      t &&
      EffectSystem_1.EffectSystem.GetEffectActor(e).K2_AttachToComponent(
        t,
        f,
        c,
        n,
        o,
        a,
      );
  }
  static SetEffectActorRelativeLocation(e, t, f, c) {
    EffectSystem_1.EffectSystem.IsValid(e) &&
      EffectSystem_1.EffectSystem.GetEffectActor(e).K2_SetActorRelativeLocation(
        t,
        f,
        void 0,
        c,
      );
  }
  static SetEffectHiddenInGame(e, t) {
    EffectSystem_1.EffectSystem.IsValid(e)
      ? EffectSystem_1.EffectSystem.GetEffectActor(e).SetActorHiddenInGame(t)
      : Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "RenderEffect",
          46,
          "设置EffectHiddenInGame,但找不到对应",
          ["handle", e],
        );
  }
  static SetEffectIgnoreVisibilityOptimize(e, t) {
    EffectSystem_1.EffectSystem.IsValid(e)
      ? EffectSystem_1.EffectSystem.SetEffectIgnoreVisibilityOptimize(e, t)
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "RenderEffect",
          37,
          "设置EffectIgnoreVisibilityOptimize，句柄失效",
          ["handle", e],
        );
  }
  static SetEffectStoppingTime(e, t) {
    EffectSystem_1.EffectSystem.IsValid(e)
      ? EffectSystem_1.EffectSystem.SetEffectStoppingTime(e, t)
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("RenderEffect", 37, "设置EffectStoppingTime，句柄失效", [
          "handle",
          e,
        ]);
  }
  static SetGlobalStoppingTime(e, t) {
    EffectSystem_1.EffectSystem.SetGlobalStoppingTime(e, t);
  }
}
exports.default = TsEffectFunctionLibrary;
// # sourceMappingURL=TsEffectFunctionLibrary.js.map
