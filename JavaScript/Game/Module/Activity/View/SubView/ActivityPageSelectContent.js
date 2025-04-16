"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityPageSelectContent = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  RedDotController_1 = require("../../../../RedDot/RedDotController"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class ActivityPageSelectContent extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.Pe = void 0),
      (this.uFe = void 0),
      (this.kel = void 0),
      (this.U5e = !1),
      (this.cJs = (t) => {
        this.Pe?.Id &&
          this.Pe.Id === t &&
          (this.P5e(), this.u3e(), this.Kbe(), this.W01());
      }),
      (this.jbe = (t) => {
        this.kel?.(this.Pe, t);
      }),
      (this.A5e = () =>
        this.uFe?.(
          this.Pe.Id,
          1 === this.GetExtendToggle(0).GetToggleState(),
        ) ?? !0);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIItem],
      [5, UE.UITexture],
      [6, UE.UIItem],
      [7, UE.UISprite],
    ]),
      (this.BtnBindInfo = [[0, this.jbe]]);
  }
  OnStart() {
    this.GetExtendToggle(0).CanExecuteChange.Bind(this.A5e);
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RefreshActivityTab,
      this.cJs,
    );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RefreshActivityTab,
      this.cJs,
    );
  }
  OnBeforeShow() {
    this.AddEventListener();
  }
  OnBeforeHide() {
    this.RemoveEventListener();
  }
  OnBeforeDestroy() {
    this.Ovt();
  }
  Oqe(t) {
    t = t ? 1 : 0;
    this.GetExtendToggle(0).SetToggleState(t, !1);
  }
  SetToggleState(t, e = !0) {
    t = t ? 1 : 0;
    this.GetExtendToggle(0).SetToggleState(t, e);
  }
  BindToggleClick(t) {
    this.kel = t;
  }
  BindCanToggleExecuteChange(t) {
    this.uFe = t;
  }
  Refresh(t, e, i) {
    try {
      (this.Pe = t),
        this.K8e(t),
        this.Oqe(e),
        this.P5e(),
        this.u3e(),
        this.Kbe(),
        this.W01();
    } catch (t) {
      ModelManager_1.ModelManager.ActivityModel.OpenActivityErrorConfirmBox(
        this.Pe?.Id ?? 0,
        this.Pe?.Type ?? 0,
      ),
        t instanceof Error
          ? Log_1.Log.CheckError() &&
            Log_1.Log.ErrorWithStack(
              "Activity",
              37,
              "[Activity] 活动页签状态异常",
              t,
              ["id", this.Pe?.Id ?? 0],
              ["error", t.message],
            )
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error("Activity", 37, "[Activity] 活动页签状态异常", [
              "id",
              this.Pe?.Id ?? 0,
            ]);
    }
  }
  P5e() {
    var t = this.Pe.GetTitle();
    this.GetText(1).SetText(t.replace(/<.*?>/g, ""));
  }
  u3e() {
    var t, e;
    this.Pe.EndOpenTime <= 0 || !this.Pe.CheckIfInOpenTime()
      ? (this.GetText(3).SetUIActive(!1), this.GetItem(4).SetUIActive(!0))
      : (this.GetItem(4).SetUIActive(!1),
        (t = TimeUtil_1.TimeUtil.GetDataFromTimeStamp(this.Pe.BeginOpenTime)),
        (e = TimeUtil_1.TimeUtil.GetDataFromTimeStamp(this.Pe.EndOpenTime)),
        (t = StringUtils_1.StringUtils.Format(
          "{0}/{1}-{2}/{3}",
          t.Month,
          t.Day,
          e.Month,
          e.Day,
        )),
        (e = this.Pe.LocalConfig.ShowTabTime),
        this.GetText(3).SetUIActive(e),
        this.GetItem(4).SetUIActive(!e),
        this.GetText(3).SetText(t));
  }
  Kbe() {
    var e = this.Pe.LocalConfig.TabTexture;
    const i = this.GetTexture(5);
    if ((i.SetUIActive(!1), e && 0 !== e.length)) {
      let t = 0;
      2 <= e.length &&
        ((s = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender()),
        (t = 0 === s ? 0 : 1)),
        this.SetTextureByPath(e[t], i, void 0, () => {
          i.SetUIActive(!0);
        });
      var s = this.Pe.FinishShowState;
      this.GetItem(6).SetUIActive(s);
    }
  }
  W01() {
    var t = this.Pe.LocalConfig.TabTagIcon,
      e = this.GetSprite(7),
      i = !!t;
    e.SetUIActive(i), i && this.SetSpriteByPath(t, e, !0);
  }
  K8e(t) {
    this.Ovt(),
      RedDotController_1.RedDotController.BindRedDot(
        "CommonActivityPage",
        this.GetItem(2),
        void 0,
        t.Id,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        t.Id,
      ),
      (this.U5e = !0);
  }
  Ovt() {
    this.U5e &&
      (RedDotController_1.RedDotController.UnBindGivenUi(
        "CommonActivityPage",
        this.GetItem(2),
        this.Pe.Id,
      ),
      (this.U5e = !1));
  }
  GetKey(t, e) {
    return t.Id;
  }
}
exports.ActivityPageSelectContent = ActivityPageSelectContent;
//# sourceMappingURL=ActivityPageSelectContent.js.map
