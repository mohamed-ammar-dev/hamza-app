import AccountService from "../services/accountService";

export class Account {
  private account: Promise<any>;

  constructor(
    private accountNumber: string,
    private totalPrice: number,
    private username: string
  ) {
    this.account = AccountService.getAccountByNumber(this.accountNumber);
    this.processing();
  }

  private async save() {
    await AccountService.saveAccount(
      this.accountNumber,
      this.totalPrice,
      this.username
    );
  }

  private async update() {
    await AccountService.updateAccount(
      this.accountNumber,
      this.totalPrice,
      this.username
    );
  }

  async processing() {
    if ((await this.account).length == 0) return this.save();
    this.update();
  }
}
