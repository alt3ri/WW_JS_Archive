"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRunSuccessView = void 0);
const UE = require("ue"),
  CommonDefine_1 = require("../../../../../Core/Define/CommonDefine"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  ActivityParkourButton_1 = require("./ActivityParkourButton"),
  ActivityRunController_1 = require("./ActivityRunController"),
  LEAVETIME = 30,
  SUCCESS_OUTLINE_COLOR = "CC9548FF",
  TARGET_ICON_PATH =
    "/Game/Aki/UI/UIResources/Common/Image/IconForceLogo/T_Logo_10_UI.T_Logo_10_UI";
class ActivityRunSuccessView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.$Fe = void 0),
      (this.YFe = void 0),
      (this.ButtonMap = void 0),
      (this.JFe = () => {
        ActivityRunController_1.ActivityRunController.RequestTransToParkourChallenge(
          this.YFe.CurrentChallengeId,
        );
      }),
      (this.zFe = () => {
        this.CloseMe();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [1, UE.UIText],
      [2, UE.UITexture],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [8, UE.UIText],
      [9, UE.UIItem],
      [10, UE.UIText],
      [11, UE.UIText],
      [12, UE.UIItem],
      [13, UE.UIItem],
      [14, UE.UIText],
    ];
  }
  async OnBeforeStartAsync() {
    (this.ButtonMap = new Map()), await this.ZFe();
  }
  async ZFe() {
    this.GetItem(5)?.SetUIActive(!1);
    var e = this.i3e(this.GetItem(5), 0, this.zFe),
      i = this.i3e(this.GetItem(5), 1, this.JFe),
      e = (await Promise.all([e, i]), this.ButtonMap.get(0)),
      i = this.ButtonMap.get(1);
    e.SetBtnText("Leave"),
      e.SetFloatText(
        "InstanceDungeonLeftTimeToAutoLeave",
        LEAVETIME.toString(),
      ),
      i.SetBtnText("ChallengeAgain");
  }
  async i3e(e, i, t) {
    var s = this.GetItem(5),
      r = this.GetItem(4),
      s = LguiUtil_1.LguiUtil.DuplicateActor(s.GetOwner(), r),
      r = new ActivityParkourButton_1.ActivityParkourButton();
    this.ButtonMap.set(i, r), await r.InitializeAsync(s, t), r.SetActive(!0);
  }
  OnStart() {
    this.YFe = this.OpenParam;
  }
  OnBeforeShow() {
    this.t3e(), this.l3e(), this._3e(), this.u3e(), this.e3e();
  }
  o3e() {
    TimerSystem_1.TimerSystem.Has(this.$Fe) &&
      TimerSystem_1.TimerSystem.Remove(this.$Fe),
      (this.$Fe = void 0);
  }
  e3e() {
    let e = LEAVETIME + 1;
    this.$Fe = TimerSystem_1.TimerSystem.Forever(() => {
      e <= 0
        ? (TimerSystem_1.TimerSystem.Remove(this.$Fe), this.zFe())
        : this.ButtonMap.get(0).SetFloatText(
            "InstanceDungeonLeftTimeToAutoLeave",
            (e--).toString(),
          );
    }, CommonDefine_1.MILLIONSECOND_PER_SECOND);
  }
  u3e() {
    var e = TimeUtil_1.TimeUtil.GetTimeString(this.YFe.CurrentTime);
    this.GetText(10).SetText(e);
  }
  OnBeforeDestroy() {
    this.o3e();
  }
  _3e() {
    this.GetItem(9).SetUIActive(this.YFe.IfNewRecord);
  }
  t3e() {
    this.GetItem(12).SetUIActive(!0),
      this.GetItem(13).SetUIActive(!0),
      this.GetText(14).SetUIActive(!1);
    var e = this.GetTexture(2),
      e =
        (e.SetColor(UE.Color.FromHex(SUCCESS_OUTLINE_COLOR)),
        this.SetTextureByPath(TARGET_ICON_PATH, e),
        this.GetText(1));
    e.SetColor(UE.Color.FromHex("FFFFFFFF")),
      e.ShowTextNew("GenericPromptTypes_3_GeneralText");
  }
  l3e() {
    this.GetText(8).SetText(this.YFe.CurrentScore.toString());
  }
}
exports.ActivityRunSuccessView = ActivityRunSuccessView;
//# sourceMappingURL=ActivityRunSuccessView.js.map
