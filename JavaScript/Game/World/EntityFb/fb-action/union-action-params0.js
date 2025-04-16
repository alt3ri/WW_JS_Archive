"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionActionParams0 =
    exports.unionToUnionActionParams0 =
    exports.UnionActionParams0 =
      void 0);
const accept_current_quest_js_1 = require("../fb-action/accept-current-quest.js"),
  accept_fishing_entrust_js_1 = require("../fb-action/accept-fishing-entrust.js"),
  activate_reset_point_js_1 = require("../fb-action/activate-reset-point.js"),
  active_anti_gravity_safe_point_js_1 = require("../fb-action/active-anti-gravity-safe-point.js"),
  add_buff_to_entity_js_1 = require("../fb-action/add-buff-to-entity.js"),
  add_buff_to_follow_shooter_js_1 = require("../fb-action/add-buff-to-follow-shooter.js"),
  add_buff_to_player_js_1 = require("../fb-action/add-buff-to-player.js"),
  add_buff_to_triggered_entity_js_1 = require("../fb-action/add-buff-to-triggered-entity.js"),
  add_flow_interact_option_js_1 = require("../fb-action/add-flow-interact-option.js"),
  add_guest_character_js_1 = require("../fb-action/add-guest-character.js"),
  add_play_bubble_js_1 = require("../fb-action/add-play-bubble.js"),
  add_trial_character_js_1 = require("../fb-action/add-trial-character.js"),
  add_trial_follow_shooter_js_1 = require("../fb-action/add-trial-follow-shooter.js"),
  adjust_player_camera_js_1 = require("../fb-action/adjust-player-camera.js"),
  adjust_tod_time_js_1 = require("../fb-action/adjust-tod-time.js"),
  awake_entity_js_1 = require("../fb-action/awake-entity.js"),
  begin_flow_template_js_1 = require("../fb-action/begin-flow-template.js"),
  bvb_send_system_event_js_1 = require("../fb-action/bvb-send-system-event.js"),
  calculate_var_js_1 = require("../fb-action/calculate-var.js"),
  call_by_condition_js_1 = require("../fb-action/call-by-condition.js"),
  call_function_js_1 = require("../fb-action/call-function.js"),
  camera_look_at_js_1 = require("../fb-action/camera-look-at.js"),
  change_actor_state_js_1 = require("../fb-action/change-actor-state.js"),
  change_actor_talker_js_1 = require("../fb-action/change-actor-talker.js"),
  change_behavior_state_js_1 = require("../fb-action/change-behavior-state.js"),
  change_entity_camp_js_1 = require("../fb-action/change-entity-camp.js"),
  change_entity_prefab_performance_js_1 = require("../fb-action/change-entity-prefab-performance.js"),
  change_entity_state_js_1 = require("../fb-action/change-entity-state.js"),
  change_fight_team_js_1 = require("../fb-action/change-fight-team.js"),
  change_flow_template_js_1 = require("../fb-action/change-flow-template.js"),
  change_interact_option_text_js_1 = require("../fb-action/change-interact-option-text.js"),
  change_lift_target_js_1 = require("../fb-action/change-lift-target.js"),
  change_npc_perform_state_js_1 = require("../fb-action/change-npc-perform-state.js"),
  change_other_state_js_1 = require("../fb-action/change-other-state.js"),
  change_phantom_js_1 = require("../fb-action/change-phantom.js"),
  change_phantom_formation_js_1 = require("../fb-action/change-phantom-formation.js"),
  change_random_state_js_1 = require("../fb-action/change-random-state.js"),
  change_self_entity_state_js_1 = require("../fb-action/change-self-entity-state.js"),
  change_state_js_1 = require("../fb-action/change-state.js"),
  change_team_position_js_1 = require("../fb-action/change-team-position.js"),
  change_timer_js_1 = require("../fb-action/change-timer.js"),
  character_look_at_js_1 = require("../fb-action/character-look-at.js"),
  character_move_to_point_js_1 = require("../fb-action/character-move-to-point.js"),
  claim_dungeon_reward_js_1 = require("../fb-action/claim-dungeon-reward.js"),
  claim_level_play_reward_js_1 = require("../fb-action/claim-level-play-reward.js"),
  clear_entity_visible_tag_js_1 = require("../fb-action/clear-entity-visible-tag.js"),
  clear_fishing_cabin_in_sale_items_js_1 = require("../fb-action/clear-fishing-cabin-in-sale-items.js"),
  clear_play_bubble_js_1 = require("../fb-action/clear-play-bubble.js"),
  client_pre_enable_sub_levels_js_1 = require("../fb-action/client-pre-enable-sub-levels.js"),
  client_set_player_pos_js_1 = require("../fb-action/client-set-player-pos.js"),
  close_flow_template_js_1 = require("../fb-action/close-flow-template.js"),
  collect_js_1 = require("../fb-action/collect.js"),
  common_tip_js_1 = require("../fb-action/common-tip.js"),
  common_tip2_js_1 = require("../fb-action/common-tip2.js"),
  complete_child_quest_js_1 = require("../fb-action/complete-child-quest.js"),
  complete_guide_js_1 = require("../fb-action/complete-guide.js"),
  create_prefab_js_1 = require("../fb-action/create-prefab.js"),
  custom_json_js_1 = require("../fb-action/custom-json.js"),
  dango_abyss_activate_portal_js_1 = require("../fb-action/dango-abyss-activate-portal.js"),
  dango_abyss_create_reward_treasure_box_js_1 = require("../fb-action/dango-abyss-create-reward-treasure-box.js"),
  dango_abyss_goto_next_floor_js_1 = require("../fb-action/dango-abyss-goto-next-floor.js"),
  dango_abyss_receive_reward_js_1 = require("../fb-action/dango-abyss-receive-reward.js"),
  destroy_js_1 = require("../fb-action/destroy.js"),
  destroy_all_child_js_1 = require("../fb-action/destroy-all-child.js"),
  destroy_entity_js_1 = require("../fb-action/destroy-entity.js"),
  destroy_fishing_boat_js_1 = require("../fb-action/destroy-fishing-boat.js"),
  destroy_prefab_js_1 = require("../fb-action/destroy-prefab.js"),
  destroy_quest_js_1 = require("../fb-action/destroy-quest.js"),
  destroy_quest_item_js_1 = require("../fb-action/destroy-quest-item.js"),
  destroy_self_js_1 = require("../fb-action/destroy-self.js"),
  detect_trigger_js_1 = require("../fb-action/detect-trigger.js"),
  do_calculate_js_1 = require("../fb-action/do-calculate.js"),
  enable_ai_js_1 = require("../fb-action/enable-ai.js"),
  enable_actor_js_1 = require("../fb-action/enable-actor.js"),
  enable_aoi_notify_js_1 = require("../fb-action/enable-aoi-notify.js"),
  enable_function_js_1 = require("../fb-action/enable-function.js"),
  enable_hostility_js_1 = require("../fb-action/enable-hostility.js"),
  enable_level_play_js_1 = require("../fb-action/enable-level-play.js"),
  enable_nearby_tracking_js_1 = require("../fb-action/enable-nearby-tracking.js"),
  enable_spline_move_model_js_1 = require("../fb-action/enable-spline-move-model.js"),
  enable_system_js_1 = require("../fb-action/enable-system.js"),
  enable_temporary_teleport_js_1 = require("../fb-action/enable-temporary-teleport.js"),
  end_flow_template_js_1 = require("../fb-action/end-flow-template.js"),
  enter_npc_vehicle_js_1 = require("../fb-action/enter-npc-vehicle.js"),
  enter_orbital_camera_js_1 = require("../fb-action/enter-orbital-camera.js"),
  entity_look_at_js_1 = require("../fb-action/entity-look-at.js"),
  entity_turn_to_js_1 = require("../fb-action/entity-turn-to.js"),
  exec_alert_system_action_js_1 = require("../fb-action/exec-alert-system-action.js"),
  exec_battle_action_js_1 = require("../fb-action/exec-battle-action.js"),
  exit_dungeon_js_1 = require("../fb-action/exit-dungeon.js"),
  exit_orbital_camera_js_1 = require("../fb-action/exit-orbital-camera.js"),
  face_to_pos_js_1 = require("../fb-action/face-to-pos.js"),
  fade_in_screen_js_1 = require("../fb-action/fade-in-screen.js"),
  fade_out_screen_js_1 = require("../fb-action/fade-out-screen.js"),
  finish_condition_js_1 = require("../fb-action/finish-condition.js"),
  finish_do_interact_js_1 = require("../fb-action/finish-do-interact.js"),
  finish_dungeon_js_1 = require("../fb-action/finish-dungeon.js"),
  finish_state_js_1 = require("../fb-action/finish-state.js"),
  finish_talk_js_1 = require("../fb-action/finish-talk.js"),
  fire_bullet_js_1 = require("../fb-action/fire-bullet.js"),
  fire_bullet_effect_js_1 = require("../fb-action/fire-bullet-effect.js"),
  fix_foundation_relation_js_1 = require("../fb-action/fix-foundation-relation.js"),
  fix_show_target_range_js_1 = require("../fb-action/fix-show-target-range.js"),
  fix_tele_controller_pos_js_1 = require("../fb-action/fix-tele-controller-pos.js"),
  focus_on_map_mark_js_1 = require("../fb-action/focus-on-map-mark.js"),
  force_occupations_js_1 = require("../fb-action/force-occupations.js"),
  get_item_js_1 = require("../fb-action/get-item.js"),
  get_reward_by_interact_js_1 = require("../fb-action/get-reward-by-interact.js"),
  guest_operate_ui_animation_js_1 = require("../fb-action/guest-operate-ui-animation.js"),
  guide_trigger_js_1 = require("../fb-action/guide-trigger.js"),
  hide_by_range_in_flow_js_1 = require("../fb-action/hide-by-range-in-flow.js"),
  interact_js_1 = require("../fb-action/interact.js"),
  interlude_actions_js_1 = require("../fb-action/interlude-actions.js"),
  invoke_js_1 = require("../fb-action/invoke.js"),
  item_foundation_match_js_1 = require("../fb-action/item-foundation-match.js"),
  jump_talk_js_1 = require("../fb-action/jump-talk.js"),
  leisure_interact_js_1 = require("../fb-action/leisure-interact.js"),
  limit_player_operation_js_1 = require("../fb-action/limit-player-operation.js"),
  lock_entity_js_1 = require("../fb-action/lock-entity.js"),
  log_js_1 = require("../fb-action/log.js"),
  manual_occupations_js_1 = require("../fb-action/manual-occupations.js"),
  modify_actor_material_js_1 = require("../fb-action/modify-actor-material.js"),
  modify_scene_item_attribute_tag_js_1 = require("../fb-action/modify-scene-item-attribute-tag.js"),
  move_scene_item_js_1 = require("../fb-action/move-scene-item.js"),
  move_to_pos_a_js_1 = require("../fb-action/move-to-pos-a.js"),
  move_with_spline_js_1 = require("../fb-action/move-with-spline.js"),
  new_move_with_spline_js_1 = require("../fb-action/new-move-with-spline.js"),
  npc_leisure_interact_js_1 = require("../fb-action/npc-leisure-interact.js"),
  open_qte_action_js_1 = require("../fb-action/open-qte-action.js"),
  open_simple_gameplay_js_1 = require("../fb-action/open-simple-gameplay.js"),
  open_system_board_js_1 = require("../fb-action/open-system-board.js"),
  open_system_function_js_1 = require("../fb-action/open-system-function.js"),
  play_bubble_js_1 = require("../fb-action/play-bubble.js"),
  play_common_effect_js_1 = require("../fb-action/play-common-effect.js"),
  play_custom_sequence_js_1 = require("../fb-action/play-custom-sequence.js"),
  play_dynamic_settlement_js_1 = require("../fb-action/play-dynamic-settlement.js"),
  play_effect_js_1 = require("../fb-action/play-effect.js"),
  play_flow_js_1 = require("../fb-action/play-flow.js"),
  play_level_sequence_js_1 = require("../fb-action/play-level-sequence.js"),
  play_montage_js_1 = require("../fb-action/play-montage.js"),
  play_movie_js_1 = require("../fb-action/play-movie.js"),
  play_registered_montage_js_1 = require("../fb-action/play-registered-montage.js"),
  play_sequence_data_js_1 = require("../fb-action/play-sequence-data.js"),
  player_input_js_1 = require("../fb-action/player-input.js"),
  player_look_at_js_1 = require("../fb-action/player-look-at.js"),
  post_ak_event_js_1 = require("../fb-action/post-ak-event.js"),
  preload_action_js_1 = require("../fb-action/preload-action.js"),
  prompt_js_1 = require("../fb-action/prompt.js"),
  prompt_quest_chapter_ui_js_1 = require("../fb-action/prompt-quest-chapter-ui.js"),
  random_var_js_1 = require("../fb-action/random-var.js"),
  record_dungeon_event_js_1 = require("../fb-action/record-dungeon-event.js"),
  recover_durability_js_1 = require("../fb-action/recover-durability.js"),
  remove_buff_from_entity_js_1 = require("../fb-action/remove-buff-from-entity.js"),
  remove_buff_from_player_js_1 = require("../fb-action/remove-buff-from-player.js"),
  remove_buff_to_triggered_entity_js_1 = require("../fb-action/remove-buff-to-triggered-entity.js"),
  remove_flow_interact_option_js_1 = require("../fb-action/remove-flow-interact-option.js"),
  remove_guest_character_js_1 = require("../fb-action/remove-guest-character.js"),
  remove_preload_resource_action_js_1 = require("../fb-action/remove-preload-resource-action.js"),
  remove_trial_character_js_1 = require("../fb-action/remove-trial-character.js"),
  remove_trial_follow_shooter_js_1 = require("../fb-action/remove-trial-follow-shooter.js"),
  reset_entity_js_1 = require("../fb-action/reset-entity.js"),
  reset_entity_pos_js_1 = require("../fb-action/reset-entity-pos.js"),
  reset_level_play_js_1 = require("../fb-action/reset-level-play.js"),
  reset_player_camera_focus_js_1 = require("../fb-action/reset-player-camera-focus.js"),
  restore_phantom_js_1 = require("../fb-action/restore-phantom.js"),
  restore_phantom_formation_js_1 = require("../fb-action/restore-phantom-formation.js"),
  restore_player_camera_adjustment_js_1 = require("../fb-action/restore-player-camera-adjustment.js"),
  rogue_activate_portal_js_1 = require("../fb-action/rogue-activate-portal.js"),
  rogue_goto_next_floor_js_1 = require("../fb-action/rogue-goto-next-floor.js"),
  rogue_receive_reward_js_1 = require("../fb-action/rogue-receive-reward.js"),
  rogue_select_room_js_1 = require("../fb-action/rogue-select-room.js"),
  rotator_entity_js_1 = require("../fb-action/rotator-entity.js"),
  run_actions_js_1 = require("../fb-action/run-actions.js"),
  send_ai_event_js_1 = require("../fb-action/send-ai-event.js"),
  send_npc_mail_js_1 = require("../fb-action/send-npc-mail.js"),
  server_force_enable_level_play_js_1 = require("../fb-action/server-force-enable-level-play.js"),
  server_set_player_pos_js_1 = require("../fb-action/server-set-player-pos.js"),
  set_area_state_js_1 = require("../fb-action/set-area-state.js"),
  set_area_time_state_js_1 = require("../fb-action/set-area-time-state.js"),
  set_battle_state_js_1 = require("../fb-action/set-battle-state.js"),
  set_behavior_is_paused_js_1 = require("../fb-action/set-behavior-is-paused.js"),
  set_camera_anim_js_1 = require("../fb-action/set-camera-anim.js"),
  set_camera_mode_js_1 = require("../fb-action/set-camera-mode.js"),
  set_entity_client_visible_js_1 = require("../fb-action/set-entity-client-visible.js"),
  set_entity_client_visible_save_js_1 = require("../fb-action/set-entity-client-visible-save.js"),
  set_entity_pos_js_1 = require("../fb-action/set-entity-pos.js"),
  set_entity_visible_js_1 = require("../fb-action/set-entity-visible.js"),
  set_explore_state_js_1 = require("../fb-action/set-explore-state.js"),
  set_flow_template_js_1 = require("../fb-action/set-flow-template.js"),
  set_force_lock_js_1 = require("../fb-action/set-force-lock.js"),
  set_head_icon_visible_js_1 = require("../fb-action/set-head-icon-visible.js"),
  set_interaction_lock_state_js_1 = require("../fb-action/set-interaction-lock-state.js"),
  set_jigsaw_foundation_js_1 = require("../fb-action/set-jigsaw-foundation.js"),
  set_jigsaw_item_js_1 = require("../fb-action/set-jigsaw-item.js"),
  set_move_speed_js_1 = require("../fb-action/set-move-speed.js"),
  set_number_var_js_1 = require("../fb-action/set-number-var.js"),
  set_player_move_control_js_1 = require("../fb-action/set-player-move-control.js"),
  set_player_operation_restriction_js_1 = require("../fb-action/set-player-operation-restriction.js"),
  set_player_pos_js_1 = require("../fb-action/set-player-pos.js"),
  set_plot_mode_js_1 = require("../fb-action/set-plot-mode.js"),
  set_pos_a_js_1 = require("../fb-action/set-pos-a.js"),
  set_region_config_js_1 = require("../fb-action/set-region-config.js"),
  set_revive_region_js_1 = require("../fb-action/set-revive-region.js"),
  set_spine_animation_js_1 = require("../fb-action/set-spine-animation.js"),
  set_sports_state_js_1 = require("../fb-action/set-sports-state.js"),
  set_tele_control_js_1 = require("../fb-action/set-tele-control.js"),
  set_time_lock_state_js_1 = require("../fb-action/set-time-lock-state.js"),
  set_time_scale_js_1 = require("../fb-action/set-time-scale.js"),
  set_var_js_1 = require("../fb-action/set-var.js"),
  set_weather_js_1 = require("../fb-action/set-weather.js"),
  set_weather_lock_state_js_1 = require("../fb-action/set-weather-lock-state.js"),
  set_wu_yin_qu_state_js_1 = require("../fb-action/set-wu-yin-qu-state.js"),
  settlement_dungeon_js_1 = require("../fb-action/settlement-dungeon.js"),
  show_center_text_js_1 = require("../fb-action/show-center-text.js"),
  show_message_js_1 = require("../fb-action/show-message.js"),
  show_talk_js_1 = require("../fb-action/show-talk.js"),
  simple_move_js_1 = require("../fb-action/simple-move.js"),
  slide_rail_start_js_1 = require("../fb-action/slide-rail-start.js"),
  spawn_child_js_1 = require("../fb-action/spawn-child.js"),
  spawn_entity_js_1 = require("../fb-action/spawn-entity.js"),
  start_flow_template_js_1 = require("../fb-action/start-flow-template.js"),
  stop_camera_look_at_js_1 = require("../fb-action/stop-camera-look-at.js"),
  stop_new_move_with_spline_js_1 = require("../fb-action/stop-new-move-with-spline.js"),
  stop_scene_item_move_js_1 = require("../fb-action/stop-scene-item-move.js"),
  switch_data_layers_js_1 = require("../fb-action/switch-data-layers.js"),
  switch_sub_levels_js_1 = require("../fb-action/switch-sub-levels.js"),
  sync_var_to_actor_state_js_1 = require("../fb-action/sync-var-to-actor-state.js"),
  take_plot_photo_js_1 = require("../fb-action/take-plot-photo.js"),
  teleport_dungeon_js_1 = require("../fb-action/teleport-dungeon.js"),
  teleport_dungeon_pos_js_1 = require("../fb-action/teleport-dungeon-pos.js"),
  teleport_to_and_enter_vehicle_js_1 = require("../fb-action/teleport-to-and-enter-vehicle.js"),
  teleport_to_latest_reset_point_js_1 = require("../fb-action/teleport-to-latest-reset-point.js"),
  teleport_vehicle_js_1 = require("../fb-action/teleport-vehicle.js"),
  toggle_air_wall_js_1 = require("../fb-action/toggle-air-wall.js"),
  toggle_highlight_explore_ui_js_1 = require("../fb-action/toggle-highlight-explore-ui.js"),
  toggle_map_mark_state_js_1 = require("../fb-action/toggle-map-mark-state.js"),
  toggle_scan_spline_effect_js_1 = require("../fb-action/toggle-scan-spline-effect.js"),
  toggle_timer_pause_state_js_1 = require("../fb-action/toggle-timer-pause-state.js"),
  trace_spline_js_1 = require("../fb-action/trace-spline.js"),
  trigger_camera_shake_js_1 = require("../fb-action/trigger-camera-shake.js"),
  un_limit_player_operation_js_1 = require("../fb-action/un-limit-player-operation.js"),
  unlock_dungeon_entry_js_1 = require("../fb-action/unlock-dungeon-entry.js"),
  unlock_entity_js_1 = require("../fb-action/unlock-entity.js"),
  unlock_system_item_js_1 = require("../fb-action/unlock-system-item.js"),
  unlock_teleport_trigger_js_1 = require("../fb-action/unlock-teleport-trigger.js"),
  use_phantom_skill_js_1 = require("../fb-action/use-phantom-skill.js"),
  vehicle_enter_js_1 = require("../fb-action/vehicle-enter.js"),
  vehicle_exit_npc_js_1 = require("../fb-action/vehicle-exit-npc.js"),
  vehicle_exit_player_js_1 = require("../fb-action/vehicle-exit-player.js"),
  vehicle_move_with_path_line_js_1 = require("../fb-action/vehicle-move-with-path-line.js"),
  vehicle_play_passenger_voice_js_1 = require("../fb-action/vehicle-play-passenger-voice.js"),
  vehicle_sprint_js_1 = require("../fb-action/vehicle-sprint.js"),
  vehicle_waterfall_climbing_js_1 = require("../fb-action/vehicle-waterfall-climbing.js"),
  wait_js_1 = require("../fb-action/wait.js"),
  wait_battle_condition_js_1 = require("../fb-action/wait-battle-condition.js");
