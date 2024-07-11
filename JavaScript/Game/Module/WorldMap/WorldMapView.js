"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldMapView = void 0);
const UE = require("ue"),
  AudioSystem_1 = require("../../../Core/Audio/AudioSystem"),
  CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  ConfigCommon_1 = require("../../../Core/Config/ConfigCommon"),
  MapNoteById_1 = require("../../../Core/Define/ConfigQuery/MapNoteById"),
  FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  Vector2D_1 = require("../../../Core/Utils/Math/Vector2D"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  Global_1 = require("../../Global"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../Ui/Base/UiPanelBase"),
  UiTickViewBase_1 = require("../../Ui/Base/UiTickViewBase"),
  UiLayer_1 = require("../../Ui/UiLayer"),
  UiManager_1 = require("../../Ui/UiManager"),
  UiModel_1 = require("../../Ui/UiModel"),
  LevelSequencePlayer_1 = require("../Common/LevelSequencePlayer"),
  ExploreProgressController_1 = require("../ExploreProgress/ExploreProgressController"),
  ExploreProgressDefine_1 = require("../ExploreProgress/ExploreProgressDefine"),
  ItemDefines_1 = require("../Item/Data/ItemDefines"),
  LordGymController_1 = require("../LordGym/LordGymController"),
  MapController_1 = require("../Map/Controller/MapController"),
  MapDefine_1 = require("../Map/MapDefine"),
  MapUtil_1 = require("../Map/MapUtil"),
  ConfigMarkItem_1 = require("../Map/Marks/MarkItem/ConfigMarkItem"),
  TeleportMarkItem_1 = require("../Map/Marks/MarkItem/TeleportMarkItem"),
  MapLifeEventDispatcher_1 = require("../Map/View/BaseMap/Assistant/MapLifeEvent/MapLifeEventDispatcher"),
  MapResourceMgr_1 = require("../Map/View/BaseMap/Assistant/MapResourceMgr"),
  Map_1 = require("../Map/View/BaseMap/Map"),
  MingSuDefine_1 = require("../MingSu/MingSuDefine"),
  PowerController_1 = require("../Power/PowerController"),
  PowerCurrencyItem_1 = require("../Power/SubViews/PowerCurrencyItem"),
  QuestController_1 = require("../QuestNew/Controller/QuestController"),
  ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController"),
  HotKeyViewDefine_1 = require("../UiNavigation/HotKeyViewDefine"),
  GenericLayout_1 = require("../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../Util/LguiUtil"),
  LongPressButton_1 = require("../Util/LongPressButton"),
  SecondaryUiComponent_1 = require("./ViewComponent/SecondaryUiComponent"),
  WorldMapInteractComponent_1 = require("./ViewComponent/WorldMapInteractComponent"),
  WorldMapMoveComponent_1 = require("./ViewComponent/WorldMapMoveComponent"),
  WorldMapScaleComponent_1 = require("./ViewComponent/WorldMapScaleComponent"),
  WorldMapController_1 = require("./WorldMapController"),
  WorldMapDefine_1 = require("./WorldMapDefine"),
  WorldMapNoteItem_1 = require("./WorldMapNoteItem"),
  WorldMapSubMapItem_1 = require("./WorldMapSubMapItem"),
  WorldMapUtil_1 = require("./WorldMapUtil"),
  SCALE_STEP = 0.1,
  RAD_2_DEG = 180 / Math.PI,
  DEG_PI_4 = 90,
  MARKICON_HALFSIZE = 70,
  MAX_INT32_NUMBER = 2147483647,
  VIEW_PORT_BUFFER_REGION = 400;
class WorldMapView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.v3o = void 0),
      (this.BFo = void 0),
      (this.M3o = void 0),
      (this.E3o = void 0),
      (this.S3o = void 0),
      (this.y3o = Vector2D_1.Vector2D.Create(0, 0)),
      (this.I3o = void 0),
      (this.T3o = -0),
      (this.L3o = !1),
      (this.D3o = void 0),
      (this.R3o = void 0),
      (this.U3o = void 0),
      (this.SQs = void 0),
      (this.Szs = void 0),
      (this.P3o = !1),
      (this.x3o = void 0),
      (this.w3o = void 0),
      (this.B3o = new Vector2D_1.Vector2D()),
      (this.b3o = void 0),
      (this.q3o = void 0),
      (this.G3o = [0, void 0]),
      (this.N3o = void 0),
      (this.O3o = void 0),
      (this.k3o = void 0),
      (this.F3o = void 0),
      (this.V3o = void 0),
      (this.H3o = void 0),
      (this.j3o = new Map()),
      (this.W3o = void 0),
      (this.K3o = void 0),
      (this.Q3o = void 0),
      (this.X3o = void 0),
      (this.mWs = void 0),
      (this.$3o = !1),
      (this.Y3o = 0),
      (this.J3o = 0),
      (this.PXs = !1),
      (this.z3o = !1),
      (this.Z3o = !1),
      (this.e4o = () => {
        var t;
        this.J3o <= 0 ||
          ((this.J3o = 0),
          (t = this.v3o.SelfPlayerNode?.GetLGUISpaceAbsolutePosition()) &&
            this.H3o?.SetLGUISpaceAbsolutePosition(t),
          this.H3o?.SetUIActive(!0),
          this.Q3o?.PlayLevelSequenceByName("Start", !0),
          this.v3o.HandleMapTileDelegate());
      }),
      (this.t4o = void 0),
      (this.i4o = void 0),
      (this.o4o = void 0),
      (this.r4o = void 0),
      (this.n4o = (i, s, r) => {
        if (((this.Z3o = !0), this.GetSlider(1).SetValue(s, !1), this.D3o))
          this.o4o.PushMap(this.D3o, !1);
        else {
          let t = void 0;
          var h = Vector2D_1.Vector2D.Create(
            this.v3o.GetRootItem().GetAnchorOffset(),
          );
          let e = void 0;
          switch (r) {
            case 4:
            case 5:
              e = this.s4o();
          }
          (t = e
            ? h
                .SubtractionEqual(e)
                .MultiplyEqual(s / i)
                .AdditionEqual(e)
            : h.MultiplyEqual(s / i)),
            this.o4o.SetMapPosition(t, !1, 2);
        }
        this.Wut();
      }),
      (this.a4o = () => {
        this.Vut(), this.Wut(), this.h4o();
      }),
      (this.bZe = (t) => {
        ("PowerView" !== t && "ExploreProgressView" !== t) ||
          this.t4o.OnUiOpen();
      }),
      (this.$Ge = (t) => {
        ("PowerView" !== t && "ExploreProgressView" !== t) ||
          ((this.l4o = !1), this.t4o.OnUiClose(), this._4o());
      }),
      (this.l4o = !1),
      (this.Ili = () => {
        this.u4o(() => {
          PowerController_1.PowerController.OpenPowerView(), (this.l4o = !0);
        });
      }),
      (this._4o = () => {
        this.v3o.SetClickRangeVisible(!1),
          this.D3o &&
            ((this.D3o.IsIgnoreScaleShow = !1),
            this.D3o.SetSelected(!1),
            this.y4o(this.D3o),
            (this.D3o = void 0),
            this.Vut()),
          this.c4o(!0),
          this.z3o || this.K3o?.PlayLevelSequenceByName("Show"),
          this.m4o(Info_1.Info.IsInGamepad()),
          this.N3o.SetCursorActive(!0);
      }),
      (this.d4o = () => {
        this.c4o(!1),
          this.z3o
            ? (this.z3o = !1)
            : this.K3o?.PlayLevelSequenceByName("Hide"),
          this.N3o.SetCursorActive(!1);
      }),
      (this.vKe = (t) => {
        this.u4o();
      }),
      (this.GFo = (t) => {
        if (2 !== t.mouseButtonType && !this.l4o) {
          t = t.GetLocalPointInPlane();
          const n = Vector2D_1.Vector2D.Create(t.X, t.Y);
          if (this.L3o && this.C4o(n, this.v3o.SelfPlayerNode)[0])
            this.o4o.FocusPlayer(this.y3o, !0, 1);
          else {
            const a = [];
            var t = Vector_1.Vector.Create(t.X, t.Y, t.Z),
              e = [],
              i = [],
              s = async (t) => {
                var e = await t.GetRootItemAsync();
                return [t, e];
              };
            for (const _ of this.v3o.GetMarkItemsByClickPosition(t))
              _.View &&
                _.View.GetInteractiveFlag() &&
                !_.IsOutOfBound &&
                e.push(s(_));
            var r,
              t = Promise.all(e).then((t) => {
                for (const e of t) this.C4o(n, e[1])[0] && a.push(e[0]);
              });
            for ([, r] of this.v3o.GetAllMarkItems())
              for (var [, h] of r) h.IsOutOfBound && i.push(s(h));
            var o = Promise.all(i).then((t) => {
              for (const e of t) this.C4o(n, e[1])[0] && a.push(e[0]);
            });
            Promise.all([o, t]).then(() => {
              0 === a.length
                ? this.g4o(n)
                : 1 === a.length
                  ? this.f4o(a[0])
                  : 1 < a.length && this.p4o(a, n);
            });
          }
        }
      }),
      (this.f4o = (e, i) => {
        if (!this.D3o || this.D3o.MarkId !== e.MarkId) {
          var s = ModelManager_1.ModelManager.WorldMapModel;
          (s.CurrentFocalMarkType = e.MarkType),
            (s.CurrentFocalMarkId = e.MarkId);
          let t = !0;
          this.t4o.IsSecondaryUiOpening && ((this.z3o = !0), (t = !1)),
            this.u4o(() => {
              var t;
              (e.IsOutOfBound && (this.o4o.SetMapPosition(e, !0, 1), !i)) ||
                (this.R3o &&
                  !this.R3o.IsDestroy &&
                  this.R3o.GetRootItemAsync().then((t) => {
                    t && this.v4o(t).StopSequenceByKey("Dianji");
                  }),
                (this.R3o = e),
                (this.D3o = e),
                this.D3o?.SetSelected(!0),
                Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug(
                    "Map",
                    50,
                    "点击图标",
                    ["追踪状态:", e.IsTracked],
                    ["MarkId:", e.MarkId],
                  ),
                this.D3o instanceof TeleportMarkItem_1.TeleportMarkItem &&
                this.D3o.IsMultiMapTeleport
                  ? (t =
                      ConfigManager_1.ConfigManager.MapConfig?.GetSubMapConfigById(
                        this.D3o.MarkConfig.MultiMapFloorId,
                      )) && this.h4o(t.GroupId, t.Floor, !0)
                  : this.OnSubMapFloorChanged(0),
                this.M4o(e));
            }, t);
        }
      }),
      (this.E4o = async (i, s) => {
        var r = i.filter((t) => t.IsOutOfBound);
        if (0 === r.length)
          this.t4o.ShowMarkMenu(this.RootItem, i),
            this.v3o.SetClickRangeVisible(!0, s);
        else {
          let t = r[0];
          i = await t.GetRootItemAsync();
          let e = Vector2D_1.Vector2D.Distance(
            s,
            Vector2D_1.Vector2D.Create(i.GetAnchorOffset()),
          );
          var h = [];
          for (const a of r)
            a.View &&
              h.push(
                (async (t) => {
                  var e = await t.GetRootItemAsync();
                  return [t, e];
                })(a),
              );
          for (const _ of await Promise.all(h)) {
            var o = _[0],
              n = _[1],
              n = Vector2D_1.Vector2D.Distance(
                s,
                Vector2D_1.Vector2D.Create(n.GetAnchorOffset()),
              );
            e > n && ((t = o), (e = n));
          }
          i = Vector2D_1.Vector2D.Create(t.UiPosition.X, t.UiPosition.Y);
          i.UnaryNegation(i),
            i.MultiplyEqual(this.MapScale),
            this.o4o.SetMapPosition(i, !1, 1);
        }
      }),
      (this.S4o = () => {
        if (void 0 !== this.v3o) {
          var t = this.v3o.GetMarkItemsByType(11);
          if (t && 0 !== t.size) for (var [, e] of t) this.y4o(e);
        }
      }),
      (this.I4o = (t) => {
        t = this.v3o.GetMarkItem(t.MarkType, t.MarkId);
        t && (9 === t.MarkType && (t.IsIgnoreScaleShow = !0), this.y4o(t));
      }),
      (this.T4o = (t, e) => {
        var i = this.v3o.GetMarkItem(t, e);
        i && this.y4o(i),
          this.D3o?.MarkType === t &&
            this.D3o?.MarkId === e &&
            (this.D3o = void 0);
      }),
      (this.Vut = () => {
        var t;
        this.L4o();
        for ([, t] of this.v3o.GetAllMarkItems())
          for (var [, e] of t) (this.D4o(e) && !e.IsTracked) || this.y4o(e);
        this.Z3o = !1;
      }),
      (this.R4o = (t, e) => {
        this.U4o(t, e);
      }),
      (this.A4o = (t) => {
        this.u4o(() => {
          (ModelManager_1.ModelManager.WorldMapModel.HideCustomMarks = 0 === t),
            this.Vut();
        });
      }),
      (this.P4o = () => {
        this.x4o(SCALE_STEP, 1);
      }),
      (this.w4o = () => {
        this.x4o(-SCALE_STEP, 1);
      }),
      (this.AMo = () => {
        this.GetButton(5).ComponentHasTag(
          FNameUtil_1.FNameUtil.GetDynamicFName(HotKeyViewDefine_1.EXIT_TAG),
        ) && this.t4o.IsSecondaryUiOpening
          ? this.u4o()
          : UiManager_1.UiManager.ResetToBattleView();
      }),
      (this.x4o = (t, e) => {
        2 === e && this.i4o.IsJoystickZoom && this.o4o.KillTweening(),
          this.t4o.IsSecondaryUiOpening || this.r4o.AddMapScale(t, e);
      }),
      (this.B4o = (t, e) => e.MapNoteConfig.Rank - t.MapNoteConfig.Rank),
      (this.b4o = (t) => {
        t = this.v3o.GetMarkItem(0, t);
        t && this.U4o(t.MarkType, t.MarkId);
      }),
      (this.zra = () => {
        var t = MapNoteById_1.configMapNoteById.GetConfig(9);
        if (
          ModelManager_1.ModelManager.RoguelikeModel?.GetMapNoteShowState() &&
          t
        )
          return {
            MapNoteId: 9,
            ClickCallBack: this.b4o,
            MapNoteConfig: t,
            MapMarkId: t.MarkIdMap.get(1),
          };
      }),
      (this.q4o = () => {
        var t = MapNoteById_1.configMapNoteById.GetConfig(2);
        if (t) {
          var e,
            i = ModelManager_1.ModelManager.MingSuModel,
            s = i.GetDragonPoolInstanceById(
              MingSuDefine_1.MING_SU_POOL_CONFIG_ID,
            );
          if (s)
            return (
              (e = s.GetDragonPoolLevel()),
              (e = s.GetNeedCoreCount(e) - s.GetHadCoreCount()),
              (s = i.GetTargetDragonPoolCoreById(
                MingSuDefine_1.MING_SU_POOL_CONFIG_ID,
              )),
              e <= i.GetItemCount(s) && t
                ? {
                    MapNoteId: 2,
                    ClickCallBack: this.b4o,
                    MapNoteConfig: t,
                    MapMarkId: t.MarkIdMap.get(
                      MingSuDefine_1.MING_SU_POOL_CONFIG_ID,
                    ),
                  }
                : void 0
            );
        }
      }),
      (this.G4o = () => {
        var t = MapNoteById_1.configMapNoteById.GetConfig(3);
        if (
          ModelManager_1.ModelManager.TowerModel.CanGetRewardAllDifficulties() &&
          t
        )
          return {
            MapNoteId: 3,
            ClickCallBack: this.b4o,
            MapNoteConfig: t,
            MapMarkId: t.MarkIdMap.get(1),
          };
      }),
      (this.N4o = () => {
        var t =
          ModelManager_1.ModelManager.ExploreLevelModel.GetCountryExploreLevelData(
            WorldMapDefine_1.HUANG_LONG_COUNTRY_ID,
          );
        if (t && t.CanLevelUp()) {
          t = MapNoteById_1.configMapNoteById.GetConfig(5);
          if (t)
            return {
              MapNoteId: 5,
              ClickCallBack: this.b4o,
              MapNoteConfig: t,
              MapMarkId: t.MarkIdMap.get(1),
            };
        }
      }),
      (this.O4o = () => {
        var t = ModelManager_1.ModelManager.LordGymModel.GetCanFightLordGym();
        if (0 !== t) {
          var e = MapNoteById_1.configMapNoteById.GetConfig(5);
          if (e)
            return (
              (t =
                ModelManager_1.ModelManager.LordGymModel.GetMarkIdByLordGymId(
                  t,
                )),
              {
                MapNoteId: 8,
                ClickCallBack: this.b4o,
                MapNoteConfig: e,
                MapMarkId: t,
              }
            );
        }
      }),
      (this.k4o = () => {
        var t = MapNoteById_1.configMapNoteById.GetConfig(4),
          e = t.QuestIdList;
        let s = 0,
          i = !1;
        for (const h of e) {
          var r = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(h);
          if (2 === r || 1 === r) {
            (s = h), (i = !0);
            break;
          }
        }
        if (i && t)
          return {
            MapNoteId: 4,
            ClickCallBack: (t) => {
              var e = () => {
                var t,
                  e,
                  i =
                    ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest()
                      .Id;
                i === s &&
                  void 0 !==
                    (t =
                      ModelManager_1.ModelManager.QuestNewModel.TryGetMapMarkIdByQuestId(
                        i,
                      )) &&
                  ((e = this.v3o.GetMarkItem(12, t)),
                  this.f4o(e, !0),
                  Log_1.Log.CheckInfo()) &&
                  Log_1.Log.Info(
                    "Quest",
                    38,
                    "选中鸣域等阶升级任务",
                    ["QuestId", i],
                    ["MarkID", t],
                  );
              };
              ModelManager_1.ModelManager.QuestNewModel.IsTrackingQuest(s)
                ? e()
                : QuestController_1.QuestNewController.RequestTrackQuest(
                    s,
                    !0,
                    2,
                    0,
                    e,
                  );
            },
            MapNoteConfig: t,
          };
      }),
      (this.XBo = () => {
        this.N3o.SetCursorActive(!this.t4o.IsSecondaryUiOpening);
      }),
      (this.F4o = () => {
        Info_1.Info.IsInGamepad() &&
          (0 === this.w3o.length
            ? this.g4o(this.B3o)
            : 1 === this.w3o.length
              ? this.f4o(this.w3o[0])
              : 1 < this.w3o.length && this.p4o(this.w3o, this.B3o));
      }),
      (this.V4o = () => {
        this.i4o.SetJoystickFocus(!0), this.o4o.FocusPlayer(this.y3o, !0, 1);
      }),
      (this.H4o = () => {
        ModelManager_1.ModelManager.AreaModel.GetCurrentAreaId(
          ExploreProgressDefine_1.AREA_LEVEL,
        )
          ? (this.k3o.SetActive(!0), this.k3o.Update())
          : this.k3o.SetActive(!1);
      }),
      (this.OnSubMapFloorChanged = (t, e) => {
        this.X3o.DeselectCurrentGridProxy(),
          this.X3o.SelectGridProxy(t),
          0 === t
            ? ((this.$3o = !1), this.v3o?.HideSubMapTile(), this.h4o())
            : ((this.$3o = !0), this.v3o.ShowSubMapTile(this.Y3o, t, !e));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UISliderComponent],
      [2, UE.UIButtonComponent],
      [3, UE.UIButtonComponent],
      [4, UE.UIItem],
      [5, UE.UIButtonComponent],
      [6, UE.UIExtendToggle],
      [7, UE.UINiagara],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UIItem],
      [12, UE.UIItem],
      [13, UE.UIItem],
      [14, UE.UIItem],
      [15, UE.UIItem],
      [16, UE.UIItem],
      [17, UE.UIItem],
      [18, UE.UIItem],
      [19, UE.UIVerticalLayout],
      [20, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[5, this.AMo]]);
  }
  async OnBeforeStartAsync() {
    (this.BFo = this.GetItem(13)
      .GetOwner()
      .GetComponentByClass(UE.KuroWorldMapUIParams.StaticClass())),
      await this.j4o(),
      await this.W3o.OnWorldMapBeforeStartAsync(),
      (this.X3o = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(19),
        () => new WorldMapSubMapItem_1.WorldMapSubMapItem(),
      ));
  }
  async j4o() {
    await Promise.all([
      ExploreProgressController_1.ExploreProgressController.AllExploreProgressAsyncRequest(),
      LordGymController_1.LordGymController.LordGymInfoRequest(),
    ]),
      await Promise.all([
        this.W4o(),
        this.Akn(),
        this.Q4o(),
        this.X4o(),
        this.$4o(),
        this.NQs(),
        this.Y4o(),
        this.J4o(),
      ]),
      this.z4o();
  }
  async W4o() {
    (this.O3o = new MapResourceMgr_1.MapResourceMgr()),
      await this.O3o.PreloadMapAssets();
  }
  async Akn() {
    (this.V3o = this.GetItem(18)),
      (this.v3o = new Map_1.BaseMap(
        2,
        this.MapScale,
        this.V3o,
        1,
        this.BFo.MarkMenuRectSize,
        this.O3o.GetPreloadMapTile(),
      )),
      (this.W3o = new MapLifeEventDispatcher_1.MapLifeEventDispatcher(
        this.v3o,
      )),
      await this.v3o.CreateThenShowByResourceIdAsync(
        "UiItem_Map_Prefab",
        this.GetItem(9),
        !0,
      );
  }
  async Y4o() {
    (this.SQs = new PowerCurrencyItem_1.PowerCurrencyItem()),
      await this.SQs.CreateThenShowByResourceIdAsync(
        "UIItem_CommonCurrencyItem",
        this.GetItem(10).GetParentAsUIItem(),
      ),
      this.SQs.ShowWithoutText(ItemDefines_1.EItemId.Power),
      this.SQs.SetButtonFunction(this.Ili),
      this.SQs.SetActive(
        ModelManager_1.ModelManager.FunctionModel.IsOpen(10017),
      );
  }
  async NQs() {
    this.GetItem(10)?.SetUIActive(!1),
      (this.Szs = new PowerCurrencyItem_1.PowerCurrencyItem()),
      await this.Szs.CreateThenShowByResourceIdAsync(
        "UIItem_CommonCurrencyItem",
        this.GetItem(10).GetParentAsUIItem(),
      ),
      this.Szs.ShowWithoutText(ItemDefines_1.EItemId.OverPower),
      this.Szs.RefreshAddButtonActive(),
      this.Szs.SetActive(
        ModelManager_1.ModelManager.FunctionModel.IsOpen(10066),
      );
  }
  async Q4o() {
    var t = this.GetItem(12);
    (this.N3o = new HandleCursorBotton()),
      await this.N3o.Initialize(t, this.F4o),
      this.N3o.SetCursorActive(!0);
  }
  async X4o() {
    (this.k3o = new ExploreItem()), await this.k3o.Init(this.GetItem(15));
  }
  async $4o() {
    var t = this.GetItem(16),
      e =
        ((this.F3o = new WorldMapTowerItem()),
        await this.F3o.Init(t),
        ModelManager_1.ModelManager.FunctionModel.IsOpen(10055));
    t.SetUIActive(e), this.F3o.Update(this.v3o);
  }
  async J4o() {
    var t = this.OpenParam;
    (this.J3o = t?.OpenAreaId ?? 0),
      0 < this.J3o &&
        ((t = await LguiUtil_1.LguiUtil.LoadPrefabByResourceIdAsync(
          "UiItem_MapUnlock",
          this.RootItem,
        )),
        (this.H3o = t.GetComponentByClass(UE.UIItem.StaticClass())),
        this.H3o.SetUIActive(!1),
        (this.Q3o = new LevelSequencePlayer_1.LevelSequencePlayer(this.H3o)));
  }
  z4o() {
    (this.b3o = new LongPressButton_1.LongPressButton(
      this.GetButton(2),
      this.P4o,
    )),
      (this.q3o = new LongPressButton_1.LongPressButton(
        this.GetButton(3),
        this.w4o,
      ));
  }
  Z4o() {
    var t = this.GetExtendToggle(6);
    t.SetToggleState(
      ModelManager_1.ModelManager.WorldMapModel.HideCustomMarks ? 0 : 1,
    ),
      t.OnStateChange.Clear(),
      t.OnStateChange.Add(this.A4o);
  }
  e5o() {
    this.T3o = 0;
    var t = this.GetItem(8).GetWidth() / this.RootItem.GetWidth(),
      e = this.GetItem(8).GetHeight() / this.RootItem.GetHeight(),
      i = WorldMapUtil_1.WorldMapUtil.GetViewportSizeByPool(),
      t =
        ((this.E3o = new UE.Vector2D(
          (i.X / 2) * t - MARKICON_HALFSIZE,
          (i.Y / 2) * e - MARKICON_HALFSIZE,
        )),
        (this.S3o = new UE.Vector2D(
          (i.X / 2 + VIEW_PORT_BUFFER_REGION) * t,
          (i.Y / 2 + VIEW_PORT_BUFFER_REGION) * e,
        )),
        this.GetSlider(1));
    t.SetMinValue(
      ModelManager_1.ModelManager.WorldMapModel.MapScaleMin,
      !1,
      !1,
    ),
      t.SetMaxValue(
        ModelManager_1.ModelManager.WorldMapModel.MapScaleMax,
        !1,
        !1,
      ),
      t.OnValueChangeCb.Bind(this.r4o.OnScaleSliderValueChanged);
  }
  t5o() {
    var t = this.v3o.SelfPlayerNode;
    t.SetUIActive(!0), t.SetAsLastHierarchy();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.MarkMenuClickItem,
      this.f4o,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ScenePlayerLocationChanged,
        this.S4o,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnViewDone,
        this.bZe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CloseView,
        this.$Ge,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldMapPointerDrag,
        this.vKe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldMapFingerExpandClose,
        this.x4o,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldMapWheelAxisInput,
        this.x4o,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldMapHandleTriggerAxisInput,
        this.x4o,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldMapPointerUp,
        this.GFo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldMapSecondaryUiClosed,
        this._4o,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldMapSecondaryUiOpened,
        this.d4o,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldMapScaleChanged,
        this.n4o,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldMapPositionChanged,
        this.a4o,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.InputControllerChange,
        this.XBo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldMapJoystickFocusPlayer,
        this.V4o,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.GetAreaProgress,
        this.H4o,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.UnTrackMark,
        this.Vut,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TrackMark,
        this.Vut,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnWorldMapTrackMarkItem,
        this.R4o,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CreateMapMark,
        this.I4o,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RemoveMapMark,
        this.T4o,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.MarkForceVisibleChanged,
        this.Vut,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BlackScreenFadeOnPlotToWorldMap,
        this.e4o,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldMapSubMapChanged,
        this.OnSubMapFloorChanged,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.MarkMenuClickItem,
      this.f4o,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ScenePlayerLocationChanged,
        this.S4o,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnViewDone,
        this.bZe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CloseView,
        this.$Ge,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldMapPointerDrag,
        this.vKe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldMapFingerExpandClose,
        this.x4o,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldMapWheelAxisInput,
        this.x4o,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldMapHandleTriggerAxisInput,
        this.x4o,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldMapPointerUp,
        this.GFo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldMapSecondaryUiClosed,
        this._4o,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldMapSecondaryUiOpened,
        this.d4o,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldMapScaleChanged,
        this.n4o,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldMapPositionChanged,
        this.a4o,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.InputControllerChange,
        this.XBo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldMapJoystickFocusPlayer,
        this.V4o,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.GetAreaProgress,
        this.H4o,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.UnTrackMark,
        this.Vut,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TrackMark,
        this.Vut,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnWorldMapTrackMarkItem,
        this.R4o,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CreateMapMark,
        this.I4o,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RemoveMapMark,
        this.T4o,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.MarkForceVisibleChanged,
        this.Vut,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BlackScreenFadeOnPlotToWorldMap,
        this.e4o,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldMapSubMapChanged,
        this.OnSubMapFloorChanged,
      );
  }
  OnStart() {
    (this.x3o = []),
      this.i5o(),
      this.LogicComponentsOnBegin(),
      (this.K3o = new LevelSequencePlayer_1.LevelSequencePlayer(
        this.GetItem(17),
      )),
      PowerController_1.PowerController.SendUpdatePowerRequest([
        ItemDefines_1.EItemId.Power,
        ItemDefines_1.EItemId.OverPower,
      ]),
      (this.M3o = this.OpenParam);
  }
  OnBeforeShow() {
    this.LogicComponentsOnShow(),
      this.Z4o(),
      this.t5o(),
      this.e5o(),
      this.GetSlider(1).SetValue(this.MapScale, !1),
      this.GetItem(11).SetActive(!0),
      this.c4o(!0),
      this.H4o(),
      this.Wut();
    var t,
      e = this.M3o;
    this.t4o.IsSecondaryUiOpening ||
      (e &&
        e.IsNotFocusTween &&
        (t = this.v3o.GetMarkItem(e.MarkType, e.MarkId)) &&
        ((e.StartScale = this.r4o.MapScale),
        (e.StartWorldPosition = Vector2D_1.Vector2D.Create(
          -t.UiPosition.X * e.StartScale,
          -t.UiPosition.Y * e.StartScale,
        ))),
      e?.StartScale &&
        (this.r4o?.SetMapScale(e.StartScale, 6, !1),
        this.GetSlider(1).SetValue(e.StartScale, !1)),
      e?.StartWorldPosition
        ? this.o4o?.SetMapPosition(e.StartWorldPosition, !1)
        : MapUtil_1.MapUtil.IsInBigWorld(
              ModelManager_1.ModelManager.GameModeModel.InstanceDungeon
                .MapConfigId,
            )
          ? (this.L4o(), this.o4o.FocusPlayer(this.y3o, !1, 1))
          : ((t =
              ModelManager_1.ModelManager.GameModeModel.InstanceDungeon
                .RecoverWorldLocation),
            (e = MapUtil_1.MapUtil.WorldPosition2UiPosition2D(
              Vector2D_1.Vector2D.Create(t[1] ?? 0, t[2] ?? 0),
            )),
            this.L4o(),
            this.o4o.FocusPlayer(e, !1, 1))),
      this.S4o(),
      this.o5o(),
      this.Vut(),
      0 < this.J3o && this.v3o.HandleAreaOpen(this.J3o),
      this.qna(),
      this.W3o.OnWorldMapBeforeShow();
  }
  OnAfterShow() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldMapViewOpened);
    var t,
      e = this.M3o;
    e &&
      ((t = this.v3o.GetMarkItem(e.MarkType, e.MarkId)) &&
        (1 === t.MarkType
          ? this.o4o.PushMap(t, !e.IsNotFocusTween)
          : this.U4o(e.MarkType, e.MarkId)),
      (this.M3o = void 0)),
      this.W3o.OnWorldMapAfterShow();
  }
  OnBeforeHide() {
    this.LogicComponentsOnHide(), this.v3o.UnBindMapTileDelegate();
  }
  OnTick(t) {
    this.w3o || (this.w3o = new Array()),
      this.i4o?.CheckTouch(),
      this.o4o?.TickMoveDirty(),
      this.m4o();
  }
  r5o() {
    if (Info_1.Info.IsInGamepad()) {
      var t,
        e = this.N3o.GetRootItem().K2_GetComponentLocation(),
        i = this.v3o.MapRootItem.K2_GetComponentToWorld(),
        i = UE.KismetMathLibrary.InverseTransformLocation(i, e);
      this.B3o.Set(i.X, i.Y),
        (this.G3o[0] = MAX_INT32_NUMBER),
        this.w3o.splice(0);
      for ([, t] of this.v3o.GetAllMarkItems())
        for (const [, s] of t)
          s.View &&
            s.GetRootItemAsync().then((t) => {
              var [t, e] = this.C4o(this.B3o, t),
                i = s.View.GetInteractiveFlag();
              t &&
                i &&
                (this.G3o[0] > e && ((this.G3o[0] = e), (this.G3o[1] = s)),
                this.w3o.push(s));
            });
      this.N3o.SetSelected(!1);
    }
  }
  n5o(t = !1) {
    ((Info_1.Info.IsInGamepad() && this.i4o.IsJoystickMoving) || t) &&
      (this.o4o.KillTweening(), this.r5o());
  }
  s5o() {
    if (
      Info_1.Info.IsInGamepad() &&
      !this.i4o.IsJoystickMoving &&
      !this.i4o.IsJoystickZoom
    ) {
      if (this.i4o.IsJoystickFocus) {
        if (this.o4o.IsTweeningMove) return;
        this.i4o.SetJoystickFocus(!1), this.r5o();
      }
      0 < this.w3o.length &&
        void 0 === this.D3o &&
        (this.N3o.SetSelected(!0),
        this.o4o.SetMapPosition(
          this.G3o[1],
          !0,
          0,
          this.BFo.TweenTypeEase,
          this.BFo.GamePadTweenTime,
        ));
    }
  }
  m4o(t = !1) {
    this.n5o(t), this.s5o();
  }
  OnBeforeDestroy() {
    this.u4o(),
      this.a5o(),
      WorldMapController_1.WorldMapController.ClearFocalMarkItem(),
      this.GetExtendToggle(6).OnStateChange.Clear(),
      this.b3o.OnDestroy(),
      this.q3o.OnDestroy(),
      this.Q3o?.Clear(),
      this.K3o?.Clear(),
      (this.w3o = void 0),
      this.SQs.Destroy(),
      this.Szs.Destroy(),
      this.v3o.Destroy(),
      this.O3o.Destroy(),
      this.N3o.Destroy(),
      this.h5o();
  }
  i5o() {
    (this.U3o = new Map()),
      (this.t4o = new SecondaryUiComponent_1.SecondaryUiComponent(this.v3o)),
      this.U3o.set(0, this.t4o),
      (this.i4o = new WorldMapInteractComponent_1.WorldMapInteractComponent(
        this.v3o,
        this.BFo,
      )),
      this.U3o.set(1, this.i4o),
      (this.o4o = new WorldMapMoveComponent_1.WorldMapMoveComponent(
        this.v3o,
        this.BFo,
      )),
      this.U3o.set(2, this.o4o),
      (this.r4o = new WorldMapScaleComponent_1.WorldMapScaleComponent(
        this.v3o,
      )),
      this.U3o.set(3, this.r4o);
  }
  h5o() {
    if (this.U3o) {
      for (var [, t] of this.U3o) t.Destroy();
      this.U3o.clear(),
        (this.U3o = void 0),
        (this.t4o = void 0),
        (this.i4o = void 0),
        (this.o4o = void 0),
        (this.r4o = void 0);
    }
  }
  LogicComponentsOnBegin() {
    if (this.U3o) for (var [, t] of this.U3o) t.Begin();
  }
  LogicComponentsOnShow() {
    if (this.U3o) for (var [, t] of this.U3o) t.Show();
  }
  LogicComponentsOnHide() {
    if (this.U3o) for (var [, t] of this.U3o) t.Hide();
  }
  GetLogicComponent(t) {
    return this.U3o.get(t);
  }
  get MapScale() {
    return ModelManager_1.ModelManager.WorldMapModel.MapScale;
  }
  s4o() {
    var e = Global_1.Global.CharacterController;
    if (e) {
      let t = void 0;
      if (
        (Info_1.Info.IsInKeyBoard()
          ? (t = Vector2D_1.Vector2D.Create(e.GetCursorPosition()))
          : Info_1.Info.IsInTouch() && (t = this.i4o.MultiTouchOriginCenter),
        t)
      ) {
        var i,
          e = UiLayer_1.UiLayer.UiRootItem.GetCanvasScaler();
        if (e)
          return (
            (e = e.ConvertPositionFromViewportToLGUICanvas(t.ToUeVector2D())),
            (i = WorldMapUtil_1.WorldMapUtil.GetViewportSizeByPool()).Set(
              e.X - i.X / 2,
              e.Y - i.Y / 2,
            ),
            i
          );
      }
    }
  }
  M4o(t, e = 1) {
    Info_1.Info.IsInGamepad()
      ? this.o4o.PushMap(t, !0, 0)
      : this.o4o.PushMap(t, !0, 1),
      this.t4o.ShowPanel(t, this.RootItem, this.l5o(), e);
  }
  u4o(t, e = !0) {
    this.D3o &&
      this.D3o.IsIgnoreScaleShow &&
      ((this.D3o.IsIgnoreScaleShow = !1),
      this.D3o.SetSelected(!1),
      this.y4o(this.D3o)),
      this.t4o.IsSecondaryUiOpening
        ? (this.t4o.CloseUi(t, e),
          UiManager_1.UiManager.IsViewOpen("PowerView") &&
            UiManager_1.UiManager.CloseView("PowerView"))
        : t && t();
  }
  C4o(t, e) {
    return e
      ? [
          (t = Vector2D_1.Vector2D.Distance(
            t,
            Vector2D_1.Vector2D.Create(e.GetAnchorOffset()),
          )) *
            this.MapScale <=
            this.BFo.MarkMenuRectSize,
          t,
        ]
      : [!1, 0];
  }
  g4o(t) {
    this.o4o.IsTweeningMove && this.o4o.KillTweening(),
      WorldMapController_1.WorldMapController.ClearFocalMarkItem(),
      this.t4o.IsSecondaryUiOpening
        ? (this.Vut(), this.u4o())
        : this.l5o() ===
            ModelManager_1.ModelManager.WorldMapModel.CustomMarkSize
          ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
              "WorldMapTagFull",
            )
          : ((this.D3o = this._5o(t)),
            this.D3o &&
              ((this.D3o.IsIgnoreScaleShow = !0),
              (this.D3o.IsCanShowView = !0),
              this.M4o(this.D3o, 0)),
            AudioSystem_1.AudioSystem.PostEvent(
              "play_ui_ia_spl_map_click_com",
            ));
  }
  _5o(t) {
    var e = void 0,
      i = t.X,
      s = t.Y,
      i = MapController_1.MapController.GetNewCustomMarkPosition(i, -s),
      s = new MapDefine_1.DynamicMarkCreateInfo(i, 1, 9);
    return (
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Map",
          64,
          "[CustomMarkItem Debug]WorldMapView.CreateNewCustomMarkItem->",
          ["position", t],
          ["info", s],
        ),
      (e = this.v3o.CreateCustomMark(s))?.SetIsNew(!0),
      e
    );
  }
  v4o(t) {
    let e = this.j3o.get(t);
    return (
      e ||
        ((e = new LevelSequencePlayer_1.LevelSequencePlayer(t)),
        this.j3o.set(t, e)),
      e
    );
  }
  p4o(t, e) {
    this.t4o.IsSecondaryUiOpening && (this.z3o = !0),
      this.u4o(() => {
        this.E4o(t, e),
          AudioSystem_1.AudioSystem.PostEvent("play_ui_ia_spl_map_click_com");
      }),
      WorldMapController_1.WorldMapController.ClearFocalMarkItem();
  }
  async y4o(t) {
    let e = void 0;
    var i,
      s,
      r,
      h,
      o = this.MapScale;
    (t.LogicWorldScale = o),
      t.LogicUpdate(this.I3o),
      t.ViewUpdate(this.I3o, this.i4o.IsDragging, this.Z3o),
      t.View &&
        ((i = Vector2D_1.Vector2D.Create(t.UiPosition.X, t.UiPosition.Y)),
        t.IsTracked
          ? ((s = Vector2D_1.Vector2D.Create(
              this.v3o.GetRootItem().GetAnchorOffset(),
            )),
            (r = Vector2D_1.Vector2D.Create()),
            ([r, h] = (i.Multiply(o, r).Addition(s, r), this.u5o(r))),
            (e = await t.GetRootItemAsync()),
            h
              ? ((t.IsOutOfBound = !0),
                t.View.SetOutOfBoundDirection(r),
                e.SetAnchorOffset(
                  r.SubtractionEqual(s).DivisionEqual(o).ToUeVector2D(!0),
                ))
              : ((t.IsOutOfBound = !1), e.SetAnchorOffset(i.ToUeVector2D(!0))))
          : ((t.IsOutOfBound = !1),
            (e = await t.GetRootItemAsync()).SetAnchorOffset(
              i.ToUeVector2D(!0),
            )));
  }
  U4o(t, e) {
    var i = this.v3o.GetMarkItem(t, e);
    i
      ? !(i instanceof ConfigMarkItem_1.ConfigMarkItem) ||
        (i.IsFogUnlock && i.IsConditionShouldShow)
        ? ((i.IsCanShowView = !0),
          (i.IsIgnoreScaleShow = !0),
          i?.View?.GetInteractiveFlag() && this.f4o(i, !0))
        : ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
            "MapAreaIsLock",
          )
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Map",
          50,
          "申请了不存在的地图标记",
          ["地图标记类型:", t],
          ["地图标记Id", e],
        );
  }
  L4o() {
    this.c5o(),
      this.v3o.PlayerArrow.SetUIRelativeRotation(
        new UE.Rotator(0, this.T3o, 0),
      );
    var t = Vector2D_1.Vector2D.Create(
        this.v3o.GetRootItem().GetAnchorOffset(),
      ),
      e = Vector2D_1.Vector2D.Create(),
      [i, s] =
        (this.y3o.Multiply(this.MapScale, e).Addition(t, e), this.u5o(e)),
      r = this.v3o.PlayerOutOfBoundIndicator;
    s
      ? ((this.L3o = !0),
        this.v3o.SelfPlayerNode.SetAnchorOffset(
          i.SubtractionEqual(t).DivisionEqual(this.MapScale).ToUeVector2D(!0),
        ),
        (i = Math.atan2(e.Y, e.X) * RAD_2_DEG - DEG_PI_4),
        r.SetUIRelativeRotation(new UE.Rotator(0, i, 0)))
      : ((this.L3o = !1),
        this.v3o.SelfPlayerNode.SetAnchorOffset(this.y3o.ToUeVector2D())),
      r.SetUIActive(s);
  }
  c5o() {
    var t,
      e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    e &&
      (e = e.Entity.GetComponent(3)) &&
      (MapUtil_1.MapUtil.IsInBigWorld(
        ModelManager_1.ModelManager.GameModeModel.InstanceDungeon.MapConfigId,
      )
        ? (this.I3o = e.ActorLocationProxy)
        : ((t =
            ModelManager_1.ModelManager.GameModeModel.InstanceDungeon
              .RecoverWorldLocation),
          (this.I3o = Vector_1.Vector.Create(t[1] ?? 0, t[2] ?? 0, t[3] ?? 0))),
      (t = Vector2D_1.Vector2D.Create(this.I3o.X, this.I3o.Y)),
      (this.y3o = MapUtil_1.MapUtil.WorldPosition2UiPosition2D(t, t)),
      (this.T3o = -(e.ActorRotation.Yaw + 90)));
  }
  u5o(t) {
    var e,
      i = this.E3o;
    return Math.abs(t.X) < i.X && Math.abs(t.Y) < i.Y
      ? [t, !1]
      : ((e = Vector2D_1.Vector2D.Create()),
        Math.abs(t.X / t.Y) > i.X / i.Y
          ? t.Multiply(i.X / Math.abs(t.X), e)
          : t.Multiply(i.Y / Math.abs(t.Y), e),
        [e, !0]);
  }
  D4o(t) {
    t = Vector2D_1.Vector2D.Create(
      t.UiPosition.X * ModelManager_1.ModelManager.WorldMapModel.MapScale +
        this.v3o.GetRootItem().GetAnchorOffsetX(),
      t.UiPosition.Y * ModelManager_1.ModelManager.WorldMapModel.MapScale +
        this.v3o.GetRootItem().GetAnchorOffsetY(),
    );
    return Math.abs(t.X) > this.S3o.X || Math.abs(t.Y) > this.S3o.Y;
  }
  l5o() {
    var t = this.v3o.GetMarkItemsByType(9);
    return t ? t.size : 0;
  }
  o5o() {
    var e = [];
    for (const s of [
      this.q4o,
      this.G4o,
      this.k4o,
      this.N4o,
      this.O4o,
      this.zra,
    ]) {
      var t = s();
      t && e.push(t);
    }
    for (const r of this.x3o) r.GetRootItem().SetUIActive(!1);
    e.sort(this.B4o);
    for (let t = 0; t < e.length; t++) {
      var i = e[t];
      this.m5o(i, t);
    }
  }
  m5o(t, e) {
    var i = t.MapNoteConfig.ConditionId;
    (0 !== i &&
      !ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckCondition(
        i.toString(),
        void 0,
      )) ||
      (this.x3o.length > e
        ? (this.x3o[e].UpdateNoteItem(
            t.MapNoteId,
            t.ClickCallBack,
            t.MapMarkId,
          ),
          this.x3o[e].GetRootItem().SetUIActive(!0))
        : ((i = LguiUtil_1.LguiUtil.CopyItem(
            this.GetItem(14),
            this.GetItem(11),
          )),
          (e = new WorldMapNoteItem_1.WorldMapNoteItem(i)),
          this.x3o.push(e),
          e.UpdateNoteItem(t.MapNoteId, t.ClickCallBack, t.MapMarkId)));
  }
  a5o() {
    for (const t of this.x3o) t.Destroy();
    this.x3o.length = 0;
  }
  c4o(t) {
    t !== this.P3o && ((this.P3o = t), this.GetItem(11).SetUIActive(t));
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    let e = void 0;
    if ("PanelIndex" === t[0]) {
      var i = Number(t[1]);
      e = this.t4o.GetSecondaryPanelGuideFocusUiItem(i);
    } else {
      (i = Number(t[0])),
        (t =
          ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(i)?.ObjectType);
      if (!t)
        return void (
          Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Guide",
            17,
            "聚焦引导的额外参数配置有误, 找不到地图标记",
            ["markId", i],
          )
        );
      const s = this.v3o.GetMarkItem(t, i);
      (e = s?.View.GetIconItem()),
        this.o4o.SetMapPosition(s, !0, 1),
        e
          .GetOwner()
          .AddComponentByClass(
            UE.UIButtonComponent.StaticClass(),
            !1,
            new UE.Transform(),
            !1,
          )
          .OnClickCallBack.Bind(() => {
            this.f4o(s);
          });
    }
    if (void 0 !== e) return [e, e];
  }
  Wut() {
    var t = this.v3o.GetRootItem(),
      e = t.GetAnchorOffset(),
      e = (this.V3o.SetAnchorOffset(e), t.RelativeScale3D);
    this.V3o.SetRelativeScale3D(e),
      this.V3o.SetWidth(t.Width),
      this.V3o.SetHeight(t.Height);
  }
  qna() {
    var t = ModelManager_1.ModelManager.AreaModel.GetCurrentAreaId();
    t &&
      (t =
        ConfigManager_1.ConfigManager.MapConfig?.GetSubMapConfigByAreaId(t)) &&
      this.h4o(t.GroupId, t.Floor, !0, !1);
  }
  async h4o(e = void 0, r = void 0, t = !1, h = !0) {
    var i,
      s =
        ModelManager_1.ModelManager.AreaModel?.GetCurrentAreaId(
          ExploreProgressDefine_1.AREA_LEVEL,
        ) ?? 0,
      s = ModelManager_1.ModelManager.MapModel.CheckAreasUnlocked(s) ?? !1,
      e = e || this.v3o.GetSubMapGroupIdByPosition();
    if (0 === e)
      return this.PXs
        ? ((i = this.$3o) ||
            ((this.Y3o = 0),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.WorldMapSelectMultiMap,
              0,
            )),
          void (await this.P9s(i && s)))
        : void 0;
    if ((!this.PXs || t) && s) {
      this.Y3o = e;
      let t =
        ConfigCommon_1.ConfigCommon.ToList(
          ConfigManager_1.ConfigManager.MapConfig?.GetSubMapConfigByGroupId(e),
        ) ?? [];
      if (
        ((t = t.filter(
          (t) =>
            ModelManager_1.ModelManager.MapModel.CheckUnlockMultiMapIds(t.Id) ||
            0 === t.Floor,
        )).sort((t, e) => e.Floor - t.Floor),
        1 !== t.length)
      ) {
        let i = 0,
          s = 0;
        r &&
          t.forEach((t, e) => {
            t.Floor === r && ((i = e), (s = t.Id));
          }),
          0 !== i &&
            (EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.WorldMapSelectMultiMap,
              s,
            ),
            this.OnSubMapFloorChanged(i, h)),
          this.mWs && (await this.mWs.Promise),
          (this.mWs = new CustomPromise_1.CustomPromise()),
          await this.P9s(!0),
          await this.X3o?.RefreshByDataAsync(t, !1),
          this.X3o.SelectGridProxy(i),
          this.mWs.SetResult(!0);
      }
    }
  }
  async P9s(t) {
    return (
      this.PXs !== t &&
        ((this.PXs = t),
        this.PXs
          ? await this.PlaySequenceAsync("LevelShow")
          : await this.PlaySequenceAsync("LevelHide"),
        this.GetItem(20)?.SetUIActive(this.PXs)),
      !0
    );
  }
}
exports.WorldMapView = WorldMapView;
class ExploreItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(),
      (this.eTt = () => {
        UiManager_1.UiManager.OpenView("ExploreDetailView", void 0, (t, e) => {
          t && UiModel_1.UiModel.NormalStack.Peek().AddChildViewById(e);
        });
      });
  }
  async Init(t) {
    await this.CreateThenShowByActorAsync(t.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText],
      [2, UE.UIText],
    ]),
      (this.BtnBindInfo = [[0, this.eTt]]);
  }
  Update() {
    var t =
        ModelManager_1.ModelManager.AreaModel?.GetCurrentAreaId(
          ExploreProgressDefine_1.AREA_LEVEL,
        ) ?? 0,
      e =
        ModelManager_1.ModelManager.ExploreProgressModel.GetExploreAreaData(t),
      t = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(t);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.Title),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(2),
        "Text_ExploreRate",
        e?.GetProgress() ?? 0,
      );
  }
}
class WorldMapTowerItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(),
      (this.aPi = !1),
      (this.v3o = void 0),
      (this.YP = () => {
        let t = !1;
        for (var [, e] of this.v3o.GetAllMarkItems()) {
          if (t) break;
          for (var [, i] of e)
            if (
              i instanceof TeleportMarkItem_1.TeleportMarkItem &&
              i.IsTowerEntrance &&
              i.IsCanShowView
            ) {
              var s =
                0 !== i.MarkConfig.RelativeId
                  ? i.MarkConfig.RelativeId
                  : ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetEntranceIdByMarkId(
                      i.MarkConfigId,
                    );
              if (
                5 ===
                ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetInstanceDungeonEntranceFlowId(
                  s,
                )
              ) {
                EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.MarkMenuClickItem,
                  i,
                ),
                  (t = !0);
                break;
              }
            }
        }
      }),
      (this.kXs = () => {
        this.aqe();
      });
  }
  async Init(t) {
    await this.CreateThenShowByActorAsync(t.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [3, UE.UIButtonComponent],
      [1, UE.UIText],
    ]),
      (this.BtnBindInfo = [[3, this.YP]]);
  }
  SetShowState(t) {
    this.aPi = t;
  }
  GetCurrentShowState() {
    return this.aPi;
  }
  OnStart() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnTowerRefreshStars,
      this.kXs,
    );
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnTowerRefreshStars,
      this.kXs,
    );
  }
  Update(t) {
    (this.v3o = t), this.aqe();
  }
  aqe() {
    var t = ModelManager_1.ModelManager.TowerModel,
      e = t.GetMaxDifficulty(),
      i = t.GetDifficultyMaxStars(e),
      t = t.GetDifficultyAllStars(e);
    this.GetText(1).SetText(i + "/" + t);
  }
}
class HandleCursorBotton extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.d5o = !1),
      (this.e0t = void 0),
      (this.C5o = void 0);
  }
  async Initialize(t, e) {
    (this.C5o = e), await this.CreateThenShowByActorAsync(t.GetOwner());
  }
  OnStart() {
    this.RootItem?.SetRaycastTarget(!1),
      (this.e0t = this.GetRootActor().GetComponentByClass(
        UE.UIButtonComponent.StaticClass(),
      )),
      this.e0t.OnClickCallBack.Bind(this.C5o);
  }
  OnBeforeDestroy() {
    this.e0t.OnClickCallBack.Unbind();
  }
  SetSelected(t) {
    Info_1.Info.IsInGamepad() &&
      this.d5o !== t &&
      ((this.d5o = t)
        ? this.e0t.SetSelectionState(1)
        : this.e0t.SetSelectionState(0));
  }
  SetCursorActive(t) {
    Info_1.Info.IsInGamepad() && t ? this.SetActive(!0) : this.SetActive(!1);
  }
}
//# sourceMappingURL=WorldMapView.js.map
