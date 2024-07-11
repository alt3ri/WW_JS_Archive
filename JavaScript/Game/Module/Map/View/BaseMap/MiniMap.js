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
  MapMarkMgr_1 = require("./Assistant/MapMarkMgr"),
  MapTileMgr_1 = require("./Assistant/MapTileMgr");
class MiniMap extends UiPanelBase_1.UiPanelBase {
  constructor(t, e, i, s = 1, r) {
    super(),
      (this.MapType = 1),
      (this.CUi = void 0),
      (this.gUi = void 0),
      (this.fUi = void 0),
      (this.dUi = 1),
      (this.lRi = 1),
      (this.I_t = void 0),
      (this.MUi = () => {
        this.gUi.OnMapSetUp(),
          this.CUi.OnMapSetup(),
          this.RootItem.SetUIActive(!0);
      }),
      (this.MapType = t),
      (this.dUi = i),
      (this.lRi = s),
      (this.I_t = e),
      (this.fUi = r);
  }
  OnBeforeDestroy() {
    this.UnBindEvents(),
      this.CUi?.Dispose(),
      (this.CUi = void 0),
      this.gUi?.Dispose(),
      (this.gUi = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [2, UE.UITexture],
      [1, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UITexture],
      [5, UE.UIItem],
    ];
  }
  OnStart() {
    this.SetMapScale(this.dUi),
      this.FXt(this.lRi),
      this.uje(),
      this.RootItem.SetUIActive(!1),
      this.RootItem.SetHierarchyIndex(0);
  }
  FXt(t) {
    var e = this.GetItem(0),
      i = this.GetItem(1),
      s = this.GetTexture(2),
      r = this.GetItem(3),
      a = this.GetTexture(4),
      n = this.GetItem(5);
    (this.CUi = new MapMarkMgr_1.MapMarkMgr(this.MapType, e, this.I_t, t)),
      this.CUi.Initialize(),
      (this.gUi = new MapTileMgr_1.MapTileMgr(
        this.RootItem,
        i,
        s,
        r,
        a,
        this.MapType,
        this.fUi,
        n,
      )),
      this.gUi.Initialize();
  }
  uje() {
    ModelManager_1.ModelManager.GameModeModel.WorldDone
      ? this.MUi()
      : EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.WorldDone,
          this.MUi,
        );
  }
  UnBindEvents() {
    EventSystem_1.EventSystem.Has(
      EventDefine_1.EEventName.WorldDone,
      this.MUi,
    ) &&
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldDone,
        this.MUi,
      );
  }
  MiniMapUpdateMarkItems(a, n, t) {
    this.CUi.UpdateNearbyMarkItem(
      t,
      (e) => {
        e.LogicUpdate(t), (e.IsInAoiRange = !0), e.ViewUpdate(t);
        var i = e.UiPosition;
        if (i) {
          const s = Vector2D_1.Vector2D.Create(i.X, i.Y);
          if (e.IsTracked) {
            const r = Vector2D_1.Vector2D.Create();
            s.Multiply(n, r).Addition(a, r);
            let t = !1;
            e instanceof TaskMarkItem_1.TaskMarkItem &&
              ((i = e.View), (t = i.IsRangeImageActive() ?? !1)),
              r.Size() > BattleUiDefine_1.CLAMP_RANGE && !t
                ? (r
                    .DivisionEqual(r.Size())
                    .MultiplyEqual(BattleUiDefine_1.CLAMP_RANGE)
                    .SubtractionEqual(a)
                    .DivisionEqual(n),
                  e.GetRootItemAsync().then((t) => {
                    t?.SetAnchorOffset(r.ToUeVector2D(!0));
                  }))
                : e.GetRootItemAsync().then((t) => {
                    t?.SetAnchorOffset(s.ToUeVector2D(!0));
                  });
          } else
            e.GetRootItemAsync().then((t) => {
              t?.SetAnchorOffset(s.ToUeVector2D(!0));
            });
        }
      },
      (t) => {
        t.IsInAoiRange = !1;
      },
    );
  }
  UpdateMinimapTiles(t) {
    this.gUi.UpdateMinimapTiles(t);
  }
  SetMapScale(t) {
    this.RootItem.SetWorldScale3D(new UE.Vector(t, t, t));
  }
}
exports.MiniMap = MiniMap;
//# sourceMappingURL=MiniMap.js.map
