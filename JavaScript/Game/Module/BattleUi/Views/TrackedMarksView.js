"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TrackedMarksView = void 0);
const Stats_1 = require("../../../../Core/Common/Stats"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  MarkItemUtil_1 = require("../../Map/Marks/MarkItemUtil"),
  TowerDefenceController_1 = require("../../TowerDefence/TowerDefenceController"),
  BattleChildView_1 = require("./BattleChildView/BattleChildView"),
  TrackedMark_1 = require("./TrackedMark"),
  TrackedMarkForTower_1 = require("./TrackedMarkForTower");
class TrackedMarksView extends BattleChildView_1.BattleChildView {
  constructor() {
    super(...arguments),
      (this.wmt = new Map()),
      (this.rgt = !1),
      (this.ngt = (r) => {
        if (
          MarkItemUtil_1.MarkItemUtil.IsTrackPointedMarkInCurrentDungeon(
            r,
            !0,
          ) &&
          !MarkItemUtil_1.MarkItemUtil.IsHideTrackInView(r)
        ) {
          let t = this.wmt.get(r.TrackSource);
          if (
            (t || ((t = new Map()), this.wmt.set(r.TrackSource, t)),
            !t.has(r.Id))
          ) {
            let e = void 0;
            (e = new (
              TowerDefenceController_1.TowerDefenseController.CheckIsTowerEntity(
                r,
              )
                ? TrackedMarkForTower_1.TrackedMarkForTower
                : TrackedMark_1.TrackedMark
            )(r)),
              t.set(r.Id, e),
              e.Initialize(this.RootItem);
          }
          this.rgt = !0;
        }
      }),
      (this.sgt = (e) => {
        var t,
          r = this.wmt.get(e.TrackSource);
        r &&
          ((t = r.get(e.Id)) && (t.Destroy(), r.delete(e.Id)), (this.rgt = !0));
      }),
      (this.agt = (e, t, r) => {
        var e = this.wmt.get(e);
        e && (e = e.get(t)) && e.UpdateTrackTarget(r);
      }),
      (this.hgt = (e, t, r) => {
        var e = this.wmt.get(e);
        e && (e = e.get(t)) && e.SetVisibleByOccupied(r);
      });
  }
  Initialize(e) {
    super.Initialize(e), this.yWe();
  }
  Reset() {
    super.Reset(), this.Nmt();
    for (const e of this.wmt.values()) for (const t of e.values()) t.Destroy();
    this.wmt.clear();
  }
  OnShowBattleChildViewPanel() {
    for (const e of this.wmt.values()) for (const t of e.values()) t.OnUiShow();
  }
  Update(e) {
    TrackedMarksView.Ult.Start(),
      ModelManager_1.ModelManager.TrackModel.ClearGroupMinDistance();
    for (const i of this.wmt.values())
      for (const s of i.values()) s.UpdateTrackDistance();
    TrackedMarksView.Ult.Stop();
    for (var [t, r] of this.wmt)
      for (const n of r.values())
        this.rgt &&
          (this.IsTrackTargetRepeat(n, t)
            ? (n.ShouldShowTrackMark = !1)
            : (n.ShouldShowTrackMark = !0)),
          n.Update(e);
    this.rgt = !1;
  }
  IsTrackTargetRepeat(e, t) {
    for (var [r, i] of this.wmt)
      for (const s of i.values())
        if (e.TrackTarget === s.TrackTarget && t < r) return !0;
    return !1;
  }
  OnHideBattleChildViewPanel() {
    for (const e of this.wmt.values()) for (const t of e.values()) t.OnUiHide();
  }
  yWe() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TrackMark, this.ngt),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.UnTrackMark,
        this.sgt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.UpdateTrackTarget,
        this.agt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SetTrackMarkOccupied,
        this.hgt,
      );
  }
  Nmt() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.TrackMark,
      this.ngt,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.UnTrackMark,
        this.sgt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.UpdateTrackTarget,
        this.agt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SetTrackMarkOccupied,
        this.hgt,
      );
  }
  DestroyOverride() {
    return !0;
  }
}
(exports.TrackedMarksView = TrackedMarksView).Ult = Stats_1.Stat.Create(
  "[BattleView]UpdateTrackDistance",
);
//# sourceMappingURL=TrackedMarksView.js.map