var UnionActionParams0;
function unionToUnionActionParams0(e, t) {
  switch (UnionActionParams0[e]) {
    case "NONE":
      return;
    case "Interact":
      return t(new interact_js_1.Interact());
    case "AcceptCurrentQuest":
      return t(new accept_current_quest_js_1.AcceptCurrentQuest());
    case "AddFlowInteractOption":
      return t(new add_flow_interact_option_js_1.AddFlowInteractOption());
    case "AdjustTodTime":
      return t(new adjust_tod_time_js_1.AdjustTodTime());
    case "AwakeEntity":
      return t(new awake_entity_js_1.AwakeEntity());
    case "CalculateVar":
      return t(new calculate_var_js_1.CalculateVar());
    case "RandomVar":
      return t(new random_var_js_1.RandomVar());
    case "CallByCondition":
      return t(new call_by_condition_js_1.CallByCondition());
    case "CallFunction":
      return t(new call_function_js_1.CallFunction());
    case "CameraLookAt":
      return t(new camera_look_at_js_1.CameraLookAt());
    case "StopCameraLookAt":
      return t(new stop_camera_look_at_js_1.StopCameraLookAt());
    case "EnableHostility":
      return t(new enable_hostility_js_1.EnableHostility());
    case "ChangeActorState":
      return t(new change_actor_state_js_1.ChangeActorState());
    case "ChangeBehaviorState":
      return t(new change_behavior_state_js_1.ChangeBehaviorState());
    case "ChangeEntityState":
      return t(new change_entity_state_js_1.ChangeEntityState());
    case "ChangeNpcPerformState":
      return t(new change_npc_perform_state_js_1.ChangeNpcPerformState());
    case "ChangeInteractOptionText":
      return t(new change_interact_option_text_js_1.ChangeInteractOptionText());
    case "ChangeOtherState":
      return t(new change_other_state_js_1.ChangeOtherState());
    case "ChangeRandomState":
      return t(new change_random_state_js_1.ChangeRandomState());
    case "ChangeState":
      return t(new change_state_js_1.ChangeState());
    case "Collect":
      return t(new collect_js_1.Collect());
    case "CompleteChildQuest":
      return t(new complete_child_quest_js_1.CompleteChildQuest());
    case "Destroy":
      return t(new destroy_js_1.Destroy());
    case "DestroyAllChild":
      return t(new destroy_all_child_js_1.DestroyAllChild());
    case "DestroyEntity":
      return t(new destroy_entity_js_1.DestroyEntity());
    case "DestroySelf":
      return t(new destroy_self_js_1.DestroySelf());
    case "DoCalculate":
      return t(new do_calculate_js_1.DoCalculate());
    case "EnableFunction":
      return t(new enable_function_js_1.EnableFunction());
    case "FaceToPos":
      return t(new face_to_pos_js_1.FaceToPos());
    case "FinishDoInteract":
      return t(new finish_do_interact_js_1.FinishDoInteract());
    case "FinishState":
      return t(new finish_state_js_1.FinishState());
    case "FinishTalk":
      return t(new finish_talk_js_1.FinishTalk());
    case "GetItem":
      return t(new get_item_js_1.GetItem());
    case "DestroyQuestItem":
      return t(new destroy_quest_item_js_1.DestroyQuestItem());
    case "GuideTrigger":
      return t(new guide_trigger_js_1.GuideTrigger());
    case "CompleteGuide":
      return t(new complete_guide_js_1.CompleteGuide());
    case "Invoke":
      return t(new invoke_js_1.Invoke());
    case "JumpTalk":
      return t(new jump_talk_js_1.JumpTalk());
    case "Log":
      return t(new log_js_1.Log());
    case "MoveToPosA":
      return t(new move_to_pos_a_js_1.MoveToPosA());
    case "MoveWithSpline":
      return t(new move_with_spline_js_1.MoveWithSpline());
    case "NewMoveWithSpline":
      return t(new new_move_with_spline_js_1.NewMoveWithSpline());
    case "StopNewMoveWithSpline":
      return t(new stop_new_move_with_spline_js_1.StopNewMoveWithSpline());
    case "CharacterMoveToPoint":
      return t(new character_move_to_point_js_1.CharacterMoveToPoint());
    case "OpenSystemBoard":
      return t(new open_system_board_js_1.OpenSystemBoard());
    case "OpenSystemFunction":
      return t(new open_system_function_js_1.OpenSystemFunction());
    case "PlayCustomSequence":
      return t(new play_custom_sequence_js_1.PlayCustomSequence());
    case "PlayerLookAt":
      return t(new player_look_at_js_1.PlayerLookAt());
    case "EntityLookAt":
      return t(new entity_look_at_js_1.EntityLookAt());
    case "CharacterLookAt":
      return t(new character_look_at_js_1.CharacterLookAt());
    case "EntityTurnTo":
      return t(new entity_turn_to_js_1.EntityTurnTo());
    case "PlayFlow":
      return t(new play_flow_js_1.PlayFlow());
    case "PlayMovie":
      return t(new play_movie_js_1.PlayMovie());
    case "PlayEffect":
      return t(new play_effect_js_1.PlayEffect());
    case "PlayCommonEffect":
      return t(new play_common_effect_js_1.PlayCommonEffect());
    case "PlayMontage":
      return t(new play_montage_js_1.PlayMontage());
    case "PlaySequenceData":
      return t(new play_sequence_data_js_1.PlaySequenceData());
    case "PlayerInput":
      return t(new player_input_js_1.PlayerInput());
    case "Prompt":
      return t(new prompt_js_1.Prompt());
    case "AddPlayBubble":
      return t(new add_play_bubble_js_1.AddPlayBubble());
    case "PlayBubble":
      return t(new play_bubble_js_1.PlayBubble());
    case "ClearPlayBubble":
      return t(new clear_play_bubble_js_1.ClearPlayBubble());
    case "EnableAI":
      return t(new enable_ai_js_1.EnableAI());
    case "RemoveFlowInteractOption":
      return t(new remove_flow_interact_option_js_1.RemoveFlowInteractOption());
    case "SendNpcMail":
      return t(new send_npc_mail_js_1.SendNpcMail());
    case "SetBehaviorIsPaused":
      return t(new set_behavior_is_paused_js_1.SetBehaviorIsPaused());
    case "SetCameraMode":
      return t(new set_camera_mode_js_1.SetCameraMode());
    case "SetEntityVisible":
      return t(new set_entity_visible_js_1.SetEntityVisible());
    case "SetEntityClientVisible":
      return t(new set_entity_client_visible_js_1.SetEntityClientVisible());
    case "SetEntityClientVisibleSave":
      return t(
        new set_entity_client_visible_save_js_1.SetEntityClientVisibleSave(),
      );
    case "SetHeadIconVisible":
      return t(new set_head_icon_visible_js_1.SetHeadIconVisible());
    case "SetMoveSpeed":
      return t(new set_move_speed_js_1.SetMoveSpeed());
    case "SetNumberVar":
      return t(new set_number_var_js_1.SetNumberVar());
    case "SetPlotMode":
      return t(new set_plot_mode_js_1.SetPlotMode());
    case "SetPosA":
      return t(new set_pos_a_js_1.SetPosA());
    case "SetVar":
      return t(new set_var_js_1.SetVar());
    case "ShowCenterText":
      return t(new show_center_text_js_1.ShowCenterText());
    case "ShowMessage":
      return t(new show_message_js_1.ShowMessage());
    case "ShowTalk":
      return t(new show_talk_js_1.ShowTalk());
    case "SimpleMove":
      return t(new simple_move_js_1.SimpleMove());
    case "SpawnChild":
      return t(new spawn_child_js_1.SpawnChild());
    case "SpawnEntity":
      return t(new spawn_entity_js_1.SpawnEntity());
    case "SyncVarToActorState":
      return t(new sync_var_to_actor_state_js_1.SyncVarToActorState());
    case "Wait":
      return t(new wait_js_1.Wait());
    case "AddBuffToEntity":
      return t(new add_buff_to_entity_js_1.AddBuffToEntity());
    case "AddBuffToPlayer":
      return t(new add_buff_to_player_js_1.AddBuffToPlayer());
    case "AddBuffToFollowShooter":
      return t(new add_buff_to_follow_shooter_js_1.AddBuffToFollowShooter());
    case "LockEntity":
      return t(new lock_entity_js_1.LockEntity());
    case "UnlockEntity":
      return t(new unlock_entity_js_1.UnlockEntity());
    case "SetForceLock":
      return t(new set_force_lock_js_1.SetForceLock());
    case "SetAreaState":
      return t(new set_area_state_js_1.SetAreaState());
    case "SetWuYinQuState":
      return t(new set_wu_yin_qu_state_js_1.SetWuYinQuState());
    case "RemoveBuffFromEntity":
      return t(new remove_buff_from_entity_js_1.RemoveBuffFromEntity());
    case "RemoveBuffFromPlayer":
      return t(new remove_buff_from_player_js_1.RemoveBuffFromPlayer());
    case "SetPlayerMoveControl":
      return t(new set_player_move_control_js_1.SetPlayerMoveControl());
    case "UnlockTeleportTrigger":
      return t(new unlock_teleport_trigger_js_1.UnlockTeleportTrigger());
    case "ChangeTeamPosition":
      return t(new change_team_position_js_1.ChangeTeamPosition());
    case "ClaimLevelPlayReward":
      return t(new claim_level_play_reward_js_1.ClaimLevelPlayReward());
    case "SetReviveRegion":
      return t(new set_revive_region_js_1.SetReviveRegion());
    case "PromptQuestChapterUI":
      return t(new prompt_quest_chapter_ui_js_1.PromptQuestChapterUI());
    case "FireBullet":
      return t(new fire_bullet_js_1.FireBullet());
    case "FireBulletEffect":
      return t(new fire_bullet_effect_js_1.FireBulletEffect());
    case "SetPlayerPos":
      return t(new set_player_pos_js_1.SetPlayerPos());
    case "ClientSetPlayerPos":
      return t(new client_set_player_pos_js_1.ClientSetPlayerPos());
    case "ClientPreEnableSubLevels":
      return t(
        new client_pre_enable_sub_levels_js_1.ClientPreEnableSubLevels(),
      );
    case "ChangeSelfEntityState":
      return t(new change_self_entity_state_js_1.ChangeSelfEntityState());
    case "InterludeActions":
      return t(new interlude_actions_js_1.InterludeActions());
    case "AddBuffToTriggeredEntity":
      return t(
        new add_buff_to_triggered_entity_js_1.AddBuffToTriggeredEntity(),
      );
    case "RemoveBuffToTriggeredEntity":
      return t(
        new remove_buff_to_triggered_entity_js_1.RemoveBuffToTriggeredEntity(),
      );
    case "DetectTrigger":
      return t(new detect_trigger_js_1.DetectTrigger());
    case "ItemFoundationMatch":
      return t(new item_foundation_match_js_1.ItemFoundationMatch());
    case "SetBattleState":
      return t(new set_battle_state_js_1.SetBattleState());
    case "ExecBattleAction":
      return t(new exec_battle_action_js_1.ExecBattleAction());
    case "WaitBattleCondition":
      return t(new wait_battle_condition_js_1.WaitBattleCondition());
    case "UnlockSystemItem":
      return t(new unlock_system_item_js_1.UnlockSystemItem());
    case "RunActions":
      return t(new run_actions_js_1.RunActions());
    case "CommonTip":
      return t(new common_tip_js_1.CommonTip());
    case "CommonTip2":
      return t(new common_tip2_js_1.CommonTip2());
    case "EnableNearbyTracking":
      return t(new enable_nearby_tracking_js_1.EnableNearbyTracking());
    case "EnableLevelPlay":
      return t(new enable_level_play_js_1.EnableLevelPlay());
    case "UnLimitPlayerOperation":
      return t(new un_limit_player_operation_js_1.UnLimitPlayerOperation());
    case "LimitPlayerOperation":
      return t(new limit_player_operation_js_1.LimitPlayerOperation());
    case "SetPlayerOperationRestriction":
      return t(
        new set_player_operation_restriction_js_1.SetPlayerOperationRestriction(),
      );
    case "LeisureInteract":
      return t(new leisure_interact_js_1.LeisureInteract());
    case "NpcLeisureInteract":
      return t(new npc_leisure_interact_js_1.NpcLeisureInteract());
    case "ChangePhantom":
      return t(new change_phantom_js_1.ChangePhantom());
    case "RestorePhantom":
      return t(new restore_phantom_js_1.RestorePhantom());
    case "TakePlotPhoto":
      return t(new take_plot_photo_js_1.TakePlotPhoto());
    case "OpenQteAction":
      return t(new open_qte_action_js_1.OpenQteAction());
    case "PreloadAction":
      return t(new preload_action_js_1.PreloadAction());
    case "RemovePreloadResourceAction":
      return t(
        new remove_preload_resource_action_js_1.RemovePreloadResourceAction(),
      );
    case "ExecAlertSystemAction":
      return t(new exec_alert_system_action_js_1.ExecAlertSystemAction());
    case "ChangeEntityCamp":
      return t(new change_entity_camp_js_1.ChangeEntityCamp());
    case "RecordDungeonEvent":
      return t(new record_dungeon_event_js_1.RecordDungeonEvent());
    case "ResetLevelPlay":
      return t(new reset_level_play_js_1.ResetLevelPlay());
    case "GetRewardByInteract":
      return t(new get_reward_by_interact_js_1.GetRewardByInteract());
    case "GuestOperateUiAnimation":
      return t(new guest_operate_ui_animation_js_1.GuestOperateUiAnimation());
    case "VehicleEnter":
      return t(new vehicle_enter_js_1.VehicleEnter());
    case "EnterNpcVehicle":
      return t(new enter_npc_vehicle_js_1.EnterNpcVehicle());
    case "VehicleExitPlayer":
      return t(new vehicle_exit_player_js_1.VehicleExitPlayer());
    case "VehicleExitNpc":
      return t(new vehicle_exit_npc_js_1.VehicleExitNpc());
    case "TeleportVehicle":
      return t(new teleport_vehicle_js_1.TeleportVehicle());
    case "VehiclePlayPassengerVoice":
      return t(
        new vehicle_play_passenger_voice_js_1.VehiclePlayPassengerVoice(),
      );
    case "VehicleWaterfallClimbing":
      return t(new vehicle_waterfall_climbing_js_1.VehicleWaterfallClimbing());
    case "TeleportToAndEnterVehicle":
      return t(
        new teleport_to_and_enter_vehicle_js_1.TeleportToAndEnterVehicle(),
      );
    case "VehicleMoveWithPathLine":
      return t(new vehicle_move_with_path_line_js_1.VehicleMoveWithPathLine());
    case "VehicleSprint":
      return t(new vehicle_sprint_js_1.VehicleSprint());
    case "SetAreaTimeState":
      return t(new set_area_time_state_js_1.SetAreaTimeState());
    case "SlideRailStart":
      return t(new slide_rail_start_js_1.SlideRailStart());
    case "BvbSendSystemEvent":
      return t(new bvb_send_system_event_js_1.BvbSendSystemEvent());
    case "TeleportDungeon":
      return t(new teleport_dungeon_js_1.TeleportDungeon());
    case "SettlementDungeon":
      return t(new settlement_dungeon_js_1.SettlementDungeon());
    case "ClaimDungeonReward":
      return t(new claim_dungeon_reward_js_1.ClaimDungeonReward());
    case "ExitDungeon":
      return t(new exit_dungeon_js_1.ExitDungeon());
    case "UnlockDungeonEntry":
      return t(new unlock_dungeon_entry_js_1.UnlockDungeonEntry());
    case "FinishDungeon":
      return t(new finish_dungeon_js_1.FinishDungeon());
    case "StartFlowTemplate":
      return t(new start_flow_template_js_1.StartFlowTemplate());
    case "BeginFlowTemplate":
      return t(new begin_flow_template_js_1.BeginFlowTemplate());
    case "ChangeFlowTemplate":
      return t(new change_flow_template_js_1.ChangeFlowTemplate());
    case "SetFlowTemplate":
      return t(new set_flow_template_js_1.SetFlowTemplate());
    case "EndFlowTemplate":
      return t(new end_flow_template_js_1.EndFlowTemplate());
    case "CloseFlowTemplate":
      return t(new close_flow_template_js_1.CloseFlowTemplate());
    case "SendAiEvent":
      return t(new send_ai_event_js_1.SendAiEvent());
    case "FadeInScreen":
      return t(new fade_in_screen_js_1.FadeInScreen());
    case "FadeOutScreen":
      return t(new fade_out_screen_js_1.FadeOutScreen());
    case "ChangeFightTeam":
      return t(new change_fight_team_js_1.ChangeFightTeam());
    case "ManualOccupations":
      return t(new manual_occupations_js_1.ManualOccupations());
    case "AddTrialCharacter":
      return t(new add_trial_character_js_1.AddTrialCharacter());
    case "RemoveTrialCharacter":
      return t(new remove_trial_character_js_1.RemoveTrialCharacter());
    case "AddGuestCharacter":
      return t(new add_guest_character_js_1.AddGuestCharacter());
    case "RemoveGuestCharacter":
      return t(new remove_guest_character_js_1.RemoveGuestCharacter());
    case "AddTrialFollowShooter":
      return t(new add_trial_follow_shooter_js_1.AddTrialFollowShooter());
    case "RemoveTrialFollowShooter":
      return t(new remove_trial_follow_shooter_js_1.RemoveTrialFollowShooter());
    case "DestroyQuest":
      return t(new destroy_quest_js_1.DestroyQuest());
    case "SetCameraAnim":
      return t(new set_camera_anim_js_1.SetCameraAnim());
    case "RotatorEntity":
      return t(new rotator_entity_js_1.RotatorEntity());
    case "TraceSpline":
      return t(new trace_spline_js_1.TraceSpline());
    case "ToggleScanSplineEffect":
      return t(new toggle_scan_spline_effect_js_1.ToggleScanSplineEffect());
    case "ChangeTimer":
      return t(new change_timer_js_1.ChangeTimer());
    case "ToggleTimerPauseState":
      return t(new toggle_timer_pause_state_js_1.ToggleTimerPauseState());
    case "EnableSystem":
      return t(new enable_system_js_1.EnableSystem());
    case "PostAkEvent":
      return t(new post_ak_event_js_1.PostAkEvent());
    case "MoveSceneItem":
      return t(new move_scene_item_js_1.MoveSceneItem());
    case "StopSceneItemMove":
      return t(new stop_scene_item_move_js_1.StopSceneItemMove());
    case "ChangeLiftTarget":
      return t(new change_lift_target_js_1.ChangeLiftTarget());
    case "HideByRangeInFlow":
      return t(new hide_by_range_in_flow_js_1.HideByRangeInFlow());
    case "OpenSimpleGameplay":
      return t(new open_simple_gameplay_js_1.OpenSimpleGameplay());
    case "ChangeActorTalker":
      return t(new change_actor_talker_js_1.ChangeActorTalker());
    case "SwitchSubLevels":
      return t(new switch_sub_levels_js_1.SwitchSubLevels());
    case "SwitchDataLayers":
      return t(new switch_data_layers_js_1.SwitchDataLayers());
    case "ActivateResetPoint":
      return t(new activate_reset_point_js_1.ActivateResetPoint());
    case "TeleportToLatestResetPoint":
      return t(
        new teleport_to_latest_reset_point_js_1.TeleportToLatestResetPoint(),
      );
    case "SetWeather":
      return t(new set_weather_js_1.SetWeather());
    case "SetTimeLockState":
      return t(new set_time_lock_state_js_1.SetTimeLockState());
    case "SetWeatherLockState":
      return t(new set_weather_lock_state_js_1.SetWeatherLockState());
    case "AdjustPlayerCamera":
      return t(new adjust_player_camera_js_1.AdjustPlayerCamera());
    case "RestorePlayerCameraAdjustment":
      return t(
        new restore_player_camera_adjustment_js_1.RestorePlayerCameraAdjustment(),
      );
    case "ResetPlayerCameraFocus":
      return t(new reset_player_camera_focus_js_1.ResetPlayerCameraFocus());
    case "UsePhantomSkill":
      return t(new use_phantom_skill_js_1.UsePhantomSkill());
    case "ChangePhantomFormation":
      return t(new change_phantom_formation_js_1.ChangePhantomFormation());
    case "RestorePhantomFormation":
      return t(new restore_phantom_formation_js_1.RestorePhantomFormation());
    case "EnterOrbitalCamera":
      return t(new enter_orbital_camera_js_1.EnterOrbitalCamera());
    case "ExitOrbitalCamera":
      return t(new exit_orbital_camera_js_1.ExitOrbitalCamera());
    case "EnableSplineMoveModel":
      return t(new enable_spline_move_model_js_1.EnableSplineMoveModel());
    case "SetSportsState":
      return t(new set_sports_state_js_1.SetSportsState());
    case "PlayLevelSequence":
      return t(new play_level_sequence_js_1.PlayLevelSequence());
    case "SetExploreState":
      return t(new set_explore_state_js_1.SetExploreState());
    case "RogueGotoNextFloor":
      return t(new rogue_goto_next_floor_js_1.RogueGotoNextFloor());
    case "RogueSelectRoom":
      return t(new rogue_select_room_js_1.RogueSelectRoom());
    case "RogueActivatePortal":
      return t(new rogue_activate_portal_js_1.RogueActivatePortal());
    case "RogueReceiveReward":
      return t(new rogue_receive_reward_js_1.RogueReceiveReward());
    case "EnableAoiNotify":
      return t(new enable_aoi_notify_js_1.EnableAoiNotify());
    case "ChangeEntityPrefabPerformance":
      return t(
        new change_entity_prefab_performance_js_1.ChangeEntityPrefabPerformance(),
      );
    case "ModifySceneItemAttributeTag":
      return t(
        new modify_scene_item_attribute_tag_js_1.ModifySceneItemAttributeTag(),
      );
    case "ToggleMapMarkState":
      return t(new toggle_map_mark_state_js_1.ToggleMapMarkState());
    case "FocusOnMapMark":
      return t(new focus_on_map_mark_js_1.FocusOnMapMark());
    case "EnableTemporaryTeleport":
      return t(new enable_temporary_teleport_js_1.EnableTemporaryTeleport());
    case "SetTeleControl":
      return t(new set_tele_control_js_1.SetTeleControl());
    case "ActiveAntiGravitySafePoint":
      return t(
        new active_anti_gravity_safe_point_js_1.ActiveAntiGravitySafePoint(),
      );
    case "ClearFishingCabinInSaleItems":
      return t(
        new clear_fishing_cabin_in_sale_items_js_1.ClearFishingCabinInSaleItems(),
      );
    case "AcceptFishingEntrust":
      return t(new accept_fishing_entrust_js_1.AcceptFishingEntrust());
    case "DestroyFishingBoat":
      return t(new destroy_fishing_boat_js_1.DestroyFishingBoat());
    case "SetSpineAnimation":
      return t(new set_spine_animation_js_1.SetSpineAnimation());
    case "DangoAbyssActivatePortal":
      return t(new dango_abyss_activate_portal_js_1.DangoAbyssActivatePortal());
    case "DangoAbyssGotoNextFloor":
      return t(new dango_abyss_goto_next_floor_js_1.DangoAbyssGotoNextFloor());
    case "DangoAbyssCreateRewardTreasureBox":
      return t(
        new dango_abyss_create_reward_treasure_box_js_1.DangoAbyssCreateRewardTreasureBox(),
      );
    case "DangoAbyssReceiveReward":
      return t(new dango_abyss_receive_reward_js_1.DangoAbyssReceiveReward());
    case "SetTimeScale":
      return t(new set_time_scale_js_1.SetTimeScale());
    case "EnableActor":
      return t(new enable_actor_js_1.EnableActor());
    case "ModifyActorMaterial":
      return t(new modify_actor_material_js_1.ModifyActorMaterial());
    case "ToggleAirWall":
      return t(new toggle_air_wall_js_1.ToggleAirWall());
    case "TriggerCameraShake":
      return t(new trigger_camera_shake_js_1.TriggerCameraShake());
    case "CreatePrefab":
      return t(new create_prefab_js_1.CreatePrefab());
    case "DestroyPrefab":
      return t(new destroy_prefab_js_1.DestroyPrefab());
    case "PlayRegisteredMontage":
      return t(new play_registered_montage_js_1.PlayRegisteredMontage());
    case "RecoverDurability":
      return t(new recover_durability_js_1.RecoverDurability());
    case "SetRegionConfig":
      return t(new set_region_config_js_1.SetRegionConfig());
    case "SetJigsawItem":
      return t(new set_jigsaw_item_js_1.SetJigsawItem());
    case "SetJigsawFoundation":
      return t(new set_jigsaw_foundation_js_1.SetJigsawFoundation());
    case "ToggleHighlightExploreUi":
      return t(new toggle_highlight_explore_ui_js_1.ToggleHighlightExploreUi());
    case "ResetEntity":
      return t(new reset_entity_js_1.ResetEntity());
    case "PlayDynamicSettlement":
      return t(new play_dynamic_settlement_js_1.PlayDynamicSettlement());
    case "SetInteractionLockState":
      return t(new set_interaction_lock_state_js_1.SetInteractionLockState());
    case "FinishCondition":
      return t(new finish_condition_js_1.FinishCondition());
    case "ClearEntityVisibleTag":
      return t(new clear_entity_visible_tag_js_1.ClearEntityVisibleTag());
    case "SetEntityPos":
      return t(new set_entity_pos_js_1.SetEntityPos());
    case "ResetEntityPos":
      return t(new reset_entity_pos_js_1.ResetEntityPos());
    case "ServerSetPlayerPos":
      return t(new server_set_player_pos_js_1.ServerSetPlayerPos());
    case "FixTeleControllerPos":
      return t(new fix_tele_controller_pos_js_1.FixTeleControllerPos());
    case "CustomJson":
      return t(new custom_json_js_1.CustomJson());
    case "FixFoundationRelation":
      return t(new fix_foundation_relation_js_1.FixFoundationRelation());
    case "FixShowTargetRange":
      return t(new fix_show_target_range_js_1.FixShowTargetRange());
    case "ForceOccupations":
      return t(new force_occupations_js_1.ForceOccupations());
    case "ServerForceEnableLevelPlay":
      return t(
        new server_force_enable_level_play_js_1.ServerForceEnableLevelPlay(),
      );
    case "TeleportDungeonPos":
      return t(new teleport_dungeon_pos_js_1.TeleportDungeonPos());
    default:
      return;
  }
}
function unionListToUnionActionParams0(e, t, r) {
  switch (UnionActionParams0[e]) {
    case "NONE":
      return;
    case "Interact":
      return t(r, new interact_js_1.Interact());
    case "AcceptCurrentQuest":
      return t(r, new accept_current_quest_js_1.AcceptCurrentQuest());
    case "AddFlowInteractOption":
      return t(r, new add_flow_interact_option_js_1.AddFlowInteractOption());
    case "AdjustTodTime":
      return t(r, new adjust_tod_time_js_1.AdjustTodTime());
    case "AwakeEntity":
      return t(r, new awake_entity_js_1.AwakeEntity());
    case "CalculateVar":
      return t(r, new calculate_var_js_1.CalculateVar());
    case "RandomVar":
      return t(r, new random_var_js_1.RandomVar());
    case "CallByCondition":
      return t(r, new call_by_condition_js_1.CallByCondition());
    case "CallFunction":
      return t(r, new call_function_js_1.CallFunction());
    case "CameraLookAt":
      return t(r, new camera_look_at_js_1.CameraLookAt());
    case "StopCameraLookAt":
      return t(r, new stop_camera_look_at_js_1.StopCameraLookAt());
    case "EnableHostility":
      return t(r, new enable_hostility_js_1.EnableHostility());
    case "ChangeActorState":
      return t(r, new change_actor_state_js_1.ChangeActorState());
    case "ChangeBehaviorState":
      return t(r, new change_behavior_state_js_1.ChangeBehaviorState());
    case "ChangeEntityState":
      return t(r, new change_entity_state_js_1.ChangeEntityState());
    case "ChangeNpcPerformState":
      return t(r, new change_npc_perform_state_js_1.ChangeNpcPerformState());
    case "ChangeInteractOptionText":
      return t(
        r,
        new change_interact_option_text_js_1.ChangeInteractOptionText(),
      );
    case "ChangeOtherState":
      return t(r, new change_other_state_js_1.ChangeOtherState());
    case "ChangeRandomState":
      return t(r, new change_random_state_js_1.ChangeRandomState());
    case "ChangeState":
      return t(r, new change_state_js_1.ChangeState());
    case "Collect":
      return t(r, new collect_js_1.Collect());
    case "CompleteChildQuest":
      return t(r, new complete_child_quest_js_1.CompleteChildQuest());
    case "Destroy":
      return t(r, new destroy_js_1.Destroy());
    case "DestroyAllChild":
      return t(r, new destroy_all_child_js_1.DestroyAllChild());
    case "DestroyEntity":
      return t(r, new destroy_entity_js_1.DestroyEntity());
    case "DestroySelf":
      return t(r, new destroy_self_js_1.DestroySelf());
    case "DoCalculate":
      return t(r, new do_calculate_js_1.DoCalculate());
    case "EnableFunction":
      return t(r, new enable_function_js_1.EnableFunction());
    case "FaceToPos":
      return t(r, new face_to_pos_js_1.FaceToPos());
    case "FinishDoInteract":
      return t(r, new finish_do_interact_js_1.FinishDoInteract());
    case "FinishState":
      return t(r, new finish_state_js_1.FinishState());
    case "FinishTalk":
      return t(r, new finish_talk_js_1.FinishTalk());
    case "GetItem":
      return t(r, new get_item_js_1.GetItem());
    case "DestroyQuestItem":
      return t(r, new destroy_quest_item_js_1.DestroyQuestItem());
    case "GuideTrigger":
      return t(r, new guide_trigger_js_1.GuideTrigger());
    case "CompleteGuide":
      return t(r, new complete_guide_js_1.CompleteGuide());
    case "Invoke":
      return t(r, new invoke_js_1.Invoke());
    case "JumpTalk":
      return t(r, new jump_talk_js_1.JumpTalk());
    case "Log":
      return t(r, new log_js_1.Log());
    case "MoveToPosA":
      return t(r, new move_to_pos_a_js_1.MoveToPosA());
    case "MoveWithSpline":
      return t(r, new move_with_spline_js_1.MoveWithSpline());
    case "NewMoveWithSpline":
      return t(r, new new_move_with_spline_js_1.NewMoveWithSpline());
    case "StopNewMoveWithSpline":
      return t(r, new stop_new_move_with_spline_js_1.StopNewMoveWithSpline());
    case "CharacterMoveToPoint":
      return t(r, new character_move_to_point_js_1.CharacterMoveToPoint());
    case "OpenSystemBoard":
      return t(r, new open_system_board_js_1.OpenSystemBoard());
    case "OpenSystemFunction":
      return t(r, new open_system_function_js_1.OpenSystemFunction());
    case "PlayCustomSequence":
      return t(r, new play_custom_sequence_js_1.PlayCustomSequence());
    case "PlayerLookAt":
      return t(r, new player_look_at_js_1.PlayerLookAt());
    case "EntityLookAt":
      return t(r, new entity_look_at_js_1.EntityLookAt());
    case "CharacterLookAt":
      return t(r, new character_look_at_js_1.CharacterLookAt());
    case "EntityTurnTo":
      return t(r, new entity_turn_to_js_1.EntityTurnTo());
    case "PlayFlow":
      return t(r, new play_flow_js_1.PlayFlow());
    case "PlayMovie":
      return t(r, new play_movie_js_1.PlayMovie());
    case "PlayEffect":
      return t(r, new play_effect_js_1.PlayEffect());
    case "PlayCommonEffect":
      return t(r, new play_common_effect_js_1.PlayCommonEffect());
    case "PlayMontage":
      return t(r, new play_montage_js_1.PlayMontage());
    case "PlaySequenceData":
      return t(r, new play_sequence_data_js_1.PlaySequenceData());
    case "PlayerInput":
      return t(r, new player_input_js_1.PlayerInput());
    case "Prompt":
      return t(r, new prompt_js_1.Prompt());
    case "AddPlayBubble":
      return t(r, new add_play_bubble_js_1.AddPlayBubble());
    case "PlayBubble":
      return t(r, new play_bubble_js_1.PlayBubble());
    case "ClearPlayBubble":
      return t(r, new clear_play_bubble_js_1.ClearPlayBubble());
    case "EnableAI":
      return t(r, new enable_ai_js_1.EnableAI());
    case "RemoveFlowInteractOption":
      return t(
        r,
        new remove_flow_interact_option_js_1.RemoveFlowInteractOption(),
      );
    case "SendNpcMail":
      return t(r, new send_npc_mail_js_1.SendNpcMail());
    case "SetBehaviorIsPaused":
      return t(r, new set_behavior_is_paused_js_1.SetBehaviorIsPaused());
    case "SetCameraMode":
      return t(r, new set_camera_mode_js_1.SetCameraMode());
    case "SetEntityVisible":
      return t(r, new set_entity_visible_js_1.SetEntityVisible());
    case "SetEntityClientVisible":
      return t(r, new set_entity_client_visible_js_1.SetEntityClientVisible());
    case "SetEntityClientVisibleSave":
      return t(
        r,
        new set_entity_client_visible_save_js_1.SetEntityClientVisibleSave(),
      );
    case "SetHeadIconVisible":
      return t(r, new set_head_icon_visible_js_1.SetHeadIconVisible());
    case "SetMoveSpeed":
      return t(r, new set_move_speed_js_1.SetMoveSpeed());
    case "SetNumberVar":
      return t(r, new set_number_var_js_1.SetNumberVar());
    case "SetPlotMode":
      return t(r, new set_plot_mode_js_1.SetPlotMode());
    case "SetPosA":
      return t(r, new set_pos_a_js_1.SetPosA());
    case "SetVar":
      return t(r, new set_var_js_1.SetVar());
    case "ShowCenterText":
      return t(r, new show_center_text_js_1.ShowCenterText());
    case "ShowMessage":
      return t(r, new show_message_js_1.ShowMessage());
    case "ShowTalk":
      return t(r, new show_talk_js_1.ShowTalk());
    case "SimpleMove":
      return t(r, new simple_move_js_1.SimpleMove());
    case "SpawnChild":
      return t(r, new spawn_child_js_1.SpawnChild());
    case "SpawnEntity":
      return t(r, new spawn_entity_js_1.SpawnEntity());
    case "SyncVarToActorState":
      return t(r, new sync_var_to_actor_state_js_1.SyncVarToActorState());
    case "Wait":
      return t(r, new wait_js_1.Wait());
    case "AddBuffToEntity":
      return t(r, new add_buff_to_entity_js_1.AddBuffToEntity());
    case "AddBuffToPlayer":
      return t(r, new add_buff_to_player_js_1.AddBuffToPlayer());
    case "AddBuffToFollowShooter":
      return t(r, new add_buff_to_follow_shooter_js_1.AddBuffToFollowShooter());
    case "LockEntity":
      return t(r, new lock_entity_js_1.LockEntity());
    case "UnlockEntity":
      return t(r, new unlock_entity_js_1.UnlockEntity());
    case "SetForceLock":
      return t(r, new set_force_lock_js_1.SetForceLock());
    case "SetAreaState":
      return t(r, new set_area_state_js_1.SetAreaState());
    case "SetWuYinQuState":
      return t(r, new set_wu_yin_qu_state_js_1.SetWuYinQuState());
    case "RemoveBuffFromEntity":
      return t(r, new remove_buff_from_entity_js_1.RemoveBuffFromEntity());
    case "RemoveBuffFromPlayer":
      return t(r, new remove_buff_from_player_js_1.RemoveBuffFromPlayer());
    case "SetPlayerMoveControl":
      return t(r, new set_player_move_control_js_1.SetPlayerMoveControl());
    case "UnlockTeleportTrigger":
      return t(r, new unlock_teleport_trigger_js_1.UnlockTeleportTrigger());
    case "ChangeTeamPosition":
      return t(r, new change_team_position_js_1.ChangeTeamPosition());
    case "ClaimLevelPlayReward":
      return t(r, new claim_level_play_reward_js_1.ClaimLevelPlayReward());
    case "SetReviveRegion":
      return t(r, new set_revive_region_js_1.SetReviveRegion());
    case "PromptQuestChapterUI":
      return t(r, new prompt_quest_chapter_ui_js_1.PromptQuestChapterUI());
    case "FireBullet":
      return t(r, new fire_bullet_js_1.FireBullet());
    case "FireBulletEffect":
      return t(r, new fire_bullet_effect_js_1.FireBulletEffect());
    case "SetPlayerPos":
      return t(r, new set_player_pos_js_1.SetPlayerPos());
    case "ClientSetPlayerPos":
      return t(r, new client_set_player_pos_js_1.ClientSetPlayerPos());
    case "ClientPreEnableSubLevels":
      return t(
        r,
        new client_pre_enable_sub_levels_js_1.ClientPreEnableSubLevels(),
      );
    case "ChangeSelfEntityState":
      return t(r, new change_self_entity_state_js_1.ChangeSelfEntityState());
    case "InterludeActions":
      return t(r, new interlude_actions_js_1.InterludeActions());
    case "AddBuffToTriggeredEntity":
      return t(
        r,
        new add_buff_to_triggered_entity_js_1.AddBuffToTriggeredEntity(),
      );
    case "RemoveBuffToTriggeredEntity":
      return t(
        r,
        new remove_buff_to_triggered_entity_js_1.RemoveBuffToTriggeredEntity(),
      );
    case "DetectTrigger":
      return t(r, new detect_trigger_js_1.DetectTrigger());
    case "ItemFoundationMatch":
      return t(r, new item_foundation_match_js_1.ItemFoundationMatch());
    case "SetBattleState":
      return t(r, new set_battle_state_js_1.SetBattleState());
    case "ExecBattleAction":
      return t(r, new exec_battle_action_js_1.ExecBattleAction());
    case "WaitBattleCondition":
      return t(r, new wait_battle_condition_js_1.WaitBattleCondition());
    case "UnlockSystemItem":
      return t(r, new unlock_system_item_js_1.UnlockSystemItem());
    case "RunActions":
      return t(r, new run_actions_js_1.RunActions());
    case "CommonTip":
      return t(r, new common_tip_js_1.CommonTip());
    case "CommonTip2":
      return t(r, new common_tip2_js_1.CommonTip2());
    case "EnableNearbyTracking":
      return t(r, new enable_nearby_tracking_js_1.EnableNearbyTracking());
    case "EnableLevelPlay":
      return t(r, new enable_level_play_js_1.EnableLevelPlay());
    case "UnLimitPlayerOperation":
      return t(r, new un_limit_player_operation_js_1.UnLimitPlayerOperation());
    case "LimitPlayerOperation":
      return t(r, new limit_player_operation_js_1.LimitPlayerOperation());
    case "SetPlayerOperationRestriction":
      return t(
        r,
        new set_player_operation_restriction_js_1.SetPlayerOperationRestriction(),
      );
    case "LeisureInteract":
      return t(r, new leisure_interact_js_1.LeisureInteract());
    case "NpcLeisureInteract":
      return t(r, new npc_leisure_interact_js_1.NpcLeisureInteract());
    case "ChangePhantom":
      return t(r, new change_phantom_js_1.ChangePhantom());
    case "RestorePhantom":
      return t(r, new restore_phantom_js_1.RestorePhantom());
    case "TakePlotPhoto":
      return t(r, new take_plot_photo_js_1.TakePlotPhoto());
    case "OpenQteAction":
      return t(r, new open_qte_action_js_1.OpenQteAction());
    case "PreloadAction":
      return t(r, new preload_action_js_1.PreloadAction());
    case "RemovePreloadResourceAction":
      return t(
        r,
        new remove_preload_resource_action_js_1.RemovePreloadResourceAction(),
      );
    case "ExecAlertSystemAction":
      return t(r, new exec_alert_system_action_js_1.ExecAlertSystemAction());
    case "ChangeEntityCamp":
      return t(r, new change_entity_camp_js_1.ChangeEntityCamp());
    case "RecordDungeonEvent":
      return t(r, new record_dungeon_event_js_1.RecordDungeonEvent());
    case "ResetLevelPlay":
      return t(r, new reset_level_play_js_1.ResetLevelPlay());
    case "GetRewardByInteract":
      return t(r, new get_reward_by_interact_js_1.GetRewardByInteract());
    case "GuestOperateUiAnimation":
      return t(
        r,
        new guest_operate_ui_animation_js_1.GuestOperateUiAnimation(),
      );
    case "VehicleEnter":
      return t(r, new vehicle_enter_js_1.VehicleEnter());
    case "EnterNpcVehicle":
      return t(r, new enter_npc_vehicle_js_1.EnterNpcVehicle());
    case "VehicleExitPlayer":
      return t(r, new vehicle_exit_player_js_1.VehicleExitPlayer());
    case "VehicleExitNpc":
      return t(r, new vehicle_exit_npc_js_1.VehicleExitNpc());
    case "TeleportVehicle":
      return t(r, new teleport_vehicle_js_1.TeleportVehicle());
    case "VehiclePlayPassengerVoice":
      return t(
        r,
        new vehicle_play_passenger_voice_js_1.VehiclePlayPassengerVoice(),
      );
    case "VehicleWaterfallClimbing":
      return t(
        r,
        new vehicle_waterfall_climbing_js_1.VehicleWaterfallClimbing(),
      );
    case "TeleportToAndEnterVehicle":
      return t(
        r,
        new teleport_to_and_enter_vehicle_js_1.TeleportToAndEnterVehicle(),
      );
    case "VehicleMoveWithPathLine":
      return t(
        r,
        new vehicle_move_with_path_line_js_1.VehicleMoveWithPathLine(),
      );
    case "VehicleSprint":
      return t(r, new vehicle_sprint_js_1.VehicleSprint());
    case "SetAreaTimeState":
      return t(r, new set_area_time_state_js_1.SetAreaTimeState());
    case "SlideRailStart":
      return t(r, new slide_rail_start_js_1.SlideRailStart());
    case "BvbSendSystemEvent":
      return t(r, new bvb_send_system_event_js_1.BvbSendSystemEvent());
    case "TeleportDungeon":
      return t(r, new teleport_dungeon_js_1.TeleportDungeon());
    case "SettlementDungeon":
      return t(r, new settlement_dungeon_js_1.SettlementDungeon());
    case "ClaimDungeonReward":
      return t(r, new claim_dungeon_reward_js_1.ClaimDungeonReward());
    case "ExitDungeon":
      return t(r, new exit_dungeon_js_1.ExitDungeon());
    case "UnlockDungeonEntry":
      return t(r, new unlock_dungeon_entry_js_1.UnlockDungeonEntry());
    case "FinishDungeon":
      return t(r, new finish_dungeon_js_1.FinishDungeon());
    case "StartFlowTemplate":
      return t(r, new start_flow_template_js_1.StartFlowTemplate());
    case "BeginFlowTemplate":
      return t(r, new begin_flow_template_js_1.BeginFlowTemplate());
    case "ChangeFlowTemplate":
      return t(r, new change_flow_template_js_1.ChangeFlowTemplate());
    case "SetFlowTemplate":
      return t(r, new set_flow_template_js_1.SetFlowTemplate());
    case "EndFlowTemplate":
      return t(r, new end_flow_template_js_1.EndFlowTemplate());
    case "CloseFlowTemplate":
      return t(r, new close_flow_template_js_1.CloseFlowTemplate());
    case "SendAiEvent":
      return t(r, new send_ai_event_js_1.SendAiEvent());
    case "FadeInScreen":
      return t(r, new fade_in_screen_js_1.FadeInScreen());
    case "FadeOutScreen":
      return t(r, new fade_out_screen_js_1.FadeOutScreen());
    case "ChangeFightTeam":
      return t(r, new change_fight_team_js_1.ChangeFightTeam());
    case "ManualOccupations":
      return t(r, new manual_occupations_js_1.ManualOccupations());
    case "AddTrialCharacter":
      return t(r, new add_trial_character_js_1.AddTrialCharacter());
    case "RemoveTrialCharacter":
      return t(r, new remove_trial_character_js_1.RemoveTrialCharacter());
    case "AddGuestCharacter":
      return t(r, new add_guest_character_js_1.AddGuestCharacter());
    case "RemoveGuestCharacter":
      return t(r, new remove_guest_character_js_1.RemoveGuestCharacter());
    case "AddTrialFollowShooter":
      return t(r, new add_trial_follow_shooter_js_1.AddTrialFollowShooter());
    case "RemoveTrialFollowShooter":
      return t(
        r,
        new remove_trial_follow_shooter_js_1.RemoveTrialFollowShooter(),
      );
    case "DestroyQuest":
      return t(r, new destroy_quest_js_1.DestroyQuest());
    case "SetCameraAnim":
      return t(r, new set_camera_anim_js_1.SetCameraAnim());
    case "RotatorEntity":
      return t(r, new rotator_entity_js_1.RotatorEntity());
    case "TraceSpline":
      return t(r, new trace_spline_js_1.TraceSpline());
    case "ToggleScanSplineEffect":
      return t(r, new toggle_scan_spline_effect_js_1.ToggleScanSplineEffect());
    case "ChangeTimer":
      return t(r, new change_timer_js_1.ChangeTimer());
    case "ToggleTimerPauseState":
      return t(r, new toggle_timer_pause_state_js_1.ToggleTimerPauseState());
    case "EnableSystem":
      return t(r, new enable_system_js_1.EnableSystem());
    case "PostAkEvent":
      return t(r, new post_ak_event_js_1.PostAkEvent());
    case "MoveSceneItem":
      return t(r, new move_scene_item_js_1.MoveSceneItem());
    case "StopSceneItemMove":
      return t(r, new stop_scene_item_move_js_1.StopSceneItemMove());
    case "ChangeLiftTarget":
      return t(r, new change_lift_target_js_1.ChangeLiftTarget());
    case "HideByRangeInFlow":
      return t(r, new hide_by_range_in_flow_js_1.HideByRangeInFlow());
    case "OpenSimpleGameplay":
      return t(r, new open_simple_gameplay_js_1.OpenSimpleGameplay());
    case "ChangeActorTalker":
      return t(r, new change_actor_talker_js_1.ChangeActorTalker());
    case "SwitchSubLevels":
      return t(r, new switch_sub_levels_js_1.SwitchSubLevels());
    case "SwitchDataLayers":
      return t(r, new switch_data_layers_js_1.SwitchDataLayers());
    case "ActivateResetPoint":
      return t(r, new activate_reset_point_js_1.ActivateResetPoint());
    case "TeleportToLatestResetPoint":
      return t(
        r,
        new teleport_to_latest_reset_point_js_1.TeleportToLatestResetPoint(),
      );
    case "SetWeather":
      return t(r, new set_weather_js_1.SetWeather());
    case "SetTimeLockState":
      return t(r, new set_time_lock_state_js_1.SetTimeLockState());
    case "SetWeatherLockState":
      return t(r, new set_weather_lock_state_js_1.SetWeatherLockState());
    case "AdjustPlayerCamera":
      return t(r, new adjust_player_camera_js_1.AdjustPlayerCamera());
    case "RestorePlayerCameraAdjustment":
      return t(
        r,
        new restore_player_camera_adjustment_js_1.RestorePlayerCameraAdjustment(),
      );
    case "ResetPlayerCameraFocus":
      return t(r, new reset_player_camera_focus_js_1.ResetPlayerCameraFocus());
    case "UsePhantomSkill":
      return t(r, new use_phantom_skill_js_1.UsePhantomSkill());
    case "ChangePhantomFormation":
      return t(r, new change_phantom_formation_js_1.ChangePhantomFormation());
    case "RestorePhantomFormation":
      return t(r, new restore_phantom_formation_js_1.RestorePhantomFormation());
    case "EnterOrbitalCamera":
      return t(r, new enter_orbital_camera_js_1.EnterOrbitalCamera());
    case "ExitOrbitalCamera":
      return t(r, new exit_orbital_camera_js_1.ExitOrbitalCamera());
    case "EnableSplineMoveModel":
      return t(r, new enable_spline_move_model_js_1.EnableSplineMoveModel());
    case "SetSportsState":
      return t(r, new set_sports_state_js_1.SetSportsState());
    case "PlayLevelSequence":
      return t(r, new play_level_sequence_js_1.PlayLevelSequence());
    case "SetExploreState":
      return t(r, new set_explore_state_js_1.SetExploreState());
    case "RogueGotoNextFloor":
      return t(r, new rogue_goto_next_floor_js_1.RogueGotoNextFloor());
    case "RogueSelectRoom":
      return t(r, new rogue_select_room_js_1.RogueSelectRoom());
    case "RogueActivatePortal":
      return t(r, new rogue_activate_portal_js_1.RogueActivatePortal());
    case "RogueReceiveReward":
      return t(r, new rogue_receive_reward_js_1.RogueReceiveReward());
    case "EnableAoiNotify":
      return t(r, new enable_aoi_notify_js_1.EnableAoiNotify());
    case "ChangeEntityPrefabPerformance":
      return t(
        r,
        new change_entity_prefab_performance_js_1.ChangeEntityPrefabPerformance(),
      );
    case "ModifySceneItemAttributeTag":
      return t(
        r,
        new modify_scene_item_attribute_tag_js_1.ModifySceneItemAttributeTag(),
      );
    case "ToggleMapMarkState":
      return t(r, new toggle_map_mark_state_js_1.ToggleMapMarkState());
    case "FocusOnMapMark":
      return t(r, new focus_on_map_mark_js_1.FocusOnMapMark());
    case "EnableTemporaryTeleport":
      return t(r, new enable_temporary_teleport_js_1.EnableTemporaryTeleport());
    case "SetTeleControl":
      return t(r, new set_tele_control_js_1.SetTeleControl());
    case "ActiveAntiGravitySafePoint":
      return t(
        r,
        new active_anti_gravity_safe_point_js_1.ActiveAntiGravitySafePoint(),
      );
    case "ClearFishingCabinInSaleItems":
      return t(
        r,
        new clear_fishing_cabin_in_sale_items_js_1.ClearFishingCabinInSaleItems(),
      );
    case "AcceptFishingEntrust":
      return t(r, new accept_fishing_entrust_js_1.AcceptFishingEntrust());
    case "DestroyFishingBoat":
      return t(r, new destroy_fishing_boat_js_1.DestroyFishingBoat());
    case "SetSpineAnimation":
      return t(r, new set_spine_animation_js_1.SetSpineAnimation());
    case "DangoAbyssActivatePortal":
      return t(
        r,
        new dango_abyss_activate_portal_js_1.DangoAbyssActivatePortal(),
      );
    case "DangoAbyssGotoNextFloor":
      return t(
        r,
        new dango_abyss_goto_next_floor_js_1.DangoAbyssGotoNextFloor(),
      );
    case "DangoAbyssCreateRewardTreasureBox":
      return t(
        r,
        new dango_abyss_create_reward_treasure_box_js_1.DangoAbyssCreateRewardTreasureBox(),
      );
    case "DangoAbyssReceiveReward":
      return t(
        r,
        new dango_abyss_receive_reward_js_1.DangoAbyssReceiveReward(),
      );
    case "SetTimeScale":
      return t(r, new set_time_scale_js_1.SetTimeScale());
    case "EnableActor":
      return t(r, new enable_actor_js_1.EnableActor());
    case "ModifyActorMaterial":
      return t(r, new modify_actor_material_js_1.ModifyActorMaterial());
    case "ToggleAirWall":
      return t(r, new toggle_air_wall_js_1.ToggleAirWall());
    case "TriggerCameraShake":
      return t(r, new trigger_camera_shake_js_1.TriggerCameraShake());
    case "CreatePrefab":
      return t(r, new create_prefab_js_1.CreatePrefab());
    case "DestroyPrefab":
      return t(r, new destroy_prefab_js_1.DestroyPrefab());
    case "PlayRegisteredMontage":
      return t(r, new play_registered_montage_js_1.PlayRegisteredMontage());
    case "RecoverDurability":
      return t(r, new recover_durability_js_1.RecoverDurability());
    case "SetRegionConfig":
      return t(r, new set_region_config_js_1.SetRegionConfig());
    case "SetJigsawItem":
      return t(r, new set_jigsaw_item_js_1.SetJigsawItem());
    case "SetJigsawFoundation":
      return t(r, new set_jigsaw_foundation_js_1.SetJigsawFoundation());
    case "ToggleHighlightExploreUi":
      return t(
        r,
        new toggle_highlight_explore_ui_js_1.ToggleHighlightExploreUi(),
      );
    case "ResetEntity":
      return t(r, new reset_entity_js_1.ResetEntity());
    case "PlayDynamicSettlement":
      return t(r, new play_dynamic_settlement_js_1.PlayDynamicSettlement());
    case "SetInteractionLockState":
      return t(
        r,
        new set_interaction_lock_state_js_1.SetInteractionLockState(),
      );
    case "FinishCondition":
      return t(r, new finish_condition_js_1.FinishCondition());
    case "ClearEntityVisibleTag":
      return t(r, new clear_entity_visible_tag_js_1.ClearEntityVisibleTag());
    case "SetEntityPos":
      return t(r, new set_entity_pos_js_1.SetEntityPos());
    case "ResetEntityPos":
      return t(r, new reset_entity_pos_js_1.ResetEntityPos());
    case "ServerSetPlayerPos":
      return t(r, new server_set_player_pos_js_1.ServerSetPlayerPos());
    case "FixTeleControllerPos":
      return t(r, new fix_tele_controller_pos_js_1.FixTeleControllerPos());
    case "CustomJson":
      return t(r, new custom_json_js_1.CustomJson());
    case "FixFoundationRelation":
      return t(r, new fix_foundation_relation_js_1.FixFoundationRelation());
    case "FixShowTargetRange":
      return t(r, new fix_show_target_range_js_1.FixShowTargetRange());
    case "ForceOccupations":
      return t(r, new force_occupations_js_1.ForceOccupations());
    case "ServerForceEnableLevelPlay":
      return t(
        r,
        new server_force_enable_level_play_js_1.ServerForceEnableLevelPlay(),
      );
    case "TeleportDungeonPos":
      return t(r, new teleport_dungeon_pos_js_1.TeleportDungeonPos());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.Interact = 1)] = "Interact"),
    (e[(e.AcceptCurrentQuest = 2)] = "AcceptCurrentQuest"),
    (e[(e.AddFlowInteractOption = 3)] = "AddFlowInteractOption"),
    (e[(e.AdjustTodTime = 4)] = "AdjustTodTime"),
    (e[(e.AwakeEntity = 5)] = "AwakeEntity"),
    (e[(e.CalculateVar = 6)] = "CalculateVar"),
    (e[(e.RandomVar = 7)] = "RandomVar"),
    (e[(e.CallByCondition = 8)] = "CallByCondition"),
    (e[(e.CallFunction = 9)] = "CallFunction"),
    (e[(e.CameraLookAt = 10)] = "CameraLookAt"),
    (e[(e.StopCameraLookAt = 11)] = "StopCameraLookAt"),
    (e[(e.EnableHostility = 12)] = "EnableHostility"),
    (e[(e.ChangeActorState = 13)] = "ChangeActorState"),
    (e[(e.ChangeBehaviorState = 14)] = "ChangeBehaviorState"),
    (e[(e.ChangeEntityState = 15)] = "ChangeEntityState"),
    (e[(e.ChangeNpcPerformState = 16)] = "ChangeNpcPerformState"),
    (e[(e.ChangeInteractOptionText = 17)] = "ChangeInteractOptionText"),
    (e[(e.ChangeOtherState = 18)] = "ChangeOtherState"),
    (e[(e.ChangeRandomState = 19)] = "ChangeRandomState"),
    (e[(e.ChangeState = 20)] = "ChangeState"),
    (e[(e.Collect = 21)] = "Collect"),
    (e[(e.CompleteChildQuest = 22)] = "CompleteChildQuest"),
    (e[(e.Destroy = 23)] = "Destroy"),
    (e[(e.DestroyAllChild = 24)] = "DestroyAllChild"),
    (e[(e.DestroyEntity = 25)] = "DestroyEntity"),
    (e[(e.DestroySelf = 26)] = "DestroySelf"),
    (e[(e.DoCalculate = 27)] = "DoCalculate"),
    (e[(e.EnableFunction = 28)] = "EnableFunction"),
    (e[(e.FaceToPos = 29)] = "FaceToPos"),
    (e[(e.FinishDoInteract = 30)] = "FinishDoInteract"),
    (e[(e.FinishState = 31)] = "FinishState"),
    (e[(e.FinishTalk = 32)] = "FinishTalk"),
    (e[(e.GetItem = 33)] = "GetItem"),
    (e[(e.DestroyQuestItem = 34)] = "DestroyQuestItem"),
    (e[(e.GuideTrigger = 35)] = "GuideTrigger"),
    (e[(e.CompleteGuide = 36)] = "CompleteGuide"),
    (e[(e.Invoke = 37)] = "Invoke"),
    (e[(e.JumpTalk = 38)] = "JumpTalk"),
    (e[(e.Log = 39)] = "Log"),
    (e[(e.MoveToPosA = 40)] = "MoveToPosA"),
    (e[(e.MoveWithSpline = 41)] = "MoveWithSpline"),
    (e[(e.NewMoveWithSpline = 42)] = "NewMoveWithSpline"),
    (e[(e.StopNewMoveWithSpline = 43)] = "StopNewMoveWithSpline"),
    (e[(e.CharacterMoveToPoint = 44)] = "CharacterMoveToPoint"),
    (e[(e.OpenSystemBoard = 45)] = "OpenSystemBoard"),
    (e[(e.OpenSystemFunction = 46)] = "OpenSystemFunction"),
    (e[(e.PlayCustomSequence = 47)] = "PlayCustomSequence"),
    (e[(e.PlayerLookAt = 48)] = "PlayerLookAt"),
    (e[(e.EntityLookAt = 49)] = "EntityLookAt"),
    (e[(e.CharacterLookAt = 50)] = "CharacterLookAt"),
    (e[(e.EntityTurnTo = 51)] = "EntityTurnTo"),
    (e[(e.PlayFlow = 52)] = "PlayFlow"),
    (e[(e.PlayMovie = 53)] = "PlayMovie"),
    (e[(e.PlayEffect = 54)] = "PlayEffect"),
    (e[(e.PlayCommonEffect = 55)] = "PlayCommonEffect"),
    (e[(e.PlayMontage = 56)] = "PlayMontage"),
    (e[(e.PlaySequenceData = 57)] = "PlaySequenceData"),
    (e[(e.PlayerInput = 58)] = "PlayerInput"),
    (e[(e.Prompt = 59)] = "Prompt"),
    (e[(e.AddPlayBubble = 60)] = "AddPlayBubble"),
    (e[(e.PlayBubble = 61)] = "PlayBubble"),
    (e[(e.ClearPlayBubble = 62)] = "ClearPlayBubble"),
    (e[(e.EnableAI = 63)] = "EnableAI"),
    (e[(e.RemoveFlowInteractOption = 64)] = "RemoveFlowInteractOption"),
    (e[(e.SendNpcMail = 65)] = "SendNpcMail"),
    (e[(e.SetBehaviorIsPaused = 66)] = "SetBehaviorIsPaused"),
    (e[(e.SetCameraMode = 67)] = "SetCameraMode"),
    (e[(e.SetEntityVisible = 68)] = "SetEntityVisible"),
    (e[(e.SetEntityClientVisible = 69)] = "SetEntityClientVisible"),
    (e[(e.SetEntityClientVisibleSave = 70)] = "SetEntityClientVisibleSave"),
    (e[(e.SetHeadIconVisible = 71)] = "SetHeadIconVisible"),
    (e[(e.SetMoveSpeed = 72)] = "SetMoveSpeed"),
    (e[(e.SetNumberVar = 73)] = "SetNumberVar"),
    (e[(e.SetPlotMode = 74)] = "SetPlotMode"),
    (e[(e.SetPosA = 75)] = "SetPosA"),
    (e[(e.SetVar = 76)] = "SetVar"),
    (e[(e.ShowCenterText = 77)] = "ShowCenterText"),
    (e[(e.ShowMessage = 78)] = "ShowMessage"),
    (e[(e.ShowTalk = 79)] = "ShowTalk"),
    (e[(e.SimpleMove = 80)] = "SimpleMove"),
    (e[(e.SpawnChild = 81)] = "SpawnChild"),
    (e[(e.SpawnEntity = 82)] = "SpawnEntity"),
    (e[(e.SyncVarToActorState = 83)] = "SyncVarToActorState"),
    (e[(e.Wait = 84)] = "Wait"),
    (e[(e.AddBuffToEntity = 85)] = "AddBuffToEntity"),
    (e[(e.AddBuffToPlayer = 86)] = "AddBuffToPlayer"),
    (e[(e.AddBuffToFollowShooter = 87)] = "AddBuffToFollowShooter"),
    (e[(e.LockEntity = 88)] = "LockEntity"),
    (e[(e.UnlockEntity = 89)] = "UnlockEntity"),
    (e[(e.SetForceLock = 90)] = "SetForceLock"),
    (e[(e.SetAreaState = 91)] = "SetAreaState"),
    (e[(e.SetWuYinQuState = 92)] = "SetWuYinQuState"),
    (e[(e.RemoveBuffFromEntity = 93)] = "RemoveBuffFromEntity"),
    (e[(e.RemoveBuffFromPlayer = 94)] = "RemoveBuffFromPlayer"),
    (e[(e.SetPlayerMoveControl = 95)] = "SetPlayerMoveControl"),
    (e[(e.UnlockTeleportTrigger = 96)] = "UnlockTeleportTrigger"),
    (e[(e.ChangeTeamPosition = 97)] = "ChangeTeamPosition"),
    (e[(e.ClaimLevelPlayReward = 98)] = "ClaimLevelPlayReward"),
    (e[(e.SetReviveRegion = 99)] = "SetReviveRegion"),
    (e[(e.PromptQuestChapterUI = 100)] = "PromptQuestChapterUI"),
    (e[(e.FireBullet = 101)] = "FireBullet"),
    (e[(e.FireBulletEffect = 102)] = "FireBulletEffect"),
    (e[(e.SetPlayerPos = 103)] = "SetPlayerPos"),
    (e[(e.ClientSetPlayerPos = 104)] = "ClientSetPlayerPos"),
    (e[(e.ClientPreEnableSubLevels = 105)] = "ClientPreEnableSubLevels"),
    (e[(e.ChangeSelfEntityState = 106)] = "ChangeSelfEntityState"),
    (e[(e.InterludeActions = 107)] = "InterludeActions"),
    (e[(e.AddBuffToTriggeredEntity = 108)] = "AddBuffToTriggeredEntity"),
    (e[(e.RemoveBuffToTriggeredEntity = 109)] = "RemoveBuffToTriggeredEntity"),
    (e[(e.DetectTrigger = 110)] = "DetectTrigger"),
    (e[(e.ItemFoundationMatch = 111)] = "ItemFoundationMatch"),
    (e[(e.SetBattleState = 112)] = "SetBattleState"),
    (e[(e.ExecBattleAction = 113)] = "ExecBattleAction"),
    (e[(e.WaitBattleCondition = 114)] = "WaitBattleCondition"),
    (e[(e.UnlockSystemItem = 115)] = "UnlockSystemItem"),
    (e[(e.RunActions = 116)] = "RunActions"),
    (e[(e.CommonTip = 117)] = "CommonTip"),
    (e[(e.CommonTip2 = 118)] = "CommonTip2"),
    (e[(e.EnableNearbyTracking = 119)] = "EnableNearbyTracking"),
    (e[(e.EnableLevelPlay = 120)] = "EnableLevelPlay"),
    (e[(e.UnLimitPlayerOperation = 121)] = "UnLimitPlayerOperation"),
    (e[(e.LimitPlayerOperation = 122)] = "LimitPlayerOperation"),
    (e[(e.SetPlayerOperationRestriction = 123)] =
      "SetPlayerOperationRestriction"),
    (e[(e.LeisureInteract = 124)] = "LeisureInteract"),
    (e[(e.NpcLeisureInteract = 125)] = "NpcLeisureInteract"),
    (e[(e.ChangePhantom = 126)] = "ChangePhantom"),
    (e[(e.RestorePhantom = 127)] = "RestorePhantom"),
    (e[(e.TakePlotPhoto = 128)] = "TakePlotPhoto"),
    (e[(e.OpenQteAction = 129)] = "OpenQteAction"),
    (e[(e.PreloadAction = 130)] = "PreloadAction"),
    (e[(e.RemovePreloadResourceAction = 131)] = "RemovePreloadResourceAction"),
    (e[(e.ExecAlertSystemAction = 132)] = "ExecAlertSystemAction"),
    (e[(e.ChangeEntityCamp = 133)] = "ChangeEntityCamp"),
    (e[(e.RecordDungeonEvent = 134)] = "RecordDungeonEvent"),
    (e[(e.ResetLevelPlay = 135)] = "ResetLevelPlay"),
    (e[(e.GetRewardByInteract = 136)] = "GetRewardByInteract"),
    (e[(e.GuestOperateUiAnimation = 137)] = "GuestOperateUiAnimation"),
    (e[(e.VehicleEnter = 138)] = "VehicleEnter"),
    (e[(e.EnterNpcVehicle = 139)] = "EnterNpcVehicle"),
    (e[(e.VehicleExitPlayer = 140)] = "VehicleExitPlayer"),
    (e[(e.VehicleExitNpc = 141)] = "VehicleExitNpc"),
    (e[(e.TeleportVehicle = 142)] = "TeleportVehicle"),
    (e[(e.VehiclePlayPassengerVoice = 143)] = "VehiclePlayPassengerVoice"),
    (e[(e.VehicleWaterfallClimbing = 144)] = "VehicleWaterfallClimbing"),
    (e[(e.TeleportToAndEnterVehicle = 145)] = "TeleportToAndEnterVehicle"),
    (e[(e.VehicleMoveWithPathLine = 146)] = "VehicleMoveWithPathLine"),
    (e[(e.VehicleSprint = 147)] = "VehicleSprint"),
    (e[(e.SetAreaTimeState = 148)] = "SetAreaTimeState"),
    (e[(e.SlideRailStart = 149)] = "SlideRailStart"),
    (e[(e.BvbSendSystemEvent = 150)] = "BvbSendSystemEvent"),
    (e[(e.TeleportDungeon = 151)] = "TeleportDungeon"),
    (e[(e.SettlementDungeon = 152)] = "SettlementDungeon"),
    (e[(e.ClaimDungeonReward = 153)] = "ClaimDungeonReward"),
    (e[(e.ExitDungeon = 154)] = "ExitDungeon"),
    (e[(e.UnlockDungeonEntry = 155)] = "UnlockDungeonEntry"),
    (e[(e.FinishDungeon = 156)] = "FinishDungeon"),
    (e[(e.StartFlowTemplate = 157)] = "StartFlowTemplate"),
    (e[(e.BeginFlowTemplate = 158)] = "BeginFlowTemplate"),
    (e[(e.ChangeFlowTemplate = 159)] = "ChangeFlowTemplate"),
    (e[(e.SetFlowTemplate = 160)] = "SetFlowTemplate"),
    (e[(e.EndFlowTemplate = 161)] = "EndFlowTemplate"),
    (e[(e.CloseFlowTemplate = 162)] = "CloseFlowTemplate"),
    (e[(e.SendAiEvent = 163)] = "SendAiEvent"),
    (e[(e.FadeInScreen = 164)] = "FadeInScreen"),
    (e[(e.FadeOutScreen = 165)] = "FadeOutScreen"),
    (e[(e.ChangeFightTeam = 166)] = "ChangeFightTeam"),
    (e[(e.ManualOccupations = 167)] = "ManualOccupations"),
    (e[(e.AddTrialCharacter = 168)] = "AddTrialCharacter"),
    (e[(e.RemoveTrialCharacter = 169)] = "RemoveTrialCharacter"),
    (e[(e.AddGuestCharacter = 170)] = "AddGuestCharacter"),
    (e[(e.RemoveGuestCharacter = 171)] = "RemoveGuestCharacter"),
    (e[(e.AddTrialFollowShooter = 172)] = "AddTrialFollowShooter"),
    (e[(e.RemoveTrialFollowShooter = 173)] = "RemoveTrialFollowShooter"),
    (e[(e.DestroyQuest = 174)] = "DestroyQuest"),
    (e[(e.SetCameraAnim = 175)] = "SetCameraAnim"),
    (e[(e.RotatorEntity = 176)] = "RotatorEntity"),
    (e[(e.TraceSpline = 177)] = "TraceSpline"),
    (e[(e.ToggleScanSplineEffect = 178)] = "ToggleScanSplineEffect"),
    (e[(e.ChangeTimer = 179)] = "ChangeTimer"),
    (e[(e.ToggleTimerPauseState = 180)] = "ToggleTimerPauseState"),
    (e[(e.EnableSystem = 181)] = "EnableSystem"),
    (e[(e.PostAkEvent = 182)] = "PostAkEvent"),
    (e[(e.MoveSceneItem = 183)] = "MoveSceneItem"),
    (e[(e.StopSceneItemMove = 184)] = "StopSceneItemMove"),
    (e[(e.ChangeLiftTarget = 185)] = "ChangeLiftTarget"),
    (e[(e.HideByRangeInFlow = 186)] = "HideByRangeInFlow"),
    (e[(e.OpenSimpleGameplay = 187)] = "OpenSimpleGameplay"),
    (e[(e.ChangeActorTalker = 188)] = "ChangeActorTalker"),
    (e[(e.SwitchSubLevels = 189)] = "SwitchSubLevels"),
    (e[(e.SwitchDataLayers = 190)] = "SwitchDataLayers"),
    (e[(e.ActivateResetPoint = 191)] = "ActivateResetPoint"),
    (e[(e.TeleportToLatestResetPoint = 192)] = "TeleportToLatestResetPoint"),
    (e[(e.SetWeather = 193)] = "SetWeather"),
    (e[(e.SetTimeLockState = 194)] = "SetTimeLockState"),
    (e[(e.SetWeatherLockState = 195)] = "SetWeatherLockState"),
    (e[(e.AdjustPlayerCamera = 196)] = "AdjustPlayerCamera"),
    (e[(e.RestorePlayerCameraAdjustment = 197)] =
      "RestorePlayerCameraAdjustment"),
    (e[(e.ResetPlayerCameraFocus = 198)] = "ResetPlayerCameraFocus"),
    (e[(e.UsePhantomSkill = 199)] = "UsePhantomSkill"),
    (e[(e.ChangePhantomFormation = 200)] = "ChangePhantomFormation"),
    (e[(e.RestorePhantomFormation = 201)] = "RestorePhantomFormation"),
    (e[(e.EnterOrbitalCamera = 202)] = "EnterOrbitalCamera"),
    (e[(e.ExitOrbitalCamera = 203)] = "ExitOrbitalCamera"),
    (e[(e.EnableSplineMoveModel = 204)] = "EnableSplineMoveModel"),
    (e[(e.SetSportsState = 205)] = "SetSportsState"),
    (e[(e.PlayLevelSequence = 206)] = "PlayLevelSequence"),
    (e[(e.SetExploreState = 207)] = "SetExploreState"),
    (e[(e.RogueGotoNextFloor = 208)] = "RogueGotoNextFloor"),
    (e[(e.RogueSelectRoom = 209)] = "RogueSelectRoom"),
    (e[(e.RogueActivatePortal = 210)] = "RogueActivatePortal"),
    (e[(e.RogueReceiveReward = 211)] = "RogueReceiveReward"),
    (e[(e.EnableAoiNotify = 212)] = "EnableAoiNotify"),
    (e[(e.ChangeEntityPrefabPerformance = 213)] =
      "ChangeEntityPrefabPerformance"),
    (e[(e.ModifySceneItemAttributeTag = 214)] = "ModifySceneItemAttributeTag"),
    (e[(e.ToggleMapMarkState = 215)] = "ToggleMapMarkState"),
    (e[(e.FocusOnMapMark = 216)] = "FocusOnMapMark"),
    (e[(e.EnableTemporaryTeleport = 217)] = "EnableTemporaryTeleport"),
    (e[(e.SetTeleControl = 218)] = "SetTeleControl"),
    (e[(e.ActiveAntiGravitySafePoint = 219)] = "ActiveAntiGravitySafePoint"),
    (e[(e.ClearFishingCabinInSaleItems = 220)] =
      "ClearFishingCabinInSaleItems"),
    (e[(e.AcceptFishingEntrust = 221)] = "AcceptFishingEntrust"),
    (e[(e.DestroyFishingBoat = 222)] = "DestroyFishingBoat"),
    (e[(e.SetSpineAnimation = 223)] = "SetSpineAnimation"),
    (e[(e.DangoAbyssActivatePortal = 224)] = "DangoAbyssActivatePortal"),
    (e[(e.DangoAbyssGotoNextFloor = 225)] = "DangoAbyssGotoNextFloor"),
    (e[(e.DangoAbyssCreateRewardTreasureBox = 226)] =
      "DangoAbyssCreateRewardTreasureBox"),
    (e[(e.DangoAbyssReceiveReward = 227)] = "DangoAbyssReceiveReward"),
    (e[(e.SetTimeScale = 228)] = "SetTimeScale"),
    (e[(e.EnableActor = 229)] = "EnableActor"),
    (e[(e.ModifyActorMaterial = 230)] = "ModifyActorMaterial"),
    (e[(e.ToggleAirWall = 231)] = "ToggleAirWall"),
    (e[(e.TriggerCameraShake = 232)] = "TriggerCameraShake"),
    (e[(e.CreatePrefab = 233)] = "CreatePrefab"),
    (e[(e.DestroyPrefab = 234)] = "DestroyPrefab"),
    (e[(e.PlayRegisteredMontage = 235)] = "PlayRegisteredMontage"),
    (e[(e.RecoverDurability = 236)] = "RecoverDurability"),
    (e[(e.SetRegionConfig = 237)] = "SetRegionConfig"),
    (e[(e.SetJigsawItem = 238)] = "SetJigsawItem"),
    (e[(e.SetJigsawFoundation = 239)] = "SetJigsawFoundation"),
    (e[(e.ToggleHighlightExploreUi = 240)] = "ToggleHighlightExploreUi"),
    (e[(e.ResetEntity = 241)] = "ResetEntity"),
    (e[(e.PlayDynamicSettlement = 242)] = "PlayDynamicSettlement"),
    (e[(e.SetInteractionLockState = 243)] = "SetInteractionLockState"),
    (e[(e.FinishCondition = 244)] = "FinishCondition"),
    (e[(e.ClearEntityVisibleTag = 245)] = "ClearEntityVisibleTag"),
    (e[(e.SetEntityPos = 246)] = "SetEntityPos"),
    (e[(e.ResetEntityPos = 247)] = "ResetEntityPos"),
    (e[(e.ServerSetPlayerPos = 248)] = "ServerSetPlayerPos"),
    (e[(e.FixTeleControllerPos = 249)] = "FixTeleControllerPos"),
    (e[(e.CustomJson = 250)] = "CustomJson"),
    (e[(e.FixFoundationRelation = 251)] = "FixFoundationRelation"),
    (e[(e.FixShowTargetRange = 252)] = "FixShowTargetRange"),
    (e[(e.ForceOccupations = 253)] = "ForceOccupations"),
    (e[(e.ServerForceEnableLevelPlay = 254)] = "ServerForceEnableLevelPlay"),
    (e[(e.TeleportDungeonPos = 255)] = "TeleportDungeonPos");
})(
  (UnionActionParams0 =
    exports.UnionActionParams0 || (exports.UnionActionParams0 = {})),
),
  (exports.unionToUnionActionParams0 = unionToUnionActionParams0),
  (exports.unionListToUnionActionParams0 = unionListToUnionActionParams0);
//# sourceMappingURL=union-action-params0.js.map
