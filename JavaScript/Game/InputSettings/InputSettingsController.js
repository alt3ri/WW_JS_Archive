"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InputSettingsController = void 0);
const Info_1 = require("../../Core/Common/Info"),
  Log_1 = require("../../Core/Common/Log"),
  Protocol_1 = require("../../Core/Define/Net/Protocol"),
  ControllerBase_1 = require("../../Core/Framework/ControllerBase"),
  Net_1 = require("../../Core/Net/Net"),
  Platform_1 = require("../../Launcher/Platform/Platform"),
  EventDefine_1 = require("../Common/Event/EventDefine"),
  EventSystem_1 = require("../Common/Event/EventSystem"),
  GameSettingsUtils_1 = require("../GameSettings/GameSettingsUtils"),
  ConfigManager_1 = require("../Manager/ConfigManager"),
  ControllerHolder_1 = require("../Manager/ControllerHolder"),
  ModelManager_1 = require("../Manager/ModelManager"),
  InputSettingsManager_1 = require("./InputSettingsManager");
class InputSettingsController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return (
      Net_1.Net.Register(21210, InputSettingsController.zih),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnGetPlayerBasicInfo,
        this.Wvi,
      ),
      !0
    );
  }
  static OnClear() {
    return (
      Net_1.Net.UnRegister(21210),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnGetPlayerBasicInfo,
        this.Wvi,
      ),
      !0
    );
  }
  static I1h() {
    ModelManager_1.ModelManager.SkillButtonUiModel.GamepadData?.AddChangeKeyReason(
      1,
    ),
      ModelManager_1.ModelManager.LoginModel.IsNewAccount
        ? (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "InputSettings",
              10,
              "新号没有输入数据，还原至配置表配置",
            ),
          InputSettingsManager_1.InputSettingsManager.ResetDefaultInputKey())
        : Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "InputSettings",
            10,
            "老号没有输入数据，默认本地存储按键",
          ),
      ModelManager_1.ModelManager.SkillButtonUiModel.GamepadData?.RemoveChangeKeyReason(
        1,
      );
  }
  static InputSettingRequest() {
    var t = new Protocol_1.Aki.Protocol.jf_();
    Net_1.Net.Call(16179, Protocol_1.Aki.Protocol.jf_.create(t), this.Jih);
  }
  static InputSettingUpdateRequest(t) {
    var e = new Protocol_1.Aki.Protocol.$f_();
    (e.Zih = this.Ttl(t)),
      Net_1.Net.Call(20173, Protocol_1.Aki.Protocol.$f_.create(e), this.erh);
  }
  static RefreshInputSettingsFromProtoData(n) {
    if (!n || !n.trh || n.trh.length <= 0)
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "InputSettings",
          10,
          "[RefreshInputSettingsFromProtoData]服务端没有数据，使用本地配置",
        ),
        this.I1h(),
        GameSettingsUtils_1.GameSettingsUtils.RefreshViewRevertState(
          Info_1.Info.InputControllerMainType,
        );
    else {
      ModelManager_1.ModelManager.SkillButtonUiModel.GamepadData?.AddChangeKeyReason(
        1,
      );
      let t = "";
      let e = !1;
      for (const r of n.trh) {
        var o = r.irh,
          a =
            (o === Protocol_1.Aki.Protocol.ZR_.Proto_Mouse &&
              ((t = InputSettingsManager_1.InputSettingsManager.DeviceLang),
              (InputSettingsManager_1.InputSettingsManager.DeviceLang = r.grh)),
            this.rrh(r.EL_, o)),
          a = ((e = e || a), this.orh(r.SL_, o)),
          a = ((e = e || a), this.nrh(r.ML_, o));
        e = e || a;
      }
      Platform_1.Platform.IsPcPlatform() &&
        InputSettingsManager_1.InputSettingsManager.ChangeActionAndAxisPcKeys(
          t,
        ),
        ModelManager_1.ModelManager.SkillButtonUiModel.GamepadData?.RemoveChangeKeyReason(
          1,
        ),
        e
          ? this.InputSettingUpdateRequest(!1)
          : GameSettingsUtils_1.GameSettingsUtils.RefreshViewRevertState(
              Info_1.Info.InputControllerMainType,
            );
    }
  }
  static orh(t, e) {
    if (!t)
      return (
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "InputSettings",
            10,
            "从Proto_InputSettingData刷新Action输入时，没有输入数据，还原至默认输入按键",
            ["actionData", t],
          ),
        InputSettingsManager_1.InputSettingsManager.RefreshAllActionKeys(!0),
        !1
      );
    var n = Object.keys(t),
      o = ConfigManager_1.ConfigManager.InputSettingsConfig;
    let a = !1;
    for (const m of n) {
      var r = InputSettingsManager_1.InputSettingsManager.GetActionBinding(m);
      if (r) {
        var i = t[m];
        if (i) {
          var g = i.K7n;
          switch (e) {
            case Protocol_1.Aki.Protocol.ZR_.Proto_Mouse:
              var _ = r.GetKeyboardVersion();
              if (((a = a || g < _), g < _)) {
                _ = o?.GetActionMappingConfigByActionName(m);
                if (!_) continue;
                let t = [];
                (t = InputSettingsManager_1.InputSettingsManager
                  .CheckUseFrenchKeyboard
                  ? _.FrancePcKeys
                  : _.PcKeys),
                  r.SetKeyboardKeys(t);
                _ =
                  InputSettingsManager_1.InputSettingsManager.GetCombinationActionBindingByActionName(
                    m,
                  );
                if (_) {
                  var s,
                    u,
                    p = new Map();
                  _.GetPcKeyNameMap(p);
                  for ([s, u] of p)
                    InputSettingsManager_1.InputSettingsManager.RemoveCombinationActionKeyMap(
                      m,
                      s,
                      u,
                    );
                }
                Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug(
                    "InputSettings",
                    10,
                    "从Proto_InputSettingData刷新Action输入时，键鼠配置版本号大于服务端版本号，键鼠使用默认配置",
                    ["actionName", m],
                    ["keyNameList", t],
                  );
              } else {
                _ = i.srh;
                r.SetKeyboardKeys(_),
                  r.SetKeyboardVersion(g),
                  Log_1.Log.CheckDebug() &&
                    Log_1.Log.Debug(
                      "InputSettings",
                      10,
                      "从Proto_InputSettingData刷新Action输入时，更新键鼠输入按键",
                      ["actionName", m],
                      ["keyNameList", _],
                    );
              }
              break;
            case Protocol_1.Aki.Protocol.ZR_.uVn:
              p = r.GetGamepadVersion();
              if (((a = a || g < p), g < p)) {
                _ = o?.GetActionMappingConfigByActionName(m);
                if (!_) continue;
                var c = _.GamepadKeys,
                  l =
                    (r.SetGamepadKeys(c),
                    InputSettingsManager_1.InputSettingsManager.GetCombinationActionBindingByActionName(
                      m,
                    ));
                if (l) {
                  var S,
                    f,
                    I = new Map();
                  l.GetGamepadKeyNameMap(I);
                  for ([S, f] of I)
                    InputSettingsManager_1.InputSettingsManager.RemoveCombinationActionKeyMap(
                      m,
                      S,
                      f,
                    );
                }
                Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug(
                    "InputSettings",
                    10,
                    "从Proto_InputSettingData刷新Action输入时，手柄配置版本号大于服务端手柄版本号，手柄使用默认配置",
                    ["actionName", m],
                    ["keyNameList", c],
                  );
              } else {
                l = i.srh;
                if (
                  (r.SetGamepadKeys(l),
                  r.SetGamepadVersion(g),
                  Log_1.Log.CheckDebug() &&
                    Log_1.Log.Debug(
                      "InputSettings",
                      10,
                      "从Proto_InputSettingData刷新Action输入时，更新手柄输入按键",
                      ["actionName", m],
                      ["keyNameList", l],
                    ),
                  0 < l.length && "Gamepad_Invalid" !== l[0])
                ) {
                  Log_1.Log.CheckDebug() &&
                    Log_1.Log.Debug(
                      "InputSettings",
                      10,
                      "Proto_InputSettingData服务器发现有单键配置,尝试删除本地组合键配置",
                      ["actionName", m],
                      ["keyNameList", l],
                    );
                  I =
                    InputSettingsManager_1.InputSettingsManager.GetCombinationActionBindingByActionName(
                      m,
                    );
                  if (I) {
                    var M,
                      v,
                      c = new Map();
                    I.GetGamepadKeyNameMap(c);
                    for ([M, v] of c)
                      InputSettingsManager_1.InputSettingsManager.RemoveCombinationActionKeyMap(
                        m,
                        M,
                        v,
                      );
                  }
                }
              }
          }
        }
      }
    }
    return a;
  }
  static nrh(t, e) {
    if (!t)
      return (
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "InputSettings",
            10,
            "从Proto_InputSettingData刷新Action输入时，没有输入数据，还原至默认输入按键",
            ["axisMap", t],
          ),
        InputSettingsManager_1.InputSettingsManager.RefreshAllAxisKeys(!0),
        !1
      );
    var n = Object.keys(t),
      o = ConfigManager_1.ConfigManager.InputSettingsConfig;
    let a = !1;
    for (const I of n) {
      var r = InputSettingsManager_1.InputSettingsManager.GetAxisBinding(I);
      if (r) {
        var i = t[I];
        if (i) {
          var g = i.K7n;
          switch (e) {
            case Protocol_1.Aki.Protocol.ZR_.Proto_Mouse:
              var _ = r.GetKeyboardVersion();
              if (((a = a || g < _), g < _)) {
                _ = o?.GetAxisMappingConfigByAxisName(I);
                if (!_) continue;
                let t = new Map();
                (t = InputSettingsManager_1.InputSettingsManager
                  .CheckUseFrenchKeyboard
                  ? _.FrancePcKeys
                  : _.PcKeys),
                  r.SetKeyboardKeys(t),
                  Log_1.Log.CheckDebug() &&
                    Log_1.Log.Debug(
                      "InputSettings",
                      10,
                      "从Proto_InputSettingData刷新Axis输入时，键鼠配置版本号大于服务端版本号，键鼠使用默认配置",
                      ["axisName", I],
                      ["keyboardKeyScaleMap", t],
                    );
              } else {
                var s = new Map(),
                  u = i.vL_;
                for (const M of Object.keys(u)) {
                  var p = u[M];
                  s.set(M, p / 1e3);
                }
                r.SetKeyboardKeys(s),
                  Log_1.Log.CheckDebug() &&
                    Log_1.Log.Debug(
                      "InputSettings",
                      10,
                      "从Proto_InputSettingData刷新Axis输入时，更新键鼠输入按键",
                      ["actionName", I],
                      ["keyScaleMap", s],
                    );
              }
              break;
            case Protocol_1.Aki.Protocol.ZR_.uVn:
              _ = r.GetGamepadVersion();
              if (((a = a || g < _), g < _)) {
                var c = o?.GetAxisMappingConfigByAxisName(I);
                if (!c) continue;
                c = c.GamepadKeys;
                r.SetGamepadKeys(c),
                  Log_1.Log.CheckDebug() &&
                    Log_1.Log.Debug(
                      "InputSettings",
                      10,
                      "从Proto_InputSettingData刷新Axis输入时，手柄配置版本号大于服务端版本号，手柄使用默认配置",
                      ["axisName", I],
                      ["gamepadKeyScaleMap", c],
                    );
              } else {
                var l = new Map(),
                  S = i.vL_;
                for (const v of Object.keys(S)) {
                  var f = S[v];
                  l.set(v, f / 1e3);
                }
                r.SetGamepadKeys(l),
                  Log_1.Log.CheckDebug() &&
                    Log_1.Log.Debug(
                      "InputSettings",
                      10,
                      "从Proto_InputSettingData刷新Axis输入时，更新手柄输入按键",
                      ["actionName", I],
                      ["gamepadKeyScaleMap", l],
                    );
              }
          }
        }
      }
    }
    return a;
  }
  static rrh(t, e) {
    if (!t)
      return (
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "InputSettings",
            10,
            "从Proto_InputSettingData刷新Action输入时，没有输入数据，还原至默认输入按键",
            ["actionData", t],
          ),
        InputSettingsManager_1.InputSettingsManager.RefreshCombinationActionKeys(
          !0,
        ),
        !1
      );
    var n = Object.keys(t),
      o = ConfigManager_1.ConfigManager.InputSettingsConfig;
    let a = !1;
    for (const c of n) {
      var r =
        InputSettingsManager_1.InputSettingsManager.TryGetCombinationActionBinding(
          c,
        );
      if (r) {
        var i = t[c];
        if (i) {
          var g = i.K7n;
          switch (e) {
            case Protocol_1.Aki.Protocol.ZR_.Proto_Mouse:
              var _ = r.GetKeyboardVersion();
              if (((a = a || g < _), g < _)) {
                _ = o?.GetCombinationActionConfigByActionName(c);
                if (!_) continue;
                _ = _.PcKeys;
                InputSettingsManager_1.InputSettingsManager.SetCombinationActionKeyboardKeys(
                  c,
                  _,
                ),
                  Log_1.Log.CheckDebug() &&
                    Log_1.Log.Debug(
                      "InputSettings",
                      10,
                      "从Proto_InputSettingData刷新CombinationAction输入时，键鼠配置版本号大于服务端版本号，键鼠使用默认配置",
                      ["actionName", c],
                      ["keyboardKeys", _],
                    );
              } else {
                var s = new Map();
                for (const l of i.yL_) s.set(l.srh[0], l.srh[1]);
                InputSettingsManager_1.InputSettingsManager.SetCombinationActionKeyboardKeys(
                  c,
                  s,
                ),
                  r.SetKeyboardVersion(g),
                  Log_1.Log.CheckDebug() &&
                    Log_1.Log.Debug(
                      "InputSettings",
                      10,
                      "从Proto_InputSettingData刷新Action输入时，更新键鼠输入按键",
                      ["actionName", c],
                      ["keyNameMap", s],
                    );
              }
              break;
            case Protocol_1.Aki.Protocol.ZR_.uVn:
              _ = r.GetGamepadVersion();
              if (((a = a || g < _), g < _)) {
                var u = o?.GetCombinationActionConfigByActionName(c);
                if (!u) continue;
                u = u.GamepadKeys;
                InputSettingsManager_1.InputSettingsManager.SetCombinationActionGamepadKeys(
                  c,
                  u,
                ),
                  Log_1.Log.CheckDebug() &&
                    Log_1.Log.Debug(
                      "InputSettings",
                      10,
                      "从Proto_InputSettingData刷新Action输入时，手柄配置版本号大于服务端手柄版本号，手柄使用默认配置",
                      ["actionName", c],
                      ["gamepadKeys", u],
                    );
              } else {
                var p = new Map();
                for (const S of i.yL_) p.set(S.srh[0], S.srh[1]);
                InputSettingsManager_1.InputSettingsManager.SetCombinationActionGamepadKeys(
                  c,
                  p,
                ),
                  r.SetGamepadVersion(g),
                  Log_1.Log.CheckDebug() &&
                    Log_1.Log.Debug(
                      "InputSettings",
                      10,
                      "从Proto_InputSettingData刷新Action输入时，更新手柄输入按键",
                      ["actionName", c],
                      ["keyNameMap", p],
                    );
              }
          }
        }
      }
    }
    return a;
  }
  static Ttl(t) {
    var e,
      n,
      o,
      a,
      r,
      i,
      g,
      _,
      s = new Protocol_1.Aki.Protocol.Zih(),
      u = new Protocol_1.Aki.Protocol.eA_(),
      p = new Protocol_1.Aki.Protocol.eA_(),
      c =
        ((u.irh = Protocol_1.Aki.Protocol.ZR_.Proto_Mouse),
        (u.grh = InputSettingsManager_1.InputSettingsManager.DeviceLang),
        (p.irh = Protocol_1.Aki.Protocol.ZR_.uVn),
        InputSettingsManager_1.InputSettingsManager.GetActionBindingMap());
    for ([e, n] of c) {
      var l = [],
        S = t ? 0 : n.GetKeyboardVersion(),
        l = (n.GetPcKeyNameList(l), this.arh(e, u, l, S), []),
        S = t ? 0 : n.GetGamepadVersion();
      n.GetGamepadKeyNameList(l), this.arh(e, p, l, S);
    }
    for ([
      o,
      a,
    ] of InputSettingsManager_1.InputSettingsManager.GetAxisBindingMap()) {
      var f = new Map(),
        I = t ? 0 : a.GetKeyboardVersion(),
        f = (a.GetPcKeyScaleMap(f), this.hrh(o, u, f, I), new Map()),
        I = t ? 0 : a.GetGamepadVersion();
      a.GetGamepadKeyScaleMap(f), this.hrh(o, p, f, I);
    }
    for ([
      r,
      i,
    ] of InputSettingsManager_1.InputSettingsManager.GetCombinationActionBindingMap()) {
      var M = new Map(),
        v = t ? 0 : i.GetKeyboardVersion(),
        M = (i.GetPcKeyNameMap(M), this.lrh(r, u, M, v), new Map()),
        v = t ? 0 : i.GetGamepadVersion();
      i.GetGamepadKeyNameMap(M), this.lrh(r, p, M, v);
    }
    for ([
      g,
      _,
    ] of InputSettingsManager_1.InputSettingsManager.GetCombinationAxisBindingMap()) {
      var m = new Map(),
        L = t ? 0 : _.GetKeyboardVersion(),
        m = (_.GetPcKeyNameMap(m), this._rh(g, u, m, L), new Map()),
        L = t ? 0 : _.GetGamepadVersion();
      _.GetGamepadKeyNameMap(m), this._rh(g, p, m, L);
    }
    return (s.trh = [u, p]), s;
  }
  static arh(t, e, n, o) {
    var a = new Protocol_1.Aki.Protocol.zR_();
    (a.urh = t), (a.K7n = o), (a.srh = n), (e.SL_[t] = a);
  }
  static hrh(t, e, n, o) {
    var a,
      r,
      i = new Protocol_1.Aki.Protocol.JR_();
    (i.crh = t), (i.K7n = o);
    for ([a, r] of n) {
      var g = Math.round(1e3 * r);
      i.vL_[a] = g;
    }
    e.ML_[t] = i;
  }
  static lrh(t, e, n, o) {
    var a,
      r,
      i = new Protocol_1.Aki.Protocol.EL_();
    (i.urh = t), (i.K7n = o);
    for ([a, r] of n) {
      var g = new Protocol_1.Aki.Protocol.YR_();
      (g.srh = [a, r]), i.yL_.push(g);
    }
    e.EL_[t] = i;
  }
  static _rh(t, e, n, o) {
    var a,
      r,
      i = new Protocol_1.Aki.Protocol.IL_();
    (i.crh = t), (i.K7n = o);
    for ([a, r] of n) {
      var g = new Protocol_1.Aki.Protocol.YR_();
      (g.srh = [a, r]), i.yL_.push(g);
    }
    e.IL_[t] = i;
  }
}
(exports.InputSettingsController = InputSettingsController),
  ((_a = InputSettingsController).Wvi = () => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("InputSettings", 10, "登录直接请求服务端输入数据"),
      _a.InputSettingRequest();
  }),
  (InputSettingsController.zih = (t) => {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("InputSettings", 10, "服务端通知更新按键信息"),
      _a.RefreshInputSettingsFromProtoData(t.Zih),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnInputSettingUpdateNotify,
      );
  }),
  (InputSettingsController.Jih = (t) => {
    !t || !t.Zih || t.Zih.trh.length <= 0
      ? (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "InputSettings",
            10,
            "服务端没有数据，使用本地配置并同步给服务端",
          ),
        _a.I1h(),
        Platform_1.Platform.IsMobilePlatform() ||
          _a.InputSettingUpdateRequest(
            !ModelManager_1.ModelManager.LoginModel.IsNewAccount,
          ))
      : (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "InputSettings",
            10,
            "服务端有对应数据,使用服务端数据刷新本地输入数据",
          ),
        _a.RefreshInputSettingsFromProtoData(t?.Zih),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnInputSettingResponse,
        ));
  }),
  (InputSettingsController.erh = (t) => {
    t &&
      t.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
        t.Q4n,
        19180,
      );
  });
//# sourceMappingURL=InputSettingsController.js.map
