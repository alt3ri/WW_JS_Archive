"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionComponent =
    exports.unionToUnionComponent =
    exports.UnionComponent =
      void 0);
const actor_state_component_js_1 = require("../fb-component/actor-state-component.js"),
  adsorb_component_js_1 = require("../fb-component/adsorb-component.js"),
  advise_item_component_js_1 = require("../fb-component/advise-item-component.js"),
  ai_alert_notify_component_js_1 = require("../fb-component/ai-alert-notify-component.js"),
  ai_component_js_1 = require("../fb-component/ai-component.js"),
  ai_gear_strategy_component_js_1 = require("../fb-component/ai-gear-strategy-component.js"),
  air_passage_component_js_1 = require("../fb-component/air-passage-component.js"),
  air_wall_spawner_component_js_1 = require("../fb-component/air-wall-spawner-component.js"),
  animal_component_js_1 = require("../fb-component/animal-component.js"),
  attach_target_component_js_1 = require("../fb-component/attach-target-component.js"),
  attribute_component_js_1 = require("../fb-component/attribute-component.js"),
  base_info_component_js_1 = require("../fb-component/base-info-component.js"),
  batch_bullet_caster_component_js_1 = require("../fb-component/batch-bullet-caster-component.js"),
  beam_cast_component_js_1 = require("../fb-component/beam-cast-component.js"),
  beam_receive_component_js_1 = require("../fb-component/beam-receive-component.js"),
  behavior_flow_component_js_1 = require("../fb-component/behavior-flow-component.js"),
  bubble_component_js_1 = require("../fb-component/bubble-component.js"),
  buff_consumer_component_js_1 = require("../fb-component/buff-consumer-component.js"),
  buff_producer_component_js_1 = require("../fb-component/buff-producer-component.js"),
  calculate_component_js_1 = require("../fb-component/calculate-component.js"),
  character_connector_component_js_1 = require("../fb-component/character-connector-component.js"),
  chessman_component_js_1 = require("../fb-component/chessman-component.js"),
  client_condition_listener_component_js_1 = require("../fb-component/client-condition-listener-component.js"),
  client_trigger_component_js_1 = require("../fb-component/client-trigger-component.js"),
  collect_component_js_1 = require("../fb-component/collect-component.js"),
  combat_component_js_1 = require("../fb-component/combat-component.js"),
  combined_visible_group_component_js_1 = require("../fb-component/combined-visible-group-component.js"),
  condition_listener_component_js_1 = require("../fb-component/condition-listener-component.js"),
  connector_component_js_1 = require("../fb-component/connector-component.js"),
  conveyor_belt_component_js_1 = require("../fb-component/conveyor-belt-component.js"),
  curve_control_component_js_1 = require("../fb-component/curve-control-component.js"),
  destructible_item_js_1 = require("../fb-component/destructible-item.js"),
  drop_component_js_1 = require("../fb-component/drop-component.js"),
  dungeon_entry_component_js_1 = require("../fb-component/dungeon-entry-component.js"),
  dynamic_portal_creator_component_js_1 = require("../fb-component/dynamic-portal-creator-component.js"),
  dynamic_teleport_component_js_1 = require("../fb-component/dynamic-teleport-component.js"),
  edit_custom_aoi_component_js_1 = require("../fb-component/edit-custom-aoi-component.js"),
  effect_area_component_js_1 = require("../fb-component/effect-area-component.js"),
  enrichment_area_component_js_1 = require("../fb-component/enrichment-area-component.js"),
  entity_audio_component_js_1 = require("../fb-component/entity-audio-component.js"),
  entity_batch_refresh_component_js_1 = require("../fb-component/entity-batch-refresh-component.js"),
  entity_bundle_component_js_1 = require("../fb-component/entity-bundle-component.js"),
  entity_custom_audio_component_js_1 = require("../fb-component/entity-custom-audio-component.js"),
  entity_group_component_js_1 = require("../fb-component/entity-group-component.js"),
  entity_list_component_js_1 = require("../fb-component/entity-list-component.js"),
  entity_package_component_js_1 = require("../fb-component/entity-package-component.js"),
  entity_state_audio_component_js_1 = require("../fb-component/entity-state-audio-component.js"),
  entity_state_component_js_1 = require("../fb-component/entity-state-component.js"),
  entity_visible_component_js_1 = require("../fb-component/entity-visible-component.js"),
  explore_skill_interact_component_js_1 = require("../fb-component/explore-skill-interact-component.js"),
  fan_component_js_1 = require("../fb-component/fan-component.js"),
  fight_interact_component_js_1 = require("../fb-component/fight-interact-component.js"),
  flow_component_js_1 = require("../fb-component/flow-component.js"),
  follow_shooter_component_js_1 = require("../fb-component/follow-shooter-component.js"),
  follow_track_component_js_1 = require("../fb-component/follow-track-component.js"),
  grab_component_js_1 = require("../fb-component/grab-component.js"),
  gravity_flip_component_js_1 = require("../fb-component/gravity-flip-component.js"),
  group_ai_component_js_1 = require("../fb-component/group-ai-component.js"),
  guide_line_creator_component_js_1 = require("../fb-component/guide-line-creator-component.js"),
  hack_management_component_js_1 = require("../fb-component/hack-management-component.js"),
  hit_component_js_1 = require("../fb-component/hit-component.js"),
  hook_lock_point_js_1 = require("../fb-component/hook-lock-point.js"),
  inhalation_ability_component_js_1 = require("../fb-component/inhalation-ability-component.js"),
  inhaled_item_component_js_1 = require("../fb-component/inhaled-item-component.js"),
  interact_audio_component_js_1 = require("../fb-component/interact-audio-component.js"),
  interact_component_js_1 = require("../fb-component/interact-component.js"),
  interact_gear_component_js_1 = require("../fb-component/interact-gear-component.js"),
  interactive_component_js_1 = require("../fb-component/interactive-component.js"),
  item_foundation_js_1 = require("../fb-component/item-foundation.js"),
  item_foundation2_js_1 = require("../fb-component/item-foundation2.js"),
  jigsaw_foundation_js_1 = require("../fb-component/jigsaw-foundation.js"),
  jigsaw_item_js_1 = require("../fb-component/jigsaw-item.js"),
  level_aicomponent_js_1 = require("../fb-component/level-aicomponent.js"),
  level_play_component_js_1 = require("../fb-component/level-play-component.js"),
  level_prefab_perform_component_js_1 = require("../fb-component/level-prefab-perform-component.js"),
  level_qte_component_js_1 = require("../fb-component/level-qte-component.js"),
  level_sequence_frame_event_component_js_1 = require("../fb-component/level-sequence-frame-event-component.js"),
  levitate_magnet_component_js_1 = require("../fb-component/levitate-magnet-component.js"),
  life_point_center_component_js_1 = require("../fb-component/life-point-center-component.js"),
  lift_component_js_1 = require("../fb-component/lift-component.js"),
  location_safety_component_js_1 = require("../fb-component/location-safety-component.js"),
  model_component_js_1 = require("../fb-component/model-component.js"),
  monitor_component_js_1 = require("../fb-component/monitor-component.js"),
  monster_component_js_1 = require("../fb-component/monster-component.js"),
  monster_gacha_base_component_js_1 = require("../fb-component/monster-gacha-base-component.js"),
  monster_gacha_item_component_js_1 = require("../fb-component/monster-gacha-item-component.js"),
  move_component_js_1 = require("../fb-component/move-component.js"),
  nearby_tracking_component_js_1 = require("../fb-component/nearby-tracking-component.js"),
  no_render_portal_component_js_1 = require("../fb-component/no-render-portal-component.js"),
  npc_perform_component_js_1 = require("../fb-component/npc-perform-component.js"),
  passerby_npc_spawn_component_js_1 = require("../fb-component/passerby-npc-spawn-component.js"),
  photo_target_component_js_1 = require("../fb-component/photo-target-component.js"),
  physics_constraint_component_js_1 = require("../fb-component/physics-constraint-component.js"),
  pick_interact_component_js_1 = require("../fb-component/pick-interact-component.js"),
  portal_component_js_1 = require("../fb-component/portal-component.js"),
  progress_bar_control_component_js_1 = require("../fb-component/progress-bar-control-component.js"),
  pulling_foundation_js_1 = require("../fb-component/pulling-foundation.js"),
  range_component_js_1 = require("../fb-component/range-component.js"),
  rebound_component_js_1 = require("../fb-component/rebound-component.js"),
  refresh_component_js_1 = require("../fb-component/refresh-component.js"),
  refresh_group_component_js_1 = require("../fb-component/refresh-group-component.js"),
  refresh_single_component_js_1 = require("../fb-component/refresh-single-component.js"),
  render_specified_range_component_js_1 = require("../fb-component/render-specified-range-component.js"),
  reset_entities_pos_component_js_1 = require("../fb-component/reset-entities-pos-component.js"),
  reset_self_pos_component_js_1 = require("../fb-component/reset-self-pos-component.js"),
  resurrection_component_js_1 = require("../fb-component/resurrection-component.js"),
  reward_component_js_1 = require("../fb-component/reward-component.js"),
  rotator_component_js_1 = require("../fb-component/rotator-component.js"),
  rotator_component2_js_1 = require("../fb-component/rotator-component2.js"),
  scene_actor_ref_component_js_1 = require("../fb-component/scene-actor-ref-component.js"),
  scene_bullet_component_js_1 = require("../fb-component/scene-bullet-component.js"),
  scene_item_ai_component_js_1 = require("../fb-component/scene-item-ai-component.js"),
  scene_item_attribute_component_js_1 = require("../fb-component/scene-item-attribute-component.js"),
  scene_item_life_cycle_component_js_1 = require("../fb-component/scene-item-life-cycle-component.js"),
  scene_item_movement_component_js_1 = require("../fb-component/scene-item-movement-component.js"),
  skybox_component_js_1 = require("../fb-component/skybox-component.js"),
  slide_rail_component_js_1 = require("../fb-component/slide-rail-component.js"),
  spawn_monster_component_js_1 = require("../fb-component/spawn-monster-component.js"),
  sphere_factory_component_js_1 = require("../fb-component/sphere-factory-component.js"),
  spline_component_js_1 = require("../fb-component/spline-component.js"),
  spring_component_js_1 = require("../fb-component/spring-component.js"),
  state_hint_component_js_1 = require("../fb-component/state-hint-component.js"),
  switcher_component_js_1 = require("../fb-component/switcher-component.js"),
  target_gear_component_js_1 = require("../fb-component/target-gear-component.js"),
  target_gear_group_component_js_1 = require("../fb-component/target-gear-group-component.js"),
  tele_control2_js_1 = require("../fb-component/tele-control2.js"),
  teleport_component_js_1 = require("../fb-component/teleport-component.js"),
  template_entity_spawner_component_js_1 = require("../fb-component/template-entity-spawner-component.js"),
  time_stop_component_js_1 = require("../fb-component/time-stop-component.js"),
  timeline_track_control_component_js_1 = require("../fb-component/timeline-track-control-component.js"),
  trample_component_js_1 = require("../fb-component/trample-component.js"),
  trample_ue5_component_js_1 = require("../fb-component/trample-ue5-component.js"),
  treasure_box_component_js_1 = require("../fb-component/treasure-box-component.js"),
  trigger_component_js_1 = require("../fb-component/trigger-component.js"),
  trigger_ue5_component_js_1 = require("../fb-component/trigger-ue5-component.js"),
  turntable_control_component_js_1 = require("../fb-component/turntable-control-component.js"),
  un_use_component_js_1 = require("../fb-component/un-use-component.js"),
  underground_component_js_1 = require("../fb-component/underground-component.js"),
  var_component_js_1 = require("../fb-component/var-component.js"),
  vehicle_component_js_1 = require("../fb-component/vehicle-component.js"),
  vision_capture_component_js_1 = require("../fb-component/vision-capture-component.js"),
  vision_component_js_1 = require("../fb-component/vision-component.js"),
  vision_item_component_js_1 = require("../fb-component/vision-item-component.js"),
  walking_pattern_component_js_1 = require("../fb-component/walking-pattern-component.js"),
  weapon_component_js_1 = require("../fb-component/weapon-component.js"),
  wind_source_component_js_1 = require("../fb-component/wind-source-component.js");
