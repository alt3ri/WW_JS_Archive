"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TipsCharacterData =
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
  ModelManager_1 = require("../../../Manager/ModelManager"),
  VisionDetailDescComponent_1 = require("../../Phantom/Vision/View/VisionDetailDescComponent"),
  VisionDetailInfoComponent_1 = require("../../Phantom/Vision/View/VisionDetailInfoComponent"),
  SkipTaskManager_1 = require("../../SkipInterface/SkipTaskManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class ItemTipsData {
  constructor(i, t) {
    (this.ItemType = 0),
      (this.GetWayData = void 0),
      (this.LimitTimeTxt = void 0),
      (this.CanClickLockButton = (i) => !0);
    var e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(i),
      a =
        ((this.IncId = t || 0),
        (this.ConfigId = i),
        (this.Title = e.Name),
        (this.QualityId = e.QualityId),
        []);
    if (e.ItemAccess && 0 < e.ItemAccess?.length)
      for (const o of e.ItemAccess) {
        var s = ConfigManager_1.ConfigManager.GetWayConfig.GetConfigById(o);
        s &&
          ((s = {
            Id: o,
            Type: s?.Type,
            Text: s?.Description,
            SortIndex: s?.SortIndex,
            Function: () => {
              SkipTaskManager_1.SkipTaskManager.RunByConfigId(o);
            },
          }),
          a.push(s));
      }
    this.GetWayData = a;
  }
}
class TipsMaterialData extends (exports.ItemTipsData = ItemTipsData) {
  constructor(i, t) {
    super(i, t), (this.FunctionSpritePath = void 0), (this.ItemType = 0);
    var e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(i),
      a =
        ((this.MaterialType = e.TypeDescription),
        (this.FunctionSpritePath = this.lPt(e?.ItemBuffType)),
        ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
          i,
          t,
        )),
      a =
        ((this.Num = a),
        (this.TxtEffect = e.AttributesDescription),
        (this.TxtDescription = e.BgDescription),
        ModelManager_1.ModelManager.InventoryModel.GetCommonItemData(i, t));
    a?.IsLimitTimeItem() &&
      ((e = a.GetEndTime()),
      (i = TimeUtil_1.TimeUtil.GetDataFromTimeStamp(
        e * TimeUtil_1.TimeUtil.Millisecond,
      )),
      (t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
        "Text_ItemExpired_text",
      )),
      (this.LimitTimeTxt = StringUtils_1.StringUtils.Format(
        t,
        i.Month,
        i.Day,
        i.Hour + ":" + i.Minute,
      )));
  }
  lPt(i) {
    var t = ModelManager_1.ModelManager.MediumItemGridModel;
    switch (i) {
      case 0:
        break;
      case 1:
        return t.AttackBuffSpritePath;
      case 2:
        return t.DefenseBuffSpritePath;
      case 3:
        return t.RestoreHealthBuffSpritePath;
      case 4:
        return t.RechargeBuffSpritePath;
      case 5:
        return t.ResurrectionBuffSpritePath;
    }
  }
}
exports.TipsMaterialData = TipsMaterialData;
class TipsWeaponData extends ItemTipsData {
  constructor(i, t) {
    super(i, t),
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
      o,
      r,
      n = ModelManager_1.ModelManager.InventoryModel.GetAttributeItemData(t),
      n = t
        ? n.GetConfig()
        : ConfigManager_1.ConfigManager.InventoryConfig.GetWeaponItemConfig(i);
    void 0 !== n &&
      ((t = (i = t
        ? ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(t)
        : void 0)
        ? i.GetWeaponConfig()
        : ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(
            n.ItemId,
          )),
      (n = i ? i.GetBreachLevel() : 0),
      (o = i ? i.GetResonanceLevel() : 1),
      (e = i
        ? i.GetBreachConfig()
        : ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponBreach(
            t.BreachId,
            n,
          )),
      (s = t.BreachId),
      (a = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponResonanceConfig(
        t.ResonId,
        o,
      )),
      (this.ItemType = 1),
      (this.WeaponType =
        ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponTypeName(
          t.WeaponType,
        )),
      (r = i ? i.GetLevel() : 1),
      (e = e.LevelLimit),
      (this.WeaponLevel = r),
      (this.WeaponLimitLevel = e),
      (this.BreachLevel = n),
      (e = ModelManager_1.ModelManager.WeaponModel.GetWeaponBreachMaxLevel(s)),
      (this.BreachMaxLevel = e),
      (this.WeaponStage = o),
      (this.WeaponSkillName = a.Name),
      (this.WeaponEffect = t.Desc),
      (s = ModelManager_1.ModelManager.WeaponModel.GetWeaponConfigDescParams(
        t,
        o,
      )),
      (this.WeaponEffectParam = s),
      (this.WeaponDescription = t.AttributesDescription),
      (e = []),
      (a = t.FirstPropId.Id),
      (o =
        ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
          a,
        )),
      (s = ModelManager_1.ModelManager.WeaponModel.GetCurveValue(
        t.FirstCurve,
        t.FirstPropId.Value,
        r,
        n,
      )),
      (a = {
        Id: a,
        IsMainAttribute: !0,
        Name: o.Name,
        IconPath: o.Icon,
        Value: s,
        IsRatio: t.FirstPropId.IsRatio,
      }),
      (s = t.SecondPropId.Id),
      (o =
        ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
          s,
        )),
      (r = ModelManager_1.ModelManager.WeaponModel.GetCurveValue(
        t.SecondCurve,
        t.SecondPropId.Value,
        r,
        n,
      )),
      (n = {
        Id: s,
        IsMainAttribute: !0,
        Name: o.Name,
        IconPath: o.Icon,
        Value: r,
        IsRatio: t.SecondPropId.IsRatio,
      }),
      e.push(a),
      e.push(n),
      (this.AttributeData = e),
      i) &&
      ((this.EquippedId = i.GetRoleId()),
      (this.IsEquip = 0 !== this.EquippedId));
  }
}
exports.TipsWeaponData = TipsWeaponData;
class TipsVisionData extends ItemTipsData {
  constructor(i, t) {
    super(i, t),
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
    var e = ModelManager_1.ModelManager.InventoryModel.GetAttributeItemData(t),
      i = ConfigManager_1.ConfigManager.InventoryConfig.GetPhantomItemConfig(i),
      e = t ? e.GetConfig() : i;
    if (void 0 !== e) {
      var a = ModelManager_1.ModelManager.PhantomBattleModel,
        a = t ? a.GetPhantomBattleData(t) : void 0,
        s = a ? a.GetPhantomLevel() : 0,
        o = a ? a.GetQuality() : 1,
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
        r =
          (i &&
            !a &&
            ((i = i.SkillId),
            (g = e.GetPhantomSkillBySkillId(i)),
            (this.MainSkillText = g.DescriptionEx),
            (this.MainSkillParams =
              e.GetPhantomSkillDescExByPhantomSkillIdAndQuality(i, o)),
            VisionDetailDescComponent_1.VisionDetailDesc.ConvertVisionSkillDescToDescData(
              g,
              s,
              !0,
              !0,
              o,
            ).forEach((i) => {
              M.AddDescData(i);
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
          r.push(n);
        }
      i = a?.GetSubPropShowAttributeList(1);
      if (void 0 !== i)
        for (const _ of i) {
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
          r.push(h);
        }
      this.AttributeData = r;
      var g =
          ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipRole(
            t,
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
          o,
        ).forEach((i) => {
          M.AddDescData(i);
        }),
        s &&
          VisionDetailDescComponent_1.VisionDetailDesc.ConvertVisionFetterDataToDetailDescData(
            s,
            !1,
          ).forEach((i) => {
            M.AddDescData(i);
          }),
        (this.VisionDetailInfoComponentData = M);
    }
  }
}
exports.TipsVisionData = TipsVisionData;
class TipsCharacterData extends ItemTipsData {
  constructor(i, t) {
    super(i, t),
      (this._Pt = ""),
      (this.bnt = void 0),
      (this.uPt = ""),
      (this.cPt = ""),
      (this.ItemType = 3);
    t = ConfigManager_1.ConfigManager.RoleConfig;
    let e = t.GetRoleConfig(i);
    (i = e.ParentId), (t = (e = 0 < i ? t.GetRoleConfig(i) : e).ElementId);
    (this._Pt = e.Name),
      (this.bnt =
        ConfigManager_1.ConfigManager.ElementInfoConfig.GetElementInfo(t)),
      (this.uPt = e.RoleHeadIconBig),
      (this.cPt = e.Introduction);
  }
  GetRoleName() {
    return this._Pt;
  }
  GetElementConfig() {
    return this.bnt;
  }
  GetHeadTexutePath() {
    return this.uPt;
  }
  GetRoleIntroduction() {
    return this.cPt;
  }
}
exports.TipsCharacterData = TipsCharacterData;
//# sourceMappingURL=ItemTipsDefine.js.map
