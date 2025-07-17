# Images Folder

## How to add your profile image:

1. **Add your image**: Place your profile photo in this folder and name it `profile.jpg` (or update the path in hero-section.tsx)

2. **Supported formats**: JPG, PNG, WebP

3. **Recommended size**: 400x400 pixels or larger (square format works best)

4. **File size**: Keep under 2MB for better loading performance

## Current setup:
- The hero section will automatically use your image from `/src/assets/images/profile.jpg`
- If the image is not found, it will fallback to a placeholder
- The image will be displayed in a circular format with concentric circles background

## To change the image path:
Edit `client/src/components/hero-section.tsx` and update the `src` attribute in the img tag.
