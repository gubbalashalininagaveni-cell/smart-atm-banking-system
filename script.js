// ================================
// LOGIN
// ================================

function login() {

    let enteredAccount =
        document.getElementById("accountNumber").value.trim();

    let enteredPin =
        document.getElementById("pin").value.trim();

    let savedAccount =
        localStorage.getItem("accountNumber");

    let savedPin =
        localStorage.getItem("accountPin");


    // Check if an account has been created
    if (!savedAccount || !savedPin) {

        document.getElementById("message").innerText =
            "No account found. Please create an account first.";

        return;
    }


    // Check account number and PIN
    if (
        enteredAccount === savedAccount &&
        enteredPin === savedPin
    ) {

        window.location.href = "dashboard.html";

    } else {

        document.getElementById("message").innerText =
            "Invalid account number or PIN.";
    }
}
// ================================
// BANK DETAILS
// ================================

let balance = 25000;

let accountNumber =
    localStorage.getItem("accountNumber") || "10001234567890";


// ================================
// UPDATE BALANCE
// ================================

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
        mainBalance.innerText = balanceText;
    }

    if (depositBalance) {
        depositBalance.innerText = balanceText;
    }

    if (withdrawBalance) {
        withdrawBalance.innerText = balanceText;
    }

    if (transferBalance) {
        transferBalance.innerText = balanceText;
    }
}


// ================================
// HIDE ALL SCREENS
// ================================

function hideAllScreens() {

    document.getElementById("homeScreen").style.display = "none";

    document.getElementById("depositScreen").style.display = "none";

    document.getElementById("withdrawScreen").style.display = "none";

    document.getElementById("transferScreen").style.display = "none";

    document.getElementById("transactionScreen").style.display = "none";
}


// ================================
// HOME
// ================================

function showHome() {

    hideAllScreens();

    document.getElementById("homeScreen").style.display = "block";

    updateBalance();
}


// ================================
// DEPOSIT SCREEN
// ================================

function showDeposit() {

    hideAllScreens();

    document.getElementById("depositScreen").style.display = "block";

    updateBalance();
}


// ================================
// DEPOSIT MONEY
// ================================

function depositMoney() {

    let amount =
        Number(document.getElementById("depositAmount").value);

    let message =
        document.getElementById("depositMessage");


    if (amount <= 0 || isNaN(amount)) {

        message.innerText =
            "Please enter a valid amount.";

        return;
    }


    let previousBalance = balance;

    balance = balance + amount;

    updateBalance();


    addTransaction(
        "Deposited ₹" +
        amount.toLocaleString("en-IN")
    );


    message.innerText =
        "₹" +
        amount.toLocaleString("en-IN") +
        " deposited successfully.";

    document.getElementById("depositAmount").value = "";


    // Generate receipt
    generateReceipt(
        "Deposit",
        amount,
        previousBalance,
        balance
    );
}


// ================================
// WITHDRAW SCREEN
// ================================

function showWithdraw() {

    hideAllScreens();

    document.getElementById("withdrawScreen").style.display = "block";

    updateBalance();
}


// ================================
// WITHDRAW MONEY
// ================================

function withdrawMoney() {

    let amount =
        Number(document.getElementById("withdrawAmount").value);

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


    let previousBalance = balance;

    balance = balance - amount;

    updateBalance();


    addTransaction(
        "Withdrawn ₹" +
        amount.toLocaleString("en-IN")
    );


    message.innerText =
        "₹" +
        amount.toLocaleString("en-IN") +
        " withdrawn successfully.";

    document.getElementById("withdrawAmount").value = "";


    // Generate receipt
    generateReceipt(
        "Withdrawal",
        amount,
        previousBalance,
        balance
    );
}


// ================================
// TRANSFER SCREEN
// ================================

function showTransfer() {

    hideAllScreens();

    document.getElementById("transferScreen").style.display = "block";

    updateBalance();
}


