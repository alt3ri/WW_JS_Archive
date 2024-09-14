"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldMapQuickNavigatePanel = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiSequencePlayer_1 = require("../../../../Ui/Base/UiSequencePlayer"),
  ExploreProgressDefine_1 = require("../../../ExploreProgress/ExploreProgressDefine"),
  MapUtil_1 = require("../../../Map/MapUtil"),
  DynScrollView_1 = require("../../../Util/ScrollView/DynScrollView"),
  LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView"),
  WorldMapSecondaryUi_1 = require("../../ViewComponent/WorldMapSecondaryUi"),
  PopupRightItemA_1 = require("../Common/PopupRightItemA"),
  QuickNavigateDynamicData_1 = require("./QuickNavigateDynamicData"),
  QuickNavigateDynamicItem_1 = require("./QuickNavigateDynamicItem"),
  QuickNavigateDynamicScrollItem_1 = require("./QuickNavigateDynamicScrollItem"),
  QuickNavigateLoopScrollAreaGridItem_1 = require("./QuickNavigateLoopScrollAreaGridItem"),
  QuickNavigateLoopScrollAreaGridItemData_1 = require("./QuickNavigateLoopScrollAreaGridItemData");
class WorldMapQuickNavigatePanel extends WorldMapSecondaryUi_1.WorldMapSecondaryUi {
  constructor() {
    super(...arguments),
      (this.uKa = void 0),
      (this.SequencePlayer = void 0),
      (this.MPi = void 0),
      (this.cKa = void 0),
      (this.cHe = () => {
        return new QuickNavigateLoopScrollAreaGridItem_1.QuickNavigateLoopScrollAreaGridItem();
      }),
      (this.nma = (t, e, i) => {
        return new QuickNavigateDynamicScrollItem_1.QuickNavigateDynamicScrollItem();
      }),
      (this.mKa = (t) => {
        0 === t.ItemType
          ? this.dKa(t.CountryId, t.Index)
          : this.lkn(t.StateId, t.Index);
      }),
      (this.CKa = (t) => {
        var e = this.cKa.TryGetCachedData(t).AreaNavigateInfo;
        this.gKa(e.AreaId, t);
      }),
      (this.qXa = () => {
        this.GetItem(5).SetUIActive(!0);
      }),
      (this.PYa = () => {
        this.GetItem(5).SetUIActive(!1);
      }),
      (this.wYa = () => {
        var t =
            ModelManager_1.ModelManager.AreaModel.GetCurrentAreaId(
              ExploreProgressDefine_1.AREA_LEVEL,
            ) ?? 0,
          t =
            ConfigManager_1.ConfigManager.MapConfig.WorldMapNavigateAreaMap.get(
              t,
            );
        t &&
          this.Fp({
            FirstIndex: 0,
            SecondIndex: 0,
            CountryId: t.CountryId,
            ExpandCountry: !0,
            StateId: t.StateId ?? 0,
            AreaId: t.AreaId,
          });
      });
  }
  GetResourceId() {
    return "UiItem_MapChange";
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIDynScrollViewComponent],
      [1, UE.UIItem],
      [2, UE.UIButtonComponent],
      [3, UE.UILoopScrollViewComponent],
      [4, UE.UIItem],
      [5, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[2, this.wYa]]);
  }
  GetPopupRightItem() {
    return new PopupRightItemA_1.PopupRightItemA();
  }
  async OnBeforeStartAsync() {
    var t;
    this.UiBgItem &&
      (await this.UiBgItem.CreateByResourceIdAsync(
        "UiView_PopupR1",
        this.ParentUiItem,
        this.UsePool,
      ),
      (t = this.GetOriginalActor().GetComponentByClass(
        UE.UIItem.StaticClass(),
      )),
      this.UiBgItem.AttachItem(t, this.GetRootItem()),
      this.UiBgItem.SetPopupViewBase(),
      this.UiBgItem.OverrideBackBtnCallBack(this.Close),
      this.UiBgItem.SetTitleLocalTxt("MapQuickChange_Text"),
      this.UiBgItem.SetTitleIcon("SP_IconMapChange"),
      this.AddChild(this.UiBgItem)),
      (this.cKa = new LoopScrollView_1.LoopScrollView(
        this.GetLoopScrollViewComponent(3),
        this.GetItem(4).GetOwner(),
        this.cHe,
      )),
      (this.MPi = new DynScrollView_1.DynamicScrollView(
        this.GetUIDynScrollViewComponent(0),
        this.GetItem(1),
        new QuickNavigateDynamicItem_1.QuickNavigateDynamicItem(),
        this.nma,
      )),
      await this.MPi.Init();
  }
  OnStart() {
    var t = this.GetRootItem();
    this.SequencePlayer = new UiSequencePlayer_1.UiSequencePlayer(t);
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.WorldMapFirstNavigateSelect,
      this.mKa,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldMapSecondNavigateSelect,
        this.CKa,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldMapBeforeChangeMap,
        this.qXa,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldMapAfterChangeMap,
        this.PYa,
      );
  }
  OnAfterHide() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.WorldMapFirstNavigateSelect,
      this.mKa,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldMapSecondNavigateSelect,
        this.CKa,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldMapBeforeChangeMap,
        this.qXa,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldMapAfterChangeMap,
        this.PYa,
      );
  }
  wXa() {
    var t;
    void 0 === this.uKa &&
      ((this.uKa = {
        FirstIndex: 0,
        SecondIndex: 0,
        CountryId: 0,
        ExpandCountry: !0,
        StateId: 0,
        AreaId: 0,
      }),
      (t = MapUtil_1.MapUtil.GetWorldMapAreaId(
        ExploreProgressDefine_1.AREA_LEVEL,
      )),
      (t =
        ConfigManager_1.ConfigManager.MapConfig.WorldMapNavigateAreaMap.get(
          t,
        ))) &&
      ((this.uKa.CountryId = t.CountryId),
      (this.uKa.StateId = t.StateId ?? 0),
      (this.uKa.AreaId = t.AreaId));
  }
  OnShowWorldMapSecondaryUi() {
    this.wXa(), this.nza(4), this.BXa();
  }
  OnCloseWorldMapSecondaryUi() {
    this.uKa = void 0;
  }
  OnBeforeDestroy() {
    this.cKa?.ClearGridProxies(),
      (this.cKa = void 0),
      this.MPi?.ClearChildren(),
      (this.MPi = void 0);
  }
  nza(e) {
    var t;
    if (
      ((4 !== e && 3 !== e) || ((t = this.pKa(e)), this.MPi.RefreshByData(t)),
      2 === e)
    ) {
      var i = this.pKa(e);
      let t = 0;
      for (const r of this.MPi.GetScrollItemItems()) r.Update(i[t], t++);
    }
    (4 !== e && 1 !== e && 2 !== e) ||
      ((t = this.vKa(e)), this.cKa.RefreshByData(t));
  }
  pKa(n) {
    var t = ConfigManager_1.ConfigManager.MapConfig.WorldMapNavigateCountryMap;
    const h = [];
    return (
      t.forEach((t, e) => {
        var i = new QuickNavigateDynamicData_1.QuickNavigateDynamicData();
        if (
          ((i.ItemType = 0),
          (i.CountryId = e),
          (i.Index = h.length),
          (i.IsSelected = this.uKa.CountryId === e),
          (i.RefreshType = n),
          (i.HasState = void 0 !== t.StateMap),
          h.push(i),
          void 0 !== t.StateMap)
        )
          for (var [, r] of t.StateMap) {
            0 === this.uKa.CountryId &&
              ((this.uKa.CountryId = e),
              (this.uKa.ExpandCountry = !0),
              (this.uKa.StateId = r.StateId ?? 0),
              (this.uKa.AreaId = r.AreaNavigateList[0].AreaId),
              (i.IsSelected = this.uKa.CountryId === e)),
              (i.StateId = r.StateId);
            var a = this.uKa.CountryId === e,
              s = this.uKa.ExpandCountry;
            a &&
              s &&
              ((this.uKa.FirstIndex = h.length - 1),
              ((a =
                new QuickNavigateDynamicData_1.QuickNavigateDynamicData()).ItemType =
                1),
              (a.CountryId = e),
              (a.StateId = r.StateId),
              (a.Index = h.length),
              (a.IsSelected = this.uKa.StateId === r.StateId),
              (a.RefreshType = n),
              h.push(a),
              this.uKa.StateId === r.StateId) &&
              (this.uKa.FirstIndex = h.length - 1);
          }
        else
          0 === this.uKa.CountryId &&
            ((this.uKa.CountryId = e),
            (this.uKa.ExpandCountry = !1),
            (this.uKa.StateId = 0),
            (this.uKa.AreaId = t.AreaNavigateList[0].AreaId),
            (i.IsSelected = this.uKa.CountryId === e));
      }),
      h
    );
  }
  vKa(r) {
    const a = [];
    var t = this.uKa.CountryId,
      e = this.uKa.StateId,
      t =
        ConfigManager_1.ConfigManager.MapConfig.WorldMapNavigateCountryMap.get(
          t,
        );
    let i = t.AreaNavigateList;
    return (
      (i = t.StateMap ? t.StateMap.get(e).AreaNavigateList : i).forEach((t) => {
        var e =
            new QuickNavigateLoopScrollAreaGridItemData_1.QuickNavigateLoopScrollAreaGridItemData(),
          i =
            ((e.AreaNavigateInfo = t),
            (e.Index = a.length),
            (e.RefreshType = r),
            a.push(e),
            0 === this.uKa.AreaId && (this.uKa.AreaId = t.AreaId),
            this.uKa.AreaId === t.AreaId);
        i && (this.uKa.FirstIndex = a.length - 1),
          (e.IsSelected = this.uKa.AreaId === t.AreaId);
      }),
      a
    );
  }
  Fp(t) {
    var e = t.AreaId !== this.uKa?.AreaId,
      i = t.StateId !== this.uKa?.StateId,
      r = t.ExpandCountry !== this.uKa?.ExpandCountry,
      a = t.CountryId !== this.uKa?.CountryId,
      s = r || a;
    this.uKa = t;
    let n = 0;
    i || s
      ? i && !s
        ? ((n = 2), this.nza(n), this.BXa())
        : a
          ? ((n = 4), this.nza(n), this.BXa())
          : r && ((n = 3), this.nza(n))
      : e && ((n = 1), this.nza(n), this.BXa());
  }
  dKa(t, e) {
    var i =
      ConfigManager_1.ConfigManager.MapConfig.WorldMapNavigateCountryMap.get(t);
    let r = !this.uKa.ExpandCountry;
    var a,
      s,
      n = t !== this.uKa.CountryId;
    void 0 !== i.StateMap
      ? (n && (r = !0),
        (s = (a = i.StateMap.values().next().value).AreaNavigateList[0]),
        this.Fp({
          FirstIndex: e,
          SecondIndex: 0,
          CountryId: t,
          ExpandCountry: r,
          StateId: a.StateId,
          AreaId: s.AreaId,
        }))
      : this.Fp({
          FirstIndex: e,
          SecondIndex: 0,
          CountryId: t,
          ExpandCountry: !1,
          StateId: 0,
          AreaId: i.AreaNavigateList[0].AreaId,
        }),
      n &&
        (this.SequencePlayer.IsSequenceInPlaying("Switch")
          ? this.SequencePlayer.ReplaySequence("Switch")
          : this.SequencePlayer.PlaySequence("Switch"));
  }
  lkn(t, e) {
    var i = t !== this.uKa.StateId,
      r =
        ConfigManager_1.ConfigManager.MapConfig.WorldMapNavigateCountryMap.get(
          this.uKa.CountryId,
        ).StateMap.get(t);
    this.Fp({
      FirstIndex: e,
      SecondIndex: 0,
      CountryId: this.uKa.CountryId,
      ExpandCountry: this.uKa?.ExpandCountry ?? !0,
      StateId: t,
      AreaId: r.AreaNavigateList[0].AreaId,
    }),
      i &&
        (this.SequencePlayer.IsSequenceInPlaying("Switch")
          ? this.SequencePlayer.ReplaySequence("Switch")
          : this.SequencePlayer.PlaySequence("Switch"));
  }
  gKa(t, e) {
    this.Fp({
      FirstIndex: this.uKa.FirstIndex,
      SecondIndex: e,
      CountryId: this.uKa.CountryId,
      ExpandCountry: this.uKa?.ExpandCountry ?? !0,
      StateId: this.uKa.StateId,
      AreaId: t,
    });
  }
  BXa(t = !1) {
    t && this.Close();
    t = ConfigManager_1.ConfigManager.MapConfig.WorldMapNavigateAreaMap.get(
      this.uKa.AreaId,
    );
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.WorldMapNavigate,
      t.MarkId,
      t.MarkType,
    );
  }
}
exports.WorldMapQuickNavigatePanel = WorldMapQuickNavigatePanel;
//# sourceMappingURL=WorldMapQuickNavigatePanel.js.map
