"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PersonalController = void 0);
const Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../Core/Net/Net"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../../Ui/Base/UiControllerBase"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
class PersonalController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnLoadingNetDataDone,
      this.xkt,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnFunctionOpenSet,
        this.K0c,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnFunctionOpenUpdate,
        this.K0c,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnLoadingNetDataDone,
      this.xkt,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnFunctionOpenSet,
        this.K0c,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnFunctionOpenUpdate,
        this.K0c,
      );
  }
  static c3l() {
    var e = new Protocol_1.Aki.Protocol.E0_();
    Net_1.Net.Call(15919, e, (e) => {
      e && ModelManager_1.ModelManager.PersonalModel.InitPlayerHeadData(e.FE_);
    });
  }
  static SendBirthdayInitRequest(o) {
    var e = Protocol_1.Aki.Protocol.SYn.create();
    (e.ZVn = o),
      Net_1.Net.Call(28754, e, (e) => {
        e &&
          (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs
            ? (ModelManager_1.ModelManager.PersonalModel.SetBirthday(o),
              ModelManager_1.ModelManager.BirthdayModel.ResetBirthday())
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                20704,
              ));
      });
  }
  static SendBirthdayShowSetRequest(o) {
    var e = Protocol_1.Aki.Protocol.wYn.create();
    (e.$7n = o),
      Net_1.Net.Call(16208, e, (e) => {
        e &&
          (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs
            ? ModelManager_1.ModelManager.PersonalModel.SetBirthdayDisplay(o)
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                19637,
              ));
      });
  }
  static SendRoleShowListUpdateRequest(o) {
    var e = Protocol_1.Aki.Protocol.yYn.create();
    (e.Y7n = o),
      Net_1.Net.Call(18405, e, (e) => {
        e &&
          (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs
            ? ModelManager_1.ModelManager.PersonalModel.UpdateRoleShowList(o)
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                19446,
              ));
      });
  }
  static async SendRoleShowListUpdateRequestAsync(e) {
    var o = Protocol_1.Aki.Protocol.yYn.create(),
      o = ((o.Y7n = e), await Net_1.Net.CallAsync(18405, o));
    if (o) {
      if (o.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs)
        return (
          ModelManager_1.ModelManager.PersonalModel.UpdateRoleShowList(e), !0
        );
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
        o.Q4n,
        19446,
      );
    }
    return !1;
  }
  static SendChangeCardRequest(o) {
    var e = Protocol_1.Aki.Protocol.RYn.create();
    (e.J7n = o),
      Net_1.Net.Call(24543, e, (e) => {
        e &&
          (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs
            ? ModelManager_1.ModelManager.PersonalModel.SetCurCardId(o)
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                29506,
              ));
      });
  }
  static SendReadCardRequest(o) {
    var e = Protocol_1.Aki.Protocol.AYn.create();
    (e.J7n = o),
      Net_1.Net.Call(26975, e, (e) => {
        e &&
          (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs
            ? ModelManager_1.ModelManager.PersonalModel.UpdateCardUnlockList(
                o,
                !0,
              )
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                17001,
              ));
      });
  }
  static SendModifySignatureRequest(o) {
    var e = Protocol_1.Aki.Protocol.uYn.create();
    (e.zVn = o),
      Net_1.Net.Call(27844, e, (e) => {
        e &&
          (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs
            ? ModelManager_1.ModelManager.PersonalModel.SetSignature(o)
            : e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ContainsDirtyWord ||
                e.Q4n ===
                  Protocol_1.Aki.Protocol.Q4n.Proto_ErrRoleInvalidNameLength
              ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                  "NotElegantName",
                )
              : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                  e.Q4n,
                  24056,
                ));
      });
  }
  static SendChangeHeadPhotoRequest(o) {
    var e = Protocol_1.Aki.Protocol.dYn.create();
    (e.z7n = o),
      Net_1.Net.Call(22417, e, (e) => {
        e &&
          (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs
            ? ModelManager_1.ModelManager.PersonalModel.SetHeadPhotoId(o)
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                15434,
              ));
      });
  }
  static CheckCardIsUsing(o) {
    var t = ModelManager_1.ModelManager.PersonalModel.GetCardShowList(),
      r = t.length;
    let l = !1;
    for (let e = 0; e < r; e++)
      if (t[e] === o) {
        l = !0;
        break;
      }
    return l;
  }
  static CheckCardIsUnLock(o) {
    var t = ModelManager_1.ModelManager.PersonalModel.GetCardDataList(),
      r = t.length;
    for (let e = 0; e < r; e++) {
      var l = t[e];
      if (l.CardId === o) return l.IsUnLock;
    }
    return !1;
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(26491, (e) => {
      ModelManager_1.ModelManager.PersonalModel.AddCardUnlockList(e.J7n, !1);
    }),
      Net_1.Net.Register(27425, (e) => {
        ModelManager_1.ModelManager.PersonalModel.SetHeadPhotoId(e.dSs);
      }),
      Net_1.Net.Register(16543, (e) => {
        ModelManager_1.ModelManager.PersonalModel.SetRoleShowList(e.MSs);
      }),
      Net_1.Net.Register(28639, (e) => {
        ModelManager_1.ModelManager.PersonalModel.SetSignature(e.zVn);
      }),
      Net_1.Net.Register(23960, (e) => {
        ModelManager_1.ModelManager.FunctionModel.SetPlayerName(e.H8n),
          ModelManager_1.ModelManager.PersonalModel.SetModifyNameInfo(
            e.Zha,
            StringUtils_1.EMPTY_STRING,
          );
      }),
      Net_1.Net.Register(16407, (e) => {
        ModelManager_1.ModelManager.PersonalModel.UpdatePlayerHeadData(e.NE_);
      }),
      Net_1.Net.Register(15156, (e) => {
        ModelManager_1.ModelManager.PersonalModel.SetDressedPlayerTitle(
          e.gsc,
          e.Csc,
        );
      }),
      Net_1.Net.Register(18682, (e) => {
        ModelManager_1.ModelManager.PersonalModel.UpdateUnDressedPlayerTitleList(
          e.Ysc,
        );
      });
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(26491),
      Net_1.Net.UnRegister(27425),
      Net_1.Net.UnRegister(16543),
      Net_1.Net.UnRegister(28639),
      Net_1.Net.UnRegister(23960),
      Net_1.Net.UnRegister(16407),
      Net_1.Net.UnRegister(15156),
      Net_1.Net.UnRegister(18682);
  }
  static SendChangePlayerTitleRequest(e) {
    var o = Protocol_1.Aki.Protocol.voc.create();
    (o.gsc = e),
      Net_1.Net.Call(21980, o, (e) => {
        e &&
          e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Q4n,
            29509,
          );
      });
  }
}
(exports.PersonalController = PersonalController),
  ((_a = PersonalController).xkt = () => {
    PersonalController.c3l();
  }),
  (PersonalController.RequestModifySignature = async (e) => {
    var o = Protocol_1.Aki.Protocol.uYn.create(),
      o = ((o.zVn = e), await Net_1.Net.CallAsync(27844, o));
    return (
      o.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs
        ? ModelManager_1.ModelManager.PersonalModel.SetSignature(e)
        : o.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ContainsDirtyWord ||
            o.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ErrRoleInvalidNameLength
          ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
              "NotElegantName",
            )
          : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              o.Q4n,
              24056,
            ),
      o.Q4n
    );
  }),
  (PersonalController.RequestModifyName = async (e) => {
    var o = Protocol_1.Aki.Protocol.lYn.create(),
      e = ((o.H8n = e), await Net_1.Net.CallAsync(15346, o));
    return (
      e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs
        ? ModelManager_1.ModelManager.PersonalModel.SetModifyNameInfo(
            e.Zha,
            e.ela,
          )
        : e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ContainsDirtyWord ||
            e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ErrRoleInvalidNameLength
          ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
              "NotElegantName",
            )
          : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              15434,
            ),
      e.Q4n
    );
  }),
  (PersonalController.K0c = (e, o) => {
    10082 === e &&
      o &&
      ((e = Protocol_1.Aki.Protocol.Coc.create()),
      Net_1.Net.Call(15742, e, (e) => {
        e &&
          ModelManager_1.ModelManager.PersonalModel.InitPlayerTitleData(e.zsc);
      }));
  });
//# sourceMappingURL=PersonalController.js.map
