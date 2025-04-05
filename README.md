This is an MVP made at Music hackathon hosted by 7th Street Concerts in Charlotte on 4/5/25

This will utilize gen ai to generate a pdf document of a work for hire agreement for musicians.

To use: Clone this repo, and fill in env vars in .env in the root folder. Use 'npm run dev' in root and open http://localhost:3000
This app is also deployed to https://https://work-for-hire-mvp.vercel.app

This is a next.js app that is hosted on Vercel. It utilizes jsPDF to generate pdfs and ipfs to pin the pdf on a cloud based storage. We will utilize a supabase database for storage and gemini by google to generate the agreement.

Future steps include utilizing an esignature api to send out to the parties for esignature.
