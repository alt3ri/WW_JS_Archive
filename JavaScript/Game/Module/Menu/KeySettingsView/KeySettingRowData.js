"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.KeySettingRowData = void 0);
const InputSettings_1 = require("../../../InputSettings/InputSettings");
const InputSettingsManager_1 = require("../../../InputSettings/InputSettingsManager");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
class KeySettingRowData {
  constructor() {
    (this.xAi = void 0),
      (this.wAi = void 0),
      (this.BAi = 0),
      (this.IsExpandDetail = !1),
      (this.bAi = ""),
      (this.qAi = ""),
      (this.IsActionOrAxis = !0),
      (this.GAi = void 0),
      (this.NAi = void 0),
      (this.OAi = void 0),
      (this.OneActionBinding = void 0),
      (this.TwoActionBinding = void 0),
      (this.kAi = 0),
      (this.dRn = 0),
      (this.HAi = 0),
      (this.CRn = 0),
      (this.IsLock = !1),
      (this.KAi = []),
      (this.QAi = []),
      (this.XAi = []),
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
      (this.xAi = t),
      (this.BAi = 1),
      (this.KeyTypeName = t.Name),
      (this.KeyTypeIconSpritePath = t.IconSpritePath);
  }
  InitializeKeySetting(t) {
    let i;
    (this.ConfigId = t.Id),
      (this.wAi = t),
      (this.BAi = 2),
      (this.bAi = t.Name),
      (this.qAi = t.ActionOrAxisName),
      (this.IsActionOrAxis = t.ActionOrAxis === 1),
      (this.kAi = t.PcKeyIndex),
      (this.dRn = t.XBoxKeyIndex),
      (this.HAi = t.PcAxisValue),
      (this.CRn = t.XBoxAxisValue),
      (this.IsLock = t.IsLock),
      (this.KAi = t.AllowKeys),
      (this.DetailTextId = t.DetailTextId),
      (this.BothActionName = t.BothActionName),
      (this.CanCombination = t.CanCombination),
      (this.QAi = t.AllowMainKeys),
      (this.XAi = t.AllowSecondKeys),
      (this.OpenViewType = t.OpenViewType),
      (this.IsCheckSameKey = t.IsCheckSameKey),
      (this.ButtonTextId = t.ButtonTextId),
      (this.ConnectedKeySettingId = t.ConnectedKeySettingId),
      this.BothActionName && this.BothActionName.length === 2
        ? ((t = this.BothActionName[0]),
          (i = this.BothActionName[1]),
          (this.OneActionBinding =
            InputSettingsManager_1.InputSettingsManager.GetActionBinding(t)),
          (this.TwoActionBinding =
            InputSettingsManager_1.InputSettingsManager.GetActionBinding(i)))
        : this.IsActionOrAxis
          ? (this.GAi =
              InputSettingsManager_1.InputSettingsManager.GetActionBinding(
                this.qAi,
              ))
          : ((this.OAi =
              InputSettingsManager_1.InputSettingsManager.GetCombinationAxisBindingByActionName(
                this.qAi,
              )),
            (this.NAi =
              InputSettingsManager_1.InputSettingsManager.GetAxisBinding(
                this.qAi,
              )));
  }
  $Ai() {
    return InputSettingsManager_1.InputSettingsManager.GetCombinationActionBindingByActionName(
      this.qAi,
    );
  }
  Clear() {
    (this.GAi = void 0),
      (this.NAi = void 0),
      (this.OAi = void 0),
      (this.OneActionBinding = void 0),
      (this.TwoActionBinding = void 0);
  }
  GetRowType() {
    return this.BAi;
  }
  GetKeyTypeConfig() {
    return this.xAi;
  }
  GetKeySettingConfig() {
    return this.wAi;
  }
  GetSettingName() {
    return this.bAi;
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
  GetBothActionKeyName(t, i, e) {
    if (t && i)
      return (
        t.GetKeyNameList((t = [])),
        i.GetKeyNameList((i = [])),
        [t[this.GetKeyIndex(e)], i[this.GetKeyIndex(e)]]
      );
  }
  GetCurrentKeyName(t) {
    return this.IsActionOrAxis ? this.YAi(t) : this.JAi(t);
  }
  GetCurrentKeyNameRichText(t, i = "+") {
    const e = this.GetDisplayKeyName(t);
    return e ? this.GetKeyNameRichTextByKeyNameList(t, e, i) : "";
  }
  GetKeyNameRichTextByKeyNameList(i, e, s = "+") {
    if (!e) return "";
    let r = "";
    for (let t = 0; t < e.length; t++) {
      var h = e[t];
      var h = this.GetKeyIconPath(h, i);
      h && (r += `<texture=${h}>`), t < e.length - 1 && (r += s);
    }
    return r;
  }
  GetKeyIconPath(t, i) {
    const e = ConfigManager_1.ConfigManager.InputSettingsConfig;
    switch (i) {
      case 1:
        var s = e?.GetPcKeyConfig(t);
        if (s) return s.KeyIconPath;
        break;
      case 2:
        s = e?.GetGamepadKeyConfig(t);
        if (s)
          return ModelManager_1.ModelManager.PlatformModel.GetCurrentDeviceControllerPlatform() ===
            7
            ? s.PsKeyIconPath
            : s.KeyIconPath;
        break;
      default:
    }
  }
  zAi(t) {
    let i;
    return (
      !!this.GAi &&
      ((t = this.GetKeyIndex(t)),
      this.GAi.GetKeyNameList((i = [])),
      !!(i = i[t])) &&
      InputSettings_1.InputSettings.IsValidKey(i)
    );
  }
  IsCombination(t) {
    if (this.IsActionOrAxis) {
      const i = this.$Ai();
      if (!i) return !this.zAi(t);
      if (i)
        switch (t) {
          case 1:
            return i.HasKeyboardCombinationAction();
          case 2:
            return i.HasGamepadCombinationAction();
        }
    } else if (this.OAi)
      switch (t) {
        case 1:
          return this.OAi.HasKeyboardCombinationAxis();
        case 2:
          return this.OAi.HasGamepadCombinationAxis();
      }
    return !1;
  }
  YAi(t) {
    if (this.IsCombination(t)) {
      let i;
      let e;
      const s = new Map();
      switch (t) {
        case 1:
          this.$Ai()?.GetPcKeyNameMap(s);
          break;
        case 2:
          this.$Ai()?.GetGamepadKeyNameMap(s);
          break;
        default:
          return;
      }
      if (s) for ([i, e] of s) return [i, e];
    } else if (this.GAi) {
      const r = [];
      switch ((this.GAi?.GetKeyNameList(r), t)) {
        case 1:
          return [r[this.kAi]];
        case 2:
          return [r[this.dRn]];
        default:
      }
    }
  }
  JAi(t) {
    if (this.IsCombination(t)) {
      let i;
      let e;
      const s = new Map();
      switch (t) {
        case 1:
          this.OAi?.GetPcKeyNameMap(s);
          break;
        case 2:
          this.OAi?.GetGamepadKeyNameMap(s);
          break;
        default:
          return;
      }
      if (s) for ([i, e] of s) return [i, e];
    } else {
      const r = this.NAi?.GetInputAxisKeyMap();
      if (r)
        for (const [h, n] of r) {
          const a = n.GetKey();
          if (a)
            switch (t) {
              case 1:
                if (
                  (a.IsKeyboardKey || a.IsMouseButton) &&
                  n.Scale === this.HAi
                )
                  return [h];
                break;
              case 2:
                if (a.IsGamepadKey && n.Scale === this.CRn) return [h];
                break;
              default:
                return;
            }
        }
    }
  }
  ChangeBothAction(t) {
    let i, e, s;
    this.OneActionBinding &&
      this.TwoActionBinding &&
      ((e = []),
      this.OneActionBinding.GetKeyNameList((i = [])),
      this.TwoActionBinding.GetKeyNameList(e),
      i) &&
      e &&
      ((s = e[(t = this.GetKeyIndex(t))]),
      (e[t] = i[t]),
      (i[t] = s),
      this.OneActionBinding.SetKeys(i),
      this.TwoActionBinding.SetKeys(e));
  }
  ZAi(t) {
    if (this.GAi) {
      const i = [];
      const e = (this.GAi.GetKeyNameList(i), this.GetKeyIndex(t));
      switch (t) {
        case 1:
          i[e] = "Keyboard_Invalid";
          break;
        case 2:
          i[e] = "Gamepad_Invalid";
      }
      this.GAi.SetKeys(i);
    }
  }
  ePi(i) {
    for (let t = 0; t < i.length; t++) i[t] || (i[t] = "Keyboard_Invalid");
  }
  SetKey(t, i) {
    return this.IsActionOrAxis
      ? this.tPi(t, i)
      : !this.IsCombination(i) && this.iPi(t[0], i);
  }
  tPi(t, i) {
    if (!t || t.length <= 0)
      this.GAi && this.GAi.SetKeys([]),
        InputSettingsManager_1.InputSettingsManager.ClearCombinationActionKeyMap();
    else {
      let e = this.GetCurrentKeyName(i);
      if (e[0] !== t[0] || e[1] !== t[1])
        if (
          (e.length > 1 &&
            InputSettingsManager_1.InputSettingsManager.RemoveCombinationActionKeyMap(
              this.qAi,
              e[0],
              e[1],
            ),
          t.length !== 1 && this.CanCombination)
        )
          t.length > 1 &&
            (InputSettingsManager_1.InputSettingsManager.AddCombinationActionKeyMap(
              this.qAi,
              t[0],
              t[1],
            ),
            this.ZAi(i));
        else {
          (e = t[0]), (i = this.GetKeyIndex(i));
          if (this.GAi) {
            const t = [];
            return (this.GAi.GetKeyNameList(t), t)
              ? ((t[i] = e), this.ePi(t), this.GAi.SetKeys(t), !0)
              : !1;
          }
        }
    }
    return !0;
  }
  iPi(e, s) {
    if (!this.NAi) return !1;
    if (!e && this.NAi) {
      const a = new Map();
      this.NAi.SetKeys(a);
    } else {
      let t = void 0;
      let i = void 0;
      const a = this.GetAxisKeyScaleMap();
      for (const [r, h] of a) {
        const n = InputSettings_1.InputSettings.GetKey(r);
        if (n) {
          if (
            (n.IsKeyboardKey || n.IsMouseButton) &&
            s === 1 &&
            h === this.HAi
          ) {
            (t = r), (i = h);
            break;
          }
          if (n.IsGamepadKey && s === 2 && h === this.CRn) {
            (t = r), (i = h);
            break;
          }
        }
      }
      t && a.delete(t), i && e && a.set(e, i), this.NAi.SetKeys(a);
    }
    return !0;
  }
  SetAxisBindingKeys(t) {
    this.NAi?.SetKeys(t);
  }
  GetAxisKeyScaleMap() {
    const t = new Map();
    if (this.NAi) {
      const i = this.NAi.GetInputAxisKeyMap();
      if (i) for (const [e, s] of i) t.set(e, s.Scale);
    }
    return t;
  }
  GetKeyIndex(t) {
    switch (t) {
      case 1:
        return this.kAi;
      case 2:
        return this.dRn;
      default:
        return -1;
    }
  }
  GetKeyScale(t) {
    switch (t) {
      case 1:
        return this.HAi;
      case 2:
        return this.CRn;
      default:
        return 0;
    }
  }
  IsAllowKey(t) {
    return !this.KAi || this.KAi.length <= 0 || this.KAi.includes(t);
  }
  IsAllowCombinationKey(t, i) {
    let e = !1;
    if (!(e = !this.QAi || this.QAi.length <= 0 || this.QAi.includes(t)))
      return !1;
    let s = !1;
    return (s = !this.XAi || this.XAi.length <= 0 || this.XAi.includes(i));
  }
  HasKey(t, i) {
    if (t.length > 1) {
      if (this.IsCombination(i)) {
        var e = this.$Ai();
        if (e) return e.HasKey(t[0], t[1]);
        if (this.OAi) return this.OAi.HasKey(t[0], t[1]);
      }
    } else {
      const s = t[0];
      if (this.GAi)
        return (
          (e = this.GetKeyIndex(i)),
          this.GAi.GetKeyNameList((t = [])),
          t[e] === s
        );
      if (this.NAi) {
        t = this.GetKeyScale(i);
        for (const r of this.NAi.GetKey(t)) if (r.KeyName === s) return !0;
      }
    }
    return !1;
  }
  GetActionOrAxisName() {
    return this.qAi;
  }
}
exports.KeySettingRowData = KeySettingRowData;
// # sourceMappingURL=KeySettingRowData.js.map
