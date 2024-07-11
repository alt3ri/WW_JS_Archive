"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MonsterCursorHandle = void 0);
const Stats_1 = require("../../../../Core/Common/Stats"),
  CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  ObjectSystem_1 = require("../../../../Core/Object/ObjectSystem"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  CameraController_1 = require("../../../Camera/CameraController"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  CampUtils_1 = require("../../../NewWorld/Character/Common/Blueprint/Utils/CampUtils"),
  MonsterCursorUnit_1 = require("../HudUnit/MonsterCursorUnit"),
  HudUnitHandleBase_1 = require("./HudUnitHandleBase");
class MonsterCursorHandle extends HudUnitHandleBase_1.HudUnitHandleBase {
  constructor() {
    super(...arguments),
      (this.Uoi = []),
      (this.Poi = new Map()),
      (this.xoi = new Set()),
      (this.woi = new Map()),
      (this.Boi = 0),
      (this.boi = 0),
      (this.qoi = void 0),
      (this.CurrentEntity = void 0),
      (this.coi = void 0),
      (this.o9e = void 0),
      (this.r9e = !1),
      (this.Goi = new Set()),
      (this.Noi = 0),
      (this.Ooi = 0),
      (this.koi = 0),
      (this.Foi = 0),
      (this.Voi = 0),
      (this.doi = void 0),
      (this.GUe = (t, s, i) => {
        this.Hoi(s.Entity) && (this.joi(s.Entity), this.Woi());
      }),
      (this.zpe = (t, s) => {
        var i;
        this.Hoi(s.Entity) &&
          ((i = this.HudEntitySet.GetByEntity(s.Entity)) &&
            (this.Koi(i), this.Qoi(s.Entity)),
          this.HudEntitySet.Num() <= 0) &&
          this.Xoi();
      }),
      (this.o7e = (t, s) => {
        (this.CurrentEntity = t),
          (this.coi = this.CurrentEntity.Entity.GetComponent(1)),
          this.T9e(t);
      }),
      (this.$oi = (t, s) => {
        s ? this.xoi.add(t) : this.xoi.delete(t);
      }),
      (this.n9e = (t, s) => {
        (this.r9e = s) ? this.Woi() : (this.Yoi(), this.Xoi());
      }),
      (this.Joi = () => {
        var t;
        this.CurrentEntity?.Valid &&
          (this.Goi.clear(),
          (t = this.xXe()),
          this.HudEntitySet.Num() <= this.Boi
            ? this.Zoi(t)
            : this.eri(t) || this.tri(t) || this.iri(t));
      });
  }
  OnInitialize() {
    var t;
    (this.Boi = CommonParamById_1.configCommonParamById.GetIntConfig(
      "MonsterCursorMaxCount",
    )),
      (this.boi = CommonParamById_1.configCommonParamById.GetIntConfig(
        "MonsterCursorRefreshInterval",
      )),
      (this.Voi = CommonParamById_1.configCommonParamById.GetIntConfig(
        "MonsterCursorMaxDistance",
      )),
      (this.Noi = CommonParamById_1.configCommonParamById.GetIntConfig(
        "MonsterCursorMaxScale",
      )),
      (this.Ooi = CommonParamById_1.configCommonParamById.GetIntConfig(
        "MonsterCursorMinScale",
      )),
      (this.koi = CommonParamById_1.configCommonParamById.GetIntConfig(
        "MonsterCursorMaxScaleDistance",
      )),
      (this.Foi = CommonParamById_1.configCommonParamById.GetIntConfig(
        "MonsterCursorMinScaleDistance",
      )),
      (this.doi =
        CameraController_1.CameraController.FightCamera.GetComponent(5)),
      (this.CurrentEntity =
        ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity),
      this.CurrentEntity?.Valid &&
        ((this.coi = this.CurrentEntity.Entity.GetComponent(1)),
        (t = this.CurrentEntity.Entity.GetComponent(185)),
        (this.r9e = t.HasTag(1996802261)),
        this.NewHudEntitySet(),
        this.ori(),
        this.rri(),
        this.T9e(this.CurrentEntity),
        this.Woi() || this.Xoi());
  }
  OnDestroyed() {
    (this.CurrentEntity = void 0),
      (this.coi = void 0),
      this.xoi.clear(),
      this.woi.clear(),
      this.I9e(),
      this.Xoi(),
      this.nri();
  }
  OnShowHud() {
    super.OnShowHud();
    for (const t of this.Uoi) t.SetActive(!1);
  }
  OnHideHud() {
    super.OnHideHud();
  }
  OnTick(t) {
    if (
      this.IsHudVisible &&
      this.r9e &&
      ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Valid
    ) {
      var s,
        i,
        e = this.xXe();
      for (const r of this.Poi.values())
        r.IsValid() &&
          (i = r.GetHudEntityData()).IsValid() &&
          ((s = i.GetLocation()),
          (s = this.GetInEllipsePosition(e, s)[0]),
          (i = i.GetDistanceSquaredTo(e)),
          (i = MathUtils_1.MathUtils.RangeClamp(
            i,
            this.Foi,
            this.koi,
            this.Noi,
            this.Ooi,
          )),
          r.Refresh(i / CommonDefine_1.PERCENTAGE_FACTOR, s),
          r.GetActive() || r.SetActive(!0));
    }
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AddEntity, this.GUe),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RemoveEntity,
        this.zpe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnChangeRole,
        this.o7e,
      );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.AddEntity,
      this.GUe,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RemoveEntity,
        this.zpe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnChangeRole,
        this.o7e,
      );
  }
  ori() {
    var t = ModelManager_1.ModelManager.CreatureModel.GetAllEntities();
    if (t)
      for (const s of t) s.IsInit && this.Hoi(s.Entity) && this.joi(s.Entity);
  }
  rri() {
    for (let t = 0; t < this.Boi; t++) this.sri();
  }
  nri() {
    this.DestroyAllHudUnit(), (this.Uoi.length = 0), this.Poi.clear();
  }
  sri() {
    this.NewHudUnit(
      MonsterCursorUnit_1.MonsterCursorUnit,
      "UiItem_MonCursor_Prefab",
    ).then(
      (t) => {
        t.SetActive(!1), this.Uoi.push(t);
      },
      () => {},
    );
  }
  joi(t) {
    var t = this.HudEntitySet.Add(t),
      s =
        (t.SetComponent(0),
        t.SetComponent(1),
        t.SetComponent(185),
        t.ListenForTagCountChanged(-1371021686, this.$oi),
        t.GetMonsterMatchType());
    let i = this.woi.get(s);
    i || ((i = new Set()), this.woi.set(s, i)), i.add(t);
  }
  Qoi(t) {
    var s,
      i = this.HudEntitySet.GetByEntity(t);
    i &&
      ((s = i.GetMonsterMatchTypeNumber()),
      this.HudEntitySet.Remove(t),
      this.xoi.delete(i),
      (t = this.woi.get(s))) &&
      t.delete(i);
  }
  T9e(t) {
    this.I9e();
    t = t.Entity.GetComponent(185);
    this.o9e = t.ListenForTagAddOrRemove(
      1996802261,
      this.n9e,
      MonsterCursorHandle._$e,
    );
  }
  I9e() {
    this.o9e?.EndTask();
  }
  Woi() {
    return !(this.HudEntitySet.Num() <= 0 || !this.r9e || (this.ari(), 0));
  }
  ari() {
    TimerSystem_1.TimerSystem.Has(this.qoi) ||
      (this.qoi = TimerSystem_1.TimerSystem.Forever(this.Joi, this.boi));
  }
  Xoi() {
    TimerSystem_1.TimerSystem.Has(this.qoi) &&
      (TimerSystem_1.TimerSystem.Remove(this.qoi), (this.qoi = void 0));
  }
  Zoi(t) {
    for (const s of this.HudEntitySet.GetAll())
      if ((this.hri(s, t), this.Goi.size >= this.Boi)) break;
    this.lri(this.Goi);
  }
  eri(t) {
    for (const s of this.xoi)
      if ((this.hri(s, t), this.Goi.size >= this.Boi))
        return this.lri(this.Goi), !0;
    return !1;
  }
  tri(s) {
    for (let t = 2; 1 <= t; t--) {
      var i = this.woi.get(t);
      if (i && !(i.size <= 0))
        for (const e of i)
          if ((this.hri(e, s), this.Goi.size >= this.Boi))
            return this.lri(this.Goi), !0;
    }
    return !1;
  }
  iri(i) {
    let e = 0;
    var r = this.HudEntitySet.GetAll(),
      h = this.HudEntitySet.Num();
    for (let s = 0; s < h; s++) {
      var o = r[(e = s)].GetDistanceSquaredTo(i);
      for (let t = s + 1; t < h; t++)
        r[t].GetDistanceSquaredTo(i) < o && (e = t);
      e !== s && ((t = r[e]), (r[e] = r[s]), (r[s] = t));
      var t = r[s];
      if ((this.hri(t, i), this.Goi.size >= this.Boi)) break;
    }
    this.lri(this.Goi);
  }
  hri(t, s) {
    !t.IsValid() ||
      t.GetDistanceSquaredTo(s) > this.Voi ||
      !this.cri(t) ||
      this.mri(t.GetLocationProxy()) ||
      this.Goi.add(t.GetId());
  }
  cri(t) {
    return !!t.ContainsTagById(1996802261) && !t.ContainsTagById(1963731483);
  }
  mri(t) {
    return this.doi.CheckPositionInScreen(
      t,
      this.doi.CameraAdjustController.CheckInScreenMinX,
      this.doi.CameraAdjustController.CheckInScreenMaxX,
      this.doi.CameraAdjustController.CheckInScreenMinY,
      this.doi.CameraAdjustController.CheckInScreenMaxY,
    );
  }
  lri(t) {
    var s,
      i,
      e = [];
    for (const h of this.Poi.values()) {
      var r = h.GetEntityId();
      t.has(r) ||
        (h.Deactivate(), h.SetActive(!1), e.push(r), this.Uoi.push(h));
    }
    for (const o of e) this.Poi.delete(o);
    for (const n of t)
      this.gri(n) ||
        ((s = this.fri()) &&
          ((i = this.HudEntitySet.GetByEntityId(n)), this.pri(i, s)));
  }
  pri(t, s) {
    var i;
    s &&
      ((i = t.GetId()), s.GetEntityId() !== i) &&
      (s.Activate(t), this.Poi.set(i, s));
  }
  Koi(t) {
    var s;
    t?.IsValid() &&
      ((t = t.GetId()), (s = this.gri(t))) &&
      s.IsValid() &&
      (s.Deactivate(), s.SetActive(!1), this.Poi.delete(t), this.Uoi.push(s));
  }
  Yoi() {
    for (const t of this.Poi.values())
      t.IsValid() && (t.Deactivate(), t.SetActive(!1), this.Uoi.push(t));
    this.Poi.clear();
  }
  gri(t) {
    return this.Poi.get(t);
  }
  fri() {
    return this.Uoi.pop();
  }
  xXe() {
    return this.coi.ActorLocationProxy;
  }
  Hoi(t) {
    var s;
    return (
      !!ObjectSystem_1.ObjectSystem.IsValid(t) &&
      !!(t = t.GetComponent(0)) &&
      "Monster" === t.GetBaseInfo()?.Category?.MainType &&
      ((s = t.GetEntityCamp()),
      2 === CampUtils_1.CampUtils.GetCampRelationship(s, 0)) &&
      void 0 !== (s = t.GetMonsterMatchType()) &&
      3 !== s
    );
  }
}
((exports.MonsterCursorHandle = MonsterCursorHandle).zoi = void 0),
  (MonsterCursorHandle.Cri = void 0),
  (MonsterCursorHandle.dri = void 0),
  (MonsterCursorHandle._ri = void 0),
  (MonsterCursorHandle.GetTargetInfo2StatObject = void 0),
  (MonsterCursorHandle._$e = void 0);
//# sourceMappingURL=MonsterCursorHandle.js.map
