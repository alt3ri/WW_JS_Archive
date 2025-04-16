"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionEquipGroupModel =
    exports.VisionAssembleAttrData =
    exports.VisionEquipGroupData =
      void 0);
const ModelBase_1 = require("../../../../Core/Framework/ModelBase"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  LocalStorage_1 = require("../../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  CommonComponentDefine_1 = require("../../Common/CommonComponentDefine"),
  PhantomDataBase_1 = require("./Data/PhantomDataBase");
class VisionEquipGroupData {
  constructor() {
    (this.Xy = 0), (this.he = ""), (this.Zh_ = new Array());
  }
  GetIndex() {
    return this.Xy;
  }
  GetName() {
    return this.he;
  }
  GetVisionUniqueIdList() {
    return this.Zh_;
  }
  Phrase(e, t) {
    (this.Xy = e), (this.he = t.H8n), (this.Zh_ = t.w5n);
  }
}
exports.VisionEquipGroupData = VisionEquipGroupData;
class VisionAssembleAttrData {
  constructor() {
    (this.CompareMode = !1),
      (this.AttrId = 0),
      (this.IfPercentage = !1),
      (this.CurrentValue = 0),
      (this.CompareValue = 0);
  }
  GetPriority() {
    var e =
      ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionAttrSortArray().findIndex(
        (e) => e === this.AttrId,
      );
    return -1 === e ? 0 : 999 - e;
  }
  GetId() {
    var e =
      ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
        this.AttrId,
      );
    return e ? e.Id : 0;
  }
}
exports.VisionAssembleAttrData = VisionAssembleAttrData;
class VisionEquipGroupModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.el_ = new Array()),
      (this.FilterDataLength = 0),
      (this.dP_ = (e, t) => {
        var r = t.GetPriority(),
          a = e.GetPriority(),
          o = 0 !== r,
          i = 0 !== a;
        return o && i
          ? r === a
            ? (t.IfPercentage ? 0 : 1) - (e.IfPercentage ? 0 : 1)
            : r - a
          : o
            ? -1
            : i
              ? 1
              : t.GetId() - e.GetId();
      });
  }
  RefreshVisionEquipGroupData(t) {
    this.el_ = new Array();
    var r = t.length;
    for (let e = 0; e < r; e++) {
      var a = new VisionEquipGroupData();
      a.Phrase(e, t[e]), this.el_.push(a);
    }
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.OnVisionGroupDataUpdate,
    );
  }
  CheckVisionListIfInGroup(r) {
    var e = this.el_.length;
    for (let t = 0; t < e; t++) {
      var a = this.el_[t];
      let e = !0;
      for (const o of r)
        if (!a.GetVisionUniqueIdList().includes(o)) {
          e = !1;
          break;
        }
      if (e) return !0;
    }
    return !1;
  }
  GetVisionEquipGroupList() {
    return this.el_;
  }
  GetVisionEquipGroupDataByIndex(t) {
    return this.el_.find((e) => e.GetIndex() === t);
  }
  GetVisionFetterDataByIncIdList(t) {
    var r = new Array(),
      a = t.length;
    for (let e = 0; e < a; e++) {
      var o =
        ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
          t[e],
        );
      o && r.push(o);
    }
    var e =
        PhantomDataBase_1.PhantomDataBase.CalculateFetterByPhantomBattleData(r),
      e =
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterMapResultBySuitMap(
          e,
        );
    const i = new Array();
    return (
      e.forEach((e, a) => {
        e.forEach((e, t) => {
          var r = new PhantomDataBase_1.VisionFetterData();
          (r.FetterGroupId = a),
            (r.FetterId = t),
            (r.NeedActiveNum = e),
            (r.ActiveFetterGroupNum = e),
            (r.ActiveState = !0),
            i.push(r);
        });
      }),
      i
    );
  }
  GetVisionAssembleViewAttrData(e, t, r) {
    let a = [];
    if (-1 === e) {
      var o = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(r);
      a = Array.from(o.GetPhantomData().GetIncrIdList());
    } else {
      o = this.GetVisionEquipGroupDataByIndex(e);
      if (!o) return [];
      a = o.GetVisionUniqueIdList();
    }
    e = this.tl_(a, t);
    return t && ((o = this.il_(r, t)), this.rl_(e, o)), e.sort(this.dP_);
  }
  rl_(r, a) {
    var e = a.length;
    for (let t = 0; t < e; t++) {
      var o,
        i = a[t];
      let e = !1;
      for (const n of r)
        if (n.AttrId === i.AttrId && n.IfPercentage === i.IfPercentage) {
          (n.CompareValue = i.CurrentValue), (e = !0);
          break;
        }
      e ||
        (((o = new VisionAssembleAttrData()).AttrId = i.AttrId),
        (o.IfPercentage = i.IfPercentage),
        (o.CompareValue = i.CurrentValue),
        (o.CompareMode = !0),
        r.push(o));
    }
  }
  il_(e, t) {
    e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e)
      .GetPhantomData()
      .GetIncrIdList();
    return this.tl_(Array.from(e), t);
  }
  tl_(t, r) {
    var a = new Array(),
      o = t.length;
    for (let e = 0; e < o; e++) {
      var i =
        ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
          t[e],
        );
      if (i) {
        for (const p of i.GetPhantomMainProp()) {
          var n,
            s =
              ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomMainPropertyItemId(
                p.Yws,
              ),
            u = s.AddType === CommonComponentDefine_1.RATIO;
          let e = !1;
          for (const h of a)
            if (h.AttrId === s.PropId && h.IfPercentage === u) {
              (h.CurrentValue += p.e5n), (e = !0);
              break;
            }
          e ||
            (((n = new VisionAssembleAttrData()).AttrId = s.PropId),
            (n.IfPercentage = u),
            (n.CurrentValue += p.e5n),
            (n.CompareMode = r),
            a.push(n));
        }
        for (const m of i.GetPhantomSubProp()) {
          var l,
            f =
              ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSubPropertyById(
                m.Yws,
              ),
            _ = f.AddType === CommonComponentDefine_1.RATIO;
          let e = !1;
          for (const c of a)
            if (c.AttrId === f.PropId && c.IfPercentage === _) {
              (c.CurrentValue += m.e5n), (e = !0);
              break;
            }
          e ||
            (((l = new VisionAssembleAttrData()).AttrId = f.PropId),
            (l.IfPercentage = _),
            (l.CurrentValue += m.e5n),
            (l.CompareMode = r),
            a.push(l));
        }
      }
    }
    return a;
  }
  SaveLocalTopTipState(e) {
    e = e ? 1 : 0;
    LocalStorage_1.LocalStorage.SetPlayer(
      LocalStorageDefine_1.ELocalStoragePlayerKey.VisionTopTipsState,
      e,
    );
  }
  GetLocalTipsState() {
    return (
      1 ===
      LocalStorage_1.LocalStorage.GetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.VisionTopTipsState,
      )
    );
  }
  GetVisionGroupFirstOpenState() {
    var e = ModelManager_1.ModelManager.FunctionModel.IsOpen(10075);
    return (
      (LocalStorage_1.LocalStorage.GetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.FirstOpenVisionGroup,
        !0,
      ) ??
        !0) &&
      e
    );
  }
  SaveVisionGroupFirstOpenState(e) {
    LocalStorage_1.LocalStorage.SetPlayer(
      LocalStorageDefine_1.ELocalStoragePlayerKey.FirstOpenVisionGroup,
      e,
    );
  }
}
exports.VisionEquipGroupModel = VisionEquipGroupModel;
//# sourceMappingURL=VisionEquipGroupModel.js.map
