"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueEndingCollectionItem = void 0);
const UE = require("ue"),
  RogueResDungeonConfigById_1 = require("../../../../Core/Define/ConfigQuery/RogueResDungeonConfigById"),
  RogueResEndById_1 = require("../../../../Core/Define/ConfigQuery/RogueResEndById"),
  Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class RogueEndingCollectionItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.Lo = void 0),
      (this.OnItemClickCall = void 0),
      (this.YP = () => {
        this.OnItemClickCall && this.OnItemClickCall(this.Lo.ConfigId);
      }),
      (this.uM1 = () => {
        this.Uar();
      });
  }
  OnStart() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RogueResEndingRedDotUpdate,
      this.uM1,
    );
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RogueResEndingRedDotUpdate,
      this.uM1,
    );
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UITextureTransitionComponent],
      [2, UE.UIArtText],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.YP]]);
  }
  Refresh(e) {
    this.Lo = e;
    var t = this.Lo.Index,
      t = 10 <= t ? t.toString() : "0" + t,
      t =
        (this.GetArtText(2)?.SetText(t),
        RogueResEndById_1.configRogueResEndById.GetConfig(this.Lo.ConfigId)),
      i =
        0 === ModelManager_1.ModelManager.PlayerInfoModel?.GetPlayerGender()
          ? t.CGF
          : t.CGM,
      i =
        (!StringUtils_1.StringUtils.IsBlank(i) && e.IsUnlock
          ? (this.GetUiTextureTransitionComponent(1)?.RootUIComp.SetUIActive(
              !0,
            ),
            this.SetTextureTransitionByPath(
              i,
              this.GetUiTextureTransitionComponent(1),
            ))
          : this.GetUiTextureTransitionComponent(1)?.RootUIComp.SetUIActive(!1),
        e.IsUnlock ? t.Title : "RogueRes_CollectionEventLock"),
      i =
        (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), i),
        RogueResDungeonConfigById_1.configRogueResDungeonConfigById.GetConfig(
          t.InstId,
        ));
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), i.Title),
      this.Uar(),
      this.GetItem(6)?.SetUIActive(!e.IsUnlock),
      this.GetItem(7)?.SetUIActive(!e.IsUnlock),
      this.GetButton(0)?.SetSelfInteractive(!e.IsSubView),
      e.IsSubView ||
        (((t = Rotator_1.Rotator.Create()).Pitch = e.Rotation),
        (t.Yaw = 0),
        (t.Roll = -90),
        this.GetButton(0).GetOwner()?.K2_SetActorRotation(t.ToUeRotator(), !1));
  }
  Uar() {
    var e, t;
    this.Lo.IsSubView
      ? this.GetItem(5)?.SetUIActive(!1)
      : ((e =
          ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetCacheEndingOpen(
            this.Lo.ConfigId,
          )),
        (t = this.Lo.IsUnlock),
        this.GetItem(5)?.SetUIActive(!e && t && 0 !== this.Lo.Rotation));
  }
}
exports.RogueEndingCollectionItem = RogueEndingCollectionItem;
//# sourceMappingURL=RogueEndingCollectionItem.js.map
