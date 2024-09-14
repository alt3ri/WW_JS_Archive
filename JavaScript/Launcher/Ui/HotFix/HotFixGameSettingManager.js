"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HotFixGameSettingManager = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  LauncherConfigLib_1 = require("../../Define/LauncherConfigLib"),
  LauncherLog_1 = require("../../Util/LauncherLog"),
  LauncherStorageLib_1 = require("../../Util/LauncherStorageLib"),
  LaunchUtil_1 = require("../LaunchUtil"),
  MASTERVOLUMEFUNCTION = 1,
  VOICEVOLUMEFUNCTION = 2,
  MUSICVOLUMEFUNCTION = 3,
  SFXVOLUMEFUNCTION = 4,
  RESOLUTION = 6,
  AMBVOLUMEFUNCTION = 69,
  UIVOLUMEFUNCTION = 70,
  DEFAULT_VOLUME_VALUE = 100;
class HotFixGameSettingManager {
  ApplyGameSettings() {
    var e = this.QSa();
    e &&
      (this.rNi(e, MASTERVOLUMEFUNCTION),
      this.rNi(e, VOICEVOLUMEFUNCTION),
      this.rNi(e, MUSICVOLUMEFUNCTION),
      this.rNi(e, SFXVOLUMEFUNCTION),
      this.rNi(e, AMBVOLUMEFUNCTION),
      this.rNi(e, UIVOLUMEFUNCTION),
      this.rNi(e, RESOLUTION));
  }
  VJa() {
    var e = LauncherStorageLib_1.LauncherStorageLib.GetGlobal(
      LauncherStorageLib_1.ELauncherStorageGlobalKey.MenuData,
      void 0,
    );
    if (void 0 === e) {
      var t = LauncherStorageLib_1.LauncherStorageLib.GetGlobal(
        LauncherStorageLib_1.ELauncherStorageGlobalKey.PlayMenuInfo,
        "",
      );
      if (t && "" !== t) return LaunchUtil_1.LaunchUtil.ObjToMap(JSON.parse(t));
    }
    return e;
  }
  QSa() {
    let e = this.VJa();
    return (
      e ||
        (LauncherLog_1.LauncherLog.Info(
          "[HotFixGameSettingManager][GameSettings]找不到玩家保存数据，从默认配置表中读取",
        ),
        (e = new Map())),
      this.KSa(
        e,
        MASTERVOLUMEFUNCTION,
        LauncherStorageLib_1.ELauncherStorageGlobalKey.MasterVolume,
        DEFAULT_VOLUME_VALUE,
      ),
      this.KSa(
        e,
        VOICEVOLUMEFUNCTION,
        LauncherStorageLib_1.ELauncherStorageGlobalKey.VoiceVolume,
        DEFAULT_VOLUME_VALUE,
      ),
      this.KSa(
        e,
        MUSICVOLUMEFUNCTION,
        LauncherStorageLib_1.ELauncherStorageGlobalKey.MusicVolume,
        DEFAULT_VOLUME_VALUE,
      ),
      this.KSa(
        e,
        SFXVOLUMEFUNCTION,
        LauncherStorageLib_1.ELauncherStorageGlobalKey.SFXVolume,
        DEFAULT_VOLUME_VALUE,
      ),
      this.KSa(
        e,
        AMBVOLUMEFUNCTION,
        LauncherStorageLib_1.ELauncherStorageGlobalKey.AMBVolume,
        DEFAULT_VOLUME_VALUE,
      ),
      this.KSa(
        e,
        UIVOLUMEFUNCTION,
        LauncherStorageLib_1.ELauncherStorageGlobalKey.UIVolume,
        DEFAULT_VOLUME_VALUE,
      ),
      this.KSa(
        e,
        RESOLUTION,
        LauncherStorageLib_1.ELauncherStorageGlobalKey.PcResolutionIndex,
      ),
      e
    );
  }
  KSa(e, t, a, i = 0) {
    var a = LauncherStorageLib_1.LauncherStorageLib.GetGlobal(a, void 0);
    void 0 !== a
      ? (LauncherLog_1.LauncherLog.Debug(
          "[HotFixGameSettingManager][GameSettings]设置游戏数据Map时，存在新版本的游戏设置，将读取新版本的游戏设置数据",
          ["functionId", t],
          ["value", a],
        ),
        e.set(t, Number(a)))
      : e.has(t) ||
        ((a = this.Uka(t)),
        LauncherLog_1.LauncherLog.Info(
          "[HotFixGameSettingManager][GameSettings]设置游戏数据Map",
          ["functionId", t],
          ["defaultValue", a],
          ["NotFoundValue", i],
        ),
        e.set(t, a ?? i));
  }
  Uka(e) {
    e =
      LauncherConfigLib_1.LauncherConfigLib.GetGameSettingsMenuConfigByFunctionId(
        e,
      );
    if (e) return e.GetDefaultValue();
  }
  rNi(e, t) {
    var a = e.get(t);
    if (void 0 === a)
      LauncherLog_1.LauncherLog.Info(
        "[HotFixGameSettingManager][GameSettings]找不到对应热更游戏设置数据",
        ["functionId", t],
        ["value", a],
      );
    else
      switch (
        (LauncherLog_1.LauncherLog.Info(
          "[HotFixGameSettingManager][GameSettings]应用热更游戏设置数据",
          ["functionId", t],
          ["value", a],
        ),
        t)
      ) {
        case MASTERVOLUMEFUNCTION:
          this.$Sa("Master_Audio_Bus_Volume", a);
          break;
        case VOICEVOLUMEFUNCTION:
          this.$Sa("Vocal_Audio_Bus_Volume", a);
          break;
        case MUSICVOLUMEFUNCTION:
          this.$Sa("Music_Audio_Bus_Volume", a);
          break;
        case SFXVOLUMEFUNCTION:
          this.$Sa("SFX_Audio_Bus_Volume", a);
          break;
        case AMBVOLUMEFUNCTION:
          this.$Sa("AMB_Audio_Bus_Volume", a);
          break;
        case UIVOLUMEFUNCTION:
          this.$Sa("UI_Audio_Bus_Volume", a);
          break;
        case RESOLUTION:
          this.XSa(a);
      }
  }
  $Sa(e, t) {
    UE.AkGameplayStatics.SetRTPCValue(void 0, t, 0, void 0, new UE.FName(e));
  }
  XSa(e) {
    var t = this.GetResolutionList(),
      t =
        (LauncherLog_1.LauncherLog.Info(
          "[HotFixGameSettingManager][GameSettings]当前分辨率列表",
          ["resolutionList", t],
          ["value", e],
        ),
        t[e]);
    t &&
      (LauncherLog_1.LauncherLog.Info(
        "[HotFixGameSettingManager][GameSettings]热更时应用分辨率",
        ["value", e],
        ["resolution", t],
      ),
      (e = UE.GameUserSettings.GetGameUserSettings()).SetScreenResolution(t),
      e.ApplySettings(!0));
  }
  GetResolutionList() {
    var t = [],
      e = (0, puerts_1.$ref)(void 0);
    if (UE.KismetSystemLibrary.GetSupportedFullscreenResolutions(e)) {
      var a = (0, puerts_1.$unref)(e);
      for (let e = a.Num() - 1; 0 <= e; --e) {
        var i = a.Get(e);
        i && t.push(i);
      }
    }
    return (
      t.length
        ? t.sort((e, t) => (e.X === t.X ? t.Y - e.Y : t.X - e.X))
        : (LauncherLog_1.LauncherLog.Info(
            "[HotFixGameSettingManager][GameSettings]获取当前分辨率列表失败",
          ),
          t.push(
            UE.GameUserSettings.GetGameUserSettings().GetDesktopResolution(),
          )),
      t
    );
  }
}
exports.HotFixGameSettingManager = HotFixGameSettingManager;
//# sourceMappingURL=HotFixGameSettingManager.js.map
