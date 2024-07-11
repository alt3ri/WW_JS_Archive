"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LauncherGameSettingLib = void 0);
const puerts_1 = require("puerts");
const UE = require("ue");
const LauncherConfigLib_1 = require("../Define/LauncherConfigLib");
const LauncherLog_1 = require("./LauncherLog");
const LauncherStorageLib_1 = require("./LauncherStorageLib");
const MASTERVOLUMEFUNCTION = 1;
const VOICEVOLUMEFUNCTION = 2;
const MUSICVOLUMEFUNCTION = 3;
const SFXVOLUMEFUNCTION = 4;
const RESOLUTION = 6;
const AMBVOLUMEFUNCTION = 69;
const UIVOLUMEFUNCTION = 70;
class LauncherGameSettingLib {
  static Initialize() {
    this.$6s();
  }
  static $6s() {
    const e = this.POn();
    e &&
      (this.rGi(e, MASTERVOLUMEFUNCTION),
      this.rGi(e, VOICEVOLUMEFUNCTION),
      this.rGi(e, MUSICVOLUMEFUNCTION),
      this.rGi(e, SFXVOLUMEFUNCTION),
      this.rGi(e, AMBVOLUMEFUNCTION),
      this.rGi(e, UIVOLUMEFUNCTION),
      this.rGi(e, RESOLUTION));
  }
  static POn() {
    const e = LauncherStorageLib_1.LauncherStorageLib.GetGlobal(
      LauncherStorageLib_1.ELauncherStorageGlobalKey.PlayMenuInfo,
      "",
    );
    const i = e && e !== "";
    let t = void 0;
    return (t = i ? this.BOn(JSON.parse(e)) : t);
  }
  static n4s(e, i) {
    const t =
      LauncherConfigLib_1.LauncherConfigLib.GetMenuConfigByFunctionId(i);
    e.set(i, t ? t.OptionsDefault : 0);
  }
  static rGi(e, i) {
    const t = e.get(i);
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
          this.s4s("Master_Audio_Bus_Volume", t);
          break;
        case VOICEVOLUMEFUNCTION:
          this.s4s("Vocal_Audio_Bus_Volume", t);
          break;
        case MUSICVOLUMEFUNCTION:
          this.s4s("Music_Audio_Bus_Volume", t);
          break;
        case SFXVOLUMEFUNCTION:
          this.s4s("SFX_Audio_Bus_Volume", t);
          break;
        case AMBVOLUMEFUNCTION:
          this.s4s("AMB_Audio_Bus_Volume", t);
          break;
        case UIVOLUMEFUNCTION:
          this.s4s("UI_Audio_Bus_Volume", t);
          break;
        case RESOLUTION:
          this.m4s(t);
      }
  }
  static s4s(e, i) {
    UE.AkGameplayStatics.SetRTPCValue(void 0, i, 0, void 0, new UE.FName(e));
  }
  static m4s(e) {
    var i = this.GetResolutionList();
    var i =
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
    const i = [];
    const e = (0, puerts_1.$ref)(void 0);
    if (UE.KismetSystemLibrary.GetSupportedFullscreenResolutions(e)) {
      const t = (0, puerts_1.$unref)(e);
      for (let e = t.Num() - 1; e >= 0; --e) {
        const a = t.Get(e);
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
  static BOn(e) {
    const i = new Map();
    for (const a in e) {
      const t = Number(a);
      isNaN(t) || i.set(t, e[a]);
    }
    return i;
  }
}
exports.LauncherGameSettingLib = LauncherGameSettingLib;
// # sourceMappingURL=LauncherGameSettingLib.js.map
