"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TimeTrackControlModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  ModelManager_1 = require("../../Manager/ModelManager");
class TimeTrackControlModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.zxe = void 0),
      (this.Zxe = void 0),
      (this.ewe = void 0),
      (this.twe = 0),
      (this.iwe = 0),
      (this.owe = !1),
      (this.rwe = 0),
      (this.FBn = 0),
      (this.nwe = void 0),
      (this.swe = void 0);
  }
  get CreatureDataId() {
    return this.twe;
  }
  get ControlPoint() {
    return this.iwe;
  }
  get CanUpdated() {
    return this.owe;
  }
  set CanUpdated(t) {
    this.owe = t;
  }
  get RefEntityId() {
    return this.rwe;
  }
  set RefEntityId(t) {
    this.rwe = t;
  }
  get RefTrueEntityId() {
    return this.FBn;
  }
  set RefTrueEntityId(t) {
    this.FBn = t;
  }
  get ControllerEntity() {
    return this.zxe;
  }
  SetCurrentTimeTrackControl(t, i) {
    (this.zxe = ModelManager_1.ModelManager.CreatureModel.GetEntity(t)),
      (this.Zxe = i);
    t = this.zxe?.Entity.GetComponent(0);
    (this.twe = t?.GetCreatureDataId() ?? 0), this.awe(), (this.owe = !0);
  }
  awe() {
    var t;
    this.zxe &&
      void 0 !== this.Zxe &&
      (t = this.zxe.Entity.GetComponent(121)) &&
      (this.ewe = t.GetTimeTrackControlConfig(this.Zxe));
  }
  GetConfigStatesCounts() {
    if (this.ewe)
      for (const t of this.ewe.ControlConfigs) return t.ControlPoints?.length;
    return 0;
  }
  GetConfigSegmentTime() {
    return this.ewe ? (this.ewe.SegmentTime ?? 0.5) : 0.5;
  }
  InitControlInfo(t) {
    (this.iwe = t.nps), (this.nwe = t.vGs), this.UpdatePointsUsable();
  }
  UpdateControlInfo(t) {
    (this.iwe = t), this.UpdatePointsUsable();
  }
  UpdatePointsUsable() {
    var i = this.GetConfigStatesCounts();
    if (i) {
      this.swe ? this.swe.fill(!1) : (this.swe = new Array(i).fill(!1));
      var s = this.nwe[this.iwe];
      this.swe[this.iwe] = (s.gGs || s.fGs) ?? !1;
      for (let t = this.iwe - 1; 0 <= t; t--)
        s.gGs && this.swe[t + 1]
          ? (this.swe[t] = this.nwe[t + 1].gGs ?? !1)
          : (this.swe[t] = !1);
      for (let t = this.iwe + 1; t < i; t++)
        s.fGs && this.swe[t - 1]
          ? (this.swe[t] = this.nwe[t - 1].fGs ?? !1)
          : (this.swe[t] = !1);
    }
  }
  IsControlPointUsable(t) {
    return !(!this.swe?.length || t > this.swe.length - 1) && this.swe[t];
  }
}
exports.TimeTrackControlModel = TimeTrackControlModel;
//# sourceMappingURL=TimeTrackControlModel.js.map
