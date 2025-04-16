"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionBvbEventData =
    exports.unionToUnionBvbEventData =
    exports.UnionBvbEventData =
      void 0);
const bvb_ai_battle_win_data_js_1 = require("../fb-common/bvb-ai-battle-win-data.js"),
  bvb_ai_change_data_js_1 = require("../fb-common/bvb-ai-change-data.js"),
  bvb_ai_deploy_data_js_1 = require("../fb-common/bvb-ai-deploy-data.js"),
  bvb_ai_discard_data_js_1 = require("../fb-common/bvb-ai-discard-data.js"),
  bvb_ai_evolution_data_js_1 = require("../fb-common/bvb-ai-evolution-data.js"),
  bvb_ai_get_best_deploy_data_js_1 = require("../fb-common/bvb-ai-get-best-deploy-data.js"),
  bvb_ai_get_best_rearrange_data_js_1 = require("../fb-common/bvb-ai-get-best-rearrange-data.js"),
  bvb_ai_get_best_swap_data_js_1 = require("../fb-common/bvb-ai-get-best-swap-data.js"),
  bvb_ai_rearrange_data_js_1 = require("../fb-common/bvb-ai-rearrange-data.js"),
  bvb_ai_recycle_data_js_1 = require("../fb-common/bvb-ai-recycle-data.js"),
  bvb_ai_swap_data_js_1 = require("../fb-common/bvb-ai-swap-data.js"),
  bvb_ai_turn_end_data_js_1 = require("../fb-common/bvb-ai-turn-end-data.js"),
  bvb_burn_buff_time_up_data_js_1 = require("../fb-common/bvb-burn-buff-time-up-data.js"),
  bvb_player_battle_win_data_js_1 = require("../fb-common/bvb-player-battle-win-data.js"),
  bvb_player_turn_end_data_js_1 = require("../fb-common/bvb-player-turn-end-data.js"),
  bvb_player_turn_start_data_js_1 = require("../fb-common/bvb-player-turn-start-data.js"),
  bvb_select_cards_end_data_js_1 = require("../fb-common/bvb-select-cards-end-data.js"),
  bvb_start_ai_data_js_1 = require("../fb-common/bvb-start-ai-data.js"),
  bvb_start_battle_data_js_1 = require("../fb-common/bvb-start-battle-data.js"),
  bvb_start_round_data_js_1 = require("../fb-common/bvb-start-round-data.js"),
  bvb_wait_for_game_begin_data_js_1 = require("../fb-common/bvb-wait-for-game-begin-data.js");
