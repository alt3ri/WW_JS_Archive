"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AreaMarkItemView = void 0);
const Log_1 = require("../../../../../Core/Common/Log");
const AreaByDeliveryMarkId_1 = require("../../../../../Core/Define/ConfigQuery/AreaByDeliveryMarkId");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ExploreProgressDefine_1 = require("../../../ExploreProgress/ExploreProgressDefine");
const ConfigMarkItemView_1 = require("./ConfigMarkItemView");
const LEVEL_TWO_SIZE = 48;
const LEVEL_TREE_SIZE = 36;
class AreaMarkItemView extends ConfigMarkItemView_1.ConfigMarkItemView {
  constructor(e) {
    super(e);
  }
  OnInitialize() {
    super.OnInitialize(), this.SetNameText();
  }
  SetNameText() {
    let e = AreaByDeliveryMarkId_1.configAreaByDeliveryMarkId.GetConfig(
      this.Holder.MarkId,
    );
    if (e) {
      const a =
        ModelManager_1.ModelManager.ExploreProgressModel.GetExploreAreaData(
          e.AreaId,
        );
      const o = this.Holder.MarkConfig.MarkTitle;
      let r = LEVEL_TREE_SIZE;
      let i = "";
      let t = "SmallAreaName";
      e.Level === ExploreProgressDefine_1.AREA_LEVEL &&
        ((e = a?.GetProgress()?.toString() ?? "0"),
        (i = StringUtils_1.StringUtils.Format("{0}%", e)),
        (r = LEVEL_TWO_SIZE),
        (t = "BigAreaName")),
        this.GetNameComponentAsync().then((e) => {
          e.SetName(t, o, i, r);
        });
    } else
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Map", 50, "缺少区域配置", [
          "标记id",
          this.Holder.MarkId.toString(),
        ]);
  }
  GetInteractiveFlag() {
    return !1;
  }
}
exports.AreaMarkItemView = AreaMarkItemView;
// # sourceMappingURL=AreaMarkItemView.js.map
