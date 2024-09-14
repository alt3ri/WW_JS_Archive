"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldMapSecondaryUiComponent = void 0);
const MapComponent_1 = require("../../Map/Base/MapComponent"),
  CustomMarkItem_1 = require("../../Map/Marks/MarkItem/CustomMarkItem"),
  FixedSceneGamePlayMarkItem_1 = require("../../Map/Marks/MarkItem/FixedSceneGamePlayMarkItem"),
  SceneGameplayMarkItem_1 = require("../../Map/Marks/MarkItem/SceneGameplayMarkItem"),
  TeleportMarkItem_1 = require("../../Map/Marks/MarkItem/TeleportMarkItem"),
  WorldMapDefine_1 = require("../WorldMapDefine"),
  WorldMapSecondaryUiDefine_1 = require("../WorldMapSecondaryUiDefine"),
  WorldMapSecondaryUi_1 = require("./WorldMapSecondaryUi");
class WorldMapSecondaryUiComponent extends MapComponent_1.MapComponent {
  constructor() {
    super(...arguments), (this.vFo = new Map());
  }
  get ComponentType() {
    return 1;
  }
  get ExtraSecondaryUiOpen() {
    return this.PropertyMap.tryGet(0, !1);
  }
  set ExtraSecondaryUiOpen(e) {
    this.PropertyMap.set(0, e);
  }
  QFa() {
    for (var [, e] of this.vFo)
      if (
        e instanceof WorldMapSecondaryUi_1.WorldMapSecondaryUi &&
        !e.IsUiCloseComplete
      )
        return !0;
    return !1;
  }
  get IsSecondaryUiOpening() {
    return this.ExtraSecondaryUiOpen || this.QFa();
  }
  get MKa() {
    var e = this.Parent;
    if (void 0 !== e) return e;
    this.LogError(64, "[地图系统]->二级界面组件没有附加到容器下！");
  }
  OnRemove() {
    if (this.vFo) {
      for (var [, e] of this.vFo) e.Destroy();
      this.vFo.clear();
    }
  }
  ShowPanel(e, r, a, i = 1) {
    e instanceof CustomMarkItem_1.CustomMarkItem
      ? this.EFo(WorldMapDefine_1.ESecondaryPanel.CustomMarkPanel, r, e, i, a)
      : (24 !== e.MarkType &&
            e instanceof SceneGameplayMarkItem_1.SceneGameplayMarkItem) ||
          e instanceof FixedSceneGamePlayMarkItem_1.FixedSceneGameplayMarkItem
        ? e.IsLordGym()
          ? this.EFo(WorldMapDefine_1.ESecondaryPanel.LordGymPanel, r, e)
          : this.EFo(WorldMapDefine_1.ESecondaryPanel.SceneGameplayPanel, r, e)
        : e instanceof TeleportMarkItem_1.TeleportMarkItem && !e.IsActivity
          ? e.IsDungeonEntrance
            ? e.IsTowerEntrance
              ? this.EFo(
                  WorldMapDefine_1.ESecondaryPanel.TowerEntrancePanel,
                  r,
                  e,
                )
              : e.IsRoguelike
                ? this.EFo(
                    WorldMapDefine_1.ESecondaryPanel.RoguelikePanel,
                    r,
                    e,
                  )
                : this.EFo(
                    WorldMapDefine_1.ESecondaryPanel
                      .InstanceDungeonEntrancePanel,
                    r,
                    e,
                  )
            : this.EFo(WorldMapDefine_1.ESecondaryPanel.TeleportPanel, r, e)
          : ((i =
              WorldMapSecondaryUiDefine_1.markPanelTypeMap.get(e.MarkType) ??
              WorldMapDefine_1.ESecondaryPanel.GeneralPanel),
            this.EFo(i, r, e));
  }
  ShowMarkMenu(e, r) {
    this.EFo(WorldMapDefine_1.ESecondaryPanel.MarkMenuPanel, e, r);
  }
  ShowQuickNavigate(e) {
    this.EFo(WorldMapDefine_1.ESecondaryPanel.QuickNavigatePanel, e);
  }
  async EFo(e, r, ...a) {
    var i = WorldMapDefine_1.ESecondaryPanel[e];
    let t = this.vFo.get(i);
    t ||
      ((e = WorldMapSecondaryUiDefine_1.worldMapSecondaryPanelCtorMap.get(e)),
      (t = new e()),
      this.vFo.set(i, t),
      await t.CreateThenShowByResourceIdAsync(t.GetResourceId(), r));
    (e = t), (i = this.MKa.Map);
    e.ShowPanel(i, ...a);
  }
  CloseUi(e, r = !0) {
    for (var [, a] of this.vFo)
      if (a instanceof WorldMapSecondaryUi_1.WorldMapSecondaryUi) {
        var i = a.GetRootItem();
        if (a.IsUiOpen && i) return void a.Close(e, r);
      }
  }
  GetSecondaryPanelGuideFocusUiItem(e) {
    return this.vFo
      .get(WorldMapDefine_1.ESecondaryPanel[e])
      .GetGuideFocusUiItem();
  }
}
exports.WorldMapSecondaryUiComponent = WorldMapSecondaryUiComponent;
//# sourceMappingURL=WorldMapSecondaryUiComponent.js.map
