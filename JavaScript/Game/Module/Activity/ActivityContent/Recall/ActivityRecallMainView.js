"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRecallMainView = void 0);
const UE = require("ue"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  CommonTabComponentData_1 = require("../../../Common/TabComponent/CommonTabComponentData"),
  CommonTabData_1 = require("../../../Common/TabComponent/CommonTabData"),
  CommonTabTitleData_1 = require("../../../Common/TabComponent/CommonTabTitleData"),
  CommonTabItemBase_1 = require("../../../Common/TabComponent/TabItem/CommonTabItemBase"),
  ActivityRecallAreaSubView_1 = require("./Area/ActivityRecallAreaSubView"),
  ActivityRecallMainLineSubView_1 = require("./MainLine/ActivityRecallMainLineSubView"),
  ActivityRecallHelper_1 = require("./Misc/ActivityRecallHelper"),
  ActivityRecallMainCaptionListPanel_1 = require("./Panels/ActivityRecallMainCaptionListPanel"),
  ActivityRecallTabItemPanel_1 = require("./Panels/ActivityRecallTabItemPanel"),
  ActivityRecallRoleSubView_1 = require("./Role/ActivityRecallRoleSubView"),
  ActivityRecallSignInSubView_1 = require("./SignIn/ActivityRecallSignInSubView"),
  ActivityRecallTaskSubView_1 = require("./Task/ActivityRecallTaskSubView");
class ActivityRecallMainView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.GOe = void 0),
      (this.Kca = void 0),
      (this.Xca = new Map()),
      (this.Yca = void 0),
      (this.Jca = void 0),
      (this.zca = void 0),
      (this.TDe = void 0),
      (this.Kwa = !1),
      (this.kOe = () => {
        this.Kca.CheckIfInShowTime() || this.CloseMe();
      }),
      (this.itt = () => {
        (this.Kca =
          ActivityRecallHelper_1.ActivityRecallHelper.ActivityRecallData),
          this.Og();
      }),
      (this.SDa = (i) => {
        var e;
        this.Kca &&
          (e = this.Xca.get(this.Yca)) &&
          4 === this.Yca &&
          20 === i &&
          e.RefreshByData(this.Kca);
      }),
      (this.jdi = (i, e) => {
        return new ActivityRecallTabItemPanel_1.ActivityRecallTabItemPanel();
      }),
      (this.zno = (i) => {
        this.Kwa ? (this.Kwa = !1) : this.Zca(i);
      }),
      (this.yqe = (i) => {
        var i = this.zca[i],
          e = i.Title,
          i = this.mTa(i.EntryType),
          i =
            void 0 !== i
              ? ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
                  i,
                )
              : "";
        return new CommonTabData_1.CommonTabData(
          i,
          new CommonTabTitleData_1.CommonTabTitleData(e),
        );
      }),
      (this.WCa = (e, t) => {
        var a = this.ida(this.Yca);
        if (t === a) {
          let i = "";
          switch (t) {
            case 0:
            case 1:
              i = this.QCa(e);
              break;
            case 2:
              var s = e.GachaId,
                s =
                  ConfigManager_1.ConfigManager.GachaConfig.GetGachaViewInfo(s);
              i = s
                ? s.UnderBgTexturePath
                : ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
                    "T_CircumfluenceSignInBg",
                  );
              break;
            default:
              i =
                ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
                  "T_CircumfluenceSignInBg",
                );
          }
          StringUtils_1.StringUtils.IsEmpty(i) ||
            ((a = this.GetTexture(1)), this.SetTextureByPath(i, a)),
            this.UiViewSequence.StopSequenceByKey("Switch"),
            this.PlaySequenceAsync("Switch", !0);
        }
      }),
      (this.Dfa = () => {
        this.Afa(), this.Jca.SelectToggleByIndex(0);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UITexture],
      [2, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    this.Kca = ActivityRecallHelper_1.ActivityRecallHelper.ActivityRecallData;
    var i = this.OpenParam,
      e = ActivityRecallHelper_1.ActivityRecallHelper.IsRecallEntryType(i);
    await this.sso(),
      e
        ? 3 === i
          ? ((this.Kwa = !0),
            this.Jca.SelectToggleByIndex(2, void 0, !0),
            await this.Zca(i, 1))
          : this.Jca.SelectToggleByIndex(i, !0)
        : await this.Zca(i),
      this.Jca.SetPnlListUiActive(e);
  }
  OnBeforeShow() {
    var i,
      e = this.ida(this.Yca),
      e = this.Xca.get(e);
    e &&
      ((i = e.IsShowOrShowing),
      e.SetActive(!0),
      i ||
        (this.UiViewSequence.StopSequenceByKey("Switch"),
        this.PlaySequenceAsync("Switch", !0),
        e.OnParentShow())),
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
    var i = this.ida(this.Yca),
      i = this.Xca.get(i);
    i && i.SetActive(!1);
  }
  OnBeforeDestroy() {
    if ((this.eda(), this.Jca)) {
      var i;
      for ([, i] of this.Jca?.GetTabItemMap()) i.Clear();
      this.Jca.Destroy(), (this.Jca = void 0);
    }
    this.Ufa();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnActivityUpdate,
      this.itt,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnCommonItemCountAnyChange,
        this.SDa,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnActivityUpdate,
      this.itt,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnCommonItemCountAnyChange,
        this.SDa,
      );
  }
  async tda(i, e) {
    const t = this.ida(i);
    this.Xca.has(t) ||
      (await this.rda(i).then((i) => {
        i && this.Xca.set(t, i);
      }));
    i = this.Xca.get(t);
    await i.ShowAsync(), i.RefreshByData(this.Kca, e);
  }
  async oda(i) {
    i = this.ida(i);
    this.Xca.has(i) && (await this.Xca.get(i).HideAsync());
  }
  ida(i) {
    return 2 === i || 3 === i ? 2 : i;
  }
  eda() {
    this.Xca.forEach((i) => {
      i.UnBindPassRecallBaseCallBack(), i.CloseMeAsync();
    }),
      this.Xca.clear();
  }
  async rda(i) {
    let e = void 0;
    var t = this.GetItem(2);
    switch (i) {
      case 5:
        await (e =
          new ActivityRecallSignInSubView_1.ActivityRecallSignInSubView()).CreateThenShowByResourceIdAsync(
          "UiItem_CircumfluenceSignin",
          t,
        );
        break;
      case 1:
        await (e =
          new ActivityRecallAreaSubView_1.ActivityRecallAreaSubView()).CreateThenShowByResourceIdAsync(
          "UiItem_CircumfluenceArea",
          t,
        );
        break;
      case 0:
        await (e =
          new ActivityRecallMainLineSubView_1.ActivityRecallMainLineSubView()).CreateThenShowByResourceIdAsync(
          "UiItem_CircumfluenceArea",
          t,
        );
        break;
      case 4:
        await (e =
          new ActivityRecallTaskSubView_1.ActivityRecallTaskSubView()).CreateThenShowByResourceIdAsync(
          "UiItem_CircumfluenceMission",
          t,
        );
        break;
      case 2:
      case 3:
        ((e =
          new ActivityRecallRoleSubView_1.ActivityRecallRoleSubView()).OpenParam =
          3),
          await e.CreateThenShowByResourceIdAsync(
            "UiItem_CircumfluenceArea",
            t,
          );
    }
    return e.BindPassRecallBaseCallBack(this.WCa), e;
  }
  async Zca(i, e = 0) {
    i !== this.Yca &&
      (void 0 !== this.Yca && (await this.oda(this.Yca)),
      await this.tda(i, e),
      (this.Yca = i),
      this.qEi());
  }
  qEi() {
    let i = void 0;
    5 === this.Yca && (i = "RecallActivity_Sign_Title"),
      4 === this.Yca && (i = "RecallActivity_Task_Title");
    var e = this.dTa(),
      e =
        void 0 !== e
          ? ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e)
          : "";
    i &&
      this.Jca.UpdateTitle(e, new CommonTabTitleData_1.CommonTabTitleData(i));
  }
  mTa(i) {
    switch (i) {
      case 1:
        return "SP_CircumfluenceIconyeqianA";
      case 2:
        return "SP_CircumfluenceIconyeqianB";
      case 3:
      case 4:
        return "SP_FuncIconRoleC";
    }
  }
  dTa() {
    switch (this.Yca) {
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
    var i;
    this.Kca && (i = this.Xca.get(this.Yca)) && i.RefreshByData(this.Kca);
  }
  async sso() {
    var i = new CommonTabComponentData_1.CommonTabComponentData(
      this.jdi,
      this.zno,
      this.yqe,
    );
    (this.zca =
      ActivityRecallHelper_1.ActivityRecallHelper.GetRecallOpenEntryViewConfigList()),
      (this.Jca =
        new ActivityRecallMainCaptionListPanel_1.ActivityRecallMainCaptionListPanel());
    var e = this.GetItem(0).GetOwner();
    this.Jca.Init(i),
      await this.Jca.CreateThenShowByActorAsync(e),
      await this.Afa();
  }
  async Afa() {
    this.zca =
      ActivityRecallHelper_1.ActivityRecallHelper.GetRecallOpenEntryViewConfigList();
    var e = new Array();
    let t = void 0;
    for (let i = 0; i < this.zca.length; i++) {
      var a = new CommonTabItemBase_1.CommonTabItemData(),
        s =
          ((a.Index = i),
          (a.Data = this.Jca.GetTabComponentData(i)),
          this.zca[i]),
        [s, n] =
          ActivityRecallHelper_1.ActivityRecallHelper.CheckIfEntryOpen(s);
      s &&
        (void 0 !== n && 0 < n && (t = void 0 === t ? n : Math.min(n, t)),
        e.push(a));
    }
    await this.Jca.RefreshTabItemByDataAsync(e),
      void 0 !== t &&
        0 < t &&
        (this.Ufa(),
        (this.TDe = TimerSystem_1.RealTimeTimerSystem.Delay(
          this.Dfa,
          t * TimeUtil_1.TimeUtil.InverseMillisecond,
        )));
  }
  QCa(i) {
    var e = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
    return 1 === e ? i.BgPath : 0 === e ? i.BgPathF : "";
  }
  Ufa() {
    this.TDe &&
      (TimerSystem_1.RealTimeTimerSystem.Remove(this.TDe), (this.TDe = void 0));
  }
}
exports.ActivityRecallMainView = ActivityRecallMainView;
//# sourceMappingURL=ActivityRecallMainView.js.map
