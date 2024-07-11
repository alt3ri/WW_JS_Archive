"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SecondaryUiComponent = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  CustomMarkItem_1 = require("../../Map/Marks/MarkItem/CustomMarkItem"),
  DynamicEntityMarkItem_1 = require("../../Map/Marks/MarkItem/DynamicEntityMarkItem"),
  EntityMarkItem_1 = require("../../Map/Marks/MarkItem/EntityMarkItem"),
  FixedSceneGamePlayMarkItem_1 = require("../../Map/Marks/MarkItem/FixedSceneGamePlayMarkItem"),
  MingSuNpcMarkItem_1 = require("../../Map/Marks/MarkItem/MingSuNpcMarkItem"),
  ParkourMarkItem_1 = require("../../Map/Marks/MarkItem/ParkourMarkItem"),
  SceneGameplayMarkItem_1 = require("../../Map/Marks/MarkItem/SceneGameplayMarkItem"),
  SoundBoxMarkItem_1 = require("../../Map/Marks/MarkItem/SoundBoxMarkItem"),
  TaskMarkItem_1 = require("../../Map/Marks/MarkItem/TaskMarkItem"),
  TeleportMarkItem_1 = require("../../Map/Marks/MarkItem/TeleportMarkItem"),
  TemporaryTeleportMarkItem_1 = require("../../Map/Marks/MarkItem/TemporaryTeleportMarkItem"),
  TreasureBoxDetectorMarkItem_1 = require("../../Map/Marks/MarkItem/TreasureBoxDetectorMarkItem"),
  TreasureBoxMarkItem_1 = require("../../Map/Marks/MarkItem/TreasureBoxMarkItem"),
  ParkourEntrancePanel_1 = require("../SubViews/ActivityPanel/ParkourEntrancePanel"),
  BoxPanel_1 = require("../SubViews/BoxPanel/BoxPanel"),
  CustomMarkPanel_1 = require("../SubViews/CustomMarkPanel/CustomMarkPanel"),
  DetectorPanel_1 = require("../SubViews/DectetorPanel/DetectorPanel"),
  GeneralPanel_1 = require("../SubViews/GeneralPanel/GeneralPanel"),
  InstanceDungeonEntrancePanel_1 = require("../SubViews/InstanceDungeonEntrancePanel/InstanceDungeonEntrancePanel"),
  RoguelikeEntrancePanel_1 = require("../SubViews/InstanceDungeonEntrancePanel/RoguelikeEntrancePanel"),
  TowerEntrancePanel_1 = require("../SubViews/InstanceDungeonEntrancePanel/TowerEntrancePanel"),
  LordGymPanel_1 = require("../SubViews/LordGymPanel/LordGymPanel"),
  MarkMenu_1 = require("../SubViews/MarkMenu/MarkMenu"),
  QuestPanel_1 = require("../SubViews/QuestPanel/QuestPanel"),
  SceneGameplayPanel_1 = require("../SubViews/SceneGameplayPanel/SceneGameplayPanel"),
  TeleportPanel_1 = require("../SubViews/TeleportPanel/TeleportPanel"),
  TemporaryTeleportPanel_1 = require("../SubViews/TemporaryTeleportPanel/TemporaryTeleportPanel"),
  WorldMapDefine_1 = require("../WorldMapDefine"),
  WorldMapComponentBase_1 = require("./WorldMapComponentBase"),
  WorldMapSecondaryUi_1 = require("./WorldMapSecondaryUi");
