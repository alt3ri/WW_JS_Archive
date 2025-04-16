"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AreaConfig = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  AreaAtmosphereInfoById_1 = require("../../../Core/Define/ConfigQuery/AreaAtmosphereInfoById"),
  AreaByAreaId_1 = require("../../../Core/Define/ConfigQuery/AreaByAreaId"),
  AreaByCountryAndLevel_1 = require("../../../Core/Define/ConfigQuery/AreaByCountryAndLevel"),
  AreaReportByAreaId_1 = require("../../../Core/Define/ConfigQuery/AreaReportByAreaId"),
  AreaReportByAreaIdAndStage_1 = require("../../../Core/Define/ConfigQuery/AreaReportByAreaIdAndStage"),
  MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
  ConfigBase_1 = require("../../../Core/Framework/ConfigBase"),
  ExploreProgressDefine_1 = require("../ExploreProgress/ExploreProgressDefine");
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
  GetLevelOneAreaId(o) {
    var a = this.GetAreaInfo(o);
    if (!a || a.Level < ExploreProgressDefine_1.AREA_LEVEL) return 0;
    let n = a.Level,
      t = n === ExploreProgressDefine_1.AREA_LEVEL ? o : 0;
    if (n > ExploreProgressDefine_1.AREA_LEVEL) {
      let e = a.Father,
        r = 50;
      for (; n > ExploreProgressDefine_1.AREA_LEVEL && 0 < r; ) {
        var A = this.GetAreaInfo(e);
        if (!A) break;
        if ((e = A.Father) === o) {
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Area",
              63,
              "区域配置->获取所属一级区域出现闭环，请联系策划检查配置",
              ["parentAreaId", e],
              ["areaId", o],
              ["level", n],
              ["ret", t],
            );
          break;
        }
        (n = A.Level),
          (t = A.Level === ExploreProgressDefine_1.AREA_LEVEL ? A.AreaId : 0),
          --r;
      }
      r <= 0 &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Area",
          63,
          "区域配置->获取所属一级区域次数超过上限，请联系策划检查配置",
          ["parentAreaId", e],
          ["areaId", o],
          ["level", n],
          ["ret", t],
        ),
        n > ExploreProgressDefine_1.AREA_LEVEL &&
          Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Area",
            63,
            "区域配置->获取所属一级区域,查找失败>请联系策划检查配置",
            ["areaId", o],
            ["level", n],
            ["ret", t],
          );
    }
    return t;
  }
  GetStoryList(e) {
    return AreaReportByAreaId_1.configAreaReportByAreaId.GetConfigList(e);
  }
  GetStoryConfigByAreaIdAndStage(e, r) {
    return AreaReportByAreaIdAndStage_1.configAreaReportByAreaIdAndStage.GetConfig(
      e,
      r,
    );
  }
}
exports.AreaConfig = AreaConfig;
//# sourceMappingURL=AreaConfig.js.map
