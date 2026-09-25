// ==================================================
// SMART ATM & BANKING SYSTEM
// COMPLETE SCRIPT.JS
// ==================================================


// ==================================================
// FIXED DEMO ACCOUNT
// ==================================================

const DEMO_ACCOUNT = "10000000000001";
const DEMO_PIN = "1234";
const DEMO_NAME = "Demo User";

// Fixed starting balance
const FIXED_BALANCE = 25000;


// ==================================================
// CURRENT ACCOUNT VARIABLES
// ==================================================

let accountNumber = "";
let balance = FIXED_BALANCE;


// ==================================================
// LOGIN
// ==================================================

function login() {

    let enteredAccount =
        document.getElementById("accountNumber").value.trim();

    let enteredPin =
        document.getElementById("pin").value.trim();

    let message =
        document.getElementById("message");


    // Check account number
    if (!/^[0-9]{14}$/.test(enteredAccount)) {

        message.innerText =
            "Account number must contain exactly 14 digits.";

        return;
    }


    // ==================================================
    // PERMANENT DEMO ACCOUNT
    // ==================================================

    if (
        enteredAccount === DEMO_ACCOUNT &&
        enteredPin === DEMO_PIN
    ) {

        localStorage.setItem(
            "loggedInAccount",
            DEMO_ACCOUNT
        );

        localStorage.setItem(
            "loggedInName",
            DEMO_NAME
        );

        window.location.href =
            "dashboard.html";

        return;
    }


    // ==================================================
    // USER CREATED ACCOUNT
    // ==================================================

    let savedAccount =
        localStorage.getItem("accountNumber");

    let savedPin =
        localStorage.getItem("accountPin");


    if (
        enteredAccount === savedAccount &&
        enteredPin === savedPin
    ) {

        localStorage.setItem(
            "loggedInAccount",
            savedAccount
        );

        localStorage.setItem(
            "loggedInName",
            localStorage.getItem("accountName") ||
            "Account Holder"
        );

        window.location.href =
            "dashboard.html";

        return;
    }


    // ==================================================
    // INVALID LOGIN
    // ==================================================

    message.innerText =
        "Invalid account number or PIN.";
}


// ==================================================
// LOGOUT
// ==================================================

function logout() {

    localStorage.removeItem(
        "loggedInAccount"
    );

    localStorage.removeItem(
        "loggedInName"
    );
}


// ==================================================
// LOAD ACCOUNT WHEN DASHBOARD OPENS
// ==================================================

function loadDashboardAccount() {

    let loggedInAccount =
        localStorage.getItem(
            "loggedInAccount"
        );


    // If not logged in
    if (!loggedInAccount) {

        window.location.href =
            "login.html";

        return false;
    }


    accountNumber =
        loggedInAccount;


    // ==================================================
    // IMPORTANT:
    // EVERY NEW DASHBOARD OPEN STARTS AT ₹25,000
    // ==================================================

    balance =
        FIXED_BALANCE;


    return true;
}


// ==================================================
// FORMAT MONEY
// ==================================================

function formatMoney(amount) {

    return "₹" +
        Number(amount).toLocaleString("en-IN");
}


// ==================================================
// UPDATE BALANCE EVERYWHERE
// ==================================================

function updateBalance() {

    let formattedBalance =
        formatMoney(balance);


    let mainBalance =
        document.getElementById("balance");


    let depositBalance =
        document.getElementById("depositBalance");


    let withdrawBalance =
        document.getElementById("withdrawBalance");


    let transferBalance =
        document.getElementById("transferBalance");


    if (mainBalance) {

        mainBalance.innerText =
            formattedBalance;
    }


    if (depositBalance) {

        depositBalance.innerText =
            formattedBalance;
    }


    if (withdrawBalance) {

        withdrawBalance.innerText =
            formattedBalance;
    }


    if (transferBalance) {

        transferBalance.innerText =
            formattedBalance;
    }
}


// ==================================================
// RESET TRANSACTION HISTORY
// ==================================================

function resetTransactionHistory() {

    let transactionList =
        document.getElementById(
            "transactions"
        );


    if (!transactionList) {

        return;
    }


    transactionList.innerHTML = "";


    let firstTransaction =
        document.createElement("li");


    firstTransaction.innerHTML = `

        <strong>
            Account created — ${formatMoney(FIXED_BALANCE)}
        </strong>

        <br>

        <small>
            Starting Balance
        </small>

    `;


    transactionList.appendChild(
        firstTransaction
    );
}


// ==================================================
// ADD TRANSACTION
// ==================================================

