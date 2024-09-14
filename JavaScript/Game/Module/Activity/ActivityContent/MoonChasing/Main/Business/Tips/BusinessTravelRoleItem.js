"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BusinessTravelRoleItem = void 0);
const UE = require("ue"),
  AudioSystem_1 = require("../../../../../../../../Core/Audio/AudioSystem"),
  Protocol_1 = require("../../../../../../../../Core/Define/Net/Protocol"),
  ConfigManager_1 = require("../../../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../../../Manager/ModelManager"),
  LevelSequencePlayer_1 = require("../../../../../../Common/LevelSequencePlayer"),
  GridProxyAbstract_1 = require("../../../../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../../../../Util/LguiUtil");
class BusinessTravelRoleItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.RoleId = 0),
      (this.SequencePlayer = void 0),
      (this.Yva = (i) => {
        "Action03" === i &&
          (this.Jva(),
          this.zva(!1),
          this.Zva(!1),
          this.eTa(!1),
          this.eMa(),
          this.ffa(!1));
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.SpineSkeletonAnimationComponent],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIText],
      [8, UE.UIText],
      [9, UE.UIItem],
    ];
  }
  OnStart() {
    (this.SequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
      this.RootItem,
    )),
      this.SequencePlayer.BindSequenceCloseEvent(this.Yva),
      this.GetItem(3)?.SetUIActive(!1),
      this.GetItem(9)?.SetUIActive(!1),
      this.GetItem(4)?.SetUIActive(!1),
      this.GetItem(5)?.SetUIActive(!1),
      this.GetItem(6)?.SetUIActive(!1),
      this.GetItem(1)?.SetUIActive(!1);
  }
  OnBeforeDestroy() {
    this.SequencePlayer.Clear();
  }
  VAn(i, t) {
    this.GetSpine(0).SetAnimation(0, i, !0)?.SetMixDuration(t);
  }
  FAn(i) {
    this.GetItem(1)?.SetUIActive(!0),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), i);
  }
  Jva() {
    this.GetItem(1)?.SetUIActive(!1);
  }
  zva(i) {
    this.GetItem(3)?.SetUIActive(i);
  }
  Zva(i) {
    this.GetItem(4)?.SetUIActive(i);
  }
  eTa(i) {
    this.GetItem(5)?.SetUIActive(i);
  }
  tMa(i) {
    var t =
      ModelManager_1.ModelManager.MoonChasingBusinessModel.GetEditTeamDataById(
        this.RoleId,
      );
    t.Level > i &&
      (this.GetItem(6)?.SetUIActive(!0),
      this.GetText(7)?.SetText(i.toString()),
      this.GetText(8)?.SetText(t.Level.toString()));
  }
  eMa() {
    this.GetItem(6)?.SetUIActive(!1);
  }
  ffa(i) {
    this.GetItem(9)?.SetUIActive(i);
  }
  Refresh(i) {
    this.RoleId = i;
  }
  async RefreshAsync() {
    var i = ConfigManager_1.ConfigManager.BusinessConfig.GetEntrustRoleById(
      this.RoleId,
    );
    await this.SetSpineAssetByPath(
      i.SmallSpineAtlas,
      i.SmallSpineSkeletonData,
      this.GetSpine(0),
    ),
      this.GetSpine(0).SetAnimation(0, "idle", !0);
  }
  PlayStartAction() {
    AudioSystem_1.AudioSystem.PostEvent("play_ui_zuiyuejie_loading"),
      this.SequencePlayer.PlayLevelSequenceByName("Action01"),
      this.VAn("working", 0.1),
      this.ffa(!0);
  }
  PlayRunFinishAction(i, t) {
    AudioSystem_1.AudioSystem.ExecuteAction("play_ui_zuiyuejie_loading", 0),
      this.SequencePlayer.PlayLevelSequenceByName("Action02");
    var e = ConfigManager_1.ConfigManager.BusinessConfig.GetEntrustRoleById(
      this.RoleId,
    );
    i === Protocol_1.Aki.Protocol.woh.qGs
      ? (AudioSystem_1.AudioSystem.PostEvent("play_ui_zhuiyuejie_positive"),
        this.FAn(e.SuccessDialog),
        this.VAn("happy", 0),
        this.zva(!0))
      : i === Protocol_1.Aki.Protocol.woh.Proto_Bad
        ? (AudioSystem_1.AudioSystem.PostEvent("play_ui_zhuiyuejie_passive"),
          this.FAn(e.FailDialog),
          this.VAn("fail", 0),
          this.Zva(!0))
        : (AudioSystem_1.AudioSystem.PostEvent("play_ui_haoping"),
          this.VAn("idle", 0),
          this.eTa(!0)),
      this.tMa(t);
  }
  PlayEndAction() {
    this.SequencePlayer.PlayLevelSequenceByName("Action03");
  }
  StopRunToLastFrame() {
    this.SequencePlayer.StopSequenceByKey("Action02", !0, !0);
  }
  GetRoleId() {
    return this.RoleId;
  }
}
exports.BusinessTravelRoleItem = BusinessTravelRoleItem;
//# sourceMappingURL=BusinessTravelRoleItem.js.map
