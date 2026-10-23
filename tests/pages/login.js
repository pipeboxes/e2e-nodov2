class LoginPage {
  //Propiedades: los elementos de la página
  constructor(page) {
    this.page = page;
    this.linkLogin = page.getByRole("link", { name: "Login" });
    this.inputEmail = page.getByRole("textbox", { name: "Email Address" });
    this.inputPassword = page.getByLabel("Password", { exact: true });
    this.buttonSignIn = page.getByRole("button", { name: "Sign In" });
    this.linkLogout = page.getByText("Logout", { exact: true });
  }

  //Acciones de la página
  irALogin = async () => {
    await this.page.goto("https://ecommerce-js-test.vercel.app/");
    await this.linkLogin.click();
  };

  llenarEmail = async (email) => {
    await this.inputEmail.fill(email);
  };

  llenarPassword = async (password) => {
    await this.inputPassword.fill(password);
  };

  clicarButtonSignIn = async () => {
    await this.buttonSignIn.click();
  };

  login = async (datos) => {
    await this.llenarEmail(datos.email);
    await this.llenarPassword(datos.password);
    await this.clicarButtonSignIn();
  };
}

export default LoginPage;
