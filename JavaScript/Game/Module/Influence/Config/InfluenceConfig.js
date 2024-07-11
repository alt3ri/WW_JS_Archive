"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InfluenceConfig = void 0);
const CountryAll_1 = require("../../../../Core/Define/ConfigQuery/CountryAll"),
  CountryById_1 = require("../../../../Core/Define/ConfigQuery/CountryById"),
  InfluenceAll_1 = require("../../../../Core/Define/ConfigQuery/InfluenceAll"),
  InfluenceById_1 = require("../../../../Core/Define/ConfigQuery/InfluenceById"),
  MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  ConfigBase_1 = require("../../../../Core/Framework/ConfigBase"),
  InfluenceReputationDefine_1 = require("../InfluenceReputationDefine");
class InfluenceConfig extends ConfigBase_1.ConfigBase {
  GetCountriesByIds(r) {
    if (0 < r.length) {
      var t = new Array();
      for (let e = 0, n = r.length; e < n; ++e) {
        var u = CountryById_1.configCountryById.GetConfig(r[e]);
        t.push(u);
      }
      return t.sort((e, n) => e.Id - n.Id), t;
    }
    return [];
  }
  GetCountryList() {
    return CountryAll_1.configCountryAll
      .GetConfigList()
      .filter(
        (e) =>
          e.Id !== InfluenceReputationDefine_1.RAMDOM_COUNTRY_ID &&
          e.Id !== InfluenceReputationDefine_1.NO_COUNTRY_ID,
      );
  }
  GetCountryConfig(e) {
    e = CountryById_1.configCountryById.GetConfig(e);
    if (e) return e;
  }
  GetCountryInfluence(e) {
    var n = new Array();
    if (0 === e) {
      var r = this.GetInfluenceConfig(0);
      n.push(r);
    } else {
      var t = this.GetCountryConfig(e);
      if (0 === t.Influences.length) {
        var u = InfluenceAll_1.configInfluenceAll.GetConfigList();
        for (let e = 0; e < u.length; e++) n.push(u[e]);
      } else
        for (let e = 0; e < t.Influences.length; e++) {
          var i = this.GetInfluenceConfig(t.Influences[e]);
          n.push(i);
        }
    }
    return n;
  }
  GetCountryTitle(e) {
    e = this.GetCountryConfig(e);
    return e
      ? MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Title)
      : "";
  }
  GetInfluenceConfig(e) {
    e = InfluenceById_1.configInfluenceById.GetConfig(e);
    if (e) return e;
  }
  GetInfluenceTitle(e) {
    e = this.GetInfluenceConfig(e);
    return e
      ? MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Title)
      : "";
  }
  GetInfluenceIfShowInDailyTask(e) {
    e = this.GetInfluenceConfig(e);
    return !!e && 1 === e.DailyTaskShow;
  }
  GetCountryIfShowInDailyTask(e) {
    e = this.GetCountryConfig(e);
    return !!e && 1 === e.DailyTaskShow;
  }
}
exports.InfluenceConfig = InfluenceConfig;
//# sourceMappingURL=InfluenceConfig.js.map
