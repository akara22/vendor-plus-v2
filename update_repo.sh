# Update script for Vendor-plus-v2

# Pull latest changes
git pull origin main

# Stage all changes
git add .

# Prompt for commit message
echo "Enter commit message:"
read commit_message

# Commit changes
git commit -m "$commit_message"

# Push changes
git push origin main

echo "Changes pushed to repository"