var UnionBvbEventData;
function unionToUnionBvbEventData(a, t) {
  switch (UnionBvbEventData[a]) {
    case "NONE":
      return;
    case "BvbAiBattleWinData":
      return t(new bvb_ai_battle_win_data_js_1.BvbAiBattleWinData());
    case "BvbAiChangeData":
      return t(new bvb_ai_change_data_js_1.BvbAiChangeData());
    case "BvbAiDeployData":
      return t(new bvb_ai_deploy_data_js_1.BvbAiDeployData());
    case "BvbAiDiscardData":
      return t(new bvb_ai_discard_data_js_1.BvbAiDiscardData());
    case "BvbAiEvolutionData":
      return t(new bvb_ai_evolution_data_js_1.BvbAiEvolutionData());
    case "BvbAiGetBestDeployData":
      return t(new bvb_ai_get_best_deploy_data_js_1.BvbAiGetBestDeployData());
    case "BvbAiGetBestRearrangeData":
      return t(
        new bvb_ai_get_best_rearrange_data_js_1.BvbAiGetBestRearrangeData(),
      );
    case "BvbAiGetBestSwapData":
      return t(new bvb_ai_get_best_swap_data_js_1.BvbAiGetBestSwapData());
    case "BvbAiRearrangeData":
      return t(new bvb_ai_rearrange_data_js_1.BvbAiRearrangeData());
    case "BvbAiRecycleData":
      return t(new bvb_ai_recycle_data_js_1.BvbAiRecycleData());
    case "BvbAiSwapData":
      return t(new bvb_ai_swap_data_js_1.BvbAiSwapData());
    case "BvbAiTurnEndData":
      return t(new bvb_ai_turn_end_data_js_1.BvbAiTurnEndData());
    case "BvbBurnBuffTimeUpData":
      return t(new bvb_burn_buff_time_up_data_js_1.BvbBurnBuffTimeUpData());
    case "BvbPlayerBattleWinData":
      return t(new bvb_player_battle_win_data_js_1.BvbPlayerBattleWinData());
    case "BvbPlayerTurnEndData":
      return t(new bvb_player_turn_end_data_js_1.BvbPlayerTurnEndData());
    case "BvbPlayerTurnStartData":
      return t(new bvb_player_turn_start_data_js_1.BvbPlayerTurnStartData());
    case "BvbSelectCardsEndData":
      return t(new bvb_select_cards_end_data_js_1.BvbSelectCardsEndData());
    case "BvbStartAiData":
      return t(new bvb_start_ai_data_js_1.BvbStartAiData());
    case "BvbStartBattleData":
      return t(new bvb_start_battle_data_js_1.BvbStartBattleData());
    case "BvbStartRoundData":
      return t(new bvb_start_round_data_js_1.BvbStartRoundData());
    case "BvbWaitForGameBeginData":
      return t(new bvb_wait_for_game_begin_data_js_1.BvbWaitForGameBeginData());
    default:
      return;
  }
}
function unionListToUnionBvbEventData(a, t, e) {
  switch (UnionBvbEventData[a]) {
    case "NONE":
      return;
    case "BvbAiBattleWinData":
      return t(e, new bvb_ai_battle_win_data_js_1.BvbAiBattleWinData());
    case "BvbAiChangeData":
      return t(e, new bvb_ai_change_data_js_1.BvbAiChangeData());
    case "BvbAiDeployData":
      return t(e, new bvb_ai_deploy_data_js_1.BvbAiDeployData());
    case "BvbAiDiscardData":
      return t(e, new bvb_ai_discard_data_js_1.BvbAiDiscardData());
    case "BvbAiEvolutionData":
      return t(e, new bvb_ai_evolution_data_js_1.BvbAiEvolutionData());
    case "BvbAiGetBestDeployData":
      return t(
        e,
        new bvb_ai_get_best_deploy_data_js_1.BvbAiGetBestDeployData(),
      );
    case "BvbAiGetBestRearrangeData":
      return t(
        e,
        new bvb_ai_get_best_rearrange_data_js_1.BvbAiGetBestRearrangeData(),
      );
    case "BvbAiGetBestSwapData":
      return t(e, new bvb_ai_get_best_swap_data_js_1.BvbAiGetBestSwapData());
    case "BvbAiRearrangeData":
      return t(e, new bvb_ai_rearrange_data_js_1.BvbAiRearrangeData());
    case "BvbAiRecycleData":
      return t(e, new bvb_ai_recycle_data_js_1.BvbAiRecycleData());
    case "BvbAiSwapData":
      return t(e, new bvb_ai_swap_data_js_1.BvbAiSwapData());
    case "BvbAiTurnEndData":
      return t(e, new bvb_ai_turn_end_data_js_1.BvbAiTurnEndData());
    case "BvbBurnBuffTimeUpData":
      return t(e, new bvb_burn_buff_time_up_data_js_1.BvbBurnBuffTimeUpData());
    case "BvbPlayerBattleWinData":
      return t(e, new bvb_player_battle_win_data_js_1.BvbPlayerBattleWinData());
    case "BvbPlayerTurnEndData":
      return t(e, new bvb_player_turn_end_data_js_1.BvbPlayerTurnEndData());
    case "BvbPlayerTurnStartData":
      return t(e, new bvb_player_turn_start_data_js_1.BvbPlayerTurnStartData());
    case "BvbSelectCardsEndData":
      return t(e, new bvb_select_cards_end_data_js_1.BvbSelectCardsEndData());
    case "BvbStartAiData":
      return t(e, new bvb_start_ai_data_js_1.BvbStartAiData());
    case "BvbStartBattleData":
      return t(e, new bvb_start_battle_data_js_1.BvbStartBattleData());
    case "BvbStartRoundData":
      return t(e, new bvb_start_round_data_js_1.BvbStartRoundData());
    case "BvbWaitForGameBeginData":
      return t(
        e,
        new bvb_wait_for_game_begin_data_js_1.BvbWaitForGameBeginData(),
      );
    default:
      return;
  }
}
!(function (a) {
  (a[(a.NONE = 0)] = "NONE"),
    (a[(a.BvbAiBattleWinData = 1)] = "BvbAiBattleWinData"),
    (a[(a.BvbAiChangeData = 2)] = "BvbAiChangeData"),
    (a[(a.BvbAiDeployData = 3)] = "BvbAiDeployData"),
    (a[(a.BvbAiDiscardData = 4)] = "BvbAiDiscardData"),
    (a[(a.BvbAiEvolutionData = 5)] = "BvbAiEvolutionData"),
    (a[(a.BvbAiGetBestDeployData = 6)] = "BvbAiGetBestDeployData"),
    (a[(a.BvbAiGetBestRearrangeData = 7)] = "BvbAiGetBestRearrangeData"),
    (a[(a.BvbAiGetBestSwapData = 8)] = "BvbAiGetBestSwapData"),
    (a[(a.BvbAiRearrangeData = 9)] = "BvbAiRearrangeData"),
    (a[(a.BvbAiRecycleData = 10)] = "BvbAiRecycleData"),
    (a[(a.BvbAiSwapData = 11)] = "BvbAiSwapData"),
    (a[(a.BvbAiTurnEndData = 12)] = "BvbAiTurnEndData"),
    (a[(a.BvbBurnBuffTimeUpData = 13)] = "BvbBurnBuffTimeUpData"),
    (a[(a.BvbPlayerBattleWinData = 14)] = "BvbPlayerBattleWinData"),
    (a[(a.BvbPlayerTurnEndData = 15)] = "BvbPlayerTurnEndData"),
    (a[(a.BvbPlayerTurnStartData = 16)] = "BvbPlayerTurnStartData"),
    (a[(a.BvbSelectCardsEndData = 17)] = "BvbSelectCardsEndData"),
    (a[(a.BvbStartAiData = 18)] = "BvbStartAiData"),
    (a[(a.BvbStartBattleData = 19)] = "BvbStartBattleData"),
    (a[(a.BvbStartRoundData = 20)] = "BvbStartRoundData"),
    (a[(a.BvbWaitForGameBeginData = 21)] = "BvbWaitForGameBeginData");
})(
  (UnionBvbEventData =
    exports.UnionBvbEventData || (exports.UnionBvbEventData = {})),
),
  (exports.unionToUnionBvbEventData = unionToUnionBvbEventData),
  (exports.unionListToUnionBvbEventData = unionListToUnionBvbEventData);
//# sourceMappingURL=union-bvb-event-data.js.map
