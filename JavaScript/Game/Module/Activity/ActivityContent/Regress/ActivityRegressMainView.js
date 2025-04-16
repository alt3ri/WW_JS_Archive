"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRegressMainView = void 0);
const UE = require("ue"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  CommonTabComponentData_1 = require("../../../Common/TabComponent/CommonTabComponentData"),
  CommonTabData_1 = require("../../../Common/TabComponent/CommonTabData"),
  CommonTabTitleData_1 = require("../../../Common/TabComponent/CommonTabTitleData"),
  CommonTabItemBase_1 = require("../../../Common/TabComponent/TabItem/CommonTabItemBase"),
  ActivityRegressAreaSubView_1 = require("./Area/ActivityRegressAreaSubView"),
  ActivityRegressMainLineSubView_1 = require("./MainLine/ActivityRegressMainLineSubView"),
  ActivityRegressMainCaptionListPanel_1 = require("./Panels/ActivityRegressMainCaptionListPanel"),
  ActivityRegressTabItemPanel_1 = require("./Panels/ActivityRegressTabItemPanel"),
  ActivityRegressRoleSubView_1 = require("./Role/ActivityRegressRoleSubView"),
  ActivityRegressSignInSubView_1 = require("./SignIn/ActivityRegressSignInSubView");
class ActivityRegressMainView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.GOe = void 0),
      (this._da = new Map()),
      (this.uda = void 0),
      (this.cda = void 0),
      (this.dda = void 0),
      (this.TDe = void 0),
      (this.lBa = !1),
      (this.kOe = () => {
        ModelManager_1.ModelManager.ActivityRegressModel.CheckIfInShowTime ||
          this.CloseMe();
      }),
      (this.itt = () => {
        this.Og();
      }),
      (this.jdi = (e, i) => {
        return new ActivityRegressTabItemPanel_1.ActivityRegressTabItemPanel();
      }),
      (this.zno = (e) => {
        this.lBa ? (this.lBa = !1) : this.mda(e);
      }),
      (this.yqe = (e) => {
        var e = this.dda[e],
          i = e.Title,
          e = this.CTa(e.EntryType),
          e =
            void 0 !== e
              ? ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
                  e,
                )
              : "";
        return new CommonTabData_1.CommonTabData(
          e,
          new CommonTabTitleData_1.CommonTabTitleData(i),
        );
      }),
      (this.QCa = (t, a) => {
        var s = this.fda(this.uda);
        if (a === s) {
          let e = "";
          switch (a) {
            case 0:
            case 1:
              e = this.KCa(t);
              break;
            case 2:
              var r = t.GachaId,
                r =
                  ConfigManager_1.ConfigManager.GachaConfig.GetGachaViewInfo(r);
              e = r
                ? r.UnderBgTexturePath
                : ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
                    "T_CircumfluenceSignInBg",
                  );
              break;
            default:
              e =
                ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
                  "T_CircumfluenceSignInBg",
                );
          }
          let i = void 0;
          (2 === a
            ? ((i = this.GetTexture(3)), this.GetTexture(1))
            : ((i = this.GetTexture(1)), this.GetTexture(3))
          ).SetUIActive(!1);
          s = !StringUtils_1.StringUtils.IsEmpty(e);
          i.SetUIActive(s),
            s && this.SetTextureByPath(e, i),
            this.UiViewSequence.StopSequenceByKey("Switch"),
            this.PlaySequenceAsync("Switch", !0);
        }
      }),
      (this.Ifa = () => {
        var e =
          ModelManager_1.ModelManager.ActivityRegressModel.EntryEndTimeStamp;
        void 0 !== e &&
          e - TimeUtil_1.TimeUtil.GetServerTimeStamp() <= 0 &&
          (this.Lfa(), this.Tfa(), this.cda.SelectToggleByIndex(0));
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UITexture],
      [2, UE.UIItem],
      [3, UE.UITexture],
    ];
  }
  async OnBeforeStartAsync() {
    var e = this.OpenParam,
      i = ModelManager_1.ModelManager.ActivityRegressModel.IsRegressEntrance(e);
    await this.sso(),
      i
        ? 3 === e
          ? ((this.lBa = !0),
            this.cda.SelectToggleByIndex(2, void 0, !0),
            await this.mda(e, 1))
          : this.cda.SelectToggleByIndex(e, !0)
        : await this.mda(e),
      this.cda.SetPnlListUiActive(i);
  }
  OnBeforeShow() {
    var e,
      i = this.fda(this.uda),
      i = this._da.get(i);
    i &&
      ((e = i.IsShowOrShowing),
      i.SetActive(!0),
      e ||
        (this.UiViewSequence.StopSequenceByKey("Switch"),
        this.PlaySequenceAsync("Switch", !0),
        i.OnParentShow())),
      (this.GOe = TimerSystem_1.TimerSystem.Forever(
        this.kOe,
        TimeUtil_1.TimeUtil.InverseMillisecond,
      ));
  }
  jm() {
    TimerSystem_1.TimerSystem.Has(this.GOe) &&
      (TimerSystem_1.TimerSystem.Remove(this.GOe), (this.GOe = void 0));
  }
  OnAfterHide() {
    this.jm();
    var e = this.fda(this.uda),
      e = this._da.get(e);
    e && e.SetActive(!1);
  }
  OnBeforeDestroy() {
    if ((this.Cda(), this.cda)) {
      var e;
      for ([, e] of this.cda?.GetTabItemMap()) e.Clear();
      this.cda.Destroy(), (this.cda = void 0);
    }
    this.Lfa();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RecallActivityInfoUpdate,
      this.itt,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RecallActivityInfoUpdate,
      this.itt,
    );
  }
  async gda(e, i) {
    const t = this.fda(e);
    this._da.has(t) ||
      (await this.vda(e).then((e) => {
        e && this._da.set(t, e);
      }));
    e = this._da.get(t);
    await e.ShowAsync(), e.Update(i);
  }
  async pda(e) {
    e = this.fda(e);
    this._da.has(e) && (await this._da.get(e).HideAsync());
  }
  fda(e) {
    return 2 === e || 3 === e ? 2 : e;
  }
  Cda() {
    this._da.forEach((e) => {
      e.UnBindPassRecallBaseCallBack(), e.CloseMeAsync();
    }),
      this._da.clear();
  }
  async vda(e) {
    let i = void 0;
    var t = this.GetItem(2);
    switch (e) {
      case 4:
        await (i =
          new ActivityRegressSignInSubView_1.ActivityRegressSignInSubView()).CreateThenShowByResourceIdAsync(
          "UiItem_CircumfluenceSignin",
          t,
        );
        break;
      case 1:
        await (i =
          new ActivityRegressAreaSubView_1.ActivityRegressAreaSubView()).CreateThenShowByResourceIdAsync(
          "UiItem_CircumfluenceArea",
          t,
        );
        break;
      case 0:
        await (i =
          new ActivityRegressMainLineSubView_1.ActivityRegressMainLineSubView()).CreateThenShowByResourceIdAsync(
          "UiItem_CircumfluenceArea",
          t,
        );
        break;
      case 2:
      case 3:
        ((i =
          new ActivityRegressRoleSubView_1.ActivityRegressRoleSubView()).OpenParam =
          3),
          await i.CreateThenShowByResourceIdAsync(
            "UiItem_CircumfluenceArea",
            t,
          );
    }
    return i.BindPassRecallBaseCallBack(this.QCa), i;
  }
  async mda(e, i = 0) {
    e !== this.uda &&
      (void 0 !== this.uda && (await this.pda(this.uda)),
      await this.gda(e, i),
      (this.uda = e),
      this.qEi());
  }
  qEi() {
    let e = void 0;
    4 === this.uda && (e = "RecallActivity_Sign_Title");
    var i = this.gTa(),
      i =
        void 0 !== i
          ? ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i)
          : "";
    e &&
      this.cda.UpdateTitle(i, new CommonTabTitleData_1.CommonTabTitleData(e));
  }
  CTa(e) {
    switch (e) {
      case 1:
        return "SP_CircumfluenceIconyeqianA";
      case 2:
        return "SP_CircumfluenceIconyeqianB";
      case 3:
      case 4:
        return "SP_FuncIconRoleC";
    }
  }
  gTa() {
    switch (this.uda) {
      case 0:
        return "SP_CircumfluenceIconyeqianA";
      case 1:
        return "SP_CircumfluenceIconyeqianB";
      case 2:
      case 3:
        return "SP_FuncIconRoleC";
    }
  }
  Og() {
    var e = this._da.get(this.uda);
    e && e.Update();
  }
  async sso() {
    var e = new CommonTabComponentData_1.CommonTabComponentData(
      this.jdi,
      this.zno,
      this.yqe,
    );
    (this.dda =
      ConfigManager_1.ConfigManager.ActivityRegressConfig.GetUnlockRegressEntryViewConfigList()),
      (this.cda =
        new ActivityRegressMainCaptionListPanel_1.ActivityRegressMainCaptionListPanel());
    var i = this.GetItem(0).GetOwner();
    this.cda.Init(e),
      await this.cda.CreateThenShowByActorAsync(i),
      await this.Tfa(),
      this.cda.BindTabTitleCallBack(() => {
        UiManager_1.UiManager.CloseView("ActivityRegressMainView");
      });
  }
  async Tfa() {
    this.dda =
      ConfigManager_1.ConfigManager.ActivityRegressConfig.GetUnlockRegressEntryViewConfigList();
    var i = new Array();
    let t = void 0;
    for (let e = 0; e < this.dda.length; e++) {
      var a = new CommonTabItemBase_1.CommonTabItemData(),
        s =
          ((a.Index = e),
          (a.Data = this.cda.GetTabComponentData(e)),
          this.dda[e]),
        [s, r] =
          ModelManager_1.ModelManager.ActivityRegressModel.CheckIfEntryOpen(s);
      s &&
        (void 0 !== r && 0 < r && (t = void 0 === t ? r : Math.min(r, t)),
        i.push(a));
    }
    await this.cda.RefreshTabItemByDataAsync(i),
      void 0 !== t && 0 < t
        ? (this.Lfa(),
          (ModelManager_1.ModelManager.ActivityRegressModel.EntryEndTimeStamp =
            TimeUtil_1.TimeUtil.GetServerTimeStamp() + t),
          (this.TDe = TimerSystem_1.RealTimeTimerSystem.Forever(
            this.Ifa,
            TimeUtil_1.TimeUtil.InverseMillisecond,
          )))
        : (ModelManager_1.ModelManager.ActivityRegressModel.EntryEndTimeStamp =
            void 0);
  }
  KCa(e) {
    var i = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
    return 1 === i ? e.BgPath : 0 === i ? e.BgPathF : "";
  }
  Lfa() {
    this.TDe &&
      (TimerSystem_1.RealTimeTimerSystem.Remove(this.TDe), (this.TDe = void 0)),
      (ModelManager_1.ModelManager.ActivityRegressModel.EntryEndTimeStamp =
        void 0);
  }
}
exports.ActivityRegressMainView = ActivityRegressMainView;
//# sourceMappingURL=ActivityRegressMainView.js.map
