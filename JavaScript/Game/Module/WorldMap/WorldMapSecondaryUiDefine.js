"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.markPanelTypeMap = exports.worldMapSecondaryPanelCtorMap = void 0);
const ParkourEntrancePanel_1 = require("./SubViews/ActivityPanel/ParkourEntrancePanel"),
  BoxPanel_1 = require("./SubViews/BoxPanel/BoxPanel"),
  CorniceMeetingEntrancePanel_1 = require("./SubViews/CorniceMeeting/CorniceMeetingEntrancePanel"),
  CustomMarkPanel_1 = require("./SubViews/CustomMarkPanel/CustomMarkPanel"),
  DetectorPanel_1 = require("./SubViews/DectetorPanel/DetectorPanel"),
  EnrichmentAreaPanel_1 = require("./SubViews/Enrichment/EnrichmentAreaPanel"),
  GeneralPanel_1 = require("./SubViews/GeneralPanel/GeneralPanel"),
  InstanceDungeonEntrancePanel_1 = require("./SubViews/InstanceDungeonEntrancePanel/InstanceDungeonEntrancePanel"),
  RoguelikeEntrancePanel_1 = require("./SubViews/InstanceDungeonEntrancePanel/RoguelikeEntrancePanel"),
  TowerEntrancePanel_1 = require("./SubViews/InstanceDungeonEntrancePanel/TowerEntrancePanel"),
  LordGymPanel_1 = require("./SubViews/LordGymPanel/LordGymPanel"),
  MarkMenu_1 = require("./SubViews/MarkMenu/MarkMenu"),
  PunishReportPanel_1 = require("./SubViews/PunishReport/PunishReportPanel"),
  QuestPanel_1 = require("./SubViews/QuestPanel/QuestPanel"),
  SceneGameplayPanel_1 = require("./SubViews/SceneGameplayPanel/SceneGameplayPanel"),
  TeleportPanel_1 = require("./SubViews/TeleportPanel/TeleportPanel"),
  TemporaryTeleportPanel_1 = require("./SubViews/TemporaryTeleportPanel/TemporaryTeleportPanel"),
  WorldMapQuickNavigatePanel_1 = require("./SubViews/WorldMapQuickNavigate/WorldMapQuickNavigatePanel"),
  WorldMapDefine_1 = require("./WorldMapDefine");
(exports.worldMapSecondaryPanelCtorMap = new Map([
  [
    WorldMapDefine_1.ESecondaryPanel.CustomMarkPanel,
    CustomMarkPanel_1.CustomMarkPanel,
  ],
  [WorldMapDefine_1.ESecondaryPanel.QuestPanel, QuestPanel_1.QuestPanel],
  [WorldMapDefine_1.ESecondaryPanel.GeneralPanel, GeneralPanel_1.GeneralPanel],
  [WorldMapDefine_1.ESecondaryPanel.MarkMenuPanel, MarkMenu_1.MarkMenu],
  [
    WorldMapDefine_1.ESecondaryPanel.ParkourPanel,
    ParkourEntrancePanel_1.ParkourEntrancePanel,
  ],
  [WorldMapDefine_1.ESecondaryPanel.LordGymPanel, LordGymPanel_1.LordGymPanel],
  [
    WorldMapDefine_1.ESecondaryPanel.SceneGameplayPanel,
    SceneGameplayPanel_1.SceneGameplayPanel,
  ],
  [
    WorldMapDefine_1.ESecondaryPanel.TemporaryTeleportPanel,
    TemporaryTeleportPanel_1.TemporaryTeleportPanel,
  ],
  [
    WorldMapDefine_1.ESecondaryPanel.DetectorPanel,
    DetectorPanel_1.DetectorPanel,
  ],
  [WorldMapDefine_1.ESecondaryPanel.BoxPanel, BoxPanel_1.BoxPanel],
  [
    WorldMapDefine_1.ESecondaryPanel.EnrichmentAreaPanel,
    EnrichmentAreaPanel_1.EnrichmentAreaPanel,
  ],
  [
    WorldMapDefine_1.ESecondaryPanel.PunishReportPanel,
    PunishReportPanel_1.PunishReportPanel,
  ],
  [
    WorldMapDefine_1.ESecondaryPanel.TeleportPanel,
    TeleportPanel_1.TeleportPanel,
  ],
  [
    WorldMapDefine_1.ESecondaryPanel.InstanceDungeonEntrancePanel,
    InstanceDungeonEntrancePanel_1.InstanceDungeonEntrancePanel,
  ],
  [
    WorldMapDefine_1.ESecondaryPanel.TowerEntrancePanel,
    TowerEntrancePanel_1.TowerEntrancePanel,
  ],
  [
    WorldMapDefine_1.ESecondaryPanel.RoguelikePanel,
    RoguelikeEntrancePanel_1.RoguelikeEntrancePanel,
  ],
  [
    WorldMapDefine_1.ESecondaryPanel.CorniceMeetingPanel,
    CorniceMeetingEntrancePanel_1.CorniceMeetingEntrancePanel,
  ],
  [
    WorldMapDefine_1.ESecondaryPanel.QuickNavigatePanel,
    WorldMapQuickNavigatePanel_1.WorldMapQuickNavigatePanel,
  ],
])),
  (exports.markPanelTypeMap = new Map([
    [9, WorldMapDefine_1.ESecondaryPanel.CustomMarkPanel],
    [12, WorldMapDefine_1.ESecondaryPanel.QuestPanel],
    [13, WorldMapDefine_1.ESecondaryPanel.ParkourPanel],
    [15, WorldMapDefine_1.ESecondaryPanel.TemporaryTeleportPanel],
    [17, WorldMapDefine_1.ESecondaryPanel.DetectorPanel],
    [16, WorldMapDefine_1.ESecondaryPanel.BoxPanel],
    [18, WorldMapDefine_1.ESecondaryPanel.BoxPanel],
    [22, WorldMapDefine_1.ESecondaryPanel.EnrichmentAreaPanel],
    [25, WorldMapDefine_1.ESecondaryPanel.PunishReportPanel],
    [24, WorldMapDefine_1.ESecondaryPanel.CorniceMeetingPanel],
  ]));
//# sourceMappingURL=WorldMapSecondaryUiDefine.js.map
