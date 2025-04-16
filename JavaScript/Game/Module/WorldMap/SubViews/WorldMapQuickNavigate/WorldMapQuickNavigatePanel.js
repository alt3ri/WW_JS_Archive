"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldMapQuickNavigatePanel = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiSequencePlayer_1 = require("../../../../Ui/Base/UiSequencePlayer"),
  ExploreProgressController_1 = require("../../../ExploreProgress/ExploreProgressController"),
  MapUtil_1 = require("../../../Map/MapUtil"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  DynScrollView_1 = require("../../../Util/ScrollView/DynScrollView"),
  LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView"),
  WorldMapSecondaryUi_1 = require("../../ViewComponent/WorldMapSecondaryUi"),
  WorldMapDefine_1 = require("../../WorldMapDefine"),
  PopupRightItemA_1 = require("../Common/PopupRightItemA"),
  NavigateIconItem_1 = require("./NavigateIconItem"),
  QuickNavigateDynamicData_1 = require("./QuickNavigateDynamicData"),
  QuickNavigateDynamicItem_1 = require("./QuickNavigateDynamicItem"),
  QuickNavigateDynamicScrollItem_1 = require("./QuickNavigateDynamicScrollItem"),
  QuickNavigateLoopScrollAreaGridItem_1 = require("./QuickNavigateLoopScrollAreaGridItem"),
  QuickNavigateLoopScrollAreaGridItemData_1 = require("./QuickNavigateLoopScrollAreaGridItemData");
class WorldMapQuickNavigatePanel extends WorldMapSecondaryUi_1.WorldMapSecondaryUi {
  constructor() {
    super(...arguments),
      (this.xYa = void 0),
      (this.SequencePlayer = void 0),
      (this.MPi = void 0),
      (this.PYa = void 0),
      (this.WNl = void 0),
      (this.sma = void 0),
      (this.xec = !1),
      (this.cHe = () => {
        return new QuickNavigateLoopScrollAreaGridItem_1.QuickNavigateLoopScrollAreaGridItem();
      }),
      (this.Mma = (e, t, i) => {
        return new QuickNavigateDynamicScrollItem_1.QuickNavigateDynamicScrollItem();
      }),
      (this.wYa = (e) => {
        0 === e.ItemType
          ? this.BYa(e.CountryId, e.Index)
          : this.lkn(e.StateId, e.Index);
      }),
      (this.bYa = (e) => {
        var t = this.PYa.TryGetCachedData(e).AreaNavigateInfo;
        this.qYa(t.AreaId, e);
      }),
      (this.tZa = () => {
        this.GetItem(5).SetUIActive(!0);
      }),
      (this.Teh = () => {
        this.GetItem(5).SetUIActive(!1);
      }),
      (this.Leh = () => {
        (this.xYa = void 0),
          this.JJa(),
          this.Cth(4),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.WorldMapFocusPlayer,
          );
      }),
      (this.QNl = (e, t) => {
        ControllerHolder_1.ControllerHolder.UiNavigationNewController.MarkViewHandleRefreshNavigationDirty(),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnWorldMapTrackMarkItem,
            t.MarkType,
            t.MarkId,
          );
      }),
      (this.kOe = () => {
        ModelManager_1.ModelManager.OnlineModel.GetIsTeamModel() &&
          ExploreProgressController_1.ExploreProgressController.QueryOnlinePlayersAreaAsyncRequest();
      }),
      (this.KNl = () => {
        this.Cth(1);
      }),
      (this.e5l = () => {
        var e = this.Map.GetNavigateMarkList();
        this.OnBeforeShowWorldMapSecondaryUiAsync(e);
      });
  }
  GetResourceId() {
    return "UiItem_MapChange";
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIDynScrollViewComponent],
      [1, UE.UIItem],
      [2, UE.UIButtonComponent],
      [3, UE.UILoopScrollViewComponent],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIHorizontalLayout],
    ];
  }
  GetPopupRightItem() {
    return new PopupRightItemA_1.PopupRightItemA();
  }
  async OnBeforeStartAsync() {
    var e;
    this.UiBgItem &&
      (await this.UiBgItem.CreateByResourceIdAsync(
        "UiView_PopupR1",
        this.ParentUiItem,
        this.UsePool,
      ),
      (e = this.GetOriginalActor().GetComponentByClass(
        UE.UIItem.StaticClass(),
      )),
      this.UiBgItem.AttachItem(e, this.GetRootItem()),
      this.UiBgItem.SetPopupViewBase(),
      this.UiBgItem.OverrideBackBtnCallBack(this.Close),
      this.UiBgItem.SetTitleLocalTxt("MapQuickChange_Text"),
      this.UiBgItem.SetTitleIcon("SP_IconMapChange"),
      this.AddChild(this.UiBgItem)),
      (this.PYa = new LoopScrollView_1.LoopScrollView(
        this.GetLoopScrollViewComponent(3),
        this.GetItem(4).GetOwner(),
        this.cHe,
      )),
      (this.MPi = new DynScrollView_1.DynamicScrollView(
        this.GetUIDynScrollViewComponent(0),
        this.GetItem(1),
        new QuickNavigateDynamicItem_1.QuickNavigateDynamicItem(),
        this.Mma,
      )),
      await this.MPi.Init(),
      (this.WNl = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(6),
        () => new NavigateIconItem_1.NavigateIconItem(),
      ));
  }
  OnStart() {
    var e = this.GetRootItem();
    this.SequencePlayer = new UiSequencePlayer_1.UiSequencePlayer(e);
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.WorldMapFirstNavigateSelect,
      this.wYa,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldMapSecondNavigateSelect,
        this.bYa,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldMapBeforeChangeMap,
        this.tZa,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldMapAfterChangeMap,
        this.Teh,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.UpdateOnlinePlayersArea,
        this.KNl,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.PlayerMarkItemChanged,
        this.e5l,
      );
    var e = 3 * TimeUtil_1.TimeUtil.InverseMillisecond;
    (this.sma = TimerSystem_1.RealTimeTimerSystem.Forever(this.kOe, e)),
      this.kOe();
  }
  OnAfterHide() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.WorldMapFirstNavigateSelect,
      this.wYa,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldMapSecondNavigateSelect,
        this.bYa,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldMapBeforeChangeMap,
        this.tZa,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldMapAfterChangeMap,
        this.Teh,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.UpdateOnlinePlayersArea,
        this.KNl,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.PlayerMarkItemChanged,
        this.e5l,
      ),
      this.jm();
  }
  JJa() {
    var e;
    void 0 === this.xYa &&
      ((this.xYa = {
        FirstIndex: 0,
        SecondIndex: 0,
        CountryId: 0,
        ExpandCountry: !0,
        StateId: 0,
        AreaId: 0,
      }),
      (e = MapUtil_1.MapUtil.GetWorldMapLevelOneAreaId()),
      (e =
        ConfigManager_1.ConfigManager.MapConfig.WorldMapNavigateAreaMap.get(
          e,
        ))) &&
      ((this.xYa.CountryId = e.CountryId),
      (this.xYa.StateId = e.StateId ?? 0),
      (this.xYa.AreaId = e.AreaId));
  }
  OnShowWorldMapSecondaryUi() {
    this.JJa(), this.Cth(4);
  }
  async OnBeforeShowWorldMapSecondaryUiAsync(e) {
    e = this.$Nl(e);
    await this.WNl?.RefreshByDataAsync(e);
  }
  OnCloseWorldMapSecondaryUi() {
    this.xYa = void 0;
  }
  OnBeforeDestroy() {
    this.PYa?.ClearGridProxies(),
      (this.PYa = void 0),
      this.MPi?.ClearChildren(),
      (this.MPi = void 0),
      (this.WNl = void 0);
  }
  Cth(t) {
    var e;
    if (
      ((4 !== t && 3 !== t) || ((e = this.GYa(t)), this.MPi.RefreshByData(e)),
      2 === t)
    ) {
      var i = this.GYa(t);
      let e = 0;
      for (const r of this.MPi.GetScrollItemItems()) r.Update(i[e], e++);
    }
    if (4 === t || 1 === t || 2 === t) {
      const a = this.kYa(t);
      this.PYa.RefreshByData(a, void 0, () => {
        var e;
        4 === t
          ? ((e = a.findIndex((e) => e.IsSelected)),
            this.PYa?.ScrollToGridIndex(e, !1))
          : this.xec && (this.PYa?.ScrollToGridIndex(0, !1), (this.xec = !1));
      });
    }
  }
  GYa(n) {
    var e = ConfigManager_1.ConfigManager.MapConfig.WorldMapNavigateCountryList;
    const o = [];
    return (
      e.forEach((e) => {
        var t = e.CountryId,
          i = e.NavigateCountry,
          r = new QuickNavigateDynamicData_1.QuickNavigateDynamicData();
        if (
          ((r.ItemType = 0),
          (r.CountryId = t),
          (r.Index = o.length),
          (r.IsSelected = this.xYa.CountryId === t),
          (r.RefreshType = n),
          (r.HasState = void 0 !== i.StateMap),
          o.push(r),
          void 0 !== i.StateMap)
        )
          for (const [, e] of i.StateMap) {
            0 === this.xYa.CountryId &&
              ((this.xYa.CountryId = t),
              (this.xYa.ExpandCountry = !0),
              (this.xYa.StateId = e.StateId ?? 0),
              (this.xYa.AreaId = e.AreaNavigateList[0].AreaId),
              (r.IsSelected = this.xYa.CountryId === t)),
              (r.StateId = e.StateId);
            var a = this.xYa.CountryId === t,
              s = this.xYa.ExpandCountry;
            a &&
              s &&
              ((this.xYa.FirstIndex = o.length - 1),
              ((a =
                new QuickNavigateDynamicData_1.QuickNavigateDynamicData()).ItemType =
                1),
              (a.CountryId = t),
              (a.StateId = e.StateId),
              (a.Index = o.length),
              (a.IsSelected = this.xYa.StateId === e.StateId),
              (a.RefreshType = n),
              o.push(a),
              this.xYa.StateId === e.StateId) &&
              (this.xYa.FirstIndex = o.length - 1);
          }
        else
          0 === this.xYa.CountryId &&
            ((this.xYa.CountryId = t),
            (this.xYa.ExpandCountry = !1),
            (this.xYa.StateId = 0),
            (this.xYa.AreaId = i.AreaNavigateList[0].AreaId),
            (r.IsSelected = this.xYa.CountryId === t));
      }),
      o
    );
  }
  kYa(r) {
    const a = [];
    var e = this.xYa.CountryId,
      t = this.xYa.StateId,
      e =
        ConfigManager_1.ConfigManager.MapConfig.WorldMapNavigateCountryMap.get(
          e,
        );
    let i = e.AreaNavigateList;
    return (
      (i = e.StateMap ? e.StateMap.get(t).AreaNavigateList : i).forEach((e) => {
        var t =
            new QuickNavigateLoopScrollAreaGridItemData_1.QuickNavigateLoopScrollAreaGridItemData(),
          i =
            ((t.AreaNavigateInfo = e),
            (t.Index = a.length),
            (t.RefreshType = r),
            a.push(t),
            0 === this.xYa.AreaId && (this.xYa.AreaId = e.AreaId),
            this.xYa.AreaId === e.AreaId);
        i && (this.xYa.FirstIndex = a.length - 1),
          (t.IsSelected = this.xYa.AreaId === e.AreaId);
      }),
      a
    );
  }
  Fp(e) {
    var t =
        void 0 !==
        ConfigManager_1.ConfigManager.MapConfig.WorldMapNavigateCountryMap.get(
          e.CountryId,
        )?.StateMap,
      i = e.StateId !== this.xYa?.StateId,
      t = t && e.ExpandCountry !== this.xYa?.ExpandCountry,
      r = e.CountryId !== this.xYa?.CountryId,
      a = t || r;
    this.xYa = e;
    let s = 0;
    i || a
      ? i && !a
        ? ((s = 2), this.Cth(s), this.ZJa())
        : r
          ? ((s = 4), this.Cth(s), this.ZJa())
          : t && ((s = 3), this.Cth(s))
      : ((s = 1), this.Cth(s), this.ZJa());
  }
  BYa(e, t) {
    var i =
      ConfigManager_1.ConfigManager.MapConfig.WorldMapNavigateCountryMap.get(e);
    let r = !this.xYa.ExpandCountry;
    var a,
      s,
      n = e !== this.xYa.CountryId;
    void 0 !== i.StateMap
      ? (n && (r = !0),
        (s = (a = i.StateMap.values().next().value).AreaNavigateList[0]),
        (this.xec = e === this.xYa?.CountryId),
        this.Fp({
          FirstIndex: t,
          SecondIndex: 0,
          CountryId: e,
          ExpandCountry: r,
          StateId: a.StateId,
          AreaId: s.AreaId,
        }))
      : ((this.xec = e === this.xYa?.CountryId),
        this.Fp({
          FirstIndex: t,
          SecondIndex: 0,
          CountryId: e,
          ExpandCountry: !1,
          StateId: 0,
          AreaId: i.AreaNavigateList[0].AreaId,
        })),
      n &&
        (this.SequencePlayer.IsSequenceInPlaying("Switch")
          ? this.SequencePlayer.ReplaySequence("Switch")
          : this.SequencePlayer.PlaySequence("Switch"));
  }
  lkn(e, t) {
    var i = e !== this.xYa.StateId,
      r =
        ConfigManager_1.ConfigManager.MapConfig.WorldMapNavigateCountryMap.get(
          this.xYa.CountryId,
        ).StateMap.get(e);
    this.Fp({
      FirstIndex: t,
      SecondIndex: 0,
      CountryId: this.xYa.CountryId,
      ExpandCountry: this.xYa?.ExpandCountry ?? !0,
      StateId: e,
      AreaId: r.AreaNavigateList[0].AreaId,
    }),
      i &&
        (this.SequencePlayer.IsSequenceInPlaying("Switch")
          ? this.SequencePlayer.ReplaySequence("Switch")
          : this.SequencePlayer.PlaySequence("Switch"));
  }
  qYa(e, t) {
    this.Fp({
      FirstIndex: this.xYa.FirstIndex,
      SecondIndex: t,
      CountryId: this.xYa.CountryId,
      ExpandCountry: this.xYa?.ExpandCountry ?? !0,
      StateId: this.xYa.StateId,
      AreaId: e,
    });
  }
  ZJa(e = !1) {
    e && this.Close();
    e = ConfigManager_1.ConfigManager.MapConfig.WorldMapNavigateAreaMap.get(
      this.xYa.AreaId,
    );
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldMapNavigate, {
      MarkId: e.MarkId,
      MarkType: e.MarkType,
    });
  }
  $Nl(e) {
    ModelManager_1.ModelManager.ExploreProgressModel.ClearTrackTaskAreaId();
    const i = [];
    return (
      e.forEach((e) => {
        switch (e.MarkType) {
          case 12:
            i.push({
              Id: 1,
              IconPath: e.IconPath,
              ClickCallback: this.QNl,
              MarkItem: e,
            }),
              this.XNl(e);
            break;
          case 11:
            var t = e.PlayerIndex - 1;
            i.push({
              Id: 2 + t,
              IconId: WorldMapDefine_1.onlinePlayerIconPathList2[t],
              ClickCallback: this.QNl,
              MarkItem: e,
            });
        }
      }),
      i.sort((e, t) => t.Id - e.Id),
      i.push({ Id: 0, IconId: "SP_IconCommonPlayer", ClickCallback: this.Leh }),
      i
    );
  }
  XNl(e) {
    var t,
      i = e.TrackTarget;
    "number" != typeof i
      ? Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "ExploreProgress",
          69,
          "UpdateTrackTaskArea",
          ["EntityId", i],
          ["MapId", e.MapId],
          ["MarkType", e.MarkType],
          ["MarkId", e.MarkId],
        )
      : ((t =
          ConfigManager_1.ConfigManager.MapConfig.GetEntityConfigByMapIdAndEntityId(
            e.MapId,
            i,
          )?.AreaId),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "ExploreProgress",
            69,
            "UpdateTrackTaskArea",
            ["AreaId", t],
            ["EntityId", i],
            ["MapId", e.MapId],
            ["MarkType", e.MarkType],
            ["MarkId", e.MarkId],
          ),
        t &&
          (i = ConfigManager_1.ConfigManager.AreaConfig.GetLevelOneAreaId(t)) &&
          ModelManager_1.ModelManager.ExploreProgressModel.SetTrackTaskAreaId(
            i,
            e.IconPath,
          ));
  }
  jm() {
    TimerSystem_1.RealTimeTimerSystem.Has(this.sma) &&
      (TimerSystem_1.RealTimeTimerSystem.Remove(this.sma), (this.sma = void 0));
  }
}
exports.WorldMapQuickNavigatePanel = WorldMapQuickNavigatePanel;
//# sourceMappingURL=WorldMapQuickNavigatePanel.js.map
