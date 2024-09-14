"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PrewarFormationData = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager");
class PrewarFormationData {
  constructor() {
    (this.j8 = 0),
      (this.Mne = 0),
      (this.B8 = 0),
      (this.Uai = !1),
      (this.Aai = -1),
      (this.Pai = 0),
      (this.xai = 1),
      (this.Xy = 0);
  }
  GetPlayerId() {
    return this.j8;
  }
  SetPlayerId(e) {
    this.j8 = e;
  }
  GetConfigId() {
    return this.Mne;
  }
  SetConfigId(e) {
    this.Mne = e;
  }
  IsEmpty() {
    return 0 === this.Mne;
  }
  IsLeader() {
    return (
      this.j8 ===
      ModelManager_1.ModelManager.InstanceDungeonModel.GetMatchTeamInfo()?.qVn
    );
  }
  IsSelf() {
    return this.j8 === ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
  }
  GetLevel() {
    return this.B8;
  }
  SetLevel(e) {
    this.B8 = e;
  }
  GetIsReady() {
    return this.Uai;
  }
  SetIsReady(e) {
    this.Uai = e;
  }
  GetPlayerName() {
    return (
      ModelManager_1.ModelManager.InstanceDungeonModel.GetMatchTeamName(
        this.j8,
      ) ?? ""
    );
  }
  GetPlayerOnlineId() {
    return (
      ModelManager_1.ModelManager.InstanceDungeonModel.GetMatchTeamOnlineId(
        this.j8,
      ) ?? ""
    );
  }
  SetOnlineNumber(e) {
    this.Aai = e;
  }
  GetOnlineNumber() {
    return this.Aai;
  }
  GetLife() {
    return this.Pai;
  }
  SetLife(e) {
    this.Pai = e;
  }
  GetMaxLife() {
    return this.xai;
  }
  SetMaxLife(e) {
    this.xai = e;
  }
  GetIndex() {
    return this.Xy;
  }
  SetIndex(e) {
    this.Xy = e;
  }
}
exports.PrewarFormationData = PrewarFormationData;
//# sourceMappingURL=PrewarFormationData.js.map
