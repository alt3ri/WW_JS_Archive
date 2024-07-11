"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.QuestViewStep = void 0);
const ue_1 = require("ue"),
  TreeStepBase_1 = require("../../GeneralLogicTree/View/TreeStep/TreeStepBase"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  QuestViewChildStep_1 = require("./QuestViewChildStep");
class QuestViewStep extends TreeStepBase_1.TreeStepBase {
  constructor() {
    super(...arguments),
      (this.Kct = void 0),
      (this.Qct = []),
      (this.hso = new Map());
  }
  Dispose() {
    if ((super.Dispose(), this.Qct)) {
      for (const e of this.Qct) e.Dispose();
      this.Qct = void 0;
    }
  }
  OnRegisterComponent() {
    super.OnRegisterComponent(),
      this.ComponentRegisterInfos.push([2, ue_1.UIItem]),
      this.ComponentRegisterInfos.push([3, ue_1.UIItem]),
      this.ComponentRegisterInfos.push([4, ue_1.UIItem]);
  }
  OnStart() {
    super.OnStart(),
      this.GetItem(3)?.SetUIActive(!0),
      this.GetItem(4)?.SetUIActive(!0);
    var e = this.GetItem(2),
      t = new QuestViewChildStep_1.QuestViewChildStep();
    t.SetRootActor(e.GetOwner(), !0), this.Qct.push(t);
  }
  Update(e, t) {
    (this.Kct = t),
      this.Kct
        ? (this.SetActive(!0),
          (t = this.UpdateData(e, this.Kct.MainTitle)),
          this.GetItem(3)?.SetUIActive(t),
          (e = this.Xct()),
          this.GetItem(4)?.SetUIActive(t || e))
        : this.SetActive(!1);
  }
  Xct() {
    const s = this.GetItem(2);
    if (!s) return !1;
    const h = this.Kct;
    if (!h || !h.SubTitles)
      return (
        this.Qct.forEach((e) => {
          e.SetActive(!1);
        }),
        !1
      );
    let r = 0,
      u = s.GetHierarchyIndex();
    return (
      this.hso.clear(),
      h.SubTitles.forEach((e) => {
        let t = void 0;
        var i;
        this.Qct.length > r
          ? (t = this.Qct[r])
          : ((i = LguiUtil_1.LguiUtil.CopyItem(
              s,
              s.GetParentAsUIItem(),
            )).SetHierarchyIndex(++u),
            (t = new QuestViewChildStep_1.QuestViewChildStep()).SetRootActor(
              i.GetOwner(),
              !0,
            ),
            this.Qct.push(t)),
          t.UpdateData(this.TreeIncId, e),
          this.hso.set(r, t.UpdateDescribeSuccess),
          r++;
      }),
      this.Qct.forEach((e, t) => {
        var i = t < h.SubTitles.length,
          t = this.hso.get(t) ?? !1;
        e.SetActive(i && t);
      }),
      !0
    );
  }
}
exports.QuestViewStep = QuestViewStep;
//# sourceMappingURL=QuestViewStep.js.map