function addTransaction(
    type,
    amount,
    extraText = ""
) {

    let transactionList =
        document.getElementById(
            "transactions"
        );


    if (!transactionList) {

        return;
    }


    let item =
        document.createElement("li");


    let text = "";


    // Deposit
    if (type === "Deposit") {

        text =
            "Deposited + " +
            formatMoney(amount);
    }


    // Withdrawal
    else if (type === "Withdrawal") {

        text =
            "Withdrawn - " +
            formatMoney(amount);
    }


    // Transfer
    else if (type === "Transfer") {

        text =
            "Transferred - " +
            formatMoney(amount);


        if (extraText !== "") {

            text +=
                " to account " +
                extraText;
        }
    }


    item.innerHTML = `

        <strong>
            ${text}
        </strong>

        <br>

        <small>
            ${new Date().toLocaleDateString("en-IN")}
            -
            ${new Date().toLocaleTimeString("en-IN")}
        </small>

    `;


    // Newest transaction at the top
    transactionList.insertBefore(
        item,
        transactionList.firstChild
    );
}


// ==================================================
// HIDE ALL SCREENS
// ==================================================

function hideAllScreens() {

    let screens = [

        "homeScreen",
        "depositScreen",
        "withdrawScreen",
        "transferScreen",
        "transactionScreen"

    ];


    screens.forEach(
        function(screenID) {

            let screen =
                document.getElementById(
                    screenID
                );


            if (screen) {

                screen.style.display =
                    "none";
            }

        }
    );
}


// ==================================================
// SHOW HOME
// ==================================================

function showHome() {

    hideAllScreens();


    let screen =
        document.getElementById(
            "homeScreen"
        );


    if (screen) {

        screen.style.display =
            "block";
    }


    updateBalance();
}


// ==================================================
// SHOW DEPOSIT
// ==================================================

function showDeposit() {

    hideAllScreens();


    let screen =
        document.getElementById(
            "depositScreen"
        );


    if (screen) {

        screen.style.display =
            "block";
    }


    updateBalance();
}


// ==================================================
// SHOW WITHDRAW
// ==================================================

function showWithdraw() {

    hideAllScreens();


    let screen =
        document.getElementById(
            "withdrawScreen"
        );


    if (screen) {

        screen.style.display =
            "block";
    }


    updateBalance();
}


// ==================================================
// SHOW TRANSFER
// ==================================================

function showTransfer() {

    hideAllScreens();


    let screen =
        document.getElementById(
            "transferScreen"
        );


    if (screen) {

        screen.style.display =
            "block";
    }


    updateBalance();
}


// ==================================================
// SHOW TRANSACTIONS
// ==================================================

function showTransactions() {

    hideAllScreens();


    let screen =
        document.getElementById(
            "transactionScreen"
        );


    if (screen) {

        screen.style.display =
            "block";
    }


    updateBalance();
}


// ==================================================
// DEPOSIT MONEY
// ==================================================

function depositMoney() {

    let amount =
        Number(
            document.getElementById(
                "depositAmount"
            ).value
        );


    let message =
        document.getElementById(
            "depositMessage"
        );


    if (
        amount <= 0 ||
        isNaN(amount)
    ) {

        message.innerText =
            "Please enter a valid amount.";

        return;
    }


    let previousBalance =
        balance;


    // Add money
    balance =
        balance + amount;


    // Update dashboard
    updateBalance();


    // Add transaction
    addTransaction(
        "Deposit",
        amount
    );


    message.innerText =
        formatMoney(amount) +
        " deposited successfully.";


    // Clear input
    document.getElementById(
        "depositAmount"
    ).value = "";


    // Generate receipt
    generateReceipt(
        "Deposit",
        amount,
        previousBalance,
        balance
    );
}


// ==================================================
// WITHDRAW MONEY
// ==================================================

function withdrawMoney() {

    let amount =
        Number(
            document.getElementById(
                "withdrawAmount"
            ).value
        );


    let message =
        document.getElementById(
            "withdrawMessage"
        );


    if (
        amount <= 0 ||
        isNaN(amount)
    ) {

        message.innerText =
            "Please enter a valid amount.";

        return;
    }


    if (amount > balance) {

        message.innerText =
            "Insufficient balance.";

        return;
    }


    let previousBalance =
        balance;


    // Subtract money
    balance =
        balance - amount;


    // Update dashboard
    updateBalance();


    // Add transaction
    addTransaction(
        "Withdrawal",
        amount
    );


    message.innerText =
        formatMoney(amount) +
        " withdrawn successfully.";


    // Clear input
    document.getElementById(
        "withdrawAmount"
    ).value = "";


    // Generate receipt
    generateReceipt(
        "Withdrawal",
        amount,
        previousBalance,
        balance
    );
}


