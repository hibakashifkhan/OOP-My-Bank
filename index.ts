import inquirer from "inquirer";

// Bank Account Interface
interface IBankAccount {
    AccountNumber: number;
    Balance: number;
    withdraw(amount: number): void;
    deposit(amount: number): void;
    checkBalance(): void;
}

// Bank Account Class
class BankAccount implements IBankAccount {
    AccountNumber: number;
    Balance: number;

    constructor(AccountNumber: number, Balance: number) {
        this.AccountNumber = AccountNumber;
        this.Balance = Balance;
    }

    // Debit money
    withdraw(amount: number): void {
        if (this.Balance >= amount) {
            this.Balance -= amount;
            console.log(`${amount}$ were successfully withdrawn. Remaining Balance: $${this.Balance}`);
        } else {
            console.log("*Insufficient Balance*");
        }
    }

    // Credit money
    deposit(amount: number): void {
        if (amount > 100) {
            amount -= 1; // $1 fee charged if more than 100 dollars are deposited
        }
        this.Balance += amount;
        console.log(`Deposit of $${amount} was successful. Balance: $${this.Balance}`);
    }

    // Check Balance
    checkBalance(): void {
        console.log(`Balance: $${this.Balance}`);
    }
}

// Customer Class
class Customer {
    firstName: string;
    lastName: string;
    Gender: string;
    Age: number;
    MobileNo: number;
    account: BankAccount;

    constructor(firstName: string, lastName: string, Gender: string, Age: number, MobileNo: number, account: BankAccount) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.Gender = Gender;
        this.Age = Age;
        this.MobileNo = MobileNo;
        this.account = account;
    }
}

// Create bank accounts
const Accounts: BankAccount[] = [
    new BankAccount(1001, 500),
    new BankAccount(1002, 1000),
    new BankAccount(1003, 5000)
];

// Create customers
const customers: Customer[] = [
    new Customer("Isbah", "Khan", "Female", 25, 3125674534, Accounts[0]),
    new Customer("Zaid", "Khan", "Male", 18, 3125094534, Accounts[1]),
    new Customer("Hiba", "Khan", "Female", 21, 317974534, Accounts[2])
];

// Function to interact with bank account
async function Service() {
    do {
        const accountNumInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "Enter your Account Number."
        });

        const customer = customers.find(customer => customer.account.AccountNumber === accountNumInput.accountNumber);

        if (customer) {
            console.log(`Welcome, ${customer.firstName} ${customer.lastName}`);
            const ans = await inquirer.prompt([{
                name: "select",
                type: "list",
                message: "Please Select an Operation",
                choices: ["Deposit", "Withdraw", "Check Balance", "Exit"]
            }]);

            switch (ans.select) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "How much amount would you like to deposit?"
                    });
                    customer.account.deposit(depositAmount.amount);
                    break;
                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "How much amount would you like to withdraw?"
                    });
                    customer.account.withdraw(withdrawAmount.amount);
                    break;
                case "Check Balance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log("Thank you for banking with us.");
                    console.log("Exiting...");
                    return;
            }

        } else {
            console.log("*Invalid Account Number*");
        }
    } while (true);
}

Service();
