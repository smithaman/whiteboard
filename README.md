# CollabDraw

CollabDraw is a modern, real-time collaborative whiteboard application designed for seamless creative and professional collaboration. Built with a powerful tech stack, it offers an intuitive interface and is ready for AI-powered features to enhance the drawing experience.

## ✨ Features

- **🎨 Real-time Drawing Canvas:** A responsive canvas that works on any device.
- **🛠️ Rich Toolset:** A comprehensive set of tools including a pen, eraser, rectangle, and circle shapes.
- **✍️ Text Tool:** Add text annotations directly onto the canvas.
- **🎨 Customizable Tools:** Easily adjust color and stroke width to fit your needs.
- **⏪ History Control:** Undo and redo actions with ease.
- **🗑️ Clear Canvas:** Start fresh with a single click.
- **🔗 Shareable Links:** Generate unique links to invite others to your whiteboard session.
- **📱 Responsive Design:** A fluid experience across desktop, tablet, and mobile devices.

## 🚀 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (with App Router)
- **UI Library:** [React](https://reactjs.org/)
- **AI Integration:** [Google Genkit](https://firebase.google.com/docs/genkit)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [ShadCN UI](https://ui.shadcn.com/)
- **Icons:** [Lucide React](https://lucide.dev/)

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

## 🤖 AI-Powered Features

CollabDraw leverages Google's Genkit to integrate powerful AI capabilities. The application includes a pre-built flow for clarifying ambiguous feedback (e.g., "make it better"). When a user provides such feedback, the AI can generate several more specific and actionable suggestions, helping to bridge communication gaps in the creative process.
