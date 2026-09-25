// ================================================
// SMART ATM & BANKING SYSTEM
// Complete JavaScript
// ================================================


// ================================================
// PERMANENT DEMO ACCOUNT
// ================================================

const DEMO_ACCOUNT = "10000000000001";
const DEMO_PIN = "1234";
const DEMO_NAME = "Demo User";


// ================================================
// CURRENT ACCOUNT
// ================================================

let accountNumber =
    localStorage.getItem("accountNumber") || "";

let balance =
    Number(localStorage.getItem("accountBalance")) || 0;


// ================================================
// LOGIN
// ================================================

function login() {

    let enteredAccount =
        document.getElementById("accountNumber").value.trim();

    let enteredPin =
        document.getElementById("pin").value.trim();

    let message =
        document.getElementById("message");


    // Check permanent demo account
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

        localStorage.setItem(
            "loggedInBalance",
            "25000"
        );

        window.location.href = "dashboard.html";

        return;
    }


    // Check created account
    let savedAccount =
        localStorage.getItem("accountNumber");

    let savedPin =
        localStorage.getItem("accountPin");


    if (
        savedAccount &&
        savedPin &&
        enteredAccount === savedAccount &&
        enteredPin === savedPin
    ) {

        localStorage.setItem(
            "loggedInAccount",
            savedAccount
        );

        localStorage.setItem(
            "loggedInName",
            localStorage.getItem("accountName") || "Account Holder"
        );

        localStorage.setItem(
            "loggedInBalance",
            localStorage.getItem("accountBalance") || "0"
        );

        window.location.href = "dashboard.html";

        return;
    }


    // Invalid login
    message.innerText =
        "Invalid account number or PIN.";
}


// ================================================
// LOAD CURRENT LOGGED-IN ACCOUNT
// ================================================

function loadAccount() {

    let loggedInAccount =
        localStorage.getItem("loggedInAccount");

    let loggedInBalance =
        localStorage.getItem("loggedInBalance");


    if (loggedInAccount) {

        accountNumber = loggedInAccount;
    }


    if (loggedInBalance !== null) {

        balance =
            Number(loggedInBalance);
    }


    // Demo account
    if (accountNumber === DEMO_ACCOUNT) {

        balance = Number(
            localStorage.getItem("demoBalance") || "25000"
        );
    }
}


// ================================================
// SAVE CURRENT BALANCE
// ================================================

function saveBalance() {

    localStorage.setItem(
        "loggedInBalance",
        balance
    );


    if (accountNumber === DEMO_ACCOUNT) {

        localStorage.setItem(
            "demoBalance",
            balance
        );

    } else {

        localStorage.setItem(
            "accountBalance",
            balance
        );
    }
}


// ================================================
// UPDATE BALANCE DISPLAY
// ================================================

function updateBalance() {

    let balanceText =
        "₹" + balance.toLocaleString("en-IN");


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
            balanceText;
    }


    if (depositBalance) {

        depositBalance.innerText =
            balanceText;
    }


    if (withdrawBalance) {

        withdrawBalance.innerText =
            balanceText;
    }


    if (transferBalance) {

        transferBalance.innerText =
            balanceText;
    }
}


// ================================================
// HIDE ALL SCREENS
// ================================================

function hideAllScreens() {

    let home =
        document.getElementById("homeScreen");

    let deposit =
        document.getElementById("depositScreen");

    let withdraw =
        document.getElementById("withdrawScreen");

    let transfer =
        document.getElementById("transferScreen");

    let transactions =
        document.getElementById("transactionScreen");


    if (home) {
        home.style.display = "none";
    }

    if (deposit) {
        deposit.style.display = "none";
    }

    if (withdraw) {
        withdraw.style.display = "none";
    }

    if (transfer) {
        transfer.style.display = "none";
    }

    if (transactions) {
        transactions.style.display = "none";
    }
}


// ================================================
// HOME
// ================================================

