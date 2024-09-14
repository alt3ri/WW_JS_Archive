"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhantomDataBase =
    exports.VisionSubPropData =
    exports.VisionSubPropViewData =
    exports.VisionSlotData =
    exports.VisionFetterData =
      void 0);
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
  MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  AttributeModel_1 = require("../../../Attribute/AttributeModel"),
  CommonComponentDefine_1 = require("../../../Common/CommonComponentDefine"),
  ItemDefines_1 = require("../../../Item/Data/ItemDefines"),
  RoleLevelUpSuccessController_1 = require("../../../RoleUi/RoleLevel/RoleLevelUpSuccessController"),
  AttrListScrollData_1 = require("../../../RoleUi/View/ViewData/AttrListScrollData"),
  VisionAttributeItemTwo_1 = require("../../Vision/View/VisionAttributeItemTwo");
class VisionFetterData {
  constructor() {
    (this.FetterGroupId = 0),
      (this.FetterId = 0),
      (this.NeedActiveNum = 0),
      (this.ActiveFetterGroupNum = 0),
      (this.ActiveState = !1),
      (this.NewAdd = !1);
  }
}
exports.VisionFetterData = VisionFetterData;
class VisionSlotData {
  constructor() {
    this.SlotState = 0;
  }
}
exports.VisionSlotData = VisionSlotData;
class VisionSubPropViewData {
  constructor() {
    (this.Data = void 0),
      (this.SourceView = ""),
      (this.IfPreCache = !1),
      (this.CurrentVisionData = void 0);
  }
}
exports.VisionSubPropViewData = VisionSubPropViewData;
class VisionSubPropData {
  constructor(t, e) {
    (this.wVi = 0),
      (this.Pe = void 0),
      (this.SlotState = 0),
      (this.PhantomSubProp = void 0),
      (this.wVi = t),
      (this.Pe = e);
  }
  GetSubPropName() {
    var t =
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSubPropertyById(
          this.PhantomSubProp.Yws,
        ).PropId,
      t =
        ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
          t,
        );
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.Name) ?? "";
  }
  GetSlotIndex() {
    return this.wVi;
  }
  GetLevelUpViewName() {
    var t;
    return 0 === this.SlotState
      ? ((t =
          MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            "LevelUpAndIdentify",
          ) ?? ""),
        StringUtils_1.StringUtils.Format(t, this.GetUnlockLevel().toString()))
      : 1 === this.SlotState
        ? (MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            "WaitForIdentify",
          ) ?? "")
        : 3 === this.SlotState
          ? this.GetSubPropName()
          : 2 === this.SlotState
            ? ((t =
                MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                  "LevelUpAndIdentify",
                ) ?? ""),
              StringUtils_1.StringUtils.Format(
                t,
                this.GetUnlockLevel().toString(),
              ))
            : 5 === this.SlotState || 4 === this.SlotState
              ? (MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                  "CurrentIdentifyUnlockText",
                ) ?? "")
              : "";
  }
  GetAttributeValueString() {
    var t =
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSubPropertyById(
          this.PhantomSubProp.Yws,
        ),
      e = t.AddType === CommonComponentDefine_1.RATIO,
      r = AttributeModel_1.TipsDataTool.GetPropRatioValue(
        this.PhantomSubProp.e5n,
        e,
      );
    return ModelManager_1.ModelManager.AttributeModel.GetFormatAttributeValueString(
      t.PropId,
      r,
      e,
    );
  }
  GetUnlockLevel() {
    var t = this.Pe.GetQuality(),
      t =
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSlotUnlockLevel(
          t,
        );
    return t.length > this.wVi ? t[this.wVi] : 0;
  }
}
exports.VisionSubPropData = VisionSubPropData;
class PhantomDataBase {
  constructor() {
    (this.PhantomMainProp = []),
      (this.PhantomSubProp = []),
      (this.PhantomLevel = 0),
      (this.PhantomExp = 0),
      (this.ItemId = 0),
      (this.FuncValue = 0),
      (this.SuspendSlot = void 0),
      (this.BVi = 0),
      (this.FetterGroupId = 0),
      (this.bVi = 0);
  }
  SetPhantomLevel(t) {
    this.PhantomLevel = t;
  }
  static GenerateLocalUniqueId(t, e) {
    return 10 * t * -1 - e;
  }
  SetIncId(t) {
    this.BVi = t;
  }
  GetPhantomLevel() {
    return this.PhantomLevel;
  }
  IsMax() {
    return (
      this.PhantomLevel >=
      ControllerHolder_1.ControllerHolder.PhantomBattleController.GetMaxLevel(
        this.BVi,
      )
    );
  }
  SetPhantomExp(t) {
    this.PhantomExp = t;
  }
  CurrentPhantomInstance() {
    return this.GetPhantomInstanceWithSkinId();
  }
  GetCurrentSuspendSlotData() {
    return this.SuspendSlot;
  }
  GetFetterGroupId() {
    return this.FetterGroupId;
  }
  GetEatFullExp() {
    var t = CommonParamById_1.configCommonParamById.GetIntConfig(
      "PhantomExpReturnRatio",
    );
    return Math.floor((this.GetFullExp() * t) / 1e3);
  }
  GetFullExp() {
    if (0 === this.GetPhantomLevel()) return this.PhantomExp;
    let e = 0;
    for (let t = 1; t <= this.GetPhantomLevel(); t++)
      e +=
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomLevelExpByGroupIdAndLevel(
          this.b4a().PhantomItem.LevelUpGroupId,
          t,
        );
    return e + this.PhantomExp;
  }
  GetExp() {
    return this.PhantomExp;
  }
  UpdateData(t) {
    (this.BVi = t.b9n ?? 0),
      (this.FuncValue = t.Vws ?? 0),
      (this.PhantomLevel = t.$ws ?? 0),
      (this.PhantomExp = t.Hws ?? 0),
      (this.PhantomMainProp = t.jws ?? []),
      (this.PhantomSubProp = t.Wws ?? []),
      (this.FetterGroupId = t.Kws ?? 0),
      (this.bVi = t.Z7n ?? 0);
  }
  SetMainProp(t) {
    this.PhantomMainProp = t;
  }
  SetSubProp(t) {
    this.PhantomMainProp = t;
  }
  GetIncrId() {
    return this.BVi;
  }
  OnFunctionValueChange(t) {
    this.FuncValue = t;
  }
  GetSuspendAttributeData() {
    var t = this.SuspendSlot.Qws;
    const i = new Array();
    return (
      t.forEach((t) => {
        var e =
            ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSubPropertyById(
              t.Yws,
            ),
          r =
            ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
              t.Yws,
            ),
          n = e.AddType === CommonComponentDefine_1.RATIO,
          t = AttributeModel_1.TipsDataTool.GetPropRatioValue(t.e5n, n);
        i.push(
          new AttrListScrollData_1.AttrListScrollData(
            e.PropId,
            0,
            t,
            r.Priority,
            n,
            1,
          ),
        );
      }),
      i
    );
  }
  GetSlotIndexAttributeData(t, e) {
    var r, n, i, a;
    if (this.GetSlotIndexDataEx(t))
      return (
        (t = this.GetSlotIndexDataEx(t)),
        (r = new Array()),
        (n =
          ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSubPropertyById(
            t.Yws,
          )),
        (i =
          ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
            t.Yws,
          )),
        (a = n.AddType === CommonComponentDefine_1.RATIO),
        (t = AttributeModel_1.TipsDataTool.GetPropRatioValue(t.e5n, a)),
        r.push(
          new AttrListScrollData_1.AttrListScrollData(
            n.PropId,
            0,
            t,
            i.Priority,
            a,
            e,
          ),
        ),
        r
      );
  }
  IsFunctionValue(t) {
    return 0 < (this.FuncValue & (1 << t));
  }
  GetIsLock() {
    return this.IsFunctionValue(0);
  }
  GetIsDeprecated() {
    return this.IsFunctionValue(1);
  }
  GetEquipRoleId() {
    return (
      ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomEquipOnRoleId(
        this.GetIncrId(),
      ) ?? 0
    );
  }
  GetEquipRoleIndex() {
    var t = this.GetEquipRoleId();
    if (0 < t) {
      t =
        ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(
          t,
        ).GetIncrIdList();
      if (t.includes(this.GetIncrId())) return t.indexOf(this.GetIncrId());
    }
    return -1;
  }
  GetNameColor() {
    return ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(
      this.GetQuality(),
    ).DropColor;
  }
  qVi(t, e) {
    var r,
      n,
      i =
        ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(
          e,
        ).GetIncrIdList();
    return -1 === t ||
      (r =
        ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(
          e,
        ).GetIndexPhantomId(t)) === (n = this.GetIncrId())
      ? i
      : ((i = Array.from(
          ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(
            e,
          ).GetIncrIdList(),
        )),
        0 === r
          ? (this.GetEquipRoleId() === e && (i[this.GetEquipRoleIndex()] = 0),
            (i[t] = n))
          : r !== n &&
            (this.GetEquipRoleId() === e &&
              (i[this.GetEquipRoleIndex()] = i[t]),
            (i[t] = n)),
        i);
  }
  static CalculateFetterByPhantomBattleData(e) {
    var r = e.length,
      n = new Map(),
      i = new Map();
    for (let t = 0; t < r; t++) {
      var a = e[t];
      if (a) {
        var o,
          s = a.GetFetterGroupId();
        let t = i.get(s);
        (t = t || new Array()).includes(a.GetMonsterId()) ||
          ((o = n.get(s) ?? 0), n.set(s, o + 1), t.push(a.GetMonsterId())),
          i.set(s, t);
      }
    }
    return n;
  }
  IfEquipSameNameMonsterOnRole(t, e, r) {
    t = this.qVi(t, e);
    const n = new Array();
    t.forEach((t) => {
      t = ModelManager_1.ModelManager.PhantomBattleModel?.GetPhantomDataBase(t);
      t && n.push(t.GetMonsterId());
    });
    e = new Set(n);
    return n.length !== e.size;
  }
  GetPreviewShowFetterList(t, e) {
    const a = new Array();
    var r =
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupFetterDataById(
          this.FetterGroupId,
        ),
      n = this.qVi(t, e);
    const o =
      ModelManager_1.ModelManager.PhantomBattleModel.GetRoleFetterData(e);
    var i = n.length,
      s = new Array();
    for (let t = 0; t < i; t++) {
      var h =
        ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
          n[t],
        );
      h && s.push(h);
    }
    const u = PhantomDataBase.CalculateFetterByPhantomBattleData(s),
      l = o.length;
    return (
      r.forEach((e, t) => {
        var r = new VisionFetterData(),
          n =
            ((r.FetterGroupId = this.FetterGroupId),
            (r.FetterId = e),
            (r.NeedActiveNum = t),
            (r.ActiveFetterGroupNum = u.get(this.FetterGroupId) ?? 0),
            (r.ActiveState = u.get(this.FetterGroupId) >= t),
            u.get(this.FetterGroupId) >= t);
        let i = !1;
        for (let t = 0; t < l; t++)
          if (o[t].FetterId === e && o[t].ActiveState !== n && n) {
            i = !0;
            break;
          }
        i && (r.NewAdd = !0), a.push(r);
      }),
      a
    );
  }
  GetPreviewCurrentShowFetterList() {
    return new Array();
  }
  GetShowFetterList(t, e) {
    const r = new Array();
    return (
      -1 !== t &&
        (this.GetAddFetterList(t, e).forEach((t) => {
          var e = new VisionAttributeItemTwo_1.VisionAttributeVariantTwoData();
          (e.FetterId = t), (e.State = 2), r.push(e);
        }),
        this.GetDelFetterList(t, e).forEach((t) => {
          var e = new VisionAttributeItemTwo_1.VisionAttributeVariantTwoData();
          (e.FetterId = t), (e.State = 1), r.push(e);
        })),
      this.GetCanActiveFetterList().forEach((t) => {
        var e;
        this.GVi(r, t) ||
          (((e =
            new VisionAttributeItemTwo_1.VisionAttributeVariantTwoData()).FetterId =
            t),
          (e.State = 0),
          r.push(e));
      }),
      r
    );
  }
  GVi(e, r) {
    for (let t = e.length - 1; 0 <= t; t--) if (e[t].FetterId === r) return !0;
    return !1;
  }
  GetCanActiveFetterList() {
    return ModelManager_1.ModelManager.PhantomBattleModel.GetTargetCanActiveFettersList(
      this.GetIncrId(),
    );
  }
  GetDelFetterList(t, e) {
    return ModelManager_1.ModelManager.PhantomBattleModel.GetPreviewFettersDel(
      this,
      t,
      e,
    );
  }
  GetAddFetterList(t, e) {
    return ModelManager_1.ModelManager.PhantomBattleModel.GetPreviewFetterAdd(
      this,
      t,
      e,
    );
  }
  GetFetterGroupConfig() {
    return ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupById(
      this.GetFetterGroupId(),
    );
  }
  GetCost() {
    var t = this.GetConfig().Rarity;
    return ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomRareConfig(
      t,
    ).Cost;
  }
  GetRareConfig() {
    var t = this.GetConfig().Rarity;
    return ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomRareConfig(
      t,
    );
  }
  GetNewSubPropSuccessData(e) {
    var e = e.length,
      r = this.PhantomSubProp.length,
      n = this.GetSubPropShowAttributeList(1),
      i = new Array();
    for (let t = e; t < r; t++)
      (n[t].AddValue = n[t].BaseValue), (n[t].BaseValue = 0), i.push(n[t]);
    const a = new Array();
    return (
      i.forEach((t) => {
        t =
          RoleLevelUpSuccessController_1.RoleLevelUpSuccessController.ConvertsAttrListScrollDataToAttributeInfo(
            t,
          );
        (t.ShowArrow = !1), (t.PreText = ""), a.push(t);
      }),
      {
        Title: "IdentifySuccess",
        WiderScrollView: !1,
        AttributeInfo: a,
        IsShowArrow: !1,
      }
    );
  }
  GetSlotIndexDataEx(t) {
    var e = this.PhantomSubProp;
    if (e.length > t) return e[t];
  }
  GetMaxSubPropCount() {
    var t = this.GetQuality();
    return ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSlotUnlockLevel(
      t,
    ).length;
  }
  GetSubPropIdentifyPreviewData(t, e) {
    var r = this.GetLevelSubPropData(t);
    let n = 0;
    var i = r.length;
    for (let t = 0; t < i; t++)
      1 === r[t].SlotState && 0 < e - n && ((r[t].SlotState = 5), n++);
    return r;
  }
  GetLevelSubPropPreviewData(t, e) {
    var r = this.GetLevelSubPropData(t),
      n = this.GetLevelSubPropData(e),
      i = n.length;
    for (let t = 0; t < i; t++)
      0 !== n[t].SlotState && 0 === r[t].SlotState && (n[t].SlotState = 2);
    return n;
  }
  GetEquipmentViewPreviewData() {
    var e = this.GetLevelSubPropData(this.GetPhantomLevel()),
      r = e.length,
      n = new Array();
    let i = 0;
    for (let t = 0; t < r; t++)
      3 === e[t].SlotState && n.push(e[t]),
        1 === e[t].SlotState && 0 === i && (n.push(e[t]), (i += 1));
    return n;
  }
  GetIdentifyCostItemId() {
    return ItemDefines_1.EItemId.Gold;
  }
  GetIdentifyCostItemValue() {
    return ConfigManager_1.ConfigManager.PhantomBattleConfig.GetQualityIdentifyCost(
      this.GetQuality(),
    );
  }
  GetCurrentIdentifyCost() {
    var t = this.GetQuality();
    return ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomIdentifyCost(
      t,
    );
  }
  GetCurrentSubPropLockCount() {
    var t = this.GetLevelSubPropData(this.GetPhantomLevel());
    let e = 0;
    return (
      t.forEach((t) => {
        0 === t.SlotState && e++;
      }),
      e
    );
  }
  GetIfHaveEnoughIdentifyGold(t) {
    var t = this.GetIdentifyCostItemValue() * t,
      e = ModelManager_1.ModelManager.InventoryModel.GetItemDataBaseByConfigId(
        this.GetIdentifyCostItemId(),
      );
    let r = 0;
    return 0 <= (r = 0 < e.length ? e[0].GetCount() : r) - t;
  }
  GetIfHaveEnoughIdentifyConsumeItem(t) {
    var t = this.GetCurrentIdentifyCostValue() * t,
      e = ModelManager_1.ModelManager.InventoryModel.GetItemDataBaseByConfigId(
        this.GetCurrentIdentifyCostId(),
      );
    let r = 0;
    return 0 <= (r = 0 < e.length ? e[0].GetCount() : r) - t;
  }
  GetNextIdentifyLevel() {
    let t = 0;
    for (const e of this.GetLevelSubPropData(this.GetPhantomLevel()))
      if (0 === e.SlotState) {
        t = e.GetUnlockLevel();
        break;
      }
    return t;
  }
  GetCurrentIdentifyCostId() {
    var t = this.GetCurrentIdentifyCost();
    let r = 0;
    return (
      t.forEach((t, e) => {
        r = e;
      }),
      r
    );
  }
  GetCurrentIdentifyCostValue() {
    var t = this.GetCurrentIdentifyCost();
    let r = 0;
    return (
      t.forEach((t, e) => {
        r = t;
      }),
      r
    );
  }
  GetCurrentCanIdentifyCount() {
    var t = this.GetLevelSubPropData(this.GetPhantomLevel());
    let e = 0,
      n =
        (t.forEach((t) => {
          1 === t.SlotState && e++;
        }),
        e);
    return (
      this.GetCurrentIdentifyCost().forEach((t, e) => {
        e =
          ModelManager_1.ModelManager.InventoryModel.GetItemDataBaseByConfigId(
            e,
          );
        let r = 0;
        (r = 0 < e.length ? Math.floor(e[0].GetCount() / t) : r) < n && (n = r);
      }),
      n
    );
  }
  GetLevelUnlockSubPropSlotCount(e) {
    var r = this.GetMaxSubPropCount();
    let n = 0;
    for (let t = 0; t < r; t++) e >= this.GetSubPropUnlockLevel(t) && n++;
    return n;
  }
  GetLevelSubPropData(e) {
    var r = this.GetMaxSubPropCount(),
      n = new Array();
    for (let t = 0; t < r; t++) {
      var i,
        a = new VisionSubPropData(t, this);
      e >= this.GetSubPropUnlockLevel(t)
        ? (i = this.GetSlotIndexDataEx(t))
          ? ((a.SlotState = 3), (a.PhantomSubProp = i))
          : (a.SlotState = 1)
        : (a.SlotState = 0),
        n.push(a);
    }
    return n;
  }
  GetIfHaveLockSubProp() {
    let t = !1;
    for (const e of this.GetLevelSubPropData(this.GetPhantomLevel()))
      if (0 === e.SlotState) {
        t = !0;
        break;
      }
    return t;
  }
  GetIfHaveUnIdentifySubProp() {
    let t = !1;
    for (const e of this.GetLevelSubPropData(this.GetPhantomLevel()))
      if (1 === e.SlotState) {
        t = !0;
        break;
      }
    return t;
  }
  GetSubPropUnlockLevel(t) {
    var e = this.GetQuality(),
      e =
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSlotUnlockLevel(
          e,
        );
    return e.length >= t ? e[t] : 9999;
  }
  GetMaxSlotCount() {
    const e = this.GetLevelLimit();
    var t = CommonParamById_1.configCommonParamById.GetIntArrayConfig(
      "PhantomSlotUnlockLevel",
    );
    let r = 0;
    return (
      t.forEach((t) => {
        e >= t && r++;
      }),
      r
    );
  }
  GetSlotUnlockLevel(t) {
    var e = CommonParamById_1.configCommonParamById.GetIntArrayConfig(
      "PhantomSlotUnlockLevel",
    );
    return e.length >= t ? e[t] : 9999;
  }
  GetSlotLockState(t) {
    return this.GetPhantomLevel() < this.GetSlotUnlockLevel(t);
  }
  GetIdentifyBackRadio() {
    return (
      CommonParamById_1.configCommonParamById.GetIntConfig(
        "PhantomIdentifyReturnRatio",
      ) / 1e3
    );
  }
  GetCurrentIdentifyNum() {
    return this.PhantomSubProp.length;
  }
  GetIdentifyBackItem() {
    var t = this.GetCurrentIdentifyCostValue(),
      e = this.GetCurrentIdentifyCostId(),
      r = this.GetCurrentIdentifyNum(),
      n = new Map(),
      t = Math.floor(t * r * this.GetIdentifyBackRadio());
    return 0 < t && n.set(e, t), n;
  }
  GetLevelSlotData(e) {
    var r = this.GetMaxSlotCount(),
      n = new Array();
    if (!(1 <= r && e < this.GetSlotUnlockLevel(0)))
      for (let t = 0; t < r; t++) {
        var i = new VisionSlotData();
        e >= this.GetSlotUnlockLevel(t)
          ? this.GetSlotIndexDataEx(t)
            ? (i.SlotState = 3)
            : (i.SlotState = 1)
          : (i.SlotState = 0),
          n.push(i);
      }
    return n;
  }
  GetCurrentSlotData() {
    return this.GetLevelSlotData(this.GetPhantomLevel());
  }
  GetPreviewSlotData(e) {
    var r,
      n = this.GetCurrentSlotData(),
      i = this.GetLevelSlotData(e),
      a = i.length;
    for (let t = 0; t < a; t++)
      0 === n.length
        ? ((r = this.GetSlotUnlockLevel(t)), (i[t].SlotState = r <= e ? 2 : 0))
        : n.length > t &&
          n[t].SlotState !== i[t].SlotState &&
          (i[t].SlotState = 2);
    return i;
  }
  GetCurrentSkillId() {
    return this.GetPhantomInstanceWithSkinId().PhantomItem.SkillId;
  }
  GetSkillDescExParam(t) {
    return ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSkillDescExBySkillIdAndQuality(
      t,
      this.GetQuality(),
    );
  }
  GetNormalSkillDesc() {
    var t = this.GetPhantomInstanceWithSkinId(),
      t =
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSkillBySkillId(
          t.PhantomItem.SkillId,
        );
    if (t)
      return {
        MainSkillText: t.DescriptionEx,
        MainSkillParameter: this.GetSkillDescExParam(t.Id),
        MainSkillIcon: t.BattleViewIcon,
      };
  }
  GetNormalSkillConfig() {
    var t = this.GetPhantomInstanceWithSkinId();
    return ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSkillBySkillId(
      t.PhantomItem.SkillId,
    );
  }
  GetNormalSkillId() {
    return this.GetPhantomInstanceWithSkinId().PhantomItem.SkillId;
  }
  GetPersonalSkillId() {
    return 0;
  }
  GetPhantomInstanceWithSkinId() {
    var t = this.SkinId;
    return t
      ? ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomInstanceByItemId(
          t,
        )
      : this.b4a();
  }
  b4a() {
    return ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomInstanceByItemId(
      this.GetConfigId(),
    );
  }
  GetLevelUpPreviewData(t) {
    const a = new Array();
    t = this.GetMainPropValueMapInTargetLevel(t);
    const o = new Map();
    return (
      this.PhantomMainProp.forEach((t) => {
        o.set(t.Yws, t.e5n);
      }),
      t.forEach((t, e) => {
        var r = o.has(e) ? o.get(e) : 0,
          e =
            ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomMainPropertyItemId(
              e,
            ),
          n =
            ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
              e.PropId,
            ),
          i = e.AddType === CommonComponentDefine_1.RATIO,
          r = AttributeModel_1.TipsDataTool.GetPropRatioValue(r, i),
          t = AttributeModel_1.TipsDataTool.GetPropRatioValue(t, i);
        a.push(
          new AttrListScrollData_1.AttrListScrollData(
            e.PropId,
            r,
            t,
            n.Priority,
            i,
            1,
          ),
        );
      }),
      a
    );
  }
  GetPhantomMainProp() {
    return this.PhantomMainProp;
  }
  GetMainPropValueMapInTargetLevel(t) {
    var e = new Map();
    for (const i of this.GetPhantomMainProp()) {
      var r =
          ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomMainPropertyItemId(
            i.Yws,
          ),
        n =
          ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomGrowthValueByGrowthIdAndLevel(
            r.GrowthId,
            t,
          ),
        r = AttributeModel_1.TipsDataTool.GetAttributeValue(
          r.StandardProperty,
          n,
          !1,
        );
      e.set(i.Yws, Math.floor(r));
    }
    return e;
  }
  GetPhantomSubProp() {
    return this.PhantomSubProp;
  }
  SetConfigId(t) {
    this.ItemId = t;
  }
  SetSkinId(t) {
    this.bVi = t;
  }
  get SkinId() {
    return this.bVi;
  }
  GetConfigId(t = !1) {
    var e = this.SkinId;
    return t && e ? e : this.ItemId;
  }
  GetConfig() {
    return ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemById(
      this.ItemId,
    );
  }
  GetSkinConfig() {
    var t = this.SkinId;
    return t
      ? ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemById(t)
      : this.GetConfig();
  }
  GetMonsterConfig() {
    return ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterInfoConfig(
      this.GetMonsterId(),
    );
  }
  GetLevelLimit() {
    return ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomQualityByItemQuality(
      this.GetQuality(),
    ).LevelLimit;
  }
  GetQuality() {
    return this.GetConfig()?.QualityId;
  }
  GetMonsterId(t = !1) {
    return (t && this.SkinId ? this.GetSkinConfig() : this.GetConfig())
      ?.MonsterId;
  }
  GetMonsterName() {
    return (this.SkinId ? this.GetSkinConfig() : this.GetConfig())?.MonsterName;
  }
  GetMainPropShowAttributeList(e) {
    var r = new Array();
    const n = new Map();
    this.PhantomMainProp.forEach((t) => {
      n.set(t.Yws, t.e5n);
    });
    var i = Array.from(n.keys()),
      a = i.length;
    for (let t = 0; t < a; t++) {
      var o =
          ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomMainPropertyItemId(
            i[t],
          ),
        s =
          ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
            o.PropId,
          ),
        h = AttributeModel_1.TipsDataTool.GetPropRatioValue(
          n.get(i[t]),
          o.AddType === CommonComponentDefine_1.RATIO,
        );
      r.push(
        new AttrListScrollData_1.AttrListScrollData(
          o.PropId,
          h,
          0,
          s.Priority,
          o.AddType === CommonComponentDefine_1.RATIO,
          e,
        ),
      );
    }
    return r;
  }
  GetSubPropShowAttributeList(i) {
    const a = new Array();
    return (
      this.PhantomSubProp.forEach((t) => {
        var e =
            ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
              t.Yws,
            ),
          r =
            ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSubPropertyById(
              t.Yws,
            ),
          n = r.AddType === CommonComponentDefine_1.RATIO,
          t = AttributeModel_1.TipsDataTool.GetPropRatioValue(t.e5n, n);
        a.push(
          new AttrListScrollData_1.AttrListScrollData(
            r.PropId,
            t,
            0,
            e.Priority,
            r.AddType === CommonComponentDefine_1.RATIO,
            i,
          ),
        );
      }),
      a
    );
  }
  GetPropShowAttributeList(e) {
    var r = new Array();
    const n = new Map(),
      i =
        (this.PhantomMainProp.forEach((t) => {
          n.set(t.Yws, t.e5n);
        }),
        new Map());
    this.PhantomSubProp.forEach((t) => {
      i.set(t.Yws, t.e5n), n.has(t.Yws) || n.set(t.Yws, 0);
    });
    var a = Array.from(n.keys()),
      o = a.length;
    for (let t = 0; t < o; t++) {
      var s =
        ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
          a[t],
        );
      r.push(
        new AttrListScrollData_1.AttrListScrollData(
          a[t],
          n.get(a[t]),
          i.get(a[t]) ?? 0,
          s.Priority,
          !1,
          e,
        ),
      );
    }
    return r;
  }
  static GetPropValue(t, e) {
    return t.Value;
  }
}
exports.PhantomDataBase = PhantomDataBase;
//# sourceMappingURL=PhantomDataBase.js.map
