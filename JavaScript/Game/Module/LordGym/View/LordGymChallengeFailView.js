"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LordGymChallengeFailView = void 0);
const UE = require("ue"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  ButtonItem_1 = require("../../Common/Button/ButtonItem"),
  TrainingView_1 = require("../../TrainingDegree/TrainingView"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  LordGymController_1 = require("../LordGymController");
class LordGymChallengeFailView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.syi = 0),
      (this.e3t = void 0),
      (this.THl = void 0),
      (this.bHl = void 0),
      (this.LHl = () => {
        this.CloseMe();
      }),
      (this.AHl = () => {
        LordGymController_1.LordGymController.LordGymBeginRequest(this.syi),
          this.CloseMe();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIText],
      [5, UE.UIText],
      [6, UE.UIText],
      [7, UE.UIHorizontalLayout],
      [8, UE.UIButtonComponent],
      [9, UE.UIText],
      [10, UE.UITexture],
      [11, UE.UIText],
      [12, UE.UIText],
    ];
  }
  async OnBeforeStartAsync() {
    var t = this.OpenParam;
    (this.syi = t.LordId),
      (this.THl = new ButtonItem_1.ButtonItem()),
      (this.bHl = new ButtonItem_1.ButtonItem()),
      await Promise.all([
        this.THl?.CreateThenShowByActorAsync(this.GetItem(2).GetOwner()),
        this.bHl?.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()),
      ]),
      this.THl.SetFunction(this.LHl),
      this.bHl.SetFunction(this.AHl),
      this.THl.SetLocalTextNew("Text_GymReturnToWorld_Text"),
      this.bHl.SetLocalTextNew("Text_GymReChallenge_Text"),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), "Text_GymFail_Text");
  }
  OnStart() {
    (this.e3t = new TrainingView_1.TrainingView()),
      this.e3t.Show(this.GetHorizontalLayout(7));
  }
}
exports.LordGymChallengeFailView = LordGymChallengeFailView;
//# sourceMappingURL=LordGymChallengeFailView.js.map
