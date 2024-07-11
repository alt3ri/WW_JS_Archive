"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRunFailView = void 0);
const UE = require("ue"),
  CommonDefine_1 = require("../../../../../Core/Define/CommonDefine"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  ActivityParkourButton_1 = require("./ActivityParkourButton"),
  ActivityRunController_1 = require("./ActivityRunController"),
  LEAVETIME = 30,
  FAIL_OUTLINE_COLOR = "63323AFF",
  TARGET_ICON_PATH =
    "/Game/Aki/UI/UIResources/Common/Image/IconForceLogo/T_Logo_10_UI.T_Logo_10_UI";
class ActivityRunFailView extends UiViewBase_1.UiViewBase {
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
      [15, UE.UINiagara],
      [16, UE.UITexture],
      [17, UE.UITexture],
    ];
  }
  async OnBeforeStartAsync() {
    (this.ButtonMap = new Map()), await this.ZFe();
  }
  OnStart() {
    (this.YFe = this.OpenParam), this.e3e();
  }
  OnBeforeShow() {
    this.GetItem(12).SetUIActive(!1),
      this.GetItem(13).SetUIActive(!1),
      this.GetTexture(16).SetUIActive(!1),
      this.GetTexture(17).SetUIActive(!1),
      this.GetText(14).SetUIActive(!0),
      this.GetUiNiagara(15)?.SetUIActive(!1),
      this.t3e();
  }
  t3e() {
    var t = this.GetTexture(2);
    t.SetColor(UE.Color.FromHex(FAIL_OUTLINE_COLOR)),
      this.SetTextureByPath(TARGET_ICON_PATH, t),
      this.GetText(1).ShowTextNew("GenericPromptTypes_4_GeneralText");
  }
  async ZFe() {
    this.GetItem(5)?.SetUIActive(!1);
    var t = this.i3e(this.GetItem(5), 0, this.zFe),
      i = this.i3e(this.GetItem(5), 1, this.JFe),
      t = (await Promise.all([t, i]), this.ButtonMap.get(0)),
      i = this.ButtonMap.get(1);
    t.SetBtnText("Leave"),
      t.SetFloatText(
        "InstanceDungeonLeftTimeToAutoLeave",
        LEAVETIME.toString(),
      ),
      i.SetBtnText("ChallengeAgain");
  }
  o3e() {
    TimerSystem_1.TimerSystem.Has(this.$Fe) &&
      TimerSystem_1.TimerSystem.Remove(this.$Fe),
      (this.$Fe = void 0);
  }
  e3e() {
    let t = LEAVETIME + 1;
    this.$Fe = TimerSystem_1.TimerSystem.Forever(() => {
      t <= 0
        ? (TimerSystem_1.TimerSystem.Remove(this.$Fe), this.zFe())
        : this.ButtonMap.get(0).SetFloatText(
            "InstanceDungeonLeftTimeToAutoLeave",
            (t--).toString(),
          );
    }, CommonDefine_1.MILLIONSECOND_PER_SECOND);
  }
  OnBeforeDestroy() {
    this.GetUiNiagara(15)?.SetUIActive(!0),
      this.GetTexture(16).SetUIActive(!0),
      this.GetTexture(17).SetUIActive(!0),
      this.o3e();
  }
  async i3e(t, i, e) {
    var s = this.GetItem(5),
      r = this.GetItem(4),
      s = LguiUtil_1.LguiUtil.DuplicateActor(s.GetOwner(), r),
      r = new ActivityParkourButton_1.ActivityParkourButton();
    this.ButtonMap.set(i, r), await r.InitializeAsync(s, e), r.SetActive(!0);
  }
}
exports.ActivityRunFailView = ActivityRunFailView;
//# sourceMappingURL=ActivityRunFailView.js.map
