"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionCondition2 =
    exports.unionToUnionCondition2 =
    exports.UnionCondition2 =
      void 0);
const check_ai_state_js_1 = require("../fb-condition/check-ai-state.js"),
  check_alert_area_enabled_js_1 = require("../fb-condition/check-alert-area-enabled.js"),
  check_calabash_develop_reward_condition_js_1 = require("../fb-condition/check-calabash-develop-reward-condition.js"),
  check_certain_fishing_item_count_js_1 = require("../fb-condition/check-certain-fishing-item-count.js"),
  check_chess_winner_js_1 = require("../fb-condition/check-chess-winner.js"),
  check_child_quest_finished_js_1 = require("../fb-condition/check-child-quest-finished.js"),
  check_child_quest_status_js_1 = require("../fb-condition/check-child-quest-status.js"),
  check_client_event_js_1 = require("../fb-condition/check-client-event.js"),
  check_collect_animal_parts_js_1 = require("../fb-condition/check-collect-animal-parts.js"),
  check_current_role_js_1 = require("../fb-condition/check-current-role.js"),
  check_dango_cultivation_progress_js_1 = require("../fb-condition/check-dango-cultivation-progress.js"),
  check_data_layer_condition_js_1 = require("../fb-condition/check-data-layer-condition.js"),
  check_direction_condition_js_1 = require("../fb-condition/check-direction-condition.js"),
  check_dungeon_finish_js_1 = require("../fb-condition/check-dungeon-finish.js"),
  check_dungeon_has_save_config_js_1 = require("../fb-condition/check-dungeon-has-save-config.js"),
  check_entities_exist_js_1 = require("../fb-condition/check-entities-exist.js"),
  check_entity_distance_condition_js_1 = require("../fb-condition/check-entity-distance-condition.js"),
  check_entity_gravity_direction_js_1 = require("../fb-condition/check-entity-gravity-direction.js"),
  check_entity_has_scene_item_attribute_tag_js_1 = require("../fb-condition/check-entity-has-scene-item-attribute-tag.js"),
  check_entity_is_visibility_js_1 = require("../fb-condition/check-entity-is-visibility.js"),
  check_entity_locked_condition_js_1 = require("../fb-condition/check-entity-locked-condition.js"),
  check_entity_position_js_1 = require("../fb-condition/check-entity-position.js"),
  check_entity_reward_js_1 = require("../fb-condition/check-entity-reward.js"),
  check_finish_loading_js_1 = require("../fb-condition/check-finish-loading.js"),
  check_fishing_cage_filling_ratio_js_1 = require("../fb-condition/check-fishing-cage-filling-ratio.js"),
  check_fishing_point_has_fish_js_1 = require("../fb-condition/check-fishing-point-has-fish.js"),
  check_formation_role_info_condition_js_1 = require("../fb-condition/check-formation-role-info-condition.js"),
  check_gameplay_tag_condition_js_1 = require("../fb-condition/check-gameplay-tag-condition.js"),
  check_guest_character_js_1 = require("../fb-condition/check-guest-character.js"),
  check_hook_lock_point_condition_js_1 = require("../fb-condition/check-hook-lock-point-condition.js"),
  check_in_combat_js_1 = require("../fb-condition/check-in-combat.js"),
  check_in_range_condition_js_1 = require("../fb-condition/check-in-range-condition.js"),
  check_is_gramophone_playing_music_js_1 = require("../fb-condition/check-is-gramophone-playing-music.js"),
  check_items_js_1 = require("../fb-condition/check-items.js"),
  check_jigsaw_info_condition_js_1 = require("../fb-condition/check-jigsaw-info-condition.js"),
  check_level_play_complete_number_js_1 = require("../fb-condition/check-level-play-complete-number.js"),
  check_level_play_state_js_1 = require("../fb-condition/check-level-play-state.js"),
  check_lord_gym_finish_condition_js_1 = require("../fb-condition/check-lord-gym-finish-condition.js"),
  check_node_status_js_1 = require("../fb-condition/check-node-status.js"),
  check_player_can_join_activity_condition_js_1 = require("../fb-condition/check-player-can-join-activity-condition.js"),
  check_player_gender_js_1 = require("../fb-condition/check-player-gender.js"),
  check_player_position_js_1 = require("../fb-condition/check-player-position.js"),
  check_player_skill_ready_condition_js_1 = require("../fb-condition/check-player-skill-ready-condition.js"),
  check_player_state_restriction_condition_js_1 = require("../fb-condition/check-player-state-restriction-condition.js"),
  check_rogue_ability_select_condition_js_1 = require("../fb-condition/check-rogue-ability-select-condition.js"),
  check_sub_level_state_js_1 = require("../fb-condition/check-sub-level-state.js"),
  check_system_event_bvb_js_1 = require("../fb-condition/check-system-event-bvb.js"),
  check_system_function_js_1 = require("../fb-condition/check-system-function.js"),
  check_system_state_condition_js_1 = require("../fb-condition/check-system-state-condition.js"),
  check_target_attribute_condition_js_1 = require("../fb-condition/check-target-attribute-condition.js"),
  check_tele_control_state_js_1 = require("../fb-condition/check-tele-control-state.js"),
  check_treasure_been_claimed_condition_js_1 = require("../fb-condition/check-treasure-been-claimed-condition.js"),
  check_vehicle_condition_js_1 = require("../fb-condition/check-vehicle-condition.js"),
  compare_alert_value_js_1 = require("../fb-condition/compare-alert-value.js"),
  compare_calabash_level_condition_js_1 = require("../fb-condition/compare-calabash-level-condition.js"),
  compare_dungeon_id_js_1 = require("../fb-condition/compare-dungeon-id.js"),
  compare_entity_group_state_condition_js_1 = require("../fb-condition/compare-entity-group-state-condition.js"),
  compare_entity_self_state_condition_js_1 = require("../fb-condition/compare-entity-self-state-condition.js"),
  compare_entity_state_condition_js_1 = require("../fb-condition/compare-entity-state-condition.js"),
  compare_explore_level_condition_js_1 = require("../fb-condition/compare-explore-level-condition.js"),
  compare_fishing_boat_state_js_1 = require("../fb-condition/compare-fishing-boat-state.js"),
  compare_fishing_prestige_level_condition_js_1 = require("../fb-condition/compare-fishing-prestige-level-condition.js"),
  compare_fishing_tech_level_js_1 = require("../fb-condition/compare-fishing-tech-level.js"),
  compare_level_play_reward_state_condition_js_1 = require("../fb-condition/compare-level-play-reward-state-condition.js"),
  compare_lift_condition_js_1 = require("../fb-condition/compare-lift-condition.js"),
  compare_npc_perform_state_condition_js_1 = require("../fb-condition/compare-npc-perform-state-condition.js"),
  compare_player_motion_state_js_1 = require("../fb-condition/compare-player-motion-state.js"),
  compare_player_motion_state2_js_1 = require("../fb-condition/compare-player-motion-state2.js"),
  compare_player_num_in_dungeon_js_1 = require("../fb-condition/compare-player-num-in-dungeon.js"),
  compare_teammate_die_condition_js_1 = require("../fb-condition/compare-teammate-die-condition.js"),
  compare_time_period_js_1 = require("../fb-condition/compare-time-period.js"),
  compare_var_condition_js_1 = require("../fb-condition/compare-var-condition.js"),
  compare_weather_js_1 = require("../fb-condition/compare-weather.js"),
  complete_certain_fishing_entrust_js_1 = require("../fb-condition/complete-certain-fishing-entrust.js"),
  custom_json_condition_js_1 = require("../fb-condition/custom-json-condition.js"),
  has_buff_js_1 = require("../fb-condition/has-buff.js"),
  hour_to_hour_condition_js_1 = require("../fb-condition/hour-to-hour-condition.js"),
  listen_entity_self_event_condition_js_1 = require("../fb-condition/listen-entity-self-event-condition.js"),
  listen_entity_through_portal_js_1 = require("../fb-condition/listen-entity-through-portal.js"),
  quest_state_equal_condition_js_1 = require("../fb-condition/quest-state-equal-condition.js"),
  range_sphere_js_1 = require("../fb-condition/range-sphere.js");
