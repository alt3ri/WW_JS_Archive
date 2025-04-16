"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionPhotoTargetCaptureUi =
    exports.UnionGravityDirection =
    exports.UnionBvbEventData =
    exports.PhotoTargetCaptureUiRequiredPointsCenter =
    exports.PhotoTargetCaptureUiEntityZero =
    exports.PhotoTargetCaptureUiEachRequiredPoints =
    exports.PhotoTargetCaptureUiCustomPoints =
    exports.InitNpcPerformState =
    exports.GravityDirectionWorldAxis =
    exports.GravityDirectionVectorInfo =
    exports.GravityDirectionSelfRotation =
    exports.GravityDirectionByEntityGravity =
    exports.EnterLeaveRadius =
    exports.BvbWaitForGameBeginData =
    exports.BvbStartRoundData =
    exports.BvbStartBattleData =
    exports.BvbStartAiData =
    exports.BvbSelectCardsEndData =
    exports.BvbPlayerTurnStartData =
    exports.BvbPlayerTurnEndData =
    exports.BvbPlayerBattleWinData =
    exports.BvbBurnBuffTimeUpData =
    exports.BvbAiTurnEndData =
    exports.BvbAiSwapData =
    exports.BvbAiRecycleData =
    exports.BvbAiRearrangeData =
    exports.BvbAiGetBestSwapData =
    exports.BvbAiGetBestRearrangeData =
    exports.BvbAiGetBestDeployData =
    exports.BvbAiEvolutionData =
    exports.BvbAiDiscardData =
    exports.BvbAiDeployData =
    exports.BvbAiChangeData =
    exports.BvbAiBattleWinData =
      void 0);
