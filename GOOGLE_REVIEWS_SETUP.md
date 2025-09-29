# Google Reviews Integration Setup

This guide will help you set up Google Reviews integration for your WE FIX 4U website.

## Prerequisites

1. A Google Cloud Platform account
2. A Google Business Profile for your business
3. Your business must have Google reviews

## Step 1: Get Google Places API Key

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Places API** for your project:
   - Go to "APIs & Services" > "Library"
   - Search for "Places API"
   - Click on it and press "Enable"
4. Create an API key:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy your API key
5. Restrict your API key (recommended):
   - Click on your API key to edit it
   - Under "Application restrictions", select "HTTP referrers"
   - Add your domain (e.g., `wefix4u.vercel.app/*`)
   - Under "API restrictions", select "Restrict key" and choose "Places API"

## Step 2: Find Your Place ID

1. Go to the [Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id)
2. Search for your business name and address
3. Copy the Place ID (it looks like: `ChIJN1t_tDeuEmsRUsoyG83frY4`)

## Step 3: Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add your credentials:
   ```env
   GOOGLE_PLACES_API_KEY=your_actual_api_key_here
   GOOGLE_PLACE_ID=your_actual_place_id_here
   NEXT_PUBLIC_GOOGLE_PLACE_ID=your_actual_place_id_here
   ```

## Step 4: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Visit your homepage and scroll to the "What Our Customers Say" section
3. You should see:
   - Google Reviews section with real reviews from your business
   - Overall rating and total review count
   - Individual reviews with author names, photos, and ratings

## Features

- **Real-time Google Reviews**: Fetches actual reviews from your Google Business Profile
- **Caching**: Reviews are cached for 1 hour to improve performance
- **Error Handling**: Graceful fallback if reviews can't be loaded
- **Responsive Design**: Works on all device sizes
- **Loading States**: Shows loading animation while fetching reviews
- **Author Photos**: Displays reviewer profile photos when available
- **Star Ratings**: Visual star rating display
- **Link to Google**: "View all reviews on Google" link

## Troubleshooting

### No Reviews Showing
- Check that your Place ID is correct
- Verify your API key has Places API enabled
- Ensure your business has Google reviews
- Check the browser console for error messages

### API Key Issues
- Make sure your API key is not restricted to specific domains during development
- Verify the API key has the correct permissions
- Check that billing is enabled for your Google Cloud project

### Rate Limiting
- The API has usage limits. Reviews are cached for 1 hour to minimize API calls
- If you exceed limits, you'll need to wait or upgrade your Google Cloud billing plan

## Cost Considerations

- Google Places API has usage-based pricing
- Each request to fetch reviews counts as one API call
- With caching enabled, you'll make fewer API calls
- Monitor your usage in the Google Cloud Console

## Security Notes

- Never commit your `.env.local` file to version control
- Use environment variables for all sensitive data
- Consider using different API keys for development and production
- Regularly rotate your API keys

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify your API key and Place ID are correct
3. Ensure your Google Business Profile has reviews
4. Check the Google Cloud Console for API usage and errors
