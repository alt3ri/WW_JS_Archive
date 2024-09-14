"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PersonalController = void 0);
const Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../Core/Net/Net"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../../Ui/Base/UiControllerBase"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
class PersonalController extends UiControllerBase_1.UiControllerBase {
  static SendBirthdayInitRequest(o) {
    var e = Protocol_1.Aki.Protocol.SYn.create();
    (e.ZVn = o),
      Net_1.Net.Call(17386, e, (e) => {
        e &&
          (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs
            ? ModelManager_1.ModelManager.PersonalModel.SetBirthday(o)
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                29606,
              ));
      });
  }
  static SendBirthdayShowSetRequest(o) {
    var e = Protocol_1.Aki.Protocol.wYn.create();
    (e.$7n = o),
      Net_1.Net.Call(16646, e, (e) => {
        e &&
          (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs
            ? ModelManager_1.ModelManager.PersonalModel.SetBirthdayDisplay(o)
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                27280,
              ));
      });
  }
  static SendRoleShowListUpdateRequest(o) {
    var e = Protocol_1.Aki.Protocol.yYn.create();
    (e.Y7n = o),
      Net_1.Net.Call(28436, e, (e) => {
        e &&
          (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs
            ? ModelManager_1.ModelManager.PersonalModel.UpdateRoleShowList(o)
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                15653,
              ));
      });
  }
  static async SendRoleShowListUpdateRequestAsync(e) {
    var o = Protocol_1.Aki.Protocol.yYn.create(),
      o = ((o.Y7n = e), await Net_1.Net.CallAsync(28436, o));
    if (o) {
      if (o.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs)
        return (
          ModelManager_1.ModelManager.PersonalModel.UpdateRoleShowList(e), !0
        );
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
        o.Q4n,
        15653,
      );
    }
    return !1;
  }
  static SendChangeCardRequest(o) {
    var e = Protocol_1.Aki.Protocol.RYn.create();
    (e.J7n = o),
      Net_1.Net.Call(16962, e, (e) => {
        e &&
          (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs
            ? ModelManager_1.ModelManager.PersonalModel.SetCurCardId(o)
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                27746,
              ));
      });
  }
  static SendReadCardRequest(o) {
    var e = Protocol_1.Aki.Protocol.AYn.create();
    (e.J7n = o),
      Net_1.Net.Call(26208, e, (e) => {
        e &&
          (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs
            ? ModelManager_1.ModelManager.PersonalModel.UpdateCardUnlockList(
                o,
                !0,
              )
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                18253,
              ));
      });
  }
  static SendModifySignatureRequest(o) {
    var e = Protocol_1.Aki.Protocol.uYn.create();
    (e.zVn = o),
      Net_1.Net.Call(21630, e, (e) => {
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
                  23657,
                ));
      });
  }
  static SendChangeHeadPhotoRequest(o) {
    var e = Protocol_1.Aki.Protocol.dYn.create();
    (e.z7n = o),
      Net_1.Net.Call(16594, e, (e) => {
        e &&
          (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs
            ? ModelManager_1.ModelManager.PersonalModel.SetHeadPhotoId(o)
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                19744,
              ));
      });
  }
  static CheckCardIsUsing(o) {
    var r = ModelManager_1.ModelManager.PersonalModel.GetCardShowList(),
      t = r.length;
    let l = !1;
    for (let e = 0; e < t; e++)
      if (r[e] === o) {
        l = !0;
        break;
      }
    return l;
  }
  static CheckCardIsUnLock(o) {
    var r = ModelManager_1.ModelManager.PersonalModel.GetCardDataList(),
      t = r.length;
    for (let e = 0; e < t; e++) {
      var l = r[e];
      if (l.CardId === o) return l.IsUnLock;
    }
    return !1;
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(26791, (e) => {
      ModelManager_1.ModelManager.PersonalModel.AddCardUnlockList(e.J7n, !1);
    }),
      Net_1.Net.Register(24358, (e) => {
        ModelManager_1.ModelManager.PersonalModel.SetHeadPhotoId(e.dSs);
      }),
      Net_1.Net.Register(25706, (e) => {
        ModelManager_1.ModelManager.PersonalModel.SetRoleShowList(e.MSs);
      }),
      Net_1.Net.Register(28026, (e) => {
        ModelManager_1.ModelManager.PersonalModel.SetSignature(e.zVn);
      }),
      Net_1.Net.Register(28452, (e) => {
        ModelManager_1.ModelManager.FunctionModel.SetPlayerName(e.H8n),
          ModelManager_1.ModelManager.PersonalModel.SetModifyNameInfo(
            e.Zha,
            StringUtils_1.EMPTY_STRING,
          );
      });
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(26791),
      Net_1.Net.UnRegister(24358),
      Net_1.Net.UnRegister(25706),
      Net_1.Net.UnRegister(28026),
      Net_1.Net.UnRegister(28452);
  }
}
(exports.PersonalController = PersonalController),
  ((_a = PersonalController).RequestModifySignature = async (e) => {
    var o = Protocol_1.Aki.Protocol.uYn.create(),
      o = ((o.zVn = e), await Net_1.Net.CallAsync(21630, o));
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
              23657,
            ),
      o.Q4n
    );
  }),
  (PersonalController.RequestModifyName = async (e) => {
    var o = Protocol_1.Aki.Protocol.lYn.create(),
      e = ((o.H8n = e), await Net_1.Net.CallAsync(18352, o));
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
              19744,
            ),
      e.Q4n
    );
  });
//# sourceMappingURL=PersonalController.js.map
