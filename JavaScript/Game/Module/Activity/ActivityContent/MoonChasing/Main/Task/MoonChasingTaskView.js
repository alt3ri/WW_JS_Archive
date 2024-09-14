"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MoonChasingTaskView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../../../Core/Common/Log"),
  RedDotController_1 = require("../../../../../../RedDot/RedDotController"),
  UiViewBase_1 = require("../../../../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../../../../Ui/Common/PopupCaptionItem"),
  ActivityMoonChasingController_1 = require("../../Activity/ActivityMoonChasingController"),
  PopularityModule_1 = require("../PopularityModule"),
  TaskBranchLineModule_1 = require("./TaskBranchLineModule"),
  TaskMainLineModule_1 = require("./TaskMainLineModule");
class MoonChasingTaskView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.eke = void 0),
      (this.lqe = void 0),
      (this.gAn = void 0),
      (this.fAn = void 0),
      (this.sMa = void 0),
      (this.aMa = void 0),
      (this.vAn = (i) => {
        (this.aMa.TaskType = 2),
          this.fAn?.SetActive(!1),
          this.GetExtendToggle(3)?.SetToggleState(0),
          this.MAn(this.aMa.TargetTaskId).finally(() => {
            this.sMa?.Play();
          }),
          this.Bwa(1);
      }),
      (this.EAn = (i) => {
        (this.aMa.TaskType = 1),
          this.gAn?.SetActive(!1),
          this.GetExtendToggle(2)?.SetToggleState(0),
          this.SAn(this.aMa.TargetTaskId, this.aMa.IsLastTask).finally(() => {
            this.sMa?.Play();
          }),
          this.Bwa(0);
      }),
      (this.yAn = () => 2 === this.aMa.TaskType),
      (this.IAn = () => 2 !== this.aMa.TaskType),
      (this.m2e = () => {
        this.CloseMe();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIExtendToggle],
      [3, UE.UIExtendToggle],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [2, this.vAn],
        [3, this.EAn],
      ]);
  }
  async ERn() {
    (this.eke = new PopularityModule_1.PopularityModule()),
      await this.eke.CreateByActorAsync(this.GetItem(4).GetOwner()),
      this.AddChild(this.eke);
  }
  async U3e() {
    (this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
      this.lqe.SetCloseCallBack(this.m2e),
      await this.lqe.SetCurrencyItemList([]);
  }
  Mqt() {
    this.GetExtendToggle(3).CanExecuteChange.Bind(this.yAn),
      this.GetExtendToggle(2).CanExecuteChange.Bind(this.IAn);
  }
  async OnBeforeStartAsync() {
    await Promise.all([this.ERn(), this.U3e()]);
  }
  OnStart() {
    (this.aMa = this.OpenParam),
      void 0 === this.aMa
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "MoonChasing",
            59,
            "MoonChasingTaskView Invalid OpenParam",
          )
        : (this.Mqt(),
          (this.sMa = this.GetItem(1)
            .GetOwner()
            .GetComponentByClass(UE.UIInturnAnimController.StaticClass())),
          (1 === this.aMa.TaskType
            ? this.GetExtendToggle(3)
            : this.GetExtendToggle(2)
          ).SetToggleStateForce(1, !0));
  }
  OnBeforeShow() {
    RedDotController_1.RedDotController.BindRedDot(
      "MoonChasingMainlineTab",
      this.GetItem(5),
      void 0,
    ),
      RedDotController_1.RedDotController.BindRedDot(
        "MoonChasingBranchTab",
        this.GetItem(6),
        void 0,
      ),
      ActivityMoonChasingController_1.ActivityMoonChasingController.CheckIsActivityClose();
  }
  OnBeforeHide() {
    RedDotController_1.RedDotController.UnBindRedDot("MoonChasingMainlineTab"),
      RedDotController_1.RedDotController.UnBindRedDot("MoonChasingBranchTab");
  }
  async SAn(i, t) {
    this.fAn ||
      ((this.fAn = new TaskMainLineModule_1.TaskMainLineModule()),
      this.fAn.SetSelectTaskId(i, t),
      await this.fAn.CreateThenShowByResourceIdAsync(
        "UiItem_MissionMainLine",
        this.GetItem(1),
      )),
      await this.fAn.ShowAsync();
  }
  async MAn(i) {
    this.gAn ||
      ((this.gAn = new TaskBranchLineModule_1.TaskBranchLineModule()),
      this.gAn.SetSelectTaskId(i),
      await this.gAn.CreateThenShowByResourceIdAsync(
        "UiItem_MissionBranchLine",
        this.GetItem(1),
      )),
      await this.gAn.ShowAsync();
  }
  Bwa(i) {
    var t = this.GetExtendToggle(3).RootUIComp,
      s = this.GetExtendToggle(2).RootUIComp,
      e = t.GetHierarchyIndex(),
      o = s.GetHierarchyIndex();
    (o < e && 0 === i) ||
      (e < o && 1 === i) ||
      (t.SetHierarchyIndex(o), s.SetHierarchyIndex(e));
  }
  GetGuideUiItemAndUiItemForShowEx(i) {
    if (!(i.length < 1))
      switch (i[0]) {
        case "Main":
          return this.fAn?.GetGuideUiItemAndUiItemForShowEx(i);
        case "Branch":
          return this.gAn?.GetGuideUiItemAndUiItemForShowEx(i);
        default:
          return;
      }
  }
}
exports.MoonChasingTaskView = MoonChasingTaskView;
//# sourceMappingURL=MoonChasingTaskView.js.map
