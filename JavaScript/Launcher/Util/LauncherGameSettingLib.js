"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LauncherGameSettingLib = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  LauncherConfigLib_1 = require("../Define/LauncherConfigLib"),
  LauncherLog_1 = require("./LauncherLog"),
  LauncherStorageLib_1 = require("./LauncherStorageLib"),
  MASTERVOLUMEFUNCTION = 1,
  VOICEVOLUMEFUNCTION = 2,
  MUSICVOLUMEFUNCTION = 3,
  SFXVOLUMEFUNCTION = 4,
  RESOLUTION = 6,
  AMBVOLUMEFUNCTION = 69,
  UIVOLUMEFUNCTION = 70;
class LauncherGameSettingLib {
  static Initialize() {
    this.Ypa();
  }
  static Ypa() {
    var e = this.Qpa();
    e &&
      (this.rNi(e, MASTERVOLUMEFUNCTION),
      this.rNi(e, VOICEVOLUMEFUNCTION),
      this.rNi(e, MUSICVOLUMEFUNCTION),
      this.rNi(e, SFXVOLUMEFUNCTION),
      this.rNi(e, AMBVOLUMEFUNCTION),
      this.rNi(e, UIVOLUMEFUNCTION),
      this.rNi(e, RESOLUTION));
  }
  static Qpa() {
    let e = LauncherStorageLib_1.LauncherStorageLib.GetGlobal(
      LauncherStorageLib_1.ELauncherStorageGlobalKey.MenuData,
      void 0,
    );
    return (
      e ||
        ((e = new Map()),
        this.Kpa(e, MASTERVOLUMEFUNCTION),
        this.Kpa(e, VOICEVOLUMEFUNCTION),
        this.Kpa(e, MUSICVOLUMEFUNCTION),
        this.Kpa(e, SFXVOLUMEFUNCTION),
        this.Kpa(e, AMBVOLUMEFUNCTION),
        this.Kpa(e, UIVOLUMEFUNCTION),
        this.Kpa(e, RESOLUTION)),
      e
    );
  }
  static Kpa(e, i) {
    var t = LauncherConfigLib_1.LauncherConfigLib.GetMenuConfigByFunctionId(i);
    e.set(i, t ? t.OptionsDefault : 0);
  }
  static rNi(e, i) {
    var t = e.get(i);
    if (void 0 === t)
      LauncherLog_1.LauncherLog.Info(
        "[LauncherGameSettingLib]找不到对应热更游戏设置数据",
        ["functionId", i],
        ["value", t],
      );
    else
      switch (
        (LauncherLog_1.LauncherLog.Info(
          "[LauncherGameSettingLib]应用热更游戏设置数据",
          ["functionId", i],
          ["value", t],
        ),
        i)
      ) {
        case MASTERVOLUMEFUNCTION:
          this.$pa("Master_Audio_Bus_Volume", t);
          break;
        case VOICEVOLUMEFUNCTION:
          this.$pa("Vocal_Audio_Bus_Volume", t);
          break;
        case MUSICVOLUMEFUNCTION:
          this.$pa("Music_Audio_Bus_Volume", t);
          break;
        case SFXVOLUMEFUNCTION:
          this.$pa("SFX_Audio_Bus_Volume", t);
          break;
        case AMBVOLUMEFUNCTION:
          this.$pa("AMB_Audio_Bus_Volume", t);
          break;
        case UIVOLUMEFUNCTION:
          this.$pa("UI_Audio_Bus_Volume", t);
          break;
        case RESOLUTION:
          this.Xpa(t);
      }
  }
  static $pa(e, i) {
    UE.AkGameplayStatics.SetRTPCValue(void 0, i, 0, void 0, new UE.FName(e));
  }
  static Xpa(e) {
    var i = this.GetResolutionList(),
      i =
        (LauncherLog_1.LauncherLog.Info(
          "[LauncherGameSettingLib]当前分辨率列表",
          ["resolutionList", i],
          ["value", e],
        ),
        i[e]);
    i &&
      (LauncherLog_1.LauncherLog.Info(
        "[LauncherGameSettingLib]热更时应用分辨率",
        ["value", e],
        ["resolution", i],
      ),
      (e = UE.GameUserSettings.GetGameUserSettings()).SetScreenResolution(i),
      e.ApplySettings(!0));
  }
  static GetResolutionList() {
    var i = [],
      e = (0, puerts_1.$ref)(void 0);
    if (UE.KismetSystemLibrary.GetSupportedFullscreenResolutions(e)) {
      var t = (0, puerts_1.$unref)(e);
      for (let e = t.Num() - 1; 0 <= e; --e) {
        var a = t.Get(e);
        a && i.push(a);
      }
    }
    return (
      i.length
        ? i.sort((e, i) => (e.X === i.X ? i.Y - e.Y : i.X - e.X))
        : (LauncherLog_1.LauncherLog.Info(
            "[LauncherGameSettingLib]获取当前分辨率列表失败",
          ),
          i.push(
            UE.GameUserSettings.GetGameUserSettings().GetDesktopResolution(),
          )),
      i
    );
  }
}
exports.LauncherGameSettingLib = LauncherGameSettingLib;
//# sourceMappingURL=LauncherGameSettingLib.js.map
