"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RewardConfig = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  DropPackageById_1 = require("../../../Core/Define/ConfigQuery/DropPackageById"),
  DropShowPlanById_1 = require("../../../Core/Define/ConfigQuery/DropShowPlanById"),
  ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class RewardConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments),
      (this.nao = void 0),
      (this.sao = void 0),
      (this.aao = void 0),
      (this.hao = void 0),
      (this.lao = void 0),
      (this._ao = void 0),
      (this.uao = void 0),
      (this.cao = void 0),
      (this.mao = void 0),
      (this.dao = void 0),
      (this.Cao = void 0),
      (this.gao = void 0);
  }
  GetDropPackage(t) {
    return DropPackageById_1.configDropPackageById.GetConfig(t);
  }
  GetDropPackagePreview(t) {
    t = DropPackageById_1.configDropPackageById.GetConfig(t);
    if (t) return t.DropPreview;
  }
  GetDropPackagePreviewItemList(t) {
    var o,
      e,
      i = [];
    for ([o, e] of DropPackageById_1.configDropPackageById.GetConfig(t)
      .DropPreview)
      i.push([{ ItemId: o, IncId: 0 }, e]);
    return i;
  }
  GetDropShowPlan(t) {
    return DropShowPlanById_1.configDropShowPlanById.GetConfig(t);
  }
  GetSpeed() {
    return (
      this.nao ||
        (this.nao =
          CommonParamById_1.configCommonParamById.GetIntConfig(
            "adsorption_speed",
          )),
      this.nao
    );
  }
  GetMaxAdsorption() {
    return (
      this.sao ||
        (this.sao =
          CommonParamById_1.configCommonParamById.GetIntConfig(
            "adsorption_time",
          )),
      this.sao
    );
  }
  GetHeightProtect() {
    return (
      this.aao ||
        (this.aao = CommonParamById_1.configCommonParamById.GetIntConfig(
          "drop_height_protect",
        )),
      this.aao
    );
  }
  GetRestitution() {
    return (
      this.hao ||
        (this.hao = CommonParamById_1.configCommonParamById.GetFloatConfig(
          "drop_bounce_coefficient",
        )),
      this.hao
    );
  }
  GetFriction() {
    return (
      this.lao ||
        (this.lao =
          CommonParamById_1.configCommonParamById.GetFloatConfig(
            "drop_friction",
          )),
      this.lao
    );
  }
  GetDropItemPickUpRange() {
    return (
      this._ao ||
        (this._ao = CommonParamById_1.configCommonParamById.GetIntConfig(
          "drop_item_pickup_range",
        )),
      this._ao
    );
  }
  GetPickUpInBagRange() {
    return (
      this.uao ||
        (this.uao = CommonParamById_1.configCommonParamById.GetIntConfig(
          "drop_pickup_in_bag_range",
        )),
      this.uao
    );
  }
  GetDropItemAcceleration() {
    return (
      this.cao ||
        (this.cao = CommonParamById_1.configCommonParamById.GetIntConfig(
          "adsorption_acceleration",
        )),
      this.cao
    );
  }
  GetFallToGroundSpeed() {
    return (
      this.mao ||
        (this.mao = CommonParamById_1.configCommonParamById.GetIntConfig(
          "drop_fall_ground_speed",
        )),
      this.mao
    );
  }
  GetDropChestOffsetZ() {
    return (
      this.dao ||
        (this.dao = CommonParamById_1.configCommonParamById.GetIntConfig(
          "drop_chest_zaxis_offset",
        )),
      this.dao
    );
  }
  GetDropBornRadius() {
    return (
      this.Cao ||
        (this.Cao =
          CommonParamById_1.configCommonParamById.GetIntConfig(
            "drop_born_radius",
          )),
      this.Cao
    );
  }
  GetDropRotationProtectTime() {
    return (
      this.gao ||
        (this.gao = CommonParamById_1.configCommonParamById.GetIntConfig(
          "drop_lock_rotation_time",
        )),
      this.gao
    );
  }
  GetMergedDropPackagePreviewItemList(t) {
    var o = [];
    if (t)
      for (const r of t) {
        var e = this.GetDropPackage(r)?.DropPreview;
        if (e)
          for (const a of e) {
            var i = [{ IncId: 0, ItemId: a[0] }, a[1]];
            o.push(i);
          }
      }
    return o;
  }
  GetLowModeCount() {
    var t = CommonParamById_1.configCommonParamById.GetIntConfig(
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
      0 <= t ? t : 1
    );
  }
  GetFastModeCount() {
    var t = CommonParamById_1.configCommonParamById.GetIntConfig(
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
      0 <= t ? t : 1
    );
  }
  GetLowModeNextAddItemTime() {
    var t = CommonParamById_1.configCommonParamById.GetIntConfig(
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
      0 <= t ? t : 1
    );
  }
  GetFastModeNextAddItemTime() {
    var t = CommonParamById_1.configCommonParamById.GetIntConfig(
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
      0 <= t ? t : 1
    );
  }
  GetIntoBagMaxCount() {
    var t =
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
      0 <= t ? t : 1
    );
  }
  GetShowTime() {
    var t =
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
      0 <= t ? t : 3e3
    );
  }
  GetNextItemTime() {
    var t = CommonParamById_1.configCommonParamById.GetIntConfig(
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
      0 <= t ? t : 300
    );
  }
  GetSliderTime() {
    var t = CommonParamById_1.configCommonParamById.GetIntConfig(
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
      0 <= t ? t : 200
    );
  }
  OnClear() {
    return (
      (this.nao = void 0),
      (this.sao = void 0),
      (this.aao = void 0),
      (this.hao = void 0),
      (this.lao = void 0),
      (this._ao = void 0),
      (this.uao = void 0),
      (this.cao = void 0),
      (this.mao = void 0),
      (this.dao = void 0),
      !(this.Cao = void 0)
    );
  }
}
exports.RewardConfig = RewardConfig;
//# sourceMappingURL=RewardConfig.js.map
