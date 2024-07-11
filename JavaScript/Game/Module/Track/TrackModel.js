"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TrackModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager");
class TrackModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.SDo = void 0),
      (this.EDo = void 0),
      (this.yDo = void 0),
      (this.DefaultTrackHideDis = 0);
  }
  OnInit() {
    return (
      (this.SDo = new Map()),
      (this.EDo = new Map()),
      (this.yDo = new Map()),
      (this.DefaultTrackHideDis = parseInt(
        ConfigManager_1.ConfigManager.QuestNewConfig.GetGlobalConfig(
          "TrackMarkHideDis",
        ),
      )),
      !0
    );
  }
  OnClear() {
    return (
      this.SDo && (this.SDo.clear(), (this.SDo = void 0)),
      this.EDo && (this.EDo.clear(), (this.EDo = void 0)),
      this.yDo && (this.yDo.clear(), (this.yDo = void 0)),
      !0
    );
  }
  OnLeaveLevel() {
    return !0;
  }
  AddTrackData(e) {
    let t = this.GetTracksByType(e.TrackSource);
    t || ((t = new Map()), this.SDo.set(e.TrackSource, t)),
      e.TrackHideDis || (e.TrackHideDis = this.DefaultTrackHideDis),
      t.set(e.Id, e),
      this.IDo(e);
  }
  RemoveTrackData(e, t) {
    var i,
      e = this.GetTracksByType(e);
    e && ((i = e.get(t)), e.delete(t), this.TDo(i));
  }
  ClearTrackData() {
    this.SDo.clear(),
      this.EDo.clear(),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ClearTrackMark);
  }
  IDo(t) {
    if (t && void 0 !== t.ShowGroupId) {
      let e = this.EDo.get(t.ShowGroupId);
      (e = e || new Map()).set(t.Id, t);
    }
  }
  TDo(e) {
    var t;
    e &&
      void 0 !== e.ShowGroupId &&
      (t = this.EDo.get(e.ShowGroupId)) &&
      t.delete(e.Id);
  }
  IsTargetTracking(e) {
    let t = void 0,
      i = void 0;
    for (var [r, s] of this.SDo)
      for (var [, a] of s)
        a.TrackTarget === e &&
          (t || ((t = r), (i = a)), r > t) &&
          ((i = a), (t = r));
    return i;
  }
  GetTrackData(e, t) {
    e = this.GetTracksByType(e);
    if (e) return e.get(t);
  }
  UpdateTrackData(e, t, i) {
    var r = this.GetTrackData(e, t);
    r &&
      ((r.TrackTarget = i),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.UpdateTrackTarget,
        e,
        t,
        i,
      ));
  }
  GetTracksByType(e) {
    return this.SDo.get(e);
  }
  IsTracking(e, t) {
    return (
      void 0 !== e &&
      void 0 !== t &&
      !!(e = this.GetTracksByType(e)) &&
      e.has(t)
    );
  }
  UpdateGroupMinDistance(e, t) {
    var i;
    this.yDo && e && (!(i = this.yDo.get(e)) || t <= i) && this.yDo.set(e, t);
  }
  CanShowInGroup(e, t) {
    return !this.yDo || !e || !(e = this.yDo.get(e)) || t <= e;
  }
  ClearGroupMinDistance() {
    this.yDo?.clear();
  }
}
exports.TrackModel = TrackModel;
//# sourceMappingURL=TrackModel.js.map
