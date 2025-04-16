"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CiacconaGalRewardButtonItem = void 0);
const UE = require("ue"),
  MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  ButtonSpriteItem_1 = require("../../Common/Button/ButtonSpriteItem"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class CiacconaGalRewardButtonItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.e0t = void 0),
      (this.g4c = !1),
      (this.TDe = void 0),
      (this.eTt = () => {}),
      (this.J_ = () => {
        this.C4c();
      }),
      (this.ZDc = () => {
        this.eTt();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIText],
    ];
  }
  async OnBeforeStartAsync() {
    (this.e0t = new ButtonSpriteItem_1.ButtonSpriteItem()),
      this.e0t.SetFunction(this.ZDc),
      await this.e0t.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
  }
  OnStart() {
    this.g4c &&
      (this.C4c(),
      (this.TDe = TimerSystem_1.TimerSystem.Forever(
        this.J_,
        TimeUtil_1.TimeUtil.InverseMillisecond,
      )));
  }
  OnBeforeDestroy() {
    this.TDe && TimerSystem_1.TimerSystem.Remove(this.TDe);
  }
  SetNeedRemainTime(e) {
    this.g4c = e;
  }
  SetOnClick(e) {
    this.eTt = e;
  }
  BindRedDot(e, t) {
    this.e0t.BindRedDot(e, t);
  }
  UnBindRedDot() {
    this.e0t.UnBindRedDot();
  }
  SetRedDotVisible(e) {
    this.e0t.SetRedDotVisible(e);
  }
  SetProgressText(e) {
    this.GetText(2).SetText(e);
  }
  SetTitle(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e);
  }
  C4c() {
    var e =
      MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
        "Xkjsx_Rewards_Timeless",
      ) +
      " " +
      ModelManager_1.ModelManager.CiacconaGalModel.ActivityData
        .RewardRemainTimeStr;
    this.GetText(3)?.SetText(e);
  }
}
exports.CiacconaGalRewardButtonItem = CiacconaGalRewardButtonItem;
//# sourceMappingURL=CiacconaGalRewardButtonItem.js.map
