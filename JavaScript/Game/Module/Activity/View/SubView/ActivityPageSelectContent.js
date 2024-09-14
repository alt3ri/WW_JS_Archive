"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityPageSelectContent = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  RedDotController_1 = require("../../../../RedDot/RedDotController"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  ActivityController_1 = require("../../ActivityController");
class ActivityPageSelectContent extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.Pe = void 0),
      (this.U5e = !1),
      (this.g5e = () => {
        this.IsUiActiveInHierarchy() && this.Oqe();
      }),
      (this.cJs = (t) => {
        this.Pe?.Id && this.Pe.Id === t && (this.P5e(), this.u3e(), this.Kbe());
      }),
      (this.jbe = (t) => {
        t &&
          (ModelManager_1.ModelManager.ActivityModel.SetCurrentSelectActivityId(
            this.Pe.Id,
          ),
          this.Pe.NeedSelfControlFirstRedPoint() ||
            ActivityController_1.ActivityController.RequestReadActivity(
              this.Pe,
            ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnSelectActivity,
          ));
      }),
      (this.A5e = () =>
        ModelManager_1.ModelManager.ActivityModel.GetCurrentSelectActivityId() !==
        this.Pe.Id);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIItem],
      [5, UE.UITexture],
    ]),
      (this.BtnBindInfo = [[0, this.jbe]]);
  }
  OnStart() {
    this.GetExtendToggle(0).CanExecuteChange.Bind(this.A5e);
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnSelectActivity,
      this.g5e,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RefreshActivityTab,
        this.cJs,
      );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnSelectActivity,
      this.g5e,
    ),
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
  Oqe() {
    var t =
      ModelManager_1.ModelManager.ActivityModel.GetCurrentSelectActivityId() ===
      this.Pe.Id
        ? 1
        : 0;
    this.GetExtendToggle(0).SetToggleState(t, !1);
  }
  SetToggleState(t, e = !0) {
    t = t ? 1 : 0;
    this.GetExtendToggle(0).SetToggleState(t, e);
  }
  Refresh(t, e, i) {
    (this.Pe = t),
      RedDotController_1.RedDotController.BindRedDot(
        "CommonActivityPage",
        this.GetItem(2),
        void 0,
        t.Id,
      ),
      (this.U5e = !0),
      this.Oqe(),
      this.P5e(),
      this.u3e(),
      this.Kbe(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        t.Id,
      );
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
    var e,
      i = this.Pe.LocalConfig.TabTexture;
    const s = this.GetTexture(5);
    if ((s.SetUIActive(!1), i && 0 !== i.length)) {
      let t = 0;
      2 <= i.length &&
        ((e = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender()),
        (t = 0 === e ? 0 : 1)),
        this.SetTextureByPath(i[t], s, void 0, () => {
          s.SetUIActive(!0);
        });
    }
  }
  OnBeforeDestroy() {}
  OnClearItem() {
    this.U5e &&
      (RedDotController_1.RedDotController.UnBindGivenUi(
        "CommonActivityPage",
        this.GetItem(2),
        this.Pe.Id,
      ),
      (this.U5e = !1));
  }
}
exports.ActivityPageSelectContent = ActivityPageSelectContent;
//# sourceMappingURL=ActivityPageSelectContent.js.map
