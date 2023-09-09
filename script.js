document.getElementById('salesforceForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    let accountName = document.getElementById('accountName').value;

    // Authenticate with Salesforce
    let authResponse = await fetch('https://login.salesforce.com/services/oauth2/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `grant_type=password&client_id=3MVG9wt4IL4O5wvIrDAEJFQDJvM6StZCok08Z8QaRez4KeFiNgTRDelHBHkOO0xZPdoTWVJXE8wiqMFwEa.F6&client_secret=DFA6D65C8ECD79A3C6AD031D683FB85C5B7133E8FB54D6B65BE97C498474B165&username=shreeraj@sselectricals.co.in&password=Trishika4200SeNWVUiU47lq7unM5uogj5dYa`
    });

    let authData = await authResponse.json();
    let accessToken = authData.access_token;
    let instanceUrl = authData.instance_url;

    // Create Account in Salesforce
    let accountResponse = await fetch(instanceUrl + '/services/data/v50.0/sobjects/Account/', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'Name': accountName
        })
    });

    if (accountResponse.status === 201) {
        alert('Account created successfully');
    } else {
        let errorData = await accountResponse.json();
        alert('Error: ' + errorData[0].message);
    }
});
