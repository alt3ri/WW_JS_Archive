"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldMapSecondaryUiLayoutHelper = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager");
class WorldMapSecondaryUiLayoutHelper {
  static UpdateAreaTxtByConfigMarkItem(e) {
    var t = e.MarkItem.GetAreaText();
    t && e.AreaText.SetText(t);
  }
  static UpdateAreaAndIconByConfigOrDynamicConfigMarkItem(e) {
    var t = e.MarkItem.GetAreaText(),
      a = void 0 !== t;
    e.AreaText.SetUIActive(a),
      e.AreaIconItem.SetUIActive(a),
      a && e.AreaText.SetText(t);
  }
  static UpdateAreaTxtByServerMarkItem(e) {
    var t = e.MarkItem,
      t = ModelManager_1.ModelManager.MapModel.GetMarkAreaText(
        t.MapId,
        t.EntityConfigId,
      );
    t && e.AreaText.SetText(t);
  }
  static UpdateIconAndTitle(e) {
    var t = e.MarkItem;
    WorldMapSecondaryUiLayoutHelper.UpdateIcon(e),
      e.Title.ShowTextNew(t.MarkConfig.MarkTitle);
  }
  static UpdateIcon(e) {
    var t = e.MarkItem;
    e.SetSpriteByPathAction(t.IconPath, e.Icon, !1);
  }
  static UpdateDesc(e) {
    var t = e.MarkItem;
    e.DescriptionText.ShowTextNew(t.MarkConfig.MarkDesc);
  }
  static UpdateBoxDesc(e) {
    var t = e.MarkItem;
    e.DescriptionText.ShowTextNew(t.GetDescText());
  }
  static UpdateServerMarkDesc(e) {
    var t = e.MarkItem.ConfigId,
      t = ConfigManager_1.ConfigManager.MapConfig.SearchMarkConfig(t);
    e.DescriptionText.ShowTextNew(t.MarkDesc);
  }
  static UpdateConfirmButtonTextWithFastMoveStyle(e) {
    e.ConfirmButtonItem.SetLocalText("TeleportFastMove");
  }
  static UpdateConfirmButtonTextWithStopDetectionStyle(e) {
    e.ConfirmButtonItem.SetLocalTextNew("Text_TeleportStop_Text");
  }
  static UpdateConfirmButtonTextWithTrackStyle(e) {
    var t = e.MarkItem;
    let a = "";
    (a = t.IsTracked
      ? "InstanceDungeonEntranceCancelTrack"
      : "InstanceDungeonEntranceTrack"),
      e.ConfirmButtonItem.SetLocalText(a);
  }
  static UpdateConfirmButtonEnableClickByTeleportState(e) {
    var t = e.MarkItem,
      t =
        ModelManager_1.ModelManager.MapModel.GetMarkExtraShowState(t.MarkId)
          .ShowFlag === Protocol_1.Aki.Protocol.U5s.Proto_ShowDisable;
    e.ConfirmButtonItem.SetEnableClick(!t);
  }
  static UpdateTrackButtonTextWithTrackStyle(e) {
    var t = e.MarkItem;
    let a = "";
    (a = t.IsTracked
      ? "InstanceDungeonEntranceCancelTrack"
      : "InstanceDungeonEntranceTrack"),
      e.TrackButtonItem.SetLocalText(a);
  }
}
exports.WorldMapSecondaryUiLayoutHelper = WorldMapSecondaryUiLayoutHelper;
//# sourceMappingURL=WorldMapSecondaryUiLayoutHelper.js.map
