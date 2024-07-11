"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FilterLogic = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  FilterTypeFunctionLibrary_1 = require("./FilterTypeFunctionLibrary"),
  CalabashCollectFilter_1 = require("./Rule/CalabashCollectFilter"),
  ComposeFilter_1 = require("./Rule/ComposeFilter"),
  CookFilter_1 = require("./Rule/CookFilter"),
  DungeonDetectFilter_1 = require("./Rule/DungeonDetectFilter"),
  InventoryFilter_1 = require("./Rule/InventoryFilter"),
  ItemFilter_1 = require("./Rule/ItemFilter"),
  MonsterDetectFilter_1 = require("./Rule/MonsterDetectFilter"),
  PhantomFetterFilter_1 = require("./Rule/PhantomFetterFilter"),
  PhantomFilter_1 = require("./Rule/PhantomFilter"),
  RoleFilter_1 = require("./Rule/RoleFilter"),
  SilentAreaDetectFilter_1 = require("./Rule/SilentAreaDetectFilter"),
  VisionDestroyFilter_1 = require("./Rule/VisionDestroyFilter");
class FilterLogic {
  constructor() {
    (this.NTt = {
      [1]: new RoleFilter_1.RoleFilter(),
      2: new PhantomFilter_1.PhantomFilter(),
      3: new PhantomFetterFilter_1.PhantomFetterFilter(),
      4: new CalabashCollectFilter_1.CalabashCollectFilter(),
      5: new ItemFilter_1.ItemFilter(),
      6: new MonsterDetectFilter_1.MonsterDetectFilter(),
      7: new SilentAreaDetectFilter_1.SilentAreaDetectFilter(),
      8: new DungeonDetectFilter_1.DungeonDetectFilter(),
      9: new CookFilter_1.CookFilter(),
      10: new ComposeFilter_1.ComposeFilter(),
      11: new ComposeFilter_1.ComposeFilter(),
      12: new InventoryFilter_1.InventoryFilter(),
      13: new VisionDestroyFilter_1.VisionDestroyFilter(),
    }),
      (this.OTt = {
        [1]: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary
          .GetElementFilterData,
        2: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary
          .GetWeaponFilterData,
        3: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary
          .GetPhantomFilterData,
        4: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary
          .GetPhantomFilterData,
        7: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary
          .GetDetectFilterData,
        8: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary
          .GetDetectFilterData,
        9: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary
          .GetDetectFilterData,
        10: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary
          .GetCookMenuFilterData,
        11: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary
          .GetCookTypeFilterData,
        12: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary
          .GetComposeFilterData,
        13: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary
          .GetComposeFilterData,
        14: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary
          .GetPhantomRarityFilterData,
        15: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary
          .GetPhantomFettersEquipFilterData,
        16: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary
          .GetPhantomFettersHasFilterData,
        17: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary
          .GetDetectFilterData,
        18: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary
          .GetPhantomRarityZeroFilterData,
        19: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary
          .GetPhantomRarityOneFilterData,
        20: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary
          .GetPhantomRarityTwoFilterData,
        21: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary
          .GetPhantomRarityThreeFilterData,
        22: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary
          .GetItemQualityFilterData,
        23: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary
          .GetVisionDestroyCostData,
        24: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary
          .GetVisionDestroyQualityData,
        25: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary
          .GetVisionDestroyFetterGroupData,
        26: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary
          .GetVisionDestroyAttribute,
        27: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary
          .GetRoleTagFilterList,
      });
  }
  kTt(e) {
    return this.NTt[e].DefaultFilterList();
  }
  FTt(e, r) {
    var t = this.NTt[e],
      t = (t.InitFilterMap(), t.GetFilterFunction(r));
    if (t) return t;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "Filter",
        11,
        "传入的筛选项id查找不到对应方法",
        ["数据类型", e],
        ["筛选表格类型", r],
      );
  }
  VTt(e, r, t, i) {
    var n = this.FTt(r, t);
    if (!n) return e;
    var o = [];
    for (const F of e) {
      var l = n(F, i);
      if (l instanceof Array) {
        for (const a of l)
          if (i.has(a)) {
            o.push(F);
            break;
          }
      } else i.has(l) && o.push(F);
    }
    return o;
  }
  HTt(e, r, t, i) {
    var n = this.FTt(r, t);
    if (!n) return { FindList: [], UnFindList: e };
    var o = [],
      l = [];
    for (const a of e) {
      var F = n(a, i);
      if (F instanceof Array) {
        let e = !1;
        for (const u of F)
          if (i.has(u)) {
            o.push(a), (e = !0);
            break;
          }
        e || l.push(a);
      } else (i.has(F) ? o : l).push(a);
    }
    return { FindList: o, UnFindList: l };
  }
  GetFilterList(e, t, r, i) {
    var n = [];
    let o = [];
    var l,
      F,
      a = this.kTt(t);
    0 === a.length && (o = e);
    for (const L of a) for (const p of e) (L(p) ? n : o).push(p);
    if (r) {
      let e = o;
      var u,
        _,
        y,
        c = [];
      let r = !1;
      for ([u, _] of i)
        _.size <= 0 ||
          ((r = !0),
          (y = this.HTt(e, t, u, _)),
          (e = y.UnFindList),
          c.push(...y.FindList));
      return r ? c.concat(n) : e.concat(n);
    }
    let s = o;
    for ([l, F] of i) F.size <= 0 || (s = this.VTt(s, t, l, F));
    return s.concat(n);
  }
  GetFilterItemDataList(e, r) {
    var t = ConfigManager_1.ConfigManager.FilterConfig.GetFilterRuleConfig(e),
      e = t.FilterType,
      i = this.OTt[e];
    if (i) {
      var n = ConfigManager_1.ConfigManager.FilterConfig.GetFilterConfig(r),
        r = i(t.IdList);
      for (const o of r)
        o.SetIsShowIcon(n.IsShowIcon), (o.NeedChangeColor = t.NeedChangeColor);
      return r;
    }
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "Filter",
        11,
        "传入的筛选表格类型未进行枚举定义以及方法实现",
        ["EFilterType", e],
      );
  }
}
exports.FilterLogic = FilterLogic;
//# sourceMappingURL=FilterLogic.js.map
