"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TeleportMarkItem = void 0);
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const TeleportMarkItemView_1 = require("../MarkItemView/TeleportMarkItemView");
const ConfigMarkItem_1 = require("./ConfigMarkItem");
class TeleportMarkItem extends ConfigMarkItem_1.ConfigMarkItem {
  constructor(e, t, i, s, r, n = 1) {
    super(e, t, i, s, r, n),
      (this.IsSelectThisFloor = !1),
      (this.IsDirty = !1),
      (this.Dwn = (e) => {
        let t;
        this.MapType === 2 &&
          ((t = this.MarkMultiMapId === e), this.IsSelectThisFloor !== t) &&
          ((this.IsSelectThisFloor = this.MarkMultiMapId === e),
          this.InnerView?.OnIconPathChanged(this.IconPath));
      }),
      (this.WDi = (e) => {
        this.InnerView?.IsShowOrShowing &&
          this.InnerView?.OnMarkItemStateChange(e);
      }),
      (this.uDi = (e) => {
        this.MarkConfig.MarkId === e &&
          (this.cDi(), this.View?.OnIconPathChanged(this.IconPath));
      });
  }
  get IsFogUnlock() {
    return (
      (this.MarkConfig.ObjectType === 6 && !this.IsLocked) || super.IsFogUnlock
    );
  }
  get IsLocked() {
    return !ModelManager_1.ModelManager.MapModel.CheckTeleportUnlocked(
      this.MarkConfig.MarkId,
    );
  }
  Initialize() {
    super.Initialize(),
      this.cDi(),
      this.AddEventListener(),
      this.UpdateMultiMapFloorSelectState(!0);
  }
  OnCreateView() {
    this.InnerView = new TeleportMarkItemView_1.TeleportMarkItemView(this);
  }
  OnDestroy() {
    super.OnDestroy(), this.RemoveEventListener();
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.UnlockTeleport,
      this.uDi,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnMarkItemShowStateChange,
        this.WDi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldMapSelectMultiMap,
        this.Dwn,
      );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.UnlockTeleport,
      this.uDi,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnMarkItemShowStateChange,
        this.WDi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldMapSelectMultiMap,
        this.Dwn,
      );
  }
  LogicUpdate(e) {
    super.LogicUpdate(e), this.UpdateMultiMapFloorSelectState();
  }
  ViewUpdate(e, t = !1, i = !1) {
    super.ViewUpdate(e, t, i);
  }
  UpdateMultiMapFloorSelectState(e = !1) {
    let t, i;
    (this.MapType === 2 && !e) ||
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
  cDi() {
    this.IconPath = this.IsLocked
      ? this.MarkConfig.LockMarkPic
      : this.MarkConfig.UnlockMarkPic;
  }
  get IsActivity() {
    return this.MarkConfig.ObjectType === 13;
  }
  get IsDungeonEntrance() {
    return (
      this.MarkConfig.RelativeType === 2 ||
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
    return this.MarkConfig.MultiMapFloorId !== 0;
  }
  get MarkMultiMapId() {
    return this.MarkConfig.MultiMapFloorId;
  }
}
exports.TeleportMarkItem = TeleportMarkItem;
// # sourceMappingURL=TeleportMarkItem.js.map
