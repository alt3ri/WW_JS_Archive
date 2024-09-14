"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.KeySettingRowData = void 0);
const Info_1 = require("../../../../Core/Common/Info"),
  InputSettings_1 = require("../../../InputSettings/InputSettings"),
  InputSettingsManager_1 = require("../../../InputSettings/InputSettingsManager"),
  ConfigManager_1 = require("../../../Manager/ConfigManager");
class KeySettingRowData {
  constructor() {
    (this.xPi = void 0),
      (this.wPi = void 0),
      (this.BPi = 0),
      (this.IsExpandDetail = !1),
      (this.bPi = ""),
      (this.qPi = ""),
      (this.IsActionOrAxis = !0),
      (this.ActionBinding = void 0),
      (this.AxisBinding = void 0),
      (this.CombinationAxisBinding = void 0),
      (this.OneActionBinding = void 0),
      (this.TwoActionBinding = void 0),
      (this.kPi = 0),
      (this.wAn = 0),
      (this.HPi = 0),
      (this.BAn = 0),
      (this.IsLock = !1),
      (this.KPi = []),
      (this.QPi = []),
      (this.XPi = []),
      (this.ConnectedKeySettingId = 0),
      (this.KeyTypeName = ""),
      (this.KeyTypeIconSpritePath = ""),
      (this.DetailTextId = ""),
      (this.ConfigId = 0),
      (this.BothActionName = []),
      (this.CanCombination = !1),
      (this.OpenViewType = 0),
      (this.IsCheckSameKey = !0),
      (this.ButtonTextId = void 0),
      (this.CanDisable = !1);
  }
  InitializeKeyType(t) {
    (this.ConfigId = t.TypeId),
      (this.xPi = t),
      (this.BPi = 1),
      (this.KeyTypeName = t.Name),
      (this.KeyTypeIconSpritePath = t.IconSpritePath);
  }
  InitializeKeySetting(t) {
    var i;
    (this.ConfigId = t.Id),
      (this.wPi = t),
      (this.BPi = 2),
      (this.bPi = t.Name),
      (this.qPi = t.ActionOrAxisName),
      (this.IsActionOrAxis = 1 === t.ActionOrAxis),
      (this.kPi = t.PcKeyIndex),
      (this.wAn = t.XBoxKeyIndex),
      (this.HPi = t.PcAxisValue),
      (this.BAn = t.XBoxAxisValue),
      (this.IsLock = t.IsLock),
      (this.KPi = t.AllowKeys),
      (this.DetailTextId = t.DetailTextId),
      (this.BothActionName = t.BothActionName),
      (this.CanCombination = t.CanCombination),
      (this.QPi = t.AllowMainKeys),
      (this.XPi = t.AllowSecondKeys),
      (this.OpenViewType = t.OpenViewType),
      (this.IsCheckSameKey = t.IsCheckSameKey),
      (this.ButtonTextId = t.ButtonTextId),
      (this.ConnectedKeySettingId = t.ConnectedKeySettingId),
      (this.CanDisable = t.CanDisable),
      this.BothActionName && 2 === this.BothActionName.length
        ? ((t = this.BothActionName[0]),
          (i = this.BothActionName[1]),
          (this.OneActionBinding =
            InputSettingsManager_1.InputSettingsManager.GetActionBinding(t)),
          (this.TwoActionBinding =
            InputSettingsManager_1.InputSettingsManager.GetActionBinding(i)))
        : this.IsActionOrAxis
          ? (this.ActionBinding =
              InputSettingsManager_1.InputSettingsManager.GetActionBinding(
                this.qPi,
              ))
          : ((this.CombinationAxisBinding =
              InputSettingsManager_1.InputSettingsManager.GetCombinationAxisBindingByAxisName(
                this.qPi,
              )),
            (this.AxisBinding =
              InputSettingsManager_1.InputSettingsManager.GetAxisBinding(
                this.qPi,
              )));
  }
  FindCombinationActionBinding() {
    return InputSettingsManager_1.InputSettingsManager.GetCombinationActionBindingByActionName(
      this.qPi,
    );
  }
  Clear() {
    (this.ActionBinding = void 0),
      (this.AxisBinding = void 0),
      (this.CombinationAxisBinding = void 0),
      (this.OneActionBinding = void 0),
      (this.TwoActionBinding = void 0);
  }
  GetRowType() {
    return this.BPi;
  }
  GetKeyTypeConfig() {
    return this.xPi;
  }
  GetKeySettingConfig() {
    return this.wPi;
  }
  GetSettingName() {
    return this.bPi;
  }
  GetDisplayKeyName(t) {
    return this.OneActionBinding && this.TwoActionBinding
      ? this.GetBothActionKeyName(
          this.OneActionBinding,
          this.TwoActionBinding,
          t,
        )
      : this.GetCurrentKeyName(t);
  }
  GetBothActionKeyName(t, i, s) {
    if (t && i)
      return (
        t.GetKeyNameList((t = [])),
        i.GetKeyNameList((i = [])),
        [t[this.GetKeyIndex(s)], i[this.GetKeyIndex(s)]]
      );
  }
  GetCurrentKeyName(t) {
    return this.IsActionOrAxis ? this.YPi(t) : this.JPi(t);
  }
  GetCurrentKeyNameRichText(t, i = "+") {
    var s = this.GetDisplayKeyName(t);
    return s ? this.GetKeyNameRichTextByKeyNameList(t, s, i) : "";
  }
  GetKeyNameRichTextByKeyNameList(i, s, e = "+") {
    if (!s) return "";
    let h = "";
    for (let t = 0; t < s.length; t++) {
      var r = s[t],
        r = this.GetKeyIconPath(r, i);
      r && (h += `<texture=${r}>`), t < s.length - 1 && (h += e);
    }
    return h;
  }
  GetKeyIconPath(t, i) {
    var s = ConfigManager_1.ConfigManager.InputSettingsConfig;
    switch (i) {
      case 1:
        var e = s?.GetPcKeyConfig(t);
        if (e) return e.KeyIconPath;
        break;
      case 2:
        e = s?.GetGamepadKeyConfig(t);
        if (e)
          return Info_1.Info.IsPsGamepad() ? e.PsKeyIconPath : e.KeyIconPath;
        break;
      default:
        return;
    }
  }
  zPi(t) {
    var i;
    return (
      !!this.ActionBinding &&
      ((t = this.GetKeyIndex(t)),
      this.ActionBinding.GetKeyNameList((i = [])),
      !!(i = i[t])) &&
      InputSettings_1.InputSettings.IsValidKey(i)
    );
  }
  IsCombination(t) {
    if (this.IsActionOrAxis) {
      var i = this.FindCombinationActionBinding();
      if ((i || this.zPi(t)) && i)
        switch (t) {
          case 1:
            return i.HasKeyboardCombinationAction();
          case 2:
            return i.HasGamepadCombinationAction();
        }
    } else if (this.CombinationAxisBinding)
      switch (t) {
        case 1:
          return this.CombinationAxisBinding.HasKeyboardCombinationAxis();
        case 2:
          return this.CombinationAxisBinding.HasGamepadCombinationAxis();
      }
    return !1;
  }
  YPi(t) {
    if (this.IsCombination(t)) {
      var i,
        s,
        e = new Map();
      switch (t) {
        case 1:
          this.FindCombinationActionBinding()?.GetPcKeyNameMap(e);
          break;
        case 2:
          this.FindCombinationActionBinding()?.GetGamepadKeyNameMap(e);
          break;
        default:
          return;
      }
      if (e) for ([i, s] of e) return [i, s];
    } else if (this.ActionBinding) {
      var h = [];
      if ((this.ActionBinding?.GetKeyNameList(h), !(h.length <= 0)))
        switch (t) {
          case 1:
            return [h[this.kPi]];
          case 2:
            return [h[this.wAn]];
          default:
            return;
        }
    }
  }
  JPi(t) {
    if (this.IsCombination(t)) {
      var i,
        s,
        e = new Map();
      switch (t) {
        case 1:
          this.CombinationAxisBinding?.GetPcKeyNameMap(e);
          break;
        case 2:
          this.CombinationAxisBinding?.GetGamepadKeyNameMap(e);
          break;
        default:
          return;
      }
      if (e) for ([i, s] of e) return [i, s];
    } else {
      t = this.S7a(t);
      if (t) return [t];
    }
  }
  S7a(t) {
    var i = this.AxisBinding?.GetInputAxisKeyMap();
    if (i)
      for (var [s, e] of i) {
        var h = e.GetKey();
        if (h)
          switch (t) {
            case 1:
              if ((h.IsKeyboardKey || h.IsMouseButton) && e.Scale === this.HPi)
                return s;
              break;
            case 2:
              if (h.IsGamepadKey && e.Scale === this.BAn) return s;
              break;
            default:
              return;
          }
      }
  }
  ChangeBothAction(t) {
    var i, s, e;
    this.OneActionBinding &&
      this.TwoActionBinding &&
      ((s = []),
      this.OneActionBinding.GetKeyNameList((i = [])),
      this.TwoActionBinding.GetKeyNameList(s),
      i) &&
      s &&
      ((e = s[(t = this.GetKeyIndex(t))]),
      (s[t] = i[t]),
      (i[t] = e),
      this.OneActionBinding.SetKeys(i),
      this.TwoActionBinding.SetKeys(s));
  }
  IsBothAction() {
    return void 0 !== this.OneActionBinding && void 0 !== this.TwoActionBinding;
  }
  ZPi(t, i) {
    var s;
    this.ActionBinding &&
      (this.ActionBinding.GetKeyNameList((s = [])),
      (s[t] = this.y7a(i)),
      this.ActionBinding.SetKeys(s));
  }
  y7a(t) {
    switch (t) {
      case 1:
        return "Keyboard_Invalid";
      case 2:
        return "Gamepad_Invalid";
      default:
        return "Keyboard_Invalid";
    }
  }
  E7a(t) {
    var i, s, e;
    this.AxisBinding &&
      this.AxisBinding.GetInputAxisKeyMap() &&
      (e = this.S7a(t)) &&
      void 0 !== (s = (i = this.GetAxisKeyScaleMap()).get(e)) &&
      (i.delete(e),
      (e = this.y7a(t)),
      i.set(e, s),
      this.AxisBinding.SetKeys(i));
  }
  exi(i, s) {
    for (let t = 0; t < i.length; t++) i[t] || (i[t] = this.y7a(s));
  }
  SetKey(t, i) {
    return this.IsActionOrAxis
      ? this.txi(t, i)
      : !this.IsCombination(i) && this.ixi(t[0], i);
  }
  DisableKey(t) {
    (this.OneActionBinding && this.TwoActionBinding) ||
      (this.IsActionOrAxis ? this.I7a(t) : this.T7a(t));
  }
  txi(t, i) {
    if (!t || t.length <= 0)
      this.ActionBinding && ((s = this.GetKeyIndex(i)), this.ZPi(s, i)),
        InputSettingsManager_1.InputSettingsManager.ClearCombinationActionKeyMap();
    else {
      var s = this.GetCurrentKeyName(i);
      if (!s || s[0] !== t[0] || s[1] !== t[1])
        if (
          (s &&
            1 < s.length &&
            InputSettingsManager_1.InputSettingsManager.RemoveCombinationActionKeyMap(
              this.qPi,
              s[0],
              s[1],
            ),
          1 !== t.length && this.CanCombination)
        )
          1 < t.length &&
            (InputSettingsManager_1.InputSettingsManager.AddCombinationActionKeyMap(
              this.qPi,
              t[0],
              t[1],
            ),
            (s = this.GetKeyIndex(i)),
            this.ZPi(s, i));
        else {
          var s = t[0],
            e = this.GetKeyIndex(i);
          if (this.ActionBinding) {
            const t = [];
            return (this.ActionBinding.GetKeyNameList(t), t)
              ? ((t[e] = s), this.exi(t, i), this.ActionBinding.SetKeys(t), !0)
              : !1;
          }
        }
    }
    return !0;
  }
  I7a(t) {
    var i;
    this.IsCombination(t)
      ? 1 < (i = this.GetCurrentKeyName(t)).length &&
        InputSettingsManager_1.InputSettingsManager.RemoveCombinationActionKeyMap(
          this.qPi,
          i[0],
          i[1],
        )
      : this.ActionBinding && ((i = this.GetKeyIndex(t)), this.ZPi(i, t));
  }
  ixi(s, e) {
    if (!this.AxisBinding) return !1;
    if (!s && this.AxisBinding) {
      const a = new Map();
      this.AxisBinding.SetKeys(a);
    } else {
      let t = void 0,
        i = void 0;
      const a = this.GetAxisKeyScaleMap();
      for (var [h, r] of a) {
        var n = InputSettings_1.InputSettings.GetKey(h);
        if (n) {
          if (
            (n.IsKeyboardKey || n.IsMouseButton) &&
            1 === e &&
            r === this.HPi
          ) {
            (t = h), (i = r);
            break;
          }
          if (n.IsGamepadKey && 2 === e && r === this.BAn) {
            (t = h), (i = r);
            break;
          }
        }
      }
      t && a.delete(t), i && s && a.set(s, i), this.AxisBinding.SetKeys(a);
    }
    return !0;
  }
  T7a(t) {
    this.IsCombination(t) || this.E7a(t);
  }
  SetAxisBindingKeys(t) {
    this.AxisBinding?.SetKeys(t);
  }
  GetAxisKeyScaleMap() {
    var t = new Map();
    if (this.AxisBinding) {
      var i = this.AxisBinding.GetInputAxisKeyMap();
      if (i) for (var [s, e] of i) t.set(s, e.Scale);
    }
    return t;
  }
  GetKeyIndex(t) {
    switch (t) {
      case 1:
        return this.kPi;
      case 2:
        return this.wAn;
      default:
        return -1;
    }
  }
  GetKeyScale(t) {
    switch (t) {
      case 1:
        return this.HPi;
      case 2:
        return this.BAn;
      default:
        return 0;
    }
  }
  IsAllowKey(t) {
    return !this.KPi || this.KPi.length <= 0 || this.KPi.includes(t);
  }
  IsAllowCombinationKey(t, i) {
    let s = !1;
    if (!(s = !this.QPi || this.QPi.length <= 0 || this.QPi.includes(t)))
      return !1;
    let e = !1;
    return (e = !this.XPi || this.XPi.length <= 0 || this.XPi.includes(i));
  }
  HasKey(t, i) {
    if (1 < t.length) {
      if (this.IsCombination(i)) {
        var s = this.FindCombinationActionBinding();
        if (s) return s.HasKey(t[0], t[1]);
        if (this.CombinationAxisBinding)
          return this.CombinationAxisBinding.HasKey(t[0], t[1]);
      }
    } else {
      var e = t[0];
      if (this.ActionBinding)
        return (
          (s = this.GetKeyIndex(i)),
          this.ActionBinding.GetKeyNameList((t = [])),
          t[s] === e
        );
      if (this.AxisBinding) {
        t = this.GetKeyScale(i);
        for (const h of this.AxisBinding.GetKey(t))
          if (h.KeyName === e) return !0;
      }
    }
    return !1;
  }
  GetActionOrAxisName() {
    return this.qPi;
  }
}
exports.KeySettingRowData = KeySettingRowData;
//# sourceMappingURL=KeySettingRowData.js.map
