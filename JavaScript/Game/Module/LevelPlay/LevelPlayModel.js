"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelPlayModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  PublicUtil_1 = require("../../../Game/Common/PublicUtil"),
  ICondition_1 = require("../../../UniverseEditor/Interface/ICondition"),
  IGlobal_1 = require("../../../UniverseEditor/Interface/IGlobal"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  GeneralLogicTreeConfigUtil_1 = require("../GeneralLogicTree/GeneralLogicTreeConfigUtil"),
  LevelPlay_1 = require("./LevelPlay"),
  LevelPlayDefine_1 = require("./LevelPlayDefine");
class LevelPlayModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.Xpi = void 0),
      (this.$pi = void 0),
      (this.Ypi = 0),
      (this.Jpi = void 0),
      (this.zpi = void 0),
      (this.IsInReceiveReward = !1),
      (this.Zpi = (e) => {
        for (const i of JSON.parse(e).LevelPlays)
          this.Jpi.set(i.Id, i),
            i.Tree &&
              GeneralLogicTreeConfigUtil_1.GeneralLogicTreeConfigUtil.InitBehaviorNodeConfig(
                this.zpi,
                i.Id,
                i.Tree,
              );
      });
  }
  OnInit() {
    return (
      (this.Xpi = new Map()),
      (this.$pi = new Map()),
      (this.Jpi = new Map()),
      (this.zpi = new Map()),
      (this.Ypi = LevelPlayDefine_1.INVALID_LEVELPLAYID),
      this.InitLevelPlayConfig(),
      PublicUtil_1.PublicUtil.RegisterEditorLocalConfig(),
      !0
    );
  }
  OnClear() {
    return (
      (this.Xpi = void 0),
      (this.$pi = void 0),
      this.Jpi.clear(),
      (this.Jpi = void 0),
      this.zpi.clear(),
      !(this.zpi = void 0)
    );
  }
  OnLeaveLevel() {
    return !0;
  }
  InitLevelPlayConfig() {
    var e;
    PublicUtil_1.PublicUtil.UseDbConfig() ||
      (this.Jpi.clear(),
      this.zpi.clear(),
      (e = (0, PublicUtil_1.getConfigPath)(
        IGlobal_1.globalConfig.LevelPlayListDir,
      )),
      GeneralLogicTreeConfigUtil_1.GeneralLogicTreeConfigUtil.InitConfig(
        e,
        this.Zpi,
      ));
  }
  GetLevelPlayConfig(e) {
    if (!PublicUtil_1.PublicUtil.UseDbConfig()) return this.Jpi.get(e);
    let i = this.Jpi.get(e);
    var t;
    return (
      i ||
        ((t =
          ConfigManager_1.ConfigManager.LevelPlayConfig.GetLevelPlayConfig(e)),
        (i = JSON.parse(t.Data)),
        this.Jpi.set(e, i)),
      i
    );
  }
  GetLevelPlayNodeConfig(e, i) {
    if (!PublicUtil_1.PublicUtil.UseDbConfig()) return this.zpi.get(e)?.get(i);
    let t = this.zpi.get(e),
      r = (t = t || new Map()).get(i);
    return (
      r ||
        ((e =
          ConfigManager_1.ConfigManager.LevelPlayConfig.GetLevelPlayNodeConfig(
            e,
            i,
          )),
        (r = JSON.parse(e.Data)),
        t.set(i, r)),
      r
    );
  }
  CreateLevelPlayInfo(e) {
    var i = new LevelPlay_1.LevelPlayInfo(e);
    return i.InitConfig(), this.Xpi.set(e, i), i;
  }
  EnterLevelPlayRange(e) {
    var i = this.SafeCreateLevelPlayInfo(e);
    return this.$pi.set(e, i), i;
  }
  LeaveLevelPlayRange(e) {
    var i = this.GetProcessingLevelPlayInfo(e);
    i &&
      (i.RemoveBehaviorTree(),
      this.$pi.delete(e),
      i.NeedShowInMap || this.Xpi.delete(e));
  }
  LevelPlayFinish(e) {
    var i = this.GetProcessingLevelPlayInfo(e);
    i &&
      (i.RemoveBehaviorTree(),
      i.UpdateState(3),
      this.$pi.delete(e),
      this.Ypi === e) &&
      (i.SetTrack(!1), (this.Ypi = LevelPlayDefine_1.INVALID_LEVELPLAYID));
  }
  LevelPlayClose(e) {
    e && (e.UpdateState(0), e.RemoveBehaviorTree(), this.$pi.delete(e.Id));
  }
  SetTrackLevelPlayId(e) {
    this.Ypi !== e &&
      (this.GetProcessingLevelPlayInfo(this.Ypi)?.SetTrack(!1),
      (this.Ypi = e),
      this.GetProcessingLevelPlayInfo(this.Ypi)?.SetTrack(!0));
  }
  ChangeLevelPlayTrackRange(e, i) {
    e = this.GetProcessingLevelPlayInfo(e);
    e && e.ChangeLevelPlayTrackRange(i);
  }
  CheckLevelPlayState(e, i, t) {
    let r = !1;
    var l = this.GetLevelPlayInfo(e)?.PlayState;
    switch (i) {
      case ICondition_1.ELevelPlayState.Close:
        r = void 0 === l || 0 === l || 1 === l;
        break;
      case ICondition_1.ELevelPlayState.Running:
        r = 2 === l;
        break;
      case ICondition_1.ELevelPlayState.Complete:
        r = 3 === l;
    }
    return "Eq" === t ? r : !r;
  }
  SafeCreateLevelPlayInfo(e) {
    let i = this.GetLevelPlayInfo(e);
    return (i = i || this.CreateLevelPlayInfo(e));
  }
  GetLevelPlayInfo(e) {
    return this.Xpi.get(e);
  }
  GetProcessingLevelPlayInfo(e) {
    return this.$pi.get(e);
  }
  GetProcessingLevelPlayInfos() {
    return this.$pi;
  }
  GetTrackLevelPlayInfo() {
    if (this.Ypi !== LevelPlayDefine_1.INVALID_LEVELPLAYID)
      return this.GetProcessingLevelPlayInfo(this.Ypi);
  }
  GetTrackLevelPlayId() {
    return this.Ypi;
  }
  GetLevelPlayInfoByRewardEntityId(e) {
    for (var [, i] of this.Xpi) if (i.RewardEntityId === e) return i;
  }
}
exports.LevelPlayModel = LevelPlayModel;
//# sourceMappingURL=LevelPlayModel.js.map
