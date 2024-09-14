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
  MapMarkMgr_1 = require("./Assistant/MapMarkMgr"),
  MapTileMgr_1 = require("./Assistant/MapTileMgr");
class MiniMap extends UiPanelBase_1.UiPanelBase {
  constructor(e, t, i, s, a = 1, r) {
    super(),
      (this.MapType = 1),
      (this.MapId = 0),
      (this.CAi = void 0),
      (this.gAi = void 0),
      (this.fAi = void 0),
      (this.dAi = 1),
      (this.lUi = 1),
      (this.kut = void 0),
      (this.MAi = () => {
        this.gAi.OnMapSetUp(),
          this.CAi.OnMapSetup(),
          this.RootItem.SetUIActive(!0);
      }),
      (this.MapType = e),
      (this.MapId = t),
      (this.dAi = s),
      (this.lUi = a),
      (this.kut = i),
      (this.fAi = r);
  }
  OnBeforeDestroy() {
    this.UnBindEvents(),
      this.CAi?.Dispose(),
      (this.CAi = void 0),
      this.gAi?.Dispose(),
      (this.gAi = void 0);
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
      this.RootItem.SetHierarchyIndex(0);
  }
  F$t(e) {
    var t = this.GetItem(0),
      i = this.GetItem(1);
    let s = this.GetTexture(2);
    var a = this.GetItem(3),
      r = this.GetTexture(4),
      n =
        (2 === MiniMap.MapMaterialVersion && (s = this.GetTexture(6)),
        this.GetItem(5));
    (this.CAi = new MapMarkMgr_1.MapMarkMgr(
      this.MapType,
      this.MapId,
      t,
      this.kut,
      e,
    )),
      this.CAi.Initialize(),
      (this.gAi = new MapTileMgr_1.MapTileMgr(
        this.RootItem,
        i,
        s,
        a,
        r,
        this.MapType,
        this.MapId,
        MiniMap.MapMaterialVersion,
        this.fAi,
        n,
      )),
      this.gAi.Initialize();
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
  MiniMapUpdateMarkItems(a, r, n) {
    this.CAi.UpdateNearbyMarkItem(
      n,
      (t) => {
        t.LogicUpdate(n), (t.IsInAoiRange = !0), t.ViewUpdate(n);
        var e = t.UiPosition;
        if (e) {
          const i = Vector2D_1.Vector2D.Create(e.X, e.Y);
          if (t.IsTracked) {
            const s = Vector2D_1.Vector2D.Create();
            i.Multiply(r, s).Addition(a, s);
            let e = !1;
            t instanceof TaskMarkItem_1.TaskMarkItem &&
              t.View instanceof TaskMarkItemView_1.TaskMarkItemView &&
              (e = t.View.IsRangeImageActive() ?? !1),
              s.Size() > BattleUiDefine_1.CLAMP_RANGE && !e
                ? (s
                    .DivisionEqual(s.Size())
                    .MultiplyEqual(BattleUiDefine_1.CLAMP_RANGE)
                    .SubtractionEqual(a)
                    .DivisionEqual(r),
                  t.GetRootItemAsync().then((e) => {
                    e?.SetAnchorOffset(s.ToUeVector2D(!0));
                  }))
                : t.GetRootItemAsync().then((e) => {
                    e?.SetAnchorOffset(i.ToUeVector2D(!0));
                  });
          } else
            t.GetRootItemAsync().then((e) => {
              e?.SetAnchorOffset(i.ToUeVector2D(!0));
            });
        }
      },
      (e) => {
        e.IsInAoiRange = !1;
      },
    );
  }
  UpdateMinimapTiles(e) {
    this.gAi.UpdateMinimapTiles(e);
  }
  SetMapScale(e) {
    this.RootItem.SetWorldScale3D(new UE.Vector(e, e, e));
  }
}
(exports.MiniMap = MiniMap).MapMaterialVersion = 1;
//# sourceMappingURL=MiniMap.js.map
