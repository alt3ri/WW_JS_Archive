"use strict";
let _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FilterTypeFunctionLibrary = void 0);
const MultiTextLang_1 = require("../../../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const FilterData_1 = require("../Model/FilterData");
class FilterTypeFunctionLibrary {
  static jTt(r, a) {
    const n = new Array();
    for (const i of r) {
      var e;
      let t =
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemByMonsterId(
          i,
        );
      t &&
        t.length !== 0 &&
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomRareConfig(
          t[0].Rarity,
        ).Rare === a &&
        ((e =
          ConfigManager_1.ConfigManager.CalabashConfig.GetMonsterNameByMonsterId(
            i,
          )),
        (t = t[0].SkillId),
        (t =
          ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSkillBySkillId(
            t,
          ).BattleViewIcon),
        (e = new FilterData_1.FilterItemData(i, e, t)),
        n.push(e));
    }
    return n;
  }
}
(exports.FilterTypeFunctionLibrary = FilterTypeFunctionLibrary),
  ((_a = FilterTypeFunctionLibrary).GetElementFilterData = (r) => {
    const a = new Array();
    for (const e of ConfigManager_1.ConfigManager.ElementInfoConfig.GetConfigList(
      r,
    )) {
      const n =
        ConfigManager_1.ConfigManager.ElementInfoConfig.GetElementInfoLocalName(
          e.Name,
        );
      a.push(new FilterData_1.FilterItemData(e.Id, n, e.Icon4));
    }
    return a;
  }),
  (FilterTypeFunctionLibrary.GetWeaponFilterData = (r) => {
    let a;
    const n = new Array();
    for (const e of ConfigManager_1.ConfigManager.MappingConfig.GetWeaponConfList())
      r.includes(e.Value) &&
        ((a = ConfigManager_1.ConfigManager.MappingConfig.GetWeaponConfComment(
          e.Comment,
        )),
        n.push(new FilterData_1.FilterItemData(e.Value, a, e.Icon)));
    return n;
  }),
  (FilterTypeFunctionLibrary.GetPhantomFilterData = (r) => {
    const a = new Array();
    for (const t of r) {
      var n =
        ConfigManager_1.ConfigManager.CalabashConfig.GetMonsterNameByMonsterId(
          t,
        );
      var e =
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemByMonsterId(
          t,
        )[0].SkillId;
      var e =
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSkillBySkillId(
          e,
        ).BattleViewIcon;
      var n = new FilterData_1.FilterItemData(t, n, e);
      a.push(n);
    }
    return a;
  }),
  (FilterTypeFunctionLibrary.GetDetectFilterData = (r) => {
    const a = new Array();
    for (const e of r) {
      var n =
        ConfigManager_1.ConfigManager.AdventureModuleConfig.GetLocalFilterTextById(
          e,
        );
      var n = new FilterData_1.FilterItemData(e, n, void 0);
      a.push(n);
    }
    return a;
  }),
  (FilterTypeFunctionLibrary.GetCookMenuFilterData = (r) => {
    const a = new Array();
    for (const e of r) {
      var n = ConfigManager_1.ConfigManager.TextConfig.GetTextById("Recipe");
      var n = new FilterData_1.FilterItemData(e, n, void 0);
      a.push(n);
    }
    return a;
  }),
  (FilterTypeFunctionLibrary.GetCookTypeFilterData = (r) => {
    const a = new Array();
    for (const e of r) {
      var n = e === 1 ? "Attack" : e === 2 ? "Defense" : "Explore";
      var n = ConfigManager_1.ConfigManager.TextConfig.GetTextById(n);
      var n = new FilterData_1.FilterItemData(e, n, void 0);
      a.push(n);
    }
    return a;
  }),
  (FilterTypeFunctionLibrary.GetComposeFilterData = (r) => {
    const a = new Array();
    for (const e of r) {
      var n = ConfigManager_1.ConfigManager.TextConfig.GetTextById("Formula");
      var n = new FilterData_1.FilterItemData(e, n, void 0);
      a.push(n);
    }
    return a;
  }),
  (FilterTypeFunctionLibrary.GetPhantomRarityFilterData = (r) => {
    const a = new Array();
    for (const e of r) {
      var n = "CalabashCatchGain_" + e.toString();
      var n = ConfigManager_1.ConfigManager.TextConfig.GetTextById(n);
      var n = new FilterData_1.FilterItemData(e, n, void 0);
      a.push(n);
    }
    return a;
  }),
  (FilterTypeFunctionLibrary.GetPhantomFettersEquipFilterData = (r) => {
    const a = new Array();
    for (const t of r) {
      var n = t === 1 ? "PhantomFettersEquip" : "PhantomFettersUnEquip";
      var n = ConfigManager_1.ConfigManager.TextConfig.GetTextById(n);
      const e =
        t === 1
          ? ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFilterEquipTexture()
          : ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFilterNoEquipTexture();
      var n = new FilterData_1.FilterItemData(t, n, e);
      a.push(n);
    }
    return a;
  }),
  (FilterTypeFunctionLibrary.GetPhantomFettersHasFilterData = (r) => {
    const a = new Array();
    for (const t of r) {
      var n = t === 1 ? "PhantomFettersHas" : "PhantomFettersUnHas";
      var n = ConfigManager_1.ConfigManager.TextConfig.GetTextById(n);
      const e =
        t === 1
          ? ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFilterOwnTexture()
          : ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFilterNotOwnTexture();
      var n = new FilterData_1.FilterItemData(t, n, e);
      a.push(n);
    }
    return a;
  }),
  (FilterTypeFunctionLibrary.GetPhantomRarityZeroFilterData = (r) =>
    _a.jTt(r, 0)),
  (FilterTypeFunctionLibrary.GetPhantomRarityOneFilterData = (r) =>
    _a.jTt(r, 1)),
  (FilterTypeFunctionLibrary.GetPhantomRarityTwoFilterData = (r) =>
    _a.jTt(r, 2)),
  (FilterTypeFunctionLibrary.GetPhantomRarityThreeFilterData = (r) =>
    _a.jTt(r, 3)),
  (FilterTypeFunctionLibrary.GetItemQualityFilterData = (r) => {
    const a = new Array();
    for (const t of r) {
      const n = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(t);
      const e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(n.Name);
      a.push(new FilterData_1.FilterItemData(t, e, n?.FilterIconPath));
    }
    return a;
  }),
  (FilterTypeFunctionLibrary.GetVisionDestroyCostData = (r) => {
    const a = new Array();
    for (const t of r) {
      var n =
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomRareConfig(
          t,
        ).Cost;
      var e = StringUtils_1.StringUtils.Format("Cost{0}", n.toString());
      var e = ConfigManager_1.ConfigManager.TextConfig.GetTextById(e);
      var n =
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionDestroyCostSpriteByCost(
          n,
        );
      var e = new FilterData_1.FilterItemData(t, e, n);
      a.push(e);
    }
    return a;
  }),
  (FilterTypeFunctionLibrary.GetVisionDestroyQualityData = (r) => {
    const a = new Array();
    for (const t of r) {
      const n = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(t);
      const e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(n.Name);
      a.push(new FilterData_1.FilterItemData(t, e, n?.FilterIconPath));
    }
    return a;
  }),
  (FilterTypeFunctionLibrary.GetVisionDestroyFetterGroupData = (r) => {
    const a = new Array();
    for (const t of r) {
      const n =
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupById(t);
      const e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
        n.FetterGroupName,
      );
      a.push(new FilterData_1.FilterItemData(t, e, n.FetterElementPath));
    }
    return a;
  }),
  (FilterTypeFunctionLibrary.GetVisionDestroyAttribute = (r) => {
    const a = new Array();
    for (const t of r) {
      var n = ConfigManager_1.ConfigManager.SortConfig.GetSortRuleAttributeId(
        t,
        4,
      );
      var n =
        ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexIcon(
          n,
        );
      const e = ConfigManager_1.ConfigManager.SortConfig.GetSortRuleName(t, 4);
      a.push(new FilterData_1.FilterItemData(t, e, n));
    }
    return a;
  }),
  (FilterTypeFunctionLibrary.GetRoleTagFilterList = (r) => {
    const a = new Array();
    for (const t of r) {
      const n = ConfigManager_1.ConfigManager.RoleConfig.GetRoleTagConfig(t);
      const e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(n.TagName);
      a.push(new FilterData_1.FilterItemData(t, e, n.TagIcon));
    }
    return a;
  });
// # sourceMappingURL=FilterTypeFunctionLibrary.js.map
