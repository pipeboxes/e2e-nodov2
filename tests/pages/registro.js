class RegistroPage {
  //Propiedades de la página
  //Serán los elementos que tiene disponibles
  constructor(page) {
    this.page = page;
    this.linkRegister = page.getByRole("link", { name: "Register" });
    this.inputFullName = page.getByRole("textbox", { name: "Full Name" });
    this.InputEmailAddress = page.getByRole("textbox", {
      name: "Email Address",
    });
    this.inputPassword = page.getByLabel("Password", { exact: true });
    this.inputConfirmPassword = page.getByLabel("Confirm Password");
    this.buttonCreateAccount = page.getByRole("button", {
      name: "Create Account",
    });
    this.mensajeError = page.getByText(
      "Password must be at least 6 characters long",
      { exact: true },
    );
  }
  //Acciones de la página, son asíncronas

  irARegistro = async () => {
    await this.page.goto("https://ecommerce-js-test.vercel.app/");
    await this.linkRegister.click();
  };

  llenarFullName = async (fullName) => {
    await this.inputFullName.fill(fullName);
  };

  llenarEmailAdress = async (email) => {
    await this.InputEmailAddress.fill(email);
  };

  llenarPassword = async (password) => {
    await this.inputPassword.fill(password);
  };

  llenarConfirmPassword = async (confirmPassword) => {
    await this.inputConfirmPassword.fill(confirmPassword);
  };

  clicarButtonCreateAccount = async () => {
    await this.buttonCreateAccount.click();
  };

  registrar = async (registrar) => {
    await this.llenarFullName(registrar.fullName);
    await this.llenarEmailAdress(registrar.email);
    await this.llenarPassword(registrar.password);
    await this.llenarConfirmPassword(registrar.confirmPassword);
    await this.clicarButtonCreateAccount();
  };
}

export default RegistroPage;
