"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BaseMap = void 0);
const UE = require("ue");
const Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const GeneralLogicTreeUtil_1 = require("../../../GeneralLogicTree/GeneralLogicTreeUtil");
const MapMarkMgr_1 = require("./Assistant/MapMarkMgr");
const MapTileMgr_1 = require("./Assistant/MapTileMgr");
class BaseMap extends UiPanelBase_1.UiPanelBase {
  constructor(e, t, i, s = 1, r = 100, h) {
    super(),
      (this.SelfPlayerNode = void 0),
      (this.PlayerArrow = void 0),
      (this.PlayerOutOfBoundIndicator = void 0),
      (this.MapType = 2),
      (this.dUi = 1),
      (this.lRi = 1),
      (this.CUi = void 0),
      (this.gUi = void 0),
      (this.fUi = void 0),
      (this.I_t = void 0),
      (this.pUi = 100),
      (this.vUi = void 0),
      (this.MUi = () => {
        this.gUi.OnMapSetUp(),
          this.CUi.OnMapSetup(),
          this.RootItem.SetUIActive(!0);
      }),
      (this.fUi = h),
      (this.dUi = t),
      (this.lRi = s),
      (this.MapType = e),
      (this.I_t = i),
      (this.pUi = r);
  }
  get MapRootItem() {
    return this.RootItem;
  }
  OnBeforeDestroy() {
    this.UnBindEvents(),
      this.CUi.Dispose(),
      (this.CUi = void 0),
      this.gUi.Dispose(),
      (this.gUi = void 0);
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
    ];
  }
  OnStart() {
    this.SetMapScale(this.dUi),
      this.FXt(this.lRi),
      this.uje(),
      this.RootItem.SetUIActive(!1),
      this.MapType === 2 && this.MUi(),
      (this.SelfPlayerNode = this.GetItem(0)),
      (this.PlayerOutOfBoundIndicator = this.GetItem(2)),
      (this.PlayerArrow = this.GetItem(1)),
      this.RootItem.SetHierarchyIndex(0);
    const e = this.GetItem(6);
    e.SetWidth(2 * this.pUi),
      e.SetHeight(2 * this.pUi),
      e.SetUIActive(!1),
      (this.vUi = new LevelSequencePlayer_1.LevelSequencePlayer(e));
  }
  FXt(e) {
    const t = this.GetItem(3);
    const i = this.GetItem(4);
    const s = this.GetTexture(5);
    const r = this.GetItem(7);
    const h = this.GetTexture(8);
    (this.CUi = new MapMarkMgr_1.MapMarkMgr(this.MapType, t, this.I_t, e)),
      this.CUi.Initialize(),
      (this.gUi = new MapTileMgr_1.MapTileMgr(
        this.RootItem,
        i,
        s,
        r,
        h,
        this.MapType,
        this.fUi,
      )),
      this.gUi.Initialize();
  }
  get MarkContainer() {
    return this.GetItem(3);
  }
  uje() {
    this.MapType !== 2 &&
      (ModelManager_1.ModelManager.GameModeModel.WorldDone
        ? this.MUi()
        : EventSystem_1.EventSystem.Add(
            EventDefine_1.EEventName.WorldDone,
            this.MUi,
          ));
  }
  UnBindEvents() {
    this.MapType !== 2 &&
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.WorldDone,
        this.MUi,
      ) &&
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldDone,
        this.MUi,
      );
  }
  GetAllMarkItems() {
    return this.CUi.GetAllMarkItems();
  }
  GetMarkItemsByType(e) {
    return this.CUi.GetMarkItemsByType(e);
  }
  GetMarkItemsByClickPosition(e) {
    return this.CUi.GetMarkItemsByClickPosition(e);
  }
  GetMarkItem(e, t) {
    return this.CUi.GetMarkItem(e, t);
  }
  CreateCustomMark(e) {
    return this.CUi.CreateDynamicMark(e);
  }
  get MapOffset() {
    return this.gUi.MapOffset;
  }
  get FakeOffset() {
    return this.gUi.FakeOffset;
  }
  ShowSubMapTile(e, t) {
    this.gUi.ShowSubMapByPosition(e, t);
  }
  HideSubMapTile() {
    this.gUi.HideSubMap();
  }
  GetSubMapGroupIdByPosition() {
    return this.gUi.GetSubMapGroupByRootItemPosition();
  }
  SetMapScale(e) {
    this.RootItem.SetUIRelativeScale3D(new UE.Vector(e, e, e));
  }
  HandleAreaOpen(e) {
    this.gUi.HandleAreaOpen(e);
  }
  HandleMapTileDelegate() {
    this.gUi.HandleDelegate();
  }
  UnBindMapTileDelegate() {
    this.gUi.UnBindDelegate();
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
    const i = this.GetItem(6);
    i.SetUIActive(e),
      i.SetWorldScale3D(new UE.Vector(1, 1, 1)),
      e &&
        (i?.SetAnchorOffset(t.ToUeVector2D(!0)),
        this.vUi?.PlayLevelSequenceByName("Start"));
  }
}
exports.BaseMap = BaseMap;
// # sourceMappingURL=Map.js.map