// ================================
// TRANSFER MONEY
// ================================

function transferMoney() {

    let recipient =
        document.getElementById("recipientAccount").value;

    let amount =
        Number(document.getElementById("transferAmount").value);

    let message =
        document.getElementById("transferMessage");


    if (recipient === "") {

        message.innerText =
            "Please enter recipient account number.";

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


    let previousBalance = balance;

    balance = balance - amount;

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

    document.getElementById("recipientAccount").value = "";

    document.getElementById("transferAmount").value = "";


    // Generate receipt
    generateReceipt(
        "Transfer",
        amount,
        previousBalance,
        balance,
        recipient
    );
}


// ================================
// TRANSACTION HISTORY
// ================================

function showTransactions() {

    hideAllScreens();

    document.getElementById("transactionScreen").style.display = "block";
}


// ================================
// ADD TRANSACTION
// ================================

function addTransaction(text) {

    let transactions =
        document.getElementById("transactions");

    let item =
        document.createElement("li");

    item.innerText = text;

    transactions.appendChild(item);
}


// ================================
// GENERATE RECEIPT
// ================================

function generateReceipt(
    type,
    amount,
    previousBalance,
    newBalance,
    recipient = ""
) {

    let receiptSection =
        document.getElementById("receiptSection");

    let receiptContent =
        document.getElementById("receiptContent");


    let now = new Date();

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
                `<p>
                    <strong>Recipient:</strong>
                    ${recipient}
                </p>`
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


    receiptContent.innerHTML = receiptHTML;

    receiptSection.style.display = "block";
}


// ================================
// PRINT / SAVE RECEIPT
// ================================

function printReceipt() {

    let receipt =
        document.getElementById("receiptContent").innerHTML;


    let printWindow =
        window.open("", "", "width=700,height=800");


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
// ================================
// CREATE ACCOUNT
// ================================

function createAccount() {

    let name =
        document.getElementById("fullName").value.trim();

    let mobile =
        document.getElementById("mobile").value.trim();

    let email =
        document.getElementById("email").value.trim();

    let accountType =
        document.getElementById("accountType").value;

    let initialDeposit =
        Number(document.getElementById("initialDeposit").value);

    let pin =
        document.getElementById("newPin").value;

    let confirmPin =
        document.getElementById("confirmPin").value;

    let message =
        document.getElementById("createMessage");


    // Check name
    if (name === "") {

        message.innerText =
            "Please enter your full name.";

        return;
    }


    // Check mobile number
    if (!/^[0-9]{10}$/.test(mobile)) {

        message.innerText =
            "Please enter a valid 10-digit mobile number.";

        return;
    }


    // Check email
    if (email === "") {

        message.innerText =
            "Please enter your email address.";

        return;
    }


    // Check initial deposit
    if (initialDeposit < 0 || isNaN(initialDeposit)) {

        message.innerText =
            "Please enter a valid initial deposit.";

        return;
    }


    // Check PIN
    if (!/^[0-9]{4}$/.test(pin)) {

        message.innerText =
            "PIN must contain exactly 4 digits.";

        return;
    }


    // Check confirm PIN
    if (pin !== confirmPin) {

        message.innerText =
            "PINs do not match.";

        return;
    }


    // Generate 14-digit account number
    let newAccountNumber =
        "1000" +
        Math.floor(
            1000000000 +
            Math.random() * 9000000000
        ).toString();


    // Save account details
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


    // Update current account
    accountNumber = newAccountNumber;

    balance = initialDeposit;


    // Show success message
    message.innerHTML =

        "Account created successfully! 🎉<br><br>" +

        "<strong>Your 14-digit Account Number:</strong><br>" +

        "<span style='font-size:22px; color:#1769aa;'>" +

        newAccountNumber +

        "</span><br><br>" +

        "Please remember your account number and PIN.";


    // Disable create button
    document.querySelector(
        ".login-container button"
    ).disabled = true;
}
