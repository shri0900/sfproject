document.getElementById('salesforceForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    let accountName = document.getElementById('accountName').value;

    // Authenticate with Salesforce
    let authResponse = await fetch('https://login.salesforce.com/services/oauth2/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `grant_type=password&client_id=YOUR_CONSUMER_KEY&client_secret=YOUR_CONSUMER_SECRET&username=YOUR_SALESFORCE_USERNAME&password=YOUR_SALESFORCE_PASSWORD_WITH_SECURITY_TOKEN`
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