var bvb_ai_battle_win_data_js_1 = require("./fb-common/bvb-ai-battle-win-data.js"),
  bvb_ai_change_data_js_1 =
    (Object.defineProperty(exports, "BvbAiBattleWinData", {
      enumerable: !0,
      get: function () {
        return bvb_ai_battle_win_data_js_1.BvbAiBattleWinData;
      },
    }),
    require("./fb-common/bvb-ai-change-data.js")),
  bvb_ai_deploy_data_js_1 =
    (Object.defineProperty(exports, "BvbAiChangeData", {
      enumerable: !0,
      get: function () {
        return bvb_ai_change_data_js_1.BvbAiChangeData;
      },
    }),
    require("./fb-common/bvb-ai-deploy-data.js")),
  bvb_ai_discard_data_js_1 =
    (Object.defineProperty(exports, "BvbAiDeployData", {
      enumerable: !0,
      get: function () {
        return bvb_ai_deploy_data_js_1.BvbAiDeployData;
      },
    }),
    require("./fb-common/bvb-ai-discard-data.js")),
  bvb_ai_evolution_data_js_1 =
    (Object.defineProperty(exports, "BvbAiDiscardData", {
      enumerable: !0,
      get: function () {
        return bvb_ai_discard_data_js_1.BvbAiDiscardData;
      },
    }),
    require("./fb-common/bvb-ai-evolution-data.js")),
  bvb_ai_get_best_deploy_data_js_1 =
    (Object.defineProperty(exports, "BvbAiEvolutionData", {
      enumerable: !0,
      get: function () {
        return bvb_ai_evolution_data_js_1.BvbAiEvolutionData;
      },
    }),
    require("./fb-common/bvb-ai-get-best-deploy-data.js")),
  bvb_ai_get_best_rearrange_data_js_1 =
    (Object.defineProperty(exports, "BvbAiGetBestDeployData", {
      enumerable: !0,
      get: function () {
        return bvb_ai_get_best_deploy_data_js_1.BvbAiGetBestDeployData;
      },
    }),
    require("./fb-common/bvb-ai-get-best-rearrange-data.js")),
  bvb_ai_get_best_swap_data_js_1 =
    (Object.defineProperty(exports, "BvbAiGetBestRearrangeData", {
      enumerable: !0,
      get: function () {
        return bvb_ai_get_best_rearrange_data_js_1.BvbAiGetBestRearrangeData;
      },
    }),
    require("./fb-common/bvb-ai-get-best-swap-data.js")),
  bvb_ai_rearrange_data_js_1 =
    (Object.defineProperty(exports, "BvbAiGetBestSwapData", {
      enumerable: !0,
      get: function () {
        return bvb_ai_get_best_swap_data_js_1.BvbAiGetBestSwapData;
      },
    }),
    require("./fb-common/bvb-ai-rearrange-data.js")),
  bvb_ai_recycle_data_js_1 =
    (Object.defineProperty(exports, "BvbAiRearrangeData", {
      enumerable: !0,
      get: function () {
        return bvb_ai_rearrange_data_js_1.BvbAiRearrangeData;
      },
    }),
    require("./fb-common/bvb-ai-recycle-data.js")),
  bvb_ai_swap_data_js_1 =
    (Object.defineProperty(exports, "BvbAiRecycleData", {
      enumerable: !0,
      get: function () {
        return bvb_ai_recycle_data_js_1.BvbAiRecycleData;
      },
    }),
    require("./fb-common/bvb-ai-swap-data.js")),
  bvb_ai_turn_end_data_js_1 =
    (Object.defineProperty(exports, "BvbAiSwapData", {
      enumerable: !0,
      get: function () {
        return bvb_ai_swap_data_js_1.BvbAiSwapData;
      },
    }),
    require("./fb-common/bvb-ai-turn-end-data.js")),
  bvb_burn_buff_time_up_data_js_1 =
    (Object.defineProperty(exports, "BvbAiTurnEndData", {
      enumerable: !0,
      get: function () {
        return bvb_ai_turn_end_data_js_1.BvbAiTurnEndData;
      },
    }),
    require("./fb-common/bvb-burn-buff-time-up-data.js")),
  bvb_player_battle_win_data_js_1 =
    (Object.defineProperty(exports, "BvbBurnBuffTimeUpData", {
      enumerable: !0,
      get: function () {
        return bvb_burn_buff_time_up_data_js_1.BvbBurnBuffTimeUpData;
      },
    }),
    require("./fb-common/bvb-player-battle-win-data.js")),
  bvb_player_turn_end_data_js_1 =
    (Object.defineProperty(exports, "BvbPlayerBattleWinData", {
      enumerable: !0,
      get: function () {
        return bvb_player_battle_win_data_js_1.BvbPlayerBattleWinData;
      },
    }),
    require("./fb-common/bvb-player-turn-end-data.js")),
  bvb_player_turn_start_data_js_1 =
    (Object.defineProperty(exports, "BvbPlayerTurnEndData", {
      enumerable: !0,
      get: function () {
        return bvb_player_turn_end_data_js_1.BvbPlayerTurnEndData;
      },
    }),
    require("./fb-common/bvb-player-turn-start-data.js")),
  bvb_select_cards_end_data_js_1 =
    (Object.defineProperty(exports, "BvbPlayerTurnStartData", {
      enumerable: !0,
      get: function () {
        return bvb_player_turn_start_data_js_1.BvbPlayerTurnStartData;
      },
    }),
    require("./fb-common/bvb-select-cards-end-data.js")),
  bvb_start_ai_data_js_1 =
    (Object.defineProperty(exports, "BvbSelectCardsEndData", {
      enumerable: !0,
      get: function () {
        return bvb_select_cards_end_data_js_1.BvbSelectCardsEndData;
      },
    }),
    require("./fb-common/bvb-start-ai-data.js")),
  bvb_start_battle_data_js_1 =
    (Object.defineProperty(exports, "BvbStartAiData", {
      enumerable: !0,
      get: function () {
        return bvb_start_ai_data_js_1.BvbStartAiData;
      },
    }),
    require("./fb-common/bvb-start-battle-data.js")),
  bvb_start_round_data_js_1 =
    (Object.defineProperty(exports, "BvbStartBattleData", {
      enumerable: !0,
      get: function () {
        return bvb_start_battle_data_js_1.BvbStartBattleData;
      },
    }),
    require("./fb-common/bvb-start-round-data.js")),
  bvb_wait_for_game_begin_data_js_1 =
    (Object.defineProperty(exports, "BvbStartRoundData", {
      enumerable: !0,
      get: function () {
        return bvb_start_round_data_js_1.BvbStartRoundData;
      },
    }),
    require("./fb-common/bvb-wait-for-game-begin-data.js")),
  enter_leave_radius_js_1 =
    (Object.defineProperty(exports, "BvbWaitForGameBeginData", {
      enumerable: !0,
      get: function () {
        return bvb_wait_for_game_begin_data_js_1.BvbWaitForGameBeginData;
      },
    }),
    require("./fb-common/enter-leave-radius.js")),
  gravity_direction_by_entity_gravity_js_1 =
    (Object.defineProperty(exports, "EnterLeaveRadius", {
      enumerable: !0,
      get: function () {
        return enter_leave_radius_js_1.EnterLeaveRadius;
      },
    }),
    require("./fb-common/gravity-direction-by-entity-gravity.js")),
  gravity_direction_self_rotation_js_1 =
    (Object.defineProperty(exports, "GravityDirectionByEntityGravity", {
      enumerable: !0,
      get: function () {
        return gravity_direction_by_entity_gravity_js_1.GravityDirectionByEntityGravity;
      },
    }),
    require("./fb-common/gravity-direction-self-rotation.js")),
  gravity_direction_vector_info_js_1 =
    (Object.defineProperty(exports, "GravityDirectionSelfRotation", {
      enumerable: !0,
      get: function () {
        return gravity_direction_self_rotation_js_1.GravityDirectionSelfRotation;
      },
    }),
    require("./fb-common/gravity-direction-vector-info.js")),
  gravity_direction_world_axis_js_1 =
    (Object.defineProperty(exports, "GravityDirectionVectorInfo", {
      enumerable: !0,
      get: function () {
        return gravity_direction_vector_info_js_1.GravityDirectionVectorInfo;
      },
    }),
    require("./fb-common/gravity-direction-world-axis.js")),
  init_npc_perform_state_js_1 =
    (Object.defineProperty(exports, "GravityDirectionWorldAxis", {
      enumerable: !0,
      get: function () {
        return gravity_direction_world_axis_js_1.GravityDirectionWorldAxis;
      },
    }),
    require("./fb-common/init-npc-perform-state.js")),
  photo_target_capture_ui_custom_points_js_1 =
    (Object.defineProperty(exports, "InitNpcPerformState", {
      enumerable: !0,
      get: function () {
        return init_npc_perform_state_js_1.InitNpcPerformState;
      },
    }),
    require("./fb-common/photo-target-capture-ui-custom-points.js")),
  photo_target_capture_ui_each_required_points_js_1 =
    (Object.defineProperty(exports, "PhotoTargetCaptureUiCustomPoints", {
      enumerable: !0,
      get: function () {
        return photo_target_capture_ui_custom_points_js_1.PhotoTargetCaptureUiCustomPoints;
      },
    }),
    require("./fb-common/photo-target-capture-ui-each-required-points.js")),
  photo_target_capture_ui_entity_zero_js_1 =
    (Object.defineProperty(exports, "PhotoTargetCaptureUiEachRequiredPoints", {
      enumerable: !0,
      get: function () {
        return photo_target_capture_ui_each_required_points_js_1.PhotoTargetCaptureUiEachRequiredPoints;
      },
    }),
    require("./fb-common/photo-target-capture-ui-entity-zero.js")),
  photo_target_capture_ui_required_points_center_js_1 =
    (Object.defineProperty(exports, "PhotoTargetCaptureUiEntityZero", {
      enumerable: !0,
      get: function () {
        return photo_target_capture_ui_entity_zero_js_1.PhotoTargetCaptureUiEntityZero;
      },
    }),
    require("./fb-common/photo-target-capture-ui-required-points-center.js")),
  union_bvb_event_data_js_1 =
    (Object.defineProperty(
      exports,
      "PhotoTargetCaptureUiRequiredPointsCenter",
      {
        enumerable: !0,
        get: function () {
          return photo_target_capture_ui_required_points_center_js_1.PhotoTargetCaptureUiRequiredPointsCenter;
        },
      },
    ),
    require("./fb-common/union-bvb-event-data.js")),
  union_gravity_direction_js_1 =
    (Object.defineProperty(exports, "UnionBvbEventData", {
      enumerable: !0,
      get: function () {
        return union_bvb_event_data_js_1.UnionBvbEventData;
      },
    }),
    require("./fb-common/union-gravity-direction.js")),
  union_photo_target_capture_ui_js_1 =
    (Object.defineProperty(exports, "UnionGravityDirection", {
      enumerable: !0,
      get: function () {
        return union_gravity_direction_js_1.UnionGravityDirection;
      },
    }),
    require("./fb-common/union-photo-target-capture-ui.js"));
Object.defineProperty(exports, "UnionPhotoTargetCaptureUi", {
  enumerable: !0,
  get: function () {
    return union_photo_target_capture_ui_js_1.UnionPhotoTargetCaptureUi;
  },
});
//# sourceMappingURL=fb-common.js.map
