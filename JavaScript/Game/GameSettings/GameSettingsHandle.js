"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameSettingsHandle = void 0);
const Info_1 = require("../../Core/Common/Info"),
  Log_1 = require("../../Core/Common/Log"),
  EventDefine_1 = require("../Common/Event/EventDefine"),
  EventSystem_1 = require("../Common/Event/EventSystem"),
  LocalStorage_1 = require("../Common/LocalStorage");
class GameSettingsHandle {
  constructor(t) {
    (this.wGa = void 0),
      (this.qte = 0),
      (this.BGa = 0),
      (this.bGa = void 0),
      (this.IsSkipInitializeApply = !1),
      (this.GetDefaultValueCallback = void 0),
      (this.qGa = void 0),
      (this.IsInitializeApplied = !1),
      (this.GGa = void 0),
      (this.HasLocalStorageValue = !1),
      (this.wGa = t.GameSettingId),
      (this.bGa = t.LocalStorageGlobalKey),
      (this.GGa = t.AllowPlatform),
      (this.IsSkipInitializeApply = !0 === t.IsSkipInitializeApply),
      (this.GetDefaultValueCallback = t.GetDefaultValue),
      (this.qGa = t.ApplyCallback);
  }
  Load() {
    var t;
    return (
      void 0 !== this.bGa &&
      void 0 !== (t = LocalStorage_1.LocalStorage.GetGlobal(this.bGa)) &&
      ((this.HasLocalStorageValue = !0),
      (this.qte = Number(t)),
      (this.BGa = this.qte),
      !0)
    );
  }
  Save() {
    return (
      void 0 !== this.bGa &&
      ((this.HasLocalStorageValue = !0),
      LocalStorage_1.LocalStorage.SetGlobal(this.bGa, this.BGa))
    );
  }
  SetApplySave(t) {
    return this.Set(t), !!this.Apply() && this.Save();
  }
  Set(t, e = !1) {
    (this.BGa = t),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnGameplaySettingsSet,
        this.wGa,
        t,
        e,
      );
  }
  RefreshCurrentValue() {
    this.qte = this.BGa;
  }
  Apply() {
    return !!this.DMa(this.BGa) && (this.RefreshCurrentValue(), !0);
  }
  DMa(t) {
    return !(!this.OGa() || (this.qGa && !this.qGa(t)));
  }
  OGa() {
    return !this.GGa || this.GGa.has(Info_1.Info.PlatformType);
  }
  InitializeApply() {
    var t;
    return (
      !this.IsInitializeApplied &&
      ((t = this.Apply()),
      (this.IsInitializeApplied = !0),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "GameSettings",
          8,
          "初始化应用游戏设置",
          ["GameSettingId", this.wGa],
          ["bSuccess", t],
        ),
      t)
    );
  }
  ReApply() {
    return this.DMa(this.qte);
  }
  GetGameSettingId() {
    return this.wGa;
  }
  GetCurrentValue() {
    return this.qte;
  }
  GetEditorValue() {
    return this.BGa;
  }
}
exports.GameSettingsHandle = GameSettingsHandle;
//# sourceMappingURL=GameSettingsHandle.js.map
