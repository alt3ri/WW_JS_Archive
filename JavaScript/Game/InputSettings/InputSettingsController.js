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
  LocalStorage_1 = require("../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../Common/LocalStorageDefine"),
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
  static async Oza() {
    var t,
      e = await this.InputSettingRequestAsync();
    !e || !(t = e.iYa) || t.oYa.length <= 0
      ? (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "InputSettings",
            11,
            "服务端没有数据，将本地输入上传给服务端",
          ),
        this.InputSettingUpdateRequest())
      : (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "InputSettings",
            11,
            "服务端有对应数据,使用服务端数据刷新本地输入数据",
          ),
        this.tYa(e));
  }
  static InputSettingRequest() {
    var t = new Protocol_1.Aki.Protocol.Pth();
    Net_1.Net.Call(22420, Protocol_1.Aki.Protocol.Pth.create(t), this.tYa);
  }
  static async InputSettingRequestAsync() {
    var t = new Protocol_1.Aki.Protocol.Pth();
    return await Net_1.Net.CallAsync(
      22420,
      Protocol_1.Aki.Protocol.Pth.create(t),
    );
  }
  static InputSettingUpdateRequest() {
    var t = new Protocol_1.Aki.Protocol.xth();
    (t.iYa = this.BuildInputSettingsToProtoData()),
      Net_1.Net.Call(27722, Protocol_1.Aki.Protocol.xth.create(t), this.rYa);
  }
  static RefreshInputSettingsFromProtoData(e) {
    if (
      (ModelManager_1.ModelManager.SkillButtonUiModel.GamepadData?.AddChangeKeyReason(
        1,
      ),
      e)
    ) {
      let t = "";
      var n = e.oYa;
      if (!n || n.length <= 0)
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "InputSettings",
            11,
            "从Proto_InputSettingData刷新输入时，没有输入数据，还原至默认输入按键",
            ["inputSettingsData", e],
          ),
          InputSettingsManager_1.InputSettingsManager.ResetDefaultInputKey();
      else {
        for (const a of n) {
          var o = a.nYa;
          o === Protocol_1.Aki.Protocol.foh.Proto_Mouse &&
            ((t = InputSettingsManager_1.InputSettingsManager.DeviceLang),
            (InputSettingsManager_1.InputSettingsManager.DeviceLang = a.Sza)),
            this.sYa(a.Frh, o),
            this.aYa(a.Grh, o),
            this.lYa(a.Nrh, o);
        }
        Platform_1.Platform.IsPcPlatform() &&
          InputSettingsManager_1.InputSettingsManager.ChangeActionAndAxisPcKeys(
            t,
          );
      }
    } else
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "InputSettings",
          11,
          "从Proto_InputSettingData刷新输入时，没有输入数据，还原至默认输入按键",
          ["inputSettingsData", e],
        ),
        InputSettingsManager_1.InputSettingsManager.ResetDefaultInputKey();
    ModelManager_1.ModelManager.SkillButtonUiModel.GamepadData?.RemoveChangeKeyReason(
      1,
    );
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
                case Protocol_1.Aki.Protocol.foh.Proto_Mouse:
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
                case Protocol_1.Aki.Protocol.foh.uVn:
                  if (g < a.GetGamepadVersion()) {
                    u = o?.GetActionMappingConfigByActionName(L);
                    if (!u) continue;
                    var c = u.GamepadKeys,
                      S =
                        (a.SetGamepadKeys(c),
                        InputSettingsManager_1.InputSettingsManager.GetCombinationActionBindingByActionName(
                          L,
                        ));
                    if (S) {
                      var l,
                        I,
                        f = new Map();
                      S.GetGamepadKeyNameMap(f);
                      for ([l, I] of f)
                        InputSettingsManager_1.InputSettingsManager.RemoveCombinationActionKeyMap(
                          L,
                          l,
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
                    S = i.hYa;
                    if (
                      (a.SetGamepadKeys(S),
                      a.SetGamepadVersion(g),
                      Log_1.Log.CheckDebug() &&
                        Log_1.Log.Debug(
                          "InputSettings",
                          11,
                          "从Proto_InputSettingData刷新Action输入时，更新手柄输入按键",
                          ["actionName", L],
                          ["keyNameList", S],
                        ),
                      0 < S.length && "Gamepad_Invalid" !== S[0])
                    ) {
                      Log_1.Log.CheckDebug() &&
                        Log_1.Log.Debug(
                          "InputSettings",
                          11,
                          "Proto_InputSettingData服务器发现有单键配置,尝试删除本地组合键配置",
                          ["actionName", L],
                          ["keyNameList", S],
                        );
                      f =
                        InputSettingsManager_1.InputSettingsManager.GetCombinationActionBindingByActionName(
                          L,
                        );
                      if (f) {
                        var v,
                          M,
                          c = new Map();
                        f.GetGamepadKeyNameMap(c);
                        for ([v, M] of c)
                          InputSettingsManager_1.InputSettingsManager.RemoveCombinationActionKeyMap(
                            L,
                            v,
                            M,
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
              case Protocol_1.Aki.Protocol.foh.Proto_Mouse:
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
                    s = r.krh;
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
              case Protocol_1.Aki.Protocol.foh.uVn:
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
                    S = r.krh;
                  for (const v of Object.keys(S)) {
                    var l = S[v];
                    c.set(v, l);
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
              case Protocol_1.Aki.Protocol.foh.Proto_Mouse:
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
                  for (const c of r.Orh) _.set(c.hYa[0], c.hYa[1]);
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
              case Protocol_1.Aki.Protocol.foh.uVn:
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
                  for (const S of r.Orh) p.set(S.hYa[0], S.hYa[1]);
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
      s = new Protocol_1.Aki.Protocol.poh(),
      p = new Protocol_1.Aki.Protocol.poh(),
      u =
        ((s.nYa = Protocol_1.Aki.Protocol.foh.Proto_Mouse),
        (s.Sza = InputSettingsManager_1.InputSettingsManager.DeviceLang),
        (p.nYa = Protocol_1.Aki.Protocol.foh.uVn),
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
      var S = new Map(),
        S =
          (o.GetPcKeyScaleMap(S),
          this.uYa(n, s, S, o.GetKeyboardVersion()),
          new Map());
      o.GetPcKeyScaleMap(S), this.uYa(n, p, S, o.GetKeyboardVersion());
    }
    for ([
      a,
      r,
    ] of InputSettingsManager_1.InputSettingsManager.GetCombinationActionBindingMap()) {
      var l = new Map(),
        l =
          (r.GetPcKeyNameMap(l),
          this.cYa(a, s, l, r.GetKeyboardVersion()),
          new Map());
      r.GetGamepadKeyNameMap(l), this.cYa(a, p, l, r.GetKeyboardVersion());
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
    var a = new Protocol_1.Aki.Protocol.Coh();
    (a.dYa = t), (a.K7n = o), (a.hYa = n), (e.Grh[t] = a);
  }
  static uYa(t, e, n, o) {
    var a,
      r,
      i = new Protocol_1.Aki.Protocol.goh();
    (i.CYa = t), (i.K7n = o);
    for ([a, r] of n) i.krh[a] = r;
    e.Nrh[t] = i;
  }
  static cYa(t, e, n, o) {
    var a,
      r,
      i = new Protocol_1.Aki.Protocol.Frh();
    (i.dYa = t), (i.K7n = o);
    for ([a, r] of n) {
      var g = new Protocol_1.Aki.Protocol.moh();
      (g.hYa = [a, r]), i.Orh.push(g);
    }
    e.Frh[t] = i;
  }
  static mYa(t, e, n, o) {
    var a,
      r,
      i = new Protocol_1.Aki.Protocol.Vrh();
    (i.CYa = t), (i.K7n = o);
    for ([a, r] of n) {
      var g = new Protocol_1.Aki.Protocol.moh();
      (g.hYa = [a, r]), i.Orh.push(g);
    }
    e.Vrh[t] = i;
  }
}
(exports.InputSettingsController = InputSettingsController),
  ((_a = InputSettingsController).Wvi = () => {
    Info_1.Info.IsMobilePlatform() ||
      (LocalStorage_1.LocalStorage.GetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.IsInputSettingsSent,
        !1,
      )
        ? (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "InputSettings",
              11,
              "非首次登录，直接请求服务端输入数据",
            ),
          _a.InputSettingRequest())
        : (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "InputSettings",
              11,
              "首次登录，尝试将本地输入信息发送给服务端",
            ),
          _a.Oza(),
          LocalStorage_1.LocalStorage.SetPlayer(
            LocalStorageDefine_1.ELocalStoragePlayerKey.IsInputSettingsSent,
            !0,
          )));
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
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("InputSettings", 11, "服务端回复按键信息"),
      _a.RefreshInputSettingsFromProtoData(t?.iYa),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnInputSettingResponse,
      );
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
