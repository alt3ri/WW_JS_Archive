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
      (this.GPi = void 0),
      (this.NPi = void 0),
      (this.OPi = void 0),
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
      (this.ButtonTextId = void 0);
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
      this.BothActionName && 2 === this.BothActionName.length
        ? ((t = this.BothActionName[0]),
          (i = this.BothActionName[1]),
          (this.OneActionBinding =
            InputSettingsManager_1.InputSettingsManager.GetActionBinding(t)),
          (this.TwoActionBinding =
            InputSettingsManager_1.InputSettingsManager.GetActionBinding(i)))
        : this.IsActionOrAxis
          ? (this.GPi =
              InputSettingsManager_1.InputSettingsManager.GetActionBinding(
                this.qPi,
              ))
          : ((this.OPi =
              InputSettingsManager_1.InputSettingsManager.GetCombinationAxisBindingByActionName(
                this.qPi,
              )),
            (this.NPi =
              InputSettingsManager_1.InputSettingsManager.GetAxisBinding(
                this.qPi,
              )));
  }
  $Pi() {
    return InputSettingsManager_1.InputSettingsManager.GetCombinationActionBindingByActionName(
      this.qPi,
    );
  }
  Clear() {
    (this.GPi = void 0),
      (this.NPi = void 0),
      (this.OPi = void 0),
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
      !!this.GPi &&
      ((t = this.GetKeyIndex(t)),
      this.GPi.GetKeyNameList((i = [])),
      !!(i = i[t])) &&
      InputSettings_1.InputSettings.IsValidKey(i)
    );
  }
  IsCombination(t) {
    if (this.IsActionOrAxis) {
      var i = this.$Pi();
      if (!i) return !this.zPi(t);
      if (i)
        switch (t) {
          case 1:
            return i.HasKeyboardCombinationAction();
          case 2:
            return i.HasGamepadCombinationAction();
        }
    } else if (this.OPi)
      switch (t) {
        case 1:
          return this.OPi.HasKeyboardCombinationAxis();
        case 2:
          return this.OPi.HasGamepadCombinationAxis();
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
          this.$Pi()?.GetPcKeyNameMap(e);
          break;
        case 2:
          this.$Pi()?.GetGamepadKeyNameMap(e);
          break;
        default:
          return;
      }
      if (e) for ([i, s] of e) return [i, s];
    } else if (this.GPi) {
      var r = [];
      switch ((this.GPi?.GetKeyNameList(r), t)) {
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
          this.OPi?.GetPcKeyNameMap(e);
          break;
        case 2:
          this.OPi?.GetGamepadKeyNameMap(e);
          break;
        default:
          return;
      }
      if (e) for ([i, s] of e) return [i, s];
    } else {
      var r = this.NPi?.GetInputAxisKeyMap();
      if (r)
        for (var [h, n] of r) {
          var a = n.GetKey();
          if (a)
            switch (t) {
              case 1:
                if (
                  (a.IsKeyboardKey || a.IsMouseButton) &&
                  n.Scale === this.HPi
                )
                  return [h];
                break;
              case 2:
                if (a.IsGamepadKey && n.Scale === this.BAn) return [h];
                break;
              default:
                return;
            }
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
  ZPi(t) {
    if (this.GPi) {
      var i = [],
        s = (this.GPi.GetKeyNameList(i), this.GetKeyIndex(t));
      switch (t) {
        case 1:
          i[s] = "Keyboard_Invalid";
          break;
        case 2:
          i[s] = "Gamepad_Invalid";
      }
      this.GPi.SetKeys(i);
    }
  }
  exi(i) {
    for (let t = 0; t < i.length; t++) i[t] || (i[t] = "Keyboard_Invalid");
  }
  SetKey(t, i) {
    return this.IsActionOrAxis
      ? this.txi(t, i)
      : !this.IsCombination(i) && this.ixi(t[0], i);
  }
  txi(t, i) {
    if (!t || t.length <= 0)
      this.GPi && this.GPi.SetKeys([]),
        InputSettingsManager_1.InputSettingsManager.ClearCombinationActionKeyMap();
    else {
      var s = this.GetCurrentKeyName(i);
      if (s[0] !== t[0] || s[1] !== t[1])
        if (
          (1 < s.length &&
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
            this.ZPi(i));
        else {
          (s = t[0]), (i = this.GetKeyIndex(i));
          if (this.GPi) {
            const t = [];
            return (this.GPi.GetKeyNameList(t), t)
              ? ((t[i] = s), this.exi(t), this.GPi.SetKeys(t), !0)
              : !1;
          }
        }
    }
    return !0;
  }
  ixi(s, e) {
    if (!this.NPi) return !1;
    if (!s && this.NPi) {
      const a = new Map();
      this.NPi.SetKeys(a);
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
      t && a.delete(t), i && s && a.set(s, i), this.NPi.SetKeys(a);
    }
    return !0;
  }
  SetAxisBindingKeys(t) {
    this.NPi?.SetKeys(t);
  }
  GetAxisKeyScaleMap() {
    var t = new Map();
    if (this.NPi) {
      var i = this.NPi.GetInputAxisKeyMap();
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
        var s = this.$Pi();
        if (s) return s.HasKey(t[0], t[1]);
        if (this.OPi) return this.OPi.HasKey(t[0], t[1]);
      }
    } else {
      var e = t[0];
      if (this.GPi)
        return (
          (s = this.GetKeyIndex(i)),
          this.GPi.GetKeyNameList((t = [])),
          t[s] === e
        );
      if (this.NPi) {
        t = this.GetKeyScale(i);
        for (const r of this.NPi.GetKey(t)) if (r.KeyName === e) return !0;
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
