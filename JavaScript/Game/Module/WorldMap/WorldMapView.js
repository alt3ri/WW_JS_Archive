"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldMapView = void 0);
const UE = require("ue"),
  AudioSystem_1 = require("../../../Core/Audio/AudioSystem"),
  CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
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
  CommonCurrencyItem_1 = require("../Common/CommonCurrencyItem"),
  LevelSequencePlayer_1 = require("../Common/LevelSequencePlayer"),
  ExploreProgressController_1 = require("../ExploreProgress/ExploreProgressController"),
  ExploreProgressDefine_1 = require("../ExploreProgress/ExploreProgressDefine"),
  InstanceDungeonEntranceConfig_1 = require("../InstanceDungeon/InstanceDungeonEntranceConfig"),
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
  PowerController_1 = require("../Power/PowerController"),
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
      (this.EFo = void 0),
      (this.G2o = void 0),
      (this.yFo = void 0),
      (this.IFo = void 0),
      (this.TFo = void 0),
      (this.LFo = Vector2D_1.Vector2D.Create(0, 0)),
      (this.DFo = void 0),
      (this.RFo = -0),
      (this.UFo = !1),
      (this.AFo = void 0),
      (this.PFo = void 0),
      (this.xFo = void 0),
      (this.wFo = void 0),
      (this.BFo = !1),
      (this.bFo = void 0),
      (this.qFo = void 0),
      (this.GFo = new Vector2D_1.Vector2D()),
      (this.NFo = void 0),
      (this.OFo = void 0),
      (this.kFo = [0, void 0]),
      (this.FFo = void 0),
      (this.VFo = void 0),
      (this.HFo = void 0),
      (this.jFo = void 0),
      (this.WFo = void 0),
      (this.KFo = void 0),
      (this.QFo = new Map()),
      (this.XFo = void 0),
      (this.$Fo = void 0),
      (this.YFo = void 0),
      (this.JFo = void 0),
      (this.I5s = void 0),
      (this.zFo = !1),
      (this.ZFo = 0),
      (this.e3o = 0),
      (this.P6s = !1),
      (this.t3o = !1),
      (this.i3o = !1),
      (this.o3o = () => {
        var t;
        this.e3o <= 0 ||
          ((this.e3o = 0),
          (t = this.EFo.SelfPlayerNode?.GetLGUISpaceAbsolutePosition()) &&
            this.KFo?.SetLGUISpaceAbsolutePosition(t),
          this.KFo?.SetUIActive(!0),
          this.YFo?.PlayLevelSequenceByName("Start", !0),
          this.EFo.HandleMapTileDelegate());
      }),
      (this.r3o = void 0),
      (this.n3o = void 0),
      (this.s3o = void 0),
      (this.a3o = void 0),
      (this.h3o = (i, s, r) => {
        if (((this.i3o = !0), this.GetSlider(1).SetValue(s, !1), this.AFo))
          this.s3o.PushMap(this.AFo, !1);
        else {
          let t = void 0;
          var h = Vector2D_1.Vector2D.Create(
            this.EFo.GetRootItem().GetAnchorOffset(),
          );
          let e = void 0;
          switch (r) {
            case 4:
            case 5:
              e = this.l3o();
          }
          (t = e
            ? h
                .SubtractionEqual(e)
                .MultiplyEqual(s / i)
                .AdditionEqual(e)
            : h.MultiplyEqual(s / i)),
            this.s3o.SetMapPosition(t, !1, 2);
        }
        this.U_t();
      }),
      (this._3o = () => {
        this.L_t(), this.U_t(), this.u3o();
      }),
      (this.yze = (t) => {
        ("PowerView" !== t && "ExploreProgressView" !== t) ||
          this.r3o.OnUiOpen();
      }),
      (this.$Ge = (t) => {
        ("PowerView" !== t && "ExploreProgressView" !== t) ||
          ((this.c3o = !1), this.r3o.OnUiClose(), this.m3o());
      }),
      (this.c3o = !1),
      (this.Ihi = () => {
        this.d3o(() => {
          PowerController_1.PowerController.OpenPowerView(), (this.c3o = !0);
        });
      }),
      (this.m3o = () => {
        this.EFo.SetClickRangeVisible(!1),
          this.AFo &&
            (this.AFo.SetSelected(!1), (this.AFo = void 0), this.L_t()),
          this.C3o(!0),
          this.t3o || this.$Fo?.PlayLevelSequenceByName("Show"),
          this.g3o(ModelManager_1.ModelManager.PlatformModel.IsGamepad()),
          this.FFo.SetCursorActive(!0);
      }),
      (this.f3o = () => {
        this.C3o(!1),
          this.t3o
            ? (this.t3o = !1)
            : this.$Fo?.PlayLevelSequenceByName("Hide"),
          this.FFo.SetCursorActive(!1);
      }),
      (this.aWe = (t) => {
        this.d3o();
      }),
      (this.k2o = (t) => {
        if (2 !== t.mouseButtonType && !this.c3o) {
          t = t.GetLocalPointInPlane();
          const n = Vector2D_1.Vector2D.Create(t.X, t.Y);
          if (this.UFo && this.p3o(n, this.EFo.SelfPlayerNode)[0])
            this.s3o.FocusPlayer(this.LFo, !0, 1);
          else {
            const a = [];
            var t = Vector_1.Vector.Create(t.X, t.Y, t.Z),
              e = [],
              i = [],
              s = async (t) => {
                var e = await t.GetRootItemAsync();
                return [t, e];
              };
            for (const _ of this.EFo.GetMarkItemsByClickPosition(t))
              _.View &&
                _.View.GetInteractiveFlag() &&
                !_.IsOutOfBound &&
                e.push(s(_));
            var r,
              t = Promise.all(e).then((t) => {
                for (const e of t) this.p3o(n, e[1])[0] && a.push(e[0]);
              });
            for ([, r] of this.EFo.GetAllMarkItems())
              for (var [, h] of r) h.IsOutOfBound && i.push(s(h));
            var o = Promise.all(i).then((t) => {
              for (const e of t) this.p3o(n, e[1])[0] && a.push(e[0]);
            });
            Promise.all([o, t]).then(() => {
              0 === a.length
                ? this.v3o(n)
                : 1 === a.length
                  ? this.M3o(a[0])
                  : 1 < a.length && this.S3o(a, n);
            });
          }
        }
      }),
      (this.M3o = (e, i) => {
        if (!this.AFo || this.AFo.MarkId !== e.MarkId) {
          var s = ModelManager_1.ModelManager.WorldMapModel;
          (s.CurrentFocalMarkType = e.MarkType),
            (s.CurrentFocalMarkId = e.MarkId);
          let t = !0;
          this.r3o.IsSecondaryUiOpening && ((this.t3o = !0), (t = !1)),
            this.d3o(() => {
              var t;
              (e.IsOutOfBound && (this.s3o.SetMapPosition(e, !0, 1), !i)) ||
                (this.PFo &&
                  !this.PFo.IsDestroy &&
                  this.PFo.GetRootItemAsync().then((t) => {
                    t && this.E3o(t).StopSequenceByKey("Dianji");
                  }),
                (this.PFo = e),
                (this.AFo = e),
                this.AFo?.SetSelected(!0),
                Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug(
                    "Map",
                    50,
                    "点击图标",
                    ["追踪状态:", e.IsTracked],
                    ["MarkId:", e.MarkId],
                  ),
                this.AFo instanceof TeleportMarkItem_1.TeleportMarkItem &&
                this.AFo.IsMultiMapTeleport
                  ? (t =
                      ConfigManager_1.ConfigManager.MapConfig?.GetSubMapConfigById(
                        this.AFo.MarkConfig.MultiMapFloorId,
                      )) && this.u3o(t.GroupId, t.Floor, !0)
                  : this.OnSubMapFloorChanged(0),
                this.y3o(e));
            }, t);
        }
      }),
      (this.I3o = async (i, s) => {
        var r = i.filter((t) => t.IsOutOfBound);
        if (0 === r.length)
          this.r3o.ShowMarkMenu(this.RootItem, i),
            this.EFo.SetClickRangeVisible(!0, s);
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
            this.s3o.SetMapPosition(i, !1, 1);
        }
      }),
      (this.T3o = () => {
        var t = this.EFo.GetMarkItemsByType(11);
        if (t && 0 !== t.size) for (var [, e] of t) this.L3o(e);
      }),
      (this.D3o = (t) => {
        t = this.EFo.GetMarkItem(t.MarkType, t.MarkId);
        t && (9 === t.MarkType && (t.IsIgnoreScaleShow = !0), this.L3o(t));
      }),
      (this.R3o = (t, e) => {
        t = this.EFo.GetMarkItem(t, e);
        t && this.L3o(t);
      }),
      (this.L_t = () => {
        var t;
        this.U3o();
        for ([, t] of this.EFo.GetAllMarkItems())
          for (var [, e] of t) (this.A3o(e) && !e.IsTracked) || this.L3o(e);
        this.i3o = !1;
      }),
      (this.P3o = (t, e) => {
        this.x3o(t, e);
      }),
      (this.w3o = (t) => {
        this.d3o(() => {
          (ModelManager_1.ModelManager.WorldMapModel.HideCustomMarks = 0 === t),
            this.L_t();
        });
      }),
      (this.B3o = () => {
        this.b3o(SCALE_STEP, 1);
      }),
      (this.q3o = () => {
        this.b3o(-SCALE_STEP, 1);
      }),
      (this.wvo = () => {
        this.GetButton(5).ComponentHasTag(
          FNameUtil_1.FNameUtil.GetDynamicFName(HotKeyViewDefine_1.EXIT_TAG),
        ) && this.r3o.IsSecondaryUiOpening
          ? this.d3o()
          : this.CloseMe();
      }),
      (this.gVe = () => {
        var t, e;
        ModelManager_1.ModelManager.FunctionModel.IsOpen(10017)
          ? (this.wFo.SetActive(!0),
            (t = ModelManager_1.ModelManager.PowerModel.PowerCount),
            (e =
              ConfigManager_1.ConfigManager.PowerConfig.GetPowerNaturalLimit()),
            this.wFo.SetCountText("ItemShow", t, e))
          : this.wFo.SetActive(!1);
      }),
      (this.b3o = (t, e) => {
        2 === e && this.n3o.IsJoystickZoom && this.s3o.KillTweening(),
          this.r3o.IsSecondaryUiOpening || this.a3o.AddMapScale(t, e);
      }),
      (this.G3o = (t, e) => e.MapNoteConfig.Rank - t.MapNoteConfig.Rank),
      (this.N3o = (t) => {
        t = this.EFo.GetMarkItem(0, t);
        t && this.x3o(t.MarkType, t.MarkId);
      }),
      (this.O3o = () => {
        var t = ModelManager_1.ModelManager.MingSuModel.GetCanUpPoolId(),
          e = MapNoteById_1.configMapNoteById.GetConfig(2);
        if (0 !== t && e)
          return {
            MapNoteId: 2,
            ClickCallBack: this.N3o,
            MapNoteConfig: e,
            MapMarkId: e.MarkIdMap.get(t),
          };
      }),
      (this.k3o = () => {
        var t = MapNoteById_1.configMapNoteById.GetConfig(3);
        if (
          ModelManager_1.ModelManager.TowerModel.CanGetRewardAllDifficulties() &&
          t
        )
          return {
            MapNoteId: 3,
            ClickCallBack: this.N3o,
            MapNoteConfig: t,
            MapMarkId: t.MarkIdMap.get(1),
          };
      }),
      (this.F3o = () => {
        var t =
          ModelManager_1.ModelManager.ExploreLevelModel.GetCountryExploreLevelData(
            WorldMapDefine_1.HUANG_LONG_COUNTRY_ID,
          );
        if (t && t.CanLevelUp()) {
          t = MapNoteById_1.configMapNoteById.GetConfig(5);
          if (t)
            return {
              MapNoteId: 5,
              ClickCallBack: this.N3o,
              MapNoteConfig: t,
              MapMarkId: t.MarkIdMap.get(1),
            };
        }
      }),
      (this.V3o = () => {
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
                ClickCallBack: this.N3o,
                MapNoteConfig: e,
                MapMarkId: t,
              }
            );
        }
      }),
      (this.H3o = () => {
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
                  ((e = this.EFo.GetMarkItem(12, t)),
                  this.M3o(e, !0),
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
      (this.dKe = (t, e, i) => {
        this.FFo.SetCursorActive(!this.r3o.IsSecondaryUiOpening);
      }),
      (this.j3o = () => {
        ModelManager_1.ModelManager.PlatformModel.IsGamepad() &&
          (0 === this.qFo.length
            ? this.v3o(this.GFo)
            : 1 === this.qFo.length
              ? this.M3o(this.qFo[0])
              : 1 < this.qFo.length && this.S3o(this.qFo, this.GFo));
      }),
      (this.W3o = () => {
        this.n3o.SetJoystickFocus(!0), this.s3o.FocusPlayer(this.LFo, !0, 1);
      }),
      (this.K3o = () => {
        ModelManager_1.ModelManager.AreaModel.GetCurrentAreaId(
          ExploreProgressDefine_1.AREA_LEVEL,
        )
          ? (this.HFo.SetActive(!0), this.HFo.Update())
          : this.HFo.SetActive(!1);
      }),
      (this.OnSubMapFloorChanged = (t) => {
        this.JFo.DeselectCurrentGridProxy(),
          this.JFo.SelectGridProxy(t),
          0 === t
            ? ((this.zFo = !1), this.EFo?.HideSubMapTile(), this.u3o())
            : ((this.zFo = !0), this.EFo.ShowSubMapTile(this.ZFo, t));
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
      (this.BtnBindInfo = [[5, this.wvo]]);
  }
  async OnBeforeStartAsync() {
    (this.G2o = this.GetItem(13)
      .GetOwner()
      .GetComponentByClass(UE.KuroWorldMapUIParams.StaticClass())),
      await this.Q3o(),
      await this.XFo.OnWorldMapBeforeStartAsync(),
      (this.JFo = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(19),
        () => new WorldMapSubMapItem_1.WorldMapSubMapItem(),
      ));
  }
  async Q3o() {
    await Promise.all([
      ExploreProgressController_1.ExploreProgressController.AllExploreProgressAsyncRequest(),
      LordGymController_1.LordGymController.LordGymInfoRequest(),
    ]),
      await Promise.all([
        this.X3o(),
        this.$3o(),
        this.Y3o(),
        this.J3o(),
        this.z3o(),
        this.Z3o(),
        this.e4o(),
      ]),
      this.t4o();
  }
  async X3o() {
    (this.VFo = new MapResourceMgr_1.MapResourceMgr()),
      await this.VFo.PreloadMapAssets();
  }
  async $3o() {
    (this.WFo = this.GetItem(18)),
      (this.EFo = new Map_1.BaseMap(
        2,
        this.MapScale,
        this.WFo,
        1,
        this.G2o.MarkMenuRectSize,
        this.VFo.GetPreloadMapTile(),
      )),
      (this.XFo = new MapLifeEventDispatcher_1.MapLifeEventDispatcher(
        this.EFo,
      )),
      await this.EFo.CreateThenShowByResourceIdAsync(
        "UiItem_Map_Prefab",
        this.GetItem(9),
        !0,
      );
  }
  async Z3o() {
    (this.wFo = new CommonCurrencyItem_1.CommonCurrencyItem()),
      await this.wFo.CreateThenShowByActorAsync(this.GetItem(10).GetOwner()),
      this.wFo.ShowWithoutText(ItemDefines_1.EItemId.Power),
      this.wFo.SetButtonFunction(this.Ihi),
      this.wFo.SetActive(!1);
  }
  async Y3o() {
    var t = this.GetItem(12);
    (this.FFo = new HandleCursorBotton()),
      await this.FFo.Initialize(t, this.j3o),
      this.FFo.SetCursorActive(!0);
  }
  async J3o() {
    (this.HFo = new ExploreItem()), await this.HFo.Init(this.GetItem(15));
  }
  async z3o() {
    var t = this.GetItem(16),
      e =
        ((this.jFo = new WorldMapTowerItem()),
        await this.jFo.Init(t),
        ModelManager_1.ModelManager.FunctionModel.IsOpen(10055));
    t.SetUIActive(e), this.jFo.Update(this.EFo);
  }
  async e4o() {
    var t = this.OpenParam;
    (this.e3o = t?.OpenAreaId ?? 0),
      0 < this.e3o &&
        ((t = await LguiUtil_1.LguiUtil.LoadPrefabByResourceIdAsync(
          "UiItem_MapUnlock",
          this.RootItem,
        )),
        (this.KFo = t.GetComponentByClass(UE.UIItem.StaticClass())),
        this.KFo.SetUIActive(!1),
        (this.YFo = new LevelSequencePlayer_1.LevelSequencePlayer(this.KFo)));
  }
  t4o() {
    (this.NFo = new LongPressButton_1.LongPressButton(
      this.GetButton(2),
      this.B3o,
    )),
      (this.OFo = new LongPressButton_1.LongPressButton(
        this.GetButton(3),
        this.q3o,
      ));
  }
  i4o() {
    var t = this.GetExtendToggle(6);
    t.SetToggleState(
      ModelManager_1.ModelManager.WorldMapModel.HideCustomMarks ? 0 : 1,
    ),
      t.OnStateChange.Clear(),
      t.OnStateChange.Add(this.w3o),
      ModelManager_1.ModelManager.OnlineModel.GetIsTeamModel() &&
        t.SetSelfInteractive(
          ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam(),
        );
  }
  o4o() {
    this.RFo = 0;
    var t = this.GetItem(8).GetWidth() / this.RootItem.GetWidth(),
      e = this.GetItem(8).GetHeight() / this.RootItem.GetHeight(),
      i = WorldMapUtil_1.WorldMapUtil.GetViewportSizeByPool(),
      t =
        ((this.IFo = new UE.Vector2D(
          (i.X / 2) * t - MARKICON_HALFSIZE,
          (i.Y / 2) * e - MARKICON_HALFSIZE,
        )),
        (this.TFo = new UE.Vector2D(
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
      t.OnValueChangeCb.Bind(this.a3o.OnScaleSliderValueChanged);
  }
  r4o() {
    var t = this.EFo.SelfPlayerNode;
    t.SetUIActive(!0), t.SetAsLastHierarchy();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.MarkMenuClickItem,
      this.M3o,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ScenePlayerLocationChanged,
        this.T3o,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnPowerChanged,
        this.gVe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnViewDone,
        this.yze,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CloseView,
        this.$Ge,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldMapPointerDrag,
        this.aWe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldMapFingerExpandClose,
        this.b3o,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldMapWheelAxisInput,
        this.b3o,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldMapHandleTriggerAxisInput,
        this.b3o,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldMapPointerUp,
        this.k2o,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldMapSecondaryUiClosed,
        this.m3o,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldMapSecondaryUiOpened,
        this.f3o,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldMapScaleChanged,
        this.h3o,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldMapPositionChanged,
        this._3o,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnPlatformChanged,
        this.dKe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldMapJoystickFocusPlayer,
        this.W3o,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.GetAreaProgress,
        this.K3o,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.UnTrackMark,
        this.L_t,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TrackMark,
        this.L_t,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnWorldMapTrackMarkItem,
        this.P3o,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CreateMapMark,
        this.D3o,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RemoveMapMark,
        this.R3o,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.MarkForceVisibleChanged,
        this.L_t,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BlackScreenFadeOnPlotToWorldMap,
        this.o3o,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldMapSubMapChanged,
        this.OnSubMapFloorChanged,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.MarkMenuClickItem,
      this.M3o,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ScenePlayerLocationChanged,
        this.T3o,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnPowerChanged,
        this.gVe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnViewDone,
        this.yze,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CloseView,
        this.$Ge,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldMapPointerDrag,
        this.aWe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldMapFingerExpandClose,
        this.b3o,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldMapWheelAxisInput,
        this.b3o,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldMapHandleTriggerAxisInput,
        this.b3o,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldMapPointerUp,
        this.k2o,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldMapSecondaryUiClosed,
        this.m3o,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldMapSecondaryUiOpened,
        this.f3o,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldMapScaleChanged,
        this.h3o,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldMapPositionChanged,
        this._3o,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnPlatformChanged,
        this.dKe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldMapJoystickFocusPlayer,
        this.W3o,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.GetAreaProgress,
        this.K3o,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.UnTrackMark,
        this.L_t,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TrackMark,
        this.L_t,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnWorldMapTrackMarkItem,
        this.P3o,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CreateMapMark,
        this.D3o,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RemoveMapMark,
        this.R3o,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.MarkForceVisibleChanged,
        this.L_t,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BlackScreenFadeOnPlotToWorldMap,
        this.o3o,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldMapSubMapChanged,
        this.OnSubMapFloorChanged,
      );
  }
  OnStart() {
    (this.bFo = []),
      this.n4o(),
      this.LogicComponentsOnBegin(),
      (this.$Fo = new LevelSequencePlayer_1.LevelSequencePlayer(
        this.GetItem(17),
      )),
      PowerController_1.PowerController.SendUpdatePowerRequest(),
      (this.yFo = this.OpenParam);
  }
  OnBeforeShow() {
    this.LogicComponentsOnShow(),
      this.i4o(),
      this.r4o(),
      this.o4o(),
      this.GetSlider(1).SetValue(this.MapScale, !1),
      this.GetItem(11).SetActive(!0),
      this.C3o(!0),
      this.K3o(),
      this.U_t();
    var t = this.yFo,
      e =
        (this.r3o.IsSecondaryUiOpening ||
          (t &&
            t.IsNotFocusTween &&
            (e = this.EFo.GetMarkItem(t.MarkType, t.MarkId)) &&
            ((t.StartScale = this.a3o.MapScale),
            (t.StartWorldPosition = Vector2D_1.Vector2D.Create(
              -e.UiPosition.X * t.StartScale,
              -e.UiPosition.Y * t.StartScale,
            ))),
          t?.StartScale &&
            (this.a3o?.SetMapScale(t.StartScale, 6, !1),
            this.GetSlider(1).SetValue(t.StartScale, !1)),
          t?.StartWorldPosition
            ? this.s3o?.SetMapPosition(t.StartWorldPosition, !1)
            : MapUtil_1.MapUtil.IsInBigWorld(
                  ModelManager_1.ModelManager.GameModeModel.InstanceDungeon
                    .MapConfigId,
                )
              ? (this.U3o(), this.s3o.FocusPlayer(this.LFo, !1, 1))
              : ((e =
                  ModelManager_1.ModelManager.GameModeModel.InstanceDungeon
                    .RecoverWorldLocation),
                (t = MapUtil_1.MapUtil.WorldPosition2UiPosition2D(
                  Vector2D_1.Vector2D.Create(e[1] ?? 0, e[2] ?? 0),
                )),
                this.s3o.FocusPlayer(t, !1, 1))),
        this.EFo.SelfPlayerNode.SetUIActive(
          MapUtil_1.MapUtil.IsInBigWorld(
            ModelManager_1.ModelManager.GameModeModel.InstanceDungeon
              .MapConfigId,
          ),
        ),
        this.T3o(),
        this.s4o(),
        this.L_t(),
        0 < this.e3o && this.EFo.HandleAreaOpen(this.e3o),
        ModelManager_1.ModelManager.AreaModel.GetCurrentAreaId());
    e &&
      (t =
        ConfigManager_1.ConfigManager.MapConfig?.GetSubMapConfigByAreaId(e)) &&
      this.u3o(t.GroupId, t.Floor, !0),
      this.XFo.OnWorldMapBeforeShow();
  }
  OnAfterShow() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldMapViewOpened);
    var t,
      e = this.yFo;
    e &&
      ((t = this.EFo.GetMarkItem(e.MarkType, e.MarkId)) &&
        (1 === t.MarkType
          ? this.s3o.PushMap(t, !e.IsNotFocusTween)
          : this.x3o(e.MarkType, e.MarkId)),
      (this.yFo = void 0)),
      this.XFo.OnWorldMapAfterShow();
  }
  OnBeforeHide() {
    this.LogicComponentsOnHide(), this.EFo.UnBindMapTileDelegate();
  }
  OnTick(t) {
    this.qFo || (this.qFo = new Array()),
      this.n3o?.CheckTouch(),
      this.s3o?.TickMoveDirty(),
      this.g3o();
  }
  a4o() {
    if (ModelManager_1.ModelManager.PlatformModel.IsGamepad()) {
      var t,
        e = this.FFo.GetRootItem().K2_GetComponentLocation(),
        i = this.EFo.MapRootItem.K2_GetComponentToWorld(),
        i = UE.KismetMathLibrary.InverseTransformLocation(i, e);
      this.GFo.Set(i.X, i.Y),
        (this.kFo[0] = MAX_INT32_NUMBER),
        this.qFo.splice(0);
      for ([, t] of this.EFo.GetAllMarkItems())
        for (const [, s] of t)
          s.View &&
            s.GetRootItemAsync().then((t) => {
              var [t, e] = this.p3o(this.GFo, t),
                i = s.View.GetInteractiveFlag();
              t &&
                i &&
                (this.kFo[0] > e && ((this.kFo[0] = e), (this.kFo[1] = s)),
                this.qFo.push(s));
            });
      this.FFo.SetSelected(!1);
    }
  }
  h4o(t = !1) {
    ((ModelManager_1.ModelManager.PlatformModel.IsGamepad() &&
      this.n3o.IsJoystickMoving) ||
      t) &&
      (this.s3o.KillTweening(), this.a4o());
  }
  l4o() {
    if (
      ModelManager_1.ModelManager.PlatformModel.IsGamepad() &&
      !this.n3o.IsJoystickMoving &&
      !this.n3o.IsJoystickZoom
    ) {
      if (this.n3o.IsJoystickFocus) {
        if (this.s3o.IsTweeningMove) return;
        this.n3o.SetJoystickFocus(!1), this.a4o();
      }
      0 < this.qFo.length &&
        void 0 === this.AFo &&
        (this.FFo.SetSelected(!0),
        this.s3o.SetMapPosition(
          this.kFo[1],
          !0,
          0,
          this.G2o.TweenTypeEase,
          this.G2o.GamePadTweenTime,
        ));
    }
  }
  g3o(t = !1) {
    this.h4o(t), this.l4o();
  }
  OnBeforeDestroy() {
    this.d3o(),
      this._4o(),
      WorldMapController_1.WorldMapController.ClearFocalMarkItem(),
      this.GetExtendToggle(6).OnStateChange.Clear(),
      this.NFo.OnDestroy(),
      this.OFo.OnDestroy(),
      this.YFo?.Clear(),
      this.$Fo?.Clear(),
      (this.qFo = void 0),
      this.wFo.Destroy(),
      this.EFo.Destroy(),
      this.VFo.Destroy(),
      this.FFo.Destroy(),
      this.u4o();
  }
  n4o() {
    (this.xFo = new Map()),
      (this.r3o = new SecondaryUiComponent_1.SecondaryUiComponent(this.EFo)),
      this.xFo.set(0, this.r3o),
      (this.n3o = new WorldMapInteractComponent_1.WorldMapInteractComponent(
        this.EFo,
        this.G2o,
      )),
      this.xFo.set(1, this.n3o),
      (this.s3o = new WorldMapMoveComponent_1.WorldMapMoveComponent(
        this.EFo,
        this.G2o,
      )),
      this.xFo.set(2, this.s3o),
      (this.a3o = new WorldMapScaleComponent_1.WorldMapScaleComponent(
        this.EFo,
      )),
      this.xFo.set(3, this.a3o);
  }
  u4o() {
    if (this.xFo) {
      for (var [, t] of this.xFo) t.Destroy();
      this.xFo.clear(),
        (this.xFo = void 0),
        (this.r3o = void 0),
        (this.n3o = void 0),
        (this.s3o = void 0),
        (this.a3o = void 0);
    }
  }
  LogicComponentsOnBegin() {
    if (this.xFo) for (var [, t] of this.xFo) t.Begin();
  }
  LogicComponentsOnShow() {
    if (this.xFo) for (var [, t] of this.xFo) t.Show();
  }
  LogicComponentsOnHide() {
    if (this.xFo) for (var [, t] of this.xFo) t.Hide();
  }
  GetLogicComponent(t) {
    return this.xFo.get(t);
  }
  get MapScale() {
    return ModelManager_1.ModelManager.WorldMapModel.MapScale;
  }
  l3o() {
    var e = Global_1.Global.CharacterController;
    if (e) {
      let t = void 0;
      switch (ModelManager_1.ModelManager.PlatformModel.PlatformType) {
        case 3:
        case 4:
        case 5:
          t = Vector2D_1.Vector2D.Create(e.GetCursorPosition());
          break;
        case 1:
        case 2:
          t = this.n3o.MultiTouchOriginCenter;
      }
      if (t) {
        var i,
          s = UiLayer_1.UiLayer.UiRootItem.GetCanvasScaler();
        if (s)
          return (
            (s = s.ConvertPositionFromViewportToLGUICanvas(t.ToUeVector2D())),
            (i = WorldMapUtil_1.WorldMapUtil.GetViewportSizeByPool()).Set(
              s.X - i.X / 2,
              s.Y - i.Y / 2,
            ),
            i
          );
      }
    }
  }
  y3o(t, e = 1) {
    ModelManager_1.ModelManager.PlatformModel.IsInGamepad()
      ? this.s3o.PushMap(t, !0, 0)
      : this.s3o.PushMap(t, !0, 1),
      this.r3o.ShowPanel(t, this.RootItem, this.c4o(), e);
  }
  d3o(t, e = !0) {
    this.AFo &&
      this.AFo.IsIgnoreScaleShow &&
      ((this.AFo.IsIgnoreScaleShow = !1),
      this.AFo.SetSelected(!1),
      this.L3o(this.AFo)),
      this.r3o.IsSecondaryUiOpening
        ? (this.r3o.CloseUi(t, e),
          UiManager_1.UiManager.IsViewOpen("PowerView") &&
            UiManager_1.UiManager.CloseView("PowerView"))
        : t && t();
  }
  p3o(t, e) {
    return e
      ? [
          (t = Vector2D_1.Vector2D.Distance(
            t,
            Vector2D_1.Vector2D.Create(e.GetAnchorOffset()),
          )) *
            this.MapScale <=
            this.G2o.MarkMenuRectSize,
          t,
        ]
      : [!1, 0];
  }
  v3o(t) {
    this.s3o.IsTweeningMove && this.s3o.KillTweening(),
      WorldMapController_1.WorldMapController.ClearFocalMarkItem(),
      this.r3o.IsSecondaryUiOpening
        ? (this.L_t(), this.d3o())
        : this.c4o() ===
            ModelManager_1.ModelManager.WorldMapModel.CustomMarkSize
          ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
              "WorldMapTagFull",
            )
          : ModelManager_1.ModelManager.WorldMapModel.HideCustomMarks ||
            ((this.AFo = this.m4o(t)),
            this.AFo &&
              ((this.AFo.IsIgnoreScaleShow = !0),
              (this.AFo.IsCanShowView = !0),
              this.y3o(this.AFo, 0)),
            AudioSystem_1.AudioSystem.PostEvent(
              "play_ui_ia_spl_map_click_com",
            ));
  }
  m4o(t) {
    var e = void 0,
      i = t.X,
      t = t.Y,
      s = MapController_1.MapController.GetMarkPosition(i, -t),
      s = s || Vector2D_1.Vector2D.Create(i, t),
      i = new MapDefine_1.DynamicMarkCreateInfo(s, 1, 9);
    return (e = this.EFo.CreateCustomMark(i))?.SetIsNew(!0), e;
  }
  E3o(t) {
    let e = this.QFo.get(t);
    return (
      e ||
        ((e = new LevelSequencePlayer_1.LevelSequencePlayer(t)),
        this.QFo.set(t, e)),
      e
    );
  }
  S3o(t, e) {
    this.r3o.IsSecondaryUiOpening && (this.t3o = !0),
      this.d3o(() => {
        this.I3o(t, e),
          AudioSystem_1.AudioSystem.PostEvent("play_ui_ia_spl_map_click_com");
      }),
      WorldMapController_1.WorldMapController.ClearFocalMarkItem();
  }
  async L3o(t) {
    let e = void 0;
    var i,
      s,
      r,
      h,
      o = this.MapScale;
    (t.LogicWorldScale = o),
      t.LogicUpdate(this.DFo),
      t.ViewUpdate(this.DFo, this.n3o.IsDragging, this.i3o),
      t.View &&
        ((i = Vector2D_1.Vector2D.Create(t.UiPosition.X, t.UiPosition.Y)),
        t.IsTracked
          ? ((s = Vector2D_1.Vector2D.Create(
              this.EFo.GetRootItem().GetAnchorOffset(),
            )),
            (r = Vector2D_1.Vector2D.Create()),
            ([r, h] = (i.Multiply(o, r).Addition(s, r), this.d4o(r))),
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
  x3o(t, e) {
    var i = this.EFo.GetMarkItem(t, e);
    i
      ? !(i instanceof ConfigMarkItem_1.ConfigMarkItem) ||
        (i.IsFogUnlock && i.IsConditionShouldShow)
        ? ((i.IsCanShowView = !0),
          (i.IsIgnoreScaleShow = !0),
          i?.View?.GetInteractiveFlag() && this.M3o(i, !0))
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
  U3o() {
    this.C4o(),
      this.EFo.PlayerArrow.SetUIRelativeRotation(
        new UE.Rotator(0, this.RFo, 0),
      );
    var t = Vector2D_1.Vector2D.Create(
        this.EFo.GetRootItem().GetAnchorOffset(),
      ),
      e = Vector2D_1.Vector2D.Create(),
      [i, s] =
        (this.LFo.Multiply(this.MapScale, e).Addition(t, e), this.d4o(e)),
      r = this.EFo.PlayerOutOfBoundIndicator;
    s
      ? ((this.UFo = !0),
        this.EFo.SelfPlayerNode.SetAnchorOffset(
          i.SubtractionEqual(t).DivisionEqual(this.MapScale).ToUeVector2D(!0),
        ),
        (i = Math.atan2(e.Y, e.X) * RAD_2_DEG - DEG_PI_4),
        r.SetUIRelativeRotation(new UE.Rotator(0, i, 0)))
      : ((this.UFo = !1),
        this.EFo.SelfPlayerNode.SetAnchorOffset(this.LFo.ToUeVector2D())),
      r.SetUIActive(s);
  }
  C4o() {
    var t,
      e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    e &&
      (e = e.Entity.GetComponent(3)) &&
      ((this.DFo = e.ActorLocationProxy),
      (t = Vector2D_1.Vector2D.Create(this.DFo.X, this.DFo.Y)),
      (this.LFo = MapUtil_1.MapUtil.WorldPosition2UiPosition2D(t, t)),
      (this.RFo = -(e.ActorRotation.Yaw + 90)));
  }
  d4o(t) {
    var e,
      i = this.IFo;
    return Math.abs(t.X) < i.X && Math.abs(t.Y) < i.Y
      ? [t, !1]
      : ((e = Vector2D_1.Vector2D.Create()),
        Math.abs(t.X / t.Y) > i.X / i.Y
          ? t.Multiply(i.X / Math.abs(t.X), e)
          : t.Multiply(i.Y / Math.abs(t.Y), e),
        [e, !0]);
  }
  A3o(t) {
    t = Vector2D_1.Vector2D.Create(
      t.UiPosition.X * ModelManager_1.ModelManager.WorldMapModel.MapScale +
        this.EFo.GetRootItem().GetAnchorOffsetX(),
      t.UiPosition.Y * ModelManager_1.ModelManager.WorldMapModel.MapScale +
        this.EFo.GetRootItem().GetAnchorOffsetY(),
    );
    return Math.abs(t.X) > this.TFo.X || Math.abs(t.Y) > this.TFo.Y;
  }
  c4o() {
    var t = this.EFo.GetMarkItemsByType(9);
    return t ? t.size : 0;
  }
  s4o() {
    var e = [];
    for (const s of [this.O3o, this.k3o, this.H3o, this.F3o, this.V3o]) {
      var t = s();
      t && e.push(t);
    }
    for (const r of this.bFo) r.GetRootItem().SetUIActive(!1);
    e.sort(this.G3o);
    for (let t = 0; t < e.length; t++) {
      var i = e[t];
      this.g4o(i, t);
    }
  }
  g4o(t, e) {
    var i = t.MapNoteConfig.ConditionId;
    (0 !== i &&
      !ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckCondition(
        i.toString(),
        void 0,
      )) ||
      (this.bFo.length > e
        ? (this.bFo[e].UpdateNoteItem(
            t.MapNoteId,
            t.ClickCallBack,
            t.MapMarkId,
          ),
          this.bFo[e].GetRootItem().SetUIActive(!0))
        : ((i = LguiUtil_1.LguiUtil.CopyItem(
            this.GetItem(14),
            this.GetItem(11),
          )),
          (e = new WorldMapNoteItem_1.WorldMapNoteItem(i)),
          this.bFo.push(e),
          e.UpdateNoteItem(t.MapNoteId, t.ClickCallBack, t.MapMarkId)));
  }
  _4o() {
    for (const t of this.bFo) t.Destroy();
    this.bFo.length = 0;
  }
  C3o(t) {
    t !== this.BFo && ((this.BFo = t), this.GetItem(11).SetUIActive(t));
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    let e = void 0;
    if ("PanelIndex" === t[0]) {
      var i = Number(t[1]);
      e = this.r3o.GetSecondaryPanelGuideFocusUiItem(i);
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
      const s = this.EFo.GetMarkItem(t, i);
      (e = s?.View.GetIconItem()),
        this.s3o.SetMapPosition(s, !0, 1),
        e
          .GetOwner()
          .AddComponentByClass(
            UE.UIButtonComponent.StaticClass(),
            !1,
            new UE.Transform(),
            !1,
          )
          .OnClickCallBack.Bind(() => {
            this.M3o(s);
          });
    }
    if (void 0 !== e) return [e, e];
  }
  U_t() {
    var t = this.EFo.GetRootItem(),
      e = t.GetAnchorOffset(),
      e = (this.WFo.SetAnchorOffset(e), t.RelativeScale3D);
    this.WFo.SetRelativeScale3D(e),
      this.WFo.SetWidth(t.Width),
      this.WFo.SetHeight(t.Height);
  }
  async u3o(e = void 0, r = void 0, t = !1) {
    var i,
      s =
        ModelManager_1.ModelManager.AreaModel?.GetCurrentAreaId(
          ExploreProgressDefine_1.AREA_LEVEL,
        ) ?? 0,
      s = ModelManager_1.ModelManager.MapModel.CheckAreasUnlocked(s) ?? !1,
      e = e || this.EFo.GetSubMapGroupIdByPosition();
    if (0 === e)
      return this.P6s
        ? ((i = this.zFo) ||
            ((this.ZFo = 0),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.WorldMapSelectMultiMap,
              0,
            )),
          void (await this.L4s(i && s)))
        : void 0;
    if ((!this.P6s || t) && s) {
      this.ZFo = e;
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
          this.I5s && (await this.I5s.Promise),
          (this.I5s = new CustomPromise_1.CustomPromise()),
          await this.L4s(!0),
          await this.JFo?.RefreshByDataAsync(t, !1),
          this.JFo.SelectGridProxy(i),
          0 !== i &&
            (EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.WorldMapSelectMultiMap,
              s,
            ),
            this.OnSubMapFloorChanged(i)),
          this.I5s.SetResult(!0);
      }
    }
  }
  async L4s(t) {
    return (
      this.P6s !== t &&
        ((this.P6s = t),
        this.P6s
          ? await this.PlaySequenceAsync("LevelShow")
          : await this.PlaySequenceAsync("LevelHide"),
        this.GetItem(20)?.SetUIActive(this.P6s)),
      !0
    );
  }
}
exports.WorldMapView = WorldMapView;
class ExploreItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(),
      (this.Kyt = () => {
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
      (this.BtnBindInfo = [[0, this.Kyt]]);
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
      (this.aAi = !1),
      (this.EFo = void 0),
      (this.YP = () => {
        let t = !1;
        for (var [, e] of this.EFo.GetAllMarkItems()) {
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
                ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetInstanceDungeonEntranceFlowId(
                  s,
                ) ===
                InstanceDungeonEntranceConfig_1.EInstanceEntranceFlowType
                  .NewTower
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
      (this.F6s = () => {
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
    this.aAi = t;
  }
  GetCurrentShowState() {
    return this.aAi;
  }
  OnStart() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnTowerRefreshStars,
      this.F6s,
    );
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnTowerRefreshStars,
      this.F6s,
    );
  }
  Update(t) {
    (this.EFo = t), this.aqe();
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
      (this.f4o = !1),
      (this.VCt = void 0),
      (this.p4o = void 0);
  }
  async Initialize(t, e) {
    (this.p4o = e), await this.CreateThenShowByActorAsync(t.GetOwner());
  }
  OnStart() {
    this.RootItem?.SetRaycastTarget(!1),
      (this.VCt = this.GetRootActor().GetComponentByClass(
        UE.UIButtonComponent.StaticClass(),
      )),
      this.VCt.OnClickCallBack.Bind(this.p4o);
  }
  OnBeforeDestroy() {
    this.VCt.OnClickCallBack.Unbind();
  }
  SetSelected(t) {
    ModelManager_1.ModelManager.PlatformModel.IsGamepad() &&
      this.f4o !== t &&
      ((this.f4o = t)
        ? this.VCt.SetSelectionState(1)
        : this.VCt.SetSelectionState(0));
  }
  SetCursorActive(t) {
    ModelManager_1.ModelManager.PlatformModel.IsGamepad() && t
      ? this.SetActive(!0)
      : this.SetActive(!1);
  }
}
//# sourceMappingURL=WorldMapView.js.map