function showHome() {

    hideAllScreens();

    let home =
        document.getElementById("homeScreen");

    if (home) {

        home.style.display = "block";
    }

    updateBalance();
}


// ================================================
// DEPOSIT SCREEN
// ================================================

function showDeposit() {

    hideAllScreens();

    let screen =
        document.getElementById("depositScreen");

    if (screen) {

        screen.style.display = "block";
    }

    updateBalance();
}


// ================================================
// DEPOSIT MONEY
// ================================================

function depositMoney() {

    let amount =
        Number(
            document.getElementById("depositAmount").value
        );

    let message =
        document.getElementById("depositMessage");


    if (amount <= 0 || isNaN(amount)) {

        message.innerText =
            "Please enter a valid amount.";

        return;
    }


    let previousBalance =
        balance;


    balance =
        balance + amount;


    saveBalance();

    updateBalance();


    addTransaction(
        "Deposited ₹" +
        amount.toLocaleString("en-IN")
    );


    message.innerText =
        "₹" +
        amount.toLocaleString("en-IN") +
        " deposited successfully.";


    document.getElementById(
        "depositAmount"
    ).value = "";


    generateReceipt(
        "Deposit",
        amount,
        previousBalance,
        balance
    );
}


// ================================================
// WITHDRAW SCREEN
// ================================================

function showWithdraw() {

    hideAllScreens();

    let screen =
        document.getElementById("withdrawScreen");

    if (screen) {

        screen.style.display = "block";
    }

    updateBalance();
}


// ================================================
// WITHDRAW MONEY
// ================================================

function withdrawMoney() {

    let amount =
        Number(
            document.getElementById("withdrawAmount").value
        );

    let message =
        document.getElementById("withdrawMessage");


    if (amount <= 0 || isNaN(amount)) {

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


    balance =
        balance - amount;


    saveBalance();

    updateBalance();


    addTransaction(
        "Withdrawn ₹" +
        amount.toLocaleString("en-IN")
    );


    message.innerText =
        "₹" +
        amount.toLocaleString("en-IN") +
        " withdrawn successfully.";


    document.getElementById(
        "withdrawAmount"
    ).value = "";


    generateReceipt(
        "Withdrawal",
        amount,
        previousBalance,
        balance
    );
}


// ================================================
// TRANSFER SCREEN
// ================================================

function showTransfer() {

    hideAllScreens();

    let screen =
        document.getElementById("transferScreen");

    if (screen) {

        screen.style.display = "block";
    }

    updateBalance();
}


// ================================================
// TRANSFER MONEY
// ================================================

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


    if (!/^[0-9]{14}$/.test(recipient)) {

        message.innerText =
            "Recipient account number must contain exactly 14 digits.";

        return;
    }


    if (recipient === accountNumber) {

        message.innerText =
            "You cannot transfer money to your own account.";

        return;
    }


    if (amount <= 0 || isNaN(amount)) {

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


    balance =
        balance - amount;


    saveBalance();

    updateBalance();


    addTransaction(
        "Transferred ₹" +
        amount.toLocaleString("en-IN") +
        " to account " +
        recipient
    );


    message.innerText =
        "₹" +
        amount.toLocaleString("en-IN") +
        " transferred successfully.";


    document.getElementById(
        "recipientAccount"
    ).value = "";


    document.getElementById(
        "transferAmount"
    ).value = "";


    generateReceipt(
        "Transfer",
        amount,
        previousBalance,
        balance,
        recipient
    );
}


// ================================================
// TRANSACTION HISTORY
// ================================================

function showTransactions() {

    hideAllScreens();

    let screen =
        document.getElementById(
            "transactionScreen"
        );

    if (screen) {

        screen.style.display = "block";
    }
}


// ================================================
// ADD TRANSACTION
// ================================================

function addTransaction(text) {

    let transactions =
        document.getElementById(
            "transactions"
        );


    if (!transactions) {
        return;
    }


    let item =
        document.createElement("li");


    item.innerText =
        text;


    transactions.appendChild(item);
}


// ================================================
// GENERATE RECEIPT
// ================================================

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


    if (!receiptSection || !receiptContent) {
        return;
    }


    let now =
        new Date();


    let date =
        now.toLocaleDateString("en-IN");


    let time =
        now.toLocaleTimeString("en-IN");


    let receiptHTML = `

        <div class="receipt">

            <h2>🏦 Smart ATM & Banking</h2>

            <p class="receipt-title">
                TRANSACTION RECEIPT
            </p>

            <hr>

            <p>
                <strong>Transaction:</strong>
                ${type}
            </p>

            <p>
                <strong>Account Number:</strong>
                ${accountNumber}
            </p>

            ${
                recipient !== ""
                ?
                `
                <p>
                    <strong>Recipient:</strong>
                    ${recipient}
                </p>
                `
                :
                ""
            }

            <p>
                <strong>Amount:</strong>
                ₹${amount.toLocaleString("en-IN")}
            </p>

            <p>
                <strong>Previous Balance:</strong>
                ₹${previousBalance.toLocaleString("en-IN")}
            </p>

            <p>
                <strong>New Balance:</strong>
                ₹${newBalance.toLocaleString("en-IN")}
            </p>

            <p>
                <strong>Date:</strong>
                ${date}
            </p>

            <p>
                <strong>Time:</strong>
                ${time}
            </p>

            <hr>

            <h3>Transaction Successful</h3>

            <p class="demo-note">
                This is a demo transaction for a
                college project.
            </p>

        </div>
    `;


    receiptContent.innerHTML =
        receiptHTML;


    receiptSection.style.display =
        "block";
}


