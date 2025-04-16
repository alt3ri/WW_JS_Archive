"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.KeySettingRowData = void 0);
const KeyPoolById_1 = require("../../../../Core/Define/ConfigQuery/KeyPoolById"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  InputKeyUtils_1 = require("../../../InputSettings/InputKeyUtils"),
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
      (this.Fl1 = ""),
      (this.Nl1 = ""),
      (this.Vl1 = ""),
      (this.ConnectedKeySettingIdList = []),
      (this.KeyTypeName = ""),
      (this.KeyTypeIconSpritePath = ""),
      (this.DetailTextId = ""),
      (this.ConfigId = 0),
      (this.SortId = 0),
      (this.BothActionName = []),
      (this.CanCombination = !1),
      (this.OpenViewType = 0),
      (this.IsCheckSameKey = !0),
      (this.ButtonTextId = void 0),
      (this.CanDisable = !1);
  }
  get KPi() {
    return "" === this.Fl1
      ? []
      : (KeyPoolById_1.configKeyPoolById.GetConfig(this.Fl1)?.ValidKeys ?? []);
  }
  get QPi() {
    return "" === this.Nl1
      ? []
      : (KeyPoolById_1.configKeyPoolById.GetConfig(this.Nl1)?.ValidKeys ?? []);
  }
  get XPi() {
    return "" === this.Vl1
      ? []
      : (KeyPoolById_1.configKeyPoolById.GetConfig(this.Vl1)?.ValidKeys ?? []);
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
      (this.SortId = t.SortId),
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
      (this.DetailTextId = t.DetailTextId),
      (this.BothActionName = t.BothActionName),
      (this.CanCombination = t.CanCombination),
      (this.OpenViewType = t.OpenViewType),
      (this.IsCheckSameKey = t.IsCheckSameKey),
      (this.ButtonTextId = t.ButtonTextId),
      (this.ConnectedKeySettingIdList = t.ConnectedKeySettingIdList),
      (this.CanDisable = t.CanDisable),
      (this.Fl1 = t.AllowKeysPool),
      (this.Nl1 = t.AllowMainKeysPool),
      (this.Vl1 = t.AllowSecondKeysPool),
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
    let r = "";
    for (let t = 0; t < s.length; t++) {
      var h = s[t],
        h = this.GetKeyIconPath(h, i);
      h && (r += `<texture=${h}>`), t < s.length - 1 && (r += e);
    }
    return r;
  }
  GetKeyIconPath(t, i) {
    var s = ConfigManager_1.ConfigManager.InputSettingsConfig;
    switch (i) {
      case 1:
        var e = s?.GetPcKeyConfig(t);
        if (e) return e.KeyIconPath;
        break;
      case 2:
        if (s?.GetGamepadKeyConfig(t))
          return (
            (e = InputKeyUtils_1.InputKeyUtils.GetLastGamepadEnum()),
            (e = InputKeyUtils_1.InputKeyUtils.GetGamepadKeyIconPathByType(
              t,
              e,
            )),
            StringUtils_1.StringUtils.IsBlank(e) ? void 0 : e
          );
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
      var r = [];
      if ((this.ActionBinding?.GetKeyNameList(r), !(r.length <= 0)))
        switch (t) {
          case 1:
            return [r[this.kPi]];
          case 2:
            return [r[this.wAn]];
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
      t = this.yWa(t);
      if (t) return [t];
    }
  }
  yWa(t) {
    var i = this.AxisBinding?.GetInputAxisKeyMap();
    if (i)
      for (var [s, e] of i) {
        var r = e.GetKey();
        if (r)
          switch (t) {
            case 1:
              if ((r.IsKeyboardKey || r.IsMouseButton) && e.Scale === this.HPi)
                return s;
              break;
            case 2:
              if (r.IsGamepadKey && e.Scale === this.BAn) return s;
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
      (s[t] = this.EWa(i)),
      this.ActionBinding.SetKeys(s));
  }
  EWa(t) {
    switch (t) {
      case 1:
        return "Keyboard_Invalid";
      case 2:
        return "Gamepad_Invalid";
      default:
        return "Keyboard_Invalid";
    }
  }
  IWa(t) {
    var i, s, e;
    this.AxisBinding &&
      this.AxisBinding.GetInputAxisKeyMap() &&
      (e = this.yWa(t)) &&
      void 0 !== (s = (i = this.GetAxisKeyScaleMap()).get(e)) &&
      (i.delete(e),
      (e = this.EWa(t)),
      i.set(e, s),
      this.AxisBinding.SetKeys(i));
  }
  exi(i, s) {
    for (let t = 0; t < i.length; t++) i[t] || (i[t] = this.EWa(s));
  }
  SetKey(t, i) {
    return this.IsActionOrAxis
      ? this.txi(t, i)
      : !this.IsCombination(i) && this.ixi(t[0], i);
  }
  DisableKey(t) {
    (this.OneActionBinding && this.TwoActionBinding) ||
      (this.IsActionOrAxis ? this.TWa(t) : this.LWa(t));
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
  TWa(t) {
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
      for (var [r, h] of a) {
        var n = InputSettings_1.InputSettings.GetKey(r);
        if (n) {
          if (
            (n.IsKeyboardKey || n.IsMouseButton) &&
            1 === e &&
            h === this.HPi
          ) {
            (t = r), (i = h);
            break;
          }
          if (n.IsGamepadKey && 2 === e && h === this.BAn) {
            (t = r), (i = h);
            break;
          }
        }
      }
      t && a.delete(t), i && s && a.set(s, i), this.AxisBinding.SetKeys(a);
    }
    return !0;
  }
  LWa(t) {
    this.IsCombination(t) || this.IWa(t);
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
        for (const r of this.AxisBinding.GetKey(t))
          if (r.KeyName === e) return !0;
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
