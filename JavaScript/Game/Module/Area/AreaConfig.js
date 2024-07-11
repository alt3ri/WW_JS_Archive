"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AreaConfig = void 0);
const AreaAtmosphereInfoById_1 = require("../../../Core/Define/ConfigQuery/AreaAtmosphereInfoById");
const AreaByAreaId_1 = require("../../../Core/Define/ConfigQuery/AreaByAreaId");
const AreaByCountryAndLevel_1 = require("../../../Core/Define/ConfigQuery/AreaByCountryAndLevel");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class AreaConfig extends ConfigBase_1.ConfigBase {
  GetAreaLocalName(e) {
    let r = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e);
    return (r = r || "");
  }
  GetParentAreaId(e) {
    e = AreaByAreaId_1.configAreaByAreaId.GetConfigList(e);
    return void 0 !== e && e.length > 0 ? e[0].Father : 0;
  }
  GetAreaInfo(e) {
    e = AreaByAreaId_1.configAreaByAreaId.GetConfigList(e);
    if (void 0 !== e && e.length > 0) return e[0];
  }
  GetAreaAtmosphereInfo(e) {
    return AreaAtmosphereInfoById_1.configAreaAtmosphereInfoById.GetConfig(e);
  }
  GetAreaConfigByCountryAndLevel(e, r) {
    return AreaByCountryAndLevel_1.configAreaByCountryAndLevel.GetConfigList(
      e,
      r,
    );
  }
  GetLevelOneAreaId(e) {
    const r = this.GetAreaInfo(e);
    if (!r || r.Level < 2) return 0;
    let n = 0;
    switch (r.Level) {
      case 2:
        n = e;
        break;
      case 3:
        var t = r.Father;
        var a = this.GetAreaInfo(t);
        a && (n = a.Level === 2 ? t : 0);
    }
    return n;
  }
}
exports.AreaConfig = AreaConfig;
// # sourceMappingURL=AreaConfig.js.map
