"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VectorInfo =
    exports.Vector2 =
    exports.VarDefine =
    exports.UnionVarRef =
    exports.UnionVarConfig =
    exports.UnionParamsPreset =
    exports.UnionBlackBoard =
    exports.TransformValue =
    exports.StringValue =
    exports.SelfVarRef =
    exports.RushWarningEffectParams =
    exports.QuestValue =
    exports.QuestStateValue =
    exports.PrefabValue =
    exports.PosAndRot =
    exports.OtherVarRef =
    exports.IntValue =
    exports.IntArray =
    exports.GlobalVarRef =
    exports.FloatValue =
    exports.EntityValue =
    exports.DecalParams =
    exports.ConstVarRef =
    exports.BooleanValue =
    exports.BlackBoardVector =
    exports.BlackBoardString =
    exports.BlackBoardInt =
    exports.BlackBoardFloat =
    exports.BlackBoardEntityPos =
    exports.BlackBoardEntityId =
    exports.BlackBoardBoolean =
      void 0);
var black_board_boolean_js_1 = require("./fb-var/black-board-boolean.js"),
  black_board_entity_id_js_1 =
    (Object.defineProperty(exports, "BlackBoardBoolean", {
      enumerable: !0,
      get: function () {
        return black_board_boolean_js_1.BlackBoardBoolean;
      },
    }),
    require("./fb-var/black-board-entity-id.js")),
  black_board_entity_pos_js_1 =
    (Object.defineProperty(exports, "BlackBoardEntityId", {
      enumerable: !0,
      get: function () {
        return black_board_entity_id_js_1.BlackBoardEntityId;
      },
    }),
    require("./fb-var/black-board-entity-pos.js")),
  black_board_float_js_1 =
    (Object.defineProperty(exports, "BlackBoardEntityPos", {
      enumerable: !0,
      get: function () {
        return black_board_entity_pos_js_1.BlackBoardEntityPos;
      },
    }),
    require("./fb-var/black-board-float.js")),
  black_board_int_js_1 =
    (Object.defineProperty(exports, "BlackBoardFloat", {
      enumerable: !0,
      get: function () {
        return black_board_float_js_1.BlackBoardFloat;
      },
    }),
    require("./fb-var/black-board-int.js")),
  black_board_string_js_1 =
    (Object.defineProperty(exports, "BlackBoardInt", {
      enumerable: !0,
      get: function () {
        return black_board_int_js_1.BlackBoardInt;
      },
    }),
    require("./fb-var/black-board-string.js")),
  black_board_vector_js_1 =
    (Object.defineProperty(exports, "BlackBoardString", {
      enumerable: !0,
      get: function () {
        return black_board_string_js_1.BlackBoardString;
      },
    }),
    require("./fb-var/black-board-vector.js")),
  boolean_value_js_1 =
    (Object.defineProperty(exports, "BlackBoardVector", {
      enumerable: !0,
      get: function () {
        return black_board_vector_js_1.BlackBoardVector;
      },
    }),
    require("./fb-var/boolean-value.js")),
  const_var_ref_js_1 =
    (Object.defineProperty(exports, "BooleanValue", {
      enumerable: !0,
      get: function () {
        return boolean_value_js_1.BooleanValue;
      },
    }),
    require("./fb-var/const-var-ref.js")),
  decal_params_js_1 =
    (Object.defineProperty(exports, "ConstVarRef", {
      enumerable: !0,
      get: function () {
        return const_var_ref_js_1.ConstVarRef;
      },
    }),
    require("./fb-var/decal-params.js")),
  entity_value_js_1 =
    (Object.defineProperty(exports, "DecalParams", {
      enumerable: !0,
      get: function () {
        return decal_params_js_1.DecalParams;
      },
    }),
    require("./fb-var/entity-value.js")),
  float_value_js_1 =
    (Object.defineProperty(exports, "EntityValue", {
      enumerable: !0,
      get: function () {
        return entity_value_js_1.EntityValue;
      },
    }),
    require("./fb-var/float-value.js")),
  global_var_ref_js_1 =
    (Object.defineProperty(exports, "FloatValue", {
      enumerable: !0,
      get: function () {
        return float_value_js_1.FloatValue;
      },
    }),
    require("./fb-var/global-var-ref.js")),
  int_array_js_1 =
    (Object.defineProperty(exports, "GlobalVarRef", {
      enumerable: !0,
      get: function () {
        return global_var_ref_js_1.GlobalVarRef;
      },
    }),
    require("./fb-var/int-array.js")),
  int_value_js_1 =
    (Object.defineProperty(exports, "IntArray", {
      enumerable: !0,
      get: function () {
        return int_array_js_1.IntArray;
      },
    }),
    require("./fb-var/int-value.js")),
  other_var_ref_js_1 =
    (Object.defineProperty(exports, "IntValue", {
      enumerable: !0,
      get: function () {
        return int_value_js_1.IntValue;
      },
    }),
    require("./fb-var/other-var-ref.js")),
  pos_and_rot_js_1 =
    (Object.defineProperty(exports, "OtherVarRef", {
      enumerable: !0,
      get: function () {
        return other_var_ref_js_1.OtherVarRef;
      },
    }),
    require("./fb-var/pos-and-rot.js")),
  prefab_value_js_1 =
    (Object.defineProperty(exports, "PosAndRot", {
      enumerable: !0,
      get: function () {
        return pos_and_rot_js_1.PosAndRot;
      },
    }),
    require("./fb-var/prefab-value.js")),
  quest_state_value_js_1 =
    (Object.defineProperty(exports, "PrefabValue", {
      enumerable: !0,
      get: function () {
        return prefab_value_js_1.PrefabValue;
      },
    }),
    require("./fb-var/quest-state-value.js")),
  quest_value_js_1 =
    (Object.defineProperty(exports, "QuestStateValue", {
      enumerable: !0,
      get: function () {
        return quest_state_value_js_1.QuestStateValue;
      },
    }),
    require("./fb-var/quest-value.js")),
  rush_warning_effect_params_js_1 =
    (Object.defineProperty(exports, "QuestValue", {
      enumerable: !0,
      get: function () {
        return quest_value_js_1.QuestValue;
      },
    }),
    require("./fb-var/rush-warning-effect-params.js")),
  self_var_ref_js_1 =
    (Object.defineProperty(exports, "RushWarningEffectParams", {
      enumerable: !0,
      get: function () {
        return rush_warning_effect_params_js_1.RushWarningEffectParams;
      },
    }),
    require("./fb-var/self-var-ref.js")),
  string_value_js_1 =
    (Object.defineProperty(exports, "SelfVarRef", {
      enumerable: !0,
      get: function () {
        return self_var_ref_js_1.SelfVarRef;
      },
    }),
    require("./fb-var/string-value.js")),
  transform_value_js_1 =
    (Object.defineProperty(exports, "StringValue", {
      enumerable: !0,
      get: function () {
        return string_value_js_1.StringValue;
      },
    }),
    require("./fb-var/transform-value.js")),
  union_black_board_js_1 =
    (Object.defineProperty(exports, "TransformValue", {
      enumerable: !0,
      get: function () {
        return transform_value_js_1.TransformValue;
      },
    }),
    require("./fb-var/union-black-board.js")),
  union_params_preset_js_1 =
    (Object.defineProperty(exports, "UnionBlackBoard", {
      enumerable: !0,
      get: function () {
        return union_black_board_js_1.UnionBlackBoard;
      },
    }),
    require("./fb-var/union-params-preset.js")),
  union_var_config_js_1 =
    (Object.defineProperty(exports, "UnionParamsPreset", {
      enumerable: !0,
      get: function () {
        return union_params_preset_js_1.UnionParamsPreset;
      },
    }),
    require("./fb-var/union-var-config.js")),
  union_var_ref_js_1 =
    (Object.defineProperty(exports, "UnionVarConfig", {
      enumerable: !0,
      get: function () {
        return union_var_config_js_1.UnionVarConfig;
      },
    }),
    require("./fb-var/union-var-ref.js")),
  var_define_js_1 =
    (Object.defineProperty(exports, "UnionVarRef", {
      enumerable: !0,
      get: function () {
        return union_var_ref_js_1.UnionVarRef;
      },
    }),
    require("./fb-var/var-define.js")),
  vector2_js_1 =
    (Object.defineProperty(exports, "VarDefine", {
      enumerable: !0,
      get: function () {
        return var_define_js_1.VarDefine;
      },
    }),
    require("./fb-var/vector2.js")),
  vector_info_js_1 =
    (Object.defineProperty(exports, "Vector2", {
      enumerable: !0,
      get: function () {
        return vector2_js_1.Vector2;
      },
    }),
    require("./fb-var/vector-info.js"));
Object.defineProperty(exports, "VectorInfo", {
  enumerable: !0,
  get: function () {
    return vector_info_js_1.VectorInfo;
  },
});
//# sourceMappingURL=fb-var.js.map
