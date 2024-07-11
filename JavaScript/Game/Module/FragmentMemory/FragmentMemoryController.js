"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FragmentMemoryController = exports.INFO_FRAGMENTMEMORYITEM = void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  Net_1 = require("../../../Core/Net/Net"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiManager_1 = require("../../Ui/UiManager");
exports.INFO_FRAGMENTMEMORYITEM = 70140004;
class FragmentMemoryController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return this.OnAddEvents(), this.OnRegisterNetEvent(), !0;
  }
  static OnClear() {
    return this.OnRemoveEvents(), this.OnUnRegisterNetEvent(), !0;
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnLoadingNetDataDone,
      this.xkt,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ActiveBattleView,
        this.JDe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSpecialItemUse,
        this.e9e,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CreateViewInstance,
        this.AHe,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnSpecialItemUse,
      this.e9e,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnLoadingNetDataDone,
        this.xkt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ActiveBattleView,
        this.JDe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CreateViewInstance,
        this.AHe,
      );
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(14471, this.ewn), Net_1.Net.Register(9979, this.twn);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(14471), Net_1.Net.UnRegister(9979);
  }
  static t6i() {
    0 !==
      ModelManager_1.ModelManager.FragmentMemoryModel.CurrentUnlockCollectId &&
      !UiManager_1.UiManager.IsViewShow("ObtainFragmentView") &&
      UiManager_1.UiManager.IsViewShow("BattleView") &&
      (ModelManager_1.ModelManager.FragmentMemoryModel
        .CurrentUnlockCollectId ===
        ModelManager_1.ModelManager.FragmentMemoryModel
          .CurrentTrackFragmentId &&
        ModelManager_1.ModelManager.FragmentMemoryModel.TryRemoveCurrentTrackEntity(),
      UiManager_1.UiManager.OpenView(
        "ObtainFragmentView",
        ModelManager_1.ModelManager.FragmentMemoryModel.CurrentUnlockCollectId,
      ));
  }
  static RequestPhotoMemory() {
    Net_1.Net.Call(16136, Protocol_1.Aki.Protocol.Efs.create(), (e) => {
      ModelManager_1.ModelManager.FragmentMemoryModel.OnPhotoMemoryResponse(e);
    });
  }
  static RequestMemoryReward(e) {
    var t = Protocol_1.Aki.Protocol.Lfs.create();
    (t.OVn = e),
      Net_1.Net.Call(16567, t, (e) => {
        e._Ms !== Protocol_1.Aki.Protocol.O4n.NRs &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e._Ms,
            5493,
          );
      });
  }
  static OpenFragmentMemoryView() {
    UiManager_1.UiManager.OpenView("MemoryDetailView");
  }
}
(exports.FragmentMemoryController = FragmentMemoryController),
  ((_a = FragmentMemoryController).xkt = () => {
    _a.RequestPhotoMemory();
  }),
  (FragmentMemoryController.ewn = (e) => {
    const t = ModelManager_1.ModelManager.FragmentMemoryModel.GetCollectedIds();
    ModelManager_1.ModelManager.FragmentMemoryModel.OnPhotoMemoryUpdate(e);
    e =
      ModelManager_1.ModelManager.FragmentMemoryModel.GetCollectedIds().filter(
        (e) => !t.includes(e),
      );
    0 < e.length &&
      (ModelManager_1.ModelManager.FragmentMemoryModel.CurrentUnlockCollectId =
        e[0]),
      _a.t6i();
  }),
  (FragmentMemoryController.JDe = () => {
    _a.t6i();
  }),
  (FragmentMemoryController.twn = (e) => {
    ModelManager_1.ModelManager.FragmentMemoryModel.OnPhotoMemoryCollectUpdate(
      e,
    ),
      ModelManager_1.ModelManager.FragmentMemoryModel.TryRemoveCurrentTrackEntity();
  }),
  (FragmentMemoryController.e9e = (e, t) => {
    e === exports.INFO_FRAGMENTMEMORYITEM && _a.OpenFragmentMemoryView();
  }),
  (FragmentMemoryController.AHe = (e) => {
    "CommonActivityView" === e.Info.Name &&
      (ModelManager_1.ModelManager.FragmentMemoryModel.ActivitySubViewTryPlayAnimation =
        "");
  });
//# sourceMappingURL=FragmentMemoryController.js.map
