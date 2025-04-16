"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LoadingModel = void 0);
const Queue_1 = require("../../../Core/Container/Queue"),
  CharacterDisplayStyleById_1 = require("../../../Core/Define/ConfigQuery/CharacterDisplayStyleById"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LoadingController_1 = require("./LoadingController"),
  LoadingDefine_1 = require("./LoadingDefine");
class LoadingModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.ScreenEffect = void 0),
      (this.TargetTeleportId = 0),
      (this.Tvi = 0),
      (this.Ohi = 0),
      (this.Lvi = !0),
      (this.ypi = !1),
      (this.Speed = 0),
      (this.SpeedRate = 1),
      (this.ReachHandleQueue = new Queue_1.Queue()),
      (this.CurrentProgress = 0),
      (this.NextProgress = 0),
      (this.Dvi = !1),
      (this.Rvi = !1),
      (this.dla = void 0),
      (this.Cla = void 0),
      (this.gla = void 0),
      (this.FGc = void 0),
      (this.Mc1 = void 0);
  }
  get TipTime() {
    return (
      this.Tvi ||
        (this.Tvi =
          ConfigManager_1.ConfigManager.LoadingConfig.GetLoadingTipsTime()),
      this.Tvi
    );
  }
  get IsShowUidView() {
    return this.Lvi;
  }
  set IsShowUidView(e) {
    e !== this.Lvi &&
      ((this.Lvi = e),
      LoadingController_1.LoadingController.UpdateUidViewShow());
  }
  set LastInstanceId(e) {
    this.Ohi = e;
  }
  get LastInstanceId() {
    return this.Ohi;
  }
  get IsLoading() {
    return this.ypi;
  }
  SetIsLoading(e) {
    this.ypi !== e &&
      ((this.ypi = e)
        ? EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnStartLoadingState,
          )
        : EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnFinishLoadingState,
          ));
  }
  get IsLoadingView() {
    return this.Dvi;
  }
  SetIsLoadingView(e) {
    this.Dvi !== e &&
      ((this.Dvi = e)
        ? EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnOpenLoadingView,
          )
        : EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnCloseLoadingView,
          ));
  }
  SetIsLoginToWorld(e) {
    this.Rvi = e;
  }
  GetIsLoginToWorld() {
    var e = this.Rvi;
    return (this.Rvi = !1), e;
  }
  SetLoadingTexturePath(e) {
    this.dla = e;
  }
  GetLoadingTexturePath() {
    return this.dla;
  }
  SetLoadingTitle(e) {
    this.Cla = e;
  }
  GetLoadingTitle() {
    return this.Cla;
  }
  SetLoadingTips(e) {
    this.gla = e;
  }
  GetLoadingTips() {
    return this.gla;
  }
  GetOpenLoadingViewName() {
    var e;
    return this.Mc1
      ? "RoleLoadingView"
      : ((e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId()),
        this.fu1(e) || this.fu1(this.LastInstanceId) || "LoadingView");
  }
  fu1(e) {
    if (!(e <= 0)) {
      var i,
        e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e);
      if (e)
        return (
          (i = e.InstSubType),
          (i = LoadingDefine_1.dungeonToLoadingViewMap.get(i)) &&
          (!i.WorldSubType || i.WorldSubType === e.WorldDungeonSubType)
            ? i.View
            : void 0
        );
    }
  }
  SetLoadingConfig(e) {
    this.FGc = e;
  }
  GetLoadingConfigId() {
    if (this.FGc) {
      if (this.FGc.length <= 0) return void (this.FGc = void 0);
      var e = [];
      for (const o of this.FGc) {
        var i = new Protocol_1.Aki.Protocol.cOc(o),
          t = TimeUtil_1.TimeUtil.GetServerTimeStamp(),
          n = Number(MathUtils_1.MathUtils.LongToBigInt(i.cps)),
          r = Number(MathUtils_1.MathUtils.LongToBigInt(i.dps));
        n <= t && t <= r && e.push(i.s5n);
      }
      return (this.FGc = void 0), e;
    }
  }
  SetRoleLoadingConfig(e) {
    e &&
      (this.Mc1 =
        CharacterDisplayStyleById_1.configCharacterDisplayStyleById.GetConfig(
          e,
        ));
  }
  get RoleLoading() {
    return this.Mc1;
  }
  ClearRoleLoadingInfo() {
    this.Mc1 = void 0;
  }
  OnClear() {
    return (this.ypi = !1), (this.Dvi = !1), this.ReachHandleQueue.Clear(), !0;
  }
}
exports.LoadingModel = LoadingModel;
//# sourceMappingURL=LoadingModel.js.map
