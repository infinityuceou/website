# QUICK SETUP GUIDE (DEPRECATED)

> **This document has been superseded by the main
> `HACKATHON_REGISTRATION_SETUP.md` in the project root.**

The system now uses **Cloudinary** for image storage instead of Google
Drive, and no longer requires any OAuth2 flow.  For the current, supported
setup instructions please refer to [HACKATHON_REGISTRATION_SETUP.md]
(../HACKATHON_REGISTRATION_SETUP.md).

### Minimal configuration summary

1. Create a Cloudinary account and note your `cloud_name`, `api_key`, and
   `api_secret`.
2. Create a Google Sheet titled **INFINITY 2K26 Registrations** and share it
   with your service account (Editor).  Grab the sheet ID from the URL.
3. Obtain a Google service account JSON file and put it somewhere accessible.
4. Copy values into your `.env` file using the [`.env.example` template]
   as a guide.
5. Run the backend:
   ```bash
   cd d:\infinity\website\_archive_backend
   npm install
   npm start
   ```

Once the backend is running you can test the frontend registration form
and confirm that payment screenshots are uploaded to Cloudinary.

---

*Older instructions for Google Drive/OAuth have been removed.*
```

