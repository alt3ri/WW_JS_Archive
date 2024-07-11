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
    var e = Protocol_1.Aki.Protocol.mYn.create();
    (e.jVn = o),
      Net_1.Net.Call(24874, e, (e) => {
        e &&
          (e.O4n === Protocol_1.Aki.Protocol.O4n.NRs
            ? ModelManager_1.ModelManager.PersonalModel.SetBirthday(o)
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.O4n,
                13587,
              ));
      });
  }
  static SendBirthdayShowSetRequest(o) {
    var e = Protocol_1.Aki.Protocol.TYn.create();
    (e.k7n = o),
      Net_1.Net.Call(4073, e, (e) => {
        e &&
          (e.O4n === Protocol_1.Aki.Protocol.O4n.NRs
            ? ModelManager_1.ModelManager.PersonalModel.SetBirthdayDisplay(o)
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.O4n,
                17777,
              ));
      });
  }
  static SendRoleShowListUpdateRequest(o) {
    var e = Protocol_1.Aki.Protocol.gYn.create();
    (e.F7n = o),
      Net_1.Net.Call(10488, e, (e) => {
        e &&
          (e.O4n === Protocol_1.Aki.Protocol.O4n.NRs
            ? ModelManager_1.ModelManager.PersonalModel.UpdateRoleShowList(o)
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.O4n,
                15412,
              ));
      });
  }
  static async SendRoleShowListUpdateRequestAsync(e) {
    var o = Protocol_1.Aki.Protocol.gYn.create(),
      o = ((o.F7n = e), await Net_1.Net.CallAsync(10488, o));
    if (o) {
      if (o.O4n === Protocol_1.Aki.Protocol.O4n.NRs)
        return (
          ModelManager_1.ModelManager.PersonalModel.UpdateRoleShowList(e), !0
        );
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
        o.O4n,
        15412,
      );
    }
    return !1;
  }
  static SendChangeCardRequest(o) {
    var e = Protocol_1.Aki.Protocol.MYn.create();
    (e.V7n = o),
      Net_1.Net.Call(16600, e, (e) => {
        e &&
          (e.O4n === Protocol_1.Aki.Protocol.O4n.NRs
            ? ModelManager_1.ModelManager.PersonalModel.SetCurCardId(o)
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.O4n,
                12975,
              ));
      });
  }
  static SendReadCardRequest(o) {
    var e = Protocol_1.Aki.Protocol.EYn.create();
    (e.V7n = o),
      Net_1.Net.Call(6751, e, (e) => {
        e &&
          (e.O4n === Protocol_1.Aki.Protocol.O4n.NRs
            ? ModelManager_1.ModelManager.PersonalModel.UpdateCardUnlockList(
                o,
                !0,
              )
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.O4n,
                11769,
              ));
      });
  }
  static SendModifySignatureRequest(o) {
    var e = Protocol_1.Aki.Protocol.oYn.create();
    (e.HVn = o),
      Net_1.Net.Call(12421, e, (e) => {
        e &&
          (e.O4n === Protocol_1.Aki.Protocol.O4n.NRs
            ? ModelManager_1.ModelManager.PersonalModel.SetSignature(o)
            : e.O4n === Protocol_1.Aki.Protocol.O4n.Proto_ContainsDirtyWord ||
                e.O4n ===
                  Protocol_1.Aki.Protocol.O4n.Proto_ErrRoleInvalidNameLength
              ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                  "NotElegantName",
                )
              : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                  e.O4n,
                  14622,
                ));
      });
  }
  static SendChangeHeadPhotoRequest(o) {
    var e = Protocol_1.Aki.Protocol.sYn.create();
    (e.H7n = o),
      Net_1.Net.Call(24686, e, (e) => {
        e &&
          (e.O4n === Protocol_1.Aki.Protocol.O4n.NRs
            ? ModelManager_1.ModelManager.PersonalModel.SetHeadPhotoId(o)
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.O4n,
                15171,
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
    Net_1.Net.Register(14085, (e) => {
      ModelManager_1.ModelManager.PersonalModel.AddCardUnlockList(e.V7n, !1);
    }),
      Net_1.Net.Register(7291, (e) => {
        ModelManager_1.ModelManager.PersonalModel.SetHeadPhotoId(e.sSs);
      }),
      Net_1.Net.Register(10769, (e) => {
        ModelManager_1.ModelManager.PersonalModel.SetRoleShowList(e.dSs);
      }),
      Net_1.Net.Register(19153, (e) => {
        ModelManager_1.ModelManager.PersonalModel.SetSignature(e.HVn);
      }),
      Net_1.Net.Register(15850, (e) => {
        ModelManager_1.ModelManager.FunctionModel.SetPlayerName(e.w8n),
          ModelManager_1.ModelManager.PersonalModel.SetModifyNameInfo(
            e.vna,
            StringUtils_1.EMPTY_STRING,
          );
      });
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(14085),
      Net_1.Net.UnRegister(7291),
      Net_1.Net.UnRegister(10769),
      Net_1.Net.UnRegister(19153),
      Net_1.Net.UnRegister(15850);
  }
}
(exports.PersonalController = PersonalController),
  ((_a = PersonalController).RequestModifySignature = async (e) => {
    var o = Protocol_1.Aki.Protocol.oYn.create(),
      o = ((o.HVn = e), await Net_1.Net.CallAsync(12421, o));
    return (
      o.O4n === Protocol_1.Aki.Protocol.O4n.NRs
        ? ModelManager_1.ModelManager.PersonalModel.SetSignature(e)
        : o.O4n === Protocol_1.Aki.Protocol.O4n.Proto_ContainsDirtyWord ||
            o.O4n === Protocol_1.Aki.Protocol.O4n.Proto_ErrRoleInvalidNameLength
          ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
              "NotElegantName",
            )
          : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              o.O4n,
              14622,
            ),
      o.O4n
    );
  }),
  (PersonalController.RequestModifyName = async (e) => {
    var o = Protocol_1.Aki.Protocol.iYn.create(),
      e = ((o.w8n = e), await Net_1.Net.CallAsync(17827, o));
    return (
      e.O4n === Protocol_1.Aki.Protocol.O4n.NRs
        ? ModelManager_1.ModelManager.PersonalModel.SetModifyNameInfo(
            e.vna,
            e.pna,
          )
        : e.O4n === Protocol_1.Aki.Protocol.O4n.Proto_ContainsDirtyWord ||
            e.O4n === Protocol_1.Aki.Protocol.O4n.Proto_ErrRoleInvalidNameLength
          ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
              "NotElegantName",
            )
          : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.O4n,
              15171,
            ),
      e.O4n
    );
  });
//# sourceMappingURL=PersonalController.js.map
