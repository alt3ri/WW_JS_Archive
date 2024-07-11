"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RewardConfig = void 0);
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const DropPackageById_1 = require("../../../Core/Define/ConfigQuery/DropPackageById");
const DropShowPlanById_1 = require("../../../Core/Define/ConfigQuery/DropShowPlanById");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class RewardConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments),
      (this.lso = void 0),
      (this._so = void 0),
      (this.uso = void 0),
      (this.cso = void 0),
      (this.mso = void 0),
      (this.dso = void 0),
      (this.Cso = void 0),
      (this.gso = void 0),
      (this.fso = void 0),
      (this.pso = void 0),
      (this.vso = void 0),
      (this.Mso = void 0);
  }
  GetDropPackage(t) {
    return DropPackageById_1.configDropPackageById.GetConfig(t);
  }
  GetDropPackagePreview(t) {
    t = DropPackageById_1.configDropPackageById.GetConfig(t);
    if (t) return t.DropPreview;
  }
  GetDropShowPlan(t) {
    return DropShowPlanById_1.configDropShowPlanById.GetConfig(t);
  }
  GetSpeed() {
    return (
      this.lso ||
        (this.lso =
          CommonParamById_1.configCommonParamById.GetIntConfig(
            "adsorption_speed",
          )),
      this.lso
    );
  }
  GetMaxAdsorption() {
    return (
      this._so ||
        (this._so =
          CommonParamById_1.configCommonParamById.GetIntConfig(
            "adsorption_time",
          )),
      this._so
    );
  }
  GetHeightProtect() {
    return (
      this.uso ||
        (this.uso = CommonParamById_1.configCommonParamById.GetIntConfig(
          "drop_height_protect",
        )),
      this.uso
    );
  }
  GetRestitution() {
    return (
      this.cso ||
        (this.cso = CommonParamById_1.configCommonParamById.GetFloatConfig(
          "drop_bounce_coefficient",
        )),
      this.cso
    );
  }
  GetFriction() {
    return (
      this.mso ||
        (this.mso =
          CommonParamById_1.configCommonParamById.GetFloatConfig(
            "drop_friction",
          )),
      this.mso
    );
  }
  GetDropItemPickUpRange() {
    return (
      this.dso ||
        (this.dso = CommonParamById_1.configCommonParamById.GetIntConfig(
          "drop_item_pickup_range",
        )),
      this.dso
    );
  }
  GetPickUpInBagRange() {
    return (
      this.Cso ||
        (this.Cso = CommonParamById_1.configCommonParamById.GetIntConfig(
          "drop_pickup_in_bag_range",
        )),
      this.Cso
    );
  }
  GetDropItemAcceleration() {
    return (
      this.gso ||
        (this.gso = CommonParamById_1.configCommonParamById.GetIntConfig(
          "adsorption_acceleration",
        )),
      this.gso
    );
  }
  GetFallToGroundSpeed() {
    return (
      this.fso ||
        (this.fso = CommonParamById_1.configCommonParamById.GetIntConfig(
          "drop_fall_ground_speed",
        )),
      this.fso
    );
  }
  GetDropChestOffsetZ() {
    return (
      this.pso ||
        (this.pso = CommonParamById_1.configCommonParamById.GetIntConfig(
          "drop_chest_zaxis_offset",
        )),
      this.pso
    );
  }
  GetDropBornRadius() {
    return (
      this.vso ||
        (this.vso =
          CommonParamById_1.configCommonParamById.GetIntConfig(
            "drop_born_radius",
          )),
      this.vso
    );
  }
  GetDropRotationProtectTime() {
    return (
      this.Mso ||
        (this.Mso = CommonParamById_1.configCommonParamById.GetIntConfig(
          "drop_lock_rotation_time",
        )),
      this.Mso
    );
  }
  GetMergedDropPackagePreviewItemList(t) {
    const o = [];
    if (t)
      for (const r of t) {
        const e = this.GetDropPackage(r)?.DropPreview;
        if (e)
          for (const _ of e) {
            const i = [{ IncId: 0, ItemId: _[0] }, _[1]];
            o.push(i);
          }
      }
    return o;
  }
  GetLowModeCount() {
    const t = CommonParamById_1.configCommonParamById.GetIntConfig(
      "into_bag_list_low_count",
    );
    return (
      void 0 === t &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Reward",
          9,
          '慢速模式最大数量无法找到, 请检测c.参数字段"into_bag_list_low_count"',
        ),
      t >= 0 ? t : 1
    );
  }
  GetFastModeCount() {
    const t = CommonParamById_1.configCommonParamById.GetIntConfig(
      "into_bag_list_fast_count",
    );
    return (
      void 0 === t &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Reward",
          9,
          '快速模式最大数量无法找到, 请检测c.参数字段"into_bag_list_fast_count"',
        ),
      t >= 0 ? t : 1
    );
  }
  GetLowModeNextAddItemTime() {
    const t = CommonParamById_1.configCommonParamById.GetIntConfig(
      "into_bag_next_item_low_time",
    );
    return (
      void 0 === t &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Reward",
          9,
          '慢速模式下一个物品进包时间无法找到, 请检测c.参数字段"into_bag_next_item_low_time"',
        ),
      t >= 0 ? t : 1
    );
  }
  GetFastModeNextAddItemTime() {
    const t = CommonParamById_1.configCommonParamById.GetIntConfig(
      "into_bag_next_item_fast_time",
    );
    return (
      void 0 === t &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Reward",
          9,
          '快速模式下一个物品进包时间无法找到, 请检测c.参数字段"into_bag_next_item_fast_time"',
        ),
      t >= 0 ? t : 1
    );
  }
  GetIntoBagMaxCount() {
    const t =
      CommonParamById_1.configCommonParamById.GetIntConfig(
        "item_list_max_size",
      );
    return (
      void 0 === t &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Reward",
          9,
          '外入包列表最大数量无法找到, 请检测c.参数字段"item_list_max_size"',
        ),
      t >= 0 ? t : 1
    );
  }
  GetShowTime() {
    const t =
      CommonParamById_1.configCommonParamById.GetIntConfig(
        "into_bag_show_time",
      );
    return (
      void 0 === t &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Reward",
          9,
          '入包每个物品的显示时间无法找到, 请检测c.参数字段"into_bag_show_time"',
        ),
      t >= 0 ? t : 3e3
    );
  }
  GetNextItemTime() {
    const t = CommonParamById_1.configCommonParamById.GetIntConfig(
      "into_bag_next_item_time",
    );
    return (
      void 0 === t &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Reward",
          9,
          '下一个物品添加进来的时间无法找到, 请检测c.参数字段"into_bag_next_item_time"',
        ),
      t >= 0 ? t : 300
    );
  }
  GetSliderTime() {
    const t = CommonParamById_1.configCommonParamById.GetIntConfig(
      "into_bag_slide_time",
    );
    return (
      void 0 === t &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Reward",
          9,
          '上滑时间无法找到, 请检测c.参数字段"into_bag_slide_time"',
        ),
      t >= 0 ? t : 200
    );
  }
  OnClear() {
    return (
      (this.lso = void 0),
      (this._so = void 0),
      (this.uso = void 0),
      (this.cso = void 0),
      (this.mso = void 0),
      (this.dso = void 0),
      (this.Cso = void 0),
      (this.gso = void 0),
      (this.fso = void 0),
      (this.pso = void 0),
      !(this.vso = void 0)
    );
  }
}
exports.RewardConfig = RewardConfig;
// # sourceMappingURL=RewardConfig.js.map
