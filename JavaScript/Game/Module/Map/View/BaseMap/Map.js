"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BaseMap = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiAsyncTask_1 = require("../../../../Ui/Base/UiAsyncTask"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  GeneralLogicTreeUtil_1 = require("../../../GeneralLogicTree/GeneralLogicTreeUtil"),
  MarkGravityReverseIconComponent_1 = require("../../Marks/MarkItemView/Components/MarkGravityReverseIconComponent"),
  MapLogger_1 = require("../../Misc/MapLogger"),
  MapRangePanel_1 = require("../SubView/MapRangePanel"),
  MapMarkMgr_1 = require("./Assistant/MapMarkMgr"),
  MapTileMgr_1 = require("./Assistant/MapTileMgr");
class BaseMap extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.SelfPlayerNode = void 0),
      (this.PlayerArrow = void 0),
      (this.PlayerOutOfBoundIndicator = void 0),
      (this.MapType = 2),
      (this.dAi = 1),
      (this.lUi = 1),
      (this.CAi = void 0),
      (this.gAi = void 0),
      (this.fAi = void 0),
      (this.kut = void 0),
      (this.pAi = 100),
      (this.vAi = void 0),
      (this.C1a = !1),
      (this.Z3_ = 0),
      (this.e4_ = 0),
      (this.n0c = void 0),
      (this.NGc = void 0),
      (this.CUc = void 0),
      (this.MAi = () => {
        this.gAi.OnMapSetUp(),
          this.gAi.LoadMapBorder(),
          this.CAi.OnMapSetup(),
          this.RootItem.SetUIActive(!0);
      }),
      (this.l5l = void 0),
      (this._5l = void 0),
      (this.c5l = 0),
      (this.u5l = 0),
      (this.e4_ = t.InstanceId),
      (this.Z3_ =
        ModelManager_1.ModelManager.MapModel.GetDungeonWorldMapConfigId(
          t.InstanceId,
        )),
      (this.MapType = t.MapType),
      (this.dAi = t.MapDefaultScale),
      (this.kut = t.FrontMarkContainer),
      (this.lUi = t.MarkScale ?? 1),
      (this.pAi = t.ClickRange ?? 100),
      (this.fAi = t.PreloadTiles),
      (this.NGc = t.Gravity ?? 1);
  }
  get MapId() {
    return this.Z3_;
  }
  get InstanceDungeonId() {
    return this.e4_;
  }
  get MapRangePanel() {
    return this.n0c;
  }
  get MapRootItem() {
    return this.RootItem;
  }
  get MapGravity() {
    return this.NGc;
  }
  Tick() {
    this.CAi?.Tick();
  }
  async ChangeMapAsync(t, e) {
    var i;
    this.MapId !== t || this.NGc !== e
      ? ((i =
          ModelManager_1.ModelManager.MapModel.GetInstanceIdByWorldMapId(t)),
        (this.e4_ = i),
        (this.Z3_ =
          ModelManager_1.ModelManager.MapModel.GetDungeonWorldMapConfigId(i)),
        (this.NGc = e),
        (i = new UiAsyncTask_1.UiAsyncTask("Map.ChangeMapAsync", async () => {
          this.WaitToDestroy ||
            (this.n0c?.Destroy(),
            (this.n0c = new MapRangePanel_1.MapRangePanel(this)),
            await this.gAi.OnChangeTilesAsync(this.Z3_, this.e4_, this.NGc),
            this.MapRangePanel.CheckExploreMarkRangeInfo(),
            this.CAi.OnChangeWorldMap(this.Z3_, this.e4_, this.NGc));
        })),
        await this.RunAsyncTask(i))
      : MapLogger_1.MapLogger.Debug(
          63,
          "地图系统->切换地图失败， 地图参数没有发生变化",
          ["InstanceDungeonIdInner", this.e4_],
          ["instanceId", t],
          ["MapIdInner", this.Z3_],
          ["MapGravity", this.NGc],
          ["gravity", e],
        );
  }
  OnBeforeDestroy() {
    this.UnBindEvents(),
      this.CUc?.RecycleToPool(),
      (this.CUc = void 0),
      this.CAi.Dispose(),
      (this.CAi = void 0),
      this.gAi.Dispose(),
      (this.gAi = void 0),
      this.n0c?.Destroy(),
      (this.n0c = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UITexture],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UITexture],
      [9, UE.UITexture],
      [10, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    (this.SelfPlayerNode = this.GetItem(0)),
      2 === this.MapType &&
        ((this.CUc =
          new MarkGravityReverseIconComponent_1.MarkGravityReverseIconComponent()),
        await this.CUc.CreateByPoolResourceIdAsync(
          "UiItem_MarkReverse",
          this.SelfPlayerNode,
        )),
      this.SetMapScale(this.dAi),
      this.F$t(this.lUi),
      this.yWe(),
      this.RootItem.SetUIActive(!1),
      2 === this.MapType && (await this.EOc());
  }
  OnStart() {
    (this.PlayerOutOfBoundIndicator = this.GetItem(2)),
      (this.PlayerArrow = this.GetItem(1)),
      this.RootItem.SetHierarchyIndex(0);
    var t = this.GetItem(6);
    t.SetWidth(2 * this.pAi),
      t.SetHeight(2 * this.pAi),
      t.SetUIActive(!1),
      (this.vAi = new LevelSequencePlayer_1.LevelSequencePlayer(t)),
      (this.n0c = new MapRangePanel_1.MapRangePanel(this)),
      this.n0c.CheckExploreMarkRangeInfo();
  }
  F$t(t) {
    var e = this.GetItem(3),
      i = this.GetItem(4);
    let s = this.GetTexture(5);
    2 === BaseMap.MapMaterialVersion && (s = this.GetTexture(9));
    var a = this.GetItem(7),
      r = this.GetTexture(8),
      e = {
        MapType: this.MapType,
        MapId: this.MapId,
        InstanceDungeonId: this.InstanceDungeonId,
        MarkContainer: e,
        MarkScale: t,
        Gravity: this.NGc,
      },
      t =
        ((this.CAi = new MapMarkMgr_1.MapMarkMgr(e)),
        this.CAi.Initialize(),
        this.GetItem(10)),
      e = {
        MapRootItem: this.RootItem,
        TileContainer: i,
        TileTexture: s,
        SubMapContainer: a,
        SubMapTexture: r,
        MapType: this.MapType,
        MapId: this.MapId,
        InstanceDungeonId: this.InstanceDungeonId,
        MapVersion: BaseMap.MapMaterialVersion,
        PreloadTiles: this.fAi,
        FogUnlockItem: t,
        Gravity: this.NGc,
      };
    (this.gAi = new MapTileMgr_1.MapTileMgr(e)), this.gAi.Initialize();
  }
  get MarkContainer() {
    return this.GetItem(3);
  }
  get FogUnlockAnchorItem() {
    return this.GetItem(10);
  }
  yWe() {
    2 !== this.MapType &&
      (ModelManager_1.ModelManager.GameModeModel.WorldDone
        ? this.MAi()
        : EventSystem_1.EventSystem.Add(
            EventDefine_1.EEventName.WorldDone,
            this.MAi,
          ));
  }
  UnBindEvents() {
    2 !== this.MapType &&
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.WorldDone,
        this.MAi,
      ) &&
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldDone,
        this.MAi,
      );
  }
  async EOc() {
    this.gAi.OnMapSetUp(),
      await this.gAi.LoadMapBorder(),
      this.CAi.OnMapSetup(),
      this.RootItem.SetUIActive(!0);
  }
  GetAllMarkItems() {
    return this.CAi.GetAllMarkItems();
  }
  GetMarkItemsByType(t, e = !0) {
    return this.CAi.GetMarkItemsByType(t, e);
  }
  GetMarkItemsByClickPosition(t) {
    return this.CAi.GetMarkItemsByClickPosition(t);
  }
  GetMarkItem(t, e) {
    return this.CAi.GetMarkItem(t, e);
  }
  CreateCustomMark(t) {
    return this.CAi.CreateDynamicMark(t);
  }
  FindNearbyMarkItems(t, e, i) {
    return this.CAi.FindNearbyMarkItems(t, e, i);
  }
  GetTrackMenuMarkList() {
    return this.CAi.GetTrackMenuMarkList();
  }
  GetNavigateMarkList() {
    return this.CAi.GetNavigateMarkList();
  }
  get MapOffset() {
    return this.gAi.MapOffset;
  }
  get FakeOffset() {
    return this.gAi.FakeOffset;
  }
  ShowSubMapTile(t, e, i) {
    this.gAi.ShowSubMapByPosition(t, e, i);
  }
  HideSubMapTile() {
    this.gAi.HideSubMap();
  }
  GetAllMapTileItems() {
    return this.gAi.GetMapTileItems();
  }
  GetWorldMapCenterAreaId() {
    return this.gAi.GetWorldMapCenterAreaId();
  }
  GetSubMapGroupIdByPosition() {
    return this.gAi.GetSubMapGroupByRootItemPosition();
  }
  SetMapScale(t) {
    this.RootItem.SetUIRelativeScale3D(new UE.Vector(t, t, t));
  }
  HandleFogAreaOpen(t) {
    this.gAi.HandleFogAreaOpen(t);
  }
  HandleMapTileDelegate() {
    this.gAi.HandleDelegate();
  }
  UnBindMapTileDelegate() {
    this.gAi.UnBindDelegate();
  }
  HandleSceneGamePlayMarkItemOpen(t, e, i) {
    t = this.GetMarkItemsByType(t);
    t &&
      t.forEach((t) => {
        t &&
          t.MarkConfig &&
          t.MarkConfig.RelativeSubType === i &&
          ((t.IsCanShowView = !0),
          t
            .ViewUpdateAsync(
              GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation(),
            )
            .then(
              () => {
                t.View?.PlayUnlockSequence();
              },
              void 0,
            ));
      });
  }
  SetClickRangeVisible(t, e = Vector2D_1.Vector2D.Create(0, 0)) {
    this._1a(t, e);
  }
  async _1a(t, e) {
    var i;
    return (
      this.C1a !== t &&
        ((i = this.GetItem(6)),
        (this.C1a = t),
        this.C1a
          ? (i.SetUIActive(this.C1a),
            i.D_SetWorldScale3D(new UE.VectorDouble(1, 1, 1)),
            i?.SetAnchorOffset(e.ToUeVector2D(!0)),
            await this.vAi?.PlaySequenceAsync(
              "Start",
              new CustomPromise_1.CustomPromise(),
            ))
          : (await this.vAi?.PlaySequenceAsync(
              "Close",
              new CustomPromise_1.CustomPromise(),
            ),
            i?.SetUIActive(this.C1a))),
      !0
    );
  }
  InValidMapTile(t) {
    return this.gAi.InValidTile(t);
  }
  SyncTransformToFrontContainer() {
    var t = this.GetRootItem(),
      e = t.GetAnchorOffset(),
      e =
        (this.l5l !== e && ((this.l5l = e), this.kut.SetAnchorOffset(e)),
        t.RelativeScale3D),
      e =
        (this._5l !== e &&
          ((this._5l = e),
          this.kut.D_SetRelativeScale3D(new UE.VectorDouble(e))),
        t.Width),
      t = t.Height,
      i = this.c5l !== e,
      s = this.u5l !== t;
    i && ((this.c5l = e), this.kut.SetWidth(e)),
      s && ((this.u5l = t), this.kut.SetHeight(t));
  }
  SetPlayerGravityActive(t, e) {
    e && (this.CUc.Gravity = e), this.CUc.SetActive(t);
  }
}
(exports.BaseMap = BaseMap).MapMaterialVersion = 2;
//# sourceMappingURL=Map.js.map
