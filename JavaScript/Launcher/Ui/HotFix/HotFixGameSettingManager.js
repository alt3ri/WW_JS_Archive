"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HotFixGameSettingManager = void 0);
const UE = require("ue"),
  LauncherConfigLib_1 = require("../../Define/LauncherConfigLib"),
  CloudGameManagerLauncher_1 = require("../../Platform/CloudGameManagerLauncher"),
  Platform_1 = require("../../Platform/Platform"),
  LauncherGameSettingLib_1 = require("../../Util/LauncherGameSettingLib"),
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
    var e = this.$Sa();
    e &&
      (this.rNi(e, MASTERVOLUMEFUNCTION),
      this.rNi(e, VOICEVOLUMEFUNCTION),
      this.rNi(e, MUSICVOLUMEFUNCTION),
      this.rNi(e, SFXVOLUMEFUNCTION),
      this.rNi(e, AMBVOLUMEFUNCTION),
      this.rNi(e, UIVOLUMEFUNCTION),
      CloudGameManagerLauncher_1.CloudGameManagerLauncher.IsPreLaunch ||
        this.rNi(e, RESOLUTION));
  }
  Mnh() {
    var e = LauncherStorageLib_1.LauncherStorageLib.GetGlobal(
      LauncherStorageLib_1.ELauncherStorageGlobalKey.MenuData,
      void 0,
    );
    if (void 0 === e) {
      var a = LauncherStorageLib_1.LauncherStorageLib.GetGlobal(
        LauncherStorageLib_1.ELauncherStorageGlobalKey.PlayMenuInfo,
        "",
      );
      if (a && "" !== a) return LaunchUtil_1.LaunchUtil.ObjToMap(JSON.parse(a));
    }
    return e;
  }
  $Sa() {
    let e = this.Mnh();
    return (
      e ||
        (LauncherLog_1.LauncherLog.Info(
          "[HotFixGameSettingManager][GameSettings]找不到玩家保存数据，从默认配置表中读取",
        ),
        (e = new Map())),
      this.XSa(
        e,
        MASTERVOLUMEFUNCTION,
        LauncherStorageLib_1.ELauncherStorageGlobalKey.MasterVolume,
        DEFAULT_VOLUME_VALUE,
      ),
      this.XSa(
        e,
        VOICEVOLUMEFUNCTION,
        LauncherStorageLib_1.ELauncherStorageGlobalKey.VoiceVolume,
        DEFAULT_VOLUME_VALUE,
      ),
      this.XSa(
        e,
        MUSICVOLUMEFUNCTION,
        LauncherStorageLib_1.ELauncherStorageGlobalKey.MusicVolume,
        DEFAULT_VOLUME_VALUE,
      ),
      this.XSa(
        e,
        SFXVOLUMEFUNCTION,
        LauncherStorageLib_1.ELauncherStorageGlobalKey.SFXVolume,
        DEFAULT_VOLUME_VALUE,
      ),
      this.XSa(
        e,
        AMBVOLUMEFUNCTION,
        LauncherStorageLib_1.ELauncherStorageGlobalKey.AMBVolume,
        DEFAULT_VOLUME_VALUE,
      ),
      this.XSa(
        e,
        UIVOLUMEFUNCTION,
        LauncherStorageLib_1.ELauncherStorageGlobalKey.UIVolume,
        DEFAULT_VOLUME_VALUE,
      ),
      this.XSa(
        e,
        RESOLUTION,
        LauncherStorageLib_1.ELauncherStorageGlobalKey.PcResolutionIndex,
      ),
      e
    );
  }
  XSa(e, a, t, i = 0) {
    var t = LauncherStorageLib_1.LauncherStorageLib.GetGlobal(t, void 0);
    void 0 !== t
      ? (LauncherLog_1.LauncherLog.Debug(
          "[HotFixGameSettingManager][GameSettings]设置游戏数据Map时，存在新版本的游戏设置，将读取新版本的游戏设置数据",
          ["functionId", a],
          ["value", t],
        ),
        e.set(a, Number(t)))
      : e.has(a) ||
        ((t = this.wFa(a)),
        LauncherLog_1.LauncherLog.Info(
          "[HotFixGameSettingManager][GameSettings]设置游戏数据Map",
          ["functionId", a],
          ["defaultValue", t],
          ["NotFoundValue", i],
        ),
        e.set(a, t ?? i));
  }
  wFa(e) {
    e =
      LauncherConfigLib_1.LauncherConfigLib.GetGameSettingsMenuConfigByFunctionId(
        e,
      );
    if (e) return e.GetDefaultValue();
  }
  rNi(e, a) {
    var t = e.get(a);
    if (void 0 === t)
      LauncherLog_1.LauncherLog.Info(
        "[HotFixGameSettingManager][GameSettings]找不到对应热更游戏设置数据",
        ["functionId", a],
        ["value", t],
      );
    else
      switch (
        (LauncherLog_1.LauncherLog.Info(
          "[HotFixGameSettingManager][GameSettings]应用热更游戏设置数据",
          ["functionId", a],
          ["value", t],
        ),
        a)
      ) {
        case MASTERVOLUMEFUNCTION:
          this.YSa("volume_master", t);
          break;
        case VOICEVOLUMEFUNCTION:
          this.YSa("volume_voice", t);
          break;
        case MUSICVOLUMEFUNCTION:
          this.YSa("volume_music", t);
          break;
        case SFXVOLUMEFUNCTION:
          this.YSa("volume_sfx", t);
          break;
        case AMBVOLUMEFUNCTION:
          this.YSa("volume_sfx_amb", t);
          break;
        case UIVOLUMEFUNCTION:
          this.YSa("volume_sfx_ui", t);
          break;
        case RESOLUTION:
          this.JSa(t);
      }
  }
  YSa(e, a) {
    UE.AkGameplayStatics.SetRTPCValue(void 0, a, 0, void 0, new UE.FName(e));
  }
  JSa(e) {
    var a;
    !Platform_1.Platform.IsCloudGame() &&
      ((a = this.GetResolutionList()),
      LauncherLog_1.LauncherLog.Info(
        "[HotFixGameSettingManager][GameSettings]当前分辨率列表",
        ["resolutionList", a],
        ["value", e],
      ),
      (a = a[e])) &&
      (LauncherLog_1.LauncherLog.Info(
        "[HotFixGameSettingManager][GameSettings]热更时应用分辨率",
        ["value", e],
        ["resolution", a],
      ),
      (e = UE.GameUserSettings.GetGameUserSettings()).SetScreenResolution(a),
      e.ApplySettings(!0));
  }
  GetResolutionList() {
    return LauncherGameSettingLib_1.LauncherGameSettingLib.GetResolutionList();
  }
}
exports.HotFixGameSettingManager = HotFixGameSettingManager;
//# sourceMappingURL=HotFixGameSettingManager.js.map
