"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LoadingModel = void 0);
const Queue_1 = require("../../../Core/Container/Queue"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  LoadingController_1 = require("./LoadingController");
class LoadingModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.ScreenEffect = void 0),
      (this.TargetTeleportId = 0),
      (this.Tvi = 0),
      (this.Lvi = !0),
      (this.ypi = !1),
      (this.Speed = 0),
      (this.SpeedRate = 1),
      (this.ReachHandleQueue = new Queue_1.Queue()),
      (this.CurrentProgress = 0),
      (this.NextProgress = 0),
      (this.Dvi = !1),
      (this.Rvi = !1),
      (this.Ssa = void 0),
      (this.Esa = void 0),
      (this.ysa = void 0);
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
    this.Ssa = e;
  }
  GetLoadingTexturePath() {
    return this.Ssa;
  }
  SetLoadingTitle(e) {
    this.Esa = e;
  }
  GetLoadingTitle() {
    return this.Esa;
  }
  SetLoadingTips(e) {
    this.ysa = e;
  }
  GetLoadingTips() {
    return this.ysa;
  }
  OnClear() {
    return (this.ypi = !1), (this.Dvi = !1), this.ReachHandleQueue.Clear(), !0;
  }
}
exports.LoadingModel = LoadingModel;
//# sourceMappingURL=LoadingModel.js.map
