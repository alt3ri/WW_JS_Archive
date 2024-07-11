"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRecallMainView = void 0);
const UE = require("ue"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
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
      (this.G1a = void 0),
      (this.O1a = new Map()),
      (this.k1a = void 0),
      (this.N1a = void 0),
      (this.F1a = void 0),
      (this.TDe = void 0),
      (this.itt = () => {
        (this.G1a =
          ActivityRecallHelper_1.ActivityRecallHelper.ActivityRecallData),
          this.Og();
      }),
      (this.cIa = () => {
        this.Og();
      }),
      (this.jdi = (e, i) => {
        return new ActivityRecallTabItemPanel_1.ActivityRecallTabItemPanel();
      }),
      (this.zno = (e) => {
        this.V1a(e);
      }),
      (this.yqe = (e) => {
        var e = this.F1a[e],
          i = e.Title,
          e = this.FSa(e.EntryType),
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
      (this.jca = (i, t) => {
        var a = this.W1a(this.k1a);
        if (t === a) {
          let e = "";
          switch (t) {
            case 0:
            case 1:
              e = this.Wca(i);
              break;
            case 2:
              var n = i.GachaId,
                n =
                  ConfigManager_1.ConfigManager.GachaConfig.GetGachaViewInfo(n);
              e = n
                ? n.UnderBgTexturePath
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
          StringUtils_1.StringUtils.IsEmpty(e) ||
            ((a = this.GetTexture(1)), this.SetTextureByPath(e, a));
        }
      }),
      (this.bCa = () => {
        this.BCa();
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
    this.G1a = ActivityRecallHelper_1.ActivityRecallHelper.ActivityRecallData;
    var e = this.OpenParam,
      i = ActivityRecallHelper_1.ActivityRecallHelper.IsRecallEntryType(e);
    await this.sso(),
      i
        ? 3 === e
          ? (this.N1a.SelectToggleByIndex(2, void 0, !1), await this.V1a(e, 1))
          : this.N1a.SelectToggleByIndex(e, !0)
        : await this.V1a(e),
      this.N1a.SetPnlListUiActive(i);
  }
  OnBeforeDestroy() {
    if ((this.H1a(), this.N1a)) {
      var e;
      for ([, e] of this.N1a?.GetTabItemMap()) e.Clear();
      this.N1a.Destroy(), (this.N1a = void 0);
    }
    this.qCa();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnActivityUpdate,
      this.itt,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnCommonItemCountAnyChange,
        this.cIa,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnActivityUpdate,
      this.itt,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnCommonItemCountAnyChange,
        this.cIa,
      );
  }
  async j1a(e, i) {
    const t = this.W1a(e);
    this.O1a.has(t) ||
      (await this.Q1a(e).then((e) => {
        e && this.O1a.set(t, e);
      }));
    e = this.O1a.get(t);
    await e.ShowAsync(), e.RefreshByData(this.G1a, i);
  }
  async K1a(e) {
    e = this.W1a(e);
    this.O1a.has(e) && (await this.O1a.get(e).HideAsync());
  }
  W1a(e) {
    return 2 === e || 3 === e ? 2 : e;
  }
  H1a() {
    this.O1a.forEach((e) => {
      e.UnBindPassRecallBaseCallBack(), e.CloseMeAsync();
    }),
      this.O1a.clear();
  }
  async Q1a(e) {
    let i = void 0;
    var t = this.GetItem(2);
    switch (e) {
      case 5:
        await (i =
          new ActivityRecallSignInSubView_1.ActivityRecallSignInSubView()).CreateThenShowByResourceIdAsync(
          "UiItem_CircumfluenceSignin",
          t,
        );
        break;
      case 1:
        await (i =
          new ActivityRecallAreaSubView_1.ActivityRecallAreaSubView()).CreateThenShowByResourceIdAsync(
          "UiItem_CircumfluenceArea",
          t,
        );
        break;
      case 0:
        await (i =
          new ActivityRecallMainLineSubView_1.ActivityRecallMainLineSubView()).CreateThenShowByResourceIdAsync(
          "UiItem_CircumfluenceArea",
          t,
        );
        break;
      case 4:
        await (i =
          new ActivityRecallTaskSubView_1.ActivityRecallTaskSubView()).CreateThenShowByResourceIdAsync(
          "UiItem_CircumfluenceMission",
          t,
        );
        break;
      case 2:
      case 3:
        ((i =
          new ActivityRecallRoleSubView_1.ActivityRecallRoleSubView()).OpenParam =
          3),
          await i.CreateThenShowByResourceIdAsync(
            "UiItem_CircumfluenceArea",
            t,
          );
    }
    return i.BindPassRecallBaseCallBack(this.jca), i;
  }
  async V1a(e, i = 0) {
    e !== this.k1a &&
      (void 0 !== this.k1a && (await this.K1a(this.k1a)),
      await this.j1a(e, i),
      (this.k1a = e),
      this.qEi(),
      5 !== this.k1a) &&
      4 !== this.k1a &&
      this.IsShowOrShowing &&
      (await this.PlaySequenceAsync("Switch", !0));
  }
  qEi() {
    let e = void 0;
    5 === this.k1a && (e = "RecallActivity_Sign_Title"),
      4 === this.k1a && (e = "RecallActivity_Task_Title");
    var i = this.VSa(),
      i =
        void 0 !== i
          ? ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i)
          : "";
    e &&
      this.N1a.UpdateTitle(i, new CommonTabTitleData_1.CommonTabTitleData(e));
  }
  FSa(e) {
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
  VSa() {
    switch (this.k1a) {
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
    var e;
    this.G1a && (e = this.O1a.get(this.k1a)) && e.RefreshByData(this.G1a);
  }
  async sso() {
    var e = new CommonTabComponentData_1.CommonTabComponentData(
      this.jdi,
      this.zno,
      this.yqe,
    );
    (this.F1a =
      ActivityRecallHelper_1.ActivityRecallHelper.GetRecallOpenEntryViewConfigList()),
      (this.N1a =
        new ActivityRecallMainCaptionListPanel_1.ActivityRecallMainCaptionListPanel());
    var i = this.GetItem(0).GetOwner();
    this.N1a.Init(e),
      await this.N1a.CreateThenShowByActorAsync(i),
      await this.BCa();
  }
  async BCa() {
    this.F1a =
      ActivityRecallHelper_1.ActivityRecallHelper.GetRecallOpenEntryViewConfigList();
    var i = new Array();
    let t = 0;
    for (let e = 0; e < this.F1a.length; e++) {
      var a = new CommonTabItemBase_1.CommonTabItemData(),
        n =
          ((a.Index = e),
          (a.Data = this.N1a.GetTabComponentData(e)),
          this.F1a[e]),
        [, n] = ActivityRecallHelper_1.ActivityRecallHelper.CheckIfEntryOpen(n);
      void 0 !== n && 0 < n && (t = Math.min(n, t)), i.push(a);
    }
    await this.N1a.RefreshTabItemByDataAsync(i),
      0 < t &&
        (this.qCa(),
        (this.TDe = TimerSystem_1.RealTimeTimerSystem.Delay(
          this.bCa,
          1e3 * t,
        )));
  }
  Wca(e) {
    var i = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
    return 1 === i ? e.BgPath : 0 === i ? e.BgPathF : "";
  }
  qCa() {
    this.TDe &&
      (TimerSystem_1.RealTimeTimerSystem.Remove(this.TDe), (this.TDe = void 0));
  }
}
exports.ActivityRecallMainView = ActivityRecallMainView;
//# sourceMappingURL=ActivityRecallMainView.js.map
