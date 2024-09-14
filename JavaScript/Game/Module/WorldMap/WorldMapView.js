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
  LocalStorage_1 = require("../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../Ui/Base/UiPanelBase"),
  UiTickViewBase_1 = require("../../Ui/Base/UiTickViewBase"),
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
  MapLogger_1 = require("../Map/Misc/MapLogger"),
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
  WorldMapUiEntity_1 = require("./ViewComponent/WorldMapUiEntity"),
  WorldMapController_1 = require("./WorldMapController"),
  WorldMapDefine_1 = require("./WorldMapDefine"),
  WorldMapNoteItem_1 = require("./WorldMapNoteItem"),
  WorldMapSubMapItem_1 = require("./WorldMapSubMapItem"),
  WorldMapUtil_1 = require("./WorldMapUtil"),
  SCALE_STEP = 0.1,
  MARKICON_HALFSIZE = 70,
  MAX_INT32_NUMBER = 2147483647,
  VIEW_PORT_BUFFER_REGION = 400;
class WorldMapView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.WorldMapUiEntity = void 0),
      (this.v3o = void 0),
      (this.BFo = void 0),
      (this.M3o = void 0),
      (this.R3o = void 0),
      (this.NXs = void 0),
      (this.fea = void 0),
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
      (this.X3o = void 0),
      (this.K3o = void 0),
      (this.Q3o = void 0),
      (this.J3o = 0),
      (this.DKa = 0),
      (this.z3o = !1),
      (this.WJa = [1506, 1510, 1512]),
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
      (this.bZe = (t) => {
        ("PowerView" !== t && "ExploreProgressView" !== t) ||
          (this.WorldMapUiEntity.SecondaryUiComponent.ExtraSecondaryUiOpen =
            !0);
      }),
      (this.$Ge = (t) => {
        ("PowerView" !== t && "ExploreProgressView" !== t) ||
          ((this.l4o = !1),
          (this.WorldMapUiEntity.SecondaryUiComponent.ExtraSecondaryUiOpen =
            !1),
          this._4o());
      }),
      (this.l4o = !1),
      (this.Ili = () => {
        this.u4o(() => {
          PowerController_1.PowerController.OpenPowerView(), (this.l4o = !0);
        });
      }),
      (this._4o = () => {
        this.v3o.SetClickRangeVisible(!1),
          this.WorldMapUiEntity.ClickedItem &&
            ((this.WorldMapUiEntity.ClickedItem.IsIgnoreScaleShow = !1),
            this.WorldMapUiEntity.ClickedItem.SetSelected(!1),
            this.WorldMapUiEntity.UpdateSingleMarkItem(
              this.WorldMapUiEntity.ClickedItem,
            ),
            (this.WorldMapUiEntity.ClickedItem = void 0),
            this.WorldMapUiEntity.UpdateMarkItems()),
          this.c4o(!0),
          this.z3o ||
            (this.K3o.StopCurrentSequence(),
            this.GetItem(17).SetUIActive(!0),
            this.K3o.PlayLevelSequenceByName("Show")),
          this.m4o(Info_1.Info.IsInGamepad()),
          this.N3o.SetCursorActive(!0);
      }),
      (this.d4o = () => {
        this.c4o(!1),
          this.z3o
            ? (this.z3o = !1)
            : (this.K3o.StopCurrentSequence(),
              this.K3o.PlayLevelSequenceByName("Hide")),
          this.N3o.SetCursorActive(!1);
      }),
      (this.TYa = (t) => {
        "Hide" === t && this.GetItem(17).SetUIActive(!1);
      }),
      (this.a4o = () => {
        this.WorldMapUiEntity.UpdateMarkItems(),
          this.WorldMapUiEntity.SyncTransformToFrontContainer(),
          this.h4o();
      }),
      (this.OnSubMapFloorChanged = (t, e) => {
        var i = this.WorldMapUiEntity.MultiFloorComponent;
        i.MultiMapFloorLayout.DeselectCurrentGridProxy(),
          i.MultiMapFloorLayout.SelectGridProxy(t),
          0 === t
            ? ((i.IsShowMultiMap = !1), this.v3o?.HideSubMapTile(), this.h4o())
            : ((i.IsShowMultiMap = !0),
              this.v3o.ShowSubMapTile(i.ShowMultiMapGroupId, t, !e));
      }),
      (this.vKe = (t) => {
        this.u4o();
      }),
      (this.GFo = (t) => {
        if (2 !== t.mouseButtonType && !this.l4o) {
          t = t.GetLocalPointInPlane();
          const a = Vector2D_1.Vector2D.Create(t.X, t.Y);
          if (
            this.WorldMapUiEntity.IsInPlayerMap &&
            this.WorldMapUiEntity.PlayerComponent.PlayerOutOfBound &&
            this.C4o(a, this.v3o.SelfPlayerNode)[0]
          )
            this.WorldMapUiEntity.MoveComponent.FocusPlayer(
              this.WorldMapUiEntity.PlayerComponent.PlayerUiPosition,
              !0,
              1,
            );
          else {
            const n = [];
            var t = Vector_1.Vector.Create(t.X, t.Y, t.Z),
              e = [],
              i = [],
              s = async (t) => {
                var e = await t.GetRootItemAsync();
                return [t, e];
              };
            for (const _ of this.v3o.GetMarkItemsByClickPosition(t))
              _.View &&
                _.GetInteractiveFlag() &&
                !_.IsOutOfBound &&
                e.push(s(_));
            var r,
              t = Promise.all(e).then((t) => {
                for (const e of t) this.C4o(a, e[1])[0] && n.push(e[0]);
              });
            for ([, r] of this.v3o.GetAllMarkItems())
              for (var [, h] of r) h.IsOutOfBound && i.push(s(h));
            var o = Promise.all(i).then((t) => {
              for (const e of t) this.C4o(a, e[1])[0] && n.push(e[0]);
            });
            Promise.all([o, t]).then(() => {
              0 === n.length
                ? this.g4o(a)
                : 1 === n.length
                  ? this.f4o(n[0])
                  : 1 < n.length && this.p4o(n, a);
            });
          }
        }
      }),
      (this.f4o = (e, i) => {
        if (
          !this.WorldMapUiEntity.ClickedItem ||
          this.WorldMapUiEntity.ClickedItem.MarkId !== e.MarkId
        ) {
          var s = ModelManager_1.ModelManager.WorldMapModel;
          (s.CurrentFocalMarkType = e.MarkType),
            (s.CurrentFocalMarkId = e.MarkId);
          let t = !0;
          this.WorldMapUiEntity.SecondaryUiComponent.IsSecondaryUiOpening &&
            (!e.IsOutOfBound || i ? (this.z3o = !0) : (this.z3o = !1),
            (t = !1)),
            this.u4o(() => {
              var t;
              (e.IsOutOfBound &&
                (this.WorldMapUiEntity.MoveComponent.SetMapPosition(e, !0, 1),
                !i)) ||
                (this.R3o &&
                  !this.R3o.IsDestroy &&
                  this.R3o.GetRootItemAsync().then((t) => {
                    t && this.v4o(t).StopSequenceByKey("Dianji");
                  }),
                (this.R3o = e),
                (this.WorldMapUiEntity.ClickedItem = e),
                this.WorldMapUiEntity.ClickedItem?.SetSelected(!0),
                Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug(
                    "Map",
                    64,
                    "点击图标",
                    ["追踪状态:", e.IsTracked],
                    ["MarkId:", e.MarkId],
                  ),
                this.WorldMapUiEntity.ClickedItem.IsMultiMap()
                  ? ((t = this.WorldMapUiEntity.ClickedItem.GetMultiMapId()),
                    (t =
                      ConfigManager_1.ConfigManager.MapConfig.GetSubMapConfigById(
                        t,
                      )) && this.h4o(t.GroupId, t.Floor, !0))
                  : this.OnSubMapFloorChanged(0),
                this.M4o(e));
            }, t);
        }
      }),
      (this.E4o = async (i, s) => {
        var r = i.filter((t) => t.IsOutOfBound);
        if (0 === r.length)
          this.WorldMapUiEntity.SecondaryUiComponent.ShowMarkMenu(
            this.RootItem,
            i,
          ),
            this.v3o.SetClickRangeVisible(!0, s);
        else {
          let t = r[0];
          i = await t.GetRootItemAsync();
          let e = Vector2D_1.Vector2D.Distance(
            s,
            Vector2D_1.Vector2D.Create(i.GetAnchorOffset()),
          );
          var h = [];
          for (const n of r)
            n.View &&
              h.push(
                (async (t) => {
                  var e = await t.GetRootItemAsync();
                  return [t, e];
                })(n),
              );
          for (const _ of await Promise.all(h)) {
            var o = _[0],
              a = _[1],
              a = Vector2D_1.Vector2D.Distance(
                s,
                Vector2D_1.Vector2D.Create(a.GetAnchorOffset()),
              );
            e > a && ((t = o), (e = a));
          }
          i = Vector2D_1.Vector2D.Create(t.UiPosition.X, t.UiPosition.Y);
          i.UnaryNegation(i),
            i.MultiplyEqual(this.MapScale),
            this.WorldMapUiEntity.MoveComponent.SetMapPosition(i, !1, 1);
        }
      }),
      (this.I4o = (t) => {
        t = this.v3o.GetMarkItem(t.MarkType, t.MarkId);
        t &&
          (9 === t.MarkType && (t.IsIgnoreScaleShow = !0),
          this.WorldMapUiEntity.UpdateSingleMarkItem(t));
      }),
      (this.T4o = (t, e) => {
        var i = this.v3o.GetMarkItem(t, e);
        i && this.WorldMapUiEntity.UpdateSingleMarkItem(i),
          this.WorldMapUiEntity.ClickedItem?.MarkType === t &&
            this.WorldMapUiEntity.ClickedItem?.MarkId === e &&
            (this.WorldMapUiEntity.ClickedItem = void 0);
      }),
      (this.R4o = (t, e) => {
        this.WorldMapUiEntity.QuickNavigateComponent.NavigateTo(e, t, !0);
      }),
      (this.RKa = (t, e, i) => {
        var s = this.v3o.GetMarkItem(e, t);
        s
          ? (this.WorldMapUiEntity.MoveComponent.PushMap(s, !0),
            i && this.U4o(s.MarkType, t))
          : MapLogger_1.MapLogger.Error(
              64,
              "聚焦了不存在的标记",
              ["地图标记类型:", e],
              ["地图标记Id", t],
            );
      }),
      (this.bXa = (t, e, i, s) => {
        this.aza(t, e, i, s);
      }),
      (this.A4o = (t) => {
        this.u4o(() => {
          (ModelManager_1.ModelManager.WorldMapModel.HideCustomMarks = 0 === t),
            this.WorldMapUiEntity.UpdateMarkItems();
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
        ) && this.WorldMapUiEntity.SecondaryUiComponent.IsSecondaryUiOpening
          ? this.u4o()
          : UiManager_1.UiManager.ResetToBattleView();
      }),
      (this.x4o = (t, e) => {
        2 === e &&
          this.WorldMapUiEntity.InteractComponent.IsJoystickZoom &&
          this.WorldMapUiEntity.MoveComponent.KillTweening(),
          this.WorldMapUiEntity.SecondaryUiComponent.IsSecondaryUiOpening ||
            this.WorldMapUiEntity.ScaleComponent.AddMapScale(t, e);
      }),
      (this.B4o = (t, e) => e.MapNoteConfig.Rank - t.MapNoteConfig.Rank),
      (this.b4o = (t) => {
        this.WorldMapUiEntity.QuickNavigateComponent.NavigateTo(t, 0, !0);
      }),
      (this.bsa = () => {
        var t = MapNoteById_1.configMapNoteById.GetConfig(9);
        return t &&
          this.UKa(t) &&
          ModelManager_1.ModelManager.RoguelikeModel?.GetMapNoteShowState() &&
          t
          ? {
              MapNoteId: 9,
              ClickCallBack: this.b4o,
              MapNoteConfig: t,
              MapMarkId: t.MarkIdMap.get(1),
            }
          : void 0;
      }),
      (this.tja = () => {
        var t = MapNoteById_1.configMapNoteById.GetConfig(10);
        if (t && this.UKa(t)) {
          var e,
            i = ModelManager_1.ModelManager.MingSuModel,
            s = i.GetDragonPoolInstanceById(
              MingSuDefine_1.DARK_COAST_POOL_CONFIG_ID,
            );
          if (s)
            return (
              (e = s.GetDragonPoolLevel()),
              (e = s.GetNeedCoreCount(e) - s.GetHadCoreCount()),
              (s = i.GetTargetDragonPoolCoreById(
                MingSuDefine_1.DARK_COAST_POOL_CONFIG_ID,
              )),
              e <= i.GetItemCount(s) && t
                ? {
                    MapNoteId: 10,
                    ClickCallBack: this.b4o,
                    MapNoteConfig: t,
                    MapMarkId: t.MarkIdMap.get(
                      MingSuDefine_1.DARK_COAST_POOL_CONFIG_ID,
                    ),
                  }
                : void 0
            );
        }
      }),
      (this.q4o = () => {
        var t = MapNoteById_1.configMapNoteById.GetConfig(2);
        if (t && this.UKa(t)) {
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
        return t &&
          this.Qza() &&
          ModelManager_1.ModelManager.TowerModel.CanGetRewardAllDifficulties() &&
          t
          ? {
              MapNoteId: 3,
              ClickCallBack: this.b4o,
              MapNoteConfig: t,
              MapMarkId: t.MarkIdMap.get(1),
            }
          : void 0;
      }),
      (this.N4o = () => {
        var t =
          ModelManager_1.ModelManager.ExploreLevelModel.GetCountryExploreLevelData(
            WorldMapDefine_1.HUANG_LONG_COUNTRY_ID,
          );
        if (t && t.CanLevelUp()) {
          t = MapNoteById_1.configMapNoteById.GetConfig(5);
          if (t)
            if (this.UKa(t))
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
          var e = MapNoteById_1.configMapNoteById.GetConfig(8);
          if (e)
            if (this.UKa(e))
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
        var e = MapNoteById_1.configMapNoteById.GetConfig(4);
        if (this.UKa(e)) {
          var s = e.QuestIdList;
          let i = 0,
            t = !1;
          for (const h of s) {
            var r = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(h);
            if (2 === r || 1 === r) {
              (i = h), (t = !0);
              break;
            }
          }
          return t && e
            ? {
                MapNoteId: 4,
                ClickCallBack: (t) => {
                  var e = () => {
                    var t,
                      e =
                        ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest()
                          .Id;
                    e === i &&
                      void 0 !==
                        (t =
                          ModelManager_1.ModelManager.QuestNewModel.TryGetMapMarkIdByQuestId(
                            e,
                          )) &&
                      (this.WorldMapUiEntity.QuickNavigateComponent.NavigateTo(
                        t,
                        12,
                        !0,
                      ),
                      Log_1.Log.CheckInfo()) &&
                      Log_1.Log.Info(
                        "Quest",
                        38,
                        "选中鸣域等阶升级任务",
                        ["QuestId", e],
                        ["MarkID", t],
                      );
                  };
                  ModelManager_1.ModelManager.QuestNewModel.IsTrackingQuest(i)
                    ? e()
                    : QuestController_1.QuestNewController.RequestTrackQuest(
                        i,
                        !0,
                        2,
                        0,
                        e,
                      );
                },
                MapNoteConfig: e,
              }
            : void 0;
        }
      }),
      (this.XBo = () => {
        this.N3o.SetCursorActive(
          !this.WorldMapUiEntity.SecondaryUiComponent.IsSecondaryUiOpening,
        );
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
        this.WorldMapUiEntity.IsInPlayerMap &&
          (this.WorldMapUiEntity.InteractComponent.SetJoystickFocus(!0),
          this.WorldMapUiEntity.MoveComponent.FocusPlayer(
            this.WorldMapUiEntity.PlayerComponent.PlayerUiPosition,
            !0,
            1,
          ));
      }),
      (this.H4o = () => {
        ModelManager_1.ModelManager.AreaModel.GetCurrentAreaId(
          ExploreProgressDefine_1.AREA_LEVEL,
        )
          ? (this.k3o.SetActive(!0), this.k3o.Update())
          : this.k3o.SetActive(!1);
      }),
      (this.xKa = () => {
        this.WorldMapUiEntity.SecondaryUiComponent.ShowQuickNavigate(
          this.RootItem,
        );
      });
  }
  Qza() {
    return this.DKa === MapDefine_1.BIG_WORLD_MAP_ID;
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
      [21, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [5, this.AMo],
        [21, this.xKa],
      ]);
  }
  async OnBeforeStartAsync() {
    (this.M3o = this.OpenParam),
      this.OXa(),
      (this.BFo = this.GetItem(13)
        .GetOwner()
        .GetComponentByClass(UE.KuroWorldMapUIParams.StaticClass())),
      await this.j4o(),
      await this.W3o.OnWorldMapBeforeStartAsync(),
      (this.X3o = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(19),
        () => new WorldMapSubMapItem_1.WorldMapSubMapItem(),
      )),
      await ControllerHolder_1.ControllerHolder.TowerController.RefreshTower(),
      await ControllerHolder_1.ControllerHolder.MingSuController.SendDarkCoastDeliveryRequestAsync();
  }
  OXa() {
    var t, e;
    this.M3o
      ? (this.M3o.MarkId &&
          void 0 === this.M3o.MapId &&
          ((e = this.M3o.MarkId),
          (t = this.M3o.MarkType),
          (e = MapUtil_1.MapUtil.GetMarkBelongMapId(e, t)),
          (this.M3o.MapId = e)),
        void 0 === this.M3o.MapId &&
          (this.M3o.MapId = MapUtil_1.MapUtil.GetCurrentBigMapId()),
        (this.DKa = this.M3o.MapId))
      : ((this.DKa = MapUtil_1.MapUtil.GetCurrentBigMapId()), this.KJa()),
      (ModelManager_1.ModelManager.WorldMapModel.WorldMapMapId = this.DKa);
  }
  KJa() {
    MapUtil_1.MapUtil.IsInBigWorld(this.DKa) ||
      (this.WJa.includes(this.DKa) &&
        (this.DKa = MapDefine_1.HHA_BIG_WORLD_MAP_ID),
      (this.DKa = MapDefine_1.BIG_WORLD_MAP_ID));
  }
  async j4o() {
    await Promise.all([
      ExploreProgressController_1.ExploreProgressController.AllExploreProgressAsyncRequest(),
      LordGymController_1.LordGymController.LordGymInfoRequest(),
    ]),
      await Promise.all([
        this.W4o(),
        this.Gkn(),
        this.Q4o(),
        this.X4o(),
        this.$4o(),
        this.rYs(),
        this.Y4o(),
        this.J4o(),
      ]),
      this.z4o();
  }
  async W4o() {
    (this.O3o = new MapResourceMgr_1.MapResourceMgr()),
      await this.O3o.PreloadMapAssets(this.DKa);
  }
  async Gkn() {
    (this.V3o = this.GetItem(18)),
      (this.v3o = new Map_1.BaseMap(
        this.DKa,
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
    (this.NXs = new PowerCurrencyItem_1.PowerCurrencyItem()),
      await this.NXs.CreateThenShowByResourceIdAsync(
        "UIItem_CommonCurrencyItem",
        this.GetItem(10).GetParentAsUIItem(),
      ),
      this.NXs.ShowWithoutText(ItemDefines_1.EItemId.Power),
      this.NXs.SetButtonFunction(this.Ili),
      this.NXs.SetActive(
        ModelManager_1.ModelManager.FunctionModel.IsOpen(10017),
      );
  }
  async rYs() {
    this.GetItem(10)?.SetUIActive(!1),
      (this.fea = new PowerCurrencyItem_1.PowerCurrencyItem()),
      await this.fea.CreateThenShowByResourceIdAsync(
        "UIItem_CommonCurrencyItem",
        this.GetItem(10).GetParentAsUIItem(),
      ),
      this.fea.ShowWithoutText(ItemDefines_1.EItemId.OverPower),
      this.fea.RefreshAddButtonActive(),
      this.fea.SetActive(
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
        ModelManager_1.ModelManager.FunctionModel.IsOpen(10055) && this.Qza());
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
    this.WorldMapUiEntity.PlayerComponent.PlayerRotation = 0;
    var t = this.GetItem(8).GetWidth() / this.RootItem.GetWidth(),
      e = this.GetItem(8).GetHeight() / this.RootItem.GetHeight(),
      i = WorldMapUtil_1.WorldMapUtil.GetViewportSizeByPool();
    (this.WorldMapUiEntity.MarkEdgeSize = new UE.Vector2D(
      (i.X / 2) * t - MARKICON_HALFSIZE,
      (i.Y / 2) * e - MARKICON_HALFSIZE,
    )),
      (this.WorldMapUiEntity.OutOfViewPortSize = Vector2D_1.Vector2D.Create(
        (i.X / 2 + VIEW_PORT_BUFFER_REGION) * t,
        (i.Y / 2 + VIEW_PORT_BUFFER_REGION) * e,
      ));
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.MarkMenuClickItem,
      this.f4o,
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
        EventDefine_1.EEventName.BlackScreenFadeOnPlotToWorldMap,
        this.e4o,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldMapSubMapChanged,
        this.OnSubMapFloorChanged,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldMapPositionChanged,
        this.a4o,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldMapFocalMarkItem,
        this.RKa,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldMapChangeMap,
        this.bXa,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.MarkMenuClickItem,
      this.f4o,
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
        EventDefine_1.EEventName.BlackScreenFadeOnPlotToWorldMap,
        this.e4o,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldMapSubMapChanged,
        this.OnSubMapFloorChanged,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldMapPositionChanged,
        this.a4o,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldMapFocalMarkItem,
        this.RKa,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldMapChangeMap,
        this.bXa,
      );
  }
  OnStart() {
    (this.x3o = []),
      this.i5o(),
      (this.K3o = new LevelSequencePlayer_1.LevelSequencePlayer(
        this.GetItem(17),
      )),
      this.K3o.BindSequenceCloseEvent(this.TYa),
      PowerController_1.PowerController.SendUpdatePowerRequest([
        ItemDefines_1.EItemId.Power,
        ItemDefines_1.EItemId.OverPower,
      ]);
  }
  OnBeforeShow() {
    this.Z4o(),
      this.e5o(),
      this.WorldMapUiEntity.Init(),
      (this.WorldMapUiEntity.MultiFloorComponent.MultiMapFloorContainer =
        this.GetItem(20)),
      this.c4o(!0),
      this.H4o(),
      this.yOa(),
      this.o5o(),
      0 < this.J3o && this.v3o.HandleAreaOpen(this.J3o),
      this.RefreshSubMapFloorLayout(),
      this.W3o.OnWorldMapBeforeShow();
  }
  OnAfterShow() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldMapViewOpened);
    var t,
      e,
      i = this.M3o;
    i &&
      (MapUtil_1.MapUtil.GetMarkBelongMapId(i.MarkId, i.MarkType) ===
        this.DKa &&
        (e = this.v3o.GetMarkItem(i.MarkType, i.MarkId)) &&
        (1 === e.MarkType
          ? this.WorldMapUiEntity.MoveComponent.PushMap(e, !i.IsNotFocusTween)
          : this.U4o(i.MarkType, i.MarkId)),
      (this.M3o = void 0)),
      this.W3o.OnWorldMapAfterShow(),
      i &&
        (e = MapUtil_1.MapUtil.GetMarkBelongMapId(i.MarkId, i.MarkType)) !==
          MapUtil_1.MapUtil.GetCurrentBigMapId() &&
        ((t = this.v3o.GetMarkItem(i.MarkType, i.MarkId)) &&
          ((e = MapUtil_1.MapUtil.GetInstanceDungeonTempWorldName(
            e,
            t.WorldPosition,
          )),
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
            "CrossMapMainTips",
            e,
          )),
        this.WorldMapUiEntity.QuickNavigateComponent.NavigateTo(
          i.MarkId,
          i.MarkType,
          !0,
        ));
  }
  OnBeforeHide() {
    this.v3o.UnBindMapTileDelegate();
  }
  OnTick(t) {
    void 0 !== this.WorldMapUiEntity &&
      (this.WorldMapUiEntity.Tick(t),
      this.w3o || (this.w3o = new Array()),
      this.WorldMapUiEntity.InteractComponent.CheckTouch(),
      this.WorldMapUiEntity.MoveComponent.TickMoveDirty(),
      this.m4o());
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
                i = s.GetInteractiveFlag();
              t &&
                i &&
                (this.G3o[0] > e && ((this.G3o[0] = e), (this.G3o[1] = s)),
                this.w3o.push(s));
            });
      this.N3o.SetSelected(!1);
    }
  }
  n5o(t = !1) {
    ((Info_1.Info.IsInGamepad() &&
      this.WorldMapUiEntity.InteractComponent.IsJoystickMoving) ||
      t) &&
      (this.WorldMapUiEntity.MoveComponent.KillTweening(), this.r5o());
  }
  s5o() {
    if (
      Info_1.Info.IsInGamepad() &&
      !this.WorldMapUiEntity.InteractComponent.IsJoystickMoving &&
      !this.WorldMapUiEntity.InteractComponent.IsJoystickZoom
    ) {
      if (this.WorldMapUiEntity.InteractComponent.IsJoystickFocus) {
        if (this.WorldMapUiEntity.MoveComponent.IsTweeningMove) return;
        this.WorldMapUiEntity.InteractComponent.SetJoystickFocus(!1),
          this.r5o();
      }
      0 < this.w3o.length &&
        void 0 === this.WorldMapUiEntity.ClickedItem &&
        (this.N3o.SetSelected(!0),
        this.WorldMapUiEntity.MoveComponent.SetMapPosition(
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
      this.h5o(),
      this.a5o(),
      WorldMapController_1.WorldMapController.ClearFocalMarkItem(),
      this.GetExtendToggle(6).OnStateChange.Clear(),
      this.b3o.OnDestroy(),
      this.q3o.OnDestroy(),
      this.Q3o?.Clear(),
      this.K3o?.Clear(),
      (this.w3o = void 0),
      this.NXs.Destroy(),
      this.fea.Destroy(),
      this.v3o.Destroy(),
      this.O3o.Destroy(),
      this.N3o.Destroy(),
      (ModelManager_1.ModelManager.WorldMapModel.WorldMapMapId = void 0);
  }
  async aza(t, e, i, s) {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.WorldMapBeforeChangeMap,
    ),
      this.v3o.UnBindMapTileDelegate(),
      this.a5o(),
      WorldMapController_1.WorldMapController.ClearFocalMarkItem(),
      await this.v3o.DestroyAsync(),
      this.O3o.Destroy(),
      this.WorldMapUiEntity.RemoveComponent(2),
      (this.M3o = { MarkId: t, MarkType: e, MapId: i }),
      this.OXa(),
      await Promise.all([this.W4o(), this.Gkn()]);
    (t = this.GetItem(16)),
      (e =
        ModelManager_1.ModelManager.FunctionModel.IsOpen(10055) && this.Qza());
    t.SetUIActive(e),
      this.F3o.Update(this.v3o),
      (this.WorldMapUiEntity.Map = this.v3o),
      (this.WorldMapUiEntity.UiParams = this.BFo),
      (this.WorldMapUiEntity.OpenParams = this.M3o),
      (this.WorldMapUiEntity.MapId = this.DKa),
      this.WorldMapUiEntity.AddComponent(2),
      this.WorldMapUiEntity.Reset(),
      this.c4o(!0),
      this.H4o(),
      this.o5o(),
      this.RefreshSubMapFloorLayout(),
      this.W3o.OnWorldMapBeforeShow(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.WorldMapAfterChangeMap,
      ),
      this.RKa(this.M3o.MarkId, this.M3o.MarkType, s);
  }
  i5o() {
    (this.WorldMapUiEntity = new WorldMapUiEntity_1.WorldMapUiEntity()),
      (this.WorldMapUiEntity.Map = this.v3o),
      (this.WorldMapUiEntity.UiParams = this.BFo),
      (this.WorldMapUiEntity.OpenParams = this.M3o),
      (this.WorldMapUiEntity.MapId = this.DKa),
      this.WorldMapUiEntity.RegisterComponents(),
      (this.WorldMapUiEntity.ScaleComponent.ScaleSlider = this.GetSlider(1)),
      (this.WorldMapUiEntity.MultiFloorComponent.MultiMapFloorLayout =
        this.X3o);
  }
  h5o() {
    this.WorldMapUiEntity.Dispose(), (this.WorldMapUiEntity = void 0);
  }
  get MapScale() {
    return ModelManager_1.ModelManager.WorldMapModel.MapScale;
  }
  M4o(t, e = 1) {
    Info_1.Info.IsInGamepad()
      ? this.WorldMapUiEntity.MoveComponent.PushMap(t, !0, 0)
      : this.WorldMapUiEntity.MoveComponent.PushMap(t, !0, 1),
      this.WorldMapUiEntity.SecondaryUiComponent.ShowPanel(
        t,
        this.RootItem,
        this.l5o(),
        e,
      );
  }
  u4o(t, e = !0) {
    this.WorldMapUiEntity.ClickedItem &&
      this.WorldMapUiEntity.ClickedItem.IsIgnoreScaleShow &&
      ((this.WorldMapUiEntity.ClickedItem.IsIgnoreScaleShow = !1),
      this.WorldMapUiEntity.ClickedItem.SetSelected(!1),
      this.WorldMapUiEntity.UpdateSingleMarkItem(
        this.WorldMapUiEntity.ClickedItem,
      )),
      this.WorldMapUiEntity.SecondaryUiComponent.IsSecondaryUiOpening
        ? (this.WorldMapUiEntity.SecondaryUiComponent.CloseUi(t, e),
          UiManager_1.UiManager.IsViewOpen("PowerView") &&
            UiManager_1.UiManager.CloseView("PowerView"))
        : t && t();
  }
  async z9s(t) {
    var e = this.WorldMapUiEntity.MultiFloorComponent;
    return (
      e.MultiMapFloorContainerUiActive !== t &&
        ((e.MultiMapFloorContainerUiActive = t),
        e.MultiMapFloorContainerUiActive
          ? (e.MultiMapFloorContainer.SetUIActive(!0),
            await this.PlaySequenceAsync("LevelShow"))
          : await this.PlaySequenceAsync("LevelHide"),
        e.MultiMapFloorContainer.SetUIActive(e.MultiMapFloorContainerUiActive)),
      !0
    );
  }
  RefreshSubMapFloorLayout() {
    var t = ModelManager_1.ModelManager.AreaModel.GetCurrentAreaId();
    t &&
      (t =
        ConfigManager_1.ConfigManager.MapConfig.GetSubMapConfigByAreaId(t)) &&
      this.h4o(t.GroupId, t.Floor, !0, !1);
  }
  async h4o(e = void 0, r = void 0, t = !1, h = !0) {
    var i,
      s =
        ModelManager_1.ModelManager.AreaModel?.GetCurrentAreaId(
          ExploreProgressDefine_1.AREA_LEVEL,
        ) ?? -1,
      s = ModelManager_1.ModelManager.MapModel.CheckAreasUnlocked(s),
      e = e || this.v3o.GetSubMapGroupIdByPosition(),
      o = this.WorldMapUiEntity.MultiFloorComponent;
    if (0 === e)
      return o.MultiMapFloorContainerUiActive
        ? ((i = o.IsShowMultiMap) ||
            ((o.ShowMultiMapGroupId = 0),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.WorldMapSelectMultiMap,
              0,
            )),
          void (await this.z9s(i && s)))
        : void 0;
    if ((!o.MultiMapFloorContainerUiActive || t) && s) {
      o.ShowMultiMapGroupId = e;
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
          o.UpdateMultiMapPromise && (await o.UpdateMultiMapPromise.Promise),
          (o.UpdateMultiMapPromise = new CustomPromise_1.CustomPromise()),
          await this.z9s(!0),
          await o.MultiMapFloorLayout.RefreshByDataAsync(t, !1),
          o.MultiMapFloorLayout.SelectGridProxy(i),
          o.UpdateMultiMapPromise.SetResult(!0);
      }
    }
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
    this.WorldMapUiEntity.MoveComponent.IsTweeningMove &&
      this.WorldMapUiEntity.MoveComponent.KillTweening(),
      WorldMapController_1.WorldMapController.ClearFocalMarkItem(),
      this.WorldMapUiEntity.SecondaryUiComponent.IsSecondaryUiOpening
        ? ((this.z3o = !1), this.WorldMapUiEntity.UpdateMarkItems(), this.u4o())
        : this.l5o() ===
            ModelManager_1.ModelManager.WorldMapModel.CustomMarkSize
          ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
              "WorldMapTagFull",
            )
          : ((this.WorldMapUiEntity.ClickedItem = this._5o(t)),
            this.WorldMapUiEntity.ClickedItem &&
              ((this.WorldMapUiEntity.ClickedItem.IsIgnoreScaleShow = !0),
              (this.WorldMapUiEntity.ClickedItem.IsCanShowView = !0),
              this.M4o(this.WorldMapUiEntity.ClickedItem, 0)),
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
      (s.MapId = this.DKa),
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
    this.WorldMapUiEntity.SecondaryUiComponent.IsSecondaryUiOpening &&
      (this.z3o = !0),
      this.u4o(() => {
        this.E4o(t, e),
          AudioSystem_1.AudioSystem.PostEvent("play_ui_ia_spl_map_click_com");
      }),
      WorldMapController_1.WorldMapController.ClearFocalMarkItem();
  }
  U4o(t, e) {
    var i = this.v3o.GetMarkItem(t, e);
    i
      ? !(i instanceof ConfigMarkItem_1.ConfigMarkItem) ||
        (i.IsFogUnlock && i.IsConditionShouldShow)
        ? ((i.IsCanShowView = !0),
          (i.IsIgnoreScaleShow = !0),
          i?.GetInteractiveFlag() && this.f4o(i, !0))
        : ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
            "MapAreaIsLock",
          )
      : MapLogger_1.MapLogger.Error(
          64,
          "申请了不存在的地图标记",
          ["地图标记类型:", t],
          ["地图标记Id", e],
        );
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
      this.bsa,
      this.tja,
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
  UKa(t) {
    t = t.MapId;
    return 0 === t || t === this.WorldMapUiEntity.MapId;
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
      e =
        this.WorldMapUiEntity.SecondaryUiComponent.GetSecondaryPanelGuideFocusUiItem(
          i,
        );
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
        this.WorldMapUiEntity.MoveComponent.SetMapPosition(s, !0, 1),
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
  yOa() {
    if (
      !LocalStorage_1.LocalStorage.GetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.HasCleanInvalidCustomMark,
        !1,
      )
    ) {
      var t = this.v3o.GetMarkItemsByType(9);
      if (t) {
        var e = [];
        for (const i of t.values())
          this.v3o.InValidMapTile(i.WorldPosition) || e.push(i.MarkId);
        0 < e.length &&
          MapController_1.MapController.RequestRemoveMapMarks(9, e);
      }
      LocalStorage_1.LocalStorage.SetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.HasCleanInvalidCustomMark,
        !0,
      );
    }
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
      (this.qJs = () => {
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
      this.qJs,
    );
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnTowerRefreshStars,
      this.qJs,
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
