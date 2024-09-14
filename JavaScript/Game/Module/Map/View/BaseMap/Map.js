"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BaseMap = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  GeneralLogicTreeUtil_1 = require("../../../GeneralLogicTree/GeneralLogicTreeUtil"),
  MapMarkMgr_1 = require("./Assistant/MapMarkMgr"),
  MapTileMgr_1 = require("./Assistant/MapTileMgr");
class BaseMap extends UiPanelBase_1.UiPanelBase {
  constructor(e, t, i, s, r = 1, h = 100, a) {
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
      (this._Ui = void 0),
      (this.MAi = () => {
        this.gAi.OnMapSetUp(),
          this.CAi.OnMapSetup(),
          this.RootItem.SetUIActive(!0);
      }),
      (this._Ui = e),
      (this.MapType = t),
      (this.dAi = i),
      (this.kut = s),
      (this.lUi = r),
      (this.pAi = h),
      (this.fAi = a);
  }
  get MapRootItem() {
    return this.RootItem;
  }
  OnBeforeDestroy() {
    this.UnBindEvents(),
      this.CAi.Dispose(),
      (this.CAi = void 0),
      this.gAi.Dispose(),
      (this.gAi = void 0);
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
    ];
  }
  OnStart() {
    this.SetMapScale(this.dAi),
      this.F$t(this.lUi),
      this.yWe(),
      this.RootItem.SetUIActive(!1),
      2 === this.MapType && this.MAi(),
      (this.SelfPlayerNode = this.GetItem(0)),
      (this.PlayerOutOfBoundIndicator = this.GetItem(2)),
      (this.PlayerArrow = this.GetItem(1)),
      this.RootItem.SetHierarchyIndex(0);
    var e = this.GetItem(6);
    e.SetWidth(2 * this.pAi),
      e.SetHeight(2 * this.pAi),
      e.SetUIActive(!1),
      (this.vAi = new LevelSequencePlayer_1.LevelSequencePlayer(e));
  }
  F$t(e) {
    var t = this.GetItem(3),
      i = this.GetItem(4);
    let s = this.GetTexture(5);
    2 === BaseMap.MapMaterialVersion && (s = this.GetTexture(9));
    var r = this.GetItem(7),
      h = this.GetTexture(8);
    (this.CAi = new MapMarkMgr_1.MapMarkMgr(
      this.MapType,
      this._Ui,
      t,
      this.kut,
      e,
    )),
      this.CAi.Initialize(),
      (this.gAi = new MapTileMgr_1.MapTileMgr(
        this.RootItem,
        i,
        s,
        r,
        h,
        this.MapType,
        this._Ui,
        BaseMap.MapMaterialVersion,
        this.fAi,
      )),
      this.gAi.Initialize();
  }
  get MarkContainer() {
    return this.GetItem(3);
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
  GetAllMarkItems() {
    return this.CAi.GetAllMarkItems();
  }
  GetMarkItemsByType(e) {
    return this.CAi.GetMarkItemsByType(e);
  }
  GetMarkItemsByClickPosition(e) {
    return this.CAi.GetMarkItemsByClickPosition(e);
  }
  GetMarkItem(e, t) {
    return this.CAi.GetMarkItem(e, t);
  }
  CreateCustomMark(e) {
    return this.CAi.CreateDynamicMark(e);
  }
  FindNearbyMarkItems(e, t) {
    return this.CAi.FindNearbyMarkItems(e, t);
  }
  get MapOffset() {
    return this.gAi.MapOffset;
  }
  get FakeOffset() {
    return this.gAi.FakeOffset;
  }
  ShowSubMapTile(e, t, i) {
    this.gAi.ShowSubMapByPosition(e, t, i);
  }
  HideSubMapTile() {
    this.gAi.HideSubMap();
  }
  GetSubMapGroupIdByPosition() {
    return this.gAi.GetSubMapGroupByRootItemPosition();
  }
  SetMapScale(e) {
    this.RootItem.SetUIRelativeScale3D(new UE.Vector(e, e, e));
  }
  HandleAreaOpen(e) {
    this.gAi.HandleAreaOpen(e);
  }
  HandleMapTileDelegate() {
    this.gAi.HandleDelegate();
  }
  UnBindMapTileDelegate() {
    this.gAi.UnBindDelegate();
  }
  HandleSceneGamePlayMarkItemOpen(e, t, i) {
    e = this.GetMarkItemsByType(e);
    e &&
      e.forEach((e) => {
        e &&
          e.MarkConfig &&
          e.MarkConfig.RelativeSubType === i &&
          ((e.IsCanShowView = !0),
          e
            .ViewUpdateAsync(
              GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation(),
            )
            .then(
              () => {
                e.View?.PlayUnlockSequence();
              },
              void 0,
            ));
      });
  }
  SetClickRangeVisible(e, t = Vector2D_1.Vector2D.Create(0, 0)) {
    this._1a(e, t);
  }
  async _1a(e, t) {
    var i;
    return (
      this.C1a !== e &&
        ((i = this.GetItem(6)),
        (this.C1a = e),
        this.C1a
          ? (i.SetUIActive(this.C1a),
            i.SetWorldScale3D(new UE.Vector(1, 1, 1)),
            i?.SetAnchorOffset(t.ToUeVector2D(!0)),
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
  InValidMapTile(e) {
    return this.gAi.InValidTile(e);
  }
  SyncTransformToFrontContainer() {
    var e = this.GetRootItem(),
      t = e.GetAnchorOffset(),
      t = (this.kut.SetAnchorOffset(t), e.RelativeScale3D);
    this.kut.SetRelativeScale3D(t),
      this.kut.SetWidth(e.Width),
      this.kut.SetHeight(e.Height);
  }
}
(exports.BaseMap = BaseMap).MapMaterialVersion = 1;
//# sourceMappingURL=Map.js.map
