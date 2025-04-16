"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TreasureHuntModel = void 0);
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  Global_1 = require("../../Global"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  NEARBY_TRACK_DIST_DEFAULT = 2e3;
class TreasureHuntModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.pHl = void 0),
      (this.vHl = void 0),
      (this.yHl = !1),
      (this.fHl = 0),
      (this.PWl = NEARBY_TRACK_DIST_DEFAULT),
      (this.hSc = void 0),
      (this.SHl = (e, t) => e.DistSquared - t.DistSquared);
  }
  OnInit() {
    var e = CommonParamById_1.configCommonParamById.GetIntArrayConfig(
      "TreasureCompassTrackInfo",
    );
    return e && 0 < e.length && (this.PWl = e[0]), !0;
  }
  OnLeaveLevel() {
    return (
      (this.pHl = void 0),
      (this.vHl = void 0),
      (this.yHl = !1),
      (this.fHl = 0),
      !(this.hSc = void 0)
    );
  }
  IsCompassActive() {
    return this.yHl;
  }
  SetCompassActive(e) {
    var t = e !== this.yHl;
    (this.yHl = e),
      t &&
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnUpdateCompassActive,
          e,
        );
  }
  AddCompassTrack(e) {
    var t, r, s, i, o, a, n;
    this.pHl || (this.pHl = new Map()),
      this.pHl.has(e) ||
        ((t = (o = EntitySystem_1.EntitySystem.Get(e))
          ?.GetComponent(0)
          ?.GetLocation()),
        (o = o?.GetComponent(158)),
        t &&
          o &&
          ((n = Vector_1.Vector.Create(0, 0, 0)).FromUeVector(t),
          (t = o.ShowRange),
          (r = o.CompassNearbyShowRange || this.PWl),
          (s = o.CompassNearbyHideRange || this.PWl),
          (i = 0.5 * (t + r)),
          (o = o.CompassDetectVehicleTypes),
          (a = !!this.hSc && !!o?.includes(this.hSc)),
          (n = {
            EntityId: e,
            Location: n,
            Range: t,
            RangeSquared: Math.pow(t, 2),
            NearbyTrackShowRange: r,
            NearbyTrackShowRangeSquared: Math.pow(r, 2),
            NearbyTrackHideRange: s,
            NearbyTrackHideRangeSquared: Math.pow(s, 2),
            HighlightRange: i,
            HighlightRangeSquared: Math.pow(i, 2),
            DetectVehicleTypes: o,
            IsEnableCompassTracking: a,
          }),
          this.pHl.set(e, n),
          (this.vHl = [...this.pHl.values()]),
          ControllerHolder_1.ControllerHolder.TreasureHuntController.SetCompassActive(
            !0,
            1,
          )));
  }
  RemoveCompassTrack(e) {
    this.pHl &&
      this.pHl.has(e) &&
      (this.pHl.delete(e),
      (this.vHl = [...this.pHl.values()]),
      0 === this.vHl.length) &&
      ControllerHolder_1.ControllerHolder.TreasureHuntController.SetCompassActive(
        !1,
        1,
      );
  }
  IsEnableCompassTrack(e) {
    return "Gongduola" === e || "FishingBoat" === e;
  }
  IsInTracking(e) {
    return !!this.pHl?.has(e);
  }
  SetNearbyTrack(e) {
    this.fHl = e;
  }
  ClearNearbyTrack() {
    this.fHl = 0;
  }
  GetTreasureMap() {
    return this.pHl;
  }
  GetTreasureList(e = !0) {
    if (this.pHl && this.vHl) {
      var t =
        Global_1.Global.BaseCharacter?.CharacterActorComponent
          ?.ActorLocationProxy;
      if (t) {
        for (const r of this.vHl)
          (r.DistSquared = Vector_1.Vector.DistSquaredXY(t, r.Location)),
            (r.IsNearbyTracking = this.fHl === r.EntityId);
        return e && this.vHl.sort(this.SHl), this.vHl;
      }
    }
  }
  SetDetectVehicleType(e) {
    if (((this.hSc = e), this.vHl))
      for (const t of this.vHl)
        t.IsEnableCompassTracking = !!e && !!t.DetectVehicleTypes?.includes(e);
  }
}
exports.TreasureHuntModel = TreasureHuntModel;
//# sourceMappingURL=TreasureHuntModel.js.map
