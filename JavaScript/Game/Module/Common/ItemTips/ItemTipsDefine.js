"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TipsOverPowerData =
    exports.TipsCharacterData =
    exports.TipsVisionData =
    exports.TipsWeaponData =
    exports.TipsMaterialData =
    exports.ItemTipsData =
      void 0);
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  PhantomRarityByRare_1 = require("../../../../Core/Define/ConfigQuery/PhantomRarityByRare"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  VisionDetailDescComponent_1 = require("../../Phantom/Vision/View/VisionDetailDescComponent"),
  VisionDetailInfoComponent_1 = require("../../Phantom/Vision/View/VisionDetailInfoComponent"),
  SkipTaskManager_1 = require("../../SkipInterface/SkipTaskManager");
class ItemTipsData {
  constructor(t, i) {
    (this.ItemType = 0),
      (this.GetWayData = void 0),
      (this.LimitTimeTxt = void 0),
      (this.CanClickLockButton = (t) => !0);
    var e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(t),
      a =
        ((this.IncId = i || 0),
        (this.ConfigId = t),
        (this.Title = e.Name),
        (this.QualityId = e.QualityId),
        []);
    if (e.ItemAccess && 0 < e.ItemAccess?.length)
      for (const r of e.ItemAccess) {
        var s = ConfigManager_1.ConfigManager.GetWayConfig.GetConfigById(r);
        s &&
          ((s = {
            Id: r,
            Type: s?.Type,
            Text: s?.Description,
            SortIndex: s?.SortIndex,
            Function: () => {
              SkipTaskManager_1.SkipTaskManager.RunByConfigId(r);
            },
          }),
          a.push(s));
      }
    this.GetWayData = a;
  }
}
class TipsMaterialData extends (exports.ItemTipsData = ItemTipsData) {
  constructor(t, i) {
    super(t, i), (this.FunctionSpritePath = void 0), (this.ItemType = 0);
    var e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(t),
      a =
        ((this.MaterialType = e.TypeDescription),
        (this.FunctionSpritePath = this.cxt(e?.ItemBuffType)),
        ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
          t,
          i,
        )),
      a =
        ((this.Num = a),
        (this.TxtEffect = e.AttributesDescription),
        (this.TxtDescription = e.BgDescription),
        ModelManager_1.ModelManager.InventoryModel.GetCommonItemData(t, i));
    a?.IsLimitTimeItem() &&
      ((e = a.GetEndTime()),
      (t = TimeUtil_1.TimeUtil.GetDataFromTimeStamp(
        e * TimeUtil_1.TimeUtil.Millisecond,
      )),
      (i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
        "Text_ItemExpired_text",
      )),
      (this.LimitTimeTxt = StringUtils_1.StringUtils.Format(
        i,
        t.Month,
        t.Day,
        t.Hour + ":" + t.Minute,
      )));
  }
  cxt(t) {
    var i = ModelManager_1.ModelManager.MediumItemGridModel;
    switch (t) {
      case 0:
        break;
      case 1:
        return i.AttackBuffSpritePath;
      case 2:
        return i.DefenseBuffSpritePath;
      case 3:
        return i.RestoreHealthBuffSpritePath;
      case 4:
        return i.RechargeBuffSpritePath;
      case 5:
        return i.ResurrectionBuffSpritePath;
    }
  }
}
exports.TipsMaterialData = TipsMaterialData;
class TipsWeaponData extends ItemTipsData {
  constructor(t, i) {
    super(t, i),
      (this.WeaponType = ""),
      (this.WeaponLevel = 0),
      (this.WeaponLimitLevel = 0),
      (this.BreachLevel = 0),
      (this.BreachMaxLevel = 0),
      (this.WeaponStage = 0),
      (this.WeaponSkillName = ""),
      (this.WeaponEffect = ""),
      (this.WeaponEffectParam = void 0),
      (this.WeaponDescription = ""),
      (this.AttributeData = void 0),
      (this.IsEquip = !1),
      (this.EquippedId = void 0);
    var e,
      a,
      s,
      r,
      o,
      n = ModelManager_1.ModelManager.InventoryModel.GetAttributeItemData(i),
      n = i
        ? n.GetConfig()
        : ConfigManager_1.ConfigManager.InventoryConfig.GetWeaponItemConfig(t);
    void 0 !== n &&
      ((i = (t = i
        ? ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(i)
        : void 0)
        ? t.GetWeaponConfig()
        : ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(
            n.ItemId,
          )),
      (n = t ? t.GetBreachLevel() : 0),
      (r = t ? t.GetResonanceLevel() : 1),
      (e = t
        ? t.GetBreachConfig()
        : ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponBreach(
            i.BreachId,
            n,
          )),
      (s = i.BreachId),
      (a = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponResonanceConfig(
        i.ResonId,
        r,
      )),
      (this.ItemType = 1),
      (this.WeaponType =
        ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponTypeName(
          i.WeaponType,
        )),
      (o = t ? t.GetLevel() : 1),
      (e = e.LevelLimit),
      (this.WeaponLevel = o),
      (this.WeaponLimitLevel = e),
      (this.BreachLevel = n),
      (e = ModelManager_1.ModelManager.WeaponModel.GetWeaponBreachMaxLevel(s)),
      (this.BreachMaxLevel = e),
      (this.WeaponStage = r),
      (this.WeaponSkillName = a.Name),
      (this.WeaponEffect = i.Desc),
      (s = ModelManager_1.ModelManager.WeaponModel.GetWeaponConfigDescParams(
        i,
        r,
      )),
      (this.WeaponEffectParam = s),
      (this.WeaponDescription = i.AttributesDescription),
      (e = []),
      (a = i.FirstPropId.Id),
      (r =
        ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
          a,
        )),
      (s = ModelManager_1.ModelManager.WeaponModel.GetCurveValue(
        i.FirstCurve,
        i.FirstPropId.Value,
        o,
        n,
      )),
      (a = {
        Id: a,
        IsMainAttribute: !0,
        Name: r.Name,
        IconPath: r.Icon,
        Value: s,
        IsRatio: i.FirstPropId.IsRatio,
      }),
      (s = i.SecondPropId.Id),
      (r =
        ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
          s,
        )),
      (o = ModelManager_1.ModelManager.WeaponModel.GetCurveValue(
        i.SecondCurve,
        i.SecondPropId.Value,
        o,
        n,
      )),
      (n = {
        Id: s,
        IsMainAttribute: !0,
        Name: r.Name,
        IconPath: r.Icon,
        Value: o,
        IsRatio: i.SecondPropId.IsRatio,
      }),
      e.push(a),
      e.push(n),
      (this.AttributeData = e),
      t) &&
      ((this.EquippedId = t.GetRoleId()),
      (this.IsEquip = 0 !== this.EquippedId));
  }
}
exports.TipsWeaponData = TipsWeaponData;
class TipsVisionData extends ItemTipsData {
  constructor(t, i) {
    super(t, i),
      (this.VisionId = 0),
      (this.VisionType = ""),
      (this.Cost = 0),
      (this.UpgradeLevel = ""),
      (this.MainSkillText = ""),
      (this.MainSkillParams = void 0),
      (this.SkillUniqueText = void 0),
      (this.SkillUniqueTextParam = void 0),
      (this.SkillUniqueRoleId = void 0),
      (this.AttributeData = void 0),
      (this.IsEquip = !1),
      (this.EquippedId = void 0),
      (this.VisionDetailInfoComponentData = void 0);
    var e = ModelManager_1.ModelManager.InventoryModel.GetAttributeItemData(i),
      t = ConfigManager_1.ConfigManager.InventoryConfig.GetPhantomItemConfig(t),
      e = i ? e.GetConfig() : t;
    if (void 0 !== e) {
      var a = ModelManager_1.ModelManager.PhantomBattleModel,
        a = i ? a.GetPhantomBattleData(i) : void 0,
        s = a ? a.GetPhantomLevel() : 0,
        r = a ? a.GetQuality() : 1,
        e = ((this.ItemType = 2), (this.VisionId = e.MonsterId), e.Rarity),
        e =
          ((this.VisionType =
            PhantomRarityByRare_1.configPhantomRarityByRare.GetConfig(e).Desc),
          (this.Cost =
            ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomRareConfig(
              e,
            ).Cost),
          ConfigManager_1.ConfigManager.TextConfig.GetTextById("VisionLevel"));
      this.UpgradeLevel = StringUtils_1.StringUtils.Format(e, s.toString());
      const M = new VisionDetailInfoComponent_1.VisionDetailInfoComponentData();
      var e = ConfigManager_1.ConfigManager.PhantomBattleConfig,
        o =
          (t &&
            !a &&
            ((t = t.SkillId),
            (g = e.GetPhantomSkillBySkillId(t)),
            (this.MainSkillText = g.DescriptionEx),
            (this.MainSkillParams =
              e.GetPhantomSkillDescExByPhantomSkillIdAndQuality(t, r)),
            VisionDetailDescComponent_1.VisionDetailDesc.ConvertVisionSkillDescToDescData(
              g,
              s,
              !0,
              !0,
              r,
            ).forEach((t) => {
              M.AddDescData(t);
            })),
          []),
        e = a?.GetMainPropShowAttributeList(1);
      if (void 0 !== e)
        for (const l of e) {
          var n =
              ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
                l.Id,
              ),
            n = {
              Id: l.Id,
              IsMainAttribute: !0,
              Name: n.Name,
              IconPath: n.Icon,
              Value: l.BaseValue,
              IsRatio: l.IsRatio,
            };
          o.push(n);
        }
      t = a?.GetSubPropShowAttributeList(1);
      if (void 0 !== t)
        for (const _ of t) {
          var h =
              ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
                _.Id,
              ),
            h = {
              Id: _.Id,
              IsMainAttribute: !1,
              Name: h.Name,
              IconPath: h.Icon,
              Value: _.BaseValue,
              IsRatio: _.IsRatio,
            };
          o.push(h);
        }
      this.AttributeData = o;
      var g =
          ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipRole(
            i,
          ),
        s =
          (g && ((this.EquippedId = g), (this.IsEquip = 0 !== this.EquippedId)),
          (M.DataBase = a)?.GetPreviewShowFetterList(-1, 0));
      a &&
        VisionDetailDescComponent_1.VisionDetailDesc.ConvertVisionSkillDescToDescData(
          a?.GetNormalSkillConfig(),
          a.GetPhantomLevel(),
          !0,
          !0,
          r,
        ).forEach((t) => {
          M.AddDescData(t);
        }),
        s &&
          VisionDetailDescComponent_1.VisionDetailDesc.ConvertVisionFetterDataToDetailDescData(
            s,
            !1,
          ).forEach((t) => {
            M.AddDescData(t);
          }),
        (this.VisionDetailInfoComponentData = M);
    }
  }
}
exports.TipsVisionData = TipsVisionData;
class TipsCharacterData extends ItemTipsData {
  constructor(t, i) {
    super(t, i),
      (this.mxt = ""),
      (this.Qst = void 0),
      (this.dxt = ""),
      (this.Cxt = ""),
      (this.ItemType = 3);
    i = ConfigManager_1.ConfigManager.RoleConfig;
    let e = i.GetRoleConfig(t);
    (t = e.ParentId), (i = (e = 0 < t ? i.GetRoleConfig(t) : e).ElementId);
    (this.mxt = e.Name),
      (this.Qst =
        ConfigManager_1.ConfigManager.ElementInfoConfig.GetElementInfo(i)),
      (this.dxt = e.RoleHeadIconBig),
      (this.Cxt = e.Introduction);
  }
  GetRoleName() {
    return this.mxt;
  }
  GetElementConfig() {
    return this.Qst;
  }
  GetHeadTexutePath() {
    return this.dxt;
  }
  GetRoleIntroduction() {
    return this.Cxt;
  }
}
exports.TipsCharacterData = TipsCharacterData;
class TipsOverPowerData extends ItemTipsData {
  constructor(t, i) {
    super(t, i), (this.ItemType = 4);
  }
}
exports.TipsOverPowerData = TipsOverPowerData;
//# sourceMappingURL=ItemTipsDefine.js.map
