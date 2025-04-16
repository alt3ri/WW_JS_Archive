"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TrackedMarksView = void 0);
const Stats_1 = require("../../../../Core/Common/Stats"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  MarkItemUtil_1 = require("../../Map/Marks/MarkItemUtil"),
  MapLogger_1 = require("../../Map/Misc/MapLogger"),
  TowerDefenceController_1 = require("../../TowerDefence/TowerDefenceController"),
  BattleChildView_1 = require("./BattleChildView/BattleChildView"),
  TrackedMark_1 = require("./TrackedMark"),
  TrackedMarkForTower_1 = require("./TrackedMarkForTower");
class TrackedMarksView extends BattleChildView_1.BattleChildView {
  constructor() {
    super(...arguments),
      (this.wmt = new Map()),
      (this.rgt = !1),
      (this.ngt = (i) => {
        if (MarkItemUtil_1.MarkItemUtil.CanShowTrackMark(i)) {
          let r = this.wmt.get(i.TrackSource);
          if (
            (r || ((r = new Map()), this.wmt.set(i.TrackSource, r)),
            !r.has(i.Id))
          ) {
            let e = void 0,
              t =
                ((e = new (
                  TowerDefenceController_1.TowerDefenseController.CheckIsTowerEntity(
                    i,
                  )
                    ? TrackedMarkForTower_1.TrackedMarkForTower
                    : TrackedMark_1.TrackedMark
                )(i)),
                r.set(i.Id, e),
                e.Initialize(this.RootItem),
                ModelManager_1.ModelManager.BattleUiModel.TrackDatas.get(
                  i.TrackSource,
                ));
            t ||
              ((t = new Map()),
              ModelManager_1.ModelManager.BattleUiModel.TrackDatas.set(
                i.TrackSource,
                t,
              )),
              t.set(i.Id, i);
          }
          this.rgt = !0;
        } else
          MapLogger_1.MapLogger.Debug(
            63,
            "标记系统-追踪->TackedMarksView.TrackMark,追踪标记不满足显示条件",
            ["trackData", i],
          );
      }),
      (this.sgt = (e) => {
        var t,
          r = this.wmt.get(e.TrackSource);
        r &&
          ((t = r.get(e.Id)) &&
            (t.Destroy(),
            r.delete(e.Id),
            (t = ModelManager_1.ModelManager.BattleUiModel.TrackDatas.get(
              e.TrackSource,
            ))) &&
            t.delete(e.Id),
          (this.rgt = !0));
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
    if (
      (super.Initialize(e),
      this.yWe(),
      ModelManager_1.ModelManager.BattleUiModel.TrackDatas)
    )
      for (var [, t] of ModelManager_1.ModelManager.BattleUiModel.TrackDatas)
        for (var [, r] of t) this.ngt(r);
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
      for (const a of i.values()) a.UpdateTrackDistance();
    TrackedMarksView.Ult.Stop();
    for (var [t, r] of this.wmt)
      for (const s of r.values())
        this.rgt &&
          (this.IsTrackTargetRepeat(s, t)
            ? (s.ShouldShowTrackMark = !1)
            : (s.ShouldShowTrackMark = !0)),
          s.Update(e);
    this.rgt = !1;
  }
  IsTrackTargetRepeat(e, t) {
    for (var [r, i] of this.wmt)
      for (const a of i.values())
        if (e.TrackTarget === a.TrackTarget && t < r) return !0;
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
