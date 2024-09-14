"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FilterTypeFunctionLibrary = void 0);
const MultiTextLang_1 = require("../../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  StringUtils_1 = require("../../../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  CalabashDefine_1 = require("../../../../Calabash/CalabashDefine"),
  FilterData_1 = require("../Model/FilterData");
class FilterTypeFunctionLibrary {
  static XLt(r, a) {
    var n = new Array();
    for (const i of r) {
      var e,
        t =
          ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemByMonsterId(
            i,
          );
      t &&
        0 !== t.length &&
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
    var a = new Array();
    for (const e of ConfigManager_1.ConfigManager.ElementInfoConfig.GetConfigList(
      r,
    )) {
      var n =
        ConfigManager_1.ConfigManager.ElementInfoConfig.GetElementInfoLocalName(
          e.Name,
        );
      a.push(new FilterData_1.FilterItemData(e.Id, n, e.Icon4));
    }
    return a;
  }),
  (FilterTypeFunctionLibrary.GetWeaponFilterData = (r) => {
    var a,
      n = new Array();
    for (const e of ConfigManager_1.ConfigManager.MappingConfig.GetWeaponConfList())
      r.includes(e.Value) &&
        ((a = ConfigManager_1.ConfigManager.MappingConfig.GetWeaponConfComment(
          e.Comment,
        )),
        n.push(new FilterData_1.FilterItemData(e.Value, a, e.Icon)));
    return n;
  }),
  (FilterTypeFunctionLibrary.GetPhantomFilterData = (r) => {
    var a = new Array();
    for (const t of r) {
      var n =
          ConfigManager_1.ConfigManager.CalabashConfig.GetMonsterNameByMonsterId(
            t,
          ),
        e =
          ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemByMonsterId(
            t,
          )[0].SkillId,
        e =
          ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSkillBySkillId(
            e,
          ).BattleViewIcon,
        n = new FilterData_1.FilterItemData(t, n, e);
      a.push(n);
    }
    return a;
  }),
  (FilterTypeFunctionLibrary.GetDetectFilterData = (r) => {
    var a = new Array();
    for (const e of r) {
      var n =
          ConfigManager_1.ConfigManager.AdventureModuleConfig.GetLocalFilterTextById(
            e,
          ),
        n = new FilterData_1.FilterItemData(e, n, void 0);
      a.push(n);
    }
    return a;
  }),
  (FilterTypeFunctionLibrary.GetCookMenuFilterData = (r) => {
    var a = new Array();
    for (const e of r) {
      var n = ConfigManager_1.ConfigManager.TextConfig.GetTextById("Recipe"),
        n = new FilterData_1.FilterItemData(e, n, void 0);
      a.push(n);
    }
    return a;
  }),
  (FilterTypeFunctionLibrary.GetCookTypeFilterData = (r) => {
    var a = new Array();
    for (const e of r) {
      var n = 1 === e ? "Attack" : 2 === e ? "Defense" : "Explore",
        n = ConfigManager_1.ConfigManager.TextConfig.GetTextById(n),
        n = new FilterData_1.FilterItemData(e, n, void 0);
      a.push(n);
    }
    return a;
  }),
  (FilterTypeFunctionLibrary.GetComposeFilterData = (r) => {
    var a = new Array();
    for (const e of r) {
      var n = ConfigManager_1.ConfigManager.TextConfig.GetTextById("Formula"),
        n = new FilterData_1.FilterItemData(e, n, void 0);
      a.push(n);
    }
    return a;
  }),
  (FilterTypeFunctionLibrary.GetPhantomRarityFilterData = (r) => {
    var a = new Array();
    for (const e of r) {
      var n = "CalabashCatchGain_" + e.toString(),
        n = ConfigManager_1.ConfigManager.TextConfig.GetTextById(n),
        n = new FilterData_1.FilterItemData(e, n, void 0);
      a.push(n);
    }
    return a;
  }),
  (FilterTypeFunctionLibrary.GetPhantomFettersEquipFilterData = (r) => {
    var a = new Array();
    for (const t of r) {
      var n = 1 === t ? "PhantomFettersEquip" : "PhantomFettersUnEquip",
        n = ConfigManager_1.ConfigManager.TextConfig.GetTextById(n),
        e =
          1 === t
            ? ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFilterEquipTexture()
            : ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFilterNoEquipTexture(),
        n = new FilterData_1.FilterItemData(t, n, e);
      a.push(n);
    }
    return a;
  }),
  (FilterTypeFunctionLibrary.GetPhantomFettersHasFilterData = (r) => {
    var a = new Array();
    for (const t of r) {
      var n = 1 === t ? "PhantomFettersHas" : "PhantomFettersUnHas",
        n = ConfigManager_1.ConfigManager.TextConfig.GetTextById(n),
        e =
          1 === t
            ? ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFilterOwnTexture()
            : ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFilterNotOwnTexture(),
        n = new FilterData_1.FilterItemData(t, n, e);
      a.push(n);
    }
    return a;
  }),
  (FilterTypeFunctionLibrary.GetPhantomRarityZeroFilterData = (r) =>
    _a.XLt(r, 0)),
  (FilterTypeFunctionLibrary.GetPhantomRarityOneFilterData = (r) =>
    _a.XLt(r, 1)),
  (FilterTypeFunctionLibrary.GetPhantomRarityTwoFilterData = (r) =>
    _a.XLt(r, 2)),
  (FilterTypeFunctionLibrary.GetPhantomRarityThreeFilterData = (r) =>
    _a.XLt(r, 3)),
  (FilterTypeFunctionLibrary.GetItemQualityFilterData = (r) => {
    var a = new Array();
    for (const t of r) {
      var n = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(t),
        e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(n.Name);
      a.push(new FilterData_1.FilterItemData(t, e, n?.FilterIconPath));
    }
    return a;
  }),
  (FilterTypeFunctionLibrary.GetVisionDestroyCostData = (r) => {
    var a = new Array();
    for (const t of r) {
      var n =
          ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomRareConfig(
            t,
          ).Cost,
        e = StringUtils_1.StringUtils.Format("Cost{0}", n.toString()),
        e = ConfigManager_1.ConfigManager.TextConfig.GetTextById(e),
        n =
          ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionDestroyCostSpriteByCost(
            n,
          ),
        e = new FilterData_1.FilterItemData(t, e, n);
      a.push(e);
    }
    return a;
  }),
  (FilterTypeFunctionLibrary.GetVisionDestroyQualityData = (r) => {
    var a = new Array();
    for (const t of r) {
      var n = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(t),
        e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(n.Name);
      a.push(new FilterData_1.FilterItemData(t, e, n?.FilterIconPath));
    }
    return a;
  }),
  (FilterTypeFunctionLibrary.GetVisionDestroyFetterGroupData = (r) => {
    var a = new Array();
    for (const t of r) {
      var n =
          ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupById(
            t,
          ),
        e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          n.FetterGroupName,
        );
      a.push(new FilterData_1.FilterItemData(t, e, n.FetterElementPath));
    }
    return a;
  }),
  (FilterTypeFunctionLibrary.GetVisionDestroyAttribute = (r) => {
    var a = new Array();
    for (const t of r) {
      var n = ConfigManager_1.ConfigManager.SortConfig.GetSortRuleAttributeId(
          t,
          4,
        ),
        n =
          ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexIcon(
            n,
          ),
        e = ConfigManager_1.ConfigManager.SortConfig.GetSortRuleName(t, 4);
      a.push(new FilterData_1.FilterItemData(t, e, n));
    }
    return a;
  }),
  (FilterTypeFunctionLibrary.GetRoleTagFilterList = (r) => {
    var a = new Array();
    for (const t of r) {
      var n = ConfigManager_1.ConfigManager.RoleConfig.GetRoleTagConfig(t),
        e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(n.TagName);
      a.push(new FilterData_1.FilterItemData(t, e, n.TagIcon));
    }
    return a;
  }),
  (FilterTypeFunctionLibrary.GetItemDeprecateFilterList = (r) => {
    var a = new Array();
    for (const t of r) {
      var n =
          t === CalabashDefine_1.VISION_RECOVERT_FILTER_DEPERCATE
            ? "EchoAbandoned"
            : "NotAbandoned",
        n = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(n),
        e =
          t === CalabashDefine_1.VISION_RECOVERT_FILTER_DEPERCATE
            ? ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionRecoveryDesperateIcon()
            : ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionRecoveryUnDesperateIcon(),
        n = new FilterData_1.FilterItemData(t, n, e);
      a.push(n);
    }
    return a;
  });
//# sourceMappingURL=FilterTypeFunctionLibrary.js.map
