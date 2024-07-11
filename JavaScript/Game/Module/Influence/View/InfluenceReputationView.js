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
      (this.tni = 0),
      (this.oTt = 0),
      (this.ini = 0),
      (this.oni = !1),
      (this.rni = !1),
      (this.nni = !1),
      (this.sni = void 0),
      (this.ani = void 0),
      (this.hni = []),
      (this.eHe = !1),
      (this.lni = !1),
      (this.gpt = () => {
        this.CloseMe();
      }),
      (this.yUt = () => {
        UiManager_1.UiManager.OpenView("InfluenceSearchView", this.tni);
      }),
      (this._ni = () => {
        UiManager_1.UiManager.OpenView("InfluenceAreaSelectView", this.tni);
      }),
      (this.uni = () => {
        var t = this.xqe.ContentItem,
          e = t.GetWidth(),
          t = Math.abs(t.GetAnchorOffsetX()) + this.xqe.ScrollWidth,
          s = this.hni.length;
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
      (this.cni = () => {
        var i = this.xqe.ContentItem,
          t = i.GetWidth(),
          i = Math.abs(i.GetAnchorOffsetX()),
          e = (i < 0 && this.xqe.ScrollToLeft(1), this.hni.length),
          t = t / e;
        let s = 0;
        (s =
          t - (i % t) < DEVIATION_VALUE
            ? Math.floor(i / t) + 1 + 1
            : Math.floor(i / t) + 1),
          this.xqe.ScrollToLeft(s);
      }),
      (this.mni = () => {
        this.dni(!1),
          void 0 !== this.oTt &&
            (this.xqe.GetScrollItemByKey(this.oTt).SetDisActiveToggleState(),
            (this.oTt = void 0));
      }),
      (this.sGe = (i, t, e) => {
        t = new InfluenceDisplayItem_1.InfluenceDisplayItem(t);
        return (
          t.UpdateItem(i, this.tni),
          t.SetToggleFunction(this.pqe),
          t.SetIndex(e),
          { Key: e, Value: t }
        );
      }),
      (this.pqe = (i, t) => {
        0 === i
          ? this.oTt === t && ((this.oTt = void 0), this.Cni(), this.dni(!1))
          : ((i = this.oTt),
            (this.oTt = t),
            void 0 !== i
              ? this.xqe.GetScrollItemByKey(i).SetDisActiveToggleState()
              : this.Cni(),
            (this.eHe = !0),
            this.dni(!0));
      }),
      (this.gni = (i) => {
        this.oni &&
          ((i = MathUtils_1.MathUtils.Clamp(i.X, 0, 1)), this.ini !== i) &&
          ((this.ini = i), this.Cni());
      }),
      (this.PWt = (i) => {
        (this.tni = i), this.Og();
      }),
      (this.fni = (i, t) => {
        (this.tni = t), this.Og(), this.pni(i);
      }),
      (this.nHe = (i) => {
        this.eHe && ((this.eHe = !1), this.vni()),
          this.lni &&
            ((this.lni = !1), (this.oni = this.xqe.IsExpand), this.Cni());
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
        [0, this.gpt],
        [5, this.yUt],
        [4, this._ni],
        [2, this.uni],
        [3, this.cni],
        [10, this.mni],
      ]);
  }
  OnBeforeCreate() {
    this.tni = this.OpenParam;
  }
  OnStart() {
    (this.xqe = new GenericScrollView_1.GenericScrollView(
      this.GetScrollViewWithScrollbar(1),
      this.sGe,
    )),
      this.xqe.BindScrollValueChange(this.gni),
      this.xqe.BindLateUpdate(this.nHe);
    var i = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerStand();
    this.SetTextureByPath(i, this.GetTexture(6)),
      (this.sni = this.GetButton(2).RootUIComp),
      (this.ani = this.GetButton(3).RootUIComp),
      this.sni.SetUIActive(!1),
      this.ani.SetUIActive(!1),
      (this.rni = !1),
      (this.nni = !1);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RefreshInfluencePanel,
      this.PWt,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SearchInfluence,
        this.fni,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RefreshInfluencePanel,
      this.PWt,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SearchInfluence,
        this.fni,
      );
  }
  OnAfterShow() {
    this.Og();
  }
  OnBeforeDestroy() {
    this.xqe.ClearChildren(),
      (this.xqe = void 0),
      (this.ani = void 0),
      (this.sni = void 0);
  }
  Og() {
    var i = ConfigManager_1.ConfigManager.InfluenceConfig.GetCountryConfig(
      this.tni,
    );
    (this.hni = i.Influences.filter(
      (i) => i !== InfluenceReputationDefine_1.RAMDOM_INFLUENCE_ID,
    )),
      this.Mni(),
      this.Sni(i.Title),
      this.Eni(),
      this.yni(),
      this.dni(!1);
  }
  pni(i) {
    i = this.hni.indexOf(i);
    this.xqe.GetScrollItemByKey(i).SetToggleState(1, !0);
  }
  Mni() {
    (this.oTt = void 0), this.xqe.RefreshByData(this.hni), (this.lni = !0);
  }
  Sni(i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), i);
  }
  Eni() {
    let i = 0;
    for (const t of this.xqe.GetScrollItemMap().values()) t.IsUnLock() && i++;
    this.GetText(8).SetText(i.toString()),
      this.GetText(9).SetText(this.hni.length.toString());
  }
  yni() {
    var i =
      ModelManager_1.ModelManager.InfluenceReputationModel.HasRedDotExcludeCurrentCountry(
        this.tni,
      );
    this.GetItem(11).SetUIActive(i);
  }
  Cni() {
    var i;
    this.oni && void 0 === this.oTt
      ? void 0 !== this.ini &&
        ((i = this.ini < 1 - PROGRESS_DEVIATION_VALUE),
        this.rni !== i && ((this.rni = i), this.sni.SetUIActive(i)),
        (i = this.ini > PROGRESS_DEVIATION_VALUE),
        this.nni !== i) &&
        ((this.nni = i), this.ani.SetUIActive(i))
      : (this.rni && ((this.rni = !1), this.sni.SetUIActive(!1)),
        this.nni && ((this.nni = !1), this.ani.SetUIActive(!1)));
  }
  dni(i) {
    this.GetButton(10).RootUIComp.SetUIActive(i);
  }
  vni() {
    var i = this.xqe.GetScrollItemMap().size;
    this.oTt === i - 1
      ? this.xqe.ScrollToLeft(this.oTt - 1)
      : this.xqe.ScrollToLeft(this.oTt);
  }
}
exports.InfluenceReputationView = InfluenceReputationView;
//# sourceMappingURL=InfluenceReputationView.js.map