// ================================================
// PRINT / SAVE RECEIPT
// ================================================

function printReceipt() {

    let receiptElement =
        document.getElementById(
            "receiptContent"
        );


    if (!receiptElement) {
        return;
    }


    let receipt =
        receiptElement.innerHTML;


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

            <title>Smart ATM Receipt</title>

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


// ================================================
// CREATE ACCOUNT
// ================================================

function createAccount() {

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


    let newAccountNumberElement =
        document.getElementById(
            "newAccountNumber"
        );


    let message =
        document.getElementById(
            "createMessage"
        );


    // ============================================
    // VALIDATION
    // ============================================


    if (!newAccountNumberElement) {

        message.innerText =
            "Account number field is missing.";

        return;
    }


    let newAccountNumber =
        newAccountNumberElement.value.trim();


    // Account number
    if (!/^[0-9]{14}$/.test(newAccountNumber)) {

        message.innerText =
            "Account number must contain exactly 14 digits.";

        return;
    }


    // Prevent using permanent demo account
    if (newAccountNumber === DEMO_ACCOUNT) {

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
    if (!/^[0-9]{10}$/.test(mobile)) {

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
    if (!/^[0-9]{4}$/.test(pin)) {

        message.innerText =
            "PIN must contain exactly 4 digits.";

        return;
    }


    // Confirm PIN
    if (pin !== confirmPin) {

        message.innerText =
            "PINs do not match.";

        return;
    }


    // ============================================
    // SAVE ACCOUNT
    // ============================================

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


    localStorage.setItem(
        "accountBalance",
        initialDeposit
    );


    // Set current account
    accountNumber =
        newAccountNumber;


    balance =
        initialDeposit;


    // ============================================
    // SUCCESS MESSAGE
    // ============================================

    message.innerHTML = `

        <strong>
            Account created successfully! 🎉
        </strong>

        <br><br>

        <strong>
            Your Account Number:
        </strong>

        <br>

        <span
            style="
                font-size:22px;
                color:#1769aa;
                font-weight:bold;
            "
        >
            ${newAccountNumber}
        </span>

        <br><br>

        Please remember your account number and PIN.

        <br><br>

        <a href="login.html">
            Go to Login
        </a>

    `;


    // Don't generate another account number
}


// ================================================
// INITIALIZE DASHBOARD
// ================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadAccount();

        updateBalance();

    }
);
