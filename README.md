# CollabDraw

 CollabDraw is an online whiteboard where people can draw and work together in real time. It’s easy to use, works on phones, tablets, and computers, and is built using modern tools. It’s also ready for smart AI features to make drawing even more fun and useful.
## Whiteboard Features

 Draw Anytime, Anywhere
You can draw on the canvas using any device—laptop, phone, or tablet.

All-in-One Drawing Tools
Use tools like pen, eraser, rectangle, and circle to draw whatever you need.

Add Text Easily
Type and place text right on your drawing to explain or label things.

Pick Your Style
Change colors and line thickness to match your style or make things stand out.

Undo and Redo
Made a mistake? No worries—go back or forward with undo/redo buttons.

Clear Everything Fast
Want to start over? Just click once to clear the whole canvas.

Share with a Link
Send a special link to others so they can join and draw with you.

Works on All Screens
The whiteboard looks and works great on computers, tablets, and phones.


##  Tech Stack

 Next.js (App Router)
The main framework that powers the app—handles all the pages and routing.

React
The core library for building the user interface and handling interactions.
TypeScript
Like JavaScript, but with extra safety—it helps catch bugs before they happen.

Tailwind CSS
Used for styling everything quickly with clean and flexible utility classes.

ShadCN UI
Pre-built components (like buttons, modals, etc.) that look great and are easy to use.

Lucide Icons
Clean and modern icons used throughout the app for better visuals.
## 🏁 Getting Started

Follow these instructions to get a local copy up and running for development and testing purposes.

### Prerequisites

Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/en/) (v20 or later)
- [npm](https://www.npmjs.com/) (or an equivalent package manager)

### Installation

1.  Clone the repository.
2.  Navigate to the project directory.
3.  Install the dependencies:
    ```sh
    npm install
    ```

### Running the Application

1.  **Run the Next.js development server:**
    This will start the main application, typically on `http://localhost:9002`.
    ```sh
    npm run dev
    ```

2.  **Run the Genkit development server (for AI features):**
    For AI functionalities to work, you need to run the Genkit development server in a separate terminal.
    ```sh
    npm run genkit:dev
    ```

##  Powered Features

CollabDraw leverages Google's Genkit to integrate powerful AI capabilities. The application includes a pre-built flow for clarifying ambiguous feedback (e.g., "make it better"). When a user provides such feedback, the AI can generate several more specific and actionable suggestions, helping to bridge communication gaps in the creative process.
