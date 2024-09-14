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
  ConfigManager_1 = require("../Manager/ConfigManager"),
  ControllerHolder_1 = require("../Manager/ControllerHolder"),
  ModelManager_1 = require("../Manager/ModelManager"),
  InputSettingsManager_1 = require("./InputSettingsManager");
class InputSettingsController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return (
      Net_1.Net.Register(16176, InputSettingsController.eYa),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnGetPlayerBasicInfo,
        this.Wvi,
      ),
      !0
    );
  }
  static OnClear() {
    return (
      Net_1.Net.UnRegister(16176),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnGetPlayerBasicInfo,
        this.Wvi,
      ),
      !0
    );
  }
  static teh() {
    ModelManager_1.ModelManager.SkillButtonUiModel.GamepadData?.AddChangeKeyReason(
      1,
    ),
      ModelManager_1.ModelManager.LoginModel.IsNewAccount
        ? (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "InputSettings",
              11,
              "新号没有输入数据，还原至配置表配置",
            ),
          InputSettingsManager_1.InputSettingsManager.ResetDefaultInputKey())
        : Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "InputSettings",
            11,
            "老号没有输入数据，默认本地存储按键",
          ),
      ModelManager_1.ModelManager.SkillButtonUiModel.GamepadData?.RemoveChangeKeyReason(
        1,
      );
  }
  static InputSettingRequest() {
    var t = new Protocol_1.Aki.Protocol.Vth();
    Net_1.Net.Call(22420, Protocol_1.Aki.Protocol.Vth.create(t), this.tYa);
  }
  static async InputSettingRequestAsync() {
    var t = new Protocol_1.Aki.Protocol.Vth();
    return await Net_1.Net.CallAsync(
      22420,
      Protocol_1.Aki.Protocol.Vth.create(t),
    );
  }
  static InputSettingUpdateRequest() {
    var t = new Protocol_1.Aki.Protocol.$th();
    (t.iYa = this.BuildInputSettingsToProtoData()),
      Net_1.Net.Call(27722, Protocol_1.Aki.Protocol.$th.create(t), this.rYa);
  }
  static RefreshInputSettingsFromProtoData(e) {
    if (!e || !e.oYa || e.oYa.length <= 0)
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "InputSettings",
          11,
          "[RefreshInputSettingsFromProtoData]服务端没有数据，使用本地配置",
        ),
        this.teh();
    else {
      ModelManager_1.ModelManager.SkillButtonUiModel.GamepadData?.AddChangeKeyReason(
        1,
      );
      let t = "";
      for (const o of e.oYa) {
        var n = o.nYa;
        n === Protocol_1.Aki.Protocol.Aoh.Proto_Mouse &&
          ((t = InputSettingsManager_1.InputSettingsManager.DeviceLang),
          (InputSettingsManager_1.InputSettingsManager.DeviceLang = o.Sza)),
          this.sYa(o.Jrh, n),
          this.aYa(o.Yrh, n),
          this.lYa(o.zrh, n);
      }
      Platform_1.Platform.IsPcPlatform() &&
        InputSettingsManager_1.InputSettingsManager.ChangeActionAndAxisPcKeys(
          t,
        ),
        ModelManager_1.ModelManager.SkillButtonUiModel.GamepadData?.RemoveChangeKeyReason(
          1,
        );
    }
  }
  static aYa(t, e) {
    if (t) {
      var n = Object.keys(t),
        o = ConfigManager_1.ConfigManager.InputSettingsConfig;
      for (const L of n) {
        var a = InputSettingsManager_1.InputSettingsManager.GetActionBinding(L);
        if (a)
          if (
            InputSettingsManager_1.InputSettingsManager.IsChatActionOrMapAction(
              L,
            )
          ) {
            var r = o?.GetActionMappingConfigByActionName(L);
            r &&
              InputSettingsManager_1.InputSettingsManager.HandleGamepadMapActionAndChatAction(
                r,
                L,
              );
          } else {
            var i = t[L];
            if (i) {
              var g = i.K7n;
              switch (e) {
                case Protocol_1.Aki.Protocol.Aoh.Proto_Mouse:
                  if (g < a.GetKeyboardVersion()) {
                    var _ = o?.GetActionMappingConfigByActionName(L);
                    if (!_) continue;
                    let t = [];
                    (t = InputSettingsManager_1.InputSettingsManager
                      .CheckUseFrenchKeyboard
                      ? _.FrancePcKeys
                      : _.PcKeys),
                      a.SetKeyboardKeys(t);
                    _ =
                      InputSettingsManager_1.InputSettingsManager.GetCombinationActionBindingByActionName(
                        L,
                      );
                    if (_) {
                      var s,
                        p,
                        u = new Map();
                      _.GetPcKeyNameMap(u);
                      for ([s, p] of u)
                        InputSettingsManager_1.InputSettingsManager.RemoveCombinationActionKeyMap(
                          L,
                          s,
                          p,
                        );
                    }
                    Log_1.Log.CheckDebug() &&
                      Log_1.Log.Debug(
                        "InputSettings",
                        11,
                        "从Proto_InputSettingData刷新Action输入时，键鼠配置版本号大于服务端版本号，键鼠使用默认配置",
                        ["actionName", L],
                        ["keyNameList", t],
                      );
                  } else {
                    _ = i.hYa;
                    a.SetKeyboardKeys(_),
                      a.SetKeyboardVersion(g),
                      Log_1.Log.CheckDebug() &&
                        Log_1.Log.Debug(
                          "InputSettings",
                          11,
                          "从Proto_InputSettingData刷新Action输入时，更新键鼠输入按键",
                          ["actionName", L],
                          ["keyNameList", _],
                        );
                  }
                  break;
                case Protocol_1.Aki.Protocol.Aoh.uVn:
                  if (g < a.GetGamepadVersion()) {
                    u = o?.GetActionMappingConfigByActionName(L);
                    if (!u) continue;
                    var c = u.GamepadKeys,
                      l =
                        (a.SetGamepadKeys(c),
                        InputSettingsManager_1.InputSettingsManager.GetCombinationActionBindingByActionName(
                          L,
                        ));
                    if (l) {
                      var S,
                        I,
                        f = new Map();
                      l.GetGamepadKeyNameMap(f);
                      for ([S, I] of f)
                        InputSettingsManager_1.InputSettingsManager.RemoveCombinationActionKeyMap(
                          L,
                          S,
                          I,
                        );
                    }
                    Log_1.Log.CheckDebug() &&
                      Log_1.Log.Debug(
                        "InputSettings",
                        11,
                        "从Proto_InputSettingData刷新Action输入时，手柄配置版本号大于服务端手柄版本号，手柄使用默认配置",
                        ["actionName", L],
                        ["keyNameList", c],
                      );
                  } else {
                    l = i.hYa;
                    if (
                      (a.SetGamepadKeys(l),
                      a.SetGamepadVersion(g),
                      Log_1.Log.CheckDebug() &&
                        Log_1.Log.Debug(
                          "InputSettings",
                          11,
                          "从Proto_InputSettingData刷新Action输入时，更新手柄输入按键",
                          ["actionName", L],
                          ["keyNameList", l],
                        ),
                      0 < l.length && "Gamepad_Invalid" !== l[0])
                    ) {
                      Log_1.Log.CheckDebug() &&
                        Log_1.Log.Debug(
                          "InputSettings",
                          11,
                          "Proto_InputSettingData服务器发现有单键配置,尝试删除本地组合键配置",
                          ["actionName", L],
                          ["keyNameList", l],
                        );
                      f =
                        InputSettingsManager_1.InputSettingsManager.GetCombinationActionBindingByActionName(
                          L,
                        );
                      if (f) {
                        var M,
                          v,
                          c = new Map();
                        f.GetGamepadKeyNameMap(c);
                        for ([M, v] of c)
                          InputSettingsManager_1.InputSettingsManager.RemoveCombinationActionKeyMap(
                            L,
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
    } else
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "InputSettings",
          11,
          "从Proto_InputSettingData刷新Action输入时，没有输入数据，还原至默认输入按键",
          ["actionData", t],
        ),
        InputSettingsManager_1.InputSettingsManager.RefreshAllActionKeys(!0);
  }
  static lYa(t, e) {
    if (t) {
      var n = Object.keys(t),
        o = ConfigManager_1.ConfigManager.InputSettingsConfig;
      for (const I of n) {
        var a = InputSettingsManager_1.InputSettingsManager.GetAxisBinding(I);
        if (a) {
          var r = t[I];
          if (r) {
            var i = r.K7n;
            switch (e) {
              case Protocol_1.Aki.Protocol.Aoh.Proto_Mouse:
                if (i < a.GetKeyboardVersion()) {
                  var g = o?.GetAxisMappingConfigByAxisName(I);
                  if (!g) continue;
                  let t = new Map();
                  (t = InputSettingsManager_1.InputSettingsManager
                    .CheckUseFrenchKeyboard
                    ? g.FrancePcKeys
                    : g.PcKeys),
                    a.SetKeyboardKeys(t),
                    Log_1.Log.CheckDebug() &&
                      Log_1.Log.Debug(
                        "InputSettings",
                        11,
                        "从Proto_InputSettingData刷新Axis输入时，键鼠配置版本号大于服务端版本号，键鼠使用默认配置",
                        ["axisName", I],
                        ["keyboardKeyScaleMap", t],
                      );
                } else {
                  var _ = new Map(),
                    s = r.Krh;
                  for (const f of Object.keys(s)) {
                    var p = s[f];
                    _.set(f, p);
                  }
                  a.SetKeyboardKeys(_),
                    Log_1.Log.CheckDebug() &&
                      Log_1.Log.Debug(
                        "InputSettings",
                        11,
                        "从Proto_InputSettingData刷新Axis输入时，更新键鼠输入按键",
                        ["actionName", I],
                        ["keyScaleMap", _],
                      );
                }
                break;
              case Protocol_1.Aki.Protocol.Aoh.uVn:
                if (i < a.GetGamepadVersion()) {
                  g = o?.GetAxisMappingConfigByAxisName(I);
                  if (!g) continue;
                  var u = g.GamepadKeys;
                  a.SetGamepadKeys(u),
                    Log_1.Log.CheckDebug() &&
                      Log_1.Log.Debug(
                        "InputSettings",
                        11,
                        "从Proto_InputSettingData刷新Axis输入时，手柄配置版本号大于服务端版本号，手柄使用默认配置",
                        ["axisName", I],
                        ["gamepadKeyScaleMap", u],
                      );
                } else {
                  var c = new Map(),
                    l = r.Krh;
                  for (const M of Object.keys(l)) {
                    var S = l[M];
                    c.set(M, S);
                  }
                  a.SetKeyboardKeys(c),
                    Log_1.Log.CheckDebug() &&
                      Log_1.Log.Debug(
                        "InputSettings",
                        11,
                        "从Proto_InputSettingData刷新Axis输入时，更新手柄输入按键",
                        ["actionName", I],
                        ["gamepadKeyScaleMap", c],
                      );
                }
            }
          }
        }
      }
    } else
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "InputSettings",
          11,
          "从Proto_InputSettingData刷新Action输入时，没有输入数据，还原至默认输入按键",
          ["axisMap", t],
        ),
        InputSettingsManager_1.InputSettingsManager.RefreshAllAxisKeys(!0);
  }
  static sYa(t, e) {
    if (t) {
      var n = Object.keys(t),
        o = ConfigManager_1.ConfigManager.InputSettingsConfig;
      for (const u of n) {
        var a =
          InputSettingsManager_1.InputSettingsManager.TryGetCombinationActionBinding(
            u,
          );
        if (a) {
          var r = t[u];
          if (r) {
            var i = r.K7n;
            switch (e) {
              case Protocol_1.Aki.Protocol.Aoh.Proto_Mouse:
                if (i < a.GetKeyboardVersion()) {
                  var g = o?.GetCombinationActionConfigByActionName(u);
                  if (!g) continue;
                  g = g.PcKeys;
                  InputSettingsManager_1.InputSettingsManager.SetCombinationActionKeyboardKeys(
                    u,
                    g,
                  ),
                    Log_1.Log.CheckDebug() &&
                      Log_1.Log.Debug(
                        "InputSettings",
                        11,
                        "从Proto_InputSettingData刷新CombinationAction输入时，键鼠配置版本号大于服务端版本号，键鼠使用默认配置",
                        ["actionName", u],
                        ["keyboardKeys", g],
                      );
                } else {
                  var _ = new Map();
                  for (const c of r.Xrh) _.set(c.hYa[0], c.hYa[1]);
                  InputSettingsManager_1.InputSettingsManager.SetCombinationActionKeyboardKeys(
                    u,
                    _,
                  ),
                    a.SetKeyboardVersion(i),
                    Log_1.Log.CheckDebug() &&
                      Log_1.Log.Debug(
                        "InputSettings",
                        11,
                        "从Proto_InputSettingData刷新Action输入时，更新键鼠输入按键",
                        ["actionName", u],
                        ["keyNameMap", _],
                      );
                }
                break;
              case Protocol_1.Aki.Protocol.Aoh.uVn:
                if (i < a.GetGamepadVersion()) {
                  g = o?.GetCombinationActionConfigByActionName(u);
                  if (!g) continue;
                  var s = g.GamepadKeys;
                  InputSettingsManager_1.InputSettingsManager.SetCombinationActionGamepadKeys(
                    u,
                    s,
                  ),
                    Log_1.Log.CheckDebug() &&
                      Log_1.Log.Debug(
                        "InputSettings",
                        11,
                        "从Proto_InputSettingData刷新Action输入时，手柄配置版本号大于服务端手柄版本号，手柄使用默认配置",
                        ["actionName", u],
                        ["gamepadKeys", s],
                      );
                } else {
                  var p = new Map();
                  for (const l of r.Xrh) p.set(l.hYa[0], l.hYa[1]);
                  InputSettingsManager_1.InputSettingsManager.SetCombinationActionGamepadKeys(
                    u,
                    p,
                  ),
                    a.SetGamepadVersion(i),
                    Log_1.Log.CheckDebug() &&
                      Log_1.Log.Debug(
                        "InputSettings",
                        11,
                        "从Proto_InputSettingData刷新Action输入时，更新手柄输入按键",
                        ["actionName", u],
                        ["keyNameMap", p],
                      );
                }
            }
          }
        }
      }
    } else
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "InputSettings",
          11,
          "从Proto_InputSettingData刷新Action输入时，没有输入数据，还原至默认输入按键",
          ["actionData", t],
        ),
        InputSettingsManager_1.InputSettingsManager.RefreshCombinationActionKeys(
          !0,
        );
  }
  static BuildInputSettingsToProtoData() {
    var t,
      e,
      n,
      o,
      a,
      r,
      i,
      g,
      _ = new Protocol_1.Aki.Protocol.iYa(),
      s = new Protocol_1.Aki.Protocol.Doh(),
      p = new Protocol_1.Aki.Protocol.Doh(),
      u =
        ((s.nYa = Protocol_1.Aki.Protocol.Aoh.Proto_Mouse),
        (s.Sza = InputSettingsManager_1.InputSettingsManager.DeviceLang),
        (p.nYa = Protocol_1.Aki.Protocol.Aoh.uVn),
        InputSettingsManager_1.InputSettingsManager.GetActionBindingMap());
    for ([t, e] of u) {
      var c = [],
        c =
          (e.GetPcKeyNameList(c),
          this._Ya(t, s, c, e.GetKeyboardVersion()),
          []);
      e.GetGamepadKeyNameList(c), this._Ya(t, p, c, e.GetGamepadVersion());
    }
    for ([
      n,
      o,
    ] of InputSettingsManager_1.InputSettingsManager.GetAxisBindingMap()) {
      var l = new Map(),
        l =
          (o.GetPcKeyScaleMap(l),
          this.uYa(n, s, l, o.GetKeyboardVersion()),
          new Map());
      o.GetPcKeyScaleMap(l), this.uYa(n, p, l, o.GetKeyboardVersion());
    }
    for ([
      a,
      r,
    ] of InputSettingsManager_1.InputSettingsManager.GetCombinationActionBindingMap()) {
      var S = new Map(),
        S =
          (r.GetPcKeyNameMap(S),
          this.cYa(a, s, S, r.GetKeyboardVersion()),
          new Map());
      r.GetGamepadKeyNameMap(S), this.cYa(a, p, S, r.GetKeyboardVersion());
    }
    for ([
      i,
      g,
    ] of InputSettingsManager_1.InputSettingsManager.GetCombinationAxisBindingMap()) {
      var I = new Map(),
        I =
          (g.GetPcKeyNameMap(I),
          this.mYa(i, s, I, g.GetKeyboardVersion()),
          new Map());
      g.GetGamepadKeyNameMap(I), this.mYa(i, p, I, g.GetKeyboardVersion());
    }
    return (_.oYa = [s, p]), _;
  }
  static _Ya(t, e, n, o) {
    var a = new Protocol_1.Aki.Protocol.Loh();
    (a.dYa = t), (a.K7n = o), (a.hYa = n), (e.Yrh[t] = a);
  }
  static uYa(t, e, n, o) {
    var a,
      r,
      i = new Protocol_1.Aki.Protocol.Roh();
    (i.CYa = t), (i.K7n = o);
    for ([a, r] of n) i.Krh[a] = r;
    e.zrh[t] = i;
  }
  static cYa(t, e, n, o) {
    var a,
      r,
      i = new Protocol_1.Aki.Protocol.Jrh();
    (i.dYa = t), (i.K7n = o);
    for ([a, r] of n) {
      var g = new Protocol_1.Aki.Protocol.Toh();
      (g.hYa = [a, r]), i.Xrh.push(g);
    }
    e.Jrh[t] = i;
  }
  static mYa(t, e, n, o) {
    var a,
      r,
      i = new Protocol_1.Aki.Protocol.Zrh();
    (i.CYa = t), (i.K7n = o);
    for ([a, r] of n) {
      var g = new Protocol_1.Aki.Protocol.Toh();
      (g.hYa = [a, r]), i.Xrh.push(g);
    }
    e.Zrh[t] = i;
  }
}
(exports.InputSettingsController = InputSettingsController),
  ((_a = InputSettingsController).Wvi = () => {
    Info_1.Info.IsMobilePlatform() ||
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("InputSettings", 11, "登录直接请求服务端输入数据"),
      _a.InputSettingRequest());
  }),
  (InputSettingsController.eYa = (t) => {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("InputSettings", 11, "服务端通知更新按键信息"),
      _a.RefreshInputSettingsFromProtoData(t.iYa),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnInputSettingUpdateNotify,
      );
  }),
  (InputSettingsController.tYa = (t) => {
    !t || !t.iYa || t.iYa.oYa.length <= 0
      ? (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "InputSettings",
            11,
            "[TrySendInputData]服务端没有数据，使用本地配置",
          ),
        _a.teh(),
        ModelManager_1.ModelManager.LoginModel.IsNewAccount ||
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "InputSettings",
              11,
              "服务端没有数据，同步本地输入给服务端",
            ),
          _a.InputSettingUpdateRequest()))
      : (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "InputSettings",
            11,
            "服务端有对应数据,使用服务端数据刷新本地输入数据",
          ),
        _a.RefreshInputSettingsFromProtoData(t?.iYa),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnInputSettingResponse,
        ));
  }),
  (InputSettingsController.rYa = (t) => {
    t &&
      t.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
        t.Q4n,
        29049,
      );
  });
//# sourceMappingURL=InputSettingsController.js.map
