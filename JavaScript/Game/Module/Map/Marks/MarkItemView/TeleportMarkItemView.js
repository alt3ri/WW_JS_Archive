"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TeleportMarkItemView = void 0);
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const ConfigMarkItemView_1 = require("./ConfigMarkItemView");
const SUB_ICON_PATH = "SP_MarkRecommend";
const MULTI_MAP_ICON_PATH = "SP_MarkMultiMap";
const MULTI_MAP_SELECT_ICON_PATH = "SP_MarkMultiMapSelect";
class TeleportMarkItemView extends ConfigMarkItemView_1.ConfigMarkItemView {
  constructor(e) {
    super(e),
      (this.OnMarkItemStateChange = (e) => {
        (ModelManager_1.ModelManager.MapModel?.GetMarkExtraShowState(
          this.Holder.MarkId,
        )).ShowFlag === Protocol_1.Aki.Protocol.BNs.Proto_ShowDisable
          ? this.GetSprite(2).SetUIActive(!0)
          : this.GetSprite(2).SetUIActive(!1);
      });
  }
  OnInitialize() {
    super.OnInitialize();
  }
  OnAfterShow() {
    super.OnAfterShow(),
      this.UpdateMultiMapFloorSelectState(!0),
      this.OnIconPathChanged(this.Holder.IconPath);
  }
  OnUpdate(e, t, o) {
    super.OnUpdate(e, t, o), this.UpdateMultiMapFloorSelectState();
  }
  UpdateMultiMapFloorSelectState(e = !1) {
    (this.Holder?.MapType !== 2 || e) &&
      (e = this.Holder).IsDirty &&
      ((e.IsDirty = !1), this.hGn());
  }
  OnIconPathChanged(e) {
    const t = this.GetSprite(1);
    const o = this.Holder;
    const r = ModelManager_1.ModelManager.MapModel?.GetMarkExtraShowState(
      this.Holder.MarkId,
    );
    this.GetSprite(1).SetUIActive(!0),
      this.LoadIcon(t, e),
      o.IsDungeonEntrance && !o.IsFogUnlock
        ? this.GetChildIconComponentAsync()
            .then(
              (e) => {
                e.SetUiActive(!0),
                  (e.Icon =
                    ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
                      SUB_ICON_PATH,
                    ));
              },
              void 0,
            )
            .catch((e) => {
              e &&
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Map",
                  35,
                  "TeleportMarkItemView OnIconPathChanged 设置副本入口图标错误",
                  e,
                );
            })
            .finally(void 0)
        : this.ChildIconComponentInternal?.SetUiActive(!1),
      this.hGn(),
      r.ShowFlag === Protocol_1.Aki.Protocol.BNs.Proto_ShowDisable
        ? this.GetSprite(2).SetUIActive(!0)
        : this.GetSprite(2).SetUIActive(!1);
  }
  hGn() {
    const t = this.Holder;
    t.IsMultiMapTeleport &&
      this.GetChildIconComponentAsync()
        .then((e) => {
          e.SetUiActive(!0),
            (e.Icon =
              ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
                t.IsSelectThisFloor
                  ? MULTI_MAP_SELECT_ICON_PATH
                  : MULTI_MAP_ICON_PATH,
              ));
        })
        .catch((e) => {
          e &&
            Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Map",
              35,
              "TeleportMarkItemView OnIconPathChanged 设置多层地图图标错误",
              e,
            );
        })
        .finally(void 0);
  }
  OnSelectedStateChange(e) {
    e &&
      (ModelManager_1.ModelManager.MapModel?.GetMarkExtraShowState(
        this.Holder.MarkId,
      )).ShowFlag === Protocol_1.Aki.Protocol.BNs.Proto_ShowDisable &&
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
        "Map_TeleportMark_Disable_Tips",
      );
  }
}
exports.TeleportMarkItemView = TeleportMarkItemView;
// # sourceMappingURL=TeleportMarkItemView.js.map
