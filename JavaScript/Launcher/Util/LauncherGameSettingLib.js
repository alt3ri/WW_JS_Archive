"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LauncherGameSettingLib = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  LauncherConfigLib_1 = require("../Define/LauncherConfigLib"),
  Platform_1 = require("../Platform/Platform"),
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
    this.zSa();
  }
  static InitInLaunch(e) {
    this.ZVc(e);
  }
  static zSa() {
    var e = this.$Sa();
    e &&
      (this.rNi(e, MASTERVOLUMEFUNCTION),
      this.rNi(e, VOICEVOLUMEFUNCTION),
      this.rNi(e, MUSICVOLUMEFUNCTION),
      this.rNi(e, SFXVOLUMEFUNCTION),
      this.rNi(e, AMBVOLUMEFUNCTION),
      this.rNi(e, UIVOLUMEFUNCTION),
      this.rNi(e, RESOLUTION));
  }
  static LoadPlayMenuInfo() {
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
  static $Sa() {
    let e = LauncherGameSettingLib.LoadPlayMenuInfo();
    return (
      e
        ? LauncherStorageLib_1.LauncherStorageLib.GetGlobal(
            LauncherStorageLib_1.ELauncherStorageGlobalKey.HasLocalGameSettings,
            !1,
          ) &&
          this.XSa(
            e,
            RESOLUTION,
            LauncherStorageLib_1.ELauncherStorageGlobalKey.PcResolutionIndex,
          )
        : (LauncherLog_1.LauncherLog.Info(
            "[LauncherGameSettingLib][GameSettings]找不到玩家保存数据，从默认配置表中读取????",
          ),
          (e = new Map()),
          this.XSa(
            e,
            MASTERVOLUMEFUNCTION,
            LauncherStorageLib_1.ELauncherStorageGlobalKey.MasterVolume,
            DEFAULT_VALUE_VALUE,
          ),
          this.XSa(
            e,
            VOICEVOLUMEFUNCTION,
            LauncherStorageLib_1.ELauncherStorageGlobalKey.VoiceVolume,
            DEFAULT_VALUE_VALUE,
          ),
          this.XSa(
            e,
            MUSICVOLUMEFUNCTION,
            LauncherStorageLib_1.ELauncherStorageGlobalKey.MusicVolume,
            DEFAULT_VALUE_VALUE,
          ),
          this.XSa(
            e,
            SFXVOLUMEFUNCTION,
            LauncherStorageLib_1.ELauncherStorageGlobalKey.SFXVolume,
            DEFAULT_VALUE_VALUE,
          ),
          this.XSa(
            e,
            AMBVOLUMEFUNCTION,
            LauncherStorageLib_1.ELauncherStorageGlobalKey.AMBVolume,
            DEFAULT_VALUE_VALUE,
          ),
          this.XSa(
            e,
            UIVOLUMEFUNCTION,
            LauncherStorageLib_1.ELauncherStorageGlobalKey.UIVolume,
            DEFAULT_VALUE_VALUE,
          ),
          this.XSa(
            e,
            RESOLUTION,
            LauncherStorageLib_1.ELauncherStorageGlobalKey.PcResolutionIndex,
          )),
      e
    );
  }
  static XSa(e, t, i, a = 0) {
    var L,
      i = LauncherStorageLib_1.LauncherStorageLib.GetGlobal(i, void 0);
    void 0 !== i
      ? (LauncherLog_1.LauncherLog.Debug(
          "[LauncherGameSettingLib][GameSettings]设置游戏数据Map时，存在新版本的游戏设置，将读取新版本的游戏设置数据",
          ["functionId", t],
          ["value", i],
        ),
        e.set(t, Number(i)))
      : (i =
            LauncherConfigLib_1.LauncherConfigLib.GetGameSettingsMenuConfigByFunctionId(
              t,
            ))
        ? ((L = i.GetDefaultValue()),
          LauncherLog_1.LauncherLog.Info(
            "[LauncherGameSettingLib][GameSettings]设置游戏数据Map",
            ["functionId", t],
            ["defaultValue", L],
            ["NotFoundValue", a],
          ),
          e.set(t, i ? L : a))
        : (LauncherLog_1.LauncherLog.Info(
            "[LauncherGameSettingLib][GameSettings]找不到设置系统表配置",
            ["functionId", t],
            ["NotFoundValue", a],
          ),
          e.set(t, a));
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
          this.YSa("volume_master", i);
          break;
        case VOICEVOLUMEFUNCTION:
          this.YSa("volume_voice", i);
          break;
        case MUSICVOLUMEFUNCTION:
          this.YSa("volume_music", i);
          break;
        case SFXVOLUMEFUNCTION:
          this.YSa("volume_sfx", i);
          break;
        case AMBVOLUMEFUNCTION:
          this.YSa("volume_sfx_amb", i);
          break;
        case UIVOLUMEFUNCTION:
          this.YSa("volume_sfx_ui", i);
          break;
        case RESOLUTION:
          this.JSa(i);
      }
  }
  static YSa(e, t) {
    UE.AkGameplayStatics.SetRTPCValue(void 0, t, 0, void 0, new UE.FName(e));
  }
  static JSa(e) {
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
    var t = [];
    if (
      ((this.Vve = (0, puerts_1.$ref)(void 0)),
      UE.KismetSystemLibrary.GetSupportedFullscreenResolutions(this.Vve))
    ) {
      var i = (0, puerts_1.$unref)(this.Vve);
      for (let e = i.Num() - 1; 0 <= e; --e) {
        var a = i.Get(e);
        a && t.push(a),
          LauncherLog_1.LauncherLog.Debug("具体分辨率", ["resolution", a]);
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
      0 < t.length && 3620 === t[0].X && 2036 === t[0].Y && t.shift(),
      LauncherLog_1.LauncherLog.Debug("最后的分辨率列表结果", [
        "resolutionList",
        t,
      ]),
      t
    );
  }
  static ZVc(e) {
    var t;
    Platform_1.Platform.IsFoldingScreen() &&
      Platform_1.Platform.IsAndroidPlatform() &&
      ("Android_Mid" ===
      (t =
        UE.KuroRenderingRuntimeBPPluginBPLibrary.GetDeviceProfileBaseProfileName())
        ? UE.KismetSystemLibrary.ExecuteConsoleCommand(
            e,
            "r.MobileContentScaleFactor 2",
          )
        : "Android_High" === t
          ? UE.KismetSystemLibrary.ExecuteConsoleCommand(
              e,
              "r.MobileContentScaleFactor 2.5",
            )
          : "Android_VeryHigh" === t
            ? UE.KismetSystemLibrary.ExecuteConsoleCommand(
                e,
                "r.MobileContentScaleFactor 3",
              )
            : "Android_Low" !== t &&
              "Android_Mid" !== t &&
              "Android_High" !== t &&
              "Android_VeryHigh" !== t &&
              UE.KismetSystemLibrary.ExecuteConsoleCommand(
                e,
                "r.MobileContentScaleFactor 2",
              ));
  }
}
(exports.LauncherGameSettingLib = LauncherGameSettingLib).Vve = void 0;
//# sourceMappingURL=LauncherGameSettingLib.js.map
