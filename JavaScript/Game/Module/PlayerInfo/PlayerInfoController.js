"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlayerInfoController = void 0);
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem");
const LogAnalyzer_1 = require("../../../Core/Common/LogAnalyzer");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const LoginDefine_1 = require("../Login/Data/LoginDefine");
const LoginController_1 = require("../Login/LoginController");
const WorldLevelController_1 = require("../WorldLevel/WorldLevelController");
class PlayerInfoController extends UiControllerBase_1.UiControllerBase {
  static OnRegisterNetEvent() {
    Net_1.Net.Register(26611, PlayerInfoController.gQi),
      Net_1.Net.Register(3295, PlayerInfoController.fQi);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(26611), Net_1.Net.UnRegister(3295);
  }
  static pQi() {
    const e = ModelManager_1.ModelManager.PlayerInfoModel.GetNumberPropById(9);
    void 0 !== e &&
      (e === LoginDefine_1.ELoginSex.Boy
        ? AudioSystem_1.AudioSystem.SetState("player_rover_gender", "male")
        : AudioSystem_1.AudioSystem.SetState("player_rover_gender", "female"));
  }
}
((exports.PlayerInfoController = PlayerInfoController).gQi = (e) => {
  if (void 0 !== e) {
    WorldLevelController_1.WorldLevelController.OnBasicInfoNotify(e.dfs);
    const o = ModelManager_1.ModelManager.PlayerInfoModel;
    if (void 0 !== o) {
      o.SetId(e.Ekn), LogAnalyzer_1.LogAnalyzer.SetPlayerId(e.Ekn);
      const r = new Map();
      const n = new Map();
      for (const l of e.dfs)
        l.Mfs === Protocol_1.Aki.Protocol.P2s.Proto_Int32
          ? r.set(l.Ckn, l.Sfs)
          : n.set(l.Ckn, l.t4n);
      o.SetNumberProp(r),
        o.SetStringProp(n),
        (o.RandomSeed = e.S8n),
        ModelManager_1.ModelManager.MingSuModel.UpdateDragonPoolInfoMap(e.Cfs),
        ModelManager_1.ModelManager.FunctionModel.SetPlayerId(e.Ekn),
        ModelManager_1.ModelManager.FunctionModel.UpdatePlayerAttributeNumberInfo(
          r,
        ),
        ModelManager_1.ModelManager.FunctionModel.UpdatePlayerAttributeStringInfo(
          n,
        ),
        ModelManager_1.ModelManager.PersonalModel.SetRoleShowList(e.Ygs),
        ModelManager_1.ModelManager.PersonalModel.SetCurCardId(e.gfs),
        ModelManager_1.ModelManager.PersonalModel.SetBirthday(e._5n),
        ModelManager_1.ModelManager.PersonalModel.SetBirthdayDisplay(e.vfs),
        ModelManager_1.ModelManager.PersonalModel.SetCardUnlockList(e.ffs),
        ModelManager_1.ModelManager.PersonalModel.SetName(
          ModelManager_1.ModelManager.FunctionModel.GetPlayerName(),
        ),
        ModelManager_1.ModelManager.PersonalModel.SetPlayerId(
          ModelManager_1.ModelManager.PlayerInfoModel.GetId(),
        ),
        PlayerInfoController.pQi(),
        LoginController_1.LoginController.SetIfFirstTimeLogin(),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnGetPlayerBasicInfo,
        );
    }
  }
}),
  (PlayerInfoController.fQi = (e) => {
    if (void 0 !== e) {
      WorldLevelController_1.WorldLevelController.OnPlayerAttrNotify(e.dfs);
      const o = ModelManager_1.ModelManager.PlayerInfoModel;
      if (void 0 !== o) {
        const r = new Map();
        const n = new Map();
        for (const l of e.dfs)
          l.Mfs === Protocol_1.Aki.Protocol.P2s.Proto_Int32
            ? (o.ChangeNumberProp(l.Ckn, l.Sfs), r.set(l.Ckn, l.Sfs))
            : (o.ChangeStringProp(l.Ckn, l.t4n), n.set(l.Ckn, l.t4n));
        ModelManager_1.ModelManager.FunctionModel.UpdatePlayerAttributeNumberInfo(
          r,
        ),
          ModelManager_1.ModelManager.FunctionModel.UpdatePlayerAttributeStringInfo(
            n,
          );
      }
    }
  });
// # sourceMappingURL=PlayerInfoController.js.map