var UnionCondition2;
function unionToUnionCondition2(e, n) {
  switch (UnionCondition2[e]) {
    case "NONE":
      return;
    case "CompareVarCondition":
      return n(new compare_var_condition_js_1.CompareVarCondition());
    case "QuestStateEqualCondition":
      return n(new quest_state_equal_condition_js_1.QuestStateEqualCondition());
    case "CompareExploreLevelCondition":
      return n(
        new compare_explore_level_condition_js_1.CompareExploreLevelCondition(),
      );
    case "CompareCalabashLevelCondition":
      return n(
        new compare_calabash_level_condition_js_1.CompareCalabashLevelCondition(),
      );
    case "CompareLiftCondition":
      return n(new compare_lift_condition_js_1.CompareLiftCondition());
    case "CompareEntityStateCondition":
      return n(
        new compare_entity_state_condition_js_1.CompareEntityStateCondition(),
      );
    case "CompareNpcPerformStateCondition":
      return n(
        new compare_npc_perform_state_condition_js_1.CompareNpcPerformStateCondition(),
      );
    case "CheckTreasureBeenClaimedCondition":
      return n(
        new check_treasure_been_claimed_condition_js_1.CheckTreasureBeenClaimedCondition(),
      );
    case "CompareEntityGroupStateCondition":
      return n(
        new compare_entity_group_state_condition_js_1.CompareEntityGroupStateCondition(),
      );
    case "CompareEntitySelfStateCondition":
      return n(
        new compare_entity_self_state_condition_js_1.CompareEntitySelfStateCondition(),
      );
    case "CompareLevelPlayRewardStateCondition":
      return n(
        new compare_level_play_reward_state_condition_js_1.CompareLevelPlayRewardStateCondition(),
      );
    case "HourToHourCondition":
      return n(new hour_to_hour_condition_js_1.HourToHourCondition());
    case "RangeSphere":
      return n(new range_sphere_js_1.RangeSphere());
    case "CheckItems":
      return n(new check_items_js_1.CheckItems());
    case "HasBuff":
      return n(new has_buff_js_1.HasBuff());
    case "CheckSystemFunction":
      return n(new check_system_function_js_1.CheckSystemFunction());
    case "CheckAiState":
      return n(new check_ai_state_js_1.CheckAiState());
    case "CompareDungeonId":
      return n(new compare_dungeon_id_js_1.CompareDungeonId());
    case "CompareTimePeriod":
      return n(new compare_time_period_js_1.CompareTimePeriod());
    case "CompareWeather":
      return n(new compare_weather_js_1.CompareWeather());
    case "CheckLevelPlayState":
      return n(new check_level_play_state_js_1.CheckLevelPlayState());
    case "CheckLevelPlayCompleteNumber":
      return n(
        new check_level_play_complete_number_js_1.CheckLevelPlayCompleteNumber(),
      );
    case "CheckCurrentRole":
      return n(new check_current_role_js_1.CheckCurrentRole());
    case "CheckPlayerGender":
      return n(new check_player_gender_js_1.CheckPlayerGender());
    case "CheckInCombat":
      return n(new check_in_combat_js_1.CheckInCombat());
    case "CheckChildQuestFinished":
      return n(new check_child_quest_finished_js_1.CheckChildQuestFinished());
    case "CheckNodeStatus":
      return n(new check_node_status_js_1.CheckNodeStatus());
    case "CheckChildQuestStatus":
      return n(new check_child_quest_status_js_1.CheckChildQuestStatus());
    case "CheckEntitiesExist":
      return n(new check_entities_exist_js_1.CheckEntitiesExist());
    case "CheckPlayerPosition":
      return n(new check_player_position_js_1.CheckPlayerPosition());
    case "CheckEntityPosition":
      return n(new check_entity_position_js_1.CheckEntityPosition());
    case "CheckDungeonFinish":
      return n(new check_dungeon_finish_js_1.CheckDungeonFinish());
    case "CheckEntityIsVisibility":
      return n(new check_entity_is_visibility_js_1.CheckEntityIsVisibility());
    case "ComparePlayerMotionState":
      return n(new compare_player_motion_state_js_1.ComparePlayerMotionState());
    case "ComparePlayerMotionState2":
      return n(
        new compare_player_motion_state2_js_1.ComparePlayerMotionState2(),
      );
    case "CheckDataLayerCondition":
      return n(new check_data_layer_condition_js_1.CheckDataLayerCondition());
    case "CheckHookLockPointCondition":
      return n(
        new check_hook_lock_point_condition_js_1.CheckHookLockPointCondition(),
      );
    case "CheckPlayerSkillReadyCondition":
      return n(
        new check_player_skill_ready_condition_js_1.CheckPlayerSkillReadyCondition(),
      );
    case "CheckPlayerStateRestrictionCondition":
      return n(
        new check_player_state_restriction_condition_js_1.CheckPlayerStateRestrictionCondition(),
      );
    case "CheckLordGymFinishCondition":
      return n(
        new check_lord_gym_finish_condition_js_1.CheckLordGymFinishCondition(),
      );
    case "CheckCalabashDevelopRewardCondition":
      return n(
        new check_calabash_develop_reward_condition_js_1.CheckCalabashDevelopRewardCondition(),
      );
    case "CompareFishingPrestigeLevelCondition":
      return n(
        new compare_fishing_prestige_level_condition_js_1.CompareFishingPrestigeLevelCondition(),
      );
    case "CheckCertainFishingItemCount":
      return n(
        new check_certain_fishing_item_count_js_1.CheckCertainFishingItemCount(),
      );
    case "CompleteCertainFishingEntrust":
      return n(
        new complete_certain_fishing_entrust_js_1.CompleteCertainFishingEntrust(),
      );
    case "CompareFishingBoatState":
      return n(new compare_fishing_boat_state_js_1.CompareFishingBoatState());
    case "CheckJigsawInfoCondition":
      return n(new check_jigsaw_info_condition_js_1.CheckJigsawInfoCondition());
    case "CheckGameplayTagCondition":
      return n(
        new check_gameplay_tag_condition_js_1.CheckGameplayTagCondition(),
      );
    case "CheckFormationRoleInfoCondition":
      return n(
        new check_formation_role_info_condition_js_1.CheckFormationRoleInfoCondition(),
      );
    case "CheckTargetAttributeCondition":
      return n(
        new check_target_attribute_condition_js_1.CheckTargetAttributeCondition(),
      );
    case "CheckRogueAbilitySelectCondition":
      return n(
        new check_rogue_ability_select_condition_js_1.CheckRogueAbilitySelectCondition(),
      );
    case "CheckDirectionCondition":
      return n(new check_direction_condition_js_1.CheckDirectionCondition());
    case "CheckPlayerCanJoinActivityCondition":
      return n(
        new check_player_can_join_activity_condition_js_1.CheckPlayerCanJoinActivityCondition(),
      );
    case "CheckSystemStateCondition":
      return n(
        new check_system_state_condition_js_1.CheckSystemStateCondition(),
      );
    case "CheckInRangeCondition":
      return n(new check_in_range_condition_js_1.CheckInRangeCondition());
    case "CheckEntityLockedCondition":
      return n(
        new check_entity_locked_condition_js_1.CheckEntityLockedCondition(),
      );
    case "CompareTeammateDieCondition":
      return n(
        new compare_teammate_die_condition_js_1.CompareTeammateDieCondition(),
      );
    case "ListenEntitySelfEventCondition":
      return n(
        new listen_entity_self_event_condition_js_1.ListenEntitySelfEventCondition(),
      );
    case "CheckEntityDistanceCondition":
      return n(
        new check_entity_distance_condition_js_1.CheckEntityDistanceCondition(),
      );
    case "CheckEntityHasSceneItemAttributeTag":
      return n(
        new check_entity_has_scene_item_attribute_tag_js_1.CheckEntityHasSceneItemAttributeTag(),
      );
    case "ListenEntityThroughPortal":
      return n(
        new listen_entity_through_portal_js_1.ListenEntityThroughPortal(),
      );
    case "CheckTeleControlState":
      return n(new check_tele_control_state_js_1.CheckTeleControlState());
    case "CustomJsonCondition":
      return n(new custom_json_condition_js_1.CustomJsonCondition());
    case "CheckChessWinner":
      return n(new check_chess_winner_js_1.CheckChessWinner());
    case "CheckVehicleCondition":
      return n(new check_vehicle_condition_js_1.CheckVehicleCondition());
    case "CompareAlertValue":
      return n(new compare_alert_value_js_1.CompareAlertValue());
    case "CheckEntityGravityDirection":
      return n(
        new check_entity_gravity_direction_js_1.CheckEntityGravityDirection(),
      );
    case "CheckCollectAnimalParts":
      return n(new check_collect_animal_parts_js_1.CheckCollectAnimalParts());
    case "CheckFinishLoading":
      return n(new check_finish_loading_js_1.CheckFinishLoading());
    case "CheckFishingPointHasFish":
      return n(
        new check_fishing_point_has_fish_js_1.CheckFishingPointHasFish(),
      );
    case "CheckFishingCageFillingRatio":
      return n(
        new check_fishing_cage_filling_ratio_js_1.CheckFishingCageFillingRatio(),
      );
    case "CompareFishingTechLevel":
      return n(new compare_fishing_tech_level_js_1.CompareFishingTechLevel());
    case "CheckGuestCharacter":
      return n(new check_guest_character_js_1.CheckGuestCharacter());
    case "CheckSubLevelState":
      return n(new check_sub_level_state_js_1.CheckSubLevelState());
    case "ComparePlayerNumInDungeon":
      return n(
        new compare_player_num_in_dungeon_js_1.ComparePlayerNumInDungeon(),
      );
    case "CheckAlertAreaEnabled":
      return n(new check_alert_area_enabled_js_1.CheckAlertAreaEnabled());
    case "CheckClientEvent":
      return n(new check_client_event_js_1.CheckClientEvent());
    case "CheckIsGramophonePlayingMusic":
      return n(
        new check_is_gramophone_playing_music_js_1.CheckIsGramophonePlayingMusic(),
      );
    case "CheckEntityReward":
      return n(new check_entity_reward_js_1.CheckEntityReward());
    case "CheckDungeonHasSaveConfig":
      return n(
        new check_dungeon_has_save_config_js_1.CheckDungeonHasSaveConfig(),
      );
    case "CheckSystemEventBvb":
      return n(new check_system_event_bvb_js_1.CheckSystemEventBvb());
    case "CheckDangoCultivationProgress":
      return n(
        new check_dango_cultivation_progress_js_1.CheckDangoCultivationProgress(),
      );
    default:
      return;
  }
}
function unionListToUnionCondition2(e, n, i) {
  switch (UnionCondition2[e]) {
    case "NONE":
      return;
    case "CompareVarCondition":
      return n(i, new compare_var_condition_js_1.CompareVarCondition());
    case "QuestStateEqualCondition":
      return n(
        i,
        new quest_state_equal_condition_js_1.QuestStateEqualCondition(),
      );
    case "CompareExploreLevelCondition":
      return n(
        i,
        new compare_explore_level_condition_js_1.CompareExploreLevelCondition(),
      );
    case "CompareCalabashLevelCondition":
      return n(
        i,
        new compare_calabash_level_condition_js_1.CompareCalabashLevelCondition(),
      );
    case "CompareLiftCondition":
      return n(i, new compare_lift_condition_js_1.CompareLiftCondition());
    case "CompareEntityStateCondition":
      return n(
        i,
        new compare_entity_state_condition_js_1.CompareEntityStateCondition(),
      );
    case "CompareNpcPerformStateCondition":
      return n(
        i,
        new compare_npc_perform_state_condition_js_1.CompareNpcPerformStateCondition(),
      );
    case "CheckTreasureBeenClaimedCondition":
      return n(
        i,
        new check_treasure_been_claimed_condition_js_1.CheckTreasureBeenClaimedCondition(),
      );
    case "CompareEntityGroupStateCondition":
      return n(
        i,
        new compare_entity_group_state_condition_js_1.CompareEntityGroupStateCondition(),
      );
    case "CompareEntitySelfStateCondition":
      return n(
        i,
        new compare_entity_self_state_condition_js_1.CompareEntitySelfStateCondition(),
      );
    case "CompareLevelPlayRewardStateCondition":
      return n(
        i,
        new compare_level_play_reward_state_condition_js_1.CompareLevelPlayRewardStateCondition(),
      );
    case "HourToHourCondition":
      return n(i, new hour_to_hour_condition_js_1.HourToHourCondition());
    case "RangeSphere":
      return n(i, new range_sphere_js_1.RangeSphere());
    case "CheckItems":
      return n(i, new check_items_js_1.CheckItems());
    case "HasBuff":
      return n(i, new has_buff_js_1.HasBuff());
    case "CheckSystemFunction":
      return n(i, new check_system_function_js_1.CheckSystemFunction());
    case "CheckAiState":
      return n(i, new check_ai_state_js_1.CheckAiState());
    case "CompareDungeonId":
      return n(i, new compare_dungeon_id_js_1.CompareDungeonId());
    case "CompareTimePeriod":
      return n(i, new compare_time_period_js_1.CompareTimePeriod());
    case "CompareWeather":
      return n(i, new compare_weather_js_1.CompareWeather());
    case "CheckLevelPlayState":
      return n(i, new check_level_play_state_js_1.CheckLevelPlayState());
    case "CheckLevelPlayCompleteNumber":
      return n(
        i,
        new check_level_play_complete_number_js_1.CheckLevelPlayCompleteNumber(),
      );
    case "CheckCurrentRole":
      return n(i, new check_current_role_js_1.CheckCurrentRole());
    case "CheckPlayerGender":
      return n(i, new check_player_gender_js_1.CheckPlayerGender());
    case "CheckInCombat":
      return n(i, new check_in_combat_js_1.CheckInCombat());
    case "CheckChildQuestFinished":
      return n(
        i,
        new check_child_quest_finished_js_1.CheckChildQuestFinished(),
      );
    case "CheckNodeStatus":
      return n(i, new check_node_status_js_1.CheckNodeStatus());
    case "CheckChildQuestStatus":
      return n(i, new check_child_quest_status_js_1.CheckChildQuestStatus());
    case "CheckEntitiesExist":
      return n(i, new check_entities_exist_js_1.CheckEntitiesExist());
    case "CheckPlayerPosition":
      return n(i, new check_player_position_js_1.CheckPlayerPosition());
    case "CheckEntityPosition":
      return n(i, new check_entity_position_js_1.CheckEntityPosition());
    case "CheckDungeonFinish":
      return n(i, new check_dungeon_finish_js_1.CheckDungeonFinish());
    case "CheckEntityIsVisibility":
      return n(
        i,
        new check_entity_is_visibility_js_1.CheckEntityIsVisibility(),
      );
    case "ComparePlayerMotionState":
      return n(
        i,
        new compare_player_motion_state_js_1.ComparePlayerMotionState(),
      );
    case "ComparePlayerMotionState2":
      return n(
        i,
        new compare_player_motion_state2_js_1.ComparePlayerMotionState2(),
      );
    case "CheckDataLayerCondition":
      return n(
        i,
        new check_data_layer_condition_js_1.CheckDataLayerCondition(),
      );
    case "CheckHookLockPointCondition":
      return n(
        i,
        new check_hook_lock_point_condition_js_1.CheckHookLockPointCondition(),
      );
    case "CheckPlayerSkillReadyCondition":
      return n(
        i,
        new check_player_skill_ready_condition_js_1.CheckPlayerSkillReadyCondition(),
      );
    case "CheckPlayerStateRestrictionCondition":
      return n(
        i,
        new check_player_state_restriction_condition_js_1.CheckPlayerStateRestrictionCondition(),
      );
    case "CheckLordGymFinishCondition":
      return n(
        i,
        new check_lord_gym_finish_condition_js_1.CheckLordGymFinishCondition(),
      );
    case "CheckCalabashDevelopRewardCondition":
      return n(
        i,
        new check_calabash_develop_reward_condition_js_1.CheckCalabashDevelopRewardCondition(),
      );
    case "CompareFishingPrestigeLevelCondition":
      return n(
        i,
        new compare_fishing_prestige_level_condition_js_1.CompareFishingPrestigeLevelCondition(),
      );
    case "CheckCertainFishingItemCount":
      return n(
        i,
        new check_certain_fishing_item_count_js_1.CheckCertainFishingItemCount(),
      );
    case "CompleteCertainFishingEntrust":
      return n(
        i,
        new complete_certain_fishing_entrust_js_1.CompleteCertainFishingEntrust(),
      );
    case "CompareFishingBoatState":
      return n(
        i,
        new compare_fishing_boat_state_js_1.CompareFishingBoatState(),
      );
    case "CheckJigsawInfoCondition":
      return n(
        i,
        new check_jigsaw_info_condition_js_1.CheckJigsawInfoCondition(),
      );
    case "CheckGameplayTagCondition":
      return n(
        i,
        new check_gameplay_tag_condition_js_1.CheckGameplayTagCondition(),
      );
    case "CheckFormationRoleInfoCondition":
      return n(
        i,
        new check_formation_role_info_condition_js_1.CheckFormationRoleInfoCondition(),
      );
    case "CheckTargetAttributeCondition":
      return n(
        i,
        new check_target_attribute_condition_js_1.CheckTargetAttributeCondition(),
      );
    case "CheckRogueAbilitySelectCondition":
      return n(
        i,
        new check_rogue_ability_select_condition_js_1.CheckRogueAbilitySelectCondition(),
      );
    case "CheckDirectionCondition":
      return n(i, new check_direction_condition_js_1.CheckDirectionCondition());
    case "CheckPlayerCanJoinActivityCondition":
      return n(
        i,
        new check_player_can_join_activity_condition_js_1.CheckPlayerCanJoinActivityCondition(),
      );
    case "CheckSystemStateCondition":
      return n(
        i,
        new check_system_state_condition_js_1.CheckSystemStateCondition(),
      );
    case "CheckInRangeCondition":
      return n(i, new check_in_range_condition_js_1.CheckInRangeCondition());
    case "CheckEntityLockedCondition":
      return n(
        i,
        new check_entity_locked_condition_js_1.CheckEntityLockedCondition(),
      );
    case "CompareTeammateDieCondition":
      return n(
        i,
        new compare_teammate_die_condition_js_1.CompareTeammateDieCondition(),
      );
    case "ListenEntitySelfEventCondition":
      return n(
        i,
        new listen_entity_self_event_condition_js_1.ListenEntitySelfEventCondition(),
      );
    case "CheckEntityDistanceCondition":
      return n(
        i,
        new check_entity_distance_condition_js_1.CheckEntityDistanceCondition(),
      );
    case "CheckEntityHasSceneItemAttributeTag":
      return n(
        i,
        new check_entity_has_scene_item_attribute_tag_js_1.CheckEntityHasSceneItemAttributeTag(),
      );
    case "ListenEntityThroughPortal":
      return n(
        i,
        new listen_entity_through_portal_js_1.ListenEntityThroughPortal(),
      );
    case "CheckTeleControlState":
      return n(i, new check_tele_control_state_js_1.CheckTeleControlState());
    case "CustomJsonCondition":
      return n(i, new custom_json_condition_js_1.CustomJsonCondition());
    case "CheckChessWinner":
      return n(i, new check_chess_winner_js_1.CheckChessWinner());
    case "CheckVehicleCondition":
      return n(i, new check_vehicle_condition_js_1.CheckVehicleCondition());
    case "CompareAlertValue":
      return n(i, new compare_alert_value_js_1.CompareAlertValue());
    case "CheckEntityGravityDirection":
      return n(
        i,
        new check_entity_gravity_direction_js_1.CheckEntityGravityDirection(),
      );
    case "CheckCollectAnimalParts":
      return n(
        i,
        new check_collect_animal_parts_js_1.CheckCollectAnimalParts(),
      );
    case "CheckFinishLoading":
      return n(i, new check_finish_loading_js_1.CheckFinishLoading());
    case "CheckFishingPointHasFish":
      return n(
        i,
        new check_fishing_point_has_fish_js_1.CheckFishingPointHasFish(),
      );
    case "CheckFishingCageFillingRatio":
      return n(
        i,
        new check_fishing_cage_filling_ratio_js_1.CheckFishingCageFillingRatio(),
      );
    case "CompareFishingTechLevel":
      return n(
        i,
        new compare_fishing_tech_level_js_1.CompareFishingTechLevel(),
      );
    case "CheckGuestCharacter":
      return n(i, new check_guest_character_js_1.CheckGuestCharacter());
    case "CheckSubLevelState":
      return n(i, new check_sub_level_state_js_1.CheckSubLevelState());
    case "ComparePlayerNumInDungeon":
      return n(
        i,
        new compare_player_num_in_dungeon_js_1.ComparePlayerNumInDungeon(),
      );
    case "CheckAlertAreaEnabled":
      return n(i, new check_alert_area_enabled_js_1.CheckAlertAreaEnabled());
    case "CheckClientEvent":
      return n(i, new check_client_event_js_1.CheckClientEvent());
    case "CheckIsGramophonePlayingMusic":
      return n(
        i,
        new check_is_gramophone_playing_music_js_1.CheckIsGramophonePlayingMusic(),
      );
    case "CheckEntityReward":
      return n(i, new check_entity_reward_js_1.CheckEntityReward());
    case "CheckDungeonHasSaveConfig":
      return n(
        i,
        new check_dungeon_has_save_config_js_1.CheckDungeonHasSaveConfig(),
      );
    case "CheckSystemEventBvb":
      return n(i, new check_system_event_bvb_js_1.CheckSystemEventBvb());
    case "CheckDangoCultivationProgress":
      return n(
        i,
        new check_dango_cultivation_progress_js_1.CheckDangoCultivationProgress(),
      );
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.CompareVarCondition = 1)] = "CompareVarCondition"),
    (e[(e.QuestStateEqualCondition = 2)] = "QuestStateEqualCondition"),
    (e[(e.CompareExploreLevelCondition = 3)] = "CompareExploreLevelCondition"),
    (e[(e.CompareCalabashLevelCondition = 4)] =
      "CompareCalabashLevelCondition"),
    (e[(e.CompareLiftCondition = 5)] = "CompareLiftCondition"),
    (e[(e.CompareEntityStateCondition = 6)] = "CompareEntityStateCondition"),
    (e[(e.CompareNpcPerformStateCondition = 7)] =
      "CompareNpcPerformStateCondition"),
    (e[(e.CheckTreasureBeenClaimedCondition = 8)] =
      "CheckTreasureBeenClaimedCondition"),
    (e[(e.CompareEntityGroupStateCondition = 9)] =
      "CompareEntityGroupStateCondition"),
    (e[(e.CompareEntitySelfStateCondition = 10)] =
      "CompareEntitySelfStateCondition"),
    (e[(e.CompareLevelPlayRewardStateCondition = 11)] =
      "CompareLevelPlayRewardStateCondition"),
    (e[(e.HourToHourCondition = 12)] = "HourToHourCondition"),
    (e[(e.RangeSphere = 13)] = "RangeSphere"),
    (e[(e.CheckItems = 14)] = "CheckItems"),
    (e[(e.HasBuff = 15)] = "HasBuff"),
    (e[(e.CheckSystemFunction = 16)] = "CheckSystemFunction"),
    (e[(e.CheckAiState = 17)] = "CheckAiState"),
    (e[(e.CompareDungeonId = 18)] = "CompareDungeonId"),
    (e[(e.CompareTimePeriod = 19)] = "CompareTimePeriod"),
    (e[(e.CompareWeather = 20)] = "CompareWeather"),
    (e[(e.CheckLevelPlayState = 21)] = "CheckLevelPlayState"),
    (e[(e.CheckLevelPlayCompleteNumber = 22)] = "CheckLevelPlayCompleteNumber"),
    (e[(e.CheckCurrentRole = 23)] = "CheckCurrentRole"),
    (e[(e.CheckPlayerGender = 24)] = "CheckPlayerGender"),
    (e[(e.CheckInCombat = 25)] = "CheckInCombat"),
    (e[(e.CheckChildQuestFinished = 26)] = "CheckChildQuestFinished"),
    (e[(e.CheckNodeStatus = 27)] = "CheckNodeStatus"),
    (e[(e.CheckChildQuestStatus = 28)] = "CheckChildQuestStatus"),
    (e[(e.CheckEntitiesExist = 29)] = "CheckEntitiesExist"),
    (e[(e.CheckPlayerPosition = 30)] = "CheckPlayerPosition"),
    (e[(e.CheckEntityPosition = 31)] = "CheckEntityPosition"),
    (e[(e.CheckDungeonFinish = 32)] = "CheckDungeonFinish"),
    (e[(e.CheckEntityIsVisibility = 33)] = "CheckEntityIsVisibility"),
    (e[(e.ComparePlayerMotionState = 34)] = "ComparePlayerMotionState"),
    (e[(e.ComparePlayerMotionState2 = 35)] = "ComparePlayerMotionState2"),
    (e[(e.CheckDataLayerCondition = 36)] = "CheckDataLayerCondition"),
    (e[(e.CheckHookLockPointCondition = 37)] = "CheckHookLockPointCondition"),
    (e[(e.CheckPlayerSkillReadyCondition = 38)] =
      "CheckPlayerSkillReadyCondition"),
    (e[(e.CheckPlayerStateRestrictionCondition = 39)] =
      "CheckPlayerStateRestrictionCondition"),
    (e[(e.CheckLordGymFinishCondition = 40)] = "CheckLordGymFinishCondition"),
    (e[(e.CheckCalabashDevelopRewardCondition = 41)] =
      "CheckCalabashDevelopRewardCondition"),
    (e[(e.CompareFishingPrestigeLevelCondition = 42)] =
      "CompareFishingPrestigeLevelCondition"),
    (e[(e.CheckCertainFishingItemCount = 43)] = "CheckCertainFishingItemCount"),
    (e[(e.CompleteCertainFishingEntrust = 44)] =
      "CompleteCertainFishingEntrust"),
    (e[(e.CompareFishingBoatState = 45)] = "CompareFishingBoatState"),
    (e[(e.CheckJigsawInfoCondition = 46)] = "CheckJigsawInfoCondition"),
    (e[(e.CheckGameplayTagCondition = 47)] = "CheckGameplayTagCondition"),
    (e[(e.CheckFormationRoleInfoCondition = 48)] =
      "CheckFormationRoleInfoCondition"),
    (e[(e.CheckTargetAttributeCondition = 49)] =
      "CheckTargetAttributeCondition"),
    (e[(e.CheckRogueAbilitySelectCondition = 50)] =
      "CheckRogueAbilitySelectCondition"),
    (e[(e.CheckDirectionCondition = 51)] = "CheckDirectionCondition"),
    (e[(e.CheckPlayerCanJoinActivityCondition = 52)] =
      "CheckPlayerCanJoinActivityCondition"),
    (e[(e.CheckSystemStateCondition = 53)] = "CheckSystemStateCondition"),
    (e[(e.CheckInRangeCondition = 54)] = "CheckInRangeCondition"),
    (e[(e.CheckEntityLockedCondition = 55)] = "CheckEntityLockedCondition"),
    (e[(e.CompareTeammateDieCondition = 56)] = "CompareTeammateDieCondition"),
    (e[(e.ListenEntitySelfEventCondition = 57)] =
      "ListenEntitySelfEventCondition"),
    (e[(e.CheckEntityDistanceCondition = 58)] = "CheckEntityDistanceCondition"),
    (e[(e.CheckEntityHasSceneItemAttributeTag = 59)] =
      "CheckEntityHasSceneItemAttributeTag"),
    (e[(e.ListenEntityThroughPortal = 60)] = "ListenEntityThroughPortal"),
    (e[(e.CheckTeleControlState = 61)] = "CheckTeleControlState"),
    (e[(e.CustomJsonCondition = 62)] = "CustomJsonCondition"),
    (e[(e.CheckChessWinner = 63)] = "CheckChessWinner"),
    (e[(e.CheckVehicleCondition = 64)] = "CheckVehicleCondition"),
    (e[(e.CompareAlertValue = 65)] = "CompareAlertValue"),
    (e[(e.CheckEntityGravityDirection = 66)] = "CheckEntityGravityDirection"),
    (e[(e.CheckCollectAnimalParts = 67)] = "CheckCollectAnimalParts"),
    (e[(e.CheckFinishLoading = 68)] = "CheckFinishLoading"),
    (e[(e.CheckFishingPointHasFish = 69)] = "CheckFishingPointHasFish"),
    (e[(e.CheckFishingCageFillingRatio = 70)] = "CheckFishingCageFillingRatio"),
    (e[(e.CompareFishingTechLevel = 71)] = "CompareFishingTechLevel"),
    (e[(e.CheckGuestCharacter = 72)] = "CheckGuestCharacter"),
    (e[(e.CheckSubLevelState = 73)] = "CheckSubLevelState"),
    (e[(e.ComparePlayerNumInDungeon = 74)] = "ComparePlayerNumInDungeon"),
    (e[(e.CheckAlertAreaEnabled = 75)] = "CheckAlertAreaEnabled"),
    (e[(e.CheckClientEvent = 76)] = "CheckClientEvent"),
    (e[(e.CheckIsGramophonePlayingMusic = 77)] =
      "CheckIsGramophonePlayingMusic"),
    (e[(e.CheckEntityReward = 78)] = "CheckEntityReward"),
    (e[(e.CheckDungeonHasSaveConfig = 79)] = "CheckDungeonHasSaveConfig"),
    (e[(e.CheckSystemEventBvb = 80)] = "CheckSystemEventBvb"),
    (e[(e.CheckDangoCultivationProgress = 81)] =
      "CheckDangoCultivationProgress");
})(
  (UnionCondition2 = exports.UnionCondition2 || (exports.UnionCondition2 = {})),
),
  (exports.unionToUnionCondition2 = unionToUnionCondition2),
  (exports.unionListToUnionCondition2 = unionListToUnionCondition2);
//# sourceMappingURL=union-condition2.js.map
