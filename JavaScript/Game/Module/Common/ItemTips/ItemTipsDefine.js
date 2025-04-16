"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TipsAbyssDangoData =
    exports.TipsCardData =
    exports.TipsOverPowerData =
    exports.TipsCharacterData =
    exports.TipsVisionData =
    exports.TipsWeaponData =
    exports.TipsMaterialData =
    exports.ItemTipsData =
      void 0);
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  PhantomRarityByRare_1 = require("../../../../Core/Define/ConfigQuery/PhantomRarityByRare"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  PayShopGoods_1 = require("../../PayShop/PayShopData/PayShopGoods"),
  PayShopGoodsData_1 = require("../../PayShop/PayShopData/PayShopGoodsData"),
  VisionDetailDescComponent_1 = require("../../Phantom/Vision/View/VisionDetailDescComponent"),
  VisionDetailInfoComponent_1 = require("../../Phantom/Vision/View/VisionDetailInfoComponent"),
  SkipTaskManager_1 = require("../../SkipInterface/SkipTaskManager");
class ItemTipsData {
  constructor(t) {
    (this.IsIconByType = !1),
      (this.IsQualityByType = !1),
      (this.ItemType = 0),
      (this.GetWayData = void 0),
      (this.LimitTimeTxt = void 0),
      (this.CanClickLockButton = (t) => !0),
      (this.UpdateShowNumCallback = void 0),
      (this.IsShowNumTextCallback = void 0);
    var i = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
        t.ItemId,
      ),
      e =
        ((this.ConfigId = t.ItemId),
        (this.IncId = t.ItemUid),
        (this.CanSkip = t.CanSkip),
        (this.Title = i.Name),
        (this.QualityId = i.QualityId),
        []);
    if (i.ItemAccess && 0 < i.ItemAccess?.length)
      for (const a of i.ItemAccess) {
        var s = ConfigManager_1.ConfigManager.GetWayConfig.GetConfigById(a);
        s &&
          ModelManager_1.ModelManager.SkipInterfaceModel.CheckAccessPathCondition(
            a,
          ) &&
          ((s = {
            Id: a,
            Type: s?.Type,
            Text: s?.Description,
            SortIndex: s?.SortIndex,
            Function: () => {
              this.CanSkip
                ? SkipTaskManager_1.SkipTaskManager.RunByConfigId(
                    a,
                    this.ConfigId,
                  )
                : ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(
                    "SkipTask_Prevent",
                  );
            },
          }),
          e.push(s));
      }
    this.GetWayData = e;
  }
  CanDeprecate() {
    var t;
    return (
      !(this.IncId <= 0) &&
      void 0 !==
        (t = ModelManager_1.ModelManager.InventoryModel?.GetAttributeItemData(
          this.IncId,
        )) &&
      t.CanDeprecate()
    );
  }
}
class TipsMaterialData extends (exports.ItemTipsData = ItemTipsData) {
  constructor(t) {
    super(t), (this.FunctionSpritePath = void 0), (this.ItemType = 0);
    var t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
        this.ConfigId,
      ),
      i =
        ((this.MaterialType = t.TypeDescription),
        (this.FunctionSpritePath = this.cxt(t?.ItemBuffType)),
        ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
          this.ConfigId,
          this.IncId,
        )),
      i =
        ((this.Num = i),
        (this.TxtEffect = t.AttributesDescription),
        (this.TxtDescription = t.BgDescription),
        ModelManager_1.ModelManager.InventoryModel.GetCommonItemData(
          this.ConfigId,
          this.IncId,
        ));
    i?.IsLimitTimeItem() &&
      ((t = i.GetEndTime()),
      (i = TimeUtil_1.TimeUtil.GetDataFromTimeStamp(
        t * TimeUtil_1.TimeUtil.Millisecond,
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
      case 6:
        return i.ExploreBuffSpritePath;
    }
  }
}
exports.TipsMaterialData = TipsMaterialData;
class TipsWeaponData extends ItemTipsData {
  constructor(t) {
    super(t),
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
    var i,
      e,
      s,
      a,
      o,
      r,
      n,
      t = ModelManager_1.ModelManager.InventoryModel.GetAttributeItemData(
        this.IncId,
      ),
      t =
        0 !== this.IncId
          ? t.GetConfig()
          : ConfigManager_1.ConfigManager.InventoryConfig.GetWeaponItemConfig(
              this.ConfigId,
            );
    void 0 !== t &&
      ((t = (i =
        0 !== this.IncId
          ? ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
              this.IncId,
            )
          : void 0)
        ? i.GetWeaponConfig()
        : ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(
            t.ItemId,
          )),
      (n = i ? i.GetBreachLevel() : 0),
      (o = i ? i.GetResonanceLevel() : 1),
      (e = i
        ? i.GetBreachConfig()
        : ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponBreach(
            t.BreachId,
            n,
          )),
      (a = t.BreachId),
      (s = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponResonanceConfig(
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
      (e = ModelManager_1.ModelManager.WeaponModel.GetWeaponBreachMaxLevel(a)),
      (this.BreachMaxLevel = e),
      (this.WeaponStage = o),
      (this.WeaponSkillName = s.Name),
      (this.WeaponEffect = t.Desc),
      (a = ModelManager_1.ModelManager.WeaponModel.GetWeaponConfigDescParams(
        t,
        o,
      )),
      (this.WeaponEffectParam = a),
      (this.WeaponDescription = t.AttributesDescription),
      (e = []),
      (s = t.FirstPropId.Id),
      (o =
        ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
          s,
        )),
      (a = ModelManager_1.ModelManager.WeaponModel.GetCurveValue(
        t.FirstCurve,
        t.FirstPropId.Value,
        r,
        n,
      )),
      (s = {
        Id: s,
        IsMainAttribute: !0,
        Name: o.Name,
        IconPath: o.Icon,
        Value: a,
        IsRatio: t.FirstPropId.IsRatio,
      }),
      (a = t.SecondPropId.Id),
      (o =
        ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
          a,
        )),
      (r = ModelManager_1.ModelManager.WeaponModel.GetCurveValue(
        t.SecondCurve,
        t.SecondPropId.Value,
        r,
        n,
      )),
      (n = {
        Id: a,
        IsMainAttribute: !0,
        Name: o.Name,
        IconPath: o.Icon,
        Value: r,
        IsRatio: t.SecondPropId.IsRatio,
      }),
      e.push(s),
      e.push(n),
      (this.AttributeData = e),
      i) &&
      ((this.EquippedId = i.GetRoleId()),
      (this.IsEquip = 0 !== this.EquippedId));
  }
}
exports.TipsWeaponData = TipsWeaponData;
class TipsVisionData extends ItemTipsData {
  constructor(i) {
    super(i),
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
    i = i.ExtraParam;
    let t = void 0;
    t =
      i instanceof Protocol_1.Aki.Protocol.t5s
        ? ModelManager_1.ModelManager.InventoryModel.GetPhantomItemDataByPhantomItem(
            i,
          )
        : ModelManager_1.ModelManager.InventoryModel.GetAttributeItemData(
            this.IncId,
          );
    var e = ConfigManager_1.ConfigManager.InventoryConfig.GetPhantomItemConfig(
        this.ConfigId,
      ),
      s = this.IncId ? t.GetConfig() : e;
    if (void 0 !== s) {
      var a = ModelManager_1.ModelManager.PhantomBattleModel;
      let t = void 0;
      (i = (t =
        i instanceof Protocol_1.Aki.Protocol.t5s
          ? ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleDataByPhantomItem(
              i,
            )
          : this.IncId
            ? a.GetPhantomBattleData(this.IncId)
            : void 0)
        ? t.GetPhantomLevel()
        : 0),
        (a = t ? t.GetQuality() : 1),
        (s = ((this.ItemType = 2), (this.VisionId = s.MonsterId), s.Rarity)),
        (s =
          ((this.VisionType =
            PhantomRarityByRare_1.configPhantomRarityByRare.GetConfig(s).Desc),
          (this.Cost =
            ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomRareConfig(
              s,
            ).Cost),
          ConfigManager_1.ConfigManager.TextConfig.GetTextById("VisionLevel")));
      this.UpgradeLevel = StringUtils_1.StringUtils.Format(s, i.toString());
      const p = new VisionDetailInfoComponent_1.VisionDetailInfoComponentData();
      var s = ConfigManager_1.ConfigManager.PhantomBattleConfig,
        o =
          (e &&
            !t &&
            ((e = e.SkillId),
            (h = s.GetPhantomSkillBySkillId(e)),
            (this.MainSkillText = h.DescriptionEx),
            (this.MainSkillParams =
              s.GetPhantomSkillDescExByPhantomSkillIdAndQuality(e, a)),
            VisionDetailDescComponent_1.VisionDetailDesc.ConvertVisionSkillDescToDescData(
              h,
              i,
              !0,
              !0,
              a,
            ).forEach((t) => {
              p.AddDescData(t);
            })),
          []),
        s = t?.GetMainPropShowAttributeList(1);
      if (void 0 !== s)
        for (const l of s) {
          var r =
              ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
                l.Id,
              ),
            r = {
              Id: l.Id,
              IsMainAttribute: !0,
              Name: r.Name,
              IconPath: r.Icon,
              Value: l.BaseValue,
              IsRatio: l.IsRatio,
            };
          o.push(r);
        }
      e = t?.GetSubPropShowAttributeList(1);
      if (void 0 !== e)
        for (const g of e) {
          var n =
              ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
                g.Id,
              ),
            n = {
              Id: g.Id,
              IsMainAttribute: !1,
              Name: n.Name,
              IconPath: n.Icon,
              Value: g.BaseValue,
              IsRatio: g.IsRatio,
            };
          o.push(n);
        }
      this.AttributeData = o;
      var h =
          ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipRole(
            this.IncId,
          ),
        i =
          (h && ((this.EquippedId = h), (this.IsEquip = 0 !== this.EquippedId)),
          (p.DataBase = t)?.GetPreviewShowFetterList(-1, 0));
      t &&
        VisionDetailDescComponent_1.VisionDetailDesc.ConvertVisionSkillDescToDescData(
          t?.GetNormalSkillConfig(),
          t.GetPhantomLevel(),
          !0,
          !0,
          a,
        ).forEach((t) => {
          p.AddDescData(t);
        }),
        i &&
          VisionDetailDescComponent_1.VisionDetailDesc.ConvertVisionFetterDataToDetailDescData(
            i,
            !1,
          ).forEach((t) => {
            p.AddDescData(t);
          }),
        (this.VisionDetailInfoComponentData = p);
    }
  }
}
exports.TipsVisionData = TipsVisionData;
class TipsCharacterData extends ItemTipsData {
  constructor(t) {
    super(t),
      (this.mxt = ""),
      (this.Qst = void 0),
      (this.dxt = ""),
      (this.Cxt = ""),
      (this.ItemType = 3);
    t = ConfigManager_1.ConfigManager.RoleConfig;
    let i = t.GetRoleConfig(this.ConfigId);
    var e = i.ParentId,
      t = (i = 0 < e ? t.GetRoleConfig(e) : i).ElementId;
    (this.mxt = i.Name),
      (this.Qst =
        ConfigManager_1.ConfigManager.ElementInfoConfig.GetElementInfo(t)),
      (this.dxt = i.RoleHeadIconBig),
      (this.Cxt = i.Introduction);
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
  constructor(t) {
    super(t), (this.ItemType = 4);
  }
  ConvertToPayShopGoods() {
    var t = new PayShopGoodsData_1.PayShopGoodsData(),
      i =
        (t.PhraseFromTempData(this.ConfigId, 0),
        new PayShopGoods_1.PayShopGoods(-1));
    return i.SetGoodsData(t), i;
  }
}
exports.TipsOverPowerData = TipsOverPowerData;
class TipsCardData extends ItemTipsData {
  constructor(t) {
    super(t), (this.ItemType = 5);
  }
}
exports.TipsCardData = TipsCardData;
class TipsAbyssDangoData extends ItemTipsData {
  constructor(t) {
    super(t),
      (this.DangoId = -1),
      (this.SlotIndex = -1),
      (this.ItemType = 6),
      (this.IsIconByType = !0),
      (this.IsQualityByType = !0),
      t.ExtraParam &&
        ((t = t.ExtraParam),
        (this.DangoId = t.DangoId),
        (this.SlotIndex = t.SlotIndex));
  }
}
exports.TipsAbyssDangoData = TipsAbyssDangoData;
//# sourceMappingURL=ItemTipsDefine.js.map