// ==================================================
// TRANSFER MONEY
// ==================================================

function transferMoney() {

    let recipient =
        document.getElementById(
            "recipientAccount"
        ).value.trim();


    let amount =
        Number(
            document.getElementById(
                "transferAmount"
            ).value
        );


    let message =
        document.getElementById(
            "transferMessage"
        );


    // Check recipient account
    if (
        !/^[0-9]{14}$/.test(
            recipient
        )
    ) {

        message.innerText =
            "Recipient account number must contain exactly 14 digits.";

        return;
    }


    // Cannot transfer to own account
    if (
        recipient === accountNumber
    ) {

        message.innerText =
            "You cannot transfer money to your own account.";

        return;
    }


    // Check amount
    if (
        amount <= 0 ||
        isNaN(amount)
    ) {

        message.innerText =
            "Please enter a valid amount.";

        return;
    }


    // Check balance
    if (amount > balance) {

        message.innerText =
            "Insufficient balance.";

        return;
    }


    let previousBalance =
        balance;


    // Subtract transfer amount
    balance =
        balance - amount;


    // Update balance
    updateBalance();


    // Add transaction
    addTransaction(
        "Transfer",
        amount,
        recipient
    );


    message.innerText =
        formatMoney(amount) +
        " transferred successfully.";


    // Clear inputs
    document.getElementById(
        "recipientAccount"
    ).value = "";


    document.getElementById(
        "transferAmount"
    ).value = "";


    // Generate receipt
    generateReceipt(
        "Transfer",
        amount,
        previousBalance,
        balance,
        recipient
    );
}


// ==================================================
// GENERATE RECEIPT
// ==================================================

function generateReceipt(
    type,
    amount,
    previousBalance,
    newBalance,
    recipient = ""
) {

    let receiptSection =
        document.getElementById(
            "receiptSection"
        );


    let receiptContent =
        document.getElementById(
            "receiptContent"
        );


    if (
        !receiptSection ||
        !receiptContent
    ) {

        return;
    }


    let now =
        new Date();


    let date =
        now.toLocaleDateString(
            "en-IN"
        );


    let time =
        now.toLocaleTimeString(
            "en-IN"
        );


    receiptContent.innerHTML = `

        <div class="receipt">

            <h2>
                🏦 Smart ATM & Banking
            </h2>

            <p class="receipt-title">
                TRANSACTION RECEIPT
            </p>

            <hr>


            <p>
                <strong>
                    Transaction:
                </strong>

                ${type}
            </p>


            <p>
                <strong>
                    Account Number:
                </strong>

                ${accountNumber}
            </p>


            ${
                recipient !== ""
                ?
                `
                <p>
                    <strong>
                        Recipient:
                    </strong>

                    ${recipient}
                </p>
                `
                :
                ""
            }


            <p>
                <strong>
                    Amount:
                </strong>

                ${formatMoney(amount)}
            </p>


            <p>
                <strong>
                    Previous Balance:
                </strong>

                ${formatMoney(previousBalance)}
            </p>


            <p>
                <strong>
                    New Balance:
                </strong>

                ${formatMoney(newBalance)}
            </p>


            <p>
                <strong>
                    Date:
                </strong>

                ${date}
            </p>


            <p>
                <strong>
                    Time:
                </strong>

                ${time}
            </p>


            <hr>


            <h3>
                Transaction Successful
            </h3>


            <p class="demo-note">
                This is a demo transaction
                for a college project.
            </p>

        </div>

    `;


    receiptSection.style.display =
        "block";
}


// ==================================================
// PRINT RECEIPT
// ==================================================

function printReceipt() {

    let receiptContent =
        document.getElementById(
            "receiptContent"
        );


    if (!receiptContent) {

        return;
    }


    let receipt =
        receiptContent.innerHTML;


    let printWindow =
        window.open(
            "",
            "",
            "width=700,height=800"
        );


    if (!printWindow) {

        alert(
            "Please allow pop-ups to print the receipt."
        );

        return;
    }


    printWindow.document.write(`

        <html>

        <head>

            <title>
                Smart ATM Receipt
            </title>


            <style>

                body {
                    font-family: Arial, sans-serif;
                    padding: 40px;
                    color: #14213d;
                }

                .receipt {
                    max-width: 500px;
                    margin: auto;
                    padding: 30px;
                    border: 1px solid #ddd;
                }

                h2 {
                    text-align: center;
                }

                .receipt-title {
                    text-align: center;
                    font-weight: bold;
                }

                hr {
                    border: none;
                    border-top: 1px solid #ddd;
                    margin: 20px 0;
                }

                .demo-note {
                    text-align: center;
                    font-size: 12px;
                    color: #777;
                    margin-top: 25px;
                }

            </style>

        </head>


        <body>

            ${receipt}

        </body>

        </html>

    `);


    printWindow.document.close();

    printWindow.focus();

    printWindow.print();
}


