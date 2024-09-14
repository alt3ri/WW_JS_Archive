"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AreaConfig = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  AreaAtmosphereInfoById_1 = require("../../../Core/Define/ConfigQuery/AreaAtmosphereInfoById"),
  AreaByAreaId_1 = require("../../../Core/Define/ConfigQuery/AreaByAreaId"),
  AreaByCountryAndLevel_1 = require("../../../Core/Define/ConfigQuery/AreaByCountryAndLevel"),
  MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
  ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class AreaConfig extends ConfigBase_1.ConfigBase {
  GetAreaLocalName(e) {
    let r = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e);
    return (r = r || "");
  }
  GetParentAreaId(e) {
    e = AreaByAreaId_1.configAreaByAreaId.GetConfigList(e);
    return void 0 !== e && 0 < e.length ? e[0].Father : 0;
  }
  GetAreaInfo(e) {
    e = AreaByAreaId_1.configAreaByAreaId.GetConfigList(e);
    if (void 0 !== e && 0 < e.length) return e[0];
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
  GetLevelOneAreaId(a) {
    var o = this.GetAreaInfo(a);
    if (!o || o.Level < 2) return 0;
    let t = o.Level,
      n = 2 === t ? a : 0;
    if (2 < t) {
      let e = o.Father,
        r = 50;
      for (; 2 < t && 0 < r; ) {
        var A = this.GetAreaInfo(e);
        if (!A) break;
        if ((e = A.Father) === a) {
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Area",
              64,
              "区域配置->获取所属一级区域出现闭环，请联系策划检查配置",
              ["parentAreaId", e],
              ["areaId", a],
              ["level", t],
              ["ret", n],
            );
          break;
        }
        (t = A.Level), (n = 2 === A.Level ? A.AreaId : 0), --r;
      }
      r <= 0 &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Area",
          64,
          "区域配置->获取所属一级区域次数超过上限，请联系策划检查配置",
          ["parentAreaId", e],
          ["areaId", a],
          ["level", t],
          ["ret", n],
        ),
        2 < t &&
          Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Area",
            64,
            "区域配置->获取所属一级区域,查找失败>请联系策划检查配置",
            ["areaId", a],
            ["level", t],
            ["ret", n],
          );
    }
    return n;
  }
}
exports.AreaConfig = AreaConfig;
//# sourceMappingURL=AreaConfig.js.map
