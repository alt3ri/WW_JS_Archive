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
      (this.m4e = !1),
      (this.e4e = () => {
        this.IsUiActiveInHierarchy() && this.Oqe();
      }),
      (this.b8s = (t) => {
        this.Pe?.Id && this.Pe.Id === t && (this.C4e(), this.$2e(), this.Kbe());
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
      (this.d4e = () =>
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
      [5, UE.UISprite],
    ]),
      (this.BtnBindInfo = [[0, this.jbe]]);
  }
  OnStart() {
    this.GetExtendToggle(0).CanExecuteChange.Bind(this.d4e);
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnSelectActivity,
      this.e4e,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RefreshActivityTab,
        this.b8s,
      );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnSelectActivity,
      this.e4e,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RefreshActivityTab,
        this.b8s,
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
      (this.m4e = !0),
      this.Oqe(),
      this.C4e(),
      this.$2e(),
      this.Kbe(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        t.Id,
      );
  }
  C4e() {
    var t = this.Pe.GetTitle();
    this.GetText(1).SetText(t.replace(/<.*?>/g, ""));
  }
  $2e() {
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
    var e = this.Pe.LocalConfig.TabSprite;
    const i = this.GetSprite(5);
    if ((i.SetUIActive(!1), e && 0 !== e.length)) {
      var s = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
      let t = 0;
      2 <= e.length && (t = 0 === s ? 0 : 1),
        this.SetSpriteByPath(e[t], i, !1, void 0, () => {
          i.SetUIActive(!0);
        });
    }
  }
  OnBeforeDestroy() {}
  OnClearItem() {
    this.m4e &&
      (RedDotController_1.RedDotController.UnBindGivenUi(
        "CommonActivityPage",
        this.GetItem(2),
        this.Pe.Id,
      ),
      (this.m4e = !1));
  }
}
exports.ActivityPageSelectContent = ActivityPageSelectContent;
//# sourceMappingURL=ActivityPageSelectContent.js.map