// ==================================================
// CREATE ACCOUNT
// ==================================================

function createAccount() {

    let accountNumberInput =
        document.getElementById(
            "newAccountNumber"
        );


    let name =
        document.getElementById(
            "fullName"
        ).value.trim();


    let mobile =
        document.getElementById(
            "mobile"
        ).value.trim();


    let email =
        document.getElementById(
            "email"
        ).value.trim();


    let accountType =
        document.getElementById(
            "accountType"
        ).value;


    let initialDeposit =
        Number(
            document.getElementById(
                "initialDeposit"
            ).value
        );


    let pin =
        document.getElementById(
            "newPin"
        ).value;


    let confirmPin =
        document.getElementById(
            "confirmPin"
        ).value;


    let message =
        document.getElementById(
            "createMessage"
        );


    // Account number field
    if (!accountNumberInput) {

        message.innerText =
            "Account number field is missing.";

        return;
    }


    let newAccountNumber =
        accountNumberInput.value.trim();


    // 14-digit account number
    if (
        !/^[0-9]{14}$/.test(
            newAccountNumber
        )
    ) {

        message.innerText =
            "Account number must contain exactly 14 digits.";

        return;
    }


    // Don't allow demo account number
    if (
        newAccountNumber ===
        DEMO_ACCOUNT
    ) {

        message.innerText =
            "This account number is reserved for the demo account. Please use another 14-digit number.";

        return;
    }


    // Name
    if (name === "") {

        message.innerText =
            "Please enter your full name.";

        return;
    }


    // Mobile
    if (
        !/^[0-9]{10}$/.test(
            mobile
        )
    ) {

        message.innerText =
            "Please enter a valid 10-digit mobile number.";

        return;
    }


    // Email
    if (email === "") {

        message.innerText =
            "Please enter your email address.";

        return;
    }


    // Initial deposit
    if (
        initialDeposit < 0 ||
        isNaN(initialDeposit)
    ) {

        message.innerText =
            "Please enter a valid initial deposit.";

        return;
    }


    // PIN
    if (
        !/^[0-9]{4}$/.test(
            pin
        )
    ) {

        message.innerText =
            "PIN must contain exactly 4 digits.";

        return;
    }


    // Confirm PIN
    if (
        pin !== confirmPin
    ) {

        message.innerText =
            "PINs do not match.";

        return;
    }


    // ==================================================
    // SAVE ACCOUNT DETAILS
    // ==================================================

    localStorage.setItem(
        "accountNumber",
        newAccountNumber
    );


    localStorage.setItem(
        "accountName",
        name
    );


    localStorage.setItem(
        "accountMobile",
        mobile
    );


    localStorage.setItem(
        "accountEmail",
        email
    );


    localStorage.setItem(
        "accountType",
        accountType
    );


    localStorage.setItem(
        "accountPin",
        pin
    );


    // We don't save the balance.
    // Dashboard always starts at ₹25,000.


    // Remove previous login
    localStorage.removeItem(
        "loggedInAccount"
    );


    localStorage.removeItem(
        "loggedInName"
    );


    // ==================================================
    // SUCCESS MESSAGE
    // ==================================================

    message.innerHTML = `

        <strong>
            Account created successfully! 🎉
        </strong>

        <br><br>

        Your 14-digit account number has been saved.

        <br><br>

        <strong>
            Account Number:
        </strong>

        ${newAccountNumber}

        <br>

        <strong>
            PIN:
        </strong>

        ${pin}

        <br><br>

        <a href="login.html">
            Go to Login
        </a>

    `;
}


// ==================================================
// PAGE LOAD
// ==================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {


        // ==================================================
        // CHECK IF DASHBOARD
        // ==================================================

        let homeScreen =
            document.getElementById(
                "homeScreen"
            );


        if (homeScreen) {


            // Load logged-in account
            let accountLoaded =
                loadDashboardAccount();


            if (!accountLoaded) {

                return;
            }


            // ==================================================
            // RESET BALANCE TO ₹25,000
            // ==================================================

            balance =
                FIXED_BALANCE;


            // Update balance
            updateBalance();


            // ==================================================
            // RESET TRANSACTION HISTORY
            // ==================================================

            resetTransactionHistory();

        }

    }
);
