"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlayerInfoController = void 0);
const ue_1 = require("ue"),
  AudioSystem_1 = require("../../../Core/Audio/AudioSystem"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  LogAnalyzer_1 = require("../../../Core/Common/LogAnalyzer"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  PerfSight_1 = require("../../../Core/PerfSight/PerfSight"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  LoginDefine_1 = require("../Login/Data/LoginDefine"),
  LoginController_1 = require("../Login/LoginController"),
  WorldLevelController_1 = require("../WorldLevel/WorldLevelController");
class PlayerInfoController extends UiControllerBase_1.UiControllerBase {
  static OnRegisterNetEvent() {
    Net_1.Net.Register(7868, PlayerInfoController.dXi),
      Net_1.Net.Register(17955, PlayerInfoController.CXi);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(7868), Net_1.Net.UnRegister(17955);
  }
  static gXi() {
    var e = ModelManager_1.ModelManager.PlayerInfoModel.GetNumberPropById(9);
    void 0 !== e &&
      (e === LoginDefine_1.ELoginSex.Boy
        ? AudioSystem_1.AudioSystem.SetState("player_rover_gender", "male")
        : AudioSystem_1.AudioSystem.SetState("player_rover_gender", "female"));
  }
}
((exports.PlayerInfoController = PlayerInfoController).dXi = (e) => {
  if (void 0 !== e) {
    WorldLevelController_1.WorldLevelController.OnBasicInfoNotify(e.PSs);
    var r = ModelManager_1.ModelManager.PlayerInfoModel;
    if (void 0 !== r) {
      r.SetId(e.J4n), LogAnalyzer_1.LogAnalyzer.SetPlayerId(e.J4n);
      var o = new Map(),
        n = new Map();
      for (const a of e.PSs)
        a.GSs === Protocol_1.Aki.Protocol.vNs.Proto_Int32
          ? o.set(a.j4n, a.OSs)
          : n.set(a.j4n, a.b8n);
      r.SetNumberProp(o),
        r.SetStringProp(n),
        (r.RandomSeed = e.eHn),
        ModelManager_1.ModelManager.MingSuModel.UpdateDragonPoolInfoMap(e.wSs),
        ModelManager_1.ModelManager.FunctionModel.SetPlayerId(e.J4n),
        ModelManager_1.ModelManager.FunctionModel.UpdatePlayerAttributeNumberInfo(
          o,
        ),
        ModelManager_1.ModelManager.FunctionModel.UpdatePlayerAttributeStringInfo(
          n,
        ),
        ModelManager_1.ModelManager.PersonalModel.SetRoleShowList(e.dSs),
        ModelManager_1.ModelManager.PersonalModel.SetCurCardId(e.xSs),
        ModelManager_1.ModelManager.PersonalModel.SetBirthday(e.jVn),
        ModelManager_1.ModelManager.PersonalModel.SetBirthdayDisplay(e.BSs),
        ModelManager_1.ModelManager.PersonalModel.SetCardUnlockList(e.bSs),
        ModelManager_1.ModelManager.PersonalModel.SetName(
          ModelManager_1.ModelManager.FunctionModel.GetPlayerName(),
        ),
        ModelManager_1.ModelManager.PersonalModel.SetPlayerId(
          ModelManager_1.ModelManager.PlayerInfoModel.GetId(),
        ),
        ModelManager_1.ModelManager.PersonalModel.SetModifyNameInfo(
          e.vna,
          e.pna,
        );
      var r = ModelManager_1.ModelManager.PlayerInfoModel.GetNumberPropById(4);
      ModelManager_1.ModelManager.PersonalModel.SetHeadPhotoId(r),
        PlayerInfoController.gXi(),
        LoginController_1.LoginController.SetIfFirstTimeLogin(),
        2 === Info_1.Info.PlatformType && e.J4n % 10 == 1
          ? ((r = ue_1.KuroStaticLibrary.GetDeviceCPU()).includes("SM8475") ||
              r.includes("SM8550") ||
              r.includes("SM8650")) &&
            (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Game", 25, "Disable affinity set", ["cpu", r]),
            ue_1.KuroStaticLibrary.SetThreadAffinity(
              "GameThread",
              1048575,
              65535,
            ),
            ue_1.KuroStaticLibrary.SetThreadAffinity(
              "RenderThread",
              65535,
              65535,
            ),
            ue_1.KuroStaticLibrary.SetThreadAffinity("RHIThread", 65535, 65535),
            PerfSight_1.PerfSight.IsEnable) &&
            PerfSight_1.PerfSight.PostEvent(500, "0")
          : PerfSight_1.PerfSight.IsEnable &&
            PerfSight_1.PerfSight.PostEvent(500, "1"),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnGetPlayerBasicInfo,
        );
    }
  }
}),
  (PlayerInfoController.CXi = (e) => {
    if (void 0 !== e) {
      WorldLevelController_1.WorldLevelController.OnPlayerAttrNotify(e.PSs);
      var r = ModelManager_1.ModelManager.PlayerInfoModel;
      if (void 0 !== r) {
        var o = new Map(),
          n = new Map();
        for (const a of e.PSs)
          a.GSs === Protocol_1.Aki.Protocol.vNs.Proto_Int32
            ? (r.ChangeNumberProp(a.j4n, a.OSs), o.set(a.j4n, a.OSs))
            : (r.ChangeStringProp(a.j4n, a.b8n), n.set(a.j4n, a.b8n));
        ModelManager_1.ModelManager.FunctionModel.UpdatePlayerAttributeNumberInfo(
          o,
        ),
          ModelManager_1.ModelManager.FunctionModel.UpdatePlayerAttributeStringInfo(
            n,
          );
      }
    }
  });
//# sourceMappingURL=PlayerInfoController.js.map
