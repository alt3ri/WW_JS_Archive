"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.QuestViewStep = void 0);
const ue_1 = require("ue");
const TreeStepBase_1 = require("../../GeneralLogicTree/View/TreeStep/TreeStepBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const QuestViewChildStep_1 = require("./QuestViewChildStep");
class QuestViewStep extends TreeStepBase_1.TreeStepBase {
  constructor() {
    super(...arguments),
      (this.But = void 0),
      (this.but = []),
      (this.cno = new Map());
  }
  Dispose() {
    if ((super.Dispose(), this.but)) {
      for (const e of this.but) e.Dispose();
      this.but = void 0;
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
    const e = this.GetItem(2);
    const t = new QuestViewChildStep_1.QuestViewChildStep();
    t.SetRootActor(e.GetOwner(), !0), this.but.push(t);
  }
  Update(e, t) {
    (this.But = t),
      this.But
        ? (this.SetActive(!0),
          (t = this.UpdateData(e, this.But.MainTitle)),
          this.GetItem(3)?.SetUIActive(t),
          (e = this.qut()),
          this.GetItem(4)?.SetUIActive(t || e))
        : this.SetActive(!1);
  }
  qut() {
    const s = this.GetItem(2);
    if (!s) return !1;
    const h = this.But;
    if (!h || !h.SubTitles)
      return (
        this.but.forEach((e) => {
          e.SetActive(!1);
        }),
        !1
      );
    let r = 0;
    let u = s.GetHierarchyIndex();
    return (
      this.cno.clear(),
      h.SubTitles.forEach((e) => {
        let t = void 0;
        let i;
        this.but.length > r
          ? (t = this.but[r])
          : ((i = LguiUtil_1.LguiUtil.CopyItem(
              s,
              s.GetParentAsUIItem(),
            )).SetHierarchyIndex(++u),
            (t = new QuestViewChildStep_1.QuestViewChildStep()).SetRootActor(
              i.GetOwner(),
              !0,
            ),
            this.but.push(t)),
          t.UpdateData(this.TreeIncId, e),
          this.cno.set(r, t.UpdateDescribeSuccess),
          r++;
      }),
      this.but.forEach((e, t) => {
        const i = t < h.SubTitles.length;
        var t = this.cno.get(t) ?? !1;
        e.SetActive(i && t);
      }),
      !0
    );
  }
}
exports.QuestViewStep = QuestViewStep;
// # sourceMappingURL=QuestViewStep.js.map
