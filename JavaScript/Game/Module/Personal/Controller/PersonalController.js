"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PersonalController = void 0);
const Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../Core/Net/Net"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../../Ui/Base/UiControllerBase"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
class PersonalController extends UiControllerBase_1.UiControllerBase {
  static SendBirthdayInitRequest(e) {
    var o = Protocol_1.Aki.Protocol.MWn.create();
    (o._5n = e),
      Net_1.Net.Call(7998, o, (o) => {
        o &&
          (o.lkn === Protocol_1.Aki.Protocol.lkn.Sys
            ? ModelManager_1.ModelManager.PersonalModel.SetBirthday(e)
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                o.lkn,
                19017,
              ));
      });
  }
  static SendBirthdayShowSetRequest(e) {
    var o = Protocol_1.Aki.Protocol.UWn.create();
    (o.a8n = e),
      Net_1.Net.Call(10008, o, (o) => {
        o &&
          (o.lkn === Protocol_1.Aki.Protocol.lkn.Sys
            ? ModelManager_1.ModelManager.PersonalModel.SetBirthdayDisplay(e)
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                o.lkn,
                10702,
              ));
      });
  }
  static SendRoleShowListUpdateRequest(e) {
    var o = Protocol_1.Aki.Protocol.EWn.create();
    (o.h8n = e),
      Net_1.Net.Call(13799, o, (o) => {
        o &&
          (o.lkn === Protocol_1.Aki.Protocol.lkn.Sys
            ? ModelManager_1.ModelManager.PersonalModel.UpdateRoleShowList(e)
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                o.lkn,
                27349,
              ));
      });
  }
  static SendChangeCardRequest(e) {
    var o = Protocol_1.Aki.Protocol.LWn.create();
    (o.l8n = e),
      Net_1.Net.Call(27663, o, (o) => {
        o &&
          (o.lkn === Protocol_1.Aki.Protocol.lkn.Sys
            ? ModelManager_1.ModelManager.PersonalModel.SetCurCardId(e)
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                o.lkn,
                25891,
              ));
      });
  }
  static SendReadCardRequest(e) {
    var o = Protocol_1.Aki.Protocol.DWn.create();
    (o.l8n = e),
      Net_1.Net.Call(25600, o, (o) => {
        o &&
          (o.lkn === Protocol_1.Aki.Protocol.lkn.Sys
            ? ModelManager_1.ModelManager.PersonalModel.UpdateCardUnlockList(
                e,
                !0,
              )
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                o.lkn,
                15839,
              ));
      });
  }
  static SendModifySignatureRequest(e) {
    var o = Protocol_1.Aki.Protocol._Wn.create();
    (o.l5n = e),
      Net_1.Net.Call(14276, o, (o) => {
        o &&
          (o.lkn === Protocol_1.Aki.Protocol.lkn.Sys
            ? ModelManager_1.ModelManager.PersonalModel.SetSignature(e)
            : o.lkn === Protocol_1.Aki.Protocol.lkn.Proto_ContainsDirtyWord ||
                o.lkn ===
                  Protocol_1.Aki.Protocol.lkn.Proto_ErrRoleInvalidNameLength
              ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                  "NotElegantName",
                )
              : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                  o.lkn,
                  21259,
                ));
      });
  }
  static SendChangeHeadPhotoRequest(e) {
    var o = Protocol_1.Aki.Protocol.cWn.create();
    (o._8n = e),
      Net_1.Net.Call(28199, o, (o) => {
        o &&
          (o.lkn === Protocol_1.Aki.Protocol.lkn.Sys
            ? ModelManager_1.ModelManager.PersonalModel.SetHeadPhotoId(e)
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                o.lkn,
                19761,
              ));
      });
  }
  static CheckCardIsUsing(e) {
    var r = ModelManager_1.ModelManager.PersonalModel.GetCardShowList(),
      t = r.length;
    let l = !1;
    for (let o = 0; o < t; o++)
      if (r[o] === e) {
        l = !0;
        break;
      }
    return l;
  }
  static CheckCardIsUnLock(e) {
    var r = ModelManager_1.ModelManager.PersonalModel.GetCardUnlockList(),
      t = r.length;
    let l = !1;
    for (let o = 0; o < t; o++)
      if (r[o].CardId === e) {
        l = !0;
        break;
      }
    return l;
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(26689, (o) => {
      ModelManager_1.ModelManager.PersonalModel.AddCardUnlockList(o.l8n, !1);
    }),
      Net_1.Net.Register(5089, (o) => {
        ModelManager_1.ModelManager.PersonalModel.SetHeadPhotoId(o.$gs);
      }),
      Net_1.Net.Register(20767, (o) => {
        ModelManager_1.ModelManager.PersonalModel.SetRoleShowList(o.Ygs);
      }),
      Net_1.Net.Register(4725, (o) => {
        ModelManager_1.ModelManager.PersonalModel.SetSignature(o.l5n);
      });
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(26689);
  }
}
(exports.PersonalController = PersonalController),
  ((_a = PersonalController).RequestModifySignature = async (o) => {
    var e = Protocol_1.Aki.Protocol._Wn.create(),
      e = ((e.l5n = o), await Net_1.Net.CallAsync(14276, e));
    return (
      e.lkn === Protocol_1.Aki.Protocol.lkn.Sys
        ? ModelManager_1.ModelManager.PersonalModel.SetSignature(o)
        : e.lkn === Protocol_1.Aki.Protocol.lkn.Proto_ContainsDirtyWord ||
            e.lkn === Protocol_1.Aki.Protocol.lkn.Proto_ErrRoleInvalidNameLength
          ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
              "NotElegantName",
            )
          : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.lkn,
              21259,
            ),
      e.lkn
    );
  }),
  (PersonalController.RequestModifyName = async (o) => {
    var e = Protocol_1.Aki.Protocol.hWn.create(),
      e = ((e.e4n = o), await Net_1.Net.CallAsync(15982, e));
    return (
      e.lkn === Protocol_1.Aki.Protocol.lkn.Sys
        ? ModelManager_1.ModelManager.FunctionModel.SetPlayerName(o)
        : e.lkn === Protocol_1.Aki.Protocol.lkn.Proto_ContainsDirtyWord ||
            e.lkn === Protocol_1.Aki.Protocol.lkn.Proto_ErrRoleInvalidNameLength
          ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
              "NotElegantName",
            )
          : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.lkn,
              19761,
            ),
      e.lkn
    );
  });
//# sourceMappingURL=PersonalController.js.map
