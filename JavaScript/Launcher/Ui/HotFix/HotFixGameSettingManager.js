"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HotFixGameSettingManager = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  LauncherConfigLib_1 = require("../../Define/LauncherConfigLib"),
  LauncherLog_1 = require("../../Util/LauncherLog"),
  LauncherStorageLib_1 = require("../../Util/LauncherStorageLib"),
  MASTERVOLUMEFUNCTION = 1,
  VOICEVOLUMEFUNCTION = 2,
  MUSICVOLUMEFUNCTION = 3,
  SFXVOLUMEFUNCTION = 4,
  RESOLUTION = 6,
  AMBVOLUMEFUNCTION = 69,
  UIVOLUMEFUNCTION = 70;
class HotFixGameSettingManager {
  ApplyGameSettings() {
    var e = this.POn();
    e &&
      (this.rGi(e, MASTERVOLUMEFUNCTION),
      this.rGi(e, VOICEVOLUMEFUNCTION),
      this.rGi(e, MUSICVOLUMEFUNCTION),
      this.rGi(e, SFXVOLUMEFUNCTION),
      this.rGi(e, AMBVOLUMEFUNCTION),
      this.rGi(e, UIVOLUMEFUNCTION),
      this.rGi(e, RESOLUTION));
  }
  POn() {
    var e = LauncherStorageLib_1.LauncherStorageLib.GetGlobal(
        LauncherStorageLib_1.ELauncherStorageGlobalKey.PlayMenuInfo,
        "",
      ),
      a = e && "" !== e;
    let i = void 0;
    return (i = a ? this.BOn(JSON.parse(e)) : i);
  }
  n4s(e, a) {
    var i = LauncherConfigLib_1.LauncherConfigLib.GetMenuConfigByFunctionId(a);
    e.set(a, i ? i.OptionsDefault : 0);
  }
  rGi(e, a) {
    var i = e.get(a);
    if (void 0 === i)
      LauncherLog_1.LauncherLog.Info(
        "[HotFixGameSettingManager]找不到对应热更游戏设置数据",
        ["functionId", a],
        ["value", i],
      );
    else
      switch (
        (LauncherLog_1.LauncherLog.Info(
          "[HotFixGameSettingManager]应用热更游戏设置数据",
          ["functionId", a],
          ["value", i],
        ),
        a)
      ) {
        case MASTERVOLUMEFUNCTION:
          this.s4s("Master_Audio_Bus_Volume", i);
          break;
        case VOICEVOLUMEFUNCTION:
          this.s4s("Vocal_Audio_Bus_Volume", i);
          break;
        case MUSICVOLUMEFUNCTION:
          this.s4s("Music_Audio_Bus_Volume", i);
          break;
        case SFXVOLUMEFUNCTION:
          this.s4s("SFX_Audio_Bus_Volume", i);
          break;
        case AMBVOLUMEFUNCTION:
          this.s4s("AMB_Audio_Bus_Volume", i);
          break;
        case UIVOLUMEFUNCTION:
          this.s4s("UI_Audio_Bus_Volume", i);
          break;
        case RESOLUTION:
          this.m4s(i);
      }
  }
  s4s(e, a) {
    UE.AkGameplayStatics.SetRTPCValue(void 0, a, 0, void 0, new UE.FName(e));
  }
  m4s(e) {
    var a = this.GetResolutionList(),
      a =
        (LauncherLog_1.LauncherLog.Info(
          "[HotFixGameSettingManager]当前分辨率列表",
          ["resolutionList", a],
          ["value", e],
        ),
        a[e]);
    a &&
      (LauncherLog_1.LauncherLog.Info(
        "[HotFixGameSettingManager]热更时应用分辨率",
        ["value", e],
        ["resolution", a],
      ),
      (e = UE.GameUserSettings.GetGameUserSettings()).SetScreenResolution(a),
      e.ApplySettings(!0));
  }
  GetResolutionList() {
    var a = [],
      e = (0, puerts_1.$ref)(void 0);
    if (UE.KismetSystemLibrary.GetSupportedFullscreenResolutions(e)) {
      var i = (0, puerts_1.$unref)(e);
      for (let e = i.Num() - 1; 0 <= e; --e) {
        var t = i.Get(e);
        t && a.push(t);
      }
    }
    return (
      a.length
        ? a.sort((e, a) => (e.X === a.X ? a.Y - e.Y : a.X - e.X))
        : (LauncherLog_1.LauncherLog.Info(
            "[HotFixGameSettingManager]获取当前分辨率列表失败",
          ),
          a.push(
            UE.GameUserSettings.GetGameUserSettings().GetDesktopResolution(),
          )),
      a
    );
  }
  BOn(e) {
    var a = new Map();
    for (const t in e) {
      var i = Number(t);
      isNaN(i) || a.set(i, e[t]);
    }
    return a;
  }
}
exports.HotFixGameSettingManager = HotFixGameSettingManager;
//# sourceMappingURL=HotFixGameSettingManager.js.map
