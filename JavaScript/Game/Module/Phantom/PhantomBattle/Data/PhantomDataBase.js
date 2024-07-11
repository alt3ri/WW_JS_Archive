"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhantomDataBase =
    exports.VisionSubPropData =
    exports.VisionSubPropViewData =
    exports.VisionSlotData =
    exports.VisionFetterData =
      void 0);
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const AttributeModel_1 = require("../../../Attribute/AttributeModel");
const CommonComponentDefine_1 = require("../../../Common/CommonComponentDefine");
const ItemDefines_1 = require("../../../Item/Data/ItemDefines");
const RoleLevelUpSuccessController_1 = require("../../../RoleUi/RoleLevel/RoleLevelUpSuccessController");
const AttrListScrollData_1 = require("../../../RoleUi/View/ViewData/AttrListScrollData");
const VisionAttributeItemTwo_1 = require("../../Vision/View/VisionAttributeItemTwo");
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
    (this.B5i = 0),
      (this.Pe = void 0),
      (this.SlotState = 0),
      (this.PhantomSubProp = void 0),
      (this.B5i = t),
      (this.Pe = e);
  }
  GetSubPropName() {
    var t =
      ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSubPropertyById(
        this.PhantomSubProp.IDs,
      ).PropId;
    var t =
      ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(t);
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.Name) ?? "";
  }
  GetSlotIndex() {
    return this.B5i;
  }
  GetLevelUpViewName() {
    let t;
    return this.SlotState === 0
      ? ((t =
          MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            "LevelUpAndIdentify",
          ) ?? ""),
        StringUtils_1.StringUtils.Format(t, this.GetUnlockLevel().toString()))
      : this.SlotState === 1
        ? MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            "WaitForIdentify",
          ) ?? ""
        : this.SlotState === 3
          ? this.GetSubPropName()
          : this.SlotState === 2
            ? ((t =
                MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                  "LevelUpAndIdentify",
                ) ?? ""),
              StringUtils_1.StringUtils.Format(
                t,
                this.GetUnlockLevel().toString(),
              ))
            : this.SlotState === 5 || this.SlotState === 4
              ? MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                  "CurrentIdentifyUnlockText",
                ) ?? ""
              : "";
  }
  GetAttributeValueString() {
    const t =
      ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSubPropertyById(
        this.PhantomSubProp.IDs,
      );
    const e = t.AddType === CommonComponentDefine_1.RATIO;
    const r = AttributeModel_1.TipsDataTool.GetPropRatioValue(
      this.PhantomSubProp.gkn,
      e,
    );
    return ModelManager_1.ModelManager.AttributeModel.GetFormatAttributeValueString(
      t.PropId,
      r,
      e,
    );
  }
  GetUnlockLevel() {
    var t = this.Pe.GetQuality();
    var t =
      ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSlotUnlockLevel(
        t,
      );
    return t.length > this.B5i ? t[this.B5i] : 0;
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
      (this.b5i = 0),
      (this.FetterGroupId = 0),
      (this.q5i = 0);
  }
  SetPhantomLevel(t) {
    this.PhantomLevel = t;
  }
  static GenerateLocalUniqueId(t, e) {
    return 10 * t * -1 - e;
  }
  SetIncId(t) {
    this.b5i = t;
  }
  GetPhantomLevel() {
    return this.PhantomLevel;
  }
  IsMax() {
    return (
      this.PhantomLevel >=
      ControllerHolder_1.ControllerHolder.PhantomBattleController.GetMaxLevel(
        this.b5i,
      )
    );
  }
  SetPhantomExp(t) {
    this.PhantomExp = t;
  }
  CurrentPhantomInstance() {
    return this.GetPhantomInstance();
  }
  GetCurrentSuspendSlotData() {
    return this.SuspendSlot;
  }
  GetFetterGroupId() {
    return this.FetterGroupId;
  }
  GetEatFullExp() {
    const t = CommonParamById_1.configCommonParamById.GetIntConfig(
      "PhantomExpReturnRatio",
    );
    return Math.floor((this.GetFullExp() * t) / 1e3);
  }
  GetFullExp() {
    if (this.GetPhantomLevel() === 0) return this.PhantomExp;
    let e = 0;
    for (let t = 1; t <= this.GetPhantomLevel(); t++)
      e +=
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomLevelExpByGroupIdAndLevel(
          this.CurrentPhantomInstance().PhantomItem.LevelUpGroupId,
          t,
        );
    return e + this.PhantomExp;
  }
  GetExp() {
    return this.PhantomExp;
  }
  UpdateData(t) {
    (this.b5i = t.Q5n ?? 0),
      (this.FuncValue = t.gDs ?? 0),
      (this.PhantomLevel = t.fDs ?? 0),
      (this.PhantomExp = t.vDs ?? 0),
      (this.PhantomMainProp = t.pDs ?? []),
      (this.PhantomSubProp = t.MDs ?? []),
      (this.FetterGroupId = t.SDs ?? 0),
      (this.q5i = t.u8n ?? 0);
  }
  SetMainProp(t) {
    this.PhantomMainProp = t;
  }
  SetSubProp(t) {
    this.PhantomMainProp = t;
  }
  GetIncrId() {
    return this.b5i;
  }
  OnFunctionValueChange(t) {
    this.FuncValue = t;
  }
  GetSuspendAttributeData() {
    const t = this.SuspendSlot.EDs;
    const i = new Array();
    return (
      t.forEach((t) => {
        const e =
          ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSubPropertyById(
            t.IDs,
          );
        const r =
          ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
            t.IDs,
          );
        const n = e.AddType === CommonComponentDefine_1.RATIO;
        var t = AttributeModel_1.TipsDataTool.GetPropRatioValue(t.gkn, n);
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
    let r, n, i, a;
    if (this.GetSlotIndexDataEx(t))
      return (
        (t = this.GetSlotIndexDataEx(t)),
        (r = new Array()),
        (n =
          ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSubPropertyById(
            t.IDs,
          )),
        (i =
          ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
            t.IDs,
          )),
        (a = n.AddType === CommonComponentDefine_1.RATIO),
        (t = AttributeModel_1.TipsDataTool.GetPropRatioValue(t.gkn, a)),
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
  GetIfActivePersonalSkill() {
    return (2 & this.FuncValue) > 0;
  }
  GetEquipRoleId() {
    return (
      ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomEquipOnRoleId(
        this.GetIncrId(),
      ) ?? 0
    );
  }
  GetEquipRoleIndex() {
    let t = this.GetEquipRoleId();
    if (t > 0) {
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
  G5i(t, e) {
    let r;
    let n;
    let i =
      ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(
        e,
      ).GetIncrIdList();
    return t === -1 ||
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
        r === 0
          ? (this.GetEquipRoleId() === e && (i[this.GetEquipRoleIndex()] = 0),
            (i[t] = n))
          : r !== n &&
            (this.GetEquipRoleId() === e &&
              (i[this.GetEquipRoleIndex()] = i[t]),
            (i[t] = n)),
        i);
  }
  static CalculateFetterByPhantomBattleData(e) {
    const r = e.length;
    const n = new Map();
    const i = new Map();
    for (let t = 0; t < r; t++) {
      const a = e[t];
      if (a) {
        var o;
        const s = a.GetFetterGroupId();
        let t = i.get(s);
        (t = t || new Array()).includes(a.GetMonsterId()) ||
          ((o = n.get(s) ?? 0), n.set(s, o + 1), t.push(a.GetMonsterId())),
          i.set(s, t);
      }
    }
    return n;
  }
  IfEquipSameNameMonsterOnRole(t, e, r) {
    t = this.G5i(t, e);
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
    const r =
      ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupFetterDataById(
        this.FetterGroupId,
      );
    const n = this.G5i(t, e);
    const o =
      ModelManager_1.ModelManager.PhantomBattleModel.GetRoleFetterData(e);
    const i = n.length;
    const s = new Array();
    for (let t = 0; t < i; t++) {
      const h =
        ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
          n[t],
        );
      h && s.push(h);
    }
    const l = PhantomDataBase.CalculateFetterByPhantomBattleData(s);
    const u = o.length;
    return (
      r.forEach((e, t) => {
        const r = new VisionFetterData();
        const n =
          ((r.FetterGroupId = this.FetterGroupId),
          (r.FetterId = e),
          (r.NeedActiveNum = t),
          (r.ActiveFetterGroupNum = l.get(this.FetterGroupId) ?? 0),
          (r.ActiveState = l.get(this.FetterGroupId) >= t),
          l.get(this.FetterGroupId) >= t);
        let i = !1;
        for (let t = 0; t < u; t++)
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
      t !== -1 &&
        (this.GetAddFetterList(t, e).forEach((t) => {
          const e =
            new VisionAttributeItemTwo_1.VisionAttributeVariantTwoData();
          (e.FetterId = t), (e.State = 2), r.push(e);
        }),
        this.GetDelFetterList(t, e).forEach((t) => {
          const e =
            new VisionAttributeItemTwo_1.VisionAttributeVariantTwoData();
          (e.FetterId = t), (e.State = 1), r.push(e);
        })),
      this.GetCanActiveFetterList().forEach((t) => {
        let e;
        this.N5i(r, t) ||
          (((e =
            new VisionAttributeItemTwo_1.VisionAttributeVariantTwoData()).FetterId =
            t),
          (e.State = 0),
          r.push(e));
      }),
      r
    );
  }
  N5i(e, r) {
    for (let t = e.length - 1; t >= 0; t--) if (e[t].FetterId === r) return !0;
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
  GetIfLock() {
    return (1 & this.FuncValue) > 0;
  }
  GetCost() {
    const t = this.GetConfig().Rarity;
    return ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomRareConfig(
      t,
    ).Cost;
  }
  GetRareConfig() {
    const t = this.GetConfig().Rarity;
    return ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomRareConfig(
      t,
    );
  }
  GetNewSubPropSuccessData(e) {
    var e = e.length;
    const r = this.PhantomSubProp.length;
    const n = this.GetSubPropShowAttributeList(1);
    const i = new Array();
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
    const e = this.PhantomSubProp;
    if (e.length > t) return e[t];
  }
  GetMaxSubPropCount() {
    const t = this.GetQuality();
    return ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSlotUnlockLevel(
      t,
    ).length;
  }
  GetSubPropIdentifyPreviewData(t, e) {
    const r = this.GetLevelSubPropData(t);
    let n = 0;
    const i = r.length;
    for (let t = 0; t < i; t++)
      r[t].SlotState === 1 && e - n > 0 && ((r[t].SlotState = 5), n++);
    return r;
  }
  GetLevelSubPropPreviewData(t, e) {
    const r = this.GetLevelSubPropData(t);
    const n = this.GetLevelSubPropData(e);
    const i = n.length;
    for (let t = 0; t < i; t++)
      n[t].SlotState !== 0 && r[t].SlotState === 0 && (n[t].SlotState = 2);
    return n;
  }
  GetEquipmentViewPreviewData() {
    const e = this.GetLevelSubPropData(this.GetPhantomLevel());
    const r = e.length;
    const n = new Array();
    let i = 0;
    for (let t = 0; t < r; t++)
      e[t].SlotState === 3 && n.push(e[t]),
        e[t].SlotState === 1 && i === 0 && (n.push(e[t]), (i += 1));
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
    const t = this.GetQuality();
    return ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomIdentifyCost(
      t,
    );
  }
  GetCurrentSubPropLockCount() {
    const t = this.GetLevelSubPropData(this.GetPhantomLevel());
    let e = 0;
    return (
      t.forEach((t) => {
        t.SlotState === 0 && e++;
      }),
      e
    );
  }
  GetIfHaveEnoughIdentifyGold(t) {
    var t = this.GetIdentifyCostItemValue() * t;
    const e =
      ModelManager_1.ModelManager.InventoryModel.GetItemDataBaseByConfigId(
        this.GetIdentifyCostItemId(),
      );
    let r = 0;
    return (r = e.length > 0 ? e[0].GetCount() : r) - t >= 0;
  }
  GetIfHaveEnoughIdentifyConsumeItem(t) {
    var t = this.GetCurrentIdentifyCostValue() * t;
    const e =
      ModelManager_1.ModelManager.InventoryModel.GetItemDataBaseByConfigId(
        this.GetCurrentIdentifyCostId(),
      );
    let r = 0;
    return (r = e.length > 0 ? e[0].GetCount() : r) - t >= 0;
  }
  GetNextIdentifyLevel() {
    let t = 0;
    for (const e of this.GetLevelSubPropData(this.GetPhantomLevel()))
      if (e.SlotState === 0) {
        t = e.GetUnlockLevel();
        break;
      }
    return t;
  }
  GetCurrentIdentifyCostId() {
    const t = this.GetCurrentIdentifyCost();
    let r = 0;
    return (
      t.forEach((t, e) => {
        r = e;
      }),
      r
    );
  }
  GetCurrentIdentifyCostValue() {
    const t = this.GetCurrentIdentifyCost();
    let r = 0;
    return (
      t.forEach((t, e) => {
        r = t;
      }),
      r
    );
  }
  GetCurrentCanIdentifyCount() {
    const t = this.GetLevelSubPropData(this.GetPhantomLevel());
    let e = 0;
    let n =
      (t.forEach((t) => {
        t.SlotState === 1 && e++;
      }),
      e);
    return (
      this.GetCurrentIdentifyCost().forEach((t, e) => {
        e =
          ModelManager_1.ModelManager.InventoryModel.GetItemDataBaseByConfigId(
            e,
          );
        let r = 0;
        (r = e.length > 0 ? Math.floor(e[0].GetCount() / t) : r) < n && (n = r);
      }),
      n
    );
  }
  GetLevelUnlockSubPropSlotCount(e) {
    const r = this.GetMaxSubPropCount();
    let n = 0;
    for (let t = 0; t < r; t++) e >= this.GetSubPropUnlockLevel(t) && n++;
    return n;
  }
  GetLevelSubPropData(e) {
    const r = this.GetMaxSubPropCount();
    const n = new Array();
    for (let t = 0; t < r; t++) {
      var i;
      const a = new VisionSubPropData(t, this);
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
      if (e.SlotState === 0) {
        t = !0;
        break;
      }
    return t;
  }
  GetIfHaveUnIdentifySubProp() {
    let t = !1;
    for (const e of this.GetLevelSubPropData(this.GetPhantomLevel()))
      if (e.SlotState === 1) {
        t = !0;
        break;
      }
    return t;
  }
  GetSubPropUnlockLevel(t) {
    var e = this.GetQuality();
    var e =
      ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSlotUnlockLevel(
        e,
      );
    return e.length >= t ? e[t] : 9999;
  }
  GetMaxSlotCount() {
    const e = this.GetLevelLimit();
    const t = CommonParamById_1.configCommonParamById.GetIntArrayConfig(
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
    const e = CommonParamById_1.configCommonParamById.GetIntArrayConfig(
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
    var t = this.GetCurrentIdentifyCostValue();
    const e = this.GetCurrentIdentifyCostId();
    const r = this.GetCurrentIdentifyNum();
    const n = new Map();
    var t = Math.floor(t * r * this.GetIdentifyBackRadio());
    return t > 0 && n.set(e, t), n;
  }
  GetLevelSlotData(e) {
    const r = this.GetMaxSlotCount();
    const n = new Array();
    if (!(r >= 1 && e < this.GetSlotUnlockLevel(0)))
      for (let t = 0; t < r; t++) {
        const i = new VisionSlotData();
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
    let r;
    const n = this.GetCurrentSlotData();
    const i = this.GetLevelSlotData(e);
    const a = i.length;
    for (let t = 0; t < a; t++)
      n.length === 0
        ? ((r = this.GetSlotUnlockLevel(t)), (i[t].SlotState = r <= e ? 2 : 0))
        : n.length > t &&
          n[t].SlotState !== i[t].SlotState &&
          (i[t].SlotState = 2);
    return i;
  }
  GetCurrentSkillId() {
    return this.GetPhantomInstance().PhantomItem.SkillId;
  }
  GetSkillDescExParam(t) {
    return ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSkillDescExBySkillIdAndQuality(
      t,
      this.GetQuality(),
    );
  }
  GetNormalSkillDesc() {
    var t = this.GetPhantomInstance();
    var t =
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
    const t = this.GetPhantomInstance();
    return ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSkillBySkillId(
      t.PhantomItem.SkillId,
    );
  }
  GetNormalSkillId() {
    return this.GetPhantomInstance().PhantomItem.SkillId;
  }
  GetPersonalSkillId() {
    return 0;
  }
  GetPhantomInstance() {
    const t = this.SkinId;
    return t
      ? ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomInstanceByItemId(
          t,
        )
      : ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomInstanceByItemId(
          this.GetConfigId(),
        );
  }
  GetLevelUpPreviewData(t) {
    const a = new Array();
    t = this.GetMainPropValueMapInTargetLevel(t);
    const o = new Map();
    return (
      this.PhantomMainProp.forEach((t) => {
        o.set(t.IDs, t.gkn);
      }),
      t.forEach((t, e) => {
        var r = o.has(e) ? o.get(e) : 0;
        var e =
          ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomMainPropertyItemId(
            e,
          );
        const n =
          ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
            e.PropId,
          );
        const i = e.AddType === CommonComponentDefine_1.RATIO;
        var r = AttributeModel_1.TipsDataTool.GetPropRatioValue(r, i);
        var t = AttributeModel_1.TipsDataTool.GetPropRatioValue(t, i);
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
    const e = new Map();
    for (const i of this.GetPhantomMainProp()) {
      var r =
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomMainPropertyItemId(
          i.IDs,
        );
      const n =
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomGrowthValueByGrowthIdAndLevel(
          r.GrowthId,
          t,
        );
      var r = AttributeModel_1.TipsDataTool.GetAttributeValue(
        r.StandardProperty,
        n,
        !1,
      );
      e.set(i.IDs, Math.floor(r));
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
    this.q5i = t;
  }
  get SkinId() {
    return this.q5i;
  }
  GetConfigId(t = !1) {
    const e = this.SkinId;
    return t && e ? e : this.ItemId;
  }
  GetConfig() {
    return ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemById(
      this.ItemId,
    );
  }
  GetSkinConfig() {
    const t = this.SkinId;
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
    const r = new Array();
    const n = new Map();
    this.PhantomMainProp.forEach((t) => {
      n.set(t.IDs, t.gkn);
    });
    const i = Array.from(n.keys());
    const a = i.length;
    for (let t = 0; t < a; t++) {
      const o =
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomMainPropertyItemId(
          i[t],
        );
      const s =
        ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
          o.PropId,
        );
      const h = AttributeModel_1.TipsDataTool.GetPropRatioValue(
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
        const e =
          ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
            t.IDs,
          );
        const r =
          ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSubPropertyById(
            t.IDs,
          );
        const n = r.AddType === CommonComponentDefine_1.RATIO;
        var t = AttributeModel_1.TipsDataTool.GetPropRatioValue(t.gkn, n);
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
    const r = new Array();
    const n = new Map();
    const i =
      (this.PhantomMainProp.forEach((t) => {
        n.set(t.IDs, t.gkn);
      }),
      new Map());
    this.PhantomSubProp.forEach((t) => {
      i.set(t.IDs, t.gkn), n.has(t.IDs) || n.set(t.IDs, 0);
    });
    const a = Array.from(n.keys());
    const o = a.length;
    for (let t = 0; t < o; t++) {
      const s =
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
// # sourceMappingURL=PhantomDataBase.js.map
