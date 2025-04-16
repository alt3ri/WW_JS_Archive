"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingQuestModel = void 0);
const CommonParamById_1 = require("../../../../../../Core/Define/ConfigCommon/CommonParamById"),
  Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
  ModelBase_1 = require("../../../../../../Core/Framework/ModelBase"),
  TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem"),
  Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiManager_1 = require("../../../../../Ui/UiManager"),
  MissionViewDefine_1 = require("../../../../BattleUi/Views/MissionView/MissionViewDefine"),
  ConfirmBoxController_1 = require("../../../../ConfirmBox/ConfirmBoxController"),
  ConfirmBoxDefine_1 = require("../../../../ConfirmBox/ConfirmBoxDefine"),
  MapController_1 = require("../../../../Map/Controller/MapController"),
  MapDefine_1 = require("../../../../Map/MapDefine"),
  FishingController_1 = require("../FishingController"),
  FishingDefine_1 = require("../FishingDefine"),
  MAX_INT32_NUMBER = 2147483647;
class FishingQuestModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.EntrustPool = []),
      (this.Ntc = 0),
      (this.CurrentTraceItem = 0),
      (this.sB_ = void 0),
      (this.uk_ = !1),
      (this.dk_ = 0),
      (this.mk_ = 0),
      (this.Xk_ = void 0),
      (this.$O_ = 0),
      (this.EntrustRefreshCostRatio = 0),
      (this.Xbe = void 0),
      (this.DayStartTime = 0),
      (this.DayEndTime = 0),
      (this.lz_ = !1),
      (this.Vtc = !1),
      (this.TraceFormClick = !1),
      (this.jtc = 0),
      (this.Htc = !1),
      (this.CurrentEntrusts = new Map()),
      (this.UnDeliverableItemIdSet = new Set()),
      (this.Dx_ = () => {
        this.Bx_();
      }),
      (this.kx_ = () => {
        this.Bx_();
      }),
      (this.p5a = () => {
        this.uk_ &&
          (this.dk_
            ? this.TraceItem(this.dk_)
            : ((this.CurrentTraceEntrust = this.mk_), this.TraceEntrust())),
          (this.uk_ = !1),
          (this.mk_ = 0),
          (this.dk_ = 0);
      }),
      (this.Gd_ = (e) => {
        e ? this.ReTraceMapMark() : this.RemoveAndUnTrackMark(!1);
      }),
      (this.$tc = (e) => {
        this.jtc === e &&
          this.CurrentTraceItem &&
          this.TraceItem(this.CurrentTraceItem);
      }),
      (this.u3e = () => {
        var e;
        this.CurrentTraceEntrust &&
          FishingController_1.FishingController.IsInFishingShip() &&
          ConfigManager_1.ConfigManager.FishingConfig.GetFishingEntrust(
            this.CurrentTraceEntrust,
          ).IsNight &&
          ((e = this.IsInNight()),
          this.lz_ !== e
            ? (this.TraceEntrust(),
              (((this.lz_ = e) && !this.Vtc) || (!e && this.Vtc)) &&
                (this.Htc = !0))
            : this.Htc && ((this.Htc = !1), this.TraceEntrust()));
      });
  }
  get CurrentTraceEntrust() {
    return this.Ntc;
  }
  set CurrentTraceEntrust(e) {
    this.EndShowTrackText(), (this.Ntc = e);
  }
  OnInit() {
    for (const e of ConfigManager_1.ConfigManager.FishingConfig.GetAllFishingEntrustPool())
      this.EntrustPool.push(e.Id);
    return (
      (this.DayStartTime =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "FishingDayBegin",
        )),
      (this.DayEndTime =
        CommonParamById_1.configCommonParamById.GetIntConfig("FishingDayEnd")),
      (this.lz_ = this.IsInNight()),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.FishingRefreshDockId,
        this.Dx_,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.FishingRefreshBackpackData,
        this.kx_,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldDoneAndCloseLoading,
        this.p5a,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.DriveFishingShipStateChanged,
        this.Gd_,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.FishingPointFinish,
        this.$tc,
      ),
      (this.Xbe = TimerSystem_1.TimerSystem.Forever(
        this.u3e,
        3 * TimeUtil_1.TimeUtil.InverseMillisecond,
      )),
      !0
    );
  }
  OnClear() {
    return (
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.FishingRefreshDockId,
        this.Dx_,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.FishingRefreshBackpackData,
        this.kx_,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldDoneAndCloseLoading,
        this.p5a,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.DriveFishingShipStateChanged,
        this.Gd_,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.FishingPointFinish,
        this.$tc,
      ),
      TimerSystem_1.TimerSystem.Remove(this.Xbe),
      !0
    );
  }
  hY_() {
    if ((this.UnDeliverableItemIdSet.clear(), this.CurrentTraceEntrust)) {
      var e,
        i,
        t = this.CurrentEntrusts.get(this.CurrentTraceEntrust);
      if (3 === t)
        for ([
          e,
          i,
        ] of ConfigManager_1.ConfigManager.FishingConfig.GetFishingEntrust(
          this.CurrentTraceEntrust,
        ).EntrustTarget)
          e &&
            i &&
            ModelManager_1.ModelManager.DockyardModel.GetItemCountByItemId(e) <
              i &&
            this.UnDeliverableItemIdSet.add(e);
    }
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.FishingBackpackDeliverableRefresh,
    );
  }
  IsUnDeliverableByItemId(e) {
    for (const i of this.UnDeliverableItemIdSet.values())
      if (i === e) return !0;
    return !1;
  }
  IsAcceptedEntrustItem(e) {
    for (var [i, t] of this.CurrentEntrusts)
      if (3 === t || 2 === t)
        for (const r of ConfigManager_1.ConfigManager.FishingConfig.GetFishingEntrust(
          i,
        ).EntrustTarget.keys())
          if (e === r) return !0;
    return !1;
  }
  UpdateEntrusts(e) {
    this.CurrentEntrusts.clear(), (this.CurrentTraceItem = 0);
    for (const r of Object.keys(e)) {
      var i = parseInt(r);
      switch (e[r]) {
        case Protocol_1.Aki.Protocol.cR_.Proto_Created:
          this.CurrentEntrusts.set(i, 0);
          break;
        case Protocol_1.Aki.Protocol.cR_.Proto_Acceptable:
          this.CurrentEntrusts.set(i, 1);
          break;
        case Protocol_1.Aki.Protocol.cR_.Proto_Accepted:
          var t = this.GetEntrustsDeliverable(i);
          this.CurrentEntrusts.set(i, t ? 2 : 3);
      }
    }
    void 0 !== this.CurrentTraceEntrust &&
      (this.Yk_(), 0 !== this.CurrentTraceEntrust) &&
      this.TraceEntrust(),
      this.hY_();
  }
  GetEntrustsDeliverable(e) {
    var i = ConfigManager_1.ConfigManager.FishingConfig.GetFishingEntrust(e);
    return 0 === i.EntrustType || 1 === i.EntrustType
      ? !(
          !this.GetEntrustsTargetEnough(e) ||
          (i.EntrustDestination &&
            ModelManager_1.ModelManager.FishingModel.DockId !==
              i.EntrustDestination)
        )
      : 2 === i.EntrustType &&
          ModelManager_1.ModelManager.FishingModel.DockId ===
            i.EntrustDestination;
  }
  GetEntrustsTargetEnough(e) {
    var i,
      t,
      e = ConfigManager_1.ConfigManager.FishingConfig.GetFishingEntrust(e);
    if (0 !== e.EntrustType && 1 !== e.EntrustType) return 2 === e.EntrustType;
    for ([i, t] of e.EntrustTarget) {
      if (!i || !t) return !1;
      if (ModelManager_1.ModelManager.DockyardModel.GetItemCountByItemId(i) < t)
        return !1;
    }
    return !0;
  }
  GetEntrustsByPoolType(e) {
    var i,
      t = [],
      r = 0 < ModelManager_1.ModelManager.FishingModel.DockId;
    for ([i] of this.CurrentEntrusts) {
      if (!r) {
        var n = this.CurrentEntrusts.get(i);
        if (2 !== n && 3 !== n) continue;
      }
      ConfigManager_1.ConfigManager.FishingConfig.GetFishingEntrust(i)
        .EntrustPool === e && t.push(i);
    }
    return t;
  }
  GetPoolHasAnyEntrust(e) {
    var i,
      t = 0 < ModelManager_1.ModelManager.FishingModel.DockId;
    for ([i] of this.CurrentEntrusts) {
      if (!t) {
        var r = this.CurrentEntrusts.get(i);
        if (2 !== r && 3 !== r) continue;
      }
      if (
        ConfigManager_1.ConfigManager.FishingConfig.GetFishingEntrust(i)
          .EntrustPool === e
      )
        return !0;
    }
    return !1;
  }
  GetPoolHasAnyAcceptedEntrust(e) {
    for (var [i] of this.CurrentEntrusts) {
      i = this.CurrentEntrusts.get(i);
      if (2 === i || 3 === i) return !0;
    }
    return !1;
  }
  GetEntrustsLockState(e) {
    return 0 === this.CurrentEntrusts.get(e);
  }
  GetEntrustsRefreshCost(e) {
    (e = ConfigManager_1.ConfigManager.FishingConfig.GetFishingEntrust(e)),
      (e =
        ConfigManager_1.ConfigManager.FishingConfig.GetFishingManualRefreshByEntrustPoolTypeAndStar(
          e.EntrustPool,
          e.Star,
        ));
    return e && e[0]
      ? e[0]?.RefreshCost * ((100 - this.EntrustRefreshCostRatio) / 100)
      : -1;
  }
  GetTraceEntrustItem() {
    if (this.CurrentTraceEntrust) {
      const r = ConfigManager_1.ConfigManager.FishingConfig.GetFishingEntrust(
        this.CurrentTraceEntrust,
      );
      var e, i;
      if (2 !== r.EntrustType)
        for ([e, i] of r.EntrustTarget)
          if (e && i)
            if (
              ModelManager_1.ModelManager.DockyardModel.GetItemCountByItemId(
                e,
              ) < i
            ) {
              const r =
                ConfigManager_1.ConfigManager.FishingConfig.GetFishingItemConfig(
                  e,
                );
              var t = r.Relation ?? 0;
              return 0 < t ? t : e;
            }
    }
    return -1;
  }
  WO_() {
    var e;
    return this.CurrentTraceEntrust
      ? (e = ConfigManager_1.ConfigManager.FishingConfig.GetFishingEntrust(
          this.CurrentTraceEntrust,
        ).EntrustDestination) <= 0
        ? this.QO_()
        : e
      : -1;
  }
  QO_() {
    var e = ModelManager_1.ModelManager.FishingModel.UnlockPort,
      i = this.lVe();
    if (!i) return -1;
    let t = MAX_INT32_NUMBER,
      r = void 0;
    for (const s of e) {
      var n =
          ConfigManager_1.ConfigManager.FishingConfig.GetFishingPortConfig(
            s,
          ).EntityConfigId,
        n = ModelManager_1.ModelManager.CreatureModel.GetEntityData(n);
      n &&
        ((n = { X: (n = n.Transform.Pos).X ?? 0, Y: n.Y ?? 0, Z: n.Z ?? 0 }),
        (n = Vector_1.Vector.Create(n)),
        (n = Vector_1.Vector.Dist(i, n)) < t) &&
        ((t = n), (r = s));
    }
    return r || -1;
  }
  TraceEntrust() {
    var e, i;
    (this.Vtc = !1),
      (this.jtc = 0),
      (this.CurrentTraceItem = 0),
      this.RemoveAndUnTrackMark(),
      ModelManager_1.ModelManager.LoadingModel.IsLoading &&
      this.CurrentTraceEntrust
        ? ((this.uk_ = !0), (this.mk_ = this.CurrentTraceEntrust))
        : (this.CurrentTraceEntrust &&
            (this.StartShowTrackText(this.CurrentTraceEntrust),
            (e = this.GetTraceEntrustItem()) <= 0
              ? ((this.Vtc = !0),
                (i = this.WO_()) <= 0
                  ? (UiManager_1.UiManager.IsViewOpen("FishingQuestView") ||
                      UiManager_1.UiManager.IsViewOpen(
                        "FishingHandBookView",
                      )) &&
                    ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(
                      "Fishing_CurrentEntrustCannotTrace",
                    )
                  : ((i =
                      ConfigManager_1.ConfigManager.FishingConfig.GetFishingPortConfig(
                        i,
                      )),
                    MapController_1.MapController.RequestTrackMapMark({
                      MarkType: 34,
                      MarkId: i.MarkId,
                      Track: !0,
                    }),
                    (this.$O_ = i.MarkId),
                    UiManager_1.UiManager.IsViewOpen("FishingQuestView") &&
                      this.TraceFormClick &&
                      UiManager_1.UiManager.CloseView("FishingQuestView")))
              : (this.m$l(e, 0),
                this.Vtc &&
                  this.TraceFormClick &&
                  UiManager_1.UiManager.IsViewOpen("FishingQuestView") &&
                  UiManager_1.UiManager.CloseView("FishingQuestView"))),
          (this.TraceFormClick = !1));
  }
  StartShowTrackText(t, r = 0) {
    if (t) {
      var n,
        s,
        o = ConfigManager_1.ConfigManager.FishingConfig.GetFishingEntrust(t),
        a = [];
      for ([n, s] of o.TargetDesText) {
        var h = new MissionViewDefine_1.FishingEntrustStepTextInfo(s, n);
        a.push(h);
      }
      let e = void 0,
        i = void 0;
      1 === a.length ? (e = a[0]) : (i = a);
      t = MissionViewDefine_1.FishingEntrustViewShowData.Create(
        t,
        20,
        o.Name,
        e,
        i,
      );
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.FishingEntrustStartShowTrackText,
        t,
        r,
      );
    }
  }
  EndShowTrackText(e = 0) {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.FishingEntrustEndShowTrackText,
      this.CurrentTraceEntrust,
      e,
    );
  }
  TraceItem(e) {
    (this.Vtc = !1),
      (this.CurrentTraceEntrust = 0),
      (this.jtc = 0),
      this.RemoveAndUnTrackMark(),
      ModelManager_1.ModelManager.LoadingModel.IsLoading && e
        ? ((this.uk_ = !0), (this.dk_ = e))
        : e <= 0 ||
          ((this.CurrentTraceItem = e),
          this.m$l(e, 1),
          this.Vtc &&
            UiManager_1.UiManager.IsViewOpen("FishingHandBookView") &&
            UiManager_1.UiManager.CloseView("FishingHandBookView"));
  }
  m$l(n, s) {
    var o,
      a,
      h,
      _ = this.lVe();
    if (_) {
      let e = MAX_INT32_NUMBER,
        i = void 0,
        t = void 0,
        r = void 0;
      for (const g of ConfigManager_1.ConfigManager.FishingConfig.GetFishingPointByShowItem(
        n,
      ))
        ModelManager_1.ModelManager.FishingModel.GetFishingPointHaveFinishingIdByConfigId(
          g.Id,
        ) ||
          ((o =
            ModelManager_1.ModelManager.FishingModel.GetFishingPointEntityIdByConfigId(
              g.Id,
            )),
          (a = ModelManager_1.ModelManager.CreatureModel.GetEntityData(o)) &&
            ((a = {
              X: (a = a.Transform.Pos).X ?? 0,
              Y: a.Y ?? 0,
              Z: a.Z ?? 0,
            }),
            (a = Vector_1.Vector.Create(a)),
            (h = Vector_1.Vector.Dist(_, a)) < e) &&
            ((e = h), (i = a), (t = o), (r = g.Id)));
      i && void 0 !== t
        ? ((UiManager_1.UiManager.IsViewOpen("FishingQuestView") ||
            UiManager_1.UiManager.IsViewOpen("FishingHandBookView")) &&
            ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(
              "Fishing_DetectSuccess",
            ),
          (this.jtc = r),
          this.aB_(t, s),
          (this.Vtc = !0))
        : (UiManager_1.UiManager.IsViewOpen("FishingQuestView") ||
            UiManager_1.UiManager.IsViewOpen("FishingHandBookView")) &&
          (3 !==
            ConfigManager_1.ConfigManager.FishingConfig.GetFishingItemConfig(n)
              .Time || ModelManager_1.ModelManager.FishingQuestModel.IsInNight()
            ? ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(
                "Fishing_FishingPointCannotTrace",
              )
            : ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(
                "Fishing_NightTargetTip",
              ));
    }
  }
  lVe() {
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    if (e) {
      e = e.Entity.GetComponent(3);
      if (e) return e.ActorLocationProxy;
    }
  }
  aB_(e, i) {
    if (
      ((this.Xk_ = new MapDefine_1.FishingPointMarkCreateInfo({
        TrackTarget: e,
        MarkConfigId: FishingDefine_1.FISHING_POINT_MARK_ID,
        MarkType: 32,
        EntityConfigId: e,
        DestroyOnUnTrack: !0,
        FishPointDetectSourceType: i,
        MapAndDungeonInfo: {
          MapConfigId: MapDefine_1.BIG_WORLD_MAP_ID,
          DungeonId: MapDefine_1.BIG_WORLD_MAP_ID,
        },
      })),
      ModelManager_1.ModelManager.FishingModel.IsOnShipVehicle())
    )
      return (
        (this.sB_ = ModelManager_1.ModelManager.MapModel.CreateMapMark(
          this.Xk_,
        )),
        ModelManager_1.ModelManager.MapModel.SetTrackMark(
          this.Xk_.MarkType,
          this.sB_,
          !0,
        ),
        this.sB_
      );
  }
  RemoveAndUnTrackMark(e = !0) {
    this.sB_ &&
      (ModelManager_1.ModelManager.MapModel.RemoveMapMark(32, this.sB_),
      (this.sB_ = void 0),
      e) &&
      (this.Xk_ = void 0),
      0 !== this.$O_ &&
        (MapController_1.MapController.RequestTrackMapMark({
          MarkType: 34,
          MarkId: this.$O_,
          Track: !1,
        }),
        (this.$O_ = 0));
  }
  Yk_() {
    ModelManager_1.ModelManager.MapModel.RemoveMapMarkByType(32);
  }
  ReTraceMapMark() {
    this.Xk_ &&
      void 0 === this.sB_ &&
      ((this.sB_ = ModelManager_1.ModelManager.MapModel.CreateMapMark(
        this.Xk_,
      )),
      ModelManager_1.ModelManager.MapModel.SetTrackMark(
        this.Xk_.MarkType,
        this.sB_,
        !0,
      ));
  }
  Bx_() {
    for (var [e, i] of this.CurrentEntrusts)
      (3 !== i && 2 !== i) ||
        ((i = this.GetEntrustsDeliverable(e)),
        this.CurrentEntrusts.set(e, i ? 2 : 3));
    this.CurrentTraceEntrust && this.TraceEntrust(), this.hY_();
  }
  OnFishingItemSell(e, i, t) {
    for (var [r, n] of this.CurrentEntrusts) {
      r = ConfigManager_1.ConfigManager.FishingConfig.GetFishingEntrust(r);
      if (
        r.EntrustPool !== FishingDefine_1.FISHING_QUICK_SAIL_POOL &&
        1 !== n &&
        0 !== n
      )
        for (var [s] of r.EntrustTarget)
          if (e.includes(s))
            return (
              ((s = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
                249,
              )).IsEscViewTriggerCallBack = !1),
              s.FunctionMap.set(0, () => {
                ConfirmBoxController_1.ConfirmBoxController.CloseConfirmBoxView();
              }),
              s.FunctionMap.set(1, () => {
                i
                  ? ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(
                      "Fishing_SelectingQuit",
                    )
                  : UiManager_1.UiManager.OpenView("FishingQuestView");
              }),
              s.FunctionMap.set(2, () => {
                t();
              }),
              ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(s),
              !0
            );
    }
    return !1;
  }
  AutoTraceEntrust() {
    var e,
      i,
      t = [];
    for ([e, i] of this.CurrentEntrusts) {
      var r = ConfigManager_1.ConfigManager.FishingConfig.GetFishingEntrust(e);
      r.EntrustPool !== FishingDefine_1.FISHING_QUICK_SAIL_POOL &&
        1 !== i &&
        0 !== i &&
        t.push(r);
    }
    t.length <= 0 ||
      (t.sort((e, i) => {
        var t = e.EntrustPool,
          r = i.EntrustPool;
        return t !== r ? t - r : e.Star - i.Star;
      }),
      FishingController_1.FishingController.RequestFishingEntrustTrace(
        t[0].Id,
      ));
  }
  IsInNight() {
    var e = ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Hour;
    return e >= this.DayEndTime || e < this.DayStartTime;
  }
}
exports.FishingQuestModel = FishingQuestModel;
//# sourceMappingURL=FishingQuestModel.js.map
