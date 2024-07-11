"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CreateCharacterView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  TextInputComponent_1 = require("../../Common/InputView/View/TextInputComponent"),
  LoginDefine_1 = require("../../Login/Data/LoginDefine"),
  LoginController_1 = require("../../Login/LoginController"),
  UiLoginSceneManager_1 = require("../../UiComponent/UiLoginSceneManager"),
  Info_1 = require("../../../../Core/Common/Info");
class CreateCharacterView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.okt = void 0),
      (this.rkt = !1),
      (this.nkt = []),
      (this.skt = []),
      (this.akt = void 0),
      (this.hkt = () => {
        this.lkt(LoginDefine_1.ELoginSex.Boy);
      }),
      (this._kt = () => {
        this.lkt(LoginDefine_1.ELoginSex.Girl);
      }),
      (this.ukt = () => {
        this.akt.SetActive(!1);
      }),
      (this.ckt = () => {
        this.mkt();
      }),
      (this.dkt = async (e) => (
        this.GetItem(3).SetUIActive(!1),
        ModelManager_1.ModelManager.LoginModel.SetPlayerSex(this.okt),
        ModelManager_1.ModelManager.LoginModel.SetPlayerName(e),
        LoginController_1.LoginController.CreateCharacterRequest()
      )),
      (this.Ckt = (e) => {
        e
          ? (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Login", 11, "创角界面请求创角成功"),
            ModelManager_1.ModelManager.LoginModel.CreateLoginPromise(),
            LoginController_1.LoginController.HandleLoginGame(!1, e).then(
              (e) => {
                LoginController_1.LoginController.DisConnect(e),
                  e
                    ? (this.gkt(),
                      this.GetItem(3).SetUIActive(!1),
                      UiLoginSceneManager_1.UiLoginSceneManager.PlayRoleMontage(
                        this.nkt[this.okt],
                        17,
                      ),
                      UiLoginSceneManager_1.UiLoginSceneManager.LoadSequenceAsync(
                        this.fkt(),
                        () => {
                          this.CloseMe();
                        },
                      ))
                    : LoginController_1.LoginController.CreateCharacterViewToLoginView();
              },
            ))
          : (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Login", 11, "创角界面请求创角失败"),
            this.akt.ClearText(),
            this.GetItem(3).SetUIActive(!0));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIButtonComponent],
      [2, UE.UIButtonComponent],
      [3, UE.UIItem],
      [4, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [1, this.hkt],
        [2, this._kt],
      ]);
  }
  lkt(e) {
    var i;
    this.okt !== e &&
      ((i = this.okt),
      (this.okt = e),
      this.GetItem(3).SetUIActive(!1),
      this.GetItem(4).SetUIActive(!1),
      this.rkt
        ? (this.gkt(),
          UiLoginSceneManager_1.UiLoginSceneManager.LoadSequenceAsync(
            this.pkt(),
            () => {
              this.vkt();
            },
          ),
          this.skt[i].RemoveRoleChooseRenderingMaterial())
        : UiLoginSceneManager_1.UiLoginSceneManager.LoadSequenceAsync(
            this.Mkt(),
            () => {
              this.vkt();
            },
          ),
      this.skt[e].SetRoleChooseRenderingMaterial());
  }
  pkt() {
    return this.okt === LoginDefine_1.ELoginSex.Boy
      ? "LevelSequence_SwitchMale"
      : "LevelSequence_SwitchFemale";
  }
  Mkt() {
    return this.okt === LoginDefine_1.ELoginSex.Boy
      ? "LevelSequence_SelectMale"
      : "LevelSequence_SelectFemale";
  }
  vkt() {
    (this.rkt = !0),
      this.GetItem(3)?.SetUIActive(!0),
      this.GetButton(1).RootUIComp.SetUIActive(
        this.okt !== LoginDefine_1.ELoginSex.Boy,
      ),
      this.GetButton(2).RootUIComp.SetUIActive(
        this.okt !== LoginDefine_1.ELoginSex.Girl,
      );
  }
  OnStart() {
    this.UiViewSequence.AddSequenceFinishEvent("hide", this.ukt),
      (this.nkt =
        ConfigManager_1.ConfigManager.CreateCharacterConfig.GetInitialRoles()),
      this.Ekt(),
      this.Skt(),
      this.gkt(!1),
      this.GetItem(3).SetUIActive(!0),
      this.GetItem(4).SetUIActive(!0);
  }
  OnAfterDestroy() {
    ModelManager_1.ModelManager.LoginModel.FinishLoginPromise();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.CreateRoleShowInputName,
      this.ckt,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.CreateRoleShowInputName,
      this.ckt,
    );
  }
  Ekt() {
    var e = {
      ConfirmFunc: this.dkt,
      ResultFunc: this.Ckt,
      InputText: "",
      IsCheckNone: !0,
    };
    this.akt = new TextInputComponent_1.TextInputComponent(this.GetItem(0), e);
  }
  Skt() {
    var e = new GenderButton(
        this.GetButton(2),
        this.nkt[LoginDefine_1.ELoginSex.Girl],
      ),
      e =
        (e.BindFunction(),
        this.skt.push(e),
        new GenderButton(
          this.GetButton(1),
          this.nkt[LoginDefine_1.ELoginSex.Boy],
        ));
    e.BindFunction(), this.skt.push(e);
  }
  OnBeforeDestroy() {
    for (const e of this.skt)
      e.RemoveRoleChooseRenderingMaterial(), e.UnbindFunction();
    this.akt.Destroy();
  }
  mkt() {
    this.UiViewSequence.PlaySequence("show"), this.akt.SetActive(!0);
  }
  gkt(e = !0) {
    e ? this.UiViewSequence.PlaySequence("hide", !0) : this.akt.SetActive(!1);
  }
  fkt() {
    return this.okt === LoginDefine_1.ELoginSex.Boy
      ? "LevelSequence_MaleTurnHead"
      : "LevelSequence_FemaleTurnHead";
  }
}
exports.CreateCharacterView = CreateCharacterView;
class GenderButton {
  constructor(e, i) {
    (this.ykt = void 0),
      (this.Ikt = void 0),
      (this.Tkt = void 0),
      (this.Lkt = void 0),
      (this.e0t = void 0),
      (this.dFe = void 0),
      (this.Dkt = () => {
        this.RemoveRoleRenderingMaterial(),
          (this.ykt =
            UiLoginSceneManager_1.UiLoginSceneManager.SetRoleRenderingMaterial(
              this.dFe,
              "CreateCharacterMaterialController",
            )),
          (this.Ikt =
            UiLoginSceneManager_1.UiLoginSceneManager.SetHuluRenderingMaterial(
              this.dFe,
              "CreateCharacterMaterialController",
            ));
      }),
      (this.RemoveRoleRenderingMaterial = () => {
        void 0 !== this.ykt &&
          (UiLoginSceneManager_1.UiLoginSceneManager.RemoveRoleRenderingMaterialWithEnding(
            this.dFe,
            this.ykt,
          ),
          (this.ykt = void 0)),
          void 0 !== this.Ikt &&
            (UiLoginSceneManager_1.UiLoginSceneManager.RemoveHuluRenderingMaterialWithEnding(
              this.dFe,
              this.Ikt,
            ),
            (this.Ikt = void 0));
      }),
      (this.e0t = e),
      (this.dFe = i);
  }
  BindFunction() {
    Info_1.Info.IsInTouch() ||
      (this.e0t.OnPointEnterCallBack.Bind(this.Dkt),
      this.e0t.OnPointExitCallBack.Bind(this.RemoveRoleRenderingMaterial));
  }
  SetRoleChooseRenderingMaterial() {
    this.RemoveRoleChooseRenderingMaterial(),
      (this.Tkt =
        UiLoginSceneManager_1.UiLoginSceneManager.SetRoleRenderingMaterial(
          this.dFe,
          "ChooseCharacterMaterialController",
        )),
      (this.Lkt =
        UiLoginSceneManager_1.UiLoginSceneManager.SetHuluRenderingMaterial(
          this.dFe,
          "ChooseCharacterMaterialController",
        ));
  }
  RemoveRoleChooseRenderingMaterial() {
    void 0 !== this.Tkt &&
      (UiLoginSceneManager_1.UiLoginSceneManager.RemoveRoleRenderingMaterialWithEnding(
        this.dFe,
        this.Tkt,
      ),
      (this.Tkt = void 0)),
      void 0 !== this.Lkt &&
        (UiLoginSceneManager_1.UiLoginSceneManager.RemoveHuluRenderingMaterialWithEnding(
          this.dFe,
          this.Lkt,
        ),
        (this.Lkt = void 0));
  }
  UnbindFunction() {
    this.e0t.OnPointEnterCallBack.Unbind(),
      this.e0t.OnPointExitCallBack.Unbind();
  }
}
//# sourceMappingURL=CreateCharacterView.js.map
