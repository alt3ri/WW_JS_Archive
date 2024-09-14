"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LauncherGameSettingLib = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  LauncherConfigLib_1 = require("../Define/LauncherConfigLib"),
  LaunchUtil_1 = require("../Ui/LaunchUtil"),
  LauncherLog_1 = require("./LauncherLog"),
  LauncherStorageLib_1 = require("./LauncherStorageLib"),
  MASTERVOLUMEFUNCTION = 1,
  VOICEVOLUMEFUNCTION = 2,
  MUSICVOLUMEFUNCTION = 3,
  SFXVOLUMEFUNCTION = 4,
  RESOLUTION = 6,
  AMBVOLUMEFUNCTION = 69,
  UIVOLUMEFUNCTION = 70,
  DEFAULT_VALUE_VALUE = 100;
class LauncherGameSettingLib {
  static Initialize() {
    this.YSa();
  }
  static YSa() {
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
  static VJa() {
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
  static QSa() {
    let e = LauncherGameSettingLib.VJa();
    return (
      e ||
        (LauncherLog_1.LauncherLog.Info(
          "[LauncherGameSettingLib][GameSettings]找不到玩家保存数据，从默认配置表中读取",
        ),
        (e = new Map()),
        this.KSa(e, MASTERVOLUMEFUNCTION, DEFAULT_VALUE_VALUE),
        this.KSa(e, VOICEVOLUMEFUNCTION, DEFAULT_VALUE_VALUE),
        this.KSa(e, MUSICVOLUMEFUNCTION, DEFAULT_VALUE_VALUE),
        this.KSa(e, SFXVOLUMEFUNCTION, DEFAULT_VALUE_VALUE),
        this.KSa(e, AMBVOLUMEFUNCTION, DEFAULT_VALUE_VALUE),
        this.KSa(e, UIVOLUMEFUNCTION, DEFAULT_VALUE_VALUE),
        this.KSa(e, RESOLUTION)),
      e
    );
  }
  static KSa(e, t, i = 0) {
    var a,
      L =
        LauncherConfigLib_1.LauncherConfigLib.GetGameSettingsMenuConfigByFunctionId(
          t,
        );
    L
      ? ((a = L.GetDefaultValue()),
        LauncherLog_1.LauncherLog.Info(
          "[LauncherGameSettingLib][GameSettings]设置游戏数据Map",
          ["functionId", t],
          ["defaultValue", a],
          ["NotFoundValue", i],
        ),
        e.set(t, L ? a : i))
      : (LauncherLog_1.LauncherLog.Info(
          "[LauncherGameSettingLib][GameSettings]找不到设置系统表配置",
          ["functionId", t],
          ["NotFoundValue", i],
        ),
        e.set(t, i));
  }
  static rNi(e, t) {
    var i = e.get(t);
    if (void 0 === i)
      LauncherLog_1.LauncherLog.Info(
        "[LauncherGameSettingLib][GameSettings]找不到对应热更游戏设置数据",
        ["functionId", t],
        ["value", i],
      );
    else
      switch (
        (LauncherLog_1.LauncherLog.Info(
          "[LauncherGameSettingLib][GameSettings]应用热更游戏设置数据",
          ["functionId", t],
          ["value", i],
        ),
        t)
      ) {
        case MASTERVOLUMEFUNCTION:
          this.$Sa("Master_Audio_Bus_Volume", i);
          break;
        case VOICEVOLUMEFUNCTION:
          this.$Sa("Vocal_Audio_Bus_Volume", i);
          break;
        case MUSICVOLUMEFUNCTION:
          this.$Sa("Music_Audio_Bus_Volume", i);
          break;
        case SFXVOLUMEFUNCTION:
          this.$Sa("SFX_Audio_Bus_Volume", i);
          break;
        case AMBVOLUMEFUNCTION:
          this.$Sa("AMB_Audio_Bus_Volume", i);
          break;
        case UIVOLUMEFUNCTION:
          this.$Sa("UI_Audio_Bus_Volume", i);
          break;
        case RESOLUTION:
          this.XSa(i);
      }
  }
  static $Sa(e, t) {
    UE.AkGameplayStatics.SetRTPCValue(void 0, t, 0, void 0, new UE.FName(e));
  }
  static XSa(e) {
    var t = this.GetResolutionList(),
      t =
        (LauncherLog_1.LauncherLog.Info(
          "[LauncherGameSettingLib][GameSettings]当前分辨率列表",
          ["resolutionList", t],
          ["value", e],
        ),
        t[e]);
    t &&
      (LauncherLog_1.LauncherLog.Info(
        "[LauncherGameSettingLib][GameSettings]热更时应用分辨率",
        ["value", e],
        ["resolution", t],
      ),
      (e = UE.GameUserSettings.GetGameUserSettings()).SetScreenResolution(t),
      e.ApplySettings(!0));
  }
  static GetResolutionList() {
    var t = [],
      e = (0, puerts_1.$ref)(void 0);
    if (UE.KismetSystemLibrary.GetSupportedFullscreenResolutions(e)) {
      var i = (0, puerts_1.$unref)(e);
      for (let e = i.Num() - 1; 0 <= e; --e) {
        var a = i.Get(e);
        a && t.push(a);
      }
    }
    return (
      t.length
        ? t.sort((e, t) => (e.X === t.X ? t.Y - e.Y : t.X - e.X))
        : (LauncherLog_1.LauncherLog.Info(
            "[LauncherGameSettingLib][GameSettings]获取当前分辨率列表失败",
          ),
          t.push(
            UE.GameUserSettings.GetGameUserSettings().GetDesktopResolution(),
          )),
      t
    );
  }
}
exports.LauncherGameSettingLib = LauncherGameSettingLib;
//# sourceMappingURL=LauncherGameSettingLib.js.map