class SecondaryUiComponent extends WorldMapComponentBase_1.WorldMapComponentBase {
  constructor(e) {
    super(e),
      (this.S2o = !1),
      (this.E2o = void 0),
      (this.y2o = () => {
        this.OnUiClose();
      }),
      (this.S2o = !1),
      (this.E2o = new Map());
  }
  get IsSecondaryUiOpening() {
    return this.S2o;
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.WorldMapSecondaryUiClosed,
      this.y2o,
    );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.WorldMapSecondaryUiClosed,
      this.y2o,
    );
  }
  OnDestroy() {
    if ((super.OnDestroy(), this.E2o)) {
      for (var [, e] of this.E2o) e.Destroy();
      this.E2o.clear(), (this.E2o = void 0);
    }
  }
  ShowPanel(e, r, a, n = 1) {
    e instanceof CustomMarkItem_1.CustomMarkItem
      ? this.I2o(
          WorldMapDefine_1.ESecondaryPanel.CustomMarkPanel,
          CustomMarkPanel_1.CustomMarkPanel,
          r,
          e,
          n,
          a,
        )
      : e instanceof TaskMarkItem_1.TaskMarkItem
        ? this.I2o(
            WorldMapDefine_1.ESecondaryPanel.QuestPanel,
            QuestPanel_1.QuestPanel,
            r,
            e,
          )
        : e instanceof TeleportMarkItem_1.TeleportMarkItem && !e.IsActivity
          ? e.IsDungeonEntrance
            ? e.IsTowerEntrance
              ? this.I2o(
                  WorldMapDefine_1.ESecondaryPanel.TowerEntrancePanel,
                  TowerEntrancePanel_1.TowerEntrancePanel,
                  r,
                  e,
                )
              : e.IsRoguelike
                ? this.I2o(
                    WorldMapDefine_1.ESecondaryPanel.RoguelikePanel,
                    RoguelikeEntrancePanel_1.RoguelikeEntrancePanel,
                    r,
                    e,
                  )
                : this.I2o(
                    WorldMapDefine_1.ESecondaryPanel
                      .InstanceDungeonEntrancePanel,
                    InstanceDungeonEntrancePanel_1.InstanceDungeonEntrancePanel,
                    r,
                    e,
                  )
            : this.I2o(
                WorldMapDefine_1.ESecondaryPanel.TeleportPanel,
                TeleportPanel_1.TeleportPanel,
                r,
                e,
              )
          : e instanceof MingSuNpcMarkItem_1.MingSuNpcMarkItem ||
              e instanceof EntityMarkItem_1.EntityMarkItem ||
              e instanceof DynamicEntityMarkItem_1.DynamicEntityMarkItem
            ? this.I2o(
                WorldMapDefine_1.ESecondaryPanel.GeneralPanel,
                GeneralPanel_1.GeneralPanel,
                r,
                e,
              )
            : e instanceof ParkourMarkItem_1.ParkourMarkItem
              ? this.I2o(
                  WorldMapDefine_1.ESecondaryPanel.ParkourPanel,
                  ParkourEntrancePanel_1.ParkourEntrancePanel,
                  r,
                  e,
                )
              : e instanceof SceneGameplayMarkItem_1.SceneGameplayMarkItem ||
                  e instanceof
                    FixedSceneGamePlayMarkItem_1.FixedSceneGameplayMarkItem
                ? e.IsLordGym()
                  ? this.I2o(
                      WorldMapDefine_1.ESecondaryPanel.LordGymPanel,
                      LordGymPanel_1.LordGymPanel,
                      r,
                      e,
                    )
                  : this.I2o(
                      WorldMapDefine_1.ESecondaryPanel.SceneGameplayPanel,
                      SceneGameplayPanel_1.SceneGameplayPanel,
                      r,
                      e,
                    )
                : e instanceof
                    TemporaryTeleportMarkItem_1.TemporaryTeleportMarkItem
                  ? this.I2o(
                      WorldMapDefine_1.ESecondaryPanel.TemporaryTeleportPanel,
                      TemporaryTeleportPanel_1.TemporaryTeleportPanel,
                      r,
                      e,
                    )
                  : e instanceof
                      TreasureBoxDetectorMarkItem_1.TreasureBoxDetectorMarkItem
                    ? this.I2o(
                        WorldMapDefine_1.ESecondaryPanel.DetectorPanel,
                        DetectorPanel_1.DetectorPanel,
                        r,
                        e,
                      )
                    : (e instanceof SoundBoxMarkItem_1.SoundBoxMarkItem ||
                        e instanceof
                          TreasureBoxMarkItem_1.TreasureBoxMarkItem) &&
                      this.I2o(
                        WorldMapDefine_1.ESecondaryPanel.BoxPanel,
                        BoxPanel_1.BoxPanel,
                        r,
                        e,
                      );
  }
  ShowMarkMenu(e, r) {
    this.I2o(
      WorldMapDefine_1.ESecondaryPanel.MarkMenuPanel,
      MarkMenu_1.MarkMenu,
      e,
      r,
    );
  }
  async I2o(e, r, a, ...n) {
    e = WorldMapDefine_1.ESecondaryPanel[e];
    let t = this.E2o.get(e);
    t ||
      ((t = new r()),
      this.E2o.set(e, t),
      await t.CreateThenShowByResourceIdAsync(t.GetResourceId(), a)),
      this.OnUiOpen(),
      t.ShowPanel(...n);
  }
  CloseUi(e, r = !0) {
    for (var [, a] of this.E2o)
      if (
        a instanceof WorldMapSecondaryUi_1.WorldMapSecondaryUi &&
        a?.GetRootItem().bIsUIActive
      ) {
        a.Close(e, r);
        break;
      }
  }
  OnUiOpen() {
    this.S2o = !0;
  }
  OnUiClose() {
    this.S2o = !1;
  }
  GetSecondaryPanelGuideFocusUiItem(e) {
    return this.E2o.get(
      WorldMapDefine_1.ESecondaryPanel[e],
    ).GetGuideFocusUiItem();
  }
}
exports.SecondaryUiComponent = SecondaryUiComponent;
//# sourceMappingURL=SecondaryUiComponent.js.map
