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
      (this.Pri = []),
      (this.xri = new Map()),
      (this.wri = new Set()),
      (this.Bri = new Map()),
      (this.bri = 0),
      (this.qri = 0),
      (this.Gri = void 0),
      (this.CurrentEntity = void 0),
      (this.dri = void 0),
      (this.f7e = void 0),
      (this.p7e = !1),
      (this.Nri = new Set()),
      (this.Ori = 0),
      (this.kri = 0),
      (this.Fri = 0),
      (this.Vri = 0),
      (this.Hri = 0),
      (this.gri = void 0),
      (this.GUe = (t, s, e) => {
        this.jri(s.Entity) &&
          (this.Wri(s.Entity),
          this.Kri(),
          EventSystem_1.EventSystem.AddWithTargetUseHoldKey(
            this,
            s,
            EventDefine_1.EEventName.RemoveEntity,
            this.zpe,
          ));
      }),
      (this.zpe = (t, s) => {
        var e;
        this.jri(s.Entity) &&
          (EventSystem_1.EventSystem.RemoveWithTargetUseKey(
            this,
            s,
            EventDefine_1.EEventName.RemoveEntity,
            this.zpe,
          ),
          (e = this.HudEntitySet.GetByEntity(s.Entity)) &&
            (this.Qri(e), this.Xri(s.Entity)),
          this.HudEntitySet.Num() <= 0) &&
          this.$ri();
      }),
      (this.fHe = (t, s) => {
        (this.CurrentEntity = t),
          (this.dri = this.CurrentEntity.Entity.GetComponent(1)),
          this.O7e(t);
      }),
      (this.Yri = (t, s) => {
        s ? this.wri.add(t) : this.wri.delete(t);
      }),
      (this.v7e = (t, s) => {
        (this.p7e = s) ? this.Kri() : (this.Jri(), this.$ri());
      }),
      (this.zri = () => {
        var t;
        this.CurrentEntity?.Valid &&
          (MonsterCursorHandle.Zri.Start(),
          this.Nri.clear(),
          (t = this.j$e()),
          this.HudEntitySet.Num() <= this.bri
            ? this.eni(t)
            : this.tni(t) || this.ini(t) || this.oni(t),
          MonsterCursorHandle.Zri.Stop());
      });
  }
  OnInitialize() {
    var t;
    this.InitCursorAxis(),
      (this.bri = CommonParamById_1.configCommonParamById.GetIntConfig(
        "MonsterCursorMaxCount",
      )),
      (this.qri = CommonParamById_1.configCommonParamById.GetIntConfig(
        "MonsterCursorRefreshInterval",
      )),
      (this.Hri = CommonParamById_1.configCommonParamById.GetIntConfig(
        "MonsterCursorMaxDistance",
      )),
      (this.Ori = CommonParamById_1.configCommonParamById.GetIntConfig(
        "MonsterCursorMaxScale",
      )),
      (this.kri = CommonParamById_1.configCommonParamById.GetIntConfig(
        "MonsterCursorMinScale",
      )),
      (this.Fri = CommonParamById_1.configCommonParamById.GetIntConfig(
        "MonsterCursorMaxScaleDistance",
      )),
      (this.Vri = CommonParamById_1.configCommonParamById.GetIntConfig(
        "MonsterCursorMinScaleDistance",
      )),
      (this.gri =
        CameraController_1.CameraController.FightCamera.GetComponent(5)),
      (this.CurrentEntity =
        ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity),
      this.CurrentEntity?.Valid &&
        ((this.dri = this.CurrentEntity.Entity.GetComponent(1)),
        (t = this.CurrentEntity.Entity.GetComponent(190)),
        (this.p7e = t.HasTag(1996802261)),
        this.NewHudEntitySet(),
        this.rni(),
        this.nni(),
        this.O7e(this.CurrentEntity),
        this.Kri() || this.$ri());
  }
  OnDestroyed() {
    (this.CurrentEntity = void 0),
      (this.dri = void 0),
      this.wri.clear(),
      this.Bri.clear(),
      this.N7e(),
      this.$ri(),
      this.sni();
  }
  OnShowHud() {
    super.OnShowHud();
    for (const t of this.Pri) t.SetActive(!1);
  }
  OnHideHud() {
    super.OnHideHud();
  }
  OnTick(t) {
    if (
      this.IsHudVisible &&
      this.p7e &&
      ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Valid
    ) {
      var s,
        e,
        r = this.j$e();
      for (const i of this.xri.values())
        i.IsValid() &&
          (e = i.GetHudEntityData()).IsValid() &&
          ((s = e.GetLocation()),
          (s = this.GetInEllipsePosition(r, s)[0]),
          (e = e.GetDistanceSquaredTo(r)),
          (e = MathUtils_1.MathUtils.RangeClamp(
            e,
            this.Vri,
            this.Fri,
            this.Ori,
            this.kri,
          )),
          i.Refresh(e / CommonDefine_1.PERCENTAGE_FACTOR, s),
          i.GetActive() || i.SetActive(!0));
    }
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AddEntity, this.GUe),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnChangeRole,
        this.fHe,
      );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.AddEntity,
      this.GUe,
    ),
      EventSystem_1.EventSystem.RemoveAllTargetUseKey(this),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnChangeRole,
        this.fHe,
      );
  }
  rni() {
    var t = ModelManager_1.ModelManager.CreatureModel.GetAllEntities();
    if (t)
      for (const s of t) s.IsInit && this.jri(s.Entity) && this.Wri(s.Entity);
  }
  nni() {
    for (let t = 0; t < this.bri; t++) this.ani();
  }
  sni() {
    this.DestroyAllHudUnit(), (this.Pri.length = 0), this.xri.clear();
  }
  ani() {
    this.NewHudUnit(
      MonsterCursorUnit_1.MonsterCursorUnit,
      "UiItem_MonCursor_Prefab",
    ).then(
      (t) => {
        t.SetActive(!1), this.Pri.push(t);
      },
      () => {},
    );
  }
  Wri(t) {
    var t = this.HudEntitySet.Add(t),
      s =
        (t.SetComponent(0),
        t.SetComponent(1),
        t.SetComponent(190),
        t.ListenForTagCountChanged(-1371021686, this.Yri),
        t.GetMonsterMatchType());
    let e = this.Bri.get(s);
    e || ((e = new Set()), this.Bri.set(s, e)), e.add(t);
  }
  Xri(t) {
    var s,
      e = this.HudEntitySet.GetByEntity(t);
    e &&
      ((s = e.GetMonsterMatchTypeNumber()),
      this.HudEntitySet.Remove(t),
      this.wri.delete(e),
      (t = this.Bri.get(s))) &&
      t.delete(e);
  }
  O7e(t) {
    this.N7e();
    t = t.Entity.GetComponent(190);
    this.f7e = t.ListenForTagAddOrRemove(
      1996802261,
      this.v7e,
      MonsterCursorHandle.SYe,
    );
  }
  N7e() {
    this.f7e?.EndTask();
  }
  Kri() {
    return !(this.HudEntitySet.Num() <= 0 || !this.p7e || (this.hni(), 0));
  }
  hni() {
    TimerSystem_1.TimerSystem.Has(this.Gri) ||
      (this.Gri = TimerSystem_1.TimerSystem.Forever(this.zri, this.qri));
  }
  $ri() {
    TimerSystem_1.TimerSystem.Has(this.Gri) &&
      (TimerSystem_1.TimerSystem.Remove(this.Gri), (this.Gri = void 0));
  }
  eni(t) {
    for (const s of this.HudEntitySet.GetAll())
      if ((this.lni(s, t), this.Nri.size >= this.bri)) break;
    this._ni(this.Nri);
  }
  tni(t) {
    for (const s of this.wri)
      if ((this.lni(s, t), this.Nri.size >= this.bri))
        return this._ni(this.Nri), !0;
    return !1;
  }
  ini(s) {
    for (let t = 2; 1 <= t; t--) {
      var e = this.Bri.get(t);
      if (e && !(e.size <= 0))
        for (const r of e)
          if ((this.lni(r, s), this.Nri.size >= this.bri))
            return this._ni(this.Nri), !0;
    }
    return !1;
  }
  oni(e) {
    let r = 0;
    var i = this.HudEntitySet.GetAll(),
      o = this.HudEntitySet.Num();
    for (let s = 0; s < o; s++) {
      var t = i[(r = s)],
        n = (MonsterCursorHandle.uni.Start(), t.GetDistanceSquaredTo(e));
      MonsterCursorHandle.uni.Stop();
      for (let t = s + 1; t < o; t++) {
        var h = i[t],
          h =
            (MonsterCursorHandle.GetTargetInfo2StatObject.Start(),
            h.GetDistanceSquaredTo(e));
        MonsterCursorHandle.GetTargetInfo2StatObject.Stop(), h < n && (r = t);
      }
      r !== s && ((t = i[r]), (i[r] = i[s]), (i[s] = t));
      t = i[s];
      if ((this.lni(t, e), this.Nri.size >= this.bri)) break;
    }
    this._ni(this.Nri);
  }
  lni(t, s) {
    !t.IsValid() ||
      t.GetDistanceSquaredTo(s) > this.Hri ||
      !this.cni(t) ||
      this.mni(t.GetLocationProxy()) ||
      this.Nri.add(t.GetId());
  }
  cni(t) {
    return (
      MonsterCursorHandle.dni.Start(),
      !t.ContainsTagById(1996802261) || t.ContainsTagById(1963731483)
        ? (MonsterCursorHandle.dni.Stop(), !1)
        : (MonsterCursorHandle.dni.Stop(), !0)
    );
  }
  mni(t) {
    MonsterCursorHandle.Cni.Start();
    t = this.gri.CheckPositionInScreen(
      t,
      this.gri.CameraAdjustController.CheckInScreenMinX,
      this.gri.CameraAdjustController.CheckInScreenMaxX,
      this.gri.CameraAdjustController.CheckInScreenMinY,
      this.gri.CameraAdjustController.CheckInScreenMaxY,
    );
    return MonsterCursorHandle.Cni.Stop(), t;
  }
  _ni(t) {
    var s,
      e,
      r = [];
    for (const o of this.xri.values()) {
      var i = o.GetEntityId();
      t.has(i) ||
        (o.Deactivate(), o.SetActive(!1), r.push(i), this.Pri.push(o));
    }
    for (const n of r) this.xri.delete(n);
    for (const h of t)
      this.gni(h) ||
        ((s = this.fni()) &&
          ((e = this.HudEntitySet.GetByEntityId(h)), this.pni(e, s)));
  }
  pni(t, s) {
    var e;
    s &&
      ((e = t.GetId()), s.GetEntityId() !== e) &&
      (s.Activate(t), this.xri.set(e, s));
  }
  Qri(t) {
    var s;
    t?.IsValid() &&
      ((t = t.GetId()), (s = this.gni(t))) &&
      s.IsValid() &&
      (s.Deactivate(), s.SetActive(!1), this.xri.delete(t), this.Pri.push(s));
  }
  Jri() {
    for (const t of this.xri.values())
      t.IsValid() && (t.Deactivate(), t.SetActive(!1), this.Pri.push(t));
    this.xri.clear();
  }
  gni(t) {
    return this.xri.get(t);
  }
  fni() {
    return this.Pri.pop();
  }
  j$e() {
    return this.dri.ActorLocationProxy;
  }
  jri(t) {
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
((exports.MonsterCursorHandle = MonsterCursorHandle).Zri = Stats_1.Stat.Create(
  "[MonsterCursor]RefreshMonsterCursor",
)),
  (MonsterCursorHandle.Cni = Stats_1.Stat.Create("[MonsterCursor]IsInScreen")),
  (MonsterCursorHandle.dni = Stats_1.Stat.Create(
    "[MonsterCursor]CheckMonsterCursorTagStatObject",
  )),
  (MonsterCursorHandle.uni = Stats_1.Stat.Create(
    "[MonsterCursor]GetTargetInfo1StatObject",
  )),
  (MonsterCursorHandle.GetTargetInfo2StatObject = Stats_1.Stat.Create(
    "[MonsterCursor]GetTargetInfo2StatObject",
  )),
  (MonsterCursorHandle.SYe = Stats_1.Stat.Create("[MonsterCursor]ListenTag"));
//# sourceMappingURL=MonsterCursorHandle.js.map
