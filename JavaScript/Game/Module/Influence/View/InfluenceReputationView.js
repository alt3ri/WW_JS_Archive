"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InfluenceReputationView = void 0);
const UE = require("ue"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView"),
  InfluenceReputationDefine_1 = require("../InfluenceReputationDefine"),
  InfluenceDisplayItem_1 = require("./Item/InfluenceDisplayItem"),
  DEVIATION_VALUE = 10,
  PROGRESS_DEVIATION_VALUE = 0.05;
class InfluenceReputationView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.xqe = void 0),
      (this.tsi = 0),
      (this.hLt = 0),
      (this.isi = 0),
      (this.osi = !1),
      (this.rsi = !1),
      (this.nsi = !1),
      (this.ssi = void 0),
      (this.asi = void 0),
      (this.hsi = []),
      (this.cje = !1),
      (this.lsi = !1),
      (this.Rvt = () => {
        this.CloseMe();
      }),
      (this.DAt = () => {
        UiManager_1.UiManager.OpenView("InfluenceSearchView", this.tsi);
      }),
      (this._si = () => {
        UiManager_1.UiManager.OpenView("InfluenceAreaSelectView", this.tsi);
      }),
      (this.usi = () => {
        var t = this.xqe.ContentItem,
          e = t.GetWidth(),
          t = Math.abs(t.GetAnchorOffsetX()) + this.xqe.ScrollWidth,
          s = this.hsi.length;
        if (e < t) this.xqe.ScrollToRight(s - 2);
        else {
          e = e / s;
          let i = 0;
          (i =
            t % e < DEVIATION_VALUE
              ? Math.floor(t / e) - 1 - 1
              : Math.floor(t / e) - 1),
            this.xqe.ScrollToRight(i);
        }
      }),
      (this.msi = () => {
        var i = this.xqe.ContentItem,
          t = i.GetWidth(),
          i = Math.abs(i.GetAnchorOffsetX()),
          e = (i < 0 && this.xqe.ScrollToLeft(1), this.hsi.length),
          t = t / e;
        let s = 0;
        (s =
          t - (i % t) < DEVIATION_VALUE
            ? Math.floor(i / t) + 1 + 1
            : Math.floor(i / t) + 1),
          this.xqe.ScrollToLeft(s);
      }),
      (this.dsi = () => {
        this.Csi(!1),
          void 0 !== this.hLt &&
            (this.xqe.GetScrollItemByKey(this.hLt).SetDisActiveToggleState(),
            (this.hLt = void 0));
      }),
      (this.sGe = (i, t, e) => {
        t = new InfluenceDisplayItem_1.InfluenceDisplayItem(t);
        return (
          t.UpdateItem(i, this.tsi),
          t.SetToggleFunction(this.pqe),
          t.SetIndex(e),
          { Key: e, Value: t }
        );
      }),
      (this.pqe = (i, t) => {
        0 === i
          ? this.hLt === t && ((this.hLt = void 0), this.gsi(), this.Csi(!1))
          : ((i = this.hLt),
            (this.hLt = t),
            void 0 !== i
              ? this.xqe.GetScrollItemByKey(i).SetDisActiveToggleState()
              : this.gsi(),
            (this.cje = !0),
            this.Csi(!0));
      }),
      (this.fsi = (i) => {
        this.osi &&
          ((i = MathUtils_1.MathUtils.Clamp(i.X, 0, 1)), this.isi !== i) &&
          ((this.isi = i), this.gsi());
      }),
      (this.PKt = (i) => {
        (this.tsi = i), this.Og();
      }),
      (this.psi = (i, t) => {
        (this.tsi = t), this.Og(), this.vsi(i);
      }),
      (this.fje = (i) => {
        this.cje && ((this.cje = !1), this.Msi()),
          this.lsi &&
            ((this.lsi = !1), (this.osi = this.xqe.IsExpand), this.gsi());
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIScrollViewWithScrollbarComponent],
      [2, UE.UIButtonComponent],
      [3, UE.UIButtonComponent],
      [4, UE.UIButtonComponent],
      [5, UE.UIButtonComponent],
      [6, UE.UITexture],
      [7, UE.UIText],
      [8, UE.UIText],
      [9, UE.UIText],
      [10, UE.UIButtonComponent],
      [11, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [0, this.Rvt],
        [5, this.DAt],
        [4, this._si],
        [2, this.usi],
        [3, this.msi],
        [10, this.dsi],
      ]);
  }
  OnBeforeCreate() {
    this.tsi = this.OpenParam;
  }
  OnStart() {
    (this.xqe = new GenericScrollView_1.GenericScrollView(
      this.GetScrollViewWithScrollbar(1),
      this.sGe,
    )),
      this.xqe.BindScrollValueChange(this.fsi),
      this.xqe.BindLateUpdate(this.fje);
    var i = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerStand();
    this.SetTextureByPath(i, this.GetTexture(6)),
      (this.ssi = this.GetButton(2).RootUIComp),
      (this.asi = this.GetButton(3).RootUIComp),
      this.ssi.SetUIActive(!1),
      this.asi.SetUIActive(!1),
      (this.rsi = !1),
      (this.nsi = !1);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RefreshInfluencePanel,
      this.PKt,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SearchInfluence,
        this.psi,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RefreshInfluencePanel,
      this.PKt,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SearchInfluence,
        this.psi,
      );
  }
  OnAfterShow() {
    this.Og();
  }
  OnBeforeDestroy() {
    this.xqe.ClearChildren(),
      (this.xqe = void 0),
      (this.asi = void 0),
      (this.ssi = void 0);
  }
  Og() {
    var i = ConfigManager_1.ConfigManager.InfluenceConfig.GetCountryConfig(
      this.tsi,
    );
    (this.hsi = i.Influences.filter(
      (i) => i !== InfluenceReputationDefine_1.RAMDOM_INFLUENCE_ID,
    )),
      this.Esi(),
      this.Ssi(i.Title),
      this.ysi(),
      this.Isi(),
      this.Csi(!1);
  }
  vsi(i) {
    i = this.hsi.indexOf(i);
    this.xqe.GetScrollItemByKey(i).SetToggleState(1, !0);
  }
  Esi() {
    (this.hLt = void 0), this.xqe.RefreshByData(this.hsi), (this.lsi = !0);
  }
  Ssi(i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), i);
  }
  ysi() {
    let i = 0;
    for (const t of this.xqe.GetScrollItemMap().values()) t.IsUnLock() && i++;
    this.GetText(8).SetText(i.toString()),
      this.GetText(9).SetText(this.hsi.length.toString());
  }
  Isi() {
    var i =
      ModelManager_1.ModelManager.InfluenceReputationModel.HasRedDotExcludeCurrentCountry(
        this.tsi,
      );
    this.GetItem(11).SetUIActive(i);
  }
  gsi() {
    var i;
    this.osi && void 0 === this.hLt
      ? void 0 !== this.isi &&
        ((i = this.isi < 1 - PROGRESS_DEVIATION_VALUE),
        this.rsi !== i && ((this.rsi = i), this.ssi.SetUIActive(i)),
        (i = this.isi > PROGRESS_DEVIATION_VALUE),
        this.nsi !== i) &&
        ((this.nsi = i), this.asi.SetUIActive(i))
      : (this.rsi && ((this.rsi = !1), this.ssi.SetUIActive(!1)),
        this.nsi && ((this.nsi = !1), this.asi.SetUIActive(!1)));
  }
  Csi(i) {
    this.GetButton(10).RootUIComp.SetUIActive(i);
  }
  Msi() {
    var i = this.xqe.GetScrollItemMap().size;
    this.hLt === i - 1
      ? this.xqe.ScrollToLeft(this.hLt - 1)
      : this.xqe.ScrollToLeft(this.hLt);
  }
}
exports.InfluenceReputationView = InfluenceReputationView;
//# sourceMappingURL=InfluenceReputationView.js.map
