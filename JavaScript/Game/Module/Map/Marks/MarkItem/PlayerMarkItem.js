"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlayerMarkItem = void 0);
const Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  PlayerMarkItemView_1 = require("../MarkItemView/PlayerMarkItemView"),
  MarkItem_1 = require("./MarkItem");
class PlayerMarkItem extends MarkItem_1.MarkItem {
  constructor(e, t, i, s, r = 1) {
    super(e, i, s, r),
      (this.zDi = ["SP_MapFollowing1", "SP_MapFollowing2", "SP_MapFollowing3"]),
      (this.PlayerId = 0),
      (this.PlayerIndex = 0),
      (this.PlayerStartPosition = void 0),
      (this.IsHide = !0),
      (this.WRi = (e, t) => {
        this.PlayerId === e && (this.IsHide = !0);
      }),
      (this.ZDi = (e, t) => {
        this.PlayerId === e &&
          (this.SetTrackData(t), this.IsHide) &&
          (this.IsHide = !1);
      }),
      (this.PlayerId = t.PlayerId),
      (this.PlayerIndex = t.PlayerIndex),
      (this.PlayerStartPosition = Vector_1.Vector.Create(t.Position));
  }
  get MarkId() {
    return this.PlayerId;
  }
  get MarkType() {
    return 11;
  }
  Initialize() {
    1 === this.MapType && this.SetConfigScale(0.8);
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
      this.zDi[this.PlayerIndex - 1],
    );
    (this.IconPath = e),
      this.eRi(),
      this.UpdateTrackState(),
      this.SetTrackData(this.PlayerStartPosition);
  }
  Destroy() {
    this.tRi(), super.Destroy();
  }
  OnCreateView() {
    this.InnerView = new PlayerMarkItemView_1.PlayerMarkItemView(this);
  }
  SetMarkData(e) {
    (this.PlayerId = e.PlayerId), (this.PlayerIndex = e.PlayerIndex);
  }
  UpdateTrackState() {
    this.IsCanShowView = this.CheckCanShowView() && !this.IsHide;
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
  CheckCanShowView() {
    return !0;
  }
  GetInteractiveFlag() {
    return !1;
  }
}
exports.PlayerMarkItem = PlayerMarkItem;
//# sourceMappingURL=PlayerMarkItem.js.map
