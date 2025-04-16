"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonQteModel = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../Core/Common/Log"),
  ModelBase_1 = require("../../../../Core/Framework/ModelBase"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  DataTableUtil_1 = require("../../../../Core/Utils/DataTableUtil"),
  CommonQteContinuousClickContext_1 = require("./CommonQteContinuousClickContext"),
  CommonQteSingleClickContext_1 = require("./CommonQteSingleClickContext"),
  DT_COMMON_QTE_PATH = "/Game/Aki/Data/Qte/DT_CommonQte.DT_CommonQte";
class CommonQteModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.hJ = -1),
      (this.ZEl = 0),
      (this.Rpc = void 0),
      (this.tIl = void 0),
      (this.Ppc = void 0),
      (this.IsRefreshMode = !1);
  }
  OnLeaveLevel() {
    return this.tIl?.clear(), this.Ppc?.clear(), !(this.Rpc = void 0);
  }
  CreateQteContext(t, o = void 0, i = void 0, s = 0) {
    var r = this.GetCommonQteConfig(t);
    if (r) {
      let e = void 0;
      switch (r.BaseConfig.QteType) {
        case 0:
          e = new CommonQteSingleClickContext_1.CommonQteSingleClickContext();
          break;
        case 1:
          e =
            new CommonQteContinuousClickContext_1.CommonQteContinuousClickContext();
          break;
        default:
          return;
      }
      return (
        (e.QteId = t),
        (e.Source = s),
        (e.HandleId = this.ZEl++),
        e.SetConfig(r),
        (e.SuccessCallback = o),
        (e.FailCallback = i),
        e
      );
    }
  }
  SetCurrentCommonQte(e) {
    (this.hJ = e.HandleId),
      this.tIl || (this.tIl = new Map()),
      this.tIl.set(e.HandleId, e);
  }
  GetCommonQteConfig(e) {
    this.Rpc ||
      (this.Rpc = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
        DT_COMMON_QTE_PATH,
        UE.DataTable,
      ));
    var t = DataTableUtil_1.DataTableUtil.GetDataTableRow(
      this.Rpc,
      e.toString(),
    );
    return (
      t ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("CommonQte", 67, "找不到通用QTE配置", ["QteId", e])),
      t
    );
  }
  GetCommonQteViewName(e) {
    e = this.GetCommonQteConfig(e);
    if (e)
      if (0 === e.BaseConfig.QteType) {
        if (0 === e.BaseConfig.SingleClickConfig.ViewType)
          return "CommonQteView";
      } else if (1 === e.BaseConfig.QteType)
        if (0 === e.BaseConfig.ContinuousClickConfig.ViewType)
          return "CommonQteContinuousClickView";
  }
  GetQteHandleId() {
    return this.hJ;
  }
  ClearQteHandleId() {
    this.hJ = -1;
  }
  GetQteContext(e) {
    return this.tIl?.get(e);
  }
  GetQteIcon(e) {
    return this.Ppc?.get(e);
  }
  async LoadQteIcon(t, o) {
    const i = new CustomPromise_1.CustomPromise();
    var e = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
      o,
      UE.LGUITexturePackerSpriteData,
    );
    return (
      e
        ? (void 0 === this.Ppc && (this.Ppc = new Map()),
          this.Ppc.set(t, e),
          i.SetResult(!0))
        : ResourceSystem_1.ResourceSystem.LoadAsync(
            o,
            UE.LGUITexturePackerSpriteData,
            (e) => {
              e
                ? (void 0 === this.Ppc && (this.Ppc = new Map()),
                  this.Ppc.set(t, e),
                  i.SetResult(!0))
                : (Log_1.Log.CheckError() &&
                    Log_1.Log.Error("CommonQte", 67, "QTE加载图标失败", [
                      "iconPath",
                      o,
                    ]),
                  i.SetResult(!1));
            },
            100,
          ),
      i.Promise
    );
  }
  GetQteIconPath(e) {
    e = this.GetCommonQteConfig(e);
    if (e)
      return e.BaseConfig.SingleClickConfig.UIConfig.Icon.ToAssetPathName();
  }
  ClearPreloadCache() {
    this.Ppc?.clear();
  }
}
exports.CommonQteModel = CommonQteModel;
//# sourceMappingURL=CommonQteModel.js.map
