"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TutorialModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TutorialDefine_1 = require("./TutorialDefine");
class TutorialModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.RewardInfo = void 0),
      (this.NDo = new Map()),
      (this.ODo = new Map());
  }
  OnInit() {
    for (const t in TutorialDefine_1.ETutorialType) {
      const e = Number(t);
      isNaN(e) || this.NDo.set(e, new Map());
    }
    return !0;
  }
  InitTutorialTotalData() {
    for (const r of Array.from(this.ODo.values())) {
      const e = new TutorialDefine_1.TutorialSaveData();
      const t =
        ((e.TimeStamp = r.TimeStamp),
        (e.TutorialId = r.TutorialId),
        (e.HasRedDot = r.HasRedDot),
        e.TutorialData.TutorialType);
      const i = e.TutorialData.Id;
      this.NDo.get(t).set(i, e),
        this.NDo.get(TutorialDefine_1.ETutorialType.All).set(i, e),
        this.ODo.set(i, e);
    }
  }
  OnClear() {
    for (const e of this.NDo.values()) e.clear();
    return this.NDo.clear(), !0;
  }
  InitUnlockTutorials(e) {
    for (const r of e) {
      const t = new TutorialDefine_1.TutorialSaveData();
      const i =
        ((t.TimeStamp = r.BRs),
        (t.TutorialId = r.Ekn),
        (t.HasRedDot = !r._bs),
        t.TutorialData.TutorialType);
      Object.values(TutorialDefine_1.ETutorialType).includes(i) &&
        (this.NDo.get(i).has(t.TutorialId) ||
          (this.NDo.get(i).set(t.TutorialId, t), this.ODo.set(t.TutorialId, t)),
        this.InvokeTutorialRedDot(t));
    }
  }
  UpdateUnlockTutorials(e) {
    const t = new TutorialDefine_1.TutorialSaveData();
    var e =
      ((t.TimeStamp = e.BRs),
      (t.TutorialId = e.Ekn),
      (t.HasRedDot = !e._bs),
      t.TutorialData.TutorialType);
    Object.values(TutorialDefine_1.ETutorialType).includes(e) &&
      !this.NDo.get(e).has(t.TutorialId) &&
      (this.NDo.get(e).set(t.TutorialId, t),
      this.NDo.get(TutorialDefine_1.ETutorialType.All).set(t.TutorialId, t),
      this.ODo.set(t.TutorialId, t),
      this.InvokeUpdateTutorials(),
      this.InvokeTutorialRedDot(t));
  }
  GetUnlockedTutorialDataByType(o) {
    let e;
    let t;
    const i = [];
    for (const n of this.NDo.get(o).values()) {
      const r = {
        IsTypeTitle: !1,
        TextId: n.TutorialData.GroupName,
        SavedData: n,
        OwnerType: o,
      };
      n.HasRedDot && this.InvokeTutorialRedDot(n), i.push(r);
    }
    if (
      (i.sort((e, t) => {
        let i, r;
        return e.SavedData.HasRedDot && !t.SavedData.HasRedDot
          ? -1
          : !e.SavedData.HasRedDot && t.SavedData.HasRedDot
            ? 1
            : (e.SavedData.HasRedDot && t.SavedData.HasRedDot) ||
                o === TutorialDefine_1.ETutorialType.All
              ? t.SavedData.TimeStamp - e.SavedData.TimeStamp
              : ((i = e.SavedData.TutorialData),
                (r = t.SavedData.TutorialData),
                e.SavedData.TimeStamp !== t.SavedData.TimeStamp
                  ? e.SavedData.TimeStamp - t.SavedData.TimeStamp
                  : i.TutorialOrder !== r.TutorialOrder
                    ? i.TutorialOrder - r.TutorialOrder
                    : i.Id - r.Id);
      }),
      o !== TutorialDefine_1.ETutorialType.All)
    )
      return i;
    let a = i.length;
    for ([e, t] of i.entries())
      if (!t.SavedData.HasRedDot) {
        a = e + TutorialDefine_1.TutorialUtils.MaxLatestTutorial;
        break;
      }
    return i.slice(0, a);
  }
  RemoveRedDotTutorialId(e) {
    this.ODo.has(e) &&
      (((e = this.ODo.get(e)).HasRedDot = !1), this.InvokeTutorialRedDot(e));
  }
  RedDotCheckIsNewTutorial(e) {
    return this.ODo.get(e)?.HasRedDot ?? !1;
  }
  InvokeUpdateTutorials() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnTutorialUpdate);
  }
  InvokeTutorialRedDot(e) {
    const t = e ? e.TutorialId : 0;
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.RedDotNewTutorial,
      t,
    ),
      e &&
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.RedDotNewTutorialType,
          TutorialDefine_1.ETutorialType.All,
        );
  }
  RedDotCheckIsNewTutorialType(e) {
    if (this.NDo.has(e))
      for (const t of this.NDo.get(e).values()) if (t.HasRedDot) return !0;
    return !1;
  }
  MakeSearchList(e, t) {
    let i = void 0;
    const r = [];
    try {
      i = new RegExp(e, "i");
    } catch (e) {
      return { ItemData: r, HasTutorial: !1 };
    }
    let o = !1;
    for (const s of Array.from(this.NDo.keys()).sort((e) => (e === t ? -1 : 1)))
      if (s !== TutorialDefine_1.ETutorialType.All) {
        const a = [];
        for (const u of this.NDo.get(s).values()) {
          let n = u.GetTutorialTitle();
          n.search(i) < 0 ||
            ((n = {
              IsTypeTitle: !1,
              TextId: u.TutorialData.GroupName,
              SavedData: u,
              Text: n.replace(
                e,
                TutorialDefine_1.TutorialUtils.AddSearchHighlight(e),
              ),
            }),
            (o = !0),
            a.push(n));
        }
        t === TutorialDefine_1.ETutorialType.All
          ? r.push(...a)
          : a.length &&
            (r.push({
              IsTypeTitle: !0,
              TextId: TutorialDefine_1.TutorialUtils.GetTutorialTypeTxt(s),
            }),
            r.push(...a));
      }
    return { ItemData: r, HasTutorial: o };
  }
  GetSavedDataById(e) {
    return this.ODo.get(e);
  }
}
exports.TutorialModel = TutorialModel;
// # sourceMappingURL=TutorialModel.js.map
