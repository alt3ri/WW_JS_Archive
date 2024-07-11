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
  constructor(t, e, i, s = 1, a) {
    super(),
      (this.MapType = 1),
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
      (this.MapType = t),
      (this.dAi = i),
      (this.lUi = s),
      (this.kut = e),
      (this.fAi = a);
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
  F$t(t) {
    var e = this.GetItem(0),
      i = this.GetItem(1);
    let s = this.GetTexture(2);
    var a = this.GetItem(3),
      n = this.GetTexture(4),
      r =
        (2 === MiniMap.MapMaterialVersion && (s = this.GetTexture(6)),
        this.GetItem(5));
    (this.CAi = new MapMarkMgr_1.MapMarkMgr(this.MapType, e, this.kut, t)),
      this.CAi.Initialize(),
      (this.gAi = new MapTileMgr_1.MapTileMgr(
        this.RootItem,
        i,
        s,
        a,
        n,
        this.MapType,
        MiniMap.MapMaterialVersion,
        this.fAi,
        r,
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
  MiniMapUpdateMarkItems(n, r, t) {
    this.CAi.UpdateNearbyMarkItem(
      t,
      (e) => {
        e.LogicUpdate(t), (e.IsInAoiRange = !0), e.ViewUpdate(t);
        var i = e.UiPosition;
        if (i) {
          const s = Vector2D_1.Vector2D.Create(i.X, i.Y);
          if (e.IsTracked) {
            const a = Vector2D_1.Vector2D.Create();
            s.Multiply(r, a).Addition(n, a);
            let t = !1;
            e instanceof TaskMarkItem_1.TaskMarkItem &&
              ((i = e.View), (t = i.IsRangeImageActive() ?? !1)),
              a.Size() > BattleUiDefine_1.CLAMP_RANGE && !t
                ? (a
                    .DivisionEqual(a.Size())
                    .MultiplyEqual(BattleUiDefine_1.CLAMP_RANGE)
                    .SubtractionEqual(n)
                    .DivisionEqual(r),
                  e.GetRootItemAsync().then((t) => {
                    t?.SetAnchorOffset(a.ToUeVector2D(!0));
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
    this.gAi.UpdateMinimapTiles(t);
  }
  SetMapScale(t) {
    this.RootItem.SetWorldScale3D(new UE.Vector(t, t, t));
  }
}
(exports.MiniMap = MiniMap).MapMaterialVersion = 2;
//# sourceMappingURL=MiniMap.js.map
