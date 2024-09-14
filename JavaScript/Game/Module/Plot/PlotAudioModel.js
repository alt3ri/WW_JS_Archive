"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlotAudioModel = void 0);
const LanguageSystem_1 = require("../../../Core/Common/LanguageSystem"),
  CommonDefine_1 = require("../../../Core/Define/CommonDefine"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  StringBuilder_1 = require("../../../Core/Utils/StringBuilder"),
  LauncherLanguageLib_1 = require("../../../Launcher/Util/LauncherLanguageLib"),
  ModelManager_1 = require("../../Manager/ModelManager");
class PlotAudioModel extends ModelBase_1.ModelBase {
  static GetExternalSourcesMediaName(e) {
    let a = !1,
      n = "";
    switch (LanguageSystem_1.LanguageSystem.PackageAudio) {
      case CommonDefine_1.CHINESE_ISO639_1:
        a = e.CheckGenderZh;
        break;
      case LauncherLanguageLib_1.ENGLISH_ISO639_1:
        a = e.CheckGenderEn;
        break;
      case CommonDefine_1.JAPANESE_ISO639_1:
        a = e.CheckGenderJa;
        break;
      case LauncherLanguageLib_1.KOREAN_ISO639_1:
        a = e.CheckGenderKo;
    }
    return (
      a &&
        (n =
          0 === ModelManager_1.ModelManager.PlayerInfoModel?.GetPlayerGender()
            ? "_F"
            : "_M"),
      new StringBuilder_1.StringBuilder(
        LanguageSystem_1.LanguageSystem.PackageAudio,
        "_",
        e.FileName,
        n,
        ".wem",
      ).ToString()
    );
  }
  static GetAudioMouthAnimName(e) {
    let a = !1,
      n = "";
    switch (LanguageSystem_1.LanguageSystem.PackageAudio) {
      case CommonDefine_1.CHINESE_ISO639_1:
        a = e.CheckGenderZh;
        break;
      case LauncherLanguageLib_1.ENGLISH_ISO639_1:
        a = e.CheckGenderEn;
        break;
      case CommonDefine_1.JAPANESE_ISO639_1:
        a = e.CheckGenderJa;
        break;
      case LauncherLanguageLib_1.KOREAN_ISO639_1:
        a = e.CheckGenderKo;
    }
    a &&
      (n =
        0 === ModelManager_1.ModelManager.PlayerInfoModel?.GetPlayerGender()
          ? "_F"
          : "_M");
    var r = new StringBuilder_1.StringBuilder(
        LanguageSystem_1.LanguageSystem.PackageAudio,
        "_",
        e.FileName,
        n,
      ),
      i = r.ToString();
    return (
      r.Clear(),
      r.Append(
        "/Game/Aki/Sequence/SequenceAnim/VoiceMouth/",
        LanguageSystem_1.LanguageSystem.PackageAudio,
        "/",
        i,
        ".",
        i,
      ),
      r.ToString()
    );
  }
  static GetExternalSourcesMediaNameForEditor(e, a) {
    let n = !1,
      r = "";
    switch (LanguageSystem_1.LanguageSystem.PackageAudio) {
      case CommonDefine_1.CHINESE_ISO639_1:
        n = e.CheckGenderZh;
        break;
      case LauncherLanguageLib_1.ENGLISH_ISO639_1:
        n = e.CheckGenderEn;
        break;
      case CommonDefine_1.JAPANESE_ISO639_1:
        n = e.CheckGenderJa;
        break;
      case LauncherLanguageLib_1.KOREAN_ISO639_1:
        n = e.CheckGenderKo;
    }
    n && (r = a ? "_F" : "_M");
    a = LanguageSystem_1.LanguageSystem.PackageAudio;
    return new StringBuilder_1.StringBuilder(
      a,
      "_",
      e.FileName,
      r,
      ".wem",
    ).ToString();
  }
}
exports.PlotAudioModel = PlotAudioModel;
//# sourceMappingURL=PlotAudioModel.js.map
