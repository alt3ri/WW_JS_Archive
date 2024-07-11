"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionUnlockQualityData =
    exports.RecommendData =
    exports.PhantomSortStruct =
    exports.PhantomBattleModel =
    exports.LevelUpPastVisionData =
      void 0);
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const PhantomFetterGroupById_1 = require("../../../../Core/Define/ConfigQuery/PhantomFetterGroupById");
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const AttributeDefine_1 = require("../../Attribute/AttributeDefine");
const RoleLevelUpSuccessController_1 = require("../../RoleUi/RoleLevel/RoleLevelUpSuccessController");
const AttrListScrollData_1 = require("../../RoleUi/View/ViewData/AttrListScrollData");
const PhantomDataBase_1 = require("./Data/PhantomDataBase");
const PhantomRoleEquipmentData_1 = require("./Data/PhantomRoleEquipmentData");
const PhantomBattleData_1 = require("./PhantomBattleData");
const PhantomBattleInstance_1 = require("./PhantomBattleInstance");
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
      (this.rVi = new Map()),
      (this.nVi = new Map()),
      (this.sVi = new Map()),
      (this.aVi = new Map()),
      (this.hVi = new Map()),
      (this.lVi = new Array()),
      (this._Vi = !1),
      (this.uVi = void 0),
      (this.CurrentSelectData = void 0),
      (this.CurrentEquipmentSelectIndex = 0),
      (this.CurrentSelectUniqueId = 0),
      (this.cVi = void 0),
      (this.mVi = new UE.Vector()),
      (this.dVi = new UE.Vector()),
      (this.CVi = new UE.Rotator()),
      (this.gVi = new Map()),
      (this.fVi = []),
      (this.pVi = void 0),
      (this.vVi = !1),
      (this.MVi = 999),
      (this.SVi = 0),
      (this.EVi = []),
      (this.yVi = new Map()),
      (this.IVi = new Map()),
      (this.TVi = void 0),
      (this.LVi = void 0),
      (this.DVi = void 0),
      (this.RVi = void 0),
      (this.UVi = () => {
        ControllerHolder_1.ControllerHolder.PhantomBattleController.TryShowReceiveItem();
      }),
      (this.SortAttrList = (t, e) => {
        const r = t.Priority !== 0;
        const i = e.Priority !== 0;
        return r && i ? t.Priority - e.Priority : r ? -1 : i ? 1 : t.Id - e.Id;
      }),
      (this.AVi = void 0),
      (this.CurrentSelectFetterGroupId = 0),
      (this.PVi = void 0),
      (this.xVi = new Array(4, 3, 3, 1, 1)),
      (this.wVi = new Array()),
      (this.BVi = new Array()),
      (this.bVi = 0),
      (this.qVi = void 0),
      (this.GVi = void 0),
      (this.NVi = (t, e) => {
        if (t.GetPhantomLevel() !== e.GetPhantomLevel())
          return e.GetPhantomLevel() - t.GetPhantomLevel();
        if (t.GetQuality() !== e.GetQuality())
          return e.GetQuality() - t.GetQuality();
        let r = this.wVi.includes(t.GetMonsterId());
        let i = this.wVi.includes(e.GetMonsterId());
        if (r && !i) return -1;
        if (i && !r) return 1;
        (i = this.wVi.indexOf(t.GetMonsterId())),
          (r = this.wVi.indexOf(e.GetMonsterId())),
          (i = i >= 0 ? this.BVi[i] : 0),
          (r = r >= 0 ? this.BVi[r] : 0);
        if (i !== r) return r - i;
        (r = t.GetFetterGroupId() === this.bVi),
          (i = e.GetFetterGroupId() === this.bVi);
        if (r && i) {
          var a = this.qVi.includes(t.GetMonsterId());
          var n = this.qVi.includes(e.GetMonsterId());
          if (a && !n) return -1;
          if (n && !a) return 1;
        } else {
          if (r) return -1;
          if (i) return 1;
        }
        return t.GetCost() !== e.GetCost()
          ? e.GetCost() - t.GetCost()
          : ((n = this.GVi.includes(t.GetUniqueId())),
            (a = this.GVi.includes(e.GetUniqueId())),
            n && !a ? -1 : a && !n ? 1 : e.GetConfigId() - t.GetConfigId());
      }),
      (this.OVi = (t, e) => {
        let r, i;
        return t.GetType() !== e.GetType()
          ? t.GetType() - e.GetType()
          : t.GetQuality() !== e.GetQuality()
            ? t.GetQuality() - e.GetQuality()
            : ((r = this.GetPhantomBattleData(t.GetUniqueId())),
              (i = this.GetPhantomBattleData(t.GetUniqueId())),
              r && i && r.GetPhantomLevel() !== i.GetPhantomLevel()
                ? r.GetPhantomLevel() - i.GetPhantomLevel()
                : e.GetUniqueId() - t.GetUniqueId());
      }),
      (this.kVi = new Array());
  }
  SetCurrentDragIndex(t) {
    this.MVi = t;
  }
  ClearCurrentDragIndex() {
    this.MVi = 999;
  }
  CheckIfCurrentDragIndex(t) {
    return this.MVi === t;
  }
  CheckIfCanDrag() {
    return this.MVi === 999;
  }
  OnInit() {
    for (const i of ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemList()) {
      var e;
      const r = i.ParentMonsterId !== 0 ? i.ParentMonsterId : i.MonsterId;
      let t = this.yVi.get(r);
      t
        ? i.ParentMonsterId !== 0
          ? t.push(i.ItemId)
          : i.QualityId === 2 &&
            ((e = []).push(i.ItemId), (t = e.concat(t)), this.yVi.set(r, t))
        : ((t = []).push(i.ItemId), this.yVi.set(r, t)),
        i.ParentMonsterId !== 0 && this.IVi.set(i.MonsterId, i.ParentMonsterId);
    }
    return !0;
  }
  async GetDragCurve() {
    return (
      this.cVi ||
        ((this.cVi = new CustomPromise_1.CustomPromise()),
        ResourceSystem_1.ResourceSystem.LoadAsync(
          ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionDragCurve(),
          UE.CurveFloat,
          (t) => {
            this.cVi.SetResult(t);
          },
        )),
      await this.cVi.Promise,
      this.cVi.Promise
    );
  }
  SetDefaultSkin(t, e) {
    for (const [, r] of this.hVi)
      t === r.GetConfig()?.MonsterId && r.SetSkinId(e);
  }
  SetUnlockSkinList(t) {
    this.EVi = t;
  }
  ConcatUnlockSkinList(t) {
    this.EVi = this.EVi.concat(t);
  }
  GetSkinIsUnlock(t) {
    return this.EVi.includes(t);
  }
  GetMonsterSkinListByMonsterId(t) {
    return this.yVi.get(t);
  }
  GetMonsterSkinListHasNew(t) {
    t =
      ConfigManager_1.ConfigManager.PhantomBattleConfig?.GetPhantomItemById(t);
    if (t) {
      t = t.ParentMonsterId !== 0 ? t.ParentMonsterId : t.MonsterId;
      for (const e of this.yVi.get(t))
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
    return this.IVi.get(t);
  }
  SetMaxCost(t) {
    this.SVi = t;
  }
  GetMaxCost() {
    return this.SVi;
  }
  SetRobotPhantomData(t, e) {
    this.rVi.set(t, e);
  }
  NewPhantomBattleData(t) {
    const e = new PhantomBattleData_1.PhantomBattleData();
    return e.SetData(t), this.hVi.set(t.Q5n, e), (this._Vi = !0), e;
  }
  RemovePhantomBattleData(t) {
    this.hVi.delete(t), (this._Vi = !0);
  }
  GetPhantomDataBase(t) {
    return this.GetPhantomBattleData(t);
  }
  GetPhantomBattleData(t) {
    return (t < 0 ? this.rVi : this.hVi).get(t);
  }
  GetPhantomInstanceByItemId(t) {
    let e = this.aVi.get(t);
    let r;
    return (
      e ||
        ((r =
          ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemById(
            t,
          )),
        (e = new PhantomBattleInstance_1.PhantomBattleInstance(r)),
        this.aVi.set(t, e)),
      e
    );
  }
  CreatePhantomLevelCacheData(t) {
    const e = new LevelUpPastVisionData();
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
    this.pVi = t;
  }
  GetCachePhantomLevelUpData() {
    return this.pVi;
  }
  GetLevelUpSuccessData(t) {
    const e =
      ModelManager_1.ModelManager.PhantomBattleModel.GetCachePhantomLevelUpData();
    const r =
      ModelManager_1.ModelManager.PhantomBattleModel.CheckPhantomIfLevelMax(t);
    var t =
      ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
        t,
      );
    var i = this.FVi(e, t);
    const a = new Array();
    i.forEach((t) => {
      a.push(
        RoleLevelUpSuccessController_1.RoleLevelUpSuccessController.ConvertsAttrListScrollDataToAttributeInfo(
          t,
        ),
      );
    });
    var i = t.GetLevelUnlockSubPropSlotCount(e.Level);
    const n = t.GetLevelUnlockSubPropSlotCount(t.GetPhantomLevel());
    if (i !== n)
      for (let t = i; t < n; t++) {
        const o = { Name: "UnlockSlot", ShowArrow: !1, PreText: "" };
        (o.CurText = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "Text_PhantomUnlock_Text",
        )),
          (o.IconPath =
            ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionLevelUpTexture()),
          a.push(o);
      }
    return {
      LevelInfo: {
        PreUpgradeLv: e.Level,
        UpgradeLv: t.GetPhantomLevel(),
        FormatStringId: "VisionLevel",
        IsMaxLevel: r,
      },
      WiderScrollView: !1,
      AttributeInfo: a,
      ClickFunction: this.UVi,
    };
  }
  FVi(t, e) {
    const i = t.AttrListScrollData;
    const a = e.GetMainPropShowAttributeList(1);
    const n = a.length;
    const o = i.length;
    const s = new Array();
    for (let r = 0; r < n; r++) {
      const h = a[r];
      let e = void 0;
      for (let t = 0; t < o; t++)
        if (i[t].Id === h.Id && r === t) {
          e = i[t];
          break;
        }
      const l =
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
    const e = [];
    for (const i of Object.keys(t)) {
      const r = [{ IncId: 0, ItemId: Number.parseInt(i) }, t[i]];
      e.push(r);
    }
    (this.fVi = e),
      (this.vVi = !0),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.PhantomLevelUpReceiveItem,
        e,
      );
  }
  GetVisionLevelUpTag() {
    return this.vVi;
  }
  ClearVisionLevelUp() {
    this.vVi = !1;
  }
  GetTempSaveItemList() {
    return this.fVi;
  }
  ClearTempSaveItemList() {
    this.fVi = [];
  }
  GetVisionSortUseDataList(t = 0, e = 0) {
    const r = new Array();
    const i = ModelManager_1.ModelManager.InventoryModel;
    for (const s of ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleDataMap().values()) {
      var a;
      var n;
      let o = s.GetUniqueId();
      (t > 0 && s.GetFetterGroupId() !== t) ||
        (e > 0 && s.GetCost() !== e) ||
        ((a = i.GetPhantomItemData(o)),
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
          IsLock: a.GetIsLock(),
          ConfigId: a.GetConfigId(),
          Rarity: n.Rarity,
        }),
        r.push(o));
    }
    return r;
  }
  GetPhantomBattleDataMap() {
    return this.hVi;
  }
  GetUnEquipVisionArray() {
    return (
      this._Vi &&
        ((this.lVi = []),
        (this._Vi = !1),
        this.GetPhantomBattleDataMap().forEach((t, e) => {
          this.CheckPhantomIsEquip(e) || this.lVi.push(t);
        })),
      this.lVi
    );
  }
  UpdateRoleEquipmentData(r) {
    const t = this.GetBattleDataById(r.l3n);
    t.GetIncrIdList().forEach((t) => {
      this.sVi.delete(t);
    }),
      r.c8n.forEach((t) => {
        const e = this.GetPhantomEquipOnRoleId(t);
        e > 0 && this.GetBattleDataById(e).RemoveIncrIdLocal(t),
          this.sVi.set(t, r.l3n);
      }),
      (this._Vi = !0),
      t.Phrase(r);
  }
  UpdateRoleEquipmentPropData(t) {
    this.GetBattleDataById(t.l3n).Phrase(t);
  }
  DeleteBattleData(t) {
    const e = this.nVi.get(t);
    e &&
      (e.GetIncrIdList().forEach((t) => {
        this.sVi.delete(t);
      }),
      (this._Vi = !0),
      this.nVi.delete(t));
  }
  GetBattleDataById(t) {
    let e = this.nVi.get(t);
    return (
      (e = e || new PhantomRoleEquipmentData_1.PhantomRoleEquipmentData()),
      this.nVi.set(t, e),
      e
    );
  }
  CheckPhantomIsEquip(t) {
    return t < 0 || (t !== 0 && this.sVi.has(t));
  }
  CheckPhantomIsMain(t) {
    let e;
    return t < 0
      ? this.GetPhantomDataBase(t).GetIfMain()
      : !!this.CheckPhantomIsEquip(t) &&
          ((e = this.sVi.get(t)),
          this.GetBattleDataById(e).CheckPhantomIsMain(t));
  }
  CheckPhantomIsSub(t) {
    let e;
    return (
      !!this.CheckPhantomIsEquip(t) &&
      ((e = this.sVi.get(t)), this.GetBattleDataById(e).CheckPhantomIsSub(t))
    );
  }
  GetPhantomEquipOnRoleId(t) {
    if (this.CheckPhantomIsEquip(t)) return this.sVi.get(t);
  }
  CheckPhantomIndexIsEquipOnRole(t, e) {
    return this.GetBattleDataById(t).GetIndexPhantomId(e) !== -1;
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
    if (!t || t.length === 0) return !1;
    let e = !1;
    for (const r of t)
      if (
        ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(r) > 0
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
    const e =
      ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(
        t,
      ).GetIncrIdList();
    const r = e.length;
    for (let t = 0; t < r; t++) if (e[t] !== 0) return !0;
    return !1;
  }
  GetRoleIndexPhantomId(t, e) {
    return this.GetBattleDataById(t).GetIndexPhantomId(e);
  }
  GetPhantomIndexOfRole(t, e) {
    const r =
      ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(
        t,
      ).GetIncrIdList();
    const i = r.length;
    for (let t = 0; t < i; t++) if (r[t] === e) return t;
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
    if (t.length === 0) return [];
    const e = new Array();
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
    var t = e.GetDataMap();
    const r = [];
    for (const e of t.values()) e && r.push(e.GetIncrId());
    e.ClearPhantomFettersList(), this.VVi(r, e.GetPhantomFettersList());
  }
  VVi(t, e) {
    const r = new Map();
    t.forEach((t) => {
      let e;
      var t = this.GetPhantomDataBase(t);
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
    const i = this.GetBattleDataById(r).GetIncrIdList();
    const a = new Array();
    const n = i.length;
    for (let t = 0; t < n; t++)
      this.GetPhantomBattleData(i[t]) && t !== e && a.push(i[t]);
    const o = new Array();
    const s = this.GetTargetRoleFetterList(r);
    const h = new Array();
    a.push(t.GetIncrId()), this.VVi(a, o);
    for (const l of o) s.includes(l) || h.push(l);
    return h;
  }
  GetPreviewFettersDel(t, e, r) {
    const i = this.GetBattleDataById(r).GetIncrIdList();
    const a = new Array();
    const n = i.length;
    for (let t = 0; t < n; t++)
      this.GetPhantomBattleData(i[t]) && t !== e && a.push(i[t]);
    const o = new Array();
    var r = this.GetTargetRoleFetterList(r);
    const s = new Array();
    a.push(t.GetIncrId()), this.VVi(a, o);
    for (const h of r) o.includes(h) || s.push(h);
    return s;
  }
  CheckFetterActiveState(t, e) {
    t = this.GetFetterListByRoleId(t);
    if (t && t.length !== 0) for (const r of t) if (r.Id === e) return !0;
    return !1;
  }
  GetTargetCanActiveFettersList(t) {
    const e = new Map();
    var t = this.GetPhantomDataBase(t);
    const a = new Array();
    return (
      t && e.set(t.GetFetterGroupId(), 999),
      e.forEach((r, t) => {
        t =
          PhantomFetterGroupById_1.configPhantomFetterGroupById.GetConfig(
            t,
          ).FetterMap;
        let i;
        t.forEach((t, e) => {
          e <= r && ((i = t), a.push(i));
        });
      }),
      a
    );
  }
  GetRoleFetterData(t) {
    const i = new Array();
    const e =
      ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(
        t,
      ).GetIncrIdList();
    const r = e.length;
    const a = new Array();
    for (let t = 0; t < r; t++) {
      const n =
        ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
          e[t],
        );
      n && a.push(n);
    }
    const o =
      PhantomDataBase_1.PhantomDataBase.CalculateFetterByPhantomBattleData(a);
    for (let t = 0; t < r; t++) {
      const s =
        ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
          e[t],
        );
      s &&
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupFetterDataById(
          s.GetFetterGroupId(),
        ).forEach((t, e) => {
          const r = new PhantomDataBase_1.VisionFetterData();
          (r.FetterId = t),
            (r.FetterGroupId = s.GetFetterGroupId()),
            (r.ActiveFetterGroupNum = o.get(s.GetFetterGroupId()) ?? 0),
            (r.ActiveState = o.get(s.GetFetterGroupId()) >= e),
            i.push(r);
        });
    }
    return i;
  }
  GetTargetRoleFetterList(t) {
    return ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t)
      .GetPhantomData()
      .GetPhantomFettersList();
  }
  GetMeshTransform(t) {
    return new UE.Transform(this.HVi(t), this.jVi(t), this.WVi(t));
  }
  WVi(t) {
    t = this.GetPhantomInstanceByItemId(t).GetModelZoom();
    if (t && t.length > 0)
      return (
        (this.mVi.X = t[0]), (this.mVi.Y = t[1]), (this.mVi.Z = t[2]), this.mVi
      );
  }
  jVi(t) {
    t = this.GetPhantomInstanceByItemId(t).GetModelLocation();
    if (t && t.length > 0)
      return (
        (this.dVi.X = t[0]), (this.dVi.Y = t[1]), (this.dVi.Z = t[2]), this.dVi
      );
  }
  HVi(t) {
    t = this.GetPhantomInstanceByItemId(t).GetModelRotator();
    if (t && t.length > 0)
      return (
        (this.CVi.Roll = t[0]),
        (this.CVi.Pitch = t[1]),
        (this.CVi.Yaw = t[2]),
        this.CVi
      );
  }
  GetStandAnim(t) {
    return this.GetPhantomInstanceByItemId(t).GetStandAnim();
  }
  GetPhantomLevelUpItemSortList(t) {
    const e = [];
    const r =
      ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomExpItemList();
    if (r)
      for (const a of r) {
        const i = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(a.ItemId);
        i && e.push(i);
      }
    return e;
  }
  CheckPhantomIfNewQuality(t) {
    let e;
    let r;
    const i = this.GetPhantomDataBase(t);
    let a = !1;
    for ([e, r] of this.hVi)
      if (
        r.GetMonsterId() === i?.GetMonsterId() &&
        e !== t &&
        r.GetQuality() === i.GetQuality()
      ) {
        a = !0;
        break;
      }
    return !a;
  }
  GetEquipRoleName(t) {
    var t =
      ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomEquipOnRoleId(t);
    return t > 0
      ? ((t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(t)),
        ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(t.Name))
      : "";
  }
  GetRoleCurrentPhantomCost(t) {
    const e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t);
    let r = 0;
    if (e?.IsTrialRole()) {
      const i = e.GetPhantomData().GetDataMap();
      for (let t = 0; t < 5; ++t) {
        const a = i.get(t);
        a && (r += a.GetCost());
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
    this.gVi.clear();
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
      this.uVi ||
        ((this.uVi = new Map()),
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupArray().forEach(
          (t) => {
            const e =
              ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupSourceMonster(
                t.Id,
              );
            const r = new Array();
            e.forEach((t) => {
              r.includes(t) || r.push(t);
            }),
              this.uVi.set(t.Id, r);
          },
        )),
      this.uVi
    );
  }
  GetTrialRoleDetailAttrList(t) {
    const e = CommonParamById_1.configCommonParamById.GetIntArrayConfig(
      "VisionMainViewExtraAttribute",
    );
    const r = this.GetTrialRoleAttrList(t);
    const i = r.length;
    const a = [];
    let n = !1;
    return (
      e.forEach((e) => {
        const t =
          ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
            e,
          );
        n = !1;
        for (let t = 0; t < i; t++)
          if (r[t].Id === e) {
            a.push(r[t]), (n = !0);
            break;
          }
        n ||
          a.push(
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
      a
    );
  }
  GetTrialRoleAttrList(t) {
    let e;
    let r;
    const i = new Array();
    const a = ModelManager_1.ModelManager.RoleModel.GetRoleRobotData(t);
    const n =
      ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexList();
    const o = new Map();
    const s = [];
    a
      .GetPhantomData()
      .GetDataMap()
      .forEach((t) => {
        for (const e of t.GetMainTrailProp().values()) s.push(e);
        for (const r of t.GetSubTrailPropMap().values()) s.push(r);
      }),
      this.KVi(s, o, t);
    for (const h of n)
      h.IsShow &&
        ((e =
          ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
            h.Id,
          )),
        (r = void 0 !== (r = o.get(h.Id)) ? r : 0),
        i.push(
          new AttrListScrollData_1.AttrListScrollData(
            h.Id,
            0,
            r,
            e.Priority,
            !1,
            1,
          ),
        ));
    return i.sort(this.SortAttrList), i;
  }
  KVi(t, r, e) {
    let i;
    const a = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e);
    for (const n of t) {
      let t = 0;
      let e = n.AttributeId;
      n.AttributeId > AttributeDefine_1.GREEN_ATTRIBUTE_INTERNAL &&
        (e -= AttributeDefine_1.GREEN_ATTRIBUTE_INTERNAL),
        (t = n.IsRatio
          ? (a.GetBaseAttributeValueById(e) ?? 0) *
            (n.AttributeValue / AttributeDefine_1.TEN_THOUSANDTH_RATIO)
          : n.AttributeValue),
        r.has(e) ? ((i = r.get(e)), r.set(e, i + t)) : r.set(e, t);
    }
  }
  set CurrentSelectedFetter(t) {
    this.AVi = t;
  }
  get CurrentSelectedFetter() {
    return this.AVi;
  }
  GetFettersObtainDataList(t) {
    const e = new Array();
    for (const a of t) {
      var r = this.GetPhantomItemIdArrayByMonsterId(a);
      if (r && r.length !== 0) {
        let t = 0;
        for (const n of r)
          if (
            (t =
              ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
                n,
              )) > 0
          )
            break;
        var r = this.GetPhantomInstanceByItemId(r[0]);
        var i =
          ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashDevelopRewardByMonsterId(
            a,
          );
        var i = ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterIcon(
          i.MonsterInfoId,
        );
        var r = {
          Id: a,
          Name: r.PhantomItem.MonsterName,
          Icon: i,
          IsGet: t !== 0,
        };
        e.push(r);
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Phantom",
            28,
            "该怪物没有对应道具，请检查幻象道具表是否正确",
            ["monsterId", a],
          );
    }
    return e;
  }
  SetPhantomRecommendData(t) {
    (this.PVi = new RecommendData()),
      (this.PVi.RoleId = t.l3n),
      (this.PVi.MonsterIdList = t.sUs),
      (this.PVi.MainPropId = t.aUs),
      (this.PVi.FetterGroupId = t.SDs);
  }
  get PhantomRecommendData() {
    return this.PVi;
  }
  CheckIfHasPhantomSatisfiedLevelCondition(t, e) {
    let r = [];
    if (
      (r =
        t !== 0
          ? ModelManager_1.ModelManager.InventoryModel.GetPhantomItemDataListByPhantomItemId(
              t,
            )
          : ModelManager_1.ModelManager.InventoryModel.GetPhantomItemDataList())
        .length !== 0
    )
      for (const a of r) {
        const i =
          ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
            a.GetUniqueId(),
          );
        if (i && i.GetPhantomLevel() >= e) return !0;
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
      const e =
        ModelManager_1.ModelManager.InventoryModel.GetPhantomItemDataListByPhantomItemId(
          r,
        );
      if (e.length === 0) return !1;
      for (const i of e)
        if (!this.CheckPhantomIsEquip(i.GetUniqueId())) return !0;
    }
    return !1;
  }
  GetRecommendEquipUniqueIdList(t) {
    const r = [0, 0, 0, 0, 0];
    if (!this.PVi || this.PVi.RoleId === t) {
      const e = this.PVi ? this.PVi.MonsterIdList : [];
      const i = this.PVi ? this.PVi.FetterGroupId : 0;
      const a =
        (this.QVi(e, i, t),
        ModelManager_1.ModelManager.PhantomBattleModel.GetAllNotEquipPhantomList(
          t,
        ));
      if (a) {
        const n = a?.length;
        const o = ModelManager_1.ModelManager.PhantomBattleModel.GetMaxCost();
        const s = r.length;
        for (let e = 0; e < s; e++) {
          const h = this.xVi[e];
          for (let t = 0; t < n; t++) {
            const l = a[t].GetUniqueId();
            if (!r.includes(l)) {
              const u = a[t].GetCost();
              if (!(h < u))
                if (
                  ModelManager_1.ModelManager.PhantomBattleModel.XVi(r) + u <=
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
    let e;
    const r =
      ModelManager_1.ModelManager.InventoryModel.GetPhantomItemDataList();
    if (r.length !== 0) {
      const i = new Array();
      for (const a of r)
        this.CheckPhantomIsEquip(a.GetUniqueId()) ||
          ((e = this.GetPhantomBattleData(a.GetUniqueId())), i.push(e));
      return (
        ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(t)
          .GetIncrIdList()
          .forEach((t) => {
            t = this.GetPhantomBattleData(t);
            t && i.push(t);
          }),
        i.sort(this.NVi)
      );
    }
  }
  QVi(t, e, r) {
    (this.wVi = t), (this.BVi = []);
    const i = this.wVi.length;
    for (let t = i - 1; t >= 0; t--)
      t !== i - 1 ? this.wVi.push(t) : this.wVi.push(1);
    (this.bVi = e),
      (this.GVi = this.GetBattleDataById(r).GetIncrIdList()),
      (this.qVi = []),
      this.GVi.forEach((t) => {
        this.qVi.push(
          void 0 !== this.GetPhantomDataBase(t)
            ? this.GetPhantomDataBase(t).GetMonsterId()
            : 0,
        );
      });
  }
  GetPhantomItemNumByItemId(t) {
    const e =
      ModelManager_1.ModelManager.InventoryModel.GetPhantomItemDataList();
    if (e.length === 0) return 0;
    let r = 0;
    for (const i of e) i.GetConfigId() === t && r++;
    return r;
  }
  XVi(t) {
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
    const e = new Array();
    const r = CommonParamById_1.configCommonParamById.GetIntArrayConfig(
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
    const e = t.IsTrialRole();
    const r = new Array();
    if (e) {
      const i = t.GetPhantomData().GetDataMap();
      for (let t = 0; t < 5; ++t) {
        const a = i.get(t);
        r.push(a);
      }
    } else {
      const n =
        ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(
          t.GetRoleId(),
        ).GetIncrIdList();
      const o = n.length;
      for (let t = 0; t < o; t++) {
        const s =
          ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
            n[t],
          );
        r.push(s);
      }
    }
    return r;
  }
  GetSortedExpMaterialList(t, e) {
    return this.GetExpMaterialList(t, e, !0).sort(this.OVi);
  }
  GetExpMaterialList(t, a = 0, e = !1) {
    const r =
      ControllerHolder_1.ControllerHolder.PhantomBattleController.GetLevelUpItemList(
        t,
      );
    const i =
      ModelManager_1.ModelManager.InventoryModel.GetItemDataBaseByMainType(3);
    const n = [];
    for (const o of i) {
      if (o.GetType() === 9) {
        if (o.GetUniqueId() === t) continue;
        if (e && o.GetIsLock()) continue;
        if (a > 0 && o.GetQuality() > a) continue;
        if (this.GetPhantomBattleData(o.GetUniqueId()).GetPhantomLevel() === 0)
          continue;
        if (
          this.sVi.has(o.GetUniqueId()) &&
          this.sVi.get(o.GetUniqueId()) !== 0
        )
          continue;
      }
      n.push(o);
    }
    return (
      r.forEach((t) => {
        const e =
          ModelManager_1.ModelManager.InventoryModel.GetItemDataBaseByConfigId(
            t.Id,
          );
        const r = e.length;
        for (let t = 0; t < r; t++) {
          const i = e[t];
          (a > 0 && i.GetQuality() > a) || n.push(i);
        }
      }),
      n
    );
  }
  GetIfSimpleState(t) {
    const e = LocalStorage_1.LocalStorage.GetPlayer(
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
    const e = LocalStorage_1.LocalStorage.GetPlayer(
      LocalStorageDefine_1.ELocalStoragePlayerKey.VisionSpecialSkillShowMap,
    );
    return !!e && !!e.has(t) && e.get(t);
  }
  CalculateExpBackItem(t) {
    const e =
      ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomExpItemList();
    const r = e.length;
    let i = t;
    const a = new Map();
    for (let t = r - 1; t >= 0; t--) {
      const n = Math.floor(i / e[t].Exp);
      (i %= e[t].Exp), n > 0 && a.set(e[t].ItemId, n);
    }
    return a;
  }
  CheckVisionIdentifyRedDot(t) {
    let e;
    var t = this.GetPhantomDataBase(t);
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
    let e;
    let r;
    const i = t.GetPhantomData().GetDataMap();
    let a = !0;
    let n = 0;
    for ([e, r] of i) i.get(e) || (a = !1), (n += r ? r.GetCost() : 0);
    return (
      n !== ModelManager_1.ModelManager.PhantomBattleModel?.GetMaxCost() &&
      !a &&
      this.GetUnEquipVisionArray().length !== 0
    );
  }
  IsVisionHighQuality(t) {
    const e =
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
    return this.kVi;
  }
  CacheNewSkinData(t) {
    const e = new VisionUnlockQualityData();
    var t =
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
    t.lUs.forEach((t) => {
      const e = new VisionUnlockQualityData();
      const r =
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
      this.TVi ||
        ((this.TVi = new Map()),
        this.TVi.set(8, 10007),
        this.TVi.set(6, 10002),
        this.TVi.set(10, 10010),
        this.TVi.set(12, 8),
        this.TVi.set(13, 9),
        this.TVi.set(14, 35),
        this.TVi.set(15, 21),
        this.TVi.set(16, 22),
        this.TVi.set(17, 23),
        this.TVi.set(18, 24),
        this.TVi.set(19, 25),
        this.TVi.set(20, 26),
        this.TVi.set(21, 27),
        this.TVi.set(22, 11)),
      this.TVi
    );
  }
  GetSortMainPercentageAttributeMap() {
    return (
      this.LVi ||
        ((this.LVi = new Map()),
        this.LVi.set(9, 10007),
        this.LVi.set(7, 10002),
        this.LVi.set(11, 10010)),
      this.LVi
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
      this.DVi ||
        ((this.DVi = new Map()),
        this.DVi.set(25, 2),
        this.DVi.set(23, 1),
        this.DVi.set(27, 3),
        this.DVi.set(29, 14),
        this.DVi.set(30, 15),
        this.DVi.set(32, 7),
        this.DVi.set(33, 8),
        this.DVi.set(34, 9),
        this.DVi.set(35, 10),
        this.DVi.set(36, 11),
        this.DVi.set(37, 12),
        this.DVi.set(38, 13),
        this.DVi.set(39, 16)),
      this.DVi
    );
  }
  GetSortSubPercentageAttributeMap() {
    return (
      this.RVi ||
        ((this.RVi = new Map()),
        this.RVi.set(26, 5),
        this.RVi.set(24, 4),
        this.RVi.set(28, 6)),
      this.RVi
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
// # sourceMappingURL=PhantomBattleModel.js.map
