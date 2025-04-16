"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlayerMarkItem = void 0);
const Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  WorldMapDefine_1 = require("../../../WorldMap/WorldMapDefine"),
  PlayerMarkItemView_1 = require("../MarkItemView/PlayerMarkItemView"),
  MarkItem_1 = require("./MarkItem");
class PlayerMarkItem extends MarkItem_1.MarkItem {
  constructor(e, t, i, r, s = 1) {
    super(e, i, r, s),
      (this.PlayerId = 0),
      (this.PlayerIndex = 0),
      (this.PlayerStartPosition = void 0),
      (this.IsHide = !0),
      (this.J3_ = void 0),
      (this.WRi = (e, t) => {
        this.PlayerId === e && (this.IsHide = !0);
      }),
      (this.ZDi = (e, t) => {
        this.PlayerId === e &&
          (this.SetTrackData(t), this.kxc(), this.IsHide) &&
          (this.IsHide = !1);
      }),
      (this.PlayerId = t.PlayerId),
      (this.PlayerIndex = t.PlayerIndex),
      (this.PlayerStartPosition = Vector_1.Vector.Create(t.Position)),
      (this.J3_ = t);
  }
  get MarkId() {
    return this.PlayerId;
  }
  get MarkType() {
    return 11;
  }
  get MapId() {
    return this.J3_.MapId;
  }
  OnInitialize() {
    1 === this.MapType && this.SetConfigScale(0.8);
    var e = WorldMapDefine_1.onlinePlayerIconPathList[this.PlayerIndex - 1],
      e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e);
    (this.IconPath = e),
      this.eRi(),
      this.SetTrackData(this.PlayerStartPosition),
      this.kxc(),
      this.UpdateVisibleRelativeState(),
      (this.IsHide = !1);
  }
  Destroy() {
    this.tRi(), super.Destroy();
  }
  GetMarkItemViewType() {
    return 18;
  }
  CreateView() {
    return new PlayerMarkItemView_1.PlayerMarkItemView(this);
  }
  SetMarkData(e) {
    (this.PlayerId = e.PlayerId), (this.PlayerIndex = e.PlayerIndex);
  }
  UpdateVisibleRelativeState() {
    var e = !this.IsInConsistentDistrict(),
      t = this.CheckCanShowInGravityLayer();
    (this.IsCanShowView = e && t && this.CheckCanShowView() && !this.IsHide),
      this.MarkItemEntity.ViewLifeCircle.SetChildViewVisibility(
        9,
        this.MarkItemEntity.GamePlay.CanShowGravityChildIcon,
      ),
      this.MarkItemEntity.ViewLifeCircle.SetChildViewVisibility(
        0,
        this.IsCanShowView,
      );
  }
  eRi() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.ScenePlayerLocationChanged,
      this.ZDi,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ScenePlayerMarkItemStateChange,
        this.WRi,
      );
  }
  tRi() {
    EventSystem_1.EventSystem.Has(
      EventDefine_1.EEventName.ScenePlayerLocationChanged,
      this.ZDi,
    ) &&
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ScenePlayerLocationChanged,
        this.ZDi,
      ),
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.ScenePlayerMarkItemStateChange,
        this.WRi,
      ) &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.ScenePlayerMarkItemStateChange,
          this.WRi,
        );
  }
  kxc() {
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetTeamPlayerData(
      this.PlayerId,
    )
      ?.GetCurrentGroup()
      ?.GetCurrentRole()?.CreatureDataId;
    e
      ? ((e =
          ModelManager_1.ModelManager.CreatureModel.GetEntity(
            e,
          )?.Entity?.GetComponent(44)?.IsStandardGravity),
        (this.MarkItemEntity.GamePlay.Gravity = e ? 1 : 2))
      : ((e = ModelManager_1.ModelManager.WorldMapModel.IsGravityMap(
          this.MapId,
        )),
        (this.MarkItemEntity.GamePlay.Gravity = e ? 1 : 0));
  }
  CheckCanShowView() {
    return !0;
  }
  GetInteractiveFlag() {
    return !1;
  }
  SetTitleText(e) {
    var t =
      ModelManager_1.ModelManager.OnlineModel.GetWorldTeamPlayerFightInfo(
        this.PlayerId,
      )?.Name ?? this.PlayerId.toString();
    e.SetText(t);
  }
}
exports.PlayerMarkItem = PlayerMarkItem;
//# sourceMappingURL=PlayerMarkItem.js.map
