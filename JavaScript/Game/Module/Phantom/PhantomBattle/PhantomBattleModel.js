"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionUnlockQualityData =
    exports.RecommendData =
    exports.PhantomSortStruct =
    exports.PhantomBattleModel =
    exports.LevelUpPastVisionData =
      void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  PhantomFetterGroupById_1 = require("../../../../Core/Define/ConfigQuery/PhantomFetterGroupById"),
  ModelBase_1 = require("../../../../Core/Framework/ModelBase"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  LocalStorage_1 = require("../../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  AttributeDefine_1 = require("../../Attribute/AttributeDefine"),
  RoleLevelUpSuccessController_1 = require("../../RoleUi/RoleLevel/RoleLevelUpSuccessController"),
  AttrListScrollData_1 = require("../../RoleUi/View/ViewData/AttrListScrollData"),
  PhantomDataBase_1 = require("./Data/PhantomDataBase"),
  PhantomRoleEquipmentData_1 = require("./Data/PhantomRoleEquipmentData"),
  PhantomBattleData_1 = require("./PhantomBattleData"),
  PhantomBattleInstance_1 = require("./PhantomBattleInstance");
class LevelUpPastVisionData {
  constructor() {
    (this.Level = 0),
      (this.UniqueId = 0),
      (this.AttrListScrollData = void 0),
      (this.SlotData = void 0);
  }
}
exports.LevelUpPastVisionData = LevelUpPastVisionData;
class PhantomBattleModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.o6i = new Map()),
      (this.r6i = new Map()),
      (this.n6i = new Map()),
      (this.s6i = new Map()),
      (this.a6i = new Map()),
      (this.h6i = new Array()),
      (this.l6i = !1),
      (this._6i = void 0),
      (this.CurrentSelectData = void 0),
      (this.CurrentEquipmentSelectIndex = 0),
      (this.CurrentSelectUniqueId = 0),
      (this.u6i = void 0),
      (this.c6i = new UE.Vector()),
      (this.m6i = new UE.Vector()),
      (this.d6i = new UE.Rotator()),
      (this.C6i = new Map()),
      (this.g6i = []),
      (this.f6i = void 0),
      (this.p6i = !1),
      (this.v6i = 999),
      (this.M6i = 0),
      (this.E6i = []),
      (this.S6i = new Map()),
      (this.y6i = new Map()),
      (this.I6i = void 0),
      (this.T6i = void 0),
      (this.L6i = void 0),
      (this.D6i = void 0),
      (this.R6i = () => {
        ControllerHolder_1.ControllerHolder.PhantomBattleController.TryShowReceiveItem();
      }),
      (this.SortAttrList = (t, e) => {
        var r = 0 !== t.Priority,
          a = 0 !== e.Priority;
        return r && a ? t.Priority - e.Priority : r ? -1 : a ? 1 : t.Id - e.Id;
      }),
      (this.U6i = void 0),
      (this.CurrentSelectFetterGroupId = 0),
      (this.A6i = void 0),
      (this.P6i = new Array(4, 3, 3, 1, 1)),
      (this.x6i = new Array()),
      (this.w6i = new Array()),
      (this.B6i = 0),
      (this.b6i = void 0),
      (this.q6i = void 0),
      (this.G6i = (t, e) => {
        if (t.GetPhantomLevel() !== e.GetPhantomLevel())
          return e.GetPhantomLevel() - t.GetPhantomLevel();
        if (t.GetQuality() !== e.GetQuality())
          return e.GetQuality() - t.GetQuality();
        var r = this.x6i.includes(t.GetMonsterId()),
          a = this.x6i.includes(e.GetMonsterId());
        if (r && !a) return -1;
        if (a && !r) return 1;
        (a = this.x6i.indexOf(t.GetMonsterId())),
          (r = this.x6i.indexOf(e.GetMonsterId())),
          (a = 0 <= a ? this.w6i[a] : 0),
          (r = 0 <= r ? this.w6i[r] : 0);
        if (a !== r) return r - a;
        (r = t.GetFetterGroupId() === this.B6i),
          (a = e.GetFetterGroupId() === this.B6i);
        if (r && a) {
          var i = this.b6i.includes(t.GetMonsterId()),
            n = this.b6i.includes(e.GetMonsterId());
          if (i && !n) return -1;
          if (n && !i) return 1;
        } else {
          if (r) return -1;
          if (a) return 1;
        }
        return t.GetCost() !== e.GetCost()
          ? e.GetCost() - t.GetCost()
          : ((n = this.q6i.includes(t.GetUniqueId())),
            (i = this.q6i.includes(e.GetUniqueId())),
            n && !i ? -1 : i && !n ? 1 : e.GetConfigId() - t.GetConfigId());
      }),
      (this.N6i = (t, e) => {
        var r, a;
        return t.GetType() !== e.GetType()
          ? t.GetType() - e.GetType()
          : t.GetQuality() !== e.GetQuality()
            ? t.GetQuality() - e.GetQuality()
            : ((r = this.GetPhantomBattleData(t.GetUniqueId())),
              (a = this.GetPhantomBattleData(t.GetUniqueId())),
              r && a && r.GetPhantomLevel() !== a.GetPhantomLevel()
                ? r.GetPhantomLevel() - a.GetPhantomLevel()
                : e.GetUniqueId() - t.GetUniqueId());
      }),
      (this.O6i = new Array());
  }
  SetCurrentDragIndex(t) {
    this.v6i = t;
  }
  ClearCurrentDragIndex() {
    this.v6i = 999;
  }
  CheckIfCurrentDragIndex(t) {
    return this.v6i === t;
  }
  CheckIfCanDrag() {
    return 999 === this.v6i;
  }
  OnInit() {
    for (const a of ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemList()) {
      var e,
        r = 0 !== a.ParentMonsterId ? a.ParentMonsterId : a.MonsterId;
      let t = this.S6i.get(r);
      t
        ? 0 !== a.ParentMonsterId
          ? t.push(a.ItemId)
          : 2 === a.QualityId &&
            ((e = []).push(a.ItemId), (t = e.concat(t)), this.S6i.set(r, t))
        : ((t = []).push(a.ItemId), this.S6i.set(r, t)),
        0 !== a.ParentMonsterId && this.y6i.set(a.MonsterId, a.ParentMonsterId);
    }
    return !0;
  }
  async GetDragCurve() {
    return (
      this.u6i ||
        ((this.u6i = new CustomPromise_1.CustomPromise()),
        ResourceSystem_1.ResourceSystem.LoadAsync(
          ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionDragCurve(),
          UE.CurveFloat,
          (t) => {
            this.u6i.SetResult(t);
          },
        )),
      await this.u6i.Promise,
      this.u6i.Promise
    );
  }
  SetDefaultSkin(t, e) {
    for (var [, r] of this.a6i)
      t === r.GetConfig()?.MonsterId && r.SetSkinId(e);
  }
  SetUnlockSkinList(t) {
    this.E6i = t;
  }
  ConcatUnlockSkinList(t) {
    this.E6i = this.E6i.concat(t);
  }
  GetSkinIsUnlock(t) {
    return this.E6i.includes(t);
  }
  GetMonsterSkinListByMonsterId(t) {
    return this.S6i.get(t);
  }
  GetMonsterSkinListHasNew(t) {
    t =
      ConfigManager_1.ConfigManager.PhantomBattleConfig?.GetPhantomItemById(t);
    if (t) {
      t = 0 !== t.ParentMonsterId ? t.ParentMonsterId : t.MonsterId;
      for (const e of this.S6i.get(t))
        if (
          ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
            LocalStorageDefine_1.ELocalStoragePlayerKey.VisionSkin,
            e,
          )
        )
          return !0;
    }
    return !1;
  }
  GetMonsterSkinMonsterIdMapByMonsterId(t) {
    return this.y6i.get(t);
  }
  SetMaxCost(t) {
    this.M6i = t;
  }
  GetMaxCost() {
    return this.M6i;
  }
  SetRobotPhantomData(t, e) {
    this.o6i.set(t, e);
  }
  NewPhantomBattleData(t) {
    var e = new PhantomBattleData_1.PhantomBattleData();
    return e.SetData(t), this.a6i.set(t.b9n, e), (this.l6i = !0), e;
  }
  RemovePhantomBattleData(t) {
    this.a6i.delete(t), (this.l6i = !0);
  }
  GetPhantomDataBase(t) {
    return this.GetPhantomBattleData(t);
  }
  GetPhantomBattleData(t) {
    return (t < 0 ? this.o6i : this.a6i).get(t);
  }
  GetPhantomInstanceByItemId(t) {
    let e = this.s6i.get(t);
    var r;
    return (
      e ||
        ((r =
          ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemById(
            t,
          )),
        (e = new PhantomBattleInstance_1.PhantomBattleInstance(r)),
        this.s6i.set(t, e)),
      e
    );
  }
  CreatePhantomLevelCacheData(t) {
    var e = new LevelUpPastVisionData();
    return (
      (e.Level = this.GetPhantomBattleData(t).GetPhantomLevel()),
      (e.AttrListScrollData =
        this.GetPhantomBattleData(t).GetMainPropShowAttributeList(1)),
      (e.SlotData = this.GetPhantomBattleData(t).GetCurrentSlotData()),
      (e.UniqueId = t),
      e
    );
  }
  CachePhantomLevelUpData(t) {
    this.f6i = t;
  }
  GetCachePhantomLevelUpData() {
    return this.f6i;
  }
  GetLevelUpSuccessData(t) {
    var e =
        ModelManager_1.ModelManager.PhantomBattleModel.GetCachePhantomLevelUpData(),
      r =
        ModelManager_1.ModelManager.PhantomBattleModel.CheckPhantomIfLevelMax(
          t,
        ),
      t =
        ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
          t,
        ),
      a = this.k6i(e, t);
    const i = new Array();
    a.forEach((t) => {
      i.push(
        RoleLevelUpSuccessController_1.RoleLevelUpSuccessController.ConvertsAttrListScrollDataToAttributeInfo(
          t,
        ),
      );
    });
    var a = t.GetLevelUnlockSubPropSlotCount(e.Level),
      n = t.GetLevelUnlockSubPropSlotCount(t.GetPhantomLevel());
    if (a !== n)
      for (let t = a; t < n; t++) {
        var o = { Name: "UnlockSlot", ShowArrow: !1, PreText: "" };
        (o.CurText = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "Text_PhantomUnlock_Text",
        )),
          (o.IconPath =
            ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionLevelUpTexture()),
          i.push(o);
      }
    return {
      LevelInfo: {
        PreUpgradeLv: e.Level,
        UpgradeLv: t.GetPhantomLevel(),
        FormatStringId: "VisionLevel",
        IsMaxLevel: r,
      },
      WiderScrollView: !1,
      AttributeInfo: i,
      ClickFunction: this.R6i,
    };
  }
  k6i(t, e) {
    var a = t.AttrListScrollData,
      i = e.GetMainPropShowAttributeList(1),
      n = i.length,
      o = a.length,
      s = new Array();
    for (let r = 0; r < n; r++) {
      var h = i[r];
      let e = void 0;
      for (let t = 0; t < o; t++)
        if (a[t].Id === h.Id && r === t) {
          e = a[t];
          break;
        }
      var l =
        ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
          h.Id,
        );
      s.push(
        new AttrListScrollData_1.AttrListScrollData(
          h.Id,
          e.BaseValue,
          h.BaseValue,
          l.Priority,
          e.IsRatio,
          2,
        ),
      );
    }
    return s;
  }
  PhantomLevelUpReceiveItem(t) {
    var e = [];
    for (const a of Object.keys(t)) {
      var r = [{ IncId: 0, ItemId: Number.parseInt(a) }, t[a]];
      e.push(r);
    }
    (this.g6i = e),
      (this.p6i = !0),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.PhantomLevelUpReceiveItem,
        e,
      );
  }
  GetVisionLevelUpTag() {
    return this.p6i;
  }
  ClearVisionLevelUp() {
    this.p6i = !1;
  }
  GetTempSaveItemList() {
    return this.g6i;
  }
  ClearTempSaveItemList() {
    this.g6i = [];
  }
  GetVisionSortUseDataList(t = 0, e = 0) {
    var r = new Array(),
      a = ModelManager_1.ModelManager.InventoryModel;
    for (const s of ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleDataMap().values()) {
      var i,
        n,
        o = s.GetUniqueId();
      (0 < t && s.GetFetterGroupId() !== t) ||
        (0 < e && s.GetCost() !== e) ||
        ((i = a.GetPhantomItemData(o)),
        (n = s.GetConfig()),
        (o = {
          IsPhantomData: !0,
          Id: s.GetUniqueId(),
          Quality: n.QualityId,
          IsEquip:
            ControllerHolder_1.ControllerHolder.PhantomBattleController.CheckIsEquip(
              o,
            ),
          Role: ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipRole(
            o,
          ),
          Level: s.GetPhantomLevel(),
          IsBreach: s.IsBreach(),
          MonsterId: n.MonsterId,
          MainPropMap: s.GetMainPropArray(),
          SubPropMap: s.GetSubPropArray(),
          IsLock: i.GetIsLock(),
          IsDeprecate: i.GetIsDeprecated(),
          ConfigId: i.GetConfigId(),
          Rarity: n.Rarity,
        }),
        r.push(o));
    }
    return r;
  }
  GetPhantomBattleDataMap() {
    return this.a6i;
  }
  GetUnEquipVisionArray() {
    return (
      this.l6i &&
        ((this.h6i = []),
        (this.l6i = !1),
        this.GetPhantomBattleDataMap().forEach((t, e) => {
          this.CheckPhantomIsEquip(e) || this.h6i.push(t);
        })),
      this.h6i
    );
  }
  UpdateRoleEquipmentData(r) {
    var t = this.GetBattleDataById(r.Q6n);
    t.GetIncrIdList().forEach((t) => {
      this.n6i.delete(t);
    }),
      r.eHn.forEach((t) => {
        var e = this.GetPhantomEquipOnRoleId(t);
        0 < e && this.GetBattleDataById(e).RemoveIncrIdLocal(t),
          this.n6i.set(t, r.Q6n);
      }),
      (this.l6i = !0),
      t.Phrase(r);
  }
  UpdateRoleEquipmentPropData(t) {
    this.GetBattleDataById(t.Q6n).Phrase(t);
  }
  DeleteBattleData(t) {
    var e = this.r6i.get(t);
    e &&
      (e.GetIncrIdList().forEach((t) => {
        this.n6i.delete(t);
      }),
      (this.l6i = !0),
      this.r6i.delete(t));
  }
  GetBattleDataById(t) {
    let e = this.r6i.get(t);
    return (
      (e = e || new PhantomRoleEquipmentData_1.PhantomRoleEquipmentData()),
      this.r6i.set(t, e),
      e
    );
  }
  CheckPhantomIsEquip(t) {
    return t < 0 || (0 !== t && this.n6i.has(t));
  }
  CheckPhantomIsMain(t) {
    var e;
    return t < 0
      ? this.GetPhantomDataBase(t).GetIfMain()
      : !!this.CheckPhantomIsEquip(t) &&
          ((e = this.n6i.get(t)),
          this.GetBattleDataById(e).CheckPhantomIsMain(t));
  }
  CheckPhantomIsSub(t) {
    var e;
    return (
      !!this.CheckPhantomIsEquip(t) &&
      ((e = this.n6i.get(t)), this.GetBattleDataById(e).CheckPhantomIsSub(t))
    );
  }
  GetPhantomEquipOnRoleId(t) {
    if (this.CheckPhantomIsEquip(t)) return this.n6i.get(t);
  }
  CheckPhantomIndexIsEquipOnRole(t, e) {
    return -1 !== this.GetBattleDataById(t).GetIndexPhantomId(e);
  }
  GetPhantomSumLevelByRoleId(t) {
    return this.GetBattleDataById(t).GetSumEquipLevel();
  }
  GetPhantomIsUnlock(t) {
    for (const e of ModelManager_1.ModelManager.CalabashModel.GetUnlockCalabashDevelopRewards().keys())
      if (t === e) return !0;
    return !1;
  }
  GetIfHasMonsterInInventory(t) {
    t = this.GetPhantomItemIdArrayByMonsterId(t);
    if (!t || 0 === t.length) return !1;
    let e = !1;
    for (const r of t)
      if (
        0 < ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(r)
      ) {
        e = !0;
        break;
      }
    return e;
  }
  CheckPhantomIfLevelMax(t) {
    t =
      ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
        t,
      );
    return (
      t.GetPhantomLevel() ===
      ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomQualityByItemQuality(
        t.GetQuality(),
      ).LevelLimit
    );
  }
  CheckMonsterIsEquipOnRole(t, e) {
    return this.GetBattleDataById(t).CheckMonsterIsEquip(e);
  }
  GetVisionIndexOnRole(t, e) {
    return this.GetBattleDataById(e).GetIndexPhantomId(t);
  }
  GetRoleIfEquipVision(t) {
    var e =
        ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(
          t,
        ).GetIncrIdList(),
      r = e.length;
    for (let t = 0; t < r; t++) if (0 !== e[t]) return !0;
    return !1;
  }
  GetRoleIndexPhantomId(t, e) {
    return this.GetBattleDataById(t).GetIndexPhantomId(e);
  }
  GetPhantomIndexOfRole(t, e) {
    var r =
        ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(
          t,
        ).GetIncrIdList(),
      a = r.length;
    for (let t = 0; t < a; t++) if (r[t] === e) return t;
    return -1;
  }
  GetRolePhantomEquipState(t, e, r) {
    return this.CheckPhantomIsEquip(r)
      ? this.GetBattleDataById(t).GetPhantomOperationState(e, r)
      : 1;
  }
  GetPhantomMaxLevel(t) {
    t = this.GetPhantomBattleData(t);
    return ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomQualityByItemQuality(
      t.GetQuality(),
    ).LevelLimit;
  }
  GetFetterListByRoleId(t) {
    t = this.GetTargetRoleFetterList(t);
    if (0 === t.length) return [];
    var e = new Array();
    for (const r of t)
      e.push(
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomFetterById(
          r,
        ),
      );
    return e;
  }
  UpdateFetterList(t) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Phantom", 28, "刷新当前羁绊列表", ["roleId", t]);
    const e =
      ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t).GetPhantomData();
    var t = e.GetDataMap(),
      r = [];
    for (const e of t.values()) e && r.push(e.GetIncrId());
    e.ClearPhantomFettersList(), this.F6i(r, e.GetPhantomFettersList());
  }
  F6i(t, e) {
    const r = new Map();
    t.forEach((t) => {
      var e,
        t = this.GetPhantomDataBase(t);
      t &&
        ((e = (r.get(t.GetFetterGroupId()) ?? 0) + 1),
        r.set(t.GetFetterGroupId(), e));
    }),
      ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterResultBySuitMap(
        r,
      ).forEach((t) => {
        e.push(t);
      });
  }
  GetPreviewFetterAdd(t, e, r) {
    var a = this.GetBattleDataById(r).GetIncrIdList(),
      i = new Array(),
      n = a.length;
    for (let t = 0; t < n; t++)
      this.GetPhantomBattleData(a[t]) && t !== e && i.push(a[t]);
    var o = new Array(),
      s = this.GetTargetRoleFetterList(r),
      h = new Array();
    i.push(t.GetIncrId()), this.F6i(i, o);
    for (const l of o) s.includes(l) || h.push(l);
    return h;
  }
  GetPreviewFettersDel(t, e, r) {
    var a = this.GetBattleDataById(r).GetIncrIdList(),
      i = new Array(),
      n = a.length;
    for (let t = 0; t < n; t++)
      this.GetPhantomBattleData(a[t]) && t !== e && i.push(a[t]);
    var o = new Array(),
      r = this.GetTargetRoleFetterList(r),
      s = new Array();
    i.push(t.GetIncrId()), this.F6i(i, o);
    for (const h of r) o.includes(h) || s.push(h);
    return s;
  }
  CheckFetterActiveState(t, e) {
    t = this.GetFetterListByRoleId(t);
    if (t && 0 !== t.length) for (const r of t) if (r.Id === e) return !0;
    return !1;
  }
  GetTargetCanActiveFettersList(t) {
    var e = new Map(),
      t = this.GetPhantomDataBase(t);
    const i = new Array();
    return (
      t && e.set(t.GetFetterGroupId(), 999),
      e.forEach((r, t) => {
        t =
          PhantomFetterGroupById_1.configPhantomFetterGroupById.GetConfig(
            t,
          ).FetterMap;
        let a;
        t.forEach((t, e) => {
          e <= r && ((a = t), i.push(a));
        });
      }),
      i
    );
  }
  GetRoleFetterData(t) {
    const a = new Array();
    var e =
        ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(
          t,
        ).GetIncrIdList(),
      r = e.length,
      i = new Array();
    for (let t = 0; t < r; t++) {
      var n =
        ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
          e[t],
        );
      n && i.push(n);
    }
    const o =
      PhantomDataBase_1.PhantomDataBase.CalculateFetterByPhantomBattleData(i);
    for (let t = 0; t < r; t++) {
      const s =
        ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
          e[t],
        );
      s &&
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupFetterDataById(
          s.GetFetterGroupId(),
        ).forEach((t, e) => {
          var r = new PhantomDataBase_1.VisionFetterData();
          (r.FetterId = t),
            (r.FetterGroupId = s.GetFetterGroupId()),
            (r.ActiveFetterGroupNum = o.get(s.GetFetterGroupId()) ?? 0),
            (r.ActiveState = o.get(s.GetFetterGroupId()) >= e),
            a.push(r);
        });
    }
    return a;
  }
  GetTargetRoleFetterList(t) {
    return ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t)
      .GetPhantomData()
      .GetPhantomFettersList();
  }
  GetMeshTransform(t) {
    return new UE.Transform(this.V6i(t), this.H6i(t), this.j6i(t));
  }
  j6i(t) {
    t = this.GetPhantomInstanceByItemId(t).GetModelZoom();
    if (t && 0 < t.length)
      return (
        (this.c6i.X = t[0]), (this.c6i.Y = t[1]), (this.c6i.Z = t[2]), this.c6i
      );
  }
  H6i(t) {
    t = this.GetPhantomInstanceByItemId(t).GetModelLocation();
    if (t && 0 < t.length)
      return (
        (this.m6i.X = t[0]), (this.m6i.Y = t[1]), (this.m6i.Z = t[2]), this.m6i
      );
  }
  V6i(t) {
    t = this.GetPhantomInstanceByItemId(t).GetModelRotator();
    if (t && 0 < t.length)
      return (
        (this.d6i.Roll = t[0]),
        (this.d6i.Pitch = t[1]),
        (this.d6i.Yaw = t[2]),
        this.d6i
      );
  }
  GetStandAnim(t) {
    return this.GetPhantomInstanceByItemId(t).GetStandAnim();
  }
  GetPhantomLevelUpItemSortList(t) {
    var e = [],
      r =
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomExpItemList();
    if (r)
      for (const i of r) {
        var a = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(i.ItemId);
        a && e.push(a);
      }
    return e;
  }
  CheckPhantomIfNewQuality(t) {
    var e,
      r,
      a = this.GetPhantomDataBase(t);
    let i = !1;
    for ([e, r] of this.a6i)
      if (
        r.GetMonsterId() === a?.GetMonsterId() &&
        e !== t &&
        r.GetQuality() === a.GetQuality()
      ) {
        i = !0;
        break;
      }
    return !i;
  }
  GetEquipRoleName(t) {
    var t =
      ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomEquipOnRoleId(t);
    return 0 < t
      ? ((t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(t)),
        ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(t.Name))
      : "";
  }
  GetRoleCurrentPhantomCost(t) {
    var e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t);
    let r = 0;
    if (e?.IsTrialRole()) {
      var a = e.GetPhantomData().GetDataMap();
      for (let t = 0; t < 5; ++t) {
        var i = a.get(t);
        i && (r += i.GetCost());
      }
    } else
      this.GetBattleDataById(t)
        .GetIncrIdList()
        .forEach((t) => {
          t = this.GetPhantomBattleData(t);
          t && (r += t.GetCost());
        });
    return r;
  }
  GetLevelUpNeedCost(t) {
    return Math.floor(
      t *
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomLevelUpCostRatio(),
    );
  }
  ResetLevelUpItemData() {
    this.C6i.clear();
  }
  GetPhantomItemIdArrayByMonsterId(t) {
    t =
      ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemByMonsterId(
        t,
      );
    const e = new Array();
    return (
      t.forEach((t) => {
        e.push(t.ItemId);
      }),
      e
    );
  }
  GetMonsterRarity(t) {
    return ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemByMonsterId(
      t,
    )[0].Rarity;
  }
  GetShowAttrList(t) {
    t = this.GetBattleDataById(t).GetPropShowAttributeList();
    return t.sort(this.SortAttrList), t;
  }
  GetExtraAttrList(t) {
    t = this.GetBattleDataById(t).GetPropDetailAttributeList();
    return t.sort(this.SortAttrList), t;
  }
  GetFetterGroupMonsterIdArray(t) {
    return this.GetFetterGroupMonsterMap().get(t);
  }
  GetMonsterFindCountByMonsterIdArray(t) {
    let e = 0;
    for (const r of t)
      ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(1, r) && e++;
    return e;
  }
  GetFetterGroupMonsterMap() {
    return (
      this._6i ||
        ((this._6i = new Map()),
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupArray().forEach(
          (t) => {
            var e =
              ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupSourceMonster(
                t.Id,
              );
            const r = new Array();
            e.forEach((t) => {
              r.includes(t) || r.push(t);
            }),
              this._6i.set(t.Id, r);
          },
        )),
      this._6i
    );
  }
  GetTrialRoleDetailAttrList(t) {
    var e = CommonParamById_1.configCommonParamById.GetIntArrayConfig(
      "VisionMainViewExtraAttribute",
    );
    const r = this.GetTrialRoleAttrList(t),
      a = r.length,
      i = [];
    let n = !1;
    return (
      e.forEach((e) => {
        var t =
          ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
            e,
          );
        n = !1;
        for (let t = 0; t < a; t++)
          if (r[t].Id === e) {
            i.push(r[t]), (n = !0);
            break;
          }
        n ||
          i.push(
            new AttrListScrollData_1.AttrListScrollData(
              e,
              0,
              0,
              t.Priority,
              !1,
              1,
            ),
          );
      }),
      i
    );
  }
  GetTrialRoleAttrList(t) {
    var e,
      r,
      a = new Array(),
      i = ModelManager_1.ModelManager.RoleModel.GetRoleRobotData(t),
      n =
        ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexList(),
      o = new Map();
    const s = [];
    i
      .GetPhantomData()
      .GetDataMap()
      .forEach((t) => {
        for (const e of t.GetMainTrailProp().values()) s.push(e);
        for (const r of t.GetSubTrailPropMap().values()) s.push(r);
      }),
      this.W6i(s, o, t);
    for (const h of n)
      h.IsShow &&
        ((e =
          ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
            h.Id,
          )),
        (r = void 0 !== (r = o.get(h.Id)) ? r : 0),
        a.push(
          new AttrListScrollData_1.AttrListScrollData(
            h.Id,
            0,
            r,
            e.Priority,
            !1,
            1,
          ),
        ));
    return a.sort(this.SortAttrList), a;
  }
  W6i(t, r, e) {
    var a,
      i = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e);
    for (const n of t) {
      let t = 0,
        e = n.AttributeId;
      n.AttributeId > AttributeDefine_1.GREEN_ATTRIBUTE_INTERNAL &&
        (e -= AttributeDefine_1.GREEN_ATTRIBUTE_INTERNAL),
        (t = n.IsRatio
          ? (i.GetBaseAttributeValueById(e) ?? 0) *
            (n.AttributeValue / AttributeDefine_1.TEN_THOUSANDTH_RATIO)
          : n.AttributeValue),
        r.has(e) ? ((a = r.get(e)), r.set(e, a + t)) : r.set(e, t);
    }
  }
  set CurrentSelectedFetter(t) {
    this.U6i = t;
  }
  get CurrentSelectedFetter() {
    return this.U6i;
  }
  GetFettersObtainDataList(t) {
    var e = new Array();
    for (const i of t) {
      var r = this.GetPhantomItemIdArrayByMonsterId(i);
      if (r && 0 !== r.length) {
        let t = 0;
        for (const n of r)
          if (
            0 <
            (t =
              ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
                n,
              ))
          )
            break;
        var r = this.GetPhantomInstanceByItemId(r[0]),
          a =
            ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashDevelopRewardByMonsterId(
              i,
            ),
          a = ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterIcon(
            a.MonsterInfoId,
          ),
          r = {
            Id: i,
            Name: r.PhantomItem.MonsterName,
            Icon: a,
            IsGet: 0 !== t,
          };
        e.push(r);
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Phantom",
            28,
            "该怪物没有对应道具，请检查幻象道具表是否正确",
            ["monsterId", i],
          );
    }
    return e;
  }
  SetPhantomRecommendData(t) {
    (this.A6i = new RecommendData()),
      (this.A6i.RoleId = t.Q6n),
      (this.A6i.MonsterIdList = t.wBs),
      (this.A6i.MainPropId = t.xBs),
      (this.A6i.FetterGroupId = t.Kws);
  }
  get PhantomRecommendData() {
    return this.A6i;
  }
  CheckIfHasPhantomSatisfiedLevelCondition(t, e) {
    let r = [];
    if (
      0 !==
      (r =
        0 !== t
          ? ModelManager_1.ModelManager.InventoryModel.GetPhantomItemDataListByPhantomItemId(
              t,
            )
          : ModelManager_1.ModelManager.InventoryModel.GetPhantomItemDataList())
        .length
    )
      for (const i of r) {
        var a =
          ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
            i.GetUniqueId(),
          );
        if (a && a.GetPhantomLevel() >= e) return !0;
      }
    return !1;
  }
  CheckIfHasPhantomLevelMax() {
    for (const t of this.GetPhantomBattleDataMap().values())
      if (this.GetPhantomMaxLevel(t.GetUniqueId()) === t.GetPhantomLevel())
        return !0;
    return !1;
  }
  CheckIfExistPhantomCanEquipInItemList(t) {
    for (const r of t) {
      var e =
        ModelManager_1.ModelManager.InventoryModel.GetPhantomItemDataListByPhantomItemId(
          r,
        );
      if (0 === e.length) return !1;
      for (const a of e)
        if (!this.CheckPhantomIsEquip(a.GetUniqueId())) return !0;
    }
    return !1;
  }
  GetRecommendEquipUniqueIdList(t) {
    var r = [0, 0, 0, 0, 0];
    if (!this.A6i || this.A6i.RoleId === t) {
      var e = this.A6i ? this.A6i.MonsterIdList : [],
        a = this.A6i ? this.A6i.FetterGroupId : 0,
        i =
          (this.K6i(e, a, t),
          ModelManager_1.ModelManager.PhantomBattleModel.GetAllNotEquipPhantomList(
            t,
          ));
      if (i) {
        var n = i?.length,
          o = ModelManager_1.ModelManager.PhantomBattleModel.GetMaxCost(),
          s = r.length;
        for (let e = 0; e < s; e++) {
          var h = this.P6i[e];
          for (let t = 0; t < n; t++) {
            var l = i[t].GetUniqueId();
            if (!r.includes(l)) {
              var u = i[t].GetCost();
              if (!(h < u))
                if (
                  ModelManager_1.ModelManager.PhantomBattleModel.Q6i(r) + u <=
                  o
                ) {
                  r[e] = l;
                  break;
                }
            }
          }
        }
      }
    }
    return r;
  }
  GetAllNotEquipPhantomList(t) {
    var e,
      r = ModelManager_1.ModelManager.InventoryModel.GetPhantomItemDataList();
    if (0 !== r.length) {
      const a = new Array();
      for (const i of r)
        this.CheckPhantomIsEquip(i.GetUniqueId()) ||
          ((e = this.GetPhantomBattleData(i.GetUniqueId())), a.push(e));
      return (
        ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(t)
          .GetIncrIdList()
          .forEach((t) => {
            t = this.GetPhantomBattleData(t);
            t && a.push(t);
          }),
        a.sort(this.G6i)
      );
    }
  }
  K6i(t, e, r) {
    (this.x6i = t), (this.w6i = []);
    var a = this.x6i.length;
    for (let t = a - 1; 0 <= t; t--)
      t !== a - 1 ? this.x6i.push(t) : this.x6i.push(1);
    (this.B6i = e),
      (this.q6i = this.GetBattleDataById(r).GetIncrIdList()),
      (this.b6i = []),
      this.q6i.forEach((t) => {
        this.b6i.push(
          void 0 !== this.GetPhantomDataBase(t)
            ? this.GetPhantomDataBase(t).GetMonsterId()
            : 0,
        );
      });
  }
  GetPhantomItemNumByItemId(t) {
    var e = ModelManager_1.ModelManager.InventoryModel.GetPhantomItemDataList();
    if (0 === e.length) return 0;
    let r = 0;
    for (const a of e) a.GetConfigId() === t && r++;
    return r;
  }
  Q6i(t) {
    let e = 0;
    return (
      t.forEach((t) => {
        t = this.GetPhantomDataBase(t);
        t && (e += t.GetCost());
      }),
      e
    );
  }
  static FilterShowAttribute(t) {
    const e = new Array(),
      r = CommonParamById_1.configCommonParamById.GetIntArrayConfig(
        "VisionMainViewShowAttribute",
      );
    return (
      t.forEach((t) => {
        r.includes(t.Id) && e.push(t);
      }),
      e
    );
  }
  GetCurrentViewShowPhantomList(t) {
    var e = t.IsTrialRole(),
      r = new Array();
    if (e) {
      var a = t.GetPhantomData().GetDataMap();
      for (let t = 0; t < 5; ++t) {
        var i = a.get(t);
        r.push(i);
      }
    } else {
      var n = ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(
          t.GetRoleId(),
        ).GetIncrIdList(),
        o = n.length;
      for (let t = 0; t < o; t++) {
        var s =
          ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
            n[t],
          );
        r.push(s);
      }
    }
    return r;
  }
  GetSortedExpMaterialList(t, e) {
    return this.GetExpMaterialList(t, e, !0).sort(this.N6i);
  }
  GetExpMaterialList(t, i = 0, e = !1) {
    var r =
        ControllerHolder_1.ControllerHolder.PhantomBattleController.GetLevelUpItemList(
          t,
        ),
      a =
        ModelManager_1.ModelManager.InventoryModel.GetItemDataBaseByMainType(3);
    const n = [];
    for (const o of a) {
      if (9 === o.GetType()) {
        if (o.GetUniqueId() === t) continue;
        if (e && o.GetIsLock()) continue;
        if (0 < i && o.GetQuality() > i) continue;
        if (0 === this.GetPhantomBattleData(o.GetUniqueId()).GetPhantomLevel())
          continue;
        if (
          this.n6i.has(o.GetUniqueId()) &&
          0 !== this.n6i.get(o.GetUniqueId())
        )
          continue;
      }
      n.push(o);
    }
    return (
      r.forEach((t) => {
        var e =
            ModelManager_1.ModelManager.InventoryModel.GetItemDataBaseByConfigId(
              t.Id,
            ),
          r = e.length;
        for (let t = 0; t < r; t++) {
          var a = e[t];
          (0 < i && a.GetQuality() > i) || n.push(a);
        }
      }),
      n
    );
  }
  GetIfSimpleState(t) {
    var e = LocalStorage_1.LocalStorage.GetPlayer(
      LocalStorageDefine_1.ELocalStoragePlayerKey.IsSimpleDetail,
    );
    return !!e && !!e.has(t) && e.get(t);
  }
  SaveIfSimpleState(t, e) {
    let r = LocalStorage_1.LocalStorage.GetPlayer(
      LocalStorageDefine_1.ELocalStoragePlayerKey.IsSimpleDetail,
    );
    (r = r || new Map()).set(t, e),
      LocalStorage_1.LocalStorage.SetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.IsSimpleDetail,
        r,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.ChangeVisionSimplyState,
      );
  }
  SaveVisionSkillState(t, e) {
    let r = LocalStorage_1.LocalStorage.GetPlayer(
      LocalStorageDefine_1.ELocalStoragePlayerKey.VisionSpecialSkillShowMap,
    );
    (r = r || new Map()).set(t, e),
      LocalStorage_1.LocalStorage.SetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.VisionSpecialSkillShowMap,
        r,
      );
  }
  GetIfVisionSkillState(t) {
    var e = LocalStorage_1.LocalStorage.GetPlayer(
      LocalStorageDefine_1.ELocalStoragePlayerKey.VisionSpecialSkillShowMap,
    );
    return !!e && !!e.has(t) && e.get(t);
  }
  CalculateExpBackItem(t) {
    var e =
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomExpItemList(),
      r = e.length;
    let a = t;
    var i = new Map();
    for (let t = r - 1; 0 <= t; t--) {
      var n = Math.floor(a / e[t].Exp);
      (a %= e[t].Exp), 0 < n && i.set(e[t].ItemId, n);
    }
    return i;
  }
  CheckVisionIdentifyRedDot(t) {
    var e,
      t = this.GetPhantomDataBase(t);
    return (
      !!t &&
      ((e = t.GetIfHaveUnIdentifySubProp()),
      (t = t.GetIfHaveEnoughIdentifyConsumeItem(1)),
      e) &&
      t
    );
  }
  CheckVisionOneKeyEquipRedDot(t) {
    t = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t);
    if (!t) return !1;
    var e,
      r,
      a = t.GetPhantomData().GetDataMap();
    let i = !0,
      n = 0;
    for ([e, r] of a) a.get(e) || (i = !1), (n += r ? r.GetCost() : 0);
    return (
      n !== ModelManager_1.ModelManager.PhantomBattleModel?.GetMaxCost() &&
      !i &&
      0 !== this.GetUnEquipVisionArray().length
    );
  }
  IsVisionHighQuality(t) {
    var e =
      ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionLevelUpQualityLimit();
    return t.GetConfig().QualityId > e;
  }
  IsVisionHighLevel(t) {
    return (
      ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionLevelUpLevelLimit() <
      t.GetPhantomLevel()
    );
  }
  IsVisionHighRare(t) {
    return (
      ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionLevelUpRareLimit() <
      t.GetRareConfig().Rare
    );
  }
  get QualityUnlockTipsList() {
    return this.O6i;
  }
  CacheNewSkinData(t) {
    var e = new VisionUnlockQualityData(),
      t =
        ((e.SkinId = t),
        (e.MonsterItemId = t),
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemById(t)
          .QualityId);
    (e.UnlockQuality = t),
      ModelManager_1.ModelManager.PhantomBattleModel.QualityUnlockTipsList.push(
        e,
      );
  }
  CacheNewQualityData(t) {
    t.BBs.forEach((t) => {
      var e = new VisionUnlockQualityData(),
        r =
          ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemById(
            t,
          ).QualityId;
      (e.MonsterItemId = t),
        (e.UnlockQuality = r),
        ModelManager_1.ModelManager.PhantomBattleModel.QualityUnlockTipsList.push(
          e,
        );
    });
  }
  GetMainAttributeKey(t) {
    return this.GetSortMainAttributeMap().has(t)
      ? this.GetSortMainAttributeMap().get(t)
      : this.GetSortMainPercentageAttributeMap().has(t)
        ? this.GetSortMainPercentageAttributeMap().get(t)
        : 0;
  }
  GetSortMainAttributeMap() {
    return (
      this.I6i ||
        ((this.I6i = new Map()),
        this.I6i.set(8, 10007),
        this.I6i.set(6, 10002),
        this.I6i.set(10, 10010),
        this.I6i.set(12, 8),
        this.I6i.set(13, 9),
        this.I6i.set(14, 35),
        this.I6i.set(15, 21),
        this.I6i.set(16, 22),
        this.I6i.set(17, 23),
        this.I6i.set(18, 24),
        this.I6i.set(19, 25),
        this.I6i.set(20, 26),
        this.I6i.set(21, 27),
        this.I6i.set(22, 11)),
      this.I6i
    );
  }
  GetSortMainPercentageAttributeMap() {
    return (
      this.T6i ||
        ((this.T6i = new Map()),
        this.T6i.set(9, 10007),
        this.T6i.set(7, 10002),
        this.T6i.set(11, 10010)),
      this.T6i
    );
  }
  GetSubAttributeKey(t) {
    return this.GetSortSubAttributeMap().has(t)
      ? this.GetSortSubAttributeMap().get(t)
      : this.GetSortSubPercentageAttributeMap().has(t)
        ? this.GetSortSubPercentageAttributeMap().get(t)
        : 0;
  }
  GetSortSubAttributeMap() {
    return (
      this.L6i ||
        ((this.L6i = new Map()),
        this.L6i.set(25, 2),
        this.L6i.set(23, 1),
        this.L6i.set(27, 3),
        this.L6i.set(29, 14),
        this.L6i.set(30, 15),
        this.L6i.set(36, 11),
        this.L6i.set(37, 12),
        this.L6i.set(38, 13),
        this.L6i.set(39, 16),
        this.L6i.set(47, 7),
        this.L6i.set(48, 8),
        this.L6i.set(49, 9),
        this.L6i.set(50, 10)),
      this.L6i
    );
  }
  GetSortSubPercentageAttributeMap() {
    return (
      this.D6i ||
        ((this.D6i = new Map()),
        this.D6i.set(26, 5),
        this.D6i.set(24, 4),
        this.D6i.set(28, 6)),
      this.D6i
    );
  }
  GmClearData() {
    this.O6i.length = 0;
  }
  RecordVisionRecoveryRedDot(t) {
    LocalStorage_1.LocalStorage.SetPlayer(
      LocalStorageDefine_1.ELocalStoragePlayerKey.VisionRecoveryBatchTip,
      t,
    ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnVisionRecoveryStorage,
      );
  }
  GetVisionRecoveryBatchRedDot() {
    var t =
      LocalStorage_1.LocalStorage.GetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.VisionRecoveryBatchTip,
      ) ?? !0;
    return ModelManager_1.ModelManager.FunctionModel.IsOpen(10024001) && t;
  }
  GetVisionRecoverySortPhantomItemList(t) {
    var t =
        ModelManager_1.ModelManager.InventoryModel.GetPhantomItemDataListByAddCountItemInfo(
          t,
        ),
      e = new Set();
    return (
      e.add(3),
      e.add(4),
      ModelManager_1.ModelManager.SortModel.SortDataByData(t, 4, e, !1),
      t
    );
  }
}
exports.PhantomBattleModel = PhantomBattleModel;
class PhantomSortStruct {
  constructor() {
    (this.PhantomPropId = 0), (this.Value = 0), (this.IfPercentage = !1);
  }
}
exports.PhantomSortStruct = PhantomSortStruct;
class RecommendData {
  constructor() {
    (this.RoleId = 0),
      (this.MonsterIdList = new Array()),
      (this.FetterGroupId = 0),
      (this.MainPropId = 0);
  }
}
exports.RecommendData = RecommendData;
class VisionUnlockQualityData {
  constructor() {
    (this.MonsterItemId = 0), (this.UnlockQuality = 0), (this.SkinId = 0);
  }
}
exports.VisionUnlockQualityData = VisionUnlockQualityData;
//# sourceMappingURL=PhantomBattleModel.js.map
