# 🚀 Deploying x402 Marketplace to Vercel

This guide will walk you through deploying your x402 Decentralized API Marketplace to Vercel using their web UI.

## Prerequisites

Before you start, make sure you have:
- ✅ GitHub repository with your code (https://github.com/cuongpo/x402)
- ✅ Vercel account (sign up at https://vercel.com)
- ✅ Thirdweb credentials (Client ID and Secret Key)
- ✅ Server wallet address for receiving payments

## Step-by-Step Deployment Guide

### Step 1: Sign Up / Log In to Vercel

1. Go to **https://vercel.com**
2. Click **"Sign Up"** (or "Log In" if you have an account)
3. Choose **"Continue with GitHub"** for easiest integration
4. Authorize Vercel to access your GitHub account

### Step 2: Import Your Project

1. Once logged in, click **"Add New..."** button in the top-right
2. Select **"Project"** from the dropdown
3. You'll see a list of your GitHub repositories
4. Find **"cuongpo/x402"** and click **"Import"**

   > **Note**: If you don't see your repository, click "Adjust GitHub App Permissions" and grant access to the repository.

### Step 3: Configure Project Settings

On the "Configure Project" page:

#### 1. **Project Name**
   - Leave as `x402` or change to your preferred name
   - This will be your URL: `your-project-name.vercel.app`

#### 2. **Framework Preset**
   - Should auto-detect as **"Next.js"** ✅
   - If not, select "Next.js" from the dropdown

#### 3. **Root Directory**
   - Click **"Edit"** next to Root Directory
   - Select **"marketplace"** folder
   - This is important because your Next.js app is in the `marketplace` folder!

#### 4. **Build and Output Settings**
   - Leave as default (Vercel auto-detects Next.js settings)
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

### Step 4: Add Environment Variables

This is the **most important step**! Click **"Environment Variables"** section:

Add the following variables one by one:

#### Variable 1: NEXT_PUBLIC_THIRDWEB_CLIENT_ID
- **Key**: `NEXT_PUBLIC_THIRDWEB_CLIENT_ID`
- **Value**: Your thirdweb Client ID (from https://thirdweb.com/dashboard)
- **Environment**: Select all (Production, Preview, Development)

#### Variable 2: THIRDWEB_SECRET_KEY
- **Key**: `THIRDWEB_SECRET_KEY`
- **Value**: Your thirdweb Secret Key
- **Environment**: Select all (Production, Preview, Development)
- ⚠️ **Important**: Keep this secret! Don't share it publicly.

#### Variable 3: SERVER_WALLET_ADDRESS
- **Key**: `SERVER_WALLET_ADDRESS`
- **Value**: Your wallet address that will receive payments (e.g., `0x8C9eDAba42D0481dE691dBE083e027970e3bFF31`)
- **Environment**: Select all (Production, Preview, Development)

#### Variable 4: NEXT_PUBLIC_IS_TESTNET
- **Key**: `NEXT_PUBLIC_IS_TESTNET`
- **Value**: `true` (for Polygon Amoy testnet) or `false` (for Polygon mainnet)
- **Environment**: Select all (Production, Preview, Development)

### Step 5: Deploy!

1. After adding all environment variables, click **"Deploy"**
2. Vercel will start building your project
3. You'll see a build log showing the progress
4. Wait 2-3 minutes for the build to complete

### Step 6: Verify Deployment

Once deployment is complete:

1. You'll see a **"Congratulations"** screen with confetti 🎉
2. Click **"Visit"** to open your deployed site
3. Your site will be live at: `https://your-project-name.vercel.app`

### Step 7: Test Your Deployment

1. **Visit your site**: `https://your-project-name.vercel.app`
2. **Connect your wallet**: Click "Connect Wallet" in the top-right
3. **Switch to Polygon Amoy**: Make sure you're on the correct network
4. **Get test tokens**:
   - MATIC: https://faucet.polygon.technology/
   - USDC: https://faucet.circle.com/
5. **Test the Weather API**:
   - Go to Marketplace page
   - Click "Try API" on Weather API
   - Click "Test API ($0.01)"
   - Approve the payment
   - See the result! ✅

## 🎯 Post-Deployment Configuration

### Custom Domain (Optional)

1. Go to your project dashboard on Vercel
2. Click **"Settings"** → **"Domains"**
3. Add your custom domain
4. Follow Vercel's instructions to configure DNS

### Environment Variables Management

To update environment variables after deployment:

1. Go to your project dashboard
2. Click **"Settings"** → **"Environment Variables"**
3. Edit or add new variables
4. Click **"Save"**
5. **Redeploy** your project for changes to take effect

### Automatic Deployments

Vercel automatically deploys when you push to GitHub:

- **Push to `main` branch** → Deploys to production
- **Push to other branches** → Creates preview deployments
- **Pull requests** → Creates preview deployments with unique URLs

## 🔧 Troubleshooting

### Build Fails

**Error**: "Module not found" or "Cannot find package"
- **Solution**: Make sure Root Directory is set to `marketplace`

**Error**: "Environment variable not found"
- **Solution**: Check that all 4 environment variables are added correctly

### Runtime Errors

**Error**: "Failed to fetch" or API errors
- **Solution**: Check that environment variables are set correctly
- **Solution**: Make sure `NEXT_PUBLIC_` prefix is used for client-side variables

### Payment Errors

**Error**: "Settlement error" or "Chain not supported"
- **Solution**: Verify you're on Polygon Amoy testnet (Chain ID: 80002)
- **Solution**: Make sure you have test USDC and MATIC

**Error**: "Insufficient funds"
- **Solution**: Get test tokens from faucets (see Step 7)

## 📊 Monitoring Your Deployment

### View Logs

1. Go to your project dashboard
2. Click **"Deployments"**
3. Click on any deployment
4. View **"Build Logs"** and **"Function Logs"**

### Analytics

1. Go to your project dashboard
2. Click **"Analytics"** to see:
   - Page views
   - Unique visitors
   - Top pages
   - Performance metrics

## 🔄 Updating Your Deployment

To update your deployed site:

1. Make changes to your code locally
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your update message"
   git push
   ```
3. Vercel automatically detects the push and redeploys
4. Check the deployment status in your Vercel dashboard

## 🌐 Your Live URLs

After deployment, you'll have:

- **Production**: `https://your-project-name.vercel.app`
- **Preview** (for PRs): `https://your-project-name-git-branch-name.vercel.app`
- **Custom Domain** (if configured): `https://yourdomain.com`

## 📝 Important Notes

1. **Environment Variables**: Never commit `.env.local` to GitHub. Always use Vercel's environment variables UI.

2. **Testnet vs Mainnet**: 
   - For testing: Use `NEXT_PUBLIC_IS_TESTNET=true` and Polygon Amoy
   - For production: Use `NEXT_PUBLIC_IS_TESTNET=false` and Polygon mainnet

3. **Server Wallet**: Make sure the `SERVER_WALLET_ADDRESS` is a wallet you control, as this is where payments will be sent.

4. **API Limits**: Vercel has function execution limits:
   - Hobby plan: 10 seconds timeout
   - Pro plan: 60 seconds timeout
   - If you need longer timeouts, consider upgrading

5. **CORS**: Vercel automatically handles CORS for Next.js API routes.

## 🆘 Need Help?

- **Vercel Documentation**: https://vercel.com/docs
- **Next.js Documentation**: https://nextjs.org/docs
- **thirdweb Documentation**: https://portal.thirdweb.com
- **x402 Protocol**: https://github.com/coinbase/x402

## ✅ Deployment Checklist

Before deploying, make sure:

- [ ] Code is pushed to GitHub
- [ ] Root directory is set to `marketplace`
- [ ] All 4 environment variables are added
- [ ] Thirdweb credentials are correct
- [ ] Server wallet address is correct
- [ ] Build completes successfully
- [ ] Site loads without errors
- [ ] Wallet connection works
- [ ] Payment flow works on testnet

---

**Congratulations!** 🎉 Your x402 Decentralized API Marketplace is now live on Vercel!

Share your deployment URL and let others experience autonomous API payments with x402!

