"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FilterLogic = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  FilterTypeFunctionLibrary_1 = require("./FilterTypeFunctionLibrary"),
  CalabashCollectFilter_1 = require("./Rule/CalabashCollectFilter"),
  ComposeFilter_1 = require("./Rule/ComposeFilter"),
  CookFilter_1 = require("./Rule/CookFilter"),
  DangoAbyssPluginFilter_1 = require("./Rule/DangoAbyssPluginFilter"),
  DungeonDetectFilter_1 = require("./Rule/DungeonDetectFilter"),
  FishingItemFilter_1 = require("./Rule/FishingItemFilter"),
  InventoryFilter_1 = require("./Rule/InventoryFilter"),
  ItemFilter_1 = require("./Rule/ItemFilter"),
  MonsterDetectFilter_1 = require("./Rule/MonsterDetectFilter"),
  PhantomFetterFilter_1 = require("./Rule/PhantomFetterFilter"),
  PhantomFilter_1 = require("./Rule/PhantomFilter"),
  RoleFilter_1 = require("./Rule/RoleFilter"),
  SilentAreaDetectFilter_1 = require("./Rule/SilentAreaDetectFilter"),
  VisionAssembleFilter_1 = require("./Rule/VisionAssembleFilter"),
  VisionDestroyFilter_1 = require("./Rule/VisionDestroyFilter");
class FilterLogic {
  constructor() {
    (this.VLt = {
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
      14: new VisionAssembleFilter_1.VisionAssembleFilter(),
      15: new FishingItemFilter_1.FishingItemFilter(),
      16: new RoleFilter_1.EditFormationRoleFilter(),
      17: new DangoAbyssPluginFilter_1.DangoAbyssPluginFilter(),
    }),
      (this.HLt = {
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
        28: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary
          .GetItemDeprecateFilterList,
        29: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary
          .GetVisionGroupAttributeFilterList,
        31: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary
          .GetFishingTechData,
        33: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary
          .GetFishingAreaData,
        32: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary
          .GetFishingTimeData,
        34: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary
          .GetFishingTypeData,
        35: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary
          .GetDangoAbyssPluginQualityData,
        36: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary
          .GetDangoAbyssPluginPropData,
        37: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary
          .GetDangoAbyssPluginTagData,
        38: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary
          .GetPhantomFettersEquipFilterData,
        39: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary
          .GetDangoAbyssPluginLockStateData,
        40: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary
          .GetItemDeprecateFilterList,
      });
  }
  jLt(e) {
    return this.VLt[e].DefaultFilterList();
  }
  WLt(e, r) {
    var i = this.VLt[e],
      i = (i.InitFilterMap(), i.GetFilterFunction(r));
    if (i) return i;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "Filter",
        10,
        "传入的筛选项id查找不到对应方法",
        ["数据类型", e],
        ["筛选表格类型", r],
      );
  }
  KLt(e, r, i, t) {
    var n = this.WLt(r, i);
    if (!n) return e;
    var F = [];
    for (const o of e) {
      var l = n(o, t);
      if (l instanceof Array) {
        for (const a of l)
          if (t.has(a)) {
            F.push(o);
            break;
          }
      } else t.has(l) && F.push(o);
    }
    return F;
  }
  QLt(e, r, i, t) {
    var n = this.WLt(r, i);
    if (!n) return { FindList: [], UnFindList: e };
    var F = [],
      l = [];
    for (const a of e) {
      var o = n(a, t);
      if (o instanceof Array) {
        let e = !1;
        for (const u of o)
          if (t.has(u)) {
            F.push(a), (e = !0);
            break;
          }
        e || l.push(a);
      } else (t.has(o) ? F : l).push(a);
    }
    return { FindList: F, UnFindList: l };
  }
  GetFilterList(e, i, r, t) {
    var n = [];
    let F = [];
    var l,
      o,
      a = this.jLt(i);
    0 === a.length && (F = e);
    for (const L of a) for (const b of e) (L(b) ? n : F).push(b);
    if (r) {
      let e = F;
      var u,
        y,
        _,
        s = [];
      let r = !1;
      for ([u, y] of t)
        y.size <= 0 ||
          ((r = !0),
          (_ = this.QLt(e, i, u, y)),
          (e = _.UnFindList),
          s.push(..._.FindList));
      return r ? s.concat(n) : e.concat(n);
    }
    let c = F;
    for ([l, o] of t) o.size <= 0 || (c = this.KLt(c, i, l, o));
    return c.concat(n);
  }
  GetFilterItemDataList(e, r) {
    var i = ConfigManager_1.ConfigManager.FilterConfig.GetFilterRuleConfig(e),
      e = i.FilterType,
      t = this.HLt[e];
    if (t) {
      var n = ConfigManager_1.ConfigManager.FilterConfig.GetFilterConfig(r),
        r = t(i.IdList);
      for (const F of r)
        F.SetIsShowIcon(n.IsShowIcon), (F.NeedChangeColor = i.NeedChangeColor);
      return r;
    }
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "Filter",
        10,
        "传入的筛选表格类型未进行枚举定义以及方法实现",
        ["EFilterType", e],
      );
  }
}
exports.FilterLogic = FilterLogic;
//# sourceMappingURL=FilterLogic.js.map
