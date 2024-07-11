"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TeleportMarkItemView = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController"),
  ConfigMarkItemView_1 = require("./ConfigMarkItemView"),
  SUB_ICON_PATH = "SP_MarkRecommend",
  MULTI_MAP_ICON_PATH = "SP_MarkMultiMap",
  MULTI_MAP_SELECT_ICON_PATH = "SP_MarkMultiMapSelect";
class TeleportMarkItemView extends ConfigMarkItemView_1.ConfigMarkItemView {
  constructor(e) {
    super(e),
      (this.IsSelectThisFloor = !1),
      (this.jbn = (e) => {
        var t = this.Holder;
        (this.IsSelectThisFloor = t.MarkMultiMapId === e),
          this.OnIconPathChanged(t.IconPath);
      }),
      (this.OnMarkItemStateChange = (e) => {
        (ModelManager_1.ModelManager.MapModel?.GetMarkExtraShowState(
          this.Holder.MarkId,
        )).ShowFlag === Protocol_1.Aki.Protocol.I6s.Proto_ShowDisable
          ? this.GetSprite(2).SetUIActive(!0)
          : this.GetSprite(2).SetUIActive(!1);
      });
  }
  OnInitialize() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnMarkItemShowStateChange,
      this.OnMarkItemStateChange,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldMapSelectMultiMap,
        this.jbn,
      ),
      super.OnInitialize();
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnMarkItemShowStateChange,
      this.OnMarkItemStateChange,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldMapSelectMultiMap,
        this.jbn,
      );
  }
  OnAfterShow() {
    super.OnAfterShow(),
      this.UpdateMultiMapFloorSelectState(!0),
      this.OnIconPathChanged(this.Holder.IconPath);
  }
  OnSafeUpdate(e, t, i) {
    this.UpdateMultiMapFloorSelectState(), this.Holder.CheckIfUpdateIcon();
  }
  UpdateMultiMapFloorSelectState(e = !1) {
    var t, i, o;
    (2 === this.Holder?.MapType && !e) ||
      ((e = this.Holder),
      (t = this.IsSelectThisFloor),
      e.IsMultiMapTeleport &&
      ((i = ModelManager_1.ModelManager.AreaModel?.GetCurrentAreaId()),
      (o = ConfigManager_1.ConfigManager.MapConfig?.GetSubMapConfigById(
        e.MarkMultiMapId,
      ))) &&
      o.Area.includes(i)
        ? (this.IsSelectThisFloor = !0)
        : (this.IsSelectThisFloor = !1),
      t === this.IsSelectThisFloor) ||
      this.OnIconPathChanged(e.IconPath);
  }
  OnIconPathChanged(e) {
    var t = this.GetSprite(1),
      i = this.Holder,
      o = ModelManager_1.ModelManager.MapModel?.GetMarkExtraShowState(
        this.Holder.MarkId,
      );
    this.GetSprite(1).SetUIActive(!0),
      this.LoadIcon(t, e),
      i.IsDungeonEntrance && !i.IsFogUnlock
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
      i.IsMultiMapTeleport &&
        this.GetChildIconComponentAsync()
          .then((e) => {
            e.SetUiActive(!0),
              (e.Icon =
                ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
                  this.IsSelectThisFloor
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
          .finally(void 0),
      o.ShowFlag === Protocol_1.Aki.Protocol.I6s.Proto_ShowDisable
        ? this.GetSprite(2).SetUIActive(!0)
        : this.GetSprite(2).SetUIActive(!1);
  }
  OnSelectedStateChange(e) {
    e &&
      (ModelManager_1.ModelManager.MapModel?.GetMarkExtraShowState(
        this.Holder.MarkId,
      )).ShowFlag === Protocol_1.Aki.Protocol.I6s.Proto_ShowDisable &&
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
        "Map_TeleportMark_Disable_Tips",
      );
  }
}
exports.TeleportMarkItemView = TeleportMarkItemView;
//# sourceMappingURL=TeleportMarkItemView.js.map
