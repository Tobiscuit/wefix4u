# AWS Amplify Setup for WE FIX 4U

## 🚀 Getting Started

### 1. Install AWS CLI
```bash
# Install AWS CLI v2
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# Or on Windows with PowerShell
winget install Amazon.AWSCLI
```

### 2. Configure AWS CLI
```bash
aws configure
# Enter your AWS Access Key ID
# Enter your AWS Secret Access Key
# Enter your default region (e.g., us-east-1)
# Enter your default output format (json)
```

### 3. Deploy Amplify Backend
```bash
# Deploy the backend
npm run amplify sandbox

# This will:
# - Create AWS resources (Cognito, DynamoDB, S3, etc.)
# - Generate amplify_outputs.json
# - Set up authentication and database
```

### 4. Start Development Server
```bash
npm run dev
```

## 🔧 What's Included

### Authentication (Cognito)
- **User signup/login** with email and phone
- **Multi-factor authentication** (SMS, TOTP)
- **Password reset** and account recovery
- **User attributes** (name, phone, address)

### Database (DynamoDB + AppSync)
- **Customer management** with repair history
- **Repair tracking** with real-time status updates
- **Appointment scheduling** system
- **Inventory management** for parts
- **Photo storage** for repair documentation

### Storage (S3)
- **Repair photos** with secure access
- **Customer documents** (receipts, warranties)
- **Public assets** for the website

## 📱 Features for Repair Shop

### Customer Portal
- **Sign up/Login** to track repairs
- **Real-time repair status** updates
- **Appointment booking** system
- **Repair history** and receipts

### Staff Dashboard
- **Repair management** system
- **Customer communication** tools
- **Inventory tracking** for parts
- **Photo documentation** for repairs

## 🎯 Next Steps

1. **Deploy backend**: `npm run amplify sandbox`
2. **Test authentication**: Visit `/sign-up` and `/sign-in`
3. **Build repair tracking**: Implement repair management features
4. **Add real-time updates**: Use AppSync subscriptions
5. **Integrate payments**: Add Stripe for payment processing

## 💰 Cost Estimation

- **Free tier**: 50,000 monthly active users
- **After free tier**: ~$0.0055 per MAU
- **For local repair shop**: Likely **FREE** (unless 50k+ customers)

## 🔒 Security Features

- **Encrypted data** at rest and in transit
- **User authentication** with MFA
- **Secure file storage** with access controls
- **GDPR compliance** ready
- **PCI compliance** for payments

## 📞 Support

- **AWS Amplify Docs**: https://docs.amplify.aws/
- **Cognito Docs**: https://docs.aws.amazon.com/cognito/
- **AppSync Docs**: https://docs.aws.amazon.com/appsync/
