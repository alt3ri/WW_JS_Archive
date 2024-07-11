"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhantomTipsData =
    exports.WeaponTipsData =
    exports.CommonTipsData =
    exports.CommonTipsBaseData =
    exports.CommonTipsComponentUtil =
      void 0);
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  CommonComponentDefine_1 = require("../CommonComponentDefine"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class CommonTipsComponentUtil {
  static GetWeaponTipsDataByUniqueId(e) {
    var a = ModelManager_1.ModelManager.InventoryModel.GetAttributeItemData(e);
    if (a) {
      var t = a.GetConfig();
      if (2 === a.GetItemDataType()) return this.GetWeaponTipsData(t, e);
    }
  }
  static GetPhantomTipsDataByUniqueId(e) {
    var a = ModelManager_1.ModelManager.InventoryModel.GetAttributeItemData(e);
    if (a) {
      var t = a.GetConfig();
      if (3 === a.GetItemDataType()) return this.GetPhantomTipsData(t, e);
    }
  }
  static GetTipsDataByItemId(e) {
    var a,
      t =
        ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(
          e,
        );
    return 2 === t
      ? ((a =
          ConfigManager_1.ConfigManager.InventoryConfig.GetWeaponItemConfig(e)),
        this.GetWeaponTipsData(a, e))
      : 3 === t
        ? ((a =
            ConfigManager_1.ConfigManager.InventoryConfig.GetPhantomItemConfig(
              e,
            )),
          this.GetPhantomTipsData(a, e))
        : void 0;
  }
  static GetWeaponTipsDataByItemId(e) {
    e = ConfigManager_1.ConfigManager.InventoryConfig.GetWeaponItemConfig(e);
    if (e) return this.GetWeaponTipsData(e);
  }
  static GetPhantomTipsDataByItemId(e) {
    e = ConfigManager_1.ConfigManager.InventoryConfig.GetPhantomItemConfig(e);
    if (e) return this.GetPhantomTipsData(e);
  }
  static GetWeaponTipsData(e, a) {
    var t = new WeaponTipsData(),
      n = a
        ? ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(a)
        : void 0,
      o = n
        ? n.GetWeaponConfig()
        : ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(
            e.ItemId,
          ),
      i = n ? n.GetBreachLevel() : 0,
      r = n ? n.GetResonanceLevel() : 1,
      s = n
        ? n.GetBreachConfig()
        : ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponBreach(
            o.BreachId,
            i,
          ),
      g = n ? n.GetLevel() : 1,
      s = s.LevelLimit,
      l = ConfigManager_1.ConfigManager.TextConfig.GetTextById(
        "WeaponLevelUpLevelText",
      ),
      C = o.BreachId,
      C = ModelManager_1.ModelManager.WeaponModel.GetWeaponBreachMaxLevel(C),
      M = ModelManager_1.ModelManager.WeaponModel.GetCurveValue(
        o.FirstCurve,
        o.FirstPropId.Value,
        g,
        i,
      ),
      M = { Id: o.FirstPropId.Id, IsRatio: o.FirstPropId.IsRatio, CurValue: M },
      p = ModelManager_1.ModelManager.WeaponModel.GetCurveValue(
        o.SecondCurve,
        o.SecondPropId.Value,
        g,
        i,
      ),
      p = {
        Id: o.SecondPropId.Id,
        IsRatio: o.SecondPropId.IsRatio,
        CurValue: p,
      };
    return (
      (t.IncId = a),
      (t.ConfigId = e.ItemId),
      (t.Name = e.WeaponName),
      (t.QualityId = e.QualityId),
      (t.ItemType = 2),
      (t.BgDescription = e.BgDescription),
      (t.LevelText = StringUtils_1.StringUtils.Format(
        l,
        g.toString(),
        s.toString(),
      )),
      (t.CurrentStar = i),
      (t.MaxStar = C),
      (t.Type = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponTypeName(
        o.WeaponType,
      )),
      t.AttributeList.push(M),
      t.AttributeList.push(p),
      (t.ResonanceLevel = r),
      n &&
        ((t.EquippedId = n.GetRoleId()), 0 !== t.EquippedId) &&
        ((a = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(
          t.EquippedId,
        )),
        (t.EquippedIcon = a.GetRoleConfig().RoleHeadIcon),
        (t.EquippedName = a.GetName())),
      t
    );
  }
  static GetPhantomTipsData(e, a) {
    var t = new PhantomTipsData(),
      n = ModelManager_1.ModelManager.PhantomBattleModel,
      o = a ? n.GetPhantomBattleData(a) : void 0,
      i = e.ItemId,
      r =
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomQualityByItemQuality(
          e.QualityId,
        ).LevelLimit,
      s = o ? o.GetPhantomLevel() : 1,
      g = e.TypeDescription,
      g = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(g),
      l =
        ((t.Name = e.MonsterName),
        (t.IncId = a),
        (t.ConfigId = i),
        (t.QualityId = e.QualityId),
        (t.ItemType = 9),
        ConfigManager_1.ConfigManager.TextConfig.GetTextById("LevelShow")),
      l =
        ((t.LevelText = StringUtils_1.StringUtils.Format(l, s.toString())),
        ConfigManager_1.ConfigManager.TextConfig.GetTextById("RoleMaxLevel02")),
      l =
        ((t.MaxLevelText = StringUtils_1.StringUtils.Format(l, r.toString())),
        (t.Level = s),
        (t.Type = g ?? ""),
        (t.PhantomId = e.MonsterId),
        ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipRole(
          a,
        )),
      s =
        (l &&
          ((t.EquippedId = l),
          (r = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(l)),
          (t.EquippedIcon = r.GetRoleConfig().RoleHeadIcon),
          (t.EquippedName = r.GetName())),
        (t.RarityId = "CalabashCatchGain_" + e.Rarity.toString()),
        ConfigManager_1.ConfigManager.CommonConfig.GetElementConfig(
          e.ElementType[0],
        )),
      g =
        ((t.PropertyTexture = s.Icon),
        (t.PropertyId = e.ElementType[0]),
        n.GetPhantomInstanceByItemId(i)),
      i =
        (g
          ? ((l = g.GetPhantomSkillInfoByLevel()),
            (t.MainSkillText = l.DescriptionEx),
            (r =
              ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSkillDescExBySkillIdAndQuality(
                l.Id,
                e.QualityId,
              )),
            (t.MainSkillParameter = r),
            (t.SkillIcon = g.PhantomItem.SkillIcon))
          : (n = (s =
              ConfigManager_1.ConfigManager
                .PhantomBattleConfig).GetPhantomItemById(i)) &&
            ((l = n.SkillId),
            (r = s.GetPhantomSkillBySkillId(l)),
            (t.MainSkillText = r.DescriptionEx),
            (g =
              ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSkillDescExByPhantomSkillIdAndQuality(
                l,
                e.QualityId,
              )),
            (t.MainSkillParameter = g),
            (t.SkillIcon = n.SkillIcon)),
        (t.IsBreak = !1),
        o?.GetPhantomMainProp());
    if (
      ((t.IsMain =
        ControllerHolder_1.ControllerHolder.PhantomBattleController.CheckIsMain(
          a,
        )),
      i && 0 < i.length)
    )
      for (const h of i) {
        var C =
            ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomMainPropertyItemId(
              h.IDs,
            ),
          C =
            ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
              C.PropId,
            ),
          M = !!C.IsPercent;
        t.MainAttributeList.push(
          new CommonComponentDefine_1.TipsAttributeData(C.Id, h.gkn, M),
        );
      }
    s = o?.GetPhantomSubProp();
    if (
      ((t.IsSub =
        ControllerHolder_1.ControllerHolder.PhantomBattleController.CheckIsSub(
          a,
        )),
      s && 0 < s.length)
    ) {
      t.IsUnlockSub = !0;
      for (const _ of s) {
        var p =
          ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSubPropertyById(
            _.IDs,
          ).AddType === CommonComponentDefine_1.RATIO;
        t.SubAttributeList.push(
          new CommonComponentDefine_1.TipsAttributeData(_.IDs, _.gkn, p),
        );
      }
    }
    return t;
  }
}
exports.CommonTipsComponentUtil = CommonTipsComponentUtil;
class CommonTipsBaseData {
  constructor() {
    (this.IncId = 0),
      (this.ConfigId = 0),
      (this.Name = ""),
      (this.QualityId = 0),
      (this.ItemType = 2),
      (this.BgDescription = ""),
      (this.LevelText = ""),
      (this.MaxLevelText = ""),
      (this.Type = ""),
      (this.EquippedId = 0),
      (this.EquippedIcon = ""),
      (this.EquippedName = "");
  }
}
class CommonTipsData extends (exports.CommonTipsBaseData = CommonTipsBaseData) {
  constructor() {
    super(...arguments),
      (this.CurrentStar = 0),
      (this.MaxStar = 0),
      (this.AttributeList = []);
  }
}
class WeaponTipsData extends (exports.CommonTipsData = CommonTipsData) {
  constructor() {
    super(...arguments), (this.ResonanceLevel = 0);
  }
}
exports.WeaponTipsData = WeaponTipsData;
class PhantomTipsData extends CommonTipsBaseData {
  constructor() {
    super(...arguments),
      (this.PhantomId = 0),
      (this.Level = 0),
      (this.RarityId = ""),
      (this.PropertyTexture = ""),
      (this.PropertyId = 0),
      (this.IsBreak = !1),
      (this.BreakAttributeList = []),
      (this.IsMain = !1),
      (this.MainAttributeList = []),
      (this.MainSkillText = ""),
      (this.MainSkillParameter = void 0),
      (this.SkillIcon = ""),
      (this.IsSub = !1),
      (this.SubAttributeList = []),
      (this.IsUnlockSub = !1),
      (this.UnlockSubTips = "");
  }
}
exports.PhantomTipsData = PhantomTipsData;
//# sourceMappingURL=CommonTipsComponentsUtil.js.map
