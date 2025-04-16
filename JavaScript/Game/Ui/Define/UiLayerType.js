"use strict";
var ELayerType;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MULTIPLE_VIEW_TYPE =
    exports.BLOCKCLICK_TYPE =
    exports.UIBLUR_TYPE =
    exports.IGNORE_MASK_TYPE =
    exports.NORMAL_PLOT_CONTAINER_TYPE =
    exports.PLOT_CONTAINER_TYPE =
    exports.NORMAL_CONTAINER_TYPE =
    exports.BATTLE_VIEW_UNIT_COUNT =
    exports.TIP_LAYER_UNIT_COUNT =
    exports.LayerTypeEnumValues =
    exports.ELayerType =
      void 0),
  (function (e) {
    (e[(e.HUD = 1)] = "HUD"),
      (e[(e.Normal = 2)] = "Normal"),
      (e[(e.Plot = 4)] = "Plot"),
      (e[(e.NormalMask = 8)] = "NormalMask"),
      (e[(e.BattleFloat = 16)] = "BattleFloat"),
      (e[(e.Pop = 32)] = "Pop"),
      (e[(e.Float = 64)] = "Float"),
      (e[(e.Guide = 128)] = "Guide"),
      (e[(e.Loading = 256)] = "Loading"),
      (e[(e.NetWork = 512)] = "NetWork"),
      (e[(e.CG = 1024)] = "CG"),
      (e[(e.Mask = 2048)] = "Mask"),
      (e[(e.WaterMask = 4096)] = "WaterMask"),
      (e[(e.Pool = 8192)] = "Pool"),
      (e[(e.Debug = 16384)] = "Debug");
  })((ELayerType = exports.ELayerType || (exports.ELayerType = {}))),
  (exports.LayerTypeEnumValues = Object.values(ELayerType).filter(
    (e) => "number" == typeof e,
  )),
  (exports.TIP_LAYER_UNIT_COUNT = 3),
  (exports.BATTLE_VIEW_UNIT_COUNT = 3),
  (exports.NORMAL_CONTAINER_TYPE = ELayerType.Normal | ELayerType.CG),
  (exports.PLOT_CONTAINER_TYPE = ELayerType.Plot),
  (exports.NORMAL_PLOT_CONTAINER_TYPE =
    exports.NORMAL_CONTAINER_TYPE | exports.PLOT_CONTAINER_TYPE),
  (exports.IGNORE_MASK_TYPE = ELayerType.Float | ELayerType.Guide),
  (exports.UIBLUR_TYPE = ELayerType.Normal | ELayerType.Plot | ELayerType.Pop),
  (exports.BLOCKCLICK_TYPE =
    ELayerType.Normal | ELayerType.Plot | ELayerType.Pop),
  (exports.MULTIPLE_VIEW_TYPE = ELayerType.Float);
//# sourceMappingURL=UiLayerType.js.map
