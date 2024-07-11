"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LordChallengeResultView = void 0);
const UE = require("ue"),
  CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
  MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  SUCCESS_OUTLINE_COLOR = "C48B29FF",
  SUCCESS_TEX =
    "/Game/Aki/UI/UIResources/Common/Image/IconForceLogo/T_Logo_10_UI.T_Logo_10_UI",
  FAIL_OUTLINE_COLOR = "B33100FF",
  FAIL_TEX =
    "/Game/Aki/UI/UIResources/Common/Image/IconForceLogo/T_Logo_10_UI.T_Logo_10_UI",
  CLOSE_BUTTON_KEY = -1;
class LordChallengeResultView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.$Fe = void 0),
      (this.YFe = void 0),
      (this.ButtonMap = void 0),
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
    const i = [];
    var e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
        "ConfirmBox_41_ButtonText_0",
      ),
      e = this.i3e(this.GetItem(5), CLOSE_BUTTON_KEY, e, this.zFe),
      e =
        (i.push(e),
        this.YFe.ButtonList.forEach((e, t) => {
          t = this.i3e(this.GetItem(5), t, e.Title, e.ClickFunc);
          i.push(t);
        }),
        await Promise.all(i),
        this.ButtonMap.get(CLOSE_BUTTON_KEY)),
      t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
        "Text_InstanceDungeonLeftTimeToAutoLeave_Text",
        this.YFe.AutoCloseTime.toString(),
      );
    e.SetFloatText(t);
  }
  async i3e(e, t, i, s) {
    var o = this.GetItem(5),
      r = this.GetItem(4),
      o = LguiUtil_1.LguiUtil.DuplicateActor(o.GetOwner(), r),
      r = new Button();
    this.ButtonMap.set(t, r),
      await r.InitializeAsync(o, s),
      r.SetActive(!0),
      r.SetBtnText(i);
  }
  OnStart() {
    this.YFe = this.OpenParam;
  }
  OnBeforeShow() {
    this.t3e(), this.l3e(), this.u3e(), this.e3e();
  }
  o3e() {
    TimerSystem_1.TimerSystem.Has(this.$Fe) &&
      TimerSystem_1.TimerSystem.Remove(this.$Fe),
      (this.$Fe = void 0);
  }
  e3e() {
    let t = this.YFe.AutoCloseTime + 1;
    this.$Fe = TimerSystem_1.TimerSystem.Forever(() => {
      var e;
      t <= 0
        ? (TimerSystem_1.TimerSystem.Remove(this.$Fe), this.zFe())
        : ((e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            "Text_InstanceDungeonLeftTimeToAutoLeave_Text",
            (t--).toString(),
          )),
          this.ButtonMap.get(CLOSE_BUTTON_KEY).SetFloatText(e));
    }, CommonDefine_1.MILLIONSECOND_PER_SECOND);
  }
  u3e() {
    var e = void 0 !== this.YFe.PassTime;
    this.GetText(13)?.SetUIActive(e),
      e &&
        ((e = TimeUtil_1.TimeUtil.GetTimeString(this.YFe.PassTime)),
        this.GetText(10).SetText(e));
  }
  l3e() {
    var e = void 0 !== this.YFe?.Score;
    this.GetItem(12)?.SetUIActive(e),
      e &&
        (this.GetText(8).SetText(this.YFe.Score.toString()),
        this.GetItem(9).SetUIActive(this.YFe?.IsNewRecord ?? !1));
  }
  OnBeforeDestroy() {
    this.o3e();
  }
  t3e() {
    var e = 0 === this.YFe?.Result,
      t =
        (this.GetItem(12).SetUIActive(e),
        this.GetItem(13).SetUIActive(e),
        this.GetText(14).SetUIActive(!e),
        this.GetTexture(2)),
      i = e ? SUCCESS_TEX : FAIL_TEX,
      s = e ? SUCCESS_OUTLINE_COLOR : FAIL_OUTLINE_COLOR,
      e = e
        ? "GenericPromptTypes_3_GeneralText"
        : "GenericPromptTypes_4_GeneralText",
      i =
        (t.SetColor(UE.Color.FromHex(s)),
        this.SetTextureByPath(i, t),
        this.GetText(1));
    i.SetColor(UE.Color.FromHex(s)), i.ShowTextNew(e);
  }
}
exports.LordChallengeResultView = LordChallengeResultView;
class Button extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.RFe = void 0),
      (this.UFe = () => {
        this.RFe?.();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[3, this.UFe]]);
  }
  OnBeforeShow() {
    this.GetText(0).SetText(""), this.GetText(2).SetText("");
  }
  async InitializeAsync(e, t) {
    (this.RFe = t), await this.CreateByActorAsync(e);
  }
  SetFloatText(e) {
    this.GetText(2).SetUIActive(!0), this.GetText(2).SetText(e);
  }
  SetBtnText(e) {
    this.GetText(0).SetText(e);
  }
}
//# sourceMappingURL=LordChallengeResultView.js.map
