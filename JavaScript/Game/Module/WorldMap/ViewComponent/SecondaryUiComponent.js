"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SecondaryUiComponent = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const CustomMarkItem_1 = require("../../Map/Marks/MarkItem/CustomMarkItem");
const DynamicEntityMarkItem_1 = require("../../Map/Marks/MarkItem/DynamicEntityMarkItem");
const EntityMarkItem_1 = require("../../Map/Marks/MarkItem/EntityMarkItem");
const FixedSceneGamePlayMarkItem_1 = require("../../Map/Marks/MarkItem/FixedSceneGamePlayMarkItem");
const MingSuNpcMarkItem_1 = require("../../Map/Marks/MarkItem/MingSuNpcMarkItem");
const ParkourMarkItem_1 = require("../../Map/Marks/MarkItem/ParkourMarkItem");
const SceneGameplayMarkItem_1 = require("../../Map/Marks/MarkItem/SceneGameplayMarkItem");
const SoundBoxMarkItem_1 = require("../../Map/Marks/MarkItem/SoundBoxMarkItem");
const TaskMarkItem_1 = require("../../Map/Marks/MarkItem/TaskMarkItem");
const TeleportMarkItem_1 = require("../../Map/Marks/MarkItem/TeleportMarkItem");
const TemporaryTeleportMarkItem_1 = require("../../Map/Marks/MarkItem/TemporaryTeleportMarkItem");
const TreasureBoxDetectorMarkItem_1 = require("../../Map/Marks/MarkItem/TreasureBoxDetectorMarkItem");
const TreasureBoxMarkItem_1 = require("../../Map/Marks/MarkItem/TreasureBoxMarkItem");
const ParkourEntrancePanel_1 = require("../SubViews/ActivityPanel/ParkourEntrancePanel");
const BoxPanel_1 = require("../SubViews/BoxPanel/BoxPanel");
const CustomMarkPanel_1 = require("../SubViews/CustomMarkPanel/CustomMarkPanel");
const DetectorPanel_1 = require("../SubViews/DectetorPanel/DetectorPanel");
const GeneralPanel_1 = require("../SubViews/GeneralPanel/GeneralPanel");
const InstanceDungeonEntrancePanel_1 = require("../SubViews/InstanceDungeonEntrancePanel/InstanceDungeonEntrancePanel");
const RoguelikeEntrancePanel_1 = require("../SubViews/InstanceDungeonEntrancePanel/RoguelikeEntrancePanel");
const TowerEntrancePanel_1 = require("../SubViews/InstanceDungeonEntrancePanel/TowerEntrancePanel");
const LordGymPanel_1 = require("../SubViews/LordGymPanel/LordGymPanel");
const MarkMenu_1 = require("../SubViews/MarkMenu/MarkMenu");
const QuestPanel_1 = require("../SubViews/QuestPanel/QuestPanel");
const SceneGameplayPanel_1 = require("../SubViews/SceneGameplayPanel/SceneGameplayPanel");
const TeleportPanel_1 = require("../SubViews/TeleportPanel/TeleportPanel");
const TemporaryTeleportPanel_1 = require("../SubViews/TemporaryTeleportPanel/TemporaryTeleportPanel");
const WorldMapDefine_1 = require("../WorldMapDefine");
const WorldMapComponentBase_1 = require("./WorldMapComponentBase");
const WorldMapSecondaryUi_1 = require("./WorldMapSecondaryUi");
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
      for (const [, e] of this.E2o) e.Destroy();
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
    for (const [, a] of this.E2o)
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
// # sourceMappingURL=SecondaryUiComponent.js.map
