"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.QuestViewStep = void 0);
const ue_1 = require("ue"),
  StepBaseItem_1 = require("../../BattleUi/Views/MissionView/TreeStep/StepBaseItem"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  QuestViewChildStep_1 = require("./QuestViewChildStep");
class QuestViewStep extends StepBaseItem_1.StepBaseItem {
  constructor() {
    super(...arguments), (this.Qct = []);
  }
  OnRegisterComponent() {
    super.OnRegisterComponent(),
      this.ComponentRegisterInfos.push([2, ue_1.UIItem]),
      this.ComponentRegisterInfos.push([3, ue_1.UIItem]),
      this.ComponentRegisterInfos.push([4, ue_1.UIItem]);
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync(),
      this.GetItem(3)?.SetUIActive(!0),
      this.GetItem(4)?.SetUIActive(!0);
    var t = this.GetItem(2),
      e = new QuestViewChildStep_1.QuestViewChildStep(0, 0);
    await e.CreateThenShowByActorAsync(t.GetOwner(), 1),
      await e.HideAsync(),
      this.Qct.push(e);
  }
  OnBeforeDestroy() {}
  async Update(e) {
    if (e) {
      this.SetActive(!0), await this.Refresh(e, e.MainStepText);
      let t = await this.Xct();
      this.DescribeTextVisible ||
        1 !== t ||
        ((e = this.Qct.find((t) => t.GetActive())) &&
          (this.CopyStepInfo(e), e.SetActive(!1), (t = 0))),
        this.GetItem(3)?.SetUIActive(this.DescribeTextVisible),
        this.GetItem(4)?.SetUIActive(this.DescribeTextVisible || 0 < t);
    } else this.SetActive(!1);
  }
  async Xct() {
    var i,
      s = this.GetItem(2);
    if (!s) return 0;
    const r = this.ShowData;
    if (!r || !r.SubStepTexts)
      return (
        this.Qct.forEach((t) => {
          t.SetActive(!1);
        }),
        0
      );
    let h = s.GetHierarchyIndex();
    const a = [];
    for (let e = 0; e < r.SubStepTexts.length; e++) {
      let t = void 0;
      this.Qct.length > e
        ? (t = this.Qct[e])
        : ((i = LguiUtil_1.LguiUtil.CopyItem(
            s,
            s.GetParentAsUIItem(),
          )).SetHierarchyIndex(++h),
          (t = new QuestViewChildStep_1.QuestViewChildStep(0, e)),
          a.push(t.CreateThenShowByActorAsync(i.GetOwner(), 1)),
          this.Qct.push(t));
    }
    await Promise.all(a),
      (a.length = 0),
      r.SubStepTexts.forEach((t, e) => {
        a.push(this.Qct[e].Refresh(r, t));
      }),
      await Promise.all(a);
    let u = 0;
    return (
      this.Qct.forEach((t, e) => {
        e = e < r.SubStepTexts.length && t.IsDescribeTextVisible;
        t.SetActive(e), e && u++;
      }),
      u
    );
  }
}
exports.QuestViewStep = QuestViewStep;
//# sourceMappingURL=QuestViewStep.js.map