var UnionComponent;
function unionToUnionComponent(e, n) {
  switch (UnionComponent[e]) {
    case "NONE":
      return;
    case "AirWallSpawnerComponent":
      return n(new air_wall_spawner_component_js_1.AirWallSpawnerComponent());
    case "ActorStateComponent":
      return n(new actor_state_component_js_1.ActorStateComponent());
    case "AiComponent":
      return n(new ai_component_js_1.AiComponent());
    case "LevelAIComponent":
      return n(new level_aicomponent_js_1.LevelAIComponent());
    case "AttributeComponent":
      return n(new attribute_component_js_1.AttributeComponent());
    case "BaseInfoComponent":
      return n(new base_info_component_js_1.BaseInfoComponent());
    case "BehaviorFlowComponent":
      return n(new behavior_flow_component_js_1.BehaviorFlowComponent());
    case "CalculateComponent":
      return n(new calculate_component_js_1.CalculateComponent());
    case "UnUseComponent":
      return n(new un_use_component_js_1.UnUseComponent());
    case "EntityStateComponent":
      return n(new entity_state_component_js_1.EntityStateComponent());
    case "SceneItemAttributeComponent":
      return n(
        new scene_item_attribute_component_js_1.SceneItemAttributeComponent(),
      );
    case "FlowComponent":
      return n(new flow_component_js_1.FlowComponent());
    case "GrabComponent":
      return n(new grab_component_js_1.GrabComponent());
    case "InteractComponent":
      return n(new interact_component_js_1.InteractComponent());
    case "InteractiveComponent":
      return n(new interactive_component_js_1.InteractiveComponent());
    case "MoveComponent":
      return n(new move_component_js_1.MoveComponent());
    case "RefreshComponent":
      return n(new refresh_component_js_1.RefreshComponent());
    case "RefreshGroupComponent":
      return n(new refresh_group_component_js_1.RefreshGroupComponent());
    case "RefreshSingleComponent":
      return n(new refresh_single_component_js_1.RefreshSingleComponent());
    case "RewardComponent":
      return n(new reward_component_js_1.RewardComponent());
    case "RotatorComponent":
      return n(new rotator_component_js_1.RotatorComponent());
    case "RotatorComponent2":
      return n(new rotator_component2_js_1.RotatorComponent2());
    case "SphereFactoryComponent":
      return n(new sphere_factory_component_js_1.SphereFactoryComponent());
    case "SpringComponent":
      return n(new spring_component_js_1.SpringComponent());
    case "SpawnMonsterComponent":
      return n(new spawn_monster_component_js_1.SpawnMonsterComponent());
    case "SwitcherComponent":
      return n(new switcher_component_js_1.SwitcherComponent());
    case "TrampleUe5Component":
      return n(new trample_ue5_component_js_1.TrampleUe5Component());
    case "TreasureBoxComponent":
      return n(new treasure_box_component_js_1.TreasureBoxComponent());
    case "TriggerUe5Component":
      return n(new trigger_ue5_component_js_1.TriggerUe5Component());
    case "UndergroundComponent":
      return n(new underground_component_js_1.UndergroundComponent());
    case "VarComponent":
      return n(new var_component_js_1.VarComponent());
    case "TriggerComponent":
      return n(new trigger_component_js_1.TriggerComponent());
    case "HookLockPoint":
      return n(new hook_lock_point_js_1.HookLockPoint());
    case "TargetGearComponent":
      return n(new target_gear_component_js_1.TargetGearComponent());
    case "TargetGearGroupComponent":
      return n(new target_gear_group_component_js_1.TargetGearGroupComponent());
    case "ItemFoundation":
      return n(new item_foundation_js_1.ItemFoundation());
    case "ItemFoundation2":
      return n(new item_foundation2_js_1.ItemFoundation2());
    case "PullingFoundation":
      return n(new pulling_foundation_js_1.PullingFoundation());
    case "JigsawItem":
      return n(new jigsaw_item_js_1.JigsawItem());
    case "JigsawFoundation":
      return n(new jigsaw_foundation_js_1.JigsawFoundation());
    case "CollectComponent":
      return n(new collect_component_js_1.CollectComponent());
    case "TeleControl2":
      return n(new tele_control2_js_1.TeleControl2());
    case "DestructibleItem":
      return n(new destructible_item_js_1.DestructibleItem());
    case "LevelPlayComponent":
      return n(new level_play_component_js_1.LevelPlayComponent());
    case "VisionComponent":
      return n(new vision_component_js_1.VisionComponent());
    case "VisionCaptureComponent":
      return n(new vision_capture_component_js_1.VisionCaptureComponent());
    case "ResetEntitiesPosComponent":
      return n(
        new reset_entities_pos_component_js_1.ResetEntitiesPosComponent(),
      );
    case "EntityGroupComponent":
      return n(new entity_group_component_js_1.EntityGroupComponent());
    case "AdsorbComponent":
      return n(new adsorb_component_js_1.AdsorbComponent());
    case "TeleportComponent":
      return n(new teleport_component_js_1.TeleportComponent());
    case "TrampleComponent":
      return n(new trample_component_js_1.TrampleComponent());
    case "NpcPerformComponent":
      return n(new npc_perform_component_js_1.NpcPerformComponent());
    case "InteractGearComponent":
      return n(new interact_gear_component_js_1.InteractGearComponent());
    case "LiftComponent":
      return n(new lift_component_js_1.LiftComponent());
    case "FollowTrackComponent":
      return n(new follow_track_component_js_1.FollowTrackComponent());
    case "SceneItemLifeCycleComponent":
      return n(
        new scene_item_life_cycle_component_js_1.SceneItemLifeCycleComponent(),
      );
    case "BubbleComponent":
      return n(new bubble_component_js_1.BubbleComponent());
    case "FightInteractComponent":
      return n(new fight_interact_component_js_1.FightInteractComponent());
    case "NearbyTrackingComponent":
      return n(new nearby_tracking_component_js_1.NearbyTrackingComponent());
    case "EntityPackageComponent":
      return n(new entity_package_component_js_1.EntityPackageComponent());
    case "SkyboxComponent":
      return n(new skybox_component_js_1.SkyboxComponent());
    case "StateHintComponent":
      return n(new state_hint_component_js_1.StateHintComponent());
    case "EntityVisibleComponent":
      return n(new entity_visible_component_js_1.EntityVisibleComponent());
    case "CombinedVisibleGroupComponent":
      return n(
        new combined_visible_group_component_js_1.CombinedVisibleGroupComponent(),
      );
    case "WeaponComponent":
      return n(new weapon_component_js_1.WeaponComponent());
    case "DungeonEntryComponent":
      return n(new dungeon_entry_component_js_1.DungeonEntryComponent());
    case "ResurrectionComponent":
      return n(new resurrection_component_js_1.ResurrectionComponent());
    case "BuffProducerComponent":
      return n(new buff_producer_component_js_1.BuffProducerComponent());
    case "BuffConsumerComponent":
      return n(new buff_consumer_component_js_1.BuffConsumerComponent());
    case "GuideLineCreatorComponent":
      return n(
        new guide_line_creator_component_js_1.GuideLineCreatorComponent(),
      );
    case "InteractAudioComponent":
      return n(new interact_audio_component_js_1.InteractAudioComponent());
    case "DropComponent":
      return n(new drop_component_js_1.DropComponent());
    case "AdviseItemComponent":
      return n(new advise_item_component_js_1.AdviseItemComponent());
    case "VisionItemComponent":
      return n(new vision_item_component_js_1.VisionItemComponent());
    case "MonsterComponent":
      return n(new monster_component_js_1.MonsterComponent());
    case "CombatComponent":
      return n(new combat_component_js_1.CombatComponent());
    case "EntityListComponent":
      return n(new entity_list_component_js_1.EntityListComponent());
    case "AnimalComponent":
      return n(new animal_component_js_1.AnimalComponent());
    case "EntityAudioComponent":
      return n(new entity_audio_component_js_1.EntityAudioComponent());
    case "EntityStateAudioComponent":
      return n(
        new entity_state_audio_component_js_1.EntityStateAudioComponent(),
      );
    case "EntityCustomAudioComponent":
      return n(
        new entity_custom_audio_component_js_1.EntityCustomAudioComponent(),
      );
    case "SceneItemMovementComponent":
      return n(
        new scene_item_movement_component_js_1.SceneItemMovementComponent(),
      );
    case "RangeComponent":
      return n(new range_component_js_1.RangeComponent());
    case "TimelineTrackControlComponent":
      return n(
        new timeline_track_control_component_js_1.TimelineTrackControlComponent(),
      );
    case "SplineComponent":
      return n(new spline_component_js_1.SplineComponent());
    case "SceneActorRefComponent":
      return n(new scene_actor_ref_component_js_1.SceneActorRefComponent());
    case "EditCustomAoiComponent":
      return n(new edit_custom_aoi_component_js_1.EditCustomAoiComponent());
    case "SceneBulletComponent":
      return n(new scene_bullet_component_js_1.SceneBulletComponent());
    case "TurntableControlComponent":
      return n(
        new turntable_control_component_js_1.TurntableControlComponent(),
      );
    case "ConditionListenerComponent":
      return n(
        new condition_listener_component_js_1.ConditionListenerComponent(),
      );
    case "AttachTargetComponent":
      return n(new attach_target_component_js_1.AttachTargetComponent());
    case "ReboundComponent":
      return n(new rebound_component_js_1.ReboundComponent());
    case "LevitateMagnetComponent":
      return n(new levitate_magnet_component_js_1.LevitateMagnetComponent());
    case "PhotoTargetComponent":
      return n(new photo_target_component_js_1.PhotoTargetComponent());
    case "AiAlertNotifyComponent":
      return n(new ai_alert_notify_component_js_1.AiAlertNotifyComponent());
    case "MonsterGachaItemComponent":
      return n(
        new monster_gacha_item_component_js_1.MonsterGachaItemComponent(),
      );
    case "MonsterGachaBaseComponent":
      return n(
        new monster_gacha_base_component_js_1.MonsterGachaBaseComponent(),
      );
    case "ProgressBarControlComponent":
      return n(
        new progress_bar_control_component_js_1.ProgressBarControlComponent(),
      );
    case "ConveyorBeltComponent":
      return n(new conveyor_belt_component_js_1.ConveyorBeltComponent());
    case "DynamicTeleportComponent":
      return n(new dynamic_teleport_component_js_1.DynamicTeleportComponent());
    case "ExploreSkillInteractComponent":
      return n(
        new explore_skill_interact_component_js_1.ExploreSkillInteractComponent(),
      );
    case "FanComponent":
      return n(new fan_component_js_1.FanComponent());
    case "ResetSelfPosComponent":
      return n(new reset_self_pos_component_js_1.ResetSelfPosComponent());
    case "PasserbyNpcSpawnComponent":
      return n(
        new passerby_npc_spawn_component_js_1.PasserbyNpcSpawnComponent(),
      );
    case "ModelComponent":
      return n(new model_component_js_1.ModelComponent());
    case "EntityBundleComponent":
      return n(new entity_bundle_component_js_1.EntityBundleComponent());
    case "BeamCastComponent":
      return n(new beam_cast_component_js_1.BeamCastComponent());
    case "BeamReceiveComponent":
      return n(new beam_receive_component_js_1.BeamReceiveComponent());
    case "TimeStopComponent":
      return n(new time_stop_component_js_1.TimeStopComponent());
    case "PortalComponent":
      return n(new portal_component_js_1.PortalComponent());
    case "NoRenderPortalComponent":
      return n(new no_render_portal_component_js_1.NoRenderPortalComponent());
    case "EffectAreaComponent":
      return n(new effect_area_component_js_1.EffectAreaComponent());
    case "PhysicsConstraintComponent":
      return n(
        new physics_constraint_component_js_1.PhysicsConstraintComponent(),
      );
    case "FollowShooterComponent":
      return n(new follow_shooter_component_js_1.FollowShooterComponent());
    case "ConnectorComponent":
      return n(new connector_component_js_1.ConnectorComponent());
    case "CharacterConnectorComponent":
      return n(
        new character_connector_component_js_1.CharacterConnectorComponent(),
      );
    case "HitComponent":
      return n(new hit_component_js_1.HitComponent());
    case "DynamicPortalCreatorComponent":
      return n(
        new dynamic_portal_creator_component_js_1.DynamicPortalCreatorComponent(),
      );
    case "AiGearStrategyComponent":
      return n(new ai_gear_strategy_component_js_1.AiGearStrategyComponent());
    case "PickInteractComponent":
      return n(new pick_interact_component_js_1.PickInteractComponent());
    case "ClientTriggerComponent":
      return n(new client_trigger_component_js_1.ClientTriggerComponent());
    case "LocationSafetyComponent":
      return n(new location_safety_component_js_1.LocationSafetyComponent());
    case "BatchBulletCasterComponent":
      return n(
        new batch_bullet_caster_component_js_1.BatchBulletCasterComponent(),
      );
    case "VehicleComponent":
      return n(new vehicle_component_js_1.VehicleComponent());
    case "EnrichmentAreaComponent":
      return n(new enrichment_area_component_js_1.EnrichmentAreaComponent());
    case "ChessmanComponent":
      return n(new chessman_component_js_1.ChessmanComponent());
    case "MonitorComponent":
      return n(new monitor_component_js_1.MonitorComponent());
    case "GroupAiComponent":
      return n(new group_ai_component_js_1.GroupAiComponent());
    case "InhalationAbilityComponent":
      return n(
        new inhalation_ability_component_js_1.InhalationAbilityComponent(),
      );
    case "InhaledItemComponent":
      return n(new inhaled_item_component_js_1.InhaledItemComponent());
    case "AirPassageComponent":
      return n(new air_passage_component_js_1.AirPassageComponent());
    case "RenderSpecifiedRangeComponent":
      return n(
        new render_specified_range_component_js_1.RenderSpecifiedRangeComponent(),
      );
    case "LevelPrefabPerformComponent":
      return n(
        new level_prefab_perform_component_js_1.LevelPrefabPerformComponent(),
      );
    case "SceneItemAiComponent":
      return n(new scene_item_ai_component_js_1.SceneItemAiComponent());
    case "GravityFlipComponent":
      return n(new gravity_flip_component_js_1.GravityFlipComponent());
    case "LevelSequenceFrameEventComponent":
      return n(
        new level_sequence_frame_event_component_js_1.LevelSequenceFrameEventComponent(),
      );
    case "LevelQteComponent":
      return n(new level_qte_component_js_1.LevelQteComponent());
    case "WalkingPatternComponent":
      return n(new walking_pattern_component_js_1.WalkingPatternComponent());
    case "LifePointCenterComponent":
      return n(new life_point_center_component_js_1.LifePointCenterComponent());
    case "HackManagementComponent":
      return n(new hack_management_component_js_1.HackManagementComponent());
    case "ClientConditionListenerComponent":
      return n(
        new client_condition_listener_component_js_1.ClientConditionListenerComponent(),
      );
    case "TemplateEntitySpawnerComponent":
      return n(
        new template_entity_spawner_component_js_1.TemplateEntitySpawnerComponent(),
      );
    case "WindSourceComponent":
      return n(new wind_source_component_js_1.WindSourceComponent());
    case "SlideRailComponent":
      return n(new slide_rail_component_js_1.SlideRailComponent());
    case "CurveControlComponent":
      return n(new curve_control_component_js_1.CurveControlComponent());
    case "EntityBatchRefreshComponent":
      return n(
        new entity_batch_refresh_component_js_1.EntityBatchRefreshComponent(),
      );
    default:
      return;
  }
}
function unionListToUnionComponent(e, n, o) {
  switch (UnionComponent[e]) {
    case "NONE":
      return;
    case "AirWallSpawnerComponent":
      return n(
        o,
        new air_wall_spawner_component_js_1.AirWallSpawnerComponent(),
      );
    case "ActorStateComponent":
      return n(o, new actor_state_component_js_1.ActorStateComponent());
    case "AiComponent":
      return n(o, new ai_component_js_1.AiComponent());
    case "LevelAIComponent":
      return n(o, new level_aicomponent_js_1.LevelAIComponent());
    case "AttributeComponent":
      return n(o, new attribute_component_js_1.AttributeComponent());
    case "BaseInfoComponent":
      return n(o, new base_info_component_js_1.BaseInfoComponent());
    case "BehaviorFlowComponent":
      return n(o, new behavior_flow_component_js_1.BehaviorFlowComponent());
    case "CalculateComponent":
      return n(o, new calculate_component_js_1.CalculateComponent());
    case "UnUseComponent":
      return n(o, new un_use_component_js_1.UnUseComponent());
    case "EntityStateComponent":
      return n(o, new entity_state_component_js_1.EntityStateComponent());
    case "SceneItemAttributeComponent":
      return n(
        o,
        new scene_item_attribute_component_js_1.SceneItemAttributeComponent(),
      );
    case "FlowComponent":
      return n(o, new flow_component_js_1.FlowComponent());
    case "GrabComponent":
      return n(o, new grab_component_js_1.GrabComponent());
    case "InteractComponent":
      return n(o, new interact_component_js_1.InteractComponent());
    case "InteractiveComponent":
      return n(o, new interactive_component_js_1.InteractiveComponent());
    case "MoveComponent":
      return n(o, new move_component_js_1.MoveComponent());
    case "RefreshComponent":
      return n(o, new refresh_component_js_1.RefreshComponent());
    case "RefreshGroupComponent":
      return n(o, new refresh_group_component_js_1.RefreshGroupComponent());
    case "RefreshSingleComponent":
      return n(o, new refresh_single_component_js_1.RefreshSingleComponent());
    case "RewardComponent":
      return n(o, new reward_component_js_1.RewardComponent());
    case "RotatorComponent":
      return n(o, new rotator_component_js_1.RotatorComponent());
    case "RotatorComponent2":
      return n(o, new rotator_component2_js_1.RotatorComponent2());
    case "SphereFactoryComponent":
      return n(o, new sphere_factory_component_js_1.SphereFactoryComponent());
    case "SpringComponent":
      return n(o, new spring_component_js_1.SpringComponent());
    case "SpawnMonsterComponent":
      return n(o, new spawn_monster_component_js_1.SpawnMonsterComponent());
    case "SwitcherComponent":
      return n(o, new switcher_component_js_1.SwitcherComponent());
    case "TrampleUe5Component":
      return n(o, new trample_ue5_component_js_1.TrampleUe5Component());
    case "TreasureBoxComponent":
      return n(o, new treasure_box_component_js_1.TreasureBoxComponent());
    case "TriggerUe5Component":
      return n(o, new trigger_ue5_component_js_1.TriggerUe5Component());
    case "UndergroundComponent":
      return n(o, new underground_component_js_1.UndergroundComponent());
    case "VarComponent":
      return n(o, new var_component_js_1.VarComponent());
    case "TriggerComponent":
      return n(o, new trigger_component_js_1.TriggerComponent());
    case "HookLockPoint":
      return n(o, new hook_lock_point_js_1.HookLockPoint());
    case "TargetGearComponent":
      return n(o, new target_gear_component_js_1.TargetGearComponent());
    case "TargetGearGroupComponent":
      return n(
        o,
        new target_gear_group_component_js_1.TargetGearGroupComponent(),
      );
    case "ItemFoundation":
      return n(o, new item_foundation_js_1.ItemFoundation());
    case "ItemFoundation2":
      return n(o, new item_foundation2_js_1.ItemFoundation2());
    case "PullingFoundation":
      return n(o, new pulling_foundation_js_1.PullingFoundation());
    case "JigsawItem":
      return n(o, new jigsaw_item_js_1.JigsawItem());
    case "JigsawFoundation":
      return n(o, new jigsaw_foundation_js_1.JigsawFoundation());
    case "CollectComponent":
      return n(o, new collect_component_js_1.CollectComponent());
    case "TeleControl2":
      return n(o, new tele_control2_js_1.TeleControl2());
    case "DestructibleItem":
      return n(o, new destructible_item_js_1.DestructibleItem());
    case "LevelPlayComponent":
      return n(o, new level_play_component_js_1.LevelPlayComponent());
    case "VisionComponent":
      return n(o, new vision_component_js_1.VisionComponent());
    case "VisionCaptureComponent":
      return n(o, new vision_capture_component_js_1.VisionCaptureComponent());
    case "ResetEntitiesPosComponent":
      return n(
        o,
        new reset_entities_pos_component_js_1.ResetEntitiesPosComponent(),
      );
    case "EntityGroupComponent":
      return n(o, new entity_group_component_js_1.EntityGroupComponent());
    case "AdsorbComponent":
      return n(o, new adsorb_component_js_1.AdsorbComponent());
    case "TeleportComponent":
      return n(o, new teleport_component_js_1.TeleportComponent());
    case "TrampleComponent":
      return n(o, new trample_component_js_1.TrampleComponent());
    case "NpcPerformComponent":
      return n(o, new npc_perform_component_js_1.NpcPerformComponent());
    case "InteractGearComponent":
      return n(o, new interact_gear_component_js_1.InteractGearComponent());
    case "LiftComponent":
      return n(o, new lift_component_js_1.LiftComponent());
    case "FollowTrackComponent":
      return n(o, new follow_track_component_js_1.FollowTrackComponent());
    case "SceneItemLifeCycleComponent":
      return n(
        o,
        new scene_item_life_cycle_component_js_1.SceneItemLifeCycleComponent(),
      );
    case "BubbleComponent":
      return n(o, new bubble_component_js_1.BubbleComponent());
    case "FightInteractComponent":
      return n(o, new fight_interact_component_js_1.FightInteractComponent());
    case "NearbyTrackingComponent":
      return n(o, new nearby_tracking_component_js_1.NearbyTrackingComponent());
    case "EntityPackageComponent":
      return n(o, new entity_package_component_js_1.EntityPackageComponent());
    case "SkyboxComponent":
      return n(o, new skybox_component_js_1.SkyboxComponent());
    case "StateHintComponent":
      return n(o, new state_hint_component_js_1.StateHintComponent());
    case "EntityVisibleComponent":
      return n(o, new entity_visible_component_js_1.EntityVisibleComponent());
    case "CombinedVisibleGroupComponent":
      return n(
        o,
        new combined_visible_group_component_js_1.CombinedVisibleGroupComponent(),
      );
    case "WeaponComponent":
      return n(o, new weapon_component_js_1.WeaponComponent());
    case "DungeonEntryComponent":
      return n(o, new dungeon_entry_component_js_1.DungeonEntryComponent());
    case "ResurrectionComponent":
      return n(o, new resurrection_component_js_1.ResurrectionComponent());
    case "BuffProducerComponent":
      return n(o, new buff_producer_component_js_1.BuffProducerComponent());
    case "BuffConsumerComponent":
      return n(o, new buff_consumer_component_js_1.BuffConsumerComponent());
    case "GuideLineCreatorComponent":
      return n(
        o,
        new guide_line_creator_component_js_1.GuideLineCreatorComponent(),
      );
    case "InteractAudioComponent":
      return n(o, new interact_audio_component_js_1.InteractAudioComponent());
    case "DropComponent":
      return n(o, new drop_component_js_1.DropComponent());
    case "AdviseItemComponent":
      return n(o, new advise_item_component_js_1.AdviseItemComponent());
    case "VisionItemComponent":
      return n(o, new vision_item_component_js_1.VisionItemComponent());
    case "MonsterComponent":
      return n(o, new monster_component_js_1.MonsterComponent());
    case "CombatComponent":
      return n(o, new combat_component_js_1.CombatComponent());
    case "EntityListComponent":
      return n(o, new entity_list_component_js_1.EntityListComponent());
    case "AnimalComponent":
      return n(o, new animal_component_js_1.AnimalComponent());
    case "EntityAudioComponent":
      return n(o, new entity_audio_component_js_1.EntityAudioComponent());
    case "EntityStateAudioComponent":
      return n(
        o,
        new entity_state_audio_component_js_1.EntityStateAudioComponent(),
      );
    case "EntityCustomAudioComponent":
      return n(
        o,
        new entity_custom_audio_component_js_1.EntityCustomAudioComponent(),
      );
    case "SceneItemMovementComponent":
      return n(
        o,
        new scene_item_movement_component_js_1.SceneItemMovementComponent(),
      );
    case "RangeComponent":
      return n(o, new range_component_js_1.RangeComponent());
    case "TimelineTrackControlComponent":
      return n(
        o,
        new timeline_track_control_component_js_1.TimelineTrackControlComponent(),
      );
    case "SplineComponent":
      return n(o, new spline_component_js_1.SplineComponent());
    case "SceneActorRefComponent":
      return n(o, new scene_actor_ref_component_js_1.SceneActorRefComponent());
    case "EditCustomAoiComponent":
      return n(o, new edit_custom_aoi_component_js_1.EditCustomAoiComponent());
    case "SceneBulletComponent":
      return n(o, new scene_bullet_component_js_1.SceneBulletComponent());
    case "TurntableControlComponent":
      return n(
        o,
        new turntable_control_component_js_1.TurntableControlComponent(),
      );
    case "ConditionListenerComponent":
      return n(
        o,
        new condition_listener_component_js_1.ConditionListenerComponent(),
      );
    case "AttachTargetComponent":
      return n(o, new attach_target_component_js_1.AttachTargetComponent());
    case "ReboundComponent":
      return n(o, new rebound_component_js_1.ReboundComponent());
    case "LevitateMagnetComponent":
      return n(o, new levitate_magnet_component_js_1.LevitateMagnetComponent());
    case "PhotoTargetComponent":
      return n(o, new photo_target_component_js_1.PhotoTargetComponent());
    case "AiAlertNotifyComponent":
      return n(o, new ai_alert_notify_component_js_1.AiAlertNotifyComponent());
    case "MonsterGachaItemComponent":
      return n(
        o,
        new monster_gacha_item_component_js_1.MonsterGachaItemComponent(),
      );
    case "MonsterGachaBaseComponent":
      return n(
        o,
        new monster_gacha_base_component_js_1.MonsterGachaBaseComponent(),
      );
    case "ProgressBarControlComponent":
      return n(
        o,
        new progress_bar_control_component_js_1.ProgressBarControlComponent(),
      );
    case "ConveyorBeltComponent":
      return n(o, new conveyor_belt_component_js_1.ConveyorBeltComponent());
    case "DynamicTeleportComponent":
      return n(
        o,
        new dynamic_teleport_component_js_1.DynamicTeleportComponent(),
      );
    case "ExploreSkillInteractComponent":
      return n(
        o,
        new explore_skill_interact_component_js_1.ExploreSkillInteractComponent(),
      );
    case "FanComponent":
      return n(o, new fan_component_js_1.FanComponent());
    case "ResetSelfPosComponent":
      return n(o, new reset_self_pos_component_js_1.ResetSelfPosComponent());
    case "PasserbyNpcSpawnComponent":
      return n(
        o,
        new passerby_npc_spawn_component_js_1.PasserbyNpcSpawnComponent(),
      );
    case "ModelComponent":
      return n(o, new model_component_js_1.ModelComponent());
    case "EntityBundleComponent":
      return n(o, new entity_bundle_component_js_1.EntityBundleComponent());
    case "BeamCastComponent":
      return n(o, new beam_cast_component_js_1.BeamCastComponent());
    case "BeamReceiveComponent":
      return n(o, new beam_receive_component_js_1.BeamReceiveComponent());
    case "TimeStopComponent":
      return n(o, new time_stop_component_js_1.TimeStopComponent());
    case "PortalComponent":
      return n(o, new portal_component_js_1.PortalComponent());
    case "NoRenderPortalComponent":
      return n(
        o,
        new no_render_portal_component_js_1.NoRenderPortalComponent(),
      );
    case "EffectAreaComponent":
      return n(o, new effect_area_component_js_1.EffectAreaComponent());
    case "PhysicsConstraintComponent":
      return n(
        o,
        new physics_constraint_component_js_1.PhysicsConstraintComponent(),
      );
    case "FollowShooterComponent":
      return n(o, new follow_shooter_component_js_1.FollowShooterComponent());
    case "ConnectorComponent":
      return n(o, new connector_component_js_1.ConnectorComponent());
    case "CharacterConnectorComponent":
      return n(
        o,
        new character_connector_component_js_1.CharacterConnectorComponent(),
      );
    case "HitComponent":
      return n(o, new hit_component_js_1.HitComponent());
    case "DynamicPortalCreatorComponent":
      return n(
        o,
        new dynamic_portal_creator_component_js_1.DynamicPortalCreatorComponent(),
      );
    case "AiGearStrategyComponent":
      return n(
        o,
        new ai_gear_strategy_component_js_1.AiGearStrategyComponent(),
      );
    case "PickInteractComponent":
      return n(o, new pick_interact_component_js_1.PickInteractComponent());
    case "ClientTriggerComponent":
      return n(o, new client_trigger_component_js_1.ClientTriggerComponent());
    case "LocationSafetyComponent":
      return n(o, new location_safety_component_js_1.LocationSafetyComponent());
    case "BatchBulletCasterComponent":
      return n(
        o,
        new batch_bullet_caster_component_js_1.BatchBulletCasterComponent(),
      );
    case "VehicleComponent":
      return n(o, new vehicle_component_js_1.VehicleComponent());
    case "EnrichmentAreaComponent":
      return n(o, new enrichment_area_component_js_1.EnrichmentAreaComponent());
    case "ChessmanComponent":
      return n(o, new chessman_component_js_1.ChessmanComponent());
    case "MonitorComponent":
      return n(o, new monitor_component_js_1.MonitorComponent());
    case "GroupAiComponent":
      return n(o, new group_ai_component_js_1.GroupAiComponent());
    case "InhalationAbilityComponent":
      return n(
        o,
        new inhalation_ability_component_js_1.InhalationAbilityComponent(),
      );
    case "InhaledItemComponent":
      return n(o, new inhaled_item_component_js_1.InhaledItemComponent());
    case "AirPassageComponent":
      return n(o, new air_passage_component_js_1.AirPassageComponent());
    case "RenderSpecifiedRangeComponent":
      return n(
        o,
        new render_specified_range_component_js_1.RenderSpecifiedRangeComponent(),
      );
    case "LevelPrefabPerformComponent":
      return n(
        o,
        new level_prefab_perform_component_js_1.LevelPrefabPerformComponent(),
      );
    case "SceneItemAiComponent":
      return n(o, new scene_item_ai_component_js_1.SceneItemAiComponent());
    case "GravityFlipComponent":
      return n(o, new gravity_flip_component_js_1.GravityFlipComponent());
    case "LevelSequenceFrameEventComponent":
      return n(
        o,
        new level_sequence_frame_event_component_js_1.LevelSequenceFrameEventComponent(),
      );
    case "LevelQteComponent":
      return n(o, new level_qte_component_js_1.LevelQteComponent());
    case "WalkingPatternComponent":
      return n(o, new walking_pattern_component_js_1.WalkingPatternComponent());
    case "LifePointCenterComponent":
      return n(
        o,
        new life_point_center_component_js_1.LifePointCenterComponent(),
      );
    case "HackManagementComponent":
      return n(o, new hack_management_component_js_1.HackManagementComponent());
    case "ClientConditionListenerComponent":
      return n(
        o,
        new client_condition_listener_component_js_1.ClientConditionListenerComponent(),
      );
    case "TemplateEntitySpawnerComponent":
      return n(
        o,
        new template_entity_spawner_component_js_1.TemplateEntitySpawnerComponent(),
      );
    case "WindSourceComponent":
      return n(o, new wind_source_component_js_1.WindSourceComponent());
    case "SlideRailComponent":
      return n(o, new slide_rail_component_js_1.SlideRailComponent());
    case "CurveControlComponent":
      return n(o, new curve_control_component_js_1.CurveControlComponent());
    case "EntityBatchRefreshComponent":
      return n(
        o,
        new entity_batch_refresh_component_js_1.EntityBatchRefreshComponent(),
      );
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.AirWallSpawnerComponent = 1)] = "AirWallSpawnerComponent"),
    (e[(e.ActorStateComponent = 2)] = "ActorStateComponent"),
    (e[(e.AiComponent = 3)] = "AiComponent"),
    (e[(e.LevelAIComponent = 4)] = "LevelAIComponent"),
    (e[(e.AttributeComponent = 5)] = "AttributeComponent"),
    (e[(e.BaseInfoComponent = 6)] = "BaseInfoComponent"),
    (e[(e.BehaviorFlowComponent = 7)] = "BehaviorFlowComponent"),
    (e[(e.CalculateComponent = 8)] = "CalculateComponent"),
    (e[(e.UnUseComponent = 9)] = "UnUseComponent"),
    (e[(e.EntityStateComponent = 10)] = "EntityStateComponent"),
    (e[(e.SceneItemAttributeComponent = 11)] = "SceneItemAttributeComponent"),
    (e[(e.FlowComponent = 12)] = "FlowComponent"),
    (e[(e.GrabComponent = 13)] = "GrabComponent"),
    (e[(e.InteractComponent = 14)] = "InteractComponent"),
    (e[(e.InteractiveComponent = 15)] = "InteractiveComponent"),
    (e[(e.MoveComponent = 16)] = "MoveComponent"),
    (e[(e.RefreshComponent = 17)] = "RefreshComponent"),
    (e[(e.RefreshGroupComponent = 18)] = "RefreshGroupComponent"),
    (e[(e.RefreshSingleComponent = 19)] = "RefreshSingleComponent"),
    (e[(e.RewardComponent = 20)] = "RewardComponent"),
    (e[(e.RotatorComponent = 21)] = "RotatorComponent"),
    (e[(e.RotatorComponent2 = 22)] = "RotatorComponent2"),
    (e[(e.SphereFactoryComponent = 23)] = "SphereFactoryComponent"),
    (e[(e.SpringComponent = 24)] = "SpringComponent"),
    (e[(e.SpawnMonsterComponent = 25)] = "SpawnMonsterComponent"),
    (e[(e.SwitcherComponent = 26)] = "SwitcherComponent"),
    (e[(e.TrampleUe5Component = 27)] = "TrampleUe5Component"),
    (e[(e.TreasureBoxComponent = 28)] = "TreasureBoxComponent"),
    (e[(e.TriggerUe5Component = 29)] = "TriggerUe5Component"),
    (e[(e.UndergroundComponent = 30)] = "UndergroundComponent"),
    (e[(e.VarComponent = 31)] = "VarComponent"),
    (e[(e.TriggerComponent = 32)] = "TriggerComponent"),
    (e[(e.HookLockPoint = 33)] = "HookLockPoint"),
    (e[(e.TargetGearComponent = 34)] = "TargetGearComponent"),
    (e[(e.TargetGearGroupComponent = 35)] = "TargetGearGroupComponent"),
    (e[(e.ItemFoundation = 36)] = "ItemFoundation"),
    (e[(e.ItemFoundation2 = 37)] = "ItemFoundation2"),
    (e[(e.PullingFoundation = 38)] = "PullingFoundation"),
    (e[(e.JigsawItem = 39)] = "JigsawItem"),
    (e[(e.JigsawFoundation = 40)] = "JigsawFoundation"),
    (e[(e.CollectComponent = 41)] = "CollectComponent"),
    (e[(e.TeleControl2 = 42)] = "TeleControl2"),
    (e[(e.DestructibleItem = 43)] = "DestructibleItem"),
    (e[(e.LevelPlayComponent = 44)] = "LevelPlayComponent"),
    (e[(e.VisionComponent = 45)] = "VisionComponent"),
    (e[(e.VisionCaptureComponent = 46)] = "VisionCaptureComponent"),
    (e[(e.ResetEntitiesPosComponent = 47)] = "ResetEntitiesPosComponent"),
    (e[(e.EntityGroupComponent = 48)] = "EntityGroupComponent"),
    (e[(e.AdsorbComponent = 49)] = "AdsorbComponent"),
    (e[(e.TeleportComponent = 50)] = "TeleportComponent"),
    (e[(e.TrampleComponent = 51)] = "TrampleComponent"),
    (e[(e.NpcPerformComponent = 52)] = "NpcPerformComponent"),
    (e[(e.InteractGearComponent = 53)] = "InteractGearComponent"),
    (e[(e.LiftComponent = 54)] = "LiftComponent"),
    (e[(e.FollowTrackComponent = 55)] = "FollowTrackComponent"),
    (e[(e.SceneItemLifeCycleComponent = 56)] = "SceneItemLifeCycleComponent"),
    (e[(e.BubbleComponent = 57)] = "BubbleComponent"),
    (e[(e.FightInteractComponent = 58)] = "FightInteractComponent"),
    (e[(e.NearbyTrackingComponent = 59)] = "NearbyTrackingComponent"),
    (e[(e.EntityPackageComponent = 60)] = "EntityPackageComponent"),
    (e[(e.SkyboxComponent = 61)] = "SkyboxComponent"),
    (e[(e.StateHintComponent = 62)] = "StateHintComponent"),
    (e[(e.EntityVisibleComponent = 63)] = "EntityVisibleComponent"),
    (e[(e.CombinedVisibleGroupComponent = 64)] =
      "CombinedVisibleGroupComponent"),
    (e[(e.WeaponComponent = 65)] = "WeaponComponent"),
    (e[(e.DungeonEntryComponent = 66)] = "DungeonEntryComponent"),
    (e[(e.ResurrectionComponent = 67)] = "ResurrectionComponent"),
    (e[(e.BuffProducerComponent = 68)] = "BuffProducerComponent"),
    (e[(e.BuffConsumerComponent = 69)] = "BuffConsumerComponent"),
    (e[(e.GuideLineCreatorComponent = 70)] = "GuideLineCreatorComponent"),
    (e[(e.InteractAudioComponent = 71)] = "InteractAudioComponent"),
    (e[(e.DropComponent = 72)] = "DropComponent"),
    (e[(e.AdviseItemComponent = 73)] = "AdviseItemComponent"),
    (e[(e.VisionItemComponent = 74)] = "VisionItemComponent"),
    (e[(e.MonsterComponent = 75)] = "MonsterComponent"),
    (e[(e.CombatComponent = 76)] = "CombatComponent"),
    (e[(e.EntityListComponent = 77)] = "EntityListComponent"),
    (e[(e.AnimalComponent = 78)] = "AnimalComponent"),
    (e[(e.EntityAudioComponent = 79)] = "EntityAudioComponent"),
    (e[(e.EntityStateAudioComponent = 80)] = "EntityStateAudioComponent"),
    (e[(e.EntityCustomAudioComponent = 81)] = "EntityCustomAudioComponent"),
    (e[(e.SceneItemMovementComponent = 82)] = "SceneItemMovementComponent"),
    (e[(e.RangeComponent = 83)] = "RangeComponent"),
    (e[(e.TimelineTrackControlComponent = 84)] =
      "TimelineTrackControlComponent"),
    (e[(e.SplineComponent = 85)] = "SplineComponent"),
    (e[(e.SceneActorRefComponent = 86)] = "SceneActorRefComponent"),
    (e[(e.EditCustomAoiComponent = 87)] = "EditCustomAoiComponent"),
    (e[(e.SceneBulletComponent = 88)] = "SceneBulletComponent"),
    (e[(e.TurntableControlComponent = 89)] = "TurntableControlComponent"),
    (e[(e.ConditionListenerComponent = 90)] = "ConditionListenerComponent"),
    (e[(e.AttachTargetComponent = 91)] = "AttachTargetComponent"),
    (e[(e.ReboundComponent = 92)] = "ReboundComponent"),
    (e[(e.LevitateMagnetComponent = 93)] = "LevitateMagnetComponent"),
    (e[(e.PhotoTargetComponent = 94)] = "PhotoTargetComponent"),
    (e[(e.AiAlertNotifyComponent = 95)] = "AiAlertNotifyComponent"),
    (e[(e.MonsterGachaItemComponent = 96)] = "MonsterGachaItemComponent"),
    (e[(e.MonsterGachaBaseComponent = 97)] = "MonsterGachaBaseComponent"),
    (e[(e.ProgressBarControlComponent = 98)] = "ProgressBarControlComponent"),
    (e[(e.ConveyorBeltComponent = 99)] = "ConveyorBeltComponent"),
    (e[(e.DynamicTeleportComponent = 100)] = "DynamicTeleportComponent"),
    (e[(e.ExploreSkillInteractComponent = 101)] =
      "ExploreSkillInteractComponent"),
    (e[(e.FanComponent = 102)] = "FanComponent"),
    (e[(e.ResetSelfPosComponent = 103)] = "ResetSelfPosComponent"),
    (e[(e.PasserbyNpcSpawnComponent = 104)] = "PasserbyNpcSpawnComponent"),
    (e[(e.ModelComponent = 105)] = "ModelComponent"),
    (e[(e.EntityBundleComponent = 106)] = "EntityBundleComponent"),
    (e[(e.BeamCastComponent = 107)] = "BeamCastComponent"),
    (e[(e.BeamReceiveComponent = 108)] = "BeamReceiveComponent"),
    (e[(e.TimeStopComponent = 109)] = "TimeStopComponent"),
    (e[(e.PortalComponent = 110)] = "PortalComponent"),
    (e[(e.NoRenderPortalComponent = 111)] = "NoRenderPortalComponent"),
    (e[(e.EffectAreaComponent = 112)] = "EffectAreaComponent"),
    (e[(e.PhysicsConstraintComponent = 113)] = "PhysicsConstraintComponent"),
    (e[(e.FollowShooterComponent = 114)] = "FollowShooterComponent"),
    (e[(e.ConnectorComponent = 115)] = "ConnectorComponent"),
    (e[(e.CharacterConnectorComponent = 116)] = "CharacterConnectorComponent"),
    (e[(e.HitComponent = 117)] = "HitComponent"),
    (e[(e.DynamicPortalCreatorComponent = 118)] =
      "DynamicPortalCreatorComponent"),
    (e[(e.AiGearStrategyComponent = 119)] = "AiGearStrategyComponent"),
    (e[(e.PickInteractComponent = 120)] = "PickInteractComponent"),
    (e[(e.ClientTriggerComponent = 121)] = "ClientTriggerComponent"),
    (e[(e.LocationSafetyComponent = 122)] = "LocationSafetyComponent"),
    (e[(e.BatchBulletCasterComponent = 123)] = "BatchBulletCasterComponent"),
    (e[(e.VehicleComponent = 124)] = "VehicleComponent"),
    (e[(e.EnrichmentAreaComponent = 125)] = "EnrichmentAreaComponent"),
    (e[(e.ChessmanComponent = 126)] = "ChessmanComponent"),
    (e[(e.MonitorComponent = 127)] = "MonitorComponent"),
    (e[(e.GroupAiComponent = 128)] = "GroupAiComponent"),
    (e[(e.InhalationAbilityComponent = 129)] = "InhalationAbilityComponent"),
    (e[(e.InhaledItemComponent = 130)] = "InhaledItemComponent"),
    (e[(e.AirPassageComponent = 131)] = "AirPassageComponent"),
    (e[(e.RenderSpecifiedRangeComponent = 132)] =
      "RenderSpecifiedRangeComponent"),
    (e[(e.LevelPrefabPerformComponent = 133)] = "LevelPrefabPerformComponent"),
    (e[(e.SceneItemAiComponent = 134)] = "SceneItemAiComponent"),
    (e[(e.GravityFlipComponent = 135)] = "GravityFlipComponent"),
    (e[(e.LevelSequenceFrameEventComponent = 136)] =
      "LevelSequenceFrameEventComponent"),
    (e[(e.LevelQteComponent = 137)] = "LevelQteComponent"),
    (e[(e.WalkingPatternComponent = 138)] = "WalkingPatternComponent"),
    (e[(e.LifePointCenterComponent = 139)] = "LifePointCenterComponent"),
    (e[(e.HackManagementComponent = 140)] = "HackManagementComponent"),
    (e[(e.ClientConditionListenerComponent = 141)] =
      "ClientConditionListenerComponent"),
    (e[(e.TemplateEntitySpawnerComponent = 142)] =
      "TemplateEntitySpawnerComponent"),
    (e[(e.WindSourceComponent = 143)] = "WindSourceComponent"),
    (e[(e.SlideRailComponent = 144)] = "SlideRailComponent"),
    (e[(e.CurveControlComponent = 145)] = "CurveControlComponent"),
    (e[(e.EntityBatchRefreshComponent = 146)] = "EntityBatchRefreshComponent");
})((UnionComponent = exports.UnionComponent || (exports.UnionComponent = {}))),
  (exports.unionToUnionComponent = unionToUnionComponent),
  (exports.unionListToUnionComponent = unionListToUnionComponent);
//# sourceMappingURL=union-component.js.map
