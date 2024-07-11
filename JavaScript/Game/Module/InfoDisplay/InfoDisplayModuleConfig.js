"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InfoDisplayModuleConfig = void 0);
const InfoDisplayById_1 = require("../../../Core/Define/ConfigQuery/InfoDisplayById"),
  MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
  ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class InfoDisplayModuleConfig extends ConfigBase_1.ConfigBase {
  Vni(e) {
    e = InfoDisplayById_1.configInfoDisplayById.GetConfig(e);
    if (e) return e;
  }
  GetInfoDisplayType(e) {
    e = this.Vni(e);
    return e ? e.Type : 0;
  }
  GetInfoDisplayTitle(e) {
    e = this.Vni(e);
    return e
      ? MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Title)
      : "";
  }
  GetInfoDisplayDesc(e) {
    e = this.Vni(e);
    return e ? MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Text) : "";
  }
  GetInfoDisplayAudio(e) {
    e = this.Vni(e);
    return e ? e.Audio : "";
  }
  GetInfoDisplayBgStamp(e) {
    e = this.Vni(e);
    return e ? e.Background : "";
  }
  GetInfoDisplayPictures(e) {
    e = this.Vni(e);
    let i = new Array();
    return e && "" !== e.Picture ? (i = e.Picture.split(",")) : i;
  }
}
exports.InfoDisplayModuleConfig = InfoDisplayModuleConfig;
//# sourceMappingURL=InfoDisplayModuleConfig.js.map
