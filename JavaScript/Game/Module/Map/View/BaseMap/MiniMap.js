"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MiniMap = void 0);
const UE = require("ue"),
  Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  BattleUiDefine_1 = require("../../../BattleUi/BattleUiDefine"),
  TaskMarkItem_1 = require("../../Marks/MarkItem/TaskMarkItem"),
  TaskMarkItemView_1 = require("../../Marks/MarkItemView/TaskMarkItemView"),
  MapRangePanel_1 = require("../SubView/MapRangePanel"),
  MapMarkMgr_1 = require("./Assistant/MapMarkMgr"),
  MapSoundBoxSfxMgr_1 = require("./Assistant/MapSoundBoxSfxMgr"),
  MapTileMgr_1 = require("./Assistant/MapTileMgr");
class MiniMap extends UiPanelBase_1.UiPanelBase {
  constructor(e, t, i, s = 1, a) {
    super(),
      (this.MapType = 1),
      (this.Z3_ = 0),
      (this.e4_ = 0),
      (this.CAi = void 0),
      (this.gAi = void 0),
      (this.ODl = void 0),
      (this.fAi = void 0),
      (this.dAi = 1),
      (this.lUi = 1),
      (this.s0c = void 0),
      (this.MAi = () => {
        this.gAi.OnMapSetUp(),
          this.gAi.LoadMapBorder(),
          this.CAi.OnMapSetup(),
          this.RootItem.SetUIActive(!0);
      }),
      (this.MapType = e),
      (this.e4_ = t),
      (this.Z3_ =
        ModelManager_1.ModelManager.MapModel.GetDungeonMapConfigId(t)),
      (this.dAi = i),
      (this.lUi = s),
      (this.fAi = a);
  }
  get MapId() {
    return this.Z3_;
  }
  get InstanceDungeonId() {
    return this.e4_;
  }
  get MapGravity() {
    return ModelManager_1.ModelManager.MapModel.CurrentPlayerGravity;
  }
  OnBeforeDestroy() {
    this.UnBindEvents(),
      this.CAi?.Dispose(),
      (this.CAi = void 0),
      this.gAi?.Dispose(),
      (this.gAi = void 0),
      (this.ODl = void 0),
      this.s0c?.Destroy(),
      (this.s0c = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [2, UE.UITexture],
      [1, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UITexture],
      [5, UE.UIItem],
      [6, UE.UITexture],
    ];
  }
  OnStart() {
    this.SetMapScale(this.dAi),
      this.F$t(this.lUi),
      this.yWe(),
      this.RootItem.SetUIActive(!1),
      this.RootItem.SetHierarchyIndex(0),
      (this.s0c = new MapRangePanel_1.MapRangePanel(this)),
      this.s0c.CheckExploreMarkRangeInfo();
  }
  F$t(e) {
    var t = this.GetItem(0),
      i = this.GetItem(1);
    let s = this.GetTexture(2);
    var a = this.GetItem(3),
      n = this.GetTexture(4),
      r =
        (s.SetUIActive(!1),
        2 === MiniMap.MapMaterialVersion &&
          (s = this.GetTexture(6)).SetUIActive(!1),
        this.GetItem(5)),
      t = {
        MapType: this.MapType,
        MapId: this.MapId,
        InstanceDungeonId: this.InstanceDungeonId,
        MarkContainer: t,
        MarkScale: e,
      },
      e =
        ((this.CAi = new MapMarkMgr_1.MapMarkMgr(t)),
        this.CAi.Initialize(),
        {
          MapRootItem: this.RootItem,
          TileContainer: i,
          TileTexture: s,
          SubMapContainer: a,
          SubMapTexture: n,
          MapType: this.MapType,
          MapId: this.MapId,
          InstanceDungeonId: this.InstanceDungeonId,
          MapVersion: MiniMap.MapMaterialVersion,
          PreloadTiles: this.fAi,
          SubMapMask: r,
        });
    (this.gAi = new MapTileMgr_1.MapTileMgr(e)),
      this.gAi.Initialize(),
      (this.ODl = new MapSoundBoxSfxMgr_1.MapSoundBoxSfxMgr());
  }
  yWe() {
    ModelManager_1.ModelManager.GameModeModel.WorldDone
      ? this.MAi()
      : EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.WorldDone,
          this.MAi,
        );
  }
  UnBindEvents() {
    EventSystem_1.EventSystem.Has(
      EventDefine_1.EEventName.WorldDone,
      this.MAi,
    ) &&
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldDone,
        this.MAi,
      );
  }
  MiniMapUpdateMarkItems(a, n, r) {
    this.CAi.UpdateNearbyMarkItem(
      r,
      (t) => {
        t.LogicUpdate(r),
          (t.IsInAoiRange = !0),
          t.ViewUpdateAsync(r),
          this.ODl.OnMarkItemBecomeVisible(t, r);
        var e = t.UiPosition;
        if (e) {
          const i = Vector2D_1.Vector2D.Create(e.X, e.Y);
          if (t.CanOutOfBound) {
            const s = Vector2D_1.Vector2D.Create();
            i.Multiply(n, s).Addition(a, s);
            let e = !1;
            t instanceof TaskMarkItem_1.TaskMarkItem &&
              t.View instanceof TaskMarkItemView_1.TaskMarkItemView &&
              (e = t.View.IsRangeImageActive() ?? !1),
              s.Size() > BattleUiDefine_1.CLAMP_RANGE && !e
                ? (s
                    .DivisionEqual(s.Size())
                    .MultiplyEqual(BattleUiDefine_1.CLAMP_RANGE)
                    .SubtractionEqual(a)
                    .DivisionEqual(n),
                  t.GetRootItemAsync().then((e) => {
                    e?.IsValid() && e.SetAnchorOffset(s.ToUeVector2D(!0));
                  }))
                : t.GetRootItemAsync().then((e) => {
                    e?.IsValid() && e.SetAnchorOffset(i.ToUeVector2D(!0));
                  });
          } else
            t.GetRootItemAsync().then((e) => {
              e?.IsValid() && e.SetAnchorOffset(i.ToUeVector2D(!0));
            });
        }
      },
      (e) => {
        (e.IsInAoiRange = !1),
          e.LogicUpdate(r),
          e.ViewUpdateAsync(r),
          this.ODl.OnMarkItemBecomeInvisible(e);
      },
    ),
      this.s0c.MiniMapUpdate();
  }
  Tick() {
    this.CAi?.Tick();
  }
  UpdateMinimapTiles(e) {
    this.gAi.UpdateMinimapTiles(e);
  }
  SetMapScale(e) {
    this.RootItem.D_SetWorldScale3D(new UE.VectorDouble(e, e, e));
  }
  GetMarkItem(e, t) {
    return this.CAi.GetMarkItem(e, t);
  }
}
(exports.MiniMap = MiniMap).MapMaterialVersion = 2;
//# sourceMappingURL=MiniMap.js.map
