"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiResourceConfig = void 0);
const Info_1 = require("../../../../Core/Common/Info"),
  LanguageSystem_1 = require("../../../../Core/Common/LanguageSystem"),
  Log_1 = require("../../../../Core/Common/Log"),
  CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
  LangOfLogoByName_1 = require("../../../../Core/Define/ConfigQuery/LangOfLogoByName"),
  UiResourceById_1 = require("../../../../Core/Define/ConfigQuery/UiResourceById"),
  ConfigBase_1 = require("../../../../Core/Framework/ConfigBase");
class UiResourceConfig extends ConfigBase_1.ConfigBase {
  GetResourcePath(e) {
    var o = UiResourceById_1.configUiResourceById.GetConfig(e);
    return o
      ? UiResourceConfig.GetResourcePathNormal(o)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Resource", 11, "查找资源配置失败", [
            "ResourceId",
            e,
          ]),
        "");
  }
  GetResourceConfig(e) {
    return UiResourceById_1.configUiResourceById.GetConfig(e);
  }
  GetLogoPathByLanguage(e) {
    var o = LangOfLogoByName_1.configLangOfLogoByName.GetConfig(e);
    switch (LanguageSystem_1.LanguageSystem.PackageLanguage) {
      case CommonDefine_1.ENGLISH_ISO639_1:
        return o.EnLogo;
      case CommonDefine_1.CHS:
        return o.ZhHansLogo;
      case CommonDefine_1.JAPANESE_ISO639_1:
        return o.JpLogo;
      case CommonDefine_1.CHT:
        return o.ZhHantLogo;
      case CommonDefine_1.KOREAN_ISO639_1:
        return o.KrLogo;
      default:
        return o.EnLogo;
    }
  }
}
((exports.UiResourceConfig = UiResourceConfig).IsPcPlatform = !1),
  (UiResourceConfig.GetResourcePathNormal = (e) =>
    !Info_1.Info.IsInTouch() && e.PcPath ? e.PcPath : e.Path);
//# sourceMappingURL=UiResourceConfig.js.map
