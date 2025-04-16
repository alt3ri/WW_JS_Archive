"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InviteNewbieModel = void 0);
const H5CircumUrlById_1 = require("../../../../../../Core/Define/ConfigQuery/H5CircumUrlById"),
  ModelBase_1 = require("../../../../../../Core/Framework/ModelBase"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  LocalStorage_1 = require("../../../../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../../../../Common/LocalStorageDefine"),
  ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
  InviteNewbieProtocolContext_1 = require("./InviteNewbieProtocolContext");
class InviteNewbieModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), (this.xVa = void 0);
  }
  OnInit() {
    return (
      (this.xVa = new InviteNewbieProtocolContext_1.InviteNewbieProtocolContext(
        this,
      )),
      !0
    );
  }
  OnClear() {
    return this.xVa?.Dispose(), !(this.xVa = void 0);
  }
  get ActivityData() {
    return (
      void 0 === this.xVa &&
        (this.xVa =
          new InviteNewbieProtocolContext_1.InviteNewbieProtocolContext(this)),
      this.xVa
    );
  }
  get CurrentActivityId() {
    return this.xVa?.Id ?? 0;
  }
  get HasRedDot() {
    var e = LocalStorage_1.LocalStorage.GetPlayer(
      LocalStorageDefine_1.ELocalStoragePlayerKey.InviteNewbieEntered,
    );
    return void 0 === e || !e;
  }
  get HelpId() {
    return this.xVa?.GetHelpId() ?? 0;
  }
  get InviteCode() {
    return this.xVa?.InviteCode ?? "";
  }
  get ScoreTextId() {
    var e;
    return void 0 === this.xVa
      ? ""
      : ((e = this.xVa.Id),
        H5CircumUrlById_1.configH5CircumUrlById.GetConfig(e)?.ScoreText ?? " ");
  }
  get Score() {
    return this.xVa?.Score ?? 0;
  }
  get RootUrl() {
    var e;
    if (void 0 !== this.xVa)
      return (
        (e = this.xVa.Id),
        (e = H5CircumUrlById_1.configH5CircumUrlById.GetConfig(e)),
        ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk()
          ? e?.OverseaRootUrl
          : e?.RootUrl
      );
  }
  get IsInternalBrowser() {
    var e;
    return (
      void 0 !== this.xVa &&
      ((e = this.xVa.Id),
      H5CircumUrlById_1.configH5CircumUrlById.GetConfig(e)?.IsInternalBrowser ??
        !1)
    );
  }
  SyncActivityNotify(e) {
    e = e.fks;
    this.xVa &&
      ((this.xVa.InviteCode = e?.Wwc ?? void 0),
      (this.xVa.Score = e?.SMs ?? 0)),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        this.CurrentActivityId,
      );
  }
}
exports.InviteNewbieModel = InviteNewbieModel;
//# sourceMappingURL=InviteNewbieModel.js.map
