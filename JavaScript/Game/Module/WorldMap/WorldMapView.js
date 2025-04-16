"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldMapView = void 0);
const UE = require("ue"),
  AudioSystem_1 = require("../../../Core/Audio/AudioSystem"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  LordGymEntranceSetAll_1 = require("../../../Core/Define/ConfigQuery/LordGymEntranceSetAll"),
  MapNoteById_1 = require("../../../Core/Define/ConfigQuery/MapNoteById"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  Vector2D_1 = require("../../../Core/Utils/Math/Vector2D"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  LocalStorage_1 = require("../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  RedDotController_1 = require("../../RedDot/RedDotController"),
  UiPanelBase_1 = require("../../Ui/Base/UiPanelBase"),
  UiTickViewBase_1 = require("../../Ui/Base/UiTickViewBase"),
  UiManager_1 = require("../../Ui/UiManager"),
  UiModel_1 = require("../../Ui/UiModel"),
  LevelSequencePlayer_1 = require("../Common/LevelSequencePlayer"),
  ExploreProgressController_1 = require("../ExploreProgress/ExploreProgressController"),
  ItemDefines_1 = require("../Item/Data/ItemDefines"),
  LordGymController_1 = require("../LordGym/LordGymController"),
  MapController_1 = require("../Map/Controller/MapController"),
  MapDefine_1 = require("../Map/MapDefine"),
  MapHelper_1 = require("../Map/MapHelper"),
  MapUtil_1 = require("../Map/MapUtil"),
  MapDebugger_1 = require("../Map/Mark/Debug/MapDebugger"),
  TeleportMarkItem_1 = require("../Map/Marks/MarkItem/TeleportMarkItem"),
  MapLogger_1 = require("../Map/Misc/MapLogger"),
  MapLifeEventDispatcher_1 = require("../Map/View/BaseMap/Assistant/MapLifeEvent/MapLifeEventDispatcher"),
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
  WorldMapChangeGravityButtonItem_1 = require("./SubViews/Common/WorldMapChangeGravityButtonItem"),
  WorldMapUiEntity_1 = require("./ViewComponent/WorldMapUiEntity"),
  WorldMapController_1 = require("./WorldMapController"),
  WorldMapDefine_1 = require("./WorldMapDefine"),
  WorldMapNoteItem_1 = require("./WorldMapNoteItem"),
  WorldMapPlayPointItem_1 = require("./WorldMapPlayPointItem"),
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
      (this.e2l = void 0),
      (this.w3o = void 0),
      (this.B3o = new Vector2D_1.Vector2D()),
      (this.b3o = void 0),
      (this.q3o = void 0),
      (this.G3o = [0, void 0]),
      (this.N3o = void 0),
      (this.k3o = void 0),
      (this.F3o = void 0),
      (this.V3o = void 0),
      (this.H3o = void 0),
      (this.j3o = new Map()),
      (this.W3o = void 0),
      (this.X3o = void 0),
      (this.K3o = void 0),
      (this.Q3o = void 0),
      (this.Twl = 0),
      (this.$Ya = 0),
      (this.z3o = !1),
      (this.TSc = void 0),
      (this.tKl = !1),
      (this.bSc = void 0),
      (this.e4o = () => {
        var t;
        this.Twl <= 0 ||
          ((this.Twl = 0),
          (t = this.v3o.SelfPlayerNode?.GetLGUISpaceAbsolutePosition()) &&
            this.H3o?.SetLGUISpaceAbsolutePosition(t),
          this.H3o?.SetUIActive(!0),
          this.Q3o?.PlayLevelSequenceByName("Start", !0),
          this.v3o.HandleMapTileDelegate());
      }),
      (this.Shl = new Set([
        "PowerView",
        "ExploreProgressView",
        "MapExploreDetailView",
      ])),
      (this.yhl = (t) => {
        this.Shl.has(t) &&
          (this.u4o(void 0, !1),
          (this.WorldMapUiEntity.SecondaryUiComponent.ExtraSecondaryUiOpen =
            !0),
          this.d4o());
      }),
      (this.$Ge = (t) => {
        this.Shl.has(t) &&
          ((this.WorldMapUiEntity.SecondaryUiComponent.ExtraSecondaryUiOpen =
            !1),
          this.WorldMapUiEntity.SecondaryUiComponent.IsSecondaryUiOpening ||
            this._4o());
      }),
      (this.Ili = () => {
        this.u4o(() => {
          PowerController_1.PowerController.OpenPowerView();
        });
      }),
      (this._4o = () => {
        this.v3o.SetClickRangeVisible(!1),
          this.WorldMapUiEntity.ClickedItem &&
            ((this.WorldMapUiEntity.ClickedItem.IsIgnoreScaleShow = !1),
            this.WorldMapUiEntity.ClickedItem.SetSelected(!1),
            this.WorldMapUiEntity.UpdateSingleMarkItem(
              this.WorldMapUiEntity.ClickedItem,
              !0,
            ),
            (this.WorldMapUiEntity.ClickedItem = void 0)),
          this.WorldMapUiEntity.UpdateMarkItems(),
          this.c4o(!0),
          this.z3o ||
            (this.K3o.StopCurrentSequence(),
            this.GetItem(17).SetUIActive(!0),
            this.K3o.PlayLevelSequenceByName("Show")),
          this.m4o(Info_1.Info.IsInGamepad()),
          this.N3o.SetCursorActive(!0),
          this.iKl();
      }),
      (this.iKl = () => {
        this.tKl &&
          !this.WorldMapUiEntity.SecondaryUiComponent.IsSecondaryUiOpening &&
          ((this.tKl = !1), this.M2l(), this.bQl(500));
      }),
      (this.d4o = () => {
        this.c4o(!1),
          this.z3o
            ? (this.z3o = !1)
            : (this.K3o.StopCurrentSequence(),
              this.K3o.PlayLevelSequenceByName("Hide")),
          this.N3o.SetCursorActive(!1);
      }),
      (this.Ceh = (t) => {
        "Hide" === t && this.GetItem(17).SetUIActive(!1);
      }),
      (this.vKe = (t) => {
        this.u4o();
      }),
      (this.GFo = (t) => {
        if (
          2 !== t.mouseButtonType &&
          !this.WorldMapUiEntity.SecondaryUiComponent.ExtraSecondaryUiOpen
        ) {
          t = t.GetLocalPointInPlane();
          const o = Vector2D_1.Vector2D.Create(t.X, t.Y);
          if (
            this.WorldMapUiEntity.IsInPlayerMap &&
            this.WorldMapUiEntity.PlayerComponent.PlayerOutOfBound &&
            this.C4o(o, this.v3o.SelfPlayerNode, !0)[0]
          )
            this.WorldMapUiEntity.MoveComponent.FocusPlayer(
              this.WorldMapUiEntity.PlayerComponent.PlayerUiPosition,
              !0,
              1,
            );
          else {
            const _ = [];
            var t = Vector_1.Vector.Create(t.X, t.Y, t.Z),
              e = [],
              s = [],
              r = async (t) => {
                var e = await t.GetRootItemAsync();
                return [t, e];
              };
            for (const l of this.v3o.GetMarkItemsByClickPosition(t))
              l.View &&
                l.GetInteractiveFlag() &&
                !l.IsOutOfBound &&
                e.push(r(l));
            let i = e.length <= 1;
            var a,
              t = Promise.all(e).then((t) => {
                for (const e of t) this.C4o(o, e[1], i)[0] && _.push(e[0]);
              });
            for ([, a] of this.v3o.GetAllMarkItems())
              for (var [, h] of a) h.IsOutOfBound && s.push(r(h));
            i = s.length <= 1;
            var n = Promise.all(s).then((t) => {
              for (const e of t) this.C4o(o, e[1], i)[0] && _.push(e[0]);
            });
            Promise.all([n, t]).then(() => {
              0 === _.length
                ? this.g4o(o)
                : 1 === _.length
                  ? this.f4o(_[0])
                  : 1 < _.length && this.p4o(_, o);
            });
          }
        }
      }),
      (this.f4o = (s, r) => {
        if (
          !this.WorldMapUiEntity.ClickedItem ||
          this.WorldMapUiEntity.ClickedItem.MarkId !== s.MarkId
        ) {
          var e = ModelManager_1.ModelManager.WorldMapModel;
          (e.CurrentFocalMarkType = s.MarkType),
            (e.CurrentFocalMarkId = s.MarkId),
            e.EnableDebug &&
              MapDebugger_1.MapDebugger.PrintMarkItemDumpInfo(
                this.WorldMapUiEntity.Map,
                s,
              );
          let t = !0;
          this.WorldMapUiEntity.SecondaryUiComponent.IsInternalSecondaryUiOpen() &&
            (!s.IsOutOfBound || r ? (this.z3o = !0) : (this.z3o = !1),
            (t = !1)),
            this.u4o(() => {
              var t, e, i;
              (s.IsOutOfBound &&
                (this.WorldMapUiEntity.MoveComponent.SetMapPosition(s, !0, 1),
                !r)) ||
                (this.R3o &&
                  !this.R3o.IsDestroy &&
                  this.R3o.GetRootItemAsync().then((t) => {
                    t && this.v4o(t).StopSequenceByKey("Dianji");
                  }),
                (this.R3o = s),
                (this.WorldMapUiEntity.ClickedItem = s),
                this.WorldMapUiEntity.ClickedItem?.SetSelected(!0),
                this.WorldMapUiEntity.UpdateSingleMarkItem(s, !0),
                Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug(
                    "Map",
                    63,
                    "点击图标",
                    ["追踪状态:", s.IsTracked],
                    ["MarkId:", s.MarkId],
                    ["IsMultiMap:", s.IsMultiMap()],
                  ),
                this.WorldMapUiEntity.ClickedItem.IsMultiMap()
                  ? ((i = this.WorldMapUiEntity.ClickedItem.GetMultiMapId()),
                    (i =
                      ConfigManager_1.ConfigManager.MapConfig.GetSubMapConfigById(
                        i,
                      )) &&
                      ((t =
                        0 < i.Area.length
                          ? i.Area[0]
                          : this.WorldMapUiEntity.Map.GetWorldMapCenterAreaId()),
                      (e = i.GroupId),
                      (i = i.Floor),
                      this.WorldMapUiEntity.MultiFloorComponent.SelectMultiMapFloor(
                        t,
                        e,
                        i,
                        !0,
                      )))
                  : this.WorldMapUiEntity.MultiFloorComponent.DeSelectMultiMapFloor(),
                this.M4o(s));
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
          var a = [];
          for (const o of r)
            o.View &&
              a.push(
                (async (t) => {
                  var e = await t.GetRootItemAsync();
                  return [t, e];
                })(o),
              );
          for (const _ of await Promise.all(a)) {
            var h = _[0],
              n = _[1],
              n = Vector2D_1.Vector2D.Distance(
                s,
                Vector2D_1.Vector2D.Create(n.GetAnchorOffset()),
              );
            e > n && ((t = h), (e = n));
          }
          i = Vector2D_1.Vector2D.Create(t.UiPosition.X, t.UiPosition.Y);
          i.UnaryNegation(i),
            i.MultiplyEqual(this.MapScale),
            this.WorldMapUiEntity.MoveComponent.SetMapPosition(i, !1, 1);
        }
      }),
      (this.I4o = (t) => {
        t = this.v3o.GetMarkItem(t.MarkType, t.MarkId);
        t && 9 === t.MarkType && (t.IsIgnoreScaleShow = !0);
      }),
      (this.mdl = (t) => {
        t.IsInConsistentDistrict() ||
          this.WorldMapUiEntity.UpdateSingleMarkItem(t);
      }),
      (this.T4o = (t, e) => {
        var i = this.v3o.GetMarkItem(t, e);
        i && this.WorldMapUiEntity.UpdateSingleMarkItem(i, !0),
          this.WorldMapUiEntity.ClickedItem?.MarkType === t &&
            this.WorldMapUiEntity.ClickedItem?.MarkId === e &&
            ((this.WorldMapUiEntity.ClickedItem.IsIgnoreScaleShow = !1),
            (this.WorldMapUiEntity.ClickedItem = void 0));
      }),
      (this.R4o = (t, e) => {
        this.WorldMapUiEntity.QuickNavigateComponent.NavigateTo(e, t, !0);
      }),
      (this.XYa = (t, e, i, s) => {
        var r = this.v3o.GetMarkItem(e, t);
        r
          ? (this.WorldMapUiEntity.MoveComponent.PushMap(r, s),
            i && 1 !== r.MarkType && this.U4o(r.MarkType, t))
          : MapLogger_1.MapLogger.Error(
              63,
              "聚焦了不存在的标记",
              ["地图标记类型:", e],
              ["地图标记Id", t],
            );
      }),
      (this.eZa = (t) => {
        this.i2l(t);
      }),
      (this.r2l = (t) => {
        this.WorldMapUiEntity.UpdateMarkItems();
      }),
      (this.o2l = (t) => {
        this.WorldMapUiEntity.UpdateMarkItems();
      }),
      (this.s2l = (t) => {
        var e =
          this.WorldMapUiEntity?.QuickNavigateComponent.GetNavigateMarkIsNeedChangeMap(
            t.MarkId,
            t.MarkType,
          );
        e?.MapId || e?.Gravity
          ? this.a2l(e.MapId, t, e.Gravity ?? 1)
          : (this.XYa(t.MarkId, t.MarkType, !1, t.FocusTween ?? !0),
            this.l2l(t));
      }),
      (this.A8l = (t, e) => {
        UiManager_1.UiManager.IsViewShow("MapExploreDetailView") ||
          (UiManager_1.UiManager.IsViewOpen("MapExploreDetailView")
            ? UiManager_1.UiManager.CloseViewAsync("MapExploreDetailView").then(
                () => {
                  this.OpenMapExploreAreaDetailView(t, e);
                },
              )
            : this.OpenMapExploreAreaDetailView(t, e));
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
          this.YYa(t) &&
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
      (this.hI1 = () => {
        var t = MapNoteById_1.configMapNoteById.GetConfig(13);
        if (t) {
          var e = this.YYa(t);
          if (e)
            if (
              ModelManager_1.ModelManager.ActivityPermanentRogueModel?.GetMapNoteShowState()
            )
              return {
                MapNoteId: 13,
                ClickCallBack: this.b4o,
                MapNoteConfig: t,
                MapMarkId: t.MarkIdMap.get(1),
              };
        }
      }),
      (this.yKa = () => {
        var t = MapNoteById_1.configMapNoteById.GetConfig(10);
        if (t && this.YYa(t)) {
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
        if (t && this.YYa(t)) {
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
      (this.PQl = () => {
        var t = MapNoteById_1.configMapNoteById.GetConfig(12);
        if (t && this.YYa(t)) {
          var e,
            i = ModelManager_1.ModelManager.MingSuModel,
            s = i.GetDragonPoolInstanceById(
              MingSuDefine_1.PUPU_VILLAGE_POOL_CONFIG_ID,
            );
          if (s)
            return (
              (e = s.GetDragonPoolLevel()),
              (e = s.GetNeedCoreCount(e) - s.GetHadCoreCount()),
              (s = i.GetTargetDragonPoolCoreById(
                MingSuDefine_1.PUPU_VILLAGE_POOL_CONFIG_ID,
              )),
              e <= i.GetItemCount(s) && t
                ? {
                    MapNoteId: 12,
                    ClickCallBack: this.b4o,
                    MapNoteConfig: t,
                    MapMarkId: t.MarkIdMap.get(
                      MingSuDefine_1.PUPU_VILLAGE_POOL_CONFIG_ID,
                    ),
                  }
                : void 0
            );
        }
      }),
      (this.G4o = () => {
        var t = MapNoteById_1.configMapNoteById.GetConfig(3);
        return t &&
          this.krh() &&
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
            if (this.YYa(t))
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
            if (this.YYa(e))
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
      (this.uql = () => {
        var e = MapNoteById_1.configMapNoteById.GetConfig(11);
        if (e && this.YYa(e)) {
          var i,
            s = ModelManager_1.ModelManager.LordGymModel;
          let t = 0;
          for (const a of LordGymEntranceSetAll_1.configLordGymEntranceSetAll.GetConfigList()) {
            var r = a.MapNoteUnlockCondition;
            if (r)
              if (
                !ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckCondition(
                  r.toString(),
                  void 0,
                  !1,
                )
              )
                continue;
            for (const h of a.LordEntranceList)
              if (
                !s.IsNewLordGymEntranceRecord(h) &&
                !s.GetGymEntranceAllFinish(h)
              ) {
                t = h;
                break;
              }
            if (0 < t) break;
          }
          if (!(t <= 0))
            return (
              (i =
                ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymEntranceConfig(
                  t,
                ).MarkId),
              {
                MapNoteId: 11,
                ClickCallBack: this.b4o,
                MapNoteConfig: e,
                MapMarkId: i,
              }
            );
        }
      }),
      (this.k4o = () => {
        var e = MapNoteById_1.configMapNoteById.GetConfig(4);
        if (this.YYa(e)) {
          var s = e.QuestIdList;
          let i = 0,
            t = !1;
          for (const a of s) {
            var r = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(a);
            if (2 === r || 1 === r) {
              (i = a), (t = !0);
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
                        37,
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
      (this._2l = () => {
        this.WorldMapUiEntity?.IsInPlayerMap &&
        this.WorldMapUiEntity?.IsInPlayerGravity
          ? this.u2l()
          : this.c2l();
      }),
      (this.u2l = () => {
        this.$lh(),
          this.WorldMapUiEntity?.MoveComponent.FocusPlayer(
            this.WorldMapUiEntity.PlayerComponent.PlayerUiPosition,
            !0,
            1,
          );
      }),
      (this.m2l = () => {
        const t = this.d2l();
        t.length <= 0
          ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
              "Tracking_List_Empty_Text",
            )
          : (this.WorldMapUiEntity.SecondaryUiComponent.IsSecondaryUiOpening &&
              (this.z3o = !0),
            this.u4o(() => {
              this.WorldMapUiEntity?.SecondaryUiComponent.ShowTrackMenu(
                this.RootItem,
                t,
              );
            }));
      }),
      (this.C2l = (t) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Map",
            69,
            "OnTrackMenuClickItem",
            ["MarkItemId", t.MarkItem?.MarkId],
            ["MarkItemName", t.MarkItem?.GetTitleText()],
            ["IsPlayerSelf", t.IsPlayerSelf],
            ["Title", t.Title],
          ),
          this.u4o(() => {
            this.$lh(),
              t.IsPlayerSelf
                ? this.WorldMapUiEntity?.MoveComponent.FocusPlayer(
                    this.WorldMapUiEntity.PlayerComponent.PlayerUiPosition,
                    !0,
                    1,
                  )
                : t.MarkItem &&
                  this.WorldMapUiEntity.MoveComponent.SetMapPosition(
                    t.MarkItem,
                    !0,
                    1,
                  );
          });
      }),
      (this.H4o = () => {
        var t = MapUtil_1.MapUtil.GetWorldMapLevelOneAreaId();
        t
          ? (this.k3o.SetActive(!0), this.k3o.Update(t))
          : this.k3o.SetActive(!1);
      }),
      (this.zYa = () => {
        this.$lh(),
          this.u4o(() => {
            this.WorldMapUiEntity.MultiFloorComponent.DeSelectMultiMapFloor(),
              this.WorldMapUiEntity.SecondaryUiComponent.ShowQuickNavigate(
                this.RootItem,
                this.v3o.GetNavigateMarkList(),
              );
          });
      }),
      (this.g2l = () => {
        this.u4o(() => {
          var t = this.p2l();
          t.forEach((t) => {
            ModelManager_1.ModelManager.ExploreProgressModel.SetLocalShowNoteIdMap(
              t.MapNoteId,
            );
          }),
            this.WorldMapUiEntity?.SecondaryUiComponent.ShowWorldMapNotePanel(
              this.RootItem,
              t,
            ),
            this.U2l();
        });
      }),
      (this.f2l = () => {
        this.u4o(() => {
          this.WorldMapUiEntity?.SecondaryUiComponent.ShowMapMarkTogglePanel(
            this.RootItem,
          );
        });
      }),
      (this.LSc = () => {
        this.WorldMapUiEntity.WorldMapAlterMapComponent.CanChangeMapGravity &&
          (this.$lh(),
          this.u4o(() => {
            this.WorldMapUiEntity.MultiFloorComponent.DeSelectMultiMapFloor(),
              this.WorldMapUiEntity.WorldMapAlterMapComponent.ChangeMapGravity(),
              this.wSc();
          }));
      });
  }
  krh() {
    return this.$Ya === MapDefine_1.BIG_WORLD_MAP_ID;
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UISliderComponent],
      [2, UE.UIButtonComponent],
      [3, UE.UIButtonComponent],
      [4, UE.UIItem],
      [5, UE.UIButtonComponent],
      [6, UE.UIButtonComponent],
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
      [22, UE.UIText],
      [23, UE.UIButtonComponent],
      [24, UE.UIItem],
      [25, UE.UIItem],
      [26, UE.UIButtonComponent],
      [27, UE.UIItem],
      [28, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [5, this.AMo],
        [21, this.zYa],
        [23, this.g2l],
        [6, this.f2l],
      ]);
  }
  async OnBeforeStartAsync() {
    this.GetItem(14)?.SetUIActive(!1),
      this.GetItem(24)?.SetUIActive(!1),
      this.GetText(22)?.ShowTextNew("ChangeMapBtn_Text"),
      this.RSc(!1, !1),
      (this.M3o = this.OpenParam),
      this.iZa(),
      (this.BFo = this.GetItem(13)
        .GetOwner()
        .GetComponentByClass(UE.KuroWorldMapUIParams.StaticClass())),
      ControllerHolder_1.ControllerHolder.LevelPlayReportController.RequestSimpleTrackReportAsync(),
      (this.bSc =
        new WorldMapChangeGravityButtonItem_1.WorldMapChangeGravityButtonItem()),
      await this.bSc.CreateThenShowByActorAsync(this.GetButton(26).GetOwner()),
      this.bSc.SetFunction(this.LSc),
      await this.j4o(),
      await this.W3o.OnWorldMapBeforeStartAsync(),
      (this.X3o = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(19),
        () => new WorldMapSubMapItem_1.WorldMapSubMapItem(),
      )),
      await ControllerHolder_1.ControllerHolder.TowerController.RefreshTower(),
      await ControllerHolder_1.ControllerHolder.MingSuController.SendDarkCoastDeliveryRequestAsync(),
      ModelManager_1.ModelManager.ExploreProgressModel.LoadLocalShowNoteIdMap();
  }
  iZa() {
    var t, e;
    this.M3o
      ? (this.M3o.MarkId &&
          void 0 === this.M3o.MapId &&
          ((e = this.M3o.MarkId),
          (t = this.M3o.MarkType),
          (e = ModelManager_1.ModelManager.MapModel.GetMarkMapConfigId(e, t)),
          (this.M3o.MapId = e)),
        void 0 === this.M3o.MapId &&
          (this.M3o.MapId =
            ModelManager_1.ModelManager.MapModel.CurrentWorldMapConfigId),
        (this.$Ya = this.M3o.MapId))
      : (this.$Ya =
          ModelManager_1.ModelManager.MapModel.CurrentWorldMapConfigId),
      (void 0 !== this.$Ya &&
        ConfigManager_1.ConfigManager.WorldMapConfig.IsMapInWorld(this.$Ya)) ||
        this.Sdl(),
      (ModelManager_1.ModelManager.WorldMapModel.WorldMapId = this.$Ya);
  }
  Sdl() {
    var t = ModelManager_1.ModelManager.WorldMapModel.LastBigSceneMiniMapInfo;
    if (t) {
      var e = t.AreaId,
        e = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(e);
      if (e) return void (this.$Ya = e.MapConfigId);
    }
    (this.$Ya = MapDefine_1.BIG_WORLD_MAP_ID),
      MapLogger_1.MapLogger.Error(
        63,
        "[地图系统]->获取上一次大世界区域配置失败",
        ["MapId:", this.$Ya],
        ["lastBigSceneMiniMapInfo", t],
      );
  }
  async j4o() {
    await Promise.all([
      ExploreProgressController_1.ExploreProgressController.AllExploreProgressAsyncRequest(),
      LordGymController_1.LordGymController.LordGymInfoRequest(),
    ]),
      await Promise.all([
        this.Gkn(),
        this.Q4o(),
        this.X4o(),
        this.$4o(),
        this.rYs(),
        this.Y4o(),
        this.J4o(),
        this.q7l(),
      ]),
      this.z4o();
  }
  async Gkn() {
    this.V3o = this.GetItem(18);
    var t = ModelManager_1.ModelManager.MapModel.GetInstanceIdByWorldMapId(
      this.$Ya,
    );
    let e = ModelManager_1.ModelManager.MapModel.GetDungeonWorldMapConfigId(t),
      i = ModelManager_1.ModelManager.WorldMapModel.WorldMapGravity;
    this.M3o &&
      ((e = ModelManager_1.ModelManager.MapModel.GetMarkMapConfigId(
        this.M3o.MarkId,
        this.M3o.MarkType,
      )),
      (i = ModelManager_1.ModelManager.MapModel.GetMarkMapGravity(
        this.M3o.MarkId,
        this.M3o.MarkType,
      )));
    var s =
      ModelManager_1.ModelManager.WorldMapModel.SetWorldMapSelectedGravity(
        e,
        i,
      );
    (this.v3o = new Map_1.BaseMap({
      InstanceId: t,
      MapType: 2,
      MapDefaultScale: this.MapScale,
      Gravity: s,
      FrontMarkContainer: this.V3o,
      ClickRange: this.BFo.MarkMenuRectSize,
    })),
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
    (this.k3o = new ExploreItem()), await this.k3o.Init(this.GetItem(15), this);
  }
  async $4o() {
    var t = this.GetItem(16),
      e =
        ((this.F3o = new WorldMapTowerItem()),
        await this.F3o.Init(t),
        ModelManager_1.ModelManager.FunctionModel.IsOpen(10055) && this.krh());
    t.SetUIActive(e), this.F3o.Update(this.v3o);
  }
  async J4o() {
    var t = this.OpenParam;
    (this.Twl = t?.OpenFogId ?? 0),
      0 < this.Twl &&
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
        EventDefine_1.EEventName.OpenViewBegined,
        this.yhl,
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
        EventDefine_1.EEventName.WorldMapFocusPlayer,
        this._2l,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldMapShowTrackList,
        this.m2l,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TrackMenuClickItem,
        this.C2l,
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
        EventDefine_1.EEventName.AddMapMark,
        this.mdl,
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
        EventDefine_1.EEventName.WorldMapFocalMarkItem,
        this.XYa,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ChangeWorldMap,
        this.eZa,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ToggleShowCustomMark,
        this.r2l,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ToggleShowCompletedPlayMark,
        this.o2l,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.NavigateMarkAndShowRange,
        this.s2l,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OpenExploreAreaDetailViewFromMap,
        this.A8l,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.MarkMenuClickItem,
      this.f4o,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OpenViewBegined,
        this.yhl,
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
        EventDefine_1.EEventName.WorldMapFocusPlayer,
        this._2l,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldMapShowTrackList,
        this.m2l,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TrackMenuClickItem,
        this.C2l,
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
        EventDefine_1.EEventName.AddMapMark,
        this.mdl,
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
        EventDefine_1.EEventName.WorldMapFocalMarkItem,
        this.XYa,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ChangeWorldMap,
        this.eZa,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ToggleShowCustomMark,
        this.r2l,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ToggleShowCompletedPlayMark,
        this.o2l,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.NavigateMarkAndShowRange,
        this.s2l,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OpenExploreAreaDetailViewFromMap,
        this.A8l,
      );
  }
  OnStart() {
    (this.x3o = []),
      (this.e2l = []),
      this.i5o(),
      (this.K3o = new LevelSequencePlayer_1.LevelSequencePlayer(
        this.GetItem(17),
      )),
      this.K3o.BindSequenceCloseEvent(this.Ceh),
      PowerController_1.PowerController.SendUpdatePowerRequest([
        ItemDefines_1.EItemId.Power,
        ItemDefines_1.EItemId.OverPower,
      ]);
  }
  OnBeforeShow() {
    this.e5o(),
      this.WorldMapUiEntity.Init(),
      (this.WorldMapUiEntity.MultiFloorComponent.MultiMapFloorContainer =
        this.GetItem(20)),
      this.c4o(!0),
      this.H4o(),
      this.Tka(),
      this.wSc(),
      0 < this.Twl && this.v3o.HandleFogAreaOpen(this.Twl),
      this.W3o.OnWorldMapBeforeShow(),
      this.WorldMapUiEntity.UpdateMarkItems();
    var t,
      e = this.M3o;
    e
      ? ((t = this.v3o.GetMarkItem(e.MarkType, e.MarkId)) &&
          (MapHelper_1.MapHelper.CheckAndShowCrossMapTips(
            e.MarkId,
            e.MarkType,
            t.TrackAreaId,
            t.WorldPosition,
          ),
          this.WorldMapUiEntity.QuickNavigateComponent.NavigateTo(
            e.MarkId,
            e.MarkType,
            !0,
            !e.IsNotFocusTween,
          )),
        e.FocusExplorePlayPoint &&
          ((t = e.FocusExplorePlayPoint[0]),
          (e = e.FocusExplorePlayPoint[1]),
          ModelManager_1.ModelManager.ExploreProgressModel.SetTrackExploreAreaItemData(
            t,
            e,
          ),
          ModelManager_1.ModelManager.ExploreProgressModel.CheckTrackExploreAreaItemData()),
        this.M3o?.SkipToExploreAreaDetailView &&
          ((t = this.M3o.SkipToExploreAreaDetailView[0]),
          (e = this.M3o.SkipToExploreAreaDetailView[1]),
          this.OpenMapExploreAreaDetailView(t, e)))
      : this.WorldMapUiEntity.MultiFloorComponent.InitMultiMap(),
      this.rKl(),
      (this.tKl =
        this.WorldMapUiEntity.SecondaryUiComponent.IsSecondaryUiOpening),
      this.tKl || this.M2l();
  }
  OnAfterShow() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldMapViewOpened),
      (this.M3o = void 0),
      this.W3o.OnWorldMapAfterShow(),
      ModelManager_1.ModelManager.ExploreProgressModel.CheckTrackExploreAreaItemData();
  }
  OnAfterPlayStartSequence() {
    this.tKl || this.bQl();
  }
  async bQl(t) {
    t && (await TimerSystem_1.TimerSystem.Wait(t)),
      this.IsDestroyOrDestroying || (this.k7l(), this.G7l());
  }
  OnBeforeHide() {
    this.v3o.UnBindMapTileDelegate();
  }
  OnTick(t) {
    void 0 !== this.WorldMapUiEntity &&
      void 0 !== this.WorldMapUiEntity?.Map &&
      (this.WorldMapUiEntity.Tick(t),
      this.w3o || (this.w3o = new Array()),
      this.WorldMapUiEntity.InteractComponent.CheckTouch(),
      this.WorldMapUiEntity.MoveComponent.TickMoveDirty(),
      this.m4o());
  }
  r5o() {
    if (Info_1.Info.IsInGamepad()) {
      var t,
        e = this.N3o.GetRootItem().D_K2_GetComponentLocation(),
        i = this.v3o.MapRootItem.D_K2_GetComponentToWorld(),
        i = UE.KismetMathLibrary.D_InverseTransformLocation(i, e),
        e =
          (this.B3o.Set(i.X, i.Y),
          (this.G3o[0] = MAX_INT32_NUMBER),
          this.w3o.splice(0),
          this.v3o.GetAllMarkItems()),
        s = e.size <= 1;
      for ([, t] of e)
        for (var [, r] of t) {
          var [a, h] = this.y2l(
              this.B3o,
              Vector2D_1.Vector2D.Create(r.UiPosition.X, r.UiPosition.Y),
              s,
            ),
            n = r.GetInteractiveFlag();
          a &&
            n &&
            (this.G3o[0] > h && ((this.G3o[0] = h), (this.G3o[1] = r)),
            this.w3o.push(r));
        }
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
      this.E2l(),
      WorldMapController_1.WorldMapController.ClearFocalMarkItem(),
      this.b3o.OnDestroy(),
      this.q3o.OnDestroy(),
      this.bSc.Destroy(),
      this.Q3o?.Clear(),
      this.K3o?.Clear(),
      (this.w3o = void 0),
      this.NXs.Destroy(),
      this.fea.Destroy(),
      this.v3o.Destroy(),
      this.N3o.Destroy(),
      ModelManager_1.ModelManager.WorldMapModel.WorldMapAxisInteractValidation.Reset(),
      (ModelManager_1.ModelManager.WorldMapModel.WorldMapId = void 0),
      (ModelManager_1.ModelManager.WorldMapModel.WorldMapCurrentMultiMapId =
        void 0),
      ModelManager_1.ModelManager.MapModel.ClearPendingAddTempMapMarkList(),
      ModelManager_1.ModelManager.LevelPlayReportModel.ResetDetailRequestFlag(),
      ModelManager_1.ModelManager.ExploreProgressModel.WorldMapViewClose(),
      ModelManager_1.ModelManager.ExploreProgressModel.SaveToLocalShowNoteIdMap();
  }
  async i2l(t) {
    await this.I2l(t),
      this.XYa(
        this.M3o.MarkId,
        this.M3o.MarkType,
        t.Focal ?? !1,
        t.FocusTween ?? !0,
      );
  }
  async I2l(t) {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.WorldMapBeforeChangeMap,
    ),
      this.a5o(),
      await this.WorldMapUiEntity.WorldMapAlterMapComponent.ChangeMapAsync(
        t.MapId,
        t.Gravity,
      ),
      (this.M3o = { MarkId: t.MarkId, MarkType: t.MarkType, MapId: t.MapId }),
      this.iZa();
    var t = this.GetItem(16),
      e = ModelManager_1.ModelManager.FunctionModel.IsOpen(10055) && this.krh();
    t.SetUIActive(e),
      this.F3o.Update(this.v3o),
      (this.WorldMapUiEntity.UiParams = this.BFo),
      (this.WorldMapUiEntity.OpenParams = this.M3o),
      (this.WorldMapUiEntity.MapId = this.$Ya),
      this.c4o(!0),
      this.H4o(),
      this.M2l(),
      this.wSc(),
      this.W3o.OnWorldMapBeforeShow(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.WorldMapAfterChangeMap,
      );
  }
  async c2l() {
    var t = ModelManager_1.ModelManager.MapModel.GetDungeonWorldMapConfigId(
        ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
      ),
      e = ModelManager_1.ModelManager.MapModel.CurrentPlayerGravity;
    await this.I2l({ MapId: t, Gravity: e, MarkId: 0, MarkType: 0 }),
      this.u2l();
  }
  i5o() {
    (this.WorldMapUiEntity = new WorldMapUiEntity_1.WorldMapUiEntity()),
      (this.WorldMapUiEntity.Map = this.v3o),
      (this.WorldMapUiEntity.UiParams = this.BFo),
      (this.WorldMapUiEntity.OpenParams = this.M3o),
      (this.WorldMapUiEntity.MapId = this.$Ya),
      this.WorldMapUiEntity.RegisterComponents(),
      (this.WorldMapUiEntity.ScaleComponent.ScaleSlider = this.GetSlider(1)),
      (this.WorldMapUiEntity.MultiFloorComponent.MultiMapFloorLayout =
        this.X3o);
    var t = async (t, e) => {
      await this.PlaySequenceAsync(t, e);
    };
    (this.WorldMapUiEntity.MultiFloorComponent.WorldMapViewPlaySequenceFunction =
      t),
      (this.WorldMapUiEntity.WorldMapAlterMapComponent.WorldMapViewPlaySequenceFunction =
        t),
      (this.WorldMapUiEntity.WorldMapAlterMapComponent.InverTowerCtrlRoot =
        this.GetItem(28)),
      this.WorldMapUiEntity.WorldMapAlterMapComponent.InverTowerCtrlRoot.SetUIActive(
        !1,
      );
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
      this.WorldMapUiEntity.SecondaryUiComponent.ShowPanel(t, this.RootItem, e);
  }
  rKl() {
    let t = !1;
    for (const e of this.Shl)
      if (UiManager_1.UiManager.IsViewOpen(e)) {
        t = !0;
        break;
      }
    this.WorldMapUiEntity.SecondaryUiComponent.ExtraSecondaryUiOpen = t;
  }
  u4o(t, e = !0) {
    this.WorldMapUiEntity.ClickedItem &&
      this.WorldMapUiEntity.ClickedItem.IsIgnoreScaleShow &&
      ((this.WorldMapUiEntity.ClickedItem.IsIgnoreScaleShow = !1),
      this.WorldMapUiEntity.ClickedItem.SetSelected(!1),
      this.WorldMapUiEntity.UpdateSingleMarkItem(
        this.WorldMapUiEntity.ClickedItem,
        !0,
      )),
      this.WorldMapUiEntity.SecondaryUiComponent.ExtraSecondaryUiOpen &&
        this.Shl.forEach((t) => {
          UiManager_1.UiManager.IsViewOpen(t) &&
            UiManager_1.UiManager.CloseView(t);
        }),
      this.WorldMapUiEntity.SecondaryUiComponent.IsInternalSecondaryUiOpen()
        ? (this.WorldMapUiEntity.MultiFloorComponent.UpdateMultiMap(),
          this.WorldMapUiEntity.SecondaryUiComponent.CloseUi(t, e))
        : t && t();
  }
  C4o(t, e, i) {
    return this.y2l(t, Vector2D_1.Vector2D.Create(e?.GetAnchorOffset()), i);
  }
  y2l(t, e, i) {
    (t = Vector2D_1.Vector2D.Distance(t, e)),
      (e = i ? WorldMapDefine_1.MARK_CLICK_RANGE : this.BFo.MarkMenuRectSize);
    return [t * this.MapScale <= e, t];
  }
  g4o(t) {
    this.WorldMapUiEntity.MoveComponent.IsTweeningMove &&
      this.WorldMapUiEntity.MoveComponent.KillTweening(),
      WorldMapController_1.WorldMapController.ClearFocalMarkItem(),
      this.WorldMapUiEntity.SecondaryUiComponent.IsSecondaryUiOpening
        ? ((this.z3o = !1), this.WorldMapUiEntity.UpdateMarkItems(), this.u4o())
        : ModelManager_1.ModelManager.MapModel.GetMarkCountByType(9) ===
            ModelManager_1.ModelManager.WorldMapModel.CustomMarkSize
          ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
              "WorldMapTagFull",
            )
          : ModelManager_1.ModelManager.WorldMapModel.CustomMarksIsShow &&
            !ModelManager_1.ModelManager.WorldMapModel
              .EnableInstanceDungeonFilterMark &&
            ((this.WorldMapUiEntity.ClickedItem = this._5o(t)),
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
      s = new MapDefine_1.DynamicMarkCreateInfo({
        MarkId: 1,
        TrackTarget: i,
        MarkConfigId: 1,
        MarkType: 9,
        MapAndDungeonInfo: { MapConfigId: this.$Ya },
      });
    return (
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Map",
          63,
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
  OpenMapExploreAreaDetailView(t, e) {
    UiManager_1.UiManager.OpenView(
      "MapExploreDetailView",
      { AreaId: t, ExploreType: e },
      (t, e) => {
        t && UiModel_1.UiModel.NormalStack.Peek().AddChildViewById(e);
      },
    );
  }
  async a2l(t, e, i) {
    await this.I2l({
      MarkId: e.MarkId,
      MarkType: e.MarkType,
      MapId: t,
      Focal: !1,
      FocusTween: e.FocusTween ?? !0,
      Gravity: i,
    }),
      await this.l2l(e);
  }
  async l2l(t) {
    var e = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(t.MarkId);
    let i = void 0;
    if (e) {
      if (!ModelManager_1.ModelManager.MapModel.IsMarkFogUnlock(t.MarkId))
        return void ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
          "MapAreaIsLock",
        );
      var s = ModelManager_1.ModelManager.MapModel.GetConfigMarkTrackTarget(
        t.MarkId,
      );
      i = MapUtil_1.MapUtil.GetTrackUiPositionByTrackTargetConfig(
        s,
        e.RelativeDungeonId,
      );
    } else {
      s = ModelManager_1.ModelManager.MapModel.GetMark(t.MarkType, t.MarkId);
      if (void 0 === s)
        return void ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
          "MapAreaIsLock",
        );
      i = MapUtil_1.MapUtil.GetTrackUiPositionByTrackTargetConfig(
        s.TrackTarget,
        s.InstanceDungeonId ?? s.MapId,
      );
    }
    var e = this.v3o.GetMarkItem(t.MarkType, t.MarkId),
      s = t.FocusTween ?? !0,
      r = Vector2D_1.Vector2D.Create(i);
    e
      ? this.WorldMapUiEntity.MoveComponent.PushMap(e, s)
      : this.WorldMapUiEntity.MoveComponent.PushMapByUiPosition(i, s),
      await this.WorldMapUiEntity?.Map?.MapRangePanel.SetRangeComponentShow(
        r,
        t.Width,
        t.Height,
      ),
      t.Tips &&
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
          t.Tips,
        );
  }
  U4o(t, e) {
    var i = this.v3o.GetMarkItem(t, e);
    if (i) {
      let t = !0;
      var s = 1 === i.MarkItemType;
      if (
        (t = s
          ? i.IsFogUnlock &&
            (i.IsConditionShouldShow || i.MarkItemEntity.IsTempMapMark)
          : t)
      )
        (i.IsCanShowView = !0),
          (i.IsIgnoreScaleShow = !0),
          i.GetInteractiveFlag() && this.f4o(i, !0);
      else {
        if (s)
          if (i.IsFogUnlock && !i.IsConditionShouldShow) {
            s = i.MarkConfig.ShowCondition;
            if (0 < s) {
              i =
                ConfigManager_1.ConfigManager.WorldMapConfig.GetConditionGroup(
                  s,
                ).HintText;
              if (!StringUtils_1.StringUtils.IsEmpty(i))
                return (
                  (s = ConfigManager_1.ConfigManager.MapConfig.GetLocalText(i)),
                  void ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                    "UnlockCondition",
                    s,
                  )
                );
            }
          }
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
          "MapAreaIsLock",
        );
      }
    } else
      MapLogger_1.MapLogger.Error(
        63,
        "申请了不存在的地图标记",
        ["地图标记类型:", t],
        ["地图标记Id", e],
      );
  }
  M2l() {
    this.T2l(),
      this.L2l(),
      ModelManager_1.ModelManager.AreaModel.IsExistRecommendPlayPoint()
        ? (this.n2l(), this.U2l(), this.SKl(!0))
        : (this.o5o(), this.LQl(!1));
  }
  LQl(t) {
    this.GetButton(23)?.RootUIComp.SetUIActive(t);
  }
  SKl(t) {
    this.GetButton(23)?.RootUIComp.GetParentAsUIItem()?.SetUIActive(t);
  }
  U2l() {
    var t = this.A2l(),
      e =
        ModelManager_1.ModelManager.ExploreProgressModel.GetLocalShowNoteIdMap();
    let i = !1,
      s = !1,
      r = !1;
    for (const h of t) {
      var a = h();
      if (
        a &&
        this.D2l(a.MapNoteConfig) &&
        ((i = !0),
        e.has(a.MapNoteConfig.Id) || (r = !0),
        1 === a.MapNoteConfig.Style)
      ) {
        s = !0;
        break;
      }
    }
    this.RSc(s, r), this.LQl(i);
  }
  RSc(t, e) {
    this.GetItem(27)?.SetUIActive(t), this.ASc(!t && e);
  }
  A2l() {
    return [
      this.q4o,
      this.G4o,
      this.k4o,
      this.N4o,
      this.O4o,
      this.uql,
      this.bsa,
      this.hI1,
      this.yKa,
      this.PQl,
    ];
  }
  D2l(t) {
    t = t.ConditionId;
    return (
      0 === t ||
      ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckCondition(
        t.toString(),
        void 0,
      )
    );
  }
  ASc(t) {
    this.TSc !== t && ((this.TSc = t), this.GetItem(25)?.SetUIActive(t));
  }
  n2l() {
    var t = this.k3o?.ExploreData;
    this.O7l(t?.GetShowRecommendExploreItemDataList());
  }
  O7l(t) {
    t?.forEach((t, e) => {
      t.LogInfo();
      let i = this.e2l[e];
      i
        ? i.UpdateAreaItemData(t)
        : ((e = LguiUtil_1.LguiUtil.CopyItem(
            this.GetItem(24),
            this.GetItem(11),
          )),
          (i = new WorldMapPlayPointItem_1.WorldMapPlayPointItem()).Init(e, t),
          this.e2l.push(i));
    });
  }
  async G7l() {
    if (this.e2l?.length) {
      this.k3o?.ExploreData?.SaveLocalAreaExplorePlayState(),
        await Promise.all(this.e2l.map(async (t) => t.CheckFinish()));
      let e = 0;
      await Promise.all(
        this.e2l.map(async (t) => {
          t.CheckPlayPointStateSequence(),
            t.ExploreData?.IsNewRecommendPlay && (await t.ResumeSequence(++e));
        }),
      );
    }
  }
  async q7l() {
    var t = MapUtil_1.MapUtil.GetWorldMapLevelOneAreaId(),
      e =
        (t &&
          (await ModelManager_1.ModelManager.ExploreProgressModel.GetExploreAreaData(
            t,
          )?.CheckUpdatePlayPointData()),
        this.M3o?.FocusExplorePlayPoint?.[0]);
    e &&
      e !== t &&
      (await ModelManager_1.ModelManager.ExploreProgressModel.GetExploreAreaData(
        e,
      )?.CheckUpdatePlayPointData());
  }
  T2l() {
    for (const t of this.x3o) t.GetRootItem().SetUIActive(!1);
  }
  L2l() {
    for (const t of this.e2l) t.HideMe();
  }
  o5o() {
    var e = this.p2l();
    for (let t = 0; t < e.length; t++) {
      var i = e[t];
      this.m5o(i, t),
        ModelManager_1.ModelManager.ExploreProgressModel.SetLocalShowNoteIdMap(
          i.MapNoteConfig.Id,
        );
    }
    var t = 0 < e.length;
    t && this.F7l(), this.SKl(t);
  }
  N7l() {
    this.x3o?.forEach((t) => {
      t.PlayStartToPause();
    });
  }
  F7l() {
    var t = this.k3o?.ExploreData?.GetLocalFinishRecommendExploreItems();
    t?.length && (this.O7l(t), this.N7l());
  }
  async k7l() {
    this.x3o?.length &&
      this.e2l?.length &&
      (this.k3o?.ExploreData?.ClearLocalAreaExplorePlayState(),
      await Promise.all(this.e2l.map(async (t) => t.CheckFinish())),
      await Promise.all(this.x3o.map(async (t, e) => t.ResumeSequence(e))));
  }
  p2l() {
    var t = [];
    for (const i of this.A2l()) {
      var e = i();
      e && this.D2l(e.MapNoteConfig) && t.push(e);
    }
    return t.sort(this.B4o), t;
  }
  YYa(t) {
    t = t.MapId;
    return 0 === t || t === this.WorldMapUiEntity.MapId;
  }
  m5o(t, e) {
    this.x3o.length > e
      ? (this.x3o[e].UpdateNoteItem(t.MapNoteId, t.ClickCallBack, t.MapMarkId),
        this.x3o[e].GetRootItem().SetUIActive(!0))
      : ((e = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(14), this.GetItem(11))),
        (e = new WorldMapNoteItem_1.WorldMapNoteItem(e)),
        this.x3o.push(e),
        e.UpdateNoteItem(t.MapNoteId, t.ClickCallBack, t.MapMarkId));
  }
  a5o() {
    for (const t of this.x3o) t.Destroy();
    this.x3o.length = 0;
  }
  E2l() {
    for (const t of this.e2l) t.Destroy();
    this.e2l.length = 0;
  }
  c4o(t) {
    t !== this.P3o && ((this.P3o = t), this.GetItem(11).SetUIActive(t));
  }
  d2l() {
    var t = this.v3o.GetTrackMenuMarkList();
    const e = [];
    return (
      this.WorldMapUiEntity?.IsInPlayerMap &&
        e.push({
          IsPlayerSelf: !0,
          Icon: ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
            "SP_WorldMapPlayer1",
          ),
          Title: ModelManager_1.ModelManager.FunctionModel.GetPlayerName(),
        }),
      t.forEach((t) => {
        e.push({
          Icon: t.IconPath,
          StateIcon: t.GetStateIconPath(),
          MarkItem: t,
        });
      }),
      e
    );
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
            16,
            "聚焦引导的额外参数配置有误, 找不到地图标记",
            ["markId", i],
          )
        );
      const s = this.v3o.GetMarkItem(t, i);
      if (void 0 === (e = s?.View.GetIconItem())) return;
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
  Tka() {
    if (
      !LocalStorage_1.LocalStorage.GetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.HasCleanInvalidCustomMark,
        !1,
      )
    ) {
      var t = this.v3o.GetMarkItemsByType(9, !1);
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
  $lh() {
    this.WorldMapUiEntity.InteractComponent.SetJoystickFocus(!1),
      this.w3o.splice(0);
  }
  wSc() {
    var t = this.WorldMapUiEntity.WorldMapAlterMapComponent.CanChangeMapGravity;
    this.bSc.SetUiActive(t),
      t &&
        ((t = 1 === ModelManager_1.ModelManager.WorldMapModel.WorldMapGravity),
        (t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
          t ? "SP_BtnOverviewBDown" : "SP_BtnOverviewB",
        )),
        this.bSc.SetSprite(t));
  }
}
exports.WorldMapView = WorldMapView;
class ExploreItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(),
      (this.ExploreData = void 0),
      (this.AreaId = 0),
      (this.ParentView = void 0),
      (this.eTt = () => {
        this.ExploreData
          ? this.ParentView?.OpenMapExploreAreaDetailView(this.AreaId)
          : Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "ExploreProgress",
              69,
              "ExploreItem Click, ExploreData is null",
            );
      });
  }
  async Init(t, e) {
    await this.CreateThenShowByActorAsync(t.GetOwner()),
      this.GetText(2)?.SetRichText(!0),
      (this.ParentView = e);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UIText],
      [5, UE.UISprite],
      [6, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.eTt]]);
  }
  Update(t) {
    this.AreaId = t;
    var e =
        ModelManager_1.ModelManager.ExploreProgressModel.GetExploreAreaData(t),
      t = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(t),
      t =
        (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.Title),
        e?.GetProgress() ?? 0);
    let i = t + "%";
    e?.IsReachMaxProgress &&
      (i = StringUtils_1.StringUtils.Format(
        "<color=#ffd12f>{0}%</color>",
        t.toString(),
      )),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(2),
        "Text_ExploreRate",
        i,
      ),
      (this.ExploreData = e),
      this.GetItem(3).SetUIActive(!e?.IsReachMaxProgress),
      e?.IsReachMaxProgress ||
        ((t = e?.GetNextStageNeedProgress() ?? 0),
        (e = e?.GetStageProgress() ?? 0),
        this.GetText(4).SetText(t + "%"),
        this.GetSprite(5).SetFillAmount(e));
  }
  OnBeforeShow() {
    this.K8e();
  }
  OnBeforeHide() {
    this.Ovt();
  }
  K8e() {
    RedDotController_1.RedDotController.BindRedDot(
      "MapAreaExplore",
      this.GetItem(6),
    );
  }
  Ovt() {
    RedDotController_1.RedDotController.UnBindRedDot("MapAreaExplore");
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
