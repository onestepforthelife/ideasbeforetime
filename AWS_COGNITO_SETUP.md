# 🔐 Cognito Authentication - Month 3
**Goal:** User accounts, premium tier management

---

## ✅ STEP 1: Create User Pool

```bash
aws cognito-idp create-user-pool \
  --pool-name ideasbeforetime-users \
  --policies '{
    "PasswordPolicy": {
      "MinimumLength": 8,
      "RequireUppercase": true,
      "RequireLowercase": true,
      "RequireNumbers": true
    }
  }' \
  --auto-verified-attributes email \
  --username-attributes email
```

---

## ✅ STEP 2: Create App Client

```bash
aws cognito-idp create-user-pool-client \
  --user-pool-id YOUR_POOL_ID \
  --client-name ideasbeforetime-web \
  --no-generate-secret \
  --explicit-auth-flows ALLOW_USER_PASSWORD_AUTH ALLOW_REFRESH_TOKEN_AUTH
```

---

## ✅ STEP 3: Add to Frontend

```html
<script src="https://cdn.jsdelivr.net/npm/amazon-cognito-identity-js@6.0.1/dist/amazon-cognito-identity.min.js"></script>

<script>
const poolData = {
    UserPoolId: 'YOUR_POOL_ID',
    ClientId: 'YOUR_CLIENT_ID'
};
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

// Sign up
function signUp(email, password) {
    userPool.signUp(email, password, [], null, (err, result) => {
        if (err) return alert(err.message);
        alert('Check your email for verification code');
    });
}

// Sign in
function signIn(email, password) {
    const authData = { Username: email, Password: password };
    const authDetails = new AmazonCognitoIdentity.AuthenticationDetails(authData);
    const userData = { Username: email, Pool: userPool };
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    
    cognitoUser.authenticateUser(authDetails, {
        onSuccess: (result) => {
            const token = result.getIdToken().getJwtToken();
            localStorage.setItem('authToken', token);
            window.location.href = '/dashboard.html';
        },
        onFailure: (err) => alert(err.message)
    });
}
</script>
```

---

## ✅ STEP 4: Gate Premium Features

```javascript
// Check if user is authenticated
function isAuthenticated() {
    return !!localStorage.getItem('authToken');
}

// Check if user has premium
async function hasPremium() {
    const token = localStorage.getItem('authToken');
    const response = await fetch('https://api.ideasbeforetime.com/check-premium', {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
}

// Gate content
if (!isAuthenticated()) {
    window.location.href = '/login.html';
}
```

**Cost:** Free tier = 50K MAU (monthly active users)
