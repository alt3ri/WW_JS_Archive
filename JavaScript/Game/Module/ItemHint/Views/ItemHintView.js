"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemHintView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  ItemHintItem_1 = require("./ItemHintItem"),
  ItemPriorHintItem_1 = require("./ItemPriorHintItem"),
  ListSliderControl_1 = require("./ListSliderControl");
class ItemHintView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.e0i = void 0),
      (this.t0i = void 0),
      (this.i0i = () =>
        ConfigManager_1.ConfigManager.ItemConfig.GetItemListMaxSize()),
      (this.o0i = () =>
        ConfigManager_1.ConfigManager.ItemConfig.GetPriorItemListMaxSize()),
      (this.r0i = () =>
        !ModelManager_1.ModelManager.ItemHintModel.IsMainInterfaceDataEmpty),
      (this.n0i = () =>
        !ModelManager_1.ModelManager.ItemHintModel.IsPriorInterfaceDataEmpty),
      (this.s0i = () =>
        ConfigManager_1.ConfigManager.RewardConfig.GetNextItemTime()),
      (this.HDe = () => {
        this.t0i.IsFinish && this.e0i.IsFinish && this.CloseMe();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [1, UE.UIItem],
      [0, UE.UIItem],
    ];
  }
  OnBeforeDestroy() {
    this.e0i && (this.e0i.DestroyMe(), (this.e0i = void 0)),
      this.t0i && (this.t0i.DestroyMe(), (this.t0i = void 0));
  }
  OnStart() {
    this.r0i() || this.n0i()
      ? ((this.e0i = new ListSliderControl_1.ListSliderControl(
          ItemHintItem_1.ItemHintItem,
          this.GetItem(1),
          this.i0i,
          this.r0i,
          this.s0i,
          this.HDe,
          0,
        )),
        this.e0i.DisEnableParentLayout(),
        (this.t0i = new ListSliderControl_1.ListSliderControl(
          ItemPriorHintItem_1.ItemPriorHintItem,
          this.GetItem(0),
          this.o0i,
          this.n0i,
          this.s0i,
          this.HDe,
          0,
        )),
        this.t0i.DisEnableParentLayout())
      : (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("ItemHint", 9, "进包列表为空, 但打开了界面!"),
        this.CloseMe());
  }
  OnTick(i) {
    this.t0i && this.t0i.Tick(i), this.e0i && this.e0i.Tick(i);
  }
}
exports.ItemHintView = ItemHintView;
//# sourceMappingURL=ItemHintView.js.map
