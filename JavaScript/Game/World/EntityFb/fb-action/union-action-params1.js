"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionActionParams1 =
    exports.unionToUnionActionParams1 =
    exports.UnionActionParams1 =
      void 0);
const exec_resurrection_js_1 = require("../fb-action/exec-resurrection.js"),
  exec_risk_harvest_effect_js_1 = require("../fb-action/exec-risk-harvest-effect.js"),
  hide_group_js_1 = require("../fb-action/hide-group.js"),
  hide_specific_entities_js_1 = require("../fb-action/hide-specific-entities.js"),
  hide_target_range_js_1 = require("../fb-action/hide-target-range.js"),
  mowing_tower_goto_next_floor_js_1 = require("../fb-action/mowing-tower-goto-next-floor.js"),
  open_system_board_with_return_js_1 = require("../fb-action/open-system-board-with-return.js"),
  performer_ai_move_to_js_1 = require("../fb-action/performer-ai-move-to.js"),
  performer_ai_spline_move_js_1 = require("../fb-action/performer-ai-spline-move.js"),
  set_audio_state_js_1 = require("../fb-action/set-audio-state.js"),
  setup_morale_system_js_1 = require("../fb-action/setup-morale-system.js"),
  show_hided_group_js_1 = require("../fb-action/show-hided-group.js"),
  show_specific_entities_js_1 = require("../fb-action/show-specific-entities.js"),
  show_target_range_js_1 = require("../fb-action/show-target-range.js"),
  slash_and_tower_goto_next_floor_js_1 = require("../fb-action/slash-and-tower-goto-next-floor.js"),
  summon_entity_js_1 = require("../fb-action/summon-entity.js");
var UnionActionParams1;
function unionToUnionActionParams1(e, r) {
  switch (UnionActionParams1[e]) {
    case "NONE":
      return;
    case "SetAudioState":
      return r(new set_audio_state_js_1.SetAudioState());
    case "PerformerAiSplineMove":
      return r(new performer_ai_spline_move_js_1.PerformerAiSplineMove());
    case "PerformerAiMoveTo":
      return r(new performer_ai_move_to_js_1.PerformerAiMoveTo());
    case "HideTargetRange":
      return r(new hide_target_range_js_1.HideTargetRange());
    case "ShowTargetRange":
      return r(new show_target_range_js_1.ShowTargetRange());
    case "HideSpecificEntities":
      return r(new hide_specific_entities_js_1.HideSpecificEntities());
    case "ShowSpecificEntities":
      return r(new show_specific_entities_js_1.ShowSpecificEntities());
    case "HideGroup":
      return r(new hide_group_js_1.HideGroup());
    case "ShowHidedGroup":
      return r(new show_hided_group_js_1.ShowHidedGroup());
    case "ExecResurrection":
      return r(new exec_resurrection_js_1.ExecResurrection());
    case "OpenSystemBoardWithReturn":
      return r(
        new open_system_board_with_return_js_1.OpenSystemBoardWithReturn(),
      );
    case "ExecRiskHarvestEffect":
      return r(new exec_risk_harvest_effect_js_1.ExecRiskHarvestEffect());
    case "MowingTowerGotoNextFloor":
      return r(
        new mowing_tower_goto_next_floor_js_1.MowingTowerGotoNextFloor(),
      );
    case "SlashAndTowerGotoNextFloor":
      return r(
        new slash_and_tower_goto_next_floor_js_1.SlashAndTowerGotoNextFloor(),
      );
    case "SummonEntity":
      return r(new summon_entity_js_1.SummonEntity());
    case "SetupMoraleSystem":
      return r(new setup_morale_system_js_1.SetupMoraleSystem());
    default:
      return;
  }
}
function unionListToUnionActionParams1(e, r, t) {
  switch (UnionActionParams1[e]) {
    case "NONE":
      return;
    case "SetAudioState":
      return r(t, new set_audio_state_js_1.SetAudioState());
    case "PerformerAiSplineMove":
      return r(t, new performer_ai_spline_move_js_1.PerformerAiSplineMove());
    case "PerformerAiMoveTo":
      return r(t, new performer_ai_move_to_js_1.PerformerAiMoveTo());
    case "HideTargetRange":
      return r(t, new hide_target_range_js_1.HideTargetRange());
    case "ShowTargetRange":
      return r(t, new show_target_range_js_1.ShowTargetRange());
    case "HideSpecificEntities":
      return r(t, new hide_specific_entities_js_1.HideSpecificEntities());
    case "ShowSpecificEntities":
      return r(t, new show_specific_entities_js_1.ShowSpecificEntities());
    case "HideGroup":
      return r(t, new hide_group_js_1.HideGroup());
    case "ShowHidedGroup":
      return r(t, new show_hided_group_js_1.ShowHidedGroup());
    case "ExecResurrection":
      return r(t, new exec_resurrection_js_1.ExecResurrection());
    case "OpenSystemBoardWithReturn":
      return r(
        t,
        new open_system_board_with_return_js_1.OpenSystemBoardWithReturn(),
      );
    case "ExecRiskHarvestEffect":
      return r(t, new exec_risk_harvest_effect_js_1.ExecRiskHarvestEffect());
    case "MowingTowerGotoNextFloor":
      return r(
        t,
        new mowing_tower_goto_next_floor_js_1.MowingTowerGotoNextFloor(),
      );
    case "SlashAndTowerGotoNextFloor":
      return r(
        t,
        new slash_and_tower_goto_next_floor_js_1.SlashAndTowerGotoNextFloor(),
      );
    case "SummonEntity":
      return r(t, new summon_entity_js_1.SummonEntity());
    case "SetupMoraleSystem":
      return r(t, new setup_morale_system_js_1.SetupMoraleSystem());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.SetAudioState = 1)] = "SetAudioState"),
    (e[(e.PerformerAiSplineMove = 2)] = "PerformerAiSplineMove"),
    (e[(e.PerformerAiMoveTo = 3)] = "PerformerAiMoveTo"),
    (e[(e.HideTargetRange = 4)] = "HideTargetRange"),
    (e[(e.ShowTargetRange = 5)] = "ShowTargetRange"),
    (e[(e.HideSpecificEntities = 6)] = "HideSpecificEntities"),
    (e[(e.ShowSpecificEntities = 7)] = "ShowSpecificEntities"),
    (e[(e.HideGroup = 8)] = "HideGroup"),
    (e[(e.ShowHidedGroup = 9)] = "ShowHidedGroup"),
    (e[(e.ExecResurrection = 10)] = "ExecResurrection"),
    (e[(e.OpenSystemBoardWithReturn = 11)] = "OpenSystemBoardWithReturn"),
    (e[(e.ExecRiskHarvestEffect = 12)] = "ExecRiskHarvestEffect"),
    (e[(e.MowingTowerGotoNextFloor = 13)] = "MowingTowerGotoNextFloor"),
    (e[(e.SlashAndTowerGotoNextFloor = 14)] = "SlashAndTowerGotoNextFloor"),
    (e[(e.SummonEntity = 15)] = "SummonEntity"),
    (e[(e.SetupMoraleSystem = 16)] = "SetupMoraleSystem");
})(
  (UnionActionParams1 =
    exports.UnionActionParams1 || (exports.UnionActionParams1 = {})),
),
  (exports.unionToUnionActionParams1 = unionToUnionActionParams1),
  (exports.unionListToUnionActionParams1 = unionListToUnionActionParams1);
//# sourceMappingURL=union-action-params1.js.map
