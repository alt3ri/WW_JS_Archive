"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TeleportMarkItem = void 0);
const EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  TeleportMarkItemView_1 = require("../MarkItemView/TeleportMarkItemView"),
  ConfigMarkItem_1 = require("./ConfigMarkItem");
class TeleportMarkItem extends ConfigMarkItem_1.ConfigMarkItem {
  constructor(e, t, i, s, r, n = 1) {
    super(e, t, i, s, r, n),
      (this.IsSelectThisFloor = !1),
      (this.InnerView = void 0),
      (this.IsDirty = !1),
      (this.$Ca = void 0),
      (this.jbn = (e) => {
        var t;
        2 === this.MapType &&
          ((t = this.MarkMultiMapId === e), this.IsSelectThisFloor !== t) &&
          ((this.IsSelectThisFloor = this.MarkMultiMapId === e),
          this.InnerView?.OnIconPathChanged(this.IconPath));
      }),
      (this.WRi = (e) => {
        this.InnerView?.IsShowOrShowing &&
          this.InnerView?.OnMarkItemStateChange(e);
      }),
      (this.uRi = (e) => {
        this.MarkConfig.MarkId === e &&
          (this.cRi(), this.View?.OnIconPathChanged(this.IconPath));
      });
  }
  get IsFogUnlock() {
    return (
      (6 === this.MarkConfig.ObjectType && !this.IsLocked) || super.IsFogUnlock
    );
  }
  get IsLocked() {
    return !ModelManager_1.ModelManager.MapModel.CheckTeleportUnlocked(
      this.MarkConfig.MarkId,
    );
  }
  Initialize() {
    super.Initialize(), this.cRi(), this.AddEventListener();
  }
  OnCreateView() {
    this.InnerView = new TeleportMarkItemView_1.TeleportMarkItemView(this);
  }
  OnDestroy() {
    super.OnDestroy(), (this.$Ca = void 0), this.RemoveEventListener();
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.UnlockTeleport,
      this.uRi,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnMarkItemShowStateChange,
        this.WRi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldMapSelectMultiMap,
        this.jbn,
      );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.UnlockTeleport,
      this.uRi,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnMarkItemShowStateChange,
        this.WRi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldMapSelectMultiMap,
        this.jbn,
      );
  }
  ViewUpdate(e, t = !1, i = !1) {
    super.ViewUpdate(e, t, i);
  }
  UpdateMultiMapFloorSelectState(e = !1) {
    var t, i;
    (2 === this.MapType && !e) ||
      ((e = this.IsSelectThisFloor),
      this.IsMultiMapTeleport &&
      ((t = ModelManager_1.ModelManager.AreaModel?.GetCurrentAreaId()),
      (i = ConfigManager_1.ConfigManager.MapConfig?.GetSubMapConfigById(
        this.MarkMultiMapId,
      ))) &&
      i.Area.includes(t)
        ? (this.IsSelectThisFloor = !0)
        : (this.IsSelectThisFloor = !1),
      e === this.IsSelectThisFloor) ||
      (this.IsDirty = !0);
  }
  CheckIfUpdateIcon() {
    1 === this.MapType &&
      this.$Ca !== this.IsLocked &&
      ((this.$Ca = this.IsLocked),
      this.cRi(),
      this.View?.OnIconPathChanged(this.IconPath));
  }
  cRi() {
    this.IconPath = this.IsLocked
      ? this.MarkConfig.LockMarkPic
      : this.MarkConfig.UnlockMarkPic;
  }
  get IsActivity() {
    return 13 === this.MarkConfig.ObjectType;
  }
  get IsDungeonEntrance() {
    return (
      2 === this.MarkConfig.RelativeType ||
      ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.CheckMarkIdLinkDungeonEntrance(
        this.MarkConfigId,
      )
    );
  }
  get IsTowerEntrance() {
    return ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.CheckMarkIdIsTowerEntrance(
      this.MarkConfigId,
    );
  }
  get IsRoguelike() {
    return ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.CheckMarkIdIsRoguelike(
      this.MarkConfigId,
    );
  }
  get IsMultiMapTeleport() {
    return 0 !== this.MarkConfig.MultiMapFloorId;
  }
  get MarkMultiMapId() {
    return this.MarkConfig.MultiMapFloorId;
  }
}
exports.TeleportMarkItem = TeleportMarkItem;
//# sourceMappingURL=TeleportMarkItem.js.map
