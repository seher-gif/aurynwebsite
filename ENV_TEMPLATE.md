# Database Configuration
# PostgreSQL connection string for Prisma
DATABASE_URL="postgresql://user:password@host:port/database?schema=public"

# Direct database URL for migrations (required by Prisma)
DIRECT_URL="postgresql://user:password@host:port/database?schema=public"

# NextAuth Configuration
# Generate with: openssl rand -base64 32
AUTH_SECRET="your-secret-key-here"

# Your production URL (change after deployment)
AUTH_URL="http://localhost:3000"

# Email Service (Resend)
# Get your API key from: https://resend.com/api-keys
RESEND_API_KEY="re_your_api_key_here"

# Google Gemini AI (for SEO analysis)
# Get your API key from: https://makersuite.google.com/app/apikey
GEMINI_API_KEY="AIza_your_api_key_here"
