"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TrackedMarksView = void 0);
const Stats_1 = require("../../../../Core/Common/Stats");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const MarkItemUtil_1 = require("../../Map/Marks/MarkItemUtil");
const BattleChildView_1 = require("./BattleChildView/BattleChildView");
const TrackedMark_1 = require("./TrackedMark");
class TrackedMarksView extends BattleChildView_1.BattleChildView {
  constructor() {
    super(...arguments),
      (this.Sct = new Map()),
      (this.Kdt = !1),
      (this.Qdt = (t) => {
        if (
          MarkItemUtil_1.MarkItemUtil.IsTrackPointedMarkInCurrentDungeon(
            t,
            !0,
          ) &&
          !MarkItemUtil_1.MarkItemUtil.IsHideTrackInView(t)
        ) {
          let e = this.Sct.get(t.TrackSource);
          let i;
          e || ((e = new Map()), this.Sct.set(t.TrackSource, e)),
            e.has(t.Id) ||
              ((i = new TrackedMark_1.TrackedMark(t)),
              e.set(t.Id, i),
              i.Initialize("UiItem_Mark_Prefab", this.RootItem)),
            (this.Kdt = !0);
        }
      }),
      (this.Xdt = (e) => {
        let t;
        const i = this.Sct.get(e.TrackSource);
        i &&
          ((t = i.get(e.Id)) && (t.Destroy(), i.delete(e.Id)), (this.Kdt = !0));
      }),
      (this.$dt = (e, t, i) => {
        var e = this.Sct.get(e);
        e && (e = e.get(t)) && e.UpdateTrackTarget(i);
      }),
      (this.Ydt = (e, t, i) => {
        var e = this.Sct.get(e);
        e && (e = e.get(t)) && e.SetVisibleByOccupied(i);
      });
  }
  Initialize(e) {
    super.Initialize(e), this.uje();
  }
  Reset() {
    super.Reset(), this.Lct();
    for (const e of this.Sct.values()) for (const t of e.values()) t.Destroy();
    this.Sct.clear();
  }
  OnShowBattleChildViewPanel() {
    for (const e of this.Sct.values()) for (const t of e.values()) t.OnUiShow();
  }
  Update(e) {
    ModelManager_1.ModelManager.TrackModel.ClearGroupMinDistance();
    for (const s of this.Sct.values())
      for (const r of s.values()) r.UpdateTrackDistance();
    for (const [t, i] of this.Sct)
      for (const n of i.values())
        this.Kdt &&
          (this.IsTrackTargetRepeat(n, t)
            ? (n.ShouldShowTrackMark = !1)
            : (n.ShouldShowTrackMark = !0)),
          n.Update(e);
    this.Kdt = !1;
  }
  IsTrackTargetRepeat(e, t) {
    for (const [i, s] of this.Sct)
      for (const r of s.values())
        if (e.TrackTarget === r.TrackTarget && t < i) return !0;
    return !1;
  }
  OnHideBattleChildViewPanel() {
    for (const e of this.Sct.values()) for (const t of e.values()) t.OnUiHide();
  }
  uje() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TrackMark, this.Qdt),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.UnTrackMark,
        this.Xdt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.UpdateTrackTarget,
        this.$dt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SetTrackMarkOccupied,
        this.Ydt,
      );
  }
  Lct() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.TrackMark,
      this.Qdt,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.UnTrackMark,
        this.Xdt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.UpdateTrackTarget,
        this.$dt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SetTrackMarkOccupied,
        this.Ydt,
      );
  }
  DestroyOverride() {
    return !0;
  }
}
(exports.TrackedMarksView = TrackedMarksView).ght = void 0;
// # sourceMappingURL=TrackedMarksView.js.map
