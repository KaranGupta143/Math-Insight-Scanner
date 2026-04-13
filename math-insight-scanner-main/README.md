# Math Insight Scanner

Math Insight Scanner is a web application that allows users to upload images of math problems and student work, automatically analyze them for misconceptions, and receive targeted feedback and interventions. Built with React, Vite, TypeScript, and Supabase, it provides a modern, interactive interface for educators and learners.

## Features

- **Image Upload:** Upload images of handwritten or printed math problems and student solutions.
- **Automated Analysis:** Uses Supabase Edge Functions to analyze student work and detect root misconceptions.
- **Misconception Detection:** Identifies misconceptions, provides confidence scores, and highlights supporting evidence.
- **Targeted Interventions:** Suggests analogies, visual ideas, and follow-up questions tailored to the detected misconceptions.
- **Parent Script Generation:** Generates a script for parents to help guide their child’s learning.
- **History Panel:** View and revisit previous scans and their results.
- **PDF Export:** Export detailed misconception reports as print-friendly PDFs.
- **Accessible UI:** Modern, responsive design with accessible components.

## Demo

![App Screenshot](public/icon.png)

## Tech Stack

- **Frontend:** React, TypeScript, Vite
- **UI Components:** shadcn/ui, Radix UI, Tailwind CSS
- **State Management:** React Hooks, TanStack React Query
- **Backend:** Supabase (Database, Storage, Edge Functions)
- **Testing:** Vitest, Testing Library

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm (v9+ recommended)

### Installation

1. Clone the repository:
	```sh
	git clone https://github.com/your-username/math-insight-scanner.git
	cd math-insight-scanner
	```
2. Install dependencies:
	```sh
	npm install
	```
3. Set up environment variables:
	- Copy `.env.example` to `.env` and fill in your Supabase credentials.
4. Start the development server:
	```sh
	npm run dev
	```
5. Open [http://localhost:8080](http://localhost:8080) (or the port shown in your terminal) in your browser.

## Usage

1. Upload an image of a math problem and student work.
2. Wait for the analysis to complete.
3. Review detected misconceptions, confidence scores, and evidence.
4. Explore suggested interventions and parent script.
5. Export the report as PDF or revisit previous scans in the history panel.

## Project Structure

- `src/` — Main source code
  - `components/` — UI components
  - `pages/` — Page components (e.g., Index, NotFound)
  - `lib/` — API and utility functions
  - `integrations/supabase/` — Supabase client and types
  - `types/` — TypeScript types
- `public/` — Static assets (favicon, images)
- `supabase/` — Supabase configuration and Edge Functions

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
VITE_SUPABASE_PROJECT_ID=your_project_id
VITE_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
VITE_SUPABASE_URL=your_supabase_url
```

## Contributing

Contributions are welcome! Please open issues or pull requests for new features, bug fixes, or documentation improvements.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License.

## Acknowledgements

- [Supabase](https://supabase.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
